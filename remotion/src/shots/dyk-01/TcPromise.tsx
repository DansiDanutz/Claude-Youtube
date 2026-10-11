import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg, Kicker } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Timeline7, YEARS, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 3/13 — the promise (Playbook rule 4: promise stated, payoff withheld).
// Seven nodes on "Seven centuries", a life above each on "Seven lives", the
// measurement on "measurement", 2100 pulses on "twenty one hundred". VO tc03 @0.5s.
// =============================================================================
export const compositionConfig = { id: 'TcPromise', durationInSeconds: 20.4333, fps: 30, width: 1920, height: 1080 };

const C = makeCue(vo, 'tc03-promise', 0.5);
const EXP = C.at('experiment');
const CENT = C.at('centuries');
const LIVES = C.at('mornings');
const MEAS = C.at('someone');
const IN_EACH = C.at('In');
const WAKE = C.at('wake');
const LIVED = C.at('lived');
const WHERE = C.at('where');
const LIGHT_STEP = 12; // frames between the seven lives lighting up (matches the ui-click ticks)
const Y2100 = C.at('twenty');
const W = 1560;
const GAP = W / 6;

const Person: React.FC<{ color: string }> = ({ color }) => (
  <svg width={54} height={78} viewBox="0 0 54 78">
    <circle cx={27} cy={16} r={13} fill={color} />
    <path d="M6 76 C6 46 14 36 27 36 C40 36 48 46 48 76 Z" fill={color} />
  </svg>
);

const TcPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(613);
  const reveal = YEARS.map((_, i) => CENT - 6 + i * 5);
  const q = ease(f, Y2100, Y2100 + 14);
  const pulse = f > Y2100 ? 0.5 + 0.5 * Math.sin((f - Y2100) / 6) : 0;
  // "THE EXPERIMENT" lands big on its word, then shrinks into the kicker when the centuries arrive
  const headIn = ease(f, EXP - 8, EXP + 4);
  const headDock = ease(f, CENT - 10, CENT + 4, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1c1208" />
      <Vignette />
      <Kicker n="00" label="THE EXPERIMENT" start={CENT - 4} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center', opacity: headIn * (1 - headDock), transform: `translateY(${-headDock * 180}px) scale(${(1.12 - 0.12 * headIn) * (1 - headDock * 0.6)})`, fontFamily: DL_MONO, fontSize: 96, letterSpacing: 24, color: DL.text }}>
        THE EXPERIMENT
      </div>
      {/* the axis is there from the first frame; nodes join on "Seven centuries" */}
      <div style={{ position: 'absolute', left: 180, top: 540, width: W, height: 3, background: DL.border, opacity: ease(f, 0, 10) }} />

      <div style={{ position: 'absolute', top: 160, left: 120, right: 120, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 78, lineHeight: 1.12, color: DL.text }}>
        <span style={{ opacity: ease(f, CENT - 4, CENT + 10) }}>Seven centuries. </span><span style={{ display: 'block', color: DL.gold, fontStyle: 'italic', opacity: ease(f, LIVES - 4, LIVES + 10) }}>Six mornings — and one to come.</span>
      </div>

      {/* lives above the nodes */}
      <div style={{ position: 'absolute', left: 180, top: 380, width: W, height: 90 }}>
        {YEARS.map((y, i) => {
          const at = LIVES + i * 4;
          const isLast = i === 6;
          const lit = ease(f, LIVED + i * LIGHT_STEP, LIVED + i * LIGHT_STEP + 6);
          return (
            <div key={y} style={{ position: 'absolute', left: i * GAP, transform: `translateX(-50%) translateY(${ease(f, at, at + 12, 20, 0)}px)`, opacity: ease(f, at, at + 12) * (isLast ? 0.85 : 1), filter: lit > 0 ? `drop-shadow(0 0 ${14 * lit}px ${isLast ? DL.red : DL.gold})` : undefined }}>
              <Person color={isLast ? DL.red : lit > 0.5 ? DL.gold : DL.warm} />
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: 180, top: 480 }}>
        <Timeline7 revealAt={reveal} w={W} />
      </div>

      {/* 2100 question mark */}
      <div style={{ position: 'absolute', left: 180 + W - 40, top: 610, opacity: q, fontFamily: DL_SERIF, fontSize: 96, color: DL.red, textShadow: `0 0 ${20 + pulse * 30}px ${DL.red}aa` }}>?</div>

      {/* the measurement */}
      {/* the chip lands on "In each one", then fills in on "wake up as" and "someone else" */}
      <div style={{ ...rise(f, IN_EACH - 4), position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '22px 40px', background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.red }}>IN EACH ONE</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 38, color: DL.text }}>
            <span style={{ opacity: ease(f, WAKE - 2, WAKE + 8) }}>you wake up as </span><span style={{ color: DL.gold, opacity: ease(f, MEAS - 2, MEAS + 8) }}>someone else</span>
          </span>
        </div>
      </div>

      <div style={{ ...rise(f, WHERE - 2), position: 'absolute', left: 0, right: 0, top: 890, textAlign: 'center', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 6, color: DL.muted }}>
        WHERE DID THE TIME GO?
      </div>
    </AbsoluteFill>
  );
};
export default TcPromise;
