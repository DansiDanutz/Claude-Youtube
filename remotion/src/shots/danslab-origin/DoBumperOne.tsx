import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DlBumper } from '../../lib/danslab';

// Chapter bumper — Part One: The Human. Shared body in lib/danslab (DlBumper).
export const compositionConfig = { id: 'DoBumperOne', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const DoBumperOne: React.FC = () => (
  <AbsoluteFill>
    <DlBumper part="PART ONE" title="The Human" />
  </AbsoluteFill>
);
export default DoBumperOne;
