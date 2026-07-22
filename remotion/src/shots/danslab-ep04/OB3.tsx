import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'OB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const OB3: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART THREE" title="The Brain" />
  </AbsoluteFill>
);
export default OB3;
