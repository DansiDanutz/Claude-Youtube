import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { Banknote, Sovereign } from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 3/14 — the returning-viewer welcome. Logo pre-lit, wordmark on "Did", NO. 04 · MONEY on "Episode", the
// lockup docks on "rule". The guess (F1, answered in MoReveal): IN BRITAIN on "Britain", a £100 bar on "hundred
// pounds", NOTES & COINS = ? on "notes" / "coins?" — the bar stays one flat colour, no split is shown (no answer).
// The rule: GUESS on "Guess" + a comment bubble on "comments", STAY on "stay", CHECK on "check" + a tick on the last
// "guess". VO mo00 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'MoWelcome', durationInSeconds: 18.1667, fps: 30, width: 1920, height: 1080 };
const DUR = 545;

const C = makeCue(vo, 'mo00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule');
const BRITAIN = C.at('Britain');
const HUNDRED = C.at('hundred');
const POUNDS = C.at('pounds');
const PEOPLE = C.at('people');
const HOW = C.at('how');
const NOTES = C.at('notes');
const COINS = C.at('coins');
const GUESS = C.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = C.at('comments');
const STAY = C.at('stay');
const CHECK = C.at('check');
const TICK = C.at('guess', 3); // 'check your guess.'

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

const MoWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  const ask = ease(f, COINS - 2, COINS + 8) * (1 - ease(f, COINS + 20, COINS + 44, 0, 1, DL_EASE.inOut));
  const bar = ease(f, HUNDRED - 2, POUNDS + 8, 0, 1, DL_EASE.inOut);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 270, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. 04 · MONEY</span>
          </div>
        </div>
      </div>

      {/* the guess: in Britain, out of every £100, how many exist as real notes and coins? */}
      <div style={{ position: 'absolute', left: 220, right: 220, top: 300, padding: '30px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, opacity: ease(f, RULE + 8, RULE + 16), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<span style={{ opacity: ease(f, BRITAIN - 2, BRITAIN + 6) }}> · IN BRITAIN</span><span style={{ opacity: ease(f, PEOPLE - 2, PEOPLE + 6) }}> · ALL THE MONEY PEOPLE HAVE</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ position: 'relative', width: 1100, height: 92, borderRadius: 14, background: DYT.panel, border: `2px solid ${DYT.border}`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${100 * bar}%`, background: `linear-gradient(90deg, ${DYT.purple}, ${DYT.blue})` }} />
            <span style={{ position: 'absolute', left: 30, top: 18, fontFamily: DL_SERIF, fontSize: 52, color: DYT.white, opacity: ease(f, POUNDS - 2, POUNDS + 6) }}>£100</span>
          </div>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DYT.dim, opacity: ease(f, POUNDS - 2, POUNDS + 6) }}>= 100 POUNDS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DYT.magenta, opacity: ease(f, HOW - 2, HOW + 6), transform: `scale(${1 + 0.1 * ask})`, transformOrigin: 'left center', textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>how many are real</span>
          <div style={{ opacity: ease(f, NOTES - 2, NOTES + 6) }}><Banknote w={170} big="£" /></div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DYT.white, opacity: ease(f, NOTES - 2, NOTES + 6) }}>&amp;</span>
          <div style={{ opacity: ease(f, COINS - 2, COINS + 6) }}><Sovereign size={84} label="£" /></div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 96, color: DYT.orange, opacity: ease(f, COINS - 2, COINS + 6) }}>?</span>
        </div>
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
export default MoWelcome;
