import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'OB2', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const OB2: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART TWO" title="The Overseer" />
  </AbsoluteFill>
);
export default OB2;
