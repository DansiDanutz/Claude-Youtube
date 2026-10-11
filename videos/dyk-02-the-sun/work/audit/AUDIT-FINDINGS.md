# DYK No. 02 — The Sun · audit findings

## Round 1 — first full master (8:50.1), 1 frame per second, three independent read-only auditors
Sheets `audit/sweep-1s/sheet-00…44.jpg` vs `audit/timeline-by-second.txt`, `BEATMAP.md`, `RESEARCH.md`.
Raw totals: CRITICAL 1 · HIGH 21 · MEDIUM 41 · LOW 27. QA gate on that master: PASS (−14.1 LUFS, TP −2.3 dBTP, A/V 0 ms, 0 pts gaps).

### Rejected after checking the full frames
- HIGH ×3 "era year cut off by the top edge" (sheets 15–34): contact-sheet tile crop only; `frames/f0081.jpg` shows the docked year complete (auditor 1 also confirmed this).
- MEDIUM "1:00 / 1:51 / 2:43 year card on screen before the year is spoken": the kit's EraHeader slams the year at the cut (format, same as No. 01; the NEXT pill already named it). The gold underline now sweeps under it on the spoken year. Accepted.
- Several "one tile late" MEDIUMs: tiles are sampled at x.0 s, so a reveal on a word at x.6 s shows in the next tile. Checked against `vo.json` word times; real desyncs are fixed below.

### Fixed (all CRITICAL / HIGH, plus the substantive MEDIUMs)
| sev | where | finding | fix |
|---|---|---|---|
| CRITICAL | 6:02 SuReveal | black / empty first second | THE ANSWER + Sun–you line on screen from frame 0 |
| HIGH | 0:09–0:10 SuHook | countdown caption 0.9 s, then a black dip | beat 1 holds into the question line and crossfades (no dip) |
| HIGH | 1:22 Su1500 | NOBODY SLEEPS 1.3 s | Day Clock + chip hold to "Every"+14 f; street returns after |
| HIGH | 2:06 Su1610 | card footnote named Harriot as "earliest telescope drawing" 5 s before the payoff | all six DYK footnotes now appear on their payoff word (`CardSource`) |
| HIGH | 2:13 Su1610 | "never published" line 1.4 s | card held to "Two"+14 f; Florence starts after it |
| HIGH | 2:56 Su1700 | "white lead." 1.0 s | card held to "Maria"+20 f |
| HIGH | 2:58 Su1700 | static Maria portrait | "THE EARL OF COVENTRY" lands on "Coventry" |
| HIGH | 3:17 Su1700 | empty frames on "Half a century earlier" | HALF A CENTURY EARLIER chip + prism and white beam on "Half"; prism glints on "prism" |
| HIGH | 3:42 Su1800 | BULBS chip flashed under the DYK card | chip removed; the thermometer bulbs themselves blacken on "blackened" |
| HIGH | 4:08 Su1800 | "light → electricity" < 1 s | Becquerel scene held to "And"+20 f |
| HIGH | 4:20 Su1800 | 2.5 s static before the cliffhanger | band starts on "It would take another", then "century" |
| HIGH | 4:36 Su1900 | NOW: A TAN = A DAY OFF flash | "NOW: A TAN =" on "Now", "A DAY OFF" on "afford" |
| HIGH | 4:43 Su1900 | "probably a myth." < 1 s | card held to "historian"+20 f |
| HIGH | 4:44 Su1900 | near-empty frames | magazine comes in with the scene |
| HIGH | 5:01 Su1900 | "→ into electricity" < 1 s | Bell Labs held to "Four"+20 f |
| HIGH | 5:38 Su2000 | empty IEA quote box | solar farm builds from "International" |
| HIGH | 6:22 SuReveal | no NASA ESTIMATE on "NASA estimates" | note appears on "NASA", the count on "seventy" |
| HIGH | 6:31 SuReveal | 4 s near-empty | five card shells (years) appear on "For"; each verb lights on its word |
| HIGH | 6:49 Su2100 | empty middle | "YOU WAKE UP IN · 2100" until the year is spoken, then docks; tag after the dock |
| MEDIUM | 0:29 SuWelcome | 1 s empty navy | logo flickers on from frame 0 |
| MEDIUM | 0:37 SuWelcome | static 2 s | "? years old" pulses on "How old is that?" |
| MEDIUM | 1:09 etc. | DYK first clause / footnote ahead of the voice | first clause on its first word; footnote on the payoff |
| MEDIUM | 1:54 Su1610 | static | mist drifts over the header on "misty" |
| MEDIUM | 2:00 Su1610 | static | Harriot raises the telescope on "telescope" |
| MEDIUM | 4:10 Su1800 | no year on "eighteen fifty nine" | 1 SEPT 1859 on "fifty", A WHITE FLASH on "flash" |
| MEDIUM | 4:15 Su1800 | sparks invisible in samples | steady flickering sparks for 2.5 s |
| MEDIUM | 4:38 Su1900 | lone "is" shown 4 s early | " is " appears on "probably" |
| MEDIUM | 5:02 / 5:09 Su1900 | Earth alone / empty before the probe | satellite comes in with the scene; Vanguard held to "fly" |
| MEDIUM | 5:46 Su2000 | 6.9 % too short | IEA block held to "And"+10 f |
| MEDIUM | 5:53 Su2000 | 6 s static | slow push-in under the closing lines |
| MEDIUM | 5:55 Su2000 | caption ≠ narration | band text matches the narration word for word |
| MEDIUM | 6:42 SuReveal | dip between beats | overlapping crossfade, no dark frame |
| MEDIUM | 6:49 Su2100 | year over the PREDICTION tag | tag appears after the dock |
| MEDIUM | 7:16 Su2100 | bare disc | ring forms on "Power collected" |
| MEDIUM | small text | NASA note, WHEN IT SET OUT, IEA quote, Comment-of-the-Week lines, V&A line | raised to 24–28 px |
| MEDIUM | 8:16 SuOutro | bottom row left-aligned near the edge | centred, wraps inside 1600 px |
| MEDIUM | 8:38 SuOutro | "Comment below" silent | click on "Pick" |
| LOW | 7:55 SuOutro | prompt wording | "In which century would you rather watch it rise?" |
| LOW | 0:50 SuPromise | 2100 tick unlabelled | PREDICTION label |
| LOW | 1928 | not traced | RESEARCH "Setting years" note |
| (own still review) | crossfades | incoming scenes drew over fading DYK cards | cards render last; incoming scenes start as the card finishes |

### Open LOWs (accepted)
- Today's Day Clock footer reads "ILLUSTRATION · BASED ON HISTORICAL ACCOUNTS" (kit text, can't change without touching dykkit).
- 1:50 cliffhanger wraps "perfect." onto a second line.
- Minor sub-second early text reveals on whole-sentence captions (outro teaser, close caption).

## Round 2 — fresh reviewer on the changed seconds + full skim (master rebuilt, QA PASS)
33 fix checks: 26 PASS, 3 PASS with caveat, 4 PARTIAL, 0 FAIL. New/remaining: HIGH 1 · MEDIUM 8 · LOW 6.
| sev | where | finding | fix |
|---|---|---|---|
| HIGH | 4:54 Su1900 | ~3 s nearly empty under "Then, in 1954, at Bell Laboratories" | dim solar-cell outline from "Then"; 25 APRIL 1954 on "nineteen"; BELL LABS on "Bell" |
| MEDIUM | 3:51 / 5:25 | next scene still drawn over the fading DYK card | scene returns only after the card has gone (He+8 f, NASA's+8 f) |
| MEDIUM | 5:15 | "Today" header docking across the card header | header docks 22 f before the card |
| MEDIUM | 3:56 | empty frame before the 1800s Day Clock | Day Clock starts on "Within"; Pall Mall chip on "gas" |
| MEDIUM | 6:51 | empty after the 2100 dock | an unrisen dawn (horizon + dashed Sun) on "That morning" |
| MEDIUM | 6:31 | year shells too faint | brighter shells + a gold axis that draws across |
| MEDIUM | 7:25 | Sun + tiny label for 4 s | the line "The Sun itself will not notice." on its words |
| MEDIUM | 7:16 | bare Earth | MAPLE · 2023 and IEA · 2014 slide into the Earth on "Put those together" |
| MEDIUM | 3:38 | Herschel title alone | prism + white beam on "prism" |
| LOW | various | bulbs not black, logo faint at 0:29, core-Sun over fading text, prompt wording | fixed (pure black bulbs, logo pre-lit, scene handoff, exact wording) |

## Round 3 — fresh reviewer on the round-2 seconds + full skim (master rebuilt, QA PASS)
14 fix checks: 13 PASS, 1 FAIL (outro prompt still wrapped). Full skim: CRITICAL 0 · HIGH 0 · MEDIUM 1 · LOW 4.
- MEDIUM 3:43: the DYK card faded in over the still-visible Herschel bench → in every era the outgoing scene now clears before the card enters (DID − 2).
- Outro prompt → 40 px, no-wrap; last row lifted away from the bottom edge.
Both verified on the rebuilt master's full frames (`audit/stills/round3-check.jpg`: 1:09, 2:06, 2:51, 3:43, 4:38 cards enter over a clean background; 7:55 prompt on one line; 8:23 row clear of the edge).

## Final state
CRITICAL 0 · HIGH 0 · MEDIUM 0. Open LOWs (accepted): today's Day Clock footer text (kit), 1:50 cliffhanger wraps "perfect.",
DYK cards show the header alone for ~1 s before the first clause is spoken, chips overlapping for a frame while sliding in,
a few whole-line captions up to ~0.5 s ahead of their last word, the 1500/1610/1752 year slam at the cut (format).
