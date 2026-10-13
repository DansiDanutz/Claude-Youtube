import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import { AskMark, EpisodeHud, WakePlace, win, SunCliffhanger, SchoolChip, SchoolLadder, schoolRungs, Kid, Screen, SchoolHouse, Label, Source, StampText } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 10/14 — ERA 6: today (RESEARCH F17, F18). TODAY slams, underline on "today"; the phone buzzes on
// "buzzes", HOMEWORK DUE 23:59 on "midnight"; a question bubble → a screen answers on "screen". DYK (F17, UNESCO):
// ≈ 1.6 BILLION on "billion", > 9 IN 10 on "nine". Lessons move: KITCHENS · BEDROOMS · LAPTOPS · PHONES on their
// words; 463 MILLION (UNICEF, Aug 2020) counts to "million", NO REMOTE LESSONS on "remote". ALWAYS ON chip (slot 5)
// on "on." — a school + a screen that never switches off. The buildings shut: windows go dark on "shut". The
// cliffhanger brings back the hook card: SCHOOL = ? on "school" (3rd). No EraExit (the answer follows). VO sc09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'ScToday', durationInSeconds: 45.5333, fps: 30, width: 1920, height: 1080 };
const DUR = 1366;

const C = makeCue(vo, 'sc09-today', 0.8);
const TODAY = C.at('today');
const PHONE = C.at('phone');
const DOCK = PHONE;
const BUZZES = C.at('buzzes');
const HOMEWORKS = C.at("Homework's");
const MIDNIGHT = C.at('midnight');
const QUESTION1 = C.at('question', 1);
const ASK = C.at('ask');
const SCREEN1 = C.at('screen', 1);
const DID = C.at('Did', 1);
const APRIL = C.at('April');
const ONE = C.at('one');
const BILLION = C.at('billion');
const LEARNERS = C.at('learners');
const SENT = C.at('sent');
const SCHOOL1 = C.at('school', 1); // 'home from school?'
const LOT = C.at('lot');
const NINE = C.at('nine');
const STUDENTS = C.at('students');
const LESSONS1 = C.at('Lessons', 1);
const KITCHENS = C.at('kitchens');
const BEDROOMS = C.at('bedrooms');
const LAPTOPS = C.at('laptops');
const PHONES = C.at('phones');
const FOUR = C.at('four');
const MILLION = C.at('million');
const COULDNT = C.at("couldn't");
const REMOTE = C.at('remote');
const SO1 = C.at('So', 1);
const ALWAYS = C.at('Always');
const ON2 = C.at('on', 2); // 'Always on.' (1 = 'on Earth')
const CHIP_DOCK = ON2 + 95;
const CLASSROOM = C.at('classroom');
const SCREEN2 = C.at('screen', 2);
const CLOSES = C.at('closes');
const BUILDINGS = C.at('buildings');
const SHUT = C.at('shut');
const MISS = C.at('miss');
const SO2 = C.at('So', 2);
const QUESTION2 = C.at('question', 2);
const WHAT = C.at('What');
const SCHOOL3 = C.at('school', 3);
const BEFORE = C.at('before');

const ScToday: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const morning = win(f, DOCK - 4, DID - 2, 8, 8);
  const moved = win(f, LESSONS1 - 2, SO1, 4, 10);
  const always = win(f, SO1 - 2, SO2, 4, 10);
  const cliff = ease(f, SO2 - 2, SO2 + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, SO2 - 2, SO2 + 8));
  const rungs = [...schoolRungs(5), { year: 'TODAY', label: 'ALWAYS ON', at: CHIP_DOCK + 10 }];
  const buzz = f >= BUZZES ? Math.sin(f * 2.4) * 6 * (1 - ease(f, BUZZES, BUZZES + 24)) : 0;
  const n463 = Math.round(463 * ease(f, FOUR - 4, MILLION + 2));
  const dark = ease(f, SHUT - 2, SHUT + 12);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1a2a" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="NOW" dockAt={DOCK} />
      <WakePlace place="" at={0} dockAt={DOCK} yearAt={TODAY} />
      {/* phone, homework, a question for a screen */}
      <AbsoluteFill style={{ opacity: morning }}>
        <div style={{ position: 'absolute', left: 240, top: 280, transform: `translateX(${buzz}px) rotate(${buzz * 0.6}deg)` }}><Screen kind="phone" size={300} on={ease(f, BUZZES - 2, BUZZES + 6)} /></div>
        <div style={{ position: 'absolute', left: 430, top: 330, padding: '14px 22px', borderRadius: 14, background: '#1c2433', border: `2px solid ${DL.sky}`, opacity: ease(f, HOMEWORKS - 2, HOMEWORKS + 8), transform: `translateY(${ease(f, HOMEWORKS - 2, HOMEWORKS + 10, -16, 0)}px)` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.sky }}>HOMEWORK DUE</div>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: DL.text, opacity: ease(f, MIDNIGHT - 2, MIDNIGHT + 6) }}>23:59</div>
        </div>
        <div style={{ position: 'absolute', left: 980, top: 300, opacity: ease(f, QUESTION1 - 2, QUESTION1 + 8) }}><Kid size={120} /></div>
        <div style={{ position: 'absolute', left: 1110, top: 250, padding: '12px 26px', borderRadius: 20, background: DL.text, fontFamily: DL_SERIF, fontSize: 60, color: DL.bg, opacity: ease(f, QUESTION1 - 2, QUESTION1 + 8) }}>?</div>
        <div style={{ position: 'absolute', left: 1240, top: 360, opacity: ease(f, ASK - 2, ASK + 8) }}><Screen size={300} on={ease(f, SCREEN1 - 2, SCREEN1 + 8)} /></div>
        <div style={{ position: 'absolute', left: 980, top: 620 }}><Label at={SCREEN1} color={DL.sky} size={30}>ANY QUESTION → ASK A SCREEN</Label></div>
      </AbsoluteFill>

      {/* lessons move home; 463 million can't follow */}
      <AbsoluteFill style={{ opacity: moved }}>
        <div style={{ position: 'absolute', left: 200, top: 240 }}><Label at={LESSONS1} color={DL.dim} size={30}>LESSONS MOVED…</Label></div>
        <div style={{ position: 'absolute', left: 200, top: 300, display: 'flex', gap: 22 }}>
          {([['KITCHENS', KITCHENS], ['BEDROOMS', BEDROOMS], ['LAPTOPS', LAPTOPS], ['PHONES', PHONES]] as const).map(([t, at]) => (
            <span key={t} style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${ease(f, at - 2, at + 8, 1.3, 1)})`, padding: '14px 24px', borderRadius: 12, border: `2px solid ${DL.sky}`, background: '#0e1622', fontFamily: DL_MONO, fontSize: 32, color: DL.sky }}>{t}</span>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 200, top: 420, display: 'flex', gap: 30, alignItems: 'flex-end', opacity: ease(f, LAPTOPS - 4, LAPTOPS + 6) }}>
          <Screen size={220} on={1} /><Screen kind="phone" size={170} on={1} />
        </div>
        <div style={{ position: 'absolute', left: 780, top: 420, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Label at={C.at('least')} color={DL.dim} size={30}>BUT AT LEAST</Label>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, color: DL.red, opacity: ease(f, FOUR - 4, FOUR + 2), fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{n463}<span style={{ fontSize: 60, opacity: ease(f, MILLION - 2, MILLION + 6) }}> MILLION</span></div>
          <Label at={C.at('kids')} color={DL.text} size={32}>KIDS</Label>
          <StampText text="NO REMOTE LESSONS AT ALL" at={REMOTE} size={36} tilt={-2} />
        </div>
        <div style={{ position: 'absolute', left: 200, top: 860 }}><Source at={COULDNT}>UNICEF, Remote Learning Reachability, Aug 2020 · schoolchildren in ~100 countries</Source></div>
      </AbsoluteFill>

      {/* always on: a classroom, plus a screen that never closes — then the buildings shut */}
      <AbsoluteFill style={{ opacity: always }}>
        <div style={{ position: 'absolute', left: 240, top: 300, opacity: ease(f, CLASSROOM - 4, CLASSROOM + 6) }}><SchoolHouse size={330} lit={1 - dark} /></div>
        <div style={{ position: 'absolute', left: 640, top: 380, fontFamily: DL_SERIF, fontSize: 120, color: DL.gold, opacity: ease(f, C.at('plus') - 2, C.at('plus') + 6) }}>+</div>
        <div style={{ position: 'absolute', left: 760, top: 340, opacity: ease(f, SCREEN2 - 2, SCREEN2 + 8) }}><Screen size={380} on={1} /></div>
        <div style={{ position: 'absolute', left: 820, top: 640 }}><Label at={CLOSES} color={DL.sky} size={30}>NEVER CLOSES · 24/7</Label></div>
        <div style={{ position: 'absolute', left: 240, top: 640, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label at={BUILDINGS} color={DL.text} size={30}>WHEN THE BUILDINGS SHUT…</Label>
          <Label at={LOT} color={DL.gold} size={30}>…A LOT OF US <span style={{ opacity: ease(f, MISS - 2, MISS + 6) }}>MISSED THEM</span></Label>
        </div>
      </AbsoluteFill>
      <AskMark at={SO1} out={ALWAYS + 4} left={300} top={230} pulseAt={C.at('now', 1)} />
      <SchoolChip text="ALWAYS ON" at={ON2} dockAt={CHIP_DOCK} slot={5} left={1000} top={760} />

      {/* cliffhanger: the hook question returns */}
      <AbsoluteFill style={{ opacity: cliff, alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Label at={QUESTION2} color={DL.red} size={34}>THE QUESTION <span style={{ opacity: ease(f, C.at('came') - 2, C.at('came') + 6) }}>YOU CAME FOR</span></Label>
          <div style={{ marginTop: 30, display: 'flex', alignItems: 'baseline', gap: 36 }}>
            <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 180, color: DL.text, opacity: ease(f, QUESTION2 - 2, QUESTION2 + 8), display: 'inline-block', transform: `scale(${1 + 0.06 * ease(f, SCHOOL3, SCHOOL3 + 5) * (1 - ease(f, SCHOOL3 + 8, SCHOOL3 + 24))})` }}>SCHOOL</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 180, color: DL.gold, opacity: ease(f, QUESTION2 + 4, QUESTION2 + 14), transform: `scale(${1 + 0.15 * ease(f, BEFORE - 2, BEFORE + 4) * (1 - ease(f, BEFORE + 8, BEFORE + 24))})`, display: 'inline-block' }}>= ?</span>
          </div>
        </div>
      </AbsoluteFill>

      <SchoolLadder rungs={rungs} show={ladder} />
      <DidYouKnowThat at={DID} out={LESSONS1}>
        <span style={{ opacity: ease(f, APRIL - 4, APRIL + 6) }}>in April 2020,</span>
        <span style={{ opacity: ease(f, ONE - 4, ONE + 6), color: '#ff9a1f', fontStyle: 'italic' }}> about 1.6 billion</span>
        <span style={{ opacity: ease(f, LEARNERS - 4, LEARNERS + 6) }}> learners</span>
        <span style={{ opacity: ease(f, SENT - 4, SENT + 6) }}> were sent home</span><span style={{ opacity: ease(f, SCHOOL1 - 4, SCHOOL1 + 6) }}> from school.</span>
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 26 }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 90, color: '#ff9a1f', opacity: ease(f, BILLION - 2, BILLION + 6) }}>≈ 1.6 BN</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: '#34d058' }}><span style={{ opacity: ease(f, C.at('more') - 2, C.at('more') + 6) }}>&gt; </span><span style={{ opacity: ease(f, NINE - 2, NINE + 6) }}>9 IN 10</span></span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: '#e8e4ff', opacity: ease(f, STUDENTS - 2, STUDENTS + 6) }}>STUDENTS ON EARTH</span>
        </div>
        <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, APRIL, APRIL + 10) }}>UNESCO school-closure monitoring · peak, April 2020 · 91 % of enrolled learners</div>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: "So here's the question you came for.", at: SO2 }, { text: 'What did the word school mean,', at: WHAT }, { text: 'before any of this?', at: BEFORE }]} />
      <EpisodeHud year="TODAY" episode="03" />
    </AbsoluteFill>
  );
};
export default ScToday;
