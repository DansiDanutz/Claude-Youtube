#!/usr/bin/env python3
"""DYK No. 06 (ported from No. 05, itself from No. 04): breathing room in the mix, without slowing the voice or calling ElevenLabs.

For every scene in narration/script.json that has a `pauses` block, the saved take
(narration/<id>.mp3) is decoded once to 48 kHz mono, split at word boundaries taken from
narration/<id>.words.json, and silence is inserted:
  "pauses": {"min_sentence_gap": 0.35,              # after . ? ! … : top the gap up to this
             "after": [{"word": "rule:", "nth": 1, "add": 0.25}]}   # add exactly this
Writes mix/<id>.wav (the paused take used by build_final) and narration/<id>.paused.json
({dur, words, pauses} with every later word shifted and the settings used), which make_vo_json.py prefers over the raw
words, so vo.json, the shot cues and the SFX cues all follow the new timing.
Idempotent: it always starts again from the paid mp3, never from its own output.
`"even_pace": true` additionally evens the pace of neighbouring chunks (even_pace_cuts) for the voice preflight.
Voice audit 2026-10-12: an `after` rule matches the exact token, punctuation included ("that?" never fires on
"That."); each cut sits at the quietest point of its gap (ElevenLabs alignment can be ~20 ms off), and the
inserted silence is entered and left through FADE_S raised-cosine fades, so no word is chopped and no step clicks.
"""
import json, os, re, subprocess, wave

import numpy as np

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, "narration")
MIX = os.path.join(WORK, "mix")
RATE = 48000
SENTENCE_END = re.compile(r"[.?!…]$")
FADE_S = 0.008            # fade into / out of every inserted silence
CUT_SEARCH_PAD_S = 0.02   # the quietest-point search may reach this far past the aligned gap
CUT_WIN_S = 0.002         # RMS window of the quietest-point search


def plan_pauses(words, cfg):
    """Return [(index_of_word_before_the_cut, seconds_to_insert)], sorted, one entry per cut."""
    add = {}
    gap_min = float(cfg.get("min_sentence_gap", 0))
    for i in range(len(words) - 1):
        if gap_min and SENTENCE_END.search(words[i]["w"]):
            need = gap_min - (words[i + 1]["s"] - words[i]["e"])
            if need > 0.005:
                add[i] = add.get(i, 0) + need
    for rule in cfg.get("after", []):
        seen = 0
        for i, w in enumerate(words[:-1]):
            if w["w"].lower() == rule["word"].lower():
                seen += 1
                if seen == int(rule.get("nth", 1)):
                    add[i] = add.get(i, 0) + float(rule["add"])
                    break
        else:
            raise ValueError(f"pause word {rule['word']!r}#{rule.get('nth', 1)} not found")
    return sorted((i, round(s, 3)) for i, s in add.items())


PACE_STEP_MAX = 0.10      # voice preflight: neighbouring chunks within 10 % words/s (measured on the paused take)
PACE_TOL = 0.10           # ... and never slowed below 90 % of the chunk's own pace target
PAYOFF_WPS_MAX = 2.8      # a "payoff": true chunk is delivered at <= 2.8 words/s
MARGIN = 0.99             # land just inside every limit
MIN_CUT_GAP_S = 0.06      # even-pace breaths go only into gaps with at least this much real silence


def chunk_slices(chunks):
    """[(first_word_index, end_index)] per chunk, from the chunk texts' word counts."""
    out, i = [], 0
    for ch in chunks:
        n = len(ch["text"].split())
        out.append((i, i + n))
        i += n
    return out


def even_pace_cuts(words, chunks, raw=None):
    """Extra [(word_index, seconds)] that slow the faster of two neighbouring chunks with longer breaths at its own
    sentence ends (commas if it has none) until every pair is within PACE_STEP_MAX, payoff chunks <= PAYOFF_WPS_MAX,
    and no chunk below (1 - PACE_TOL) of its target. Silence is only ever added; a pace-0 or one-word chunk (the
    sign-off) is left alone and breaks the chain."""
    sl = chunk_slices(chunks)
    rate = [None] * len(sl)
    for k, ((a, b), ch) in enumerate(zip(sl, chunks)):
        if ch.get("pace") and b - a >= 2:
            rate[k] = (b - a) / (words[b - 1]["e"] - words[a]["s"])
    w = list(rate)
    lo = [(1 - PACE_TOL) * ch["pace"] / MARGIN if r else None for r, ch in zip(rate, chunks)]
    for k, ch in enumerate(chunks):
        if w[k] and ch.get("payoff"):
            w[k] = min(w[k], PAYOFF_WPS_MAX * MARGIN)
    for _ in range(200):
        changed = False
        for k in range(len(w) - 1):
            if not (w[k] and w[k + 1]):
                continue
            if w[k + 1] > (1 + PACE_STEP_MAX) * w[k]:
                w[k + 1], changed = max(lo[k + 1], (1 + PACE_STEP_MAX) * w[k] * MARGIN), True
            elif w[k + 1] < (1 - PACE_STEP_MAX) * w[k]:
                w[k], changed = max(lo[k], w[k + 1] / (1 - PACE_STEP_MAX) * MARGIN), True
        if not changed:
            break
    cuts = []
    for k, (a, b) in enumerate(sl):
        if not w[k] or w[k] >= rate[k] - 1e-9:
            continue
        need = (b - a) / w[k] - (words[b - 1]["e"] - words[a]["s"])
        # No. 04 audit: never cut into a gap where the take runs words together (< MIN_CUT_GAP_S of real silence) —
        # the cut lands on the previous word's tail ("pocket. | You", 24 ms gap) and clips both words.
        ref = raw or words      # judge the take's own silence, before any top-up pause
        clear = lambda i: ref[i + 1]["s"] - ref[i]["e"] >= MIN_CUT_GAP_S
        inner = [i for i in range(a, b - 1) if SENTENCE_END.search(words[i]["w"]) and clear(i)] or \
                [i for i in range(a, b - 1) if words[i]["w"].endswith((",", ";", ":")) and clear(i)] or \
                [i for i in range(a, b - 1) if SENTENCE_END.search(words[i]["w"])] or list(range(a, b - 1))
        cuts += [(i, round(need / len(inner), 3)) for i in inner]
    return cuts


def cut_time(words, i, samples=None, rate=RATE):
    """Where to cut after word i: the centre of the quietest CUT_WIN_S stretch of the gap (widened by CUT_SEARCH_PAD_S, never past the
    neighbouring words' midpoints), so neither word is clipped; the gap's middle when no audio is given."""
    a, b = words[i]["e"], words[i + 1]["s"]
    mid = (a + b) / 2
    if samples is None:
        return mid
    lo = max(words[i]["s"] + (a - words[i]["s"]) / 2, a - CUT_SEARCH_PAD_S)
    hi = min(b + (words[i + 1]["e"] - b) / 2, b + CUT_SEARCH_PAD_S)
    i0, i1, win = int(lo * rate), min(len(samples), int(hi * rate)), max(1, int(CUT_WIN_S * rate))
    if i1 - i0 <= win:
        return mid
    seg = np.asarray(samples[i0:i1], dtype=np.float64) ** 2
    energy = np.convolve(seg, np.ones(win), "valid")
    quiet = np.flatnonzero(energy <= energy.min() * 1.0001 + 1e-15)
    runs = np.split(quiet, np.flatnonzero(np.diff(quiet) > 1) + 1)          # stretches of equally quiet windows
    centres = np.array([(r[0] + r[-1]) / 2 for r in runs])
    best = centres[np.argmin(np.abs(centres + win / 2 - (mid * rate - i0)))]   # centre of the run nearest the middle
    return (i0 + best + win / 2) / rate


def shift_words(words, cuts):
    """Words with start/end moved later by every pause inserted before them."""
    out, shift, k = [], 0.0, 0
    for i, w in enumerate(words):
        out.append({"w": w["w"], "s": round(w["s"] + shift, 3), "e": round(w["e"] + shift, 3)})
        while k < len(cuts) and cuts[k][0] == i:
            shift += cuts[k][1]
            k += 1
    return out


def fade_around(x, idx, n):
    """Copy of int16 samples x with a raised-cosine fade-out over the n samples before idx and a fade-in after it."""
    y = x.astype(np.float64)
    a, b = max(0, idx - n), min(len(y), idx + n)
    if idx - a:
        y[a:idx] *= (0.5 + 0.5 * np.cos(np.linspace(0, np.pi, idx - a)))
    if b - idx:
        y[idx:b] *= (0.5 - 0.5 * np.cos(np.linspace(0, np.pi, b - idx)))
    return np.round(y).astype("<i2")


def insert_silence(samples_in, cuts_at_s, rate=RATE, width=2, fade_s=0.0):
    """samples_in: raw PCM bytes; cuts_at_s: [(time_s, seconds)] → new PCM bytes; fade_s > 0 (16-bit only) fades
    the audio out into and back in from every inserted silence."""
    if fade_s:
        x = np.frombuffer(samples_in, dtype="<i2")
        n = max(1, int(round(fade_s * rate)))
        for t, _ in cuts_at_s:
            x = fade_around(x, min(len(x), int(round(t * rate))), n)
        samples_in = x.tobytes()
    out, pos = bytearray(), 0
    for t, sec in sorted(cuts_at_s):
        idx = min(len(samples_in), int(round(t * rate)) * width)
        out += samples_in[pos:idx] + b"\x00" * (int(round(sec * rate)) * width)
        pos = idx
    out += samples_in[pos:]
    return bytes(out)


def decode(mp3, wav):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp3, "-ar", str(RATE), "-ac", "1", "-c:a", "pcm_s16le", wav],
                   check=True)


def merge_cuts(*lists):
    add = {}
    for cuts in lists:
        for i, sec in cuts:
            add[i] = round(add.get(i, 0) + sec, 3)
    return sorted(add.items())


def process(sid, cfg, chunks=None):
    words = json.load(open(os.path.join(NARR, f"{sid}.words.json")))
    cuts = plan_pauses(words, cfg)
    if cfg.get("even_pace") and chunks and len(chunks) > 1:
        cuts = merge_cuts(cuts, even_pace_cuts(shift_words(words, cuts), chunks, words))
    tmp = os.path.join(MIX, f"{sid}.decode.wav")
    decode(os.path.join(NARR, f"{sid}.mp3"), tmp)
    try:
        with wave.open(tmp, "rb") as r:
            params, pcm = r.getparams(), r.readframes(r.getnframes())
    finally:
        os.remove(tmp)
    samples = np.frombuffer(pcm, dtype="<i2")
    cuts_at = [(cut_time(words, i, samples, params.framerate), s) for i, s in cuts]
    pcm = insert_silence(pcm, cuts_at, params.framerate, params.sampwidth, FADE_S)
    with wave.open(os.path.join(MIX, f"{sid}.wav"), "wb") as w:
        w.setparams(params)
        w.writeframes(pcm)
    dur = round(len(pcm) / (params.framerate * params.sampwidth), 3)
    json.dump(paused_record(dur, shift_words(words, cuts), cfg), open(os.path.join(NARR, f"{sid}.paused.json"), "w"),
              indent=0)
    return cuts, dur


def paused_record(dur, words, cfg):
    """The paused take's timings plus the settings that made them, so make_vo_json.py can refuse a stale one."""
    return {"dur": dur, "words": words, "pauses": cfg}


def main():
    script = json.load(open(os.path.join(NARR, "script.json")))
    for sc in script["scenes"]:
        if not sc.get("pauses"):
            continue
        cuts, dur = process(sc["id"], sc["pauses"], sc.get("chunks"))
        print(f"  {sc['id']}: {len(cuts)} pauses, +{sum(s for _, s in cuts):.2f}s → {dur:.2f}s")


if __name__ == "__main__":
    main()
