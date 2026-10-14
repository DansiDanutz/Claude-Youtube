# RUBRIC — Did You Know That? No. 04 · "Money" (graded 2026-10-13, 1080p master)

Master: `dyk-04-money-1080P.mp4` · 10:20.7 (620.73 s) · 1920×1080 CFR 30 · H.264 High (TV range, BT.709 tagged) + AAC LC 48 kHz stereo.
QA gate (`qa_final.py`): **PASS** — video 620.700 s / audio 620.733 s (33 ms) · pts gaps > 50 ms **0** · **−14.1 LUFS** · true peak **−2.4 dBTP** · loudness sweep: no flags.
Voice gates: whisper round-trip **PASS** (one tool false-positive accepted, see HANDOFF) · tail check **PASS** · voice pre-flight **PASS — 0 issues** (564 cues).
Audit: 6 independent read-only auditor passes (visual ×4 incl. a targeted re-check, audio ×2). Round 1: 0 CRITICAL, 6 HIGH, 12 MEDIUM
(visual 6 H / 7 M; audio 5 M). All fixed and re-verified; final passes report 0 CRITICAL / 0 HIGH / 0 MEDIUM. A/V: voice stems +4.7–5.3 ms in the master, no drift.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | DansLab + DYK tokens; new `dykkit-money.tsx` reuses DL/DYT; −1: subject hues (copper, cacao, note paper) outside the token set |
| 2 | Typography & legibility | 4 | episode text ≥ 24 px, ladder keep-out respected after round 1; −1: kit-owned 19–22 px HUD tier, one source line at a 116 px margin (6:33) |
| 3 | Narrative sync | 5 | every reveal keyed to Brian's words via `makeCue`; arc chip on each era keyword; the answer walks the ladder rung by rung; no spoilers (2007 counter removed) |
| 4 | Motion craft | 4 | 564 word-synced cues; BEATMAP 35 narrated SFX-gaps ≥ 2 s, all covered by continuous motion per the auditors; −1 vs No. 02 |
| 5 | Sound | 4 | ducked bed (≥ 7 dB under voice), loud SFX off word onsets (shared `off_word`), sign-off 0.83/0.80 s, risers end on payoffs; −1: no human listen yet |
| 6 | Evidence & truth | 5 | every on-screen number traces to RESEARCH.md; F3/F19/F26 re-checked (digital-euro law still in trilogue → hedged "if lawmakers agree"); food teaser sourced (F29); pinned-question card, no fabricated comment |

**Total: 26/30 → A−.** David's watch/listen is the real gate.
