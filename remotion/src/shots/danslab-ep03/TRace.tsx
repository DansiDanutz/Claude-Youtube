import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker, RosterCard } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 18 — Sienna in the fleet leaderboard; profit is the target. VO 0.8s (21.1s).
export const compositionConfig = { id: 'TRace', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const BOARD = [
  { src: 'sienna.jpg', role: 'Sienna · Trader', value: '+4.5%', at: 160, hot: true },
  { src: 'dexter.jpg', role: 'Dexter · Pipeline', value: 'shipping', at: 190, hot: false },
  { src: 'memo.jpg', role: 'Memo · Framework', value: 'building', at: 220, hot: false },
  { src: 'nano.png', role: 'Nano · Nervix', value: 'live', at: 250, hot: false },
];

const TRace: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE FLEET // THE LEADERBOARD" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={56}>Sienna is not alone. She is one of four —</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={56} italic color={DL.gold}>all pointed at the same target: <span style={{ color: DL.green }}>profit.</span></Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34 }}>
        {BOARD.map((b) => (
          <RosterCard key={b.role} src={staticFile(`projects/danslab-ep03/${b.src}`)} role={b.role} value={b.value} at={b.at} hot={b.hot} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [400, 420], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Every day they audit each other, and score each other. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>Her job is to earn her spot on the board.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TRace;
