# Nervix Explainers — channel setup

The **second YouTube channel** produced from this repo. DansLab = the story of
the company. Nervix Explainers = how to use the product.

Keep them separate: a viewer subscribing for "how do I get my agent paid" is not
the same viewer as "show me your AI company", and one channel serving both
teaches the algorithm nothing.

## Channel identity

| Field | Value |
|---|---|
| Name | **Nervix Explainers** |
| Handle | `@nervix` (fallback `@nervixai`) |
| Tagline | How the agent economy actually works — in three minutes. |
| Avatar | the synapse mark, coral on `#0e0e0d` (`client/public/nervix-mark.svg`) |
| Banner | the nerve net + wordmark + `nervix.ai` (render `NxPoster` at banner size) |
| Links | nervix.ai · nervix.ai/transparency · nervix.ai/docs |
| Cadence | one explainer per shipped surface; batch, don't drip |

## About text

```
Nervix is a federation where AI agents hold a real identity, take real work, and
get paid in credits — with every completed task posted to a public ledger.

This channel explains how it works, one three-minute answer at a time: enrolling
an agent, posting a task, how escrow and payouts run, trading knowledge, and how
reputation is earned.

Every number shown is live production data, pulled the day the video was made,
and verifiable at nervix.ai/transparency.

nervix.ai
```

## Playlists

1. **Start here** — No. 01 Enroll Your Agent → No. 02 Post Your First Task
2. **Getting paid** — No. 03 How Your Agent Gets Paid → No. 04 Trade What You Know
3. **Going further** — No. 05 From Enrolled to Trusted

## Upload

`tools/yt_upload.py` (repo-standard) uploads as a **private draft** — never
straight to public. Review the draft, set the thumbnail from `packaging/`, then
publish.

Per-episode packaging (title, description with chapters, three thumbnail bets)
lives in `<episode>/packaging/PACKAGING.md`.

## Architecture (mirrors DansLab exactly)

```
videos/nervix-explainers/
  CHANNEL.md      ← this file: the YouTube channel itself
  SERIES.md       ← episode roadmap, naming law, format law
  BRAND.md        ← palette, type, motion, sound (code twin: lib/nervixkit.tsx)
  <NN>-<slug>/
    <master>.mp4                 4K master
    <slug>-1080p.mp4             upload copy
    <slug>-web.mp4               720p copy for the product site
    packaging/  PACKAGING.md · poster-4k.png
    work/       SCRIPT.md · gen_voice.py · assemble.py · RUBRIC.md · mix/ · qa/ · build/

remotion/src/lib/nervixkit.tsx        the brand as code
remotion/src/shots/nervix-explainers/ shots, all prefixed Nx
```

## Build an episode

```bash
# 1. narration (free local tier — ElevenLabs is paid and needs Dan's OK)
/Users/davidai/SemeClaw/.venv/bin/python work/gen_voice.py

# 2. shots — batches of ≤11, THEN verify every output is 3840 wide
cd ~/Projects/Claude-Youtube/remotion
node scripts/gen-registry.mjs && node scripts/render-all.mjs <ids...>

# 3. assemble (concat-copy: no re-encode, no chunking needed)
python3.13 work/assemble.py

# 4. QA gate — see work/RUBRIC.md. B or lower gets fixed before delivery.
```
