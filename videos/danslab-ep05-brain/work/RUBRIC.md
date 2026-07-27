# DansLab No. 05 — "The Brain" · design scorecard

| Dimension | Score | Notes |
|---|---|---|
| Typography | S | Newsreader serif heroes + mono kickers/data, consistent scale contrast |
| Color / grade | S | DansLab dark on near-black; SKY = Hermes/intelligence, gold accents, green=win/red=loss |
| Composition | S | animated NeuralBrain centerpiece, decision gauge, priority queue, routing beam, REAL Paperclip screenshot in browser chrome |
| Motion | S | neural activation wave + traveling pulses, cursor-on-screenshot clicking, branch/sim reasoning, feedback-loop flow, typing notes |
| Story / clarity | S | 3-act (What a Brain Does → How It Thinks → It Learns); how-Hermes-decides answered concretely |
| Audio | A | Brian VO + 3-movement score (present bed) + 91 SFX cues, sidechain -14 LUFS, STEREO |

**Overall: S (29/30).** Ship. Richest animation yet (neural brain), plus a REAL Paperclip dashboard
with an animated cursor (credibility ask). Animated starfield bg. Ends teasing No. 06 "The Marketplace".

## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
