# Character Animation Prompts — animated presenters, never static cutouts

> Proven 2026-07-22: Grok i2v animated Arlo from his sheet in 53s on the xAI
> subscription (`~/Desktop/arlo-animated-test.mp4`). Each character gets a
> MOTION LIBRARY of short loopable clips; Remotion shots composite the CLIP
> (OffthreadVideo, loop) instead of a static PNG. Generate via pipeline
> (`engines/step_image_gen.fetch_xai_i2v(image, prompt, out, duration_s=6)`)
> or paste into Grok Imagine / Midjourney (--video on the character image).

## The i2v craft rules (every prompt below obeys them)
Single continuous motion · static camera · plain background stays unchanged
(easy keying) · no new elements entering frame · loop-friendly ending pose ·
name the identity anchors so the face stays locked.

## Per-move templates — replace [IDENTITY] with the character line below

**TALK (main presenter loop):** [IDENTITY] turns slightly toward camera and
speaks warmly, natural mouth movement and one small hand gesture, gentle head
nods; static camera, plain background unchanged, single continuous motion,
no new elements, loopable presenter shot

**POINT (introduce a stat/diagram beside them):** [IDENTITY] looks at the
viewer, then raises one hand and points confidently to their left, holds the
point with a small nod; static camera, plain background unchanged, single
continuous motion, loopable

**REACT-WOW (payoff beats):** [IDENTITY] eyes widen with delight, eyebrows
rise, a slow amazed smile forms, small step back; static camera, plain
background unchanged, single continuous motion, loopable

**THINK (question beats):** [IDENTITY] looks up thoughtfully, hand to chin,
slow blink, then a decisive nod as the idea lands; static camera, plain
background unchanged, single continuous motion, loopable

**WALK-IN (entrances):** [IDENTITY] walks calmly into frame from the right,
stops at center-left, settles into a relaxed presenter stance facing camera;
static camera, plain background unchanged, single continuous motion

## Identity lines
- **arlo** — the elderly man, 72, bald crown with white side hair, thick white
  walrus mustache, round dark-rimmed glasses, olive-brown cardigan
- **rosa** — the elderly woman, 70, silver-gray high bun, large glasses, gold
  hoop earrings, teal cardigan over cream blouse
- **marcus** — the man, 38, medium-dark skin, short black fade, trimmed beard,
  navy bomber jacket over gray t-shirt
- **elena** — the woman, 35, shoulder-length wavy copper-red hair, freckles,
  green eyes, olive utility jacket over cream turtleneck
- **leo** — the boy, 9, messy chestnut-brown hair, amber eyes, rust-orange
  knitted hoodie
- **zoe** — the girl, 10, black curly hair in two puff buns with yellow clips,
  brown skin, purple corduroy overalls, striped shirt

## Output convention
`media/library/characters/motion/<char>-<move>.mp4` (e.g. `arlo-talk.mp4`).
Background-key or matte in the shot (the plain sheet background keys cleanly);
`npx hyperframes remove-background` is available for transparent webm if
needed. 6 chars × 5 moves = 30 clips = the full presenter library, ~1h of
subscription generation total.
