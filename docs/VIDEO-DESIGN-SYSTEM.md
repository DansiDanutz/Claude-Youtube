# DansLab Video Design System — the RUBRIC gate

Every video produced in this repo is built against this system and **must pass the rubric below
before delivery**. Sources: the live DansLab design language (`remotion/src/lib/danslab.tsx`),
om-typography (broadcast/legibility standards), om-color-grading (WCAG + grading rules), and the
channel brand contract (`brand.md`). Graded S/A/B/C/F like the rubric-evaluator toolkit — **ship at
A or S only.**

## 1. Design tokens (single source of truth)

- **Channel brand** (light, green/gold): `remotion/src/brand.ts` + `brand.md` — for channel-look videos.
- **DansLab site look** (dark, red/gold, Newsreader serif): `remotion/src/lib/danslab.tsx` (`DL`,
  `DL_SERIF/SANS/MONO`, `SiteBg`, `Kicker`, `SiteFrame`) — for DansLab-story videos.
- Never invent per-shot hex values or fonts. New colors go into the token file first.
- Shared components before new markup: `BrandBg`/`SiteBg`, `Kicker`, `SiteFrame`, `useRise`/`useDlRise`.

## 2. Typography rules (om-typography)

| Element | 1080p size | Rule |
|---|---|---|
| Hero/serif headline | 60–150px | display font only (Sora / Newsreader) |
| Body / statement | 40–60px | Inter; ≥1.4 line-height |
| Meaningful labels (chips, stats, log lines) | **≥24px mono, target 26–30px** | must read on a phone |
| Decorative micro-labels (kickers, footers) | 19–24px allowed | must not carry information the VO doesn't say |
| Max families per video | 3 (display, body, mono) | serif italic = accent voice only |

- **Safe zones:** all text inside 80% title-safe (≥96px horizontal / ≥54px vertical margins; our
  standard gutters are 120px). Nothing critical in the bottom 60px.
- **Dwell time:** any text block stays fully readable ≥1s per 13 characters after its entrance
  completes. Never cut a scene while a just-revealed line has been on screen <1.5s.
- **Easing:** entrances `easeOut (0.33,1,0.68,1)`, exits `easeIn`. Never linear on text.
- **Reveals sync to narration** — a card lands when Brian names it, never before (visuals must not
  pre-empt the voice).

## 3. Color & contrast (om-color-grading)

- Text contrast on its actual background: **≥4.5:1 body, ≥3:1 for large display text**, measured
  with chroma-js on final tokens (record the numbers in the video's work notes).
- Dark scenes: text `#fafafa` on near-black passes ~19:1 — keep muted grays ≥`#71717a` for
  reading text; `#55555e` and below is decor only.
- Saturation discipline: accents (red/gold/emerald) are for meaning (keywords, success, danger),
  never decoration. Max 2 accent hues per scene.
- One grade per video: the SiteBg/BrandBg glow hue may shift per scene, but base, panel, and text
  tokens never change mid-video.
- Any generated diagram/chart colors: prefer Wong colorblind-safe hues where semantics allow.

## 4. Scene composition (info-card craft)

- **One idea per scene.** A scene = one claim the narration makes, visualized once.
- Alternate rhythm: statement card → evidence (screenshot/terminal) → statement — never two
  dense screenshot scenes back-to-back without a breather card.
- Screenshots always inside `SiteFrame` (window chrome + URL) — never raw full-bleed.
- Stagger list items 3–6 frames apart; counters animate 1.0–1.9s with easeInOut; max one
  counting number on screen at a time.
- Every scene has entrance motion, a held "reading state", and (for scenes >8s) one mid-scene
  beat so the frame is never static >4s.

## 5. Sound design (brand.md §10)

- SFX land on the visual beat, timed from measured scene starts (never assumed offsets).
- Whoosh on scene cuts, clicks for list staggering, riser→payoff reserved for the 2–3 biggest
  moments, chime = signature "ship/reward" motif. Nothing louder than the voice.
- Music: sidechain-ducked under narration; loudnorm master to −14 LUFS, TP −1.5.

## 6. Render & verify

- QA stills at scale 1; **final channel deliveries render at `--scale=2` (4K)**.
- Read every scene's still before rendering video. Pull frames from the final MP4 at 3+ sync
  moments. Measure per-file durations before building the audio timeline (concat drift rule).

---

## THE RUBRIC (grade before delivery; ship A or S only)

Score each dimension 0–5. S = 28+, A = 24–27, B = 20–23, C = 15–19, F = <15.

| # | Dimension | 5 looks like |
|---|---|---|
| 1 | **Token fidelity** | zero off-token colors/fonts; shared components used everywhere |
| 2 | **Typography & legibility** | sizes/dwell/safe-zones per §2; all meaningful text ≥24px; contrast measured |
| 3 | **Narrative sync** | every reveal lands on its narration word; no orphaned visuals; story has hook → proof → emotion → CTA |
| 4 | **Motion craft** | brand easings only; staggered entrances; no static frames >4s; no cartoon bounce |
| 5 | **Sound** | cues on beats, ducked bed, one riser→payoff moment, −14 LUFS master, no clipping |
| 6 | **Evidence & truth** | real screenshots framed; every number on screen is sourced (site, docs, or Dan); nothing invented |

Record the scorecard in `videos/<project>/work/RUBRIC.md` with one line per dimension
(score + evidence). A video that scores B or lower gets fixed before it reaches
`~/Desktop/claudeYouTube/`.
