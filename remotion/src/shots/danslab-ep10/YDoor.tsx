import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImagePlate } from '../../lib/ep10kit';

// Ch2 open · the second brain. VO brain01 22.5. Port 18789 — one door every
// worker must call. The "it isn't allowed to" beat lands ~17s.
export const compositionConfig = { id: 'YDoor', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const YDoor: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE SECOND BRAIN" />
      <div style={{ position: 'absolute', top: 160, left: 120, width: 860 }}>
        <Headline at={10} size={50}>A second brain — <span style={{ color: DL.red }}>never on camera.</span></Headline>
        <div style={{ ...rise(200), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 28, lineHeight: 1.5 }}>
          When any worker needs to think, it does not call an AI provider.
        </div>
        <div style={{ ...rise(540), fontFamily: DL_SANS, fontSize: 34, color: DL.warm, marginTop: 26, lineHeight: 1.45 }}>
          It isn't <span style={{ color: DL.red, fontWeight: 600 }}>allowed</span> to. It calls this.
        </div>
        <div style={{ ...rise(620), fontFamily: DL_MONO, fontWeight: 700, fontSize: 58, color: DL.gold, marginTop: 40 }}>
          localhost:18789
        </div>
      </div>
      <div style={{ position: 'absolute', top: 240, right: 110 }}>
        <ImagePlate src={staticFile('projects/danslab-ep10/05-one-door.png')} at={60} w={820} h={460}
                    caption="one door · nineteen adapters" />
      </div>
    </AbsoluteFill>
  );
};
export default YDoor;
