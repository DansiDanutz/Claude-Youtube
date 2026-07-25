import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { SpendLedger, Line } from '../../lib/ep10kit';

// Ch3 · the toolbox. VO plumb03 39.8. Seven lines, each landing on its name.
// Word timings measured against the read: Firecrawl ~1s, Perplexity ~9s, Kilo ~16s,
// Manus ~19s, ElevenLabs ~23s, misc ~33s.
export const compositionConfig = { id: 'YTools', durationInSeconds: 42, fps: 30, width: 1920, height: 1080 };

const LINES: Line[] = [
  { label: 'Firecrawl', note: 'how the company reads the internet', amount: 16, at: 40, color: DL.gold },
  { label: 'Perplexity', note: 'live answers with sources attached', amount: 20, at: 280, color: DL.gold },
  { label: 'Kilo', note: 'a coding lane', amount: 20, at: 490, color: DL.gold },
  { label: 'Manus', note: 'an autonomous task runner', amount: 39, at: 590, color: DL.gold },
  { label: 'ElevenLabs', note: 'this company can speak — wired at /v1/speech', amount: 22, at: 700, color: DL.gold },
  { label: 'Domains & misc', note: 'every company has it; nobody can explain it', amount: 15, at: 1010, color: DL.dim },
];

const YTools: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE TOOLS" />
      <div style={{ position: 'absolute', top: 130, left: 120, right: 120 }}>
        <div style={{
          fontFamily: DL_SANS, fontWeight: 600, fontSize: 44, color: DL.text,
          opacity: interpolate(f, [8, 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
        }}>
          The tools the workers reach for <span style={{ color: DL.gold }}>mid-shift.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 120, right: 120 }}>
        <SpendLedger lines={LINES} title="MONTHLY SPEND — TOOLS" />
      </div>
    </AbsoluteFill>
  );
};
export default YTools;
