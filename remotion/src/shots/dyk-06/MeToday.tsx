import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, medRungs, Label, Source, AskMark, OnWord, Kid,
  MedProp, PropTag, YearsStrip, YEARS_PAST_MED, medYearsUpTo, Baby, CountUp, hold, pane, cardOut, QGRAD,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 10/14 — ERA 6: today, Merca, Somalia (RESEARCH M8, M9). Header TODAY + "Merca" on its word; the coast from
// frame 0, fishing boats on the sand on "boats". DYK (M8): October 19|77 (each half on its word), A HOSPITAL COOK, THE
// LAST PERSON IN THE WORLD TO CATCH SMALLPOX THE NATURAL WAY on their words; ALI MAOW MAALIN per word; HE RECOVERED on
// "recovered.". THE PATIENT: a child on "child", a sleeve rolled up on "rolling"; MEDICINE DOESN'T WAIT · FOR YOU TO GET
// SICK; a syringe on "stops", IT STOPS THE DISEASE · BEFORE IT STARTS. SMALLPOX · THE ONLY HUMAN DISEASE, the germ
// struck through on "rid"; EXPERTS CERTIFY IT GONE 19|79 and THE WORLD HEALTH ORGANIZATION ANNOUNCES IT 19|80, each date
// on its words. THE YEARS (M9): worldwide ≈ 73 (2024: 73.3) on "seventy" + strip pill. "So what is medicine to you?" =
// "?"; PREVENTION chip on "Prevention." (slot 5, docks); a germ bounces off a shield on "Stop" / "before". The question
// you came for: pills, a gradient "?" on "works?" (pulses on "wrong?"), ✓ on "works?", ✗ on "wrong?". No EraExit and
// no NEXT year (the answer follows, like FdToday). VO me09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'MeToday', durationInSeconds: 58.4, fps: 30, width: 1920, height: 1080 };
const DUR = 1752;

const C = makeCue(vo, 'me09-today', 0.8);
const TODAY = C.at('today,');
const MERCA = C.at('Merca,');
const DOCK = MERCA + 46;
const FISHING = C.at('Fishing');
const BOATS = C.at('boats');
const SAND = C.at('sand.');
const DID = C.at('Did', 1); // 'Did you know' (2 = 'How did medicine')
const OCTOBER = C.at('October');
const NINETEEN1 = C.at('nineteen', 1);
const SEVENTY1 = C.at('seventy', 1);
const HOSPITAL = C.at('hospital');
const COOK = C.at('cook');
const TOWN2 = C.at('town', 2); // 'in this town' (1 = 'a town on the coast')
const BECAME = C.at('became');
const LAST = C.at('last');
const WORLD1 = C.at('world', 1);
const SMALLPOX1 = C.at('smallpox', 1);
const NATURAL = C.at('natural');
const ALI = C.at('Ali');
const MAOW = C.at('Maow');
const MAALIN = C.at('Maalin.');
const RECOVERED = C.at('recovered.');
const PATIENT = C.at('patient.');
const CHILD = C.at('child,');
const ROLLING = C.at('rolling');
const MEDICINE1 = C.at('Medicine', 1);
const WAIT = C.at('wait');
const SICK = C.at('sick');
const ANYMORE = C.at('anymore.');
const STOPS = C.at('stops');
const BEFORE1 = C.at('before', 1);
const SMALLPOX2 = C.at('smallpox', 2);
const ONLY = C.at('only');
const HUMAN = C.at('human');
const RID = C.at('rid');
const EXPERTS = C.at('Experts');
const CERTIFIED = C.at('certified');
const GONE = C.at('gone');
const NINETEEN2 = C.at('nineteen', 2);
const SEVENTY2 = C.at('seventy', 2);
const NINE = C.at('nine.');
const WORLD3 = C.at('World', 3); // 'The World Health Organization' (1 = 'in the world', 2 = 'the world has ever')
const ANNOUNCED = C.at('announced');
const NINETEEN3 = C.at('nineteen', 3);
const EIGHTY = C.at('eighty.');
const HOW1 = C.at('How', 1);
const WORLDWIDE = C.at('Worldwide,');
const NEWBORN = C.at('newborn');
const ABOUT = C.at('about');
const SEVENTY3 = C.at('seventy', 3);
const THREE = C.at('three');
const SO1 = C.at('So', 1); // 'So what is medicine to you?' (2 = "So here's the question")
const YOU_Q = C.at('you?', 5); // 'medicine to you?' (1 'You wake', 2 'Did you', 3 'for you to', 4 'do you live')
const PREVENTION = C.at('Prevention.');
const CHIP_DOCK = PREVENTION + 80;
const STOP = C.at('Stop');
const BEFORE2 = C.at('before', 2);
const SO2 = C.at('So', 2);
const QUESTION = C.at('question');
const CAME = C.at('came');
const HOW2 = C.at('How', 2); // 'How did medicine learn' (1 = 'How long do you live?')
const LEARN = C.at('learn');
const WORKS = C.at('works?');
const AND = C.at('And');
const STILL = C.at('still');
const WRONG = C.at('wrong?');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(RECOVERED, PATIENT);
const CHILD_END = hold(BEFORE1, SMALLPOX2);
const GONE_END = hold(EIGHTY, HOW1);
const YEARS_END = hold(THREE, SO1);
const PREV_END = hold(BEFORE2, SO2);

const BOAT_X = [380, 820, 1260];

// a date that lands in two halves, each on its spoken word ("nineteen" | "seventy seven")
const SplitYear: React.FC<{ a: string; aAt: number; b: string; bAt: number; color?: string; size?: number }> = ({ a, aAt, b, bAt, color = DL.gold, size = 110 }) => (
  <span style={{ fontFamily: DL_SERIF, fontSize: size, lineHeight: 1, color }}><OnWord at={aAt}>{a}</OnWord><OnWord at={bAt}>{b}</OnWord></span>
);

const Shield: React.FC<{ size?: number; glow?: number }> = ({ size = 220, glow = 0 }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 115" style={{ overflow: 'visible', filter: glow > 0.01 ? `drop-shadow(0 0 ${18 * glow}px ${DL.green})` : undefined }}>
    <path d="M50 4 L92 18 L88 62 Q80 96 50 110 Q20 96 12 62 L8 18 Z" fill="#12301e" stroke={DL.green} strokeWidth={5} />
    <path d="M30 58 L45 73 L72 42" fill="none" stroke={DL.green} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MeToday: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the coast stays behind the DYK card's scrim so ON THE SAND is not a flash
  const coast = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, CARD_END - 8, CARD_END));
  const child = pane(f, CARD_END, CHILD_END);
  const gone = pane(f, CHILD_END, GONE_END);
  const years = pane(f, GONE_END, YEARS_END);
  const prev = pane(f, PREVENTION - 2, PREV_END);
  const ask = ease(f, PREV_END, PREV_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12); // stays to the cut, as in FdToday
  const strip = (1 - ease(f, SO2 - 6, SO2 + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const jab = ease(f, STOPS, STOPS + 16);
  const strike = ease(f, RID, RID + 10);
  // the germ flies at the shield on "Stop" and is knocked back on "before"
  const hit = ease(f, STOP, STOP + 18) * (1 - ease(f, BEFORE2, BEFORE2 + 16));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#06161e" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="SOMALIA" dockAt={DOCK} />
      <WakePlace place="Merca, Somalia" at={MERCA} dockAt={DOCK} yearAt={TODAY} />

      {/* the coast: fishing boats rest on the sand */}
      <AbsoluteFill style={{ opacity: coast }}>
        <div style={{ position: 'absolute', left: 160, top: 520, width: 1600, height: 120, background: 'linear-gradient(#1f5f8a, #2f7fa8)', borderRadius: '10px 10px 0 0' }} />
        {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 160, top: 560 + k * 26, width: 1600, height: 4, background: '#8fc8e8', opacity: 0.35, transform: `translateX(${Math.sin(f / 20 + k) * 30}px)` }} />)}
        <div style={{ position: 'absolute', left: 160, top: 640, width: 1600, height: 220, background: 'linear-gradient(#e0c890, #c8a868)', borderRadius: '0 0 10px 10px' }} />
        {BOAT_X.map((x, k) => <div key={k} style={{ position: 'absolute', left: x, top: 540 + (k % 2) * 40, opacity: ease(f, BOATS - 2 + k * 6, BOATS + 6 + k * 6) }}><MedProp kind="boat" size={220} f={f + k * 30} /></div>)}
        <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={Math.max(FISHING, DOCK + 8)} color={DL.warm} size={32}>FISHING BOATS<OnWord at={SAND}> · RESTING ON THE SAND</OnWord></Label></div>
      </AbsoluteFill>

      {/* THE PATIENT: a child rolls up a sleeve */}
      <AbsoluteFill style={{ opacity: child }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PATIENT} color={DL.gold} size={34}>THE PATIENT<OnWord at={CHILD}> · A CHILD</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 220, top: 300, opacity: ease(f, CHILD - 2, CHILD + 4), transform: `scale(${ease(f, CHILD - 2, CHILD + 10, 1.2, 1)})` }}><Kid size={200} color={DL.warm} /></div>
        <div style={{ position: 'absolute', left: 470, top: 420 }}><PropTag kind="sleeve" at={ROLLING} size={170} /></div>
        <div style={{ position: 'absolute', left: 760 - 140 * jab, top: 395 + 30 * jab, opacity: ease(f, STOPS - 2, STOPS + 4), transform: 'rotate(215deg)' }}><MedProp kind="syringe" size={160} level={1 - 0.7 * ease(f, STOPS + 16, STOPS + 34)} /></div>
        <div style={{ position: 'absolute', left: 1000, top: 300, width: 760, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Label at={MEDICINE1} color={DL.text} size={34}>MEDICINE DOESN'T<OnWord at={WAIT}> WAIT</OnWord></Label>
          <Label at={SICK} color={DL.dim} size={30}>FOR YOU TO GET SICK<OnWord at={ANYMORE}> ANYMORE</OnWord></Label>
          <Label at={STOPS} color={DL.green} size={36} style={{ marginTop: 30 }}>IT STOPS THE DISEASE</Label>
          <Label at={BEFORE1} color={DL.green} size={36}>BEFORE IT STARTS</Label>
        </div>
      </AbsoluteFill>

      {/* smallpox: the only human disease ever got rid of — certified 1979, announced 1980 */}
      <AbsoluteFill style={{ opacity: gone }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={SMALLPOX2} color={DL.gold} size={34}>SMALLPOX<OnWord at={ONLY}> · THE ONLY</OnWord><OnWord at={HUMAN}> HUMAN DISEASE</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 270, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ position: 'relative', width: 160, height: 160 }}>
            <MedProp kind="germ" size={160} f={f} dim={0.8 * strike} />
            <svg width={180} height={180} viewBox="0 0 180 180" style={{ position: 'absolute', left: -10, top: -10 }}><line x1={20} y1={160} x2={20 + 140 * strike} y2={160 - 140 * strike} stroke={DL.red} strokeWidth={12} strokeLinecap="round" opacity={strike > 0.01 ? 1 : 0} /></svg>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.text, opacity: ease(f, RID - 2, RID + 4) }}>the world has ever got rid of</div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 500, display: 'flex', alignItems: 'flex-start', gap: 50 }}>
          <div style={{ width: 640, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={EXPERTS} color={DL.dim} size={28}>EXPERTS<OnWord at={CERTIFIED}> CERTIFY IT</OnWord><OnWord at={GONE}> GONE</OnWord></Label>
            <SplitYear a="19" aAt={NINETEEN2} b="79" bAt={SEVENTY2} />
            <Source at={NINE}>Global Commission, December 1979</Source>
          </div>
          <svg width={140} height={60} viewBox="0 0 140 60" style={{ marginTop: 90, opacity: ease(f, WORLD3 - 2, WORLD3 + 4) }}><line x1={4} y1={30} x2={4 + 110 * ease(f, WORLD3, WORLD3 + 14)} y2={30} stroke={DL.gold} strokeWidth={6} /><path d="M118 14 L136 30 L118 46 Z" fill={DL.gold} opacity={ease(f, WORLD3 + 10, WORLD3 + 14)} /></svg>
          <div style={{ width: 700, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={WORLD3} color={DL.dim} size={28}>THE WORLD HEALTH ORGANIZATION<OnWord at={ANNOUNCED}> ANNOUNCES IT</OnWord></Label>
            <SplitYear a="19" aAt={NINETEEN3} b="80" bAt={EIGHTY} color={DL.green} />
            <Source at={EIGHTY}>WHO, 8 May 1980</Source>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 840 }}><Source at={RID}>the only human disease eradicated so far · WHO · NLM</Source></div>
      </AbsoluteFill>

      {/* THE YEARS */}
      <AbsoluteFill style={{ opacity: years }}>
        <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={HOW1} color={DL.gold} size={34}>THE YEARS · HOW LONG DO YOU LIVE?<OnWord at={WORLDWIDE}> · WORLDWIDE</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 900, top: 300, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
        <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, ABOUT - 2, ABOUT + 4) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={73} a={ABOUT} b={THREE + 4} prefix="≈ " /> years</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>at birth · a newborn · UN WPP 2024 via OWID<OnWord at={THREE}> (world 2024: 73.3)</OnWord></span>
        </div>
      </AbsoluteFill>

      {/* "So what is medicine to you?" — Prevention. Stop the disease before it starts. */}
      <AskMark at={YEARS_END} out={PREVENTION + 2} left={760} top={250} pulseAt={YOU_Q} />
      <AbsoluteFill style={{ opacity: prev }}>
        <div style={{ position: 'absolute', left: 260, top: 260, opacity: ease(f, STOP - 2, STOP + 4) }}><Shield size={200} glow={ease(f, BEFORE2, BEFORE2 + 8) * (1 - ease(f, BEFORE2 + 14, BEFORE2 + 30))} /></div>
        <div style={{ position: 'absolute', left: 590 - 120 * hit, top: 300, opacity: ease(f, STOP - 2, STOP + 4) }}><MedProp kind="germ" size={110} f={f} /></div>
        <div style={{ position: 'absolute', left: 720, top: 280, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.gold, opacity: ease(f, STOP - 2, STOP + 4) }}>Stop the disease</div>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.green, opacity: ease(f, BEFORE2 - 2, BEFORE2 + 4) }}>before it starts.</div>
        </div>
      </AbsoluteFill>
      <MedChip text="PREVENTION" at={PREVENTION} dockAt={CHIP_DOCK} slot={5} left={260} top={720} />

      {/* the question you came for — the words live in the band; the picture: medicine under a "?" */}
      <AbsoluteFill style={{ opacity: ask, alignItems: 'center', paddingRight: 360 }}>
        <div style={{ marginTop: 230, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 4, color: DL.dim, opacity: ease(f, QUESTION - 2, QUESTION + 4) }}>THE QUESTION YOU CAME FOR</div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 50 }}>
          <div style={{ opacity: ease(f, PREV_END + 4, PREV_END + 14) }}><MedProp kind="pills" size={200} glow={0.3} /></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 240, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, WORKS - 2, WORKS + 4), transform: `scale(${ease(f, WORKS - 2, WORKS + 10, 1.3, 1) * ease(f, WRONG - 4, WRONG + 10, 1, 1.15)})` }}>?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: DL_MONO, fontWeight: 700, fontSize: 90, lineHeight: 1 }}>
            <span style={{ color: DL.green, opacity: ease(f, WORKS - 2, WORKS + 4) }}>✓</span>
            <span style={{ color: DL.red, opacity: ease(f, WRONG - 2, WRONG + 4) }}>✗</span>
          </div>
        </div>
      </AbsoluteFill>

      <YearsStrip items={[...medYearsUpTo(5), { ...YEARS_PAST_MED[5], at: SEVENTY3 }]} show={strip} />
      <MedLadder rungs={[...medRungs(5), { year: 'TODAY', label: 'PREVENTION', at: CHIP_DOCK + 10 }]} show={ladder} />
      <DidYouKnowThat at={DID} out={CARD_END}>
        <OnWord at={OCTOBER}>in October </OnWord><OnWord at={NINETEEN1}>19</OnWord><OnWord at={SEVENTY1}>77, </OnWord><OnWord at={HOSPITAL}>a hospital </OnWord><span style={{ opacity: ease(f, COOK - 2, COOK + 4), color: '#ffd23f' }}>cook </span>
        <OnWord at={TOWN2}>in this town </OnWord><OnWord at={BECAME}>became </OnWord><span style={{ opacity: ease(f, LAST - 2, LAST + 4), color: '#ff9a1f' }}>the last person</span><OnWord at={WORLD1}> in the world </OnWord>
        <OnWord at={SMALLPOX1}>to catch smallpox </OnWord><span style={{ opacity: ease(f, NATURAL - 2, NATURAL + 4), color: '#ff9a1f', fontStyle: 'italic' }}>the natural way?</span>
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 30, fontFamily: DL_MONO, fontSize: 36, color: '#ffffff' }}>
          <span><OnWord at={ALI}>ALI</OnWord><OnWord at={MAOW}> MAOW</OnWord><OnWord at={MAALIN}> MAALIN</OnWord></span>
          <span style={{ color: '#34d058', opacity: ease(f, RECOVERED - 2, RECOVERED + 4) }}>· HE RECOVERED.</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, RECOVERED - 2, RECOVERED + 4) }}>last natural case · Merca, Somalia, October 1977 · WHO</div>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: "So here's the question", at: SO2 }, { text: 'you came for.', at: CAME }, { text: 'How did medicine', at: HOW2 }, { text: 'learn to tell what works?', at: LEARN }, { text: 'And what are we', at: AND }, { text: 'still getting wrong?', at: STILL }]} />
      <EpisodeHud year="TODAY" episode="06" />
    </AbsoluteFill>
  );
};
export default MeToday;
