#!/usr/bin/env python3
"""Romanian timing for the picture (DYK No. 05, Romanian pilot).

The shots (remotion/src/shots/dyk-05/*.tsx) and the SFX cue table (work/cues.py + cue_parts/) key every visual event
to ENGLISH words, so Romanian words are never fed to them. Instead:
  ro/vo.ro.json       the English vo.json, each scene's word times warped chunk by chunk onto the Romanian take:
                      English chunk n -> Romanian chunk n, linear inside the chunk (first English word onset = first
                      Romanian word onset, last English word end = last Romanian word end); `dur` = Romanian scene
                      duration (the paused mix). Word count, order and text are the English ones.
  ro/vo.ro.true.json  the REAL Romanian words and times (paused takes) — for the voice pre-flight on the true take.
Also brings ro/narration/durations.json in step with the paused takes (make_timeline_ro.py reads it).
Chunk boundaries come from the chunk texts' whitespace word counts on both sides (the same rule as insert_pauses.py
and voice_preflight.chunk_words); a mismatch with the take's word count stops the run.
Run:  python3 videos/dyk-05-food/ro/make_vo_ro.py
"""
import json
import os
import wave

RO = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(RO, "..", "..", ".."))
NARR = os.path.join(RO, "narration")
MIX = os.path.join(RO, "mix")
EN_SCRIPT = os.path.join(RO, "..", "work", "narration", "script.json")
EN_VO = os.path.join(ROOT, "remotion", "src", "shots", "dyk-05", "vo.json")
RO_SCRIPT = os.path.join(RO, "script.ro.json")
OUT_WARPED = os.path.join(RO, "vo.ro.json")
OUT_TRUE = os.path.join(RO, "vo.ro.true.json")
DUR_TOL_S = 0.02


def chunk_texts(scene):
    return [c["text"] for c in (scene.get("chunks") or [scene])]


def slices(texts):
    """[(first, end)] word-index range of each chunk."""
    out, i = [], 0
    for t in texts:
        n = len(t.split())
        out.append((i, i + n))
        i += n
    return out


def warp_scene(en_words, en_texts, ro_words, ro_texts):
    """English words with times mapped chunk by chunk onto the Romanian take (pure function)."""
    en_sl, ro_sl = slices(en_texts), slices(ro_texts)
    if len(en_sl) != len(ro_sl):
        raise ValueError(f"{len(en_sl)} English chunks vs {len(ro_sl)} Romanian chunks")
    if en_sl[-1][1] != len(en_words) or ro_sl[-1][1] != len(ro_words):
        raise ValueError(f"word counts: EN take {len(en_words)} vs text {en_sl[-1][1]}, "
                         f"RO take {len(ro_words)} vs text {ro_sl[-1][1]}")
    out = []
    for (a, b), (c, d) in zip(en_sl, ro_sl):
        e0, e1 = en_words[a]["s"], en_words[b - 1]["e"]
        r0, r1 = ro_words[c]["s"], ro_words[d - 1]["e"]
        scale = (r1 - r0) / (e1 - e0) if e1 > e0 else 0.0
        at = lambda t: round(r0 + (t - e0) * scale, 3)
        out += [{"w": w["w"], "s": at(w["s"]), "e": at(w["e"])} for w in en_words[a:b]]
    return out


def wav_seconds(path):
    with wave.open(path, "rb") as w:
        return w.getnframes() / w.getframerate()


def ro_take(scene):
    """Romanian {dur, words} for a scene: the paused take (checked against its mix wav and pause settings)."""
    sid = scene["id"]
    raw = os.path.join(NARR, f"{sid}.words.json")
    if scene.get("pauses"):
        paused = os.path.join(NARR, f"{sid}.paused.json")
        if not os.path.exists(paused) or os.path.getmtime(paused) < os.path.getmtime(raw):
            raise SystemExit(f"{sid}: run insert_pauses_ro.py first (paused take missing or older than the words)")
        take = json.load(open(paused, encoding="utf-8"))
        if take.get("pauses") != scene["pauses"]:
            raise SystemExit(f"{sid}: pause settings changed since the paused take — run insert_pauses_ro.py again")
    else:
        take = {"words": json.load(open(raw, encoding="utf-8")), "dur": None}
    mix_s = wav_seconds(os.path.join(MIX, f"{sid}.wav"))
    if take["dur"] is not None and abs(mix_s - take["dur"]) > DUR_TOL_S:
        raise SystemExit(f"{sid}: mix/{sid}.wav ({mix_s:.3f} s) does not match the paused take ({take['dur']} s)")
    return {"dur": round(mix_s if take["dur"] is None else take["dur"], 3), "words": take["words"]}


def main():
    en_script = json.load(open(EN_SCRIPT, encoding="utf-8"))
    ro_script = json.load(open(RO_SCRIPT, encoding="utf-8"))
    en_vo = json.load(open(EN_VO, encoding="utf-8"))
    ro_scenes = {sc["id"]: sc for sc in ro_script["scenes"]}
    warped, true = {}, {}
    for sc in en_script["scenes"]:
        sid = sc["id"]
        take = ro_take(ro_scenes[sid])
        true[sid] = take
        warped[sid] = {"dur": take["dur"], "words": warp_scene(en_vo[sid]["words"], chunk_texts(sc),
                                                               take["words"], chunk_texts(ro_scenes[sid]))}
    json.dump(warped, open(OUT_WARPED, "w"), separators=(",", ":"))
    json.dump(true, open(OUT_TRUE, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    dpath = os.path.join(NARR, "durations.json")
    durations = json.load(open(dpath)) if os.path.exists(dpath) else {}
    json.dump({**durations, **{k: v["dur"] for k, v in true.items()}}, open(dpath, "w"), indent=2)
    en_total = sum(v["dur"] for v in en_vo.values())
    ro_total = sum(v["dur"] for v in true.values())
    print(f"vo.ro.json + vo.ro.true.json: {len(warped)} scenes; voice {ro_total:.1f} s (EN {en_total:.1f} s, "
          f"x{ro_total / en_total:.3f})")


if __name__ == "__main__":
    main()
