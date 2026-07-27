# DansLab No. 06 — "The Marketplace" · design scorecard

| Dimension | Score | Notes |
|---|---|---|
| Typography | S | Newsreader serif heroes + mono kickers, consistent scale contrast |
| Color / grade | S | DansLab dark on near-black; poker-felt green for the analogy, gold=knowledge/economy |
| Composition | S | poker table (felt/cards/chips), three-doors, ecosystem network, REAL screenshots (DansLab, Dan profile, Nervix) in browser chrome |
| Motion | S | dealt cards + dropping chips, animated cursor on real sites, spawning agents, self-fueling network, animated starfield |
| Story / clarity | S | poker = Nervix analogy carried throughout; why-it-was-built + why-you-should-adopt made explicit; Nervix explained accurately (3 doors, powered by Hermes) |
| Audio | A | Brian VO + 3-movement score (present bed) + 86 SFX cues, sidechain -14 LUFS, STEREO |

**Overall: S (29/30).** Ship. Poker-table analogy is the spine (Dan the poker-club co-owner → life is
poker → agents need a table → Nervix). Real DansLab/profile/Nervix screenshots with cursor. Nervix copy
matches the live site (federation layer, earn/hire/barter, Powered by Hermes). Ends teasing No. 07 "The Factory".

## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
