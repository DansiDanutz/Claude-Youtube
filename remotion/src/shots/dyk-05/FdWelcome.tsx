import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { Source } from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 3/14 — the returning-viewer welcome. Logo pre-lit, wordmark on "Did", NO. 05 · FOOD on "Episode", the
// lockup docks on "rule". The guess (F3, answered in FdReveal): 1800 on "eighteen", LIFE EXPECTANCY on "life",
// AT BIRTH on "birth", WORLDWIDE on "worldwide", ≈ 29 YEARS on "twenty" (Riley 2005 source on "years."); a newborn on
// "baby", TODAY = ? on "today?" (no answer shown). The rule: GUESS on "Guess" + a comment bubble on "comments", STAY
// on "stay", CHECK on "check" + a tick on the last "guess". VO fd00 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'FdWelcome', durationInSeconds: 19.8667, fps: 30, width: 1920, height: 1080 };
const DUR = 596;

const C = makeCue(vo, 'fd00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule.');
const EIGHTEEN = C.at('eighteen');
const LIFE = C.at('life');
const BIRTH = C.at('birth,');
const WORLDWIDE = C.at('worldwide,');
const TWENTY = C.at('twenty');
const YEARS = C.at('years.');
const BABY = C.at('baby');
const TODAY = C.at('today?');
const GUESS = C.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = C.at('comments,');
const STAY = C.at('stay');
const CHECK = C.at('check');
const TICK = C.at('guess.', 3); // 'check your guess.'

const Baby: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <ellipse cx={50} cy={64} rx={34} ry={26} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={3} />
    <circle cx={50} cy={34} r={20} fill="#e8c0a0" stroke="#b8906a" strokeWidth={3} />
    <path d="M40 34 q4 4 8 0 M52 34 q4 4 8 0" stroke="#6a4a3a" strokeWidth={2} fill="none" />
  </svg>
);

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

const FdWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  const ask = ease(f, TODAY - 2, TODAY + 8) * (1 - ease(f, TODAY + 20, TODAY + 44, 0, 1, DL_EASE.inOut));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 270, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. 05 · FOOD</span>
          </div>
        </div>
      </div>

      {/* the guess: in 1800, life expectancy at birth, worldwide, was about 29 years. A baby born today? */}
      <div style={{ position: 'absolute', left: 220, right: 220, top: 290, padding: '30px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, opacity: ease(f, RULE + 8, RULE + 16), display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<span style={{ opacity: ease(f, LIFE - 2, LIFE + 6) }}> · LIFE EXPECTANCY</span><span style={{ opacity: ease(f, BIRTH - 2, BIRTH + 6) }}> AT BIRTH</span><span style={{ opacity: ease(f, WORLDWIDE - 2, WORLDWIDE + 6) }}> · WORLDWIDE</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, EIGHTEEN - 2, EIGHTEEN + 6) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, color: DL.gold }}>1800</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, color: DYT.white, opacity: ease(f, TWENTY - 2, TWENTY + 6) }}>≈ 29 years</span>
          </div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 84, color: DYT.dim, opacity: ease(f, BABY - 4, BABY + 4) }}>→</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: ease(f, BABY - 2, BABY + 6) }}>
            <Baby size={130} />
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, color: DYT.orange, opacity: ease(f, TODAY - 2, TODAY + 6), transform: `scale(${1 + 0.1 * ask})`, display: 'inline-block', textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>today = ?</span>
          </div>
        </div>
        <Source at={YEARS}>world, 1800 · ≈ 28.5 years at birth (an average, pulled down by child deaths) · Riley 2005, via Our World in Data</Source>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 26 }}>
        <div style={{ position: 'relative' }}>
          <Step n="1" text="GUESS IN THE COMMENTS" at={GUESS} />
          <div style={{ position: 'absolute', left: 60, top: -92, opacity: ease(f, COMMENTS - 1, COMMENTS + 5), transform: `scale(${ease(f, COMMENTS - 1, COMMENTS + 9, 0.6, 1)})`, transformOrigin: '30px 80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 22px', borderRadius: 18, background: DYT.white }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: DYT.blue }} />
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, color: DYT.navy }}>My guess: …</span>
            </div>
            <svg width={30} height={18} viewBox="0 0 30 18" style={{ position: 'absolute', left: 26, top: '100%', marginTop: -1 }}><path d="M0 0 L30 0 L6 18 Z" fill={DYT.white} /></svg>
          </div>
        </div>
        <Step n="2" text="STAY TO THE END" at={STAY} />
        <Step n="3" text="CHECK YOUR GUESS" at={CHECK} tickAt={TICK} />
      </div>
      <div style={{ ...rise(f, RULE - 2), position: 'absolute', left: 0, right: 0, top: 920, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: DL.dim }}>THE RULE</div>
    </AbsoluteFill>
  );
};
export default FdWelcome;
