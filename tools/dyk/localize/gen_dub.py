#!/usr/bin/env python3
"""PAID step: voice an episode's translation with Brian, one ElevenLabs call per chunk. Resumable and quota-gated.

  python3 tools/dyk/localize/gen_dub.py 05 ro --dry-run          # chunks, characters, what is already cached; no calls
  python3 tools/dyk/localize/gen_dub.py 05 ro                    # voice what is missing
  python3 tools/dyk/localize/gen_dub.py 05 ro --only fd04-1500.c2,fd04-1500.c3     # re-voice chosen chunks (delete their cache first)

Safety: refuses to start when check_translation.py reports errors; before EVERY call it requires
(live remaining plan credits, minus the last two calls counted at 1:1) - (this chunk, counted 1:1) >= RESERVE (default 22,000, env LOC_RESERVE or --reserve), so a batch stops cleanly
instead of eating the characters the next English episode needs. Exit code 3 = stopped by the quota gate (resume later).
Takes are cached by text+speed+language+voice, so a rerun never pays twice for the same chunk.
"""
import argparse, base64, contextlib, fcntl, hashlib, json, os, sys, time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import dub_core as C  # noqa: E402
import eleven  # noqa: E402
import lang as L  # noqa: E402
from check_translation import check, load_english  # noqa: E402
from episodes import episode, loc_dir  # noqa: E402

DEFAULT_RESERVE = 22000
LOCK_DIR = os.path.expanduser('~/.cache/video-editor')
SPEND_LOCK = os.path.join(LOCK_DIR, 'loc-spend.lock')
POLL_EVERY_S = 10        # the plan endpoint answers 429 when polled harder (two runs in parallel did)


@contextlib.contextmanager
def exclusive(path, what, wait=False):
    """An advisory file lock. wait=False refuses to run when another process holds it (two runs on the same episode and
    language would pay twice for the same chunk); wait=True queues (paid calls of different runs are serialised)."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    handle = open(path, 'w')
    try:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | (0 if wait else fcntl.LOCK_NB))
        except BlockingIOError:
            sys.exit(f'{what}: another run holds {path}; wait for it to finish (it would pay for the same chunks twice)')
        yield
    finally:
        handle.close()


def take_key(unit, lang, speed):
    raw = f"{unit['text']}|{speed}|{lang}|{eleven.VOICE}|{eleven.MODEL}|{sorted(eleven.VOICE_SETTINGS.items())}"
    return hashlib.sha1(raw.encode('utf-8')).hexdigest()[:12]


def chunk_paths(cdir, unit, key):
    base = os.path.join(cdir, f"{unit['id']}.{key}")
    return base + '.mp3', base + '.json'


def rejected_paths(cdir, unit, key):
    base = os.path.join(cdir, f"{unit['id']}.{key}.rejected")
    return base + '.mp3', base + '.json'


def lag_of(unit, times):
    """Largest cascade push (s) of the chunk's sentences against their English starts, from the real alignment."""
    starts = [s['en']['start'] for s in unit['sentences']]
    durs = [e - s for s, e in times]
    placed = C.place(starts, durs)
    return max(p[0] - st for p, st in zip(placed, starts)), max(p[1] - s['en']['slot_end'] for p, s in zip(placed, unit['sentences']))


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument('episode')
    ap.add_argument('lang', choices=sorted(eleven.LANGUAGE_CODES))
    ap.add_argument('--speed', type=float, default=L.SPEED_FIT)
    ap.add_argument('--reserve', type=int, default=int(os.environ.get('LOC_RESERVE', DEFAULT_RESERVE)))
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--only', default='')
    ap.add_argument('--force', action='store_true', help='voice even if check_translation reports errors')
    ap.add_argument('--retry-rejected', action='store_true', help='voice again the chunks whose paid take was rejected (alignment mismatch)')
    args = ap.parse_args(argv)
    if not eleven.SPEED_MIN <= args.speed <= eleven.SPEED_MAX:
        sys.exit(f'speed {args.speed} outside the allowed band {eleven.SPEED_MIN}-{eleven.SPEED_MAX}')

    ep = episode(args.episode)
    errors = check(args.episode, args.lang)[0]
    if errors and not args.force:
        print('\n'.join(errors[:15]))
        sys.exit(f'{len(errors)} translation error(s): fix them before spending characters')
    doc = load_english(ep)
    tr = json.load(open(os.path.join(loc_dir(ep), f'script.{args.lang}.json'), encoding='utf-8'))
    units = C.chunk_units(doc, tr, args.lang)
    only = {x for x in args.only.split(',') if x}
    if only:
        units = [u for u in units if u['id'] in only]
    cdir = os.path.join(loc_dir(ep), args.lang, 'chunks')
    os.makedirs(cdir, exist_ok=True)

    def done(u):
        key = take_key(u, args.lang, args.speed)
        return os.path.exists(chunk_paths(cdir, u, key)[1]) or (not args.retry_rejected and os.path.exists(rejected_paths(cdir, u, key)[1]))

    todo = [u for u in units if not done(u)]
    skipped = [u['id'] for u in units if not os.path.exists(chunk_paths(cdir, u, take_key(u, args.lang, args.speed))[1]) and done(u)]
    need = sum(len(u['text']) for u in todo)
    print(f"No. {args.episode} {args.lang}: {len(units)} chunks, {len(units) - len(todo) - len(skipped)} cached, {len(todo)} to voice = {need} characters")
    if skipped:
        print(f"  {len(skipped)} chunk(s) were voiced before but their alignment did not match the text (kept as .rejected files, not paid again): {', '.join(skipped[:5])}; use --retry-rejected to voice them again")
    if args.dry_run or not todo:
        return 0
    with exclusive(os.path.join(LOCK_DIR, f'loc-gen-{args.episode}-{args.lang}.lock'), f'No. {args.episode} {args.lang}'):
        return voice(args, todo, cdir, need)


def voice(args, todo, cdir, need):
    key = eleven.api_key()
    q0 = eleven.quota(key)
    remaining = q0['remaining']
    print(f"plan: {remaining} credits left, reserve {args.reserve}, this run sends {need} characters")
    # The gate uses the LIVE plan figure (the real cost per character is below 1: measured 0.43 on 2026-10-16). The plan is polled at
    # most every POLL_EVERY_S seconds, and always when another run has spent since our last poll (the shared ledger changed);
    # between polls each call is charged 1 credit per character, so the estimate is pessimistic. Paid calls of all runs are
    # serialised by one lock, so two runs never approve the same quota snapshot at once.
    calls, total_spent, last_poll = 0, 0, time.time()
    for u in todo:
        n = len(u['text'])
        with exclusive(SPEND_LOCK, 'plan spend', wait=True):
            other_spent = os.path.exists(eleven.LEDGER) and os.path.getmtime(eleven.LEDGER) > last_poll
            if other_spent or time.time() - last_poll >= POLL_EVERY_S:
                try:
                    remaining = eleven.quota(key)['remaining']
                    last_poll = time.time()
                except RuntimeError as e:
                    print(f'  (plan lookup failed, keeping the local estimate: {e})', flush=True)
            if remaining - n < args.reserve:
                print(f"QUOTA GATE: {remaining} credits left, {n} needed (counted 1:1), reserve {args.reserve}: stopping before {u['id']}")
                return 3
            res = eleven.tts_with_timestamps(u['text'], args.lang, speed=args.speed, key=key, purpose=f"dub {args.episode} {args.lang}")
            remaining -= n              # until the next poll the call is counted 1:1 (the real cost is lower; the poll corrects it)
        total_spent += n
        calls += 1
        al = res['alignment']
        take_id = take_key(u, args.lang, args.speed)
        bad = C.check_alignment(u['text'], al)
        if bad:
            mp3, js = rejected_paths(cdir, u, take_id)
            with open(mp3, 'wb') as f:
                f.write(base64.b64decode(res['audio_base64']))
            with open(js, 'w', encoding='utf-8') as f:
                json.dump({'text': u['text'], 'speed': args.speed, 'alignment': al, 'problem': bad}, f, ensure_ascii=False)
            print(f"  !! {u['id']}: {bad} — take kept as {os.path.basename(js)} for inspection, not used", flush=True)
            continue
        times = C.sentence_times(al, [s['span'] for s in u['sentences']])
        push, over = lag_of(u, times)
        mp3, js = chunk_paths(cdir, u, take_id)
        with open(mp3, 'wb') as f:
            f.write(base64.b64decode(res['audio_base64']))
        with open(js, 'w', encoding='utf-8') as f:
            json.dump({'text': u['text'], 'speed': args.speed, 'alignment': al,
                       'sentences': [{'id': s['id'], 'start': round(a, 3), 'end': round(b, 3)} for s, (a, b) in zip(u['sentences'], times)]}, f, ensure_ascii=False)
        flag = '  <-- LONG: shorten the translation' if push > L.MAX_LAG_S else ''
        print(f"  {u['id']}: {n} chars, speech {times[-1][1] - times[0][0]:.1f}s, push {push:.2f}s, end {over:+.2f}s vs slot{flag}", flush=True)
    try:
        q1 = eleven.quota(key)
        ratio = (q1['used'] - q0['used']) / total_spent if total_spent else 0
        print(f"done: {calls} call(s), {total_spent} characters sent, {q1['used'] - q0['used']} credits used (x{ratio:.2f}; other runs in parallel distort it), {q1['remaining']} credits left")
    except RuntimeError:
        print(f'done: {calls} call(s), {total_spent} characters sent (plan lookup failed at the end)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
