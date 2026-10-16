import os
import sys
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools', 'dyk', 'localize'))
import check_translation as CT  # noqa: E402
import en_from_whisper as W  # noqa: E402
import gen_dub  # noqa: E402
import lang as L  # noqa: E402
import run  # noqa: E402


def word(w, s, e):
    return {'word': f' {w}', 'start': s, 'end': e}


class WhisperRepairTest(unittest.TestCase):
    def test_hyphen_apostrophe_and_dot_tokens_are_glued_to_the_word_before(self):
        whisper = {'segments': [{'words': [word('ninety', 0, 1), word('-three', 1, 2), word('o', 2, 2.5), word("'clock", 2.5, 3), word('Dext', 3, 4), word('.live', 4, 5)]}]}
        self.assertEqual([w['w'] for w in W.words_of(whisper)], ['ninety-three', "o'clock", 'Dext.live'])

    def test_spellings_are_repaired(self):
        self.assertEqual(W.fixed('Christian Huygens and Dext.live'), 'Christiaan Huygens and Dexty.live')

    def test_an_abbreviation_does_not_end_a_sentence(self):
        words = [{'w': 'They', 's': 0, 'e': 0.2}, {'w': 'called', 's': 0.3, 'e': 0.5}, {'w': 'St.', 's': 0.6, 'e': 0.8}, {'w': 'Monday.', 's': 0.9, 'e': 1.2}]
        self.assertEqual(len(W.sentences_of(words)), 1)

    def test_a_long_silence_ends_a_sentence_without_punctuation(self):
        words = [{'w': 'one', 's': 0, 'e': 0.5}, {'w': 'two', 's': 3.0, 'e': 3.5}]
        self.assertEqual(len(W.sentences_of(words)), 2)

    def test_close_sentences_share_a_chunk_and_a_gap_starts_a_new_one(self):
        def sent(s, e):
            return [{'w': 'a.', 's': s, 'e': e}]
        chunks = W.chunks_of([sent(0, 1), sent(1.2, 2), sent(5, 6)])
        self.assertEqual([len(c) for c in chunks], [2, 1])


class TranslationCheckTest(unittest.TestCase):
    def test_number_words_are_recognised_in_three_languages(self):
        for token in ('cinquante-cinq', 'veintiséis', 'optsprezece', 'două', 'mille'):
            self.assertTrue(CT.number_like(token), token)
        self.assertFalse(CT.number_like('bread'))

    def test_a_subtitle_that_keeps_the_sentence_with_digits_loses_nothing(self):
        self.assertEqual(CT.lost_words('Despiertas en mil quinientos.', 'Despiertas en 1500.'), [])

    def test_a_fragment_subtitle_is_reported(self):
        self.assertEqual(CT.lost_words('Que mangeras-tu en deux mille cent ?', 'en 2100 ?'), ['Que', 'mangeras-tu'])

    def test_say_of_accepts_a_string_or_an_object(self):
        self.assertEqual(CT.say_of('hola'), 'hola')
        self.assertEqual(CT.say_of({'say': 'hola', 'show': 'hola 1'}), 'hola')

    def test_the_character_budget_grows_with_the_slot_and_never_drops_below_eight(self):
        self.assertGreater(L.max_chars('fr', 5.0), L.max_chars('fr', 2.0))
        self.assertEqual(L.max_chars('zh', 0.1), 8)
        self.assertGreater(L.predicted_s('ro', 160), L.predicted_s('ro', 80))


class DriverTest(unittest.TestCase):
    def test_reserve_value_is_not_taken_for_a_language(self):
        calls = []
        with mock.patch.object(run, 'step', side_effect=lambda script, *a: calls.append((script, a)) or 0):
            status = run.main(['05', 'ro', 'fr', '--reserve', '22000'])
        self.assertEqual(status, 0)
        voiced = [a for script, a in calls if script == 'gen_dub.py']
        self.assertEqual([a[1] for a in voiced], ['ro', 'fr'])
        self.assertTrue(all(a[-2:] == ('--reserve', '22000') for a in voiced))
        self.assertEqual(calls[-1], ('build_dub.py', ('05', 'ro', 'fr')))

    def test_a_failed_voicing_is_reported_after_the_finished_languages_are_built(self):
        def step(script, *a):
            return 1 if (script == 'gen_dub.py' and a[1] == 'fr') else 0
        with mock.patch.object(run, 'step', side_effect=step) as m:
            status = run.main(['05', 'ro', 'fr', 'es'])
        self.assertEqual(status, 1)
        self.assertEqual(m.call_args_list[-1].args, ('build_dub.py', '05', 'ro'))

    def test_the_quota_stop_is_reported_as_its_own_status_and_still_builds(self):
        with mock.patch.object(run, 'step', side_effect=lambda script, *a: 3 if (script == 'gen_dub.py' and a[1] == 'es') else 0):
            self.assertEqual(run.main(['05', 'ro', 'es']), 3)

    def test_a_failed_build_makes_the_run_fail(self):
        with mock.patch.object(run, 'step', side_effect=lambda script, *a: 2 if script == 'build_dub.py' else 0):
            self.assertEqual(run.main(['05', 'ro']), 2)


class LockTest(unittest.TestCase):
    def test_a_second_run_on_the_same_lock_is_refused(self):
        with tempfile.TemporaryDirectory() as d:
            path = os.path.join(d, 'x.lock')
            with gen_dub.exclusive(path, 'run A'):
                with self.assertRaises(SystemExit) as caught:
                    with gen_dub.exclusive(path, 'run B'):
                        pass
                self.assertIn('another run holds', str(caught.exception))
            with gen_dub.exclusive(path, 'run C'):   # released after the first run
                pass


if __name__ == '__main__':
    unittest.main()
