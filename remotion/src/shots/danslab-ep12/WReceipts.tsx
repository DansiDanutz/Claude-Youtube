import React from 'react';
import { Stage, Title, Stamp, Note, useRise, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH5 · the receipts. VO dol19 (kept as voiced: "three times"). v3 (Dan 2026-10-24): show ALL FIVE Dan-paid
// September tests, checked in the NervixPay DB (orders, subscription_payments) + Polygon on 2026-10-24 — the
// three the VO names light on its cues; the 21 Sep go-live and the second TON test appear alongside.
// Every one was paid by Dan → one TEST — NOT REVENUE stamp, never over the amounts/blocks.
export const compositionConfig = { id: 'WReceipts', durationInSeconds: 28.6, fps: 30, width: 1920, height: 1080 };

const ROWS: [string, string, string, string, string, number][] = [
  ['21 SEP 2026', 'Polygon · USDC', 'Fake or Real Starter — go-live test', '9.000000 USDC · block 94166472', 'receipts', 0],
  ['24 SEP 2026', 'TON', 'production verification', '0.01 TON', '24th', 0],
  ['24 SEP 2026', 'TON', 'background reconciliation test', '0.01 TON', '24th', 8],
  ['26 SEP 2026', 'Polygon · USDC', 'checkout from an exchange', '3.000000 USDC · block 94471825', '26th', 0],
  ['26 SEP 2026', 'Polygon · USDC', 'Starter plan invoice — CERTIFIED', '10.301262 USDC · block 94482064', 'starter', 0],
];

const WReceipts: React.FC = () => {
  const rise = useRise();
  const CTRL = at('dol19', 'control');
  return (
    <Stage label="THE RECEIPTS">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={voAt('dol19')} size={50}>Has it ever actually worked? <span style={{ color: DL.green, fontStyle: 'italic', ...rise(at('dol19', 'yes')) }}>Yes.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 260, left: 120, width: 1680, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROWS.map(([d, net, path, amt, cue, delay]) => (
          <div key={d + path} style={{ ...rise(at('dol19', cue) + delay), position: 'relative', display: 'grid', gridTemplateColumns: '200px 240px 1fr 500px',
            alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14, padding: '15px 28px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>{d}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.text }}>{net}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.text }}>{path}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.gold, textAlign: 'right' }}>{amt}</span>
          </div>
        ))}
      </div>
      {/* one stamp for all five — never over the amounts/blocks (they are the evidence). Placed so the 1.6× slam
          (Stamp's spring start) stays inside the frame and above the first row: centre x≈1420, ≤1880 at 1.6×. */}
      <div style={{ position: 'absolute', top: 176, left: 1150 }}>
        <Stamp at={CTRL} size={24} rot={-4}>ALL FIVE: TEST — NOT REVENUE</Stamp>
      </div>
      <div style={{ position: 'absolute', top: 730, left: 120, ...rise(at('dol19', 'counter')), fontFamily: DL_SANS, fontSize: 34, color: DL.text }}>
        Why the counter didn't move: <span style={{ color: DL.red }}>every one was paid by us.</span>
      </div>
      <div style={{ position: 'absolute', top: 792, left: 120, ...rise(at('dol19', 'receipts')), fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>
        source · NervixPay orders + subscription_payments · Polygon · checked 24 Oct 2026
      </div>
      <Note at={at('dol19', 'plumbing')} bottom={120}>That's plumbing. <span style={{ color: DL.red }}>Not revenue.</span></Note>
    </Stage>
  );
};
export default WReceipts;
