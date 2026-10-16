#!/usr/bin/env python3
"""720p phone preview of the DYK No. 05 master, kept under the skill's 30 MB preview rule.
Run through `danslab-workflow check --command "python3 videos/dyk-05-food/work/make_preview.py"` first.

The size is bit rate times duration, so the budget is checked BEFORE encoding: video 240 kb/s + audio 80 kb/s over 649.93 s is about
26 MB, 28.6 MB with 10 % container overhead (the earlier 300 + 96 kb/s came to 32 MB and broke the rule)."""
import json, os, subprocess, sys

VIDEO_KBPS, MAXRATE_KBPS, AUDIO_KBPS = 240, 320, 80
LIMIT_MB = 30.0
OVERHEAD = 1.10


def estimate_mb(duration_s, video_kbps=VIDEO_KBPS, audio_kbps=AUDIO_KBPS, overhead=OVERHEAD):
    """Expected file size in MB (1 MB = 10^6 bytes) of an encode at these average bit rates, with container overhead."""
    return duration_s * (video_kbps + audio_kbps) * 1000 / 8 / 1e6 * overhead


def master_duration(work_dir):
    timeline = json.load(open(os.path.join(work_dir, 'timeline.json'), encoding='utf-8'))
    return sum(v[0] for v in timeline.values())


def main():
    work = os.path.dirname(os.path.abspath(__file__))
    proj = os.path.abspath(os.path.join(work, '..'))
    src, out = os.path.join(proj, 'dyk-05-food-1080P.mp4'), os.path.join(proj, 'dyk-05-food-720p-preview.mp4')
    expected = estimate_mb(master_duration(work), VIDEO_KBPS, AUDIO_KBPS)   # read at call time, not frozen as default arguments
    if expected > LIMIT_MB:
        sys.exit(f'the bit rates would give about {expected:.1f} MB, over the {LIMIT_MB:.0f} MB preview limit: lower them')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin', '-i', src, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'medium',
                    '-b:v', f'{VIDEO_KBPS}k', '-maxrate', f'{MAXRATE_KBPS}k', '-bufsize', f'{2 * MAXRATE_KBPS}k',
                    '-c:a', 'aac', '-b:a', f'{AUDIO_KBPS}k', '-movflags', '+faststart', out], check=True)
    size = os.path.getsize(out) / 1e6
    print(out, round(size, 1), 'MB (expected about', round(expected, 1), ')')
    if size > LIMIT_MB:
        sys.exit(f'{size:.1f} MB is over the {LIMIT_MB:.0f} MB limit')


if __name__ == '__main__':
    main()
