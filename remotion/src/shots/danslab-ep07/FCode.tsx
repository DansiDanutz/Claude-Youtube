import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { BigShot } from '../../lib/ep07kit';

// Ep07 15 — none of it is hidden: the public repo. VO 0.8s (12.6s).
export const compositionConfig = { id: 'FCode', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const FCode: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="07" label="THE OUTPUT // IN THE OPEN" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And none of it is hidden.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 250, left: '50%', transform: 'translateX(-50%)' }}>
        <BigShot src={staticFile('projects/danslab-ep07/repo.png')} at={60} w={1180} caption="github.com/DansiDanutz/Claude-Youtube" />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [250, 278], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Not a secret. Not magic. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.sky }}>Just a pipeline somebody bothered to build.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FCode;
