import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { EquityCurve } from '../../lib/ep03kit';

// Ch4 · Sienna the demonstrator. VO flw15: she trades with the product's own
// data and shows results in real time — wins AND losses, on camera.
export const compositionConfig = { id: 'ZSienna', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const PTS = [0, 4, 2, 8, 6, 12, 10, 9, 15, 13, 19, 17, 24, 22, 28];

const ZSienna: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="11" label="THE FLYWHEEL // SIENNA" />
      <div style={{ position: 'absolute', top: 150, left: 120, width: 940 }}>
        <div style={{ ...rise(10), fontFamily: DL_SERIF, fontSize: 52, color: DL.text, lineHeight: 1.3 }}>
          The sales team is <span style={{ color: DL.gold, fontStyle: 'italic' }}>one agent.</span>
        </div>
        <div style={{ ...rise(140), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 30, lineHeight: 1.55 }}>
          Not ads. Demonstration. Sienna trades with the same data the product
          sells — and shows the results as they happen.
        </div>
        <div style={{ ...rise(330), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, marginTop: 40 }}>
          Wins <span style={{ color: DL.green }}>and</span> losses. <span style={{ color: DL.red }}>On camera.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 300, right: 130, ...rise(200) }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '26px 30px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 4, color: DL.faint, marginBottom: 14 }}>SIENNA · LIVE RESULTS</div>
          <div style={{ overflow: 'hidden', width: 620, height: 260 }}>
            <EquityCurve pts={PTS} at={220} w={620} h={260} color={DL.green} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default ZSienna;
