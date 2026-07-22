"""Concat the danslab-profile shots and mix music + SFX under them."""
import os, subprocess

ROOT = os.path.expanduser('~/Projects/Claude-Youtube')
OUT = os.path.join(ROOT, 'remotion', 'out')
PROJ = os.path.join(ROOT, 'videos', 'danslab-profile')
WORK = os.path.join(PROJ, 'work')
os.makedirs(WORK, exist_ok=True)

SHOTS = ['DpHook', 'DpStakes', 'DpProof', 'DpDay', 'DpVision', 'DpEnd']

# 1) concat video (identical codec settings -> stream copy)
listfile = os.path.join(WORK, 'concat.txt')
with open(listfile, 'w') as f:
    for s in SHOTS:
        f.write(f"file '{OUT}/{s}.mp4'\n")
silent = os.path.join(WORK, 'video_silent.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0',
                '-i', listfile, '-c', 'copy', silent], check=True)

dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                            '-of', 'csv=p=0', silent], capture_output=True, text=True).stdout)
print('silent duration', dur)

SFX = os.path.join(ROOT, 'media', 'library', 'sfx', 'clips')
MUS = os.path.join(ROOT, 'media', 'library', 'music', 'clips', 'tech-pulse.mp3')

# 2) SFX cue sheet: (time s, clip, gain). Calm and sparse; payoffs lead.
cues = [
    (0.15, 'impact-soft', 0.55),        # logo on
    (1.00, 'sparkle-soft', 0.40),       # logo particles
    (2.90, 'whoosh-soft', 0.40),        # hook line 1
    (7.30, 'pop-reveal', 0.45),         # marcus enters
    (14.00, 'whoosh-soft', 0.40),       # -> stakes
    (26.00, 'whoosh-soft', 0.40),       # -> proof
    (28.33, 'ui-click-soft', 0.35),     # card 1
    (30.33, 'ui-click-soft', 0.35),     # card 2
    (32.33, 'ui-click-soft', 0.35),     # card 3
    (34.33, 'ui-click-soft', 0.35),     # card 4
    (38.67, 'impact-soft', 0.50),       # proof payoff
    (46.00, 'whoosh-soft', 0.40),       # -> day
    (47.33, 'ui-click-soft', 0.32),     # timeline 1
    (49.50, 'ui-click-soft', 0.32),     # timeline 2
    (51.67, 'ui-click-soft', 0.32),     # timeline 3
    (53.83, 'ui-click-soft', 0.32),     # timeline 4
    (56.33, 'pop-reveal', 0.45),        # zoe payoff card
    (60.00, 'whoosh-wind', 0.40),       # -> vision
    (61.80, 'pencil-scribble', 0.40),   # strike-through
    (69.80, 'riser-soft', 0.38),        # build into the close
    (72.00, 'whoosh-soft', 0.40),       # -> end
    (76.33, 'impact-deep-soft', 0.55),  # end card lands
    (80.67, 'ui-click-soft', 0.35),     # BUILD.
    (81.33, 'ui-click-soft', 0.35),     # SHIP.
    (82.00, 'ui-click-soft', 0.35),     # REPEAT.
    (83.00, 'chime-reward', 0.50),      # signature: subscribe / it's live
]

inputs = ['-i', MUS, '-i', MUS]
filters = []
# music: two copies crossfaded -> trim to dur, fade in/out, level
filters.append('[0:a][1:a]acrossfade=d=4:c1=tri:c2=tri[mx]')
filters.append(f'[mx]atrim=0:{dur:.3f},afade=t=in:d=1.2,afade=t=out:st={dur-4:.3f}:d=4,volume=0.32[music]')

mixin = ['[music]']
for i, (t, clip, g) in enumerate(cues):
    inputs += ['-i', os.path.join(SFX, clip + '.mp3')]
    idx = 2 + i
    ms = int(t * 1000)
    filters.append(f'[{idx}:a]volume={g},adelay={ms}|{ms}[s{i}]')
    mixin.append(f'[s{i}]')

filters.append(f"{''.join(mixin)}amix=inputs={len(mixin)}:normalize=0,alimiter=limit=0.891[aout]")

audio = os.path.join(WORK, 'audio_mix.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error'] + inputs +
               ['-filter_complex', ';'.join(filters), '-map', '[aout]',
                '-ar', '48000', audio], check=True)

# 3) mux
final = os.path.join(PROJ, 'final.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', silent, '-i', audio,
                '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k',
                '-movflags', '+faststart', '-shortest', final], check=True)
print('final ->', final)
subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', final])
