# EP10 — image prompts

> **The prompts now live in `images/<subfolder>/PROMPT.txt`, one per folder.**
> That's the working copy — open the folder, paste, drop the PNG back in the same folder.
> This file is kept as the single-page overview of all eight.

Run `bash images/status.sh` to see what's landed.

Each `PROMPT.txt` adds an **accept/reject rule** that isn't in this overview — the one
specific thing that makes that image work (#04 must have exactly eight desks; #06 exactly
one *dark* light, in focus). Use those, not this page, when generating.

---


## 1 — The head office `[Ch1 · 1:40]`

`images/img-1-head-office.png`

```json
{
  "type": "cinematic photograph",
  "subject": "a single aluminium desktop computer tower on a dark wooden desk, seen three-quarter from the front, one small amber status LED glowing on its face",
  "setting": "a home office at night, blinds half-drawn, a city out of focus far beyond the window",
  "lighting": "one warm tungsten desk lamp from the left, deep falloff, most of the frame in shadow; a faint cool spill from an off-screen monitor",
  "palette": "near-black #040404 background, warm amber and gold #d4a017 highlights, muted bone",
  "camera": "50mm, shallow depth of field, slight low angle, subject left-of-centre with negative space to the right",
  "mood": "quiet, expensive, understated — a machine that is working while nobody watches",
  "constraints": "no people, no text, no logos, no brand marks"
}
```

## 2 — The CEO's desk `[Ch1 · 2:40]`

`images/img-2-ceo-desk.png`

```json
{
  "type": "cinematic photograph",
  "subject": "a small square desktop computer beside the base of a monitor, keyboard edge in the foreground, a cold cup of coffee just in frame",
  "setting": "the same dark home office, late at night",
  "lighting": "warm lamp from the right, monitor glow washing cool across the desk surface",
  "palette": "near-black, warm amber, a single coral #c9584a accent from a notification light",
  "camera": "35mm, low and close to the desk surface, shallow focus",
  "mood": "human — this is where the person sits, not the machine",
  "constraints": "no people, no text, no logos"
}
```

## 3 — Frankfurt `[Ch1 · 3:20]`

`images/img-3-frankfurt.png`

```json
{
  "type": "cinematic photograph",
  "subject": "a data centre cold aisle, four server racks receding into perspective, status LEDs in rows",
  "setting": "windowless, immaculate, cable management visible and tidy",
  "lighting": "cool white from overhead strips, LED rows reading green and amber, strong perspective falloff into black",
  "palette": "desaturated cool greys against near-black, amber and gold LED accents",
  "camera": "24mm, centred one-point perspective down the aisle, tripod height",
  "mood": "industrial, indifferent, permanent",
  "constraints": "no people, no text, no logos, no visible branding on racks"
}
```

## 4 — Eight desks, nobody there ⭐ `[cold open / Ch4 · 10:15]`

`images/img-4-eight-desks.png`

> The thesis image of the whole episode. Worth `high` quality if you only upgrade one.

```json
{
  "type": "cinematic wide photograph",
  "subject": "eight identical empty office desks in two rows of four, each with a screen switched on and glowing, every chair pushed in, not a single person present",
  "setting": "an open-plan office at three in the morning, ceiling lights off",
  "lighting": "the only light is the eight screens, cool and even, throwing long shadows across the floor; deep black ceiling and corners",
  "palette": "near-black room, cool screen glow, a single warm gold #d4a017 pool of light on the far wall",
  "camera": "28mm, symmetrical straight-on wide, slight high angle, strong vanishing point",
  "mood": "eerie, productive, unattended — work happening with nobody doing it",
  "constraints": "absolutely no people, no readable text on the screens, no logos"
}
```

## 5 — One door `[Ch2 · 4:40]`

`images/img-5-one-door.png`

```json
{
  "type": "conceptual cinematic image",
  "subject": "many faint converging lines of light funnelling into a single narrow illuminated doorway, and far fewer, brighter lines continuing out the other side",
  "setting": "an abstract black void, no floor, no horizon",
  "lighting": "the doorway is the only source, gold #d4a017, with the converging lines dim and cool by comparison",
  "palette": "near-black, gold, a trace of coral at the edges",
  "camera": "straight-on, symmetrical, centred",
  "mood": "a gate, a filter, a decision point",
  "constraints": "no people, no text, geometric and clean, not busy"
}
```

## 6 — Every light green ⭐ `[Ch6 · 20:00]`

`images/img-6-green-lights.png`

> Pairs with the `return False` beat. The one dark light is the whole point — keep it subtle.

```json
{
  "type": "extreme close-up cinematic photograph",
  "subject": "a dense grid of small status indicator lights on a dark equipment panel, almost all lit steady green, with exactly one light in the middle rows dark and dead",
  "setting": "server hardware, shallow macro depth",
  "lighting": "the lights are the only source, tight falloff, panel surface barely visible",
  "palette": "near-black panel, saturated green points, one absence of light",
  "camera": "macro, shallow focus, the dark light sitting just off-centre and in focus",
  "mood": "everything reports healthy; nothing is",
  "constraints": "no people, no text, no labels, the dead light must be clearly dark but not dramatic"
}
```

## 7 — The room `[Ch7 · 20:45]`

`images/img-7-the-room.png`

```json
{
  "type": "cinematic wide photograph",
  "subject": "a small home office seen wide from the doorway — a desk, two computers, one lamp, a chair nobody is sitting in",
  "setting": "night, a window showing a dark city, the rest of the flat unlit behind the camera",
  "lighting": "one warm lamp, warm and generous this time rather than cold; screens dim in standby",
  "palette": "warm amber and gold dominant, near-black surround",
  "camera": "24mm, wide, slightly off-centre framing, natural and unstaged",
  "mood": "warm, human, the end of a long day — this is where five companies are being built",
  "constraints": "no people, no text, no logos"
}
```

## 8 — Season II `[outro]`

`images/img-8-season-two.png`

```json
{
  "type": "minimal conceptual image",
  "subject": "a single blinking terminal cursor rendered as a small vertical bar of gold light, alone in a vast black field",
  "setting": "pure void",
  "lighting": "the cursor is the only light, with a faint bloom",
  "palette": "near-black and gold #d4a017 only",
  "camera": "centred, distant, tiny subject in a large empty frame",
  "mood": "waiting to be told what happens next",
  "constraints": "no people, no text, no UI chrome, extreme negative space"
}
```

---

## Fallback — if you ever want it via API instead

```bash
set -a; source ~/.openclaw/fleet.env; set +a
cat > /tmp/p.json << 'ENDJSON'
{ "prompt": "<paste one JSON block above, as a single string>",
  "image_size": {"width": 1920, "height": 1088},
  "quality": "medium", "num_images": 1, "output_format": "png" }
ENDJSON
curl -s -X POST "https://fal.run/openai/gpt-image-2" \
  -H "Authorization: Key $FAL_KEY" -H "Content-Type: application/json" -d @/tmp/p.json
```

`1920×1088` because both dimensions must be multiples of 16 — 1080 is not. Crop 8px, or
render 16:9 preset and upscale. Download the returned URL immediately; Fal links expire.
