#!/usr/bin/env python3
"""Crop the front-facing figure from each DansLab character turnaround sheet and
matte out the studio background into a CLEAN transparent cutout using rembg
(u2net + alpha matting). Run via uv so deps are isolated:

  uv run --python 3.12 --with "rembg[cpu]" --with pillow --with onnxruntime \
      tools/cut_characters.py

Output -> media/projects/danslab-story/characters/<name>.png (transparent).
"""
import os
import numpy as np
from scipy import ndimage
from PIL import Image, ImageFilter
from rembg import remove, new_session

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "media/library/characters")
OUT = os.path.join(ROOT, "media/projects/danslab-story/characters")
os.makedirs(OUT, exist_ok=True)

# per-character front figure crop box (fractions of 1456x816)
CHARS = {
    "arlo":   (0.00, 0.02, 0.245, 1.00),
    "rosa":   (0.00, 0.02, 0.225, 1.00),
    "marcus": (0.00, 0.01, 0.245, 1.00),
    "elena":  (0.735, 0.01, 1.00, 1.00),
    "leo":    (0.385, 0.01, 0.60, 1.00),
    "zoe":    (0.405, 0.05, 0.585, 1.00),
}

session = new_session("isnet-general-use")


def keep_largest(im: Image.Image) -> Image.Image:
    """Drop detached alpha islands (stray fragments from neighbour figures)."""
    a = np.array(im.split()[3])
    lbl, n = ndimage.label(a > 24)
    if n <= 1:
        return im
    sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n + 1))
    keep = int(np.argmax(sizes)) + 1
    mask = (lbl == keep).astype(np.uint8) * 255
    newa = np.minimum(a, mask)
    out = im.copy()
    out.putalpha(Image.fromarray(newa, "L"))
    return out


def trim(im: Image.Image, pad: int = 8) -> Image.Image:
    bbox = im.split()[3].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(im.width, r + pad); b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


for name, (x0, y0, x1, y1) in CHARS.items():
    im = Image.open(os.path.join(SRC, f"{name}.png")).convert("RGB")
    w, h = im.size
    crop = im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))
    cut = remove(
        crop, session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=6,
        post_process_mask=True,
    ).convert("RGBA")
    # gentle edge clean: despeckle the alpha, slight feather
    a = cut.split()[3].filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    cut.putalpha(a)
    cut = keep_largest(cut)
    cut = trim(cut)
    cut.save(os.path.join(OUT, f"{name}.png"))
    print(f"  {name}: {crop.size} -> {cut.size}")
print("done ->", os.path.relpath(OUT, ROOT))
