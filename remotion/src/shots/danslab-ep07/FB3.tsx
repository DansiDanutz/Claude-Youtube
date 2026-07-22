import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';
export const compositionConfig = { id: 'FB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };
const FB3: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART THREE" title="The Output" />
  </AbsoluteFill>
);
export default FB3;
