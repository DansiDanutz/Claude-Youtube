import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

// Chapter bumper — PART THREE // THE PROOF. No VO.
export const compositionConfig = { id: 'TB3', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const TB3: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART THREE" title="The Proof" />
  </AbsoluteFill>
);
export default TB3;
