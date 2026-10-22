import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { MedProp, QGRAD } from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 13/14 — close inside the viewer. A bedside table by candlelight (the cold open's candle returns): "Tonight,
// think of" builds on its words, a medicine bottle and pills appear on "medicine"; then the direct question: "How do you
// know" / "it works?" (gradient) lands on "works?", the bottle pulses on "know". VO me12 @0.6 s; 2 s question beat.
// =============================================================================
export const compositionConfig = { id: 'MeClose', durationInSeconds: 6.233333333333333, fps: 30, width: 1920, height: 1080 };
const DUR = 187;

const C = makeCue(vo, 'me12-close', 0.6);
const TONIGHT = C.at('Tonight,');
const THINK = C.at('think');
const MEDICINE = C.at('medicine');
const HOW = C.at('How');
const KNOW = C.at('know');
const IT = C.at('it');
const WORKS = C.at('works?');

const Pill: React.FC<{ color: string }> = ({ color }) => (
  <svg width={70} height={36} viewBox="0 0 70 36"><rect x={2} y={2} width={66} height={32} rx={16} fill="#efefe8" stroke="#9a9a90" strokeWidth={2} /><path d="M35 2 H52 A16 16 0 0 1 52 34 H35 Z" fill={color} /></svg>
);

const MeClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const pulse = ease(f, KNOW, KNOW + 5) * (1 - ease(f, KNOW + 8, KNOW + 22));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      <Vignette />
      <div style={{ position: 'absolute', left: 960 - 620, top: 380, width: 900, height: 700, background: 'radial-gradient(ellipse at 50% 50%, #ffcf5a2e, transparent 62%)' }} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx={960} cy={830} rx={760} ry={130} fill="#2a1e14" />
      </svg>
      <div style={{ position: 'absolute', left: 560, top: 560, opacity: ease(f, 0, 8) }}><MedProp kind="candle" size={230} f={f} /></div>
      <div style={{ position: 'absolute', left: 990, top: 600, opacity: ease(f, MEDICINE - 2, MEDICINE + 6), transform: `scale(${ease(f, MEDICINE - 2, MEDICINE + 10, 1.2, 1) * (1 + 0.12 * pulse)})`, transformOrigin: 'bottom center' }}><MedProp kind="pills" size={200} glow={pulse} /></div>
      {(['#e74c3c', '#38bdf8', '#d4a017'] as const).map((col, i) => (
        <div key={col} style={{ position: 'absolute', left: 1200 + i * 60, top: 790 - (i % 2) * 18, opacity: ease(f, MEDICINE + 2 + i * 2, MEDICINE + 8 + i * 2), transform: `rotate(${-20 + i * 25}deg)` }}><Pill color={col} /></div>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 72, color: DL.dim }}>
        <span style={rise(f, TONIGHT - 1)}>Tonight, </span><span style={{ ...rise(f, THINK - 1), display: 'inline-block' }}>think of the last </span><span style={{ ...rise(f, MEDICINE - 1), display: 'inline-block' }}>medicine you took.</span>
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 290, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, lineHeight: 1.15, color: DL.text, opacity: ease(f, HOW - 4, HOW + 6) }}>
        How do you <span style={{ opacity: ease(f, KNOW - 2, KNOW + 6) }}>know </span>
        <span style={{ display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, IT - 2, IT + 6), transform: `scale(${ease(f, WORKS - 2, WORKS + 10, 1.2, 1)})` }}>it works?</span>
      </div>
    </AbsoluteFill>
  );
};
export default MeClose;
