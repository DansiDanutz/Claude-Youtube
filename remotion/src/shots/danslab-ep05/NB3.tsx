import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';
export const compositionConfig = { id: 'NB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };
const NB3: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART THREE" title="It Learns" />
  </AbsoluteFill>
);
export default NB3;
