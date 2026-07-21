import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Ep02 Zmarty ad + Sienna's paper-trading page. VO 0.8s (25.4s): "Zmarty is
// market intelligence for traders... And Sienna? She started on paper. No real
// money. Just practice. And every day she studied her own results and got a
// little bit better. A machine, teaching herself to trade. Day by day."
// Shows the polished Sienna page (the equity curve) + the learning stat climb.
// =============================================================================
export const compositionConfig = { id: 'E2Zmarty', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const PAGE = 60;
const CURVE = 340;   // "she got better"
const STAT = 470;    // win rate climb

const E2Zmarty: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const pageOp = interpolate(frame, [PAGE, PAGE + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pageY = interpolate(frame, [PAGE, PAGE + 20], [40, 0], { ...DCLAMP, easing: DL_EASE.out });
  const curveOp = interpolate(frame, [CURVE, CURVE + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const wr = Math.round(interpolate(frame, [STAT, STAT + 40], [46, 72], { ...DCLAMP, easing: DL_EASE.inOut }));
  const statOp = interpolate(frame, [STAT, STAT + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="04" label="SIENNA × ZMARTY // PAPER TRADING" />

      <div style={{ position: 'absolute', top: 176, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 64, color: DL.text }}>
          She started <span style={{ fontStyle: 'italic', color: DL.green }}>on paper.</span>
        </span>
      </div>

      {/* the polished Sienna page */}
      <div style={{ position: 'absolute', top: 300, left: 120, opacity: pageOp, transform: `translateY(${pageY}px)` }}>
        <SiteFrame src={staticFile('projects/danslab-ep02/sienna-page.png')} url="sienna · zmarty.me" w={1160} h={640} />
      </div>

      {/* right rail: the learning story */}
      <div style={{ position: 'absolute', top: 320, right: 90, width: 470, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ opacity: curveOp, background: DL.panel, border: `1px solid ${DL.green}44`, borderLeft: `3px solid ${DL.green}`, borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.green }}>DAY BY DAY</div>
          <div style={{ fontSize: 30, color: DL.text, marginTop: 8, lineHeight: 1.35 }}>She audits her own trades every night — and rewrites her own rules.</div>
        </div>
        <div style={{ opacity: statOp, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.faint }}>WIN RATE · SELF-TAUGHT</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 72, color: DL.green, lineHeight: 1 }}>{wr}%</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.dim, marginTop: 6 }}>up from 46% on day one</div>
        </div>
        <div style={{ opacity: statOp, background: `${DL.green}10`, border: `1px solid ${DL.green}44`, borderRadius: 14, padding: '20px 28px' }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 28, color: DL.warm }}>A machine, teaching itself to trade.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default E2Zmarty;
