"""Regression tests for the Did You Know That? No. 04 ("Money") pipeline — PR 17 review threads.

They load videos/dyk-04-money/work/*.py by path (not an earlier episode's copy). Word timings and audio are
tiny synthetic fixtures; ffmpeg's decode and every ElevenLabs call are replaced, so nothing paid or networked runs.
"""
import base64
import importlib.util
import json
import tempfile
import unittest
import wave
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest import mock

import numpy as np

WORK = Path(__file__).resolve().parents[1] / "videos" / "dyk-04-money" / "work"
SAFE_GAP, SHORT_GAP = 0.10, 0.024      # 0.024 s: the "pocket. | You" gap the No. 04 audit caught clipping


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk04_{name}", WORK / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def timed(tokens, start=0.0, word_s=0.2, gaps=None, gap=SAFE_GAP):
    """Words [{w, s, e}] each word_s long; gaps={index: seconds} sets the silence after that word (default `gap`)."""
    out, t = [], start
    for i, w in enumerate(tokens):
        out.append({"w": w, "s": round(t, 3), "e": round(t + word_s, 3)})
        t += word_s + (gaps or {}).get(i, gap)
    return out


def two_chunks(fast_tokens, fast_gaps=None, fast_gap=SAFE_GAP):
    """A slow 12-word chunk (~2.5 w/s, target 2.6) then a fast chunk (~3.3+ w/s, target 3.0) that even_pace must slow."""
    slow = timed(["w"] * 11 + ["w."], word_s=0.3, gap=0.1)
    fast = timed(fast_tokens, start=slow[-1]["e"] + 0.3, word_s=0.2, gaps=fast_gaps, gap=fast_gap)
    words = slow + fast
    chunks = [{"text": " ".join(["w"] * 12), "pace": 2.6}, {"text": " ".join(fast_tokens), "pace": 3.0}]
    return words, chunks


class EvenPaceSafeBoundaryTests(unittest.TestCase):
    """PRRT_kwDOTfGVps6sQmr1 / sQ2KM / sQ2Ka: even-pace breaths only ever go into >= MIN_CUT_GAP_S of real silence."""

    def setUp(self):
        self.ip = load("insert_pauses")

    def short_gap_fixture(self):
        # fast chunk: sentence end at fast-index 3 runs into the next word (24 ms), sentence end at 7 has 100 ms
        tokens = ["a", "b", "c", "d.", "e", "f", "g", "h.", "i", "j", "k", "l."]
        words, chunks = two_chunks(tokens, fast_gaps={3: SHORT_GAP})
        return words, chunks, 12 + 3, 12 + 7

    def test_short_raw_gap_is_never_selected(self):
        words, chunks, short_i, safe_i = self.short_gap_fixture()
        cuts = dict(self.ip.even_pace_cuts(words, chunks))
        self.assertIn(safe_i, cuts)
        self.assertNotIn(short_i, cuts)

    def test_disabling_the_gap_predicate_selects_the_short_gap(self):
        # the predicate is what keeps the short gap out: with it disabled the previous test's assertion fails
        words, chunks, short_i, _ = self.short_gap_fixture()
        with mock.patch.object(self.ip, "safe_gap", lambda ref, i: True):
            self.assertIn(short_i, dict(self.ip.even_pace_cuts(words, chunks)))

    def test_gap_lengthened_by_an_earlier_pause_is_judged_on_the_raw_take(self):
        # min_sentence_gap tops the 24 ms gap up to 0.35 s; the cut must still be refused there (raw silence decides)
        words, chunks, short_i, safe_i = self.short_gap_fixture()
        cfg = {"min_sentence_gap": 0.35}
        top_up = self.ip.plan_pauses(words, cfg)
        self.assertIn(short_i, dict(top_up))
        shifted = self.ip.shift_words(words, top_up)
        self.assertGreaterEqual(shifted[short_i + 1]["s"] - shifted[short_i]["e"], self.ip.MIN_CUT_GAP_S)
        cuts = dict(self.ip.even_pace_cuts(shifted, chunks, words))
        self.assertNotIn(short_i, cuts)
        with mock.patch.object(self.ip, "safe_gap", lambda ref, i: True):
            self.assertIn(short_i, dict(self.ip.even_pace_cuts(shifted, chunks, words)))

    def test_comma_fallback_only_uses_a_safe_gap(self):
        # no safe sentence end: the old third branch fell back to the unsafe sentence ends
        tokens = ["a", "b", "c.", "d", "e,", "f", "g,", "h", "i.", "j", "k", "l."]
        words, chunks = two_chunks(tokens, fast_gaps={6: SAFE_GAP}, fast_gap=SHORT_GAP)
        cuts = dict(self.ip.even_pace_cuts(words, chunks))
        self.assertEqual(sorted(cuts), [12 + 6])

    def test_word_boundary_fallback_only_uses_a_safe_gap(self):
        # no punctuation at all with real silence: only the one plain boundary that has it may take the breath
        tokens = ["a", "b", "c.", "d", "e", "f", "g", "h", "i,", "j", "k", "l."]
        words, chunks = two_chunks(tokens, fast_gaps={4: SAFE_GAP}, fast_gap=SHORT_GAP)
        cuts = dict(self.ip.even_pace_cuts(words, chunks))
        self.assertEqual(sorted(cuts), [12 + 4])

    def test_no_safe_boundary_fails_loudly_naming_the_chunk(self):
        tokens = ["a", "b", "c.", "d", "e,", "f", "g", "h", "i.", "j", "k", "l."]
        words, chunks = two_chunks(tokens, fast_gap=SHORT_GAP)
        with self.assertRaises(ValueError) as err:
            self.ip.even_pace_cuts(words, chunks)
        self.assertIn("chunk 2", str(err.exception))
        self.assertIn("new take", str(err.exception))


class ProcessLastGateTests(unittest.TestCase):
    """process() refuses any even-pace cut at an unsafe raw gap before it writes audio (defence in depth)."""

    RATE = 8000

    def setUp(self):
        self.ip = load("insert_pauses")
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        root = Path(self.tmp.name)
        self.ip.NARR, self.ip.MIX = str(root / "narration"), str(root / "mix")
        Path(self.ip.NARR).mkdir()
        Path(self.ip.MIX).mkdir()
        tokens = ["a", "b", "c", "d.", "e", "f", "g", "h.", "i", "j", "k", "l."]
        self.words, self.chunks = two_chunks(tokens, fast_gaps={3: SHORT_GAP})
        Path(self.ip.NARR, "t01.words.json").write_text(json.dumps(self.words))
        Path(self.ip.NARR, "t01.mp3").write_bytes(b"")          # never read: decode is replaced below
        self.ip.decode = self.fake_decode

    def fake_decode(self, mp3, wav):
        """A 440 Hz tone over every word, digital silence in the gaps."""
        n = int((self.words[-1]["e"] + 0.2) * self.RATE)
        t = np.arange(n) / self.RATE
        x = np.zeros(n)
        for w in self.words:
            a, b = int(w["s"] * self.RATE), int(w["e"] * self.RATE)
            x[a:b] = 0.5 * np.sin(2 * np.pi * 440 * t[a:b])
        with wave.open(wav, "wb") as out:
            out.setnchannels(1)
            out.setsampwidth(2)
            out.setframerate(self.RATE)
            out.writeframes(np.round(x * 32767).astype("<i2").tobytes())

    def outputs(self):
        return [p for p in (Path(self.ip.MIX, "t01.wav"), Path(self.ip.NARR, "t01.paused.json")) if p.exists()]

    def test_process_refuses_an_unsafe_even_pace_cut(self):
        with mock.patch.object(self.ip, "even_pace_cuts", lambda *a, **k: [(12 + 3, 0.2)]):
            with self.assertRaises(ValueError) as err:
                self.ip.process("t01", {"even_pace": True}, self.chunks)
        self.assertIn("t01", str(err.exception))
        self.assertEqual(self.outputs(), [])

    def test_process_applies_safe_even_pace_cuts(self):
        cuts, dur = self.ip.process("t01", {"even_pace": True}, self.chunks)
        self.assertTrue(cuts)
        self.assertNotIn(12 + 3, dict(cuts))
        self.assertEqual(len(self.outputs()), 2)
        self.assertGreater(dur, self.words[-1]["e"] + 0.2)


def words_at(pace, n=12):
    step, out = 1 / pace, []
    for i in range(n):
        out.append({"w": "word" if i < n - 1 else "end.", "s": round(i * step, 3), "e": round(i * step + step * 0.8, 3)})
    return out


class QuotaGateContinuityTests(unittest.TestCase):
    """PRRT_kwDOTfGVps6sQmr-: the quota gate budgets cached chunks with the loop's continuity-narrowed speed band."""

    def setUp(self):
        self.gv = load("gen_voice")
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        root = Path(self.tmp.name)
        self.gv.NARR, self.gv.MIX = str(root / "narration"), str(root / "mix")
        Path(self.gv.NARR).mkdir()
        Path(self.gv.MIX).mkdir()
        self.scene = {"id": "q01", "text": "x", "chunks": [{"text": "first chunk text", "pace": 2.9},
                                                             {"text": "second chunk text", "pace": 2.9}]}
        Path(self.gv.NARR, "script.json").write_text(json.dumps({"scenes": [self.scene]}))
        # chunk 1 cached at 0.90; chunk 2 cached at 1.08 — inside the default 0.90-1.08 band, outside 0.90 +/- 0.08
        for k, speed in ((0, 0.90), (1, 1.08)):
            base = self.gv.chunk_key("q01", k, self.scene["chunks"][k])
            Path(base).parent.mkdir(parents=True, exist_ok=True)
            Path(base + ".mp3").write_bytes(b"cached")
            Path(base + ".json").write_text(json.dumps({"words": words_at(2.9), "speed": speed}))
        self.gv.api_key = lambda: "test-key"
        self.tts_calls = []
        self.gv.tts_with_timestamps = lambda *a, **k: self.tts_calls.append(a) or self.fail("paid call")

    def test_fixture_cached_chunk_is_valid_only_under_the_default_band(self):
        ch = self.scene["chunks"][1]
        self.assertIsNotNone(self.gv.cached_take("q01", 1, ch))
        self.assertIsNone(self.gv.cached_take("q01", 1, ch, *self.gv.chunk_band(self.scene, ch, 0.90)))

    def test_cached_chunk_rejected_by_the_narrowed_band_is_budgeted(self):
        pending = self.gv.chunks_to_generate(self.scene)
        self.assertEqual([k for k, _ in pending], [1])
        self.assertEqual(self.gv.worst_case_chars([self.scene]), len("second chunk text") * self.gv.MAX_TRIES)

    def test_quota_gate_stops_before_the_unbudgeted_paid_call(self):
        # the old estimate counted both chunks as free (needs <= 0) and went on to call the API for chunk 2
        self.gv.subscription = lambda key: {"tier": "creator", "character_count": 990, "character_limit": 1000}
        with redirect_stdout(StringIO()), self.assertRaises(SystemExit) as stop:
            self.gv.main()
        self.assertIn("quota", str(stop.exception))
        self.assertEqual(self.tts_calls, [])

    def test_chunks_after_a_generated_chunk_are_budgeted(self):
        # a chunk that must be generated lands at an unknown speed, so the next cached take may be rejected too
        Path(self.gv.chunk_key("q01", 0, self.scene["chunks"][0]) + ".json").unlink()
        self.assertEqual([k for k, _ in self.gv.chunks_to_generate(self.scene)], [0, 1])


if __name__ == "__main__":
    unittest.main()
