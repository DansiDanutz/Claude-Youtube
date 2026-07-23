import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Megaphone } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ep06 15d — Ad NOW: advertiser console, $50/mo 7-day spotlight, Nervix anchor. Checkout next (pre-revenue). VO 0.8s (~18s).
export const compositionConfig = { id: 'MAdNow', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const FEATURES = ['cinematic ad card', 'credit balance', 'featured seat'];

const MAdNow: React.FC = () => {
  const frame = useCurrentFrame();
  const wm = interpolate(frame, [60, 86], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const wmY = interpolate(frame, [60, 90], [22, 0], { ...DCLAMP, easing: DL_EASE.out });
  const priceOp = interpolate(frame, [300, 326], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nextOp = interpolate(frame, [430, 454], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="AD NOW // THE ADVERTISER CONSOLE" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', opacity: wm, transform: `translateY(${wmY}px)` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
          <Megaphone size={54} color={DL.sky} />
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 84, color: DL.text }}>Ad <span style={{ color: DL.sky }}>NOW</span></span>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.warm, marginTop: 6 }}>advertise your AI platform inside the War Room</div>
      </div>
      <div style={{ position: 'absolute', top: 410, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {FEATURES.map((f, i) => {
          const a = 150 + i * 22; const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          return <div key={f} style={{ opacity: op, background: `${DL.sky}12`, border: `1px solid ${DL.sky}44`, borderRadius: 999, padding: '12px 26px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 1, color: DL.sky }}>{f}</span>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', top: 522, left: 0, right: 0, textAlign: 'center', opacity: priceOp }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 38, color: DL.text }}>$50/mo &rarr; a 7-day spotlight &middot; </span>
        <span style={{ fontFamily: DL_SERIF, fontSize: 38, color: DL.gold }}>first seat: Nervix</span>
      </div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: nextOp }}>
        <div style={{ display: 'inline-block', background: `${DL.gold}12`, border: `1px dashed ${DL.gold}66`, borderRadius: 999, padding: '10px 26px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.gold }}>CONSOLE BUILT &middot; CHECKOUT SHIPS NEXT</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default MAdNow;
