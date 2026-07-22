import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { DayTimeline } from '../../lib/ep08kit';

// Ep08 8 — the watching never stops: the desk's real day. VO 0.8s (20.5s).
export const compositionConfig = { id: 'StWatch', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const StWatch: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="08" label="THE RIGHT HAND // THE CLOCK" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The watching <span style={{ color: DL.red }}>never stops.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 380, left: '50%', transform: 'translateX(-50%)' }}>
        <DayTimeline at={70} w={1560} />
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 450], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Thirty-eight scheduled jobs in a single day. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>The desk never truly sleeps.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StWatch;
