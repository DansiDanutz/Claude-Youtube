import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 6b — reading machines like players. VO 0.8s (20.1s).
export const compositionConfig = { id: 'PRead', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const PRead: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE TABLE // READING THE TELLS" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Poker players read people. <span style={{ color: DL.sky }}>Dan reads machines.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: '50%', transform: 'translateX(-50%)', width: 1180 }}>
        {[['an agent that goes quiet on a vague task', 100], ['a model that answers a little too confidently', 160], ['a log that hesitates', 220]].map(([t, at]) => (
          <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', alignItems: 'center', gap: 22, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.sky}`, borderRadius: 14, padding: '24px 34px', marginBottom: 18 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.sky }}>TELL</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 34, color: DL.text }}>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 408], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>The tells are different. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>The reading is the same skill.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PRead;
