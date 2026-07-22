import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 6 — every agent has an edge; OpenClaw & Hermes made thousands. VO 0.8s (15.1s).
export const compositionConfig = { id: 'MEdge', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const AG = [['dexter.jpg', DL.green], ['memo.jpg', DL.sky], ['nano.png', DL.gold], ['sienna.jpg', DL.red]] as const;

const MEdge: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="THE TABLE FOR AGENTS // EVERY AGENT HAS AN EDGE" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={52}>Every AI agent holds an <span style={{ color: DL.gold }}>edge</span> — a skill nobody else has.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 54 }}>
        {AG.map(([f, c], i) => {
          const at = 130 + i * 16;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={f} style={{ opacity: op, transform: `translateY(${y}px)`, position: 'relative' }}>
              <Avatar src={staticFile(`projects/danslab-ep06/${f}`)} size={140} color={c} />
              <div style={{ position: 'absolute', bottom: -6, right: -10, width: 44, height: 60, borderRadius: 8, background: 'linear-gradient(160deg,#fff,#eee)', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.5)', transform: 'rotate(10deg)' }}>
                <span style={{ fontFamily: DL_SERIF, fontWeight: 700, fontSize: 22, color: '#c0392b' }}>A</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [280, 302], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>OpenClaw and Hermes made thousands of them — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.text }}>each holding a winning hand.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MEdge;
