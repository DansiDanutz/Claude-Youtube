# HANDOFF — Did You Know That? No. 04 · "Money" (2026-10-13)

State: **approval package ready** (not uploaded). Branch `video/dyk-04-money` in worktree `wt12` (pushed).
Master `videos/dyk-04-money/dyk-04-money-1080P.mp4` (620.73 s, −14.1 LUFS, −2.4 dBTP, QA PASS) · preview `dyk-04-money-720p-preview.mp4` (29.1 MB).
Copies: `~/Downloads/DYK-04-Money/`. Paid voice media: copied into `~/Projects/Claude-Youtube/videos/dyk-04-money/work/{narration,mix}` (ignored paths).

## What was done (skill pipeline, in order)
1. Re-checks (RESEARCH.md "Re-checks before voicing"): F3 corroborated (~3 % today, script keeps the 2014 framing); F19 verified (Bordo/Econlib);
   F26 **digital-euro regulation not yet law** — Parliament mandate 9 Jul 2026, trilogue ongoing → line kept with "possible… could… as early as 2029, if lawmakers agree";
   F29 new: food teaser sourced to Munro 2003 (Phelps Brown & Hopkins basket, food ≈ 80 %; Flanders 70–80 %) → narrated "Historians estimate… most of a working family's budget".
2. Script (`make_script.py` → `narration/script.json`), humanizer pass vs STORY §4: wording-only changes ("One narrow street is packed" — Quincampoix moved to screen;
   "Across the euro area" (more exact than "in Europe" for F24); crash line split; "Now climb the ladder again"; Food teaser; "counterfeiters" for "forgers" after whisper heard
   "foragers"; "fact cards" for "facts" (drag); "a new shape" (drag on "strange"); "Sunday evening in August" (drag on "dinner"); I-O-U spelled for TTS). All hedges kept.
   `length_estimate.py`: 1,640 words → 10:18 (budget 10:30) · master 10:20.7.
3. Comment of the Week: No. 03 had **no viewer comments** (only the channel's pinned question) on 2026-10-13 → pinned-question fallback card + No. 03's
   voiced end-screen line reused (`work/COTW.md`). No shortlist needed.
4. Voice: Brian via `gen_voice.py` (shared `voice_audio.refine_ends` + `tail_artefact`), Creator quota gate passed every run.
   ElevenLabs characters used this episode ≈ **5,600** (subscription 243,274 → 248,884 of 363,000; the counter can lag by a few hundred).
   Note: one re-voice (1661 chunk split) briefly shifted chunk indices and re-billed four cached 1661 chunks (~600 chars) before I merged the split back.
   `insert_pauses.py` → `make_vo_json.py` → `make_timeline.py`. Whisper round-trip PASS (`audit/WHISPER-DIFF.txt`) with one accepted tool false positive:
   `mo07-1821:"nineteen seventy one, one"` — whisper_diff merges "1971, one" into one number (#197101 vs #1972); the take is correct (follow-up suggested).
   Tail check PASS on the chunk cache and on every single-chunk take.
5. Shots `remotion/src/shots/dyk-04/Mo*.tsx` (14 + `MoThumb`), kit `remotion/src/lib/dykkit-money.tsx`. HOW WE SAW IT chips + docked ladder, reveal walks the
   ladder, 2100 labelled PREDICTION, outro Food teaser + WATCH NEXT "No. 05" swappable (`NEXT_EP` in MoOutro + `mo13b-next` line + description line).
6. Cue table `work/cues.py` + `cue_parts/*.py`; `build_final.py` resolves loud cues with the **shared** `voice_preflight.off_word`; `cuesheet.json` exported;
   voice pre-flight PASS before the first render (`audit/VOICE-PREFLIGHT.md`).
7. Renders via `work/remotion_run.mjs` (one bundle per run; each bundle dir recorded in `audit/bundles.log` and removed by the run that created it).
   Disk guard checked before every render/build/preview: always "allow" (pressure "constrained"; free space fell from 46.3 to ~40 GiB during the session
   from activity outside this worktree). Bare `ffmpeg` is held by the guard, so the preview is made by `work/make_preview.py` (checked → allow).
8. Audit loop: round 1 visual 6 HIGH / 7 MEDIUM, audio 5 MEDIUM → fixed (ladder collisions, clipped caption, empty beats, recap timing, a 2007 spoiler counter,
   a clipped pause cut at "pocket. You" fixed by re-voicing the chunk split, sign-off/end-screen levels, end-screen cue stack, riser timing, loud SFX,
   TV-range BT.709 encode) → round 2/3 re-audits: 0 CRITICAL / 0 HIGH / 0 MEDIUM. Report: `audit/AUDIT-REPORT.html`.
9. Packaging (`packaging/`): title, description (chapters from timeline, ≥ 10 s, no clock times outside CHAPTERS), tags, YOUTUBE.md, thumbnail "MONEY / IN 2100?"
   from MoThumb (1280×720). `packaging_check.py` PASS.

## Open (LOW) — for David
- **Listen by ear** (whisper flags): Tenochtitlan (1:12) · "A price list" (heard "priceless", 1:28) · Johan Palmstruch / "Palmstruch is" (heard "Palmstroke/
  Palmstruck has", 2:30, 3:02) · livres (heard "leaves", 3:28) · Mississippi (3:49) · "I promise to pay" and "that promise meant gold" (heard "promised", 4:34, 4:38) ·
  Matatus (6:15) · upcountry (6:21) · "eight/three/nine in ten" (heard "and ten") · M-Pesa (heard "MPs", 6:31) · "rung" (heard "wrong", 8:03) · "Dex-tee dot live" ·
  close line pitch (152 Hz, question intonation — confirm not strained) · pace step into "For the next hundred years" (4:13).
- Visual LOWs: big era year briefly crosses the scene art as it docks (1:13, 2:15); M-PESA source line margin 116 px (6:33); 7:07–7:08 only "THE ANSWER" title;
  "actually?" riser ends 0.23 s early (lands on "money,").
- BEATMAP lists 35 narrated stretches ≥ 2 s between SFX-marked events; auditors found them covered by motion (no empty stage ≥ 2 s remains).
- Re-check No. 03's comments before upload; if real ones exist, put the top 3 in `work/COMMENT-SHORTLIST.md` for David and swap card + one line.
- Upload / Studio / pinned comment / Dexty.live: per `references/upload-playbook.md`, each public step needs David's go-ahead.

## Files outside the repo
- `.remotion/` (193 MB) in the worktree root: Remotion re-downloaded Chrome Headless Shell there on the first stills run (untracked; not committed).
- Auditor scratch (could not be deleted — the delete prompt timed out): `scratchpad/audit_tmp/*.npy` (~455 MB), `scratchpad/aud3/`, `scratchpad/review5/`.
