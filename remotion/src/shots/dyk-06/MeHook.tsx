import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import { MedProp, Label, Source, OnWord, QGRAD, BLOOD, hold, pane, cardOut } from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 1/14 — cold open (STORY §2; RESEARCH M2). Frame 0: a candle, a basin and a lancet on a dark table.
// LAST TIME · NO. 05 ASKED on "Last"; its question builds word by word ("How", "what", "heals"). 1799 (M2): the year on
// "seventeen", Washington in bed on "George", a red glow at the throat + SORE THROAT on "sore", AGED 67 on "sixty",
// three doctors walk in on "Three" (THREE DOCTORS on "doctors"). me02: DID YOU KNOW THAT… card, one clause per key word
// ("in", "drained", "by", "around", "blood?"); a bowl fills from "drained", a body outline drains two of five bands on
// "fifths", the M2 source line on "blood?" (every hedge kept). Then "They were trained. They meant well." and the two
// questions, the gradient "?" on "wrong?". No "count", "trial", "evidence" or "73" is shown here.
// VO me01 @0.6 s, me02 @13.424 s.
// =============================================================================
export const compositionConfig = { id: 'MeHook', durationInSeconds: 28.333333333333332, fps: 30, width: 1920, height: 1080 };
const DUR = 850;

const A = makeCue(vo, 'me01-hook', 0.6);
const B = makeCue(vo, 'me02-question', 13.424);
const LAST = A.at('Last');
const QUESTION = A.at('question.');
const HOW = A.at('How');
const WHAT = A.at('what');
const HEALS = A.at('heals');
const IN = A.at('In');
const SEVENTEEN = A.at('seventeen');
const GEORGE = A.at('George');
const SORE = A.at('sore');
const SIXTY = A.at('sixty');
const THREE = A.at('Three');
const DOCTORS = A.at('doctors');
const CAME2 = A.at('came', 2); // 'came to help' (1 = 'came down with')
const DID = B.at('Did', 1); // (2 = 'how did anyone')
const IN_B = B.at('in');
const DRAINED = B.at('drained,');
const BY = B.at('by');
const AROUND = B.at('around');
const FIFTHS = B.at('fifths');
const BLOOD_W = B.at('blood?');
const THEY1 = B.at('They', 2); // 'They were trained.' (1 = 'they drained')
const TRAINED = B.at('trained.');
const THEY2 = B.at('They', 3); // 'They meant well.'
const WELL = B.at('well.');
const SO = B.at('So');
const FIND = B.at('find');
const WORKS = B.at('works?');
const AND = B.at('And');
const STILL = B.at('still');
const WRONG = B.at('wrong?');
// panels hold ≥ 1.5 s after their last reveal (kit `hold`; the DYK card's 10 f exit = `cardOut`)
const QUOTE_END = hold(HEALS, IN);
const CARD_END = cardOut(BLOOD_W, THEY1);

// frame 0: the bedside still life (candle, basin, lancet) under the candle's glow
const StillLife: React.FC<{ f: number }> = ({ f }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 5);
  return (
    <>
      <div style={{ position: 'absolute', left: 300, top: 260, width: 800, height: 700, background: `radial-gradient(ellipse at 50% 55%, #ffcf5a${Math.round(46 * flick).toString(16).padStart(2, '0')}, transparent 65%)` }} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <ellipse cx={960} cy={860} rx={720} ry={120} fill="#22180f" />
        <ellipse cx={960} cy={846} rx={700} ry={104} fill="#2e2216" />
      </svg>
      <div style={{ position: 'absolute', left: 560, top: 560 }}><MedProp kind="candle" size={260} f={f} /></div>
      <div style={{ position: 'absolute', left: 840, top: 640 }}><MedProp kind="basin" size={260} f={f} level={0.5} /></div>
      <div style={{ position: 'absolute', left: 1160, top: 680 }}><MedProp kind="lancet" size={200} f={f} /></div>
    </>
  );
};

// 1799: Washington in bed (shot-only drawing); `sore` 0–1 lights the throat
const SickBed: React.FC<{ sore: number }> = ({ sore }) => (
  <svg width={620} height={340} viewBox="0 0 620 340" style={{ overflow: 'visible' }}>
    <rect x={20} y={40} width={22} height={260} rx={6} fill="#5a3e24" />
    <rect x={578} y={140} width={22} height={160} rx={6} fill="#5a3e24" />
    <rect x={30} y={190} width={560} height={60} rx={10} fill="#efe8dc" stroke="#9a9080" strokeWidth={4} />
    <ellipse cx={120} cy={176} rx={70} ry={30} fill="#ffffff" stroke="#9a9080" strokeWidth={3} />
    <path d="M170 196 Q330 120 590 196 L590 250 L170 250 Z" fill="#7a8aa8" stroke="#4a5a78" strokeWidth={4} />
    <circle cx={128} cy={150} r={38} fill="#e8c0a0" stroke="#b8906a" strokeWidth={3} />
    <path d="M92 140 Q98 104 132 106 Q164 108 166 140 Q160 120 130 122 Q104 122 92 140 Z" fill="#eeeeee" stroke="#bbbbbb" strokeWidth={2} />
    <circle cx={160} cy={192} r={34 * sore} fill={DL.red} opacity={0.35 * sore} />
    <circle cx={160} cy={192} r={14 * sore} fill={DL.red} opacity={0.7 * sore} />
  </svg>
);

const Doctor: React.FC<{ coat: string }> = ({ coat }) => (
  <svg width={130} height={250} viewBox="0 0 130 250">
    <circle cx={65} cy={36} r={26} fill="#e0b896" />
    <path d="M39 30 Q42 6 65 6 Q88 6 91 30 Q92 44 84 50 L84 30 Q65 22 46 30 L46 50 Q38 44 39 30 Z" fill="#e8e8e8" />
    <path d="M24 248 L32 96 Q36 72 65 70 Q94 72 98 96 L106 248 Z" fill={coat} />
    <path d="M56 74 L65 100 L74 74 Z" fill="#f4efe0" />
  </svg>
);

// the DID YOU KNOW THAT… visual: a body outline whose blood drains two of five bands on "fifths"
const BodyDrain: React.FC<{ level: number }> = ({ level }) => (
  <svg width={120} height={200} viewBox="0 0 120 200">
    <defs>
      <clipPath id="mehook-body">
        <circle cx={60} cy={26} r={20} />
        <path d="M22 196 C22 112 32 52 60 52 C88 52 98 112 98 196 Z" />
      </clipPath>
    </defs>
    <rect x={0} y={0} width={120} height={200} fill="#2a2440" clipPath="url(#mehook-body)" />
    <rect x={0} y={6 + 190 * (1 - level)} width={120} height={200} fill={BLOOD} clipPath="url(#mehook-body)" />
    {[1, 2, 3, 4].map((k) => <line key={k} x1={10} x2={110} y1={6 + 38 * k} y2={6 + 38 * k} stroke="#0b1030" strokeWidth={2} strokeDasharray="6 5" clipPath="url(#mehook-body)" />)}
    <circle cx={60} cy={26} r={20} fill="none" stroke="#c8cdf0" strokeWidth={3} />
    <path d="M22 196 C22 112 32 52 60 52 C88 52 98 112 98 196 Z" fill="none" stroke="#c8cdf0" strokeWidth={3} />
  </svg>
);

const MeHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const still = 1 - 0.45 * ease(f, LAST - 4, LAST + 10) - 0.4 * ease(f, QUOTE_END - 6, QUOTE_END + 6);
  const quote = pane(f, LAST, QUOTE_END);
  const past = pane(f, QUOTE_END, CARD_END);
  const sore = ease(f, SORE - 2, SORE + 10) * (0.8 + 0.2 * Math.sin(f / 6));
  const drained = 1 - 0.4 * ease(f, FIFTHS - 2, FIFTHS + 16);
  const bowl = 0.15 + 0.75 * ease(f, DRAINED - 2, BLOOD_W + 20);
  const end = ease(f, WRONG - 2, WRONG + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a0e08" />
      <Vignette />
      <AbsoluteFill style={{ opacity: still }}><StillLife f={f} /></AbsoluteFill>

      {/* No. 05's question */}
      <AbsoluteFill style={{ opacity: quote }}>
        <div style={{ position: 'absolute', left: 260, right: 260, top: 200, padding: '30px 44px', borderRadius: 18, background: '#0e0b0af0', borderLeft: `6px solid ${DL.gold}`, border: `1px solid ${DL.border}` }}>
          <Label at={LAST} color={DL.dim} size={28}>LAST TIME · NO. 05 ASKED<OnWord at={QUESTION}> A QUESTION</OnWord></Label>
          <div style={{ marginTop: 16, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.text }}>
            <OnWord at={HOW}>How did we find out </OnWord><OnWord at={WHAT}>what really </OnWord>
            <span style={{ opacity: ease(f, HEALS - 2, HEALS + 4), color: DL.gold }}>heals us?</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* 1799: Washington, a sore throat, aged 67, three doctors */}
      <AbsoluteFill style={{ opacity: past }}>
        <div style={{ position: 'absolute', left: 260, top: 200 }}><Label at={SEVENTEEN} color={DL.gold} size={40}>1799</Label></div>
        <div style={{ position: 'absolute', left: 220, top: 330, opacity: ease(f, GEORGE - 2, GEORGE + 6), transform: `translateY(${ease(f, GEORGE - 2, GEORGE + 10, 20, 0)}px)` }}><SickBed sore={sore} /></div>
        <div style={{ position: 'absolute', left: 980, top: 250, width: 760 }}>
          <div style={{ fontFamily: DL_SERIF, fontSize: 68, color: DL.text, opacity: ease(f, GEORGE - 2, GEORGE + 4) }}>George Washington</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 30 }}>
            <Label at={SORE} color={DL.red} size={32}>SORE THROAT</Label>
            <Label at={SIXTY} color={DL.dim} size={32}>· AGED 67</Label>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 470, display: 'flex', gap: 20 }}>
          {['#2a2a3a', '#3a2a22', '#22303a'].map((coat, i) => {
            const t = ease(f, THREE - 2 + i * 4, CAME2 + 10 + i * 4);
            return <div key={coat} style={{ opacity: ease(f, THREE - 2 + i * 4, THREE + 6 + i * 4), transform: `translateX(${(1 - t) * 220}px)` }}><Doctor coat={coat} /></div>;
          })}
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 740 }}><Label at={DOCTORS} color={DL.gold} size={32}>THREE DOCTORS</Label></div>
      </AbsoluteFill>

      {/* the questions: they were trained, they meant well — so how did anyone find out what works? */}
      <AbsoluteFill style={{ opacity: ease(f, CARD_END - 2, CARD_END + 4) }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 150, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 60, color: DL.warm }}>
          <OnWord at={CARD_END}>They were </OnWord><OnWord at={TRAINED}>trained. </OnWord><OnWord at={THEY2}>They meant </OnWord><OnWord at={WELL}>well.</OnWord>
        </div>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 270, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 76, lineHeight: 1.15, color: DL.text }}>
          <OnWord at={SO}>So how did anyone ever </OnWord><OnWord at={FIND}>find out what really </OnWord><span style={{ opacity: ease(f, WORKS - 2, WORKS + 4), color: DL.green }}>works?</span>
        </div>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 470, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 70, color: DL.red }}>
          <OnWord at={AND}>And what are we </OnWord><OnWord at={STILL}>still getting </OnWord><OnWord at={WRONG}>wrong?</OnWord>
        </div>
        <div style={{ position: 'absolute', left: 960 - 110, top: 590, width: 220, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 600, fontSize: 200, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: end, transform: `scale(${ease(f, WRONG - 2, WRONG + 12, 1.4, 1)})` }}>?</div>
      </AbsoluteFill>

      <DidYouKnowThat at={DID} out={CARD_END}>
        <OnWord at={IN_B}>in a single day, </OnWord><OnWord at={DRAINED}>they drained, </OnWord>
        <span style={{ opacity: ease(f, BY - 2, BY + 4), fontStyle: 'italic', color: '#c8cdf0' }}>by some estimates, </span>
        <span style={{ opacity: ease(f, AROUND - 2, AROUND + 4), color: '#ffd23f' }}>around two fifths </span><OnWord at={BLOOD_W}>of his blood?</OnWord>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 34 }}>
          <div style={{ opacity: ease(f, AROUND - 2, AROUND + 4) }}><BodyDrain level={drained} /></div>
          <span style={{ fontFamily: DL_MONO, fontSize: 40, color: '#ffd23f', opacity: ease(f, FIFTHS - 2, FIFTHS + 4) }}>≈ 2/5</span>
          <div style={{ opacity: ease(f, DRAINED - 2, DRAINED + 4) }}><MedProp kind="bowl" size={150} level={bowl} /></div>
          <Source at={BLOOD_W} style={{ width: 560, color: '#c8cdf0' }}>≈ 2.4 L over about 12 h · PBS NewsHour, Hektoen · estimates vary</Source>
        </div>
      </DidYouKnowThat>
    </AbsoluteFill>
  );
};
export default MeHook;
