#!/usr/bin/env python3
"""Chunked final mux for ep10 — long single-pass 4K encodes get killed on this
machine (died at 1061s, then 831s), so encode the HUD+fade composite in three
chunks, concat with -c copy, then mux audio.  Usage: python3.13 mux_chunked.py [--tag 4k]"""
import subprocess, os, sys

WORK = os.path.dirname(os.path.abspath(__file__))
EP = os.path.dirname(WORK)
OUT = os.path.expanduser("~/Projects/Claude-Youtube/remotion/out")
TAG = "4k" if "--tag" in sys.argv and sys.argv[sys.argv.index("--tag") + 1] == "4k" else "1080p"
W, H = (3840, 2160) if TAG == "4k" else (1920, 1080)
HUDH = int(70 * H / 1080)
CRF = "17" if TAG == "4k" else "18"

VID = f"{WORK}/video_full_{TAG}.mp4"
HUD = f"{OUT}/YHud.mov"
AUD = f"{WORK}/mix/master.wav"

def dur(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                 "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip())

TOTAL = dur(VID)
FADES = [45.221, 94.331, 221.584, 377.851, 452.005, 765.627, 877.925, 1147.429, 1288.763, 1351.909]
CUTS = [0.0, 440.0, 900.0, TOTAL]
for c in CUTS[1:-1]:
    assert all(abs(c - t) > 2 and abs(c - (t - 0.4)) > 2 for t in FADES), f"cut {c} hits a fade"

chunks = []
for i in range(len(CUTS) - 1):
    s, e = CUTS[i], CUTS[i + 1]
    d = e - s
    fades = ""
    for t in FADES:
        if s - 1 < t < e + 1:
            o, n = t - 0.4 - s, t - s
            # scope each fade to its own window — an unscoped fade=in/out blacks
            # out the entire timeline outside the fade (learned the hard way)
            fades += (f",fade=t=out:st={o:.3f}:d=0.4:enable='between(t,{o:.3f},{n:.3f})'"
                      f",fade=t=in:st={n:.3f}:d=0.4:enable='between(t,{n:.3f},{n + 0.4:.3f})'")
    ck = f"{WORK}/_mux_{TAG}_{i}.mp4"
    fc = (f"[0:v]null{fades}[base];[1:v]scale={W}:{HUDH}[hud];"
          f"[base][hud]overlay=0:{H - HUDH}:shortest=0[v]")
    for attempt in range(3):
        r = subprocess.run(["ffmpeg", "-y", "-v", "error",
                            "-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", VID,
                            "-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", HUD,
                            "-filter_complex", fc, "-map", "[v]",
                            "-c:v", "libx264", "-preset", "medium", "-crf", CRF,
                            "-pix_fmt", "yuv420p", "-an", ck])
        if r.returncode == 0 and abs(dur(ck) - d) < 1.0:
            break
        print(f"chunk {i} attempt {attempt + 1} failed (rc={r.returncode}), retrying")
    else:
        sys.exit(f"chunk {i} failed after 3 attempts")
    print(f"chunk {i}: {dur(ck):.1f}s / {d:.1f}s")
    chunks.append(ck)

lst = f"{WORK}/_mux_{TAG}.txt"
with open(lst, "w") as fh:
    for c in chunks:
        fh.write(f"file '{c}'\n")
out = f"{EP}/danslab-episode-10-payroll-{TAG.upper()}-v2.mp4"
subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst,
                "-i", AUD, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                "-c:a", "aac", "-b:a", "256k", "-shortest", out], check=True)
print(f"wrote {out}  {dur(out):.1f}s (target {TOTAL:.1f}s)")
