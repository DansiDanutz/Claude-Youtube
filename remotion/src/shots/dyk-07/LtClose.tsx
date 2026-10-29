import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { LightProp, NightSky, QGRAD, FLAME } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 13/14 — close inside the viewer. A room at night, a lamp on and a wall switch: "Tonight, switch off one
// light and look up." builds on its words; the switch flips and the lamp goes out ON "switch" (the warm room light
// falls away); on "look" the room slides down and the night sky opens above (no stars yet); ON "stars" the stars come
// out; "How many stars / can you count?" (gradient) lands on "count?". VO lt12 @0.6 s; ~1.5 s question beat.
// =============================================================================
export const compositionConfig = { id: 'LtClose', durationInSeconds: 6.3667, fps: 30, width: 1920, height: 1080 };
const DUR = 191;

const C = makeCue(vo, 'lt12-close', 0.6);
const TONIGHT = C.at('Tonight,');
const SWITCH = C.at('switch');
const ONE = C.at('one');
const LOOK = C.at('look');
const HOW = C.at('How');
const STARS = C.at('stars');
const CAN = C.at('can');
const COUNT = C.at('count?');
// the instruction, one span per spoken beat (no word before Brian says it)
const WORDS: [string, number, boolean][] = [
  ['Tonight,', TONIGHT, false], ['switch', SWITCH, false], ['off', C.at('off'), false], ['one light', ONE, false],
  ['and look up.', LOOK, true],
];

const LtClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const off = ease(f, SWITCH - 1, SWITCH + 8);       // the lamp goes out on "switch"
  const tilt = ease(f, LOOK - 2, LOOK + 26);         // "look up": the room slides down, the sky opens
  const stars = ease(f, STARS - 2, STARS + 18);      // the stars come out on "stars"
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <NightSky stars={0.85 * stars} glow={0.35 * (1 - tilt)} milky={0.5 * stars} />
      {/* the warm room light, gone when the switch flips */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 78% 55%, ${FLAME}40, #1a1206ee 55%, #0a0806f5)`, opacity: 1 - 0.85 * off }} />
      <Vignette />

      {/* the room: wall switch (left) and a hanging lamp (right); slides down on "look up" */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${520 * tilt}px)` }}>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <rect x={0} y={900} width={1920} height={180} fill="#1e160f" />
          <line x1={1500} y1={0} x2={1500} y2={440} stroke="#3a3a40" strokeWidth={4} />
        </svg>
        <div style={{ position: 'absolute', left: 260, top: 500 }}><LightProp kind="switch" size={240} lit={f >= SWITCH ? 0 : 1} /></div>
        <div style={{ position: 'absolute', left: 1400, top: 430 }}><LightProp kind="bulb" size={200} lit={(1 - off) * (0.92 + 0.08 * Math.sin(f / 5))} /></div>
      </div>

      <div style={{ position: 'absolute', left: 160, right: 160, top: 160, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, color: DL.dim }}>
        {WORDS.map(([text, at, bright]) => (
          <span key={text} style={{ ...rise(f, at - 1), display: 'inline-block', marginRight: '0.28em', color: bright ? DL.text : DL.dim }}>{text}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 290, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, lineHeight: 1.15, color: DL.text, opacity: ease(f, HOW - 4, HOW + 6) }}>
        How many <span style={{ color: '#fff7d6', opacity: ease(f, STARS - 2, STARS + 6), textShadow: `0 0 ${26 * stars}px #ffffff` }}>stars </span>
        <span style={{ opacity: ease(f, CAN - 2, CAN + 4) }}>can you </span>
        <span style={{ display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, COUNT - 2, COUNT + 4), transform: `scale(${ease(f, COUNT - 2, COUNT + 10, 1.2, 1)})` }}>count?</span>
      </div>
    </AbsoluteFill>
  );
};
export default LtClose;
