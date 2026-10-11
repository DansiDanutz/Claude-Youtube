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

    def test_long_word_may_pass_one_second_only_with_enough_syllables(self):
        words = words_at(3.0, n=20)
        words[10] = {"w": "Photosynthesis.", "s": words[10]["s"], "e": words[10]["s"] + 1.15}
        for w in words[11:]:
            w["s"], w["e"] = w["s"] + 1.2, w["e"] + 1.2
        self.assertFalse(any("Photosynthesis" in p for p in self.gv.quality(words, 0)[1]))
        words[10]["e"] = words[10]["s"] + 1.4
        self.assertTrue(any("Photosynthesis" in p for p in self.gv.quality(words, 0)[1]))

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

    def test_stitch_fades_chunk_edges_and_levels_an_outlier_chunk(self):
        # voice audit 2026-10-12: the outro sign-off chunk sat +3.1 LU over its scene and started on a full-scale step
        import numpy as np
        import wave
        rate = 48000

        def tone(path, amp, sec=1.0):
            t = np.arange(int(sec * rate)) / rate
            pcm = (amp * 32767 * np.sin(2 * np.pi * 220 * t + 1.0)).astype("<i2")
            with wave.open(path, "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(rate)
                w.writeframes(pcm.tobytes())
        paths = [str(self.mix / f"p{k}.wav") for k in range(4)]
        for p, amp in zip(paths, (0.1, 0.1, 0.11, 0.3)):   # the last part is ~9.5 dB hot
            tone(p, amp)
        out = str(self.mix / "out.wav")
        word = [{"w": "x.", "s": 0.1, "e": 0.9}]
        with redirect_stdout(StringIO()):
            self.gv.stitch([(p, word) for p in paths], out)
        with wave.open(out) as w:
            y = np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(float) / 32768
        step = int(round((1.0 + self.gv.CHUNK_GAP_S) * rate))
        parts = [y[k * step:k * step + rate] for k in range(4)]
        levels = [self.gv.speech_level_db(p) for p in parts]
        self.assertAlmostEqual(levels[3], levels[0], delta=1.0)           # outlier pulled to the scene median
        self.assertAlmostEqual(levels[2] - levels[0], 20 * np.log10(1.1), delta=0.2)   # inside tolerance: untouched
        for p in parts:
            self.assertLess(abs(p[0]), 0.01)                               # no step into the first sample
            self.assertLess(abs(p[-1]), 0.01)                              # or out of the last

    def test_continuity_flags_speed_steps_pace_steps_and_rushed_chunks(self):
        # voice audit 2026-10-12: David heard 1.0 -> 1.2 -> 0.85 lurches (7:15-7:41, 8:15-8:21)
        gv = self.gv
        self.assertEqual(gv.continuity_problems([(1.0, 3.0, 3.0), (1.05, 3.1, 3.0), (0.98, 2.9, 2.9)]), [])
        probs = gv.continuity_problems([(1.0, 3.0, 3.0), (1.2, 3.1, 3.0), (0.85, 2.7, 2.9)])
        self.assertTrue(any("speed 1.00 -> 1.20" in p for p in probs))
        self.assertTrue(any("speed 1.20 -> 0.85" in p for p in probs))
        self.assertTrue(any("above" in p for p in probs))                      # 1.2 > SPEED_MAX
        self.assertTrue(any("below" in p for p in probs))                      # 0.85 < SPEED_LO
        self.assertTrue(any("speech rate" in p for p in gv.continuity_problems([(1.0, 4.0, 3.0), (1.0, 5.2, 3.0)])))
        self.assertEqual(gv.continuity_problems([(1.0, 4.0, 3.0), (1.0, 4.8, 3.0)]), [])          # 20 %: listed, not failed
        # a deliberate sign-off (pace target 0) is exempt from the w/s step, not from the speed step
        self.assertEqual(gv.continuity_problems([(1.0, 3.0, 3.0), (1.0, 2.2, 0)]), [])

    def test_speech_rate_ignores_pauses(self):
        words = [{"w": "a", "s": 0.0, "e": 0.3}, {"w": "b.", "s": 0.35, "e": 0.65}, {"w": "c", "s": 1.65, "e": 1.95}]
        self.assertAlmostEqual(self.gv.articulation_rate(words), 3 / 0.95, places=3)   # the 1.0 s pause is not tempo
        long = [{"w": "Florence", "s": 0.0, "e": 0.5}]
        self.assertAlmostEqual(self.gv.articulation_rate(long), 2 / 0.5)                 # syllables, not words

    def test_chunk_speed_is_held_within_a_step_of_its_neighbour(self):
        speeds = []
        self.gv.tts_with_timestamps = lambda text, key, speed=1.0: speeds.append(speed) or tts_reply(words_at(2.0))
        with redirect_stdout(StringIO()):
            self.gv.generate("slow line", 3.0, 1.0, 0.85, "k", lo=0.92, hi=1.08)
        self.assertLessEqual(max(speeds), 1.08)
        self.assertGreaterEqual(min(speeds), 0.92)

    def test_cached_take_outside_the_neighbour_band_is_regenerated(self):
        ch = {"text": "y", "pace": 2.9}
        base = self.gv.chunk_key("e03", 0, ch)
        os.makedirs(os.path.dirname(base), exist_ok=True)
        Path(base + ".mp3").write_bytes(b"old")
        Path(base + ".json").write_text(json.dumps({"words": words_at(2.9, n=20), "speed": 1.2}))
        self.assertIsNone(self.gv.cached_take("e03", 0, ch))                   # above SPEED_MAX
        Path(base + ".json").write_text(json.dumps({"words": words_at(2.9, n=20), "speed": 1.0}))
        self.assertIsNone(self.gv.cached_take("e03", 0, ch, lo=1.05, hi=1.08))
        self.assertIsNotNone(self.gv.cached_take("e03", 0, ch, lo=0.92, hi=1.08))

    def test_payoff_chunk_is_never_generated_above_speed_one(self):
        self.gv.mp3_to_wav = lambda mp3, wav: 4.0
        self.gv.subprocess = mock.MagicMock()
        self.gv.probe_duration = lambda path: 8.25
        self.gv.stitch = lambda parts, out: []
        self.script({"id": "e05", "text": "a b", "chunks": [{"text": "a", "pace": 3.0}, {"text": "b", "pace": 3.0, "payoff": True}]})
        speeds = []

        def fake_tts(text, key, speed=1.0):
            speeds.append((text, speed))
            return tts_reply(words_at(3.0 if text == "a" else 2.0))   # the payoff take reads slow: the gate wants faster
        self.gv.tts_with_timestamps = fake_tts
        with redirect_stdout(StringIO()), self.assertRaises(SystemExit):
            self.gv.main()
        self.assertTrue(any(t == "b" for t, _ in speeds))
        self.assertLessEqual(max(sp for t, sp in speeds if t == "b"), 1.0)

    def test_scene_with_a_speed_lurch_between_chunks_is_rejected(self):
        self.gv.mp3_to_wav = lambda mp3, wav: 4.0
        self.gv.subprocess = mock.MagicMock()
        self.gv.probe_duration = lambda path: 8.25
        self.gv.stitch = lambda parts, out: []
        self.script({"id": "e04", "text": "a b", "chunks": [{"text": "a", "pace": 3.0}, {"text": "b", "pace": 3.0}]})
        replies = [tts_reply(words_at(3.0)), tts_reply(words_at(3.6))]          # chunk 2 lands 20 % faster
        with self.assertRaises(SystemExit):
            self.run_main(replies + [tts_reply(words_at(3.6))] * 3)
        self.assertFalse((self.narr / "e04.mp3").exists())

    def test_committed_script_passes_the_continuity_gate(self):
        script = json.loads((WORK / "narration" / "script.json").read_text())
        gv = load("gen_voice")
        for sc in script["scenes"]:
            chunks = gv.chunks_of(sc)
            metas = []
            for k, ch in enumerate(chunks):
                base = gv.chunk_key(sc["id"], k, ch) + ".json"
                if len(chunks) > 1:
                    meta = json.loads(Path(base).read_text())
                    metas.append((meta["speed"], gv.articulation_rate(meta["words"]), ch.get("pace", gv.PACE_TARGET)))
                else:
                    metas.append((ch.get("speed", 1.0), ch.get("pace", 3.0), ch.get("pace", 3.0)))
            self.assertEqual(gv.continuity_problems(metas), [], sc["id"])

    def test_level_gains_only_touch_chunks_outside_the_tolerance(self):
        self.assertEqual(self.gv.level_gains([-23.0, -22.0, -24.0, -19.4]), [0.0, 0.0, 0.0, -3.1])
        self.assertEqual(self.gv.level_gains([-23.0]), [0.0])
        # one-word sign-off chunks never move the reference: the long chunks stay put, the hot short one comes down
        self.assertEqual(self.gv.level_gains([-23.0, -22.5, -23.2, -19.0, -18.5], durations=[20, 8, 7, 0.4, 0.5]),
                         [0.0, 0.0, 0.0, -4.0, -4.5])

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


class V2PipelineTests(unittest.TestCase):
    """v2 additions: the 0.85 floor for every chunk, the breaths (pauses) step, paused vo.json, per-shot cue parts."""

    def test_every_chunk_has_the_085_floor_even_without_a_floor_key(self):
        gv = load("gen_voice")
        self.assertEqual(gv.SPEED_MIN, 0.85)
        speeds = []
        gv.tts_with_timestamps = lambda text, key, speed=1.0: speeds.append(speed) or tts_reply(words_at(4.5))
        with redirect_stdout(StringIO()):
            gv.generate("era line", 3.0, 1.0, gv.SPEED_MIN, "k")
        self.assertGreaterEqual(min(speeds), 0.85)

    def test_pauses_top_up_sentence_gaps_and_add_named_beats(self):
        ip = load("insert_pauses")
        words = [{"w": "One.", "s": 0.0, "e": 0.4}, {"w": "Two?", "s": 0.5, "e": 0.9}, {"w": "three", "s": 1.4, "e": 1.8},
                 {"w": "four.", "s": 1.9, "e": 2.3}]
        cuts = ip.plan_pauses(words, {"min_sentence_gap": 0.3, "after": [{"word": "two?", "nth": 1, "add": 0.35}]})
        self.assertEqual(cuts, [(0, 0.2), (1, 0.35)])          # 0.1 s gap topped up to 0.3; 0.5 s gap left alone + 0.35 beat
        shifted = ip.shift_words(words, cuts)
        self.assertAlmostEqual(shifted[1]["s"], 0.7)
        self.assertAlmostEqual(shifted[2]["s"], 1.4 + 0.55)

    def test_pause_rule_matches_the_exact_token_not_an_earlier_word_without_its_punctuation(self):
        # voice audit 2026-10-12: "that?" fired on the channel name "That." (0:37) and "you?" on "You wake up" (1:14)
        ip = load("insert_pauses")
        words = [{"w": "Know", "s": 0.0, "e": 0.2}, {"w": "That.", "s": 0.25, "e": 0.5}, {"w": "Episode", "s": 0.82, "e": 1.2},
                 {"w": "old", "s": 1.3, "e": 1.5}, {"w": "is", "s": 1.55, "e": 1.6}, {"w": "that?", "s": 1.65, "e": 1.9},
                 {"w": "Guess", "s": 2.3, "e": 2.6}]
        self.assertEqual(ip.plan_pauses(words, {"after": [{"word": "that?", "nth": 1, "add": 0.35}]}), [(5, 0.35)])
        with self.assertRaises(ValueError):
            ip.plan_pauses(words, {"after": [{"word": "that?", "nth": 2, "add": 0.35}]})

    def test_cut_goes_to_the_quietest_point_of_the_gap(self):
        import numpy as np
        ip = load("insert_pauses")
        rate = 1000
        x = np.full(1000, 0.3)
        x[540:560] = 0.0                                   # the real silence sits late in the aligned gap
        words = [{"w": "a", "s": 0.0, "e": 0.5}, {"w": "b", "s": 0.58, "e": 1.0}]
        self.assertAlmostEqual(ip.cut_time(words, 0), 0.54)                      # no audio: the gap's middle
        self.assertAlmostEqual(ip.cut_time(words, 0, x, rate), 0.55, delta=0.006)

    def test_inserted_silence_is_entered_and_left_through_short_fades(self):
        import numpy as np
        ip = load("insert_pauses")
        rate = 1000
        pcm = (np.full(100, 16000, dtype="<i2")).tobytes()
        out = np.frombuffer(ip.insert_silence(pcm, [(0.05, 0.02)], rate=rate, width=2, fade_s=0.01), dtype="<i2")
        self.assertEqual(out.size, 120)
        self.assertEqual(out[0], 16000)
        self.assertLess(abs(int(out[49])), 2000)           # faded out right before the silence
        self.assertTrue((out[50:70] == 0).all())
        self.assertLess(abs(int(out[70])), 2000)           # faded back in right after it
        self.assertEqual(out[-1], 16000)

    def test_even_pace_slows_a_fast_chunk_with_sentence_breaths_only(self):
        # voice preflight: neighbouring chunks within 10 % w/s — the faster chunk gets longer sentence breaths
        ip = load("insert_pauses")

        def run(start, n, pace, sentence_every=3):
            out, t = [], start
            for k in range(n):
                end = (k + 1) % sentence_every == 0 or k == n - 1
                out.append({"w": "w." if end else "w", "s": round(t, 3), "e": round(t + 0.8 / pace, 3)})
                t += 1 / pace
            return out
        slow = run(0.0, 12, 2.5)
        fast = run(slow[-1]["e"] + 0.3, 12, 3.3)
        words = slow + fast
        chunks = [{"text": " ".join(["w"] * 12), "pace": 2.6}, {"text": " ".join(["w"] * 12), "pace": 3.0}]
        cuts = ip.even_pace_cuts(words, chunks)
        self.assertTrue(cuts and all(i >= 12 for i, _ in cuts))                  # only the fast chunk changes
        self.assertTrue(all(ip.SENTENCE_END.search(words[i]["w"]) for i, _ in cuts))
        shifted = ip.shift_words(words, sorted(cuts))
        rate = lambda ws: len(ws) / (ws[-1]["e"] - ws[0]["s"])
        self.assertLessEqual(rate(shifted[12:]) / rate(shifted[:12]), 1.10)
        self.assertGreaterEqual(rate(shifted[12:]), 0.9 * 3.0 - 1e-6)            # never below its own pace floor

    def test_even_pace_caps_a_payoff_chunk_and_skips_a_sign_off(self):
        ip = load("insert_pauses")
        words = [{"w": "a.", "s": 0.0, "e": 0.2}, {"w": "b", "s": 0.3, "e": 0.5}, {"w": "c.", "s": 0.55, "e": 0.75},
                 {"w": "d", "s": 0.8, "e": 1.0}, {"w": "Ask...", "s": 1.5, "e": 1.8}]
        chunks = [{"text": "a. b c. d", "pace": 3.0, "payoff": True}, {"text": "Ask...", "pace": 0}]
        cuts = ip.even_pace_cuts(words, chunks)
        shifted = ip.shift_words(words, sorted(cuts))
        self.assertLessEqual(4 / (shifted[3]["e"] - shifted[0]["s"]), ip.PAYOFF_WPS_MAX)

    def test_pause_on_a_missing_word_fails_loudly(self):
        ip = load("insert_pauses")
        with self.assertRaises(ValueError):
            ip.plan_pauses([{"w": "a.", "s": 0, "e": 0.3}, {"w": "b", "s": 0.4, "e": 0.6}], {"after": [{"word": "zzz", "add": 0.2}]})

    def test_insert_silence_places_the_gap_at_the_cut(self):
        ip = load("insert_pauses")
        pcm = b"\x01\x00" * 10
        out = ip.insert_silence(pcm, [(0.5, 0.2)], rate=10, width=2)
        self.assertEqual(out, b"\x01\x00" * 5 + b"\x00\x00" * 2 + b"\x01\x00" * 5)

    def test_vo_json_uses_the_paused_take_and_refuses_a_stale_one(self):
        mv = load("make_vo_json")
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        mv.NARR = tmp.name
        raw, paused = Path(tmp.name) / "p01.words.json", Path(tmp.name) / "p01.paused.json"
        raw.write_text("[]")
        sc = {"id": "p01", "pauses": {"min_sentence_gap": 0.3}}
        with self.assertRaises(SystemExit):
            mv.scene_vo(sc, {"p01": 1.0})
        paused.write_text(json.dumps({"dur": 1.3, "words": []}))
        os.utime(paused, (os.path.getmtime(raw) + 5, os.path.getmtime(raw) + 5))
        self.assertEqual(mv.scene_vo(sc, {"p01": 1.0})["dur"], 1.3)
        self.assertEqual(mv.scene_vo({"id": "p01"}, {"p01": 1.0})["dur"], 1.0)

    def test_committed_vo_json_matches_the_paused_takes(self):
        vo = json.loads((WORK.parents[2] / "remotion" / "src" / "shots" / "dyk-02" / "vo.json").read_text())
        script = json.loads((WORK / "narration" / "script.json").read_text())
        for sc in script["scenes"]:
            if sc.get("pauses"):
                paused = json.loads((WORK / "narration" / f"{sc['id']}.paused.json").read_text())
                self.assertEqual(vo[sc["id"]]["dur"], paused["dur"], sc["id"])

    def test_loud_cue_inside_a_word_moves_to_the_nearest_gap(self):
        bf = load("build_final")
        spans = [(10.0, 10.5), (10.6, 11.4)]
        self.assertEqual(bf.off_word(10.42, "whoosh-soft", spans), 10.5)          # near the end: into the gap after
        self.assertEqual(bf.off_word(10.65, "whoosh-soft", spans), 10.6)          # just after the onset: to the onset
        self.assertEqual(bf.off_word(10.9, "pop-reveal", spans), 11.4)            # middle of a long word: its end
        self.assertEqual(bf.off_word(10.9, "ui-click-soft", spans), 10.9)         # soft clicks may sit on words
        self.assertEqual(bf.off_word(10.55, "impact-soft", spans), 10.55)         # already in a gap
        self.assertEqual(bf.off_word(10.9, "riser-soft", spans), 10.6)            # a riser starts earlier, never later

    def test_payoff_line_carries_only_the_riser_and_one_hit_after_ago(self):
        bf = load("build_final")
        words = bf.VO["su10-reveal"]["words"]
        k = next(i for i, wd in enumerate(words) if wd["w"] == "You" and words[i + 1]["w"] == "have")
        t0, ago = bf.VO_AT["su10-reveal"] + words[k]["s"], bf.VO_AT["su10-reveal"] + words[-1]["e"]
        inside = [(t, clip) for t, clip, _ in bf.CUES if t0 - 0.05 <= t <= ago + 0.5 and clip != "riser-soft"]
        self.assertEqual([clip for _, clip in inside], ["impact-deep-soft"])
        self.assertGreater(inside[0][0], ago)
        only = bf.VO_AT["su10-reveal"] + next(wd["s"] for wd in words if wd["w"] == "Only")
        riser = [t for t, clip, _ in bf.CUES if clip == "riser-soft" and 0 <= only - (t + 1.36) < 0.5]
        self.assertEqual(len(riser), 1)

    def test_exported_cuesheet_has_no_loud_cue_inside_a_word(self):
        bf = load("build_final")
        spans = bf.word_spans()
        for t, clip, _ in bf.CUES:
            if bf.LOUD_SFX.search(clip):
                self.assertFalse(any(s + 0.03 < t < e - 0.03 for s, e in spans), (t, clip))

    def test_every_shot_has_a_cue_part_in_mix_order(self):
        bf = load("build_final")
        self.assertEqual(bf.CUE_TABLE.PART_ORDER, bf.SHOT_ORDER)
        for shot in bf.SHOT_ORDER:
            self.assertTrue((WORK / "cue_parts" / f"{shot}.py").exists(), shot)

    def test_v2_script_keeps_one_did_you_know_per_era_and_the_arc_keywords(self):
        script = {s["id"]: " ".join(c["text"] for c in s.get("chunks", [])) for s in json.loads((WORK / "narration" / "script.json").read_text())["scenes"]}
        for sid in ("su04-1500", "su05-1610", "su06-1700", "su07-1800", "su08-1900", "su09-2000"):
            self.assertEqual(script[sid].count("Did you know that"), 1, sid)
        for sid, word in (("su04-1500", "day and night."), ("su05-1610", "to watch."), ("su06-1700", "to explain."),
                          ("su07-1800", "you measure,"), ("su08-1900", "every meal"), ("su09-2000", "Power.")):
            self.assertIn(word, script[sid])


if __name__ == "__main__":
    unittest.main()
