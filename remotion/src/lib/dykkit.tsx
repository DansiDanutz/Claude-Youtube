// Did You Know That? — episode kit. Episode art direction reuses the DansLab design system
// (lib/danslab.tsx); channel branding (logo, HUD badge, intro, end screen) comes from lib/dytbrand.tsx.
// Same tokens, fonts, SiteBg, logo and easings as the main series; this file only
// adds what a "Did You Know" episode needs: word-synced cues from the Brian
// alignment JSON, the era header, the bottom HUD with a live year counter, the
// seven-node timeline, fact cards and a few reusable illustrations.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';
import { DytLogo, DYT_DISPLAY } from './dytbrand';

export const FPS = 30;
export const SERIES = 'DID YOU KNOW THAT?';

type Word = { w: string; s: number; e: number };
type VoScene = { dur: number; words: Word[] };

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

// Cue helper: frames are relative to the shot; offsetSec is where the VO line
// starts inside the shot (the same offset build_final.py uses to place it).
// at('Strasbourg') = frame the word starts. Throws on a missing word so a script
// edit can never silently desync a reveal.
export const makeCue = (vo: Record<string, VoScene>, id: string, offsetSec: number) => {
  const scene = vo[id];
  if (!scene) throw new Error(`vo scene missing: ${id}`);
  const at = (token: string, nth = 1, edge: 's' | 'e' = 's') => {
    const want = norm(token);
    let seen = 0;
    for (const w of scene.words) {
      if (norm(w.w) === want && ++seen === nth) return Math.round((offsetSec + w[edge]) * FPS);
    }
    throw new Error(`cue "${token}"#${nth} not in ${id}`);
  };
  return { at, end: Math.round((offsetSec + scene.dur) * FPS), start: Math.round(offsetSec * FPS) };
};

export const ease = (frame: number, a: number, b: number, from = 0, to = 1, curve = DL_EASE.out) =>
  interpolate(frame, [a, b], [from, to], { ...DCLAMP, easing: curve });

export const rise = (frame: number, at: number, dist = 26, dur = 15) => ({
  opacity: ease(frame, at, at + dur),
  transform: `translateY(${ease(frame, at, at + dur, dist, 0)}px)`,
});

// Shot-level fade in/out so concatenated shots cut cleanly. Neither the first nor the last
// frame is fully black, so a join never holds two black frames (a visible blink).
export const useShotFade = (durationInFrames: number, inF = 2, outF = 3) => {
  const f = useCurrentFrame();
  return Math.min(ease(f, -1, inF), ease(f, durationInFrames - outF, durationInFrames, 1, 0, DL_EASE.in));
};

// ── Era header: the year slams in big at centre — with "YOU WAKE UP IN" above it and the
// place below (the series opener for every era) — then docks top-left beside its kicker.
// Docked state owns y 60–150 so content starts at y ≥ 190.
export const EraHeader: React.FC<{ year: string; idx: number; label: string; dockAt?: number; place?: React.ReactNode }> = ({ year, idx, label, dockAt = 26, place }) => {
  const f = useCurrentFrame();
  const slam = ease(f, 0, 10, 1.25, 1);
  const dock = ease(f, dockAt, dockAt + 18, 0, 1, DL_EASE.inOut);
  const scale = slam * (1 - dock * 0.74);
  const tx = (1 - dock) * 640;
  const ty = (1 - dock) * 300;
  const kick = ease(f, dockAt + 10, dockAt + 24);
  const wake = place ? ease(f, 2, 14) * (1 - ease(f, dockAt - 6, dockAt + 6)) : 0;
  return (
    <>
      {place && (
        <>
          <div style={{ position: 'absolute', top: 290, left: 0, right: 0, textAlign: 'center', opacity: wake, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 12, color: DL.dim }}>YOU WAKE UP IN</div>
          <div style={{ position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center', opacity: wake, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 54, color: DL.warm }}>{place}</div>
        </>
      )}
      <div style={{ position: 'absolute', left: 120, top: 56, transformOrigin: 'top left', transform: `translate(${tx}px, ${ty}px) scale(${scale})`, opacity: ease(f, 0, 6) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 250, lineHeight: 1, color: DL.gold, letterSpacing: -4 }}>{year}</span>
      </div>
      <div style={{ position: 'absolute', top: 92, left: 330, right: 120, display: 'flex', alignItems: 'center', gap: 26, opacity: kick }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.red }}>ERA {idx} / 7</span>
        <div style={{ flex: 1, height: 1, background: DL.border }} />
        <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted }}>{label}</span>
      </div>
    </>
  );
};

// ── "Did you know that…" — the channel's name as a ritual inside every era: one
// surprising, sourced fact on a neon brand card. Visible from `at` until `out`.
export const DidYouKnowThat: React.FC<{ at: number; out: number; source?: string; children: React.ReactNode }> = ({ at, out, source, children }) => {
  const f = useCurrentFrame();
  const op = ease(f, at - 4, at + 8) * (1 - ease(f, out - 10, out));
  const pop = interpolate(f, [at - 4, at + 10], [0.9, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ opacity: op, alignItems: 'center', justifyContent: 'center', background: `rgba(5,4,4,${0.55 * op})` }}>
      <div style={{ transform: `scale(${pop})`, width: 1380, padding: '46px 60px', borderRadius: 30, background: '#0b1030ee', border: '4px solid transparent', backgroundImage: `linear-gradient(#0b1030f2, #0b1030f2), linear-gradient(90deg, #3b82f6, #8b5cf6, #ff3db4, #ff9a1f, #34d058)`, backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', boxShadow: '0 0 60px #ff3db455, 0 0 120px #3b82f633' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <DytLogo size={74} />
          <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 52, letterSpacing: 1, color: '#ffffff', textShadow: '0 0 20px #ff3db4aa' }}>DID YOU KNOW THAT…</span>
        </div>
        <div style={{ marginTop: 28, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 56, lineHeight: 1.18, color: '#ffffff' }}>{children}</div>
        {source && <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 20, color: '#9aa0cc' }}>{source}</div>}
      </div>
    </AbsoluteFill>
  );
};

// ── Day Clock: a 24-hour ring of how one person's day was spent (illustration from
// historical accounts — labelled as such). Segments draw in from `at`; `hot` pulses.
export type DaySeg = { from: number; to: number; label: string; color: string };
// hotSeq: [segment, frame][] — the highlight moves to each segment on the word that names it.
// step: frames between segments/rows drawing in (keep the ui-click ticks on the same step).
export const DayClock: React.FC<{ year: string; segs: DaySeg[]; at: number; hot?: number; hotAt?: number; hotSeq?: [number, number][]; step?: number; size?: number }> = ({ year, segs, at, hot: hotIn = -1, hotAt: hotAtIn = 0, hotSeq, step = 6, size = 470 }) => {
  const f = useCurrentFrame();
  const cur = hotSeq ? hotSeq.filter(([, t]) => f >= t - 2).pop() : undefined;
  const hot = hotSeq ? (cur ? cur[0] : -1) : hotIn;
  const hotAt = hotSeq ? (cur ? cur[1] : 0) : hotAtIn;
  const c = size / 2, r = c - 30, sw = 46;
  const arc = (a0: number, a1: number) => {
    const p = (a: number) => [c + Math.sin((a / 24) * Math.PI * 2) * r, c - Math.cos((a / 24) * Math.PI * 2) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    const span = (a1 - a0 + 24) % 24 || 24;
    return `M${x0} ${y0} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x1} ${y1}`;
  };
  const pulse = f > hotAt ? 0.5 + 0.5 * Math.cos((f - hotAt) / 5) : 0; // peaks on the word
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 50, opacity: ease(f, at - 6, at + 6) }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke={DL.panel2} strokeWidth={sw} />
        {segs.map((s, i) => {
          const g = ease(f, at + i * step, at + i * step + 14);
          const to = s.from + (((s.to - s.from + 24) % 24) || 24) * g;
          const isHot = i === hot;
          return <path key={i} d={arc(s.from, to)} fill="none" stroke={s.color} strokeWidth={isHot ? sw + 10 * pulse : sw - 4} opacity={isHot ? 1 : 0.85} style={{ filter: isHot ? `drop-shadow(0 0 ${14 * pulse}px ${s.color})` : undefined }} />;
        })}
        {[0, 6, 12, 18].map((h) => {
          const a = (h / 24) * Math.PI * 2, rr = r - sw / 2 - 22;
          return <text key={h} x={c + Math.sin(a) * rr} y={c - Math.cos(a) * rr + 8} textAnchor="middle" fill={DL.muted} fontFamily={DL_MONO} fontSize={22}>{String(h).padStart(2, '0')}</text>;
        })}
        <text x={c} y={c - 6} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={22} letterSpacing={4}>A DAY IN</text>
        <text x={c} y={c + 46} textAnchor="middle" fill={DL.gold} fontFamily={DL_SERIF} fontSize={52}>{year}</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {segs.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, at + i * step, at + i * step + 10) }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: s.color, boxShadow: i === hot ? `0 0 ${16 * pulse}px ${s.color}` : undefined }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.muted, width: 150 }}>{String(s.from).padStart(2, '0')}–{String(s.to).padStart(2, '0')}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 32, color: i === hot ? DL.text : DL.warm, fontWeight: i === hot ? 600 : 400 }}>{s.label}</span>
          </div>
        ))}
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 20, color: DL.muted }}>ILLUSTRATION · BASED ON HISTORICAL ACCOUNTS</div>
      </div>
    </div>
  );
};

// ── Week Strip: seven days, bar height = share of the day worked; a tagged day glows.
export type WeekDay = { d: string; work: number; color: string; tag?: string };
export const WeekStrip: React.FC<{ year: string; days: WeekDay[]; at: number; hot?: number; hotAt?: number; step?: number }> = ({ year, days, at, hot = -1, hotAt = 0, step = 4 }) => {
  const f = useCurrentFrame();
  const pulse = f > hotAt ? 0.5 + 0.5 * Math.sin((f - hotAt) / 5) : 0;
  return (
    <div style={{ opacity: ease(f, at - 6, at + 6) }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.dim }}>A WEEK IN <span style={{ color: DL.gold }}>{year}</span></div>
      {/* tags own a row well below the heading (≥ 40 px) and point down at their bar */}
      <div style={{ display: 'flex', gap: 18, marginTop: 44, alignItems: 'flex-end', height: 352 }}>
        {days.map((d, i) => {
          const g = ease(f, at + i * step, at + i * step + 14);
          const isHot = i === hot;
          return (
            <div key={d.d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ height: 62, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: d.color, opacity: d.tag ? ease(f, hotAt - 2, hotAt + 8) : 0, whiteSpace: 'nowrap' }}>
                <span>{d.tag ?? ''}</span>
                <span style={{ fontSize: 16, lineHeight: 1, marginTop: 4 }}>{d.tag ? '▼' : ''}</span>
              </div>
              <div style={{ width: 110, height: 260, borderRadius: 12, background: DL.panel2, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', boxShadow: isHot ? `0 0 ${30 * pulse}px ${d.color}` : undefined, border: `2px solid ${isHot ? d.color : DL.border}` }}>
                <div style={{ width: '100%', height: `${Math.max(4, d.work * 100 * g)}%`, background: d.color, opacity: 0.85 }} />
              </div>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: isHot ? DL.text : DL.muted }}>{d.d}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 20, color: DL.muted }}>BAR = SHARE OF THE DAY SPENT WORKING · ILLUSTRATION</div>
    </div>
  );
};

// ── Cliffhanger band: the open loop into the next era (bottom, above the HUD).
// The band and its NEXT pill appear ON the first part's word, never before it; each part of
// the line fades in ON the spoken word that completes it (no pre-roll), so the text can never
// reveal a word before the narrator says it.
export type CliffPart = { text: React.ReactNode; at: number };
export const Cliffhanger: React.FC<{ next: string; parts: CliffPart[] }> = ({ next, parts }) => {
  const f = useCurrentFrame();
  const at = parts[0].at;
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 132, display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, at, at + 10), transform: `translateY(${ease(f, at, at + 12, 20, 0)}px)` }}>
      <div style={{ flex: 1, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, lineHeight: 1.2, color: DL.text }}>
        {parts.map((p, i) => <span key={i} style={{ opacity: ease(f, p.at, p.at + 8) }}>{i > 0 ? ' ' : ''}{p.text}</span>)}
      </div>
      <div style={{ padding: '14px 24px', borderRadius: 999, border: `2px solid ${DL.red}`, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.red, whiteSpace: 'nowrap' }}>NEXT ▸ {next}</div>
    </div>
  );
};

// ── Era exit: a 0.9 s pull-in over the last frames so the exit reverse-whoosh has motion.
export const EXIT_PULL_FRAMES = 28;
export const EraExit: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const pull = ease(f, dur - EXIT_PULL_FRAMES, dur - 1, 0, 1, DL_EASE.in);
  return <AbsoluteFill style={{ transform: `scale(${1 + pull * 0.06})` }}>{children}</AbsoluteFill>;
};

// ── Bottom HUD (bottom 70px reserved): wordmark + series · era year.
// The year snaps to the era's year: it must never show an in-between year under the big header.
export const EraHud: React.FC<{ year: number; prediction?: boolean }> = ({ year, prediction = false }) => {
  const f = useCurrentFrame();
  const op = ease(f, 2, 14);
  return (
    <div style={{ position: 'absolute', left: 96, right: 96, bottom: 54, height: 56, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 28, borderTop: `1px solid ${DL.border}`, background: '#05040499', opacity: op }}>
      <DytLogo size={40} />
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 24, letterSpacing: 1, color: DL.text }}>{SERIES}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 5, color: DL.faint }}>NO. 01</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 22, letterSpacing: 1, color: DL.gold }}>Dexty.live</span>
      {prediction && <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 4, color: DL.red }}>PREDICTION</span>}
      <span style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 5, color: DL.faint }}>YEAR</span>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.gold, fontVariantNumeric: 'tabular-nums', minWidth: 80, textAlign: 'right' }}>{year}</span>
    </div>
  );
};

// ── The seven-century spine. revealAt[i] = frame node i appears; active = lit node.
export const YEARS = [1500, 1600, 1700, 1800, 1900, 2000, 2100];
export const Timeline7: React.FC<{ revealAt: number[]; active?: number; w?: number; activeAt?: number }> = ({ revealAt, active = -1, w = 1560, activeAt = 0 }) => {
  const f = useCurrentFrame();
  const gap = w / (YEARS.length - 1);
  const lineEnd = revealAt[revealAt.length - 1] + 10;
  const draw = ease(f, revealAt[0] - 6, lineEnd, 0, 1, DL_EASE.inOut);
  return (
    <div style={{ position: 'relative', width: w, height: 150 }}>
      <div style={{ position: 'absolute', left: 0, top: 60, height: 3, width: w * draw, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, borderRadius: 2 }} />
      {YEARS.map((y, i) => {
        const at = revealAt[i];
        const pop = interpolate(f, [at, at + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
        const isLast = i === YEARS.length - 1;
        const lit = i === active ? ease(f, activeAt, activeAt + 12) : 0;
        const size = 22 + lit * 14;
        return (
          <div key={y} style={{ position: 'absolute', left: i * gap, top: 0, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: pop }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: isLast ? DL.red : DL.dim, height: 34 }}>{isLast ? 'PREDICTION' : ''}</span>
            <div style={{ marginTop: 61 - 34 - size / 2, width: size, height: size, borderRadius: '50%', background: isLast ? DL.bg : (lit ? DL.gold : DL.panel2), border: `3px ${isLast ? 'dashed' : 'solid'} ${isLast ? DL.red : DL.gold}`, transform: `scale(${0.6 + 0.4 * pop})`, boxShadow: lit ? `0 0 ${26 * lit}px ${DL.gold}aa` : undefined }} />
            <span style={{ marginTop: 16, fontFamily: DL_SERIF, fontSize: 40 + lit * 8, color: lit ? DL.gold : DL.text }}>{y}</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Fact card: label (mono ≥24px), value (serif), optional source line.
export const FactCard: React.FC<{ label: string; value: React.ReactNode; sub?: string; source?: string; at: number; accent?: string; w?: number }> = ({ label, value, sub, source, at, accent = DL.gold, w = 560 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ ...rise(f, at), width: w, padding: '28px 34px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${accent}`, borderRadius: 14 }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>{label}</div>
      <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, lineHeight: 1.05, color: accent, marginTop: 10 }}>{value}</div>
      {sub && <div style={{ fontFamily: DL_SANS, fontSize: 28, lineHeight: 1.4, color: DL.warm, marginTop: 10 }}>{sub}</div>}
      {source && <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.muted, marginTop: 14 }}>{source}</div>}
    </div>
  );
};

// ── Analogue clock face. Hands driven by explicit angles so a shot can spin,
// freeze or tick them deterministically.
export const ClockFace: React.FC<{ size?: number; hourDeg: number; minDeg: number; showMinute?: boolean; ring?: string }> = ({ size = 360, hourDeg, minDeg, showMinute = true, ring = DL.gold }) => {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={c - 6} fill={DL.panel} stroke={ring} strokeWidth={5} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = c - 22, r2 = c - (i % 3 === 0 ? 48 : 36);
        return <line key={i} x1={c + Math.sin(a) * r1} y1={c - Math.cos(a) * r1} x2={c + Math.sin(a) * r2} y2={c - Math.cos(a) * r2} stroke={i % 3 === 0 ? DL.text : DL.muted} strokeWidth={i % 3 === 0 ? 6 : 3} strokeLinecap="round" />;
      })}
      <line x1={c} y1={c} x2={c + Math.sin((hourDeg * Math.PI) / 180) * c * 0.48} y2={c - Math.cos((hourDeg * Math.PI) / 180) * c * 0.48} stroke={DL.text} strokeWidth={10} strokeLinecap="round" />
      {showMinute && <line x1={c} y1={c} x2={c + Math.sin((minDeg * Math.PI) / 180) * c * 0.72} y2={c - Math.cos((minDeg * Math.PI) / 180) * c * 0.72} stroke={DL.red} strokeWidth={6} strokeLinecap="round" />}
      <circle cx={c} cy={c} r={11} fill={DL.gold} />
    </svg>
  );
};

// ── The signature "compression" treatment: text whose letters squeeze together.
export const Squeeze: React.FC<{ text: string; at: number; size?: number; color?: string; amount?: number; origin?: string }> = ({ text, at, size = 120, color = DL.gold, amount = 0.42, origin = 'center' }) => {
  const f = useCurrentFrame();
  const sq = ease(f, at, at + 26, 0, 1, DL_EASE.inOut);
  return (
    <span style={{ display: 'inline-block', fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: size, color, letterSpacing: `${0.08 - sq * 0.1}em`, transform: `scaleX(${1 - sq * amount})`, transformOrigin: origin, whiteSpace: 'nowrap' }}>{text}</span>
  );
};

// ── Era backdrop: DansLab SiteBg with a per-era glow and a soft vignette.
export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, #000000b0 100%)', pointerEvents: 'none' }} />
);
