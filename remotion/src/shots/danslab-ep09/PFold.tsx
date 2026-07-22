import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 7 — folding. VO 0.8s (13.3s).
export const compositionConfig = { id: 'PFold', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const PFold: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE TABLE // THE THIRD LAW" />

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 200px', textAlign: 'center' }}>
        <div>
          <Headline at={16} size={62}>Most hands, <span style={{ color: DL.red }}>you fold.</span></Headline>
          <div style={{ marginTop: 30, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.45, opacity: interpolate(frame, [86, 110], [0, 1], DCLAMP) }}>The amateurs play everything. The professionals are measured by what they refuse to play.</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 326], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>Remember that one.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PFold;
