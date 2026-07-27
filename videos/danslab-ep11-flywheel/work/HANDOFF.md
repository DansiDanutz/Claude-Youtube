# EP11 — The Flywheel · HANDOFF

Status: **SHIPPED v2** — 1080p + 4K masters, 6:34 (394.2s), rubric A 27/30 (work/RUBRIC.md).
Masters: `danslab-episode-11-flywheel-1080P-v2.mp4` / `-4K-v2.mp4` (both zero pts gaps, CFR, −16.3 LUFS).
Preview: launch.json `ep11-preview` → http://localhost:8124/preview.html

Pipeline is the ep10 system (see skill `danslab-episode-production`): 22 Z shots + ZHud bottom bar,
24 VO lines (flw01–flw24, whisper-verified first pass), assemble.py --no-mux → mux_chunked.py
(single-pass chunks, dynamic fades/cuts from segment durations).

Ep11-specific gotchas learned:
- `node scripts/render-all.mjs <many ids> --scale=2` can SILENTLY skip shots (12/23 stayed 1080p)
  → after any 4K batch, verify EVERY output is 3840 wide and re-render stragglers one at a time.
- mux edit leftovers: when converting ep10's two-pass mux to single-pass, the dead second block
  caused IndentationError at run time — syntax-check with ast.parse before launching long chains.

Open: EP12 = Stripe wired end-to-end on camera (promised in flw23). 14k receipt screenshot from
Dan would lift Truth to 5/5 if re-cut.
