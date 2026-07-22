import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 16 — print everything: the journal. Every entry, add, exit, mistake +
// lesson. VO 0.8s (21.9s).
export const compositionConfig = { id: 'TJournal', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const ROWS = [
  { sym: 'BTC/USDT', dir: 'LONG', tag: '20×→5× · 2 scaled', roe: '+141%', win: true },
  { sym: 'ETH/USDT', dir: 'SHORT', tag: '20× · clean', roe: '+93%', win: true },
  { sym: 'SOL/USDT', dir: 'LONG', tag: '20×→1× · full ladder', roe: '−98%', win: false },
  { sym: 'BTC/USDT', dir: 'LONG', tag: '20×→10× · recovered', roe: '+56%', win: true },
];

const TJournal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE PROOF // PRINT EVERYTHING" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130 }}>
        <Headline at={20} size={54}>The rule Dan gave her: <span style={{ color: DL.gold }}>print everything.</span></Headline>
        <div style={{ marginTop: 8 }}><Headline at={54} size={40} italic color={DL.warm}>Every entry, every double-down, every exit — and every loss.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 460, right: 460, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ROWS.map((r, i) => {
          const at = 150 + i * 30;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 18], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
          const col = r.win ? DL.green : DL.red;
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${r.win ? DL.border : `${DL.red}55`}`, borderRadius: 14, padding: '18px 28px' }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DL.text, width: 200 }}>{r.sym}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 22, color: r.dir === 'LONG' ? DL.green : DL.red, width: 90 }}>{r.dir}</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.dim, flex: 1 }}>{r.tag}</span>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: col, width: 120, textAlign: 'right' }}>{r.roe}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 20, color: col, border: `1px solid ${col}`, borderRadius: 999, padding: '4px 14px' }}>{r.win ? 'WIN' : 'LOSS'}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 440], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>No hidden trades. No quiet deletions. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>If you can read her whole book — maybe you can trust her.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TJournal;
