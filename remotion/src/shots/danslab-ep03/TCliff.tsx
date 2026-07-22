import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 19 — the cliffhanger: who runs the race? → Paperclip, next. VO 0.8s (18.7s).
export const compositionConfig = { id: 'TCliff', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const TCliff: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [40, 60], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextOp = interpolate(frame, [470, 500], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextScale = interpolate(frame, [470, 510], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glowPulse = 0.4 + 0.3 * Math.abs(Math.sin(frame / 22));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={`rgba(212,160,23,${glowPulse})`} />
      <Kicker n="03" label="ONE QUESTION LEFT" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: qOp, textAlign: 'center', maxWidth: 1400 }}>
          <Headline at={40} size={58}>Four machines, racing each other for profit —</Headline>
          <div style={{ marginTop: 16 }}><Headline at={90} size={58} italic color={DL.warm}>every single day.</Headline></div>
          <div style={{ marginTop: 40 }}><Headline at={150} size={70} color={DL.text}>So who <span style={{ color: DL.gold }}>runs the race?</span></Headline></div>
          <div style={{ marginTop: 18 }}><Headline at={210} size={40} italic color={DL.dim}>Who keeps the score honest, while Dan is asleep?</Headline></div>
        </div>

        {/* next reveal */}
        <div style={{ marginTop: 70, opacity: nextOp, transform: `scale(${nextScale})`, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>NEXT · DANSLAB NO. 04</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text, marginTop: 12 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Overseer</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TCliff;
