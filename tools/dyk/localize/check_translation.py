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
`show` replaces the WHOLE subtitle: spoken words that are neither in it nor number words are an error (two or more) or a warning (one). Warnings: Latin words inside Chinese `say`.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import LANGUAGES, episode, loc_dir  # noqa: E402
import lang as L  # noqa: E402

DIGIT = re.compile(r'[0-9]')
WORD = re.compile(r"[\w'’\-]+", re.UNICODE)
# Number words (fr, es, ro) that a subtitle legitimately replaces with digits. Anything else missing from `show` is lost text.
NUMBER_PARTS = set('''un une uno una unu o doi doua două deux dos trois tres trei quatre cuatro patru cinq cinco cinci six seis sase șase sept siete
şapte șapte huit ocho opt neuf nueve noua nouă dix diez zece onze once unsprezece douze doce doisprezece treize trece treisprezece
quatorze catorce paisprezece quinze quince cincisprezece seize dieciseis dieciséis saisprezece șaisprezece dixsept diecisiete
saptesprezece șaptesprezece dixhuit dieciocho optsprezece dixneuf diecinueve nouasprezece nouăsprezece vingt vingts veinte douazeci
douăzeci veinti veintiuno trente treinta treizeci quarante cuarenta patruzeci cinquante cincuenta cincizeci soixante sesenta saizeci
șaizeci septante setenta saptezeci șaptezeci octante ochenta optzeci nonante noventa nouazeci nouăzeci cent cents cien ciento cientos
sute sută suta doscientos trescientos cuatrocientos quinientos quinientas seiscientos setecientos ochocientos novecientos trescientas
mille mil mie mii million millions millón millones milioane milion et y și de la per cu virgule coma virgulă point punto punct pour por
cent demi demie medio media jumătate jumatate quart cuarto sfert moins menos fără fara heures heure horas ore oră an ans años ani anul
année en în într din până entre mille dexti laiv laïve'''.split())


def number_like(token):
    parts = [t for t in re.split(r'[-’\']', token.lower()) if t]
    return bool(parts) and all(p in NUMBER_PARTS or p.startswith('veinti') for p in parts)


def lost_words(say, show):
    """Words of the spoken sentence that are neither in the subtitle nor number words (a `show` must be the WHOLE sentence)."""
    shown = {w.lower() for w in WORD.findall(show)}
    return [w for w in WORD.findall(say) if w.lower() not in shown and not number_like(w)]
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
        elif show is not None and lang != 'zh':
            lost = lost_words(say, str(show))
            if len(lost) >= 2 and len(WORD.findall(str(show))) < 0.6 * len(WORD.findall(say)):
                errors.append(f'{sid}: `show` is a fragment (drops {lost[:4]}) — it replaces the whole subtitle, so it must contain the full sentence (digits for numbers)')
            elif lost:
                warnings.append(f'{sid}: `show` words differ from `say`: leaves out {lost}')
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
