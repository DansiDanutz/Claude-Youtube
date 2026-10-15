import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Stamp, Note, useRise, usePop, DL, DL_SERIF, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · it lands (dol23a — CONDITIONAL: only used if the real payment happens). The dashboard row MUST be
// replaced with the real capture/values on the day: set PAYMENT below from the actual invoice.
// dol23a is not voiced yet, so cues use fallback seconds until it is (build_timing.py re-run).
export const compositionConfig = { id: 'WLands', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

// TODO(ep12, render day): real values from the NervixPay dashboard + explorer. Never invent.
const PAYMENT = { item: 'NervixPay Starter plan', amount: '—.— USDC', network: 'Polygon', payer: 'invited merchant', status: 'Paid' };
const PENDING_REAL_DATA = true;

const WLands: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const pop = usePop();
  const ROW = at('dol23a', 'there', 1, 1.0);
  const flash = interpolate(f, [ROW, ROW + 8, ROW + 40], [0, 1, 0], DCLAMP);
  return (
    <Stage label="IT LANDS" glow={DL.gold}>
      <div style={{ position: 'absolute', top: 150, left: 120, ...rise(voAt('dol23a')), fontFamily: DL_SERIF, fontSize: 60, color: DL.gold }}>
        And there it is.
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1680, ...pop(ROW, 0.9), display: 'grid', gridTemplateColumns: '1fr 300px 220px 260px 160px',
        alignItems: 'center', gap: 20, background: DL.panel, border: `2px solid ${DL.gold}`, borderRadius: 16, padding: '26px 32px',
        boxShadow: `0 0 ${50 * flash}px rgba(212,160,23,${0.7 * flash})` }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.text }}>{PAYMENT.item}</span>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.gold }}>{PAYMENT.amount}</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>{PAYMENT.network}</span>
        <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>{PAYMENT.payer}</span>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DL.bg, background: DL.gold, borderRadius: 8, padding: '6px 14px', textAlign: 'center' }}>{PAYMENT.status}</span>
      </div>
      <div style={{ position: 'absolute', top: 440, left: 120, display: 'flex', gap: 30, ...rise(at('dol23a', 'test', 1, 2.5)) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.text }}>not us · not a test wallet</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.green }}>verified on-chain ✓</span>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 120, ...rise(at('dol23a', 'zero', 1, 8.0)), fontFamily: DL_SANS, fontSize: 40, color: DL.dim }}>
        Eleven episodes of zero.
      </div>
      {PENDING_REAL_DATA && (
        <div style={{ position: 'absolute', top: 640, left: 120 }}>
          <Stamp at={0} size={20} color={DL.gold} rot={0}>PLACEHOLDER — REAL PAYMENT DATA REQUIRED</Stamp>
        </div>
      )}
      <Note at={at('dol23a', 'hold', 1, 11.0)}>Money an AI can hold. <span style={{ color: DL.gold }}>On rails we built ourselves.</span></Note>
    </Stage>
  );
};
export default WLands;
