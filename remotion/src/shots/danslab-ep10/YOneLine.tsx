import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DCLAMP, SiteBg } from '../../lib/danslab';

// Ch6 · the one line. VO audit10 3.6. Held, nothing else on screen.
export const compositionConfig = { id: 'YOneLine', durationInSeconds: 6, fps: 30, width: 1920, height: 1080 };

const YOneLine: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 76, color: DL.text, opacity: interpolate(f, [10, 28], [0, 1], DCLAMP) }}>
          Closures to <span style={{ color: DL.red, fontStyle: 'italic' }}>zero.</span>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 76, color: DL.text, marginTop: 20, opacity: interpolate(f, [55, 75], [0, 1], DCLAMP) }}>
          Every light still <span style={{ color: DL.green, fontStyle: 'italic' }}>green.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YOneLine;
