#!/usr/bin/env python3
"""English sentence map from a Whisper transcript of the published master (for an episode without matching script files).

  python3 tools/dyk/localize/en_from_whisper.py 01 <whisper.json> <master_seconds>

No. 01 shipped from a pipeline whose tracked timeline (566.93 s) matches neither of its masters; the live video is the 562.03 s v2.
So the sentences and their master times come from transcribing that master (clean Brian speech, word timestamps), written in
the same format as en_map.py (loc/sentences.en.json). A sentence ends at . ? ! … or at a silence longer than BREAK_S; sentences
that follow each other closely are voiced together as one chunk (one mood, one text-to-speech call).
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import episode, loc_dir  # noqa: E402

SENTENCE_END = re.compile(r"[.?!…][\"'’”)\]]*$")
ABBREVIATIONS = {'St.', 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'vs.', 'No.'}   # a full stop here does not end a sentence
# Spellings Whisper gets wrong in Brian's speech (checked against the episode's own tracked script, which has the same text).
FIXES = {'Christian Huygens': 'Christiaan Huygens', 'John Harrison Seawatch': "John Harrison's sea watch", 'Dext .live': 'Dexty.live', 'Dext.live': 'Dexty.live'}
BREAK_S = 1.4            # a silence this long ends a sentence even without punctuation
CHUNK_GAP_S = 1.1        # a pause this long between sentences starts a new chunk
CHUNK_MAX_SENTENCES, CHUNK_MAX_CHARS = 6, 420
GUARD_S = 0.12


def words_of(whisper):
    """Word list with Whisper's tokenising quirks repaired: '-three' glued to the word before, \"o 'clock\", 'Dext' + '.live'."""
    out = []
    for seg in whisper['segments']:
        for w in seg.get('words', []):
            token = w['word'].strip()
            if not token:
                continue
            glue = out and (token.startswith('-') or token.startswith("'") or token.startswith('.'))
            if glue:
                out[-1] = {'w': out[-1]['w'] + token, 's': out[-1]['s'], 'e': float(w['end'])}
            else:
                out.append({'w': token, 's': float(w['start']), 'e': float(w['end'])})
    return out


def fixed(text):
    for wrong, right in FIXES.items():
        text = text.replace(wrong, right)
    return text


def sentences_of(words):
    sents, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        nxt = words[i + 1] if i + 1 < len(words) else None
        if (SENTENCE_END.search(w['w']) and w['w'] not in ABBREVIATIONS) or nxt is None or nxt['s'] - w['e'] > BREAK_S:
            sents.append(cur)
            cur = []
    return sents


def chunks_of(sents):
    chunks, cur = [], []
    for s in sents:
        text_len = sum(len(' '.join(x['w'] for x in g)) for g in cur)
        if cur and (s[0]['s'] - cur[-1][-1]['e'] > CHUNK_GAP_S or len(cur) >= CHUNK_MAX_SENTENCES or text_len > CHUNK_MAX_CHARS):
            chunks.append(cur)
            cur = []
        cur.append(s)
    if cur:
        chunks.append(cur)
    return chunks


def build(num, whisper_path, master_s):
    ep = episode(num)
    chunks = chunks_of(sentences_of(words_of(json.load(open(whisper_path, encoding='utf-8')))))
    scenes, flat = [], []
    for ci, chunk in enumerate(chunks, start=1):
        sid = f'tc{ci:02d}'
        sents = []
        for si, g in enumerate(chunk, start=1):
            sents.append({'id': f'{sid}.c1.s{si}', 'text': fixed(' '.join(x['w'] for x in g)), 'start': round(g[0]['s'], 3), 'end': round(g[-1]['e'], 3)})
        flat += sents
        scenes.append({'id': sid, 'start': sents[0]['start'], 'dur': round(sents[-1]['end'] - sents[0]['start'], 3),
                       'chunks': [{'id': f'{sid}.c1', 'text': ' '.join(s['text'] for s in sents), 'sentences': sents}]})
    for a, b in zip(flat, flat[1:] + [None]):
        a['slot_end'] = round((b['start'] - GUARD_S) if b else master_s, 3)
        a['slot_s'] = round(a['slot_end'] - a['start'], 3)
        a['en_s'] = round(a['end'] - a['start'], 3)
    doc = {'episode': num, 'slug': ep['slug'], 'master_s': round(master_s, 3), 'sentences': len(flat),
           'english_chars': sum(len(s['text']) for s in flat), 'source': 'whisper transcript of the published master', 'scenes': scenes}
    os.makedirs(loc_dir(ep), exist_ok=True)
    path = os.path.join(loc_dir(ep), 'sentences.en.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(doc, f, ensure_ascii=False, indent=1)
    print(f"No. {num}: {len(flat)} sentences in {len(chunks)} chunks, {doc['english_chars']} chars, master {master_s:.2f}s -> {os.path.relpath(path)}")
    tight = [s['id'] for s in flat if s['slot_s'] < s['en_s']]
    if tight:
        print('  slot shorter than the sentence (overlap):', tight[:6])


if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    build(sys.argv[1], sys.argv[2], float(sys.argv[3]))
