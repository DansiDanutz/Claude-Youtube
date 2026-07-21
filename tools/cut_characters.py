#!/usr/bin/env python3
"""Crop the front-facing figure from each DansLab character turnaround sheet and
matte out the flat studio background into a clean transparent cutout.

Pure-PIL: flood-fill the background from a ring of edge seeds, then feather + trim.
Output -> media/projects/danslab-story/characters/<name>.png
"""
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "media/library/characters")
OUT = os.path.join(ROOT, "media/projects/danslab-story/characters")
os.makedirs(OUT, exist_ok=True)

# per-character front figure crop box (fractions of 1456x816) + flood threshold
CHARS = {
    #        x0     y0    x1     y1   thresh
    "arlo":   (0.00, 0.02, 0.245, 1.00, 52),
    "rosa":   (0.00, 0.02, 0.225, 1.00, 46),
    "marcus": (0.00, 0.01, 0.245, 1.00, 40),
    "elena":  (0.735, 0.01, 1.00, 1.00, 46),
    "leo":    (0.385, 0.01, 0.60, 1.00, 40),
    "zoe":    (0.375, 0.01, 0.585, 1.00, 44),
}


def matte(im: Image.Image, thresh: int) -> Image.Image:
    """Flood-fill background from an edge ring, return RGBA with bg alpha=0."""
    rgb = im.convert("RGB")
    w, h = rgb.size
    # scratch: flood-fill fills bg with magenta sentinel
    scratch = rgb.copy()
    SENT = (255, 0, 255)
    seeds = []
    n = 26
    for i in range(n + 1):
        t = i / n
        seeds += [(int(t * (w - 1)), 0), (int(t * (w - 1)), h - 1),
                  (0, int(t * (h - 1))), (w - 1, int(t * (h - 1)))]
    for s in seeds:
        ImageDraw.floodfill(scratch, s, SENT, thresh=thresh)
    # alpha = 0 where scratch == sentinel, else 255
    sp = scratch.load()
    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            if sp[x, y] == SENT:
                ap[x, y] = 0
    alpha = alpha.filter(ImageFilter.MedianFilter(5))

    # binarize -> keep only the main (center) figure, then close interior holes
    K = alpha.point(lambda v: 255 if v > 110 else 0)

    # (a) keep-main: flood a "keep" value along the vertical center line
    keep = K.copy()
    KP = 200
    cx = w // 2
    for yy in range(int(0.08 * h), int(0.98 * h), 4):
        if keep.getpixel((cx, yy)) == 255:
            ImageDraw.floodfill(keep, (cx, yy), KP, thresh=0)
    kp = keep.load()
    for y in range(h):
        for x in range(w):
            if kp[x, y] == 255:      # detached fg island -> drop
                kp[x, y] = 0
            elif kp[x, y] == KP:     # main figure -> restore
                kp[x, y] = 255

    # (b) close holes: flood exterior bg (0) from border with a sentinel; any
    # remaining 0 is an interior hole -> fill it in.
    holes = keep.copy()
    EXT = 90
    for i in range(w):
        for s in ((i, 0), (i, h - 1)):
            if holes.getpixel(s) == 0:
                ImageDraw.floodfill(holes, s, EXT, thresh=0)
    for j in range(h):
        for s in ((0, j), (w - 1, j)):
            if holes.getpixel(s) == 0:
                ImageDraw.floodfill(holes, s, EXT, thresh=0)
    hp = holes.load()
    for y in range(h):
        for x in range(w):
            if hp[x, y] == 0:        # unreachable -> interior hole -> fill
                hp[x, y] = 255
            elif hp[x, y] == EXT:
                hp[x, y] = 0

    alpha = holes.filter(ImageFilter.GaussianBlur(1.3))
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out


def trim(im: Image.Image, pad: int = 12) -> Image.Image:
    bbox = im.split()[3].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(im.width, r + pad); b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


for name, (x0, y0, x1, y1, th) in CHARS.items():
    im = Image.open(os.path.join(SRC, f"{name}.png"))
    w, h = im.size
    crop = im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
    cut = trim(matte(crop, th))
    cut.save(os.path.join(OUT, f"{name}.png"))
    print(f"  {name}: {crop.size} -> {cut.size}")
print("done ->", os.path.relpath(OUT, ROOT))
