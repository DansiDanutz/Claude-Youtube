import os
import sys
import unittest

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


if __name__ == '__main__':
    unittest.main()
