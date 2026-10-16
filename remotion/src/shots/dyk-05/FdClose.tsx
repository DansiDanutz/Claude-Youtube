import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { Food, QGRAD, type FoodKind } from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 13/14 — close inside the viewer. The cold open's table returns under its lamp: "Tonight, look at your plate"
// builds on its words and the plate fills on "plate"; then the direct question: "Which part of it" / "is buying you" /
// "more years?" (gradient) lands on "years?", each food pulses in turn on "Which part". VO fd12 @0.6 s; 1.4 s question beat.
// =============================================================================
export const compositionConfig = { id: 'FdClose', durationInSeconds: 6.4, fps: 30, width: 1920, height: 1080 };
const DUR = 192;

const C = makeCue(vo, 'fd12-close', 0.6);
const TONIGHT = C.at('Tonight,');
const LOOK = C.at('look');
const PLATE = C.at('plate.');
const WHICH = C.at('Which');
const PART = C.at('part');
const BUYING = C.at('buying');
const MORE = C.at('more');
const YEARS = C.at('years?');

const ITEMS: [FoodKind, number, number][] = [['ricebeans', -150, 0], ['veg', 120, -10], ['bread', -10, 50], ['soda', 260, 40]];

const FdClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      <Vignette />
      <div style={{ position: 'absolute', left: 960 - 520, top: -40, width: 1040, height: 1000, background: 'radial-gradient(ellipse at 50% 0%, #ffe9b033, transparent 62%)' }} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx={960} cy={760} rx={760} ry={150} fill="#2a1e14" />
        <ellipse cx={960} cy={690} rx={300} ry={100} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={6} />
      </svg>
      {ITEMS.map(([k, dx, dy], i) => {
        const pulse = ease(f, PART + i * 6, PART + i * 6 + 5) * (1 - ease(f, PART + i * 6 + 8, PART + i * 6 + 20));
        return <div key={k} style={{ position: 'absolute', left: 960 + dx - 70, top: 600 + dy, opacity: ease(f, PLATE - 2 + i * 2, PLATE + 8 + i * 2), transform: `scale(${1 + 0.15 * pulse})` }}><Food kind={k} size={140} glow={pulse} /></div>;
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 72, color: DL.dim }}>
        <span style={rise(f, TONIGHT - 1)}>Tonight, </span><span style={{ ...rise(f, LOOK - 1), display: 'inline-block' }}>look at your plate.</span>
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 290, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, lineHeight: 1.15, color: DL.text, opacity: ease(f, WHICH - 4, WHICH + 6) }}>
        Which part of it <span style={{ opacity: ease(f, BUYING - 2, BUYING + 6) }}>is buying you </span>
        <span style={{ display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, MORE - 2, MORE + 6), transform: `scale(${ease(f, YEARS - 2, YEARS + 10, 1.2, 1)})` }}>more years?</span>
      </div>
    </AbsoluteFill>
  );
};
export default FdClose;
