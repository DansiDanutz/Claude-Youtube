# Voice pre-flight — mandatory before the FIRST render (David, 2026-10-12)

"They weren't big, but they need to be perfect so users feel it's professional." No. 02 v2 needed a 2-hour
voice fix after rendering for problems that were all visible in the data. From No. 03 on, the voice is checked
before any frame is rendered, and the first render only starts on a PASS.

## Command
```
python3 tools/dyk/voice_preflight.py \
  --script   videos/<ep>/work/narration/script.json \
  --vo       remotion/src/shots/<ep>/vo.json \
  --timeline videos/<ep>/work/timeline.json \
  --cuesheet videos/<ep>/work/cuesheet.json \
  --out      videos/<ep>/work/audit/VOICE-PREFLIGHT.md
```
Exit 0 = PASS. Anything else: fix (re-voice only the named chunks, adjust `pauses`, move cues), re-run until PASS.
`cuesheet.json` = the episode's resolved cue list `[{t, clip, gain}]` in master seconds, exported by its cue
resolver (the same table the mix uses) BEFORE rendering — no cue sheet, no PASS.

## What it enforces (each one is a bug David heard on No. 02 v2)
| check | rule | heard at |
|---|---|---|
| data | every spoken scene has word timings in vo.json, the same word count as its script (no stale take) and a slot in timeline.json — missing input fails, never passes silently | — |
| speed | every chunk 0.90–1.08 (floors respected); every pair of neighbours ≤ 0.08 apart in speed setting (one-word beats included) and ≤ 20 % in articulation rate (syllables per second of speech — designed lean-in/payoff shifts stay under it, lurches don't); 1–2-word beats skip only the rate check | 7:15–7:39, 8:15–8:21 (1.0 → 1.2 → 0.85) |
| pace | measured w/s within ±10 % of the chunk's own target | — |
| drag | word > max(1.0 s, 0.25 s × syllables) ("photosynthesis" may take 1.25 s); > 0.42 s/syllable mid-clause; > 0.55 s/syllable before a comma or sentence end | "yeeet." (No. 01) |
| gaps | ≥ 0.25 s between sentences; ≤ 0.6 s inside a sentence (except at commas) | welcome/outro run-ons |
| lead-in | first word ≥ 0.6 s after its shot's cut; last word ≥ 0.5 s before the next cut | 0:36 welcome, 1:14 era opening |
| sfx | no impact/whoosh/pop/chime/riser/thock/sparkle/stamp/snap/hit/boom starting from 30 ms before a word's onset up to its end — onset-exact counts as ON the word | 1:15 whoosh on "fifteen hundred", 7:40 stack; No. 03: 207 onset-exact cues passed the old window |
| sign-off | "Ask... Wonder... Repeat." ≥ 0.6 s between words, ≥ 1.0 s before the next speech | 9:41 |
| payoff | chunks marked `"payoff": true` at speed ≤ 1.0 and ≤ 2.8 w/s | 7:15–7:41 ladder + payoff |

## How to write the script so it passes first time
- Give each chunk the pace it delivers naturally near speed 1.0 — emphasis comes from pauses and wording,
  never from dropping to 0.85 or pushing to 1.2. Comma lists and ladders need ~2.5–2.7 w/s.
- Mark the answer's ladder walk-back and the payoff line `"payoff": true`.
- Put SFX in the gaps between words (`shift` past the word end) — the pre-flight lists every collision.
- **Resolve cues with the shared resolver** — never an episode-local copy. In `build_final.py`:
  ```python
  sys.path.insert(0, os.path.join(ROOT, 'tools', 'dyk'))
  from voice_preflight import off_word          # same window as the gate, so the mix and the gate agree
  spans = sorted((VO_AT[sc] + w['s'], VO_AT[sc] + w['e']) for sc in VO_AT for w in VO[sc]['words'])
  t = off_word(t, clip, spans)                 # nearest clear gap ≤ 0.5 s away; risers only move earlier
  ```
  Why: No. 02 snapped in-word cues onto the onset itself and No. 03 to `prev_end + 5 ms` (0–30 ms before the onset,
  or ON it when words abut) — both sat in the old gate's blind spot. A cue `off_word` cannot clear within 0.5 s is
  left in place so the pre-flight fails: move its visual or pick another word.

## Tightened 2026-10-13 — shipped data under the new window
No. 02: 225 loud cues on words (216 onset-exact) · No. 03: 17 (1 onset-exact riser, 15 at 14–29 ms before the onset, 1 late
inside a word). Both passed the old gate. Re-resolving their cue sheets with `off_word` clears all of them (max move
0.35 s). Shipped episodes are not re-mixed; the numbers are the baseline the gate now prevents.
- Voice the sign-off as three tiny chunks or with `pauses` of ~0.8 s.
