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


    def test_sentence_final_word_dragged_past_055_s_per_syllable_fails(self):
        # the "yeeet." at 1:08: a 0.71 s one-syllable word at the end of a sentence
        _, probs = self.gv.quality(words_at(2.9, n=30, stretch=(29, 0.71)))
        self.assertTrue(any("stretched 'end.'" in p for p in probs), probs)

    def test_sentence_final_word_within_055_s_per_syllable_passes(self):
        _, probs = self.gv.quality(words_at(2.9, n=30, stretch=(29, 0.45)))
        self.assertEqual(probs, [])

    def test_clause_final_word_keeps_only_the_one_second_rule(self):
        words = words_at(2.9, n=30, stretch=(5, 0.7))
        words[5]["w"] = "word,"
        self.assertEqual(self.gv.quality(words)[1], [])


class SyllableTests(unittest.TestCase):
    def test_syllable_estimate_handles_ee_and_le_endings(self):
        gv = load("gen_voice")
        self.assertEqual([gv.syllables(w) for w in ["Coffee.", "Dex-tee", "little", "time.", "horse."]], [2, 2, 2, 1, 1])


class ScenePaceTargetTests(unittest.TestCase):
    def setUp(self):
        self.gv = load("gen_voice")

    def test_gate_uses_the_scene_target_not_the_global_default(self):
        lively = words_at(3.3)
        self.assertEqual(self.gv.quality(lively, 3.3)[1], [])
        self.assertTrue(any("pace" in p for p in self.gv.quality(lively)[1]), "3.3 w/s is outside 2.9 ±10 %")
        self.assertTrue(any("target 3.3" in p for p in self.gv.quality(words_at(2.9), 3.3)[1]))

    def test_speed_nudge_never_drops_below_the_scene_floor(self):
        self.assertEqual(self.gv.next_speed(1.0, pace=3.9, target=3.3, floor=0.95), 0.95)
        self.assertAlmostEqual(self.gv.next_speed(1.0, pace=3.9, target=3.3), 3.3 / 3.9, places=6)
        self.assertEqual(self.gv.next_speed(1.15, pace=2.0, target=3.3, floor=0.95), 1.2)


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

    def test_scene_pace_target_and_speed_floor_drive_the_retries(self):
        (self.narr / "script.json").write_text(json.dumps({"scenes": [
            {"id": "x01", "text": "line", "speed": 1.0, "pace": 3.3, "speed_min": 0.95}]}))
        calls = self.run_main([tts_reply(words_at(3.9), b"rushed"), tts_reply(words_at(3.3), b"lively")])
        self.assertEqual(calls, [1.0, 0.95], "the nudge toward 3.3 w/s stops at the 0.95 floor")
        self.assertEqual((self.narr / "x01.mp3").read_bytes(), b"lively")
        self.assertEqual(json.loads((self.narr / "script.json").read_text())["scenes"][0]["speed"], 0.95)

    def test_take_at_the_old_global_pace_is_rejected_for_a_lively_scene(self):
        (self.narr / "script.json").write_text(json.dumps({"scenes": [
            {"id": "x01", "text": "line", "speed": 1.0, "pace": 3.3, "speed_min": 0.95}]}))
        with self.assertRaises(SystemExit):
            self.run_main([tts_reply(words_at(2.9), b"sleepy")] * self.gv.MAX_TRIES)
        self.assertEqual((self.narr / "x01.rejected.mp3").read_bytes(), b"sleepy")

    def test_saved_mp3_without_wav_is_rebuilt_without_calling_the_api(self):
        (self.narr / "x01.mp3").write_bytes(b"paid take")
        calls = self.run_main([])
        self.assertEqual(calls, [])
        self.assertTrue((self.mix / "x01.wav").exists())
        self.assertEqual(json.loads((self.narr / "durations.json").read_text())["x01"], 4.2)


class PauseInsertionTests(unittest.TestCase):
    def setUp(self):
        self.ip = load("insert_pauses")
        self.words = [{"w": "Welcome", "s": 0.0, "e": 0.4}, {"w": "That.", "s": 0.5, "e": 0.8},
                      {"w": "Every", "s": 0.86, "e": 1.1}, {"w": "rule:", "s": 1.2, "e": 1.5},
                      {"w": "before", "s": 1.55, "e": 1.9}, {"w": "end.", "s": 2.4, "e": 2.7}]

    def test_sentence_gaps_are_topped_up_and_explicit_pauses_added(self):
        cuts = self.ip.plan_pauses(self.words, {"min_sentence_gap": 0.35, "after": [{"word": "rule:", "add": 0.25}]})
        # "That." has a 0.06 s gap → +0.29 s; "rule:" gets exactly +0.25 s; the final "end." has no next word
        self.assertEqual(cuts, [(1, 0.29), (3, 0.25)])

    def test_words_after_each_cut_shift_by_the_inserted_silence(self):
        shifted = self.ip.shift_words(self.words, [(1, 0.29), (3, 0.25)])
        self.assertEqual([w["s"] for w in shifted], [0.0, 0.5, 1.15, 1.49, 2.09, 2.94])
        self.assertEqual([round(w["e"] - w["s"], 3) for w in shifted], [round(w["e"] - w["s"], 3) for w in self.words])
        self.assertEqual(self.words[2]["s"], 0.86, "the input words are not mutated")

    def test_no_pause_needed_when_the_gap_is_already_long(self):
        self.assertEqual(self.ip.plan_pauses(self.words[3:], {"min_sentence_gap": 0.35}), [])

    def test_missing_pause_word_fails_loudly(self):
        with self.assertRaises(ValueError):
            self.ip.plan_pauses(self.words, {"after": [{"word": "nowhere", "add": 0.3}]})

    def test_silence_is_spliced_at_the_cut_sample(self):
        pcm = bytes(range(1, 9))          # 4 samples of 16-bit audio at 4 Hz (0.25 s each)
        out = self.ip.insert_silence(pcm, [(0.5, 0.5)], rate=4, width=2)
        self.assertEqual(out, bytes([1, 2, 3, 4]) + b"\x00" * 4 + bytes([5, 6, 7, 8]))


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
