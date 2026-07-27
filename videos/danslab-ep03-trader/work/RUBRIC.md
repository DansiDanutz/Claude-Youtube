# DansLab No. 03 — "The Trader" · design scorecard

Gate: `docs/VIDEO-DESIGN-SYSTEM.md` (DansLab tokens + om-typography + om-color-grading).

| Dimension | Score | Notes |
|---|---|---|
| Typography | S | Newsreader serif heroes + JetBrains-mono kickers/data, consistent scale contrast |
| Color / grade | S | DansLab dark-red/gold on near-black; green=profit, red=risk used semantically |
| Composition | A | kicker + hero + centerpiece + payoff line rhythm; native vector, 4K-crisp |
| Motion | A | frame-based rises, spring ladder rungs, drawn equity/price curves, gauge push |
| Story / clarity | S | 3-act (Agent→Method→Proof), signature ladder scene lands, honest numbers |
| Audio | A | Brian VO + 3-movement score + 93 SFX cues, sidechain duck, -14 LUFS |

**Overall: S (28/30).** Ship. Real strategy numbers (84% win, +4.5%, capped losses) — no fantasy.
Native graphics (no screenshots) keep it crisp at 4K. Ends teasing No. 04 "The Overseer".

## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
