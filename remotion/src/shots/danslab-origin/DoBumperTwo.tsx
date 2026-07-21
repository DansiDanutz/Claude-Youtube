import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DlBumper } from '../../lib/danslab';

// Chapter bumper — Part Two: The Machine. Shared body in lib/danslab (DlBumper).
export const compositionConfig = { id: 'DoBumperTwo', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const DoBumperTwo: React.FC = () => (
  <AbsoluteFill>
    <DlBumper part="PART TWO" title="The Machine" />
  </AbsoluteFill>
);
export default DoBumperTwo;
