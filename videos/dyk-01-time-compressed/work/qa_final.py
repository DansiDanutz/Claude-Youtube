#!/usr/bin/env python3
"""QA gate for the DYK No. 01 master (episode-skill checklist):
  loudness + true peak on the FINAL file, stream spec, pts-gap scan (gaps > 50 ms must be 0),
  video == audio duration, and a frame sweep (every 4 s for the first minute, every 45 s after)
  written as small JPGs to a scratch dir for visual review.
Usage: python3 qa_final.py <master.mp4> <sweep_dir>
"""
import json, os, re, subprocess, sys

master, sweep = sys.argv[1], sys.argv[2]
os.makedirs(sweep, exist_ok=True)


def probe(*args):
    return subprocess.run(['ffprobe', '-v', 'error', *args, master], capture_output=True, text=True, check=True).stdout


streams = json.loads(probe('-show_entries', 'stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels,duration', '-of', 'json'))['streams']
for st in streams:
    print('stream', {k: v for k, v in st.items() if v not in (None, '')})
vdur = float(next(s['duration'] for s in streams if s['codec_type'] == 'video'))
adur = float(next(s['duration'] for s in streams if s['codec_type'] == 'audio'))
print(f'duration video {vdur:.3f}s audio {adur:.3f}s diff {abs(vdur - adur) * 1000:.0f} ms')

pts = [float(x) for x in probe('-select_streams', 'v', '-show_entries', 'packet=pts_time', '-of', 'csv=p=0').split() if x.strip() and x.strip() != 'N/A']
pts.sort()
gaps = [b - a for a, b in zip(pts, pts[1:]) if b - a > 0.05]
print(f'video packets {len(pts)}, pts gaps > 50 ms: {len(gaps)}')

err = subprocess.run(['ffmpeg', '-nostdin', '-i', master, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
summ = err[err.rfind('Summary:'):]
print('loudness', re.search(r'I:\s+(-?[\d.]+ LUFS)', summ).group(1), '| true peak', re.search(r'Peak:\s+(-?[\d.]+ dBFS)', summ).group(1))

times = list(range(0, 60, 4)) + list(range(60, int(vdur), 45))
for t in times:
    subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-ss', str(t), '-i', master, '-frames:v', '1',
                    '-vf', 'scale=640:-1', '-q:v', '5', os.path.join(sweep, f'sweep-{t:03d}.jpg')], check=True)
print(f'sweep: {len(times)} frames -> {sweep}')
