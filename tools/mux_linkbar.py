#!/usr/bin/env python3
"""Composite the series link bar into an episode's final deliverable.

The bar (media/library/logos/danslab-linkbar.png) sits in the reserved bottom
70px band, fading in after the cold open and out before the outro.

Long single-pass 4K encodes get killed on this machine (SIGTERM around the
7-minute mark — same failure ep10 hit, see videos/danslab-ep10-payroll/work/
mux_chunked.py), so the composite is encoded in chunks, concat-copied, then
muxed with the master audio. Each chunk is retried and duration-verified.

  python3.13 tools/mux_linkbar.py VIDEO AUDIO OUT --bar-in 21.05 --bar-out 598.8
"""
import argparse, os, subprocess, sys

BAR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "media", "library", "logos", "danslab-linkbar.png")
CHUNK = 150.0   # seconds per encode pass — 4K encodes ~0.7x realtime, so this
                # keeps each pass near 3.5 min, well under the ~7 min kill point
BAR_H_1080 = 70


def dur(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip()
    return float(out) if out else 0.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("audio"); ap.add_argument("out")
    ap.add_argument("--bar-in", type=float, required=True)
    ap.add_argument("--bar-out", type=float, required=True)
    ap.add_argument("--crf", default=None)
    a = ap.parse_args()

    if not os.path.exists(BAR):
        sys.exit(f"link bar PNG missing: {BAR}")

    total = dur(a.video)
    wh = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0",
                         "-show_entries", "stream=width,height", "-of", "csv=p=0", a.video],
                        capture_output=True, text=True).stdout.strip()
    w, h = (int(x) for x in wh.strip(",").split(",")[:2])
    barh = int(BAR_H_1080 * h / 1080)
    crf = a.crf or ("17" if h >= 2000 else "18")
    work = os.path.dirname(os.path.abspath(a.video))

    cuts = [0.0]
    while cuts[-1] + CHUNK < total:
        cuts.append(cuts[-1] + CHUNK)
    cuts.append(total)

    chunks = []
    for i in range(len(cuts) - 1):
        s, e = cuts[i], cuts[i + 1]
        d = e - s
        # Fades are expressed in chunk-local time. A fade whose window falls
        # outside this chunk is dropped entirely — ffmpeg rejects a negative st,
        # and a chunk after the fade-in simply starts fully opaque.
        fin, fout = a.bar_in - s, a.bar_out - s
        fades = ""
        if 0 <= fin < d:
            fades += f",fade=t=in:st={fin:.3f}:d=0.8:alpha=1"
        if 0 <= fout < d:
            fades += f",fade=t=out:st={fout:.3f}:d=0.8:alpha=1"
        f = (f"[1:v]scale={w}:{barh},format=rgba{fades}[bar];"
             f"[0:v][bar]overlay=0:{h - barh}[v]")
        # a chunk entirely before the fade-in or after the fade-out carries no bar
        if e <= a.bar_in or s >= a.bar_out + 0.8:
            f = "[0:v]null[v]"
            ins = ["-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", a.video]
        else:
            ins = ["-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", a.video,
                   "-loop", "1", "-t", f"{d:.3f}", "-i", BAR]
        ck = f"{work}/_bar_{i}.mp4"
        for attempt in range(3):
            r = subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error"] + ins +
                               ["-filter_complex", f, "-map", "[v]",
                                "-c:v", "libx264", "-preset", "medium", "-crf", crf,
                                "-pix_fmt", "yuv420p", "-an", ck])
            if r.returncode == 0 and abs(dur(ck) - d) < 1.0:
                break
            print(f"chunk {i} attempt {attempt + 1} failed (rc={r.returncode}, "
                  f"got {dur(ck):.1f}s want {d:.1f}s) — retrying")
        else:
            sys.exit(f"chunk {i} would not encode")
        chunks.append(ck)
        print(f"chunk {i}: {s:.1f}–{e:.1f}s ok")

    lst = f"{work}/_bar_concat.txt"
    with open(lst, "w") as fh:
        for c in chunks:
            fh.write(f"file '{c}'\n")
    subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-f", "concat", "-safe", "0",
                    "-i", lst, "-i", a.audio, "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "224k", "-ac", "2",
                    "-shortest", a.out], check=True)
    got = dur(a.out)
    if abs(got - total) > 2.0:
        sys.exit(f"FINAL duration {got:.1f}s != source {total:.1f}s")
    for c in chunks:
        os.remove(c)
    os.remove(lst)
    print(f"linkbar mux ok: {a.out} {got:.1f}s")


if __name__ == "__main__":
    main()
