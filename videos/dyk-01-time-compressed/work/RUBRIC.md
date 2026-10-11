# RUBRIC — Did You Know No. 01 · "Time, Compressed" (graded 2026-10-10, 1080p preview master)

Master: `dyk-01-time-compressed-1080P.mp4` · 9:27.1 (567.10 s — audited ×3, ship verdict 2026-10-11) · 1920×1080 CFR 30 · H.264 + stereo AAC 48 kHz.
QA gate (`work/qa_final.py`): video = audio = 567.100 s · pts gaps >50 ms: **0** · **−14.1 LUFS**, true peak **−1.9 dBFS** ·
284-frame dense sweep (2 s) read by an independent auditor · all 15 VO lines whisper-verified (English, full text, no hallucinated tails).

Structure: cold-open paradox at frame 0 (horse vs light) → question by 0:19 → Did You Know That? sting + episode card (7.5 s, after
the hook) → first-episode welcome with THE RULE (guess · stay · check) → promise at 0:56 → seven eras with a live year HUD → midpoint reversal + direct address at 1800
("Sound familiar?") → debt planted (Keynes, 1930) → paradox peak ("Busy.") → answer withheld until 5:19 →
2100 labelled PREDICTION, Keynes debt paid back → finale inside the viewer → narrated outro ritual
(comment prompt, like/share/subscribe, ONE forward hook to No. 02, ASK. WONDER. REPEAT.) → 15 s Did You Know That? end screen (2 video slots + subscribe ring).

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 4 | `lib/danslab.tsx` tokens, Newsreader/Inter/JetBrains Mono, SiteBg for episode art; channel brand from `lib/dytbrand.tsx` (real logo/banner art); −1: the holiday-paradox "novelty" tiles use three off-token hues (#c084fc, #f97316, #f3cf5f) |
| 2 | Typography & legibility | 4 | meaningful labels ≥24 px mono, display 52–150 px, 120 px gutters, bottom 70 px reserved for the HUD; −1: source lines and HUD at 19 px in `DL.faint` (decorative tier, contrast not chroma-measured) |
| 3 | Narrative sync | 5 | every reveal keyed to Brian's ElevenLabs word timestamps via `makeCue()` (throws on a missing word); SFX cue sheet built from the same alignment; hook → promise → proof → emotion → CTA |
| 4 | Motion craft | 4 | brand easings only, staggered entrances, signature "compression" squeeze; −1: a few ~3 s reading holds with half the frame empty (reveal brain line, outro upper half) |
| 5 | Sound | 4 | 107 word-synced cues from the shared library, cinematic-min bed sidechain-ducked 12:1, one riser→payoff on "experience", −14.1 LUFS / −1.8 dBTP; −1: not yet heard by a human |
| 6 | Evidence & truth | 5 | every on-screen number traces to `RESEARCH.md` (F1–F17); 2100 labelled "PREDICTION · a scenario, not a fact"; AI shown as "expected · not certain"; imagined girl stated as imagined |

**Total: 26/30 → A.** Shippable by the rubric. Channel Law 0/5: internal scores are not success — Dan's watch
(stay past 0:30? finish? comment?) is the gate that says done.

Not done (deliberately): 4K `--scale=2` delivery render (disk is below the 46 GiB floor), thumbnails/title
packaging (`/packaging`), YouTube upload.
