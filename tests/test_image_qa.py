import os
import sys
import tempfile
import unittest
from unittest import mock

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'tools', 'dyk', 'image_qa'))
import frame_qa as Q  # noqa: E402
import make_defects as D  # noqa: E402

def make_frame(folder, name='frame.png', size=(960, 540)):
    path = os.path.join(folder, name)
    Image.fromarray(np.random.default_rng(1).integers(0, 255, (size[1], size[0], 3), dtype=np.uint8)).save(path)
    return path


# What the questions answered on 2026-10-17 (frame_qa.py --send): text_cut_off, caption_hud_overlap
MEASURED = {
    'zoomed-clipped': (0.98, 0.15), 'cropped-left': (0.36, 0.17), 'strip-on-hud': (0.50, 0.64),
    'caption-on-hud': (0.68, 0.30), 'clean-1500': (0.12, 0.27), 'clean-1884': (0.12, 0.27),
}


def answers_of(cut, overlap):
    return {'text_cut_off': {'type': 'noul', 'noul': cut}, 'caption_hud_overlap': {'type': 'noul', 'noul': overlap}}


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
        body, ctype = Q.multipart_body(req, 'frame-png', 'x.png', b'\x89PNG\r\n\x1a\ndata')
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


class ThresholdTest(unittest.TestCase):
    def fired(self, question):
        return {name for name, (cut, overlap) in MEASURED.items() if Q.flags(answers_of(cut, overlap))[question]['flag']}

    def test_the_thresholds_are_the_agreed_ones(self):
        self.assertEqual(Q.THRESHOLDS, {'text_cut_off': 0.30, 'caption_hud_overlap': 0.45})

    def test_text_cut_off_fires_on_the_clipped_frames_and_never_on_the_clean_ones(self):
        fired = self.fired('text_cut_off')
        self.assertTrue({'zoomed-clipped', 'cropped-left'} <= fired)
        self.assertFalse({'clean-1500', 'clean-1884'} & fired)

    def test_caption_overlap_fires_on_the_strip_and_not_on_the_clean_or_clipped_frames(self):
        fired = self.fired('caption_hud_overlap')
        self.assertIn('strip-on-hud', fired)
        self.assertFalse({'clean-1500', 'clean-1884', 'zoomed-clipped', 'cropped-left'} & fired)

    def test_known_miss_a_caption_dropped_on_the_hud_stays_under_the_threshold(self):
        # documented limitation: this is why the overlap check should become two Box questions compared in code
        self.assertNotIn('caption-on-hud', self.fired('caption_hud_overlap'))

    def test_a_value_exactly_at_the_threshold_flags(self):
        self.assertTrue(Q.flags(answers_of(0.30, 0.0))['text_cut_off']['flag'])
        self.assertFalse(Q.flags(answers_of(0.29, 0.0))['text_cut_off']['flag'])

    def test_missing_or_non_noul_answers_are_skipped(self):
        self.assertEqual(Q.flags({}), {})
        self.assertEqual(Q.flags(None), {})
        self.assertEqual(Q.flags({'text_cut_off': {'type': 'box', 'box': {}}}), {})


def solid(color=(10, 10, 10), size=(960, 540)):
    return Image.new('RGB', size, color)


class DefectGeneratorTest(unittest.TestCase):
    def test_slide_left_loses_the_left_edge_and_leaves_the_right_edge_empty(self):
        src = Image.fromarray(np.random.default_rng(2).integers(0, 255, (540, 960, 3), dtype=np.uint8))
        out = np.asarray(D.slide_left(src, 120))
        self.assertEqual(out.shape, (540, 960, 3))
        self.assertTrue((out[:, -120:] == D.BACKGROUND).all())
        self.assertTrue((out[:, :-120] == np.asarray(src)[:, 120:]).all())

    def test_zoom_clip_keeps_the_frame_size_and_enlarges_the_centre(self):
        src = solid((0, 0, 0))
        src.paste((255, 255, 255), (470, 270, 490, 290))                  # a 20x20 white square at the centre
        out = np.asarray(D.zoom_clip(src, factor=2.0, dy=0).convert('L'))
        self.assertEqual(out.shape, (540, 960))
        self.assertAlmostEqual((out > 200).sum() / 400, 4.0, delta=0.6)

    def test_overlay_text_erases_the_source_and_draws_its_text_over_the_target(self):
        src = solid((0, 0, 0))
        src.paste((255, 255, 255), (100, 100, 140, 110))                  # the "text"
        src.paste((0, 0, 200), (100, 200, 300, 230))                      # something already at the target (the HUD)
        out = np.asarray(D.overlay_text(src, (90, 95, 400, 120), 205))
        self.assertTrue((out[100:110, 100:140] == D.BACKGROUND).all())    # erased where it was
        self.assertTrue((out[210:220, 100:140] == 255).all())             # drawn at the new place (offset 205 - 95 + 5)
        self.assertTrue((out[225, 200:300] == (0, 0, 200)).all())         # the HUD is still there where the text is not

    def test_paste_box_moves_a_rectangle_over_the_target(self):
        src = solid((0, 0, 0))
        src.paste((255, 0, 0), (50, 50, 150, 80))
        out = np.asarray(D.paste_box(src, (50, 50, 150, 80), 400, (9, 9, 9)))
        self.assertTrue((out[400:430, 50:150] == (255, 0, 0)).all())
        self.assertTrue((out[50:80, 50:150] == (9, 9, 9)).all())

    def test_make_all_writes_four_frames_of_the_same_size(self):
        with tempfile.TemporaryDirectory() as stills, tempfile.TemporaryDirectory() as out:
            make_frame(stills, 'Fd1500-540.png')
            make_frame(stills, 'Fd1884-1330.png')
            paths = D.make_all(out, stills)
            self.assertEqual(sorted(os.path.basename(p) for p in paths),
                             ['defect-caption-on-hud.png', 'defect-cropped-left.png', 'defect-strip-on-hud.png', 'defect-zoomed-clipped.png'])
            self.assertTrue(all(Image.open(p).size == (960, 540) for p in paths))
            self.assertEqual(Q.validate_size(*Image.open(paths[0]).size), [])


class ContentTypeTest(unittest.TestCase):
    def test_png_and_jpeg_are_told_apart_by_their_bytes(self):
        self.assertEqual(Q.content_type_for(b'\x89PNG\r\n\x1a\n' + b'rest'), 'image/png')
        self.assertEqual(Q.content_type_for(b'\xff\xd8\xff\xe0rest'), 'image/jpeg')

    def test_other_formats_are_refused_before_anything_is_sent(self):
        for data in (b'GIF89a..', b'RIFF\x00\x00\x00\x00WEBP', b''):
            with self.assertRaises(ValueError):
                Q.content_type_for(data)

    def test_the_multipart_part_carries_the_real_type_of_a_jpeg(self):
        req = Q.build_request('x.jpg', 'a', 'frame-png')
        body, _ = Q.multipart_body(req, 'frame-png', 'x.jpg', b'\xff\xd8\xff\xe0data')
        self.assertIn(b'Content-Type: image/jpeg', body)
        self.assertNotIn(b'Content-Type: image/png', body)


class RingFlowTest(unittest.TestCase):
    def run_outro(self, ring_box, present):
        answers = {**answers_of(0.1, 0.1), 'ring_present': {'type': 'noul', 'noul': present}, 'ring_box': {'type': 'box', 'box': ring_box, 'confidence': 0.9}}
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {'TYPESAFE_API_KEY': 'k'}), \
                mock.patch.object(Q, 'send', return_value={'answers': answers}), mock.patch('builtins.print') as printed:
            status = Q.main(['--send', '--i-approve-spend', '--frames', make_frame(d, 'FdOutro-1.png')])
        return status, printed

    def test_a_misplaced_ring_fails_the_run_even_when_the_text_answers_are_clean(self):
        status, printed = self.run_outro({'left': 0.44, 'right': 0.57, 'top': 0.69, 'bottom': 0.89}, 0.98)
        self.assertEqual(status, 2)
        self.assertTrue(any('ring MOVED' in str(c) for c in printed.call_args_list))

    def test_a_ring_on_the_subscribe_circle_passes(self):
        status, _ = self.run_outro({'left': 0.432, 'right': 0.568, 'top': 0.590, 'bottom': 0.831}, 0.98)
        self.assertEqual(status, 0)

    def test_a_missing_ring_fails_the_run(self):
        status, printed = self.run_outro({'left': 0.432, 'right': 0.568, 'top': 0.590, 'bottom': 0.831}, 0.05)
        self.assertEqual(status, 2)
        self.assertTrue(any('ring ABSENT' in str(c) for c in printed.call_args_list))

    def test_frames_without_ring_questions_have_no_ring_report(self):
        self.assertIsNone(Q.ring_report(answers_of(0.1, 0.1)))
        self.assertIsNone(Q.ring_report(None))


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
        with tempfile.TemporaryDirectory() as d, mock.patch.object(Q, 'send') as sent, mock.patch('builtins.print'):
            self.assertEqual(Q.main(['--frames', make_frame(d)]), 0)
        sent.assert_not_called()

    def test_a_missing_frame_is_a_clear_error(self):
        with self.assertRaises(SystemExit) as caught:
            Q.main(['--frames', '/nonexistent/frame.png'])
        self.assertIn('frame not found', str(caught.exception))

    def run_send(self, answers):
        with tempfile.TemporaryDirectory() as d, mock.patch.dict(os.environ, {'TYPESAFE_API_KEY': 'k'}), \
                mock.patch.object(Q, 'send', return_value={'answers': answers}) as sent, mock.patch('builtins.print') as printed:
            status = Q.main(['--send', '--i-approve-spend', '--frames', make_frame(d)])
        return status, sent, printed

    def test_a_flagged_answer_gives_exit_status_2_and_is_reported(self):
        status, sent, printed = self.run_send({'text_cut_off': {'type': 'noul', 'noul': 0.98}, 'caption_hud_overlap': {'type': 'noul', 'noul': 0.1}})
        self.assertEqual((status, sent.call_count), (2, 1))
        self.assertTrue(any('FLAG text_cut_off' in str(c) for c in printed.call_args_list))

    def test_clean_answers_give_exit_status_0(self):
        status, _, _ = self.run_send({'text_cut_off': {'type': 'noul', 'noul': 0.12}, 'caption_hud_overlap': {'type': 'noul', 'noul': 0.27}})
        self.assertEqual(status, 0)


if __name__ == '__main__':
    unittest.main()
