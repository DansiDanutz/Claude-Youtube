"""Regression tests for the Did You Know That? No. 03 ("School") pipeline.

make_script.py runs as a black box on a copy of the work dir (no paid call, no render);
refine_ends() runs on synthetic PCM (ffmpeg's decode is replaced by the fixture bytes).
"""
import base64
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock

import numpy as np

WORK = Path(__file__).resolve().parents[1] / "videos" / "dyk-03-school" / "work"
RATE = 16000


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk03_{name}", WORK / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class MakeScriptRerunTests(unittest.TestCase):
    """Review PRRT_kwDOTfGVps6rqKON: a rerun reset accepted single-chunk speeds to 1.0."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.work = Path(self.tmp.name) / "work"
        (self.work / "narration" / "chunks").mkdir(parents=True)
        for name in ("make_script.py", "gen_voice.py"):
            shutil.copy(WORK / name, self.work / name)
        self.script = self.work / "narration" / "script.json"

    def tearDown(self):
        self.tmp.cleanup()

    def run_make_script(self):
        subprocess.run([sys.executable, str(self.work / "make_script.py"), str(self.script)],
                       check=True, capture_output=True, text=True)
        return json.loads(self.script.read_text())

    @staticmethod
    def speeds(doc):
        return {sc["id"]: [c["speed"] for c in sc["chunks"]] for sc in doc["scenes"]}

    def test_rerun_keeps_accepted_single_chunk_speeds_without_a_bak(self):
        shutil.copy(WORK / "narration" / "script.json", self.script)   # no chunk caches, no .bak
        before = self.speeds(json.loads(self.script.read_text()))
        after = self.speeds(self.run_make_script())
        self.assertEqual(after["sc02-question"], [1.035])
        self.assertEqual(after["sc03-promise"], [0.969])
        self.assertEqual(after, before)                                   # multi-chunk speeds too

    def test_stale_bak_is_ignored(self):
        shutil.copy(WORK / "narration" / "script.json", self.script)
        stale = json.loads(self.script.read_text())
        for sc in stale["scenes"]:
            for c in sc["chunks"]:
                c["speed"] = 1.0
        Path(str(self.script) + ".bak").write_text(json.dumps(stale))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.035])

    def test_scene_level_speed_is_carried_for_unchanged_text(self):
        doc = json.loads((WORK / "narration" / "script.json").read_text())
        sc02 = next(sc for sc in doc["scenes"] if sc["id"] == "sc02-question")
        ch = sc02.pop("chunks")[0]
        sc02.update(text=ch["text"], pace=ch["pace"], speed=1.035)       # older chunk-less layout
        self.script.write_text(json.dumps(doc))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.035])

    def test_changed_text_starts_from_the_default_speed(self):
        doc = json.loads((WORK / "narration" / "script.json").read_text())
        sc02 = next(sc for sc in doc["scenes"] if sc["id"] == "sc02-question")
        sc02["chunks"][0]["text"] = "An older wording of the question."
        self.script.write_text(json.dumps(doc))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.0])

    def test_rerun_on_the_committed_script_changes_nothing(self):
        committed = (WORK / "narration" / "script.json").read_text()
        self.script.write_text(committed)
        for meta in (WORK / "narration" / "chunks").glob("*.json"):
            shutil.copy(meta, self.work / "narration" / "chunks" / meta.name)
        self.run_make_script()
        self.assertEqual(self.script.read_text(), committed)

    def test_import_has_no_side_effects(self):
        with mock.patch.object(sys, "argv", ["unittest"]):
            module = load("make_script")
        self.assertTrue(callable(module.main))


def pcm(segments, total_s):
    """int16 LE mono PCM at RATE: a 220 Hz tone (amp 0.3) over each (start, end) second span, silence elsewhere."""
    x = np.zeros(int(total_s * RATE))
    for a, b in segments:
        i, j = int(a * RATE), int(b * RATE)
        t = np.arange(j - i) / RATE
        x[i:j] = 0.3 * np.sin(2 * np.pi * 220 * t)
    return np.round(x * 32767).astype("<i2").tobytes()


class RefineEndsTests(unittest.TestCase):
    """Review PRRT_kwDOTfGVps6rqXx8: refine_ends() had no tests."""

    def setUp(self):
        self.gv = load("gen_voice")

    def refine(self, words, segments, total_s):
        raw = pcm(segments, total_s)
        audio_b64 = base64.b64encode(b"fake-mp3").decode()
        calls = []

        def fake_run(cmd, input=None, **kw):
            calls.append((cmd, input))
            return SimpleNamespace(stdout=raw)

        with mock.patch.object(self.gv.subprocess, "run", fake_run):
            out = self.gv.refine_ends(words, audio_b64)
        self.assertEqual(calls[0][0][0], "ffmpeg")
        self.assertEqual(calls[0][1], b"fake-mp3")                         # the take itself is decoded
        return out

    def test_trailing_silence_after_a_sentence_final_word_is_trimmed(self):
        words = [{"w": "the", "s": 0.0, "e": 0.4}, {"w": "cane.", "s": 0.5, "e": 1.13},
                 {"w": "Then", "s": 1.13, "e": 1.5}]
        out = self.refine(words, [(0.0, 0.4), (0.5, 0.85), (1.13, 1.5)], 1.6)
        self.assertAlmostEqual(out[1]["e"], 0.85, delta=0.02)             # 0.63 s drag -> 0.35 s of speech
        self.assertAlmostEqual(out[0]["e"], 0.4, delta=0.02)
        self.assertAlmostEqual(out[2]["e"], 1.5, delta=0.02)
        self.assertEqual([w["s"] for w in out], [w["s"] for w in words])   # starts never move
        self.assertEqual(self.gv.quality(out, 0)[1], [])                  # the trimmed word now passes

    def test_genuinely_stretched_voiced_word_keeps_its_length_and_fails_quality(self):
        words = [{"w": "the", "s": 0.0, "e": 0.4}, {"w": "cane.", "s": 0.5, "e": 1.3},
                 {"w": "Then", "s": 1.35, "e": 1.7}]
        out = self.refine(words, [(0.0, 0.4), (0.5, 1.3), (1.35, 1.7)], 1.8)
        self.assertAlmostEqual(out[1]["e"], 1.3, delta=0.011)
        self.assertTrue(any("stretched 'cane.'" in p for p in self.gv.quality(out, 0)[1]))

    def test_refined_ends_stay_inside_the_original_word_bounds(self):
        words = [{"w": "a", "s": 0.10, "e": 0.13},           # shorter than the 0.05 s minimum
                 {"w": "tick", "s": 0.20, "e": 0.60},        # voiced only for its first 10 ms
                 {"w": "hush", "s": 0.70, "e": 0.90},        # entirely silent
                 {"w": "on", "s": 1.00, "e": 1.20},          # voice runs past its aligned end
                 {"w": "late.", "s": 1.95, "e": 2.40}]       # partly past the end of the audio
        out = self.refine(words, [(0.10, 0.13), (0.20, 0.21), (1.00, 1.40), (1.95, 2.0)], 2.0)
        for w, r in zip(words, out):
            self.assertEqual(r["s"], w["s"])
            self.assertGreaterEqual(r["e"], w["s"], r)
            self.assertLessEqual(r["e"], w["e"], r)
        self.assertAlmostEqual(out[1]["e"], 0.25, places=3)  # trimmed, but held to the 0.05 s minimum
        self.assertEqual(out[2]["e"], 0.90)                  # nothing voiced: aligned end kept
        self.assertEqual(out[3]["e"], 1.20)                  # never later than the aligned end

    def test_too_short_audio_returns_words_unchanged(self):
        words = [{"w": "hi.", "s": 0.0, "e": 0.02}]
        self.assertEqual(self.refine(words, [(0.0, 0.02)], 0.03), words)


if __name__ == "__main__":
    unittest.main()
