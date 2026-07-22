import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, LadderStep } from '../../lib/ep03kit';

// Ep03 8 — the entry: open small, $100 at 20×. The genius is what comes next.
// VO 0.8s (19.4s).
export const compositionConfig = { id: 'TEntry', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const TEntry: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE METHOD // THE ENTRY" />

      <div style={{ position: 'absolute', top: 210, left: 130, right: 130 }}>
        <Headline at={20} size={58}>Score clears. Risk is low. Clusters line up.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={62} size={58} italic color={DL.warm}>What does she do? <span style={{ color: DL.gold }}>Almost nothing.</span></Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <LadderStep margin="$100" lev="20×" note="a tiny first bet — with the reserve held back" at={170} active color={DL.gold} />
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [360, 384], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>The genius isn&rsquo;t the entry.</span>
        <div style={{ marginTop: 8 }}><span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>It&rsquo;s what she does when the trade goes against her.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default TEntry;
