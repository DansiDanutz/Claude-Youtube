import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';
import { DL, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';
import { abs, at, voEnd } from '../../lib/ep12timing.gen';

// Ep12 — top-right THE RAIL panel (composited at mux, like ep10 YHudTop). Introduced with a pointer sign on
// "that panel in the corner" (dol17); each segment lights only when shown working on camera:
// LINK (dol17 "link lights") → SCAN (dol18 "scans") → VERIFIED (dol18 "paid") → IN WALLET (dol18 "belongs").
// Panel 640 wide at the canvas right edge → frame x 1190–1830 (clear of the shortened kicker, which ends at x 1120).
// Canvas 1080×140 incl. the pointer sign; mux places it at x = W − 1080 − 90, y = 60 (owns x>1170, y60–186... see mux).
export const compositionConfig = {
  id: 'WHudTop', durationInSeconds: 527.6, fps: 30, width: 1080, height: 140, transparent: true,
};

const SEGS: [string, number][] = [
  ['LINK', abs('WSetup', at('dol17', 'link', 2))],
  ['SCAN', abs('WScan', at('dol18', 'scans'))],
  ['VERIFIED', abs('WScan', at('dol18', 'paid'))],
  ['IN WALLET', abs('WScan', at('dol18', 'belongs'))],
];
const IN = abs('WSetup', at('dol17', 'panel'));
const OUT = abs('WScan', voEnd('dol18')) + 30;

const WHudTop: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = interpolate(f, [IN, IN + 18, OUT, OUT + 18], [0, 1, 1, 0], { ...DCLAMP, easing: DL_EASE.out });
  const sign = interpolate(f, [IN + 6, IN + 18, IN + 120, IN + 140], [0, 1, 1, 0], DCLAMP);
  const bob = Math.sin((f - IN) / 8) * 5;
  if (op <= 0) return null;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: op }}>
      {/* pointer sign (left of the panel) */}
      <div style={{ position: 'absolute', left: 250, top: 30, display: 'flex', alignItems: 'center', gap: 10, opacity: sign, transform: `translateX(${bob}px)` }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 22, color: DL.bg, background: DL.gold, borderRadius: 8, padding: '6px 12px' }}>THE RAIL</span>
        <svg width="40" height="30" viewBox="0 0 40 30"><path d="M2 15 H34 M34 15 L22 4 M34 15 L22 26" stroke={DL.gold} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, width: 640, height: 126, background: 'rgba(9,7,6,0.9)', border: `1px solid ${DL.border}`,
        borderRadius: 14, padding: '14px 20px', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 4, color: DL.muted }}>THE RAIL · LIT WHEN SEEN WORKING</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          {SEGS.map(([label, t], i) => {
            const lit = f >= t;
            const s = spring({ frame: f - t, fps, config: { damping: 12, mass: 0.5 } });
            return (
              <React.Fragment key={label}>
                {i > 0 && <div style={{ width: 18, height: 4, borderRadius: 2, background: lit ? DL.gold : DL.border }} />}
                <div style={{
                  flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 19,
                  color: lit ? DL.bg : DL.faint, background: lit ? DL.gold : 'transparent', border: `1px solid ${lit ? DL.gold : DL.border}`,
                  transform: `scale(${lit ? 1 + 0.12 * (1 - s) : 1})`, boxShadow: lit ? `0 0 ${18 * (1 - s) + 6}px ${DL.gold}66` : undefined,
                }}>{label}</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default WHudTop;
