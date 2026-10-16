#!/usr/bin/env python3
"""Make test frames with KNOWN defects from clean Episode 5 stills, to check what the image QA questions actually catch.

  python3 tools/dyk/image_qa/make_defects.py [--out DIR]       # default DIR: a temporary folder, printed at the end

Four defects, each from a real still (960x540):
  defect-cropped-left      the picture slid 120 px left: the year, HUD text and the start of lines run off the frame
  defect-zoomed-clipped    zoom 1.8: words at both ends of the lines are sliced by the frame edges
  defect-strip-on-hud      the "THE YEARS ..." strip's text drawn over the HUD bar, both stay visible and collide
  defect-caption-on-hud    the small source caption (in its box) dropped onto the HUD bar
Measured with frame_qa.py on 2026-10-17 (see its THRESHOLDS): zoomed-clipped is caught by text_cut_off (0.98), cropped-left only just
(0.36, a clean frame scores 0.12), strip-on-hud is caught by caption_hud_overlap (0.64) and caption-on-hud is missed (0.30, clean 0.27).
"""
import argparse, os, sys, tempfile

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
STILLS = os.path.join(HERE, '..', '..', '..', 'videos', 'dyk-05-food', 'work', 'audit', 'stills')
BACKGROUND = (4, 4, 8)
TEXT_LUMA = 70           # pixels brighter than this count as text when a strip is overlaid


def slide_left(img, px=120):
    """The picture moved `px` to the left: everything at the left edge is lost, the right edge is empty."""
    out = Image.new('RGB', img.size, BACKGROUND)
    out.paste(img, (-px, 0))
    return out


def zoom_clip(img, factor=1.8, dy=-40):
    """Zoom around the centre and keep the frame size: text at both ends of the lines is clipped by the frame."""
    w, h = img.size
    z = img.resize((int(w * factor), int(h * factor)), Image.LANCZOS)
    left, top = (z.width - w) // 2, (z.height - h) // 2 + dy
    return z.crop((left, top, left + w, top + h))


def overlay_text(img, source_box, target_top, erase_fill=BACKGROUND):
    """Erase the text in `source_box` (left, top, right, bottom) and draw only its bright pixels again starting at y=`target_top`,
    on top of whatever is there, so the old and the new content collide instead of one replacing the other."""
    left, top, right, bottom = source_box
    pixels = np.asarray(img).copy()
    strip = pixels[top:bottom, left:right].copy()
    mask = strip.max(axis=2) > TEXT_LUMA
    pixels[top:bottom, left:right] = erase_fill
    region = pixels[target_top:target_top + (bottom - top), left:right]
    region[mask] = strip[mask]
    return Image.fromarray(pixels)


def paste_box(img, source_box, target_top, erase_fill):
    """Move a rectangle (text and its box) so that it covers what is at `target_top`."""
    left, top, right, bottom = source_box
    out = img.copy()
    piece = img.crop(source_box)
    out.paste(erase_fill, source_box)
    out.paste(piece, (left, target_top))
    return out


def make_all(out_dir, stills=STILLS):
    os.makedirs(out_dir, exist_ok=True)
    card = Image.open(os.path.join(stills, 'Fd1500-540.png')).convert('RGB')
    era = Image.open(os.path.join(stills, 'Fd1884-1330.png')).convert('RGB')
    frames = {
        'defect-cropped-left': slide_left(card),
        'defect-zoomed-clipped': zoom_clip(card),
        'defect-strip-on-hud': overlay_text(era, (70, 460, 640, 484), 490),
        'defect-caption-on-hud': paste_box(card, (160, 352, 800, 386), 490, (12, 16, 40)),
    }
    paths = []
    for name, im in frames.items():
        path = os.path.join(out_dir, name + '.png')
        im.save(path)
        paths.append(path)
    return paths


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--out', default=None)
    opts = ap.parse_args(argv)
    out = opts.out or tempfile.mkdtemp(prefix='dyk-defects-')
    for p in make_all(out):
        print(p)
    return 0


if __name__ == '__main__':
    sys.exit(main())
