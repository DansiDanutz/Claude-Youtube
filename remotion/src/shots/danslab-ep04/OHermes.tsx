import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, HermesLogo } from '../../lib/danslab';

// Ep04 15 — a new kind of agent appears. Not louder — better. Hermes. VO 0.8s (7.0s).
export const compositionConfig = { id: 'OHermes', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const OHermes: React.FC = () => {
  const frame = useCurrentFrame();
  const nameOp = interpolate(frame, [130, 154], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const preOp = interpolate(frame, [24, 46], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: preOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm, marginBottom: 40 }}>
          Not louder. Not flashier. Just... <span style={{ color: DL.sky }}>better.</span>
        </div>
        <HermesLogo size={230} start={40} />
        <div style={{ opacity: nameOp, marginTop: 36, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 6, color: DL.red }}>A NEW KIND OF AGENT</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text, marginTop: 8 }}><span style={{ color: DL.sky }}>Hermes</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default OHermes;
