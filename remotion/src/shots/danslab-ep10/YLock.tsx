import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch3 close · the total locks. VO plumb04 12.9. Everything counted so far collapses
// into one figure and stops moving — the number the rest of the episode argues about.
export const compositionConfig = { id: 'YLock', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const PARTS: [string, string, number][] = [
  ['Two Macs, amortised', '$175', 30],
  ['Four servers, Frankfurt', '$240', 54],
  ['Five AI subscriptions', '$650', 78],
  ['Eight tools', '$177', 102],
];

const YLock: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lock = spring({ frame: f - 150, fps, config: { damping: 200, mass: 0.7 } });
  const total = Math.round(1242 * lock);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE BILL" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={6} size={46}>The entire operating cost of this company.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {PARTS.map(([label, amt, at]) => (
          <div key={label} style={{
            opacity: interpolate(f, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
            transform: `translateY(${interpolate(f, [at, at + 18], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
            background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '22px 28px', width: 330,
          }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 46, color: DL.dim }}>{amt}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.muted, marginTop: 8 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 520, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{
          fontFamily: DL_MONO, fontWeight: 700, fontSize: 220, color: DL.gold, letterSpacing: -6,
          opacity: interpolate(f, [150, 168], [0, 1], DCLAMP),
        }}>${total.toLocaleString('en-US')}</div>
        <div style={{
          fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red, textTransform: 'uppercase', marginTop: 14,
          opacity: interpolate(f, [210, 232], [0, 1], DCLAMP),
        }}>per month · locked</div>
      </div>
    </AbsoluteFill>
  );
};
export default YLock;
