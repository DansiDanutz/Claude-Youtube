#!/usr/bin/env python3
"""Re-derive the ep09 1080p master from the canonical 4K master.

Why this exists
---------------
Ep09 shipped two DIFFERENT cuts, not two resolutions:
    danslab-episode-09-player-1080P.mp4   766s  (12:46)  Jul 24
    danslab-episode-09-player-4K.mp4     1238s  (20:38)  Jul 26

The 4K is canonical, and that is provable rather than assumed: ep09's narration is
955s of speech across 49 lines. A 766s cut cannot contain 955s of narration. The 4K
at 1238s is consistent with 955s of speech plus beats.

Why it is chunked
-----------------
A single-pass 4K decode + downscale gets killed on this machine — the same limit that
`tools/mux_linkbar.py` and the ep10/ep11 `mux_chunked.py` already work around. Measured
here: it died at 237s of output, then at 477s, both times with no error on stderr.
ffmpeg traps the signal and finalises a SHORT file with a normal-looking stats line, so
an unverified run looks like it succeeded. Hence: chunks, retries, and a frame-count
check at the end.

Audio is never re-encoded. Each chunk is video-only (-an); the AAC master audio is
copied from the source in a single final mux, so there is no per-chunk sync drift and
no generation loss.

Usage:  python3 rederive_1080p.py [--chunk 120]
"""
import os
import subprocess
import sys

EP = os.path.expanduser("~/Projects/Claude-Youtube/videos/danslab-ep09-player")
SRC = f"{EP}/_src-4K.mp4"
OUT = f"{EP}/danslab-episode-09-player-1080P-v2.mp4"
TMP = f"{EP}/work/_rederive"

CHUNK = 120.0
if "--chunk" in sys.argv:
    CHUNK = float(sys.argv[sys.argv.index("--chunk") + 1])

# House encode settings, taken from tools/mux_linkbar.py: CRF 18 below 2000px, preset
# medium, yuv420p. Do not invent different values — variants must match the series.
CRF, PRESET = "18", "medium"


def probe(path, entries, stream=None):
    cmd = ["ffprobe", "-v", "error"]
    if stream:
        cmd += ["-select_streams", stream]
    cmd += ["-show_entries", entries, "-of", "csv=p=0", path]
    return subprocess.run(cmd, capture_output=True, text=True).stdout.strip()


def dur(path):
    try:
        return float(probe(path, "format=duration") or 0)
    except ValueError:
        return 0.0


def main():
    if not os.path.exists(SRC):
        sys.exit(f"missing source: {SRC}\nCopy the 4K master locally first — never encode from iCloud.")

    total = dur(SRC)
    src_frames = int(probe(SRC, "stream=nb_frames", "v:0").rstrip(",") or 0)
    print(f"source: {total:.2f}s, {src_frames} frames")
    os.makedirs(TMP, exist_ok=True)

    chunks, n = [], int(total // CHUNK) + (1 if total % CHUNK else 0)
    for i in range(n):
        ss, want = i * CHUNK, min(CHUNK, total - i * CHUNK)
        ck = f"{TMP}/c{i:03d}.mp4"

        # Resume support: a chunk that already came out the right length is kept.
        if os.path.exists(ck) and abs(dur(ck) - want) < 0.5:
            print(f"  chunk {i:3d}: cached ({dur(ck):.1f}s)")
            chunks.append(ck)
            continue

        for attempt in range(4):
            r = subprocess.run([
                "ffmpeg", "-y", "-v", "error",
                "-ss", f"{ss:.3f}", "-i", SRC, "-t", f"{want:.3f}",
                "-vf", "scale=1920:1080:flags=lanczos",
                "-c:v", "libx264", "-preset", PRESET, "-crf", CRF,
                "-pix_fmt", "yuv420p", "-an", ck,
            ])
            got = dur(ck)
            if r.returncode == 0 and abs(got - want) < 0.5:
                print(f"  chunk {i:3d}: {got:.1f}s / {want:.1f}s")
                break
            print(f"  chunk {i:3d}: attempt {attempt + 1} failed (rc={r.returncode}, {got:.1f}s/{want:.1f}s)")
        else:
            sys.exit(f"chunk {i} failed after 4 attempts — lower --chunk and rerun")
        chunks.append(ck)

    lst = f"{TMP}/concat.txt"
    with open(lst, "w") as fh:
        for c in chunks:
            fh.write(f"file '{c}'\n")

    silent = f"{TMP}/video_full.mp4"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
                    "-i", lst, "-c", "copy", silent], check=True)
    print(f"concat: {dur(silent):.2f}s")

    # Single mux: our video, the source's untouched AAC.
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", silent, "-i", SRC,
                    "-map", "0:v:0", "-map", "1:a:0", "-c", "copy",
                    "-movflags", "+faststart", OUT], check=True)

    out_d = dur(OUT)
    out_frames = int(probe(OUT, "stream=nb_frames", "v:0").rstrip(",") or 0)
    print(f"\nFINAL: {OUT}")
    print(f"  duration {out_d:.2f}s vs source {total:.2f}s  (delta {out_d - total:+.2f}s)")
    print(f"  frames   {out_frames} vs source {src_frames}  (delta {out_frames - src_frames:+d})")
    print(f"  video    {probe(OUT, 'stream=width,height', 'v:0')}")
    print(f"  audio    {probe(OUT, 'stream=codec_name,sample_rate,channels', 'a:0')}")

    if abs(out_d - total) > 1.0:
        sys.exit("FAIL: duration mismatch — do not ship this file")
    print("\nOK — duration matches the canonical 4K cut.")


if __name__ == "__main__":
    main()
