import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { Kid, Bell, Label } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 4/14 — the promise. Seven year chips build one per 12 f from "Seven"; 1500 lights on "fifteen",
// the dashed 2100 chip on "twenty". A different kid pops above each chip from "different" (one per 6 f); a
// bell above the school days on "school"; the 1500 kid's slot reads NO SCHOOL on "no school"; A TRADE + a
// hammer on "trade"/"hands"; the 2100 kid gets a glowing "?" tutor shape on "tutor", NOT HUMAN? on "human".
// "what the word school really means": SCHOOL = ? lands on "means" (no answer shown). VO sc03 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'ScPromise', durationInSeconds: 22.1, fps: 30, width: 1920, height: 1080 };
const DUR = 663;

const C = makeCue(vo, 'sc03-promise', 0.6);
const SEVEN = C.at('Seven');
const FIFTEEN = C.at('fifteen');
const TWENTY = C.at('twenty');
const WAKE = C.at('wake');
const DIFFERENT = C.at('different');
const START = C.at('start');
const END1 = C.at('end', 1); // 'You end up somewhere'
const FIND = C.at('end', 2); // 'And at the end' — the row dims here
const SCHOOL1 = C.at('school', 1); // 'on a school day'
const NO = C.at('no');
const TRADE = C.at('trade');
const HANDS = C.at('hands');
const TUTOR = C.at('tutor');
const HUMAN = C.at('human');
const WORD = C.at('word');
const SCHOOL3 = C.at('school', 3); // 'what the word school'
const MEANS = C.at('means');

const YEARS = ['1500', '1647', '1763', '1810', '1948', 'TODAY', '2100'];
const X0 = 255, STEP = 235; // chips stay inside the 160 px side margins
const SCHOOL_DAY = [false, true, true, true, true, true, false]; // a bell over the eras that had a school day
const TOOLS: ('hammer' | 'book' | 'cap' | 'none')[] = ['hammer', 'book', 'book', 'book', 'cap', 'book', 'none'];

const ScPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const rowOut = (1 - 0.35 * ease(f, FIND - 2, FIND + 10)) * (1 - ease(f, WORD - 10, WORD + 2));
  const dawn = ease(f, WAKE - 2, WAKE + 20);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      <Vignette />
      <AbsoluteFill style={{ opacity: rowOut }}>
        {/* a dawn glow rises behind the row on "wake" */}
        <div style={{ position: 'absolute', left: 160, right: 160, top: 640, height: 260, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}33, transparent 70%)`, opacity: dawn }} />
        <div style={{ ...rise(f, SEVEN), position: 'absolute', left: 0, right: 0, top: 180, textAlign: 'center', fontFamily: DL_MONO, fontSize: 34, letterSpacing: 10, color: DL.dim }}>SEVEN MORNINGS · SEVEN KIDS</div>
        {YEARS.map((y, i) => {
          const at = SEVEN + i * 12;
          const kidAt = DIFFERENT + i * 6;
          const lit = (i === 0 && f >= FIFTEEN) || (i === 6 && f >= TWENTY);
          const pulse = (i === 0 ? ease(f, START, START + 5) * (1 - ease(f, START + 8, START + 24)) : 0) + (i === 6 ? ease(f, END1, END1 + 5) * (1 - ease(f, END1 + 8, END1 + 24)) : 0);
          const x = X0 + i * STEP;
          const future = i === 6;
          const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <React.Fragment key={y}>
              <div style={{ position: 'absolute', left: x - 90, top: 800, width: 180, textAlign: 'center', opacity: ease(f, at, at + 6), transform: `scale(${s * (1 + 0.12 * pulse)})`, padding: '14px 0', borderRadius: 12, border: `3px ${future ? 'dashed' : 'solid'} ${future ? DL.red : lit ? DL.gold : DL.border}`, background: lit ? '#1a1406' : DL.panel, fontFamily: DL_SERIF, fontSize: 46, color: future ? DL.red : lit ? DL.gold : DL.text, boxShadow: lit ? `0 0 26px ${future ? DL.red : DL.gold}66` : undefined }}>{y}</div>
              <div style={{ position: 'absolute', left: x - 65, top: 530, opacity: ease(f, kidAt, kidAt + 6), transform: `translateY(${ease(f, kidAt, kidAt + 10, 20, 0)}px)` }}>
                <Kid size={130} color={future ? '#8fd3ff' : DL.warm} tool={i === 0 ? (f >= TRADE ? 'hammer' : 'none') : TOOLS[i]} girl={i % 2 === 1} glow={future ? ease(f, TUTOR, TUTOR + 10) * 0.6 : 0} />
              </div>
              {SCHOOL_DAY[i] && <div style={{ position: 'absolute', left: x - 30, top: 420, opacity: ease(f, SCHOOL1 + i * 3, SCHOOL1 + i * 3 + 8) }}><Bell size={60} swing={f > SCHOOL1 ? Math.sin((f - SCHOOL1) / 3) * (1 - ease(f, SCHOOL1, SCHOOL1 + 30)) : 0} /></div>}
            </React.Fragment>
          );
        })}
        {/* 1500: no school at all — a trade, with your hands */}
        <div style={{ position: 'absolute', left: X0 - 130, top: 300, width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ opacity: ease(f, NO - 2, NO + 6), transform: `scale(${ease(f, NO - 2, NO + 8, 1.3, 1)})`, padding: '8px 14px', border: `3px solid ${DL.red}`, borderRadius: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.red, whiteSpace: 'nowrap' }}>NO SCHOOL</span>
          <Label at={TRADE} color={DL.gold} size={26}>A TRADE</Label>
          <Label at={HANDS} color={DL.warm} size={24}>WITH YOUR HANDS</Label>
        </div>
        {/* 2100: a tutor that might not be human — a glowing "?" orb beside the kid */}
        <div style={{ position: 'absolute', left: X0 + 6 * STEP - 160, top: 520, opacity: ease(f, TUTOR - 2, TUTOR + 8) }}>
          <svg width={90} height={90} viewBox="0 0 90 90" style={{ overflow: 'visible', filter: 'drop-shadow(0 0 18px #8fd3ff)' }}>
            <circle cx={45} cy={45 + 6 * Math.sin(f / 10)} r={34} fill="#8fd3ff33" stroke="#8fd3ff" strokeWidth={4} />
            <text x={45} y={62 + 6 * Math.sin(f / 10)} textAnchor="middle" fontFamily={DL_SERIF} fontSize={52} fill="#8fd3ff">?</text>
          </svg>
        </div>
        <div style={{ position: 'absolute', left: X0 + 6 * STEP - 200, top: 360, width: 290, textAlign: 'center' }}>
          <Label at={TUTOR} color="#8fd3ff" size={26}>YOUR TUTOR</Label>
          <Label at={HUMAN} color={DL.red} size={26}>NOT HUMAN?</Label>
        </div>
      </AbsoluteFill>
      {/* the promise: what the word means — revealed only in ScReveal */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, WORD - 4, WORD + 6) }}>
        <div style={{ ...rise(f, WORD - 2), fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.dim }}>AT THE END</div>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 36 }}>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 180, color: DL.text, opacity: ease(f, SCHOOL3 - 2, SCHOOL3 + 6) }}>SCHOOL</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 180, color: DL.gold, opacity: ease(f, MEANS - 2, MEANS + 6), transform: `scale(${ease(f, MEANS - 2, MEANS + 10, 1.3, 1)})`, display: 'inline-block' }}>= ?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default ScPromise;
