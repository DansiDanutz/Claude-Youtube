"""Per-language constants for the DYK dubs, measured with Brian (eleven_multilingual_v2) on 2026-10-16.

CPS = spoken characters per second at speed 1.0, measured on a typical narration sentence including its natural
pauses (ro 129 chars / 8.08 s, fr 132 / 7.34 s, es 126 / 7.80 s, zh 42 / 9.33 s). The English narration runs at about
18.6 characters per second inside its sentence windows, so Romanian and Spanish need to be a few percent SHORTER in
characters than English to fit the same slot; French can be about equal; Chinese needs about a quarter of the characters.
"""
import re

CPS = {'ro': 16.0, 'fr': 18.0, 'es': 16.2, 'zh': 4.5}
NAMES = {'ro': 'Romanian', 'fr': 'French', 'es': 'Spanish', 'zh': 'Simplified Chinese (Mandarin)'}
SPEED_FIT = 1.06            # the budget assumes Brian is voiced at this speed (band 0.90-1.08)
SIM_SPEED = 1.04            # the checker simulates a slightly slower voice, so passing it leaves headroom
BREATH_S = 0.22             # a dub sentence must end this long before the next English sentence starts
MAX_LAG_S = 1.0             # a chunk may run this far behind its English timing before it fails
TERMINAL = re.compile(r'[.?!…。？！][\"\'’”»」)\]]*$')


def max_chars(lang, slot_s):
    """Most characters a sentence may have to be voiced inside `slot_s` (with a breath reserved)."""
    return max(8, int((slot_s - BREATH_S) * CPS[lang] * SPEED_FIT))


def predicted_s(lang, chars, speed=SIM_SPEED):
    return chars / (CPS[lang] * speed)
