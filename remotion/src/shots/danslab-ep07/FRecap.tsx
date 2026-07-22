import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { FilmStrip } from '../../lib/ep07kit';

// Ep07 1 — recap montage: every story had to be MADE. Real frames from all six
// episodes scroll past. VO 0.8s (26.0s).
export const compositionConfig = { id: 'FRecap', durationInSeconds: 32, fps: 30, width: 1920, height: 1080 };

const A = ['ep01a', 'ep02b', 'ep03a', 'ep04a', 'ep05a', 'ep06a'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));
const B = ['ep06b', 'ep05b', 'ep04b', 'ep03b', 'ep02a', 'ep01b'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));

const FRecap: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="PREVIOUSLY // SIX STORIES" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
        <Headline at={20} size={50}>You&rsquo;ve met the fleet, the trader, the overseer, the brain, the marketplace.</Headline>
      </div>

      {/* two strips of REAL frames, opposite directions */}
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0 }}>
        <FilmStrip items={A} at={60} h={230} speed={1.0} />
      </div>
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0 }}>
        <FilmStrip items={B} at={90} h={230} speed={-0.8} />
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', zIndex: 3, opacity: interpolate(frame, [520, 548], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>But every one of those stories had to be </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>made.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FRecap;
