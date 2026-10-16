# HANDOFF: DYK No. 05 "Food", Romanian narration pilot (2026-10-16)

**Status (2026-10-16):** Romanian script APPROVED by David (fd09 stays "vreo 76" = F35 75.8). Translated, voiced (Brian, eleven_multilingual_v2, `language_code: ro`), paused, and timed for the picture. Gate reports are written. **Not rendered** (David's instruction, and disk was 8–17 GiB, below the 22 GiB floor and the 25 GiB reserve). **Not uploaded.**

David checks the Romanian himself (`TRANSLATION-NOTES.md` plus `narration-ro-preview.mp3`) before any render.

## What exists (all under `videos/dyk-05-food/ro/`)

| file | what |
|---|---|
| `script.ro.json` | Romanian narration. Same 17 scene ids and chunk counts, floors, payoffs and pause beats as English. Built by `make_script_ro.py` (the text table lives there). |
| `TRANSLATION-NOTES.md` | Choices, the items for David to decide, the ro/en word and time ratio per scene, and how the pace targets were scaled. |
| `narration/<id>.mp3`, `narration/<id>.words.json`, `narration/<id>.paused.json`, `narration/chunks/` | Paid takes (mp3 and chunk cache are Git-ignored; they live only in this main checkout), word timings, and paused timings. |
| `mix/<id>.wav` | Paused 48 kHz takes for the mix (Git-ignored). |
| `narration-ro-preview.mp3` | The whole Romanian narration in master order with 0.5 s between scenes, 742.8 s, 128 kb/s mono, 11.9 MB (Git-ignored). |
| `vo.ro.json` | **English** words with times warped chunk by chunk onto the Romanian takes; `dur` = Romanian scene length. This is what the shots and the cue table consume. |
| `vo.ro.true.json` | The real Romanian words and times. |
| `timeline.ro.json` | Shot lengths and VO offsets from the Romanian durations: 12:59.3 (English 10:49.9). |
| `cuesheet.ro.json` | 559 cues from the shared cue table, resolved on `vo.ro.json`. Loud cues are kept off the audible Romanian words. |
| `audit/VOICE-PREFLIGHT-RO.md` | Pre-flight on the real Romanian take. |
| `audit/VOICE-PREFLIGHT-RO-WARPED-SFX.md` | SFX/data check on the warped English vo (for the record; see below). |
| `audit/WHISPER-DIFF-RO.txt`, `audit/whisper/` | Whisper base (`--language ro`) round-trip. |
| `audit/gen_voice_run{1..6}.log` | Every take attempt. |

Code: `ro_text.py` (Romanian syllables and number words), `gen_voice_ro.py`, `insert_pauses_ro.py` (reuses `work/insert_pauses.py` unchanged), `make_vo_ro.py`, `make_timeline_ro.py`, `build_final_ro.py` (`--cuesheet-only` used; the full build is untouched), `preflight_ro.py` (shared `voice_preflight.py` plus Romanian syllables and sign-off, patched at run time), `whisper_ro.py`, `make_preview_ro.py`. Tests: `tests/test_dyk05_ro.py` (21 pass).

Rebuild from the paid takes, with no API call:

```
python3 ro/insert_pauses_ro.py
python3 ro/make_vo_ro.py
python3 ro/make_timeline_ro.py
python3 ro/build_final_ro.py --cuesheet-only
```

## Render path (2026-10-16, after David's approval) — RENDERED, QA PASS, awaiting upload

Rendered 2026-10-16 (14 shots, 91 MB in `ro/out/`, log `ro/audit/render-ro.log`). Master `ro/dyk-05-food-ro-1080P.mp4`: 779.27 s (12:59), 1080p30, -14.0 LUFS, true peak -2.3 dBTP, A/V diff 3 ms, 0 pts gaps, `work/qa_final.py` PASS (sweep in `ro/audit/sweep/`). Preview `ro/dyk-05-food-ro-720p-preview.mp4` 26.8 MB (`ro/make_preview_ro.py`). Packaging in `ro/packaging/` (title 58 chars, description 3 k chars with Romanian chapters from `timeline.ro.json`, tags), `tools/dyk/packaging_check.py` PASS. Upload plan: unlisted, Romanian title/description/tags, language Română, no end screen, no cards; then Dexty.live `narrations.ro` on the food episode (site PR #41 merged) and redeploy.

- `ro/make_shots_ro.py` generates `remotion/src/shots/dyk-05-ro/FdRo*.tsx` (+ `vo.json` = `ro/vo.ro.json`) from the
  English `dyk-05/Fd*.tsx`: only the composition id, `durationInSeconds`, `DUR` and the `makeCue` offsets change (from
  `ro/timeline.ro.json`). Never hand-edit the copies; re-run after any English shot change (`--check` reports drift; `--ref video/dyk-05-food` reads the English shots from the branch commit, which is what the PR copies use).
  The English shots are untouched. `node scripts/gen-registry.mjs` + `tsc --noEmit` pass with the 14 copies.
- `ro/remotion_run_ro.mjs render FdRo…` renders to `ro/out/Fd….mp4` (English names, what `build_final_ro.py` reads).
- The two SFX cues the shared resolver could not clear are re-anchored to the Romanian word in `build_final_ro.py`
  (`RO_NUDGE`): "step 1 GUESS IN THE COMMENTS" pop lands 0.06 s before "Scrie-ți", the 2100 riser ends before
  "recoltele". `work/cues.py` is untouched. Pre-flight on the real take: **PASS, 0 issues**.
- On-screen text stays English in this pilot (unlisted, Dexty.live only).
- To render once David frees disk (guard reserve 25 GiB; the 14 shots are ~3 GB of Remotion output plus the bundle):
  ```
  python3 videos/dyk-05-food/ro/make_shots_ro.py --check
  node videos/dyk-05-food/ro/remotion_run_ro.mjs render FdRoHook FdRoIntro FdRoWelcome FdRoPromise FdRo1500 FdRo1747 FdRo1884 FdRo1915 FdRo1966 FdRoToday FdRoReveal FdRo2100 FdRoClose FdRoOutro
  python3 videos/dyk-05-food/ro/build_final_ro.py        # -> ro/dyk-05-food-ro-1080P.mp4, then qa_final-style ffprobe checks
  ```

## Spent

ElevenLabs Creator: **11,081 characters** (257,462 → 268,543 of 363,000; 94,457 left; no overage possible). Six runs, including one 5-character API probe and the calibration takes. Nothing else paid.

## Gates

- **Voice gates in `gen_voice_ro.py`:** PASS on every chunk of all 17 scenes. These are the same gates as English: speed band 0.90–1.08 with floors, ±0.08 neighbour step, ≤ 25 % speech-rate step, drag, gaps, tail artefact, payoff ≤ speed 1.0, and an aligned word count equal to the text.
  - The pace targets are the English targets scaled by the syllables-per-word ratio × a **measured** 1.17 Romanian/English tempo factor.
  - 12 chunks were retuned to their measured natural pace.
  - The tail scan (`voice_audio.py --tails ro/narration/chunks`) passes.
- **Pre-flight on the real Romanian take** (`VOICE-PREFLIGHT-RO.md`): **FAIL, 2 issues, both SFX.** Speed, pace, drag, gaps, lead-in, sign-off and payoff all pass. The two cues are ones the shared resolver cannot clear within 0.5 s on dense Romanian speech:
  - `pop-reveal` on *Scrie-ți* (fd00, 56.07 s)
  - `riser-soft` on *recoltele* (fd11, 678.06 s)
  - Both must be moved by hand when the Romanian shots are built. They sit in the shared `cue_parts/` (other session's files), so they were not edited here.
- **Pre-flight on `vo.ro.json` + cuesheet** (warped English words, as specified): **209 SFX hits.** This is expected and not an audio problem. The cue sheet is resolved against the words you **hear** (Romanian), so it cannot also be clear of the warped English spans, which are not audible.
- **Pace gate caveat:** the pace check applies to Romanian only through the scaled targets. The English absolute 2.9 w/s "story pace" has no meaning for Romanian word lengths.
- **Whisper round-trip** (`audit/WHISPER-DIFF-RO.txt`, whisper base `--language ro`, `whisper_ro.py`): **FAIL, 39 FAIL rows and 132 LISTEN rows, 0 waived.**
  - Whisper base is weak on Romanian. Most rows are transcription garble ("Mississippi" heard as "mrs epi", "paisprezece" as "paiti prezece", "o mie" glued as "omie").
  - Word-boundary-only differences ("arputea", "ca am") were made tolerant, and that took the count from 52 to 39 FAIL rows. Nothing else was relaxed.
  - **Listen first, two patterns that could be real:**
    - *două mii o sută* is transcribed **"200" every time (5×: fd01, fd11 ×4).** Is Brian clearly saying "două mii o sută"?
    - *vreo* is transcribed **"vra" every time (6×).** Is the hedge audible as "vreo"?
  - If either is really mis-spoken, reword and re-voice only that chunk (*vreo* → *cam* / *în jur de*; for 2100 try "*anul două mii o sută*" written as two clauses, or say "*secolul douăzeci și doi*" only if David prefers), then rerun the whisper step.
  - When David confirms a row is right, accept it with `--accept <scene>:<word>` and note it here.

## Open items

1. **David's native listen and text check:** the 2100 / *vreo* patterns above first, then the `TRANSLATION-NOTES.md` "Ambiguous" list, names, "Dexti punct laiv", "Did You Know That", and the whisper FAIL/LISTEN rows.
2. **The picture cannot take the Romanian timing by swapping `vo.json` alone (design step 4 blocked; nothing was edited in `remotion/`):**
   - Every Fd*.tsx hard-codes `compositionConfig.durationInSeconds`, `const DUR = <frames>` and the secondary `makeCue(vo, '<scene>', <offset>)` offsets (FdHook fd02 14.307, FdOutro 35.333 …). These are written by `work/sync_shots.py` from `timeline.json`. Romanian shots are 0–27 % longer (total +2:09), so a vo-only switch would cut the voice off and misplace the second scenes.
   - The vo import sits in 13 shots; 11 of them (all except FdClose and FdOutro) carry the other session's uncommitted edits.
   - **Proposed:** once the other session commits its Fd* work, generate `remotion/src/shots/dyk-05-ro/FdRo*.tsx` copies with a `sync_shots.py`-style pass from `timeline.ro.json` and `import vo from './vo.ro.json'`. These would be new ids, generated and never hand-edited, and the English shots would stay byte-identical. Then render with a `remotion_run.mjs` copy to `ro/out/` and build with `build_final_ro.py`.
   - The alternative (an env switch for vo plus the timeline values in every shot) needs edits inside those 11 files.
3. **On-screen text stays English in this pilot** (captions, DYK cards, chips, labels). Spoken Romanian over English on-screen text is a known limitation.
4. **The cue table's fixed-time cues** (`S(shot, sec)`) and in-shot frame logic assume the English shot lengths. Re-check them when Romanian shots exist.
5. `build_final_ro.py` sets `VOICE_GAIN_DB = {}`. The Romanian takes measured within ±0.7 dB of each other, so the English −4/−2.5 dB cuts on the sign-off and end screen would bury them.
6. Upload is unlisted and later, selected by Dexty.live for Română. Not started.
