"""DYK No. 07 cue table (from No. 04) — ONE source for the SFX mix (build_final.py) and the beat map (make_beatmap.py).

Each entry: (when, clip, gain, visual) where `when` is
  ('w', scene, token, nth, shift)  → the word's start in the master (+shift s), or
  ('we', scene, token, nth, shift) → the word's END in the master (+shift s), or
  ('s', shot, seconds)             → a fixed time inside a shot, or
  ('after_did', scene)             → just after "Did you know THAT" (the chime lands after the phrase).
`visual` names the on-screen event the sound marks (it must exist in the shot's TSX at that word).
Ticks: ('ticks', scene, token, n, step_frames, nth, shift, visual) expand to n soft clicks.
v2: the per-shot cues live in cue_parts/<Shot>.py (exec'd below, in SHOT_ORDER, with c / W / S / ticks in scope),
so each shot's sounds sit next to nothing but that shot. This file keeps the format and the shared era rituals.
Rules (skill): every visual event has a sound, every sound a visual; ≤ 3 clicks/s; DYK click before
"Did", chime after "that"; riser ends on its payoff (shift −1.36); one minor-piano per cliffhanger.
"""
import os

ERA_SHOTS = ['Lt1500', 'Lt1807', 'Lt1859', 'Lt1882', 'Lt1993', 'LtToday']   # Lt2100 opens on the ladder; its header slams on "twenty" (in its part)
ERA_VO = ['lt04-1500', 'lt05-1807', 'lt06-1859', 'lt07-1882', 'lt08-1993', 'lt09-today']
EXIT_SHOTS = ['Lt1500', 'Lt1807', 'Lt1859', 'Lt1882', 'Lt1993']   # shots wrapped in EraExit (0.9 s pull-in)


def W(scene, token, nth=1, shift=0.0):
    return ('w', scene, token, nth, shift)


def WE(scene, token, nth=1, shift=0.0):
    """The END of the word (+shift s) — for a hit that lands just after its word."""
    return ('we', scene, token, nth, shift)


def S(shot, sec):
    return ('s', shot, sec)


def H(scene, prev, nxt, extra=0.0, hold_s=53 / 30):   # = kit HOLD_F (53 f)
    """A panel boundary held >= hold_s after the previous panel's last reveal (audit round 1, kit `hold`):
    max(start of nxt word, start of prev word + hold_s) + extra. prev/nxt = (token, nth)."""
    return ('hold', scene, prev, nxt, extra, hold_s)


C = []   # (when, clip, gain, visual)
T = []   # ticks


def c(when, clip, gain, visual):
    C.append((when, clip, gain, visual))


def ticks(scene, token, n, step_f, visual, nth=1, shift=0.0):
    T.append((scene, token, n, step_f, nth, shift, visual))


# ── era openers + exits + the per-era DYK ritual
for shot in ERA_SHOTS:
    c(S(shot, 0.0), 'whoosh-wind', 0.34, 'era cut: YOU WAKE UP IN · year')
    c(S(shot, 0.12), 'impact-soft', 0.38, 'year slams in')
for scene in ERA_VO:
    c(W(scene, 'Did', shift=-0.25), 'ui-toggle-on', 0.28, 'DID YOU KNOW THAT… card switches on')
    c(('after_did', scene), 'chime-magic', 0.24, '(chime after "that")')


# ── per-shot parts (v2)
PART_ORDER = ['LtHook', 'LtIntro', 'LtWelcome', 'LtPromise', 'Lt1500', 'Lt1807', 'Lt1859', 'Lt1882',
              'Lt1993', 'LtToday', 'LtReveal', 'Lt2100', 'LtClose', 'LtOutro']
_PARTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cue_parts')
for _shot in PART_ORDER:
    _path = os.path.join(_PARTS, f'{_shot}.py')
    exec(compile(open(_path).read(), _path, 'exec'), globals())
