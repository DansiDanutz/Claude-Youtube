# No. 06 "Medicine" · shot brief (shared by every shot builder)

Repo `~/Projects/Claude-Youtube`, branch `feat/dyk-06-medicine` (already checked out in the main checkout; do NOT switch
branches, do NOT create worktrees, do NOT commit — the coordinator commits). Several builders work in parallel on
different shots: touch ONLY the files of your own shots.

## What to build, per shot
1. `remotion/src/shots/dyk-06/<Shot>.tsx` — adapt the No. 05 counterpart in `remotion/src/shots/dyk-05/` (same structure,
   same panel/hold logic, same components), with No. 06 content. Counterparts:
   MeHook←FdHook · MeIntro←FdIntro · MeWelcome←FdWelcome · MePromise←FdPromise · Me1537←Fd1500 · Me1799←Fd1747 ·
   Me1847←Fd1884 · Me1941←Fd1915 · Me1948←Fd1966 · MeToday←FdToday · MeReveal←FdReveal · Me2100←Fd2100 ·
   MeClose←FdClose · MeOutro←FdOutro · MeThumb←FdThumb.
2. `videos/dyk-06-medicine/work/cue_parts/<Shot>.py` — adapt `videos/dyk-05-food/work/cue_parts/<Fd counterpart>.py`
   (same format; read `videos/dyk-06-medicine/work/cues.py` for W/WE/S/H/ticks). Every visual event gets a sound and
   every sound names a visual that exists in your TSX at that word. ≤ 3 clicks per second. The era ritual cues
   (era whoosh/impact at 0.0/0.12 s, the DYK toggle + chime) are already added by cues.py for the six era shots — do not repeat them.
   (MeIntro has no VO: its part may be empty but the file must exist.)

## Inputs (read them; never invent a fact)
- Narration per scene, word by word with timings: `remotion/src/shots/dyk-06/vo.json` (scene ids me00…me14).
  Spoken text: `videos/dyk-06-medicine/work/narration-draft.md`.
- Shot durations and VO offsets: `videos/dyk-06-medicine/work/timeline.json` — `{Shot: [seconds, {scene: offset_s}]}`.
  Set `compositionConfig.durationInSeconds` to that value and `DUR = round(seconds × 30)`; `makeCue(vo, scene, offset)`.
- Story and visual plan: `videos/dyk-06-medicine/STORY.md` (the arc table, §1; chip text per era).
- Facts and sources (every on-screen number/source line must trace here): `videos/dyk-06-medicine/RESEARCH.md` (M1–M13).
- Kit: `remotion/src/lib/dykkit-medicine.tsx` (MED_ARC, NEXT_RUNG, medRungs, YEARS_PAST_MED, MedProp/PropTag with kinds
  lancet bowl candle oilpot salve scale basin lime vial germ bed envelope syringe pills boat sleeve, MonthBars, TwoGroups,
  plus re-exports of No. 05's Label/OnWord/Source/MedChip/MedLadder/YearsStrip/Baby/CountUp/PredictionTag/Figure/
  hold/pane/cardOut/StampText/PeopleRow/AskMark/EpisodeHud/WakePlace/SunCliffhanger…). DO NOT edit any kit file; put
  shot-only drawings inside your shot file (as No. 05 does, e.g. FdOven).
- Rules: `.claude/skills/dyk-episode/SKILL.md` — read "Non-negotiables", "Design every second BEFORE rendering" and
  "Hard gates". The essentials: never spoil a word (nothing appears before Brian says it); no empty/static stretch ≥ 2 s;
  no flashes (every caption ≥ 1.5 s fully legible; use `hold()`/`pane()`/`cardOut()` exactly like No. 05); builds one item
  per ~12 frames; text inside a 160 px side margin; nothing in the HUD (bottom 54–110 px) or the cliffhanger band
  (bottom 132); payoff words appear ON the spoken word; repeated cue words always carry `nth`.

## Episode facts that change from No. 05
- `EpisodeHud year={…} episode="06"`. Next episode in the outro/cliffhanger: `NEXT ▸ NO. 07` with the subject LIGHT
  (placeholder, it is voiced in me13b-next; keep the word "LIGHT" in ONE constant `NEXT_EP` so it can be swapped).
- Era header years: 1537, 1799, 1847, 1941, 1948, TODAY; places: an army camp near Turin · Mount Vernon, Virginia ·
  Vienna · Oxford · a hospital ward in Britain · Merca, Somalia. Era labels (`EraHeader label`): TURIN · VIRGINIA ·
  VIENNA · OXFORD · BRITAIN · SOMALIA.
- HOW WE SAW IT chip on its spoken word: Balance. / Authority. / Pattern. / cure. (in "A cure.") / Proof. / Prevention.
  (chip text from MED_ARC: BALANCE, AUTHORITY, A PATTERN, A CURE, PROOF, PREVENTION); the ladder docks like No. 05.
- THE YEARS pill per era from YEARS_PAST_MED, landing on its spoken number ("thirty five", "twenty nine", "thirty eight",
  "sixty one", "sixty eight", "seventy three"). Each era names its source line (RESEARCH M9 / No. 05 F8 for 1537).
- 2100: `PredictionTag` throughout; only UN ≈ 82 and the Lancet GRAM numbers (M10); the 2100 rung fills AN ARMS RACE?.
- The guess (MeWelcome, MeReveal, M7): 55 got the drug, 52 bed rest; 4 of 55 vs 14 of 52 died in six months. In
  MeWelcome NEVER show the answer (4 / 14). In MeReveal use `TwoGroups` with deaths dimming on "four" / "fourteen".
- Today's hook / 1799 numbers: over eighty ounces, about two and a half litres, about twelve hours, "by some estimates
  around two fifths" — keep every hedge on screen ("by some estimates", "by his own account", "reportedly", "by one account").

## Done means
- `cd remotion && npx tsc --noEmit -p .` shows no error in your files.
- `python3 videos/dyk-06-medicine/work/check_cues.py` resolves every cue in your files (it scans all Me*.tsx; ignore
  errors in other builders' files, report them).
- Do NOT render, do NOT run stills, do NOT regenerate the registry, do NOT delete anything.
- Report: files written, any narration word you could not visualise, any fact you were unsure of (with its M-id), and
  any No. 05 component behaviour you had to work around.
