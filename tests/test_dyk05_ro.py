"""Tests for the Romanian pilot of DYK No. 05 "Food" (videos/dyk-05-food/ro/).

Pure functions run on synthetic data (no paid call, no render). The real-data checks run on the committed
ro/vo.ro.json, ro/vo.ro.true.json and script files, and on the ro/mix/*.wav takes when they exist (they are
Git-ignored paid audio, so a fresh checkout skips those).
"""
import importlib.util
import json
import sys
import unittest
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EP = ROOT / "videos" / "dyk-05-food"
RO = EP / "ro"
EN_VO = ROOT / "remotion" / "src" / "shots" / "dyk-05" / "vo.json"
sys.path.insert(0, str(RO))
sys.path.insert(0, str(ROOT / "tools" / "dyk"))


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk05ro_{name}", RO / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


ro_text = load("ro_text")
make_vo_ro = load("make_vo_ro")
make_script_ro = load("make_script_ro")


def words(spec):
    """[(word, start, end)] -> [{w, s, e}]"""
    return [{"w": w, "s": s, "e": e} for w, s, e in spec]


class RomanianSyllables(unittest.TestCase):
    def test_pronounced_final_e_and_diacritic_vowels_count(self):
        self.assertEqual(ro_text.syllables_ro("mâncare"), 3)
        self.assertEqual(ro_text.syllables_ro("Întreabă..."), 3)

    def test_clitic_hyphen_joins_one_group(self):
        self.assertEqual(ro_text.syllables_ro("ne-a"), 1)
        self.assertEqual(ro_text.syllables_ro("te-am"), 1)
        self.assertEqual(ro_text.syllables_ro("Minunează-te..."), 5)

    def test_final_non_syllabic_i_and_vowel_triples(self):
        self.assertEqual(ro_text.syllables_ro("oameni"), 2)
        self.assertEqual(ro_text.syllables_ro("trăiești"), 2)
        self.assertEqual(ro_text.syllables_ro("ziua"), 2)


class RomanianNumbers(unittest.TestCase):
    def test_years_and_compounds_collapse_to_their_value(self):
        self.assertEqual(ro_text.tokens("în anul o mie cinci sute"), ["in", "anul", "#1500"])
        self.assertEqual(ro_text.tokens("două mii o sută"), ["#2100"])
        self.assertEqual(ro_text.tokens("o sută șaizeci și nouă de oameni"), ["#169", "de", "oameni"])

    def test_digits_with_romanian_separators_equal_words(self):
        self.assertEqual(ro_text.tokens("optsprezece mii de tone"), ro_text.tokens("18.000 de tone"))
        self.assertEqual(ro_text.tokens("șaptesprezece milioane"), ro_text.tokens("17 milioane"))

    def test_percent_and_ranges_stay_separate(self):
        self.assertEqual(ro_text.tokens("șaptezeci până la optzeci la sută"), ["#70", "pana", "la", "#80", "la", "procent"])
        self.assertEqual(ro_text.tokens("70-80%"), ["#70", "#80", "procent"])

    def test_article_o_is_not_a_number_outside_a_run(self):
        self.assertEqual(ro_text.tokens("o cincime"), ["o", "cincime"])


class WarpScene(unittest.TestCase):
    EN_TEXTS = ["One two three.", "Four five."]
    RO_TEXTS = ["Unu doi trei patru.", "Cinci șase."]
    EN = words([("One", 0.0, 0.2), ("two", 0.3, 0.5), ("three.", 0.6, 1.0), ("Four", 1.5, 1.7), ("five.", 1.8, 2.0)])
    RO = words([("Unu", 0.1, 0.3), ("doi", 0.4, 0.6), ("trei", 0.7, 0.9), ("patru.", 1.0, 1.6),
                ("Cinci", 2.0, 2.3), ("șase.", 2.4, 3.0)])

    def warped(self):
        return make_vo_ro.warp_scene(self.EN, self.EN_TEXTS, self.RO, self.RO_TEXTS)

    def test_keeps_english_words_in_order(self):
        self.assertEqual([w["w"] for w in self.warped()], [w["w"] for w in self.EN])

    def test_each_chunk_maps_onto_its_romanian_span(self):
        out = self.warped()
        self.assertEqual((out[0]["s"], out[2]["e"]), (0.1, 1.6))
        self.assertEqual((out[3]["s"], out[4]["e"]), (2.0, 3.0))

    def test_linear_inside_a_chunk(self):
        out = self.warped()          # chunk 1: EN 0.0-1.0 -> RO 0.1-1.6 (x1.5)
        self.assertAlmostEqual(out[1]["s"], 0.1 + 0.3 * 1.5, places=3)

    def test_word_count_mismatch_stops(self):
        with self.assertRaises(ValueError):
            make_vo_ro.warp_scene(self.EN[:-1], self.EN_TEXTS, self.RO, self.RO_TEXTS)

    def test_chunk_count_mismatch_stops(self):
        with self.assertRaises(ValueError):
            make_vo_ro.warp_scene(self.EN, self.EN_TEXTS, self.RO, ["Unu doi trei patru. Cinci șase."])


class RomanianScript(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.en = json.load(open(EP / "work" / "narration" / "script.json", encoding="utf-8"))
        cls.ro = make_script_ro.build(cls.en)

    def test_same_scene_ids_chunk_counts_floors_and_payoffs(self):
        self.assertEqual([s["id"] for s in self.ro["scenes"]], [s["id"] for s in self.en["scenes"]])
        for en, ro in zip(self.en["scenes"], self.ro["scenes"]):
            en_chunks = en.get("chunks") or [en]
            self.assertEqual(len(ro["chunks"]), len(en_chunks), en["id"])
            for ec, rc in zip(en_chunks, ro["chunks"]):
                self.assertEqual(rc.get("floor"), ec.get("floor"), en["id"])
                self.assertEqual(rc.get("payoff"), ec.get("payoff"), en["id"])
                self.assertEqual(bool(rc["pace"]), bool(ec.get("pace")), en["id"])

    def test_pause_beats_keep_their_lengths_and_land_on_one_romanian_word(self):
        for en, ro in zip(self.en["scenes"], self.ro["scenes"]):
            en_after, ro_after = en.get("pauses", {}).get("after", []), ro.get("pauses", {}).get("after", [])
            self.assertEqual([r["add"] for r in ro_after], [r["add"] for r in en_after], en["id"])
            self.assertEqual(ro.get("pauses", {}).get("min_sentence_gap"), en.get("pauses", {}).get("min_sentence_gap"))
            toks = [w.lower() for c in ro["chunks"] for w in c["text"].split()]
            for rule in ro_after:
                self.assertEqual(toks.count(rule["word"].lower()), 1, f"{en['id']}: {rule['word']}")

    def test_numbers_are_written_out_and_brand_names_kept(self):
        text = " ".join(c["text"] for s in self.ro["scenes"] for c in s["chunks"])
        self.assertFalse(any(ch.isdigit() for ch in text))
        self.assertIn("Did You Know That", text)
        self.assertIn("Dexti punct laiv", text)

    def test_sign_off_is_three_one_word_chunks(self):
        signoff = next(s for s in self.ro["scenes"] if s["id"] == "fd13c-signoff")
        self.assertEqual([len(c["text"].split()) for c in signoff["chunks"]], [1, 1, 1])


@unittest.skipUnless((RO / "vo.ro.json").exists() and (RO / "vo.ro.true.json").exists(), "Romanian vo not generated")
class RomanianVoData(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.en_vo = json.load(open(EN_VO, encoding="utf-8"))
        cls.vo = json.load(open(RO / "vo.ro.json", encoding="utf-8"))
        cls.true = json.load(open(RO / "vo.ro.true.json", encoding="utf-8"))
        cls.en_script = {s["id"]: s for s in json.load(open(EP / "work" / "narration" / "script.json", encoding="utf-8"))["scenes"]}
        cls.ro_script = {s["id"]: s for s in json.load(open(RO / "script.ro.json", encoding="utf-8"))["scenes"]}

    def test_same_scenes_word_count_and_order_as_english(self):
        self.assertEqual(set(self.vo), set(self.en_vo))
        for sid, scene in self.vo.items():
            self.assertEqual([w["w"] for w in scene["words"]], [w["w"] for w in self.en_vo[sid]["words"]], sid)

    def test_times_are_monotonic(self):
        for sid, scene in self.vo.items():
            for a, b in zip(scene["words"], scene["words"][1:]):
                self.assertLessEqual(a["s"], a["e"], sid)
                self.assertLessEqual(a["e"], b["s"] + 1e-9, f"{sid}: {a} -> {b}")

    def test_each_chunk_lies_inside_its_romanian_chunk_span(self):
        for sid, scene in self.vo.items():
            en_sl = make_vo_ro.slices(make_vo_ro.chunk_texts(self.en_script[sid]))
            ro_sl = make_vo_ro.slices(make_vo_ro.chunk_texts(self.ro_script[sid]))
            ro_words = self.true[sid]["words"]
            for (a, b), (c, d) in zip(en_sl, ro_sl):
                span = (ro_words[c]["s"], ro_words[d - 1]["e"])
                self.assertGreaterEqual(scene["words"][a]["s"], span[0] - 0.0015, sid)
                self.assertLessEqual(scene["words"][b - 1]["e"], span[1] + 0.0015, sid)

    def test_dur_is_the_romanian_scene_duration(self):
        for sid, scene in self.vo.items():
            self.assertEqual(scene["dur"], self.true[sid]["dur"], sid)
            self.assertLessEqual(scene["words"][-1]["e"], scene["dur"] + 1e-9, sid)
            wav = RO / "mix" / f"{sid}.wav"
            if wav.exists():
                with wave.open(str(wav), "rb") as w:
                    self.assertAlmostEqual(scene["dur"], w.getnframes() / w.getframerate(), delta=0.02, msg=sid)

    def test_true_take_matches_romanian_script_word_count(self):
        for sid, scene in self.true.items():
            expected = sum(len(c["text"].split()) for c in self.ro_script[sid]["chunks"])
            self.assertEqual(len(scene["words"]), expected, sid)


if __name__ == "__main__":
    unittest.main()
