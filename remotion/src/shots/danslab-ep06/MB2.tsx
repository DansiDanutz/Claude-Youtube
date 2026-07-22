import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';
export const compositionConfig = { id: 'MB2', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };
const MB2: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART TWO" title="The Table for Agents" />
  </AbsoluteFill>
);
export default MB2;
