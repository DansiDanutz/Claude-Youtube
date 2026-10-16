import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'videos', 'dyk-05-food', 'ro'))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools', 'dyk'))
import ro_text as R  # noqa: E402
import whisper_ro as W  # noqa: E402


def heard(*words):
    return [{'word': ' ' + w, 'start': i * 0.5, 'end': i * 0.5 + 0.4, 'probability': 0.95} for i, w in enumerate(words)]


class NumberRunTest(unittest.TestCase):
    def test_a_hundred_thousand_is_one_number(self):
        self.assertEqual(R.number_value(['o', 'suta', 'de', 'mii']), 100000)
        self.assertEqual(R.tokens('o sută de mii de oameni'), ['#100000', 'de', 'oameni'])

    def test_twenty_thousand_and_seventeen_million(self):
        self.assertEqual(R.tokens('douăzeci de mii'), ['#20000'])
        self.assertEqual(R.tokens('șaptesprezece milioane'), ['#17000000'])

    def test_the_spoken_and_the_digit_form_give_the_same_token(self):
        self.assertEqual(R.tokens('o sută de mii de oameni')[0], R.tokens('100.000 de oameni')[0])

    def test_de_after_a_number_stays_a_word_when_no_scale_follows(self):
        self.assertEqual(R.tokens('două sute de oameni'), ['#200', 'de', 'oameni'])

    def test_plain_runs_still_work(self):
        self.assertEqual(R.number_value(['o', 'mie', 'cinci', 'sute']), 1500)
        self.assertEqual(R.number_value(['doua', 'mii', 'o', 'suta']), 2100)
        self.assertEqual(R.number_value(['o', 'suta', 'saizeci', 'si', 'noua']), 169)


class NegationCheckTest(unittest.TestCase):
    def kinds(self, ref, *words):
        return [f[0] for f in W.diff_scene(ref, heard(*words), set())]

    def test_a_dropped_negation_is_flagged(self):
        self.assertIn('flip', self.kinds('N-a făcut-o singură.', 'a', 'făcut-o', 'singură.'))

    def test_a_dropped_nu_is_flagged(self):
        self.assertIn('flip', self.kinds('Nu a venit.', 'a', 'venit.'))

    def test_only_moved_word_boundaries_are_not_a_flip(self):
        self.assertNotIn('flip', self.kinds('N-a venit.', 'navenit.'))

    def test_an_identical_sentence_has_no_flags(self):
        self.assertEqual(self.kinds('Nu a venit.', 'Nu', 'a', 'venit.'), [])


if __name__ == '__main__':
    unittest.main()
