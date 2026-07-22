import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 31b — the stake. VO 0.8s (22.1s).
export const compositionConfig = { id: 'PStake', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const PStake: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE PLAYER // WHAT HE PLAYS FOR" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={16} size={62}>The stake is <span style={{ color: DL.gold }}>time.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [86, 110], [0, 1], DCLAMP) }}>Not an exit. Not a headline. Briefings instead of alarms — machines that improve while he sleeps — a company that runs so he can leave the room.</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [460, 486], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>He is playing to buy back his own hours. And he is winning them.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PStake;
