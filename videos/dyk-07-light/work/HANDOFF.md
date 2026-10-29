# No. 07 Light: handoff

Branch `feat/dyk-07-light` (cut from `feat/dyk-06-medicine`, which is not merged to main yet). Nothing committed.

## Done (2026-10-29)
- `STORY.md` v1 approved by David; `RESEARCH.md` L1–L17.
- `work/narration-draft.md` v1 (humanizer checks: no digits, no AI-tell words/frames, no em-dashes, 6 wake-ups, 7 "Did you know that").
  Spoken words in `work/narration-words.txt`: 1,646 words → ≈ 10:21 (10:02–10:39) by `tools/dyk/length_estimate.py`.
- Tools copied from No. 06 and retargeted: `gen_voice.py`, `insert_pauses.py`, `make_vo_json.py` (→ `remotion/src/shots/dyk-07/vo.json`),
  `check_script.py` (reuse lookup → No. 06 chunks), `check_quota.py`.
- `make_script.py` → `work/narration/script.json`: 17 scenes, 50 chunks, 8,858 characters. `check_script.py`: matches the approved
  draft; 24 pauses, none missing. Pauses now take `(word, add_s, nth)` because "now?" appears twice in most eras.
- No. 06's three `me13c-signoff` chunk takes copied as `lt13c-signoff.*` (same text/pace/voice hash, 22 characters free).

## Next
1. `python3 work/check_quota.py` with `ELEVENLABS_API_KEY` in the shell (read-only, no spend). Gate: 8,836 new characters,
   worst case × MAX_TRIES must fit. No. 06's HANDOFF left ~21,700 credits until the 2026-11-06 reset; ~35,000 characters
   went on the rejected Downloads slide packs on 2026-10-29, so the balance may be low.
2. David approves the cost → `python3 work/gen_voice.py` (gates) → `insert_pauses.py` → `make_vo_json.py`.
3. Whisper round-trip (`tools/dyk/whisper_diff.py`) → voice pre-flight → BEATMAP (every second) → shots `Lt*` in `remotion/src/shots/dyk-07/`.

## Open facts
- L7 Murdoch is not in the narration (dropped). The No. 08 teaser is sourced (L18, Bruegel 1563); `lt13b-next` is clear to voice.

## Voice log
- Batch 1 (2026-10-29, ran twice; first run rejected lt04 c1-c2, lt05 c1/c5, second passed): lt01, lt02, lt00, lt03, lt04, lt05 accepted. Cost 1,848 credits (13,780 → 11,932 left).
- Batch 2: lt06, lt07, lt08 accepted. Cost 1,284 (→ 10,648).
- Batch 3a: lt09, lt11 accepted; lt10-reveal c3 (ladder) and c4 (payoff) rejected on pace: target 2.5 copied from No. 06 was below Brian's natural pace (2.6-3.0 and 3.1-3.4). Targets moved to 2.8 and 3.2 (the No. 06 fix: match targets to natural pace, never force the voice slower).
- (listen) speech-rate steps flagged for the pre-flight: lt04 c3→4→5, lt05 c2→3 and c4→5, lt06 c3→4, lt08 c1→2, lt10 c3→4.
- Final batch: lt10, lt12, lt13, lt14 accepted (lt10 c3/c4 passed first try at 2.8 / 3.2). lt13c-signoff cached, lt13b-next held for the Obesity source.
- Checks (2026-10-29): pauses inserted into 15 scenes (+10.7 s); tail check PASS.
- Whisper diff: **PASS** with two number accepts. Whisper wrote what Brian said as digits, both values right:
  lt01 "one three-thousandth" → " 1 3,000th"; lt05 "eighteen oh seven" → "1807".
  Run with `--accept "lt01-hook:one three" --accept "lt05-1807:eighteen" --accept "lt05-1807:seven"`.
- **Listen pending (David):** `audit/listen/LISTEN-07.mp3` (~33 s, 9 clips, 1 s gaps), in order: one three-thousandth ·
  eighteen oh seven, on Pall Mall · Frederick Winsor (heard "Fredricich Windsor") · Gas Light and Coke Company (heard "Co-Company") ·
  Abraham Gesner · rushlight · Beeswax is for the church · France has told shops (heard "Francis told") · Dex-tee dot live.
  Any clip that sounds wrong → re-voice only that chunk (`ONLY=<scene>`), then rerun Whisper on it.
- **Voice approved (David, 2026-10-29):** after the A/B (`audit/listen/AB-06-vs-07.mp3`, full passages No. 06 vs No. 07) David said "very good now".
  The short cut clips in LISTEN-07.mp3 started mid-sentence and sounded wrong; judge voice on full passages, not cut-outs. No re-voice.
- Teaser `lt13b-next` voiced 2026-10-29 (try 2 at speed 0.95, 11.24 s; quota 9,602 left before the run). Whisper PASS ("weight" heard as "wait": listen).
- Sign-off `lt13c-signoff`: No. 06's identical take reused (same text/pace/voice). vo.json written (17 scenes); `make_timeline.py` retargeted → 10:21.6.
- Pre-flight round 1: payoff gate failed on lt10 c3/c4 (2.93 / 3.5 w/s, limit 2.8) because their targets had been raised to Brian's natural pace.
  Fixed for free with pauses on each ladder rung and before each half of the payoff (+2.95 s). Now 6 issues, all for David's ear:
  pace lt04 c4 2.69, lt07 c1 2.65, lt10 c4 2.76 (just under target only because pauses were added after the gen_voice gate);
  drag 'stinks,' 0.56 s (lt04), 'signs,' 0.63 s (lt09); sfx cuesheet comes with the build step.
  Listen file: `audit/listen/PREFLIGHT-07.mp3` (full sentences): 1 new ladder + payoff · 2 "stinks" · 3 "signs" · 4 lt04 cost of light · 5 lt07 wake-up · 6 the teaser.
- **Waivers (human-checked, David, 2026-10-29):** all 6 PREFLIGHT-07.mp3 clips "All fine": pace lt04 c4 / lt07 c1 / lt10 c4, drag 'stinks,' / 'signs,', teaser "weight". Do not re-voice for these. Voice is final; next: BEATMAP.
- Build setup (2026-10-29): `make_beat_skeleton.py` → BEATMAP.md skeleton (622 rows, 569 with speech; tests retargeted, 3 pass).
  New kit `remotion/src/lib/dykkit-light.tsx` (LIGHT_ARC, PriceStrip "1 HOUR OF LIGHT · WORK", LightProp ×18, NightSky,
  TenPeople, LightFigure; tsc clean). Tools copied + retargeted from No. 06: cues.py, check_cues.py, build_final.py,
  make_beatmap.py (MOTION map rewritten for Light), qa_final.py, qa_sweep.py, frames.py, sync_shots.py, remotion_run.mjs,
  make_preview.py, tally_run.py. `SHOT-BRIEF.md` written; 6 parallel builders writing the 15 Lt* shots + cue_parts.
- Shots (2026-10-29): all 15 Lt* shots + 14 cue parts written by 6 builders from SHOT-BRIEF.md. tsc 0 errors; check_cues.py
  (glob fixed to Lt*.tsx) all cues resolve; make_beatmap.py → BEATMAP.md 622 rows, **0 gaps** (19 flagged, all fixed with
  new beats + soft cues). cuesheet.json exported; pre-flight SFX check clean; only the 5 David-waived items remain.
- Builder notes to check on stills: Lt1807 "A ROW OF POSTS" hold is ~1.5 s (tight vs DYK card fade-in); LtHook "tonight,"
  label arrives ~0.4 s late; Lt1993 shows Nobel 2014 (unspoken, L12); 2100 rung drawn wider than the kit dock (580 px).
- Next: free disk before rendering (28 GiB free vs 25 GiB reserve) → registry → stills at cue frames → render-all → build_final → qa → audit loop.
- Disk: David cleared ZCodeProject node_modules (2026-10-29) → ~42 GiB free.
- Fixes before render (2026-10-29): LtHook "We didn't." now holds 1 s then docks (BEAT_END = AND − 4), the house layer with TONIGHT fades in on "tonight," (was 0.37 s late behind the 53 f hold); dock whoosh moved to 'tonight,'.
  Lt1807: +0.4 s pause after "posts." (make_script → insert_pauses → make_vo_json → make_timeline → sync_shots; no re-voice) so A ROW OF POSTS is fully legible 55 f before the DYK card. Master 10:22.0.
  Stills review (121 at cue frames + fix stills): Lt2100 France source line overlapped SHOP WINDOWS → moved top-right; Tucson "TO KEEP THE SKY DARK" wrapped and its source overlapped → column 470 px, card 330 px. tsc 0, check_cues all resolve, BEATMAP 623 rows 0 gaps, pre-flight = the 5 waived items only.
- Render (2026-10-29): 14 shots via render-all --scale=1 (Lt2100 re-rendered after the card fix, checked on a frame of the mp4).
  build_final → `dyk-07-light-1080P.mp4` 622.00 s, 664 SFX cues, -14.1 LUFS / TP -2.4 dBFS. qa_final PASS (A/V diff 0 ms, 0 pts gaps);
  qa_sweep 311 frames → 26 sheets in audit/sweep, loudness flags none. Next: audit loop over the sweep sheets → RUBRIC → HTML report → David's watch → packaging.
- Audit (2026-10-29): 2 independent read-only frame auditors over the 2 s sweep → 0 C, 1 H (1882 NOBODY CAN MAKE touching ladder), 1 M (1500 stamp margin), LOWs.
  Fixed: Lt1882 colour group (left 790, swatch 120, labels 28), Lt1500 bar 1000 px + stamp left 1200 size 26, beeswax source clause on "Beeswax". Re-rendered Lt1500/Lt1882,
  rebuilt master, qa_final PASS, sweep re-run; fixes checked on master frames 138 s / 334 s. RUBRIC.md A− 26/30; audit/AUDIT-REPORT.html; tracker row added
  (~/Desktop/DavidAi/audit-dashboard.html, backup in session scratchpad). Next: David's watch → packaging.
- Committed as 8ef1c48, PR DansiDanutz/Claude-Youtube#28 (stacked on #26).
- Round 2 LOW fixes (2026-10-29): LtToday window fades under the DYK card (no edge fragments); Lt1993 lab props +120 px (clear of the place line).
  A LIQUID chip (Lt1859) frame-checked on the master: on time. Re-rendered LtToday/Lt1993, master rebuilt, qa_final PASS. RUBRIC A 27/30.
- **Recut of the opening, Option B (David, 2026-10-29)**, VidNinjas pre-roll rule (≤ ~90 words / 35 s; now in the skill).
  `splice_coldopen.py` cuts ONE scene `lt01-cold` (89 words, 31.91 s) from the existing paused takes, called by `make_vo_json.py`:
  lt01 from "What happened" (drops "Last time…") · lt02 "We didn't… slowly disappearing." (drops the stars DYK card) · lt00 from
  "Here's your guess." (drops "Welcome back… the rule."). lt03 promise and the LtIntro sting are out of the master. 0 credits.
  LtHook rebuilt: premise → We didn't → house → guess card (TenPeople, 3 neutral options, steps + tick) → 1.8 s brand flash.
  Pre-roll 34.57 s; "You wake up in 1500" at ~35.4 s. LtIntro/LtWelcome/LtPromise TSX + cue parts stay on disk, unused.
  Checks: check_cues all resolve · BEATMAP 581 rows 0 gaps · tests 3 pass · Whisper on lt01-cold PASS (same two number accepts) ·
  joins silent (rms ≤ 1) · stills audit/sheet-recut.png · master 9:40.2, qa_final PASS (A/V 33 ms, 0 pts gaps, −14.1 LUFS, TP −2.3).
  Pre-flight: new pace flag lt01-cold c2 2.36 w/s = the approved "We didn't… disappearing." audio measured alone; waived by David after watching the recut opening (2026-10-29).
  Chapters (for YOUTUBE.md): 0:00 cold open · 0:34 1500 · 1:49 1807 · 2:46 1859 · 3:51 1882 · 4:53 1993 · 5:48 today · 6:44 answer · 7:30 2100 · 8:29 outro.
- Packaging (2026-10-29): `packaging/` title "Why Is Light Pollution Bad? The History of Light (1500–2100)" (60, autocomplete-checked),
  keyword-first description (3,503 chars), tags 390, thumbnail = the live-series Light thumbnail from the VidNinjas kit (04:44 version).
  packaging_check PASS (`audit/PACKAGING-CHECK.md`). Copied with the master to `~/Downloads/DYK-07-Light/`. Not committed. Upload waits for David.

## Published (2026-10-29)
- YouTube `HbsIy38RGvI`, public (David clicked Publish). Title "Why Is Light Pollution Bad? The History of Light (1500–2100)";
  description opener widened (3,634 chars, packaging check PASS); 20 tags; English, Education, not made for kids, AI disclosure no;
  playlist "Did You Know That? — Every Episode".
- End screen → No. 06 Medicine `_RD_Qz66FCg` + subscribe; card at 0:40 → No. 06. Captions: en ASR only.
- Pinned comment by @Did-You-Know-that-2026: "Streetlights or stars: if you had to give one up, which would it be, and why? …"
- No. 06 re-pointed: end-screen video and 0:40 card → No. 07 `HbsIy38RGvI`; verified on No. 06's watch page
  (VIDEO element left .570 top .214 w .323; CHANNEL .423/.573/.154) and in Studio (card "Video: Why Is Light Pollution Bad?…").
- Dexty.live: DansiDanutz/Did-You-Know-That#51 merged (d77f9f5, 195 tests pass, build check clean). Production deploy NOT done:
  the Vercel CLI on this Mac has no login. After `vercel login`: `vercel --cwd ~/Projects/Did-You-Know-That/website --prod --yes`,
  then check /episodes/light/ embeds HbsIy38RGvI and /data/episodes.json lists 7 episodes.
