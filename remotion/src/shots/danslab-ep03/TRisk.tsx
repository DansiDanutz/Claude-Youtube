import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 6 — the Cowen risk metric: buy low, sell high. BTC at 0.12. VO 0.8s (24.4s).
export const compositionConfig = { id: 'TRisk', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const RISK = 0.118;

const TRisk: React.FC = () => {
  const frame = useCurrentFrame();
  const barAt = 150;
  const barW = 1300;
  const markAt = 300;
  const mark = interpolate(frame, [markAt, markAt + 40], [0.5, RISK], { ...DCLAMP, easing: DL_EASE.inOut });
  const markOp = interpolate(frame, [markAt, markAt + 14], [0, 1], DCLAMP);
  const labelOp = interpolate(frame, [markAt + 40, markAt + 58], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="03" label="THE METHOD // RISK METRIC" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130 }}>
        <Headline at={20} size={56}>Built on years of price history.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={54} size={48} italic color={DL.warm}>Buy when risk is <span style={{ color: DL.green }}>low.</span>  Sell when risk is <span style={{ color: DL.red }}>high.</span></Headline></div>
      </div>

      {/* risk gradient bar 0..1 */}
      <div style={{ position: 'absolute', top: 470, left: (1920 - barW) / 2, width: barW }}>
        <div style={{ position: 'relative', height: 44, borderRadius: 22, background: `linear-gradient(90deg, ${DL.green}, ${DL.gold} 50%, ${DL.red})`, opacity: interpolate(frame, [barAt, barAt + 20], [0, 1], DCLAMP) }}>
          {/* marker */}
          <div style={{ position: 'absolute', top: -18, left: `${mark * 100}%`, transform: 'translateX(-50%)', opacity: markOp }}>
            <div style={{ width: 6, height: 80, background: DL.text, borderRadius: 3, boxShadow: `0 0 20px ${DL.text}` }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: DL_MONO, fontSize: 24 }}>
          <span style={{ color: DL.green }}>0.0 — historically cheap</span>
          <span style={{ color: DL.faint }}>0.5</span>
          <span style={{ color: DL.red }}>1.0 — expensive</span>
        </div>
      </div>

      {/* BTC reading */}
      <div style={{ position: 'absolute', top: 660, left: 0, right: 0, textAlign: 'center', opacity: labelOp }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>BITCOIN, RIGHT NOW  </span>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 66, color: DL.green }}>0.12</span>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 450], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Rare. Cheap. Exactly where she wants to be a </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.green }}>buyer.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TRisk;
