import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MissionControl } from '../../lib/ep04kit';

// Ep04 5 — so he built the dashboard himself. It worked... for a day. VO 0.8s (10.5s).
export const compositionConfig = { id: 'ODashboard', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const ODashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const tagOp = interpolate(frame, [270, 292], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="ATTEMPT #1 // THE HAND-BUILT DASHBOARD" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={52}>So Dan did what a determined founder does.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={48} size={44} italic color={DL.sky}>He built the dashboard himself.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <MissionControl at={90} rowsAt={120} />
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: tagOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>And it worked... for about </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.text }}>a day.</span>
      </div>
    </AbsoluteFill>
  );
};
export default ODashboard;
