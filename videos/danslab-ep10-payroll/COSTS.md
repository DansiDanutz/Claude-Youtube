# EP10 — Cost ledger & assumption register

Every number spoken in the episode traces to this file. Verified items came out of your
own config; assumed items are market list prices I could not confirm without invoice access.

**If you correct an assumed price, re-run `model.py` — every downstream figure moves.**

---

## 1. Verified from your system

| Fact | Value | Source |
|---|---|---|
| Droplet count & sizes | dexter 8GB · memo 16GB · sienna 8GB · nano 8GB, all Frankfurt | `SYSTEM.md` §1 Team, §2.1 |
| Core team size | 8 agents (David, Hermes, Dexter, Memo, Sienna, Nano, Doctor, Finance) | `DANSLAB-OS.md` §1 |
| Agents defined in config | 76 | `~/.openclaw/openclaw.json` → `agents.list` |
| Agents onboarded in ecosystem | 39 | `SYSTEM.md` §0.11 Stage A |
| Enabled cron jobs | 77 of 81 | `~/.openclaw/cron/jobs.json.migrated` |
| Cron executions / month | ≈ 4,512 | computed from cron expressions |
| LaunchAgent plists installed | 242 | `~/Library/LaunchAgents` |
| LaunchAgents loaded | 122 | `launchctl list` |
| Model Agent adapters | 19, across 3 tiers | `SYSTEM.md` §0.8 |
| Routing law | Free → Local → Subscription → API last | `SYSTEM.md` §0.8 |
| Paid-API caps | $2 soft / $5 hard / $1 per agent per day | `fleet-routing-policy.json` v3.1 |
| Cheap-model-primary inversion | `"primary":"moonshot/kimi-k2.6"` w/ Claude in fallbacks | `openclaw.json` (main, david, paperclipdavid) |
| Anthropic accounts | 2 (seme :8999, semebitcoin :8998) | `SYSTEM.md` §0.8, §2.4 |
| ChatGPT lane | codex-proxy :8995 | `SYSTEM.md` §2.4 |
| GLM is a yearly sub | `zhipu-glm5` — "z.ai yearly: glm-5/4.7" | `SYSTEM.md` §0.8 |
| Kimi is the Alegro plan | `kimi-moonshot` — "Alegro subscription tier" (Moonshot Pro). The disabled `kimi-aliyun` DashScope account is the one in arrearage — not this. | `fleet-routing-policy.json` L200/L212, `SYSTEM.md` §0.8 |
| The June 29 outage | `should_mark_done_for_read_only` hardcoded `return False` | `DANSLAB-OS.md` changelog v1.2 |
| Backup job producing nothing | `com.danslab.paperclip-pg-backup` | `SYSTEM.md` §0.3 |
| Closure target vs actual | 40/day target; ~5/day at baseline (12%) | `SYSTEM.md` §1 |
| Anthropic Max tier | $200 × 2 | **confirmed by Dan 2026-07-25** |
| ChatGPT Pro tier | $200 | **confirmed by Dan 2026-07-25** |
| z.ai GLM | $360 paid a year in advance → $30/mo | **confirmed by Dan 2026-07-25** |
| Kimi plan | Alegro / Moonshot Pro, $20/mo | **confirmed by Dan 2026-07-25** |

## 2. Assumed — needs your confirmation

| Item | Assumed | Risk if wrong |
|---|---|---|
| Mac Studio purchase | $5,500 | ±$1,000 moves monthly total by ±$28 |
| Mac Mini purchase | $800 | negligible |
| Amortisation window | 36 months | shorter window raises monthly cost |
| DO 8GB droplet | $48/mo each | ±$8 each = ±$24/mo |
| DO 16GB droplet | $96/mo | premium tiers cost more |
| Supabase / Vercel | $25 / $20 | small |
| Perplexity · Firecrawl · Kilo · Manus · ElevenLabs | $20 · $16 · $20 · $39 · $22 | ±$50 combined |
| Domains & misc | $15 | small |

**Not counted:** electricity, internet, Tailscale (free tier assumed), Higgsfield or any
paid generation credits, and Dan's own time. Electricity for a always-on Mac Studio plus
Mac Mini is realistically $15–30/mo in the EU — if you want it in, say so and I'll add it.

## 3. Human comparison basis

- Salaries are mid-market European/US blended for the named role.
- Loaded at **×1.30** for employer tax, benefits, equipment, and overhead.
- Human month = **160 h**. Agent month = **720 h** (24/7).

| Seat | Salary | Loaded /mo | $/h |
|---|---|---|---|
| Hermes — chief of staff / strategy | $160,000 | $17,333 | $108.33 |
| David — orchestrator / eng manager | $145,000 | $15,708 | $98.18 |
| Doctor — SRE, 24/7 on-call | $140,000 | $15,167 | $94.79 |
| Dexter — senior backend + DevOps | $135,000 | $14,625 | $91.41 |
| Sienna — crypto dev + QA | $120,000 | $13,000 | $81.25 |
| Memo — automation eng / PM | $110,000 | $11,917 | $74.48 |
| Nano — platform / agent eng | $110,000 | $11,917 | $74.48 |
| Finance — FinOps analyst | $95,000 | $10,292 | $64.32 |
| **Total** | **$1,015,000** | **$109,958** | **$85.90 blended** |

## 4. Attribution method (why rates differ per agent)

1. **Direct** — each droplet agent carries its own droplet cost. Mac amortisation ($175)
   splits across the four Mac-resident agents.
2. **Shared** — model subscriptions ($650) and tools ($177) split by each agent's real
   share of scheduled cron runs.

That second key is what makes Hermes expensive and Dexter cheap: Hermes fires 189 scheduled runs a month, Dexter 30.

| Agent | $/mo | $/agent-h | human $/h | multiple |
|---|---|---|---|---|
| dexter | $88 | $0.122 | $91.41 | 749× |
| sienna | $88 | $0.122 | $81.25 | 666× |
| nano | $88 | $0.122 | $74.48 | 610× |
| finance | $135 | $0.188 | $64.32 | 342× |
| memo | $136 | $0.189 | $74.48 | 395× |
| doctor | $203 | $0.282 | $94.79 | 336× |
| david | $209 | $0.290 | $98.18 | 339× |
| hermes | $295 | $0.410 | $108.33 | 264× |
| **fleet** | **$1,242** | **$0.216** | **$85.90** | **398×** |

## 5. The three savings numbers

| | Basis | Human value/mo | Saved/mo | Multiple |
|---|---|---|---|---|
| A — naive | 8 heads, 160 h | $109,958 | $108,716 | 89× |
| B — coverage | ×4.5 (720 h vs 160 h) | $494,813 | $493,571 | 398× |
| **C — honest ★** | ×4.5 coverage × 40% throughput | **$197,925** | **$196,683** | **159×** |

The 40% throughput discount is a judgement call, defended in the episode by three facts:
the 12%-of-target closure rate, the existence of a dedicated QA seat, and the bounce-back
rate implied by the evidence gate. Move that dial and C moves with it —
at 30% it's 119×, at 50% it's 199×.

---
_Generated 2026-07-25, revised with Dan's confirmed subscription tiers · rerun `python3 model.py` after any price correction._
