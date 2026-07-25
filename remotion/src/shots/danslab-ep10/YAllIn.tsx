import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { VersusRow } from '../../lib/ep10kit';

// Ch7 · the all-in totals. VO vs05 10.4. Human total ~2s, per-year ~5s,
// DansLab ~8s.
export const compositionConfig = { id: 'YAllIn', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const YAllIn: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // ALL IN" />
      <div style={{ position: 'absolute', top: 260, left: 120, right: 120 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '620px 380px 380px', gap: 40, padding: '0 0 14px',
          fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint,
          opacity: interpolate(f, [20, 36], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
        }}>
          <div>ALL IN, PER MONTH</div>
          <div style={{ textAlign: 'right' }}>HUMAN CO.</div>
          <div style={{ textAlign: 'right' }}>DANSLAB</div>
        </div>
        <VersusRow label="Everything counted" human="$120,700" danslab="$1,242" at={60} big />
        <VersusRow label="Per year" human="$1.4M" danslab="$14,904" at={160} />
      </div>
    </AbsoluteFill>
  );
};
export default YAllIn;
