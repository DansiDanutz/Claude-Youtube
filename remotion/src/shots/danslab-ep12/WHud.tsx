import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from '../../lib/danslab';
import { abs, at, BRANCH, TOTAL_SEC, FPS } from '../../lib/ep12timing.gen';

// Ep12 — bottom strip: DansLab link (mandatory every episode) + the REVENUE counter.
// The counter is the episode: it appears on dol01 "That COUNTER at the bottom has never moved", reads $0.00,
// and changes exactly once — the POP (scale ~1.3×, blend to white, glow, ~1.5s) in WLands — or never.
// Canvas 1920×170 (reserved bottom 70px bar), composited at mux. All times from ep12timing.gen.ts.
export const compositionConfig = {
  id: 'WHud', durationInSeconds: 512.5, fps: 30, width: 1920, height: 170, transparent: true,
};

// Flip to true ONLY after the real outside payment is verified on-chain (and dol23a voiced + build_timing re-run).
const LANDED = false;
// TODO(ep12, render day): the EXACT invoice amount (NervixPay adds randomized cents).
const AMOUNT = '$10.00';

const BAR_IN = abs('WDollar', at('dol01', 'counter'));
const BAR_OUT = Math.round(TOTAL_SEC * FPS) - 24;
const LANDS_AT = LANDED && BRANCH === 'WLands' ? abs('WLands', at('dol23a', 'there', 1, 1.0)) : null;

const WHud: React.FC = () => {
  const f = useCurrentFrame();
  const landed = LANDS_AT !== null && f >= LANDS_AT;
  const life = LANDS_AT === null ? 0 : f - LANDS_AT;
  const pop = landed ? interpolate(life, [0, 12, 45], [0, 1, 0], { ...DCLAMP, easing: DL_EASE.out }) : 0;
  const glow = landed ? interpolate(life, [0, 8, 90], [0, 1, 0.25], DCLAMP) : 0;
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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint }}>REVENUE</span>
          <span style={{
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: landed ? '#ffffff' : DL.gold,
            display: 'inline-block', transformOrigin: 'right center', transform: `scale(${1 + 0.3 * pop})`,
            textShadow: `0 0 ${26 * glow}px rgba(212,160,23,${0.95 * glow})`,
          }}>{landed ? AMOUNT : '$0.00'}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted }}>· from outside customers · since episode one</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default WHud;
