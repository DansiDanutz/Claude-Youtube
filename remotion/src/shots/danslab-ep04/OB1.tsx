import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

export const compositionConfig = { id: 'OB1', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const OB1: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART ONE" title="The Blind CEO" />
  </AbsoluteFill>
);
export default OB1;
