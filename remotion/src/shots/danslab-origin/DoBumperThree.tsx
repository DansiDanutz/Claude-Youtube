import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DlBumper } from '../../lib/danslab';

// Chapter bumper — Part Three: The Proof. Shared body in lib/danslab (DlBumper).
export const compositionConfig = { id: 'DoBumperThree', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const DoBumperThree: React.FC = () => (
  <AbsoluteFill>
    <DlBumper part="PART THREE" title="The Proof" />
  </AbsoluteFill>
);
export default DoBumperThree;
