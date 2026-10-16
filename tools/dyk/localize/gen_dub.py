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
import argparse, base64, hashlib, json, os, sys, time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import dub_core as C  # noqa: E402
import eleven  # noqa: E402
import lang as L  # noqa: E402
from check_translation import check, load_english  # noqa: E402
from episodes import episode, loc_dir  # noqa: E402

DEFAULT_RESERVE = 22000
POLL_EVERY_S = 10        # the plan endpoint answers 429 when polled harder (two runs in parallel did)


def take_key(unit, lang, speed):
    raw = f"{unit['text']}|{speed}|{lang}|{eleven.VOICE}|{eleven.MODEL}|{sorted(eleven.VOICE_SETTINGS.items())}"
    return hashlib.sha1(raw.encode('utf-8')).hexdigest()[:12]


def chunk_paths(cdir, unit, key):
    base = os.path.join(cdir, f"{unit['id']}.{key}")
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

    todo = [u for u in units if not os.path.exists(chunk_paths(cdir, u, take_key(u, args.lang, args.speed))[1])]
    need = sum(len(u['text']) for u in todo)
    print(f"No. {args.episode} {args.lang}: {len(units)} chunks, {len(units) - len(todo)} cached, {len(todo)} to voice = {need} characters")
    if args.dry_run or not todo:
        return 0
    key = eleven.api_key()
    q0 = eleven.quota(key)
    remaining = q0['remaining']
    print(f"plan: {remaining} credits left, reserve {args.reserve}, this run sends {need} characters")
    # The gate uses the LIVE plan figure, polled at most every POLL_EVERY_S seconds (the real cost per character is below 1: measured
    # 0.43 on 2026-10-16); between polls each call is charged 1 credit per character, so the estimate is always pessimistic.
    calls, total_spent, last_poll = 0, 0, time.time()
    for u in todo:
        n = len(u['text'])
        if remaining - n < args.reserve:
            print(f"QUOTA GATE: {remaining} credits left, {n} needed (counted 1:1), reserve {args.reserve}: stopping before {u['id']}")
            return 3
        res = eleven.tts_with_timestamps(u['text'], args.lang, speed=args.speed, key=key, purpose=f"dub {args.episode} {args.lang}")
        total_spent += n
        calls += 1
        if time.time() - last_poll >= POLL_EVERY_S:
            try:
                remaining = eleven.quota(key)['remaining']
                last_poll = time.time()
            except RuntimeError as e:
                remaining -= n          # cannot read the plan: count this call 1:1 (pessimistic) and carry on
                print(f'  (plan lookup failed, counting {n} credits locally: {e})', flush=True)
        else:
            remaining -= n              # between polls every call is counted 1:1 (the real cost is lower; the next poll corrects it)
        al = res['alignment']
        bad = C.check_alignment(u['text'], al)
        if bad:
            print(f"  !! {u['id']}: {bad} — take kept for inspection, not cached")
            continue
        times = C.sentence_times(al, [s['span'] for s in u['sentences']])
        push, over = lag_of(u, times)
        mp3, js = chunk_paths(cdir, u, take_key(u, args.lang, args.speed))
        with open(mp3, 'wb') as f:
            f.write(base64.b64decode(res['audio_base64']))
        with open(js, 'w', encoding='utf-8') as f:
            json.dump({'text': u['text'], 'speed': args.speed, 'alignment': al,
                       'sentences': [{'id': s['id'], 'start': round(a, 3), 'end': round(b, 3)} for s, (a, b) in zip(u['sentences'], times)]}, f, ensure_ascii=False)
        flag = '  <-- LONG: shorten the translation' if push > L.MAX_LAG_S else ''
        print(f"  {u['id']}: {n} chars, speech {times[-1][1] - times[0][0]:.1f}s, push {push:.2f}s, end {over:+.2f}s vs slot{flag}", flush=True)
    q1 = eleven.quota(key)
    ratio = (q1['used'] - q0['used']) / total_spent if total_spent else 0
    print(f"done: {calls} call(s), {total_spent} characters sent, {q1['used'] - q0['used']} credits used (x{ratio:.2f}), {q1['remaining']} credits left")
    return 0


if __name__ == '__main__':
    sys.exit(main())
