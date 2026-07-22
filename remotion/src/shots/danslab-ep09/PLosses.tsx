import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 30 — the honest record. VO 0.8s (24.6s).
export const compositionConfig = { id: 'PLosses', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const PLosses: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE PLAYER // LOSSES FIRST" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Read his record the way he would — <span style={{ color: DL.red }}>losses first.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)', width: 1120 }}>
        {[['hacked twice in his first two days', 90], ['a dashboard habit that burned weeks', 150], ['experiments that died quietly', 210], ['drawdowns published, face up — episode three', 270]].map(([t, at]) => (
          <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 24, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.red}`, borderRadius: 14, padding: '20px 32px', marginBottom: 14 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.red }}>LOSS</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 33, color: DL.text }}>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [480, 510], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 41, color: DL.warm }}>Show me a founder who publishes his losses — and I will show you one </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 41, color: DL.gold }}>whose wins you can believe.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PLosses;
