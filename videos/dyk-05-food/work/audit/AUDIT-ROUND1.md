# Audit round 1 — No. 05 Food (master 647.30 s, 2026-10-14) — 3 independent read-only auditors, 1 frame/s
Totals: CRITICAL 0 · HIGH 34 · MEDIUM 37 · LOW 24. Facts, numbers, 2100 labelling, end screen and mix (no stacks, no loud cue on a word, sign-off thocks after each word) passed.
Times below are round-1 master times; from FdWelcome on add +0.0 s, from Fd1500 on add +0.5 s in round 2 (FdPromise tail +0.5 s).

## HIGH (34) — root causes and fixes
- Flashes (payoff shown < 1.5 s, panel replaced): 0:05 "in 2100?", 0:10 WENT ON FOOD, 0:20 DYK card, 1:10 promise line, 1:42 70–80 %, 1:46 PEOPLE GO HUNGRY, 1:59 FAIR CHANCE OF 60, 2:38 ALMOST NOTHING FRESH, 2:56 ONE FIT FOR DUTY, 3:08 1795, 4:12 A vitamin., 4:48 EVEN DEATH, 5:00 SOMETHING MISSING, 5:59 ≈46, 6:12 IN THE AIR, 6:25 ≈72, 7:20 ladder over TOO MUCH captions, 7:36 THE DANGER HAS FLIPPED.
  Cause: every panel ended on the NEXT panel's first word, however close its own last reveal was. Fix: kit `hold(prevLast, nextStart)` — a panel stays ≥ 1.5 s after its last reveal; cues follow with `H()`; FdPromise tail +0.5 s.
- Empty/static ≥ 2 s: 0:39 guess card heading only, 0:57–1:01 promise row, 1:47–1:51 THE YEARS headings, 2:45–2:48 Lind heading, 3:24–3:26 DYK card, 4:49 toll header, 5:01 LATER IT'S NAMED, 5:20 THE YEARS AMERICA, 5:25 cliff late, 6:01/6:14/6:27 1966 gaps, 7:07 obesity header, 7:22 question, 8:46 2100 morning.
  Fix: a visual on the words in each gap (pulsing ? slot, chip sweep + rising sun, England–Flanders crossing + newborn + counting figures, pair cards from "twelve", (1882–83) tag, counting ≈ 100,000, gold ? until "Niacin", newborn + count-up, cliff bands start on their first spoken phrase, empty bar tracks, plate on "question", dawn on "morning").
- Overlap: 1:42 wheat over the FOOD bar (crossfade) and 5:20 caption under the docking ladder → held panels no longer overlap; caption width 760.
- Spoiler: 5:56 source line "(1966: 45.9)" before "forty six" → source split, each part on its own word.

## MEDIUM (37) — classes
- Legends revealing before their words (1500 week icons, day-clock rows "SOFT DRINK + SNACK", 1884 WHITE RICE) → PlateWeek `reveal` per food, new kit `FoodClock` with a time per segment.
- Margin overflow past x 1760 (5 source lines, 1966 column, Today column, HAD NOT EATEN stamp) → widths set, text shortened, stamp moved under the figures.
- Static wake-up cards (1747, 1915, 1966) → scene backdrop at 35 % from frame 0, place line on its first word ("aboard", "prison", "village").
- DYK cards empty while the first words are said (1915 "doctors", Today "Brazil's") → first clause on the first word.
- Sources ahead of their words (Tsukuba "none died", USA 55 %) → split / moved to the word.
- Sound without visual (end-screen pop) → "Comment below ↓" lands on it.

## LOW (24) — open unless noted
Small 24 px footnotes on phones; dock labels shorter than the chip (WE FIX IT / TO MEASURE); "walk down the ladder" while rungs light bottom-up; Today header reads "YOU WAKE UP IN / Today"; fresh-food icon could read as fruit; cliff captions wrapping a one-word line; seventh minor piano on the No. 06 teaser (intended).
