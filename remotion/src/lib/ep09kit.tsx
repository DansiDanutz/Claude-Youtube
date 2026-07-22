import React from 'react';
import { useCurrentFrame, interpolate, spring, Img, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';

// ── Ep09 "The Player" — the finale kit. Bets, folds, and the season wall. ──

// A bet ribbon: "BET NO. 3 · AUTHORITY" pinned over an image card.
export const BetTag: React.FC<{ n: number; label: string; at: number; color?: string }> = ({ n, label, at, color = DL.gold }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame: frame - at, fps: 30, config: { damping: 13, mass: 0.7 } });
  const op = interpolate(frame - at, [0, 10], [0, 1], DCLAMP);
  return (
    <div style={{ opacity: op, transform: `scale(${interpolate(p, [0, 1], [0.7, 1])}) rotate(-3deg)`, display: 'inline-block', background: DL.bg, border: `3px solid ${color}`, borderRadius: 12, padding: '10px 26px', boxShadow: `0 12px 34px rgba(0,0,0,0.55), 0 0 24px ${color}33` }}>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color }}>BET NO. {n}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.text, marginLeft: 18 }}>{label}</span>
    </div>
  );
};

// A folded hand: dim row with a FOLDED stamp — the graveyard of almosts.
export const FoldedRow: React.FC<{ text: string; at: number; w?: number }> = ({ text, at, w = 1100 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
  const stamp = interpolate(frame, [at + 18, at + 28], [0, 1], DCLAMP);
  const stampScale = interpolate(frame, [at + 18, at + 30], [1.6, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, position: 'relative', width: w, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '20px 30px', marginBottom: 14 }}>
      <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>{text}</span>
      <div style={{ position: 'absolute', right: 26, top: '50%', transform: `translateY(-50%) rotate(-8deg) scale(${stampScale})`, opacity: stamp * 0.9, border: `2.5px solid ${DL.red}`, borderRadius: 8, padding: '4px 14px' }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 21, letterSpacing: 4, color: DL.red }}>FOLDED</span>
      </div>
    </div>
  );
};

// The season wall: every episode as a named card. The series, laid out.
export const SeasonWall: React.FC<{ items: { img: string; no: string; name: string }[]; at: number; cols?: number; w?: number }> = ({ items, at, cols = 3, w = 430 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${w}px)`, gap: 26, justifyContent: 'center' }}>
      {items.map((it, i) => {
        const a = at + i * 14;
        const p = spring({ frame: frame - a, fps: 30, config: { damping: 15, mass: 0.8 } });
        const op = interpolate(frame - a, [0, 12], [0, 1], DCLAMP);
        return (
          <div key={it.no} style={{ opacity: op, transform: `translateY(${interpolate(p, [0, 1], [46, 0])}px)`, textAlign: 'center' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${DL.border}`, boxShadow: '0 18px 44px rgba(0,0,0,0.55)', background: DL.panel, aspectRatio: '16 / 9' }}>
              {it.img ? (
                <Img src={staticFile(it.img)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: w * 0.09, color: DL.gold }}>tonight</div>
              )}
            </div>
            <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 16, letterSpacing: 4, color: DL.red }}>{it.no}</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 27, color: DL.text, marginTop: 2 }}>{it.name}</div>
          </div>
        );
      })}
    </div>
  );
};

// The table today: agents seated around an ellipse, one chair at the head.
export const TableRound: React.FC<{ at: number; seats: { img: string; name: string; color: string }[]; w?: number; h?: number }> = ({ at, seats, w = 1180, h = 500 }) => {
  const frame = useCurrentFrame();
  const feltIn = interpolate(frame, [at, at + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const rx = w * 0.42, ry = h * 0.36, cx = w / 2, cy = h * 0.52;
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={{ position: 'absolute', left: w * 0.07, top: h * 0.14, width: w * 0.86, height: h * 0.76, borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 42%, #1d5c38 0%, #14432a 55%, #0d2f1e 100%)', border: '10px solid #241c14', boxShadow: 'inset 0 12px 50px rgba(0,0,0,0.55), 0 30px 70px rgba(0,0,0,0.6)', opacity: feltIn }} />
      {seats.map((s, i) => {
        // head of table (index 0) sits bottom-center; the rest fan around the top
        const ang = i === 0 ? Math.PI / 2 : Math.PI + (i / seats.length) * Math.PI * 1.35 + 0.35;
        const x = cx + Math.cos(ang) * rx;
        const y = cy + Math.sin(ang) * ry;
        const a = at + 24 + i * 14;
        const op = interpolate(frame, [a, a + 14], [0, 1], DCLAMP);
        return (
          <div key={s.name} style={{ position: 'absolute', left: x - 62, top: y - 62, width: 124, textAlign: 'center', opacity: op }}>
            <div style={{ width: 96, height: 96, margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${s.color}`, boxShadow: `0 0 22px ${s.color}44`, background: DL.panel }}>
              <Img src={staticFile(s.img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: 8, fontFamily: DL_MONO, fontSize: 17, letterSpacing: 1, color: s.color, textShadow: '0 2px 8px #000' }}>{s.name}</div>
          </div>
        );
      })}
    </div>
  );
};
