import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { PeopleRow, Book } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 3/14 — the returning-viewer welcome. Logo pre-lit, wordmark on "Did", NO. 03 · SCHOOL on
// "Episode", lockup docks on "rule". The guess (F3, answered in ScReveal): 200 YEARS AGO on "Two
// hundred", ten figures appear one per 3 f from "ten", a book + "HOW MANY COULD READ?" on "read?" — every
// figure stays dim (no answer shown). The rule: GUESS on "Guess" + a comment bubble on "comments", STAY on
// "stay", CHECK on "check" + a tick on "guess". VO sc00 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'ScWelcome', durationInSeconds: 16.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 509;

const C = makeCue(vo, 'sc00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule');
const TWO = C.at('Two');
const TEN = C.at('ten');
const PEOPLE = C.at('people');
const READ = C.at('read');
const GUESS = C.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = C.at('comments');
const STAY = C.at('stay');
const CHECK = C.at('check');
const TICK = C.at('guess', 3); // 'check your guess.'
const YOUR_GUESS = C.at('guess', 1);

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

const ScWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  const ask = ease(f, READ - 2, READ + 8) * (1 - ease(f, READ + 18, READ + 40, 0, 1, DL_EASE.inOut));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 270, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. 03 · SCHOOL</span>
          </div>
        </div>
      </div>

      {/* the guess: 200 years ago, out of every ten people, how many could read? */}
      <div style={{ position: 'absolute', left: 260, right: 260, top: 330, padding: '28px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, opacity: ease(f, RULE + 8, RULE + 16), display: 'flex', alignItems: 'center', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<span style={{ opacity: ease(f, TWO - 2, TWO + 6) }}> · 200 YEARS AGO</span><span style={{ opacity: ease(f, TEN - 2, TEN + 6) }}> · OUT OF EVERY 10 PEOPLE</span></div>
          <div style={{ opacity: ease(f, TEN - 2, TEN + 4) }}><PeopleRow n={10} lit={() => 0} size={62} gap={14} /></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 62, color: DYT.magenta, opacity: ease(f, READ - 2, READ + 6), transform: `scale(${1 + 0.12 * ask})`, transformOrigin: 'left center', textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>how many could read?</div>
        </div>
        <div style={{ opacity: ease(f, PEOPLE - 2, PEOPLE + 8) }}><Book size={210} open={ease(f, READ - 6, READ + 6, 0.2, 1)} /></div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 730, display: 'flex', justifyContent: 'center', gap: 26 }}>
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
      <div style={{ ...rise(f, RULE - 2), position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 26, letterSpacing: 8, color: DL.dim }}>THE RULE</div>
    </AbsoluteFill>
  );
};
export default ScWelcome;
