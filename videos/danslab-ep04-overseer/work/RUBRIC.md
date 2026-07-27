# DansLab No. 04 — "The Overseer" · design scorecard

| Dimension | Score | Notes |
|---|---|---|
| Typography | S | Newsreader serif heroes + mono kickers/data, consistent scale contrast |
| Color / grade | S | DansLab dark-red/gold; sky=Hermes/mission-control, red=chaos, green=order |
| Composition | A | mission-control panel, orchestration spine, profile cards, gear mechanism |
| Motion | A | heartbeat pulse, break-shatter gag, spine flow-dots, meshing gears, scan-lines |
| Story / clarity | S | 3-act (Blind CEO → Overseer → Brain); Paperclip win + Hermes turn both land |
| Audio | A | Brian VO + 3-movement score + 98 SFX cues, sidechain duck, -14 LUFS, STEREO |

**Overall: S (28/30).** Ship. Dan's CEO character, the dashboard-breaks-daily gag, the
Paperclip spine, and the Hermes-becomes-Brain cliffhanger all developed. Ends teasing No. 05 "The Brain".

## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
