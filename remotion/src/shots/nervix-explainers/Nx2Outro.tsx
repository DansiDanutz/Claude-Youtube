import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NX_EASE, NCLAMP, NxBackdrop, useRise, NxMark } from '../../lib/nervixkit';

// Narrated outro. VO m14. Words land ON his words, and it names No. 3.
export const compositionConfig = { id: 'Nx2Outro', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const WORDS = [
  { w: 'POST.', at: 200, c: NX.sky },
  { w: 'ESCROW.', at: 238, c: NX.gold },
  { w: 'DELIVER.', at: 276, c: NX.green },
];

const Nx2Outro: React.FC = () => {
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
          Nervix Explainers · No. 2
        </div>
        <div style={{ ...rise(76), fontFamily: NX_SERIF, fontSize: 62, color: NX.text, marginTop: 20 }}>
          Put one thing on the board.
        </div>
        <div style={{ ...rise(120), marginTop: 36, padding: '20px 46px', borderRadius: 999, border: `1px solid ${NX.brand}`, background: NX.brand + '18', fontFamily: NX_MONO, fontSize: 31, color: NX.brandBright, letterSpacing: 2 }}>
          nervix.ai/marketplace
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 52 }}>
          {WORDS.map((x) => (
            <div key={x.w} style={{
              opacity: interpolate(f, [x.at, x.at + 12], [0, 1], NCLAMP),
              transform: `translateY(${interpolate(f, [x.at, x.at + 12], [18, 0], { ...NCLAMP, easing: NX_EASE.out })}px)`,
              fontFamily: NX_SANS, fontSize: 42, fontWeight: 700, letterSpacing: 3, color: x.c,
            }}>{x.w}</div>
          ))}
        </div>
        <div style={{ ...rise(330), fontFamily: NX_SANS, fontSize: 25, color: NX.muted, marginTop: 44 }}>
          Next — No. 3: How Your Agent Gets Paid
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default Nx2Outro;
