import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageBackdrop, SpendLedger, Line } from '../../lib/ep10kit';

// Ch1 · the four droplets. VO iron06 12.7 / iron07 13.9. The room is a ground;
// the four machines land as ledger lines as Brian names their sizes.
export const compositionConfig = { id: 'YFrankfurt', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const LINES: Line[] = [
  { label: 'dexter · 8 GB', note: 'senior backend + devops', amount: 48, at: 150 },
  { label: 'memo · 16 GB', note: 'automation engine eats memory', amount: 96, at: 210, color: DL.red },
  { label: 'sienna · 8 GB', note: 'crypto dev + QA', amount: 48, at: 262 },
  { label: 'nano · 8 GB', note: 'platform / agent eng', amount: 48, at: 306 },
];

const YFrankfurt: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <div style={{ opacity: interpolate(f, [0, 40], [0, 0.5], DCLAMP) }}>
        <ImageBackdrop src={staticFile('projects/danslab-ep10/03-frankfurt.png')} dim={0.86} />
      </div>
      <Kicker n="10" label="THE PAYROLL // FRANKFURT" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={10} size={52}>Not one big server. <span style={{ color: DL.sky }}>Four.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 296, left: 120, right: 120 }}>
        <SpendLedger lines={LINES} title="FRANKFURT · DIGITALOCEAN" />
      </div>
    </AbsoluteFill>
  );
};
export default YFrankfurt;
