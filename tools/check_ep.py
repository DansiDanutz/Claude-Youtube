#!/usr/bin/env python3
"""Map an episode's shot timings + integrity-check each shot mp4.
Usage: python check_ep.py <video-dir> [target_seconds]"""
import subprocess, re, os, sys

REPO = os.path.expanduser("~/Projects/Claude-Youtube")
OUT = REPO + "/remotion/out"
vd = sys.argv[1]
target = float(sys.argv[2]) if len(sys.argv) > 2 else None

src = open(f"{REPO}/videos/{vd}/work/assemble.py").read()
shots = re.findall(r'\("([A-Za-z0-9]+)"', re.search(r"ORDER\s*=\s*\[(.*?)\]", src, re.S).group(1))

t = 0.0
for s in shots:
    p = f"{OUT}/{s}.mp4"
    if not os.path.exists(p):
        print(f"{int(t//60)}:{int(t%60):02d}  {s:16s}  MISSING")
        continue
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                              "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip() or 0)
    # full decode: catches truncation / frozen tails
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "null", "-"],
                       capture_output=True, text=True)
    err = r.stderr.strip()
    flag = "  <== 6:11" if (target and t <= target < t + d) else ""
    status = "ok" if not err else "!! " + err.splitlines()[-1][:70]
    print(f"{int(t//60)}:{int(t%60):02d}  {s:16s} {d:5.1f}s  {status}{flag}")
    t += d
print(f"TOTAL {int(t//60)}:{int(t%60):02d}")
