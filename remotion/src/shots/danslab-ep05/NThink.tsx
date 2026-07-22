import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { NeuralBrain } from '../../lib/ep05kit';

// Ep05 7 — THE CENTERPIECE: it thinks in weights. The brain, working. VO 0.8s (19.1s).
export const compositionConfig = { id: 'NThink', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const NThink: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // IN WEIGHTS, NOT WORDS" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={52}>Then it thinks. Not in words — <span style={{ color: DL.sky }}>in weights.</span></Headline>
        <div style={{ marginTop: 6 }}><Headline at={50} size={38} italic color={DL.warm}>One question, run against every option: what moves the company forward most, right now?</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 330, left: '50%', transform: 'translateX(-50%)' }}>
        <NeuralBrain at={90} w={1400} h={520} color={DL.sky} intense={1.1} />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 448], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>Thousands of tiny judgments — collapsing into one clear answer. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.sky }}>This is the brain, working.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NThink;
