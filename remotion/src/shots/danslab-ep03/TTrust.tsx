import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile, Img } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Panel } from '../../lib/ep03kit';

// Ep03 17 — trust + the Zmarty advert (the engine she trades on). VO 0.8s (20.2s).
export const compositionConfig = { id: 'TTrust', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const STATS: [string, string][] = [['96.2%', 'signal win rate'], ['47', 'indicators'], ['5', 'timeframes'], ['LIVE', 'liquidation map']];

const TTrust: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOp = interpolate(frame, [160, 180], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const logoScale = interpolate(frame, [160, 186], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE ENGINE BEHIND HER // ZMARTY" />

      <div style={{ position: 'absolute', top: 190, left: 130, right: 130 }}>
        <Headline at={20} size={56}>She publishes what she sees — in the open.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={46} italic color={DL.warm}>The engine she reads the market through has a name.</Headline></div>
      </div>

      {/* Zmarty logo */}
      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: logoOp, transform: `scale(${logoScale})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Img src={staticFile('projects/danslab-ep03/zmarty.png')} style={{ height: 96, objectFit: 'contain', filter: `drop-shadow(0 0 30px ${DL.red}55)` }} />
        </div>
      </div>

      {/* product stats */}
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {STATS.map(([a, b], i) => {
          const at = 230 + i * 20;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={b} style={{ opacity: op, transform: `translateY(${y}px)`, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '22px 34px', textAlign: 'center', minWidth: 200 }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.green }}>{a}</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint, marginTop: 8, textTransform: 'uppercase', letterSpacing: 2 }}>{b}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 450], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Dan&rsquo;s own crypto platform. The same signals she trades on — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>open to you.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TTrust;
