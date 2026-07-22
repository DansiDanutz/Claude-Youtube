import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 1 — recap: company runs & thinks for itself; Dan opened the doors. To
// understand why, understand the man. VO 0.8s (20.1s).
export const compositionConfig = { id: 'MRecap', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const MRecap: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="PREVIOUSLY // A COMPANY THAT RUNS ITSELF" />

      <div style={{ position: 'absolute', top: 250, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={26} size={54}>Paperclip watches it. Hermes decides for it.</Headline>
        <div style={{ marginTop: 14 }}><Headline at={74} size={58} italic color={DL.gold}>And then Dan opened the doors.</Headline></div>
      </div>

      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [230, 256], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>To understand why — you have to understand the man, </span>
        <div style={{ marginTop: 8 }}><span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>and the game he&rsquo;s played his whole life.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default MRecap;
