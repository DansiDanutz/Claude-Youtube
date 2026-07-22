import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card } from '../../lib/ep06kit';

// Ep09 6 — incomplete information. VO 0.8s (18.5s).
export const compositionConfig = { id: 'PLesson2', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PLesson2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE TABLE // THE DEEPER LAW" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>You will never see <span style={{ color: DL.sky }}>the whole board.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 30 }}>
        <Card rank="?" suit="◆" at={80} w={210} rot={-6} />
        <Card rank="?" suit="◆" at={110} w={210} rot={5} />
      </div>

      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm, opacity: interpolate(frame, [220, 246], [0, 1], DCLAMP) }}>The cards are face down. And you have to bet anyway.</div>
        <div style={{ marginTop: 16, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold, opacity: interpolate(frame, [430, 460], [0, 1], DCLAMP) }}>Perfect training for running a company you cannot fully observe.</div>
      </div>
    </AbsoluteFill>
  );
};
export default PLesson2;
