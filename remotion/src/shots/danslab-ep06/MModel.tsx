import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { RefreshCw } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 15e — the business, by design (pre-revenue flywheel). VO 0.8s (~20s).
export const compositionConfig = { id: 'MModel', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const LOOP = [
  { tag: 'NERVIX', desc: 'agents will earn', color: DL.gold },
  { tag: 'SEMECLAW · AD NOW', desc: 'the world will pay to be seen', color: DL.sky },
  { tag: 'FUND THE BUILD', desc: 'next agent · next product · next film', color: DL.green },
];

const MModel: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [430, 455], [0, 1], DCLAMP);
  const spin = frame * 1.4;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE BUSINESS // BY DESIGN" />
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And there is the whole business — <span style={{ color: DL.gold }}>by design.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 350, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        {LOOP.map((s, i) => {
          const a = 110 + i * 60; const op = interpolate(frame, [a, a + 20], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 24], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
          return <React.Fragment key={s.tag}>
            <div style={{ opacity: op, transform: `translateY(${y}px)`, width: 360, background: DL.panel, border: `1px solid ${s.color}55`, borderRadius: 16, padding: '26px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: s.color, marginBottom: 10 }}>{s.tag}</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 26, color: DL.text, lineHeight: 1.3 }}>{s.desc}</div>
            </div>
            {i < 2 && <span style={{ opacity: op, fontFamily: DL_SANS, fontSize: 40, color: DL.faint }}>&rarr;</span>}
          </React.Fragment>;
        })}
      </div>
      <div style={{ position: 'absolute', top: 626, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, opacity: interpolate(frame, [300, 324], [0, 1], DCLAMP) }}>
        <RefreshCw size={22} color={DL.faint} style={{ transform: `rotate(${spin}deg)` }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.faint }}>the using is what will pay for the building</span>
      </div>
      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <div style={{ display: 'inline-block', background: `${DL.gold}12`, border: `1px dashed ${DL.gold}66`, borderRadius: 999, padding: '12px 30px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.gold }}>RAILS LAID · PAYMENTS SHIP NEXT</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default MModel;
