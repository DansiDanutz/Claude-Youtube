#!/usr/bin/env python3
"""Drive one episode through the paid and free steps for several languages, stopping at the quota gate.

  python3 tools/dyk/localize/run.py 05 ro fr es zh [--reserve 22000]

For each language in order: gen_dub.py (paid, cached), then, for every language that was voiced, build_dub.py (free).
Exit status: 0 everything requested was voiced and built; 3 the quota gate stopped the voicing (what was voiced is still built);
anything else is a failure of a voicing or of the build, reported after the languages that did succeed were built.
"""
import argparse, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
QUOTA_STOP = 3


def step(script, *args):
    return subprocess.run([sys.executable, os.path.join(HERE, script), *args]).returncode


def main(argv):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('episode')
    ap.add_argument('languages', nargs='+')
    ap.add_argument('--reserve', type=int, default=None, help='credits to keep on the plan (default: gen_dub.py default)')
    opts = ap.parse_args(argv)
    extra = ['--reserve', str(opts.reserve)] if opts.reserve is not None else []
    voiced, status = [], 0
    for lang in opts.languages:
        print(f'=== voicing No. {opts.episode} {lang}', flush=True)
        rc = step('gen_dub.py', opts.episode, lang, *extra)
        if rc == QUOTA_STOP:
            print(f'=== quota gate reached at {lang}; stopping the voicing', flush=True)
            status = QUOTA_STOP
            break
        if rc != 0:
            print(f'=== gen_dub {lang} failed (exit {rc}); stopping', flush=True)
            status = rc
            break
        voiced.append(lang)
    if voiced:
        print(f'=== building No. {opts.episode}: {" ".join(voiced)}', flush=True)
        build_rc = step('build_dub.py', opts.episode, *voiced)
        if build_rc != 0:
            print(f'=== build failed (exit {build_rc})', flush=True)
            status = status or build_rc
    return status


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
