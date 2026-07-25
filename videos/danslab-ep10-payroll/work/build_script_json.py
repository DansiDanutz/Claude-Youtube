#!/usr/bin/env python3
"""Parse SCRIPT.md -> narration/script.json (scene id, spoken text).

Careful with blockquotes: VO lines are `> text`, and a chapter may open with an
italic direction note `> *like this*`. Bold-led VO (`> **Dexter.** ...`) also
starts with `> *`, so the note filter must require a single asterisk — getting
this wrong silently truncates narration.
"""
import json, os, re, sys

EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH = [('COLD OPEN','open'),('0:30','rules'),('CHAPTER 1','iron'),('CHAPTER 2','brain'),
      ('CHAPTER 3','plumb'),('CHAPTER 4','pay'),('CHAPTER 5','reck'),
      ('CHAPTER 6','audit'),('CHAPTER 7','vs'),('CHAPTER 8','why')]


def is_direction(line):
    body = line[1:].strip()
    return body.startswith('*') and not body.startswith('**')


def clean(t):
    t = re.sub(r'\*\*(.+?)\*\*', r'\1', t)
    t = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'\1', t)
    return re.sub(r'\s+', ' ', t.replace('`', '')).strip()


def main():
    src = open(os.path.join(EP, 'SCRIPT.md'), encoding='utf-8').read()
    scenes, cur, vo, buf = [], 'open', False, []

    def flush():
        nonlocal buf
        if buf:
            t = clean(' '.join(x.strip() for x in buf if x.strip()))
            if t:
                scenes.append({'ch': cur, 'text': t})
        buf = []

    for ln in src.split('\n'):
        m = re.match(r'^##+\s+(.*)$', ln)
        if m:
            t = m.group(1).strip()
            if t.startswith('APPENDIX'):
                break
            flush(); vo = False
            for k, v in CH:
                if t.startswith(k) or k in t:
                    cur = v; break
            continue
        if ln.startswith('`[VO]`'):
            flush(); vo = True; continue
        if ln.startswith('`['):
            flush(); vo = False; continue
        if vo and ln.startswith('>') and not is_direction(ln):
            buf.append(ln[1:])
    flush()

    out, cnt = [], {}
    for s in scenes:
        ch = s['ch']; cnt[ch] = cnt.get(ch, 0) + 1
        out.append({'id': f"{ch}{cnt[ch]:02d}", 'text': s['text'],
                    'still': None, 'hud': None})
    # silent plate montage after the third cold-open beat
    i = next(n for n, s in enumerate(out) if s['id'] == 'open03') + 1
    out.insert(i, {'id': 'openMontage', 'text': '', 'clip': 'plates/montage.mp4',
                   'still': None, 'hud': None, 'fixed': 3.0})

    dst = os.path.join(EP, 'work/narration/script.json')
    json.dump({'episode': 10, 'slug': 'payroll', 'title': 'The Payroll', 'scenes': out},
              open(dst, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    w = sum(len(s['text'].split()) for s in out)
    print(f"{len(out)} scenes · {w} words · ~{w/145:.1f} min at 145 wpm")
    short = [s['id'] for s in out if s['text'] and len(s['text'].split()) < 4]
    if short:
        print("  very short scenes (check):", ', '.join(short))


if __name__ == '__main__':
    main()
