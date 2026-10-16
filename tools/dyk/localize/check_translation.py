#!/usr/bin/env python3
"""Validate a translation against the English sentence map — run this BEFORE any paid voice call.

  python3 tools/dyk/localize/check_translation.py 05 fr
  python3 tools/dyk/localize/check_translation.py 05 fr --worksheet     # print English + time budget per sentence

A translation is videos/<episode>/loc/script.<lang>.json:
  {"lang": "fr", "episode": "05",
   "sentences": {"<sentence id>": {"say": "text to VOICE (numbers as words)", "show": "optional subtitle text (digits ok)"} }}
`say` may also be a plain string. Same ids as loc/sentences.en.json, one text per English sentence.

Errors (exit 1): missing/extra ids, empty text, `say` more than twice its time budget plus 4 characters (a smaller overrun is a warning; the cascade lag check is the real gate), ASCII digits in `say`, no sentence-final
punctuation, a chunk that falls more than MAX_LAG_S behind its English timing when sentences are placed one after the other.
Warnings: Latin words inside Chinese `say`, a `show` that is wildly longer than `say`.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402
import lang as L  # noqa: E402

DIGIT = re.compile(r'[0-9]')
LATIN_WORD = re.compile(r'[A-Za-z]{2,}')
ALLOWED_LATIN_ZH = {'Dexty', 'live', 'AI', 'IPCC', 'UN', 'BIS', 'GDP', 'EAT', 'Lancet', 'HMS'}


def say_of(entry):
    return entry if isinstance(entry, str) else entry.get('say', '')


def load_english(ep):
    return json.load(open(os.path.join(loc_dir(ep), 'sentences.en.json'), encoding='utf-8'))


def sentences_flat(doc):
    return [(sc['id'], ch['id'], s) for sc in doc['scenes'] for ch in sc['chunks'] for s in ch['sentences']]


def worksheet(doc, lang):
    for _, _, s in sentences_flat(doc):
        print(f"{s['id']}\tslot {s['slot_s']:.2f}s\tmax {L.max_chars(lang, s['slot_s'])} chars\tEN({len(s['text'])}): {s['text']}")


def check(num, lang):
    ep = episode(num)
    doc = load_english(ep)
    path = os.path.join(loc_dir(ep), f'script.{lang}.json')
    if not os.path.exists(path):
        return [f'{path}: missing'], [], 0, doc['english_chars']
    tr = json.load(open(path, encoding='utf-8'))
    sents = tr.get('sentences', {})
    errors, warnings = [], []
    want = {s['id']: s for _, _, s in sentences_flat(doc)}
    for sid in want:
        if sid not in sents:
            errors.append(f'{sid}: missing')
    for sid in sents:
        if sid not in want:
            errors.append(f'{sid}: not an English sentence id')
    for sid, s in want.items():
        if sid not in sents:
            continue
        say = say_of(sents[sid]).strip()
        limit = L.max_chars(lang, s['slot_s'])
        if not say:
            errors.append(f'{sid}: empty')
            continue
        if len(say) > limit * 2 + 4:
            errors.append(f"{sid}: {len(say)} chars > {limit} allowed for a {s['slot_s']:.2f}s slot — shorten by {len(say) - limit}")
        elif len(say) > limit:
            warnings.append(f"{sid}: {len(say)} chars, {len(say) - limit} over the {limit} budget (ok only if the chunk's lag stays within {L.MAX_LAG_S}s)")
        if DIGIT.search(say):
            errors.append(f'{sid}: digits in `say` (write numbers as spoken words; put digits only in `show`): {say[:60]}')
        if not L.TERMINAL.search(say):
            errors.append(f'{sid}: `say` must end with . ? ! … (or 。？！): {say[-30:]!r}')
        if lang == 'zh':
            bad = [w for w in LATIN_WORD.findall(say) if w not in ALLOWED_LATIN_ZH]
            if bad:
                warnings.append(f'{sid}: Latin words in zh `say`: {bad}')
        show = sents[sid].get('show') if isinstance(sents[sid], dict) else None
        if show is not None and (not str(show).strip() or '<' in show):
            errors.append(f'{sid}: `show` empty or contains markup')
    # cascade: sentences placed one after another inside their chunk; lag = predicted end - English slot end
    by_chunk = {}
    for scene_id, chunk_id, s in sentences_flat(doc):
        by_chunk.setdefault(chunk_id, []).append(s)
    for chunk_id, group in by_chunk.items():
        cursor = None
        for s in group:
            if s['id'] not in sents:
                continue
            start = s['start'] if cursor is None else max(s['start'], cursor)
            end = start + L.predicted_s(lang, len(say_of(sents[s['id']]).strip()))
            lag = end - s['slot_end']
            if lag > L.MAX_LAG_S:
                errors.append(f"{s['id']}: predicted to end {lag:.2f}s after its slot (limit {L.MAX_LAG_S}s) — shorten this or the sentences before it")
            cursor = end + 0.1
    total = sum(len(say_of(e)) for e in sents.values())
    return errors, warnings, total, doc['english_chars']


def main(argv):
    if len(argv) < 2 or argv[1] not in LANGUAGES:
        sys.exit(__doc__)
    num, lang = argv[0], argv[1]
    if '--worksheet' in argv:
        worksheet(load_english(episode(num)), lang)
        return 0
    out = check(num, lang)
    errors, warnings = out[0], out[1]
    for w in warnings:
        print('warn ', w)
    for e in errors:
        print('ERROR', e)
    if out[2]:
        print(f'No. {num} {lang}: {out[2]} chars to voice (English {out[3]}, x{out[2] / out[3]:.2f}); {len(errors)} error(s), {len(warnings)} warning(s)')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
