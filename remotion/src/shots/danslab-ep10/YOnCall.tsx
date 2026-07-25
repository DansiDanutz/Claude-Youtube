import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch4 · the honest on-call beat. VO pay10 12.9. You can't staff 24/7 with one
// human — you need four or five rotating. Doctor does not rotate.
export const compositionConfig = { id: 'YOnCall', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const YOnCall: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE HONEST VERSION" />
      <div style={{ position: 'absolute', top: 220, left: 120, width: 1440 }}>
        <div style={{ ...rise(20), fontFamily: DL_SANS, fontSize: 40, color: DL.text, lineHeight: 1.45 }}>
          You cannot staff 24/7 on-call with one human. You need
          <span style={{ color: DL.red, fontWeight: 600 }}> four or five rotating</span> —
          or you destroy the one you have.
        </div>
        <div style={{ ...rise(250), marginTop: 70, display: 'flex', alignItems: 'baseline', gap: 30 }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 120, color: DL.gold, letterSpacing: -3 }}>$0.28/h</span>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>
            — and Doctor does not rotate.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YOnCall;
