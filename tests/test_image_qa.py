import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools', 'dyk', 'image_qa'))
import frame_qa as Q  # noqa: E402

BOX = {'left': 0.442, 'right': 0.558, 'top': 0.683, 'bottom': 0.891}      # measured on the pre-fix Episode 5 end screen


class SizeLimitsTest(unittest.TestCase):
    def test_the_episode_stills_fit(self):
        self.assertEqual(Q.validate_size(960, 540), [])
        self.assertEqual(Q.validate_size(1280, 720), [])

    def test_a_full_1080p_frame_is_too_wide(self):
        self.assertTrue(Q.validate_size(1920, 1080))

    def test_too_small_and_too_many_pixels_are_rejected(self):
        self.assertTrue(Q.validate_size(200, 200))
        self.assertTrue(Q.validate_size(1568, 1568 + 1))

    def test_the_documented_extremes_are_accepted(self):
        self.assertEqual(Q.validate_size(280, 280), [])
        self.assertEqual(Q.validate_size(1568, 1568), [])


class EstimateTest(unittest.TestCase):
    def test_a_960x540_still_matches_the_measured_cost(self):
        self.assertAlmostEqual(Q.estimate_image_tokens(960, 540), 1630, delta=5)

    def test_image_tokens_grow_with_the_pixel_count(self):
        self.assertAlmostEqual(Q.estimate_image_tokens(1920 // 2 * 2, 1080) / Q.estimate_image_tokens(960, 540), 4.0, delta=0.01)

    def test_the_whole_request_estimate_is_close_to_the_measured_total(self):
        est = Q.estimate_request(Q.build_request('Fd1500-540.png', 'k', 'p'), (960, 540))
        self.assertAlmostEqual(est['input_tokens'], 1792, delta=60)        # measured: 1,792 for the two-question request

    def test_cost_is_tokens_times_the_input_price(self):
        req = Q.build_request('Fd1500-540.png', 'k', 'p')
        est = Q.estimate_request(req, (960, 540))
        self.assertAlmostEqual(est['usd'], est['input_tokens'] * 0.042 / 1e6)
        self.assertGreater(est['image_tokens'], est['text_tokens'])


class RequestShapeTest(unittest.TestCase):
    def test_only_the_end_screen_gets_the_ring_questions(self):
        self.assertEqual(set(Q.questions_for('Fd1500-540.png')), {'text_cut_off', 'caption_hud_overlap'})
        self.assertEqual(set(Q.questions_for('FdOutro-2000.png')), {'text_cut_off', 'caption_hud_overlap', 'ring_present', 'ring_box'})

    def test_the_image_is_in_state_once_and_questions_name_it(self):
        req = Q.build_request('FdOutro-2000.png', 'asset-1', 'frame-png')
        self.assertEqual(req['state'], {'frame': 'asset-1'})
        self.assertEqual(req['assets']['asset-1'], {'type': 'image', 'part': 'frame-png'})
        self.assertEqual(req['model'], 'jev-1.14.0')
        self.assertTrue(all('`frame`' in q['instructions'] for q in req['questions'].values()))
        self.assertEqual(req['questions']['ring_box']['type'], 'box')
        self.assertNotIn('criteria', req['questions']['ring_box'])

    def test_multipart_has_the_request_part_then_one_file_part(self):
        req = Q.build_request('x.png', 'a', 'frame-png')
        body, ctype = Q.multipart_body(req, 'frame-png', 'x.png', b'\x89PNGdata')
        self.assertTrue(ctype.startswith('multipart/form-data; boundary='))
        self.assertIn(b'name="request"', body)
        self.assertIn(b'Content-Type: application/json', body)
        self.assertIn(b'name="frame-png"; filename="x.png"', body)
        self.assertEqual(body.count(b'--' + ctype.split('=')[1].encode()), 3)
        self.assertLess(body.index(b'name="request"'), body.index(b'name="frame-png"'))


class AnswerReadingTest(unittest.TestCase):
    def test_iou_of_identical_boxes_is_one_and_of_disjoint_boxes_zero(self):
        self.assertAlmostEqual(Q.iou(BOX, BOX), 1.0)
        far = {'left': 0.0, 'right': 0.1, 'top': 0.0, 'bottom': 0.1}
        self.assertEqual(Q.iou(BOX, far), 0.0)

    def test_the_pre_fix_ring_is_reported_as_moved(self):
        self.assertEqual(Q.ring_verdict(BOX, 0.97), 'MOVED')

    def test_the_corrected_ring_is_ok(self):
        fixed = {'left': 0.432, 'right': 0.568, 'top': 0.590, 'bottom': 0.831}
        self.assertEqual(Q.ring_verdict(fixed, 0.97), 'OK')

    def test_a_box_for_a_ring_that_is_not_there_is_ignored(self):
        self.assertEqual(Q.ring_verdict(BOX, 0.1), 'ABSENT')


class SpendGuardTest(unittest.TestCase):
    def test_sending_needs_the_explicit_approval_flag(self):
        with mock.patch.object(Q, 'send') as sent, self.assertRaises(SystemExit):
            Q.main(['--send'])
        sent.assert_not_called()

    def test_sending_needs_a_key(self):
        with mock.patch.dict(os.environ, {}, clear=True), mock.patch.object(Q, 'send') as sent, self.assertRaises(SystemExit) as caught:
            Q.main(['--send', '--i-approve-spend'])
        self.assertIn('TYPESAFE_API_KEY', str(caught.exception))
        sent.assert_not_called()

    def test_a_dry_run_never_sends(self):
        with mock.patch.object(Q, 'send') as sent, mock.patch('builtins.print'):
            self.assertEqual(Q.main([]), 0)
        sent.assert_not_called()


if __name__ == '__main__':
    unittest.main()
