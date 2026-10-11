import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, Squeeze, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 1/13 — cold open (Law 1: concrete paradox on screen at frame 0).
// Left: 1500, a message crawling Rome→London at horse pace. Right: today, a
// pulse crossing the Atlantic in <0.1 s. Then the paradox (time saved vs time
// running out) and the question, with "compressing" squeezing on its word.
// VO tc01 @0.6s, tc02 @9.9s. Facts: RESEARCH F1, F14.
// =============================================================================
export const compositionConfig = { id: 'TcHook', durationInSeconds: 24.8333, fps: 30, width: 1920, height: 1080 };

const A = makeCue(vo, 'tc01-hook', 0.5);
const B = makeCue(vo, 'tc02-question', 11.44);

const HORSE = A.at('horse');
const TODAY = A.at('Today');
const ATLANTIC = A.at('Atlantic');
const TENTH = A.at('tenth');
const SPLIT_OUT = B.start - 10;
const SAVED = B.at('saved');
const RUNNING = B.at('running');
const SOWHY = B.at('So');
const DYK = B.at('Did');
const COMPRESS = B.at('compressing');
const FIVE = B.at('five');
// half the width of "yet" + hourglass column + both gaps: the arrow's offset from the row's centre
const ARROW_SHIFT = 312;

const Route: React.FC<{ from: string; to: string; x1: number; x2: number; dotX: number; color: string; dashed?: boolean; water?: boolean }> = ({ from, to, x1, x2, dotX, color, dashed = false, water = false }) => (
  <svg width={760} height={300} viewBox="0 0 760 300">
    {water && <rect x={150} y={90} width={460} height={120} rx={60} fill="#38bdf80d" stroke="#38bdf833" strokeWidth={2} />}
    {water && <text x={380} y={232} textAnchor="middle" fill={DL.faint} fontFamily={DL_MONO} fontSize={20} letterSpacing={6}>ATLANTIC</text>}
    <line x1={x1} y1={150} x2={x2} y2={150} stroke={DL.border} strokeWidth={4} strokeDasharray={dashed ? '10 12' : undefined} />
    <circle cx={x1} cy={150} r={12} fill={DL.text} />
    <circle cx={x2} cy={150} r={12} fill={DL.text} />
    <text x={x1} y={112} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={3}>{from}</text>
    <text x={x2} y={112} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={3}>{to}</text>
    <circle cx={dotX} cy={150} r={16} fill={color} />
    <circle cx={dotX} cy={150} r={30} fill={color} opacity={0.18} />
  </svg>
);

const Hourglass: React.FC<{ level: number; size?: number }> = ({ level, size = 260 }) => {
  // level 1 = top full, 0 = top empty
  const top = 110 * level;
  return (
    <svg width={size * 0.62} height={size} viewBox="0 0 160 260">
      <path d="M20 10 H140 L86 128 L140 250 H20 L74 128 Z" fill="none" stroke={DL.gold} strokeWidth={6} strokeLinejoin="round" />
      <clipPath id="tcTop"><path d="M26 16 H134 L82 124 H78 Z" /></clipPath>
      <rect x={0} y={124 - top} width={160} height={top} fill={DL.red} clipPath="url(#tcTop)" />
      <clipPath id="tcBot"><path d="M78 132 H82 L134 244 H26 Z" /></clipPath>
      <rect x={0} y={244 - 112 * (1 - level)} width={160} height={112 * (1 - level)} fill={DL.red} clipPath="url(#tcBot)" />
      <line x1={80} y1={124} x2={80} y2={244} stroke={DL.red} strokeWidth={level > 0.02 ? 3 : 0} />
    </svg>
  );
};

const TcHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ease(f, 745 - 3, 745, 1, 0); // no fade-in: the paradox is on screen at frame 0 (Law 1)

  // left: the message crawls at horse pace for the whole first beat
  const horseX = interpolate(f, [0, SPLIT_OUT], [110, 330], DCLAMP);
  // right: pulse loops every 20 frames once the line is lit
  const pulseOn = f >= ATLANTIC;
  const loop = ((f - ATLANTIC) % 20) / 20;
  const pulseX = pulseOn ? 110 + loop * 540 : 110;
  const rightLit = ease(f, TODAY - 4, TODAY + 10, 0.35, 1);
  const split = ease(f, SPLIT_OUT, SPLIT_OUT + 16, 1, 0, DL_EASE.in);

  const sandLevel = interpolate(f, [RUNNING, RUNNING + 70], [0.85, 0.25], { ...DCLAMP, easing: DL_EASE.inOut });
  const paradoxOut = ease(f, DYK - 14, DYK, 1, 0, DL_EASE.in);
  const rulerSq = ease(f, FIVE, FIVE + 30, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1408" />
      <Vignette />

      {/* ── beat 1: the split screen (concrete at frame 0) */}
      <AbsoluteFill style={{ opacity: split }}>
        <div style={{ position: 'absolute', left: 959, top: 140, bottom: 140, width: 2, background: DL.border }} />
        <div style={{ position: 'absolute', left: 100, top: 150, width: 760, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: DL.gold, lineHeight: 1 }}>1500</span>
          <div style={{ marginTop: 40 }}><Route from="ROME" to="LONDON" x1={110} x2={650} dotX={horseX} color={DL.gold} dashed /></div>
          <div style={{ ...rise(f, HORSE - 2), marginTop: 10, display: 'flex', gap: 22, alignItems: 'baseline' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>FASTEST MESSAGE</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>a horse</span>
          </div>
          <div style={{ ...rise(f, HORSE + 10), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.gold, marginTop: 8 }}>≈ WEEKS</div>
        </div>
        <div style={{ position: 'absolute', left: 1060, top: 150, width: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: rightLit }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: DL.text, lineHeight: 1 }}>Today</span>
          <div style={{ marginTop: 40 }}><Route from="LONDON" to="NEW YORK" x1={110} x2={650} dotX={pulseX} color={DL.red} water /></div>
          <div style={{ ...rise(f, ATLANTIC + 4), marginTop: 10, display: 'flex', gap: 22, alignItems: 'baseline' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>FASTEST MESSAGE</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>light</span>
          </div>
          <div style={{ ...rise(f, TENTH), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.red, marginTop: 8 }}>{'< 0.1 SECONDS'}</div>
        </div>
      </AbsoluteFill>

      {/* ── beat 2: the paradox — time saved vs time running out */}
      <AbsoluteFill style={{ opacity: paradoxOut, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 120 }}>
          {/* the arrow sits centred alone until "So", then slides left to make room */}
          <div style={{ opacity: rise(f, SAVED).opacity, transform: `translate(${ARROW_SHIFT * (1 - ease(f, SOWHY - 4, SOWHY + 8, 0, 1, DL_EASE.inOut))}px, ${ease(f, SAVED, SAVED + 15, 26, 0)}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <svg width={200} height={240} viewBox="0 0 200 240">
              {(() => {
                const tip = 230 - ease(f, SAVED, SAVED + 30, 20, 200);
                return (
                  <>
                    <path d={`M100 230 L100 ${tip}`} stroke={DL.green} strokeWidth={14} strokeLinecap="round" />
                    <path d={`M56 ${tip + 46} L100 ${tip} L144 ${tip + 46}`} stroke={DL.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                );
              })()}
            </svg>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.green }}>TIME SAVED</span>
          </div>
          <span style={{ ...rise(f, SOWHY - 4), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 90, color: DL.dim }}>yet</span>
          <div style={{ ...rise(f, SOWHY + 4), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <Hourglass level={sandLevel} size={240} />
            <span style={{ opacity: ease(f, RUNNING - 4, RUNNING + 8), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.red }}>RUNNING OUT</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── beat 3: the question */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, DYK, DYK + 12) }}>
        <div style={{ ...rise(f, DYK), fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.red }}>DID YOU KNOW THAT…</div>
        <div style={{ ...rise(f, DYK + 8), marginTop: 26, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, color: DL.text, textAlign: 'center', lineHeight: 1.1 }}>
          Time itself has been
        </div>
        <div style={{ ...rise(f, COMPRESS - 6), marginTop: 6, height: 150, width: 1400, display: 'flex', justifyContent: 'center' }}>
          <Squeeze text="compressing." at={COMPRESS + 4} size={140} amount={0.38} />
        </div>
        <div style={{ ...rise(f, FIVE - 2), marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <svg width={1100} height={60} viewBox="0 0 1100 60">
            <line x1={0} y1={30} x2={1100} y2={30} stroke={DL.border} strokeWidth={3} />
            {Array.from({ length: 26 }, (_, i) => {
              const t = i / 25;
              const squeezed = 1 - Math.pow(1 - t, 1 + rulerSq * 2.2);
              return <line key={i} x1={squeezed * 1100} y1={i % 5 === 0 ? 8 : 18} x2={squeezed * 1100} y2={i % 5 === 0 ? 52 : 42} stroke={i % 5 === 0 ? DL.gold : DL.muted} strokeWidth={i % 5 === 0 ? 4 : 2} />;
            })}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 1100, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4 }}>
            <span style={{ color: DL.gold }}>1500</span>
            <span style={{ color: DL.dim }}>500 YEARS</span>
            <span style={{ color: DL.red }}>TODAY</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TcHook;
