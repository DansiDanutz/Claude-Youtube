import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch6 open. VO audit01 9.5. "Well architected — or an expensive magic trick?"
export const compositionConfig = { id: 'YAuditOpen', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const YAuditOpen: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // CH.6 — THE AUDIT" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(60), fontFamily: DL_SERIF, fontSize: 66, color: DL.text, lineHeight: 1.3, maxWidth: 1500 }}>
          Well architected — or an expensive <span style={{ color: DL.red, fontStyle: 'italic' }}>magic trick?</span>
        </div>
        <div style={{ ...rise(220), fontFamily: DL_SANS, fontSize: 32, color: DL.dim, marginTop: 40 }}>
          I read the system. Here's the honest audit.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YAuditOpen;
