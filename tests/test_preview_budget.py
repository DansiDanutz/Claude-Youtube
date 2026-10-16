import os
import sys
import unittest
from unittest import mock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'videos', 'dyk-05-food', 'work'))
import make_preview as P  # noqa: E402

EPISODE_5_S = 649.93


class PreviewBudgetTest(unittest.TestCase):
    def test_the_current_bit_rates_fit_the_30_mb_rule_with_overhead(self):
        self.assertLessEqual(P.estimate_mb(EPISODE_5_S), P.LIMIT_MB)

    def test_the_old_300_plus_96_kbps_did_not(self):
        self.assertGreater(P.estimate_mb(EPISODE_5_S, video_kbps=300, audio_kbps=96, overhead=1.0), 30.0)

    def test_the_estimate_is_bit_rate_times_duration(self):
        self.assertAlmostEqual(P.estimate_mb(100, video_kbps=400, audio_kbps=0, overhead=1.0), 5.0)

    def test_the_peak_rate_stays_above_the_average(self):
        self.assertGreater(P.MAXRATE_KBPS, P.VIDEO_KBPS)


class PreviewRunTest(unittest.TestCase):
    def run_main(self, size_bytes, duration=EPISODE_5_S, video_kbps=None):
        patches = [mock.patch.object(P, 'master_duration', return_value=duration),
                   mock.patch.object(P.subprocess, 'run'),
                   mock.patch.object(P.os.path, 'getsize', return_value=size_bytes),
                   mock.patch('builtins.print')]
        if video_kbps:
            patches.append(mock.patch.object(P, 'VIDEO_KBPS', video_kbps))
        mocks = [p.start() for p in patches]
        self.addCleanup(lambda: [p.stop() for p in patches])
        return mocks[1]                                      # the mocked subprocess.run

    def test_a_budget_over_the_limit_is_refused_before_ffmpeg_runs(self):
        encode = self.run_main(10_000_000, video_kbps=500)
        with self.assertRaises(SystemExit) as caught:
            P.main()
        self.assertIn('over the 30 MB preview limit', str(caught.exception))
        encode.assert_not_called()

    def test_a_finished_file_over_the_limit_fails_the_run(self):
        encode = self.run_main(31_000_000)
        with self.assertRaises(SystemExit) as caught:
            P.main()
        self.assertIn('over the 30 MB limit', str(caught.exception))
        encode.assert_called_once()

    def test_a_finished_file_under_the_limit_passes_and_uses_the_budgeted_rates(self):
        encode = self.run_main(27_000_000)
        P.main()
        args = encode.call_args.args[0]
        self.assertEqual(args[args.index('-b:v') + 1], '240k')
        self.assertEqual(args[args.index('-b:a') + 1], '80k')
        self.assertEqual(args[args.index('-bufsize') + 1], '640k')


if __name__ == '__main__':
    unittest.main()
