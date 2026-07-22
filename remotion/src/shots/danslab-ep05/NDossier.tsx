import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 10b — the working model Hermes keeps on every agent. Not a personnel
// record: notes assembled from outcomes. VO 0.8s (24.7s).
export const compositionConfig = { id: 'NDossier', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const FILES: [string, string, string, string][] = [
  ['sienna.jpg', 'Sienna', DL.green, 'fast — but cuts corners on tests'],
  ['dexter.jpg', 'Dexter', DL.sky, 'slow, and has never shipped a bug'],
  ['memo.jpg', 'Memo', DL.gold, 'goes quiet when a task is too vague'],
  ['nano.png', 'Nano', DL.red, 'needs the goal spelled out, or invents one'],
];

const NDossier: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="LEARNING // THE FILE IT KEEPS" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>It keeps a file on <span style={{ color: DL.gold }}>every one of them.</span></Headline>
        <div style={{ marginTop: 10, fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>Not a personnel record — a working model.</div>
      </div>

      <div style={{ position: 'absolute', top: 350, left: '50%', transform: 'translateX(-50%)', width: 1280 }}>
        {FILES.map(([img, name, color, note], i) => {
          const at = 70 + i * 36;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 22], [-32, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={name} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 28, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '20px 32px', marginBottom: 18 }}>
              <Avatar src={staticFile(`projects/danslab-ep05/${img}`)} size={86} color={color} />
              <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color, width: 180 }}>{name}</span>
              <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 32, color: DL.text, flex: 1 }}>{note}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 330], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Nobody wrote those notes. Hermes assembled them — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>one outcome at a time.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NDossier;
