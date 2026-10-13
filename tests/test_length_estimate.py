"""Pre-voice length estimate — calibrated on the shipped masters so STORY.md promises an honest runtime."""
import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("length_estimate", ROOT / "tools" / "dyk" / "length_estimate.py")
le = importlib.util.module_from_spec(spec)
spec.loader.exec_module(le)

SHIPPED = ["dyk-01-time-compressed", "dyk-02-the-sun", "dyk-03-school"]


def master_seconds(ep):
    timeline = json.loads((ROOT / "videos" / ep / "work" / "timeline.json").read_text())
    return sum(v[0] for v in timeline.values())


class EstimateTests(unittest.TestCase):
    def test_estimate_matches_every_shipped_master_within_three_percent(self):
        # No. 03's STORY bottom-up estimate said 10:10; the master was 10:51 (6 % short)
        for ep in SHIPPED:
            script = json.loads((ROOT / "videos" / ep / "work" / "narration" / "script.json").read_text())
            est, real = le.estimate(le.script_words(script)), master_seconds(ep)
            self.assertLess(abs(est - real) / real, 0.03, (ep, est, real))

    def test_word_count_covers_chunks_and_scene_text(self):
        script = {"scenes": [{"id": "a", "chunks": [{"text": "one two"}, {"text": "three"}]},
                             {"id": "b", "text": "four five six"}, {"id": "c", "chunks": []}]}
        self.assertEqual(le.script_words(script), 6)

    def test_clock_formatting(self):
        self.assertEqual(le.clock(650.9), "10:51")
        self.assertEqual(le.parse_clock("10:30"), 630)


class CliTests(unittest.TestCase):
    def run_cli(self, args):
        with contextlib.redirect_stdout(io.StringIO()) as out:
            code = le.main(args)
        return code, out.getvalue()

    def test_over_budget_fails_and_under_passes(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "draft.txt"
            p.write_text("word " * 1729)                     # No. 03's script length
            code, out = self.run_cli(["--text", str(p), "--max", "10:30"])
            self.assertEqual(code, 1)
            self.assertIn("10:5", out)
            self.assertEqual(self.run_cli(["--text", str(p), "--max", "11:00"])[0], 0)

    def test_needs_an_input(self):
        with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
            le.main([])


if __name__ == "__main__":
    unittest.main()
