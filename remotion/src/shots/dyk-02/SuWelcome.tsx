import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 3/14 — the short returning-viewer welcome (format beat 3: later episodes get one
// line, not the channel intro). Logo on "Did", NO. 02 on "Episode two", then the episode
// guess: light = 8 min old (F1) · its energy = ? years (paid off in SuReveal, F17), and the
// rule in three steps on guess / stay / right. VO su00 @0.5 s.
// =============================================================================
export const compositionConfig = { id: 'SuWelcome', durationInSeconds: 15.5667, fps: 30, width: 1920, height: 1080 };
const DUR = 467;

const C = makeCue(vo, 'su00-welcome', 0.5);
const WELCOME = C.at('Welcome');
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule');
const LIGHT = C.at('light');
const OLD1 = C.at('old', 1);
const ENERGY = C.at('energy');
const INSIDE = C.at('inside');
const HOW = C.at('How');
const GUESS = C.at('guess');
const STAY = C.at('stay');
const RIGHT = C.at('correct');

const Step: React.FC<{ n: string; text: string; at: number }> = ({ n, text, at }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at - 2, at + 8], [1.25, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', borderRadius: 999, background: DYT.panel, border: `2px solid ${DYT.border}` }}>
      <span style={{ width: 46, height: 46, borderRadius: '50%', background: DYT.magenta, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 26, color: DYT.white }}>{n}</span>
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, color: DYT.white }}>{text}</span>
    </div>
  );
};

const SuWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // lockup big at centre, docks to the top on "rule"
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 270, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${SUN.mid}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: SUN.mid }}>NO. 02 · THE SUN</span>
          </div>
        </div>
      </div>

      {/* the guess: light 8 min old · energy ? years */}
      <div style={{ position: 'absolute', left: 260, right: 260, top: 360, display: 'flex', gap: 40, opacity: ease(f, LIGHT - 6, LIGHT + 6) }}>
        <div style={{ flex: 1, padding: '30px 36px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${SUN.mid}` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DYT.dim }}>THE LIGHT ON YOUR FACE</div>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 84, color: SUN.mid, opacity: ease(f, OLD1 - 10, OLD1) }}>8 min old</div>
        </div>
        <div style={{ ...rise(f, ENERGY - 2), flex: 1, padding: '30px 36px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DYT.dim }}>THE ENERGY INSIDE IT</div>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 84, color: DYT.magenta, opacity: ease(f, INSIDE, INSIDE + 8), transform: `scale(${1 + 0.1 * ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22))})`, transformOrigin: 'left center' }}>? years old</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', gap: 26 }}>
        <Step n="1" text="GUESS IN THE COMMENTS" at={GUESS} />
        <Step n="2" text="STAY TO THE END" at={STAY} />
        <Step n="3" text="CHECK IF YOU WERE RIGHT" at={RIGHT} />
      </div>
      <div style={{ ...rise(f, RULE - 2), position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: DL.dim }}>THE RULE</div>
    </AbsoluteFill>
  );
};
export default SuWelcome;
