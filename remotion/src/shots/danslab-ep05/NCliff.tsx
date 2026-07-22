import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 19 — a company that runs & improves itself... what does he do with it?
// He opens the doors. → Nervix. VO 0.8s (18.9s).
export const compositionConfig = { id: 'NCliff', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const NCliff: React.FC = () => {
  const frame = useCurrentFrame();
  const qOp = interpolate(frame, [40, 60], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextOp = interpolate(frame, [470, 500], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextScale = interpolate(frame, [470, 510], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.4 + 0.3 * Math.abs(Math.sin(frame / 22));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={`rgba(212,160,23,${glow})`} />
      <Kicker n="05" label="ONE LAST QUESTION" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: qOp, textAlign: 'center', maxWidth: 1440 }}>
          <Headline at={40} size={52}>A company that runs itself, improves itself, and never sleeps —</Headline>
          <div style={{ marginTop: 16 }}><Headline at={94} size={56} italic color={DL.warm}>what do you do with all that power?</Headline></div>
          <div style={{ marginTop: 40 }}><Headline at={160} size={58} color={DL.text}>You do the boldest thing of all. You <span style={{ color: DL.gold }}>open the doors.</span></Headline></div>
          <div style={{ marginTop: 14 }}><Headline at={220} size={38} italic color={DL.dim}>You let the entire world plug in.</Headline></div>
        </div>

        <div style={{ marginTop: 64, opacity: nextOp, transform: `scale(${nextScale})`, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>NEXT · DANSLAB NO. 06</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 92, color: DL.text, marginTop: 12 }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Marketplace</span></div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default NCliff;
