#!/usr/bin/env python3
"""Whisper round-trip for the Romanian takes (adapted from tools/dyk/whisper_diff.py, which is English-only: it strips
ă/â/î/ș/ț and parses English number words). Same rules, Romanian vocabulary:
  hedge   a Romanian hedge (cam, vreo, aproape, aproximativ, în jur de, estimează/estimare, ar putea/putea, poate…)
          lost                                                                  -> FAIL
  number  a spoken number heard as another value or as a non-number word        -> FAIL
  flip    a negation (nu, n-, niciodată, niciunul, nimic, deloc…) gained or lost -> FAIL
  listen  a risky word (script.ro.json "risky_words" + every capitalised mid-sentence word = a name) changed, a number
          not transcribed at all, probability < 0.35, gaps > 1.1 s              -> human listen
Whisper base on Romanian is far weaker than on English, so expect many listen rows; a FAIL is either re-voiced
(rephrase) or — only after a native listen (David) confirms the take is right — accepted with --accept <scene>:<word>.
Nothing is waived silently: the report lists every accepted flag.
  whisper <mp3> --model base --language ro --word_timestamps True --output_format json --output_dir ro/audit/whisper
  python3 ro/whisper_ro.py --script ro/script.ro.json --whisper-dir ro/audit/whisper --out ro/audit/WHISPER-DIFF-RO.txt
Exit 0 = no FAIL rows, 1 = FAIL rows (or a missing/empty whisper file).
"""
import argparse
import difflib
import json
import os
import re
import sys

RO = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, RO)
from ro_text import fold, tokens  # noqa: E402

HEDGES = {"cam", "vreo", "aproape", "aproximativ", "circa", "jur", "estimeaza", "estimare", "estimari", "putea",
          "poate", "probabil", "unele", "sustinut"}
NEGATIONS = {"nu", "n", "niciodata", "niciunul", "nimic", "nimeni", "nicio", "niciun", "deloc"}
LOW_PROBABILITY = 0.35
GAP_S = 1.1
FAILING = ("hedge", "number", "flip")


def scene_text(scene):
    return " ".join(c["text"] for c in scene["chunks"])


def names_in(text):
    """Capitalised words that do not start a sentence = names (folded)."""
    out, prev = set(), "."
    for w in text.split():
        core = re.sub(r"[^\wăâîșțşţ]", "", w)
        if core[:1].isupper() and not re.search(r"[.?!…:]$", prev):
            out.add(fold(core))
        prev = w
    return out


def diff_scene(ref_text, whisper_words, risky):
    heard_text = "".join(w["word"] for w in whisper_words)
    # whisper base glues Romanian article + number ("omie", "osuta"): split them before the numbers are read
    heard_text = re.sub(r"(?i)\bo(mie|mii|sut[aă])\b", r"o \1", heard_text)
    ref, hyp = tokens(ref_text), tokens(heard_text)
    flags = []
    for op, a, b, c, d in difflib.SequenceMatcher(None, ref, hyp, autojunk=False).get_opcodes():
        if op == "equal":
            continue
        rs, hs = ref[a:b], hyp[c:d]
        said, heard = " ".join(rs) or "(nothing)", " ".join(hs) or "(nothing)"
        glued = "".join(hs)                     # word-boundary-only differences ("arputea", "ca am") are not a loss
        lost = sorted(h for h in (set(rs) & HEDGES) - set(hs) if h not in glued and h not in "".join(hs[:2] + hs[1:3]))
        if lost:
            flags.append(("hedge", f"'{said}' heard as '{heard}' — hedge {lost} lost", lost))
        changed = sorted({t for t in rs if t.startswith("#")} - set(hs))
        if changed:
            flags.append(("number" if hs else "listen", f"'{said}' heard as '{heard}'", changed))
        if sum(t in NEGATIONS for t in rs) != sum(t in NEGATIONS for t in hs) and \
                "".join(rs).replace("n", "") != glued.replace("n", ""):        # "n a venit" vs "navenit": same sounds
            flags.append(("flip", f"'{said}' heard as '{heard}' — negation changed",
                          [t for t in rs + hs if t in NEGATIONS]))
        hit = set(rs) & risky
        if hit:
            flags.append(("listen", f"'{said}' heard as '{heard}' (risky/name)", sorted(hit)))
    for w in whisper_words:
        if w.get("probability", 1) < LOW_PROBABILITY:
            flags.append(("listen", f"low probability {w['probability']:.2f}: '{w['word'].strip()}' at {w['start']:.2f}", []))
    for x, y in zip(whisper_words, whisper_words[1:]):
        if y["start"] - x["end"] > GAP_S:
            flags.append(("listen", f"gap {y['start'] - x['end']:.2f} s after '{x['word'].strip()}' at {x['end']:.2f}", []))
    return flags


def whisper_words(path):
    data = json.load(open(path, encoding="utf-8"))
    words = [w for seg in data.get("segments", []) for w in seg.get("words", [])]
    if not words:
        raise ValueError("no word timestamps")
    return words, data.get("text", "")


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True)
    ap.add_argument("--whisper-dir", required=True)
    ap.add_argument("--accept", action="append", default=[])
    ap.add_argument("--out")
    a = ap.parse_args(argv)
    script = json.load(open(a.script, encoding="utf-8"))
    risky_base = {fold(r) for r in script.get("risky_words", [])}
    accepts = {tuple(x.split(":", 1)) for x in a.accept}
    lines, fails, listens, accepted = [], 0, 0, []
    for sc in script["scenes"]:
        sid, text = sc["id"], scene_text(sc)
        path = os.path.join(a.whisper_dir, f"{sid}.json")
        try:
            words, heard = whisper_words(path)
        except (OSError, ValueError) as e:
            lines.append(f"## {sid}\n  FAIL  missing/empty whisper output: {e}")
            fails += 1
            continue
        flags = diff_scene(text, words, risky_base | names_in(text))
        lines.append(f"## {sid}\n  script : {text}\n  whisper: {heard.strip()}")
        for kind, msg, cause in flags:
            if kind in FAILING and cause and all((sid, c) in accepts for c in cause):
                accepted.append(f"{sid}: {kind} {msg}")
                lines.append(f"  ACCEPTED ({kind}) {msg}")
                continue
            lines.append(f"  {'FAIL  ' if kind in FAILING else 'LISTEN'} ({kind}) {msg}")
            fails += kind in FAILING
            listens += kind not in FAILING
    status = "PASS" if not fails else "FAIL"
    head = [f"WHISPER ROUND-TRIP (ro, whisper base): {status} — {fails} FAIL row(s), {listens} LISTEN row(s), "
            f"{len(accepted)} accepted after a listen"]
    head += [f"  accepted: {x}" for x in accepted]
    report = "\n".join(head + [""] + lines)
    print(report)
    if a.out:
        open(a.out, "w", encoding="utf-8").write(report + "\n")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
