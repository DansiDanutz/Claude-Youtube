# RUBRIC — Did You Know That? No. 02 · "The Sun" **v2** (graded 2026-10-11, 1080p master)

Master: `dyk-02-the-sun-1080P.mp4` · 9:59.0 (599.03 s) · 1920×1080 CFR 30 · H.264 + stereo AAC 48 kHz. (v1: 8:50.1, A 26/30 — archived.)
QA gate (`work/qa_final.py`, hard-fail): **PASS** — video 599.000 s / audio 599.033 s (33 ms) · pts gaps > 50 ms **0** · **−14.1 LUFS** ·
true peak **−2.2 dBTP** · loudness sweep: one flag at 593 s = the music bed under the silent end screen (accepted) ·
1 s sweep (599 frames, 50 sheets) audited by fresh read-only reviewers in 7 rounds → **CRITICAL 0 · HIGH 0 · MEDIUM 0** on every re-checked range ·
BEATMAP 600 rows, 0 narrated gaps ≥ 2 s, ≤ 3 clicks/s · 41 voice chunks all inside their gates (pace ±10 % of own target, floors 0.95 / 0.85,
stretch incl. sentence-final ≤ 0.55 s/syl, no mid-sentence gap > 1.1 s), whisper-checked.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | DansLab tokens/fonts, brand from `dytbrand.tsx`, new arc pieces (`HowWeSawIt`, `ArcLadder`, `SunCliffhanger`, `SunWeekStrip`) reuse DL/SUN tokens only; −1: Sun / rainbow / thermal palettes are subject hues outside the token set |
| 2 | Typography & legibility | 4 | all v2-owned text ≥ 24 px (ladder 26/24, footnotes 24, HUD PREDICTION 24, outro 28), band + NEXT pill inside the 160 px margins; −1: kit-owned 20 px LightBeam "YOU" label and 19 px HUD "NO. 02" tier remain (ep01 kit, not edited) |
| 3 | Narrative sync | 5 | every reveal keyed to Brian's words (`makeCue`), card clauses and payoffs land on their words, one cue table drives BEATMAP + mix (607+ cues), arc chip on each era keyword (night. / watch. / explain. / measure, / meal. / Power.), answer walks the ladder rung by rung, 2100 grows from the top rung |
| 4 | Motion craft | 5 | no narrated stretch ≥ 2 s without a visual event (BEATMAP 0 gaps), 12-frame builds with one click (≤ 3/s, tested), crossfades without dips, chip→ladder dock flights, push-ins under every cliffhanger |
| 5 | Sound | 4 | word-synced SFX with a visual for every sound (audited), ducked bed, risers on payoffs, breaths inserted (pauses step), −14.1 LUFS / −2.2 dBTP; −1: no human listen yet (David's 30-second listen is the gate) |
| 6 | Evidence & truth | 5 | every on-screen number traces to `RESEARCH.md` (F1–F17 + A1–A5, Ember 2026 and IEA Energy and AI verified by the coordinator); hedges on screen; no intermediate count-up numbers; 2100 labelled PREDICTION throughout; CotW card labelled EXAMPLE |

**Total: 27/30 → A** (target ≥ A 27/30 met). David's watch/listen is the real gate.

Not done: frame stills at the FINAL cue frames (the disk guard held `stills-at.mjs` as high-growth from round 2 on; every
changed second was instead verified on the 1 s master sweep), 4K delivery render, upload, Dexty.live entry.
