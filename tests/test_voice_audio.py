"""Audio-side voice checks on synthetic PCM: refine_ends (No. 03 alignment drags) and tail artefacts (No. 03 HIGH)."""
import base64
import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("voice_audio", ROOT / "tools" / "dyk" / "voice_audio.py")
va = importlib.util.module_from_spec(spec)
spec.loader.exec_module(va)
RATE = va.RATE


def tone(segments, total_s, amp=0.3):
    """220 Hz tone over each (start, end) span, silence elsewhere."""
    x = np.zeros(int(total_s * RATE))
    for a, b in segments:
        i, j = int(a * RATE), int(b * RATE)
        x[i:j] = amp * np.sin(2 * np.pi * 220 * np.arange(j - i) / RATE)
    return x


class RefineEndsTests(unittest.TestCase):
    def test_trailing_silence_after_a_sentence_final_word_is_trimmed(self):
        words = [{"w": "the", "s": 0.0, "e": 0.4}, {"w": "cane.", "s": 0.5, "e": 1.13}, {"w": "Then", "s": 1.13, "e": 1.5}]
        out = va.refine_ends_pcm(words, tone([(0.0, 0.4), (0.5, 0.85), (1.13, 1.5)], 1.6))
        self.assertAlmostEqual(out[1]["e"], 0.85, delta=0.02)
        self.assertEqual([w["s"] for w in out], [w["s"] for w in words])

    def test_voiced_word_keeps_its_length(self):
        words = [{"w": "the", "s": 0.0, "e": 0.4}, {"w": "cane.", "s": 0.5, "e": 1.3}]
        self.assertAlmostEqual(va.refine_ends_pcm(words, tone([(0.0, 0.4), (0.5, 1.3)], 1.4))[1]["e"], 1.3, delta=0.011)

    def test_ends_never_leave_the_aligned_bounds(self):
        words = [{"w": "tick", "s": 0.20, "e": 0.60}, {"w": "on", "s": 1.00, "e": 1.20}]
        out = va.refine_ends_pcm(words, tone([(0.20, 0.21), (1.00, 1.40)], 1.5))
        self.assertAlmostEqual(out[0]["e"], 0.25, places=3)          # held to the 0.05 s minimum
        self.assertEqual(out[1]["e"], 1.20)                          # never later than aligned

    def test_wrapper_decodes_the_take_once(self):
        words = [{"w": "hi.", "s": 0.0, "e": 0.9}]
        with mock.patch.object(va, "decode", return_value=tone([(0.0, 0.4)], 1.0)) as dec:
            out = va.refine_ends(words, base64.b64encode(b"mp3").decode())
        dec.assert_called_once_with(b"mp3")
        self.assertAlmostEqual(out[0]["e"], 0.4, delta=0.02)


class TailArtefactTests(unittest.TestCase):
    words = [{"w": "One", "s": 0.0, "e": 0.3}, {"w": "hour.", "s": 0.4, "e": 1.4}]

    def test_clean_take_passes(self):
        self.assertIsNone(va.tail_artefact(self.words, tone([(0.0, 0.3), (0.4, 0.9)], 1.4)))

    def test_fragment_after_the_last_word_is_caught(self):
        # No. 03 sc11 c5: a 0.4 s unscripted fragment after "hour." — alignment hides it inside the last word
        hit = va.tail_artefact(self.words, tone([(0.0, 0.3), (0.4, 0.9), (1.1, 1.3)], 1.4))
        self.assertIsNotNone(hit)
        self.assertAlmostEqual(hit[0], 1.1, delta=0.02)

    def test_stop_consonant_closure_is_not_an_artefact(self):
        # "start." = vowel, ~60 ms closure, burst
        self.assertIsNone(va.tail_artefact(self.words, tone([(0.0, 0.3), (0.4, 0.8), (0.86, 0.92)], 1.4)))

    def test_mouth_click_shorter_than_a_syllable_is_ignored(self):
        # two 30-40 ms clicks ~25 dB under the speech in the No. 03 cache; the real artefact was 0.19-0.4 s
        self.assertIsNone(va.tail_artefact(self.words, tone([(0.0, 0.3), (0.4, 0.9), (1.2, 1.24)], 1.4, )))
        self.assertIsNotNone(va.tail_artefact(self.words, tone([(0.0, 0.3), (0.4, 0.9), (1.2, 1.29)], 1.4)))

    def test_room_noise_far_below_speech_is_ignored(self):
        x = tone([(0.0, 0.3), (0.4, 0.9)], 1.4) + tone([(1.0, 1.3)], 1.4, amp=0.3 * 10 ** (-45 / 20))
        self.assertIsNone(va.tail_artefact(self.words, x))


class CliTests(unittest.TestCase):
    def test_scan_flags_only_the_bad_chunk(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d)
            for name, segs in (("good.c1.aaa", [(0.0, 0.3), (0.4, 0.9)]), ("bad.c1.bbb", [(0.0, 0.3), (0.4, 0.9), (1.1, 1.3)])):
                (p / f"{name}.json").write_text(json.dumps({"words": TailArtefactTests.words, "speed": 1.0}))
                (p / f"{name}.mp3").write_bytes(name.encode())
            fixtures = {b"good.c1.aaa": tone([(0.0, 0.3), (0.4, 0.9)], 1.4),
                        b"bad.c1.bbb": tone([(0.0, 0.3), (0.4, 0.9), (1.1, 1.3)], 1.4)}
            with mock.patch.object(va, "decode", side_effect=lambda b: fixtures[b]), \
                    contextlib.redirect_stdout(io.StringIO()) as out:
                code = va.main(["--tails", str(p)])
            self.assertEqual(code, 1)
            self.assertIn("bad.c1.bbb", out.getvalue())
            self.assertNotIn("good.c1.aaa", out.getvalue())

    def test_missing_dir_fails_closed(self):
        with contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(va.main(["--tails", "/nonexistent/chunks"]), 1)


if __name__ == "__main__":
    unittest.main()
