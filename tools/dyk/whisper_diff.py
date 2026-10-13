#!/usr/bin/env python3
"""Whisper round-trip for Did You Know That? narration — run after every voicing, before the first render.

The ElevenLabs take can say something other than the script: No. 03 lost a hedge ("said to use" was heard as
"set to use"), misread "five" and "cost", and whisper base heard "Skelton" as "Skeleton" and "rung" as "wrong".
This diffs whisper's transcript of each take against script.json, with spoken numbers and digits treated as equal
("seven forty five" == "7:45", "one point four" == "1.4"), and flags:
  hedge    a hedge word (said, claimed, might, about, estimate…) changed or lost        -> FAIL
  number   a spoken number heard as a non-number word, or not heard at all              -> FAIL
  flip     a negation gained or lost ("can" -> "can't")                                 -> FAIL
  listen   a risky word changed (homophones: built-in list + script.json "risky_words" + --risky; every capitalised
           mid-sentence word counts as a name) or a number whisper did not transcribe at all
           plus words with probability < 0.35 and gaps > 1.1 s                           -> human listen, not a fail
A FAIL is fixed by re-voicing the line (rephrase it), or — when a human listen confirms whisper misheard a correct
take — accepted with --accept <scene_id>:<word> and noted in HANDOFF.md.

Whisper JSON per scene (`whisper <mp3> --model base --word_timestamps True --output_format json`; base is cached,
never download bigger models on this disk): <whisper-dir>/<scene_id>.json with segments[].words[{word,start,end,probability}].
Exit 0 = PASS, 1 = FAIL (report printed; --out writes it). A missing whisper file fails, never passes silently.
"""
import argparse
import difflib
import json
import re
import sys
from pathlib import Path

LOW_PROBABILITY = 0.35
GAP_S = 1.1
NUMBER = "#"
UNITS = ("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen "
         "seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety").split()
NUMBER_WORDS = set(UNITS) | {"hundred", "thousand", "million", "billion", "point", "percent", NUMBER}
SCALES = {"hundred", "thousand", "million", "billion"}
HEDGES = {"said", "claimed", "claim", "claims", "might", "may", "about", "around", "roughly", "nearly", "almost",
          "perhaps", "probably", "likely", "estimate", "estimated", "estimates", "could", "reportedly", "supposedly"}
NEGATIONS = {"not", "no", "never", "nobody", "nothing", "none", "cant", "cannot", "dont", "doesnt", "didnt", "wont",
             "isnt", "wasnt", "arent", "werent", "couldnt", "shouldnt", "wouldnt", "hasnt", "havent", "hadnt"}
DEFAULT_RISKY = {"rung", "school", "said", "cost", "five"}     # No. 03 misreads / near-homophones (wrong, cool, set)
FAILING = ("hedge", "number", "flip")


def _norm(word):
    return NUMBER if re.search(r"\d", word) else re.sub(r"[^a-z]", "", word.lower())


def _join_letters(toks):
    """'o e c d' -> 'oecd' (acronyms spelled out for TTS)."""
    out, run = [], []
    for t in toks + [None]:
        if t is not None and len(t) == 1 and t != NUMBER:
            run.append(t)
            continue
        out += ["".join(run)] if len(run) > 1 else run
        run = []
        if t is not None:
            out.append(t)
    return out


def _collapse_numbers(toks):
    """Every run of number words / digits ('a hundred', 'one point four billion', '98 percent') -> one '#'."""
    out = []
    for i, t in enumerate(toks):
        nxt = toks[i + 1] if i + 1 < len(toks) else ""
        is_num = (t in NUMBER_WORDS or (t == "a" and nxt in SCALES)
                  or (t == "and" and i and toks[i - 1] in SCALES and nxt in NUMBER_WORDS))   # "four hundred and six"
        if is_num:
            if not out or out[-1] != NUMBER:
                out.append(NUMBER)
        else:
            out.append(t)
    return out


def tokens(text):
    return _collapse_numbers(_join_letters([t for t in (_norm(w) for w in text.split()) if t]))


def _span_flags(ref_span, hyp_span, risky):
    out = []
    said, heard = " ".join(ref_span), " ".join(hyp_span) or "(nothing)"
    lost_hedges = (set(ref_span) & HEDGES) - set(hyp_span)
    if lost_hedges:
        out.append(("hedge", f"'{said}' heard as '{heard}' — hedge {sorted(lost_hedges)} lost"))
    if NUMBER in ref_span and NUMBER not in hyp_span:     # a dropped number is usually alignment: listen
        out.append(("number" if hyp_span else "listen", f"'{said}' heard as '{heard}'"))
    if sum(t in NEGATIONS for t in ref_span) != sum(t in NEGATIONS for t in hyp_span):
        out.append(("flip", f"'{said}' heard as '{heard}' — negation changed"))
    if set(ref_span) & risky:
        out.append(("listen", f"'{said}' heard as '{heard}'"))
    return out, ref_span


def diff_scene(ref_text, whisper_words, risky):
    risky = {_norm(r) for r in risky}
    ref = tokens(ref_text)
    hyp = tokens(" ".join(w["word"] for w in whisper_words))
    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    flags, diffs = [], []
    for op, a, b, c, d in sm.get_opcodes():
        if op == "equal":
            continue
        diffs.append((op, " ".join(ref[a:b]), " ".join(hyp[c:d])))
        found, span = _span_flags(ref[a:b], hyp[c:d], risky)
        flags += [(kind, msg, span) for kind, msg in found]
    low = [(w["word"].strip(), round(w["probability"], 2)) for w in whisper_words if w["probability"] < LOW_PROBABILITY]
    gaps = [(a["word"].strip(), round(b["start"] - a["end"], 2))
            for a, b in zip(whisper_words, whisper_words[1:]) if b["start"] - a["end"] > GAP_S]
    return {"ratio": sm.ratio(), "diffs": diffs, "flags": [(k, m) for k, m, _ in flags],
            "spans": [s for _, _, s in flags], "low": low, "gaps": gaps}


def scene_text(scene):
    return " ".join(c.get("text", "") for c in scene["chunks"]) if scene.get("chunks") else scene.get("text", "")


def whisper_words(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return [w for seg in data.get("segments", []) for w in seg.get("words", [])]


def proper_nouns(text):
    """Capitalised words that do not start a sentence — names whisper base often mishears (Skelton -> Skeleton)."""
    words = text.split()
    return {_norm(w) for prev, w in zip([""] + words, words)
            if w[:1].isupper() and prev and not re.search(r"[.?!…:]$", prev) and len(_norm(w)) > 2}


def run(script, whisper_dir, risky, accepted):
    lines, failing = [], 0
    risky = set(risky) | DEFAULT_RISKY | set(script.get("risky_words", []))
    risky |= {n for scene in script["scenes"] for n in proper_nouns(scene_text(scene))}
    for scene in script["scenes"]:
        sid, text = scene["id"], scene_text(scene)
        if not text.strip():
            continue
        path = Path(whisper_dir) / f"{sid}.json"
        if not path.is_file():
            lines.append(f"== {sid}  MISSING {path} — run whisper on this take")
            failing += 1
            continue
        out = diff_scene(text, whisper_words(path), risky)
        lines.append(f"== {sid}  ratio {out['ratio']:.3f}")
        for (kind, msg), span in zip(out["flags"], out["spans"]):
            ok = kind in FAILING and any(f"{sid}:{t}" in accepted for t in span)
            state = "accepted" if ok else ("FAIL" if kind in FAILING else "LISTEN")
            failing += state == "FAIL"
            lines.append(f"   {state:8s} {kind:7s} {msg}")
        lines += [f"   diff {x}" for x in out["diffs"]]
        if out["low"]:
            lines.append(f"   LISTEN   low-p   {out['low']}")
        if out["gaps"]:
            lines.append(f"   LISTEN   gaps    {out['gaps']}")
    head = f"WHISPER DIFF: {'PASS' if not failing else f'FAIL — {failing} issue(s)'}"
    return [head, ""] + lines, failing


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--script", required=True, help="work/narration/script.json")
    ap.add_argument("--whisper-dir", required=True, help="dir with <scene_id>.json whisper outputs")
    ap.add_argument("--risky", action="append", default=[], help="extra risky word (repeatable)")
    ap.add_argument("--accept", action="append", default=[], help="<scene_id>:<word> confirmed correct by a human listen")
    ap.add_argument("--out")
    a = ap.parse_args(argv)
    script = json.loads(Path(a.script).read_text(encoding="utf-8"))
    accepted = {f"{x.split(':', 1)[0]}:{_norm(x.split(':', 1)[-1])}" for x in a.accept}
    lines, failing = run(script, a.whisper_dir, a.risky, accepted)
    text = "\n".join(lines)
    print(text)
    if a.out:
        Path(a.out).write_text(text + "\n", encoding="utf-8")
    return 1 if failing else 0


if __name__ == "__main__":
    sys.exit(main())
