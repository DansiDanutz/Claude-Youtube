#!/usr/bin/env python3
"""Drive one episode through the paid and free steps for several languages, stopping at the quota gate.

  python3 tools/dyk/localize/run.py 05 ro fr es zh [--reserve 22000]

For each language in order: gen_dub.py (paid, cached), then, once ALL requested languages that fit are voiced, build_dub.py for
them (free). A quota stop (exit 3) ends voicing; languages already voiced are still built. Progress is printed one line per step.
"""
import os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))


def step(script, *args):
    return subprocess.run([sys.executable, os.path.join(HERE, script), *args]).returncode


def main(argv):
    flags = [a for a in argv if a.startswith('--')]
    args = [a for a in argv if not a.startswith('--')]
    if len(args) < 2:
        sys.exit(__doc__)
    ep, langs = args[0], args[1:]
    extra = []
    if '--reserve' in argv:
        extra = ['--reserve', argv[argv.index('--reserve') + 1]]
        flags = [f for f in flags if f != '--reserve']
    voiced = []
    for lang in langs:
        print(f'=== voicing No. {ep} {lang}', flush=True)
        rc = step('gen_dub.py', ep, lang, *extra)
        if rc == 3:
            print(f'=== quota gate reached at {lang}; stopping the voicing', flush=True)
            break
        if rc != 0:
            print(f'=== gen_dub {lang} failed (exit {rc}); stopping', flush=True)
            break
        voiced.append(lang)
    if voiced:
        print(f'=== building No. {ep}: {" ".join(voiced)}', flush=True)
        return step('build_dub.py', ep, *voiced)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
