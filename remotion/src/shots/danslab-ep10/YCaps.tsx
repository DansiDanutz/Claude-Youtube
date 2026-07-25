import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SANS, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ch2 close · the caps. VO brain09 9.9 / brain10 19.1.
export const compositionConfig = { id: 'YCaps', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const YCaps: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.red} />
    <Kicker n="10" label="THE PAYROLL // THE CAGE" />
    <div style={{ position: 'absolute', top: 160, left: 120, right: 120 }}>
      <Headline at={10} size={50}>Tier two is wired in — and <span style={{ color: DL.red }}>caged.</span></Headline>
    </div>
    <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
      <StatCard label="Soft cap" big="$2" sub="per day, fleet-wide" color={DL.gold} at={300} w={340} />
      <StatCard label="Hard cap" big="$5" sub="per day, absolute" color={DL.red} at={340} w={340} />
      <StatCard label="Per agent" big="$1" sub="none of the 76 can exceed it" color={DL.sky} at={380} w={380} />
    </div>
    <div style={{ position: 'absolute', bottom: 160, left: 0, right: 0, textAlign: 'center' }}>
      <Headline at={470} size={42} italic>
        The spending limit lives in the nervous system — not a policy document nobody reads.
      </Headline>
    </div>
  </AbsoluteFill>
);
export default YCaps;
