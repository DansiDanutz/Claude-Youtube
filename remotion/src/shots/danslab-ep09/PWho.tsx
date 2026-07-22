import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 29 — who is the player. VO 0.8s (21.7s).
export const compositionConfig = { id: 'PWho', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const PWho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="09" label="THE PLAYER // STRIPPED DOWN" />

      <div style={{ position: 'absolute', top: 280, left: 190, textAlign: 'center', opacity: interpolate(frame, [40, 66], [0, 1], DCLAMP) }}>
        <Avatar src={staticFile('projects/danslab-ep09/dan-avatar.jpg')} size={280} color={DL.gold} />
      </div>

      <div style={{ position: 'absolute', top: 210, right: 160, width: 860 }}>
        <Headline at={16} size={46}>Strip away the fleet, and what is left is <span style={{ color: DL.gold }}>almost old-fashioned.</span></Headline>
        <div style={{ marginTop: 30 }}>
          {[['a competitor who reads risk for a living', 130], ['a planner who sizes every bet', 180], ['an operator who knows what to delegate', 230], ['a man who names his machines', 280]].map(([t, at], i) => (
            <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 16], [0, 1], DCLAMP), display: 'flex', gap: 18, alignItems: 'baseline', marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: DL.gold, flexShrink: 0, position: 'relative', top: -6 }} />
              <span style={{ fontFamily: DL_SERIF, fontSize: 38, color: DL.text }}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 32, color: DL.warm, opacity: interpolate(frame, [420, 450], [0, 1], DCLAMP) }}>
          — because you cannot hold something accountable if it does not have a name.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default PWho;
