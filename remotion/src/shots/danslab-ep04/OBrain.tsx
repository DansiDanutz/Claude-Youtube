import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 17 — Dan gave Hermes the power. Made it the Brain. VO 0.8s (15.0s).
export const compositionConfig = { id: 'OBrain', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const OBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const badgeOp = interpolate(frame, [200, 224], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE BRAIN // THE HANDOVER" />

      <div style={{ position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={54}>Too independent for any human to manage alone.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={46} italic color={DL.warm}>So Dan handed that power to Hermes.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <HermesLogo size={200} start={120} />
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: badgeOp }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.red }}>APPOINTED</span>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text, marginTop: 8 }}>The <span style={{ fontStyle: 'italic', color: DL.sky }}>Brain</span></div>
        <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 8 }}>the mind behind the overseer — that decides what actually matters</div>
      </div>
    </AbsoluteFill>
  );
};
export default OBrain;
