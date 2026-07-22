import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 13 — the numbers off the line. VO 0.8s (16.5s).
export const compositionConfig = { id: 'FNumbers', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const STATS: [number, string, string, string][] = [
  [7, '', 'EPISODES', DL.red],
  [150, '+', 'SCENES', DL.gold],
  [55, ' min', 'FINISHED FILM', DL.green],
  [100, '%', 'IN 4K', DL.sky],
];

const FNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE OUTPUT // THE NUMBERS" />

      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>What the machine actually produced.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30 }}>
        {STATS.map(([target, suffix, label, color], i) => {
          const a = 70 + i * 26;
          const op = interpolate(frame, [a, a + 18], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 22], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          const val = Math.round(interpolate(frame, [a + 6, a + 62], [0, target], { ...DCLAMP, easing: DL_EASE.out }));
          return (
            <div key={label} style={{ opacity: op, transform: `translateY(${y}px)`, width: 380, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '38px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 84, color, lineHeight: 1 }}>{val}{suffix}</div>
              <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: DL.faint }}>{label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 140, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 358], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Every voice generated. Every cue placed. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>Built in days.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FNumbers;
