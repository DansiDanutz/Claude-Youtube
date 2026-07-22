import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 5 — the scarcest resource is attention. VO 0.8s (20.8s).
export const compositionConfig = { id: 'NAttention', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const CROSSED = ['energy', 'money', 'time'];

const NAttention: React.FC = () => {
  const frame = useCurrentFrame();
  const attOp = interpolate(frame, [300, 326], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const attScale = interpolate(frame, [300, 332], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="THE PROBLEM // THE SCARCEST THING" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={52}>For a company of tireless machines, the scarcest thing</Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={52} color={DL.text}>is not what you&rsquo;d think.</Headline></div>
      </div>

      {/* crossed-out non-answers */}
      <div style={{ position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44 }}>
        {CROSSED.map((c, i) => {
          const at = 150 + i * 24;
          const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
          const strike = interpolate(frame, [at + 16, at + 30], [0, 1], DCLAMP);
          return (
            <div key={c} style={{ opacity: op, position: 'relative', fontFamily: DL_SERIF, fontSize: 52, color: DL.muted }}>
              {c}
              <div style={{ position: 'absolute', top: '50%', left: -6, height: 3, width: `${strike * 108}%`, background: DL.red }} />
            </div>
          );
        })}
      </div>

      {/* the answer */}
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center', opacity: attOp, transform: `scale(${attScale})` }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.gold }}>Attention.</span>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 452], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>Deciding where to point the fleet next is the most valuable move anyone can make. Dan handed it to </span>
        <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.sky }}>a mind that never blinks.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NAttention;
