import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MacStudioBox } from '../../lib/ep08kit';

// Ep08 2 — the Mac Studio itself. VO 0.8s (14.7s).
export const compositionConfig = { id: 'StDesk', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const StDesk: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE DESK // GROUND FLOOR" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>One quiet box of aluminium.</Headline>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.faint }}>CLUJ-NAPOCA · ROMANIA</div>
      </div>

      <div style={{ position: 'absolute', top: 400, left: '50%', transform: 'translateX(-50%)' }}>
        <MacStudioBox at={70} w={640} label="HEADQUARTERS OF EVERYTHING YOU HAVE WATCHED" />
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 328], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>It does not look like headquarters. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>It is.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StDesk;
