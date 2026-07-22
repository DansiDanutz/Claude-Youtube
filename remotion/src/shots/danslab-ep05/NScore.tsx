import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { DecisionScore } from '../../lib/ep05kit';

// Ep05 8 — one decision scored: urgency × profit × dependency × availability.
// VO 0.8s (20.3s).
export const compositionConfig = { id: 'NScore', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const NScore: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // IT SCORES EVERYTHING" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130 }}>
        <Headline at={20} size={54}>Take one decision. A task arrives —</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={48} italic color={DL.sky}>and Hermes scores it.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <DecisionScore at={120} task="&ldquo;User can&rsquo;t log in&rdquo;" score={91}
          factors={[['Urgency', 95], ['Profit impact', 70], ['Others blocked', 88], ['Right agent free', 80]]} />
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [470, 492], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>The highest number goes first. No politics. No favorites. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>Just the math of what matters.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NScore;
