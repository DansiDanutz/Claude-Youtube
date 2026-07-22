import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';
export const compositionConfig = { id: 'NB1', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };
const NB1: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART ONE" title="What a Brain Does" />
  </AbsoluteFill>
);
export default NB1;
