import React from 'react';
import { Stage, Title, Stamp, Note, useRise, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH5 · the receipts. VO dol19. Rows verbatim from NervixPay docs/operations/network-certification.md
// evidence log. All three came from Dan-controlled wallets → TEST — NOT REVENUE stamps on "we control".
export const compositionConfig = { id: 'WReceipts', durationInSeconds: 28.6, fps: 30, width: 1920, height: 1080 };

const ROWS: [string, string, string, string, string][] = [
  ['24 SEP 2026', 'TON', 'checkout', '0.01 TON', '24th'],
  ['26 SEP 2026', 'Polygon · USDC', 'checkout from an exchange', '3.000000 USDC · block 94471825', '26th'],
  ['26 SEP 2026', 'Polygon · USDC', 'Starter plan invoice — CERTIFIED', '10.301262 USDC · block 94482064', 'starter'],
];

const WReceipts: React.FC = () => {
  const rise = useRise();
  const CTRL = at('dol19', 'control');
  return (
    <Stage label="THE RECEIPTS">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={voAt('dol19')} size={50}>Has it ever actually worked? <span style={{ color: DL.green, fontStyle: 'italic', ...rise(at('dol19', 'yes')) }}>Yes — three times.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1680, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {ROWS.map(([d, net, path, amt, cue]) => (
          <div key={d + path} style={{ ...rise(at('dol19', cue)), position: 'relative', display: 'grid', gridTemplateColumns: '230px 270px 1fr 520px',
            alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14, padding: '22px 28px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>{d}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text }}>{net}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>{path}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.gold, textAlign: 'right' }}>{amt}</span>
          </div>
        ))}
      </div>
      {/* one stamp for all three — never over the amounts/blocks (they are the evidence) */}
      <div style={{ position: 'absolute', top: 612, left: 1160 }}>
        <Stamp at={CTRL} size={30} rot={-4}>ALL THREE: TEST — NOT REVENUE</Stamp>
      </div>
      <div style={{ position: 'absolute', top: 720, left: 120, ...rise(at('dol19', 'counter')), fontFamily: DL_SANS, fontSize: 34, color: DL.text }}>
        Why the counter didn't move: <span style={{ color: DL.red }}>every one came from a wallet we control.</span>
      </div>
      <div style={{ position: 'absolute', top: 790, left: 120, ...rise(at('dol19', 'receipts')), fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>
        source · NervixPay docs/operations/network-certification.md · evidence log
      </div>
      <Note at={at('dol19', 'plumbing')} bottom={120}>That's plumbing. <span style={{ color: DL.red }}>Not revenue.</span></Note>
    </Stage>
  );
};
export default WReceipts;
