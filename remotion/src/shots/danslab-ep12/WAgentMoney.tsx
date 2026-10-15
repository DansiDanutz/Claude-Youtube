import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Note, useRise, DL, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at } from '../../lib/ep12timing.gen';

// CH3 · the biggest reason. VO dol15: agents can't open a bank account (no passport, no signature,
// no branch) — but they can hold a wallet. Crew = the current fleet (Hermes, Dexter, Nano).
export const compositionConfig = { id: 'WAgentMoney', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const CREW: [string, string][] = [['HERMES', DL.red], ['DEXTER', DL.gold], ['NANO', DL.sky]];

const WAgentMoney: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const BANK = at('dol15', 'bank'), WALLET = at('dol15', 'wallet');
  return (
    <Stage label="WHY STABLECOINS">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={at('dol15', 'workers')} size={50}>Our workers are <span style={{ color: DL.gold, fontStyle: 'italic' }}>AI agents.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, width: 1680, display: 'flex', gap: 30 }}>
        {CREW.map(([n, c], i) => {
          const no = interpolate(f, [BANK + i * 8, BANK + i * 8 + 10], [0, 1], DCLAMP);
          const yes = interpolate(f, [WALLET + i * 8, WALLET + i * 8 + 10], [0, 1], DCLAMP);
          return (
            <div key={n} style={{ ...rise(at('dol15', 'agents') + i * 5), flex: 1, background: DL.panel, border: `1px solid ${yes ? DL.green : DL.border}`,
              borderTop: `4px solid ${c}`, borderRadius: 16, padding: '28px 32px' }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, color: DL.text }}>{n}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, opacity: no }}>
                <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.red }}>✗</span>
                <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, textDecoration: yes > 0.5 ? 'line-through' : 'none' }}>open a bank account</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: yes }}>
                <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.green }}>✓</span>
                <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>hold a wallet · receive USDC</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', top: 620, left: 120, display: 'flex', gap: 40, fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>
        <span style={rise(at('dol15', 'passport'))}>no passport</span>
        <span style={rise(at('dol15', 'signature'))}>no signature</span>
        <span style={rise(at('dol15', 'branch'))}>no branch to walk into</span>
      </div>
      <Note at={at('dol15', 'only')}>The only money our workers <span style={{ color: DL.gold }}>can actually touch.</span></Note>
    </Stage>
  );
};
export default WAgentMoney;
