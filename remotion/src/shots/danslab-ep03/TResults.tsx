import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, StatCard } from '../../lib/ep03kit';

// Ep03 14 — does it work? 90 days, 50 trades, 84% win, +4.5%, dd <7. VO 0.8s (23.2s).
export const compositionConfig = { id: 'TResults', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const TResults: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="03" label="THE PROOF // 90 DAYS, REAL PRICES" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={60}>So does it actually work?</Headline>
        <div style={{ marginTop: 10 }}><Headline at={58} size={42} italic color={DL.warm}>Real Bitcoin, Ethereum and Solana. Ninety days. No cherry-picking.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap', maxWidth: 1560, margin: '0 auto' }}>
        <StatCard label="Trades" big="50" sub="active — daily off the score" color={DL.text} at={160} w={330} />
        <StatCard label="Win rate" big="84%" sub="42 of 50 green" color={DL.green} at={200} w={330} />
        <StatCard label="Return" big="+4.5%" sub="paper equity, mark-to-market" color={DL.green} at={240} w={330} />
        <StatCard label="Max drawdown" big="−7%" sub="worst peak-to-trough" color={DL.gold} at={280} w={360} />
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 445], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>And every trade is printed on her page, with the exact reason she took it. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>Just the real book.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TResults;
