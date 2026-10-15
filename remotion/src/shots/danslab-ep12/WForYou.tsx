import React from 'react';
import { Img, staticFile } from 'remotion';
import { Stage, Title, Chip, useRise, usePop, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at } from '../../lib/ep12timing.gen';

// CH2 · any business. VO dol12: website · consultant · shop · service; connect a wallet, name a price,
// get a link, a QR code or a snippet. The QR is the real checkout QR from the promo capture.
export const compositionConfig = { id: 'WForYou', durationInSeconds: 15.7, fps: 30, width: 1920, height: 1080 };

const KINDS: [string, string][] = [['a website', 'website'], ['a consultant', 'consultant'], ['a shop', 'shop'], ['a service', 'service']];

const WForYou: React.FC = () => {
  const rise = useRise();
  const pop = usePop();
  return (
    <Stage label="FOR ANY BUSINESS">
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={at('dol12', 'any')}>Any business <span style={{ color: DL.gold, fontStyle: 'italic' }}>can use it.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 280, left: 120, display: 'flex', gap: 20 }}>
        {KINDS.map(([k, cue]) => <Chip key={k} at={at('dol12', cue)} color={DL.text}>{k}</Chip>)}
      </div>
      <div style={{ position: 'absolute', top: 420, left: 120, width: 820, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {([['01', 'Connect a wallet', 'connect'], ['02', 'Name a price', 'name'], ['03', 'Get a link · a QR code · a snippet', 'get']] as const).map(([n, t, cue]) => (
          <div key={n} style={{ ...rise(at('dol12', cue)), display: 'flex', alignItems: 'baseline', gap: 26 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.red }}>{n}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 42, color: DL.text }}>{t}</span>
          </div>
        ))}
      </div>
      {/* share panel */}
      <div style={{ position: 'absolute', top: 400, left: 1080, width: 700, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: 34, ...pop(at('dol12', 'link'), 0.85) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.muted }}>CHECKOUT LINK</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.gold, marginTop: 10, background: DL.bg, borderRadius: 10, padding: '12px 18px' }}>nervixpay.live/l/your-product</div>
        <div style={{ display: 'flex', gap: 30, alignItems: 'center', marginTop: 26 }}>
          <div style={{ ...pop(at('dol12', 'qr')), background: '#fff', borderRadius: 14, padding: 12 }}>
            <Img src={staticFile('projects/danslab-ep12/checkout-qr.png')} style={{ width: 190, height: 190, display: 'block' }} />
          </div>
          <div style={{ ...pop(at('dol12', 'snippet')), fontFamily: DL_MONO, fontSize: 24, color: DL.dim, lineHeight: 1.5 }}>
            {'</>'} embed<br />snippet<br />for your site
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 140, left: 120, ...rise(at('dol12', 'setup')), fontFamily: DL_SANS, fontSize: 40, color: DL.warm }}>
        That's the whole setup.
      </div>
    </Stage>
  );
};
export default WForYou;
