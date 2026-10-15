import React from 'react';
import { Stage, Chip, Note, CounterPointer, useRise, usePop, DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · the offer. VO dol22 (Dan 2026-10-15): NervixPay Starter, $10 in USDC, paid through NervixPay itself,
// invited beta, link in the description. Ends pointing at the live REVENUE counter in the bottom bar.
export const compositionConfig = { id: 'WOffer', durationInSeconds: 22.8, fps: 30, width: 1920, height: 1080 };

const WOffer: React.FC = () => {
  const rise = useRise();
  const pop = usePop();
  return (
    <Stage label="THE OFFER">
      <div style={{ position: 'absolute', top: 150, left: 120, ...rise(voAt('dol22')), fontFamily: DL_SERIF, fontSize: 54, color: DL.text }}>
        Here's <span style={{ color: DL.gold, fontStyle: 'italic' }}>the offer.</span>
      </div>
      <div style={{ position: 'absolute', top: 270, left: 120, width: 800, background: DL.panel, border: `2px solid ${DL.gold}`, borderRadius: 22, padding: '40px 48px',
        boxShadow: `0 0 60px ${DL.gold}22`, ...pop(at('dol22', 'starter'), 0.85) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.muted }}>NERVIXPAY · STARTER PLAN</div>
        <div style={{ ...pop(at('dol22', '$10')), display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 18 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 150, color: DL.gold, lineHeight: 1 }}>10</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: DL.text }}>USDC</span>
        </div>
        <div style={{ ...rise(at('dol22', 'itself')), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 20 }}>
          through NervixPay itself → <span style={{ color: DL.text }}>company wallet</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 1000, width: 820 }}>
        <div style={{ ...rise(at('dol22', 'earns')), fontFamily: DL_SERIF, fontSize: 48, color: DL.text, lineHeight: 1.3 }}>
          The payment product earns its first money <span style={{ color: DL.gold, fontStyle: 'italic' }}>through its own rail.</span>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <Chip at={at('dol22', 'invited')} solid>INVITED BETA</Chip>
          <Chip at={at('dol22', 'description')} color={DL.text}>link in the description ↓</Chip>
        </div>
      </div>
      <Note at={at('dol22', 'moves')} bottom={150}>Let's see if it moves.</Note>
      <CounterPointer at={at('dol22', 'counter')} />
    </Stage>
  );
};
export default WOffer;
