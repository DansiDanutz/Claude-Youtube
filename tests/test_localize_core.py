import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools', 'dyk', 'localize'))
import dub_core as C  # noqa: E402


def doc_with(sentences):
    return {'scenes': [{'id': 'sc1', 'chunks': [{'id': 'sc1.c1', 'sentences': sentences}]}]}


def en(i, start):
    return {'id': f'sc1.c1.s{i}', 'start': start, 'end': start + 1, 'slot_end': start + 3, 'slot_s': 3.0}


class ChunkUnitsTest(unittest.TestCase):
    def test_spans_cover_each_sentence_with_the_joiner_between(self):
        doc = doc_with([en(1, 0), en(2, 4)])
        tr = {'sentences': {'sc1.c1.s1': 'Bonjour.', 'sc1.c1.s2': {'say': 'Salut !', 'show': 'Salut ! 1500'}}}
        units = C.chunk_units(doc, tr, 'fr')
        self.assertEqual(units[0]['text'], 'Bonjour. Salut !')
        self.assertEqual([s['span'] for s in units[0]['sentences']], [(0, 8), (9, 16)])
        self.assertEqual(units[0]['sentences'][1]['show'], 'Salut ! 1500')

    def test_chinese_has_no_joiner(self):
        doc = doc_with([en(1, 0), en(2, 4)])
        tr = {'sentences': {'sc1.c1.s1': '你好。', 'sc1.c1.s2': '再见。'}}
        units = C.chunk_units(doc, tr, 'zh')
        self.assertEqual(units[0]['text'], '你好。再见。')
        self.assertEqual(units[0]['sentences'][1]['span'], (3, 6))


class AlignmentTest(unittest.TestCase):
    def test_sentence_times_use_first_start_and_last_end(self):
        al = {'characters': list('abcd'), 'character_start_times_seconds': [0, 1, 2, 3], 'character_end_times_seconds': [1, 2, 3, 4]}
        self.assertEqual(C.sentence_times(al, [(0, 2), (2, 4)]), [(0, 2), (2, 4)])

    def test_check_alignment_detects_mismatch(self):
        al = {'characters': list('abc')}
        self.assertIsNone(C.check_alignment('abc', al))
        self.assertIn('3 chars', C.check_alignment('abcd', al))

    def test_cut_points_clamp_to_half_the_gap(self):
        cuts = C.cut_points([(1.0, 2.0), (2.1, 3.0)], 5.0)
        self.assertAlmostEqual(cuts[0][1], 2.05)      # gap 0.1 -> only half is given to the first sentence
        self.assertAlmostEqual(cuts[1][0], 2.05)
        self.assertAlmostEqual(cuts[0][0], 1.0 - C.LEAD_S)
        self.assertAlmostEqual(cuts[1][1], 3.0 + C.TAIL_S)

    def test_cut_points_stay_inside_the_audio(self):
        cuts = C.cut_points([(0.02, 1.0)], 1.05)
        self.assertAlmostEqual(cuts[0][0], 0.01)      # half of the 0.02 s lead-in, never negative
        self.assertAlmostEqual(cuts[0][1], 1.025)     # half of the 0.05 s left after the sentence


class PlacementTest(unittest.TestCase):
    def test_sentences_sit_at_their_english_start_when_they_fit(self):
        self.assertEqual(C.place([0, 5], [2, 2]), [(0, 2), (5, 7)])

    def test_a_long_sentence_pushes_the_next_one(self):
        placed = C.place([0, 3], [4, 2])
        self.assertEqual(placed[1][0], 4 + C.MIN_GAP_S)

    def test_overruns_lists_only_pushes_beyond_the_limit(self):
        sents = [en(1, 0), en(2, 3)]
        placed = C.place([0, 3], [4, 2])
        self.assertEqual(C.overruns(placed, sents, 0.5), [('sc1.c1.s2', round(placed[1][0] - 3, 2))])
        self.assertEqual(C.overruns(placed, sents, 5.0), [])


class SubtitleTest(unittest.TestCase):
    def test_short_text_is_one_line(self):
        self.assertEqual(C.wrap('Hola, mundo.', 'es'), ['Hola, mundo.'])

    def test_long_latin_text_wraps_at_the_limit(self):
        text = 'Mâncarea ne-a dat ani, dar nu a făcut-o singură, iar acum pericolul s-a inversat.'
        lines = C.wrap(text, 'ro')
        self.assertTrue(all(len(line) <= C.LINE_MAX['ro'] for line in lines))
        self.assertEqual(' '.join(lines), text)

    def test_chinese_breaks_after_punctuation(self):
        lines = C.wrap('面包炉还是暖的，厨房里飘着黑麦和烟的味道。你在一五〇〇年醒来。', 'zh')
        self.assertTrue(all(len(line) <= C.LINE_MAX['zh'] for line in lines))
        self.assertEqual(''.join(lines), '面包炉还是暖的，厨房里飘着黑麦和烟的味道。你在一五〇〇年醒来。')

    def test_cues_split_a_long_sentence_and_cover_the_window(self):
        text = ' '.join(['mot'] * 40)
        cues = C.cues_for(text, 10.0, 18.0, 'fr')
        self.assertGreater(len(cues), 1)
        self.assertEqual(cues[0][0], 10.0)
        self.assertEqual(cues[-1][1], 18.0)
        self.assertTrue(all(a[1] <= b[0] + 1e-9 for a, b in zip(cues, cues[1:])))

    def test_a_closing_mark_never_sits_alone_on_a_line(self):
        text = 'Savais-tu que huit Kényans adultes sur dix utilisent désormais vraiment l\'argent mobile ?'
        lines = C.wrap(text, 'fr')
        self.assertTrue(all(line != '?' for line in lines))
        self.assertEqual(' '.join(lines), text)

    def test_every_cue_of_a_split_sentence_keeps_its_minimum_time(self):
        text = ' '.join(['mot'] * 60)
        cues = C.cues_for(text, 0.0, 6.0, 'fr')
        self.assertGreater(len(cues), 2)
        self.assertTrue(all(e - s >= C.MIN_CUE_S - 1e-6 for s, e, _ in cues), cues)
        self.assertEqual(cues[-1][1], 6.0)

    def test_a_window_too_short_for_the_minimums_is_shared_out(self):
        text = ' '.join(['mot'] * 60)
        cues = C.cues_for(text, 0.0, 2.0, 'fr')
        self.assertEqual(cues[0][0], 0.0)
        self.assertEqual(cues[-1][1], 2.0)
        self.assertTrue(all(b[0] >= a[1] - 1e-9 for a, b in zip(cues, cues[1:])))

    def test_vtt_format_and_escaping(self):
        vtt = C.to_vtt([(1.5, 3.25, 'a < b & c')])
        self.assertTrue(vtt.startswith('WEBVTT'))
        self.assertIn('00:00:01.500 --> 00:00:03.250', vtt)
        self.assertIn('a &lt; b &amp; c', vtt)

    def test_a_very_short_cue_joins_the_next_one_when_close(self):
        cues = [(1.0, 1.3, 'Fuel.'), (1.4, 3.0, 'Just enough to survive the day.')]
        self.assertEqual(C.merge_short(cues, 'fr'), [(1.0, 3.0, 'Fuel.\nJust enough to survive the day.')])

    def test_short_cues_stay_apart_when_far_or_already_two_lines(self):
        far = [(1.0, 1.3, 'Fuel.'), (3.0, 4.0, 'Later.')]
        self.assertEqual(C.merge_short(far, 'fr'), far)
        two = [(1.0, 1.3, 'a\nb'), (1.4, 2.0, 'c')]
        self.assertEqual(C.merge_short(two, 'fr'), two)

    def test_vtt_time_handles_hours(self):
        self.assertEqual(C.vtt_time(3725.5), '01:02:05.500')


if __name__ == '__main__':
    unittest.main()
