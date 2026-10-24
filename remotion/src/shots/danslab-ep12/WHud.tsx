import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';
import { abs, at, TOTAL_SEC, FPS } from '../../lib/ep12timing.gen';

// Ep12 — bottom strip: DansLab link (mandatory every episode) + the REVENUE counter.
// The counter is the episode: it appears on dol01 "That COUNTER at the bottom has never moved" and reads $0.00.
// v3 (Dan 2026-10-24): REVENUE never moves in this episode. On dol23 "look at the COUNTER" a second, muted
// counter joins it — LIVE TEST $9.00 ✓ (Dan's own 9 USDC, order #35096a88) — and stays to the end. No POP:
// a test is not revenue, so the REVENUE number is never animated as a win.
// Canvas 1920×170 (reserved bottom 70px bar), composited at mux. All times from ep12timing.gen.ts.
export const compositionConfig = {
  id: 'WHud', durationInSeconds: 527.6, fps: 30, width: 1920, height: 170, transparent: true,
};

const BAR_IN = abs('WDollar', at('dol01', 'counter'));
const BAR_OUT = Math.round(TOTAL_SEC * FPS) - 24;
const TEST_IN = abs('WCounter', at('dol23', 'counter'));

const WHud: React.FC = () => {
  const f = useCurrentFrame();
  const testOp = interpolate(f, [TEST_IN, TEST_IN + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const inOp = interpolate(f, [BAR_IN, BAR_IN + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const outOp = interpolate(f, [BAR_OUT, BAR_OUT + 24], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const y = interpolate(f, [BAR_IN, BAR_IN + 24], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: inOp * outOp }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, display: 'flex', alignItems: 'center',
        background: 'rgba(9,7,6,0.88)', borderTop: `1px solid ${DL.border}`, padding: '0 48px', gap: 40, transform: `translateY(${y}px)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 30 }}>
            <span style={{ color: DL.text }}>Dans</span><span style={{ color: DL.red }}>Lab</span>
          </span>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.gold }}>danslab.vercel.app</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, opacity: testOp }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 3, color: DL.faint }}>LIVE TEST</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.muted }}>$9.00 ✓</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 18, color: DL.faint }}>paid by Dan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>REVENUE</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.gold }}>$0.00</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>· from outside customers · since episode one</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default WHud;
