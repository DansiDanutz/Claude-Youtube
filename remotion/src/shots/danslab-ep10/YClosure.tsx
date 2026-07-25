import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch4 · the orchestrator thesis. VO pay12 8.3. "Agents without an orchestrator
// produce activity. With one, they produce closure."
export const compositionConfig = { id: 'YClosure', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const YClosure: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // WHY IT ISN'T A TOY" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(60), fontFamily: DL_SERIF, fontSize: 62, color: DL.text, lineHeight: 1.35, maxWidth: 1440 }}>
          Agents without an orchestrator produce <span style={{ color: DL.red, fontStyle: 'italic' }}>activity.</span>
        </div>
        <div style={{ ...rise(170), fontFamily: DL_SERIF, fontSize: 62, color: DL.text, lineHeight: 1.35, marginTop: 28 }}>
          With one, they produce <span style={{ color: DL.gold, fontStyle: 'italic' }}>closure.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YClosure;
