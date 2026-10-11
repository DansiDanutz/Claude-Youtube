#!/usr/bin/env python3
"""Assemble DYK No. 01 "Time, Compressed": concat the Tc* shots, lay Brian's VO,
a word-synced SFX pass and a sidechain-ducked music bed, master to the delivery
spec (stereo 48 kHz, -14 LUFS, <= -1 dBTP, CFR 30, +faststart).

Carrington build_final.py pattern, plus the episode-skill fixes:
  * SFX cue times come from the Brian alignment (vo.json), never guessed offsets
  * SFX mixed in groups of <=35 inputs (the >70-input amix failure)
  * loudness: measure -> flat gain -> limiter -> re-measure with the SAME ebur128 meter
  * final encode forces -r 30 -fps_mode cfr (pts holes at shot joins stall players)
Run from anywhere:  python3 videos/dyk-01-time-compressed/work/build_final.py
"""
import json, os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))  # repo root, from this file
OUT = os.path.join(ROOT, 'remotion', 'out')
PROJ = os.path.join(ROOT, 'videos', 'dyk-01-time-compressed')
WORK = os.path.join(PROJ, 'work')
NARR = os.path.join(WORK, 'narration')
BUS = os.path.join(WORK, 'bus')
SFX = os.path.join(ROOT, 'media', 'library', 'sfx', 'clips')
MUSIC = os.path.join(ROOT, 'media', 'library', 'music', 'clips', 'cinematic-min.mp3')
VO = json.load(open(os.path.join(ROOT, 'remotion', 'src', 'shots', 'dyk-01', 'vo.json')))
os.makedirs(BUS, exist_ok=True)

TARGET_LUFS = -14.0
LIMIT_DBTP = -1.8          # limiter ceiling (sample); headroom so true peak after AAC stays <= -1.0 dBTP
MUSIC_LEVEL = 0.32
SFX_GROUP = 35

# (shot id, seconds, [(vo scene, offset inside shot)]) — offsets match each shot's makeCue()
SHOTS = [
    ('TcHook', 22.2, [('tc01-hook', 0.6), ('tc02-question', 9.9)]),
    ('TcIntro', 7.5, []),
    ('TcWelcome', 26.2, [('tc00-welcome', 0.6)]),
    ('TcPromise', 17.6, [('tc03-promise', 0.5)]),
    ('Tc1500', 56.4, [('tc04-1500', 1.0)]),
    ('Tc1600', 50.3, [('tc05-1600', 1.0)]),
    ('Tc1700', 57.7, [('tc06-1700', 1.0)]),
    ('Tc1800', 64.7, [('tc07-1800', 1.0)]),
    ('Tc1900', 52.5, [('tc08-1900', 1.0)]),
    ('Tc2000', 44.0, [('tc09-2000', 1.0)]),
    ('TcReveal', 47.7, [('tc10-reveal', 0.8)]),
    ('Tc2100', 44.5, [('tc11-2100', 1.0)]),
    ('TcClose', 12.5, [('tc12-close', 0.6)]),
    ('TcOutro', 63.3, [('tc13-outro', 0.6), ('tc14-endscreen', None)]),
]
# shot lengths + VO offsets come from timeline.json (written from the narration timings)
_TL = json.load(open(os.path.join(WORK, 'timeline.json')))
SHOTS = [(sid, (_TL[sid][0] if sid in _TL else dur),
          [(sc, (_TL[sid][1].get(sc, off) if sid in _TL else off)) for sc, off in vos]) for sid, dur, vos in SHOTS]
OUTRO_END_F = round((0.6 + VO['tc13-outro']['dur']) * 30)
ES_F = OUTRO_END_F + 24
SHOTS = [(sid, dur, [(sc, off if off is not None else (ES_F + 14) / 30) for sc, off in vos]) for sid, dur, vos in SHOTS]
START, t = {}, 0.0
for sid, dur, _ in SHOTS:
    START[sid] = t
    t += dur
TOTAL = t
VO_AT = {scene: START[sid] + off for sid, _, vos in SHOTS for scene, off in vos}


def norm(w):
    return re.sub(r'[^a-z0-9]', '', w.lower())


def w(scene, token, nth=1, shift=0.0):
    """Absolute time (s) of the nth occurrence of token in a VO scene."""
    seen = 0
    for word in VO[scene]['words']:
        if norm(word['w']) == norm(token):
            seen += 1
            if seen == nth:
                return VO_AT[scene] + word['s'] + shift
    sys.exit(f'cue "{token}"#{nth} missing in {scene}')


def s(shot, sec):
    return START[shot] + sec


# ── SFX cue sheet: (time, clip, gain). Whoosh per cut, stamps on stamps, one riser→payoff.
CUES = [
    (s('TcHook', 0.0), 'wind-soft', 0.30),
    (w('tc01-hook', 'horse'), 'knock-solid', 0.30),
    (w('tc01-hook', 'Atlantic'), 'ui-send', 0.38),
    (w('tc01-hook', 'tenth'), 'pop-reveal', 0.34),
    (w('tc02-question', 'saved'), 'warm-shimmer', 0.30),
    (w('tc02-question', 'running'), 'clock-tick-soft', 0.42),
    (w('tc02-question', 'compressing', shift=-1.36), 'riser-soft', 0.34),
    (w('tc02-question', 'compressing'), 'impact-deep-soft', 0.52),
    # "Did You Know That?" signature sting — the SAME sound every episode (sonic logo)
    (s('TcIntro', 0.10), 'scan-hum', 0.24),
    (s('TcIntro', 0.40), 'ui-toggle-on', 0.50),      # the bulb switches on
    (s('TcIntro', 0.62), 'sparkle-soft', 0.46),      # glow + sparks
    (s('TcIntro', 1.25), 'whoosh-soft', 0.40),       # logo slides, wordmark arrives
    (s('TcIntro', 1.53), 'knock-solid', 0.30),       # DID
    (s('TcIntro', 1.73), 'knock-solid', 0.30),       # YOU
    (s('TcIntro', 1.93), 'knock-solid', 0.30),       # KNOW
    (s('TcIntro', 2.13), 'impact-deep-soft', 0.55),  # THAT?
    (s('TcIntro', 2.85), 'chime-magic', 0.42),       # tagline
    (s('TcIntro', 4.50), 'whoosh-soft', 0.30),       # episode card
    # first-episode welcome
    (w('tc00-welcome', 'Welcome'), 'warm-shimmer', 0.32),
    (w('tc00-welcome', 'question'), 'pop-reveal', 0.36),
    (w('tc00-welcome', 'answer', 1), 'chime-reward', 0.34),
    (w('tc00-welcome', 'Science'), 'pop-reveal', 0.30),
    (w('tc00-welcome', 'History'), 'pop-reveal', 0.30),
    (w('tc00-welcome', 'Space'), 'pop-reveal', 0.30),
    (w('tc00-welcome', 'mind'), 'pop-reveal', 0.30),
    (w('tc00-welcome', 'better'), 'sparkle-soft', 0.34),
    (w('tc00-welcome', 'rule'), 'impact-deep-soft', 0.46),
    (w('tc00-welcome', 'guess'), 'stamp-hit', 0.36),
    (w('tc00-welcome', 'stay'), 'stamp-hit', 0.36),
    (w('tc00-welcome', 'right'), 'stamp-hit', 0.36),
    (w('tc00-welcome', 'begin', shift=-1.36), 'riser-soft', 0.30),
    (w('tc00-welcome', 'begin'), 'whoosh-wind', 0.38),
    # promise
    (s('TcPromise', 0.0), 'whoosh-wind', 0.36),
    (w('tc03-promise', 'centuries'), 'pop-reveal', 0.32),
    (w('tc03-promise', 'mornings'), 'sparkle-soft', 0.32),
    (w('tc03-promise', 'In', shift=-0.13), 'ui-click-soft', 0.34),   # IN EACH ONE chip
    (w('tc03-promise', 'twenty'), 'piano-a-min', 0.30),
]
for shot in ('Tc1500', 'Tc1600', 'Tc1700', 'Tc1800', 'Tc1900', 'Tc2000', 'Tc2100'):
    CUES += [(s(shot, 0.0), 'whoosh-wind', 0.36), (s(shot, 0.12), 'impact-soft', 0.40)]
# the per-era ritual: "Did you know that…" card = bulb click + chime; cliffhanger = minor-piano tension
ERA_VO = ['tc04-1500', 'tc05-1600', 'tc06-1700', 'tc07-1800', 'tc08-1900', 'tc09-2000']
def after_did(scene):
    """End of the word 'that' in 'Did you know that' — the chime lands AFTER the phrase, never on it."""
    words = VO[scene]['words']
    i = next(k for k, wd in enumerate(words) if norm(wd['w']) == 'did')
    return VO_AT[scene] + words[i + 3]['e']


for scene in ERA_VO:
    CUES += [(w(scene, 'Did', shift=-0.25), 'ui-toggle-on', 0.28), (after_did(scene) + 0.05, 'chime-magic', 0.30)]
for scene, token in [('tc04-1500', 'But'), ('tc05-1600', 'Nobody'), ('tc06-1700', 'lost'), ('tc07-1800', 'man')]:
    CUES.append((w(scene, token), 'piano-a-min', 0.32))
# cliffhanger exits: a reverse whoosh sucks the viewer into the next century (over the EraExit
# pull-in). Not Tc2000: TcReveal opens with its own reverse whoosh under the building title.
for shot in ('Tc1500', 'Tc1600', 'Tc1700', 'Tc1800', 'Tc1900'):
    end = START[shot] + dict((sid, d) for sid, d, _ in SHOTS)[shot]
    CUES.append((end - 0.95, 'whoosh-reverse', 0.30))


def repeat(clip, t0, t1, every, gain):
    """Low ambience bed built from a short clip laid end to end."""
    out, t = [], t0
    while t < t1:
        out.append((t, clip, gain))
        t += every
    return out


# Day Clock / Week Strip draw-on ticks (6 frames apart, matching DayClock/WeekStrip stagger)
def ticks(scene, token, n, step_f=6, shift=0.0, nth=1):
    t0 = w(scene, token, nth, shift)
    return [(t0 + i * step_f / 30, 'ui-click-soft', 0.15) for i in range(n)]


# (12-frame steps where a shot builds slowly: no more than ~2.5 ticks a second)
CUES += ticks('tc04-1500', 'Historians', 7, 12) + ticks('tc05-1600', 'For', 5) + ticks('tc06-1700', 'worked', 7, 12)
CUES += ticks('tc07-1800', 'fifty', 7, 12) + ticks('tc08-1900', 'twenty', 3)
CUES += [(w('tc09-2000', 'Did') + (116 + i * 6) / 30, 'ui-click-soft', 0.15) for i in range(5)]
# era ambience — quiet, under the voice
CUES += repeat('wind-soft', s('Tc1500', 0.2), w('tc04-1500', 'Your'), 2.0, 0.10)
CUES += [(w('tc04-1500', 'midnight', shift=0.5), 'owl-hoot', 0.22), (w('tc04-1500', 'prayed'), 'owl-hoot', 0.12)]
CUES += [(w('tc05-1600', 'read'), 'page-flip', 0.26), (w('tc05-1600', 'argue'), 'knock-solid', 0.16)]
CUES += [(w('tc06-1700', 'empty'), 'wind-soft', 0.20)]
CUES += repeat('clock-tick-soft', w('tc06-1700', 'factory'), w('tc06-1700', 'Harrison\'s'), 2.2, 0.12)
CUES += [(w('tc07-1800', 'twelve'), 'chime-reward', 0.30), (w('tc07-1800', 'noon', 1), 'knock-solid', 0.30)]
CUES += [(w('tc07-1800', 'two', shift=0.2), 'clock-tick-soft', 0.22)]
CUES += [(w('tc08-1900', 'line'), 'wind-soft', 0.14)]
CUES += [(w('tc08-1900', 'assembly') + i * 0.5, 'stamp-hit', 0.13) for i in range(6)]
CUES += [(w('tc08-1900', 'Saturdays'), 'warm-shimmer', 0.30)]
CUES += [(w('tc09-2000', 'checked') + d, 'pop-reveal', 0.22) for d in (-0.35, 0.0, 0.35)]
CUES += [(w('tc09-2000', 'online'), 'scan-hum', 0.14)]
CUES += repeat('scan-hum', s('Tc2100', 1.0), s('Tc2100', 40.0), 2.5, 0.07)
CUES += [(w('tc00-welcome', 'comments'), 'pop-reveal', 0.30)]
# outro: the comment-of-the-week ritual
CUES += [(w('tc13-outro', 'Dex-tee', shift=-0.1), 'sparkle-soft', 0.34), (w('tc13-outro', 'Dex-tee', shift=0.05), 'pop-reveal', 0.30)]
CUES += [(w('tc13-outro', 'deal'), 'impact-soft', 0.36), (w('tc13-outro', 'comment', 1), 'pop-reveal', 0.32),
         (w('tc13-outro', 'subject'), 'sparkle-soft', 0.28)]
CUES += [(s('TcOutro', (ES_F + 12) / 30), 'pencil-scribble', 0.30)]   # (end-screen whoosh dropped: 3-cue stack)
CUES += [
    (w('tc04-1500', 'bell'), 'chime-magic', 0.30),
    (w('tc04-1500', 'expectancy'), 'ui-click-soft', 0.32),
    (w('tc04-1500', 'same', 1), 'stamp-hit', 0.34),
    (w('tc04-1500', 'same', 2), 'stamp-hit', 0.34),
    (w('tc04-1500', 'same', 3), 'stamp-hit', 0.34),
    (w('tc04-1500', 'weeks'), 'clock-tick-soft', 0.34),
    (w('tc04-1500', 'happens'), 'warm-shimmer', 0.30),
    (w('tc05-1600', 'newspaper'), 'page-flip', 0.44),
    (w('tc05-1600', 'habit'), 'page-flip', 0.30),
    (w('tc05-1600', 'pendulum'), 'clock-tick-soft', 0.44),
    (w('tc05-1600', 'seconds'), 'pop-reveal', 0.34),
    (w('tc05-1600', 'minutes'), 'chime-reward', 0.34),
    (w('tc06-1700', 'factory'), 'launch-thump', 0.34),
    (w('tc06-1700', 'bell', 1), 'ui-toggle-on', 0.30),
    (w('tc06-1700', 'clock', 1), 'clock-tick-soft', 0.36),
    (w('tc06-1700', 'discipline'), 'impact-soft', 0.36),
    (w('tc06-1700', 'says'), 'trap-snap', 0.32),
    (w('tc06-1700', 'Jamaica'), 'whoosh-wind', 0.32),
    (w('tc06-1700', 'five'), 'pop-reveal', 0.34),
    (w('tc06-1700', 'sell'), 'chess-piece-thock', 0.40),
    (w('tc07-1800', 'cable'), 'stream-soft', 0.24),
    (w('tc07-1800', 'sixteen'), 'ui-send', 0.36),
    (w('tc07-1800', 'twice'), 'knock-solid', 0.34),
    (w('tc07-1800', 'Steam'), 'stamp-hit', 0.38),
    (w('tc07-1800', 'telegraph'), 'stamp-hit', 0.38),
    (w('tc07-1800', 'press'), 'stamp-hit', 0.38),
    (w('tc07-1800', 'familiar'), 'glitch-zap', 0.26),
    (w('tc08-1900', 'ninety'), 'impact-soft', 0.38),
    (w('tc08-1900', 'three', 2), 'pop-reveal', 0.26),   # AGE 3 marker (the whoosh moved to 'child')
    (w('tc08-1900', 'Moon'), 'sparkle-soft', 0.36),
    (w('tc08-1900', 'Remember'), 'stamp-hit', 0.40),
    (w('tc09-2000', 'seventy'), 'ui-click-soft', 0.30),
    (w('tc09-2000', 'fifty'), 'ui-click-soft', 0.30),
    (w('tc09-2000', 'instant'), 'pop-reveal', 0.30),
    (w('tc09-2000', 'lifting'), 'pop-reveal', 0.30),
    (w('tc09-2000', 'rich'), 'pop-reveal', 0.30),
    (w('tc09-2000', 'yet'), 'piano-a-min', 0.30),
    (w('tc09-2000', 'Busy'), 'impact-deep-soft', 0.50),
    (w('tc09-2000', 'where', shift=-0.6), 'riser-soft', 0.30),
    # the answer — the one riser→payoff of the film lands on "experience"
    (s('TcReveal', 0.0), 'whoosh-reverse', 0.36),
    (w('tc10-reveal', 'answer'), 'impact-deep-soft', 0.48),
    (w('tc10-reveal', 'second', 1), 'clock-tick-soft', 0.34),
    (w('tc10-reveal', 'second', 2), 'clock-tick-soft', 0.34),
    (w('tc10-reveal', 'memories'), 'warm-shimmer', 0.32),
    (w('tc10-reveal', 'collapse'), 'whoosh-reverse', 0.30),
    (w('tc10-reveal', 'clock', 2), 'stamp-hit', 0.30),
    (w('tc10-reveal', 'factory'), 'stamp-hit', 0.30),
    (w('tc10-reveal', 'telegraph'), 'stamp-hit', 0.30),
    (w('tc10-reveal', 'assembly'), 'stamp-hit', 0.30),
    (w('tc10-reveal', 'phone'), 'stamp-hit', 0.30),
    (w('tc10-reveal', 'experience', shift=-1.36), 'riser-soft', 0.36),
    (w('tc10-reveal', 'experience'), 'impact-deep-soft', 0.56),
    (w('tc10-reveal', 'experience', shift=0.25), 'chime-reward', 0.40),
    (s('Tc2100', 0.4), 'scan-hum', 0.20),
    (w('tc11-2100', 'Nations'), 'ui-click-soft', 0.32),
    (w('tc11-2100', 'Goldman'), 'glitch-zap', 0.24),
    (w('tc11-2100', 'sixty'), 'pop-reveal', 0.32),
    (w('tc11-2100', 'fifteen'), 'page-flip', 0.36),     # the Keynes card now lands on 'fifteen'
    (w('tc11-2100', 'repeats'), 'keys-typing-soft', 0.24),
    (w('tc11-2100', 'energy'), 'trap-snap', 0.30),
    (w('tc11-2100', 'money'), 'trap-snap', 0.30),
    (w('tc11-2100', 'remember'), 'warm-shimmer', 0.42),
    (s('TcClose', 0.0), 'whoosh-soft', 0.34),
    (w('tc12-close', 'stretched'), 'whoosh-soft', 0.30),
    (w('tc12-close', 'first'), 'chime-magic', 0.34),
    (s('TcOutro', 0.0), 'whoosh-wind', 0.34),
    (w('tc13-outro', 'comments'), 'pop-reveal', 0.34),
    (w('tc13-outro', 'like'), 'ui-click-soft', 0.38),
    (w('tc13-outro', 'share'), 'ui-send', 0.36),
    (w('tc13-outro', 'subscribe'), 'chime-reward', 0.46),
    (w('tc13-outro', 'Next', 2), 'whoosh-wind', 0.34),
    (w('tc13-outro', 'Ask', 2), 'chess-piece-thock', 0.40),
    (w('tc13-outro', 'Wonder'), 'chess-piece-thock', 0.40),
    (w('tc13-outro', 'Repeat'), 'chess-piece-thock', 0.40),
    # end screen: logo switches on in the subscribe slot
    (s('TcOutro', (ES_F + 6 + 12) / 30), 'ui-toggle-on', 0.24),
    (s('TcOutro', (ES_F + 6 + 19) / 30), 'sparkle-soft', 0.22),
]

# ── sync-audit fixes (SYNC-AUDIT.json, 2026-10-11): every new visual has its sound and
# every orphan sound got its visual
CUES += [
    (w('tc02-question', 'So', shift=0.13), 'pop-reveal', 0.20),           # hourglass enters
    (w('tc03-promise', 'experiment'), 'impact-soft', 0.30),               # THE EXPERIMENT title
    (w('tc04-1500', 'awake'), 'warm-shimmer', 0.18),                       # village windows light up
    (w('tc04-1500', 'first'), 'ui-click-soft', 0.20),                      # Day Clock: first sleep lights
    (w('tc04-1500', 'second'), 'ui-click-soft', 0.20),                     # ...second sleep lights
    (w('tc04-1500', 'Your'), 'whoosh-soft', 0.24),                         # the village by day
    (w('tc04-1500', 'drink'), 'pop-reveal', 0.24),                         # steaming cup + band
    (w('tc05-1600', 'smoke'), 'wind-soft', 0.14),                          # rooftop chimney smoke rises
    (w('tc05-1600', 'new'), 'warm-shimmer', 0.16),                         # a doorway glows: something new
    (w('tc05-1600', 'Coffee'), 'pop-reveal', 0.26),                        # the cup appears ON "Coffee."
    (w('tc05-1600', 'Coffee', shift=0.05), 'stream-soft', 0.16),           # ...steaming
    (w('tc05-1600', 'today'), 'pop-reveal', 0.22),                         # TODAY chip
    (w('tc05-1600', 'last'), 'pop-reveal', 0.18),                          # LAST MONTH chip
    (w('tc05-1600', 'month'), 'trap-snap', 0.22),                          # struck through
    (w('tc05-1600', 'minute'), 'clock-tick-soft', 0.30),                   # the minute hand races
    (w('tc05-1600', 'boss'), 'stamp-hit', 0.34),                           # BOSS stamp
    (w('tc06-1700', 'Saint', 2), 'pop-reveal', 0.22),                      # SAINT MONDAY returns
    (w('tc06-1700', 'disappear'), 'trap-snap', 0.24),                      # ...and is struck out
    (w('tc06-1700', "Harrison's"), 'whoosh-soft', 0.24),                   # the voyage map
    (w('tc06-1700', 'steam', shift=-0.13), 'whoosh-wind', 0.20),           # the train crosses
    (w('tc07-1800', 'George'), 'page-flip', 0.30),                         # Beard's book
    (w('tc07-1800', 'men'), 'pop-reveal', 0.22),                           # SOON: MEN TOO
    (w('tc07-1800', 'law', 2), 'stamp-hit', 0.30),                         # WRITTEN INTO LAW
    (w('tc08-1900', 'Outside'), 'launch-thump', 0.24),                     # Ford's factory
    (w('tc08-1900', 'child'), 'whoosh-soft', 0.26),                        # one life, born 1900
    (w('tc08-1900', 'Keynes'), 'page-flip', 0.30),                         # Keynes's essay card
    (w('tc09-2000', 'Germany'), 'ui-click-soft', 0.26),                    # Germany bar appears
    (w('tc09-2000', 'hear'), 'keys-typing-soft', 0.16),                    # the reply is typing
    (w('tc10-reveal', 'Your'), 'whoosh-soft', 0.24),                       # "Your brain..."
    (w('tc10-reveal', 'clock', 1, shift=0.13), 'trap-snap', 0.22),         # the clock struck through
    (w('tc10-reveal', 'holiday'), 'warm-shimmer', 0.24),                   # THE HOLIDAY PARADOX
    (w('tc10-reveal', 'Every'), 'whoosh-soft', 0.24),                      # every century...
    (w('tc11-2100', 'together'), 'whoosh-soft', 0.24),                     # evidence converges
    (w('tc13-outro', 'This'), 'pop-reveal', 0.22),                         # EPISODE 01
    (w('tc13-outro', 'Did', shift=-0.2), 'ui-toggle-on', 0.26),            # logo switches on
    (w('tc13-outro', 'right'), 'ui-click-soft', 0.22),                     # "right here": card flash
    (w('tc13-outro', 'episode', 3), 'pop-reveal', 0.20),                   # -> a future episode
    (w('tc13-outro', 'watch'), 'ui-click-soft', 0.20),
    (w('tc13-outro', 'collect'), 'ui-click-soft', 0.20),
    (w('tc13-outro', 'play'), 'ui-click-soft', 0.20),
]
CUES += ticks('tc03-promise', 'lived', 7, 12)                               # seven lives light up
CUES += ticks('tc07-1800', 'railroads', 4, 6, shift=-0.2)                  # the four time zones
CUES += ticks('tc10-reveal', 'week', 7, 12)                                 # the seven new days


def run(args):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-nostdin'] + args, check=True)


def duration(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
                                capture_output=True, text=True, check=True).stdout.strip())


def loudness(path):
    err = subprocess.run(['ffmpeg', '-nostdin', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    summary = err[err.rfind('Summary:'):]
    lufs = float(re.search(r'I:\s+(-?[\d.]+) LUFS', summary).group(1))
    peak = float(re.search(r'Peak:\s+(-?[\d.]+) dBFS', summary).group(1))
    return lufs, peak


def delayed_mix(items, out, channels=2):
    """items: [(path, seconds, gain)] → one wav, each placed by adelay, mixed without normalisation."""
    inputs, filt = [], []
    for i, (path, at, gain) in enumerate(items):
        inputs += ['-i', path]
        ms = max(0, int(round(at * 1000)))
        filt.append(f'[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={gain},adelay={ms}|{ms}[a{i}]')
    labels = ''.join(f'[a{i}]' for i in range(len(items)))
    filt.append(f'{labels}amix=inputs={len(items)}:normalize=0:duration=longest,apad=whole_dur={TOTAL:.3f},atrim=0:{TOTAL:.3f}[out]')
    run(inputs + ['-filter_complex', ';'.join(filt), '-map', '[out]', '-ar', '48000', '-ac', str(channels), out])


def main():
    # 1) every shot rendered at its planned length (frame count), then video-only copies so the
    #    concat offsets come from the video stream, not the padded silent AAC track Remotion adds
    listfile = os.path.join(BUS, 'concat.txt')
    with open(listfile, 'w') as f:
        for sid, dur, _ in SHOTS:
            src = os.path.join(OUT, f'{sid}.mp4')
            frames = int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-count_packets',
                                         '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', src],
                                        capture_output=True, text=True, check=True).stdout.strip().strip(','))
            if frames != round(dur * 30):
                sys.exit(f'{sid}: {frames} frames, planned {round(dur * 30)} — re-render before building')
            vonly = os.path.join(BUS, f'v_{sid}.mp4')
            run(['-i', src, '-map', '0:v', '-c', 'copy', vonly])
            f.write(f"file '{vonly}'\n")
    silent = os.path.join(BUS, 'video_silent.mp4')
    run(['-f', 'concat', '-safe', '0', '-i', listfile, '-c', 'copy', silent])
    print(f'video {duration(silent):.2f}s (planned {TOTAL:.2f}s)')

    # 2) voice bus
    voice = os.path.join(BUS, 'voice.wav')
    delayed_mix([(os.path.join(WORK, 'mix', f'{scene}.wav'), at, 1.0) for scene, at in VO_AT.items()], voice)

    # 3) sfx bus in groups
    groups = []
    for g in range(0, len(CUES), SFX_GROUP):
        part = os.path.join(BUS, f'sfx_{g // SFX_GROUP}.wav')
        delayed_mix([(os.path.join(SFX, f'{clip}.mp3'), at, gain) for at, clip, gain in CUES[g:g + SFX_GROUP]], part)
        groups.append((part, 0.0, 1.0))
    sfx_raw = os.path.join(BUS, 'sfx_raw.wav')
    delayed_mix(groups, sfx_raw)
    sfx = os.path.join(BUS, 'sfx.wav')
    run(['-i', sfx_raw, '-i', voice, '-filter_complex',
         '[0:a][1:a]sidechaincompress=threshold=0.04:ratio=3:attack=5:release=220:makeup=1[out]',
         '-map', '[out]', '-ar', '48000', '-ac', '2', sfx])
    print(f'{len(CUES)} sfx cues in {len(groups)} groups')

    # 4) music bed, looped, sidechain-ducked 12:1 under the voice
    music = os.path.join(BUS, 'music.wav')
    clip_d = duration(MUSIC)
    xf = 4.0
    copies = int(TOTAL // (clip_d - xf)) + 2
    inputs, chain = [], []
    for i in range(copies):
        inputs += ['-i', MUSIC]
    label = '[0:a]'
    for i in range(1, copies):
        chain.append(f'{label}[{i}:a]acrossfade=d={xf}:c1=tri:c2=tri[x{i}]')
        label = f'[x{i}]'
    chain.append(f'{label}atrim=0:{TOTAL:.3f},aformat=sample_rates=48000:channel_layouts=stereo,volume={MUSIC_LEVEL},'
                 f'afade=t=in:d=2,afade=t=out:st={TOTAL - 5:.3f}:d=5[m]')
    chain.append(f'[m][{copies}:a]sidechaincompress=threshold=0.03:ratio=12:attack=20:release=450[out]')
    run(inputs + ['-i', voice, '-filter_complex', ';'.join(chain), '-map', '[out]', '-ar', '48000', '-ac', '2', music])

    # 5) master: mix → measure → flat gain → limiter → verify (same ebur128 meter)
    pre = os.path.join(BUS, 'master_pre.wav')
    run(['-i', voice, '-i', sfx, '-i', music, '-filter_complex',
         '[0:a][1:a][2:a]amix=inputs=3:normalize=0[out]', '-map', '[out]', '-ar', '48000', '-ac', '2', pre])
    lufs, _ = loudness(pre)
    master = os.path.join(BUS, 'master.wav')
    limit = 10 ** (LIMIT_DBTP / 20)
    gain_db = TARGET_LUFS - lufs
    for _ in range(3):
        run(['-i', pre, '-af', f'volume={gain_db:.2f}dB,aresample=192000,alimiter=limit={limit:.4f}:level=disabled,aresample=48000',
             '-ar', '48000', '-ac', '2', master])
        lufs_m, peak_m = loudness(master)
        if abs(lufs_m - TARGET_LUFS) <= 0.3:
            break
        gain_db += TARGET_LUFS - lufs_m
    print(f'master {lufs_m:.1f} LUFS, peak {peak_m:.1f} dBFS')

    # 6) final encode: CFR 30, stereo AAC, faststart
    final = os.path.join(PROJ, 'dyk-01-time-compressed-1080P.mp4')
    run(['-i', silent, '-i', master, '-map', '0:v', '-map', '1:a',
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', '-fps_mode', 'cfr',
         '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', '-shortest', final])
    print('final ->', final, f'{duration(final):.2f}s')


if __name__ == '__main__':
    main()
