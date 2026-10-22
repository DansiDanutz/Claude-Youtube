import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from '../../lib/danslab';
import { DYT, DYT_DISPLAY, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade } from '../../lib/dykkit';
import { Source, OnWord, MedProp, PropTag, TwoGroups } from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 3/14 — the returning-viewer welcome. Logo pre-lit, wordmark on "Did", NO. 06 · MEDICINE on "Episode", the
// lockup docks on "rule". The guess (M7, answered in MeReveal): a pulsing "?" from "Here's"; 1948 on "nineteen",
// DOCTORS TEST on "doctors", a vial + A NEW DRUG on "new", · TUBERCULOSIS PATIENTS on "tuberculosis" (BMJ source on
// "patients."); 55 figures on the first "Fifty" (· GOT THE DRUG on "drug."), 52 on the second "Fifty" (bed + BED REST on
// "bed", AND NOTHING ELSE on "nothing"); AFTER SIX MONTHS on "After", how many of the 55 on "how", had died? glows on
// "died?". The answer (4 / 14) is NEVER shown here: TwoGroups runs with no deaths. The rule: GUESS on "Guess" + a comment
// bubble on "comments", STAY on "stay", CHECK on "check" + a tick on the last "guess". VO me00 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'MeWelcome', durationInSeconds: 25.333333333333332, fps: 30, width: 1920, height: 1080 };
const DUR = 760;

const C = makeCue(vo, 'me00-welcome', 0.6);
const DID = C.at('Did');
const EPISODE = C.at('Episode');
const RULE = C.at('rule.');
const HERES = C.at("Here's");
const NINETEEN = C.at('nineteen');
const DOCTORS = C.at('doctors');
const NEW = C.at('new');
const TUBERCULOSIS = C.at('tuberculosis');
const PATIENTS = C.at('patients.');
const FIFTY1 = C.at('Fifty', 1); // 'Fifty five got the drug.' (2 = 'Fifty two', 3 = 'of the fifty five')
const DRUG2 = C.at('drug.', 2); // 'got the drug.' (1 = 'a new drug')
const FIFTY2 = C.at('Fifty', 2);
const BED = C.at('bed');
const NOTHING = C.at('nothing');
const AFTER = C.at('After');
const HOW = C.at('how');
const DIED = C.at('died?');
const GUESS = C.at('Guess', 2); // 'Guess in the comments' (1 = "Here's your guess.")
const COMMENTS = C.at('comments,');
const STAY = C.at('stay');
const CHECK = C.at('check');
const TICK = C.at('guess.', 3); // 'check your guess.'

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

const MeWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dock = ease(f, RULE - 10, RULE + 8, 0, 1, DL_EASE.inOut);
  const ask = ease(f, DIED - 2, DIED + 8) * (1 - ease(f, DIED + 20, DIED + 44, 0, 1, DL_EASE.inOut));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <DytBg intensity={0.8} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 330 - dock * 290, display: 'flex', justifyContent: 'center', transform: `scale(${1 - dock * 0.45})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
          <div style={{ opacity: ease(f, -6, 0) }}><DytLogoAnimated size={210} start={-19} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <DytWordmark at={DID} size={92} />
            <span style={{ ...rise(f, EPISODE - 2), alignSelf: 'flex-start', padding: '8px 22px', borderRadius: 999, border: `3px solid ${DYT.orange}`, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 34, letterSpacing: 4, color: DYT.orange }}>NO. 06 · MEDICINE</span>
          </div>
        </div>
      </div>

      {/* the guess: 1948, a new drug on TB patients, 55 got it, 52 bed rest — how many of the 55 had died after six months? */}
      <div style={{ position: 'absolute', left: 220, right: 220, top: 236, padding: '26px 40px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${DYT.magenta}`, boxShadow: `0 0 ${40 * ask}px ${DYT.magenta}88`, opacity: ease(f, RULE + 8, RULE + 16), display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DYT.dim }}>YOUR GUESS<OnWord at={TUBERCULOSIS}> · TUBERCULOSIS PATIENTS</OnWord></div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 70, minHeight: 220 }}>
          {/* a pulsing "?" holds the slot from "Here's" until "nineteen" (No. 05 audit round 1: no bare heading for 2 s) */}
          <span style={{ position: 'absolute', left: 0, top: 0, fontFamily: DL_SERIF, fontSize: 110, color: DYT.magenta, opacity: ease(f, HERES - 2, HERES + 6) * (1 - ease(f, NINETEEN - 4, NINETEEN)), transform: `scale(${1 + 0.06 * Math.sin((f - HERES) / 6)})` }}>?</span>
          <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1, color: DL.gold, opacity: ease(f, NINETEEN - 2, NINETEEN + 6) }}>1948</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DYT.dim, opacity: ease(f, DOCTORS - 2, DOCTORS + 4) }}>DOCTORS TEST</span>
            <div style={{ alignSelf: 'flex-start' }}><PropTag kind="vial" at={NEW} size={70} name="A NEW DRUG" color={DYT.white} row /></div>
          </div>
          <TwoGroups
            dot={18}
            a={{ at: FIFTY1, n: 55, dead: 0, deadAt: -1, color: DL.gold, label: <>55<OnWord at={DRUG2}> · GOT THE DRUG</OnWord></> }}
            b={{ at: FIFTY2, n: 52, dead: 0, deadAt: -1, color: DL.sky, label: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>52<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, opacity: ease(f, BED - 2, BED + 4) }}> · <MedProp kind="bed" size={40} /> BED REST</span><OnWord at={NOTHING}>AND NOTHING ELSE</OnWord></span> }}
          />
        </div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DYT.white }}>
          <OnWord at={AFTER}>After six months, </OnWord><OnWord at={HOW}>how many of the <span style={{ color: DL.gold }}>55</span> </OnWord>
          <span style={{ display: 'inline-block', color: DYT.orange, opacity: ease(f, DIED - 2, DIED + 6), transform: `scale(${1 + 0.1 * ask})`, textShadow: `0 0 ${30 * ask}px ${DYT.magenta}` }}>had died?</span>
        </div>
        <Source at={PATIENTS}>Medical Research Council · BMJ, 30 Oct 1948 · the answer comes at the end</Source>
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
export default MeWelcome;
