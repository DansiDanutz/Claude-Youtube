import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { Desk, Screen } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 13/14 — close inside the viewer. A wall of small desks fills from "spent" (your school years —
// illustration, no number; the OECD hours figure was not verified); "years of your life in school" builds on its
// words; the wall dims on "So tell me", then the direct question; a screen appears on "screen" and dims, the line
// lands on "could?". VO sc12 @0.6 s; 1.4 s question beat after.
// =============================================================================
export const compositionConfig = { id: 'ScClose', durationInSeconds: 8.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 269;

const C = makeCue(vo, 'sc12-close', 0.6);
const SPENT = C.at('spent');
const YEARS = C.at('years');
const LIFE = C.at('life');
const SCHOOL = C.at('school');
const SO = C.at('So');
const WHATS = C.at("What's");
const TAUGHT = C.at('taught');
const SCREEN = C.at('screen');
const COULD = C.at('could');
const COLS = 16, ROWS = 6;

const ScClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const wall = ease(f, 0, 10) * (1 - ease(f, SO, SO + 14, 0, 0.8, DL_EASE.in)) * (1 - ease(f, WHATS - 6, WHATS + 4));
  const fill = ease(f, SPENT - 4, SCHOOL + 6, 0, COLS * ROWS);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      <Vignette />
      <AbsoluteFill style={{ opacity: wall, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 86px)`, gap: 12 }}>
          {Array.from({ length: COLS * ROWS }, (_, i) => <div key={i} style={{ opacity: 0.12 + 0.88 * Math.max(0, Math.min(1, fill - i)) }}><Desk size={86} /></div>)}
        </div>
        <div style={{ marginTop: 44, fontFamily: DL_SERIF, fontSize: 64, color: DL.text, display: 'flex', gap: 18 }}>
          <span style={rise(f, YEARS - 1)}>Years</span>
          <span style={rise(f, LIFE - 1)}>of your life</span>
          <span style={{ ...rise(f, SCHOOL - 1), color: DL.gold }}>in school.</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, WHATS - 4, WHATS + 8) }}>
        <div style={{ ...rise(f, WHATS), width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, lineHeight: 1.15, color: DL.text }}>
          What’s the one thing <span style={{ opacity: ease(f, TAUGHT - 2, TAUGHT + 6) }}>it taught you</span> <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, SCREEN - 4, SCREEN + 6) }}>that no screen ever <span style={{ opacity: ease(f, COULD - 2, COULD + 6), textShadow: `0 0 ${28 * ease(f, COULD, COULD + 20)}px ${DL.gold}` }}>could?</span></span>
        </div>
        <div style={{ marginTop: 40, opacity: ease(f, SCREEN - 2, SCREEN + 8) * (1 - 0.6 * ease(f, COULD + 4, COULD + 30)) }}><Screen size={200} on={1 - ease(f, COULD + 4, COULD + 30)} /></div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default ScClose;
