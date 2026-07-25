import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ch1 close · the org chart built in hardware. VO iron08 5.3 / iron09 27.7.
export const compositionConfig = { id: 'YWhyFour', durationInSeconds: 34, fps: 30, width: 1920, height: 1080 };

const YWhyFour: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.gold} />
    <Kicker n="10" label="THE PAYROLL // WHY FOUR" />
    <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
      <Headline at={12} size={56}>Because these aren't servers.</Headline>
      <div style={{ marginTop: 18 }}>
        <Headline at={150} size={72} color={DL.gold}>They're people.</Headline>
      </div>
    </div>
    <div style={{ position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
      <StatCard label="Own name" big="4" sub="dexter · memo · sienna · nano" color={DL.text} at={230} w={360} />
      <StatCard label="Own memory file" big="4" sub="nothing shared, nothing pooled" color={DL.sky} at={270} w={360} />
      <StatCard label="Own job description" big="4" sub="a lane each, written down" color={DL.gold} at={310} w={360} />
      <StatCard label="Daily quota" big="10" sub="closed tickets, per agent, per day" color={DL.green} at={350} w={380} />
    </div>
    <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center' }}>
      <Headline at={640} size={44} italic>That's not infrastructure. That's an org chart, built in hardware.</Headline>
    </div>
  </AbsoluteFill>
);
export default YWhyFour;
