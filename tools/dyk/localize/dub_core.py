"""Pure logic of the DYK dub pipeline (no network, no ffmpeg): chunking, alignment spans, placement and subtitle cues.

A translation is one text per English sentence id. A dub voices each CHUNK (the English script's chunk: 2-6 sentences,
one mood) as ONE text-to-speech call, then cuts the audio back into sentences using the character alignment and places
every sentence at its English sentence start. A sentence that runs long pushes the next one later (cascade) instead of
overlapping it; the push is limited and reported.
"""
import re

JOINER = {'ro': ' ', 'fr': ' ', 'es': ' ', 'zh': ''}
MIN_GAP_S = 0.12            # silence kept between two placed sentences
LEAD_S, TAIL_S = 0.08, 0.12  # breath kept before / after a cut-out sentence (clamped to the neighbouring gap)
FADE_S = 0.010


def say_of(entry):
    return (entry if isinstance(entry, str) else entry.get('say', '')).strip()


def show_of(entry):
    """Subtitle text: the optional `show`, else the spoken text."""
    if isinstance(entry, dict) and str(entry.get('show', '')).strip():
        return str(entry['show']).strip()
    return say_of(entry)


def chunk_units(doc, translation, lang):
    """[{id, text, sentences: [{id, say, show, span: (a, b), en: english sentence dict}]}] for every chunk in order.

    `text` is what one text-to-speech call receives; `span` is the sentence's character range inside it."""
    joiner = JOINER[lang]
    sentences = translation['sentences']
    units = []
    for scene in doc['scenes']:
        for chunk in scene['chunks']:
            parts, pos, text = [], 0, ''
            for en in chunk['sentences']:
                entry = sentences[en['id']]
                say = say_of(entry)
                if text:
                    text += joiner
                    pos += len(joiner)
                parts.append({'id': en['id'], 'say': say, 'show': show_of(entry), 'span': (pos, pos + len(say)), 'en': en})
                text += say
                pos += len(say)
            units.append({'id': chunk['id'], 'scene': scene['id'], 'text': text, 'sentences': parts})
    return units


def sentence_times(alignment, spans):
    """[(start, end)] seconds inside the chunk audio, for each (a, b) character span, from the TTS alignment."""
    starts = alignment['character_start_times_seconds']
    ends = alignment['character_end_times_seconds']
    return [(starts[a], ends[b - 1]) for a, b in spans]


def check_alignment(text, alignment):
    """None if the alignment describes exactly `text`, else a description of the mismatch."""
    got = ''.join(alignment['characters'])
    return None if got == text else f'alignment has {len(got)} chars, text has {len(text)}'


def cut_points(times, audio_len_s):
    """Cut positions for one chunk's audio: each sentence keeps LEAD_S before and TAIL_S after, clamped to half the gap."""
    out = []
    for i, (s, e) in enumerate(times):
        prev_e = times[i - 1][1] if i else 0.0
        next_s = times[i + 1][0] if i + 1 < len(times) else audio_len_s
        a = s - min(LEAD_S, max(0.0, (s - prev_e) / 2))
        b = e + min(TAIL_S, max(0.0, (next_s - e) / 2))
        out.append((max(0.0, a), min(audio_len_s, b)))
    return out


def place(starts, durations, min_gap=MIN_GAP_S):
    """Cascade placement: start_k = max(english start_k, previous end + min_gap). Returns [(start, end)]."""
    placed, cursor = [], None
    for s, d in zip(starts, durations):
        start = s if cursor is None else max(s, cursor + min_gap)
        placed.append((start, start + d))
        cursor = start + d
    return placed


def overruns(placed, en_sentences, max_push_s):
    """Sentences pushed more than max_push_s after their English start (the cascade lag), with the push in seconds."""
    return [(en['id'], round(p[0] - en['start'], 2)) for p, en in zip(placed, en_sentences) if p[0] - en['start'] > max_push_s]


# ---- subtitles -------------------------------------------------------------------------------------------------

LINE_MAX = {'ro': 42, 'fr': 42, 'es': 42, 'zh': 18}
CUE_MAX_LINES = 2
CJK_BREAK = re.compile(r'(?<=[，、；：。？！…,.?!])')
MIN_CUE_S = 1.0


def wrap(text, lang):
    """Lines no longer than the language's limit (Chinese breaks after punctuation, else anywhere at the limit)."""
    limit = LINE_MAX[lang]
    if len(text) <= limit:
        return [text]
    if lang == 'zh':
        pieces = [p for p in CJK_BREAK.split(text) if p]
        lines, cur = [], ''
        for p in pieces:
            if cur and len(cur) + len(p) > limit:
                lines.append(cur)
                cur = ''
            while len(p) > limit:
                lines.append(p[:limit])
                p = p[limit:]
            cur += p
        if cur:
            lines.append(cur)
        return lines
    words, lines, cur = text.split(), [], ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > limit:
            lines.append(cur)
            cur = w
        else:
            cur = f'{cur} {w}'.strip()
    if cur:
        lines.append(cur)
    return lines


def balance(lines):
    """Two lines of similar length instead of a long one and a stub (ro/fr/es only, called with 2-line wraps)."""
    if len(lines) != 2 or ' ' not in ' '.join(lines):
        return lines
    words = ' '.join(lines).split()
    best, best_gap = lines, abs(len(lines[0]) - len(lines[1]))
    for i in range(1, len(words)):
        a, b = ' '.join(words[:i]), ' '.join(words[i:])
        if abs(len(a) - len(b)) < best_gap and max(len(a), len(b)) <= LINE_MAX['ro']:
            best, best_gap = [a, b], abs(len(a) - len(b))
    return best


def cues_for(text, start, end, lang):
    """[(start, end, text)] — one cue, or several when the sentence needs more than CUE_MAX_LINES lines.

    The window is shared out by text length; a cue is never shown for less than MIN_CUE_S unless the window is shorter."""
    lines = wrap(text, lang)
    if lang != 'zh':
        lines = balance(lines) if len(lines) == 2 else lines
    groups = [lines[i:i + CUE_MAX_LINES] for i in range(0, len(lines), CUE_MAX_LINES)]
    total = sum(len(' '.join(g)) for g in groups) or 1
    out, t = [], start
    for i, g in enumerate(groups):
        share = (end - start) * len(' '.join(g)) / total
        e = end if i == len(groups) - 1 else max(t + min(MIN_CUE_S, end - t), t + share)
        out.append((round(t, 3), round(e, 3), '\n'.join(g)))
        t = e
    return out


def vtt_time(t):
    t = max(0.0, t)
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f'{int(h):02d}:{int(m):02d}:{s:06.3f}'


def vtt_escape(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def to_vtt(cues, header='WEBVTT'):
    body = [header, '']
    for i, (s, e, text) in enumerate(cues, start=1):
        body += [str(i), f'{vtt_time(s)} --> {vtt_time(e)}', vtt_escape(text), '']
    return '\n'.join(body)
