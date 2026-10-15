import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Chip, Note, useRise, DL, DL_MONO, DL_SERIF, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH3 · why stablecoins. VO dol13. SCHEMATIC lines (labelled as such) — no real price data is shown:
// a jagged "volatile crypto" line vs a flat "1 USDC = $1" line.
export const compositionConfig = { id: 'WStable', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const JAG = Array.from({ length: 40 }, (_, i) => {
  const x = (i / 39) * 1100;
  const y = 170 + Math.sin(i * 0.9) * 70 + Math.sin(i * 2.3) * 45 + (i % 7 === 3 ? -90 : 0) + (i % 11 === 5 ? 110 : 0);
  return `${i ? 'L' : 'M'}${x.toFixed(0)},${y.toFixed(0)}`;
}).join(' ');

const WStable: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const jag = interpolate(f, [at('dol13', 'doubles'), at('dol13', 'friday') + 10], [0, 1], DCLAMP);
  const flat = interpolate(f, [at('dol13', 'stable'), at('dol13', 'stable') + 30], [0, 1], DCLAMP);
  const dim = interpolate(f, [at('dol13', 'stable'), at('dol13', 'stable') + 20], [1, 0.3], DCLAMP);
  return (
    <Stage label="WHY STABLECOINS">
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={voAt('dol13')}>Now — <span style={{ color: DL.gold, fontStyle: 'italic' }}>why crypto?</span></Title>
      </div>
      <svg width="1200" height="420" viewBox="0 0 1200 420" style={{ position: 'absolute', top: 290, left: 120 }}>
        <path d={JAG} fill="none" stroke={DL.red} strokeWidth="5" strokeLinejoin="round" pathLength={1}
          strokeDasharray="1" strokeDashoffset={1 - jag} opacity={dim} />
        <path d="M0,330 L1100,330" fill="none" stroke={DL.gold} strokeWidth="7" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - flat} />
        <text x="0" y="40" fill={DL.red} opacity={jag * dim} fontFamily={DL_MONO} fontSize="26">volatile crypto · doubles Monday, halves Friday</text>
        <text x="0" y="390" fill={DL.gold} opacity={flat} fontFamily={DL_MONO} fontSize="28">1 USDC = $1 · today · tomorrow · next year</text>
      </svg>
      <div style={{ position: 'absolute', top: 310, left: 1420, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'flex-start' }}>
        <Chip at={at('dol13', 'usdc')} solid>USDC</Chip>
        <Chip at={at('dol13', 'usdt')} solid>USDT</Chip>
        <div style={{ ...rise(at('dol13', 'one')), fontFamily: DL_SERIF, fontSize: 52, color: DL.text, marginTop: 10 }}>1 coin = 1 dollar</div>
        <div style={{ ...rise(at('dol13', 'bet')), fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>not a bet</div>
      </div>
      <div style={{ position: 'absolute', top: 730, left: 120, fontFamily: DL_MONO, fontSize: 20, color: DL.faint, ...rise(at('dol13', 'doubles')) }}>schematic · not price data</div>
      <Note at={at('dol13', 'email')}>A dollar that moves <span style={{ color: DL.gold }}>like an email.</span></Note>
    </Stage>
  );
};
export default WStable;
