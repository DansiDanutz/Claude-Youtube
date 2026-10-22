# No. 06 Medicine: handoff (2026-10-17)

State: **script.json built, no voice generated, nothing committed.** Next gate: David's go-ahead on the credit estimate below.

## Files
- `narration-draft.md` (approved wording, with `[beat]` marks) and `narration-words.txt` (spoken words only, for `tools/dyk/length_estimate.py`).
- `make_script.py` (adapted from No. 05) writes `narration/script.json`: `python3 make_script.py narration/script.json`.
  The canonical path is `work/narration/script.json`, because `gen_voice.py` and the later pipeline scripts read it there.
- `gen_voice.py` is No. 05's, only the docstring retitled (same Brian settings, gates and quota checks).
- `check_script.py` (read-only: draft match, pause words, reusable takes) and `check_quota.py` (read-only live quota and cost).

## Wording changes made for TTS (none touch a fact)
1. "I left you with a question: how did we find out…" became two sentences (colon read flat).
2. "collect the facts" became "collect the fact cards", the wording voiced in Nos. 03-05.
3. Pause markers: 28 `pauses.after` entries (16 draft `[beat]`s plus the "How long do you live?" and "So what is medicine now?" beats used in No. 05).
4. Scene ids `me01…me14`; shots `MeHook, MeWelcome, MePromise, Me1537, Me1799, Me1847, Me1941, Me1948, MeToday, MeReveal, Me2100, MeClose, MeOutro` (no clash with `remotion/src/shots`).

## Reuse
- `me13c-signoff` (22 characters, 3 chunks): same text, pace and voice as No. 05's `fd13c-signoff`; its cached takes can be copied under the new prefix.
- `me14-endscreen` (82 characters): same line as No. 05's `fd14-endscreen`.
- Paid takes are Git-ignored: generate in this main checkout and never in a temporary worktree.

## Voice run plan (when approved)
`gen_voice.py` stops when worst case (4 tries at 1 credit per character) exceeds the remaining quota, so run in three batches, re-checking quota in between:
1. `ONLY=me01-hook,me02-question,me00-welcome,me03-promise,me04-1537,me05-1799 python3 gen_voice.py`
2. `ONLY=me06-1847,me07-1941,me08-1948,me09-today python3 gen_voice.py`
3. `ONLY=me10-reveal,me11-2100,me12-close,me13-outro,me13b-next,me13c-signoff,me14-endscreen python3 gen_voice.py`
Then `insert_pauses.py` and `make_vo_json.py` (copy from No. 05), Whisper round trip, voice pre-flight.

## Voice log
- Batch 1 (2026-10-17): me01-hook, me02-question, me00-welcome, me03-promise accepted first try; me04-1537 chunk 3 and me05-1799 chunk 2 rejected on pace (short sentences run fast, speed floor 0.90).
- Retunes approved by David: me04-1537 chunk 3 pace target 3.0 to 3.3; me05-1799 chunk 2 reworded ("open the windpipe with a knife, and the other two refused?") and pace target 2.9 to 3.6. Both then passed first try.
- Quota: 336,939 used before batch 1 (26,061 left); about 0.22 credits per character for this model on this account. The counter updates a few minutes after a run.
- Batch 2 (2026-10-17): me07-1941 and me09-today accepted; me06-1847 chunks 4 and 5 and me08-1948 chunk 2 rejected on pace (natural pace away from target). Batch 2 cost 1,494 credits (338,342 to 339,836).
- Retunes approved by David: me06-1847 chunk 4 pace target 3.0 to 2.6, chunk 5 3.0 to 3.4; me08-1948 chunk 2 2.9 to 3.4. All three passed first try.
- Batch 3 (2026-10-22): me11-2100, me12-close, me13-outro, me13b-next, me13c-signoff, me14-endscreen accepted; me10-reveal rejected by the continuity gate (chunk 3 voiced at speed 0.92, 3.73 syl/s against 5.08 and 5.22). Batch 3 cost 964 credits.
- An unintended re-run (my edit script failed, the run went ahead with old targets) cost 120 credits; chunks 5 and 6 then passed at their old targets (2.75, 2.8), which David kept.
- me10-reveal chunk 3 pace target 2.6 to 3.0 (David): passed at speed 1.06, 4.29 syl/s; continuity within limits.
- **All 17 scenes voiced: 585.2 s.** Next: copy No. 05's insert_pauses.py and make_vo_json.py, add the pauses, Whisper round trip, voice pre-flight.

- Checks (2026-10-22): pauses added (+10.9 s), timeline 10:47.7. Whisper diff: 1 FAIL (me13b-next placeholder teaser, "one three-thousandth" heard as "13,000"). Pre-flight round 1: 9 issues.
- Fixes approved by David: pace targets matched to the paused takes (me02 c1 3.1, me08 c5 2.6, me10 c5 2.5, me11 c5 2.9; me10 c5's cached take carried to its new key, no re-voice). Re-voiced slower: me05 c4 (target 2.95, passed at speed 1.0) and me06 c5 (3.3, passed at 0.92). me10 c4 failed 4 tries at 0.98 (came out faster); restored to its earlier take and target 2.8. Cost 242 credits (341,049 to 341,291).
- Note: me08 c5's target 2.6 matches the paused take; its raw take (2.88) would fail gen_voice's own check, so re-running me08 would re-voice that chunk.
- Pre-flight round 2: 3 issues: me10 c3 to c4 speech rate jump 21% (limit 20%); 'Paré,' drag is a tool artefact (the é is stripped, so 1 syllable is counted); no cuesheet yet (expected before shots).

- me10 c3 re-voice at speed 1.08 (David): tries 1-2 had tail artefacts, try 3 passed at 1.07 but slower (4.15 syl/s), so the continuity gate rejected the scene. The scene keeps its earlier take (c3 at 1.06); make_script restored to that take's target 3.0. A slow c3 take now sits cached under target 3.15: never reuse that key. Cost about 100 credits.
- Pre-flight round 3: unchanged, 3 issues (me10 c3 to c4 jump 21%, 'Paré,' tool artefact, no cuesheet).

- **Waiver (human-checked, David, 2026-10-22):** me10-reveal chunks 3 to 4 speech-rate jump of 21% (pre-flight limit 20%). David listened to narration/me10-reveal.mp3; the jump after "How close were you?" sounds fine. Accepted as is; do not re-voice for this.

## Open
- No. 07 subject: "light" is a placeholder in `me13b-next`.
- BMJ 1948 table: counts rest on Senn plus Armitage's statistics; glance at the BMJ PDF.
- Comment of the Week: fallback line until No. 05 has real comments.

## Published (2026-10-22)
- **YouTube:** public, https://youtu.be/_RD_Qz66FCg (published by David from Studio). Title "Medicine from 1500 to 2100: How We Learned What Heals"; description with 12 chapters, sources and the AI-voice line; 20 tags; thumbnail "WHAT HEALS?"; playlist "Did You Know That? — Every Episode"; not made for kids; Education; English; no paid promotion; AI use "No" (voice disclosed in the description).
- **End screen:** imported from No. 05; video element → No. 05 Food (a4qHdjL8bok), subscribe element over the ring. Both moved from the imported 10:31:09 to **10:32:03 → 10:47:20** so they don't cover the Light teaser (end-screen shot starts at 632.07 s). Geometry checked at 10:37: video in the WATCH NEXT frame, subscribe circle on the ring.
- **Card:** 0:40 → No. 05 Food.
- **Captions:** none on the upload (no subtitle track added). ro/fr/es/zh dubs not made yet (ElevenLabs quota resets 2026-11-06).
- **Pinned comment:** "Which century's doctor would you trust, and why? The best answer gets read in the next episode." (pinned by @Did-You-Know-that-2026).
- **Dexty.live:** PR DansiDanutz/Did-You-Know-That#50 merged (c8cf8f9), deployed with `vercel --prod --yes` (dpl_j5siSD7U5131TeC7AyWLVMdXnRQV, READY). Verified live: /data/episodes.json lists 6 episodes with _RD_Qz66FCg; /episodes/medicine/ embeds it, 8 questions / 8 cards, What's next → Light; Food's next tile → /episodes/medicine/; home says "Newest episode · No. 06"; /subject/night/ redirects to /subject/light/. 194 tests pass, 98.8% line coverage. Quiz sources use M-numbers (validator now accepts M).
- **No. 05 re-pointed (2026-10-22, David's go-ahead):** No. 05's end-screen video element (10:33:17 → 10:49:28, timing unchanged) and its 0:40 card now point to No. 06 Medicine (_RD_Qz66FCg); both saved, the end screen re-opened and checked.
