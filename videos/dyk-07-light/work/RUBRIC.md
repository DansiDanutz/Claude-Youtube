# RUBRIC — Did You Know That? No. 07 · "Light" (graded 2026-10-29, 1080p master)

Master: `dyk-07-light-1080P.mp4` · 10:22.0 (622.00 s) · 1920×1080 CFR 30 · H.264 + AAC 48 kHz stereo.
QA gate (`qa_final.py`): **PASS** — video 622.000 s / audio 622.000 s (0 ms) · pts gaps > 50 ms **0** · **−14.1 LUFS** · true peak **−2.4 dBTP** · loudness sweep: no flags.
Voice gates: whisper round-trip **PASS** (3 number accepts: "one three-thousandth", "eighteen oh seven") · tail check **PASS** · voice pre-flight: 5 items (3 pace, 2 drag), all human-waived by David after listening (`audit/VOICE-PREFLIGHT.md`); SFX-on-word check clean (664 cues).
Audit: pre-render still pass (121 stills at cue frames, by me) → 2 independent read-only frame auditors over the full 2 s sweep (26 sheets) → fixes → master re-checked on the fixed frames.
Round 0 (stills): 2 HIGH (2100 France source over SHOP WINDOWS; Tucson line wrap + source overlap) + 2 pre-render timing fixes (hook TONIGHT 0.37 s late; 1807 A ROW OF POSTS held 1.43 s < 1.5 s). Round 1 (auditors): 0 CRITICAL, 1 HIGH (1882 NOBODY CAN MAKE touching the ladder), 1 MEDIUM (1500 stamp 60 px from the edge), LOW 15.
All CRITICAL/HIGH/MEDIUM fixed and re-verified on master frames (138 s, 334 s) and stills. Mix: brand-card click before "Did" and chime after "that" on all 7 cards; ≤ 3 clicks in any second; end-screen line 4 spaced cues.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | DansLab + DYK tokens; new `dykkit-light.tsx` re-exports No. 05/06 kit; −1: subject hues (flame, LED blue, skyglow) outside the token set |
| 2 | Typography & legibility | 4 | text ≥ 24 px, 160 px margins, nothing in HUD/band after the fixes; −1: two cards leak scene fragments at their edges (6:40), "Tokushima, Shikoku" touches a shelf prop (5:38) |
| 3 | Narrative sync | 5 | every reveal keyed with `makeCue`; arc chip on each era word; ladder walk-down one rung per pause; payoffs on their words; no spoilers found by either auditor |
| 4 | Motion craft | 4 | 664 word-synced cues; BEATMAP 623 rows, 0 gaps ≥ 2 s; −1: a near-static lamp beat 4:16–4:20 and the curfew card 1:28–1:30 |
| 5 | Sound | 4 | ducked bed, SFX off word onsets (pre-flight clean), DYK click/chime order right on all 7; −1: three slow chunks and two dragged words waived rather than re-voiced |
| 6 | Evidence & truth | 5 | every on-screen number traced to RESEARCH L1–L18 by auditor 1 and 2; whales quote credited "Stotz 1938, quoted by Nordhaus 1997"; 2100 labelled PREDICTION throughout, only France 2013 / Tucson 1972 as fact; Comment of the Week card labelled EXAMPLE |

**Total: 26/30 → A−.** David's watch/listen is the real gate.

## Open (LOW, accepted)
- NEXT ▸ year chips come with the cliffhanger band (same convention as Nos. 01–06), so the next year shows before it is spoken.
- The cliffhanger band at 5:26 lands part by part on each part's first word (skill rule); "heat" shows ~3 s before he says it.
- 1882 "A LIQUID" rung ~1–2 s after the word (2 s sampling, not frame-checked).
- Near-static beats: lamp 4:16–4:20, curfew card 1:28–1:30 (≤ 4 s, motion continues in flame/stars).
- DYK card edges show clipped scene fragments behind them (6:40–6:46); "Tokushima, Shikoku" touches a shelf prop (5:38).
- One dark frame at the Today → Answer cut (7:26), the deliberate beat before THE ANSWER.
- Builder note: Lt1993 shows "Nobel Prize 2014", which Brian does not say (sourced, L12).
