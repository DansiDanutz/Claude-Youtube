#!/usr/bin/env python3
"""Brian narration for DYK No. 07 "Light" via ElevenLabs /with-timestamps (adapted from No. 06, itself from No. 05).

Brian, eleven_flash_v2_5, with the "never sleepy" settings (skill, David after ep01): stability .32,
similarity .85, style .45; every scene/chunk carries its own `pace` target (words/s, gate ±10 %); hook,
welcome and outro lines carry `floor: 0.95` (never slowed below it — shorten the text instead).
A scene may be split into `chunks` (mood shifts: set-up → fact → cliffhanger), each generated and gated on
its own pace/speed, then stitched into ONE take with CHUNK_GAP_S of silence, so shots keep cueing one scene id.
Writes, per scene id:
  narration/<id>.mp3        the paid render (never regenerated unless ONLY=<id>)
  narration/<id>.words.json [{w, s, e}] word timings in seconds
  mix/<id>.wav              48 kHz mono for the mix
and narration/durations.json. Flags a hallucinated tail (audio running >0.9s past
the last aligned character), the ElevenLabs failure mode logged in the episode skill.
"""
import base64, hashlib, json, os, re, subprocess, sys, urllib.request

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, "narration")
MIX = os.path.join(WORK, "mix")
os.makedirs(MIX, exist_ok=True)
ROOT = os.path.abspath(os.path.join(WORK, "..", "..", ".."))
sys.path.insert(0, os.path.join(ROOT, "tools", "dyk"))
from voice_audio import decode, refine_ends, tail_artefact  # noqa: E402  (shared: same word ends + tail gate every episode)
VOICE = "nPczCjzI2devNBz1zQrb"          # Brian
MODEL = "eleven_flash_v2_5"
TAIL_LIMIT_S = 0.9
VOICE_SETTINGS = {"stability": 0.32, "similarity_boost": 0.85, "style": 0.45, "use_speaker_boost": True}
CHUNK_GAP_S = 0.25          # silence between stitched chunks (skill: 0.15–0.35 s)
SPEED_MIN = 0.85          # the skill's absolute floor for EVERY chunk (0.95 on hook/welcome/outro via `floor`)
# continuity gate (voice audit 2026-10-12: David heard 1.0 -> 1.2 -> 0.85 lurches between stitched chunks):
SPEED_LO, SPEED_MAX = 0.90, 1.08   # every chunk is generated inside this band (above 1.10 sounds rushed)
SPEED_STEP_MAX = 0.08     # neighbouring chunks of one scene differ by at most this much ElevenLabs speed
PACE_STEP_MAX = 0.25      # ... and by at most 25 % speech rate (a pace-0 sign-off is exempt). Same-speed takes of this voice
PACE_STEP_WARN = 0.10     # differ by up to ~20 % on their own (measured 2026-10-12), so 10-25 % is listed to listen to,
                          # not failed; the 1.2 -> 0.85 lurches David heard measured 30-40 %.
PAYOFF_SPEED_MAX = 1.0    # "payoff": true chunks (the answer's ladder walk-back and payoff line)
BUDGET_MARGIN = 1.3       # remaining Creator characters must cover the pending script characters x this
ART_GAP_S = 0.2           # speech rate = syllables per second of SPEECH: silences >= this are pauses, not tempo


def api_key():
    path = os.path.expanduser("~/.openclaw/fleet.env")
    if os.path.exists(path):
        for line in open(path):
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ELEVENLABS_API_KEY", "")


def tts_with_timestamps(text, key, speed=1.0):
    body = json.dumps({
        "text": text, "model_id": MODEL,
        "voice_settings": {**VOICE_SETTINGS, "speed": round(speed, 3)},
    }).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=body, method="POST",
                                 headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


def words_from_alignment(al):
    words, cur, start, end = [], "", None, None
    for ch, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append({"w": cur, "s": round(start, 3), "e": round(end, 3)})
            cur, start = "", None
            continue
        if start is None:
            start = s
        cur, end = cur + ch, e
    if cur:
        words.append({"w": cur, "s": round(start, 3), "e": round(end, 3)})
    return words


PACE_TARGET = 2.9            # words/s — Brian's story pace (episode 01 body lines)
PACE_TOL = 0.10              # every line within ±10 % of the target
MAX_TRIES = 4
FINAL_SYL_S = 0.55        # sentence-final word limit per syllable (ep01's dragged "yeeet.")
MAX_GAP_S = 1.1           # mid-sentence silence limit (skill audit loop)
LONG_WORD_SYL_S = 0.25    # a word may pass 1.0 s only with enough syllables at <= 0.25 s each


def syllables(w):
    """Rough syllable count; hyphenated parts are counted separately ('Dex-tee' = 2, not 1 —
    the silent-e rule must not apply to a spelled-out 'tee')."""
    # 'y' before a vowel is a consonant ("beyond" = be-yond, "year" = 1), not part of a vowel group
    parts = [re.sub(r"y(?=[aeiou])", "j", re.sub(r"[^a-z]", "", p)) for p in w.lower().split("-")]
    n = 0
    for p in filter(None, parts):
        silent_e = p.endswith("e") and not p.endswith("ee") and len(p) > 3
        n += max(1, len(re.findall(r"[aeiouy]+", p)) - (1 if silent_e else 0))
    return max(1, n)


def quality(words, target=PACE_TARGET):
    """Return (pace, problems): stretched words, mid-sentence gaps, pace outside ±10 % of `target`.
    target 0 = no pace gate (only for a deliberately slow sign-off such as "Ask... Wonder... Repeat.")."""
    pace = len(words) / max(0.1, words[-1]["e"] - words[0]["s"])
    probs = []
    for i, w in enumerate(words):
        d = w["e"] - w["s"]
        sentence_end = i + 1 == len(words) or re.search(r"[.?!,:;…]$", w["w"])
        per_syl = d / syllables(w["w"])
        final = i + 1 == len(words) or re.search(r"[.?!…]$", w["w"])   # sentence-final (a comma word may lengthen)
        long_ok = LONG_WORD_SYL_S * syllables(w["w"])                    # "Photosynthesis." 1.1 s is 0.22 s/syllable
        if d > max(1.0, long_ok) or (not sentence_end and per_syl > 0.42) or (final and per_syl > FINAL_SYL_S):
            probs.append(f"stretched '{w['w']}' {d:.2f}s")
    for a, b in zip(words, words[1:]):     # audit rule: no silence > 1.1 s inside a sentence
        if b["s"] - a["e"] > MAX_GAP_S and not re.search(r"[.?!…]$", a["w"]):
            probs.append(f"gap {b['s'] - a['e']:.2f}s after '{a['w']}'")
    if target and abs(pace - target) / target > PACE_TOL:
        probs.append(f"pace {pace:.2f} w/s (target {target}±{int(PACE_TOL * 100)}%)")
    return pace, probs


def probe_duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout.strip()
    return float(out)


def mp3_to_wav(mp3, wav):
    """48 kHz mono PCM for the mix; returns its duration in seconds."""
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", mp3, "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", wav], check=True)
    return probe_duration(wav)


def subscription(key):
    req = urllib.request.Request("https://api.elevenlabs.io/v1/user/subscription", headers={"xi-api-key": key})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def chunks_of(sc):
    """The scene's TTS chunks: explicit `chunks`, else the whole text as one chunk."""
    if sc.get("chunks"):
        return sc["chunks"]
    return [{"text": sc["text"], "pace": sc.get("pace", PACE_TARGET), "speed": sc.get("speed", 1.0)}]


def speed_band(floor, prev_speed=None):
    """[lo, hi] a chunk may be generated at: the global band, its floor, and within SPEED_STEP_MAX of the chunk before."""
    lo, hi = max(SPEED_MIN, SPEED_LO, floor), SPEED_MAX
    if prev_speed is not None:
        lo, hi = max(lo, prev_speed - SPEED_STEP_MAX), min(hi, prev_speed + SPEED_STEP_MAX)
    return lo, max(lo, hi)


def articulation_rate(words):
    """Syllables per second of speech, pauses (gaps >= ART_GAP_S) excluded — the tempo a listener hears as speed.
    Syllables, not words: "Did you know that a pale face…" has short words and reads ~20 % more words/s than
    "Florence… astronomer… heavenly" at the same tempo. Pause lengths are governed separately (insert_pauses.py)."""
    span = words[-1]["e"] - words[0]["s"]
    pauses = sum(b["s"] - a["e"] for a, b in zip(words, words[1:]) if b["s"] - a["e"] >= ART_GAP_S)
    return sum(syllables(w["w"]) for w in words) / max(0.1, span - pauses)


def continuity_problems(chunks):
    """chunks: [(speed, speech rate w/s, pace target)] of one scene in order → speed band + neighbour-step problems."""
    probs = []
    for k, (speed, pace, target) in enumerate(chunks):
        if speed > SPEED_MAX + 1e-9:
            probs.append(f"chunk {k + 1} speed {speed:.2f} above {SPEED_MAX}")
        if speed < SPEED_LO - 1e-9:
            probs.append(f"chunk {k + 1} speed {speed:.2f} below {SPEED_LO}")
    for k, ((s0, p0, t0), (s1, p1, t1)) in enumerate(zip(chunks, chunks[1:])):
        if abs(s1 - s0) > SPEED_STEP_MAX + 1e-6:
            probs.append(f"chunks {k + 1}->{k + 2} speed {s0:.2f} -> {s1:.2f}")
        if t0 and t1 and abs(p1 - p0) / p0 > PACE_STEP_MAX + 1e-9:
            probs.append(f"chunks {k + 1}->{k + 2} speech rate {p0:.2f} -> {p1:.2f} syl/s")
    return probs


def generate(text, target, speed, floor, key, lo=None, hi=None):
    """Up to MAX_TRIES takes, nudging speed toward the target pace within [lo, hi] (default: speed_band(floor)).
    Returns the best (resp, words, probs, speed)."""
    band = speed_band(floor)
    lo, hi = (band[0] if lo is None else max(lo, SPEED_MIN, floor)), (band[1] if hi is None else hi)
    speed, best = min(hi, max(lo, speed)), None
    for attempt in range(1, MAX_TRIES + 1):
        resp = tts_with_timestamps(text, key, speed)
        words = refine_ends(words_from_alignment(resp["alignment"]), resp["audio_base64"])
        pace, probs = quality(words, target)
        tail = tail_artefact(words, decode(base64.b64decode(resp["audio_base64"])))
        if tail:
            probs.append(f"tail artefact at {tail[0]:.2f} s ({tail[1]:.2f} s)")    # retried like any gate failure
        print(f"    try {attempt} speed {speed:.2f}: pace {pace:.2f} w/s (target {target or '-'}) {'OK' if not probs else probs}")
        if best is None or len(probs) < len(best[2]):
            best = (resp, words, probs, speed)
        if not probs:
            break
        if target:
            speed = min(hi, max(lo, speed * target / pace))
    return best


def chunk_dir():
    return os.path.join(NARR, "chunks")


def chunk_key(sid, k, ch):
    h = hashlib.sha1(f"{ch['text']}|{ch.get('pace', PACE_TARGET)}|{VOICE}|{MODEL}|{sorted(VOICE_SETTINGS.items())}".encode()).hexdigest()[:12]
    return os.path.join(chunk_dir(), f"{sid}.c{k + 1}.{h}")


def cached_take(sid, k, ch, lo=None, hi=None):
    """A previously generated chunk take that PASSED its gates (same text, pace, voice, settings) — never re-billed.
    A take outside the speed band [lo, hi] (default SPEED_LO..SPEED_MAX) is not reused."""
    base = chunk_key(sid, k, ch)
    audio_path = next((base + ext for ext in (".mp3", ".wav") if os.path.exists(base + ext)), None)
    if os.path.exists(base + ".json") and audio_path:
        meta = json.load(open(base + ".json"))
        if quality(meta["words"], ch.get("pace", PACE_TARGET))[1]:
            return None               # passed an older gate only — regenerate under the current one
        lo = SPEED_LO if lo is None else lo
        hi = SPEED_MAX if hi is None else hi
        if not lo - 1e-6 <= meta["speed"] <= hi + 1e-6:
            return None               # outside the continuity band — regenerate
        audio = base64.b64encode(open(audio_path, "rb").read()).decode()   # ffmpeg reads wav or mp3 by content
        return ({"audio_base64": audio}, meta["words"], [], meta["speed"])
    return None


def cache_take(sid, k, ch, take):
    resp, words, probs, speed = take
    if probs:
        return
    os.makedirs(chunk_dir(), exist_ok=True)
    base = chunk_key(sid, k, ch)
    with open(base + ".mp3", "wb") as f:
        f.write(base64.b64decode(resp["audio_base64"]))
    json.dump({"words": words, "speed": speed}, open(base + ".json", "w"))


EDGE_FADE_S = 0.006       # raised-cosine fade at every chunk edge: no step into / out of the 0.25 s gap (clicks)
LEVEL_TOL_LU = 1.5        # a chunk further than this from its scene's median speech level is gained back to the median
LEVEL_FRAME_S = 0.05      # speech level = 95th percentile of 50 ms frame powers


def speech_level_db(x, rate=48000):
    """Peak speech level (dBFS): the 95th percentile of 50 ms frame powers. Pauses don't drag it down, so a one-word
    chunk and a 25 s chunk of the same voice compare fairly (a gated mean read one-word chunks ~2 dB hot)."""
    import numpy as np
    n = int(LEVEL_FRAME_S * rate)
    if x.size < n:
        return float(10 * np.log10(np.mean(x ** 2) + 1e-12))
    m = x.size // n
    return float(np.percentile(10 * np.log10(np.mean(x[:m * n].reshape(m, n) ** 2, axis=1) + 1e-12), 95))


LEVEL_REF_MIN_S = 1.0     # only chunks at least this long set the scene's reference level (one-word sign-off chunks don't)


def level_gains(levels, tol=LEVEL_TOL_LU, durations=None):
    """dB gain per chunk: 0 inside ±tol of the scene median, else the step back to the median (data-driven).
    The median comes from chunks >= LEVEL_REF_MIN_S long when durations are given; every chunk is levelled to it."""
    import statistics
    ref = [L for L, d in zip(levels, durations or [LEVEL_REF_MIN_S] * len(levels)) if d >= LEVEL_REF_MIN_S] or levels
    med = statistics.median(ref)
    return [round(med - L, 1) if abs(L - med) > tol else 0.0 for L in levels]


def edge_faded(x, rate=48000, fade_s=EDGE_FADE_S):
    """Copy of x with raised-cosine fade-in/out of fade_s at both ends."""
    import numpy as np
    n = min(int(fade_s * rate), x.size // 2)
    if n < 1:
        return x.copy()
    ramp = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, n))
    return np.concatenate([x[:n] * ramp, x[n:x.size - n], x[x.size - n:] * ramp[::-1]])


def stitch(parts, out_wav, gap_s=CHUNK_GAP_S):
    """parts: [(wav_path, words)] → one 48 kHz mono wav with gap_s silence between parts; returns merged words.
    Every part gets short edge fades; a part whose speech level is > LEVEL_TOL_LU off the scene median is gained to it."""
    import wave
    import numpy as np
    pcm = []
    for path, _ in parts:
        with wave.open(path) as w:
            pcm.append(np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(np.float64) / 32768)
    gains = level_gains([speech_level_db(x) for x in pcm], durations=[x.size / 48000 for x in pcm]) if len(parts) > 1 else [0.0]
    for k, g in enumerate(gains):
        if g:
            print(f"    chunk {k + 1}: level {g:+.1f} dB to the scene median")
    merged, t, frames = [], 0.0, []
    rate = 48000
    for i, ((path, words), x, g) in enumerate(zip(parts, pcm, gains)):
        y = np.clip(edge_faded(x * 10 ** (g / 20), rate) * 32768, -32768, 32767)
        data = np.round(y).astype("<i2").tobytes()
        if i:
            frames.append(b"\x00\x00" * int(round(gap_s * rate)))
            t += gap_s
        merged += [{"w": wd["w"], "s": round(wd["s"] + t, 3), "e": round(wd["e"] + t, 3)} for wd in words]
        frames.append(data)
        t += len(data) / 2 / rate
    with wave.open(out_wav, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(b"".join(frames))
    return merged


def main():
    key = api_key()
    if not key:
        raise SystemExit("no ELEVENLABS_API_KEY")
    script = json.load(open(os.path.join(NARR, "script.json")))
    only = set(filter(None, os.environ.get("ONLY", "").split(",")))
    # quota gate: Creator plan, no overage — worst case is every pending line retried MAX_TRIES times
    todo = [sc for sc in script["scenes"] if (sc["id"] in only) or (not only and not os.path.exists(os.path.join(NARR, f"{sc['id']}.mp3")))]
    worst = sum(len(ch["text"]) for sc in todo for k, ch in enumerate(chunks_of(sc)) if not cached_take(sc["id"], k, ch)) * MAX_TRIES
    if todo:                      # only ask the API when something will actually be generated
        sub = subscription(key)
        left = sub["character_limit"] - sub["character_count"]
        print(f"quota: {sub['tier']} {sub['character_count']}/{sub['character_limit']} used, {left} left; this run needs <= {worst}")
        if worst > left:
            raise SystemExit("quota gate: worst-case run would exceed the remaining Creator characters — stopping")
        need = sum(len(ch["text"]) for sc in todo for ch in chunks_of(sc)) * BUDGET_MARGIN
        if left < need:   # No. 05 rule (David): Creator plan, no overage — remaining >= script characters x 1.3
            raise SystemExit(f"quota gate: {left} left < {need:.0f} (script characters x {BUDGET_MARGIN}) — stopping")
    durations_path = os.path.join(NARR, "durations.json")
    durations = json.load(open(durations_path)) if os.path.exists(durations_path) else {}
    rejected = []
    for sc in script["scenes"]:
        sid = sc["id"]
        mp3 = os.path.join(NARR, f"{sid}.mp3")
        if os.path.exists(mp3) and sid not in only:
            wav = os.path.join(MIX, f"{sid}.wav")
            if not os.path.exists(wav):   # fresh checkout / interrupted run: rebuild from the paid mp3, no API call
                durations[sid] = round(mp3_to_wav(mp3, wav), 3)
                print(f"  {sid}: rebuilt {os.path.basename(wav)} from the saved mp3"
                      + (" — UNPAUSED: run insert_pauses.py before make_vo_json.py" if sc.get("pauses") else ""))
            continue                      # already paid for; never re-bill
        if only and sid not in only:
            continue
        floor = float(sc.get("floor", SPEED_MIN))
        takes = []
        for k, ch in enumerate(chunks_of(sc)):
            if len(chunks_of(sc)) > 1:
                print(f"  {sid} chunk {k + 1}: pace target {ch.get('pace', PACE_TARGET) or '-'}")
            lo, hi = speed_band(float(ch.get("floor", floor)), takes[-1][1][3] if takes else None)
            if ch.get("payoff"):            # voice preflight: the payoff is never read faster than speed 1.0
                hi = max(lo, min(hi, PAYOFF_SPEED_MAX))
            take = cached_take(sid, k, ch, lo, hi)
            if take:
                print(f"    chunk {k + 1}: cached passing take (no API call)")
            else:
                take = generate(ch["text"], ch.get("pace", PACE_TARGET), float(ch.get("speed", sc.get("speed", 1.0))),
                                float(ch.get("floor", floor)), key, lo, hi)
                if len(chunks_of(sc)) > 1:
                    cache_take(sid, k, ch, take)
            takes.append((ch, take))
        rates = [(t[3], articulation_rate(t[1]), ch.get("pace", PACE_TARGET)) for ch, t in takes]
        for k, ((s0, r0, t0), (s1, r1, t1)) in enumerate(zip(rates, rates[1:])):
            if t0 and t1 and PACE_STEP_WARN < abs(r1 - r0) / r0 <= PACE_STEP_MAX:
                print(f"  ~ {sid} chunks {k + 1}->{k + 2}: speech rate {r0:.2f} -> {r1:.2f} syl/s (listen)")
        cont = continuity_problems(rates)
        if cont and os.environ.get("ALLOW_GATE_FAIL") != "1":
            print(f"  !! {sid} REJECTED by the continuity gate: {cont} (passing chunk takes stay cached; retune pace/text)")
            rejected.append(sid)
            continue
        failed = [(k, t) for k, (ch, t) in enumerate(takes) if t[2]]
        if failed and os.environ.get("ALLOW_GATE_FAIL") != "1":
            # hard gate: keep the best attempts for listening, but never as the canonical take
            for k, (resp, words, probs, _) in failed:
                tag = f"{sid}.rejected" if len(takes) == 1 else f"{sid}.c{k + 1}.rejected"
                with open(os.path.join(NARR, f"{tag}.mp3"), "wb") as f:
                    f.write(base64.b64decode(resp["audio_base64"]))
                json.dump(words, open(os.path.join(NARR, f"{tag}.words.json"), "w"), indent=0)
                print(f"  !! {sid} chunk {k + 1} REJECTED after {MAX_TRIES} tries: {probs} (rephrase/shorten, or ALLOW_GATE_FAIL=1)")
            rejected.append(sid)
            continue
        for k, t in failed:
            print(f"  !! {sid} chunk {k + 1} accepted despite {t[2]} (ALLOW_GATE_FAIL=1)")
        wav = os.path.join(MIX, f"{sid}.wav")
        if len(takes) == 1:
            ch, (resp, words, _, speed) = takes[0]
            if sc.get("chunks"):
                sc["chunks"][0]["speed"] = round(speed, 3)
            else:
                sc["speed"] = round(speed, 3)
            with open(mp3, "wb") as f:
                f.write(base64.b64decode(resp["audio_base64"]))
            dur = mp3_to_wav(mp3, wav)
        else:
            parts = []
            for k, (ch, (resp, cwords, _, speed)) in enumerate(takes):
                ch["speed"] = round(speed, 3)
                cmp3 = os.path.join(MIX, f"{sid}.c{k + 1}.mp3")
                with open(cmp3, "wb") as f:
                    f.write(base64.b64decode(resp["audio_base64"]))
                cwav = os.path.join(MIX, f"{sid}.c{k + 1}.wav")
                mp3_to_wav(cmp3, cwav)
                parts.append((cwav, cwords))
            words = stitch(parts, wav)
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", wav, "-c:a", "libmp3lame", "-b:a", "128k", mp3], check=True)
            for k in range(len(parts)):
                for ext in ("mp3", "wav"):
                    os.remove(os.path.join(MIX, f"{sid}.c{k + 1}.{ext}"))
            dur = probe_duration(wav)
        json.dump(words, open(os.path.join(NARR, f"{sid}.words.json"), "w"), indent=0)
        durations[sid] = round(dur, 3)
        tail = dur - words[-1]["e"]
        flag = "  <-- CHECK TAIL" if tail > TAIL_LIMIT_S else ""
        print(f"  {sid}: {dur:.2f}s, {len(words)} words, tail {tail:.2f}s{flag}")
    json.dump(durations, open(durations_path, "w"), indent=2)
    json.dump(script, open(os.path.join(NARR, "script.json"), "w"), indent=2)   # remembers the speed that passed
    print("voice done:", round(sum(durations.values()), 1), "s total")
    if rejected:
        raise SystemExit(f"hard gate failed for: {', '.join(rejected)}")


if __name__ == "__main__":
    main()
