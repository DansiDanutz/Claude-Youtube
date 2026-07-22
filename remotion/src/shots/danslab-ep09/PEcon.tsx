import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ep09 26 — the economics. VO 0.8s (23.2s).
export const compositionConfig = { id: 'PEcon', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const PEcon: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="09" label="THE METHOD // THE PUNCHLINE" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The numbers are <span style={{ color: DL.green }}>the punchline.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 24 }}>
        <StatCard label="Machines" big="5 + 1" sub="five droplets, one Mac Studio" color={DL.sky} at={80} w={340} />
        <StatCard label="Named agents" big="31" sub="every one accountable" color={DL.gold} at={115} w={340} />
        <StatCard label="Monthly opex" big="€ 100s" sub="low hundreds — a family phone plan" color={DL.green} at={150} w={380} />
        <StatCard label="Output" big="≈ 15" sub="the shipping rate of a 15-person org" color={DL.red} at={185} w={360} />
      </div>

      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 368], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>five live products · two trading venues · a federation registry · a film series</span>
      </div>
    </AbsoluteFill>
  );
};
export default PEcon;
