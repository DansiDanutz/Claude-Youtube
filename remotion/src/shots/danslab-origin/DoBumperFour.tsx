import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DlBumper } from '../../lib/danslab';

// Chapter bumper — Part Four: The Why. Shared body in lib/danslab (DlBumper).
export const compositionConfig = { id: 'DoBumperFour', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const DoBumperFour: React.FC = () => (
  <AbsoluteFill>
    <DlBumper part="PART FOUR" title="The Why" />
  </AbsoluteFill>
);
export default DoBumperFour;
