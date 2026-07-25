# DANSLAB · NO. 10 · SPECIAL — "THE PAYROLL"
### Runtime target 21:30 · VO ≈ 3,050 words @ ~145 wpm
### The longest episode of the series. Season 1 averaged ~10 min; this is the double-length special.

**Where this sits in the series**

| No. | Title | Runtime | Covered |
|---|---|---|---|
| 01 | The Origin | 10:19 | Dan, the lab, the thesis: AI *is* the company |
| 02 | The Survivors | 5:43 | how the fleet was born — the hacking arc, Dexter survives |
| 03 | The Trader | 9:10 | **Sienna** — risk metric, the 59% exit, Zmarty |
| 04 | The Overseer | 10:03 | **Paperclip** — the control plane; ends on Hermes becoming the Brain |
| 05 | The Brain | 10:33 | **Hermes** — judgment, scoring, routing, learning |
| 06 | The Marketplace | 11:03 | **Nervix** — earn / hire / barter |
| 07 | The Factory | 7:20 | **this pipeline** — script → voice → scenes-as-code → render |
| 08 | The Studio | 7:06 | the Mac Studio + **David**, the resident right hand |
| 09 | The Player | 19:38 ⚠️ | **Dan himself** — the finale |
| **10** | **The Payroll** | **21:30** | **the invoice for all of it** |

⚠️ Ep09 exists as two different cuts: 4K is 19:38, 1080P is 12:46. Resolve before quoting it.

> Subjects verified against `~/Projects/Claude-Youtube/docs/SERIES.md` (the series bible)
> on 2026-07-25. All callbacks below are now sourced, not inferred.

**The frame:** Season 1 introduced the workers. This special does the thing no one does —
it opens the books on them. That's why it's the only episode that earns double length,
and why the tease at the end points at Season 2, not at a product explainer we already made.

**Legend** — `[VO]` narration · `[SCR]` screen capture · `[BR]` b-roll · `[HUD]` overlay state ·
`[SFX]` sound · `[BEAT]` silence

The HUD is `hud.html` — top-right, on screen 0:30 → end, never resets.
Open a specific beat with `?state=N`. Record with `?bg=transparent` for compositing.
Title plate is `title-card.html`. Cost assumptions and what still needs Dan's confirmation
are in `COSTS.md`.

---

## COLD OPEN — 0:00 → 0:30
> *Three times Dan has said this has to be exceptional. The rule: a claim in the first
> three seconds that the viewer refuses to believe, then proof, then the question, then
> the number, then a promise of damage. No insider language until the hook has landed.*

`[SFX]` A single mechanical relay click in silence. Nothing else.

`[SCR]` Black. Hold one full second. Let them think the video is broken.

`[VO]`
> Eight employees work for this company.

`[SCR]` Hard cut — the eight desks. Every screen lit. Every chair empty. Slow push in.

`[VO]`
> None of them are human.

`[BEAT]` One second. Let the room speak.

`[VO]`
> Never taken a day off. Never asked for a raise. Never been paid —
> not one of them has a bank account.

`[SCR]` Snap montage — the nine title plates, 0.28s each, hard cuts, no dissolve.
`plates/ep01…ep09.png`

`[SFX]` Music enters on the first plate — low, four-on-the-floor, building.
No narration here. Nine cuts and a bassline do the work.

`[SCR]` Everything cuts to black. Music drops out. One frame of pure silence.

`[VO]`
> Nobody has ever asked what they cost.

`[SCR]` `cards/card-1.png` — the coral figure punches in first, alone.

`[VO]`
> Eight humans in those seats: one point three million a year.

`[SCR]` A coral line strikes through it. The gold figure drops in beneath.

`[VO]`
> He pays one thousand, two hundred and forty-two.

`[BEAT]` Hold three seconds. Music re-enters underneath, quieter.

`[VO]`
> Tonight, the books — and the two places this company is quietly broken.

`[SCR]` TITLE PLATE — `title-card.png`

## 0:30 → 1:40 — THE RULES OF THE AUDIT

`[HUD]` **STATE 01 — boot.** Cards fade in top-right, values at `—`, scan line sweeps, they populate at zero.

`[VO]`
> Top right corner. That panel stays for the next twenty minutes and it never resets.
>
> Every time I name a piece of this company, its cost goes in. Every time I bring out a
> worker, I put a real human salary beside them — what you'd actually pay a person to hold
> that exact seat, with tax and benefits on top.
>
> Two columns. What Dan pays. What a human costs.

`[BEAT]`

`[VO]`
> And one rule, so this doesn't turn into an advert.
>
> I'm going to build the savings number honestly, and then I'm going to attack my own
> maths — publicly — until only the number I can defend is left standing. It will be
> smaller than the one you'd put in a thumbnail. It's the only one worth anything.
>
> Start where every company starts. With the iron.

---

## CHAPTER 1 — THE IRON · 1:40 → 4:30

`[BR]` Slow push on the Mac Studio. Silence. LED. Code reflected in aluminium.

`[VO]`
> The head office. It's a Mac Studio, and it sits on a desk in Dan's room.
>
> Not a metaphor for a head office. It *is* the head office. Every decision this company
> makes passes through this box.

`[SCR]` `ollama list` — twelve models. Then LM Studio holding a thirty-billion parameter model.

`[VO]`
> Twelve local AI models resident at once. Qwen. DeepSeek. Gemma. A thirty-billion
> parameter model held hot in memory, waiting. That tells you the spec without reading a
> receipt — this is a maxed machine, around five and a half thousand dollars.
>
> Now the mistake people make: they drop five and a half thousand into the monthly column
> and call the whole thing unaffordable. That's not how hardware works. You amortise it
> across the three years it will actually run.

`[HUD]` **STATE 02.** Spend `$0 → $153`. Sub: `Mac Studio · $5,500 ÷ 36 mo`

`[VO]`
> A hundred and fifty-three a month. That's the head office.

`[BR]` The Mac Mini, tucked beside a monitor.

`[VO]`
> Beside it, a Mac Mini — Dan's own seat. The human console, where he reads and says yes
> or no. Eight hundred dollars, same three-year spread.

`[HUD]` **STATE 03.** `$153 → $175`.

`[VO]`
> Twenty-two dollars a month. Head office and CEO's desk together cost less per month
> than a cheap phone plan.

`[BEAT]`

`[SCR]` DigitalOcean console — four droplets, all green, all Frankfurt.

`[VO]`
> But the head office doesn't do the work. The work happens in a Frankfurt data centre.
>
> Not one big server — four separate ones, deliberately. Dexter. Memo. Sienna. Nano.

`[SCR]` Zoom each row: `dexter 8GB` · `memo 16GB` · `sienna 8GB` · `nano 8GB`

`[VO]`
> Three eight-gigabyte boxes at forty-eight dollars a month. Memo gets sixteen gigabytes
> at ninety-six, because Memo runs the automation engine and automation eats memory.
>
> Two hundred and forty dollars for four permanent workers' worth of compute.

`[HUD]` **STATE 04.** `$175 → $415`. Card flashes gold.

`[VO]`
> And here's the question worth asking. Why four? Why not one bigger machine — it'd be cheaper.

`[BEAT]`

`[VO]`
> Because these aren't servers. They're people.
>
> Each droplet has its own name, its own memory file, its own job description, and its own
> daily quota — ten closed tickets a day, each. Put them on one shared machine and they
> collapse into one process. Keep them separate and you have a team that can specialise,
> cover for each other, and fail independently.
>
> That's not an infrastructure decision. That's an org chart, built in hardware.

---

## CHAPTER 2 — WHAT THE BRAIN COSTS · 4:30 → 8:15
> No. 05 "The Brain" was **Hermes** — judgment, scoring, routing the board. The Model Agent
> (the cost router on :18900) has never been on screen. This chapter introduces it.

`[SCR]` Terminal: `POST localhost:18900/v1/route {"agent":"dexter","task_type":"code_generation"}` → JSON with tier, provider, model, fallback chain.

`[VO]`
> In episode five you met the Brain. That was Hermes — judgment, deciding what matters.
>
> There is a second brain in this company, and it has never been on camera.
>
> It's a service on port eighteen thousand nine hundred. When any worker needs to think,
> it does not call an AI provider. It isn't allowed to. It calls this.

`[SCR]` Diagram: 8 agents → one box → nineteen adapters in three tiers.

`[VO]`
> Nineteen adapters behind one door, in three tiers, enforcing one law:

`[SCR]` Full screen, each line landing hard:
**FREE → LOCAL → SUBSCRIPTION → PAID API LAST**

`[VO]`
> Free first. Then local. Then subscriptions. Paid APIs dead last, and only when
> everything above has failed.
>
> Tier zero is free — twelve models on the Mac itself, twenty-four more free models through
> OpenRouter, Google's free tier at fifteen hundred requests a day. Cost: zero.
>
> Tier one is the subscriptions. This is where the money actually is.

`[BR]` Four cards dealt onto a table.

`[VO]`
> Two Anthropic Max accounts. Two — deliberately, on separate logins, so when one hits a
> rate limit the second is already warm. Two hundred each.

`[HUD]` **STATE 05.** `$415 → $815`. Sub: `2× Anthropic Max`

`[VO]`
> A ChatGPT Pro account behind a local proxy on port eighty-nine ninety-five, feeding the
> GPT-5 lane. Another two hundred.

`[HUD]` **STATE 06.** `$815 → $1,015`.

`[VO]`
> Then GLM — the Chinese coding subscription. Dan bought a full year up front, which
> works out at thirty dollars a month. And Kimi, on the Alegro plan — Moonshot Pro —
> another twenty.
>
> Those two together: fifty dollars a month.

`[HUD]` **STATE 07.** `$1,015 → $1,065`.

`[BEAT]`

`[VO]`
> Fifty dollars. Against four hundred for the American pair.
>
> And now the move that almost nobody makes. GLM and Kimi are not the backups.

`[SCR]` The real config, highlighted:
`"primary": "moonshot/kimi-k2.6"` → `"fallbacks": ["omniroute/daily-coding","zai/glm-5","claude-balancer/claude-sonnet-4-6", …]`

`[VO]`
> Read the order. The cheap model is *primary*. The four-hundred-dollar-a-month lane is
> the fallback — it only wakes up when the cheap one fails.
>
> That single inversion is why this is affordable at all. Most people building agent
> fleets route everything to the best model and act shocked when the invoice lands. Dan
> routes everything to the cheapest model that can finish the job, and escalates only on
> failure.
>
> Same output. A fraction of the burn.

`[BEAT]`

`[VO]`
> Tier two is raw pay-per-use APIs. OpenAI direct, Google, Perplexity, xAI. They're wired
> in — and they're caged.

`[SCR]` Policy file: `daily_soft_cap: $2 · hard_cap: $5 · per_agent: $1`

`[VO]`
> Two dollars a day soft cap. Five hard. One dollar per agent.
>
> Seventy-six agents are defined in this config and every one of them could theoretically
> reach a metered API. None of them can spend more than a dollar doing it.
>
> The spending limit lives in the nervous system, not in a policy document nobody reads.

---

## CHAPTER 3 — THE PLUMBING · 8:15 → 10:15

`[SCR]` Supabase tables loading. A Vercel deploy going green.

`[VO]`
> Under the brain, the plumbing.
>
> Supabase is the company's memory — where everything that happened is written down.
> Twenty-five a month. Vercel is the front door, where anything customer-facing ships.
> Twenty.

`[HUD]` **STATE 08.** `$1,065 → $1,110`.

`[VO]`
> Then the tools the workers reach for mid-shift.

`[SCR]` Montage — Firecrawl crawling · Perplexity answering with sources · Kilo generating code · Manus running a chain.

`[VO]`
> Firecrawl, sixteen dollars — how the company reads the internet. Not scraping exactly.
> More a research assistant that never gets bored.
>
> Perplexity, twenty — live answers with sources attached, so the fleet can check a fact
> instead of inventing one.
>
> Kilo, twenty — a coding lane. Manus, thirty-nine — an autonomous task runner.
> ElevenLabs, twenty-two — this company can speak, and that endpoint is wired straight
> into the brain at slash-v-one-slash-speech.
>
> Fifteen dollars of domains and miscellany, which every company has and nobody can explain.

`[HUD]` **STATE 09 — LOCK.** `$1,110 → $1,242`. Card pulses gold twice, then holds solid.

`[BEAT]` Hold three seconds.

`[VO]`
> One thousand two hundred and forty-two dollars a month.
>
> That is the entire operating cost of this company. Two Macs, four servers, five AI
> subscriptions, eight tools.
>
> Now — payroll.

---

## CHAPTER 4 — THE PAYROLL · 10:15 → 17:00
> *The spine. Ascending by true hourly rate — cheapest first, climaxing on the most expensive worker.*

`[HUD]` **STATE 10 — payroll mode.** Cards compress; the ledger unfolds beneath, one row per worker.

`[VO]`
> I did something specific with that twelve hundred. I did not split it eight ways,
> because that would be a lie — they don't work equally.
>
> I attributed it. Every server cost goes to the worker living on that server. Every
> shared subscription is split by how much each worker actually runs — measured off the
> real schedule. Seventy-seven live recurring jobs. About four and a half thousand
> executions a month.
>
> So these are real, differentiated rates. Cheapest first.

### 4.1 — THE FRANKFURT THREE · `$0.122/hr`

`[BR]` Three racks, lit. Cut between them rhythmically.

`[VO]`
> Tied at the bottom, three names.
>
> **Dexter.** Senior backend and DevOps — he builds the marketplace backend you saw in
> episode six, runs CrawdBot, owns deployment. Hire that person and you're at a hundred
> and thirty-five thousand a year. Loaded with tax and benefits: ninety-one dollars an hour.

`[HUD]` Row: `DEXTER · $88/mo · $0.122/h · human $91.41/h · 749×`

`[VO]`
> Dexter costs twelve cents an hour. Seven hundred and forty-nine times cheaper than the
> human he stands in for.

`[VO]`
> **Sienna.** Crypto developer and QA — the trader from episode three.
> Right now she's been pulled off it and reassigned to quality control, checking other
> agents' work before it ships. A hundred and twenty thousand a year. Eighty-one an hour.

`[HUD]` Row: `SIENNA · $88/mo · $0.122/h · human $81.25/h · 666×`

`[VO]`
> **Nano.** The agent creator. Episode six showed you the marketplace; Nano is the side of
> it you didn't see — onboarding *other* AI agents into it. Enrollment, CLI, documentation.
> Platform engineer. A hundred and ten thousand.

`[HUD]` Row: `NANO · $88/mo · $0.122/h · human $74.48/h · 610×`

`[VO]`
> Sit with that one a moment. Nano is an AI agent whose job is hiring AI agents.
>
> The recruiter is also the product.

### 4.2 — FINANCE · `$0.188/hr`

`[SCR]` Telegram: the 08:00 cost report and 08:15 revenue report landing.

`[VO]`
> **Finance.** Twice a day, unprompted, this agent posts what the company spent and what
> it earned.
>
> And there's a line written next to Finance's name in the company handbook that I love —
> *must show real numbers, not zero.* Because a finance function reporting zero isn't
> reporting. It's hiding.
>
> A FinOps analyst is ninety-five thousand a year. Sixty-four an hour.

`[HUD]` Row: `FINANCE · $135/mo · $0.188/h · human $64.32/h · 342×`

### 4.3 — MEMO · `$0.189/hr`

`[VO]`
> **Memo.** Automation engineer and project manager — the sixteen-gigabyte box. He runs
> the workflow engine, so when something in this company must happen automatically and
> forever, it lives with Memo.
>
> Something honest here: Memo's own lane is currently frozen. His project was paused and
> he was reassigned to the priority product.
>
> Yes. This company does reorgs.

`[HUD]` Row: `MEMO · $136/mo · $0.189/h · human $74.48/h · 395×`

### 4.4 — DOCTOR · `$0.282/hr`

`[SCR]` Watchdog log scrolling. A red alert firing. An auto-restart succeeding.

`[VO]`
> **Doctor.** Now the rates climb, because Doctor's job is expensive by nature.
>
> Doctor is on call. Every fifteen minutes. Forever. A worker goes into an error state,
> Doctor restarts it. Fails twice, Doctor escalates to Dan's phone with the exact error
> line — and the handbook is specific: not *"something is wrong."* The exact line.
>
> Disk passes eighty-five percent anywhere in the fleet, Doctor runs maintenance before a
> human ever knows.
>
> An SRE with genuine twenty-four-seven on-call is a hundred and forty thousand. Ninety-five an hour.

`[HUD]` Row: `DOCTOR · $203/mo · $0.282/h · human $94.79/h · 336×`

`[VO]`
> And flag the honest version of that: you cannot staff twenty-four-seven on-call with one
> human. You need four or five rotating, or you destroy the one you have.
>
> Doctor is twenty-eight cents an hour and does not rotate.

### 4.5 — DAVID · `$0.290/hr`

`[SCR]` The Paperclip board. Cards moving. Comments landing under David's name.

`[VO]`
> **David.** The resident from episode eight — the one with the house, not a droplet.
> If this company has a manager, it's him.
>
> David assigns work, verifies that finished work has actual evidence attached, and closes
> it — or bounces it back. There's a phrase in the operating manual: *close or escalate,
> no silent in-progress.* David is that phrase, enforced.
>
> Every issue must be touched by David inside twenty-four hours.
>
> An engineering manager is a hundred and forty-five thousand. Ninety-eight an hour.

`[HUD]` Row: `DAVID · $209/mo · $0.290/h · human $98.18/h · 339×`

`[VO]`
> Twenty-nine cents.
>
> And David is why this isn't a toy. Agents without an orchestrator produce *activity*.
> With one, they produce *closure*.

### 4.6 — HERMES · `$0.410/hr` — the most expensive worker in the company

`[BR]` Slower. Darker grade. Music thins to a single sustained note.

`[VO]`
> And then there's Hermes.
>
> Hermes is the most expensive worker here and it isn't close. Forty-one cents an hour —
> more than triple what Dexter costs.
>
> Why?

`[BEAT]`

`[VO]`
> Because Hermes doesn't do the work. Hermes decides what the work *is*.
>
> Every morning at six-thirty, before anything else wakes up, Hermes scopes twelve
> completable tickets for each droplet — twelve, each under two hours. Then Sunday evening,
> the weekly review: what closed versus what actually mattered, next week's focus, and a
> kill-list of tickets that should never have existed.
>
> Hermes is the only worker whose output Dan is *required* to read.

`[HUD]` Row highlights gold: `HERMES · $295/mo · $0.410/h · human $108.33/h · 264×`

`[VO]`
> A chief of staff runs a hundred and sixty thousand. A hundred and eight an hour.
>
> And notice the shape that just formed — because it's the most interesting thing in this
> chapter. The cost ladder in this company runs in exactly the same direction as a human
> org chart. The workers are cheapest. The ones who decide cost the most.
>
> Nobody designed that. It fell out of how much thinking each seat requires.

`[HUD]` **STATE 11.** All eight rows lit. Footer totals animate:
`FLEET $1,242/mo · $0.216/agent-hour — HUMAN $109,958/mo · $85.90/hour`

---

## CHAPTER 5 — THE RECKONING · 17:00 → 19:00

`[VO]`
> So. The number.
>
> Eight humans in those eight seats, loaded with tax and benefits: a hundred and nine
> thousand nine hundred and fifty-eight dollars a month. One point three million a year.
>
> Dan pays one thousand two hundred and forty-two.

`[HUD]` **STATE 12.** Slam: `89×` · Saved fills `$108,716/mo`

`[VO]`
> Eighty-nine times cheaper. And that is the number I'd put in a thumbnail if I wanted to lie to you.

`[BEAT]`

`[VO]`
> Here's why it's a lie in the direction you don't expect. It's too *low*.
>
> A human works a hundred and sixty hours a month. These agents run seven hundred and
> twenty. Four and a half times the coverage. To match that with people you need shifts,
> and shifts mean more headcount — not the same headcount working harder.

`[HUD]` **STATE 13.** Slam: `398×` · Human equivalent climbs to `$494,813/mo`

`[VO]`
> Corrected for coverage: three hundred and ninety-eight times. Half a million dollars a month of
> equivalent labour.
>
> Which is *also* a lie. Because an agent-hour is not a senior-engineer-hour. Not yet.

`[BEAT]`

`[VO]`
> So let me attack my own number in front of you.
>
> These agents get stuck. They produce work that gets bounced back. Their own handbook
> admits the fleet was running at twelve percent of its closure target. There is an agent
> whose entire job is checking the other agents' output — you don't create that seat unless
> you need it.
>
> So I apply a throughput discount. I'll say an agent-hour is worth forty percent of a
> senior human hour. That's harsh. I think it's fair.

`[HUD]` **STATE 14 ★.** B fades out, slowly replaced: `159×` · Human `$197,925` · Saved `$196,683`

`[VO]`
> A hundred and fifty-nine times.
>
> Not four hundred. Not ninety. A hundred and fifty-nine — and that's the one I'll defend
> to anyone.
>
> Dan is buying roughly two hundred thousand dollars a month of real, discounted,
> pessimistically-measured labour, for twelve hundred dollars.
>
> Twenty-two cents an hour against eighty-six.

---

## CHAPTER 6 — IS IT ACTUALLY WELL BUILT? · 19:00 → 20:45
> *The turn. Credibility is earned by attacking what we just praised.*

`[BR]` Grade cools. Music drops to a single low pulse.

`[VO]`
> Now the question this whole series has been avoiding. Is this well architected — or is
> it an expensive magic trick?
>
> I read the system. Here's the honest audit.

`[SCR]` Split screen. Green column fills.

`[VO]`
> **What's genuinely excellent.**
>
> One: the cost router. Free, then local, then subscription, then paid — with hard daily
> caps enforced in code. That's a real engineering answer to the problem that kills every
> other agent fleet.
>
> Two: the evidence rule. *Nothing counts unless a ticket is closed with proof.* Not a
> successful run. Not a heartbeat. Proof. That is the hardest discipline to hold in an
> autonomous system, and here it's law.
>
> Three: the reduction. Seventy-six agents are defined in this config. Thirty-nine were
> fully onboarded with identities and metadata.

`[BEAT]`

`[VO]`
> Eight are running.
>
> Someone sat down and paused thirty-one workers who cost almost nothing to keep. That's
> the hardest decision in the whole system and it's the most correct one — because agents
> don't cost money. They cost *attention*.

`[SCR]` Red column.

`[VO]`
> **What's broken.**
>
> One: a single point of failure, and it's a desk in a bedroom. If that Mac Studio dies,
> the router dies, the orchestrator dies, and four healthy servers in Frankfurt sit there
> with nothing to do. A three-hundred-dollar cloud instance fixes it. It hasn't been done.
>
> Two — and this is the one that should frighten you. On the twenty-ninth of June, one
> function was changed to return `false`. Every read-only task in the company started
> silently piling into an unmonitored queue instead of closing.

`[SCR]` The diff. `return False`. Held on screen.

`[VO]`
> Closures went to zero. Nothing alarmed. Nobody noticed for days.
>
> The company was monitoring *machines* and not monitoring *output*. It could report every
> service healthy while producing nothing at all. That is the most dangerous failure an
> autonomous company has — looking alive while being dead.
>
> To Dan's credit it's a hard-wired alarm now. But it happened.
>
> Three: there's a database backup job that has never produced a single backup. Still open
> in the notes.
>
> Four: two hundred and forty-two background services installed on that Mac, a hundred and
> twenty-two loaded. Nobody holds that in their head. Complexity is a cost and this company
> is paying it.

`[BEAT]`

`[VO]`
> And I want to sit on that fourth one, because it's the thread that ties the other three
> together.

`[SCR]` The cron table scrolling — 77 jobs, agent names, schedules.

`[VO]`
> Seventy-seven scheduled jobs. Four and a half thousand executions a month. Every one of
> them was written by somebody solving a real problem on a real day, and every one of them
> was correct at the moment it was written.
>
> None of them were ever deleted.
>
> That's not laziness. That's the natural physics of a system where adding costs almost
> nothing. A new cron job is free. A new agent is free. A new watchdog is free. So they
> accumulate — and each one is individually justified, which is exactly why nobody removes
> any of them.

`[BEAT]`

`[VO]`
> Now look at what that did on the twenty-ninth of June.
>
> A hundred and twenty-two services were running. Every one reported healthy. Doctor was
> checking machines every fifteen minutes and finding nothing wrong — because nothing *was*
> wrong, mechanically. The processes were up. The disks were fine. The heartbeats landed.
>
> And the company produced nothing for days.
>
> Every alarm in that system was pointed at whether the machinery was turning. Not one was
> pointed at whether anything came out the other end.

`[SCR]` Slow zoom back to the `return False` line.

`[VO]`
> This is the failure mode I'd want anyone building one of these to take away. You will
> instrument uptime, because uptime is easy to measure. Output is harder — it needs a
> definition of *done* that a machine can check, and most people never write one.
>
> Dan actually had that definition. The evidence rule. Closed with proof.
>
> He just never alarmed on its absence.

`[BEAT]`

`[VO]`
> One line. Closures to zero. Every light still green.

`[HUD]` **STATE 15 — verdict card:** `ARCHITECTURE B+` · `economics A · discipline A− · resilience C`

`[VO]`
> My verdict: B plus.
>
> The economics are an A. The operating discipline is an A minus. The resilience is a C —
> and the entire distance between "this is clever" and "this is a real company" sits inside
> that C.
>
> The good news is it's the cheapest of the three to fix.

---

## CHAPTER 7 — THE TWO COMPANIES · 20:45 → 23:00
> *The head-to-head Dan asked for. Two companies, same eight seats, both bills
> added up honestly — including the ones nobody puts in a pitch deck.*

`[SCR]` Split frame begins to build — `cards/card-7.png`

`[VO]`
> Let's put them side by side. Not agents versus humans in the abstract. Two companies,
> same eight seats, same work, both bills added up properly.

`[BEAT]`

`[VO]`
> Start with the human one. Payroll, loaded with tax and benefits: a hundred and nine
> thousand, nine hundred and fifty-eight a month.
>
> But payroll is never the bill. A real company rents desks. Buys laptops. Pays for eight
> software seats, an accountant, a payroll service. And it recruits — because people
> leave, and replacing one costs about a fifth of their salary.

`[SCR]` The overhead column fills, line by line.

`[VO]`
> Office, two thousand eight hundred. Software seats, nine hundred and sixty. Laptops,
> five hundred and fifty-six. Accounting, nine hundred. Recruitment, four thousand three
> hundred. Management and HR, twelve hundred.
>
> Ten thousand, seven hundred and forty-nine dollars a month — before a single salary
> is paid.

`[BEAT]` Hold.

`[VO]`
> Sit with that one. The overhead alone — the part nobody puts in the pitch deck — is
> nearly nine times what the entire other company costs to run.

`[SCR]` Both totals land.

`[VO]`
> All in, the human company: a hundred and twenty thousand, seven hundred a month.
> One point four million a year.
>
> DansLab: one thousand two hundred and forty-two.

`[BEAT]`

`[VO]`
> Now hours — because this is where it stops being a salary argument.
>
> Eight people, forty-hour weeks, minus twenty-five days holiday and six days sick,
> because those are real and they're in every contract. That's one thousand two hundred
> and twenty-one working hours a month for the entire team.
>
> Eight agents, twenty-four seven: five thousand seven hundred and sixty.

`[VO]`
> Four point seven times the hours, for one ninety-seventh of the cost.

`[BEAT]`

`[VO]`
> And I'll hold my own discount, the same one I used earlier. Forty percent throughput —
> an agent hour is not a senior engineer hour.
>
> Apply it honestly, and the agents still deliver two thousand three hundred effective
> hours against the humans' twelve hundred.
>
> Cost per hour of work actually delivered: ninety-eight dollars and eighty-three cents,
> against fifty-four cents.

`[SCR]` The final figure lands alone.

`[VO]`
> A hundred and eighty-three times.
>
> That is the whole argument, and it's the last number I'll give you.

---

## CHAPTER 8 — WHY HE BURNS IT · 23:00 → 23:45

`[BR]` Warm again. Wide: the room, both Macs, one lamp, night outside.

`[VO]`
> So why does a man pay twelve hundred a month to run a company with no employees?
>
> You already know. You watched nine episodes of it.

`[SCR]` The nine title plates return — this time as a grid, holding.

`[VO]`
> A crypto trading platform. An agent marketplace. A crawler. An automation framework.
> And the video studio that produced the episode you're watching right now — that was
> episode seven, the factory that builds this series.
>
> That's not twelve hundred dollars of expenses. That's the entire R&D department for five
> startups at once — for less than one junior developer's coffee budget at a funded company.
>
> And Dan's rule is one revenue loop first. Nothing else opens until one product takes one
> real payment, end to end. Everything else waits.

`[BEAT]`

`[HUD]` **STATE 16 — outro.** Cards compress into a bottom strip holding the four final numbers.

`[VO]`
> Twelve hundred dollars. Eight workers. Seven hundred and twenty hours each.
> Twenty-two cents an hour.
>
> Season one was about who they are.
>
> Season two is about the only number none of them have produced yet.

`[BEAT]`

`[VO]`
> Revenue.

`[SCR]` Cut to black on the beat. End card: **DANSLAB · SEASON II**

---

## APPENDIX A — HUD STATE TABLE

| State | TC | Spend | Human | Saved | Rate |
|---|---|---|---|---|---|
| 01 boot | 0:30 | $0 | — | — | — |
| 02 mac studio | 2:05 | $153 | — | — | — |
| 03 mac mini | 2:40 | $175 | — | — | — |
| 04 droplets | 3:35 | $415 | — | — | — |
| 05 claude ×2 | 5:55 | $815 | — | — | — |
| 06 chatgpt pro | 6:10 | $1,015 | — | — | — |
| 07 glm + kimi | 6:25 | $1,065 | — | — | — |
| 08 infra | 8:35 | $1,110 | — | — | — |
| 09 tools — LOCK | 9:50 | **$1,242** | — | — | — |
| 10 payroll mode | 10:15 | $1,242 | — | — | — |
| 11 payroll done | 16:45 | $1,242 | $109,958 | $108,716 | $0.216 |
| 12 verdict A | 17:25 | $1,242 | $109,958 | $108,716 | 89× |
| 13 verdict B | 18:05 | $1,242 | $494,813 | $493,571 | 398× |
| 14 verdict C ★ | 18:40 | $1,242 | $197,925 | $196,683 | **159×** |
| 15 architecture | 20:30 | — | — | — | B+ |
| 16 outro | 21:10 | final strip | | | |

## APPENDIX B — THE FIVE SHOTS THAT CARRY IT
1. The stacked `$1,319,500` / `$1,242` punch at 0:22
2. **FREE → LOCAL → SUBSCRIPTION → PAID LAST** at 5:10
3. The `"primary": "moonshot/kimi-k2.6"` config reveal at 6:45
4. The Hermes gold row at 16:20
5. The `return False` diff at 20:00

## APPENDIX C — BEFORE YOU RECORD
- Callbacks verified against `docs/SERIES.md` in the Claude-Youtube repo (2026-07-25).
  If any episode gets re-cut, re-check them.
- Anthropic/ChatGPT $200 tiers, GLM annual prepay and Kimi Alegro are CONFIRMED by Dan
  (2026-07-25). Remaining assumptions are the tools block and hardware prices — see `COSTS.md`.
- Episodes 02, 04 and 06 were iCloud-evicted at time of writing. Run
  `brctl download <file>` before pulling any archive footage from them.
