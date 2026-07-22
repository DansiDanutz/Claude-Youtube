import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg, HermesLogo } from '../../lib/danslab';
import { NeuralBrain } from '../../lib/ep05kit';

// Ep05 3 — the reveal: the mind Dan built. It decides. Meet Hermes. VO 0.8s (10.8s).
// Cinematic reveal — NeuralBrain glows in behind the logo.
export const compositionConfig = { id: 'NHermes', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const NHermes: React.FC = () => {
  const frame = useCurrentFrame();
  const nameOp = interpolate(frame, [150, 176], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameScale = interpolate(frame, [150, 182], [0.82, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      {/* faint brain behind */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
        <NeuralBrain at={30} w={1500} h={720} color={DL.sky} intense={0.7} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: interpolate(frame, [30, 54], [0, 1], DCLAMP), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginBottom: 36 }}>
          It doesn&rsquo;t ship code. It doesn&rsquo;t trade. It does one thing — <span style={{ color: DL.sky }}>it decides.</span>
        </div>
        <HermesLogo size={200} start={60} />
        <div style={{ opacity: nameOp, transform: `scale(${nameScale})`, marginTop: 30, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 6, color: DL.red }}>THE MIND</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 92, color: DL.text, marginTop: 6 }}><span style={{ color: DL.sky }}>Hermes</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default NHermes;
