# EP10 — publish pack

## Title

Pick one. Ranked — the first leads with the number, which is the whole draw.

1. **I Run a Company With 8 Employees. It Costs $1,242 a Month.**
2. **My 8 AI Employees Cost $0.22 an Hour. A Human Costs $86.**
3. **What 8 AI Agents Actually Cost — I Opened the Books**
4. **The $1.3 Million Company That Runs on $1,242**

Series-consistent alternative if you'd rather stay in the house style:
**DansLab No. 10 — The Payroll**

## Thumbnail

Two numbers, stacked, the series serif on the black starfield:
`$1,319,500` struck through in coral, `$1,242` beneath in gold.
No face, no arrows. The whole channel is restraint — keep it.

Second option: the Hermes ledger row blown up, gold-highlighted, with `$0.41/hr` huge.

## Description

```
Nine episodes ago I started documenting an autonomous company — eight AI agents running
24/7 across a Mac Studio and four servers in Frankfurt.

Nobody ever asked what it costs.

This is the invoice. Every machine, every subscription, every worker, with a real human
salary next to each one. I build the savings number three ways and then attack my own
maths until only the defensible one is left.

It isn't the number you'd put in a thumbnail. It's 159×.

Then I put the two companies side by side — a real eight-person company with office,
laptops, software seats, accounting and recruitment against this one. The overhead alone,
before a single salary, is nine times what the whole AI company costs to run.

I also audit the architecture honestly — including the two places it's quietly broken,
and the one-line change that silently killed the company's output for days without a
single alarm firing.

Full cost ledger, including which figures are confirmed and which are estimates:
in the pinned comment.

—
00:00  The question nobody asked
00:30  The rules of the audit
01:17  The iron — two Macs, four servers
03:23  What the brain costs
05:59  The plumbing
07:11  The payroll, cheapest worker first
12:07  The reckoning — 89×, 398×, and the honest number
13:49  Is it actually well built?
18:01  The two companies — human vs DansLab
20:14  Why he burns it

—
DansLab is a series about an autonomous company that builds and ships on its own.
Season 1: The Origin · The Survivors · The Trader · The Overseer · The Brain ·
The Marketplace · The Factory · The Studio · The Player
```

## Pinned comment

```
Full cost ledger, with every assumption marked:

CONFIRMED — 2× Anthropic Max @ $200 · ChatGPT Pro @ $200 · z.ai GLM $360/yr prepaid
($30/mo) · Kimi Alegro (Moonshot Pro) $20/mo · droplet sizes 8/16/8/8GB Frankfurt

ESTIMATED — hardware prices, 36-month amortisation, DO rates, and the tools block
(Supabase, Vercel, Perplexity, Firecrawl, Kilo, Manus, ElevenLabs). Worst case those
move the total ±$75.

NOT COUNTED — electricity, internet, and my own time.

The 40% throughput discount in the honest number is a judgement call. At 30% it's 119×,
at 50% it's 199×. Argue with me about that one — it's the only figure in here that's
opinion rather than arithmetic.
```

## Tags

`ai agents, autonomous agents, ai company, claude code, agent orchestration, ai
infrastructure, digitalocean, mac studio, llm routing, ai cost, openclaw, solo founder,
ai employees, model routing, devops`

## Community post (day of)

> Eight employees. 720 hours a month each. $1,242 total.
> I opened the books on all of them today — including the two places it's broken.
> New one is up.

## Short / clip candidates

1. **The inversion** (60s) — the cheap model is *primary*, the $400/mo lane is the
   fallback. Strongest standalone idea in the episode.
2. **Nano** (30s) — an AI agent whose job is hiring AI agents. The recruiter is the product.
3. **The silent death** (45s) — one line returns `false`, output goes to zero, every
   dashboard stays green. Best hook of the nine.
4. **The org chart nobody designed** (40s) — the cost ladder matches a human org chart;
   deciders cost more than workers.
