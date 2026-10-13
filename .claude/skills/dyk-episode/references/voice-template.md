# Voice template — script to verified takes (from No. 04 on)

No. 03's voice work is the template: copy `videos/dyk-03-school/work/{make_script.py,gen_voice.py,insert_pauses.py,
make_vo_json.py,refine_cache.py}` and change only the episode data. Everything below is a step, in order; each tool
exits 1 on a FAIL and the next step only starts on a PASS.

## 1. Runtime estimate (STORY.md, before any voice)
```
python3 tools/dyk/length_estimate.py --text <draft-narration.txt> --max 10:30     # STORY draft
python3 tools/dyk/length_estimate.py --script videos/<ep>/work/narration/script.json --max 10:30
```
Use this number in STORY.md, never a hand sum. No. 03's bottom-up sum (words ÷ per-chunk pace + 1.4 s per shot)
said 10:10; the master was 10:51. Brian reads slower than the chunk targets (2.84 w/s measured) and every inserted
pause adds ~0.5 s. Measured ratio: 0.377 s of master per script word (Nos. 01–03 all within 3 %).

## 2. script.json from make_script.py
`make_script.py` builds the scenes/chunks/pauses and **keeps the speed a chunk already passed at** when its text is
unchanged — a rerun never resets accepted takes to 1.0 (No. 03 fix `ca2df79`). Edit text there, not in script.json.

## 3. gen_voice.py — import the shared audio checks
Delete the episode-local `refine_ends` and use the shared module, so word ends and tail artefacts are measured the
same way in every episode (tests: `tests/test_voice_audio.py`):
```python
sys.path.insert(0, os.path.join(ROOT, 'tools', 'dyk'))
from voice_audio import decode, refine_ends, tail_artefact

# in generate(), right after the alignment is turned into words:
words = refine_ends(words_from_alignment(resp['alignment']), resp['audio_base64'])
pace, probs = quality(words, target)
tail = tail_artefact(words, decode(base64.b64decode(resp['audio_base64'])))
if tail:
    probs.append(f'tail artefact at {tail[0]:.2f} s ({tail[1]:.2f} s)')    # retried like any gate failure
```
- `refine_ends`: ElevenLabs alignment stretches sentence-final words over the following silence (a 0.35 s "cane."
  read as a 0.63 s drag). Ends are measured from the audio; real drags still fail.
- `tail_artefact`: No. 03's HIGH — an unscripted 0.4 s fragment after a chunk's last word, hidden inside the last
  word by the alignment. A voiced run ≥ 80 ms after ≥ 120 ms of silence fails the take.
- After any trim or re-voice, scan the whole cache: `python3 tools/dyk/voice_audio.py --tails videos/<ep>/work/narration/chunks`.

## 4. Whisper round-trip — after every voicing, before the pre-flight
```
for f in videos/<ep>/work/narration/*.mp3; do
  whisper "$f" --model base --word_timestamps True --output_format json --output_dir videos/<ep>/work/audit/whisper
done
python3 tools/dyk/whisper_diff.py --script videos/<ep>/work/narration/script.json \
  --whisper-dir videos/<ep>/work/audit/whisper --out videos/<ep>/work/audit/WHISPER-DIFF.txt
```
`base` is cached — never download a bigger model on this disk. Spoken numbers and digits compare equal.
- **FAIL** (re-voice by rephrasing, then re-run): a hedge lost or changed (No. 03: "said to use" → "set to use"),
  a number heard as another word (No. 03: "five"), a negation flip ("can" → "can't").
- **LISTEN** (a human listen, result in HANDOFF.md): names (any capitalised mid-sentence word: Skelton → "Skeleton"),
  homophones (rung/wrong, school/cool, said/set, cost), low-probability words, gaps > 1.1 s.
- Put the episode's own risky words in `script.json` as `"risky_words": [...]` before voicing (names, places,
  words with a near-homophone). Prefer rewording a risky word away over hoping it reads right.
- Whisper itself mishearing a correct take is accepted only after a human listen: `--accept <scene_id>:<word>`.

## 5. Voice pre-flight → render
`references/voice-preflight.md`. `build_final.py` resolves loud cues with `voice_preflight.off_word` (same window
as the gate), so a cue sheet built by the template passes the SFX check by construction.

## Durability of paid audio
Paid takes and the chunk cache (`work/narration/*.mp3`, `work/narration/chunks/`) are ignored by Git, so they exist
only where they were generated. No. 03 generated them inside a `/tmp` worktree. Before a worktree is removed, copy
`work/narration/` (mp3 + chunks) and `work/mix/` into the **main checkout's** same ignored paths, and say so in
HANDOFF.md. Better: generate voice in the main checkout's episode folder. A lost cache means paying again.
