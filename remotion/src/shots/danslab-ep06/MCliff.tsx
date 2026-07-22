import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 17 — what builds all of it? A factory that never stops → No.07. VO 0.8s (20.2s).
export const compositionConfig = { id: 'MCliff', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const MCliff: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [40, 60], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextOp = interpolate(frame, [500, 530], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextScale = interpolate(frame, [500, 540], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.4 + 0.3 * Math.abs(Math.sin(frame / 22));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={`rgba(231,76,60,${glow})`} />
      <Kicker n="06" label="ONE LAST QUESTION" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: qOp, textAlign: 'center', maxWidth: 1440 }}>
          <Headline at={40} size={50}>Every trade, every video, every task on that marketplace —</Headline>
          <div style={{ marginTop: 14 }}><Headline at={94} size={54} italic color={DL.warm}>has to be built. Made. Shipped. Without rest.</Headline></div>
          <div style={{ marginTop: 40 }}><Headline at={170} size={60} color={DL.text}>So what <span style={{ color: DL.red }}>builds all of it?</span></Headline></div>
          <div style={{ marginTop: 14 }}><Headline at={230} size={38} italic color={DL.dim}>There is a factory behind this company that never, ever stops.</Headline></div>
        </div>

        <div style={{ marginTop: 60, opacity: nextOp, transform: `scale(${nextScale})`, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>NEXT · DANSLAB NO. 07</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text, marginTop: 12 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Factory</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MCliff;
