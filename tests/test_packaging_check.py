"""YouTube packaging gate — one test per packaging bug Episodes 01-03 shipped or nearly shipped."""
import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("packaging_check", ROOT / "tools" / "dyk" / "packaging_check.py")
pc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pc)

CHAPTERS = "CHAPTERS\n0:00 The question\n0:33 Welcome back\n1:12 1500 · For the few\n8:14 2100 · Prediction\n"
GOOD_DESC = ("It's quarter to eight and a bell is about to ring.\n\n" + CHAPTERS
             + "\nWatch every episode: Dexty.live\n")
GOOD_TITLE = "School from 1500 to 2100: It Once Meant Free Time"
GOOD_TAGS = "did you know that, school, history of school, dexty"


def kinds(issues):
    return [k for k, _ in issues]


class ChapterTests(unittest.TestCase):
    def test_good_chapters_pass(self):
        self.assertEqual(pc.check_chapters(GOOD_DESC, 650.9), [])

    def test_chapters_closer_than_ten_seconds_fail(self):
        # No. 03 shipped 9:34 / 9:43 and YouTube dropped every chapter
        desc = CHAPTERS + "9:34 One question for you\n9:43 Comment of the Week\n"
        issues = pc.check_chapters(desc, 650.9)
        self.assertTrue(any("9:34 → 9:43" in m for _, m in issues), issues)

    def test_exactly_ten_seconds_apart_passes(self):
        desc = CHAPTERS + "9:04 One question for you\n9:14 Comment of the Week\n"   # No. 02 as shipped
        self.assertEqual(pc.check_chapters(desc, 616.7), [])

    def test_first_chapter_must_be_zero(self):
        issues = pc.check_chapters("0:05 Intro\n1:00 A\n2:00 B\n", 300)
        self.assertTrue(any("0:00" in m for _, m in issues))

    def test_chapters_must_ascend(self):
        issues = pc.check_chapters("0:00 Intro\n2:00 A\n1:00 B\n", 300)
        self.assertTrue(any("ascending" in m for _, m in issues))

    def test_fewer_than_three_chapters_fail(self):
        self.assertTrue(pc.check_chapters("0:00 Intro\n1:00 A\n", 300))
        self.assertTrue(pc.check_chapters("No chapters at all", 300))

    def test_last_chapter_needs_ten_seconds_before_the_end(self):
        issues = pc.check_chapters("0:00 Intro\n1:00 A\n4:55 B\n", 300)
        self.assertTrue(any("before the end" in m for _, m in issues))

    def test_hour_long_timestamps_parse(self):
        self.assertEqual(pc.parse_clock("1:02:03"), 3723)
        self.assertEqual(pc.parse_clock("10:51"), 651)


class DescriptionTests(unittest.TestCase):
    def test_good_description_passes(self):
        self.assertEqual(pc.check_description(GOOD_DESC), [])

    def test_clock_time_outside_the_chapters_fails(self):
        # No. 03: "It's 7:45" became a jump link to 7:45 in the video
        issues = pc.check_description("It's 7:45 and a bell rings.\n\n" + CHAPTERS + "Dexty.live\n")
        self.assertEqual(kinds(issues), ["clock"])
        self.assertIn("7:45", issues[0][1])

    def test_clock_time_inside_a_chapter_title_fails_too(self):
        issues = pc.check_description(CHAPTERS + "9:00 Meet at 7:45\nDexty.live\n")
        self.assertIn("clock", kinds(issues))

    def test_links_angle_brackets_and_missing_site_fail(self):
        issues = pc.check_description(CHAPTERS + "Visit https://example.com <now>\n")
        self.assertIn("link", kinds(issues))
        self.assertIn("brackets", kinds(issues))
        self.assertIn("site", kinds(issues))

    def test_description_over_5000_characters_fails(self):
        self.assertIn("length", kinds(pc.check_description(GOOD_DESC + "x" * 5000)))


class TitleAndTagTests(unittest.TestCase):
    def test_good_title_passes(self):
        self.assertEqual(pc.check_title(GOOD_TITLE, ["school"]), [])

    def test_title_needs_2100_and_the_core_idea(self):
        self.assertTrue(any("2100" in m for _, m in pc.check_title("School: It Once Meant Free Time", ["school"])))
        self.assertTrue(any("core" in m for _, m in pc.check_title(GOOD_TITLE, ["money"])))

    def test_title_needs_a_core_idea_argument(self):
        self.assertTrue(pc.check_title(GOOD_TITLE, []))

    def test_title_length_limit(self):
        self.assertIn("length", kinds(pc.check_title("School 2100 " + "x" * 60, ["school"])))

    def test_good_tags_pass(self):
        self.assertEqual(pc.check_tags(GOOD_TAGS), [])

    def test_tags_counted_the_way_youtube_counts_them(self):
        # multi-word tags get quotes: YouTube's 500 counts them
        tag = "ab cd"                                       # 5 chars, 7 as YouTube counts it
        self.assertEqual(pc.youtube_tag_length([tag, tag]), 7 + 1 + 7)
        many = ", ".join(["history of school"] * 30)        # 17 + 2 quotes + comma ≈ 600
        self.assertIn("length", kinds(pc.check_tags(many)))

    def test_empty_and_duplicate_tags_fail(self):
        self.assertIn("tags", kinds(pc.check_tags("school, history,")))       # trailing comma → empty chip
        self.assertIn("tags", kinds(pc.check_tags("school, School")))


def quiet_main(args):
    with contextlib.redirect_stdout(io.StringIO()):
        return pc.main(args)


class CliTests(unittest.TestCase):
    def write(self, d, desc=GOOD_DESC, title=GOOD_TITLE, tags=GOOD_TAGS):
        p = Path(d)
        (p / "description.txt").write_text(desc, encoding="utf-8")
        (p / "title.txt").write_text(title + "\n", encoding="utf-8")
        (p / "tags.txt").write_text(tags + "\n", encoding="utf-8")
        (p / "timeline.json").write_text(json.dumps({"A": [600.0, {}], "B": [50.9, {}]}))
        return p

    def test_cli_pass_and_fail(self):
        with tempfile.TemporaryDirectory() as d:
            p = self.write(d)
            args = ["--packaging", str(p), "--timeline", str(p / "timeline.json"), "--core", "School"]
            self.assertEqual(quiet_main(args + ["--out", str(p / "r.md")]), 0)
            self.assertIn("PASS", (p / "r.md").read_text())
            (p / "description.txt").write_text("It's 7:45.\n" + GOOD_DESC)
            self.assertEqual(quiet_main(args), 1)

    def test_missing_file_fails_closed(self):
        with tempfile.TemporaryDirectory() as d:
            p = self.write(d)
            (p / "tags.txt").unlink()
            args = ["--packaging", str(p), "--duration", "650.9", "--core", "School"]
            self.assertEqual(quiet_main(args), 1)

    def test_shipped_episode_02_passes(self):
        ep = ROOT / "videos" / "dyk-02-the-sun"
        args = ["--packaging", str(ep / "packaging"), "--timeline", str(ep / "work" / "timeline.json"), "--core", "Sun"]
        self.assertEqual(quiet_main(args), 0)


if __name__ == "__main__":
    unittest.main()
