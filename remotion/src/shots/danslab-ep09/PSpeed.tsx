import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 11 — three schools, one lesson. VO 0.8s (16.4s).
export const compositionConfig = { id: 'PSpeed', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const PSpeed: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE SCHOOLS // ONE LESSON" />

      <div style={{ position: 'absolute', top: 180, left: '50%', transform: 'translateX(-50%)', width: 1220 }}>
        {[['THE CLUB', 'read risk in real time', 60], ['THE EXCHANGE', 'engineer trust', 110], ['THE COIN', 'the price of being slow', 160]].map(([k, v, at]) => (
          <div key={String(k)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 30, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '22px 34px', marginBottom: 16 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint, width: 250 }}>{k}</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 36, color: DL.text }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 170, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [250, 278], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 68, color: DL.text }}>Speed <span style={{ fontStyle: 'italic', color: DL.gold }}>wins.</span></span>
        <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, opacity: interpolate(frame, [370, 398], [0, 1], DCLAMP) }}>And speed was exactly what one man did not have.</div>
      </div>
    </AbsoluteFill>
  );
};
export default PSpeed;
