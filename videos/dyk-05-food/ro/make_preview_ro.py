#!/usr/bin/env python3
"""720p phone preview of the DYK No. 05 ROMANIAN master (ro/) (≤ 30 MB, ~200 kb/s video: the Romanian cut is 20 % longer) — the skill's 'previews ≤ 30 MB' rule.
Run through `danslab-workflow check --command "python3 videos/dyk-05-food/ro/make_preview_ro.py"` first."""
import os, subprocess
PROJ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
src = os.path.join(PROJ, 'ro', 'dyk-05-food-ro-1080P.mp4')
out = os.path.join(PROJ, 'ro', 'dyk-05-food-ro-720p-preview.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin', '-i', src, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'medium',
                '-b:v', '200k', '-maxrate', '280k', '-bufsize', '560k', '-c:a', 'aac', '-b:a', '80k', '-movflags', '+faststart', out], check=True)
print(out, round(os.path.getsize(out) / 1e6, 1), 'MB')
