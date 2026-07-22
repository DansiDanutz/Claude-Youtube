import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

// Chapter bumper — PART TWO // THE METHOD. No VO.
export const compositionConfig = { id: 'TB2', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const TB2: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART TWO" title="The Method" />
  </AbsoluteFill>
);
export default TB2;
