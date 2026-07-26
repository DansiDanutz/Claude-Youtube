# EP11 — The First Dollar (Season Two, No. 1)

**Premise (set up by ep10's tease):** Eight workers who cost $1,242/mo try to earn their
first real dollar. One product. One payment. No humans in the loop. Season one was who
they are; season two is whether they can earn.

**Shot prefix: `Z`** (verified free in shots.manifest.json).
Build per the `danslab-episode-production` skill — same pipeline, same QA gate, same
persistent surfaces (top-right panel becomes **THE REVENUE COUNTER: $0.00**, bottom bar
keeps the link + a "days since launch" ticker).

## Dan's mandate for this episode

Maximum visual craft: heavy Remotion effects + HyperFrames segments. No boring cards —
every chapter gets at least one signature effect. Sound interaction layer from day one.

## Effects map (what makes this one look different)

| Effect | Tech | Where |
|---|---|---|
| Gold particle field that condenses into a **$1** | Remotion `<canvas>` particle sim (deterministic, seeded per frame) | cold open |
| Audio-reactive title sting (beat-synced glow/pulse) | **HyperFrames** audio-reactive composition → rendered MP4 → CLIP segment in ORDER | intro |
| Shader-style animated backgrounds (flowing gradient noise) | HyperFrames typegpu/three fragment shader clips as CLIP plates, or canvas noise in Remotion | chapter openers |
| 3D flip-cards for product candidates (ZmartyChat/NERVIX/Studio…) | Remotion CSS 3D (`rotateY` + perspective, like ImagePlate but interactive-feeling flips) | "choosing the product" chapter |
| Live "payment pipeline" diagram with pulses travelling the wires | Remotion SVG path + `offsetDistance` pulses (Stripe → webhook → ledger) | the revenue loop chapter |
| Odometer revenue counter with hot-pop (from ep10 kit, upgraded to digit-roll) | Remotion | persistent top-right panel |
| Marker-sweep / hand-drawn circle text highlights | **HyperFrames** highlight components rendered as alpha overlays | key claims |
| Glitch/scanline moment when something breaks | Remotion (chromatic offset + slice displacement on the frame) | the failure beat |
| Confetti/spark burst ONLY if a real payment lands | Remotion particles | the payoff (evidence-gated!) |

HyperFrames clips enter the pipeline as `("CLIP", path)` ORDER entries — same as the old
montage plate, rendered at 3840×2160 30fps h264 to match the 4K concat (gotcha table).

## Story spine (draft — beats, not final script)

1. Cold open: $0.00. "Eight workers. Fifteen thousand dollars a year of costs. Revenue: zero. Tonight that number has to move."
2. Logo intro (classic) → stakes card.
3. Ch1 — THE RULE: Dan's law from ep10: nothing else opens until one product takes one real payment end-to-end.
4. Ch2 — THE CANDIDATES: 3D flip-card tournament — which product can actually charge money fastest? (real criteria: has users? has Stripe? has a deployable paywall?)
5. Ch3 — THE LOOP: build the payment pipeline on screen (animated diagram): product → checkout → webhook → ledger → Finance posts it.
6. Ch4 — THE ATTEMPT: what actually happened (REAL events only — needs Dan's facts).
7. Human beat: what only Dan could do (pricing call? the legal/Stripe account step humans must sign?).
8. Verdict + counter state at episode end (honest: $X.XX — whatever is true).
9. Narrated outro: subscribe/like + BUILD. SHIP. REPEAT. + tease ep12.

## FACTS NEEDED FROM DAN before scripting VO

1. **Which product goes first** for the revenue loop (ZmartyChat subscription? NERVIX fees? something else already decided)?
2. What has ACTUALLY happened so far toward a first payment (Stripe account state, pricing, any real attempt/failure)? The evidence rule applies — we do not stage a fake dollar.
3. Target length (ep10 was 23:30 — same, or shorter/punchier for season two, e.g. 12–15 min?).

_Created 2026-07-26 · status: treatment + prototypes phase_
