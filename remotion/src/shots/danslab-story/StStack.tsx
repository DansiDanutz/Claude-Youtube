import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Cutout } from '../../lib/danslab';

// =============================================================================
// $100 Stack 5/8 — the payoff build. The four line items of the stack tick in
// on a mono ledger and total $100/mo; leo (the scrappy builder) presents.
// =============================================================================
export const compositionConfig = { id: 'StStack', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const ITEMS = [
  { name: 'Claude Code', note: 'the engineer', price: '$20', at: 84 },
  { name: 'Cursor', note: 'the pair', price: '$20', at: 116 },
  { name: 'Vercel', note: 'ship + host', price: '$20', at: 148 },
  { name: 'APIs + infra', note: 'the plumbing', price: '$40', at: 180 },
];
const TOTAL = 244;

const StStack: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const totalOp = interpolate(frame, [TOTAL, TOTAL + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const totalPop = interpolate(frame, [TOTAL, TOTAL + 16], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="04" label="THE NEW WAY // THE $100 STACK" />

      {/* left: the ledger */}
      <div style={{ position: 'absolute', top: 210, left: 120, width: 900 }}>
        <div style={{ ...rise(8, 20), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 62, color: DL.text, marginBottom: 34 }}>
          The whole stack fits in <span style={{ fontStyle: 'italic', color: DL.gold }}>a hundred bucks.</span>
        </div>

        {ITEMS.map((it) => {
          const op = interpolate(frame, [it.at, it.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [it.at, it.at + 13], [-24, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={it.name} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'baseline', gap: 20, padding: '18px 0', borderBottom: `1px solid ${DL.border}` }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.text, minWidth: 340 }}>{it.name}</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.faint, flex: 1 }}>{it.note}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.gold }}>{it.price}</span>
            </div>
          );
        })}

        <div style={{ opacity: totalOp, transform: `scale(${totalPop})`, transformOrigin: 'left', display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 26 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim, minWidth: 340 }}>TOTAL</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 84, color: DL.green }}>$100</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.muted }}>/ mo</span>
        </div>
      </div>

      {/* right: the builder */}
      <div style={{ position: 'absolute', right: 160, bottom: 0, display: 'flex', alignItems: 'flex-end', height: 820 }}>
        <Cutout src={staticFile('projects/danslab-story/characters/leo.png')} h={720} start={40} flip />
      </div>
    </AbsoluteFill>
  );
};
export default StStack;
