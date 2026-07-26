import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// Ch6 · the wheel spins. VO flw20: nothing stands alone — the secret of the
// revenue. The five nodes orbit as one rotating wheel, $1 glows at the hub.
export const compositionConfig = { id: 'ZSpin', durationInSeconds: 16.5, fps: 30, width: 1920, height: 1080 };

const LABELS = ['CHANNEL', 'NERVIX', 'YOUTUBE', 'ZMARTY', 'SEMECLAW'];
const CX = 960, CY = 540, R = 300;

const ZSpin: React.FC = () => {
  const f = useCurrentFrame();
  const spinup = interpolate(f, [0, 120], [0.15, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const rot = f * 0.55 * spinup;
  const hub = interpolate(f, [60, 90], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const line = interpolate(f, [260, 284], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={CX} cy={CY} r={R} stroke={DL.border} strokeWidth={2} fill="none" strokeDasharray="6 10" />
      </svg>
      {LABELS.map((l, i) => {
        const a = ((i * 72 + rot - 90) * Math.PI) / 180;
        return (
          <div key={l} style={{
            position: 'absolute', left: CX + R * Math.cos(a), top: CY + R * Math.sin(a),
            transform: 'translate(-50%,-50%)',
            background: DL.panel, border: `2px solid ${DL.gold}`, borderRadius: 14, padding: '12px 22px',
            fontFamily: DL_MONO, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: DL.text,
            boxShadow: '0 0 22px rgba(212,160,23,0.25)',
          }}>{l}</div>
        );
      })}
      <div style={{
        position: 'absolute', left: CX, top: CY, transform: `translate(-50%,-50%) scale(${hub})`,
        fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 150, color: DL.gold,
        textShadow: '0 0 60px rgba(212,160,23,0.55)',
      }}>$1</div>
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: line }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>
          Not one sale. <span style={{ color: DL.gold }}>A wheel that doesn't stop.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default ZSpin;
