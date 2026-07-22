import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MacStudioBox } from '../../lib/ep08kit';

// Ep08 14 — while you watched, the wheel kept turning. VO 0.8s (15.7s).
export const compositionConfig = { id: 'StNight', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const TICKS: [string, string][] = [
  ['a trade closed', DL.green],
  ['a task settled on Nervix', DL.gold],
  ['tomorrow\u2019s brief — drafting', DL.sky],
];

const StNight: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow="#0c1018" />
      <Kicker n="08" label="THE WATCH // WHILE YOU WATCHED" />

      <div style={{ position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The wheel kept turning.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 430, left: '50%', transform: 'translateX(-50%)' }}>
        <MacStudioBox at={50} w={480} glow={DL.sky} label="" />
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {TICKS.map(([msg, color], i) => {
          const at = 120 + i * 60;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          return (
            <div key={msg} style={{ position: 'relative', top: -40 - (i % 2) * 50, opacity: op, fontFamily: DL_MONO, fontSize: 22, color, background: DL.panel, border: `1px solid ${color}44`, borderRadius: 999, padding: '10px 24px' }}>{msg}</div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [330, 360], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 64, color: DL.gold }}>07:00</div>
        <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>The Studio will be awake before Dan is.</div>
      </div>
    </AbsoluteFill>
  );
};
export default StNight;
