#!/usr/bin/env python3
"""Whisper round-trip for Did You Know That? narration — run after every voicing, before the first render.

The ElevenLabs take can say something other than the script: No. 03 lost a hedge ("said to use" was heard as
"set to use"), misread "five" and "cost", and whisper base heard "Skelton" as "Skeleton" and "rung" as "wrong".
This diffs whisper's transcript of each take against script.json, with spoken numbers and digits treated as equal
("seven forty five" == "7:45", "one point four billion" == "1.4 billion") while their VALUES are kept
("fifteen hundred" != "1600"), and flags:
  hedge    a hedge word (said, claimed, might, about, estimate…) changed or lost        -> FAIL
  number   a spoken number heard as a different value or as a non-number word            -> FAIL
  flip     a negation gained or lost ("can" -> "can't")                                 -> FAIL
  listen   a risky word changed (homophones: built-in list + script.json "risky_words" + --risky; every capitalised
           mid-sentence word counts as a name) or a number whisper did not transcribe at all
           plus words with probability < 0.35 and gaps > 1.1 s                           -> human listen, not a fail
A FAIL is fixed by re-voicing the line (rephrase it), or — when a human listen confirms whisper misheard a correct
take — accepted with --accept <scene_id>:<word> (each flag is waived only by naming its own word: the hedge, the
number as written in the script, the negation) and noted in HANDOFF.md.

Whisper JSON per scene (`whisper <mp3> --model base --word_timestamps True --output_format json`; base is cached,
never download bigger models on this disk): <whisper-dir>/<scene_id>.json with segments[].words[{word,start,end,probability}].
Exit 0 = PASS, 1 = FAIL (report printed; --out writes it). A missing whisper file, or one without word timestamps,
fails — never passes silently.
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
BREAK = "|"                                   # punctuation after a number: the number ends there
UNITS = ("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen "
         "seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety").split()
NUMBER_WORDS = set(UNITS) | {"hundred", "thousand", "million", "billion", "point", "percent"}
SCALES = {"hundred", "thousand", "million", "billion"}
HEDGES = {"said", "claimed", "claim", "claims", "might", "may", "about", "around", "roughly", "nearly", "almost",
          "perhaps", "probably", "likely", "estimate", "estimated", "estimates", "could", "reportedly", "supposedly"}
NEGATIONS = {"not", "no", "never", "nobody", "nothing", "none", "cant", "cannot", "dont", "doesnt", "didnt", "wont",
             "isnt", "wasnt", "arent", "werent", "couldnt", "shouldnt", "wouldnt", "hasnt", "havent", "hadnt"}
DEFAULT_RISKY = {"rung", "school", "said", "cost", "five"}     # No. 03 misreads / near-homophones (wrong, cool, set)
FAILING = ("hedge", "number", "flip")


UNIT_VALUES = {w: i for i, w in enumerate(UNITS[:20])}
TENS_VALUES = {w: 20 + 10 * i for i, w in enumerate(UNITS[20:])}
SCALE_VALUES = {"thousand": 10 ** 3, "million": 10 ** 6, "billion": 10 ** 9}
DIGITS = re.compile(r"^\d+(?:\.\d+)?$")


def _norm(word):
    """Lower-case letters only; a token with digits keeps its number ('7:45' -> '745', '1,500' -> '1500', '98%' -> '98')."""
    if re.search(r"\d", word):
        digits = re.sub(r"[^\d.]", "", word.replace(":", "")).strip(".")
        return digits if DIGITS.match(digits) else re.sub(r"[^\d]", "", word)
    return re.sub(r"[^a-z]", "", word.lower())


def _is_number(tok):
    return tok in NUMBER_WORDS or bool(DIGITS.match(tok))


def _join_letters(toks):
    """'o e c d' -> 'oecd' (acronyms spelled out for TTS)."""
    out, run = [], []
    for t in toks + [None]:
        if t is not None and len(t) == 1 and t.isalpha():
            run.append(t)
            continue
        out += ["".join(run)] if len(run) > 1 else run
        run = []
        if t is not None:
            out.append(t)
    return out


def _small_groups(words):
    """'seven forty five' -> [7, 45]; a group is a tens word + optional unit, or a unit/teen alone."""
    groups = []
    for w in words:
        if w in UNIT_VALUES and groups and groups[-1][1] and UNIT_VALUES[w] < 10:
            groups[-1] = (groups[-1][0] + UNIT_VALUES[w], False)
        elif w in TENS_VALUES:
            groups.append((TENS_VALUES[w], True))
        else:
            groups.append((UNIT_VALUES[w], False))
    return [g for g, _ in groups]


def _integer(words):
    """Spoken integer: 'four hundred and sixty three million' = 463000000; year/clock style 'sixteen forty seven' = 1647."""
    if not any(w in SCALES or DIGITS.match(w) for w in words):
        groups = _small_groups(words)
        return groups[0] if len(groups) == 1 else int("".join(f"{g:02d}" if i else str(g) for i, g in enumerate(groups)))
    total, current = 0, 0.0
    for w in words:
        if DIGITS.match(w):
            current += float(w)
        elif w == "hundred":
            current = (current or 1) * 100
        elif w in SCALE_VALUES:
            total, current = total + (current or 1) * SCALE_VALUES[w], 0.0
        elif w in TENS_VALUES or w in UNIT_VALUES:
            current += TENS_VALUES.get(w, UNIT_VALUES.get(w, 0))
    return total + current


def number_value(run):
    """A run of number words and/or digits -> its value as a canonical token '#463000000', '#1.4e+09', '#745'."""
    words = [w for w in run if w not in ("a", "and", "percent")]
    if "point" in words:                       # 'one point four billion'
        i = words.index("point")
        head = _integer(words[:i]) if words[:i] else 0
        j = i + 1
        while j < len(words) and (words[j] in UNIT_VALUES or words[j] in TENS_VALUES):
            j += 1                             # decimal part, read digit by digit or as a group: 'point four', 'point twelve'
        decimals = "".join(str(g) for g in _small_groups(words[i + 1:j])) or "0"   # 'twenty five' -> 25, 'two five' -> 25
        value = float(f"{head:g}.{decimals}")
        if j < len(words) and words[j] in SCALE_VALUES:
            value, j = value * SCALE_VALUES[words[j]], j + 1
        if words[j:]:                          # '... billion and a thousand'
            value += _integer(words[j:])
    else:
        value = _integer(words) if words else 0
    return NUMBER + format(float(value), ".10g")


SCALE_ORDER = {"hundred": 10 ** 2, **SCALE_VALUES}


def _remainder_follows(toks, i):
    """'and' at toks[i] joins a compound number ('two thousand and twenty four', 'four hundred and six') only when the
    number after it does not repeat the scale before it: 'two thousand and ten thousand' is a range (two numbers),
    while 'four hundred and sixty three million' is one (the larger scale multiplies the whole)."""
    scale = SCALE_ORDER.get(toks[i - 1])
    j = i + 1
    nxt, after = (toks + ["", ""])[j], (toks + ["", ""])[j + 1]
    if scale is None or not (_is_number(nxt) or (nxt == "a" and after in SCALES)):
        return False                           # 'a million and a half': no number follows the 'and'

    while j < len(toks) and (_is_number(toks[j]) or toks[j] == "a"):
        if SCALE_ORDER.get(toks[j]) == scale or (DIGITS.match(toks[j]) and float(toks[j]) >= scale):
            return False
        j += 1
    return True


def _starts_new_number(run, t):
    """A small number after a year is a separate number: '1971 one' is 1971 then 1 (not 1972), and 'nineteen seventy
    one one' is 1971 then 1 (not 197101). Year/clock style reads at most two groups ('sixteen forty seven')."""
    if not run or t not in UNIT_VALUES and t not in TENS_VALUES:
        return False
    if DIGITS.match(run[-1]):
        return True
    if any(w not in UNIT_VALUES and w not in TENS_VALUES for w in run):
        return False                           # scales, 'point', 'a', 'and': not year/clock style
    groups = _small_groups(run + [t])
    return len(groups) > 2 and groups[0] >= 10


def _collapse_numbers(toks):
    """Every run of number words / digits becomes ONE token carrying its value: 'a hundred' == '100' == '#100',
    'seven forty five' == '7:45' == '#745', but 'fifteen hundred' (#1500) != 'sixteen hundred' (#1600).
    A BREAK (punctuation after a number) ends the run and is dropped: 'seventy one, one' is #71 then #1."""
    out, run = [], []
    for i, t in enumerate(toks + [""]):
        nxt = toks[i + 1] if i + 1 < len(toks) else ""
        in_run = t and (_is_number(t) or (t == "a" and nxt in SCALES)
                        or (t == "and" and i and _remainder_follows(toks, i)))     # "two thousand and twenty four"
        if in_run and not _starts_new_number(run, t):
            run.append(t)
            continue
        if run:
            out.append(number_value(run))
            run = []
        if in_run:
            run.append(t)
        elif t and t != BREAK:
            out.append(t)
    return out


def _words(text):
    """Normalised words, with a BREAK after any number word or digits followed by punctuation ('one,' '1971,')."""
    out = []
    for w in re.sub(r"(?<=[A-Za-z])-(?=[A-Za-z])", " ", text).split():     # "nine-year-old" == "nine year old"
        t = _norm(w)
        if t:
            out.append(t)
        if re.search(r"[^\w%]$", w) and out and _is_number(out[-1]):
            out.append(BREAK)
    return out


def tokens(text):
    return _collapse_numbers(_join_letters(_words(text)))


def _span_flags(ref_span, hyp_span, risky):
    """[(kind, message, cause_tokens)] — cause_tokens are what --accept must name to waive that one flag."""
    out = []
    said, heard = " ".join(ref_span), " ".join(hyp_span) or "(nothing)"
    lost_hedges = sorted((set(ref_span) & HEDGES) - set(hyp_span))
    if lost_hedges:
        out.append(("hedge", f"'{said}' heard as '{heard}' — hedge {lost_hedges} lost", lost_hedges))
    ref_nums = [t for t in ref_span if t.startswith(NUMBER)]
    changed = sorted(set(ref_nums) - set(hyp_span))
    if changed:                                # a number not heard at all is usually alignment: listen
        out.append(("number" if hyp_span else "listen", f"'{said}' heard as '{heard}'", changed))
    negations = [t for t in ref_span + hyp_span if t in NEGATIONS]
    if sum(t in NEGATIONS for t in ref_span) != sum(t in NEGATIONS for t in hyp_span):
        out.append(("flip", f"'{said}' heard as '{heard}' — negation changed", negations))
    if set(ref_span) & risky:
        out.append(("listen", f"'{said}' heard as '{heard}'", sorted(set(ref_span) & risky)))
    return out


def diff_scene(ref_text, whisper_words, risky):
    risky = {_norm(r) for r in risky}
    ref = tokens(ref_text)
    hyp = tokens("".join(w["word"] for w in whisper_words))   # whisper words carry their own leading space;
                                                              # numbers arrive split (" 1", ".4", ",000")
    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    flags, diffs = [], []
    for op, a, b, c, d in sm.get_opcodes():
        if op == "equal":
            continue
        diffs.append((op, " ".join(ref[a:b]), " ".join(hyp[c:d])))
        flags += _span_flags(ref[a:b], hyp[c:d], risky)
    low = [(w["word"].strip(), round(w["probability"], 2)) for w in whisper_words if w["probability"] < LOW_PROBABILITY]
    gaps = [(a["word"].strip(), round(b["start"] - a["end"], 2))
            for a, b in zip(whisper_words, whisper_words[1:]) if b["start"] - a["end"] > GAP_S]
    return {"ratio": sm.ratio(), "diffs": diffs, "flags": [(k, m) for k, m, _ in flags],
            "causes": [c for _, _, c in flags], "low": low, "gaps": gaps}


def accept_key(entry):
    """'s1:five' -> 's1:#5', 's1:said' -> 's1:said' — the same normalisation as the flag's cause tokens."""
    sid, _, word = entry.partition(":")
    toks = tokens(word)
    return f"{sid}:{toks[0] if toks else ''}"


def scene_text(scene):
    return " ".join(c.get("text", "") for c in scene["chunks"]) if scene.get("chunks") else scene.get("text", "")


def whisper_words(path):
    """Word timings from a whisper JSON; ValueError when there are none (run whisper with --word_timestamps True)."""
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    words = [w for seg in data.get("segments", []) for w in seg.get("words", [])]
    if not words or any(not {"word", "start", "end", "probability"} <= set(w) for w in words):
        raise ValueError("no usable word timestamps — run whisper with --word_timestamps True")
    return words


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
        try:
            heard = whisper_words(path)
        except (ValueError, json.JSONDecodeError) as err:
            lines.append(f"== {sid}  UNUSABLE {path}: {err}")
            failing += 1
            continue
        out = diff_scene(text, heard, risky)
        lines.append(f"== {sid}  ratio {out['ratio']:.3f}")
        for (kind, msg), causes in zip(out["flags"], out["causes"]):
            ok = kind in FAILING and all(f"{sid}:{t}" in accepted for t in causes)
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
    accepted = {accept_key(x) for x in a.accept}
    lines, failing = run(script, a.whisper_dir, a.risky, accepted)
    text = "\n".join(lines)
    print(text)
    if a.out:
        Path(a.out).write_text(text + "\n", encoding="utf-8")
    return 1 if failing else 0


if __name__ == "__main__":
    sys.exit(main())
