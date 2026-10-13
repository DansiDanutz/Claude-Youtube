#!/usr/bin/env python3
"""Pre-voice runtime estimate for a Did You Know That? episode — put this number in STORY.md, not a hand sum.

No. 03's STORY estimated 10:10 bottom-up (words / per-chunk pace + ~1.4 s per shot + sting + end screen); the master
was 10:51. Brian delivers slower than the per-chunk pace targets (measured 2.84 w/s across Nos. 02-03) and the
pauses step adds ~0.5 s per inserted pause, so the bottom-up sum runs ~6 % short. The whole-film ratio is stable:
  master seconds per script word  No. 01 0.368 (no pauses step) · No. 02 0.377 · No. 03 0.376
It already includes the hook, sting, shot lead-ins/tails, pauses, sign-off beats and the 15 s end screen.

Usage: --script work/narration/script.json, or --text <file> with the draft narration (plain words only).
--max m:ss fails (exit 1) when the estimate is over budget. Re-run whenever the script changes.
"""
import argparse
import json
import sys
from pathlib import Path

SECONDS_PER_WORD = 0.377          # Nos. 02-03 (with the pauses step), the current pipeline
BAND = 0.03                       # all three shipped masters fall inside ±3 %


def script_words(script):
    return sum(len(c.get("text", "").split()) for s in script["scenes"] for c in (s.get("chunks") or [s]))


def estimate(words):
    return words * SECONDS_PER_WORD


def clock(seconds):
    m, s = divmod(int(round(seconds)), 60)
    return f"{m}:{s:02d}"


def parse_clock(text):
    m, s = text.split(":")
    return int(m) * 60 + int(s)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--script", help="work/narration/script.json")
    src.add_argument("--text", help="plain-text draft narration")
    ap.add_argument("--max", help="runtime budget m:ss — exit 1 when the estimate is over it")
    a = ap.parse_args(argv)
    if a.script:
        words = script_words(json.loads(Path(a.script).read_text(encoding="utf-8")))
    else:
        words = len(Path(a.text).read_text(encoding="utf-8").split())
    est = estimate(words)
    print(f"{words} words → master ≈ {clock(est)} ({clock(est * (1 - BAND))}–{clock(est * (1 + BAND))}), "
          f"{SECONDS_PER_WORD} s/word measured on Nos. 01-03")
    if a.max and est > parse_clock(a.max):
        over = est - parse_clock(a.max)
        print(f"OVER BUDGET by {over:.0f} s — cut about {over / SECONDS_PER_WORD:.0f} words")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
