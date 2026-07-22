#!/usr/bin/env python3
"""
cutout_video.py — turn a talking-head clip into a transparent presenter layer.

Give it any video of a person (a Midjourney avatar clip, a phone recording, a
Higgsfield render) and it returns the same clip with the background removed, in
formats the rest of this pipeline can actually composite:

  <name>.webm   VP9 + alpha (yuva420p)  ← use this in Remotion; Chromium plays it
  <name>.mov    ProRes 4444 + alpha     ← use this in a normal NLE

Segmentation runs on Apple's Vision framework via tools/matte/person-matte, so
there is no model download, no API key, and no per-clip cost. It is built for
PEOPLE — it will not cut out a product or a logo.

Usage:
    python tools/cutout_video.py <input> [--out-dir media/library/presenter]
                                         [--quality fast|balanced|accurate]
                                         [--feather 1.5] [--no-mov]

Then in a scene:
    <Presenter src={staticFile('library/presenter/dan-hello.webm')} at={30} side="right" />
"""
import argparse
import os
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MATTE_BIN = os.path.join(HERE, "matte", "person-matte")
MATTE_SRC = os.path.join(HERE, "matte", "PersonMatte.swift")
DEFAULT_OUT = os.path.join(os.path.dirname(HERE), "media", "library", "presenter")


def run(cmd, **kw):
    p = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if p.returncode != 0:
        sys.exit(f"! {cmd[0]} failed:\n{(p.stderr or p.stdout).strip()[:800]}")
    return p


def ensure_matte_bin():
    """Build the Swift helper on first use so the repo ships source, not a binary."""
    if os.path.exists(MATTE_BIN):
        return
    if not shutil.which("swiftc"):
        sys.exit("! swiftc not found — install the Xcode command line tools: xcode-select --install")
    print("building tools/matte/person-matte …")
    run(["swiftc", "-O", "-o", MATTE_BIN, MATTE_SRC])


def probe(path, entries):
    p = run(["ffprobe", "-v", "error", "-select_streams", "v:0",
             "-show_entries", entries, "-of", "default=nw=1:nk=1", path])
    return p.stdout.strip().splitlines()


def subject_box(matte, w, h, pad_pct):
    """Tightest crop that holds the subject for the WHOLE clip, plus padding.

    Without this the cutout keeps the source framing, so a centred 16:9 avatar
    becomes a mostly-empty layer and every scene has to fight it with magic
    offsets. cropdetect over the matte gives the union box directly — the matte
    is pure white-on-black, which is exactly what it is built to measure.
    """
    p = subprocess.run(
        ["ffmpeg", "-v", "info", "-i", matte,
         "-vf", "cropdetect=limit=24:round=2:reset=0", "-f", "null", "-"],
        capture_output=True, text=True)
    lines = [l for l in (p.stderr or "").splitlines() if "crop=" in l]
    if not lines:
        return None
    try:
        cw, ch, cx, cy = (int(v) for v in lines[-1].split("crop=")[-1].strip().split(":"))
    except ValueError:
        return None
    if cw <= 0 or ch <= 0:
        return None

    padx, pady = int(cw * pad_pct), int(ch * pad_pct)
    x = max(0, cx - padx)
    y = max(0, cy - pady)
    cw = min(w - x, cw + padx * 2)
    ch = min(h - y, ch + pady * 2)
    # even dimensions — yuv420 chroma subsampling requires it
    cw -= cw % 2
    ch -= ch % 2
    if cw < 32 or ch < 32:
        return None
    return cw, ch, x, y


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--out-dir", default=DEFAULT_OUT)
    ap.add_argument("--quality", default="accurate", choices=["fast", "balanced", "accurate"])
    ap.add_argument("--feather", type=float, default=1.5,
                    help="blur radius on the matte edge, px (0 disables)")
    ap.add_argument("--no-mov", action="store_true", help="skip the ProRes 4444 export")
    ap.add_argument("--no-crop", action="store_true",
                    help="keep the source framing instead of cropping to the subject")
    ap.add_argument("--pad", type=float, default=0.04,
                    help="padding around the subject crop, as a fraction (default 0.04)")
    ap.add_argument("--solidify", default="40:110", metavar="LOW:HIGH",
                    help="stretch matte confidence between these 0-255 levels "
                         "(default 40:110; pass 'off' to keep Vision's raw mask)")
    a = ap.parse_args()

    if not os.path.exists(a.input):
        sys.exit(f"! no such file: {a.input}")
    ensure_matte_bin()
    os.makedirs(a.out_dir, exist_ok=True)

    stem = os.path.splitext(os.path.basename(a.input))[0]
    matte = os.path.join(a.out_dir, f"{stem}.matte.mov")
    webm = os.path.join(a.out_dir, f"{stem}.webm")
    mov = os.path.join(a.out_dir, f"{stem}.mov")

    w, h = (int(v) for v in probe(a.input, "stream=width,height")[:2])
    print(f"→ {os.path.basename(a.input)}  {w}x{h}")

    # 1 · person matte, frame by frame, on the Neural Engine
    p = subprocess.run([MATTE_BIN, a.input, matte, a.quality], text=True, capture_output=True)
    if p.returncode != 0:
        sys.exit(f"! person-matte failed:\n{p.stderr.strip()[:800]}")
    print("  " + p.stdout.strip())
    if "WARNING" in p.stderr:
        print("  " + p.stderr.strip().splitlines()[-1])

    # 2 · crop to the subject so the layer is not mostly empty pixels
    crop = "" if a.no_crop else subject_box(matte, w, h, a.pad)
    if crop:
        cw, ch, cx, cy = crop
        crop_f = f",crop={cw}:{ch}:{cx}:{cy}"
        print(f"  crop {cw}x{ch} +{cx}+{cy}  (was {w}x{h})")
    else:
        crop_f = ""
        if not a.no_crop:
            print("  crop: could not find a subject box — keeping full frame")

    # 3 · solidify. Vision returns a CONFIDENCE mask, not a binary one, and on
    #     harder frames (arms tucked in, stylised or illustrated subjects) the
    #     whole body can come back at 40-60% grey. Left alone that renders as a
    #     translucent ghost mid-clip. Stretching the levels turns an uncertain
    #     body solid while leaving the soft hair edge intact.
    if a.solidify.lower() == "off":
        solid = ""
    else:
        lo, hi = (int(v) for v in a.solidify.split(":"))
        solid = f",lutyuv=y=clip((val-{lo})*255/({hi}-{lo})\\,0\\,255)"

    # 4 · matte -> alpha channel. Feathering hides the 1px stair-stepping that
    #     any segmentation mask has; without it the edge reads as a sticker.
    soften = f",boxblur={a.feather}:1" if a.feather > 0 else ""
    matte_f = f"format=gray,scale={w}:{h}{crop_f}{solid}{soften}"
    chain = (f"[1:v]{matte_f}[m];"
             f"[0:v]format=yuva420p{crop_f}[v];[v][m]alphamerge[out]")

    run(["ffmpeg", "-y", "-v", "error", "-i", a.input, "-i", matte,
         "-filter_complex", chain, "-map", "[out]",
         "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
         "-b:v", "0", "-crf", "28", "-row-mt", "1",
         # alt-ref frames are invisible frames; Remotion extracts by timestamp
         # and lands on them, which drops the presenter for a beat. A 1s keyframe
         # interval keeps every seek cheap and exact without bloating the file
         # (-g 1 also works but is ~5x larger).
         "-auto-alt-ref", "0", "-lag-in-frames", "0", "-g", "30",
         "-an", webm])
    print(f"  ✓ {webm}  ({os.path.getsize(webm)/1e6:.1f} MB)  VP9 + alpha — for Remotion")

    if not a.no_mov:
        chain4 = (f"[1:v]{matte_f}[m];"
                  f"[0:v]format=yuva444p10le{crop_f}[v];[v][m]alphamerge[out]")
        run(["ffmpeg", "-y", "-v", "error", "-i", a.input, "-i", matte,
             "-filter_complex", chain4, "-map", "[out]",
             "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le",
             "-an", mov])
        print(f"  ✓ {mov}  ({os.path.getsize(mov)/1e6:.1f} MB)  ProRes 4444 — for an NLE")

    os.remove(matte)
    print("\nnext: <Presenter src={staticFile('library/presenter/%s.webm')} at={30} side=\"right\" />" % stem)


if __name__ == "__main__":
    main()
