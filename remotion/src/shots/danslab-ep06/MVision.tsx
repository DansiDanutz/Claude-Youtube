import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 16 — company → platform → economy. Currency = what you know. VO 0.8s (14.0s).
export const compositionConfig = { id: 'MVision', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const STEPS = [
  { t: 'A company', s: 'learned to run itself', c: DL.gold },
  { t: 'A platform', s: 'learned to think for itself', c: DL.sky },
  { t: 'An economy', s: 'where the currency is what you know', c: DL.green },
];

const MVision: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="06" label="THE ECOSYSTEM // WHAT JUST HAPPENED" />

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        {STEPS.map((st, i) => {
          const at = 60 + i * 40;
          const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
          const x = interpolate(frame, [at, at + 20], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={st.t} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'baseline', gap: 22 }}>
              <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 60, color: st.c }}>{st.t}</span>
              <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, color: DL.dim }}>{st.s}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [230, 256], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.warm }}>The only currency that matters — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.green }}>is what you know.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MVision;
