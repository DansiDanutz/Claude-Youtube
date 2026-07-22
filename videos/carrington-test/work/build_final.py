"""Concat the carrington-test shots and mix Brian VO + music + SFX under them.
Same pattern as videos/danslab-profile/work/build_final.py, plus the voice
lane: narration is VOICE ONLY (ElevenLabs Brian via the zurich engine; see
work/narration/). Shot timeline: CtHook 0-12, CtPromise 12-25, CtStakes 25-41,
CtCarrington 41-56, CtExperiment 56-72, CtReveal 72-87, CtEnd 87-98.
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
VO = os.path.join(WORK, 'narration')

# 2) VO placement: (time s, file). Voice leads the mix; everything ducks under it.
vo_cues = [
    (3.00, 'vo1-hook'),        # after the <2s logo, over the key scene
    (12.80, 'vo2-promise'),
    (25.80, 'vo3-stakes'),
    (41.80, 'vo4-carrington'),
    (56.80, 'vo5-experiment'),
    (72.80, 'vo6-reveal'),
    (87.50, 'vo7-end'),
]

# 3) SFX cue sheet: (time s, clip, gain). Calm and sparse; payoffs lead.
cues = [
    (0.15, 'impact-soft', 0.55),        # logo on
    (1.00, 'sparkle-soft', 0.40),       # logo build
    (2.20, 'whoosh-wind', 0.40),        # paper hands to the night scene
    (3.10, 'impact-soft', 0.38),        # "Every battery, disconnected."
    (6.40, 'riser-soft', 0.32),         # build into the question
    (7.10, 'impact-deep-soft', 0.48),   # "Why?"
    (12.00, 'whoosh-soft', 0.40),       # -> promise
    (13.00, 'impact-soft', 0.36),       # promise line lands
    (14.30, 'sparkle-soft', 0.28),      # wire draws across the map
    (16.00, 'pop-reveal', 0.40),        # arlo enters
    (25.00, 'whoosh-soft', 0.40),       # -> stakes
    (26.30, 'ui-click-soft', 0.33),     # fact chip 1
    (28.70, 'ui-click-soft', 0.33),     # fact chip 2
    (31.00, 'ui-click-soft', 0.33),     # fact chip 3
    (34.60, 'riser-soft', 0.32),        # into the direct address
    (35.20, 'impact-soft', 0.44),       # "What would YOU touch next?"
    (41.00, 'whoosh-wind', 0.40),       # -> carrington (calmer air)
    (44.00, 'sparkle-soft', 0.38),      # the two white patches erupt
    (51.00, 'impact-soft', 0.38),       # "17.6 hours later"
    (56.00, 'whoosh-soft', 0.40),       # -> experiment
    (57.20, 'ui-send', 0.36),           # dispatch 1
    (59.90, 'ui-send', 0.36),           # dispatch 2
    (62.50, 'ui-send', 0.36),           # dispatch 3
    (65.70, 'impact-deep-soft', 0.48),  # "Two hours of real dispatches."
    (66.30, 'keys-typing-soft', 0.26),  # morse strip ticks
    (72.00, 'whoosh-soft', 0.40),       # -> reveal
    (73.00, 'stream-soft', 0.22),       # diagram draws
    (79.00, 'impact-soft', 0.42),       # "The planet was driving the circuit."
    (79.40, 'pop-reveal', 0.38),        # zoe reacts
    (82.00, 'riser-soft', 0.30),        # resonance line
    (87.00, 'whoosh-wind', 0.40),       # -> end
    (87.60, 'impact-soft', 0.38),       # closing question
    (92.70, 'impact-deep-soft', 0.52),  # end card lands
    (95.10, 'ui-click-soft', 0.33),     # BUILD.
    (95.65, 'ui-click-soft', 0.33),     # SHIP.
    (96.20, 'ui-click-soft', 0.33),     # REPEAT.
    (96.90, 'chime-reward', 0.48),      # signature: subscribe
]

inputs = ['-i', MUS, '-i', MUS]
filters = []
# music: two copies crossfaded -> trim to dur, fade in/out, level (low under voice)
filters.append('[0:a][1:a]acrossfade=d=4:c1=tri:c2=tri[mx]')
filters.append(f'[mx]atrim=0:{dur:.3f},afade=t=in:d=1.2,afade=t=out:st={dur-4:.3f}:d=4,volume=0.22[music]')

mixin = ['[music]']
n = 2
for i, (t, clip, g) in enumerate(cues):
    inputs += ['-i', os.path.join(SFX, clip + '.mp3')]
    ms = int(t * 1000)
    filters.append(f'[{n}:a]volume={g},adelay={ms}|{ms}[s{i}]')
    mixin.append(f'[s{i}]')
    n += 1
for i, (t, name) in enumerate(vo_cues):
    inputs += ['-i', os.path.join(VO, name + '.mp3')]
    ms = int(t * 1000)
    filters.append(f'[{n}:a]volume=1.0,adelay={ms}|{ms}[v{i}]')
    mixin.append(f'[v{i}]')
    n += 1

filters.append(f"{''.join(mixin)}amix=inputs={len(mixin)}:normalize=0,alimiter=limit=0.891[aout]")

audio = os.path.join(WORK, 'audio_mix.wav')
subprocess.run(['ffmpeg', '-y', '-v', 'error'] + inputs +
               ['-filter_complex', ';'.join(filters), '-map', '[aout]',
                '-ar', '48000', audio], check=True)

# 4) mux
final = os.path.join(PROJ, 'final.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', silent, '-i', audio,
                '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k',
                '-movflags', '+faststart', '-shortest', final], check=True)
print('final ->', final)
subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', final])
