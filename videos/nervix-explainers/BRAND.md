# Nervix Explainers — brand contract

The style contract every production step reads for this channel. The DansLab
equivalent is the repo-root `brand.md`; **this file governs `nervix-explainers`
only**, and its code twin is `remotion/src/lib/nervixkit.tsx`. Edit them
together — they drift silently otherwise.

The palette is not invented for video: it is lifted from the **live product**
(`nervix-federation-v2/client/src/index.css`), so a viewer who clicks through
from YouTube lands somewhere that looks like what they just watched.

## Identity

| | |
|---|---|
| Channel | **Nervix Explainers** |
| Promise | "How the agent economy actually works — in three minutes." |
| Voice | direct, concrete, no hype. Numbers over adjectives. Banned: *revolutionary*, *game-changing*, *seamless*. |
| Mark | the product's own synapse logo — a soma with six axons (`client/public/nervix-mark.svg`) |
| Sign-off | **ENROLL. EARN. REPEAT.** |

## Palette (`NX` in nervixkit.tsx)

| Token | Hex | Role |
|---|---|---|
| `bg` | `#0e0e0d` | the canvas — near-black, never pure black |
| `panel` | `#171614` | cards |
| `border` | `#2e2b26` | hairlines |
| `text` | `#faf9f5` | cream ink |
| `dim` / `muted` | `#a8a29a` / `#7c766d` | secondary / tertiary |
| `brand` | `#cf3a24` | vermilion — the product's claw-red |
| `brandBright` | `#f2643f` | accent text, impulses, CTAs |
| `coral` | `#cc785c` | the logo's own coral; the nerve net |
| `gold` | `#d4a017` | **money** — credits, earnings, fees |
| `green` | `#2fb56a` | success, "free", ownership ("you keep your keys") |
| `sky` | `#38bdf8` | identity / verification |
| `violet` | `#8b7bd8` | roles, Hermes, capability |

**Colour law:** one accent owns a chapter. Money is always gold. Ownership is
always green. Never decorate — if a colour appears, it means something.

## Typography

- **Serif — Cormorant Garamond**: statements. The thing the viewer should remember.
- **Sans — Inter**: body, labels, cards.
- **Mono — JetBrains Mono**: numbers, eyebrows, code, URLs, anything the product prints.

Statement sizes 60–96px at 1080-space; never below 22px (unreadable on phones).

## The background is the brand

Nervix means nerves. Every shot sits on `NxBackdrop`:

1. near-black canvas + a breathing vermilion glow
2. **130-star field** — per-star twinkle speed, phase, and parallax depth
3. **the nerve net** — 34 somas that drift and pulse, hairline axons between
   every pair within reach (brighter the closer), and **10 impulses continuously
   travelling those axons**
4. a hairline grid on top

The net is deliberately pushed to the margins (radius 520–1180 from centre) so it
**frames the copy instead of fighting it**. If a shot's text ever competes with
the net, move the text — don't dim the net.

## Motion

- Entrance: fade + 24px rise, `bezier(0.33, 1, 0.68, 1)`, 16 frames.
- Numbers count up and land ON the narrated word.
- The logo fires clockwise; in the intro it draws itself on, axon by axon.
- 30fps, 4K master (3840×2160), 1080p and 720p derived.

## Sound

- **Voice:** Kokoro `am_adam` @ 0.96 — tier 3 of the fleet voice stack, **free and
  local**. ElevenLabs Brian (the DansLab voice) is metered per character and needs
  Dan's explicit per-task acceptance; if granted, it is a `gen_voice.py` change only.
- **Bed:** `~/.claude/skills/huashu-design/assets/bgm-tech.mp3` at 0.30, sidechain-
  ducked 8:1 under the voice, 1.5s fade in / 4s out.
- **Master:** loudnorm `I=-14 TP=-1.5 LRA=11`.
- **Gap (known):** no SFX interaction layer yet — whooshes on cuts, chime when
  credits land. DansLab has it; add before No. 02 so the channel is consistent.
