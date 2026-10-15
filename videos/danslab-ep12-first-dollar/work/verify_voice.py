#!/usr/bin/env python3
"""Whisper-verify generated narration against narration/script.json (local openai-whisper, cached model).

Checks per line (skill gate "whisper every new VO line — lang + text match"):
  - detected language is English
  - word similarity between heard text and script text (numbers normalised both ways)
  - TAIL check: the last 5 heard words must match the script tail — catches ElevenLabs
    hallucinated tails (extra garbled speech after the scripted text), which window scans miss.
Usage: python3.13 verify_voice.py [--model base] [--only dol01,dol02]
Writes verify/<id>.json (whisper output) and verify/REPORT.md. Exit 1 if any line is flagged."""
import difflib, json, os, re, subprocess, sys

WORK = os.path.dirname(os.path.abspath(__file__))
MIX, OUTD = os.path.join(WORK, "mix"), os.path.join(WORK, "verify")
MODEL = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else "base"
ONLY = sys.argv[sys.argv.index("--only") + 1].split(",") if "--only" in sys.argv else None
SIM_MIN, TAIL_N = 0.90, 5

ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
ORD = {"first": "1st", "second": "2nd", "third": "3rd"}


def words(n: int) -> str:
    if n < 20:
        return ONES[n]
    if n < 100:
        return TENS[n // 10] + ("" if n % 10 == 0 else " " + ONES[n % 10])
    if n < 1000:
        return ONES[n // 100] + " hundred" + ("" if n % 100 == 0 else " and " + words(n % 100))
    return words(n // 1000) + " thousand" + ("" if n % 1000 == 0 else " " + words(n % 1000))


def norm(text: str) -> list[str]:
    t = text.lower().replace("’", "'").replace("—", " ").replace("–", " ")
    t = re.sub(r"(\d+(?:\.\d+)?)\s*%", r"\1 percent", t)
    t = re.sub(r"\$1\b", "one dollar", t)
    t = re.sub(r"\$(\d+)", r"\1 dollars", t)
    # spelling variants whisper uses for correctly spoken words (same sound, different spelling)
    for a, b in (("dan's lab", "danslab"), ("wanna", "want to"), ("stable coins", "stablecoins"), ("charge backs", "chargebacks"),
                 ("busy work", "busywork"), ("open claw", "openclaw"), ("nervics", "nervix"), ("kimmy", "kimi"),
                 ("z code", "zcode"), ("grockbot", "grokbot"), ("midhand", "mid hand"), ("cents worth", "cent's worth")):
        t = t.replace(a, b)
    t = re.sub(r"(\d+)(st|nd|rd|th)\b", r"\1", t)          # 24th → 24 (script says "twenty-fourth")
    t = re.sub(r"(\d),(\d{3})", r"\1\2", t)
    t = re.sub(r"\d+", lambda m: words(int(m.group())), t)
    t = re.sub(r"\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-", r"\1 ", t)
    t = t.replace("fourth", "four").replace("sixth", "six").replace("twelfth", "twelve")
    t = re.sub(r"\b(nervix)\s*pay\b", "nervixpay", t)
    t = re.sub(r"u\.?\s*s\.?\s*d\.?\s*([ct])\b", r"usd\1", t)
    t = re.sub(r"[^a-z0-9' ]+", " ", t).replace(" and ", " ")
    return [w.strip("'") for w in t.split() if w.strip("'") and w != "and"]


def main() -> int:
    os.makedirs(OUTD, exist_ok=True)
    scenes = json.load(open(os.path.join(WORK, "narration", "script.json")))["scenes"]
    todo = [s for s in scenes if os.path.exists(os.path.join(MIX, f"{s['id']}.wav")) and (not ONLY or s["id"] in ONLY)]
    need = [s for s in todo if not os.path.exists(os.path.join(OUTD, f"{s['id']}.json"))]
    if need:  # one whisper process for all files: the model loads once
        subprocess.run(["whisper", *[os.path.join(MIX, f"{s['id']}.wav") for s in need], "--model", MODEL,
                        "--output_format", "json", "--output_dir", OUTD, "--fp16", "False",
                        "--temperature", "0", "--condition_on_previous_text", "False"],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    rows, flagged = [], 0
    for s in todo:
        j = json.load(open(os.path.join(OUTD, f"{s['id']}.json")))
        heard, want = norm(j["text"]), norm(s["text"])
        sim = difflib.SequenceMatcher(None, want, heard).ratio()
        tail_ok = difflib.SequenceMatcher(None, want[-TAIL_N:], heard[-TAIL_N:]).ratio() >= 0.8
        extra = len(heard) - len(want)
        ok = j.get("language") == "en" and sim >= SIM_MIN and tail_ok
        flagged += not ok
        diff = [f"{op}: '{' '.join(want[a1:a2])}' → '{' '.join(heard[b1:b2])}'"
                for op, a1, a2, b1, b2 in difflib.SequenceMatcher(None, want, heard).get_opcodes() if op != "equal"]
        rows.append((s["id"], j.get("language"), sim, tail_ok, extra, ok, diff, " ".join(heard[-TAIL_N:])))
    with open(os.path.join(OUTD, "REPORT.md"), "w") as fh:
        fh.write(f"# Voice verification — whisper `{MODEL}`\n\n| id | lang | similarity | tail | Δwords | result |\n|---|---|---:|---|---:|---|\n")
        for i, lang, sim, tail, ex, ok, _, _ in rows:
            fh.write(f"| {i} | {lang} | {sim:.3f} | {'ok' if tail else 'MISMATCH'} | {ex:+d} | {'PASS' if ok else '**FLAG**'} |\n")
        fh.write("\n## Differences (script → heard)\n\n")
        for i, *_, diff, tail in rows:
            if diff:
                fh.write(f"- **{i}** (tail heard: '{tail}'): " + "; ".join(diff[:8]) + "\n")
    for i, lang, sim, tail, ex, ok, diff, _ in rows:
        print(f"{i:7} {lang} sim={sim:.3f} tail={'ok' if tail else 'MISMATCH'} Δ={ex:+d} {'PASS' if ok else 'FLAG'}  " + ("; ".join(diff[:3]))[:150])
    print(f"\n{len(rows) - flagged}/{len(rows)} pass · report: {os.path.join(OUTD, 'REPORT.md')}")
    return 1 if flagged else 0


if __name__ == "__main__":
    sys.exit(main())
