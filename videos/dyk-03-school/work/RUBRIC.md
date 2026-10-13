# RUBRIC — Did You Know That? No. 03 · "School" (graded 2026-10-13, 1080p master)

Master: `dyk-03-school-1080P.mp4` · 10:50.9 (650.87 s) · 1920×1080 CFR 30 · H.264 High + AAC LC 48 kHz stereo.
QA gate (`qa_final.py`): **PASS** — video 650.867 s / audio 650.859 s (8 ms) · pts gaps > 50 ms **0** · **−14.1 LUFS** · true peak **−2.4 dBTP** · loudness sweep: no flags.
Voice pre-flight (`tools/dyk/voice_preflight.py`): **PASS — 0 issues** on the final script, vo.json, timeline and cue sheet (622 cues).
Audit: 3 independent read-only auditors (visual 1 s sweep; voice / mix / A-V sync; fresh re-audit) → round 1: 0 CRITICAL, 3 HIGH, 12 MEDIUM;
all fixed and re-verified (last HIGH, a 0.19 s hallucinated voice tail, verified gone on the stem: −88 to −120 dB after "hour.").
A/V sync: waveform cross-correlation +4.5–5.5 ms at 20 points, no drift; corrected whisper word sample max 0.04 s.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | DansLab tokens + DYK brand; new `dykkit-school.tsx` reuses DL/DYT tokens; −1: subject hues (wood, ice, leaf) outside the token set |
| 2 | Typography & legibility | 4 | episode text ≥ 24 px, inside 160 px margins after the audit fixes; −1: kit-owned 19–22 px HUD tier and DayClock ring numerals (22 px) |
| 3 | Narrative sync | 5 | every reveal keyed to Brian's words via `makeCue`; arc chip on each era keyword; the answer walks the ladder; spoiler checks passed (free time 7:28, holidays 3:39, ladder 6:10 — all after their words) |
| 4 | Motion craft | 4 | 622 word-synced cues; BEATMAP 9 narrated gaps ≥ 2 s (8 are 2.0–2.2 s with continuous motion, 1 is the deliberate 3.9 s click-free payoff); −1 vs No. 02 (0 gaps) |
| 5 | Sound | 4 | ducked bed (−19.5 dB under voice), SFX moved off word onsets (207 → 23 within ±30 ms, all before the onset), sign-off beats 0.80 s; −1: no human listen yet |
| 6 | Evidence & truth | 5 | every on-screen number traces to RESEARCH.md (3 blocked sources re-checked in a browser before voicing); hedges on screen ("claimed", "said to", "might", "World Bank estimate", "later studies: smaller"); 2100 labelled PREDICTION; pinned-question card, no fabricated comment |

**Total: 26/30 → A−.** David's watch/listen is the real gate.
