import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DCLAMP, Kicker } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Ch8 open. VO why01 7.3. "You already know. You watched nine episodes of it."
export const compositionConfig = { id: 'YWhy', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const YWhy: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <ImageBackdrop src={staticFile('projects/danslab-ep10/07-the-room.png')} dim={0.78} />
      <Kicker n="10" label="THE PAYROLL // WHY" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.text, lineHeight: 1.35, maxWidth: 1480, opacity: interpolate(f, [15, 35], [0, 1], DCLAMP) }}>
          Why pay $1,242 a month to run a company with <span style={{ color: DL.gold, fontStyle: 'italic' }}>no employees?</span>
        </div>
        <div style={{ fontFamily: DL_SANS, fontSize: 34, color: DL.dim, marginTop: 40, opacity: interpolate(f, [130, 150], [0, 1], DCLAMP) }}>
          You already know. You watched nine episodes of it.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YWhy;
