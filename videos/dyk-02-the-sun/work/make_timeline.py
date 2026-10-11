#!/usr/bin/env python3
"""timeline.json for DYK No. 02 — computed from the narration (durations.json), never guessed.
Format (same as No. 01): {shot: [seconds, {vo_scene: offset_s_inside_shot}]}, every length a whole
number of frames at 30 fps. It drives both the shots (makeCue offsets / durationInSeconds) and build_final.py.
Hard-gate rules: voice lead-in 0.5–0.8 s, tail 0.6–0.9 s (longer only for an intentional question beat)."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(WORK, 'narration', 'durations.json')))
FPS = 30
INTRO_S = 7.5          # DytSting (4.5 s) + episode title card — fixed, no VO
END_SCREEN_S = 15.0    # end screen after the outro line (YouTube end-screen elements)


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
    'SuHook': shot(['su01-hook', 'su02-question'], lead=0.4, gap=0.75, tail=0.9),
    'SuIntro': [INTRO_S, {}],
    'SuWelcome': shot(['su00-welcome'], lead=0.5, tail=0.8),
    'SuPromise': shot(['su03-promise'], lead=0.5, tail=0.8),
}
for sid, vo in [('Su1500', 'su04-1500'), ('Su1610', 'su05-1610'), ('Su1700', 'su06-1700'), ('Su1800', 'su07-1800'),
                ('Su1900', 'su08-1900'), ('Su2000', 'su09-2000')]:
    TL[sid] = shot([vo], lead=0.8, tail=0.9)
TL['SuReveal'] = shot(['su10-reveal'], lead=0.8, tail=0.9)
TL['Su2100'] = shot(['su11-2100'], lead=0.8, tail=0.9)
TL['SuClose'] = shot(['su12-close'], lead=0.5, tail=1.4)       # intentional question beat
# outro: line, 24-frame hand-off, then the 15 s end screen; the end-screen line starts 14 frames in
out_end_f = frames(0.6 + D['su13-outro'])
es_f = out_end_f + 24
TL['SuOutro'] = [(es_f + frames(END_SCREEN_S)) / FPS, {'su13-outro': 0.6, 'su14-endscreen': round((es_f + 14) / FPS, 3)}]

json.dump(TL, open(os.path.join(WORK, 'timeline.json'), 'w'), indent=1)
total = sum(v[0] for v in TL.values())
for k, (d, o) in TL.items():
    print(f'{k:10s} {d:7.3f}s {frames(d):5d}f  {o}')
print(f'TOTAL {total:.2f}s = {int(total // 60)}:{total % 60:04.1f}')
