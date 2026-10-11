#!/usr/bin/env python3
"""Breathing room in the mix, without slowing the voice or calling ElevenLabs.

For every scene in narration/script.json that has a `pauses` block, the saved take
(narration/<id>.mp3) is decoded once to 48 kHz mono, split at word boundaries taken from
narration/<id>.words.json, and silence is inserted:
  "pauses": {"min_sentence_gap": 0.35,              # after . ? ! … : top the gap up to this
             "after": [{"word": "rule:", "nth": 1, "add": 0.25}]}   # add exactly this
Writes mix/<id>.wav (the paused take used by build_final) and narration/<id>.paused.json
({dur, words} with every later word shifted), which make_vo_json.py prefers over the raw
words, so vo.json, the shot cues and the SFX cues all follow the new timing.
Idempotent: it always starts again from the paid mp3, never from its own output.
"""
import json, os, re, subprocess, wave

WORK = os.path.dirname(os.path.abspath(__file__))
NARR = os.path.join(WORK, "narration")
MIX = os.path.join(WORK, "mix")
RATE = 48000
SENTENCE_END = re.compile(r"[.?!…]$")


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


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
            if norm(w["w"]) == norm(rule["word"]):
                seen += 1
                if seen == int(rule.get("nth", 1)):
                    add[i] = add.get(i, 0) + float(rule["add"])
                    break
        else:
            raise ValueError(f"pause word {rule['word']!r}#{rule.get('nth', 1)} not found")
    return sorted((i, round(s, 3)) for i, s in add.items())


def cut_time(words, i):
    """Cut in the middle of the gap after word i, so neither word's tail is clipped."""
    return (words[i]["e"] + words[i + 1]["s"]) / 2


def shift_words(words, cuts):
    """Words with start/end moved later by every pause inserted before them."""
    out, shift, k = [], 0.0, 0
    for i, w in enumerate(words):
        out.append({"w": w["w"], "s": round(w["s"] + shift, 3), "e": round(w["e"] + shift, 3)})
        while k < len(cuts) and cuts[k][0] == i:
            shift += cuts[k][1]
            k += 1
    return out


def insert_silence(samples_in, cuts_at_s, rate=RATE, width=2):
    """samples_in: raw PCM bytes; cuts_at_s: [(time_s, seconds)] → new PCM bytes."""
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


def process(sid, cfg):
    words = json.load(open(os.path.join(NARR, f"{sid}.words.json")))
    cuts = plan_pauses(words, cfg)
    tmp = os.path.join(MIX, f"{sid}.decode.wav")
    decode(os.path.join(NARR, f"{sid}.mp3"), tmp)
    try:
        with wave.open(tmp, "rb") as r:
            params, pcm = r.getparams(), r.readframes(r.getnframes())
    finally:
        os.remove(tmp)
    pcm = insert_silence(pcm, [(cut_time(words, i), s) for i, s in cuts], params.framerate, params.sampwidth)
    with wave.open(os.path.join(MIX, f"{sid}.wav"), "wb") as w:
        w.setparams(params)
        w.writeframes(pcm)
    dur = round(len(pcm) / (params.framerate * params.sampwidth), 3)
    json.dump({"dur": dur, "words": shift_words(words, cuts)}, open(os.path.join(NARR, f"{sid}.paused.json"), "w"),
              indent=0)
    return cuts, dur


def main():
    script = json.load(open(os.path.join(NARR, "script.json")))
    for sc in script["scenes"]:
        if not sc.get("pauses"):
            continue
        cuts, dur = process(sc["id"], sc["pauses"])
        print(f"  {sc['id']}: {len(cuts)} pauses, +{sum(s for _, s in cuts):.2f}s → {dur:.2f}s")


if __name__ == "__main__":
    main()
