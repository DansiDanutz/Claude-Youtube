# No. 07 "Light" · shot brief (shared by every shot builder)

Repo `~/Projects/Claude-Youtube`, branch `feat/dyk-07-light` (already checked out in the main checkout; do NOT switch
branches, do NOT create worktrees, do NOT commit — the coordinator commits). Several builders work in parallel on
different shots: touch ONLY the files of your own shots.

## What to build, per shot
1. `remotion/src/shots/dyk-07/<Shot>.tsx` — adapt the No. 06 counterpart in `remotion/src/shots/dyk-06/` (same structure,
   same panel/hold logic, same components), with No. 07 content. Counterparts:
   LtHook←MeHook · LtIntro←MeIntro · LtWelcome←MeWelcome · LtPromise←MePromise · Lt1500←Me1537 · Lt1807←Me1799 ·
   Lt1859←Me1847 · Lt1882←Me1941 · Lt1993←Me1948 · LtToday←MeToday · LtReveal←MeReveal · Lt2100←Me2100 ·
   LtClose←MeClose · LtOutro←MeOutro · LtThumb←MeThumb.
2. `videos/dyk-07-light/work/cue_parts/<Shot>.py` — adapt `videos/dyk-06-medicine/work/cue_parts/<Me counterpart>.py`
   (same format; read `videos/dyk-07-light/work/cues.py` for W/WE/S/H/ticks). Every visual event gets a sound and
   every sound names a visual that exists in your TSX at that word. ≤ 3 clicks per second. The era ritual cues
   (era whoosh/impact at 0.0/0.12 s, the DYK toggle + chime) are already added by cues.py for the six era shots — do not repeat them.
   (LtIntro has no VO: its part may be empty but the file must exist. LtThumb has no cue part.)

## Inputs (read them; never invent a fact)
- Narration per scene, word by word with timings (after pauses): `remotion/src/shots/dyk-07/vo.json` (scene ids lt00…lt14,
  lt13b-next, lt13c-signoff). Spoken text: `videos/dyk-07-light/work/narration-draft.md`.
- Shot durations and VO offsets: `videos/dyk-07-light/work/timeline.json` — `{Shot: [seconds, {scene: offset_s}]}`.
  Set `compositionConfig.durationInSeconds` to that value and `DUR = round(seconds × 30)`; `makeCue(vo, scene, offset)`.
- Story and visual plan: `videos/dyk-07-light/STORY.md` (the arc table §1, cliffhangers §3, outro §3).
- Facts and sources (every on-screen number/source line must trace here): `videos/dyk-07-light/RESEARCH.md` (L1–L18).
- Kit: `remotion/src/lib/dykkit-light.tsx` — LIGHT_ARC, NEXT_RUNG, lightRungs, PRICE_PAST/priceUpTo/PriceStrip (replaces
  No. 06's YEARS strip: label "1 HOUR OF LIGHT · WORK"), LightProp/PropTag with kinds rushlight tallow beeswax bell gaslamp
  pipe whale derrick kerosene can bulb switch generator meter led streetlight window telescope (props take `lit`, `level`,
  `swing`), NightSky (stars 0–1 of 250, glow 0–1 skyglow, milky 0–1 band), SkyPerson/TenPeople, LightFigure, FLAME,
  LED_BLUE, plus re-exports of No. 05's Label/OnWord/Source/LightChip(=FoodChip)/LightLadder(=FoodLadder)/CountUp/
  PredictionTag/Figure/hold/pane/cardOut/StampText/PeopleRow/AskMark/EpisodeHud/WakePlace/SunCliffhanger/BigWord…
  DO NOT edit any kit file; put shot-only drawings inside your shot file (as No. 06 does).
- Rules: `.claude/skills/dyk-episode/SKILL.md` — read "Non-negotiables", "Design every second BEFORE rendering" and
  "Hard gates". The essentials: never spoil a word (nothing appears before Brian says it); no empty/static stretch ≥ 2 s;
  no flashes (every caption ≥ 1.5 s fully legible; use `hold()`/`pane()`/`cardOut()` exactly like No. 06); builds one item
  per ~12 frames; text inside a 160 px side margin; nothing in the HUD (bottom 54–110 px) or the cliffhanger band
  (bottom 132); payoff words appear ON the spoken word; repeated cue words always carry `nth`.
- Look: light is the subject, so let the picture's own light carry each era — dusk and one small flame (1500), warm gas
  glow along a street (1807), a steady kerosene flame at a table (1859), whole blocks lighting with no flame (1882),
  a cold blue glow on a lab bench turning white (1993), a window full of lights and an orange skyglow (today), a dark sky
  with the Milky Way coming back (2100). Continuous motion every second (flicker, glow, swing, flow).

## Episode facts that change from No. 06
- `EpisodeHud year={…} episode="07"`. Next episode in the outro: `NEXT ▸ NO. 08` with the subject WEIGHT / OBESITY
  (voiced in lt13b-next; keep the word in ONE constant `NEXT_EP` so it can be swapped).
- Era header years: 1500, 1807, 1859, 1882, 1993, TODAY; places: a market town in Flanders · Pall Mall, London ·
  Titusville, Pennsylvania · lower Manhattan · Tokushima, Shikoku · your window. Era labels (`EraHeader label`):
  FLANDERS · LONDON · PENNSYLVANIA · MANHATTAN · JAPAN · TONIGHT. Place lines stay neutral (never name the era's light
  before Brian does: no "gas" in 1807's header, no "oil" in 1859's, no "electric" in 1882's, no "blue/LED" in 1993's).
- HOW WE SAW IT chip on its spoken word: "luxury." (1500) · "service." (1807) · "liquid." (1859) · "network." (1882) ·
  "crystal." (1993) · "cheap" in "Too cheap to switch off." (today). Chip text from LIGHT_ARC; the ladder docks like No. 06.
- PRICE pills (PriceStrip) land on their spoken number: 1500 "forty" → BABYLON ≈41 H, then "five" → 1800 >5 H;
  1859 "twenty" (nth: check vo.json) → 1870 ≈20 MIN; 1882 "thirteen" → 1900 ≈13 MIN; 1993 "half" → 1992 <½ SEC.
  1807 and today speak no price: they carry the earlier pills (1807: BABYLON + 1800; today: all five, hidden under the band).
  Source line with the strip: "Nordhaus 1997, table 1.4 · work hours per 1,000 lumen-hours" (L3).
- DYK cards (one clause per key word, never blank while he speaks):
  1500 the bell is called curfew, from the old French for "cover the fire" (L1) · 1807 the first gas lights on a London
  street were lit for the king's birthday; Frederick Winsor (L5) · 1859 a historian later wrote that oil "gave kerosene to
  the world, and life to the few remaining whales" — credit "Stotz 1938, quoted by Nordhaus 1997" (L4), NOT Nordhaus as
  author · 1882 Edison was in banker J. P. Morgan's office, not at the station; Pearl Street, ~400 lamps (L10) · 1993 the
  missing colour was blue; Shuji Nakamura; Nobel Prize 2014 (L12) · today more than a third of all people can't see the
  Milky Way from home; Europe 6 in 10, North America nearly 8 in 10 (Falchi 2016, L13).
- Hook (LtHook, L3/L11/L14): frame 0 is ONE candle flame in the dark. "one three-thousandth" lands as a figure (1/3,000)
  on "three-thousandth"; "We didn't." gets its own beat. Never show stars, sky, "80 %" or the Milky Way before Brian says
  "stars" — then NightSky counts down from 250 to ~100 on "hundred" (Kyba 2023: "at today's rate", keep that hedge on screen).
- Guess (LtWelcome / LtReveal, L13): "Think of ten people…" → TenPeople. In LtWelcome show the three options Two? Five?
  More than eight? each on its word, NEVER highlight or light the answer. In LtReveal light eight figures on "eight" and
  stamp MORE THAN 8 IN 10; "almost everyone" for the US and Europe (99 %, L13).
- Today (LtToday, L11/L14): "six and a half thousand times" → LightFigure 6,500× (Fouquet & Pearson, Britain 1800→2000);
  "fifty thousand reports" (51,351 observations) and "almost ten percent a year" → 9.6 %/yr (Kyba 2023).
- Answer (LtReveal): the ladder walk-down, one rung per pause-beat ("luxury." "pipe." "can." "network." "fire." then
  "cheap"), payoff "the scarce thing was light" / "the scarce thing is the dark" each ON its word (pauses were added for
  these beats — read the paused timings in vo.json).
- 2100 (Lt2100, L15/L16): `PredictionTag` throughout; only France's 2013 decree (shop windows off by 1 a.m.) and Tucson's
  outdoor-lighting rules since 1972 as facts; the scenario (dark kept on purpose, the Milky Way on a school trip) is
  plainly labelled. The curfew bell returns on "bell"; "cover the light" pays back 1500's "cover the fire". The 2100 rung
  fills NEXT_RUNG.
- Close (LtClose): a light switch going off on "switch", then stars appearing on "stars".
- Outro (LtOutro): comment prompt "Streetlights or stars: if you had to give one up, which would it be, and why?";
  Dexty.live on "Dex-tee"; like/share/subscribe on their words; teaser lt13b-next ("Next time: weight…", a heavy body as a
  sign of wealth in 1500 — Bruegel's Fat Kitchen 1563, L18; "one in seven" lives with obesity, WHO, L17); end screen
  Comment of the Week card labelled EXAMPLE (no real No. 06 comment yet — never invent a handle), WATCH NEXT slot, ring at
  `left: 960 - 130, top: 637, width/height 260`.

## Done means
- `cd remotion && npx tsc --noEmit -p .` shows no error in your files.
- `python3 videos/dyk-07-light/work/check_cues.py` resolves every cue in your files (it scans all Lt*.tsx; ignore
  errors in other builders' files, report them).
- Do NOT render, do NOT run stills, do NOT regenerate the registry, do NOT delete anything.
- Report: files written, any narration word you could not visualise, any fact you were unsure of (with its L-id), and
  any No. 06 component behaviour you had to work around.
