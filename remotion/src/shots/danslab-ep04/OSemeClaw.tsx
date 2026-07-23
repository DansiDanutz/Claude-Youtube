import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 10e — the room has a name: SemeClaw. Open source, zero-key, free, semeclaw.fly.dev. VO 0.8s (~15s).
export const compositionConfig = { id: 'OSemeClaw', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const CHIPS = ['OPEN SOURCE', 'ZERO-KEY START', 'FREE THE WHOLE WAY'];

const OSemeClaw: React.FC = () => {
  const frame = useCurrentFrame();
  const wm = interpolate(frame, [60, 84], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const wmY = interpolate(frame, [60, 88], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
  const url = interpolate(frame, [300, 324], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE WAR ROOM // IT HAS A NAME" />
      <div style={{ position: 'absolute', top: 168, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={44}>That room has a name.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 322, left: 0, right: 0, textAlign: 'center', opacity: wm, transform: `translateY(${wmY}px)` }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 120, color: DL.text }}>Seme<span style={{ color: DL.red }}>Claw</span></span>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 34, color: DL.warm, marginTop: 6 }}>the company&rsquo;s War Room, opened to the world</div>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {CHIPS.map((c, i) => {
          const a = 150 + i * 22; const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          return <div key={c} style={{ opacity: op, background: `${DL.sky}12`, border: `1px solid ${DL.sky}44`, borderRadius: 999, padding: '12px 26px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.sky }}>{c}</span>
          </div>;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: url }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 2, color: DL.gold }}>semeclaw.fly.dev</span>
      </div>
    </AbsoluteFill>
  );
};
export default OSemeClaw;
