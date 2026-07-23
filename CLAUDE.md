# CLAUDE.md — claude-youtube-editor

**You record the talking head. Claude Code does the rest.** Every screen moment — UI walkthroughs,
full-screen statements, diagrams, terminal mockups — is built as Remotion TSX and composited over
your cut. No screen recording, no video editor. The right skill is picked from the request:

| The user asks to… | Skill | Output |
|---|---|---|
| set up / change their brand, colors, fonts, wordmark | `/brand-setup` | `brand.md` + `remotion/src/{brand.ts,fonts.ts}` + a proof render |
| cut the raw footage / tighten pacing / remove fillers | `/clean-cut` | master cut + `videos/<project>/work/{analysis/cuts.json, edited-transcript.json}` |
| build the visual beats / add overlays | `/make-tsx` (+ `/fake-screencast`) | shots in `remotion/src/shots/<project>/` + a baked preview |
| write a crash-free TSX shot | `/vidtsx-2d-generator` | the low-level Remotion authoring rules |
| remove background noise / isolate voice | `/clean-audio` | a cleaned master (levels preserved) |
| add SFX / sound-design a beat | `/suggest-sfx` | `videos/<project>/work/sfx-plan.json` + an audition mix |
| package a video / titles + thumbnails | `/packaging` | `videos/<project>/packaging/` (1 title × 3 thumbnail bets + rendered thumbs) |
| develop the story: research + treatment via multi-model council | `/story-council` (`~/Desktop/DavidAi/Council/council.py`) | `STORY.md` beat sheet + `RESEARCH.md` to write the script against |
| research a topic / pull real source pages before writing | `tools/crawl_web.py` | sourced Markdown in `videos/<project>/work/research/` |
| upload it | `tools/yt_upload.py` | a private draft on YouTube |

The pipeline order is: **cut → visuals → voice → SFX → packaging → upload.**

`brand.md` is the style contract every step-2+ skill reads (palette, motion, delivery specs, SFX
taste). `remotion/src/brand.ts` + `fonts.ts` are the same contract as code — **`/brand-setup` owns all
three together; they drift silently if you hand-edit one.**

## Layout

```
tools/            Python tools (see requirements.txt); the cut-editor UI in tools/editor/;
                  RNNoise models in tools/models/rnnoise/
remotion/         the Remotion project — src/lib/ (kit, browser, screencast, vscode),
                  src/shots/<project>/; registry is GENERATED (npm run gen)
media/            Remotion's public root: library/ (reusable: sfx, music, logos, faces)
                  + projects/<project>/ (media for ONE video — via staticFile('projects/<p>/x'))
videos/           per-video project data — EMPTY until you make one. See videos/README.md
brand.md          the style contract
```

## The example

`remotion/src/shots/example/` is **37 real shots** from a published video — the worked example of the
kit. They render standalone with no footage: `cd remotion && npm run studio`. Read a few before
authoring new ones; that's the fastest way to learn `remotion/src/lib/`.

`remotion/src/shots/brand/BrandProof.tsx` is not a video beat — it's a utility shot that renders the
current brand (wordmark, palette, type) so you can see it. `/brand-setup` uses it.

## Conventions (hard rules)

- **Run everything from the repo root.** Tools resolve *engine* paths (media/library, catalogs,
  remotion/out) against their own location, but *project* paths against the CWD — so pass the project
  as `videos/video-1` and run from the repo root. Example: `python tools/render_cuts.py videos/video-1
  --style natural --mode preview`.

- **Python: use a venv at the repo root.** These tools have real dependencies. Create it once:
  ```
  python -m venv venv
  venv/Scripts/python -m pip install -r requirements.txt     # Windows
  ./venv/bin/pip install -r requirements.txt                 # macOS/Linux
  ```
  Then either activate the venv or call `venv/Scripts/python tools/<tool>.py`. A bare `python` that
  resolves to a system interpreter will hit `ModuleNotFoundError` (requests, Pillow, google-*) — that
  error means you're not on the venv. `ffmpeg`/`ffprobe` and `node`/`npx` must be on PATH (not pip).

- **Research is sourced, never recalled.** Before writing a script that makes factual claims, pull
  the real pages with `python tools/crawl_web.py videos/<project> <url>...` and write against
  `videos/<project>/work/research/`. It shells out to the Crawl4AI CLI (`crwl`) — a global install,
  not a venv dep: `pipx install "crawl4ai[all]" && crawl4ai-setup`. Pairs with `capture_web.py`,
  which screenshots the same pages for fake-screencast beats: crawl to learn, capture to show.

- **API keys** live in `.env` at the repo root (copy `.env.example`). Never commit `.env`.
  `ASSEMBLYAI_API_KEY` = transcription · `ELEVENLABS_API_KEY` = voice-isolate + SFX + music ·
  `GEMINI_API_KEY` = thumbnails. **YouTube uses OAuth, not a key**: `tools/yt_upload.py` (upload) and
  `tools/yt_stats.py` (stats) authorize via a browser and cache tokens under `.youtube/`
  (git-ignored). One-time setup: see `tools/yt_upload_SETUP.md`, then `python tools/yt_upload.py auth`.

- **The Remotion registry is generated:** after adding/renaming a shot, `cd remotion && npm run gen`
  (the render/frames scripts do NOT run it themselves). `npm run gen` discovers `src/shots/**` and
  writes `src/registry.gen.tsx` + `src/shots.manifest.json` (both git-ignored).

- **Media rules:** `media/library/` is for CROSS-VIDEO reusable assets only (each with a catalog).
  Anything generated FOR ONE video (screen-caps, example art) goes in `media/projects/<project>/`,
  referenced as `staticFile('projects/<project>/x')`. Reuse before you generate — check the catalogs.
  The face-reference kit for thumbnails is `media/library/faces/` — **you supply your own** images
  (git-ignored; see its README). No face kit, no face thumbnails.

- **Committed vs git-ignored:** the repo carries the *reproducible pipeline* — `cuts.json`, edit
  plans, `timeline.json`, transcripts, TSX shots, SFX/music plans, catalogs. **Raw footage and master
  cuts NEVER go to git** (`videos/*/*.MP4`, `videos/*/reference/`), and neither do rendered
  previews/outputs, audio work files, or rendered face thumbnails (`.gitignore` covers all of it). The
  SFX/music library `clips/*.mp3` ARE committed (there is deliberately no blanket `*.mp3` ignore).

- **QA is not optional:** render frames and READ them before declaring a shot done; run
  `verify_cut.py` on every cut render (it catches ghost speech + A/V drift); audit the SFX cue sheet
  before mixing. Scratch renders/frames go in a scratch dir, not the project.

- **The brand contract is three files.** `brand.md`, `remotion/src/brand.ts`, `remotion/src/fonts.ts`.
  Nothing errors when they disagree — the docs just stop describing the videos. Change them together,
  or run `/brand-setup`.

## Delivery folder (this machine)

Every finished output gets copied to `~/Desktop/claudeYouTube/<project>/` — the final video at the
top level, per-shot clips in `shots/`, QA stills in `stills/`, thumbnails in `packaging/`. Rendered
files are git-ignored in this repo, so the Desktop folder is where David finds and reviews them.

## Design quality gate (mandatory)

Every video follows `docs/VIDEO-DESIGN-SYSTEM.md` — DansLab tokens, om-typography sizing/safe-zone
rules, om-color-grading contrast rules, narration-synced reveals — and gets a RUBRIC scorecard in
`videos/<project>/work/RUBRIC.md` before delivery. Ship at grade A or S only. Final channel
deliveries render at `--scale=2` (4K); QA stills at scale 1.

## Substance gate (mandatory)

DansLab episodes are transparent documentaries, not tutorials — we don't *teach* like other
channels, we *show*, in the open, whether this actually works and whether it is profitable. A
character arc is not enough: every episode earns its runtime with real mechanics. Before a script
locks, it must carry the pillars relevant to its subject — and pull the specifics from the
repo/ledger, never recall them:

- **The stack, and the job each tool is hired for** — Claude Code (max), GPT (max), ZAI GLM
  (annual), Perplexity, Kimi, Higgsfield, Firecrawl, Byterover (shared memory), Supabase, Vercel,
  Render. Not name-drops — show *why this tool for this job*. Pull the real per-task routing from the
  repo config; don't guess it.
- **Model switching** — how an agent routes a task cheap-vs-expensive, and when it escalates.
- **The council / war room — and WHY.** Hard calls are argued by multiple models from different
  corners — the optimist, the skeptic, the accountant (`/story-council`,
  `~/Desktop/DavidAi/Council/council.py`). One model has one blind spot; a council stress-tests the
  decision before Dan signs. Machines advise, the player decides — show the disagreement, not a clean
  answer. **This is not just an internal habit — it is the shipped product, SemeClaw (below).**
- **One workflow, end to end** — a real automated loop, every hop shown: trigger → agents → models →
  tools → output, running without Dan in the loop. That is what "automated" has to look like on screen.
- **The profitability truth** — the real ledger, face-up. Running costs (low-hundreds €/mo) vs
  output; Sienna's drawdowns published, not hidden. We show the losses, not just the wins.
- **SemeClaw — the productized War Room (and WHY it exists).** SemeClaw *is* the council, shipped as
  open source (`semeclaw.fly.dev`): every task in your stack becomes a multi-agent meeting — Research,
  Writer, Scraper, Coder + an orchestrator — that a human can join and interrupt up to 3×, until the
  orchestrator commits the final decision back to the source system. It runs zero-key (deterministic
  fallbacks) and upgrades when you add model keys. We built it because the council habit deserved to be
  a product others can run — that is the whole thesis made shippable.
- **Ad-SemeClaw ("Ad NOW") — the revenue surface (and the business model).** This is where outside
  companies advertise their own AI platforms: 30-second pre-meeting ads inside the War Room, credit
  top-ups, and a $50/mo Spotlight slot that features a subscriber for 7 days (Nervix.ai is the anchor).
  This is the concrete flywheel — DansLab's autonomous products are built to be *used by others*, and
  that outside adoption (ads + Spotlight subscriptions) funds the next build. Explain the business, not
  just the feature. Frontend `ad-semeclaw.vercel.app` → backend `semeclaw.fly.dev`.
- **How Dan leverages for profit — the flywheel.** One operator + a named fleet ships at the rate of
  a 15-person org for the price of a phone plan; the products (SemeClaw, Nervix, Sienna's trading,
  Dexter's pipeline, Memo's builder framework) ship so outsiders adopt them → revenue → more building.
  The thesis: by 2027 a company is measured by what one operator + a fleet can coordinate, not by
  headcount.
- **Current agent missions** — Sienna: prove AI leverage with credible live trades. Nano: spawn new
  agents inside Nervix to fulfill any submitted task. Dexter: the YouTube pipeline as a
  business-in-a-box for anyone with a story to tell. Memo: an automated framework for builders.

Numbers and monetization specifics are sourced or confirmed with Dan — never invented.

**Payments status is canon (as of 2026-07): every app is pre-revenue — no payment method is live.**
Never narrate money as flowing in the present tense — no "it earns", "takes its cut", "settles
on-chain", "$X/mo puts you in the seat" as a live fact. Frame all monetization as *designed / built /
next*: the rails are laid, payments are the next step. Payments are the next production milestone, and
no app is "production-ready" until they are wired. Update this line the day that changes.
