"""Whisper round-trip gate — the No. 03 misreads it has to catch, and the numeral noise it must ignore."""
import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("whisper_diff", ROOT / "tools" / "dyk" / "whisper_diff.py")
wd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wd)


def heard(text, prob=0.9, step=0.3):
    return [{"word": " " + w, "start": i * step, "end": i * step + 0.25, "probability": prob}
            for i, w in enumerate(text.split())]


def flags(ref, hyp, risky=()):
    return [k for k, _ in wd.diff_scene(ref, heard(hyp), risky)["flags"]]


class TokenTests(unittest.TestCase):
    def test_spoken_numbers_and_digits_compare_equal(self):
        # the old diff listed every year as a deletion: "seven forty five" vs "7:45"
        self.assertEqual(wd.tokens("It's seven forty five, in fifteen hundred."), wd.tokens("It's 7:45, in 1500."))
        self.assertEqual(wd.tokens("about one point four billion"), wd.tokens("about 1.4 billion"))
        self.assertEqual(wd.tokens("a hundred pupils"), wd.tokens("100 pupils"))
        self.assertEqual(wd.tokens("ninety eight percent"), wd.tokens("98%"))

    def test_in_and_and_between_numbers_stay_words(self):
        # No. 03: "nine in ten" heard as "nine and 10" must still show up as a difference
        self.assertNotEqual(wd.tokens("nine in ten"), wd.tokens("nine and 10"))
        self.assertEqual(wd.tokens("four hundred and sixty three million"), wd.tokens("463 million"))

    def test_capitalised_mid_sentence_words_are_names(self):
        self.assertEqual(wd.proper_nouns("Taught by John Skelton. Then he left."), {"john", "skelton"})

    def test_spelled_letters_join(self):
        self.assertEqual(wd.tokens("the O E C D says"), wd.tokens("the OECD says"))


class FlagTests(unittest.TestCase):
    def test_clean_round_trip_has_no_flags(self):
        self.assertEqual(flags("It's seven forty five. Most children never saw a classroom.",
                               "It's 7:45. Most children never saw a classroom."), [])

    def test_lost_hedge_is_flagged(self):
        # No. 03 5:21: "said to use" heard as "set to use" — the hedge vanished
        self.assertIn("hedge", flags("schools are said to use his system", "schools are set to use his system"))

    def test_number_word_misread_is_flagged(self):
        # No. 03: "from the age of five" misread
        self.assertIn("number", flags("from the age of five they worked", "from the age of fight they worked"))

    def test_number_not_transcribed_is_listed_not_failed(self):
        self.assertEqual(flags("about nine in ten students", "about students"), ["listen"])

    def test_negation_flip_is_flagged(self):
        self.assertIn("flip", flags("you can read it", "you can't read it"))

    def test_risky_word_changed_is_listed(self):
        self.assertIn("listen", flags("the next rung up", "the next wrong up", risky={"rung"}))
        self.assertIn("listen", flags("taught by John Skelton", "taught by John Skeleton", risky={"skelton"}))

    def test_low_probability_and_long_gaps_are_listed_not_failed(self):
        ws = heard("you wake up early")
        ws[1]["probability"] = 0.1
        ws[3]["start"], ws[3]["end"] = 3.0, 3.3
        out = wd.diff_scene("you wake up early", ws, ())
        self.assertEqual(out["flags"], [])
        self.assertTrue(out["low"])
        self.assertTrue(out["gaps"])


class CliTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        p = Path(self.tmp.name)
        script = {"risky_words": ["rung"], "scenes": [
            {"id": "s1", "chunks": [{"text": "Schools are said to use it."}]},
            {"id": "s2", "text": "Taught by John Skelton."}]}
        (p / "script.json").write_text(json.dumps(script))
        (p / "w").mkdir()
        for sid, text in (("s1", "Schools are set to use it."), ("s2", "Taught by John Skeleton.")):
            (p / "w" / f"{sid}.json").write_text(json.dumps({"segments": [{"words": heard(text)}]}))
        self.args = ["--script", str(p / "script.json"), "--whisper-dir", str(p / "w")]
        self.p = p

    def tearDown(self):
        self.tmp.cleanup()

    def main(self, extra=()):
        with contextlib.redirect_stdout(io.StringIO()):
            return wd.main(self.args + list(extra))

    def test_hedge_fails_and_accept_after_listening_passes(self):
        self.assertEqual(self.main(["--out", str(self.p / "r.txt")]), 1)
        report = (self.p / "r.txt").read_text()
        self.assertIn("hedge", report)
        self.assertIn("'skelton' heard as 'skeleton'", report)   # a capitalised name is risky automatically
        self.assertEqual(self.main(["--accept", "s1:said"]), 0)

    def test_missing_whisper_file_fails_closed(self):
        (self.p / "w" / "s2.json").unlink()
        self.assertEqual(self.main(["--accept", "s1:said"]), 1)


if __name__ == "__main__":
    unittest.main()
