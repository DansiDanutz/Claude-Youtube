# Brand — DansLab

> Style contract for every long-form video this repo produces. Every step-2+ skill (TSX overlays,
> full-screen animations, diagrams, SFX) reads this file so all videos feel like one channel.
> A light, premium **builder's-lab** aesthetic: forest green + gold on paper, technical but calm
> (reference polish: Linear / Vercel / Anthropic).
>
> Set by `/brand-setup` on 2026-07-21. This file, `remotion/src/brand.ts` (the same tokens as code)
> and `remotion/src/fonts.ts` (the families) are **one contract in three places** — change them
> together or re-run `/brand-setup`. Nothing errors when they drift; the docs just quietly stop
> describing the videos.

## 1. Identity & voice

- **Positioning:** **DansLab** — David (Dan) builds and ships real AI systems and shows how. A
  light, airy "builder's lab" look: whitespace, soft depth, tasteful motion. Premium and calm,
  never loud or cluttered.
- **Voice:** direct, hands-on, evidence-first ("here's the repo, here's the render"). No hype-filler.
  On-screen text deliberately **avoids em-dashes** — keep that in overlays too.
- **Energy for video:** clean and premium, not MrBeast-loud. Motion is *tasteful*, not
  bouncy/cartoonish. (No hard offset shadows, thick black borders, or sticker-pop "Memphis" looks.)

## 2. Logo / wordmark

- **Wordmark:** `Dans` + `Lab` — two parts, with **"Lab" in the accent green** (set as
  `['Dans','Lab','']` in `BRAND.wordmark`, `remotion/src/brand.ts`). Renders in the display font,
  tight. `EndCard` and `BrandProof` read it from there, so one edit re-brands every card.
- **Sign-off:** `Build. Ship. Repeat.` (`BRAND.signoff`).
- No standalone logo mark is required (a favicon is enough). Use the wordmark as the lockup.
- Drop any portrait / brand-bumper assets you want to reuse under `media/library/` (e.g. a `logos/`
  or `faces/` entry) and reference them from shots via `staticFile('library/...')`.

## 3. Color palette (exact hex)

| Role | Name | Hex | Use in video |
|---|---|---|---|
| **Primary accent** | forest green | `#15803d` | key words, highlights, active state, progress, CTAs, the accent word |
| Secondary accent | deep gold | `#a16207` | pairs with green in gradients, secondary emphasis |
| Success / positive | emerald | `#047857` | "free", confirms, checkmarks, positive callouts |
| Success alt | emerald light | `#059669` | emerald companion for gradients/success |
| Warn / attention | bright gold | `#d4a017` | highlight sweeps, "watch this", attention pops |
| Danger / contrast | rose | `#e11d48` | errors, "the hard/expensive way", negative contrast |
| Ink (text/dark) | ink | `#14141f` | primary text on light; base dark bg |
| Muted text | muted | `#5f5f6e` | secondary text, captions |
| Surface (paper) | paper | `#fffef7` | light full-screen bg, cards |
| Surface 2 (cream) | cream | `#faf8f5` | alt light band |

**Dark UI / terminal scale** (GitHub-ink — for Claude Code terminal & code mockups):
`#0d1117` (bg) · `#161b22` (panel) · `#30363d` (border) · `#8b949e` (dim text) · `#c9d1d9` (text).

**Signature gradient:** forest green → emerald → gold (`#15803d → #059669 → #d4a017`). Used for
dividers and full-screen animated backgrounds.

**Contrast (measured):** ink/paper 18.07:1 · muted/paper 6.20:1 · accent/paper 4.96:1 ·
paper-on-accent 4.96:1 — all clear the gates (accent is fine even below 34px, but keep small text
off the warn gold, which is 2.35:1 and reserved for large sweeps/tints).

## 4. Typography (3-font system)

| Role | Font | Weights | Use |
|---|---|---|---|
| **Display / headlines** | **Sora** | 500 / 600 / 700 | titles, big statements, section cards, the wordmark |
| **Body / UI** | **Inter** | 400 / 500 / 600 | subtitles, labels, body text, lower-third detail |
| **Code / mono** | **JetBrains Mono** | 400 / 500 / 700 | terminal mockups, code, prompts, file paths, tech labels |

All three load from `@remotion/google-fonts` (see `remotion/src/fonts.ts`) — nothing to install.
Headlines tight tracking; body normal; mono for anything literally code/terminal/paths.

## 5. Shape & depth

- **Radius:** ~14–16px (cards/panels), pills fully rounded. Terminal/code windows: ~10px with a title bar.
- **Depth:** **soft shadows** (e.g. `0 8px 32px rgba(20,20,31,.10)`), 1px light borders. Airy.
- **Never:** hard offset shadows (`4px 4px 0 #000`), 3px black borders, sticker/pop look.
- **Window chrome** (browser/terminal mockups): rounded panel, top bar with 3 traffic-light dots
  + a mono label; content on the dark ink scale.

## 6. Motion language  ← *calm & premium*

- **Entrances:** fade + rise. `opacity 0→1` and `translateY 24px→0` over ~14 frames (~0.5s at 30fps),
  ease-out. Calm, no cartoon bounce (the shared `overshoot` easing is deliberately gentle).
- **Exits:** fade + fall ~10 frames.
- **Emphasis:** green highlight/underline wipe behind a key word over ~8 frames; scale pop max 1.03.
- **Stagger:** 3–4 frames between list items / lines.
- **Backgrounds:** paper + a soft green glow + faint dotted grid (`BrandBg` in `lib/kit.tsx`).
- **Feel:** premium, restrained, "Linear/Anthropic." No spins, no elastic, no hard snaps.

## 7. Video delivery specs

- **Canvas:** author at 1920×1080, **30 fps** (the repo's standalone shots and test videos are 30fps;
  render at `--scale=2` for 4K composite). **Before the first real talking-head cut, set this to the
  camera's actual resolution + frame rate** — a mismatch desyncs every shot from the narration.
- **Safe margins:** keep text ≥ 5% from edges (title-safe ~7.5%). Lower-thirds in the bottom ~12–18%
  band, left-aligned to the margin.
- **Talking head is CENTER-framed.** Overlays live in the **top and bottom bands**, or become
  **full-screen cutaways**. Never cover the center-framed presenter.
- **Overlay types:** lower-third (name/term), keyword callout, full-screen statement/section card,
  animated diagram, UI/terminal mockup (TSX-first).
- **Visual editing rules** (honored by `/make-tsx`): concept beats = full-screen cutaways; overlays
  only for small persistent CTAs/badges; visuals sync to narration and never pre-empt it; real UI /
  real pages for config and service facts.
- **Captions:** overlays only (not word-level captions) for long-form.

## 8. Asset & source locations

- Master: `videos/<project>/reference/<cut>.mp4` · edited transcript:
  `videos/<project>/work/edited-transcript.json` (word times in the master timeline).
- Reusable brand assets: `media/library/` (typed folders — `logos/ sfx/ music/ faces/` each with an
  index/catalog). Per-video generated assets: `media/projects/<video>/`, referenced from shots as
  `staticFile('projects/<video>/x')`.
- Brand tokens as code: `remotion/src/brand.ts` · font families: `remotion/src/fonts.ts`. **These two
  and this file are one contract in three places — keep them in sync** (`/brand-setup` writes all
  three at once). Proof card: `npx remotion still src/index.ts BrandProof out/brand-proof.png --frame=95`.

## 9. Locked decisions & still-open

- **Brand = DansLab builder's-lab look** — forest-green accent + gold, Sora display, light base. ✓
- **Motion = calm & premium** — restrained fade-and-rise, no bounce (§6). ✓
- **Framing = centered** — overlays top/bottom band or full-screen cutaway; never cover center. ✓
- **SFX taste (step 4):** subtle premium accents. See §10.
- **Still open:** camera delivery specs (§7) — confirm resolution/fps at the first real recording.
  Faces kit for thumbnails (`media/library/faces/`) not yet supplied.

## 10. Sound design — SFX

Same energy as the motion: **calm/premium, felt-not-heard.** Reference feel is Linear / Anthropic /
Vercel product sound, NOT MrBeast-loud. SFX are seasoning on the edit, never the show.

**Choose every cue by its FUNCTION** (the pro-editor model — 3+1 foundational sounds do the heavy
lifting; thousands of files are a trap). Ask what the beat needs:

| Function | Sound | Its job | Our (calm) sub-types |
|---|---|---|---|
| **Motion** | whoosh | direction/speed; carry one shot into the next | `whoosh-soft` (quick cut), `whoosh-wind` (soft, gliding) |
| **Tension** | riser | "something is coming"; hold on the edge before a reveal | `riser-soft` (gentle; NO cymbal-urgency riser) |
| **Emphasis** | impact / pop | "this moment matters"; lands as the new shot appears | `impact-soft`, `impact-deep-soft` (reveal, long tail), `pop-reveal` (UI reveal) |
| **Snap** | click | small, satisfying, alive; a sequence of related shots each on a click | `ui-click-soft`, `ui-toggle-on`, `ui-send` |

Plus two brand-specific extras: `page-flip` (storybook) and `chime-reward` (the "free"/gift moment).

- **Taste — subtle premium accents.** Quiet, tasteful, always UNDER the voice. Silence is part of
  the mix; never wall-to-wall. Nothing ever pops louder than the voice.
- **Layer for the big moments (build-and-drop).** riser → impact on a scripted reveal; whoosh →
  pop/impact so a cut stands out. Reserve layering for the 2–3 biggest moments; keep everything else
  single and sparse.
- **Density — key transitions, reveals, and tasteful click-sequences.** Score the signature moment of
  a beat, not every sub-frame. Everything genuinely deniable is `"optional": true`.
- **Sync — to the VISUAL beat, and often the exact word.** Time off the shot's animation frames AND
  `edited-transcript.json` word times.
- **Levels.** Library clips are loudness-normalized to **~−20 LUFS** with a −1.5 dBFS peak ceiling.
  The voice is ~−17 LUFS: **payoffs ~−5/−6 · transitions ~−6/−8 · bed/texture ~−9/−11.** The SFX bus
  is lightly ducked under the voice (~4 dB) in the audition mix.
- **Signature motif.** `chime-reward` on the ship/launch moment of each video — the DansLab
  through-line ("it's live").
- **What we deliberately do NOT do:** cymbal-urgency risers, trailer-slam impacts, a whoosh on every
  movement, "funny" click+whoosh gags. No static/glitch textures under narration.
- **Source.** ElevenLabs Sound Effects API is primary; curated royalty-free is the fallback. Every
  clip's `source` + `license` is recorded in the catalog.
- **Music.** No music bed in the SFX pass. Music (track selection + auto-ducking) is the final-mix
  step (`tools/gen_music.py` + `tools/mix_music.py`, drawing from `media/library/music/`).
- **Library is the durable asset.** `media/library/sfx/` grows every video — reuse before generating.
