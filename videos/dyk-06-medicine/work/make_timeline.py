#!/usr/bin/env python3
"""timeline.json for DYK No. 06 — computed from the narration (durations.json), never guessed.
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
    'MeHook': shot(['me01-hook', 'me02-question'], lead=0.6, gap=0.75, tail=0.9),
    'MeIntro': [INTRO_S, {}],
    'MeWelcome': shot(['me00-welcome'], lead=0.6, tail=0.8),
    'MePromise': shot(['me03-promise'], lead=0.6, tail=1.3),   # audit round 1: the closing question needs ≥ 1.5 s on screen
}
for sid, vo in [('Me1537', 'me04-1537'), ('Me1799', 'me05-1799'), ('Me1847', 'me06-1847'), ('Me1941', 'me07-1941'),
                ('Me1948', 'me08-1948'), ('MeToday', 'me09-today')]:
    # audit round 3: the last cliffhanger line lands on its final word — 1884/1915/1966 need ≥ 1.5 s before the cut
    # rounds 3-4: the last cliffhanger line / payoff needs ≥ 1.5 s before the cut
    TL[sid] = shot([vo], lead=0.8, tail=1.25)
TL['MeReveal'] = shot(['me10-reveal'], lead=0.8, tail=1.25)
TL['Me2100'] = shot(['me11-2100'], lead=0.8, tail=1.25)
TL['MeClose'] = shot(['me12-close'], lead=0.6, tail=1.4)       # intentional question beat
# outro: ritual, the swappable No. 07 teaser, the sign-off, a 24-frame hand-off, then the 15 s end screen;
# the end-screen line starts 14 frames in. Offsets are whole frames so the TSX can re-derive them exactly.
o_ritual = 0.6
o_next = frames(o_ritual + D['me13-outro'] + 0.7) / FPS
o_sign = frames(o_next + D['me13b-next'] + 0.8) / FPS
out_end_f = frames(o_sign + D['me13c-signoff'])
es_f = out_end_f + 54   # round 5: REPEAT. holds 1.5 s; the end screen keeps the same total length (15.6 s from ES)
TL['MeOutro'] = [(es_f + frames(END_SCREEN_S - 1.0)) / FPS, {'me13-outro': o_ritual, 'me13b-next': round(o_next, 3),
                 'me13c-signoff': round(o_sign, 3), 'me14-endscreen': round((es_f + 14) / FPS, 3)}]

json.dump(TL, open(os.path.join(WORK, 'timeline.json'), 'w'), indent=1)
total = sum(v[0] for v in TL.values())
for k, (d, o) in TL.items():
    print(f'{k:10s} {d:7.3f}s {frames(d):5d}f  {o}')
print(f'TOTAL {total:.2f}s = {int(total // 60)}:{total % 60:04.1f}')
