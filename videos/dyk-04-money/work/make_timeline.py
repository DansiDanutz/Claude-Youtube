#!/usr/bin/env python3
"""timeline.json for DYK No. 04 — computed from the narration (durations.json), never guessed.
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
    'MoHook': shot(['mo01-hook', 'mo02-question'], lead=0.6, gap=0.75, tail=0.9),
    'MoIntro': [INTRO_S, {}],
    'MoWelcome': shot(['mo00-welcome'], lead=0.6, tail=0.8),
    'MoPromise': shot(['mo03-promise'], lead=0.6, tail=0.8),
}
for sid, vo in [('Mo1500', 'mo04-1500'), ('Mo1661', 'mo05-1661'), ('Mo1720', 'mo06-1720'), ('Mo1821', 'mo07-1821'),
                ('Mo1971', 'mo08-1971'), ('MoToday', 'mo09-today')]:
    TL[sid] = shot([vo], lead=0.8, tail=0.9)
TL['MoReveal'] = shot(['mo10-reveal'], lead=0.8, tail=0.9)
TL['Mo2100'] = shot(['mo11-2100'], lead=0.8, tail=0.9)
TL['MoClose'] = shot(['mo12-close'], lead=0.6, tail=1.4)       # intentional question beat
# outro: ritual, the swappable No. 05 teaser, the sign-off, a 24-frame hand-off, then the 15 s end screen;
# the end-screen line starts 14 frames in. Offsets are whole frames so the TSX can re-derive them exactly.
o_ritual = 0.6
o_next = frames(o_ritual + D['mo13-outro'] + 0.7) / FPS
o_sign = frames(o_next + D['mo13b-next'] + 0.8) / FPS
out_end_f = frames(o_sign + D['mo13c-signoff'])
es_f = out_end_f + 24
TL['MoOutro'] = [(es_f + frames(END_SCREEN_S)) / FPS, {'mo13-outro': o_ritual, 'mo13b-next': round(o_next, 3),
                 'mo13c-signoff': round(o_sign, 3), 'mo14-endscreen': round((es_f + 14) / FPS, 3)}]

json.dump(TL, open(os.path.join(WORK, 'timeline.json'), 'w'), indent=1)
total = sum(v[0] for v in TL.values())
for k, (d, o) in TL.items():
    print(f'{k:10s} {d:7.3f}s {frames(d):5d}f  {o}')
print(f'TOTAL {total:.2f}s = {int(total // 60)}:{total % 60:04.1f}')
