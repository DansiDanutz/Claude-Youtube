import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch7 · the human beat. VO flw21: machines optimize their node; seeing the
// whole board was Dan. The poker player, playing the long game.
export const compositionConfig = { id: 'ZHumanBeat', durationInSeconds: 22.5, fps: 30, width: 1920, height: 1080 };

const ZHumanBeat: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // THE HUMAN PART" />
      <div style={{ position: 'absolute', top: 190, left: 120, width: 1460 }}>
        <div style={{ ...rise(30), fontFamily: DL_SANS, fontSize: 38, color: DL.text, lineHeight: 1.5 }}>
          Machines optimize <span style={{ color: DL.gold, fontWeight: 600 }}>the node they're standing on.</span>
        </div>
        <div style={{ ...rise(200), fontFamily: DL_SANS, fontSize: 38, color: DL.text, marginTop: 30, lineHeight: 1.5 }}>
          Seeing the whole board — five products feeding each other instead of
          fighting for attention — <span style={{ color: DL.red, fontWeight: 600 }}>that was Dan.</span>
        </div>
        <div style={{ ...rise(430), marginTop: 64, display: 'flex', alignItems: 'baseline', gap: 30 }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 54, color: DL.warm }}>The poker player.</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>
            playing the long game with patience the machines don't have yet
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZHumanBeat;
