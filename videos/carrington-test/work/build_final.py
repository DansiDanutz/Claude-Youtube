"""Concat the carrington-test shots and mix music + SFX under them.
Same pattern as videos/danslab-profile/work/build_final.py (the approved
stack test): stream-copy concat -> cue-sheet SFX mix -> mux.
Shot timeline: CtHook 0-12, CtPromise 12-25, CtStakes 25-40, CtCarrington
40-55, CtExperiment 55-70, CtReveal 70-83, CtEnd 83-94.
"""
import os, subprocess

ROOT = os.path.expanduser('~/Projects/Claude-Youtube')
OUT = os.path.join(ROOT, 'remotion', 'out')
PROJ = os.path.join(ROOT, 'videos', 'carrington-test')
WORK = os.path.join(PROJ, 'work')
os.makedirs(WORK, exist_ok=True)

SHOTS = ['CtHook', 'CtPromise', 'CtStakes', 'CtCarrington', 'CtExperiment', 'CtReveal', 'CtEnd']

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
MUS = os.path.join(ROOT, 'media', 'library', 'music', 'clips', 'cinematic-min.mp3')

# 2) SFX cue sheet: (time s, clip, gain). Calm and sparse; payoffs lead.
cues = [
    (0.15, 'impact-soft', 0.55),        # logo on
    (1.00, 'sparkle-soft', 0.40),       # logo build
    (2.20, 'whoosh-wind', 0.40),        # paper hands to the night scene
    (3.10, 'impact-soft', 0.42),        # "Every battery, disconnected."
    (6.40, 'riser-soft', 0.36),         # build into the question
    (7.10, 'impact-deep-soft', 0.52),   # "Why?"
    (12.00, 'whoosh-soft', 0.40),       # -> promise
    (13.00, 'impact-soft', 0.40),       # promise line lands
    (14.30, 'sparkle-soft', 0.30),      # wire draws across the map
    (16.00, 'pop-reveal', 0.42),        # arlo enters
    (25.00, 'whoosh-soft', 0.40),       # -> stakes
    (26.30, 'ui-click-soft', 0.35),     # fact chip 1
    (28.70, 'ui-click-soft', 0.35),     # fact chip 2
    (31.00, 'ui-click-soft', 0.35),     # fact chip 3
    (34.60, 'riser-soft', 0.36),        # into the direct address
    (35.20, 'impact-soft', 0.48),       # "What would YOU touch next?"
    (40.00, 'whoosh-wind', 0.40),       # -> carrington (calmer air)
    (43.00, 'sparkle-soft', 0.40),      # the two white patches erupt
    (50.00, 'impact-soft', 0.42),       # "17.6 hours later"
    (55.00, 'whoosh-soft', 0.40),       # -> experiment
    (56.20, 'ui-send', 0.38),           # dispatch 1
    (58.90, 'ui-send', 0.38),           # dispatch 2
    (61.50, 'ui-send', 0.38),           # dispatch 3
    (64.70, 'impact-deep-soft', 0.52),  # "Two hours of real dispatches."
    (65.30, 'keys-typing-soft', 0.28),  # morse strip ticks
    (70.00, 'whoosh-soft', 0.40),       # -> reveal
    (71.00, 'stream-soft', 0.24),       # diagram draws
    (77.00, 'impact-soft', 0.46),       # "The planet was driving the circuit."
    (77.40, 'pop-reveal', 0.40),        # zoe reacts
    (80.00, 'riser-soft', 0.34),        # resonance line
    (83.00, 'whoosh-wind', 0.40),       # -> end
    (83.60, 'impact-soft', 0.42),       # closing question
    (88.70, 'impact-deep-soft', 0.55),  # end card lands
    (91.10, 'ui-click-soft', 0.35),     # BUILD.
    (91.65, 'ui-click-soft', 0.35),     # SHIP.
    (92.20, 'ui-click-soft', 0.35),     # REPEAT.
    (92.80, 'chime-reward', 0.50),      # signature: subscribe
]

inputs = ['-i', MUS, '-i', MUS]
filters = []
# music: two copies crossfaded -> trim to dur, fade in/out, level
filters.append('[0:a][1:a]acrossfade=d=4:c1=tri:c2=tri[mx]')
filters.append(f'[mx]atrim=0:{dur:.3f},afade=t=in:d=1.2,afade=t=out:st={dur-4:.3f}:d=4,volume=0.30[music]')

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
