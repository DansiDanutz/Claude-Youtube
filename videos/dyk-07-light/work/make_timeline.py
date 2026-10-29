#!/usr/bin/env python3
"""timeline.json for DYK No. 07 — computed from the narration (durations.json), never guessed.
Format (same as No. 01): {shot: [seconds, {vo_scene: offset_s_inside_shot}]}, every length a whole
number of frames at 30 fps. It drives both the shots (makeCue offsets / durationInSeconds) and build_final.py.
Hard-gate rules: voice lead-in 0.5–0.8 s, tail 0.6–0.9 s (longer only for an intentional question beat)."""
import json, os

WORK = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(WORK, 'narration', 'durations.json')))
FPS = 30
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


# Recut 2026-10-29 (VidNinjas pre-roll rule ≤ ~90 words / 35 s): ONE cold-open scene spliced from the existing takes
# (splice_coldopen.py) replaces hook + sting + welcome + promise. Its tail holds CHECK YOUR GUESS's tick 1 s, then
# the 1.8 s brand flash that stands in for the 7.5 s sting, then straight into 1500.
COLD_TAIL = 2.04    # = the tick held 0.8 s + FLASH_F 54 f in LtHook.tsx
TL = {
    'LtHook': shot(['lt01-cold'], lead=0.6, tail=COLD_TAIL),
}
for sid, vo in [('Lt1500', 'lt04-1500'), ('Lt1807', 'lt05-1807'), ('Lt1859', 'lt06-1859'), ('Lt1882', 'lt07-1882'),
                ('Lt1993', 'lt08-1993'), ('LtToday', 'lt09-today')]:
    # No. 06 audit rounds 3-4: the last cliffhanger line needs ≥ 1.5 s before the cut
    TL[sid] = shot([vo], lead=0.8, tail=1.25)
TL['LtReveal'] = shot(['lt10-reveal'], lead=0.8, tail=1.25)
TL['Lt2100'] = shot(['lt11-2100'], lead=0.8, tail=1.25)
TL['LtClose'] = shot(['lt12-close'], lead=0.6, tail=1.4)       # intentional question beat
# outro: ritual, the swappable No. 08 teaser, the sign-off, a 24-frame hand-off, then the 15 s end screen;
# the end-screen line starts 14 frames in. Offsets are whole frames so the TSX can re-derive them exactly.
o_ritual = 0.6
o_next = frames(o_ritual + D['lt13-outro'] + 0.7) / FPS
o_sign = frames(o_next + D['lt13b-next'] + 0.8) / FPS
out_end_f = frames(o_sign + D['lt13c-signoff'])
es_f = out_end_f + 54   # round 5: REPEAT. holds 1.5 s; the end screen keeps the same total length (15.6 s from ES)
TL['LtOutro'] = [(es_f + frames(END_SCREEN_S - 1.0)) / FPS, {'lt13-outro': o_ritual, 'lt13b-next': round(o_next, 3),
                 'lt13c-signoff': round(o_sign, 3), 'lt14-endscreen': round((es_f + 14) / FPS, 3)}]

json.dump(TL, open(os.path.join(WORK, 'timeline.json'), 'w'), indent=1)
total = sum(v[0] for v in TL.values())
for k, (d, o) in TL.items():
    print(f'{k:10s} {d:7.3f}s {frames(d):5d}f  {o}')
print(f'TOTAL {total:.2f}s = {int(total // 60)}:{total % 60:04.1f}')
