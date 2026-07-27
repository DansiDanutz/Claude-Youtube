#!/usr/bin/env python3
"""Build a consistent, upload-ready delivery set from the episode masters.

Why this exists
---------------
An audit of all 11 episodes on 2026-07-27 found the masters are internally
inconsistent in ways that are invisible on disk but audible on YouTube:

  1. MONO masters.   ep10 (3 files) and ep11 (2 files) carry a 1-channel AAC
     track. Every other episode is stereo. Mono plays centre-only and sounds
     obviously different mid-binge.
  2. LOUDNESS SPREAD. Integrated loudness ranges -14.2 LUFS (ep01, ep02) to
     -16.2 LUFS (ep11) — a 2.0 LU swing. YouTube normalises *down* to -14 but
     does not lift quieter content, so ep11 lands audibly softer than ep01.
  3. HOT TRUE PEAK.  ep02 peaks at -0.4 dBTP. A lossy transcode can push that
     past 0 dBFS and clip.
  4. NO FASTSTART.   8 of 15 files keep `moov` after `mdat`.

This writes a NEW delivery file per master. It never modifies or deletes a
master — the source files are opened read-only.

What it does per file
---------------------
  video : STREAM COPY. No re-encode, no generation loss, no quality change.
  audio : one AAC re-encode at 256k, forced stereo 48 kHz, loudnorm to
          I=-14 LUFS / TP=-1.0 dBTP / LRA=11 (the YouTube delivery target).
  mp4   : +faststart so moov leads.

The single audio generation is deliberate and unavoidable: the lossless mix
WAVs were pruned (see WORKFLOW.md), and YouTube re-encodes on ingest anyway.
256k AAC from a ~210k source is transparent for this content.

Usage:  python3 tools/make_delivery.py [--dry-run] [--only ep09]
"""
import json
import os
import re
import subprocess
import sys

ARCHIVE = os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/Project Archives/"
    "Claude-Youtube/source-2026-07-27"
)
SCRATCH = os.path.expanduser("~/Projects/Claude-Youtube/.delivery-tmp")
OUT_DIR = f"{ARCHIVE}/delivery"

I, TP, LRA = "-14", "-1.0", "11"
ABR = "256k"

DRY = "--dry-run" in sys.argv
ONLY = None
if "--only" in sys.argv:
    ONLY = sys.argv[sys.argv.index("--only") + 1]

# A delivery file must be an EPISODE master, and must carry a resolution token.
#
# The inclusion rule is deliberate. An exclusion-only list let three classes of
# file through on the first run, any of which could have been uploaded by mistake:
#   - danslab-episode-01-origin.mp4 / -02-survivors.mp4 — older unsuffixed cuts
#     (ep01's is 9:58 against the current 10:19), which look canonical because
#     they carry no version suffix at all;
#   - final.mp4 from danslab-profile / danslab-story — 1:26 standalone pieces;
#   - danslab-presentation.mp4 — a channel piece, not a numbered episode.
EPISODE = re.compile(r"^danslab-episode-\d{2}-[a-z]+.*-(1080P|4K)")
SKIP = re.compile(r"SUPERSEDED|-v1\.")


def probe(f, entries, stream=None):
    cmd = ["ffprobe", "-v", "error"]
    if stream:
        cmd += ["-select_streams", stream]
    cmd += ["-show_entries", entries, "-of", "csv=p=0", f]
    return subprocess.run(cmd, capture_output=True, text=True).stdout.strip().rstrip(",")


def dur(f):
    try:
        return float(probe(f, "format=duration") or 0)
    except ValueError:
        return 0.0


def loudness(f):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f,
                        "-af", "ebur128=peak=true", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    tail = r[r.rfind("Integrated loudness"):]
    m = re.search(r"I:\s+(-?[\d.]+) LUFS", tail)
    p = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", tail)
    return (float(m.group(1)) if m else None, float(p[-1]) if p else None)


def is_cloud(f):
    out = subprocess.run(["ls", "-lO", f], capture_output=True, text=True).stdout.split()
    return len(out) > 4 and "dataless" in out[4]


def collect():
    jobs = []
    for d in sorted(os.listdir(f"{ARCHIVE}/videos")):
        p = f"{ARCHIVE}/videos/{d}"
        if not os.path.isdir(p) or not d.startswith("danslab"):
            continue
        if ONLY and ONLY not in d:
            continue
        for fn in sorted(os.listdir(p)):
            if not fn.endswith(".mp4"):
                continue
            if not EPISODE.match(fn) or SKIP.search(fn):
                continue
            jobs.append((d, fn, f"{p}/{fn}"))
    return jobs


def main():
    jobs = collect()
    if not DRY:
        os.makedirs(OUT_DIR, exist_ok=True)
        os.makedirs(SCRATCH, exist_ok=True)

    print(f"{'FILE':<48}{'BEFORE':>22}   {'AFTER':>22}")
    print("-" * 96)
    failures = []

    for d, fn, src in jobs:
        if is_cloud(src):
            print(f"{fn[:46]:<48}{'cloud-only — rehydrating':>22}")
            subprocess.run(["brctl", "download", src])

        li, lp = loudness(src)
        ch = probe(src, "stream=channels", "a:0")
        sd = dur(src)
        before = f"{li} LUFS {lp} TP {ch}ch"

        if DRY:
            print(f"{fn[:46]:<48}{before:>22}   {'(dry run)':>22}")
            continue

        tmp = f"{SCRATCH}/{fn}"
        # Measure -> gain -> verify with the SAME meter, correcting any residual.
        #
        # loudnorm was tried first and rejected: single-pass landed -14.8 and
        # two-pass -14.6 against a -14.0 ask, because loudnorm's internal gating
        # does not agree with the ebur128 meter used to verify. Chasing that
        # disagreement leaves the series as uneven as it started. A flat gain
        # measured by ebur128 and checked by ebur128 converges exactly; the
        # limiter afterwards is what enforces the true-peak ceiling.
        target = float(I)
        gain = target - li
        for attempt in range(3):
            r = subprocess.run([
                "ffmpeg", "-y", "-v", "error", "-i", src,
                "-c:v", "copy",
                "-af", (f"aformat=channel_layouts=stereo,volume={gain:.2f}dB,"
                        f"alimiter=limit={10 ** (float(TP) / 20):.4f}:level=disabled"),
                "-c:a", "aac", "-b:a", ABR, "-ar", "48000", "-ac", "2",
                "-movflags", "+faststart", tmp,
            ])
            if r.returncode != 0 or not os.path.exists(tmp):
                break
            got, _ = loudness(tmp)
            if got is None or abs(got - target) <= 0.3:
                break
            gain += target - got          # residual correction, then re-render
        if r.returncode != 0 or not os.path.exists(tmp):
            failures.append((fn, f"ffmpeg rc={r.returncode}"))
            print(f"{fn[:46]:<48}{before:>22}   {'FAILED':>22}")
            continue

        # Verify before publishing: duration must hold, audio must be stereo.
        od = dur(tmp)
        oi, op = loudness(tmp)
        och = probe(tmp, "stream=channels", "a:0")
        after = f"{oi} LUFS {op} TP {och}ch"

        bad = []
        if abs(od - sd) > 1.0:
            bad.append(f"duration {od:.1f} vs {sd:.1f}")
        if och != "2":
            bad.append(f"channels={och}")
        if oi is None or abs(oi - float(I)) > 0.5:
            bad.append(f"loudness {oi}")
        if bad:
            failures.append((fn, "; ".join(bad)))
            print(f"{fn[:46]:<48}{before:>22}   {'REJECTED: ' + bad[0]:>22}")
            os.remove(tmp)
            continue

        os.replace(tmp, f"{OUT_DIR}/{fn}")
        print(f"{fn[:46]:<48}{before:>22}   {after:>22}")

    print("-" * 96)
    if failures:
        print(f"\n{len(failures)} FAILED:")
        for fn, why in failures:
            print(f"  {fn}: {why}")
        sys.exit(1)
    if not DRY:
        print(f"\nDelivery set: {OUT_DIR}")
        print("Masters untouched. These are the files to upload.")


if __name__ == "__main__":
    main()
