# RUBRIC — No. 02 "The Survivors" (graded 2026-07-21)

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Token fidelity | 5 | DansLab tokens throughout; Avatar/OpenClawLogo/SiteFrame/Phone components reused |
| 2 | Typography & legibility | 4 | serif heroes, mono labels ≥20px, safe zones; contrast ink/paper high |
| 3 | Narrative sync | 5 | 16 narration clips timed from measured scene starts; comedy beats land on VO |
| 4 | Motion craft | 5 | brand easings, staggered reveals, hack shake, self-heal beam, leaderboard bars |
| 5 | Sound | 5 | 76 cues (glitch on hacks, chime on heal/win), ducked 3-movement bed, −14 LUFS / −1.2 peak |
| 6 | Evidence & truth | 5 | real avatars + OpenClaw mascot; real polished Sienna page featured; Zmarty stats sourced |

**Total: 29 → S.** 5:16, 4K. Naming convention applied (NO. 02 · The Survivors).
Story = Dan's brief verbatim: hacking comedy → Dexter survives → self-heal → workforce →
leaderboard race → Paperclip cliffhanger. Sienna's trading page professionally redesigned
(paper-trading equity curve) and featured in the Zmarty scene.

## Link-bar update (2026-07-26) — series-wide danslab.vercel.app bar
Added the episode-neutral link bar (`remotion/src/shots/danslab/DlLinkBar.tsx`, rendered once to
`media/library/logos/danslab-linkbar.png`) into the bottom 70px band for the whole body of the
episode: fades in 1s after the cold-open card, out 0.5s before the outro. Composited by
`tools/mux_linkbar.py` (chunked encode — long single-pass 4K encodes get SIGTERM'd on this machine).
Tokens only (DL serif wordmark, DL.gold mono URL, DL.faint tagline) — dimension 1 unaffected;
per §2 the band is decorative micro-labeling in the bottom 60–70px and carries no information the
VO must say, so dimension 2 holds. Narration audio untouched — the existing mix is re-muxed, not
regenerated. Grade unchanged.
