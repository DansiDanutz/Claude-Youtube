#!/usr/bin/env python3
"""One-off: seed narration/chunks/ from already-stitched multi-chunk takes (made before the chunk cache existed),
so re-recording one chunk never re-bills its passing siblings. Chunks are cut at the inserted CHUNK_GAP_S runs of
exact digital silence; each piece is stored as <key>.wav + words (re-based to 0) and only if it passes the gates."""
import json, os, sys, wave
WORK = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, WORK)
import gen_voice as g  # noqa: E402

script = json.load(open(os.path.join(g.NARR, 'script.json')))
for sc in script['scenes']:
    chunks = g.chunks_of(sc)
    if len(chunks) < 2:
        continue
    words = json.load(open(os.path.join(g.NARR, f"{sc['id']}.words.json")))
    with wave.open(os.path.join(g.MIX, f"{sc['id']}.wav")) as w:
        rate, data = w.getframerate(), w.readframes(w.getnframes())
    gap = int(round(g.CHUNK_GAP_S * rate))
    # chunk boundaries: for chunk k>0, the zero run must lie between the last word of k-1 and the first word of k
    i, cuts, starts = 0, [], [0]
    for k, ch in enumerate(chunks[:-1]):
        n = len(ch['text'].split())
        a, b = words[i + n - 1]['e'], words[i + n]['s']
        i += n
        lo, hi = max(0, int((a - 0.5) * rate)), int((b + 0.5) * rate)
        best, run, run0 = (0, 0), 0, 0
        for j in range(lo, hi):            # longest run of exact-zero samples near the boundary
            if data[j * 2:j * 2 + 2] == b'\x00\x00':
                if run == 0:
                    run0 = j
                run += 1
                if run > best[0]:
                    best = (run, run0)
            else:
                run = 0
        if not (gap <= best[0] <= gap + int(0.03 * rate)):
            raise SystemExit(f"{sc['id']}: boundary {k + 1}/{k + 2}: zero run {best[0] / rate:.3f}s (want {g.CHUNK_GAP_S}s)")
        cut = best[1]
        cuts.append(cut)
        starts.append(cut + gap)
    ends = cuts + [len(data) // 2]
    i = 0
    for k, ch in enumerate(chunks):
        n = len(ch['text'].split())
        t0 = starts[k] / rate
        cw = [{'w': x['w'], 's': round(x['s'] - t0, 3), 'e': round(x['e'] - t0, 3)} for x in words[i:i + n]]
        i += n
        if g.quality(cw, ch.get('pace', g.PACE_TARGET))[1] or g.cached_take(sc['id'], k, ch):
            continue
        base = g.chunk_key(sc['id'], k, ch)
        os.makedirs(os.path.dirname(base), exist_ok=True)
        with wave.open(base + '.wav', 'wb') as out:
            out.setnchannels(1); out.setsampwidth(2); out.setframerate(rate)
            out.writeframes(data[starts[k] * 2:ends[k] * 2])
        json.dump({'words': cw, 'speed': ch.get('speed', 1.0)}, open(base + '.json', 'w'))
        print('seeded', sc['id'], 'chunk', k + 1)
