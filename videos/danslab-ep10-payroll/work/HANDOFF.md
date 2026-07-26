# EP10 — build handoff

> **STATUS 2026-07-26 (v3): SHIPPED — 4K + 1080p, 23:30, rubric A (27/30).**
> Production system distilled into the `danslab-episode-production` skill (~/.claude/skills) — start ep11 from it.
> Previous status: All 55 shots written + rendered, assembled
> against the 77 recorded VO lines with SFX + ducked bed. Deliverable:
> `danslab-episode-10-payroll-1080P-v2.mp4` (22:19). Rubric: **A (26/30)** — see `RUBRIC.md`.
> Remaining: 4K render (`--scale=2` + `assemble.py --tag 4k`) before channel delivery.
> NEW GOTCHA (2026-07-26): **ElevenLabs sometimes hallucinates extra garbled speech after the
> scripted text ends** (plumb04 grew 'say it defend my mind' after 'Now — payroll'). Sounds like a
> foreign voice; language detection misses it. Detect: whisper each wav, compare the last ~5 heard
> words vs the script tail. Fix: trim the wav at the last scripted word (+0.15s fade), rebuild audio.
> Gotchas fixed earlier: VO wavs are **48 kHz** (silence gaps must match or the concat
> voice track stretches +8%); Remotion batch renders >18 shots can crash Node — batch smaller;
> a crashed batch leaves a truncated MP4 (ffprobe returns empty — re-render that shot).

Everything needed to continue cold. **Read `docs/VIDEO-DESIGN-SYSTEM.md` first — it is a
hard rubric gate, ship at A or S only.** The first version of this episode was rejected for
violating it (8.5px labels, no brand, no narration sync, raw full-bleed stills).

## Where the pieces are

| Thing | Path |
|---|---|
| Script (VO + cues) | `videos/danslab-ep10-payroll/SCRIPT.md` |
| Scene list + timings | `work/narration/script.json` (78 scenes) |
| **Recorded narration** | `work/mix/*.wav` — 77 lines, ElevenLabs Brian. **Already paid for; never regenerate.** |
| Component kit | `remotion/src/lib/ep10kit.tsx` |
| Shots | `remotion/src/shots/danslab-ep10/Y*.tsx` |
| Images (treated, 1920×1080) | `media/projects/danslab-ep10/*.png` |
| Numbers model | `model.py` → `econ.json` |

## Hard-won facts

- **Shot IDs must start with `Y`.** `P` is ep09, `F` ep07, `St` ep08, `M` ep06, `N` ep05,
  `O` ep04, `T` ep03, `E` ep02. A colliding id silently renders the *other* episode's shot.
- `staticFile()` public root is **`media/`**, not `remotion/public/`.
- Build: `npm run gen && node scripts/render-all.mjs <Id> --still --scale=1`.
  **Read every still before rendering video** — that is how both bugs so far were caught.
- No `<br>` in copy; let it wrap on `max-width` or the dash orphans.
- `at:` frames come from the measured wav length (30 fps). Get one with:
  `ffprobe -v error -show_entries format=duration -of csv=p=0 work/mix/<id>.wav`

## Shots done (7)

`YHook` `YAsk` — cold open · `YIron` `YFrankfurt` `YWhyFour` — ch1 ·
`YLaw` `YSubs` — ch2 (partial)

## Shots remaining (~47)

- **Ch2** the config inversion (`"primary": "moonshot/kimi-k2.6"` with Claude in fallbacks),
  the $2/$5/$1 spend caps
- **Ch3** plumbing ledger → the **$1,242 lock**
- **Ch4** the payroll — 8 workers, cheapest first, each landing on their name; ends on the
  cost ladder matching a human org chart. Use `WorkerRow`. Biggest chapter.
- **Ch5** three slams: 89× → 398× → **159×** (use `Slam`)
- **Ch6** the audit — green/red columns, the `return False` beat, verdict B+
- **Ch7** human co. vs DansLab — `VersusRow`, overhead $10,749 is the punch
- **Ch8** close on "Revenue." + end card

## Assembly (not started)

Rewrite `work/assemble.py` to concat the rendered shot MP4s from `remotion/out/` against
`work/mix/*.wav` — copy the pattern from `videos/danslab-ep09-player/work/assemble.py`
(ORDER list of `(shotId, voId, offset)`). The current assemble.py builds from PNG stills and
is superseded.

Audio gotchas already solved there: build the voice track as a **sequential concat** (a
77-input `adelay`+`amix` graph fails on this ffmpeg), and derive silence padding from the
**actual** rendered segment durations or ~0.7s of drift clips the final line.

## Gate before delivery

Score all 6 rubric dimensions in `work/RUBRIC.md` with evidence. B or lower gets fixed
before it reaches `~/Desktop/claudeYouTube/`.

_Last verified: 2026-07-25_
