
## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
