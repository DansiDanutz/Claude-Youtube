# Presenter Library — Dan on camera, reusable in any video

The idea: you generate (or film) a small set of avatar clips ONCE. The pipeline
cuts the background out, audits the matte, and registers each clip in a
manifest. From then on any scene in any episode can put you on screen with one
line — no per-episode manual work.

```
media/library/presenter/
├── source/            ← you drop raw clips here (10% manual)
├── <id>.webm          ← generated transparent cutouts (never committed)
└── manifest.json      ← the cast sheet — committed, scenes build against it
```

## The workflow (your 10%)

1. Generate a clip in Midjourney / Grok Imagine / film yourself (prompts below).
2. Save it as `source/dan-<beat>.mp4` — the NAME IS THE CONTRACT (see shot list).
3. Run:

```bash
python tools/presenter_library.py
```

That cuts, audits, and registers everything new. Clips whose matte fails on
more than 8% of frames are flagged `RE-SHOOT` and scenes silently skip them —
a bad cutout degrades to graphics-only, it never ships as a ghost.

## Using a clip in a scene (my 90%)

```tsx
import { PresenterFrom, PresenterTag } from '../../lib/presenter';

<PresenterFrom id="dan-open" at={30} side="right" h={860} />
<PresenterTag name="Dan Semenescu" role="DANSLAB · FOUNDER" at={60} side="right" />
```

Scenes name a **beat**, never a file. Re-shoot a clip, re-run the tool, and
every scene that uses it picks up the new take automatically.

## The shot list — 8 beats cover ~95% of editorial needs

Priority order. The first three alone are enough to start using you in episodes.

| # | Save as | The beat | Used for |
|---|---------|----------|----------|
| 1 | `dan-open.mp4` | look at camera, small nod, calm half-smile, hands relaxed | episode cold-opens, "let me tell you" moments |
| 2 | `dan-point-left.mp4` | gesture open-palm toward YOUR right (screen left) | presenting a chart/screenshot beside you |
| 3 | `dan-point-right.mp4` | mirror of #2 | same, other side |
| 4 | `dan-explain.mp4` | talking with natural hand gestures, no pointing | long narration stretches with you on screen |
| 5 | `dan-think.mp4` | hand to chin, eyes up-left, then back to camera | "here's the question" beats |
| 6 | `dan-approve.mp4` | single decisive nod + slight smile | closing an argument, confirming a result |
| 7 | `dan-arms-crossed.mp4` | settle into arms crossed, confident, hold | verdicts, "the numbers don't lie" |
| 8 | `dan-wave-out.mp4` | small wave, or nod + look-away | outros |

## Generation prompts (paste-ready)

Rules that make the cutout clean — these matter more than the model:
- **Plain, light, evenly lit background** (studio grey/white). High subject-background contrast is what the segmenter feeds on.
- **Waist-up, centered, camera static.** No push-in, no pan.
- **Subject fully in frame the whole clip** — a hand leaving frame breaks the auto-crop.
- **5–8 seconds, 720p or better.** Photoreal beats stylized: the segmenter is trained on real humans (our illustrated test character lost her head on ~20% of frames; photoreal should hold).

Midjourney (image first, then `--video` / animate):

```
professional portrait photograph of [DAN REFERENCE], founder and CEO, standing
waist-up facing camera, warm confident expression, dark casual blazer over
t-shirt, clean light-grey studio background, soft even key lighting, no shadows
on background, 85mm lens, photorealistic --ar 9:16
```

Animate prompt per beat (change only the action line):

```
He looks at the camera and gives a small welcoming nod with a calm half-smile,
hands relaxed at his sides. Subtle natural body sway. Camera locked, static.
Background stays perfectly still.
```

- point-left: `He raises his right hand and gestures open-palmed to his right, as if presenting something beside him, then holds the gesture.`
- point-right: `He raises his left hand and gestures open-palmed to his left, as if presenting something beside him, then holds the gesture.`
- explain: `He speaks to the camera with natural, moderate hand gestures at chest height, engaged and warm.`
- think: `He brings one hand to his chin, glances up thoughtfully, then returns his gaze to the camera.`
- approve: `He gives one slow, decisive nod with a slight smile, maintaining eye contact with the camera.`
- arms-crossed: `He folds his arms across his chest with an easy, confident posture and holds it, looking at the camera.`
- wave-out: `He gives a small friendly wave to the camera, then a final nod.`

Grok Imagine (`grok-imagine-video`, ref-image-to-video, max 10s): use the same
action lines as the motion prompt over a reference still of you. The API
contract is in the `grok-imagine-video` skill.

## Where this will and won't be used

- **DansLab Nos. 01–07** stay narrator-led — the series' thesis is "every frame
  is code," and it stays that way. You appear where a HUMAN beat earns it:
  cold-opens, a verdict, the outro. One or two appearances per episode, not a
  talking-head format.
- **Zurich / YouTubeStudio** videos can use the cast freely.
- The same `source/` + manifest flow works for any recurring person or
  character, not just Dan — `sienna-*`, a guest, anyone.

## Quality gate

`python tools/presenter_library.py --audit` re-measures every clip without
re-cutting. `manifest.json` records per-clip dropout percentage; anything over
8% is marked unusable and `PresenterFrom` refuses to render it. That is the
honesty rule from the trading engine applied to video: a clip either passes
measurably or it does not ship.
