#!/usr/bin/env python3
"""
presenter_library.py — build and audit the reusable presenter cast.

Drop source clips into media/library/presenter/source/ named after the beat they
play (dan-open.mp4, dan-point-right.mp4, …), run this, and every episode can
call them by ID:

    <PresenterFrom id="dan-point-right" at={40} side="right" />

What it does per clip: cuts the background out (tools/cutout_video.py), measures
how solid the matte actually is frame by frame, and writes the result into
media/library/presenter/manifest.json — the one file that IS committed, because
it is the contract scenes are written against. The .webm cutouts and the source
footage are build inputs/outputs and stay out of git.

Usage:
    python tools/presenter_library.py                 # ingest anything new
    python tools/presenter_library.py --rebuild       # redo every clip
    python tools/presenter_library.py --audit         # report only, no work
"""
import argparse
import datetime
import json
import os
import statistics
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
LIB = os.path.join(ROOT, "media", "library", "presenter")
SRC = os.path.join(LIB, "source")
MANIFEST = os.path.join(LIB, "manifest.json")
CUTOUT = os.path.join(HERE, "cutout_video.py")
MATTE_BIN = os.path.join(HERE, "matte", "person-matte")

VIDEO_EXT = (".mp4", ".mov", ".m4v", ".webm")

# A clip whose matte collapses on some frames renders as a ghost. Below this
# share of the clip's own median coverage, the subject has effectively vanished.
DROPOUT_RATIO = 0.55
# Above this share of bad frames the clip is not safe to use as-is.
REJECT_PCT = 8.0


def run(cmd, **kw):
    p = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if p.returncode != 0:
        raise RuntimeError((p.stderr or p.stdout).strip()[:600])
    return p


def probe(path, entries, stream="v:0"):
    p = run(["ffprobe", "-v", "error", "-select_streams", stream,
             "-show_entries", entries, "-of", "default=nw=1:nk=1", path])
    return p.stdout.strip().splitlines()


def matte_quality(source):
    """Per-frame subject coverage, so we know which clips are actually usable.

    Runs the segmenter once more over the source and reads the average luma of
    every matte frame. A frame far below the clip's own median is one where
    Vision lost the subject — that is exactly the frame that renders as a
    translucent smear, and the thing worth catching before a clip ships.
    """
    tmp = os.path.join(LIB, ".audit.matte.mov")
    try:
        run([MATTE_BIN, source, tmp, "accurate"])
        p = subprocess.run(
            ["ffmpeg", "-v", "info", "-i", tmp, "-vf", "signalstats,metadata=print:key=lavfi.signalstats.YAVG",
             "-f", "null", "-"], capture_output=True, text=True)
        vals = [float(l.split("=")[-1]) for l in (p.stderr or "").splitlines()
                if "signalstats.YAVG" in l]
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)

    if not vals:
        return {"frames": 0, "coverage": 0.0, "dropouts": 0, "dropoutPct": 100.0}

    med = statistics.median(vals)
    bad = sum(1 for v in vals if med > 0 and v < med * DROPOUT_RATIO)
    return {
        "frames": len(vals),
        "coverage": round(med / 255.0, 4),
        "dropouts": bad,
        "dropoutPct": round(bad / len(vals) * 100, 1),
    }


def beat_of(stem):
    """dan-point-right -> point-right. Keeps the person prefix out of the beat."""
    return stem.split("-", 1)[1] if "-" in stem else stem


def load_manifest():
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as f:
            return json.load(f)
    return {"version": 1, "clips": []}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rebuild", action="store_true", help="re-cut every clip, not just new ones")
    ap.add_argument("--audit", action="store_true", help="report quality only, change nothing")
    ap.add_argument("--quality", default="accurate", choices=["fast", "balanced", "accurate"])
    a = ap.parse_args()

    os.makedirs(SRC, exist_ok=True)
    sources = sorted(f for f in os.listdir(SRC) if f.lower().endswith(VIDEO_EXT))
    if not sources:
        print(f"no source clips yet — drop footage into {os.path.relpath(SRC, ROOT)}/")
        print("name each file after the beat it plays, e.g. dan-open.mp4, dan-point-right.mp4")
        return

    man = load_manifest()
    by_id = {c["id"]: c for c in man["clips"]}
    today = datetime.date.today().isoformat()
    problems = []

    for fn in sources:
        stem = os.path.splitext(fn)[0]
        src = os.path.join(SRC, fn)
        webm = os.path.join(LIB, f"{stem}.webm")
        fresh = a.rebuild or not os.path.exists(webm)

        if a.audit:
            fresh = False
        elif fresh:
            print(f"\n▶ cutting {fn}")
            r = subprocess.run([sys.executable, CUTOUT, src, "--out-dir", LIB,
                                "--quality", a.quality, "--no-mov"],
                               capture_output=True, text=True)
            if r.returncode != 0:
                print(f"  ! failed: {(r.stderr or r.stdout).strip()[:300]}")
                problems.append((stem, "cutout failed"))
                continue
            for line in r.stdout.splitlines():
                if line.strip().startswith(("matte:", "crop", "✓")):
                    print("  " + line.strip())

        if not os.path.exists(webm):
            continue

        entry = by_id.get(stem, {})
        if fresh or "quality" not in entry:
            q = matte_quality(src)
        else:
            q = entry["quality"]

        w, h = (int(v) for v in probe(webm, "stream=width,height")[:2])
        dur = float(probe(webm, "stream=duration")[0]) if probe(webm, "stream=duration") else 0.0

        by_id[stem] = {
            "id": stem,
            "file": f"{stem}.webm",
            "source": f"source/{fn}",
            "beat": beat_of(stem),
            "durationSeconds": round(dur, 2),
            "width": w,
            "height": h,
            "quality": q,
            "usable": q["dropoutPct"] <= REJECT_PCT,
            "added": entry.get("added", today),
        }
        if q["dropoutPct"] > REJECT_PCT:
            problems.append((stem, f"{q['dropoutPct']}% of frames lose the subject"))

    man["clips"] = [by_id[k] for k in sorted(by_id)]
    man["generated"] = today
    if not a.audit:
        with open(MANIFEST, "w", encoding="utf-8") as f:
            json.dump(man, f, indent=2)
            f.write("\n")

    print(f"\n{'BEAT':<18}{'ID':<24}{'DUR':>7}{'SIZE':>12}{'DROPOUTS':>11}  STATUS")
    for c in man["clips"]:
        q = c["quality"]
        status = "ok" if c["usable"] else "RE-SHOOT"
        print(f"{c['beat']:<18}{c['id']:<24}{c['durationSeconds']:>6.1f}s"
              f"{c['width']}x{c['height']:>7}{q['dropoutPct']:>10}%  {status}")

    if problems:
        print("\nneeds attention:")
        for stem, why in problems:
            print(f"  · {stem}: {why}")
        print("\nA clip fails when the segmenter loses the subject on too many frames —")
        print("usually low contrast against the background, or the subject leaving frame.")
    if not a.audit:
        print(f"\nmanifest: {os.path.relpath(MANIFEST, ROOT)}  ({len(man['clips'])} clips)")


if __name__ == "__main__":
    main()
