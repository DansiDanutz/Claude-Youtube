import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 12 — numbers on the ground floor. Live stats from danslab.vercel.app
// (30+ agents, 38 crons today, five machines) + the episode count. VO 0.8s (15.2s).
export const compositionConfig = { id: 'StNumbers', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const STATS: [number, string, string, string][] = [
  [30, '+', 'AGENTS', DL.sky],
  [5, '', 'MACHINES', DL.gold],
  [38, '', 'JOBS TODAY', DL.green],
  [7, '', 'FILMS', DL.red],
  [1, '', 'HUMAN', DL.warm],
];

const StNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE WATCH // THE GROUND FLOOR, COUNTED" />

      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Numbers on the ground floor.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {STATS.map(([target, suffix, label, color], i) => {
          const a = 60 + i * 24;
          const op = interpolate(frame, [a, a + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 22], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          const val = Math.round(interpolate(frame, [a + 6, a + 56], [0, target], { ...DCLAMP, easing: DL_EASE.out }));
          return (
            <div key={label} style={{ opacity: op, transform: `translateY(${y}px)`, width: 300, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '36px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 88, color, lineHeight: 1 }}>{val}{suffix}</div>
              <div style={{ marginTop: 14, fontFamily: DL_SANS, fontSize: 21, letterSpacing: 3, color: DL.faint }}>{label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default StNumbers;
