#!/usr/bin/env python3
"""YouTube packaging gate for Did You Know That? episodes — run before the files go to ~/Downloads for upload.

Every rule here is a packaging bug an episode shipped or nearly shipped:
  chapters   first chapter 0:00, ascending, >= 3 chapters, every chapter >= 10 s long (the last one too, so it starts
             >= 10 s before the end). No. 03 shipped 9:34 / 9:43 and YouTube silently dropped ALL chapters.
  clock      no m:ss anywhere except at the start of a chapter line: YouTube turns every m:ss into a jump link
             (No. 03: "It's 7:45" jumped to 7:45). Write times as words ("quarter to eight").
  link       no http:// or https:// — the site is written as plain Dexty.live
  brackets   no < or > (YouTube rejects them in descriptions)
  site       the description names Dexty.live
  length     description <= 5,000 chars; title <= 60 chars (skill rule; YouTube max 100);
             tags <= 500 chars counted as YouTube does (quotes around multi-word tags, commas between)
  title      names 2100 and the episode's core idea (--core, one or more words; any one must appear)
  tags       no empty tag (trailing comma) and no duplicate (case-insensitive)

Inputs: --packaging dir with description.txt, title.txt, tags.txt; the master duration from --timeline
(work/timeline.json, sum of shot durations) or --duration seconds; --core the core idea word(s).
Exit 0 = PASS, 1 = FAIL (report printed; --out writes it as Markdown). Missing input fails, never passes silently.
"""
import argparse
import json
import re
import sys
from pathlib import Path

DESCRIPTION_MAX = 5000
TITLE_MAX = 60                    # skill rule (YouTube's own limit is 100)
TAGS_MAX = 500
CHAPTER_MIN_S = 10
CHAPTERS_MIN = 3
FUTURE_YEAR = "2100"
CLOCK = re.compile(r"(?<![\d:])(\d{1,2}:)?\d{1,2}:\d{2}(?![\d:])")
CHAPTER_LINE = re.compile(r"^\s*((?:\d{1,2}:)?\d{1,2}:\d{2})\s+\S")
LINK = re.compile(r"https?://", re.I)
SITE = "dexty.live"


def parse_clock(text):
    """'9:34' -> 574, '1:02:03' -> 3723."""
    seconds = 0
    for part in text.split(":"):
        seconds = seconds * 60 + int(part)
    return seconds


def chapter_lines(description):
    """[(line_no, seconds, label)] for every line that starts with a timestamp."""
    out = []
    for no, line in enumerate(description.splitlines(), 1):
        m = CHAPTER_LINE.match(line)
        if m:
            out.append((no, parse_clock(m.group(1)), m.group(1)))
    return out


def check_chapters(description, duration_s):
    chapters = chapter_lines(description)
    if len(chapters) < CHAPTERS_MIN:
        return [("chapters", f"{len(chapters)} chapter line(s); YouTube needs >= {CHAPTERS_MIN}")]
    issues = []
    if chapters[0][1] != 0:
        issues.append(("chapters", f"first chapter is {chapters[0][2]}, must be 0:00"))
    for (_, a, la), (_, b, lb) in zip(chapters, chapters[1:]):
        if b <= a:
            issues.append(("chapters", f"{la} → {lb} is not ascending"))
        elif b - a < CHAPTER_MIN_S:
            issues.append(("chapters", f"{la} → {lb} only {b - a} s apart (min {CHAPTER_MIN_S} s)"))
    last = chapters[-1]
    if duration_s - last[1] < CHAPTER_MIN_S:
        issues.append(("chapters", f"last chapter {last[2]} starts {duration_s - last[1]:.1f} s before the end "
                                   f"(min {CHAPTER_MIN_S} s)"))
    return issues


def check_description(description):
    issues = []
    if len(description) > DESCRIPTION_MAX:
        issues.append(("length", f"description {len(description)} chars (max {DESCRIPTION_MAX})"))
    for no, line in enumerate(description.splitlines(), 1):
        m = CHAPTER_LINE.match(line)
        rest = line[m.end(1):] if m else line
        for clock in CLOCK.finditer(rest):
            issues.append(("clock", f"line {no}: '{clock.group(0)}' becomes a jump link — write the time in words"))
    if LINK.search(description):
        issues.append(("link", "http(s):// in the description — write the site as plain Dexty.live"))
    if "<" in description or ">" in description:
        issues.append(("brackets", "< or > in the description (YouTube rejects them)"))
    if SITE not in description.lower():
        issues.append(("site", "the description never names Dexty.live"))
    return issues


def check_title(title, core_words):
    issues = []
    if len(title) > TITLE_MAX:
        issues.append(("length", f"title {len(title)} chars (max {TITLE_MAX})"))
    if FUTURE_YEAR not in title:
        issues.append(("title", f"title does not name {FUTURE_YEAR}"))
    cores = [c.strip().lower() for c in core_words if c.strip()]
    if not cores:
        issues.append(("title", "no --core idea given — the title must name the episode's core idea"))
    elif not any(c in title.lower() for c in cores):
        issues.append(("title", f"title names none of the core idea word(s) {cores}"))
    return issues


def split_tags(text):
    return [t.strip() for t in text.strip().split(",")]


def youtube_tag_length(tags):
    """YouTube's count: each tag, +2 quotes when it contains a space, +1 comma between tags."""
    return sum(len(t) + (2 if " " in t else 0) for t in tags) + max(0, len(tags) - 1)


def check_tags(text):
    tags = split_tags(text)
    issues = []
    if any(not t for t in tags):
        issues.append(("tags", "empty tag (a stray or trailing comma becomes an empty chip)"))
    seen, dupes = set(), []
    for t in filter(None, tags):
        if t.lower() in seen:
            dupes.append(t)
        seen.add(t.lower())
    if dupes:
        issues.append(("tags", f"duplicate tag(s): {dupes}"))
    length = youtube_tag_length([t for t in tags if t])
    if length > TAGS_MAX:
        issues.append(("length", f"tags {length} chars as YouTube counts them (max {TAGS_MAX})"))
    return issues


def timeline_duration(path):
    return sum(float(entry[0]) for entry in json.loads(Path(path).read_text(encoding="utf-8")).values())


def run(packaging_dir, duration_s, core_words):
    root = Path(packaging_dir)
    texts, issues = {}, []
    for name in ("description.txt", "title.txt", "tags.txt"):
        path = root / name
        if path.is_file():
            texts[name] = path.read_text(encoding="utf-8")
        else:
            issues.append(("input", f"missing {path}"))
    if "description.txt" in texts:
        issues += check_description(texts["description.txt"]) + check_chapters(texts["description.txt"], duration_s)
    if "title.txt" in texts:
        issues += check_title(texts["title.txt"].strip(), core_words)
    if "tags.txt" in texts:
        issues += check_tags(texts["tags.txt"])
    return issues


def report(issues):
    if not issues:
        return "PACKAGING CHECK: PASS — 0 issues"
    lines = [f"PACKAGING CHECK: FAIL — {len(issues)} issue(s)", "", "| check | issue |", "|---|---|"]
    lines += [f"| {k} | {m} |" for k, m in issues]
    return "\n".join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--packaging", required=True, help="dir with description.txt, title.txt, tags.txt")
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--timeline", help="work/timeline.json (master duration = sum of shot durations)")
    src.add_argument("--duration", type=float, help="master duration in seconds")
    ap.add_argument("--core", action="append", default=[], help="core idea word(s) the title must name (repeatable)")
    ap.add_argument("--out")
    a = ap.parse_args(argv)
    duration = a.duration if a.duration is not None else timeline_duration(a.timeline)
    text = report(run(a.packaging, duration, a.core))
    print(text)
    if a.out:
        Path(a.out).write_text(text + "\n", encoding="utf-8")
    return 0 if text.startswith("PACKAGING CHECK: PASS") else 1


if __name__ == "__main__":
    sys.exit(main())
