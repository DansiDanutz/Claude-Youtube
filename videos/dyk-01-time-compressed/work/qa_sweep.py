#!/usr/bin/env python3
"""Dense visual + loudness sweep of a finished master (the audit's frame/mix pass).
  • one frame every N seconds (default 2) → contact sheets of 12 frames (4×3), each frame
    stamped with its timestamp, for fast human/agent review
  • short-term loudness (ebur128, 3 s window) per second → flags spikes > 4 LU above the
    30 s rolling median and silences below -45 LUFS
Usage: python3 qa_sweep.py <master.mp4> <out_dir> [every_s]
"""
import os, re, subprocess, sys, statistics
from PIL import Image, ImageDraw

master, out = sys.argv[1], sys.argv[2]
every = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
frames_dir = os.path.join(out, 'frames')
os.makedirs(frames_dir, exist_ok=True)
# a rerun into the same dir must not mix frames/sheets from an older master into the new sheets
for d, pat in ((frames_dir, r'f\d{4}\.jpg'), (out, r'sheet-\d+\.jpg')):
    for name in os.listdir(d):
        if re.fullmatch(pat, name):
            os.remove(os.path.join(d, name))

dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', master],
                           capture_output=True, text=True, check=True).stdout)
# one pass: fps filter emits a frame every `every` seconds (much faster than N seeks)
subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-i', master, '-vf', f'fps=1/{every},scale=480:-1',
                '-q:v', '6', os.path.join(frames_dir, 'f%04d.jpg')], check=True)
files = sorted(os.listdir(frames_dir))
sheet_n = 12
for k in range(0, len(files), sheet_n):
    batch = files[k:k + sheet_n]
    tiles = [Image.open(os.path.join(frames_dir, f)) for f in batch]
    w, h = tiles[0].size
    sheet = Image.new('RGB', (w * 4, h * 3), (40, 40, 40))
    for i, (f, im) in enumerate(zip(batch, tiles)):
        x, y = (i % 4) * w, (i // 4) * h
        sheet.paste(im, (x, y))
        t = (k + i) * every
        d = ImageDraw.Draw(sheet)
        d.rectangle([x, y, x + 86, y + 20], fill=(0, 0, 0))
        d.text((x + 4, y + 4), f'{int(t // 60)}:{t % 60:04.1f}', fill=(255, 255, 0))
    sheet.save(os.path.join(out, f'sheet-{k // sheet_n:02d}.jpg'), quality=80)
print(f'{len(files)} frames → {(len(files) + sheet_n - 1) // sheet_n} sheets in {out}')

err = subprocess.run(['ffmpeg', '-nostdin', '-i', master, '-map', '0:a', '-af', 'ebur128=metadata=0', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
st = {}
for m in re.finditer(r't:\s*([\d.]+)\s+TARGET.*?S:\s*(-?[\d.]+|-inf)', err):
    t, s = float(m.group(1)), m.group(2)
    if s != '-inf':
        st.setdefault(int(t), float(s))
secs = sorted(st)
flags = []
for t in secs:
    win = [st[x] for x in secs if abs(x - t) <= 15]
    med = statistics.median(win)
    if st[t] - med > 4:
        flags.append(f'{t}s spike S={st[t]:.1f} vs median {med:.1f}')
    if st[t] < -45 and 2 < t < dur - 3:
        flags.append(f'{t}s near-silence S={st[t]:.1f}')
print('loudness flags:', flags if flags else 'none')
