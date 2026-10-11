import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 13/14 — close inside the viewer. A wall of small sunrises fills in from "every"
// (one per morning of your life — illustration, no number), they dim on "So tell me", then the
// direct question; "on purpose?" lands on "purpose". VO su12 @0.5 s; 1.4 s question beat after.
// =============================================================================
export const compositionConfig = { id: 'SuClose', durationInSeconds: 10.6333, fps: 30, width: 1920, height: 1080 };
const DUR = 319;

const C = makeCue(vo, 'su12-close', 0.5);
const RISEN = C.at('risen');
const EVERY = C.at('every');
const LIFE = C.at('life');
const SO = C.at('So');
const WHEN = C.at('When');
const PURPOSE = C.at('purpose');
const COLS = 24, ROWS = 9;

const SuClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const wall = ease(f, 0, 10) * (1 - ease(f, SO, SO + 14, 0, 0.8, DL_EASE.in)) * (1 - ease(f, WHEN - 6, WHEN + 4));
  const fill = ease(f, RISEN - 2, RISEN + 8, 0, 1) + ease(f, EVERY - 4, LIFE + 6, 0, COLS * ROWS - 1); // first sunrise on "risen", the wall fills from "every"
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <AbsoluteFill style={{ opacity: wall, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 56px)`, gap: 14 }}>
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const on = Math.max(0, Math.min(1, fill - i));
            return (
              <svg key={i} width={56} height={40} viewBox="0 0 56 40" style={{ opacity: 0.15 + 0.85 * on }}>
                <path d="M6 30 A22 22 0 0 1 50 30 Z" fill={SUN.mid} />
                <line x1={0} y1={31} x2={56} y2={31} stroke={SUN.rim} strokeWidth={2} />
              </svg>
            );
          })}
        </div>
        <div style={{ ...rise(f, EVERY - 2), marginTop: 50, fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>Every single morning of your life.</div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, WHEN - 4, WHEN + 8) }}>
        <div style={{ ...rise(f, WHEN), width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, lineHeight: 1.15, color: DL.text }}>
          When was the last time you <span style={{ opacity: ease(f, C.at('watched') - 2, C.at('watched') + 6) }}>watched it rise,</span> <span style={{ color: SUN.mid, fontStyle: 'italic', opacity: ease(f, PURPOSE - 2, PURPOSE + 8), textShadow: `0 0 ${28 * ease(f, PURPOSE, PURPOSE + 20)}px ${SUN.rim}` }}>on purpose?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default SuClose;
