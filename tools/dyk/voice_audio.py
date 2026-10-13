#!/usr/bin/env python3
"""Audio-side voice checks for Did You Know That? takes — the template every episode's gen_voice.py imports.

refine_ends(words, audio_b64)
    No. 03: ElevenLabs alignment stretches every sentence-final word to the next word's start (and a chunk's last
    word to the end of the file), so a 0.35 s "cane." reads as a 0.63 s drag. The real end is measured from the
    audio: the last 10 ms frame within ENERGY_FLOOR_DB of the take's 95th-percentile level, never later than the
    aligned end, never shorter than 0.05 s. Real drags (speech that really lasts) are still caught.
tail_artefact(words, pcm)
    No. 03 HIGH: an unscripted voice fragment after a chunk's last word (sc11 c5, 0.4 s, heard at 9:08). Any voiced
    run that starts after a >= TAIL_SILENCE_S silence following the last word's speech is an artefact: the take
    fails its gate (regenerate, or trim it in the chunk cache and record that in HANDOFF.md).

CLI: python3 tools/dyk/voice_audio.py --tails videos/<ep>/work/narration/chunks
     scans every cached chunk (<base>.mp3 + <base>.json words) and exits 1 on any tail artefact.
"""
import argparse
import base64
import json
import subprocess
import sys
from pathlib import Path

RATE = 16000
ENERGY_FRAME_S = 0.01
ENERGY_FLOOR_DB = 35.0            # a frame is voiced within this many dB of the take's 95th-percentile frame level
MIN_WORD_S = 0.05
TAIL_SILENCE_S = 0.12             # longer than any stop-consonant closure inside a word ("start." ~0.06 s)
TAIL_MIN_S = 0.08                 # shorter than a syllable: a mouth click (No. 03 cache: two 30-40 ms clicks at -25 dB)


def decode(audio_bytes, rate=RATE):
    """mp3/wav bytes -> mono float PCM at `rate` (ffmpeg via a pipe; nothing is written to disk)."""
    import numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "pipe:0", "-f", "s16le", "-ac", "1", "-ar", str(rate), "-"],
                         input=audio_bytes, capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype="<i2").astype(np.float64) / 32768


def frame_db(x, rate=RATE):
    import numpy as np
    n = int(rate * ENERGY_FRAME_S)
    return 10 * np.log10((x[:x.size // n * n].reshape(-1, n) ** 2).mean(1) + 1e-12)


def voiced(db):
    import numpy as np
    return db > np.percentile(db, 95) - ENERGY_FLOOR_DB


def refine_ends_pcm(words, x, rate=RATE):
    import numpy as np
    if x.size < int(rate * ENERGY_FRAME_S) * 4:
        return words
    active = voiced(frame_db(x, rate))
    out = []
    for w in words:
        a, b = int(w["s"] / ENERGY_FRAME_S), min(len(active), int(w["e"] / ENERGY_FRAME_S) + 1)
        act = np.flatnonzero(active[a:b])
        e = w["e"] if not act.size else min(w["e"], round((a + act[-1] + 1) * ENERGY_FRAME_S, 3))
        out.append({**w, "e": min(w["e"], max(round(w["s"] + MIN_WORD_S, 3), e))})   # never outside [s, e]
    return out


def refine_ends(words, audio_b64):
    """Drop-in for gen_voice.py: words from the ElevenLabs alignment + the take's base64 audio."""
    return refine_ends_pcm(words, decode(base64.b64decode(audio_b64)))


def _runs(active, start):
    """[(first, last)] frame-index runs of voiced frames from `start` on."""
    runs, first = [], None
    for i in range(start, len(active)):
        if active[i] and first is None:
            first = i
        elif not active[i] and first is not None:
            runs.append((first, i - 1))
            first = None
    if first is not None:
        runs.append((first, len(active) - 1))
    return runs


def tail_artefact(words, x, rate=RATE):
    """(start_s, duration_s) of the first voiced fragment after the last word's speech, else None."""
    if not words or x.size < int(rate * ENERGY_FRAME_S) * 4:
        return None
    active = voiced(frame_db(x, rate))
    gap = int(round(TAIL_SILENCE_S / ENERGY_FRAME_S))
    runs = _runs(active, int(words[-1]["s"] / ENERGY_FRAME_S))
    for (_, end_a), (first_b, last_b) in zip(runs, runs[1:]):
        if first_b - end_a - 1 >= gap and (last_b - first_b + 1) * ENERGY_FRAME_S >= TAIL_MIN_S:
            return round(first_b * ENERGY_FRAME_S, 2), round((last_b - first_b + 1) * ENERGY_FRAME_S, 2)
    return None


def scan_chunks(chunk_dir):
    """[(chunk, start_s, duration_s)] for every cached chunk take with a tail artefact."""
    found = []
    for meta in sorted(Path(chunk_dir).glob("*.json")):
        audio = meta.with_suffix(".mp3")
        if not audio.is_file():
            continue
        words = json.loads(meta.read_text(encoding="utf-8"))["words"]
        hit = tail_artefact(words, decode(audio.read_bytes()))
        if hit:
            found.append((meta.stem, *hit))
    return found


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--tails", required=True, help="chunk cache dir (<base>.mp3 + <base>.json)")
    a = ap.parse_args(argv)
    if not Path(a.tails).is_dir():
        print(f"TAIL CHECK: FAIL — {a.tails} is not a directory")
        return 1
    found = scan_chunks(a.tails)
    print(f"TAIL CHECK: {'PASS' if not found else f'FAIL — {len(found)} take(s)'}")
    for stem, start, dur in found:
        print(f"  {stem}: voiced fragment at {start:.2f} s ({dur:.2f} s) after the last word")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
