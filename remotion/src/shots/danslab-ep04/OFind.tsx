import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 8 — Dan needed a system above the agents. Then he found it: Paperclip.
// VO 0.8s (11.1s).
export const compositionConfig = { id: 'OFind', durationInSeconds: 14, fps: 30, width: 1920, height: 1080 };

const OFind: React.FC = () => {
  const frame = useCurrentFrame();
  const nameOp = interpolate(frame, [190, 214], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameScale = interpolate(frame, [190, 224], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.3 + 0.4 * Math.abs(Math.sin(frame / 18));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={`rgba(212,160,23,${glow})`} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: interpolate(frame, [30, 54], [0, 1], DCLAMP), textAlign: 'center' }}>
          <Headline at={30} size={46} italic color={DL.warm}>Not another dashboard to babysit.</Headline>
          <div style={{ marginTop: 8 }}><Headline at={70} size={46} color={DL.text}>A system that sits <span style={{ color: DL.gold }}>above</span> the agents.</Headline></div>
        </div>
        <div style={{ opacity: nameOp, transform: `scale(${nameScale})`, marginTop: 60, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>THE OVERSEER</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 120, color: DL.text, marginTop: 10 }}><span style={{ color: DL.gold }}>Paperclip</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default OFind;
