import React from 'react';
import { Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Stamp, useRise, usePop, DL, DL_SERIF, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · the live test (v3, Dan 2026-10-24). VO dol22: Dan pays a 9 USDC Fake or Real subscription through a
// NervixPay link from his own exchange account; it lands in one Polygon block and the page confirms it.
// Every value is real (NervixPay DB + Polygon, checked 2026-10-24): order #35096a88, block 96097042,
// tx 0x9cbae7ff…3df4, 9.002511 USDC received. The phone is Dan's real KuCoin capture; the full address and
// txid on it are masked with their shortened forms. Never called revenue: PAID BY DAN — TEST, NOT REVENUE.
export const compositionConfig = { id: 'WLive', durationInSeconds: 31.5, fps: 30, width: 1920, height: 1080 };

const PHONE_H = 640; // source capture 923×2000
const K = PHONE_H / 2000;
const PHONE_W = Math.round(923 * K);
// source-pixel boxes of the full address and txid on the capture → shortened, never the full strings
const MASKS: [number, number, number, number, string][] = [
  [330, 735, 850, 840, '0x8589Af…Cf71'],
  [330, 900, 850, 1050, 'tx 0x9cbae7ff…3df4'],
];

const STEPS: [string, string][] = [
  ['LINK', 'link'], ['PAID FROM DAN\'S EXCHANGE', 'exchange'], ['1 BLOCK · ON-CHAIN', 'block'], ['PAYMENT CONFIRMED', 'confirmed'],
];

const WLive: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const pop = usePop();
  const OK = at('dol22', 'confirmed');
  const flash = interpolate(f, [OK, OK + 8, OK + 40], [0, 1, 0], DCLAMP);
  return (
    <Stage label="LIVE TEST" glow={DL.gold}>
      <div style={{ position: 'absolute', top: 140, left: 120, width: 1680 }}>
        <Title at={voAt('dol22')} size={52}>24 October. <span style={{ color: DL.gold, fontStyle: 'italic' }}>Fake or Real.</span></Title>
        <div style={{ ...rise(at('dol22', 'checking')), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 8 }}>
          the fact-checking site the fleet built on JEV
        </div>
      </div>

      {/* Dan's real exchange withdrawal (masked) */}
      <div style={{ position: 'absolute', top: 290, left: 120, ...rise(at('dol22', 'paid'), 40, 22) }}>
        <div style={{ position: 'relative', width: PHONE_W, height: PHONE_H, borderRadius: 26, overflow: 'hidden',
          border: `2px solid ${DL.border}`, boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}>
          <Img src={staticFile('projects/danslab-ep12/dan-kucoin-withdrawal-9usdc-2026-10-24.jpg')} style={{ width: PHONE_W, height: PHONE_H, display: 'block' }} />
          {MASKS.map(([x0, y0, x1, y1, label]) => (
            <div key={label} style={{ position: 'absolute', left: x0 * K, top: y0 * K, width: (x1 - x0) * K, height: (y1 - y0) * K,
              background: '#222631', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4,
              fontFamily: DL_MONO, fontSize: 13, color: '#e8e8ea' }}>{label}</div>
          ))}
        </div>
      </div>
      {/* under the phone, clear of the rail steps and the order card */}
      <div style={{ position: 'absolute', top: 820, left: 128 }}>
        <Stamp at={at('dol22', 'exchange')} size={17} rot={-5}>PAID BY DAN — TEST, NOT REVENUE</Stamp>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 520, width: 1280 }}>
        <div style={{ ...pop(at('dol22', '$9'), 0.85), display: 'inline-flex', alignItems: 'baseline', gap: 16, background: DL.panel,
          border: `2px solid ${DL.gold}`, borderRadius: 16, padding: '16px 30px' }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 64, color: DL.gold, lineHeight: 1 }}>9</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.text }}>USDC</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginLeft: 10 }}>subscription · through a NervixPay link · Polygon</span>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
          {STEPS.map(([t, cue], i) => {
            const on = f >= at('dol22', cue);
            return (
              <div key={t} style={{ ...rise(at('dol22', cue)), flex: 1, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: DL_MONO, fontWeight: 700, fontSize: 20, letterSpacing: 1, whiteSpace: 'nowrap',
                color: on ? DL.bg : DL.muted, background: on ? (i === 3 ? DL.green : DL.gold) : 'transparent',
                border: `2px solid ${i === 3 ? DL.green : DL.gold}`, borderRadius: 10, padding: '0 10px' }}>{t}</div>
            );
          })}
        </div>
        <div style={{ ...rise(at('dol22', 'block')), marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px',
          background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.green}`, borderRadius: 14, padding: '22px 30px',
          boxShadow: `0 0 ${50 * flash}px rgba(88,178,110,${0.6 * flash})` }}>
          {([['order', '#35096a88'], ['network', 'Polygon · USDC'], ['block', '96097042'], ['tx', '0x9cbae7ff…3df4'],
            ['received', '9.002511 USDC'], ['status', 'PAID · verified on-chain']] as [string, string][]).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint, width: 110 }}>{k}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: k === 'status' ? DL.green : DL.text }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ ...pop(OK, 0.8), marginTop: 26, fontFamily: DL_SERIF, fontSize: 52, color: DL.green }}>Payment confirmed.</div>
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 520, right: 120, ...rise(at('dol22', 'site', 2)) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>
          The site, the rail, the checkout — all of it ours. <span style={{ color: DL.gold, ...rise(at('dol22', 'working')) }}>Working.</span>
        </span>
      </div>
    </Stage>
  );
};
export default WLive;
