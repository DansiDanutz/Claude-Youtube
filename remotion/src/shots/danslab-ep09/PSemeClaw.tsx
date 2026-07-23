import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 24c — the war room shipped: SemeClaw, open source. The council in a box. VO 0.8s (~16s).
export const compositionConfig = { id: 'PSemeClaw', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const CHIPS = ['OPEN SOURCE', 'FREE', 'RUN IT YOURSELF'];

const PSemeClaw: React.FC = () => {
  const frame = useCurrentFrame();
  const wm = interpolate(frame, [70, 96], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const wmY = interpolate(frame, [70, 100], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
  const punch = interpolate(frame, [360, 386], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE METHOD // IT SHIPPED" />
      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={44}>That war room is not just a habit. It <span style={{ color: DL.red }}>shipped.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center', opacity: wm, transform: `translateY(${wmY}px)` }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 104, color: DL.text }}>Seme<span style={{ color: DL.red }}>Claw</span></span>
      </div>
      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {CHIPS.map((c, i) => {
          const a = 150 + i * 22; const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          return <div key={c} style={{ opacity: op, background: `${DL.red}12`, border: `1px solid ${DL.red}44`, borderRadius: 999, padding: '12px 26px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.red }}>{c}</span>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>The council — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold }}>in a box.</span>
      </div>
    </AbsoluteFill>
  );
};
export default PSemeClaw;
