#!/usr/bin/env python3
"""Build videos/<episode>/loc/sentences.en.json: the English narration cut into sentences with MASTER-time stamps.

This is the contract every translation, dub and subtitle file hangs on. A translation is one text per sentence id; a
dub places each translated sentence at its English sentence start; a subtitle cue uses the English sentence window.

  python3 tools/dyk/localize/en_map.py 05            # one episode
  python3 tools/dyk/localize/en_map.py all

Per sentence: start/end = the English words' first/last time in the master (VO_AT + word time), `slot_end` = the next
sentence's start minus GUARD_S (or the master end), so `slot_s` is how long a dub of that sentence may take.
Sentence ends use the same rule as work/insert_pauses.py: a word ending in . ? ! … (closing quotes ignored).
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from episodes import EPISODES, episode, loc_dir, read_json, shot_order  # noqa: E402

SENTENCE_END = re.compile(r"[.?!…][\"'’”)\]]*$")
GUARD_S = 0.12
NON_WORD = re.compile(r"[^\w]+", re.UNICODE)


def norm(token):
    return NON_WORD.sub('', token).lower()


def scene_chunks(script_scene):
    """The scene's TTS chunks (ids c1, c2, …): explicit `chunks`, else the whole text as one."""
    chunks = script_scene.get('chunks')
    if chunks:
        return [c['text'] if isinstance(c, dict) else c for c in chunks]
    return [script_scene['text']]


def split_sentences(words):
    """Word indices grouped into sentences by SENTENCE_END; the last word always closes one."""
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        if SENTENCE_END.search(w['w']) or i == len(words) - 1:
            out.append(cur)
            cur = []
    return out


def scene_timing(order, timeline):
    start, t, scene_at = {}, 0.0, {}
    for sid in order:
        dur, vos = timeline[sid][0], timeline[sid][1]
        start[sid] = t
        for scene, off in vos.items():
            scene_at[scene] = t + off
        t += dur
    return scene_at, t


def chunk_split(scene_id, words, script_scene, problems):
    """(chunk texts, token counts) — the script's chunks when their tokens match the alignment, else one chunk."""
    texts = scene_chunks(script_scene) if script_scene else [' '.join(w['w'] for w in words)]
    counts = [len(c.split()) for c in texts]
    spoken = [norm(w['w']) for w in words if norm(w['w'])]
    wanted = [norm(tok) for c in texts for tok in c.split() if norm(tok)]
    if sum(counts) != len(words) or spoken != wanted:
        problems.append(f'{scene_id}: script tokens do not line up with vo.json words ({sum(counts)} vs {len(words)}); one chunk')
        return [' '.join(w['w'] for w in words)], [len(words)]
    return texts, counts


def build(num):
    ep = episode(num)
    order, timeline = shot_order(ep)
    script = read_json(f"videos/{ep['dir']}/work/narration/script.json")
    vo = read_json(f"remotion/src/shots/{ep['shots']}/vo.json")
    scenes_by_id = {s['id']: s for s in script['scenes']}
    scene_at, total = scene_timing(order, timeline)

    out_scenes, problems = [], []
    for scene_id, at in sorted(scene_at.items(), key=lambda kv: kv[1]):
        words = vo[scene_id]['words']
        texts, counts = chunk_split(scene_id, words, scenes_by_id.get(scene_id), problems)
        chunks, idx = [], 0
        for ci, (_, n) in enumerate(zip(texts, counts), start=1):
            cwords = words[idx:idx + n]
            sents = []
            for si, group in enumerate(split_sentences(cwords), start=1):
                gw = [cwords[i] for i in group]
                sents.append({
                    'id': f'{scene_id}.c{ci}.s{si}',
                    'text': ' '.join(w['w'] for w in gw),
                    'start': round(at + gw[0]['s'], 3),
                    'end': round(at + gw[-1]['e'], 3),
                })
            chunks.append({'id': f'{scene_id}.c{ci}', 'text': ' '.join(w['w'] for w in cwords), 'sentences': sents})
            idx += n
        out_scenes.append({'id': scene_id, 'start': round(at, 3), 'dur': vo[scene_id]['dur'], 'chunks': chunks})

    flat = [s for sc in out_scenes for ch in sc['chunks'] for s in ch['sentences']]
    for a, b in zip(flat, flat[1:] + [None]):
        a['slot_end'] = round((b['start'] - GUARD_S) if b else total, 3)
        a['slot_s'] = round(a['slot_end'] - a['start'], 3)
        a['en_s'] = round(a['end'] - a['start'], 3)
        if a['slot_s'] < a['en_s']:
            problems.append(f"{a['id']}: slot {a['slot_s']}s shorter than the English sentence {a['en_s']}s (overlap in the English mix?)")
    doc = {'episode': num, 'slug': ep['slug'], 'master_s': round(total, 3), 'sentences': len(flat),
           'english_chars': sum(len(s['text']) for s in flat), 'scenes': out_scenes}
    os.makedirs(loc_dir(ep), exist_ok=True)
    path = os.path.join(loc_dir(ep), 'sentences.en.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(doc, f, ensure_ascii=False, indent=1)
    print(f"No. {num} {ep['slug']}: {len(flat)} sentences, {doc['english_chars']} chars, master {total:.2f}s -> {os.path.relpath(path)}")
    for p in problems:
        print('  !!', p)
    return doc


if __name__ == '__main__':
    targets = list(EPISODES) if sys.argv[1:] == ['all'] else sys.argv[1:]
    if not targets:
        sys.exit(__doc__)
    for n in targets:
        build(n)
