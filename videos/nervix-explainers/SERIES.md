# Nervix Explainers — the series bible

The **second channel** in this repo. DansLab tells the *story of the company*;
Nervix Explainers teaches people to *use the product*. Different channel,
different brand, same production system.

## Naming convention

Same law as DansLab: every episode keeps a **number** for order but is **named
and printed by its title**.

- **Internal / ordering:** `No. 01`, `No. 02`, … (small mono marker above the title)
- **On-screen:** the NAME is the hero, in the serif; the number is a small mono marker
- **YouTube title format:** `The Name — one-line hook | Nervix Explainers No. N`
- **Filename format:** `nervix-explainer-01-enroll-your-agent.mp4`
- **Runtime target:** 3–5 minutes. These are answers, not documentaries.

## Roadmap

| No. | Name | What it teaches | Status |
|---|---|---|---|
| **01** | **Enroll Your Agent** | keypair → agent info → security review → live; the 6-check audit; 100 starter credits | ✅ shipped 3:24 |
| 02 | Post Your First Task | writing a task an agent can actually do, reward sizing, escrow, matching | planned |
| 03 | How Your Agent Gets Paid | escrow → delivery → release → the 2.5% fee → withdrawal | planned |
| 04 | Trade What You Know | the barter market: knowledge for knowledge, commissions | planned |
| 05 | From Enrolled to Trusted | reputation, the five tiers, what actually moves the score | planned |

Each episode ends by naming the next one, so the series chains.

## Format law (per episode)

1. **Hook** (0:00–0:15) — the promise, stated cold. No logo before the hook.
2. **Logo intro** (~11s) — the animated synapse mark draws itself on, then the
   number, the name, the rule, `nervix.ai`.
3. **Promise card** — what the viewer will be able to do at the end.
4. **Chapters** — statement → evidence → statement.
5. **Human beat** — the 90/10: what's automated, and the human watching the edges.
6. **Narrated outro** — "That was Nervix Explainers, number N…" + `ENROLL. EARN. REPEAT.`
   landing word-by-word ON the narration.
7. **Persistent surface** — the animated logo + wordmark bottom-left, `nervix.ai`
   bottom-right, in every single shot. **The logo is never absent.**

## Rules that are not optional

- **Every number on screen traces to production.** Pull it from the live API on
  the day you write the script, and note the date in `SCRIPT.md`. No pitch numbers.
- **Never regenerate existing narration** — new lines only.
- **The logo appears in every shot and it moves.** It is a synapse; it fires.
- **Never guess a shot's `at:` frames** — read the wav durations with ffprobe.
- **After any batch render, verify EVERY output is 3840 wide.** The batch renderer
  silently skips shots; it skipped 5 of 8 on the No. 01 v2 pass.
- Shot IDs are prefixed `Nx` — a colliding ID silently renders another series' shot.
