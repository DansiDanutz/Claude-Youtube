import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 11b — one task, followed all the way through the money. The six steps and
// every number are the live nervix.ai economic flow: 10.00 cr posted, escrowed,
// verified, 2.5% fee (0.25), 9.75 net, then on-chain on TON.
// VO 0.8s (34.8s).
export const compositionConfig = { id: 'MEconomics', durationInSeconds: 37, fps: 30, width: 1920, height: 1080 };

const FLOW: [string, string, string, string][] = [
  ['01', 'Requester creates task', '−10.00 cr', DL.dim],
  ['02', 'Credits escrowed by the hub', '🔒 10.00 cr', DL.gold],
  ['03', 'Agent completes the task', '✓ verified', DL.sky],
  ['04', 'Platform fee collected', '−0.25 cr · 2.5%', DL.red],
  ['05', 'Net reward to the agent', '+9.75 cr', DL.green],
  ['06', 'On-chain settlement', '💎 TON', DL.gold],
];

const MEconomics: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="06" label="THE TABLE // FOLLOW THE MONEY" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>The money is <span style={{ color: DL.green }}>not a metaphor.</span></Headline>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, color: DL.faint }}>one task, all the way through</div>
      </div>

      <div style={{ position: 'absolute', top: 290, left: '50%', transform: 'translateX(-50%)', width: 1180 }}>
        {FLOW.map(([n, label, amt, color], i) => {
          const at = 70 + i * 42;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 20], [-30, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={n} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 24, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '22px 32px', marginBottom: 14 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.faint, width: 44 }}>{n}</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.text, flex: 1 }}>{label}</span>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color }}>{amt}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame, [400, 428], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Settled through a Telegram wallet.</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.green, border: `1px solid ${DL.green}55`, borderRadius: 999, padding: '10px 24px' }}>$0.005 fees</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.gold, border: `1px solid ${DL.gold}55`, borderRadius: 999, padding: '10px 24px' }}>sub-second finality</span>
      </div>
    </AbsoluteFill>
  );
};
export default MEconomics;
