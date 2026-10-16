#!/usr/bin/env python3
"""720p phone preview of the DYK No. 05 master (≤ 30 MB, ~300 kb/s video) — the skill's 'previews ≤ 30 MB' rule.
Run through `danslab-workflow check --command "python3 videos/dyk-05-food/work/make_preview.py"` first."""
import os, subprocess
PROJ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
src = os.path.join(PROJ, 'dyk-05-food-1080P.mp4')
out = os.path.join(PROJ, 'dyk-05-food-720p-preview.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin', '-i', src, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'medium',
                '-b:v', '300k', '-maxrate', '400k', '-bufsize', '800k', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out], check=True)
print(out, round(os.path.getsize(out) / 1e6, 1), 'MB')
