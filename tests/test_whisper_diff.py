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

    def test_different_values_never_compare_equal(self):
        # review PRRT_kwDOTfGVps6rrP_R / rrXXH: every number used to collapse to the same '#'
        for said, heard in (("in fifteen hundred", "in 1600"), ("five people", "nine people"),
                            ("a hundred pupils", "200 pupils"), ("ninety eight percent", "97%"),
                            ("sixteen forty seven", "1847"), ("zero point twelve", "12"),
                            ("zero point twenty five", "0.205"),
                            ("between two thousand and ten thousand", "between 12000")):
            self.assertNotEqual(wd.tokens(said), wd.tokens(heard), (said, heard))
        for said, heard in (("twenty twenty four", "2024"), ("sixteen forty seven", "1647"),
                            ("twenty one hundred", "2100"), ("four hundred and sixty three million", "463 million"),
                            ("two thousand and twenty four", "2024"), ("zero point twelve", "0.12"),
                            ("zero point twenty five", "0.25"), ("point two five", "0.25"),
                            ("between two thousand and ten thousand", "between 2000 and 10000")):
            self.assertEqual(wd.tokens(said), wd.tokens(heard), (said, heard))

    def test_and_without_a_following_number_stays_a_word(self):
        self.assertEqual(wd.tokens("a million and a half"), ["#1000000", "and", "a", "half"])
        self.assertEqual(wd.tokens("two thousand and a hundred"), ["#2100"])

    def test_in_and_and_between_numbers_stay_words(self):
        # No. 03: "nine in ten" heard as "nine and 10" must still show up as a difference
        self.assertNotEqual(wd.tokens("nine in ten"), wd.tokens("nine and 10"))
        self.assertEqual(wd.tokens("four hundred and sixty three million"), wd.tokens("463 million"))

    def test_capitalised_mid_sentence_words_are_names(self):
        self.assertEqual(wd.proper_nouns("Taught by John Skelton. Then he left."), {"john", "skelton"})

    def test_hyphenated_words_split(self):
        self.assertEqual(wd.tokens("Nine year old Prince Henry"), wd.tokens("nine-year-old Prince Henry"))

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

    def test_numbers_split_across_whisper_words_rejoin(self):
        # whisper base emits " 1", ".4", " billion" and " 1", ",000" as separate words
        ws = [{"word": w, "start": i * 0.3, "end": i * 0.3 + 0.2, "probability": 0.9}
              for i, w in enumerate([" about", " 1", ".4", " billion", " and", " 1", ",000", " more"])]
        self.assertEqual(wd.diff_scene("about one point four billion and a thousand more", ws, ())["flags"], [])

    def test_number_heard_as_another_value_fails(self):
        self.assertIn("number", flags("in fifteen hundred, in London", "in 1600, in London"))

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

    def test_accept_waives_only_the_flag_it_names(self):
        # review PRRT_kwDOTfGVps6rrP_V: one diff span with a hedge AND a number; accepting the hedge left the number
        p = self.p
        script = {"scenes": [{"id": "s1", "text": "They said five schools closed."}]}
        (p / "script.json").write_text(json.dumps(script))
        (p / "w" / "s1.json").write_text(json.dumps({"segments": [{"words": heard("They set fight schools closed.")}]}))
        self.assertEqual(self.main(["--accept", "s1:said"]), 1)
        self.assertEqual(self.main(["--accept", "s1:said", "--accept", "s1:five"]), 0)

    def test_whisper_file_without_word_timestamps_fails_closed(self):
        # review PRRT_kwDOTfGVps6rrXXL: a transcript with no word data passed as if every word matched
        (self.p / "w" / "s2.json").write_text(json.dumps({"text": "", "segments": [{"text": "x"}]}))
        self.assertEqual(self.main(["--accept", "s1:said"]), 1)
        (self.p / "w" / "s2.json").write_text("not json")
        self.assertEqual(self.main(["--accept", "s1:said"]), 1)

    def test_missing_whisper_file_fails_closed(self):
        (self.p / "w" / "s2.json").unlink()
        self.assertEqual(self.main(["--accept", "s1:said"]), 1)


if __name__ == "__main__":
    unittest.main()
