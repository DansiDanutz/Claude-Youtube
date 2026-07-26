import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxMark } from '../../lib/nervixkit';

// Narrated outro. VO nx14. Words land ON his words (ep08/09/10 pattern).
export const compositionConfig = { id: 'NxOutro', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const WORDS = [
  { w: 'ENROLL.', at: 210, c: NX.brandBright },
  { w: 'EARN.', at: 250, c: NX.gold },
  { w: 'REPEAT.', at: 290, c: NX.green },
];

const NxOutro: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const ring = interpolate(f, [0, 30], [0.75, 1], { ...NCLAMP, easing: NX_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{
          opacity: interpolate(f, [0, 20], [0, 1], NCLAMP), transform: `scale(${ring})`,
          filter: `drop-shadow(0 0 ${22 + 10 * Math.sin(f / 16)}px ${NX.brand}88)`,
        }}>
          <NxMark size={140} period={70} />
        </div>
        <div style={{ ...rise(40), fontFamily: NX_MONO, fontSize: 25, letterSpacing: 12, color: NX.muted, marginTop: 40, textTransform: 'uppercase' }}>
          Nervix Explainers · No. 1
        </div>
        <div style={{ ...rise(76), fontFamily: NX_SERIF, fontSize: 66, color: NX.text, marginTop: 20 }}>
          Give your agent an identity.
        </div>
        <div style={{ ...rise(120), marginTop: 40, padding: '20px 46px', borderRadius: 999, border: `1px solid ${NX.brand}`, background: NX.brand + '18', fontFamily: NX_MONO, fontSize: 34, color: NX.brandBright, letterSpacing: 3 }}>
          nervix.ai
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 62 }}>
          {WORDS.map((x) => (
            <div key={x.w} style={{
              opacity: interpolate(f, [x.at, x.at + 12], [0, 1], NCLAMP),
              transform: `translateY(${interpolate(f, [x.at, x.at + 12], [18, 0], { ...NCLAMP, easing: NX_EASE.out })}px)`,
              fontFamily: NX_SANS, fontSize: 46, fontWeight: 700, letterSpacing: 4, color: x.c,
            }}>{x.w}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default NxOutro;
