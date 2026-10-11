import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 12/13 — the finale ends INSIDE the viewer (Playbook rule 5): time
// can't be slowed, but "stretched" stretches on its word, one memory tile
// widens, then the direct question. VO tc12 @0.6s.
// =============================================================================
export const compositionConfig = { id: 'TcClose', durationInSeconds: 12.2333, fps: 30, width: 1920, height: 1080 };
const DUR = 367;

const C = makeCue(vo, 'tc12-close', 0.5);
const STRETCH = C.at('stretched');
const MEMORY = C.at('memory');
const WHEN = C.at('When');
const FIRST = C.at('first');
const VERY = C.at('very');
const BE = C.at('be');
const SOMETHING = C.at('something');
const GROW_FRAMES = 8;

// A phrase that appears ON its word and widens into place, so the line stays centred while it builds.
const Grow: React.FC<{ at: number; w: number; children: React.ReactNode }> = ({ at, w, children }) => {
  const f = useCurrentFrame();
  const g = ease(f, at - 2, at + GROW_FRAMES);
  return <span style={{ display: 'inline-block', maxWidth: g * w, opacity: g, overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}>{children}</span>;
};

const TcClose: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR, 2, 4);
  const p1 = 1 - ease(f, WHEN - 12, WHEN, 0, 1, DL_EASE.in);
  const stretch = ease(f, STRETCH, STRETCH + 24, 0, 1, DL_EASE.inOut);
  const tile = ease(f, MEMORY - 2, MEMORY + 30, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1c1408" />
      <Vignette />
      <AbsoluteFill style={{ opacity: p1, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, 0, 26, 8), fontFamily: DL_SERIF, fontSize: 84, color: DL.dim, whiteSpace: 'nowrap' }}>Time cannot<Grow at={BE} w={640}>&nbsp;be slowed down.</Grow></div>
        <div style={{ ...rise(f, STRETCH - 10), marginTop: 30, fontFamily: DL_SERIF, fontSize: 96, color: DL.text, display: 'flex', gap: 28, alignItems: 'baseline' }}>
          But it can be
          <span style={{ display: 'inline-block', color: DL.gold, fontStyle: 'italic', letterSpacing: `${stretch * 0.22}em`, transform: `scaleX(${1 + stretch * 0.12})`, transformOrigin: 'left center' }}>stretched.</span>
        </div>
        <div style={{ ...rise(f, MEMORY - 4), marginTop: 60, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 60 + tile * 460, height: 26, borderRadius: 8, background: DL.gold, boxShadow: `0 0 ${24 * tile}px ${DL.gold}88` }} />
          <span style={{ fontFamily: DL_SANS, fontSize: 34, color: DL.warm }}>one new memory at a time</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, WHEN - 4, WHEN + 10) }}>
        {/* each part on its word, both lines centred while they build */}
        <div style={{ ...rise(f, WHEN), textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, lineHeight: 1.15, color: DL.text }}>
          <div style={{ whiteSpace: 'nowrap' }}>When was the last time you did</div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <Grow at={SOMETHING} w={900}>something for the&nbsp;</Grow>
            <Grow at={VERY} w={900}><span style={{ color: DL.gold, fontStyle: 'italic', textShadow: `0 0 ${28 * ease(f, FIRST, FIRST + 20)}px ${DL.gold}88` }}>very first time?</span></Grow>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TcClose;
