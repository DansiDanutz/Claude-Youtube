#!/usr/bin/env python3
"""Voice pre-flight for Did You Know That? episodes — run BEFORE the first render.

Every narration problem David heard on No. 02 v2 is detectable from data we already have, so this gate
catches them in seconds instead of in audit rounds after a render:
  data       a spoken scene with no word timings, a word count that differs from the script, or no timeline slot
  speed      chunk speed outside 0.90–1.08 (floors respected), or a speed-setting jump > 0.08 between any neighbours,
             or > 20 % articulation rate (1–2-word beats such as the sign-off are timed by pauses: rate check skipped)
  pace       measured words/s more than 10 % off the chunk's own target
  drag       a word > max(1.0 s, 0.25 s × syllables), > 0.42 s/syllable mid-sentence, or > 0.55 s/syllable at a sentence end
  gaps       a pause > 0.6 s inside a sentence, or < 0.25 s between sentences
  lead-in    first word < 0.6 s after its shot starts (voice entering on a cut), last word < 0.5 s before it ends
  sfx        an impact / whoosh / pop / chime / riser / thock / sparkle starting ON a spoken word
  sign-off   "Ask... Wonder... Repeat." with < 0.6 s between the words or < 1.0 s before the next speech
  payoff     chunks marked "payoff": true faster than speed 1.0 or 2.8 w/s

Inputs (all JSON, all already produced by the pipeline):
  --script    work/narration/script.json   scenes[{id, shot, chunks[{text, pace, speed, floor?, payoff?}]}]
  --vo        remotion/src/shots/<ep>/vo.json   {scene_id: {dur, words[{w, s, e}]}}  (after the pauses step)
  --timeline  work/timeline.json           {Shot: [duration_s, {scene_id: offset_s}]} in master order
  --cuesheet  work/cuesheet.json           [{t, clip, gain}] absolute seconds in the master (exported by the
                                           episode's cue resolver before rendering)
Exit 0 = PASS, 1 = FAIL (report printed; --out writes it as Markdown).
"""
import argparse
import json
import re
import sys

SPEED_MIN, SPEED_MAX = 0.90, 1.08
SPEED_JUMP_MAX = 0.08
WPS_JUMP_MAX = 0.10
SPS_JUMP_MAX = 0.20               # articulation-rate continuity; designed mood shifts (lean-in, payoff) stay under it, lurches do not
MIN_WORDS_FOR_PACE = 3            # one- and two-word beats (sign-off) are timed by pauses, not pace
PACE_TOL = 0.10
WORD_MAX_S = 1.0
LONG_WORD_PER_SYL = 0.25          # 'photosynthesis.' (5 syl) may take up to 1.25 s
MID_PER_SYL_MAX = 0.42
END_PER_SYL_MAX = 0.55
GAP_IN_SENTENCE_MAX = 0.6
GAP_BETWEEN_SENTENCES_MIN = 0.25
LEAD_IN_MIN = 0.6
TAIL_MIN = 0.5
SIGNOFF_GAP_MIN = 0.6
SIGNOFF_AFTER_MIN = 1.0
PAYOFF_SPEED_MAX, PAYOFF_WPS_MAX = 1.0, 2.8
LOUD_SFX = re.compile(r'impact|whoosh|pop|chime|riser|thock|sparkle|stamp|snap|hit|boom')
SENTENCE_END = re.compile(r'[.?!…]["”\')]*$')


def syllables(word):
    letters = re.sub(r'[^A-Za-z]', '', word)
    if len(letters) >= 2 and letters.isupper():      # acronyms are spelled out: AI = 2, IEA = 3, NASA reads as a word
        return len(letters) if len(letters) <= 3 else max(1, len(re.findall(r'[AEIOUY]+', letters)))
    w = letters.lower()
    if not w:
        return 1
    groups = len(re.findall(r'[aeiouy]+', w))
    if w.endswith('e') and not w.endswith(('le', 'ee')) and groups > 1:
        groups -= 1
    return max(1, groups)


def chunk_words(scene, words):
    """Split a scene's stitched word list back into its chunks by word count (pauses add no words)."""
    out, i = [], 0
    for chunk in scene.get('chunks') or [scene]:          # a top-level-text scene is its own single chunk, settings included
        n = len(chunk.get('text', '').split())
        out.append((chunk, words[i:i + n]))
        i += n
    return out


def wps(words):
    if len(words) < 2:
        return None
    span = words[-1]['e'] - words[0]['s']
    return len(words) / span if span > 0 else None


def sps(words):
    """Articulation rate: syllables per second of actual speech (pauses and breaths excluded)."""
    if len(words) < MIN_WORDS_FOR_PACE:
        return None
    speaking = sum(max(0.0, w['e'] - w['s']) for w in words)
    return sum(syllables(w['w']) for w in words) / speaking if speaking > 0 else None


def check_speed_and_pace(script, vo):
    issues = []
    for scene in script['scenes']:
        words = (vo.get(scene['id']) or {}).get('words') or []
        prev_speed, prev_sps = None, None
        for idx, (chunk, cw) in enumerate(chunk_words(scene, words), 1):
            tag = f"{scene['id']} c{idx}"
            speed = chunk.get('speed')
            floor = chunk.get('floor') or SPEED_MIN
            measured = wps(cw) if len(cw) >= MIN_WORDS_FOR_PACE else None
            syl_rate = sps(cw)
            if speed is not None and not (max(floor, SPEED_MIN) - 1e-9 <= speed <= SPEED_MAX + 1e-9):
                issues.append(('speed', tag, f'speed {speed} outside {max(floor, SPEED_MIN):.2f}–{SPEED_MAX}'))
            target = chunk.get('pace')
            if target and measured and abs(measured - target) / target > PACE_TOL:
                issues.append(('pace', tag, f'{measured:.2f} w/s vs target {target} (±{int(PACE_TOL * 100)} %)'))
            if chunk.get('payoff') and ((speed or 0) > PAYOFF_SPEED_MAX or (measured or 0) > PAYOFF_WPS_MAX):
                issues.append(('payoff', tag, f'payoff chunk at speed {speed}, {measured and round(measured, 2)} w/s'))
            # the speed SETTING is compared between every pair of neighbours; the measured rate only between
            # chunks long enough to measure (a one-word beat is timed by its pauses)
            if speed is not None and prev_speed is not None and abs(speed - prev_speed) > SPEED_JUMP_MAX + 1e-9:
                issues.append(('speed', tag, f'speed jump {prev_speed} → {speed} vs previous chunk'))
            if syl_rate and prev_sps and abs(syl_rate - prev_sps) / prev_sps > SPS_JUMP_MAX:
                issues.append(('speed', tag, f'pace jump {prev_sps:.2f} → {syl_rate:.2f} syllables/s vs previous chunk'))
            if speed is not None:
                prev_speed = speed
            if syl_rate:
                prev_sps = syl_rate
    return issues


def check_words_and_gaps(vo):
    issues = []
    for sid, scene in vo.items():
        words = scene.get('words') or []
        for i, w in enumerate(words):
            d = w['e'] - w['s']
            end = bool(SENTENCE_END.search(w['w'])) or i == len(words) - 1
            clause_end = end or w['w'].endswith((',', ';', ':', '—'))   # words before a comma lengthen naturally
            per_syl = d / syllables(w['w'])
            word_cap = max(WORD_MAX_S, LONG_WORD_PER_SYL * syllables(w['w']))
            if d > word_cap or (clause_end and per_syl > END_PER_SYL_MAX) or (not clause_end and per_syl > MID_PER_SYL_MAX):
                issues.append(('drag', sid, f"'{w['w']}' {d:.2f} s at {w['s']:.2f}"))
            if i + 1 < len(words):
                gap = words[i + 1]['s'] - w['e']
                comma = w['w'].endswith((',', ';', ':', '—', '-'))
                if end and gap < GAP_BETWEEN_SENTENCES_MIN:
                    issues.append(('gaps', sid, f"only {gap:.2f} s after '{w['w']}' (sentence end) at {w['e']:.2f}"))
                if not end and not comma and gap > GAP_IN_SENTENCE_MAX:
                    issues.append(('gaps', sid, f"{gap:.2f} s gap inside a sentence after '{w['w']}' at {w['e']:.2f}"))
    return issues


def master_spans(vo, timeline):
    """Absolute [start, end] of every word in the master, plus each shot's [start, end]."""
    t, shots, spoken = 0.0, [], []
    for shot, (dur, scenes) in timeline.items():
        shots.append((shot, t, t + dur, scenes))
        for sid, off in scenes.items():
            for w in (vo.get(sid) or {}).get('words') or []:
                spoken.append((t + off + w['s'], t + off + w['e'], w['w'], sid))
        t += dur
    spoken.sort()
    return shots, spoken


def check_lead_in(vo, timeline):
    issues = []
    shots, _ = master_spans(vo, timeline)
    for shot, start, end, scenes in shots:
        firsts = [off + vo[s]['words'][0]['s'] for s, off in scenes.items() if (vo.get(s) or {}).get('words')]
        lasts = [off + vo[s]['words'][-1]['e'] for s, off in scenes.items() if (vo.get(s) or {}).get('words')]
        if firsts and min(firsts) < LEAD_IN_MIN:
            issues.append(('lead-in', shot, f'first word {min(firsts):.2f} s after the cut (min {LEAD_IN_MIN})'))
        if lasts and (end - start) - max(lasts) < TAIL_MIN:
            issues.append(('lead-in', shot, f'last word ends {(end - start) - max(lasts):.2f} s before the cut (min {TAIL_MIN})'))
    return issues


def check_sfx_on_words(vo, timeline, cuesheet):
    issues = []
    _, spoken = master_spans(vo, timeline)
    for cue in cuesheet:
        if not LOUD_SFX.search(cue.get('clip', '')):
            continue
        t = cue['t']
        hit = next((w for w in spoken if w[0] + 0.03 < t < w[1] - 0.03), None)
        if hit:
            issues.append(('sfx', hit[3], f"{cue['clip']} at {t:.2f} lands on '{hit[2]}'"))
    return issues


def check_signoff(vo, timeline):
    issues = []
    _, spoken = master_spans(vo, timeline)
    names = [re.sub(r'[^a-z]', '', w[2].lower()) for w in spoken]
    for i in range(len(names) - 2):
        if names[i:i + 3] == ['ask', 'wonder', 'repeat']:
            a, b, c = spoken[i], spoken[i + 1], spoken[i + 2]
            for x, y in ((a, b), (b, c)):
                if y[0] - x[1] < SIGNOFF_GAP_MIN:
                    issues.append(('sign-off', x[3], f"only {y[0] - x[1]:.2f} s between '{x[2]}' and '{y[2]}'"))
            if i + 3 < len(spoken) and spoken[i + 3][0] - c[1] < SIGNOFF_AFTER_MIN:
                issues.append(('sign-off', c[3], f"next speech {spoken[i + 3][0] - c[1]:.2f} s after 'Repeat'"))
    return issues


def check_inputs(script, vo, timeline):
    """Fail closed: every spoken scene needs word timings that match its script and a place in the timeline."""
    issues = []
    placed = {sid for _, scenes in timeline.values() for sid in scenes}
    for scene in script['scenes']:
        expected = sum(len(c.get('text', '').split()) for c in scene.get('chunks') or [scene])
        if not expected:
            continue
        sid = scene['id']
        got = len((vo.get(sid) or {}).get('words') or [])
        if not got:
            issues.append(('data', sid, 'no word timings in vo.json — regenerate it before the pre-flight'))
        elif got != expected:
            issues.append(('data', sid, f'vo.json has {got} words, the script has {expected} — stale take'))
        if sid not in placed:
            issues.append(('data', sid, 'spoken scene is not placed in timeline.json'))
    return issues


def run(script, vo, timeline, cuesheet):
    issues = (check_inputs(script, vo, timeline) + check_speed_and_pace(script, vo) + check_words_and_gaps(vo) + check_lead_in(vo, timeline)
              + check_signoff(vo, timeline))
    if cuesheet is None:
        issues.append(('sfx', '-', 'no cuesheet.json — export the resolved cue sheet before rendering'))
    else:
        issues += check_sfx_on_words(vo, timeline, cuesheet)
    return issues


def report(issues):
    if not issues:
        return 'VOICE PRE-FLIGHT: PASS — 0 issues'
    lines = [f'VOICE PRE-FLIGHT: FAIL — {len(issues)} issue(s)', '', '| check | where | issue |', '|---|---|---|']
    lines += [f'| {k} | {where} | {msg} |' for k, where, msg in issues]
    return '\n'.join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('--script', required=True)
    ap.add_argument('--vo', required=True)
    ap.add_argument('--timeline', required=True)
    ap.add_argument('--cuesheet')
    ap.add_argument('--out')
    a = ap.parse_args(argv)
    load = lambda p: json.load(open(p, encoding='utf-8'))
    issues = run(load(a.script), load(a.vo), load(a.timeline), load(a.cuesheet) if a.cuesheet else None)
    text = report(issues)
    print(text)
    if a.out:
        open(a.out, 'w', encoding='utf-8').write(text + '\n')
    return 1 if issues else 0


if __name__ == '__main__':
    sys.exit(main())
