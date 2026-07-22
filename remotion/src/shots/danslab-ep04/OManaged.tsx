import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 11 — before/after: free → managed. A chain of command. VO 0.8s (20.2s).
export const compositionConfig = { id: 'OManaged', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const Col: React.FC<{ title: string; items: string[]; color: string; at: number; good?: boolean }> = ({ title, items, color, at, good }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
  const y = interpolate(frame, [at, at + 18], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: 480, background: DL.panel, border: `1px solid ${good ? `${color}55` : DL.border}`, borderRadius: 20, padding: '32px 40px' }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color, textTransform: 'uppercase' }}>{title}</div>
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((it) => (
          <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: DL_SANS, fontSize: 27, color: good ? DL.text : DL.dim }}>
            <span style={{ color }}>{good ? '✓' : '✕'}</span>{it}
          </div>
        ))}
      </div>
    </div>
  );
};

const OManaged: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="04" label="THE OVERSEER // A CHAIN OF COMMAND" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={56}>Before Paperclip, the agents were <span style={{ color: DL.red }}>free.</span></Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={56} italic color={DL.green}>After, they were managed.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50 }}>
        <Col title="Before" color={DL.red} at={150} items={['free to wander', 'free to improvise', 'free to waste a day']} />
        <Col title="After" color={DL.green} at={200} good items={['a role', 'a queue of tasks', 'an owner']} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [340, 362], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>No more freelancing. No more drifting. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>The fleet finally had a chain of command.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OManaged;
