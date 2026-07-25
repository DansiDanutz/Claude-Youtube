import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP } from './danslab';

// Ep10 — "The Payroll". The episode is an accumulating bill, so its signature
// device is a ledger that GROWS: each cost flies in as a named chip and the
// running total counts up to meet it. Nothing appears before the VO names it.

const rise = (frame: number, at: number, d = 16) => ({
  opacity: interpolate(frame, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
  transform: `translateY(${interpolate(frame, [at, at + d], [26, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
});

/** Money, counted up. One counting number on screen at a time (design system §4). */
export const Counter: React.FC<{
  to: number; at: number; dur?: number; size?: number; color?: string; prefix?: string;
}> = ({ to, at, dur = 40, size = 150, color = DL.gold, prefix = '$' }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + dur], [0, to], { ...DCLAMP, easing: DL_EASE.inOut });
  return (
    <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: size, color, letterSpacing: -2 }}>
      {prefix}{Math.round(v).toLocaleString('en-US')}
    </span>
  );
};

export type Line = { label: string; note?: string; amount: number; at: number; color?: string };

/**
 * The spend ledger. `lines` land one at a time on their `at` frame — the chip
 * slides in from the right and the total springs up by that amount, so the
 * number always moves on the word.
 */
export const SpendLedger: React.FC<{
  lines: Line[]; title?: string; totalAt?: number; showTotal?: boolean;
}> = ({ lines, title = 'MONTHLY SPEND', showTotal = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // total = sum of every line whose moment has passed, eased in per line
  let total = 0;
  for (const l of lines) {
    const t = spring({ frame: frame - l.at, fps, config: { damping: 200, mass: 0.6 } });
    total += l.amount * t;
  }

  return (
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      {/* the bill */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 980 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 5, color: DL.faint }}>{title}</div>
        {lines.map((l) => {
          const x = interpolate(frame, [l.at, l.at + 18], [90, 0], { ...DCLAMP, easing: DL_EASE.out });
          const op = interpolate(frame, [l.at, l.at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={l.label} style={{
              opacity: op, transform: `translateX(${x}px)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${l.color ?? DL.gold}`,
              borderRadius: 14, padding: '20px 28px',
            }}>
              <div>
                <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text }}>{l.label}</div>
                {l.note && <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.muted, marginTop: 4 }}>{l.note}</div>}
              </div>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: l.color ?? DL.gold }}>
                +${l.amount.toLocaleString('en-US')}
              </div>
            </div>
          );
        })}
      </div>

      {/* the running total */}
      {showTotal && (
        <div style={{
          position: 'sticky', top: 0, background: DL.panel2, border: `1px solid ${DL.border}`,
          borderRadius: 20, padding: '34px 42px', minWidth: 480,
        }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 5, color: DL.faint }}>RUNNING TOTAL</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 96, color: DL.gold, marginTop: 12, letterSpacing: -2 }}>
            ${Math.round(total).toLocaleString('en-US')}
          </div>
          <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 8 }}>per month</div>
        </div>
      )}
    </div>
  );
};

/** Two figures against each other — the human bill vs this one. */
export const VersusRow: React.FC<{
  label: string; human: string; danslab: string; at: number; big?: boolean;
}> = ({ label, human, danslab, at, big = false }) => {
  const frame = useCurrentFrame();
  const s = big ? 56 : 40;
  return (
    <div style={{
      ...rise(frame, at, 14),
      display: 'grid', gridTemplateColumns: '620px 380px 380px', alignItems: 'center',
      gap: 40, padding: '18px 0', borderBottom: `1px solid ${DL.border}`,
    }}>
      <div style={{ fontFamily: DL_SANS, fontSize: 34, color: DL.text }}>{label}</div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: s, color: DL.red, textAlign: 'right' }}>{human}</div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: s, color: DL.gold, textAlign: 'right' }}>{danslab}</div>
    </div>
  );
};

/** One worker's rate, revealed on their name. */
export const WorkerRow: React.FC<{
  name: string; role: string; rate: string; human: string; mult: string; at: number; hot?: boolean;
}> = ({ name, role, rate, human, mult, at, hot = false }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      ...rise(frame, at, 14),
      display: 'grid', gridTemplateColumns: '460px 300px 300px 260px', alignItems: 'center', gap: 30,
      background: hot ? 'rgba(212,160,23,0.08)' : DL.panel,
      border: `1px solid ${hot ? DL.gold : DL.border}`, borderRadius: 14, padding: '18px 28px',
    }}>
      <div>
        <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: hot ? DL.gold : DL.text, textTransform: 'capitalize' }}>{name}</div>
        <div style={{ fontFamily: DL_SANS, fontSize: 22, color: DL.muted, marginTop: 2 }}>{role}</div>
      </div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.gold, textAlign: 'right' }}>{rate}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.red, textAlign: 'right' }}>{human}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim, textAlign: 'right' }}>{mult}</div>
    </div>
  );
};

/** The big multiplier slam — one number, held. */
export const Slam: React.FC<{ value: string; sub: string; at: number }> = ({ value, sub, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 200, mass: 0.5 } });
  const op = interpolate(frame, [at, at + 10], [0, 1], DCLAMP);
  return (
    <div style={{ textAlign: 'center', opacity: op, transform: `scale(${0.9 + s * 0.1})` }}>
      <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 260, color: DL.gold, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 8, color: DL.red, textTransform: 'uppercase', marginTop: 18 }}>{sub}</div>
    </div>
  );
};

/**
 * A photograph, never raw. Perspective tilt + frame + slow push, so a still
 * reads as a shot rather than a slide. Entrance is on the wrapper and the
 * Ken Burns on the inner img, so the two transforms never fight.
 */
export const ImagePlate: React.FC<{
  src: string; at: number; w?: number; h?: number; tilt?: number; caption?: string;
}> = ({ src, at, w = 900, h = 506, tilt = -7, caption }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const x = interpolate(frame, [at, at + 24], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  const push = interpolate(frame, [at, at + 300], [1, 1.07], DCLAMP);
  return (
    <div style={{ opacity: op, transform: `translateX(${x}px)`, perspective: 1400 }}>
      <div style={{
        width: w, height: h, overflow: 'hidden', borderRadius: 16,
        border: `1px solid ${DL.border}`, transform: `rotateY(${tilt}deg)`,
        boxShadow: '0 40px 90px rgba(0,0,0,0.75)',
      }}>
        <img src={src} alt="" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: `scale(${push})`, filter: 'saturate(0.82) contrast(1.06) brightness(0.92)',
        }} />
      </div>
      {caption && (
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.faint, marginTop: 16, textTransform: 'uppercase' }}>
          {caption}
        </div>
      )}
    </div>
  );
};

/**
 * Full-bleed photograph as a *ground*, not a subject: graded to the palette,
 * pushed slowly, and vignetted hard so headline type stays legible on top.
 */
export const ImageBackdrop: React.FC<{ src: string; at?: number; dim?: number }> = ({ src, at = 0, dim = 0.72 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 30], [0, 1], DCLAMP);
  const push = interpolate(frame, [at, at + 600], [1.04, 1.14], DCLAMP);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, overflow: 'hidden' }}>
      <img src={src} alt="" style={{
        width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${push})`,
        filter: 'saturate(0.55) contrast(1.1) brightness(0.6)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 70% at 50% 50%, rgba(5,4,4,${dim - 0.35}) 0%, rgba(5,4,4,${dim + 0.2}) 100%)`,
      }} />
    </div>
  );
};
