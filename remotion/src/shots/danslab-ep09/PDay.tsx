import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { DayTimeline } from '../../lib/ep08kit';

// Ep09 27 — the measured day. VO 0.8s (18.1s).
export const compositionConfig = { id: 'PDay', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const PDay: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE METHOD // A DAY, MEASURED" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>He wakes up to a report — <span style={{ color: DL.sky }}>not to chaos.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: '50%', transform: 'translateX(-50%)' }}>
        <DayTimeline at={60} w={1560} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 408], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Approvals leave the phone in one word. That is the whole management layer.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PDay;
