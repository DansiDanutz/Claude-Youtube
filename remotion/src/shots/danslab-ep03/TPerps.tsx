import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 4 — perps, not spot: long AND short, with leverage. VO 0.8s (20.0s).
export const compositionConfig = { id: 'TPerps', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const Side: React.FC<{ dir: 'LONG' | 'SHORT'; at: number }> = ({ dir, at }) => {
  const frame = useCurrentFrame();
  const long = dir === 'LONG';
  const col = long ? DL.green : DL.red;
  const op = interpolate(frame, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const y = interpolate(frame, [at, at + 18], [long ? 30 : -30, 0], { ...DCLAMP, easing: DL_EASE.out });
  const Icon = long ? TrendingUp : TrendingDown;
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: 460, background: DL.panel, border: `1px solid ${col}55`, borderRadius: 20, padding: '34px 40px', boxShadow: `0 0 60px ${col}18` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Icon size={44} color={col} />
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: col }}>{dir}</span>
      </div>
      <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginTop: 16 }}>{long ? 'She profits when price rises.' : 'She profits when price falls.'}</div>
    </div>
  );
};

const TPerps: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE MARKET // PERPETUAL FUTURES" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130 }}>
        <Headline at={20} size={60}>She is not buying and holding.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={60} size={60} italic color={DL.warm}>She trades <span style={{ color: DL.gold }}>perpetual futures</span> — with leverage.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60 }}>
        <Side dir="LONG" at={150} />
        <Side dir="SHORT" at={185} />
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [380, 400], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>The fast lane — where most people get wiped out. So how does she decide </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.text }}>anything?</span>
      </div>
    </AbsoluteFill>
  );
};
export default TPerps;
