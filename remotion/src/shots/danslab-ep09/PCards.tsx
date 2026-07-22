import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { Card } from '../../lib/ep06kit';

// Ep09 34b — your hand. VO 0.8s (15.4s).
export const compositionConfig = { id: 'PCards', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const PCards: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="09" label="THE PLAYER // YOUR HAND" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Look at the cards <span style={{ color: DL.green }}>you are holding.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'flex-end' }}>
        {[['the models', 'public', 80], ['the factory', 'open source', 115], ['the marketplace', 'open seats', 150], ['the playbook', 'published live', 185]].map(([t, sub, at], i) => (
          <div key={String(t)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 18], [0, 1], DCLAMP), textAlign: 'center' }}>
            <Card rank={String(['A', 'K', 'Q', 'J'][i])} suit={String(['♠', '♥', '♦', '♣'][i])} at={Number(at)} w={165} rot={(i - 1.5) * 5} />
            <div style={{ marginTop: 60, fontFamily: DL_SANS, fontWeight: 600, fontSize: 27, color: DL.text }}>{t}</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.green }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 368], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>A decade ago, this hand did not exist. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>You are holding it right now.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PCards;
