"""Voice pre-flight gate — one test per class of narration bug David heard on No. 02 v2."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("voice_preflight", ROOT / "tools" / "dyk" / "voice_preflight.py")
vp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vp)


def words(text, start=0.0, step=0.36, dur=0.26, gap_after=None):
    """Evenly spaced words; gap_after={index: extra_seconds} widens the gap after that word."""
    out, t = [], start
    for i, w in enumerate(text.split()):
        out.append({"w": w, "s": round(t, 3), "e": round(t + dur, 3)})
        t += step + (gap_after or {}).get(i, 0)
    return out


def clean_episode():
    a = "You wake up early. The sky is bright."
    b = "Did you know that? It is old light."
    vo = {"s1": {"words": words(a, gap_after={3: 0.3}), "dur": 3.5},
          "s2": {"words": words(b, gap_after={3: 0.3}), "dur": 3.5}}
    script = {"scenes": [
        {"id": "s1", "shot": "A", "chunks": [{"text": a, "pace": 2.6, "speed": 1.0}]},
        {"id": "s2", "shot": "B", "chunks": [{"text": b, "pace": 2.6, "speed": 0.98}]},
    ]}
    timeline = {"A": [5.0, {"s1": 0.8}], "B": [5.0, {"s2": 0.8}]}
    return script, vo, timeline


class PreflightTests(unittest.TestCase):
    def test_clean_episode_passes(self):
        script, vo, tl = clean_episode()
        self.assertEqual(vp.run(script, vo, tl, []), [])

    def test_speed_jump_and_rushed_chunk_fail(self):
        # 7:15 bug: neighbours at 1.0 then 1.2
        a, b = "One two three four five six.", "Seven eight nine ten eleven twelve."
        vo = {"s": {"words": words(a + " " + b, gap_after={5: 0.3})}}
        script = {"scenes": [{"id": "s", "chunks": [{"text": a, "speed": 1.0}, {"text": b, "speed": 1.2}]}]}
        kinds = [(k, m) for k, _, m in vp.check_speed_and_pace(script, vo)]
        self.assertTrue(any("outside" in m for k, m in kinds))
        self.assertTrue(any("speed jump 1.0 → 1.2" in m for k, m in kinds))

    def test_long_word_allowance_and_one_word_beats(self):
        vo = {"s": {"words": [{"w": "Then", "s": 0.0, "e": 0.2}, {"w": "came", "s": 0.3, "e": 0.5},
                              {"w": "Photosynthesis.", "s": 0.6, "e": 1.8}]}}
        self.assertEqual([m for k, _, m in vp.check_words_and_gaps(vo) if k == "drag"], [])
        vo["s"]["words"][2]["e"] = 2.0          # 1.4 s > 5 × 0.25
        self.assertTrue(any("Photosynthesis" in m for _, _, m in vp.check_words_and_gaps(vo)))
        # a one-word sign-off chunk never counts as a pace jump against its neighbours
        a, b = "One two three four five six.", "Ask..."
        vo2 = {"s": {"words": words(a, gap_after={5: 0.6}) + [{"w": "Ask...", "s": 4.0, "e": 4.5}]}}
        script = {"scenes": [{"id": "s", "chunks": [{"text": a, "speed": 1.0}, {"text": b, "speed": 0.95}]}]}
        self.assertEqual([m for k, _, m in vp.check_speed_and_pace(script, vo2) if "pace jump" in m], [])

    def test_pace_off_target_fails(self):
        script, vo, _ = clean_episode()
        script["scenes"][0]["chunks"][0]["pace"] = 3.4
        self.assertTrue(any(k == "pace" for k, _, _ in vp.check_speed_and_pace(script, vo)))

    def test_sentence_final_drag_fails(self):
        # the "yeeet." bug: a one-syllable sentence end held 0.71 s
        vo = {"s": {"words": [{"w": "happened", "s": 0.0, "e": 0.4}, {"w": "yet.", "s": 0.5, "e": 1.21}]}}
        self.assertTrue(any("'yet.'" in m for _, _, m in vp.check_words_and_gaps(vo)))

    def test_comma_words_and_acronyms_are_not_false_drags(self):
        vo = {"s": {"words": [{"w": "core,", "s": 0.0, "e": 0.48}, {"w": "AI,", "s": 0.6, "e": 1.05},
                              {"w": "then", "s": 1.2, "e": 1.4}, {"w": "go.", "s": 1.5, "e": 1.9}]}}
        self.assertEqual([m for k, _, m in vp.check_words_and_gaps(vo) if k == "drag"], [])
        self.assertEqual(vp.syllables("AI"), 2)
        self.assertEqual(vp.syllables("IEA"), 3)

    def test_sentences_running_together_fail(self):
        vo = {"s": {"words": [{"w": "That.", "s": 0.0, "e": 0.3}, {"w": "Every", "s": 0.36, "e": 0.6}]}}
        self.assertTrue(any("sentence end" in m for _, _, m in vp.check_words_and_gaps(vo)))

    def test_voice_entering_on_a_cut_fails(self):
        # 0:36 / 1:14 bug: first word right after the cut
        script, vo, tl = clean_episode()
        tl["B"] = [5.0, {"s2": 0.2}]
        self.assertTrue(any(k == "lead-in" and where == "B" for k, where, _ in vp.check_lead_in(vo, tl)))

    def test_sfx_on_a_word_fails_but_soft_click_in_a_gap_passes(self):
        script, vo, tl = clean_episode()
        on_word = 5.0 + 0.8 + vo["s2"]["words"][1]["s"] + 0.1
        cues = [{"t": on_word, "clip": "impact-deep-soft", "gain": 0.4}, {"t": 0.1, "clip": "ui-click-soft", "gain": 0.2}]
        issues = vp.check_sfx_on_words(vo, tl, cues)
        self.assertEqual(len(issues), 1)
        self.assertIn("impact-deep-soft", issues[0][2])

    def test_rushed_signoff_fails_and_slow_signoff_passes(self):
        fast = {"o": {"words": [{"w": "Ask...", "s": 0.0, "e": 0.3}, {"w": "Wonder...", "s": 0.45, "e": 0.9},
                                {"w": "Repeat.", "s": 1.0, "e": 1.5}, {"w": "Next", "s": 2.0, "e": 2.2}]}}
        tl = {"O": [10.0, {"o": 1.0}]}
        self.assertGreaterEqual(len(vp.check_signoff(fast, tl)), 3)
        slow = {"o": {"words": [{"w": "Ask...", "s": 0.0, "e": 0.4}, {"w": "Wonder...", "s": 1.2, "e": 1.8},
                                {"w": "Repeat.", "s": 2.6, "e": 3.2}, {"w": "Next", "s": 4.4, "e": 4.6}]}}
        self.assertEqual(vp.check_signoff(slow, tl), [])

    def test_payoff_chunk_must_be_slow(self):
        a = "You have never seen the Sun as it is."
        vo = {"s": {"words": words(a, step=0.3)}}
        script = {"scenes": [{"id": "s", "chunks": [{"text": a, "speed": 1.05, "payoff": True}]}]}
        self.assertTrue(any(k == "payoff" for k, _, _ in vp.check_speed_and_pace(script, vo)))

    def test_missing_cuesheet_fails_and_cli_exit_codes(self):
        script, vo, tl = clean_episode()
        self.assertTrue(any(k == "sfx" for k, _, _ in vp.run(script, vo, tl, None)))
        with tempfile.TemporaryDirectory() as d:
            p = Path(d)
            for name, data in (("script", script), ("vo", vo), ("timeline", tl), ("cues", [])):
                (p / f"{name}.json").write_text(json.dumps(data))
            args = ["--script", str(p / "script.json"), "--vo", str(p / "vo.json"), "--timeline", str(p / "timeline.json")]
            self.assertEqual(vp.main(args + ["--cuesheet", str(p / "cues.json"), "--out", str(p / "r.md")]), 0)
            self.assertIn("PASS", (p / "r.md").read_text())
            self.assertEqual(vp.main(args), 1)

    def test_missing_voice_or_timeline_placement_fails_closed(self):
        script, vo, tl = clean_episode()
        del vo["s2"]
        self.assertTrue(any(k == "data" and w == "s2" for k, w, _ in vp.run(script, vo, tl, [])))
        script, vo, tl = clean_episode()
        del tl["B"]
        self.assertTrue(any(k == "data" and w == "s2" for k, w, _ in vp.run(script, vo, tl, [])))
        script, vo, tl = clean_episode()
        vo["s1"]["words"] = vo["s1"]["words"][:-2]          # stale take: fewer words than the script
        self.assertTrue(any(k == "data" and w == "s1" for k, w, _ in vp.run(script, vo, tl, [])))

    def test_scene_level_text_keeps_its_voice_settings(self):
        a = "One two three four five six."
        vo = {"s": {"words": words(a)}}
        script = {"scenes": [{"id": "s", "text": a, "speed": 1.2, "pace": 2.0}]}
        kinds = [k for k, _, _ in vp.check_speed_and_pace(script, vo)]
        self.assertIn("speed", kinds)
        self.assertIn("pace", kinds)

    def test_speed_settings_compared_across_every_adjacent_chunk(self):
        a, c = "One two three four five six.", "Seven eight nine ten eleven twelve."
        def run(speeds, middle="Ask..."):
            texts = [a, middle, c]
            ws = words(a, gap_after={5: 0.6}) + [{"w": middle, "s": 3.0, "e": 3.4}] + words(c, start=4.2)
            chunks = [{"text": t, "speed": sp} for t, sp in zip(texts, speeds)]
            return [m for k, _, m in vp.check_speed_and_pace({"scenes": [{"id": "s", "chunks": chunks}]}, {"s": {"words": ws}})
                    if "speed jump" in m]
        self.assertTrue(run([0.90, 1.08, 1.00]))            # a one-word beat may not lurch 0.18
        self.assertEqual(run([0.90, 0.98, 1.06]), [])       # each neighbour within 0.08

    def test_articulation_rate_jump_boundary(self):
        a = b = "One two three four five six."                # same syllables, so only the timing differs
        def jumps(dur_b):
            ws = words(a, dur=0.30) + words(b, start=3.0, dur=dur_b)
            chunks = [{"text": a, "speed": 1.0}, {"text": b, "speed": 1.0}]
            return [m for k, _, m in vp.check_speed_and_pace({"scenes": [{"id": "s", "chunks": chunks}]}, {"s": {"words": ws}})
                    if "pace jump" in m]
        self.assertEqual(jumps(0.30 / 1.15), [])            # 15 % faster: designed shift, passes
        self.assertTrue(jumps(0.30 / 1.30))                 # 30 % faster: lurch, fails

class SfxOnsetTests(unittest.TestCase):
    """No. 03 audit: the pre-flight PASSED while an auditor found 207 loud SFX starting exactly on a word onset.
    The old check only flagged starts strictly inside (onset + 30 ms, end - 30 ms), and No. 02's cue resolver
    snapped in-word cues to the onset itself — so every snapped cue sat in the blind spot."""

    def setUp(self):
        _, self.vo, self.tl = clean_episode()
        self.w1 = 5.0 + 0.8 + self.vo["s2"]["words"][1]["s"]          # onset of 'you' in shot B
        self.w1_end = 5.0 + 0.8 + self.vo["s2"]["words"][1]["e"]

    def hits(self, t, clip="pop-reveal"):
        return vp.check_sfx_on_words(self.vo, self.tl, [{"t": round(t, 3), "clip": clip, "gain": 0.3}])

    def test_cue_exactly_on_a_word_onset_fails(self):
        self.assertEqual(len(self.hits(self.w1)), 1)

    def test_cue_just_before_an_onset_fails(self):
        self.assertEqual(len(self.hits(self.w1 - 0.02)), 1)           # the hit masks the consonant

    def test_cue_in_the_gap_clear_of_the_onset_passes(self):
        self.assertEqual(self.hits(self.w1 - 0.06), [])

    def test_cue_late_inside_a_word_fails(self):
        self.assertEqual(len(self.hits(self.w1_end - 0.01)), 1)       # the old 30 ms tail margin let this through

    def test_cue_on_the_word_end_passes(self):
        self.assertEqual(self.hits(self.w1_end), [])

    def test_soft_clips_are_not_loud(self):
        self.assertEqual(self.hits(self.w1, clip="ui-click-soft"), [])


class OffWordTests(unittest.TestCase):
    """The shared resolver every episode's build_final.py uses, so the mix and the gate agree."""

    spans = [(1.00, 1.30), (1.35, 1.60), (1.60, 1.90), (2.50, 2.80)]   # gap 0.05 before word 2; words 2-3 abut

    def clear(self, t):
        return vp.sfx_on_word(t, self.spans) is None

    def test_quiet_or_clear_cues_never_move(self):
        self.assertEqual(vp.off_word(1.10, "ui-click-soft", self.spans), 1.10)
        self.assertEqual(vp.off_word(2.20, "pop-reveal", self.spans), 2.20)

    def test_onset_cue_moves_ahead_of_its_word_when_the_gap_allows(self):
        self.assertAlmostEqual(vp.off_word(2.50, "pop-reveal", self.spans), 2.50 - vp.PRE_ONSET_S)

    def test_onset_cue_in_a_tight_gap_lands_clear_never_on_the_onset(self):
        # No. 03's resolver put these at prev_end + 5 ms: 0-30 ms before the onset, or ON it when words abut
        for t0 in (1.35, 1.60):                                       # tight 50 ms gap; abutting words
            t = vp.off_word(t0, "pop-reveal", self.spans)
            self.assertTrue(self.clear(t), (t0, t))
            self.assertLessEqual(abs(t - t0), vp.MAX_SHIFT_S)

    def test_a_move_beyond_max_shift_is_left_for_the_gate(self):
        long_word = [(0.0, 0.1), (0.12, 2.0), (2.02, 3.0)]            # a 1.9 s word with no near gap
        self.assertEqual(vp.off_word(1.0, "pop-reveal", long_word), 1.0)

    def test_late_cue_moves_to_the_word_end(self):
        self.assertAlmostEqual(vp.off_word(1.25, "whoosh-soft", self.spans), 1.30)

    def test_riser_moves_earlier_so_it_still_ends_before_its_payoff(self):
        t = vp.off_word(2.55, "riser-soft", self.spans)
        self.assertTrue(self.clear(t) and t < 2.50, t)

    def test_no_clear_spot_leaves_the_cue_for_the_gate_to_flag(self):
        packed = [(i * 0.2, i * 0.2 + 0.2) for i in range(20)]       # continuous speech, no gaps at all
        self.assertEqual(vp.off_word(1.05, "pop-reveal", packed), 1.05)


if __name__ == "__main__":
    unittest.main()
