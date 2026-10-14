# EP12 — receipts & decisions needed from Dan

Rule (series): every on-screen number traces to a file or to Dan. Every screenshot is a real capture.
Nothing below is optional — a ❓ left open at render time becomes a Truth deduction on the rubric.

## Blocking decisions (needed before the script is voiced)

| # | Decision | Why it blocks | Default if Dan says "you pick" |
|---|---|---|---|
| 1 | **Stripe account status** — exists? live mode enabled? payouts enabled? legal entity + country? | dol11, dol19a, human beat | none — cannot be assumed |
| 2 | **Which product takes the first dollar, and the price** | dol16, product card, counter value | purchase-webhook's own product: paid access to a private DansLab repo, **$1** (keeps the counter literal) |
| 3 | **Who pays** — a real stranger, a friend, or Dan's own card (stated on screen) | dol16 rule, dol19a honesty | Dan's own card, declared on screen; "stranger's dollar" becomes ep13 |
| 4 | **Stateful host for purchase-webhook** — which machine (droplet / Mac Studio / other)? | dol10 ❓HOST NAME | the DansLab droplet that already runs OpenClaw services (do not disturb peer bots) |
| 5 | **Outcome** — the real attempt happens BEFORE voicing dol19; only the true branch is generated | dol19a vs dol19b | — |

## Captures (real, from the real session — collected on wire day)

- [ ] `github.com/DansiDanutz/purchase-webhook` README in browser (private repo; nothing sensitive visible)
- [ ] July audit report (`~/Projects/repoaudit/reports/purchase-webhook.html`) — the findings table and the
      "production deliberately not claimed" line (already on disk ✅)
- [ ] Deploy terminal: container up, readiness `200 ready` (values redacted by the terminal, not by blur)
- [ ] Env set terminal: variable NAMES only, every value `***`
- [ ] Stripe dashboard → Developers → Webhooks: endpoint registered, test ping 200
- [ ] Replay test: same event twice → ledger row count stays 1 (terminal)
- [ ] nervixpay.live landing (live 2026-10-14 ✅ — re-capture on wire day)
- [ ] Stripe Checkout page for the product (card fields blurred in the capture itself)
- [ ] Stripe webhook log for the real event + the service log for the same event id
- [ ] Bottom-bar counter POP frame — QA still at the exact frame
- [ ] (ep13) bank statement line for the payout — "two business days" in dol19a must match reality

## Already verified (2026-10-14)

- danslab.vercel.app · nervix.ai · nervix.ai/api/health · zmarty.me · worldcup26.world · nervixpay.live → all 200
- purchase-webhook: private, last push 2026-10-06; audit 2026-07-27 (0 critical open, 5/5 high fixed, 7/7 medium+low fixed)
- No `STRIPE_*` variables present in the fleet env by name → account/keys status genuinely unknown (decision 1)

## Not allowed

- Regenerating any existing paid narration (ep01–ep11). New lines only, via `gen_voice.py`, whisper-verified.
- Rendering a secret, even blurred. Redact at the source.
- Calling a test-mode payment "revenue". Test mode = dol13 only; dol17–19 are live mode or the episode is dol19b.
