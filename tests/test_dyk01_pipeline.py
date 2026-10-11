"""Regression tests for the Did You Know That? No. 01 pipeline gates.

The real quality() / retry / selection logic and the real alignment parser run here;
only the paid ElevenLabs call and the ffmpeg conversion are replaced.
"""
import base64
import importlib.util
import json
import os
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest import mock

WORK = Path(__file__).resolve().parents[1] / "videos" / "dyk-01-time-compressed" / "work"


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk01_{name}", WORK / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def words_at(pace, n=12, stretch=None):
    """n words evenly spaced at `pace` words/s; stretch=(index, seconds) lengthens one word."""
    step, words, t = 1 / pace, [], 0.0
    for i in range(n):
        d = step * 0.8
        if stretch and stretch[0] == i:
            d = stretch[1]
        words.append({"w": "word" if i < n - 1 else "end.", "s": round(t, 3), "e": round(t + d, 3)})
        t += max(step, d + 0.05)
    return words


def alignment(words):
    """Character-level ElevenLabs alignment for these words (parsed back by the real parser)."""
    chars, starts, ends = [], [], []
    for i, w in enumerate(words):
        span = (w["e"] - w["s"]) / len(w["w"])
        for k, ch in enumerate(w["w"]):
            chars.append(ch)
            starts.append(w["s"] + k * span)
            ends.append(w["s"] + (k + 1) * span)
        if i < len(words) - 1:
            chars.append(" ")
            starts.append(w["e"])
            ends.append(w["e"])
    return {"characters": chars, "character_start_times_seconds": starts, "character_end_times_seconds": ends}


def tts_reply(words, audio=b"take"):
    return {"audio_base64": base64.b64encode(audio).decode(), "alignment": alignment(words)}


class QualityGateTests(unittest.TestCase):
    def setUp(self):
        self.gv = load("gen_voice")

    def test_on_pace_line_passes(self):
        pace, probs = self.gv.quality(words_at(2.9))
        self.assertAlmostEqual(pace, 2.9, delta=0.15)
        self.assertEqual(probs, [])

    def test_pace_outside_ten_percent_fails(self):
        self.assertTrue(any("pace" in p for p in self.gv.quality(words_at(3.5))[1]))
        self.assertTrue(any("pace" in p for p in self.gv.quality(words_at(2.4))[1]))

    def test_stretched_word_mid_sentence_fails(self):
        _, probs = self.gv.quality(words_at(2.9, n=30, stretch=(5, 0.9)))
        self.assertTrue(any("stretched" in p for p in probs), probs)

    def test_word_over_one_second_fails_even_at_sentence_end(self):
        words = words_at(2.9, n=30)
        words[-1]["e"] = words[-1]["s"] + 1.2
        self.assertTrue(any("stretched 'end.'" in p for p in self.gv.quality(words)[1]))


class VoiceRetryAndRejectionTests(unittest.TestCase):
    def setUp(self):
        self.gv = load("gen_voice")
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.narr, self.mix = root / "narration", root / "mix"
        self.narr.mkdir()
        self.mix.mkdir()
        self.gv.NARR, self.gv.MIX = str(self.narr), str(self.mix)
        self.gv.api_key = lambda: "test-key"
        self.gv.mp3_to_wav = lambda mp3, wav: Path(wav).write_bytes(b"wav") and 4.2
        (self.narr / "script.json").write_text(json.dumps({"scenes": [{"id": "x01", "text": "line", "speed": 1.0}]}))

    def tearDown(self):
        self.tmp.cleanup()

    def run_main(self, replies, env=None):
        calls = []

        def fake_tts(text, key, speed=1.0):
            calls.append(speed)
            return replies[len(calls) - 1]

        self.gv.tts_with_timestamps = fake_tts
        with mock.patch.dict(os.environ, env or {}, clear=False), redirect_stdout(StringIO()):
            self.gv.main()
        return calls

    def test_failed_attempt_then_passing_attempt_keeps_the_passing_take(self):
        calls = self.run_main([tts_reply(words_at(3.6), b"fast"), tts_reply(words_at(2.9), b"good")])
        self.assertEqual(len(calls), 2)
        self.assertLess(calls[1], calls[0], "speed is nudged down toward the target pace")
        self.assertEqual((self.narr / "x01.mp3").read_bytes(), b"good")
        stored = json.loads((self.narr / "script.json").read_text())["scenes"][0]["speed"]
        self.assertEqual(stored, round(calls[1], 3))

    def test_line_failing_every_retry_is_rejected_and_canonical_take_untouched(self):
        (self.narr / "x01.mp3").write_bytes(b"old approved take")
        replies = [tts_reply(words_at(3.8), b"bad")] * self.gv.MAX_TRIES
        with self.assertRaises(SystemExit) as stop:
            self.run_main(replies, {"ONLY": "x01"})
        self.assertIn("x01", str(stop.exception))
        self.assertEqual((self.narr / "x01.mp3").read_bytes(), b"old approved take")
        self.assertEqual((self.narr / "x01.rejected.mp3").read_bytes(), b"bad")
        self.assertFalse((self.mix / "x01.wav").exists())
        self.assertEqual(json.loads((self.narr / "script.json").read_text())["scenes"][0]["speed"], 1.0)

    def test_explicit_override_accepts_a_failing_line(self):
        replies = [tts_reply(words_at(3.8), b"bad")] * self.gv.MAX_TRIES
        self.run_main(replies, {"ALLOW_GATE_FAIL": "1"})
        self.assertEqual((self.narr / "x01.mp3").read_bytes(), b"bad")

    def test_saved_mp3_without_wav_is_rebuilt_without_calling_the_api(self):
        (self.narr / "x01.mp3").write_bytes(b"paid take")
        calls = self.run_main([])
        self.assertEqual(calls, [])
        self.assertTrue((self.mix / "x01.wav").exists())
        self.assertEqual(json.loads((self.narr / "durations.json").read_text())["x01"], 4.2)


class NarrationFitGateTests(unittest.TestCase):
    def setUp(self):
        self.bf = load("build_final")

    def test_committed_timeline_fits(self):
        self.assertEqual(self.bf.narration_fit_problems(self.bf.SHOTS, self.bf.VO), [])

    def test_regenerated_take_that_outgrows_its_shot_is_rejected(self):
        vo = {"a": {"dur": 50.0}}
        self.assertEqual(self.bf.narration_fit_problems([("Shot", 51.0, [("a", 0.8)])], vo), [
            "a ends 50.80s but Shot cuts at 51.00s (needs 0.5s tail)"])
        self.assertEqual(self.bf.narration_fit_problems([("Shot", 51.5, [("a", 0.8)])], vo), [])

    def test_overlapping_lines_in_one_shot_are_rejected(self):
        vo = {"a": {"dur": 10.0}, "b": {"dur": 5.0}}
        probs = self.bf.narration_fit_problems([("Shot", 30.0, [("a", 0.5), ("b", 9.0)])], vo)
        self.assertEqual(probs, ["a overlaps b in Shot (10.50s > 9.00s)"])


if __name__ == "__main__":
    unittest.main()
