# DID YOU KNOW THAT? — the series format (every episode)

Channel: **Did You Know That?** · YouTube @Did-You-Know-that-2026 · its own brand (never DansLab logos/URLs).
Reference build: `videos/dyk-01-time-compressed` (9:04). Brand kit: `remotion/src/lib/dytbrand.tsx`.
Episode kit: `remotion/src/lib/dykkit.tsx`. Gate: `docs/VIDEO-DESIGN-SYSTEM.md` rubric (ship A/S) + Channel Law.

## The one rule (Dan, 2026-10-11)
**Every episode has ONE subject, and tells how humans changed their behaviour toward it — century by
century — then how we live with it now, then what 2100 holds, built only on real facts.**
That throughline is underlined in every era: *what people believed · what they did every day · what changed it.*

## Episode spine (~8–10 min — clears YouTube's 8-min mid-roll line)
| # | Beat | Length | Rules |
|---|---|---|---|
| 1 | **Cold-open hook** | 15–25 s | Concrete paradox on screen at frame 0. Ends on the episode question: "Did you know that…?" |
| 2 | **Signature sting** (`DytSting`) | 4.5 s | Identical every episode: bulb flickers on → wordmark slams → tagline. Same sounds (sonic logo). Then the episode title card. Never before the hook. |
| 3 | *(Ep 1 only)* Channel welcome | ~25 s | "?" → "!" + categories + **THE RULE: guess in the comments · stay to the end · check if you were right.** Later episodes: one line — "You know the rule. Guess now." |
| 4 | **Promise** | ~15 s | "Seven centuries. Seven mornings. In each one, you wake up as someone else." State what the ending will reveal; withhold it. |
| 5 | **Seven eras** 1500 → today | 40–65 s each | The five era beats below. |
| 6 | **The answer** | 40–50 s | The episode question resolved; the reframe the viewer did not see coming. |
| 7 | **2100 — the evidence** | ~45 s | Labelled `PREDICTION · a scenario, not a fact`. Only published data (UN, IEA, NASA, peer review, named reports) → then the scenario. Pay back any debt planted earlier. |
| 8 | **Close inside the viewer** | ~10 s | A direct personal question. |
| 9 | **Outro ritual** | ~30 s | Comment prompt tied to the subject ("Which century would you wake up in?"), like / share / subscribe on his words, ONE named teaser for the next episode, sign-off **"Ask. Wonder. Repeat."** |
| 10 | **End screen** | 15 s | LEFT slot = **COMMENT OF THE WEEK** card; RIGHT slot = WATCH NEXT (YouTube video element over the next-episode teaser art); subscribe ring centre-bottom (`TcOutro` part 3). |

## Comment of the Week (the community ritual — Dan, 2026-10-11)
- Spoken in every outro: "At the end of every episode, I will read the best comment, right here, on this screen.
  And the subject you ask for most becomes a future episode."
- From No. 02 on: Brian reads the previous episode's best comment over the end-screen card, credits the
  commenter's @handle (with their comment publicly visible — no private data, no paraphrase presented as a quote),
  and names the most-requested subject as an upcoming episode.
- No. 01 has no comments yet → the card shows a clearly labelled **EXAMPLE** (never a fabricated "real" comment).
- Keep the comment prompt specific to the subject ("Which century would you wake up in, and why?").

## The five era beats (the addiction engine — same order, every era, every episode)
1. **WAKE UP** — "You wake up in [exact year], [place]." Second person, sensory, one line of mystery
   ("It is midnight. And the whole village is awake."). Visual: `EraHeader place=…` (YOU WAKE UP IN · year · place).
2. **DID YOU KNOW THAT…** — one surprising, sourced fact about human behaviour toward the subject, on the
   neon brand card (`DidYouKnowThat`). The channel name is spoken inside every era — it becomes a ritual.
   Sound: bulb click + chime.
3. **HOW PEOPLE LIVED** — the everyday behaviour, shown as a **Day Clock** (`DayClock`, 24 h ring) or
   **Week Strip** (`WeekStrip`), labelled "illustration · based on historical accounts".
4. **WHAT CHANGED IT** — the invention / discovery / law that shifted the subject (custom visual, real dates and numbers).
5. **CLIFFHANGER** — an open loop into the next century (`Cliffhanger` band + "NEXT ▸ year"). Sound: minor piano.
   Never answer it in the same era.

## Narration rules (Brian, ElevenLabs — only new lines are ever generated)
- Second person ("you wake up…", "you will die in the same world you were born into").
- Open loops: every era ends on a question or a threat the next era answers. Plant one debt early
  (ep 1: Keynes's 15-hour week) and pay it back in 2100.
- One "Did you know that…" per era — phrased so the viewer could repeat it to a friend.
- Concrete beats abstract: a year, a place, a number, a person — in the first sentence of each era.
- Hedge honestly where historians disagree ("historians have found hundreds of references…"); say "expected",
  "could", "estimates" for anything not yet true. Never invent quotes or names.
- Mid-video re-hooks on the clock: no block > 90 s without a new question.

## Production checklist
`RESEARCH.md` (every on-screen number → a source) → `narration/script.json` → `gen_voice.py` (timestamps) →
`make_vo_json.py` → shots with `makeCue` (word-synced; throws on a missing word — cue the nth duplicate) →
`render-all.mjs --scale=1` → `build_final.py` → `qa_final.py` → `RUBRIC.md` → Dan's watch → 4K + packaging + upload.
