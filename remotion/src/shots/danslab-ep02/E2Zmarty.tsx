import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';
import { EquityCurve, StatCard } from '../../lib/ep03kit';

// =============================================================================
// Ep02 Zmarty ad + Sienna's paper-trading page. VO 0.8s (25.4s): "Zmarty is
// market intelligence for traders... And Sienna? She started on paper. No real
// money. Just practice. And every day she studied her own results and got a
// little bit better. A machine, teaching herself to trade. Day by day."
//
// Numbers below are the REAL output of Sienna's engine (data/meta.json,
// generated 2026-07-21, Binance public API, perpetual futures, $10k paper
// capital). Nothing here is illustrative.
// =============================================================================
export const compositionConfig = { id: 'E2Zmarty', durationInSeconds: 27.5, fps: 30, width: 1920, height: 1080 };

const CURVE = 60;
const STATS = 300;
const CLOSE = 560;

// real normalised paper-equity marks, 82 days
const EQ = [
  0.221, 0.219, 0.264, 0.298, 0.291, 0.227, 0.075, 0.11, 0.129, 0.036, 0.137, 0.144, 0.056, 0.216,
  0.22, 0.23, 0.287, 0.297, 0.329, 0.309, 0.28, 0.445, 0.455, 0.455, 0.48, 0.471, 0.536, 0.536,
  0.498, 0.477, 0.536, 0.546, 0.63, 0.679, 0.723, 0.723, 0.786, 0.725, 0.757, 0.909, 0.958, 0.953,
  1.0, 0.985, 1.0, 0.94, 0.936, 0.744, 0.291, 0.291, 0.285, 0.272, 0.334, 0.334, 0.383, 0.288,
  0.051, 0.03, 0.03, 0.03, 0.03, 0.03, 0.0, 0.192, 0.219, 0.229, 0.28, 0.155, 0.037, 0.299, 0.322,
  0.429, 0.389, 0.461, 0.612, 0.597, 0.475, 0.516, 0.669, 0.723, 0.796, 0.859,
];

const E2Zmarty: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const panelOp = interpolate(frame, [CURVE - 20, CURVE], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const eq = Math.round(interpolate(frame, [CURVE, CURVE + 70], [10000, 10447], { ...DCLAMP, easing: DL_EASE.inOut }));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="04" label="SIENNA × ZMARTY // PAPER TRADING" />

      <div style={{ position: 'absolute', top: 168, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 64, color: DL.text }}>
          She started <span style={{ fontStyle: 'italic', color: DL.green }}>on paper.</span>
        </span>
        <div style={{ marginTop: 12, fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>
          Ten thousand dollars of virtual capital. No real money. Just practice.
        </div>
      </div>

      {/* the real paper-equity curve */}
      <div style={{ position: 'absolute', top: 340, left: 120, width: 1120, opacity: panelOp, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '28px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 3, color: DL.faint }}>PAPER EQUITY · MARK-TO-MARKET</div>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 58, color: DL.text, marginTop: 6 }}>${eq.toLocaleString()}</div>
          </div>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.green, border: `1px solid ${DL.green}55`, borderRadius: 999, padding: '8px 20px' }}>82 equity marks</div>
        </div>
        <div style={{ marginTop: 18 }}>
          <EquityCurve pts={EQ} at={CURVE} w={1050} h={240} />
        </div>
      </div>

      {/* right rail: the honest record */}
      <div style={{ position: 'absolute', top: 340, right: 84, width: 480, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <StatCard label="Win rate · real engine" big="84%" sub="42 wins from 50 closed trades" color={DL.green} at={STATS} w={480} />
        <StatCard label="Average trade" big="+14.6%" sub="return on the margin risked" color={DL.gold} at={STATS + 26} w={480} />
        <StatCard label="Worst drawdown" big="−6.6%" sub="she never blew the account" color={DL.red} at={STATS + 52} w={480} />
      </div>

      <div style={{ position: 'absolute', bottom: 66, left: 120, right: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: interpolate(frame, [CLOSE, CLOSE + 24], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 34, color: DL.warm }}>
          She audits her own book every night — and rewrites her own rules.
        </span>
        <span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>real Binance data · paper capital · not financial advice</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Zmarty;
