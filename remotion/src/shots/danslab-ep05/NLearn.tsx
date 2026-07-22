import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 15 — every result teaches it. It builds a living model of the fleet.
// VO 0.8s (20.3s).
export const compositionConfig = { id: 'NLearn', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const NOTES = [
  'Dexter is faster than I assumed.',
  'This kind of task always runs late.',
  'This instruction keeps failing.',
  'Sienna needs a shorter leash on Fridays.',
];

const NLearn: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="IT LEARNS // A LIVING MODEL OF THE TEAM" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={54}>Because every result <span style={{ color: DL.sky }}>teaches it something.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {NOTES.map((n, i) => {
          const at = 130 + i * 34;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 18], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
          const typed = Math.min(n.length, Math.max(0, Math.floor((frame - at) * 0.9)));
          return (
            <div key={n} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 14, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '16px 26px', width: 900 }}>
              <span style={{ color: DL.sky, fontFamily: DL_MONO, fontSize: 22 }}>note ›</span>
              <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.text }}>{n.slice(0, typed)}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [470, 492], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.dim }}>A living model of its own team — that gets </span>
        <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.sky }}>sharper every single day.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NLearn;
