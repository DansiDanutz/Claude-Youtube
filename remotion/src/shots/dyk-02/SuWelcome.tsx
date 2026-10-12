import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 3/14 — the short returning-viewer welcome (v2). Logo pre-lit, wordmark on "Did",
// NO. 02 on "Episode", lockup docks on "rule"; the episode guess: light = 8 min old (F1) · its
// energy = ? old (paid off in SuReveal, F17). The rule in three steps: GUESS on "Guess" + a
// comment bubble pops on "comments", STAY on "stay", CHECK on "check" + a tick on "answer".
// VO su00 @0.5 s.
// =============================================================================
export const compositionConfig = { id: 'SuWelcome', durationInSeconds: 16.7667, fps: 30, width: 1920, height: 1080 };
const DUR = 503;

const C = makeCue(vo, 'su00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule');
const LIGHT = C.at('light');
const OLD1 = C.at('old', 1);
const ENERGY = C.at('energy');
const INSIDE = C.at('inside');
const HOW = C.at('How');
const GUESS = C.at('Guess');
const COMMENTS = C.at('comments');
const STAY = C.at('stay');
const CHECK = C.at('check');
const ANSWER = C.at('answer');

const Step: React.FC<{ n: string; text: string; at: number; tickAt?: number }> = ({ n, text, at, tickAt }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at - 2, at + 8], [1.25, 1], { ...DCLAMP, easing: DL_EASE.out });
  const ticked = tickAt !== undefined && f >= tickAt;
  const stamp = tickAt === undefined ? 1 : ease(f, tickAt, tickAt + 8, 1.5, 1);
  return (
    <div style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', borderRadius: 999, background: DYT.panel, border: `2px solid ${ticked ? DYT.green : DYT.border}` }}>
      <span style={{ width: 46, height: 46, borderRadius: '50%', background: ticked ? DYT.green : DYT.magenta, transform: `scale(${stamp})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 26, color: DYT.white }}>
        {ticked ? <svg width={26} height={26} viewBox="0 0 26 26"><path d="M4 14 L10 20 L22 6" fill="none" stroke={DYT.white} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg> : n}
      </span>
      <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, color: DYT.white }}>{text}</span>
    </div>
  );
};

const SuWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // lockup big at centre, docks to the top on "rule"
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  // "How old is that?": a big, slow pulse with glow (~1.2 s), so the line never sits still
  const howPulse = ease(f, HOW - 2, HOW + 8) * (1 - ease(f, HOW + 18, HOW + 36, 0, 1, DL_EASE.inOut));
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
        <div style={{ ...rise(f, ENERGY - 2), flex: 1, padding: '30px 36px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * howPulse}px ${DYT.magenta}88` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DYT.dim }}>THE ENERGY INSIDE IT</div>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 84, color: DYT.magenta, opacity: ease(f, INSIDE, INSIDE + 8), transform: `scale(${1 + 0.28 * howPulse})`, textShadow: `0 0 ${34 * howPulse}px ${DYT.magenta}`, transformOrigin: 'left center' }}>? old</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', gap: 26 }}>
        <div style={{ position: 'relative' }}>
          <Step n="1" text="GUESS IN THE COMMENTS" at={GUESS} />
          {/* the comment bubble pops on "comments" */}
          <div style={{ position: 'absolute', left: 60, top: -92, opacity: ease(f, COMMENTS - 1, COMMENTS + 5), transform: `scale(${ease(f, COMMENTS - 1, COMMENTS + 9, 0.6, 1)})`, transformOrigin: '30px 80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px', borderRadius: 18, background: DYT.white }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: DYT.blue }} />
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, color: DYT.navy }}>My guess: …</span>
            </div>
            <svg width={30} height={18} viewBox="0 0 30 18" style={{ position: 'absolute', left: 26, top: '100%', marginTop: -1 }}><path d="M0 0 L30 0 L6 18 Z" fill={DYT.white} /></svg>
          </div>
        </div>
        <Step n="2" text="STAY TO THE END" at={STAY} />
        <Step n="3" text="CHECK YOUR ANSWER" at={CHECK} tickAt={ANSWER} />
      </div>
      <div style={{ ...rise(f, RULE - 2), position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: DL.dim }}>THE RULE</div>
    </AbsoluteFill>
  );
};
export default SuWelcome;
