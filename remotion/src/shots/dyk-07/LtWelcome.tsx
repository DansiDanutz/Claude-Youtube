import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { Source, OnWord, TenPeople } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 3/14 — the returning-viewer welcome. Logo pre-lit, wordmark on "Did", NO. 07 · LIGHT on "Episode", the
// lockup docks on "rule". The guess (L13, answered in LtReveal): a pulsing "?" from "Here's"; THINK OF TEN PEOPLE on
// "Think" with ten figures on "ten" (TenPeople, NONE lit), · ANYWHERE ON EARTH on "anywhere"; the question builds on
// "How", "live", "night", "brightened?" (glows). The three options land each on its word — Two? on "Two?", Five? on
// "Five?", More than eight? on "More" — all in the same neutral style: the answer is NEVER highlighted or lit here.
// The Falchi 2016 source on "brightened?". The rule: GUESS on "Guess" + a comment bubble on "comments", STAY on "stay",
// CHECK on "check" + a tick on the last "guess". VO lt00 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'LtWelcome', durationInSeconds: 21.5, fps: 30, width: 1920, height: 1080 };
const DUR = 645;

const C = makeCue(vo, 'lt00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const SEVEN = C.at('seven.');
const RULE = C.at('rule.');
const HERES = C.at("Here's");
const THINK = C.at('Think');
const TEN = C.at('ten');
const ANYWHERE = C.at('anywhere');
const HOW = C.at('How');
const LIVE = C.at('live');
const NIGHT = C.at('night');
const BRIGHTENED = C.at('brightened?');
const TWO = C.at('Two?');
const FIVE = C.at('Five?');
const MORE = C.at('More');
const GUESS = C.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = C.at('comments,');
const STAY = C.at('stay');
const CHECK = C.at('check');
const TICK = C.at('guess.', 3); // 'check your guess.'

const NO_ONE_LIT: number[] = []; // the guess never lights a figure (the answer is LtReveal's)

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

// one guess option: every option uses the same neutral style (no answer highlighted)
const Option: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return (
    <span style={{ opacity: ease(f, at - 2, at + 4), transform: `scale(${ease(f, at - 2, at + 10, 1.25, 1)})`, padding: '10px 34px', borderRadius: 999, border: `3px solid ${DYT.border}`, background: DYT.panel, fontFamily: DL_SERIF, fontSize: 50, color: DYT.white, whiteSpace: 'nowrap' }}>{children}</span>
  );
};

const LtWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  const ask = ease(f, BRIGHTENED - 2, BRIGHTENED + 8) * (1 - ease(f, BRIGHTENED + 20, BRIGHTENED + 44, 0, 1, DL_EASE.inOut));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 290, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. <span style={{ display: 'inline-block', transform: `scale(${1 + 0.35 * ease(f, SEVEN - 2, SEVEN + 4) * (1 - ease(f, SEVEN + 6, SEVEN + 18))})`, textShadow: `0 0 ${24 * ease(f, SEVEN - 2, SEVEN + 6)}px ${DYT.orange}` }}>07</span> · LIGHT</span>
          </div>
        </div>
      </div>

      {/* the guess: ten people anywhere on Earth — how many live under a sky our lights have brightened? */}
      <div style={{ position: 'absolute', left: 220, right: 220, top: 236, padding: '26px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, opacity: ease(f, RULE + 8, RULE + 16), display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<OnWord at={THINK}> · THINK OF TEN PEOPLE</OnWord><OnWord at={ANYWHERE}> · ANYWHERE ON EARTH</OnWord></div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', minHeight: 92 }}>
          {/* a pulsing "?" holds the slot from "Here's" until "ten" (no bare heading for 2 s) */}
          <span style={{ position: 'absolute', left: 0, top: -14, fontFamily: DL_SERIF, fontSize: 110, color: DYT.magenta, opacity: ease(f, HERES - 2, HERES + 6) * (1 - ease(f, TEN - 4, TEN)), transform: `scale(${1 + 0.06 * Math.sin((f - HERES) / 6)})` }}>?</span>
          <div style={{ transform: `translateY(${2 * Math.sin(f / 14)}px)` }}><TenPeople at={TEN} litAt={NO_ONE_LIT} size={70} /></div>
        </div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.2, color: DYT.white }}>
          <OnWord at={HOW}>How many of them </OnWord><OnWord at={LIVE}>live under a </OnWord><OnWord at={NIGHT}>night sky that our lights have </OnWord>
          <span style={{ display: 'inline-block', color: DYT.orange, opacity: ease(f, BRIGHTENED - 2, BRIGHTENED + 6), transform: `scale(${1 + 0.1 * ask})`, textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>brightened?</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, minHeight: 80, alignItems: 'center' }}>
          <Option at={TWO}>Two?</Option>
          <Option at={FIVE}>Five?</Option>
          <Option at={MORE}>More than eight?</Option>
        </div>
        <Source at={BRIGHTENED}>Falchi et al. · Science Advances, 2016 · the answer comes at the end</Source>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center', gap: 26 }}>
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
export default LtWelcome;
