# DYK No. 02 — The Sun · HANDOFF (v2)

Branch `video/dyk-02-the-sun` — nothing committed, pushed, amended or branch-switched. Episode-01 files untouched by this work.
v1 (8:50.1, A 26/30) is archived in `videos/dyk-02-the-sun/v1-archive/` (script, words, mp3s, timeline, cues.py, BEATMAP, HANDOFF,
RUBRIC, audit report/findings, shot TSX + kit, packaging, master `dyk-02-the-sun-1080P-v1.mp4`) and committed at 7416f7a.

## v2.1 voice fix (2026-10-12) — read `audit/VOICE-AUDIT.md` first
David's notes (0:36–0:38, 1:13–1:15, 7:15–7:41, 8:15–8:21, 9:41) traced to: `insert_pauses.py` matching pause rules
without punctuation ("that?" fired on "That.", "you?" on "You wake up", "answer?"/"it?" early), silence cut into speech
(clicks), and a chunk-speed zig-zag (0.85 ↔ 1.2). Fixed in the pipeline (exact tokens, quietest-point cuts + fades,
chunk-edge fades + levelling, continuity band 0.90–1.08 / ≤ 0.08 step / payoff ≤ 1.0, `even_pace`, loud SFX kept off
words, `WE` word-end cues, cuesheet export) and by re-voicing 33 chunks (**5,957 ElevenLabs characters**, 227,374 →
233,331 of 363,000, Creator). New master **10:16.7**, QA PASS (A/V 0 ms, −14.1 LUFS, TP −2.2). Preflight: 1 open
item ('Photosynthesis.' 1.07 s, rule conflict — see the audit). Chapters moved (description.txt). Tests: 55 passed.
The voice table below is the pre-fix v2 state; the current per-chunk table is in `audit/VOICE-AUDIT.md`.

## State
**v2 1080p master built, QA PASS, audited to CRITICAL 0 · HIGH 0 · MEDIUM 0** — `videos/dyk-02-the-sun/dyk-02-the-sun-1080P.mp4`
(9:59.0): h264 1920×1080 30/1, AAC 48 kHz stereo, A/V 33 ms, 0 pts gaps > 50 ms, **−14.1 LUFS, true peak −2.2 dBTP**.
Rubric **A 27/30** (`RUBRIC.md`). Audit: `audit/AUDIT-FINDINGS.md`, `audit/AUDIT-REPORT.html`; 1 s sweep `audit/sweep-v2/`;
`audit/timeline-by-second.txt`; `BEATMAP.md` (600 rows, 607+ cues, 0 narrated gaps ≥ 2 s). Cue-frame stills (pre-audit versions):
`audit/stills-v2/stills-00…14.jpg`. Thumbnail unchanged: `packaging/thumbnail.png` (THE SUN / IN 2100?).
Not done: David's watch/listen; stills at the FINAL cue frames (disk guard holds `stills-at.mjs`); 4K; upload; Dexty.live entry.

## What changed vs v1
- **Script**: approved v2 (`v2/script-v2.json`) promoted to `narration/script.json` with minimal rephrases where a chunk could not pass
  its gates or whisper misheard it: "Today, we make electricity from it." · "check your answer." · "going to bed at sunset." · "the true age of
  sunlight." · "...at the centre, and sets the Earth in motion." · "Another astronomer says…" · "Jan Ingen-house" (spoken spelling; screen
  shows Ingenhousz) · "Or your eyes can detect." · "puts thermometers" · "behind screens and windows." · "But it's not instant." · "farms, or
  cities, or writing. How close was your answer?" · "the next step on the ladder?" · "Maple transmitted power". Facts unchanged.
- **Voice**: 12 changed scenes regenerated (Brian, flash v2.5, .32/.85/.45); su12–su14 kept (v1 takes, cached chunks for Gunning/Chanel
  DYKs). `gen_voice.py` floor now 0.85 for every chunk (0.95 hook/welcome/outro). Breaths via the new `insert_pauses.py` (ported from
  ep01; `pauses` blocks in script.json; `make_vo_json.py` uses `<id>.paused.json`). **ElevenLabs characters used: 4,467**
  (222,907 → 227,374 of 363,000, Creator, no overage).
- **Arc**: new kit exports in `remotion/src/lib/dykkit-sun.tsx` only — `HowWeSawIt`, `ArcLadder`, `pastRungs`, `ARC_LABELS`,
  `LADDER_DOCK`, `SunCliffhanger` (band inside 160 px margins), `SunWeekStrip` (24 px labels); existing exports unchanged except
  CardSource / QuoteCard header to 24 px brighter and HUD PREDICTION 19 → 24 px (legibility findings). Chips on night. / watch. / explain. /
  measure, / meal. / Power.; ladder docked top-right; the answer walks it back; 2100 adds the "?" rung on "ladder?", 2100 on "hundred", fills
  "THE ENERGY BEHIND WHAT WE RUN?" on "wakes up".
- **New visuals**: 1779 Ingenhousz (jars, 500+, bubbles in sun / stop in shade, green parts), 1928 picnic → photosynthesis (1893 chip, leaf
  → sugar, food chain, "stored sunlight"), Today ×11 chart (≈ 250 → ≈ 2,770 TWh, 8.7 %), 2100 IEA data-centre chart (1.5 % · ≈ 415 TWh →
  ≈ 945 TWh 2030 · Japan) + MAPLE, hook split-screen (1500 sleeper / solar bulb). Removed: hook verb cards, Newton fan, Vanguard, IEA 2014.
- **Pipeline**: `cues.py` now execs per-shot `cue_parts/<Shot>.py`; `make_beatmap.py` gap gate 2.0 s; `whisper_diff.py` reads chunks;
  `RESEARCH.md` merged A1–A5 (coordinator-verified Ember 2026 / IEA Energy and AI). SuOutro chips 1752 → 1779; SuClose re-timed
  (pauses) and caption built on its words. Tests: `tests/test_dyk02_pipeline.py` 37 passed (8 new: 0.85 floor, pauses planning/silence/
  missing word, paused vo.json + stale guard, committed vo.json = paused takes, cue parts in mix order, one DYK per era + arc keywords).
- **Packaging**: `packaging/description.txt` (3,103 chars, v2 chapters, plain Dexty.live, no < >), `tags.txt` (456), `YOUTUBE.md`
  (title #1 approved, 9:59, end screen 9:44–9:59). Chapters: 0:00 The question · 0:28 Welcome back · 0:52 Seven mornings · 1:13 1500 ·
  Day and night · 2:12 1610 · Something to watch · 3:07 1779 · Something to explain · 4:02 1800 · Something to measure · 5:00 1928 ·
  Every meal is sunlight · 6:02 Today · Power we harvest · 6:51 The answer · 7:42 2100 · Prediction · 8:47 One question for you ·
  8:58 Comment of the Week (sting folded into "Welcome back": YouTube chapters must be ≥ 10 s).

## Audit rounds (fresh independent read-only reviewers on the 1 s sweep)
R1 full: C1 H9 M39 L29 → R2 full: C0 H4 M14 L20 → R3 full: C0 H1 M14 L26 → R4 changed: 0/0/6/15 → R5 changed: 0/1/0/4 →
R6 changed: 0/0/1/2 → R7 changed: **0/0/0**/1. Details in `audit/AUDIT-FINDINGS.md`.

## Voice table (final takes; every chunk inside ±10 % of its own pace target and at/above its floor)
| scene | chunk | words | pace target | floor | final speed | measured w/s | source |
|---|---|---|---|---|---|---|---|
| su01-hook | 1 | 24 | 3.3 | 0.95 | 1.0 | 3.33 | v2 take (chunk cache) |
| su01-hook | 2 | 22 | 3.4 | 0.95 | 1.12 | 3.54 | v2 take (chunk cache) |
| su02-question | 1 | 22 | 3.2 | 0.95 | 1.0 | 3.48 | v2 take (chunk cache) |
| su02-question | 2 | 18 | 3.3 | 0.95 | 0.95 | 3.43 | v2 take (chunk cache) |
| su00-welcome | 1 | 46 | 3.15 | 0.95 | 1.0 | 3.14 | take |
| su03-promise | 1 | 28 | 3.1 | 0.85 | 1.0 | 2.94 | v2 take (chunk cache) |
| su03-promise | 2 | 31 | 3.1 | 0.85 | 0.85 | 3.34 | v2 take (chunk cache) |
| su04-1500 | 1 | 23 | 3.0 | 0.85 | 1.0 | 3.22 | v2 take (chunk cache) |
| su04-1500 | 2 | 25 | 2.9 | 0.85 | 1.0 | 3.04 | v2 take (chunk cache) |
| su04-1500 | 3 | 69 | 3.0 | 0.85 | 1.04 | 2.93 | v2 take (chunk cache) |
| su04-1500 | 4 | 33 | 3.0 | 0.85 | 1.053 | 2.95 | v2 take (chunk cache) |
| su04-1500 | 5 | 16 | 2.9 | 0.85 | 1.0 | 2.85 | v2 take (chunk cache) |
| su05-1610 | 1 | 41 | 3.0 | 0.85 | 1.0 | 3.08 | v2 take (chunk cache) |
| su05-1610 | 2 | 23 | 2.9 | 0.85 | 0.902 | 2.75 | v2 take (chunk cache) |
| su05-1610 | 3 | 51 | 3.0 | 0.85 | 1.134 | 2.85 | v2 take (chunk cache) |
| su05-1610 | 4 | 24 | 3.0 | 0.85 | 1.0 | 3.09 | v2 take (chunk cache) |
| su05-1610 | 5 | 10 | 2.9 | 0.85 | 1.0 | 2.95 | v2 take (chunk cache) |
| su06-1700 | 1 | 25 | 3.0 | 0.85 | 1.0 | 2.97 | v2 take (chunk cache) |
| su06-1700 | 2 | 18 | 3.0 | 0.85 | 0.85 | 3.15 | v2 take (chunk cache) |
| su06-1700 | 3 | 61 | 3.0 | 0.85 | 1.0 | 3.11 | v2 take (chunk cache) |
| su06-1700 | 4 | 40 | 3.0 | 0.85 | 1.134 | 3.14 | v2 take (chunk cache) |
| su06-1700 | 5 | 15 | 2.9 | 0.85 | 0.85 | 2.88 | v2 take (chunk cache) |
| su07-1800 | 1 | 29 | 3.0 | 0.85 | 1.0 | 2.80 | v2 take (chunk cache) |
| su07-1800 | 2 | 23 | 2.9 | 0.85 | 0.85 | 3.06 | v2 take (chunk cache) |
| su07-1800 | 3 | 54 | 3.0 | 0.85 | 1.151 | 3.03 | v2 take (chunk cache) |
| su07-1800 | 4 | 33 | 3.1 | 0.85 | 1.087 | 3.00 | v2 take (chunk cache) |
| su07-1800 | 5 | 20 | 2.9 | 0.85 | 0.869 | 2.78 | v2 take (chunk cache) |
| su08-1900 | 1 | 24 | 3.0 | 0.85 | 1.0 | 2.99 | v2 take (chunk cache) |
| su08-1900 | 2 | 18 | 3.0 | 0.85 | 0.85 | 2.87 | v2 take (chunk cache) |
| su08-1900 | 3 | 33 | 3.0 | 0.85 | 1.0 | 2.90 | v2 take (chunk cache) |
| su08-1900 | 4 | 63 | 3.0 | 0.85 | 1.139 | 3.00 | v2 take (chunk cache) |
| su08-1900 | 5 | 19 | 3.0 | 0.85 | 1.0 | 2.76 | v2 take (chunk cache) |
| su08-1900 | 6 | 13 | 2.9 | 0.85 | 0.85 | 2.80 | v2 take (chunk cache) |
| su09-2000 | 1 | 23 | 3.1 | 0.85 | 1.0 | 3.06 | v2 take (chunk cache) |
| su09-2000 | 2 | 22 | 2.9 | 0.85 | 0.881 | 2.74 | v2 take (chunk cache) |
| su09-2000 | 3 | 64 | 3.0 | 0.85 | 1.179 | 3.10 | v2 take (chunk cache) |
| su09-2000 | 4 | 33 | 3.0 | 0.85 | 1.0 | 3.27 | v2 take (chunk cache) |
| su10-reveal | 1 | 34 | 2.9 | 0.85 | 0.892 | 2.87 | v2 take (chunk cache) |
| su10-reveal | 2 | 51 | 2.9 | 0.85 | 1.0 | 2.88 | v2 take (chunk cache) |
| su10-reveal | 3 | 38 | 3.0 | 0.85 | 1.2 | 3.10 | v2 take (chunk cache) |
| su10-reveal | 4 | 16 | 2.9 | 0.85 | 0.85 | 2.76 | v2 take (chunk cache) |
| su11-2100 | 1 | 22 | 3.0 | 0.85 | 0.85 | 2.92 | v2 take (chunk cache) |
| su11-2100 | 2 | 54 | 3.0 | 0.85 | 1.0 | 2.97 | v2 take (chunk cache) |
| su11-2100 | 3 | 29 | 3.0 | 0.85 | 1.2 | 3.25 | v2 take (chunk cache) |
| su11-2100 | 4 | 54 | 3.0 | 0.85 | 1.0 | 3.07 | v2 take (chunk cache) |
| su11-2100 | 5 | 25 | 2.9 | 0.85 | 0.894 | 3.01 | v2 take (chunk cache) |
| su12-close | 1 | 25 | 3.0 | 0.85 | 0.853 | 2.86 | v1 take (unchanged) |
| su13-outro | 1 | 77 | 3.15 | 0.95 | 1.047 | 3.06 | v2 take (chunk cache) |
| su13-outro | 2 | 27 | 3.2 | 0.95 | 1.0 | 3.32 | v2 take (chunk cache) |
| su13-outro | 3 | 25 | 3.1 | 0.95 | 1.065 | 2.96 | v2 take (chunk cache) |
| su13-outro | 4 | 3 | none | 0.95 | 1.0 | 2.23 | v2 take (chunk cache) |
| su14-endscreen | 1 | 16 | 3.1 | 0.95 | 1.0 | 3.31 | v1 take (unchanged) |

## Disk / renders
Every render/ffmpeg step preflighted with `danslab-workflow check` (one build_final run in round 5 went without its own check, the
render before it was checked). No hold bypassed. Stills were held as high-growth from round 2 (16–18 GiB free vs 46 GiB reserve) — the
1 s master sweep was used instead. Bus dir removed by build_final; rejected takes deleted; stale `remotion-webpack-bundle-*` in TMPDIR
cleaned after renders. Shot renders ~150 MB in `~/.cache/claude-youtube-render/out`.

## Open questions for David
1. Listen to the first 30 s and one era (pace/feel) before upload; the hook runs 28 s (format says 15–25 s; it is the approved script).
2. Comment of the Week card is still an EXAMPLE; swap in a real No. 01 comment + @handle if one exists.
3. Optional: alternative title/thumbnail from STORY-v2; re-voicing the outro with contractions.
