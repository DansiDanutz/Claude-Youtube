import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL_SANS, DlBumper } from '../../lib/danslab';

// Chapter bumper — PART ONE // THE AGENT. No VO (SFX carries).
export const compositionConfig = { id: 'TB1', durationInSeconds: 8, fps: 30, width: 1920, height: 1080 };

const TB1: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <DlBumper part="PART ONE" title="The Agent" />
  </AbsoluteFill>
);
export default TB1;
