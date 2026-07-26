import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SANS, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { SpendLedger, Line } from '../../lib/ep10kit';

// Ep10 — the subscriptions land one at a time and the total climbs to meet them.
// `at` frames are set from the measured narration: each chip arrives on the word.
export const compositionConfig = { id: 'YSubs', durationInSeconds: 34, fps: 30, width: 1920, height: 1080 };

const LINES: Line[] = [
  { label: 'Anthropic Max ×2', note: 'two logins — when one rate-limits, the second is warm', amount: 400, at: 60, color: DL.red },
  { label: 'ChatGPT Pro', note: 'codex proxy on :8995', amount: 200, at: 210, color: DL.red },
  { label: 'z.ai GLM', note: 'a full year bought up front', amount: 30, at: 380, color: DL.gold },
  { label: 'Kimi — Alegro plan', note: 'Kimi 3 · Moonshot Pro', amount: 20, at: 470, color: DL.gold },
];

const YSubs: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.gold} />
    <Kicker n="10" label="THE PAYROLL // TIER ONE" />

    <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
      <Headline at={10} size={54}>Tier one is the <span style={{ color: DL.gold }}>subscriptions.</span></Headline>
    </div>

    <div style={{ position: 'absolute', top: 300, left: 120, right: 120 }}>
      <SpendLedger lines={LINES} title="MONTHLY SPEND — SUBSCRIPTIONS" />
    </div>
  </AbsoluteFill>
);
export default YSubs;
