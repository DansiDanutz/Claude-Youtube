#!/usr/bin/env python3
"""Write timeline.json into the shots: compositionConfig.durationInSeconds, `const DUR = <frames>;` and every
makeCue(vo, '<scene>', <offset>) offset. Run after make_timeline.py; `--check` only reports drift (exit 1).
(ScOutro's end-screen line offset is derived in the TSX from the outro end — the same rule as make_timeline.py.)"""
import json, os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
SHOTS = os.path.join(ROOT, 'remotion', 'src', 'shots', 'dyk-03')
TL = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'timeline.json')))
check = '--check' in sys.argv
drift = []
for sid, (dur, offs) in TL.items():
    path = os.path.join(SHOTS, f'{sid}.tsx')
    src = open(path).read()
    new = re.sub(r"(id: '%s', durationInSeconds: )[\d.]+" % sid, lambda m: m.group(1) + f'{round(dur, 4):g}', src)
    new = re.sub(r'const DUR = \d+;', f'const DUR = {round(dur * 30)};', new)
    for scene, off in offs.items():
        if sid == 'ScOutro' and scene == 'sc14-endscreen':
            continue
        new = re.sub(r"(makeCue\(vo, '%s', )[\d.]+(\))" % re.escape(scene), lambda m: m.group(1) + f'{off:g}' + m.group(2), new)
    if new != src:
        drift.append(sid)
        if not check:
            open(path, 'w').write(new)
print(('drift in: ' if check else 'synced: ') + (', '.join(drift) or 'none'))
sys.exit(1 if check and drift else 0)
