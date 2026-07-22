import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 18 — Paperclip organizes, Hermes thinks, agents work → it improves itself.
// Closer to alive. VO 0.8s (18.1s).
export const compositionConfig = { id: 'NResult', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const LAYERS = [
  { t: 'PAPERCLIP', s: 'keeps it organized', c: DL.gold },
  { t: 'HERMES', s: 'keeps it smart', c: DL.sky },
  { t: 'THE AGENTS', s: 'do the work', c: DL.green },
];

const NResult: React.FC = () => {
  const frame = useCurrentFrame();
  const aliveOp = interpolate(frame, [340, 366], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const aliveScale = interpolate(frame, [340, 372], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="THE RESULT // IT IMPROVES ITSELF" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={52}>Put it together, and something remarkable happens.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {LAYERS.map((l, i) => {
          const at = 120 + i * 26;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={l.t} style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${l.c}44`, borderRadius: 14, padding: '18px 40px', width: 640 }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: l.c, width: 220 }}>{l.t}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 30, color: DL.text }}>{l.s}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: aliveOp, transform: `scale(${aliveScale})` }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>It improves itself, while everyone sleeps. Not a tool anymore — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.sky }}>something closer to alive.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NResult;
