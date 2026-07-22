# RUBRIC — DansLab Presentation Film (brand/profile, 86s, graded 2026-07-22)

6 scenes, 1:26, 1920x1080/30. Structure: logo cold-open (<2s build) -> paradox hook by 0:05
("One person. / A company that never sleeps.") -> promise by 0:12 -> stakes by 0:26 ->
proof wall (4 shipped systems) -> one-page-a-day rhythm -> human-led reframe -> forward
hook + end card. First-30-seconds law (zurich docs/CHANNEL-LAW.md) satisfied.

**Animated characters, never cutouts:** 4 new motion clips generated via the proven xAI
i2v lane (marcus-talk, elena-talk, arlo-point, zoe-react-wow; 6s each from zurich
canonical sheets), background-removed to transparent VP9 webm (`hyperframes
remove-background`), composited with looping OffthreadVideo (`MotionChar` in
`remotion/src/lib/profilekit.tsx`). Clips live in `media/library/characters/motion/`
as the start of the reusable presenter library (ANIMATION-PROMPTS.md convention).

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 5 | Channel brand throughout (brand.ts paper/green/gold + Sora via fonts.ts); real red logo via DlLogo/DlLogoAnimated; zero off-token hexes |
| 2 | Typography & legibility | 5 | Sora display 44-136px, body 24-42px, mono labels >=23px; 130px gutters; ink/paper 18:1; DpProof overlap caught in QA and fixed before delivery |
| 3 | Narrative sync | 5 | Hook 0:03, promise 0:11, stakes 0:14-0:26, proof cards on click cues, payoff reframes "human led", forward hook before end card |
| 4 | Motion craft | 5 | Animated logo build under 2s; four live i2v presenter clips loop inside shots (frame-diff verified, rms 4.3-33.9 across 1s); brand fade+rise easings, no static >4s |
| 5 | Sound | 5 | tech-pulse bed (looped, crossfaded, -30dB-ish under) + 26 function-picked cues (whoosh transitions, card clicks, payoff impacts, chime-reward signature at subscribe); max -5.5dB, no clipping |
| 6 | Evidence & truth | 5 | Facts only from brand.md / DANSLAB-OS.md / SYSTEM.md: 8 core agents on 5 machines, 06:30 scoping, 07:00 one-page brief, self-repair rule, evidence rule; no invented numbers |

**Total: 30/30 -> S.** On-screen narration (no VO) per brand rule 6; text audited em-dash-free.

QA stills: `~/Desktop/claudeYouTube/danslab-profile/stills/`. Delivery:
`~/Desktop/danslab-profile.mp4` (+ project folder copy).
