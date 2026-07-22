import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ep09 9 — Kryptostack school. VO 0.8s (21.4s).
export const compositionConfig = { id: 'PKrypto', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const PKrypto: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE SCHOOLS // SCHOOL ONE" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Kryptostack — built <span style={{ color: DL.sky }}>the hard way.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 28 }}>
        <StatCard label="Users" big="10,000+" sub="real accounts, real money" color={DL.sky} at={90} w={400} />
        <StatCard label="Flow" big="crypto ⇄ fiat" sub="live exchange houses across Romania" color={DL.gold} at={120} w={430} />
        <StatCard label="Supervision" big="real" sub="regulators do not send warm-up emails" color={DL.red} at={150} w={400} />
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 408], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>The lesson: trust is not promised. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>Trust is engineered.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PKrypto;
