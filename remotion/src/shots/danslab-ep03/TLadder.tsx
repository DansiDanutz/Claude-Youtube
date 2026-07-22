import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { ShieldCheck } from 'lucide-react';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, LadderStep } from '../../lib/ep03kit';

// Ep03 9 — THE SIGNATURE MOVE: the doubling ladder. When price falls toward
// liquidation she doubles the margin and cuts leverage: 100→200→400→800,
// 20→10→5→2×. Liquidation pushed away. VO 0.8s (28.5s).
export const compositionConfig = { id: 'TLadder', durationInSeconds: 31, fps: 30, width: 1920, height: 1080 };

const RUNGS = [
  { margin: '$100', lev: '20×', note: 'the entry', at: 130 },
  { margin: '$200', lev: '10×', note: 'price fought back — double the margin, cut leverage', at: 250 },
  { margin: '$400', lev: '5×', note: 'again — average drops, liquidation moves away', at: 370 },
  { margin: '$800', lev: '2×', note: 'and again — she is never actually liquidated', at: 490 },
];

const TLadder: React.FC = () => {
  const frame = useCurrentFrame();
  // liquidation marker pushed further away with each rung
  const liqStops = [130, 250, 370, 490];
  const liqPos = liqStops.reduce((acc, s, i) => (frame >= s ? i : acc), 0);
  const liqTarget = interpolate(liqPos, [0, 3], [0, 1]);
  const liqAnim = interpolate(frame, [130, 560], [0, liqTarget], { ...DCLAMP, easing: DL_EASE.out });
  const shieldOp = interpolate(frame, [600, 620], [0, 1], DCLAMP);
  const shieldPulse = 0.6 + 0.4 * Math.abs(Math.sin((frame - 600) / 16));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE METHOD // THE DOUBLING LADDER" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 130 }}>
        <Headline at={16} size={54}>Price falls toward liquidation. She does not run.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={52} size={48} italic color={DL.gold}>She doubles the margin, and cuts the leverage.</Headline></div>
      </div>

      {/* ladder rungs */}
      <div style={{ position: 'absolute', top: 360, left: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {RUNGS.map((r, i) => <LadderStep key={i} {...r} active={i === Math.min(3, liqPos)} color={DL.red} />)}
      </div>

      {/* liquidation gauge on the right — pushed down/away */}
      <div style={{ position: 'absolute', top: 360, right: 300, width: 320, height: 350 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint, textAlign: 'center' }}>LIQUIDATION</div>
        <div style={{ position: 'relative', marginTop: 18, height: 300, width: 12, marginLeft: 'auto', marginRight: 'auto', background: `linear-gradient(180deg, ${DL.panel2}, ${DL.red}44)`, borderRadius: 8, border: `1px solid ${DL.border}` }}>
          <div style={{ position: 'absolute', left: -34, right: -34, top: `${interpolate(liqAnim, [0, 1], [10, 88])}%`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 3, background: DL.red }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.red }}>liq</span>
          </div>
        </div>
        <div style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.dim, textAlign: 'center', marginTop: 16 }}>pushed further away, every rung</div>
      </div>

      {/* payoff */}
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: shieldOp }}>
        <div style={{ transform: `scale(${shieldPulse})` }}><ShieldCheck size={46} color={DL.green} /></div>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.green }}>She keeps lowering the bar the market has to clear to pay her.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TLadder;
