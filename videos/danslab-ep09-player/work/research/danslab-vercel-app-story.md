<!-- source: https://danslab.vercel.app/story -->

[DDansLab// v2026.4](https://danslab.vercel.app/)
[Home](https://danslab.vercel.app/)[Ecosystem](https://danslab.vercel.app/ecosystem)[Lab](https://danslab.vercel.app/lab)[SemeClaw](https://danslab.vercel.app/semeclaw)[Story](https://danslab.vercel.app/story)[Contact](https://danslab.vercel.app/contact)
[Enter Lab](https://nervix.ai)
§ 05STORY // ORIGINS
# The lab with _thirty-one agents_  
and one chair at the head.
A workshop above the old town in Cluj-Napoca. A founder who does not write code anymore. A fleet of named agents — Dexter, Sienna, Memo, Nano, David, Hermes — that ships product, trades crypto, mints new agents, and convenes war rooms while Dan sleeps. Six chapters, one human, one company.
I.
The Foreman · Chapter One
## Dan, who _does not write code_.
A founder in a room with thirty specialists. One Telegram chat. One chair at the head.
A workshop above the old town.
The lab sits above Cluj-Napoca, in a building that used to be a bank. The walls are bare. Two monitors and a Mac Studio. A poker chip from _Players Poker Club_ on the desk — the founder is also a co-owner, and twenty-five years at the table is exactly the kind of education that prepares you to run a company you cannot fully observe.
Dan does not write code anymore. He convenes. Every morning he opens Telegram, finds the chat with Dexter, and types one line: _“ship captions v2 on YouTube Studio”_ or _“look at yesterday’s daily summary, what should we change?”_ The thirty other agents never see the message. By lunch, Dexter pings back: **shipped**.
“Approved. Ship it.”
This is the foreman’s job. Bring intent into the workshop. Approve direction. Sign every war-room decision. The agents do the rest — and most of the time, the agents do not need a foreman. They do need one to point. They need one to say _yes, this is the build that matters today_ , and one to say _no, this can wait_.
The economics work because the workshop scales without people. **Five droplets, one Mac Studio, thirty-one agents.** The monthly opex is in the low hundreds of euros. The output is closer to what a fifteen-person engineering org would ship — across five live products, two trading venues, and a federation registry.
**Location** · Cluj-Napoca, RO**Channel** · Telegram · DM to Dexter**Role** · Human facilitator · approver
II.
The Desk · Chapter Two
## Sienna, who _never sleeps_.
A crypto agent on four-hour bars, a 96.2% win rate, and a 100-endpoint API that prints decisions while the desk is dark.
Three a.m. and the desk is green.
Sienna runs on the **167.172.•.•** droplet under _ZAI GLM-4.7_. The job is unsentimental: scan 87 pairs on the four-hour, size positions at less than half a percent of capital, open the long, set the take-profit, log to Supabase, post to Telegram. Repeat.
The Sienna Crypto Girl public board posts a _96.2% historical win rate_. That number is the headline; the actual edge is in the average R per trade plus the discipline of the close. Sienna never moves a stop. She never holds a losing position because she likes the chart. The chart does not care.
The agent exposes a hundred-plus endpoints through **zmarty.me** — a public API for the same signal feed that powers the trading. The membership product, _ZmartyChat_ , is the bridge: subscribe, get the Red Lobster strategy in real time, watch the trades print before they show up on the chart.
**Droplet** · 167.172.•.•**Model** · ZAI GLM-4.7**Win rate** · 96.2%
III.
The Senior · Chapter Three
## Dexter, who _holds every key_.
A senior developer on Claude Opus, one droplet, SSH to every other machine, 14 crons a day, and a YouTube studio that doesn't stop.
A walk through the droplet.
Dexter is the lab’s general manager. The droplet at **46.101.•.•** is the operational center of gravity. From here, Dexter holds SSH keys to every other agent’s machine. From here, fourteen crons run every day: droplet-stats to Supabase every thirty minutes, GPU auto-stop, secret scanner, daily summaries at 23:55 UTC.
This is the agent Dan actually talks to. Most builds start with a one-line DM to Dexter and end with Dexter pinging back “shipped.” In between sits the entire workflow: route the ticket to the right bench, coordinate the build agents, run the review, push to GitHub, watch Vercel deploy, confirm the cron is green.
Dexter also owns **CrawdBot** — the YouTube automation suite — **YouTube Studio** , and **CrawBoard**. Three live products, all maintained from the same chair. The trick is not heroics; it is the fact that Dexter delegates to twenty-four Nervix nanobots, each one a focused worker doing exactly one thing well.
**Droplet** · 46.101.•.•**Model** · Claude Opus 4.6**Crons** · 14 / day · 60+ repos
IV.
The Rigger · Chapter Four
## Memo, who _has already cron'd it_.
Project manager, DevOps, and author of MyWork-AI. 24 n8n workflows. 72 commands. 424 tests, all green.
The rig at rest.
Memo’s droplet at **138.68.•.•** runs Claude Sonnet 4 and the most boring stack in the lab. _n8n_ on localhost:5678 manages twenty-four event-driven automations. Marketing, content, billing, support — anything that can be a webhook is one. Anything that can be cron’d is.
The flagship is **MyWork-AI** — seventy-two CLI commands shipped to PyPI, 424 tests, the framework the lab uses to run itself. If you are a solo founder trying to compress build → ship → market into a single tool, this is the one. `pip install mywork-ai` and you have what Dan’s lab uses to operate.
The most quietly important thing Memo runs is the _Stripe purchase-webhook_. When a CrawBoard subscription clears, the webhook auto-grants GitHub repo access. The customer goes from clicking **Subscribe** to having their repo invite, without a human in the loop. That single automation is what makes the lab’s revenue side feel autonomous.
**Droplet** · 138.68.•.•**Model** · Claude Sonnet 4**Workflows** · 24 n8n · 72 commands · 424 tests
V.
The Foundry · Chapter Five
## Nano, who _makes the others_.
The founding orchestrator of the Nervix Federation. Signs every new agent with a key, scores them on reputation, enrolls them at the registry. 247 and counting.
Minting the two-hundred-forty-eighth.
The Agent Foundry is the warmest bench in the lab — heat reading 0.88, almost always firing. Nano runs on the **157.230.•.•** droplet under Claude Sonnet 4, and the job is exactly this: when the lab needs a new specialized agent, Nano mints one.
The pipeline is sixty seconds, end to end. Spec arrives. Nano generates an **ed25519** keypair. The agent gets enrolled via `nervix-cli` into the federation registry. A reputation score initializes at zero. The agent is wired to its scopes, given an observability hook, and committed to `nervix-registry`. By the time you finish a coffee, agent #248 is online and accepting tasks.
The whole thing runs on top of the **Nervix DB** — agents, tasks, escrow. The bet behind Nervix is that the next interesting AI products will not be single agents but federations of them, all with cryptographic identity and on-chain reputation. _Nervix.ai is the company’s #1 priority_. Nano builds the federation while everyone else builds on top of it.
**Droplet** · 157.230.•.•**Model** · Claude Sonnet 4**Enrolled** · 247 agents · sub-60s pipeline
VI.
The Executive Layer · Chapter Six
## David & Hermes, _hand in hand_.
The Mac Studio OpenClaw who runs the company. The reasoning agent who never forgets. Together they are the executive layer — and they take the mission directly from the bosses.
Mission from the bosses.
Above the droplet workers sits a quieter layer. **David** runs locally on the Mac Studio under _Qwen 3.5_. **Hermes** runs on the same machine under _Claude Opus 4.6_. Two agents. One executive function.
David is the orchestrator. The mission arrives — from Dan, from Sienna’s end-of-day report, from a war-room decision — and David receives it. Dispatch goes out: which bench, which agent, which deadline. The Redis bridge to Supabase, Vercel, and GitHub carries the work to where it needs to be. David watches every main agent, tracks cost, and reports fleet health upward.
Hermes is the reasoning layer. When the work requires real thought — a trade veto, an architecture decision, a contested war-room call — the question goes through Hermes first. Hermes loads the full _Vector Memory_ on every call. Fourteen million tokens of agent context, daily summaries, prior decisions. Hermes is also the lab’s scribe: at 23:55 UTC, Hermes writes the daily summary that gets indexed back into the vector store. _The lab is measurably smarter every twenty-four hours because of Hermes._
Hand-in-hand.
The handshake between David and Hermes is the executive layer of DansLab. David handles motion. Hermes handles meaning. Together they take the mission from the bosses and turn it into work the rest of the fleet can ship. Without David, Hermes is a brilliant brain with nothing to act on. Without Hermes, David is a fast router moving the wrong things in the right way.
**Host** · Mac Studio · local**David** · Qwen 3.5 · orchestrator**Hermes** · Claude Opus 4.6 · 14M tok memory
### The coda.
Six chapters. One human. Thirty-one agents across five droplets and a Mac Studio. Five live products on the open web. One Telegram chat that connects everything. By 2027, the most interesting companies will not be measured by headcount but by how well one operator plus a named fleet can coordinate. DansLab is the working prototype — and the playbook is being written in public, in code, in production, right now.
DansLab
A human-led autonomous AI lab. Dan orchestrates 30+ agents across 5 products. Built in Cluj-Napoca · Frankfurt · US-East.
#### PRODUCTS
  * [nervix.ai](https://nervix.ai)
  * [crawdbot.com](https://crawdbot.com)
  * [MyWork-AI](https://danslab.vercel.app/story#)
  * [zmarty.me](https://zmarty.vercel.app)
  * [SemeClaw](https://danslab.vercel.app/semeclaw)
  * [WorldCup Central · YouTube](https://www.youtube.com/@DansLab-WorldCup)


#### LAB
  * [Ecosystem](https://danslab.vercel.app/ecosystem)
  * [Agents](https://danslab.vercel.app/lab)
  * [War Room](https://danslab.vercel.app/semeclaw)
  * [Story](https://danslab.vercel.app/story)


#### SIGNAL
  * [Dan Semenescu — Founder](https://dansemenescu.vercel.app)
  * [YouTube](https://www.youtube.com/@DansLab-WorldCup)
  * [GitHub](https://github.com/DansiDanutz)
  * [X / Twitter](https://x.com/dansemenescu)
  * semebitcoin@gmail.com


© 2026 DANSLAB · POWERED BY OPENCLAW v2026.2.14UPTIME 99.94% / 30D · LAST DEPLOY 2026-07-21 · [910ac0b](https://github.com/DansiDanutz/DansLab/commit/910ac0b)
