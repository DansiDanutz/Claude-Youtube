import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { SpendLedger, Line } from '../../lib/ep10kit';

// Ch7 · the overhead ledger. VO vs03 18.9 + vs04 8.5. Six lines land on their
// words; the $10,749 total is the punch, then the 9× comparison ~22s.
export const compositionConfig = { id: 'YOverhead', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const LINES: Line[] = [
  { label: 'Office', amount: 2800, at: 30, color: DL.red },
  { label: 'Software seats', amount: 960, at: 110, color: DL.red },
  { label: 'Laptops', amount: 556, at: 180, color: DL.red },
  { label: 'Accounting', amount: 900, at: 250, color: DL.red },
  { label: 'Recruitment', amount: 4333, at: 320, color: DL.red },
  { label: 'Management & HR', amount: 1200, at: 400, color: DL.red },
];

const YOverhead: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // OVERHEAD" />
      <div style={{ position: 'absolute', top: 130, left: 120, right: 120 }}>
        <SpendLedger lines={LINES} title="THE HUMAN COMPANY — BEFORE A SINGLE SALARY" />
      </div>
      <div style={{
        position: 'absolute', bottom: 90, left: 120, right: 120,
        opacity: interpolate(f, [640, 664], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
      }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm, lineHeight: 1.4 }}>
          The overhead alone — the part nobody puts in the pitch deck — is nearly
          <span style={{ color: DL.red }}> nine times</span> what the entire other company costs to run.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YOverhead;
