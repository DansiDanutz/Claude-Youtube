# RUBRIC — Did You Know That? No. 02 · "The Sun" (graded 2026-10-11, 1080p master)

Master: `dyk-02-the-sun-1080P.mp4` · 8:50.1 (530.10 s) · 1920×1080 CFR 30 · H.264 + stereo AAC 48 kHz.
QA gate (`work/qa_final.py`, hard-fail): **PASS** — video = audio = 530.100 s · pts gaps > 50 ms **0** · **−14.1 LUFS** · true peak **−2.3 dBTP** ·
loudness sweep flags none · 1 s frame sweep (530 frames, 45 sheets) audited in 3 rounds by independent read-only reviewers
(round 1: 1 CRITICAL / 21 HIGH / 41 MEDIUM → round 3: 0 / 0 / 1 → fixed and verified on full frames) · 15 VO scenes / 34 chunks
whisper-verified and gated (pace per chunk, stretch, sentence-final ≤ 0.55 s/syl, gaps; no chunk below speed 0.85).

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | DansLab tokens/fonts for episode art, channel brand from `dytbrand.tsx`; −1: Sun palette (`SUN.*`) and the spectrum's rainbow are episode-specific hues outside the token set (subject-driven) |
| 2 | Typography & legibility | 4 | labels ≥ 24 px (small-text findings raised to 24–28 px), 160 px margins, HUD and cliffhanger band kept clear; −1: DYK card footnotes at 22 px and the kit's 19 px HUD tier |
| 3 | Narrative sync | 5 | every reveal keyed to Brian's word timestamps via `makeCue()`; one cue table (`cues.py`) drives both BEATMAP.md and the mix (445 cues); place lines, card clauses and footnotes land on their words; `check_cues.py` + `sync_shots.py --check` gates |
| 4 | Motion craft | 4 | brand easings, 12-frame builds with one click each (≤ 3/s, tested), clean card-to-scene handoffs; −1: five 2.6–2.9 s stretches rely on continuous motion rather than a new beat |
| 5 | Sound | 4 | 445 word-synced cues, ducked bed, risers end on their payoffs, −14.1 LUFS / −2.3 dBTP; −1: not yet heard by a human (David's 30-second listen is the gate) |
| 6 | Evidence & truth | 5 | every on-screen number traces to `RESEARCH.md` (F1–F17 + setting-year note); hedges on screen (Chanel "probably a myth", Gunning "blamed, at least in part", NASA "other estimates vary widely"); 2100 labelled PREDICTION throughout; Comment of the Week card labelled EXAMPLE |

**Total: 26/30 → A.** Shippable by the rubric; David's watch is the real gate.

Not done (deliberately): 4K `--scale=2` delivery render (disk critical, ~6 GiB free), YouTube upload, Dexty.live entry.
