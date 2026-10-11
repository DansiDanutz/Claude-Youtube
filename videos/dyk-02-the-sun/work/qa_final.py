#!/usr/bin/env python3
"""QA gate for the DYK No. 02 master (episode-skill checklist):
  loudness + true peak on the FINAL file, stream spec, pts-gap scan (gaps > 50 ms must be 0),
  video == audio duration, and a frame sweep (every 4 s for the first minute, every 45 s after)
  written as small JPGs to a scratch dir for visual review.
Usage: python3 qa_final.py <master.mp4> <sweep_dir>
"""
import json, os, re, subprocess, sys

# delivery spec: a master that misses any of these fails the gate (exit 1)
SPEC_VIDEO = {'codec_name': 'h264', 'width': 1920, 'height': 1080, 'r_frame_rate': '30/1'}
SPEC_AUDIO = {'codec_name': 'aac', 'sample_rate': '48000', 'channels': 2}
MAX_AV_DIFF_S = 0.05
MAX_PTS_GAP_S = 0.05
LUFS_TARGET, LUFS_TOL = -14.0, 1.0
MAX_TRUE_PEAK_DB = -1.0

if len(sys.argv) != 3:
    raise SystemExit('usage: qa_final.py <master.mp4> <sweep_dir>')
master, sweep = sys.argv[1], sys.argv[2]
failures = []
os.makedirs(sweep, exist_ok=True)


def probe(*args):
    return subprocess.run(['ffprobe', '-v', 'error', *args, master], capture_output=True, text=True, check=True).stdout


streams = json.loads(probe('-show_entries', 'stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels,duration', '-of', 'json'))['streams']
for st in streams:
    print('stream', {k: v for k, v in st.items() if v not in (None, '')})
vdur = float(next(s['duration'] for s in streams if s['codec_type'] == 'video'))
adur = float(next(s['duration'] for s in streams if s['codec_type'] == 'audio'))
print(f'duration video {vdur:.3f}s audio {adur:.3f}s diff {abs(vdur - adur) * 1000:.0f} ms')
for kind, spec in (('video', SPEC_VIDEO), ('audio', SPEC_AUDIO)):
    st = next(s for s in streams if s['codec_type'] == kind)
    failures += [f'{kind} {k} is {st.get(k)!r}, spec {v!r}' for k, v in spec.items() if st.get(k) != v]
if abs(vdur - adur) > MAX_AV_DIFF_S:
    failures.append(f'video/audio durations differ by {abs(vdur - adur) * 1000:.0f} ms (max {MAX_AV_DIFF_S * 1000:.0f})')

pts = [float(x) for x in probe('-select_streams', 'v', '-show_entries', 'packet=pts_time', '-of', 'csv=p=0').split() if x.strip() and x.strip() != 'N/A']
pts.sort()
gaps = [b - a for a, b in zip(pts, pts[1:]) if b - a > MAX_PTS_GAP_S]
print(f'video packets {len(pts)}, pts gaps > 50 ms: {len(gaps)}')
if gaps:
    failures.append(f'{len(gaps)} pts gaps > {MAX_PTS_GAP_S * 1000:.0f} ms (largest {max(gaps) * 1000:.0f} ms)')

err = subprocess.run(['ffmpeg', '-nostdin', '-i', master, '-map', '0:a', '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
summ = err[err.rfind('Summary:'):]
lufs_m, peak_m = re.search(r'I:\s+(-?[\d.]+) LUFS', summ), re.search(r'Peak:\s+(-?[\d.]+) dBFS', summ)
if not (lufs_m and peak_m):
    raise SystemExit('QA FAIL: could not read loudness / true peak from ebur128')
lufs, peak = float(lufs_m.group(1)), float(peak_m.group(1))
print(f'loudness {lufs} LUFS | true peak {peak} dBFS')
if abs(lufs - LUFS_TARGET) > LUFS_TOL:
    failures.append(f'loudness {lufs} LUFS outside {LUFS_TARGET} +/- {LUFS_TOL}')
if peak > MAX_TRUE_PEAK_DB:
    failures.append(f'true peak {peak} dBTP above {MAX_TRUE_PEAK_DB}')

times = list(range(0, 60, 4)) + list(range(60, int(vdur), 45))
for t in times:
    subprocess.run(['ffmpeg', '-nostdin', '-y', '-v', 'error', '-ss', str(t), '-i', master, '-frames:v', '1',
                    '-vf', 'scale=640:-1', '-q:v', '5', os.path.join(sweep, f'sweep-{t:03d}.jpg')], check=True)
print(f'sweep: {len(times)} frames -> {sweep}')

if failures:
    print('QA FAIL:\n  ' + '\n  '.join(failures))
    raise SystemExit(1)
print('QA PASS')
