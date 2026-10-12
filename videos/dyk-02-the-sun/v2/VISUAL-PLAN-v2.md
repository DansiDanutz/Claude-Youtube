# DYK No. 02 — The Sun · VISUAL PLAN v2 (paper)

Goes with `script-v2.json` and `STORY-v2.md`. Nothing here is built yet. Timings are **estimates** from words ÷ pace.
The real cue frames come from the new `vo.json` (`makeCue` + `at(word, nth)`), and `work/BEATMAP.md` is regenerated
from `cues.py` before anything renders.

**Rules every row obeys** (skill + design system): no spoilers (a chip, label or picture appears ON its word, never
before) · nothing on screen < 1.5 s before it's covered · no static ≥ 2 s while Brian talks · builds ≤ 3 clicks/s
(12-frame steps, one `ui-click-soft` per step) · text inside the 160 px side margins, clear of the HUD (bottom 54–110 px)
and the cliffhanger band (bottom 132 px) · DYK click lands BEFORE "Did you know that", chime AFTER · SFX only from the
existing library (`ui-click-soft`, `pop-reveal`, `whoosh-soft`, `warm-shimmer`, `sparkle-soft`, `stamp-hit`,
`piano-a-min`, `impact-soft`, `knock-solid`, `page-flip`, `chime-reward`, `chime-magic`, `whoosh-wind`, `ui-toggle-on`,
`impact-deep-soft`, `ui-send`, `scan-hum`, `wind-soft`, `whoosh-reverse`, `riser-soft`, `clock-tick-soft`,
`pencil-scribble`, `launch-thump`, `glitch-zap`, `stream-soft`).

---

## 0. The new piece: `ArcLadder` (+ `HowWeSawIt` chip) in `remotion/src/lib/dykkit-sun.tsx`
- **HowWeSawIt chip**: a kicker `HOW WE SAW IT` (24 px mono, muted) plus the rung text (30 px mono, gold `DL.gold` on the
  panel token; contrast measured, ≥ 4.5:1). It enters with the `rise()` easing **on the rung's keyword** and holds
  centre-left for ≥ 3 s (≥ 1 s per 13 chars). Then it **docks** into the ladder (whoosh-soft, 14 frames).
- **ArcLadder (docked)**: top-right column, x 1400–1760 (inside the 160 px margin), y 150–470, so it never touches the
  HUD or the cliffhanger band. Rungs stack **bottom → top**, so the ladder visibly climbs. Older rungs are dimmed
  (`#a1a1aa`, ≥ 4.5:1), the newest is gold. Rung text in the dock is 24 px mono, short form:
  `1500 · DAY & NIGHT` → `1610 · TO WATCH` → `1779 · TO EXPLAIN` → `1800 · TO MEASURE` → `1928 · EVERY MEAL` →
  `TODAY · POWER` → `2100 · ?` (dashed, PREDICTION tint).
- The ladder only ever shows rungs **already spoken**. Era N's rung doesn't exist on screen until its keyword.
- The docked ladder is visible from the rung moment until the cliffhanger band enters (where it fades so the band reads alone).
  It returns at the next era's header dock with the past rungs only.
- Keywords (cue words; pass `nth` where they repeat): 1500 `night.` (su04, nth 1) · 1610 `watch.` · 1779 `explain.` ·
  1800 `measure,` · 1928 `meal.` · Today `Power.` · 2100 `wakes` (the `?` rung turns into
  `THE ENERGY BEHIND WHAT WE RUN?` + PREDICTION tag).

## 1. Scene by scene: what changes vs v1 (reuse what's good)

| Scene | v1 shot | Keep | Change / add |
|---|---|---|---|
| su01–02 hook | SuHook | sunrise, 08:00:00 clock, "THIS LIGHT LEFT THE SUN AT" card, digits rolling back to 07:51:40, the Sun going out (dashed outline) | Re-key to the new words. NEW beat on "You'd still see it. You'd still feel it.": the dashed Sun keeps glowing *on the horizon only*, with a countdown `08:20 → 08:19…` ticking under it (clock-tick-soft, 1/s, so it's not a click storm). Replace the five verb cards with a **two-panel split** on "Five hundred years ago…": left, a 1500 figure lying down as the Sun sets (on "sleep"); right, a solar panel lighting a bulb (on "electricity", ui-toggle-on). "as it is… right now?" lands as v1 (riser-soft → impact-deep-soft) |
| SuIntro | SuIntro | everything (sting is identical every episode) | none |
| su00 welcome | SuWelcome | logo pre-lit, wordmark, NO. 02 pill, THE RULE, "8 min old", "? years old" pulse | re-key; "Guess in the comments, right now." = comment bubble pops on "comments" (pop-reveal), "check your guess" = tick on "guess" (stamp-hit) |
| su03 promise | SuPromise | 7-year axis with PREDICTION label on 2100, 12-frame year builds | NEW on "You start out going to bed when it sets": a tiny bed icon at 1500 + setting Sun; on "a world that might run on it": a faint dashed power line from the Sun to 2100 marked `might` (no picture of what 2100 holds, so no spoiler). "how old that light really is" = "? years" chip pulses |
| su04 1500 | Su1500 | street at night, bonfires, door birch, glass lamps, Stow QuoteCard, Day Clock, Copernicus diagram, telescope teaser | NEW: "So what is the Sun to you?" = the Sun lifts in the sky as a big question mark fades in behind it (0.35 s beat held, Sun still moving). "Simple." = cut to the Day Clock. "day and night." = clock splits gold/navy halves → **first HowWeSawIt chip `DAY & NIGHT`** on "night." · "work" / "sleep, and prayer" = segment labels light on their words. "Why?" = a ? over the bonfire, then the Stow quote builds clause by clause |
| su05 1610 | Su1610 | mist drift, Harriot raising the telescope on "telescope", SafetyTag, DYK card with Harriot footnote on payoff, Galileo spots drifting on a turning Sun, "GALILEO: NO." / "ON THE SUN ITSELF" chips | "Galileo says no." now matches the chip wording exactly. NEW: "Out in the fields, daylight still runs your day" = a field labourer silhouette under a plain Sun (Day Clock miniature, reused). "something to watch. Closely." = telescope eyepiece iris-in → chip `TO WATCH` on "watch.", "Closely." = zoom on a spot (whoosh-soft). Cliffhanger "what's actually inside that light" = a beam stops at a closed glass box marked "?" (no prism shown, so no spoiler) |
| su06 1779 | Su1700 | Gunning portrait + COVENTRY title on "Coventry", V&A hedge line, parasol opening, Week Strip rich/poor | Year label 1752 → **1779**. Gunning now speaks of the past: small `1733–1760` under the portrait. NEW Ingenhousz scene (below). Newton prism fan **removed** (Herschel's prism carries the colours in su07). Chip `TO EXPLAIN` on "explain." |
| su07 1800 | Su1800 | Herschel bench, prism + white beam, thermometers blackening on "blackened", Spectrum with heat past red, Pall Mall gas lamp chip, Becquerel cell, Carrington 1 SEPT 1859 + flash, sparks | "splits a sunbeam with a prism" = the beam fans on "splits" (v1's prism glint, now on the new word). "Light you can't see." = the beyond-red zone glows on a thermal palette only. Chip `TO MEASURE` on "measure,", with a thermometer icon inside the chip. "Tiny. But real." = the Becquerel voltmeter needle twitches on "Tiny.", the cell glows on "real." NEW cliffhanger: "what we'd been eating all along" = a loaf of bread silhouette in the band (no leaf or word, so no spoiler) |
| su08 1928 | Su1900 | beach, magazine for the Chanel myth, "NOW: A TAN = / A DAY OFF" split chip, solar-cell outline + 25 APRIL 1954 + BELL LABS | NEW photosynthesis scene (below). Vanguard 1 + Earth **removed**. Chip `EVERY MEAL` on "meal." Cliffhanger "Next, we'd learn to harvest it." = a single solar cell sprouts in a furrow (no farm yet) |
| su09 Today | Su2000 | WakePlace "today", Parker probe orbit + corona, IEA "cheapest" quote + solar farm build, slow push-in | DYK card now carries A1 (×11). NEW harvested-power chart (below). Share bar 6.9 % → **8.7 % (2025)**. Chip `POWER` on "Power.", and "like a crop" = panel rows morph into furrows for 1.5 s (warm-shimmer). Parker shrinks to a 4 s beat on its words. "behind a screen" = a window with a lit phone inside a dark room, the Sun outside |
| su10 answer | SuReveal | THE ANSWER from frame 0, light beam across 150 million km, photon random walk + NASA ESTIMATE note + 170,000 counter, "farms / cities / writing" icons | The five verb-card "year shells" are **replaced by the full-screen ArcLadder walk-back** (below). "How close was your guess?" = the welcome's "? years" chip returns and flips to `≈ 170,000 YEARS · NASA estimate` (sparkle-soft) and holds through the 0.45 s beat |
| su11 2100 | Su2100 | "YOU WAKE UP IN · 2100" until spoken, then docks, PREDICTION tag after the dock, unrisen dawn on "That morning", MAPLE scene + Pasadena rooftop, Sun + "won't notice" line, NASA 5 bn | IEA 2014 block **removed**. NEW data-centre energy scene + scenario (below). The empty dashed top rung opens the scene on "rung?" |
| su12 close | SuClose | all (same audio) | none (offsets only if they shift) |
| su13–14 outro / end screen | SuOutro | all, incl. Comment of the Week **EXAMPLE** card, WATCH NEXT "NO. 03 · COMING NEXT · SCHOOL", subscribe ring | none (same audio) |

## 2. New visuals

### Ingenhousz, 1779 (su06, ~14 s)
1. "A Dutch doctor, Jan Ingenhousz," = name card `JAN INGENHOUSZ · 1779` (pop-reveal on "Ingenhousz").
2. "more than five hundred experiments" = a grid of tiny jars fills in 12-frame rows (max 3 clicks/s), counter `500+` on "five".
3. "He sinks leaves under water." = a single big glass jar, a green leaf sinks (page-flip soft).
4. "In sunlight, they bubble out fresh air." = a sunbeam enters, and bubbles stream up **on "bubble"** (stream-soft).
5. "In the shade, they stop." = a shadow slides over, bubbles stop on "stop" (impact-soft).
6. "Only the green parts do it." = split: green leaf bubbles, brown stem doesn't (on "green").
7. "Plants need the Sun." = jar back in the beam, bubbles resume (warm-shimmer).

### Photosynthesis, the "every meal" rung (su08, ~20 s)
1. "Now look in your picnic basket." = basket lid opens (page-flip). "Bread." / "An apple." each on its word (pop-reveal).
2. "got its name in eighteen ninety three" = chip `1893 · THE WORD IS COINED` on "ninety" (A4).
3. "Photosynthesis." = word slams centre (stamp-hit), 0.25 s pause held on it.
4. "Leaves catch sunlight and turn it into sugar" = leaf diagram: sun arrows in on "catch", a hexagon sugar molecule out on "sugar".
5. "nearly all life runs on that" = arrows fan out from the leaf to grass → cow → person (12-frame steps).
6. "Your lunch is stored sunlight." = the bread and apple glow gold on "stored". "So, in a way, are you." = a person silhouette fills with the same gold (warm-shimmer).
7. "The Sun used to be something to measure. Now, it's the source of every meal." = the `TO MEASURE` rung pulses on "measure", then chip `EVERY MEAL` on "meal." and docks.

### Harvested power (su09, ~15 s)
1. DYK card: "solar power made almost eleven times more electricity than it did ten years earlier" builds clause by clause; footnote `Ember · Global Electricity Review 2026` on "earlier".
2. After the card: two bars, `2015 · 256 TWh` (on "That's") then `2025 · 2,778 TWh` growing ×11 (riser-soft ends exactly on "nine").
3. "almost nine percent of all the world's electricity" = ring fills to `8.7 %` on "nine" (sparkle-soft).
4. "cheapest electricity ever seen" = v1's IEA quote + solar farm build, re-keyed.
5. "Power. Something you harvest, like a crop." = chip `POWER` on "Power.", and on "crop" the panel rows morph into furrows for 1.5 s.

### 2100: the energy behind internet / AI / cities (su11, ~45 s, PREDICTION tag on screen the whole time after the dock)
1. "So what's the next rung?" = the docked ladder slides to centre and an **empty dashed rung** draws above `TODAY · POWER` (whoosh-soft). 0.3 s beat.
2. "Every video you watch, every question you ask an AI," = a phone with a play icon (on "video"), then a chat bubble (on "AI"). Thin light lines run from both into a server rack on "data centre" (ui-send).
3. "used about one and a half percent of the world's electricity" = world-electricity bar with a `1.5 %` slice on "half" (footnote `IEA · Energy and AI 2025`).
4. "expects that to more than double by twenty thirty" = second bar, dashed outline, `2030 · IEA projection` grows ×2.3 on "double" (riser-soft → impact-soft on "thirty").
5. "slightly more than all of Japan uses today" = a Japan outline fills to the same height beside it on "Japan" (pop-reveal).
6. "Maple beamed power wirelessly in space… a rooftop in Pasadena. Tiny. But it worked." = v1's MAPLE scene, re-keyed; "Tiny." = zoom to the small array, "worked" = receiver lights (chime-reward).
7. "So here's one scenario. Not a fact." = the PREDICTION tag pulses and the frame tints to the scenario palette on "Not".
8. "The internet, AI, and whole cities running more and more on sunlight" = three icons (globe, chip, skyline) light on their words, fed by sun lines that thicken on "more and more".
9. "Some of it, maybe, collected in orbit, where the Sun never sets." = v1's orbit ring with a collector (on "orbit"), with a label `maybe`.
10. "In fifteen hundred, the Sun decided when you went to sleep." = callback split: left panel = the 1500 sleeper from the hook (on "sleep"). "In twenty one hundred, it might decide whether your AI wakes up." = right panel: an AI chip powers on, glowing, on "wakes" → the dashed rung fills: `2100 · THE ENERGY BEHIND WHAT WE RUN?` with `PREDICTION` (stamp-hit, soft).
11. "The Sun won't notice… five billion years" = v1's Sun + "won't notice" line + NASA 5 bn, re-keyed.

### The answer walks the ladder back (su10, ~13 s for the ladder chunk)
- "Now climb that ladder again, with me." = all six rungs appear **dim** at full-screen size (left half), the Sun disc constant on the right (whoosh-soft).
- Each rung lights gold on its word, one `ui-click-soft` each (spacing ≥ 0.6 s, well under 3/s):
  "day and night" (1500) → "watch" → "explain" → "measure" → "lunch" (1928 rung `EVERY MEAL`) → "power" (TODAY).
- "The Sun didn't change." = the Sun disc stays identical while a light sweep passes over it (no change, on purpose). "We did." = the whole ladder glows once (warm-shimmer). 0.3 s beat.
- "You have never seen the Sun as it is. Only as it was, eight minutes ago." = v1's final frame, re-keyed, `8 MIN AGO` on "eight".
- The ladder stays docked into su11, where "So what's the next rung?" adds the dashed rung (step 1 above). Then → now → next.

## 3. The first 10 s of every era, designed (≈ times from the era's first word)

**1500 · su04** (pace 3.0)
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up in" | cut: EraHeader `YOU WAKE UP IN` + 1500 slams (year already named by the previous NEXT pill) | whoosh-soft · stamp-hit |
| 1.4 | "in London." | WakePlace `London` on "London" | pop-reveal |
| 2.2 | "It's Midsummer Eve." | dusk gradient; chip `MIDSUMMER EVE` on "Midsummer" | ui-click-soft |
| 3.4 | "You can smell wood smoke," | smoke wisps drift across the street silhouette on "smoke" | wind-soft |
| 5.0 | "and the streets are glowing with firelight." | bonfires ignite along the street, one per 12 f, from "glowing" to "firelight" | warm-shimmer |
| 7.6 | (breath) | header docks; scene clears for the card (DID − 2 f) | ui-click-soft (card click, before "Did") |
| 8.0 | "Did you know that…" | DYK card; first clause on its first word | chime-magic after "that" |

**1610 · su05**
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up in sixteen ten," | EraHeader 1610 slam | whoosh-soft · stamp-hit |
| 1.6 | "beside the River Thames." | river line draws, WakePlace `River Thames` on "Thames" | pop-reveal |
| 2.8 | "It's a cold, misty December morning," | mist rolls in on "misty"; frost tint on "cold" | wind-soft |
| 4.8 | "and the Sun hangs low and dim." | a dim low Sun rises just above the horizon on "low", dims on "dim" | warm-shimmer (quiet) |
| 6.6 | "A man named Thomas Harriot" | Harriot silhouette on "Harriot" | pop-reveal |
| 7.6 | "points a telescope straight at it." | telescope raises on "telescope" | ui-click-soft |
| 9.0 | "Don't try this. It can blind you." | SafetyTag `NEVER LOOK AT THE SUN` on "Don't" (held ≥ 1.5 s) | impact-soft |

**1779 · su06**
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up in seventeen seventy nine," | EraHeader **1779** slam | whoosh-soft · stamp-hit |
| 2.0 | "in England." | WakePlace `England` | pop-reveal |
| 2.8 | "It's a bright summer morning," | sky floods bright on "bright" | warm-shimmer |
| 4.4 | "and the fashionable ladies outside" | two silhouettes walk in on "ladies" | ui-click-soft |
| 6.0 | "are hiding from it," | they turn from the Sun on "hiding" | whoosh-soft |
| 7.0 | "under parasols." | parasols snap open on "parasols" (v1 asset) | knock-solid |
| 8.0 | (breath) | header docks, scene clears | ui-click-soft (card click) |
| 8.4 | "Did you know that a pale face…" | DYK card (v1 Gunning card) | chime-magic |

**1800 · su07**
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up in eighteen hundred," | EraHeader 1800 slam | whoosh-soft · stamp-hit |
| 1.6 | "near Windsor." | WakePlace `Slough, near Windsor` on "Windsor" | pop-reveal |
| 2.4 | "It's February." | frost window; chip `FEB 1800` on "February" | ui-click-soft |
| 3.4 | "An astronomer, William Herschel," | Herschel bench (v1) on "Herschel" | pop-reveal |
| 5.2 | "splits a sunbeam with a prism," | white beam enters, fans into colours on "splits" / prism glint on "prism" | sparkle-soft |
| 7.0 | "and lays thermometers in the colours," | three thermometers slide in, one per 12 f | ui-click-soft ×3 (≤ 3/s) |
| 8.8 | "their bulbs blackened." | bulbs turn pure black on "blackened" | stamp-hit (soft) |
| 9.6 | (breath) | scene clears, card click | ui-click-soft → DYK card |

**1928 · su08**
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up in nineteen twenty eight," | EraHeader 1928 slam | whoosh-soft · stamp-hit |
| 2.0 | "on a crowded American beach." | beach fills with figures on "crowded", WakePlace `American beach` on "beach" | pop-reveal |
| 3.8 | "Hot sand." | heat shimmer over the sand on "Hot" | warm-shimmer |
| 4.6 | "Salt air." | a wave rolls in on "Salt" | whoosh-wind |
| 5.4 | "And everyone's lying in the Sun," | figures lie down in a 12-frame ripple | ui-click-soft |
| 7.0 | "on purpose." | chip `ON PURPOSE` on "purpose" | pop-reveal |
| 8.0 | (breath) | card click | ui-click-soft → DYK card (Chanel) |

**Today · su09** (pace 3.1)
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "You wake up today." | EraHeader `TODAY` slam + WakePlace `today` | whoosh-soft · stamp-hit |
| 1.2 | "Your phone's charged." | phone on a nightstand; battery fills to 100 % on "charged" | ui-toggle-on |
| 2.4 | "The lights come on." | room lights up on "lights" | ui-click-soft |
| 3.4 | "And somewhere," | camera pulls out through the window | whoosh-soft |
| 4.0 | "a field of solar panels" | panel rows draw across a hillside, 12 f per row | ui-click-soft (≤ 3/s) |
| 5.6 | "has been awake since sunrise." | panels glint as the Sun clears the hill on "sunrise" | warm-shimmer |
| 7.2 | (breath) | card click | ui-click-soft → DYK card (×11) |

**2100 · su11**
| t | words | visual | SFX |
|---|---|---|---|
| 0.0 | "So what's the next rung?" | docked ladder slides centre; empty dashed rung draws on "rung" | whoosh-soft · pencil-scribble |
| 1.6 | (0.3 s beat) | dashed rung pulses once | — |
| 2.0 | "Twenty one hundred." | `YOU WAKE UP IN · 2100` slams on "hundred" (not before) | stamp-hit |
| 3.2 | "That morning hasn't happened yet." | unrisen dawn: horizon + dashed Sun (v1) on "morning" | wind-soft |
| 5.2 | "But we can follow the evidence." | header docks; PREDICTION tag after the dock; a dotted path draws forward on "evidence" | ui-click-soft |
| 6.6 | "Every video you watch," | phone with a play icon on "video" | pop-reveal |
| 7.8 | "every question you ask an AI," | chat bubble on "AI" | pop-reveal |
| 9.4 | "runs in a data centre." | light lines from both into a server rack on "centre" | ui-send |

## 4. Cue-word collisions to handle (nth)
- su01: "Sun" ×3, "eight" ×2 ("eight o'clock", "eight minutes", plus "eight more" in chunk 2 = ×3), "still" ×2.
- su04: "night" ×2 ("day and night." nth 1, "all night." nth 2), "Sun" many, "fifteen" ×2 (hundred / forty three).
- su07: "Sun" ×3, "eighteen" ×3, "spark" ×2 ("spark," and "spark into" → nth).
- su08: "nineteen" ×3, "sunlight" ×3, "measure" ×1 (fine), "meal." ×1.
- su09: "electricity" ×3, "twenty" ×4, "Sun" ×2.
- su10: "eight" ×2, "guess" ×1, "Sun" ×4, "it" everywhere (never cue on "it").
- su11: "twenty" ×5, "Sun" ×4, "AI" ×3 (nth 1 = video line, nth 3 = "your AI wakes"), "sleep" ×1, "Tiny." ×1 in the scene (also in su07, separate scene).

## 5. Checks before render (unchanged gates)
`check_cues.py` (every cue word resolves, ≤ 3 clicks/s, DYK click/chime order) → regenerate BEATMAP.md (no ≥ 2 s gap
without a beat; flag any 2.6–2.9 s stretch) → stills at cue frames for every shot → render changed shots only →
`build_final.py` → `qa_final.py` → `qa_sweep.py <master> <dir> 1` + 1 s audit by an independent reviewer → RUBRIC.md.
