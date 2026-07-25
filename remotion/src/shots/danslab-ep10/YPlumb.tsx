import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { SpendLedger, Line } from '../../lib/ep10kit';

// Ch3 open · the plumbing. VO plumb01 13.0 + plumb02 2.3. Supabase on "memory"
// ~2.5s in, Vercel on "front door" ~9s.
export const compositionConfig = { id: 'YPlumb', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const LINES: Line[] = [
  { label: 'Supabase', note: "the company's memory — everything that happened, written down", amount: 25, at: 90, color: DL.gold },
  { label: 'Vercel', note: 'the front door — anything customer-facing ships here', amount: 20, at: 280, color: DL.gold },
];

const YPlumb: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE PLUMBING" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={52}>Under the brain, <span style={{ color: DL.gold }}>the plumbing.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 310, left: 120, right: 120 }}>
        <SpendLedger lines={LINES} title="MONTHLY SPEND — PLUMBING" />
      </div>
      <div style={{
        position: 'absolute', bottom: 110, left: 120, fontFamily: DL_SANS, fontSize: 30, color: DL.dim,
        opacity: interpolate(f, [400, 418], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
      }}>
        Then the tools the workers reach for mid-shift →
      </div>
    </AbsoluteFill>
  );
};
export default YPlumb;
