#!/usr/bin/env python3
"""Normalise the source images to 1920x1080 and apply per-image treatments.

Originals in images/<slug>/ are never modified. Output goes to prepped/, which
assemble.py prefers when present. Re-run after replacing any source image.

Treatments exist because two images collide with the HUD, which lives top-right:
  02-ceo-desk   the desk lamp sits directly behind the panels and bleeds orange
                through them -> mirror, putting the lamp on the left
  04-eight-desks the tall payroll ledger covers two of the eight monitors, in the
                one image whose whole job is showing eight -> knock the top-right
                corner back so the ledger sits on a quiet field
"""
import os
from PIL import Image, ImageEnhance, ImageFilter

EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(EP, "images")
OUT = os.path.join(EP, "prepped")
W, H = 1920, 1080
os.makedirs(OUT, exist_ok=True)

MIRROR = {"02-ceo-desk"}
KNOCKBACK = {"04-eight-desks"}          # (x0, y0, x1, y1) in 1920x1080 space
KB_BOX = (1380, 0, 1920, 760)
KB_BLUR, KB_DIM = 6, 0.38


def load(slug):
    d = os.path.join(SRC, slug)
    if not os.path.isdir(d):
        return None
    pick = os.path.join(d, "PICK.png")
    if os.path.exists(pick):
        return pick
    imgs = sorted((os.path.join(d, f) for f in os.listdir(d)
                   if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))),
                  key=os.path.getmtime, reverse=True)
    return imgs[0] if imgs else None


def fit(im):
    """Cover 1920x1080 without distorting."""
    sw, sh = im.size
    scale = max(W / sw, H / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    x, y = (im.size[0] - W) // 2, (im.size[1] - H) // 2
    return im.crop((x, y, x + W, y + H))


def main():
    slugs = sorted(d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d)))
    done = 0
    for slug in slugs:
        src = load(slug)
        if not src:
            print(f"  · {slug:18} no image yet")
            continue
        im = fit(Image.open(src).convert("RGB"))
        notes = []
        if slug in MIRROR:
            im = im.transpose(Image.FLIP_LEFT_RIGHT)
            notes.append("mirrored")
        if slug in KNOCKBACK:
            reg = im.crop(KB_BOX).filter(ImageFilter.GaussianBlur(KB_BLUR))
            reg = ImageEnhance.Brightness(reg).enhance(KB_DIM)
            im.paste(reg, KB_BOX)
            notes.append("top-right knocked back")
        out = os.path.join(OUT, f"{slug}.png")
        im.save(out)
        done += 1
        print(f"  ✓ {slug:18} {W}x{H}" + (f"  [{', '.join(notes)}]" if notes else ""))
    print(f"{done}/{len(slugs)} prepped -> {OUT}")


if __name__ == "__main__":
    main()
