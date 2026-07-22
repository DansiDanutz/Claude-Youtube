import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 14 — it watches every outcome. Never forgets, never takes it personally.
// VO 0.8s (18.3s).
export const compositionConfig = { id: 'NWatch', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const OUTCOMES = [
  { t: 'Trade closed +4%', win: true }, { t: 'Feature shipped', win: true },
  { t: 'User churned', win: false }, { t: 'Build failed', win: false }, { t: 'User delighted', win: true },
];

const NWatch: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="IT LEARNS // EVERY OUTCOME FLOWS BACK" />

      <div style={{ position: 'absolute', top: 160, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={52}>Then it watches. Did it work?</Headline>
      </div>

      {/* Hermes center, outcomes flowing in */}
      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <HermesLogo size={150} start={60} />
      </div>
      <div style={{ position: 'absolute', top: 400, left: 0, right: 0 }}>
        {OUTCOMES.map((o, i) => {
          const at = 120 + i * 22;
          const t = interpolate(frame, [at, at + 40], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
          const startX = i % 2 ? 1620 : 300;
          const x = startX + (960 - startX) * t;
          const y = 250 + (i - 2) * 20 + t * (240 - (i - 2) * 20);
          const op = interpolate(frame, [at, at + 12], [0, 1], DCLAMP) * interpolate(t, [0.8, 1], [1, 0.2], DCLAMP);
          const col = o.win ? DL.green : DL.red;
          return (
            <div key={i} style={{ position: 'absolute', left: x, top: y, opacity: op, fontFamily: DL_MONO, fontSize: 22, color: col, border: `1px solid ${col}66`, borderRadius: 999, padding: '8px 18px', background: DL.panel, transform: 'translate(-50%,-50%)' }}>{o.win ? '▲' : '▼'} {o.t}</div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 362], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Every win, every loss. It never forgets one — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>and never takes it personally.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NWatch;
