import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch6 · the red column. VO audit04 31.1. SPOF lands ~2s; the June 29 beat and
// the `return False` line land ~17s / ~22s.
export const compositionConfig = { id: 'YBroken', durationInSeconds: 34, fps: 30, width: 1920, height: 1080 };

const YBroken: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE AUDIT — BROKEN" />
      <div style={{ position: 'absolute', top: 140, left: 120, right: 120 }}>
        <Headline at={8} size={48}>What's <span style={{ color: DL.red }}>broken.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, width: 1560, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{
          ...rise(70), display: 'flex', alignItems: 'flex-start', gap: 26,
          background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.red}`,
          borderRadius: 14, padding: '24px 30px',
        }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.red, width: 56 }}>1</div>
          <div>
            <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text }}>A single point of failure — a desk in a bedroom</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 8, lineHeight: 1.45 }}>
              Mac Studio dies → router dies, orchestrator dies, four healthy servers idle.
              A $300 cloud instance fixes it. It hasn't been done.
            </div>
          </div>
        </div>
        <div style={{
          ...rise(490), display: 'flex', alignItems: 'flex-start', gap: 26,
          background: DL.panel, border: `1px solid ${DL.red}`, borderLeft: `4px solid ${DL.red}`,
          borderRadius: 14, padding: '24px 30px',
        }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.red, width: 56 }}>2</div>
          <div>
            <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text }}>June 29 — one function changed</div>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.red, marginTop: 12, background: DL.panel2, border: `1px solid ${DL.border}`, borderRadius: 10, padding: '10px 20px', display: 'inline-block' }}>
              return False
            </div>
            <div style={{ ...rise(700), fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 12, lineHeight: 1.45 }}>
              Every read-only task started silently piling into an unmonitored queue instead of closing.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YBroken;
