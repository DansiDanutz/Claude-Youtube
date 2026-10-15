#!/usr/bin/env python3
"""Romanian text helpers for the DYK No. 05 Romanian pilot: syllable counts (for the pace/drag gates) and spoken-number
values (for the whisper round-trip). The shared English tools strip diacritics and drop a final silent 'e', which
undercounts Romanian ('mâncare' is mân-ca-re, 3 syllables, not 1); these helpers replace them inside the ro/ wrappers
only — the shared tools in tools/dyk/ are not modified."""
import re
import unicodedata

VOWELS = "aeiouăâîy"
_VOWEL_RUN = re.compile(f"[{VOWELS}]+")
_LETTERS = re.compile(r"[^a-zăâîșțşţ]")
FOLD = str.maketrans({"ă": "a", "â": "a", "î": "i", "ș": "s", "ş": "s", "ț": "t", "ţ": "t"})


def syllables_ro(word):
    """Approximate Romanian syllable count. Clitic hyphens join one syllable group ("ne-a" = 1, "te-am" = 1);
    a word-final non-syllabic -i after a consonant is not a syllable ("oameni" = 2, "pomi" = 1);
    a run of three or more vowels is two syllables ("trăiești" = 2, "ziua" = 2, "ideea" = 3);
    a word-final -ie/-ia after a consonant is two ("scrie-ți" = 2, "India" = 3)."""
    parts = [_LETTERS.sub("", p) for p in word.lower().split("-")]
    w = "".join(parts)
    if not w:
        return 1
    runs = _VOWEL_RUN.findall(w)
    n = sum(2 if len(r) >= 3 else 1 for r in runs)
    # word-final -ie / -ia after a consonant is a hiatus: scri-e, mi-e, In-di-a, a-li-men-ta-ți-e
    n += sum(1 for p in parts if re.search(f"[^{VOWELS}]i[ea]$", p))
    if len(runs) > 1 and re.search(f"[^{VOWELS}]i$", w):
        n -= 1
    return max(1, n)


def fold(text):
    """Lower-case, diacritics folded (ă/â→a, î→i, ș→s, ț→t), other accents stripped."""
    t = text.lower().translate(FOLD)
    return "".join(c for c in unicodedata.normalize("NFKD", t) if not unicodedata.combining(c))


UNITS = {"zero": 0, "unu": 1, "unul": 1, "una": 1, "doi": 2, "doua": 2, "trei": 3, "patru": 4, "cinci": 5, "sase": 6,
         "sapte": 7, "opt": 8, "noua": 9, "zece": 10, "unsprezece": 11, "doisprezece": 12, "douasprezece": 12,
         "treisprezece": 13, "paisprezece": 14, "cincisprezece": 15, "saisprezece": 16, "saptesprezece": 17,
         "optsprezece": 18, "nouasprezece": 19}
TENS = {"douazeci": 20, "treizeci": 30, "patruzeci": 40, "cincizeci": 50, "saizeci": 60, "saptezeci": 70,
        "optzeci": 80, "nouazeci": 90}
HUNDRED = {"suta", "sute"}
SCALES = {"mie": 10 ** 3, "mii": 10 ** 3, "milion": 10 ** 6, "milioane": 10 ** 6, "miliard": 10 ** 9, "miliarde": 10 ** 9}
ARTICLE_ONE = {"o", "un", "una"}            # "o sută", "o mie", "un milion" — only inside a number run
DIGITS = re.compile(r"^\d+(?:[.,]\d+)?$")


def is_number_word(tok):
    return tok in UNITS or tok in TENS or tok in HUNDRED or tok in SCALES or bool(DIGITS.match(tok))


def _digit_value(tok):
    if re.fullmatch(r"\d{1,3}(?:\.\d{3})+", tok):       # Romanian thousands separator: 18.000
        return float(tok.replace(".", ""))
    return float(tok.replace(",", "."))


def number_value(run):
    """Value of a folded Romanian number run: 'o mie cinci sute' = 1500, 'doua mii o suta' = 2100,
    'o suta saizeci si noua' = 169, 'optsprezece mii' = 18000, '17 milioane' = 17e6."""
    total, current = 0.0, 0.0
    for tok in run:
        if tok in ARTICLE_ONE:
            current += 1
        elif tok == "si":
            continue
        elif DIGITS.match(tok):
            current += _digit_value(tok)
        elif tok in UNITS:
            current += UNITS[tok]
        elif tok in TENS:
            current += TENS[tok]
        elif tok in HUNDRED:
            current = (current or 1) * 100
        elif tok in SCALES:
            total, current = total + (current or 1) * SCALES[tok], 0.0
    return total + current


def tokens(text):
    """Folded word tokens with every Romanian number run collapsed to one '#<value>' token."""
    raw = [t for t in re.split(r"[\s\-]+", fold(text).replace("%", " procent")) if t]
    toks = [re.sub(r"[^a-z0-9.,]", "", t).strip(".,") for t in raw]
    toks = [t for t in toks if t]
    out, run = [], []
    for i, t in enumerate(toks + [""]):
        nxt = toks[i + 1] if i + 1 < len(toks) else ""
        joins = t == "si" and run and is_number_word(nxt)
        article = t in ARTICLE_ONE and (nxt in HUNDRED or nxt in SCALES)
        percent = t in HUNDRED and not run and i and toks[i - 1] == "la"     # "la sută" = percent, not 100
        if percent:
            out.append("procent")
            continue
        if run and DIGITS.match(t) and DIGITS.match(run[-1]):          # "70-80%" is two numbers
            out.append("#" + format(number_value(run), ".10g"))
            run = []
        if t and (is_number_word(t) or joins or article):
            run.append(t)
            continue
        if run:
            out.append("#" + format(number_value(run), ".10g"))
            run = []
        if t:
            out.append(t)
    return out
