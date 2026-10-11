"""Regression tests for the Did You Know That? No. 02 ("The Sun") pipeline gates.

The real quality() / retry / selection logic and the real alignment parser run here;
only the paid ElevenLabs call and the ffmpeg conversion are replaced.
"""
import base64
import importlib.util
import json
import os
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest import mock

WORK = Path(__file__).resolve().parents[1] / "videos" / "dyk-02-the-sun" / "work"


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk02_{name}", WORK / f"{name}.py")
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
        self.gv.subscription = lambda key: {"tier": "creator", "character_count": 0, "character_limit": 100000}
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


class EpisodeTwoGateAdditionsTests(unittest.TestCase):
    """Gates added for No. 02: mid-sentence silences, hyphenated syllables, the Creator quota."""

    def setUp(self):
        self.gv = load("gen_voice")

    def test_mid_sentence_gap_over_limit_fails(self):
        words = words_at(2.9, n=30)
        for w in words[10:]:
            w["s"] += 1.5
            w["e"] += 1.5
        self.assertTrue(any(p.startswith("gap") for p in self.gv.quality(words)[1]))

    def test_gap_after_sentence_end_is_allowed(self):
        words = words_at(2.9, n=30)
        words[9]["w"] = "end."
        for w in words[10:]:
            w["s"] += 1.3
            w["e"] += 1.3
        self.assertFalse(any(p.startswith("gap") for p in self.gv.quality(words)[1]))

    def test_hyphenated_brand_counts_each_part(self):
        self.assertEqual(self.gv.syllables("Dex-tee"), 2)
        self.assertEqual(self.gv.syllables("time"), 1)

    def test_quota_gate_stops_before_any_paid_call(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        narr = Path(tmp.name) / "narration"
        narr.mkdir()
        (Path(tmp.name) / "mix").mkdir()
        self.gv.NARR, self.gv.MIX = str(narr), str(Path(tmp.name) / "mix")
        (narr / "script.json").write_text(json.dumps({"scenes": [{"id": "x01", "text": "x" * 100, "speed": 1.0}]}))
        self.gv.api_key = lambda: "test-key"
        self.gv.subscription = lambda key: {"tier": "creator", "character_count": 999, "character_limit": 1000}
        calls = []
        self.gv.tts_with_timestamps = lambda *a, **k: calls.append(a)
        with redirect_stdout(StringIO()), self.assertRaises(SystemExit) as stop:
            self.gv.main()
        self.assertIn("quota", str(stop.exception))
        self.assertEqual(calls, [])


class CueSheetTests(unittest.TestCase):
    """The shared cue table (cues.py) resolves on the real narration and respects the pacing rules."""

    def setUp(self):
        self.bf = load("build_final")

    def test_every_cue_resolves_and_has_a_visual(self):
        sheet = self.bf.cue_sheet()
        self.assertGreater(len(sheet), 300)
        self.assertTrue(all(vis for _, _, _, vis in sheet))
        self.assertTrue(all(0 <= t <= self.bf.TOTAL for t, *_ in sheet))

    def test_never_more_than_three_clicks_per_second(self):
        clicks = [t for t, clip, _, _ in self.bf.cue_sheet() if clip == "ui-click-soft"]
        self.assertLessEqual(max(sum(1 for u in clicks if t <= u < t + 1) for t in clicks), 3)

    def test_dyk_click_before_did_and_chime_after_that(self):
        for scene in self.bf.CUE_TABLE.ERA_VO:
            did = self.bf.w(scene, "Did")
            self.assertLess(self.bf.w(scene, "Did", shift=-0.25), did)
            self.assertGreater(self.bf.after_did(scene), did)

    def test_timeline_is_whole_frames(self):
        for _, dur, _ in self.bf.SHOTS:
            self.assertAlmostEqual(dur * 30, round(dur * 30), places=6)


class PaceTargetAndFloorTests(unittest.TestCase):
    """Never-sleepy rules: per-scene/chunk pace target, 0.95 speed floor, sentence-final drag, stitched chunks."""

    def setUp(self):
        self.gv = load("gen_voice")
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.narr, self.mix = root / "narration", root / "mix"
        self.narr.mkdir()
        self.mix.mkdir()
        self.gv.NARR, self.gv.MIX = str(self.narr), str(self.mix)
        self.gv.api_key = lambda: "test-key"
        self.gv.subscription = lambda key: {"tier": "creator", "character_count": 0, "character_limit": 100000}

    def tearDown(self):
        self.tmp.cleanup()

    def script(self, scene):
        (self.narr / "script.json").write_text(json.dumps({"scenes": [scene]}))

    def run_main(self, replies):
        calls = []

        def fake_tts(text, key, speed=1.0):
            calls.append((text, speed))
            return replies[len(calls) - 1]

        self.gv.tts_with_timestamps = fake_tts
        with redirect_stdout(StringIO()):
            self.gv.main()
        return calls

    def test_gate_uses_the_scene_pace_not_the_global_default(self):
        self.assertEqual(self.gv.quality(words_at(3.3), 3.3)[1], [])
        self.assertTrue(any("pace" in p for p in self.gv.quality(words_at(3.3))[1]), "3.3 w/s fails the 2.9 default")

    def test_pace_zero_skips_the_pace_gate_for_a_sign_off(self):
        self.assertFalse(any("pace" in p for p in self.gv.quality(words_at(1.5, n=3), 0)[1]))

    def test_speed_never_drops_below_the_floor(self):
        self.gv.mp3_to_wav = lambda mp3, wav: Path(wav).write_bytes(b"wav") and 4.2
        self.script({"id": "h01", "text": "hook", "floor": 0.95, "chunks": [{"text": "hook", "pace": 3.3}]})
        too_fast = [tts_reply(words_at(4.2), b"fast")] * self.gv.MAX_TRIES
        with self.assertRaises(SystemExit):
            self.run_main(too_fast)
        # a line that is too FAST would be slowed — but never below the floor
        self.gv.tts_with_timestamps = None
        calls = []
        self.gv.tts_with_timestamps = lambda text, key, speed=1.0: calls.append(speed) or tts_reply(words_at(4.2))
        with redirect_stdout(StringIO()), self.assertRaises(SystemExit):
            self.gv.main()
        self.assertTrue(all(sp >= 0.95 for sp in calls), calls)

    def test_sentence_final_drag_fails_at_055_per_syllable(self):
        words = words_at(2.9, n=20)
        words[9]["w"] = "yet."
        words[9]["e"] = words[9]["s"] + 0.7
        self.assertTrue(any("stretched 'yet.'" in p for p in self.gv.quality(words)[1]))
        words[9]["e"] = words[9]["s"] + 0.5
        self.assertFalse(any("yet." in p for p in self.gv.quality(words)[1]))

    def test_comma_word_is_not_sentence_final(self):
        words = words_at(2.9, n=20)
        words[9]["w"] = "red,"
        words[9]["e"] = words[9]["s"] + 0.6
        self.assertFalse(any("red," in p for p in self.gv.quality(words)[1]))

    def test_chunks_are_gated_on_their_own_pace_and_stitched_with_a_gap(self):
        import wave

        def fake_wav(mp3, wav):
            with wave.open(wav, "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(48000)
                w.writeframes(b"\x00\x00" * 48000 * 4)
            return 4.0
        self.gv.mp3_to_wav = fake_wav
        self.gv.subprocess = mock.MagicMock()
        self.gv.probe_duration = lambda path: 8.25
        self.script({"id": "e01", "text": "a b", "chunks": [{"text": "a", "pace": 3.0}, {"text": "b", "pace": 2.8}]})
        calls = self.run_main([tts_reply(words_at(3.0)), tts_reply(words_at(2.8))])
        self.assertEqual([c[0] for c in calls], ["a", "b"])
        words = json.loads((self.narr / "e01.words.json").read_text())
        first_b = words[12]["s"]
        self.assertAlmostEqual(first_b, 4.0 + self.gv.CHUNK_GAP_S, places=2)

    def test_cached_chunk_from_an_older_gate_is_regenerated(self):
        ch = {"text": "x", "pace": 2.9}
        base = self.gv.chunk_key("e02", 0, ch)
        os.makedirs(os.path.dirname(base), exist_ok=True)
        Path(base + ".mp3").write_bytes(b"old")
        bad = words_at(2.9, n=20)
        bad[-1]["e"] = bad[-1]["s"] + 0.9          # a dragged final word the old gate allowed
        Path(base + ".json").write_text(json.dumps({"words": bad, "speed": 1.0}))
        self.assertIsNone(self.gv.cached_take("e02", 0, ch))
        Path(base + ".json").write_text(json.dumps({"words": words_at(2.9, n=20), "speed": 1.0}))
        self.assertIsNotNone(self.gv.cached_take("e02", 0, ch))


class LeanInFloorAndShotSyncTests(unittest.TestCase):
    """David's option A: lean-in chunks (facts, cliffhangers) carry pace 3.0 and floor 0.85 — and the shots match the timeline."""

    def setUp(self):
        self.gv = load("gen_voice")

    def test_lean_in_chunk_cannot_settle_below_its_085_floor(self):
        speeds = []
        self.gv.tts_with_timestamps = lambda text, key, speed=1.0: speeds.append(speed) or tts_reply(words_at(3.9))
        with redirect_stdout(StringIO()):
            resp, words, probs, speed = self.gv.generate("fact", 3.0, 1.0, 0.85, "k")
        self.assertTrue(probs, "a too-fast take at the floor must stay rejected, not be slowed further")
        self.assertGreaterEqual(min(speeds), 0.85)
        self.assertGreaterEqual(speed, 0.85)

    def test_chunk_floor_overrides_the_scene_default(self):
        script = json.loads((WORK / "narration" / "script.json").read_text())
        lean = [(s["id"], k) for s in script["scenes"] for k, ch in enumerate(s.get("chunks", [])) if ch.get("floor") == 0.85]
        self.assertGreaterEqual(len(lean), 13)
        for s in script["scenes"]:
            for ch in s.get("chunks", []):
                self.assertGreaterEqual(ch.get("speed", 1.0), 0.85, (s["id"], ch["text"][:30]))

    def test_shots_match_the_timeline(self):
        import subprocess
        r = subprocess.run([sys.executable, str(WORK / "sync_shots.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)


if __name__ == "__main__":
    unittest.main()
