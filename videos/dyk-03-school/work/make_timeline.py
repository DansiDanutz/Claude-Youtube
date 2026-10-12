#!/usr/bin/env python3
"""timeline.json for DYK No. 03 — computed from the narration (durations.json), never guessed.
Format (same as No. 01): {shot: [seconds, {vo_scene: offset_s_inside_shot}]}, every length a whole
number of frames at 30 fps. It drives both the shots (makeCue offsets / durationInSeconds) and build_final.py.
Hard-gate rules: voice lead-in 0.5–0.8 s, tail 0.6–0.9 s (longer only for an intentional question beat)."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(WORK, 'narration', 'durations.json')))
FPS = 30
INTRO_S = 7.5          # DytSting (4.5 s) + episode title card — fixed, no VO
END_SCREEN_S = 16.6    # 15 s of FULL end screen + its 1.0 s build-in + the 0.6 s final fade (reviewer 2026-10-12)


def frames(sec):
    return round(sec * FPS)


def shot(lines, lead, gap=0.7, tail=0.8):
    """lines: vo scene ids played in order inside one shot."""
    offs, t = {}, lead
    for i, sid in enumerate(lines):
        offs[sid] = round(t, 3)
        t += D[sid] + (gap if i + 1 < len(lines) else tail)
    return [frames(t) / FPS, offs]


TL = {
    'ScHook': shot(['sc01-hook', 'sc02-question'], lead=0.6, gap=0.75, tail=0.9),
    'ScIntro': [INTRO_S, {}],
    'ScWelcome': shot(['sc00-welcome'], lead=0.6, tail=0.8),
    'ScPromise': shot(['sc03-promise'], lead=0.6, tail=0.8),
}
for sid, vo in [('Sc1500', 'sc04-1500'), ('Sc1647', 'sc05-1647'), ('Sc1763', 'sc06-1763'), ('Sc1810', 'sc07-1810'),
                ('Sc1948', 'sc08-1948'), ('ScToday', 'sc09-today')]:
    TL[sid] = shot([vo], lead=0.8, tail=0.9)
TL['ScReveal'] = shot(['sc10-reveal'], lead=0.8, tail=0.9)
TL['Sc2100'] = shot(['sc11-2100'], lead=0.8, tail=0.9)
TL['ScClose'] = shot(['sc12-close'], lead=0.6, tail=1.4)       # intentional question beat
# outro: line, 24-frame hand-off, then the 15 s end screen; the end-screen line starts 14 frames in
out_end_f = frames(0.6 + D['sc13-outro'])
es_f = out_end_f + 24
TL['ScOutro'] = [(es_f + frames(END_SCREEN_S)) / FPS, {'sc13-outro': 0.6, 'sc14-endscreen': round((es_f + 14) / FPS, 3)}]

json.dump(TL, open(os.path.join(WORK, 'timeline.json'), 'w'), indent=1)
total = sum(v[0] for v in TL.values())
for k, (d, o) in TL.items():
    print(f'{k:10s} {d:7.3f}s {frames(d):5d}f  {o}')
print(f'TOTAL {total:.2f}s = {int(total // 60)}:{total % 60:04.1f}')
