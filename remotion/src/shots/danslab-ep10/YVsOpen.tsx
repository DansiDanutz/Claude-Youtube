import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch7 open. VO vs01 9.4. Two companies, same eight seats — the split screen device.
export const compositionConfig = { id: 'YVsOpen', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const YVsOpen: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // CH.7 — SIDE BY SIDE" />
      <div style={{ position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center', ...rise(20) }}>
        <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 50, color: DL.text }}>
          Two companies. Same eight seats. Same work.
        </div>
        <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 18 }}>
          Both bills added up properly.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 430, left: 120, right: 120, display: 'flex', gap: 28 }}>
        <div style={{ ...rise(160), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `4px solid ${DL.red}`, borderRadius: 16, padding: '40px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.red }}>THE HUMAN COMPANY</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 14 }}>8 people, hired properly</div>
        </div>
        <div style={{ ...rise(220), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `4px solid ${DL.gold}`, borderRadius: 16, padding: '40px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.gold }}>DANSLAB</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 14 }}>8 agents, running now</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YVsOpen;
