import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 21 — how does one mind run four? → The Brain, next. VO 0.8s (18.9s).
export const compositionConfig = { id: 'OCliff', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const OCliff: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [40, 60], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextOp = interpolate(frame, [470, 500], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextScale = interpolate(frame, [470, 510], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.4 + 0.3 * Math.abs(Math.sin(frame / 22));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={`rgba(56,189,248,${glow})`} />
      <Kicker n="04" label="ONE QUESTION LEFT" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: qOp, textAlign: 'center', maxWidth: 1400 }}>
          <Headline at={40} size={54}>How does one machine understand four other minds —</Headline>
          <div style={{ marginTop: 14 }}><Headline at={90} size={54} italic color={DL.warm}>well enough to run them?</Headline></div>
          <div style={{ marginTop: 40 }}><Headline at={160} size={60} color={DL.text}>That is not a dashboard. That is a <span style={{ color: DL.sky }}>brain.</span></Headline></div>
        </div>

        <div style={{ marginTop: 70, opacity: nextOp, transform: `scale(${nextScale})`, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>NEXT · DANSLAB NO. 05</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text, marginTop: 12 }}>The <span style={{ fontStyle: 'italic', color: DL.sky }}>Brain</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default OCliff;
