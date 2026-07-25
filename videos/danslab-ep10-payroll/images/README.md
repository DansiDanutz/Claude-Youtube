# images/ — the handoff folder

One subfolder per image. Open it, read `PROMPT.txt`, paste into ChatGPT, drop the PNG
back in that same folder. Filename doesn't matter — the folder is the label.

```
01-head-office      Ch1 · 1:40    optional (real hardware preferred)
02-ceo-desk         Ch1 · 2:40    optional (real hardware preferred)
03-frankfurt        Ch1 · 3:20    needed
04-eight-desks      cold open + 10:15   ★ do this one first
05-one-door         Ch2 · 4:40    needed
06-green-lights     Ch6 · 20:05   ★ high priority
07-the-room         Ch7 · 20:50   optional (real room preferred)
08-season-two       outro · 21:20 needed
```

Each `PROMPT.txt` has the JSON, the 16:9 line, and an **accept/reject** rule — the specific
thing that makes that image work. #04 must have exactly eight desks. #06 must have exactly
one *dark* light, in focus. Worth checking before you accept a generation.

**Multiple keepers?** Drop them all in. I take the most recent, or name your pick `PICK.png`.

## Check what's landed

```bash
bash ~/Desktop/claudeYouTube/danslab-episode-10-payroll/images/status.sh
```

## What happens when they're in

Tell me they're ready — I can't watch the folder on my own. Then:

1. I verify each one against its accept/reject rule and flag anything that misses.
2. I build the **animatic** — the full 21-minute cut, silent, with your images, the six
   design cards, the title plate and all 19 HUD overlays cut to the script timecodes.
3. You watch the whole episode's structure before recording a word of VO.

Missing images aren't a blocker — anything absent becomes a labelled black slate in the
animatic and gets swapped later. Partial is fine. Start with 04 and 06.
