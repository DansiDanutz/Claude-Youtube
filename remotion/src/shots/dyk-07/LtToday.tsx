import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, lightRungs, Label, Source, AskMark, OnWord, PeopleRow, Kid,
  LightProp, PriceStrip, priceUpTo, NightSky, LightFigure, hold, pane, cardOut, QGRAD, FLAME,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 10/14 — ERA 6: tonight, your window (RESEARCH L11, L13, L14). Header TODAY + "your window" on "window"; a
// window onto a city at night from frame 0, COUNT THE LIGHTS with a running count: streetlights on "Streetlights,", signs
// on "signs,", an office block on "office" whose windows NEVER SWITCH OFF. DYK (L13): more than a third of all people /
// can't see the Milky Way from home?; EUROPE 6 IN 10 (six of ten figures lit on "six"), NORTH AMERICA NEARLY 8 IN 10 on
// "eight"; Falchi 2016. YOUR NIGHT: NOBODY DECIDED THIS; IN BRITAIN · BY 2000; one person on "person", 6,500× on "thousand"
// (2) with MORE LIGHT … THAN IN 1800 per word (Fouquet & Pearson, L11). WE BOUGHT MORE: the price falls on "fell"; rooms,
// hours, streets each on its word. SPEEDING UP: 2023 on "twenty" … "three", 50,000+ REPORTS, ordinary people counting
// stars under a sky that brightens on "brighter" (stars thin, glow rises), ≈ 9.6 % A YEAR on "ten" (3) (Kyba 2023, L14).
// "So what is light now?" = "?"; TOO CHEAP TO SWITCH OFF chip on "cheap" (slot 5, docks); a switch that stays on.
// Cliffhanger: the window's skyglow rises on "night" (3) and a "?" on "off?". No EraExit and no NEXT year (the answer
// follows, like MeToday). Price strip: all five pills, hidden under the band. VO lt09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'LtToday', durationInSeconds: 56.4667, fps: 30, width: 1920, height: 1080 };
const DUR = 1694;

const C = makeCue(vo, 'lt09-today', 0.8);
const TODAY = C.at('today.');
const TONIGHT = C.at('tonight.');
const WINDOW = C.at('window');
const DOCK = WINDOW + 46;
const COUNT = C.at('count');
const LIGHTS = C.at('lights');
const STREETLIGHTS = C.at('Streetlights,');
const SIGNS = C.at('signs,');
const OFFICE = C.at('office');
const NEVER = C.at('never');
const SWITCHES = C.at('switches');
const OFF1 = C.at('off.', 1); // 'never switches off.' (2 = 'switch off.', 3 = 'night off?')
const DID = C.at('Did');
const MORE1 = C.at('more', 1); // 'more than a third' (2 'times more light', 3 'bought more.', 4–6 'More rooms/hours/streets', 7 'more than fifty')
const THIRD = C.at('third');
const PEOPLE1 = C.at('people', 1); // 'all people' (2 = 'ordinary people')
const CANT = C.at("can't");
const MILKY = C.at('Milky');
const HOME = C.at('home?');
const EUROPE = C.at('Europe,');
const SIX1 = C.at('six', 1); // 'six in ten' (2 = 'six and a half')
const TEN1 = C.at('ten.', 1); // 'six in ten.' (2 'eight in ten.', 3 'ten percent')
const NORTH = C.at('North');
const NEARLY = C.at('nearly');
const EIGHT = C.at('eight');
const TEN2 = C.at('ten.', 2);
const HERES = C.at("Here's");
const NIGHT1 = C.at('night.', 1); // 'your night.' (2 'night sky', 3 'the night off?')
const NOBODY = C.at('Nobody');
const DECIDED = C.at('decided');
const BRITAIN = C.at('Britain,');
const TWO = C.at('two');
const EACH = C.at('each');
const PERSON = C.at('person');
const SIX2 = C.at('six', 2);
const THOUSAND2 = C.at('thousand', 2); // 'half thousand times' (1 'two thousand,', 3 'fifty thousand')
const MORE2 = C.at('more', 2);
const EIGHTEEN = C.at('eighteen');
const HUNDRED = C.at('hundred.');
const EVERY = C.at('Every');
const PRICE = C.at('price');
const FELL = C.at('fell,');
const BOUGHT = C.at('bought');
const ROOMS = C.at('rooms,');
const HOURS = C.at('hours,');
const STREETS = C.at('streets.');
const AND2 = C.at('And', 2); // "And it's speeding up." (1 = 'window and count')
const SPEEDING = C.at('speeding');
const TWENTY1 = C.at('twenty', 1);
const THREE = C.at('three,');
const SCIENTISTS = C.at('scientists');
const FIFTY = C.at('fifty');
const REPORTS = C.at('reports');
const ORDINARY = C.at('ordinary');
const COUNTING = C.at('counting');
const STARS = C.at('stars.');
const THEY = C.at('They');
const NIGHT2 = C.at('night', 2);
const BRIGHTER = C.at('brighter');
const ALMOST = C.at('almost');
const TEN3 = C.at('ten', 3);
const YEAR2 = C.at('year.', 2); // 'a year.' (1 = 'the year two thousand')
const SO1 = C.at('So', 1); // 'So what is light now?' (2 = 'So, what happened')
const NOW_Q = C.at('now?');
const TOO = C.at('Too');
const CHEAP = C.at('cheap');
const CHIP_DOCK = CHEAP + 80;
const SWITCH1 = C.at('switch', 1); // 'switch off.' (switches/switched are other tokens)
const OFF2 = C.at('off.', 2);
const SO2 = C.at('So,', 2);
const HAPPENED = C.at('happened');
const WHEN = C.at('when');
const SWITCHED = C.at('switched');
const NIGHT3 = C.at('night', 3);
const OFF3 = C.at('off?', 3);
const YOURE = C.at("You're");
const OUT = C.at('out.');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(TEN2, HERES);
const NIGHT_END = hold(HUNDRED, EVERY);
const BOUGHT_END = hold(STREETS, AND2);
const STARS_END = hold(YEAR2, SO1);
const CHEAP_END = hold(OFF2, SO2);

// the city seen through your window (shot-only drawing): streetlights, signs, an office block that never goes dark
const POSTS = [300, 520, 740, 960, 1180, 1400];
const SIGN_SPOTS = [{ x: 420, y: 520, w: 140, c: '#ff4a8a' }, { x: 860, y: 480, w: 180, c: '#4ad8ff' }, { x: 1300, y: 540, w: 120, c: '#ffd23f' }];
const OFFICE_WINDOWS = Array.from({ length: 24 }, (_, i) => ({ x: 1480 + (i % 4) * 54, y: 300 + Math.floor(i / 4) * 64 }));
const COUNT_STREET = POSTS.length;
const COUNT_SIGNS = SIGN_SPOTS.length;

const City: React.FC<{ f: number; streetAt: number; signsAt: number; officeAt: number; glow: number }> = ({ f, streetAt, signsAt, officeAt, glow }) => (
  <>
    <div style={{ position: 'absolute', left: 160, top: 200, width: 1600, height: 660, borderRadius: 10, overflow: 'hidden', background: `linear-gradient(#05081a, ${glow > 0.01 ? '#3a2410' : '#0b1026'})` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%, #ff8a2a)', opacity: 0.18 + 0.3 * glow }} />
      {[{ x: 120, w: 200, h: 300 }, { x: 600, w: 160, h: 240 }, { x: 1000, w: 220, h: 340 }].map((b, k) => <div key={k} style={{ position: 'absolute', left: b.x, bottom: 120, width: b.w, height: b.h, background: '#0a0c16', border: '2px solid #1a1e2e' }} />)}
      <div style={{ position: 'absolute', left: 1290, bottom: 120, width: 250, height: 470, background: '#10131f', border: '2px solid #2a2e40', opacity: ease(f, officeAt - 2, officeAt + 4) }} />
      {OFFICE_WINDOWS.map((w, i) => <div key={i} style={{ position: 'absolute', left: w.x - 160, top: w.y - 200 + 30, width: 34, height: 40, background: '#fff2c0', opacity: ease(f, officeAt + i, officeAt + i + 4) * (0.82 + 0.18 * Math.sin(f / 15 + i)) }} />)}
      {SIGN_SPOTS.map((s, k) => <div key={k} style={{ position: 'absolute', left: s.x - 160, top: s.y - 200, width: s.w, height: 44, borderRadius: 8, border: `4px solid ${s.c}`, boxShadow: `0 0 24px ${s.c}`, opacity: ease(f, signsAt - 2 + k * 5, signsAt + 4 + k * 5) * (0.75 + 0.25 * Math.sin(f / (5 + k) + k)) }} />)}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 1600, height: 120, background: '#14161e' }} />
      {POSTS.map((x, k) => <div key={k} style={{ position: 'absolute', left: x - 160, bottom: 40, opacity: ease(f, streetAt - 2 + k * 3, streetAt + 4 + k * 3) }}><LightProp kind="streetlight" size={150} lit={0.9 + 0.1 * Math.sin(f / 9 + k)} /></div>)}
    </div>
    {/* the window frame itself */}
    <div style={{ position: 'absolute', left: 160, top: 200, width: 1600, height: 660, borderRadius: 10, border: '14px solid #4a4038', boxSizing: 'border-box' }} />
    <div style={{ position: 'absolute', left: 953, top: 200, width: 14, height: 660, background: '#4a4038' }} />
  </>
);

const Arrow: React.FC<{ drop: number }> = ({ drop }) => (
  <svg width={90} height={160} viewBox="0 0 90 160"><line x1={45} y1={10} x2={45} y2={20 + 110 * drop} stroke={DL.green} strokeWidth={8} strokeLinecap="round" /><path d={`M20 ${10 + 110 * drop} L45 ${40 + 110 * drop} L70 ${10 + 110 * drop} Z`} fill={DL.green} opacity={drop > 0.05 ? 1 : 0} /></svg>
);

const Clock: React.FC<{ f: number }> = ({ f }) => (
  <svg width={110} height={110} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={44} fill="#1a1d24" stroke={FLAME} strokeWidth={4} />
    <line x1={50} y1={50} x2={50 + 30 * Math.cos(f / 8)} y2={50 + 30 * Math.sin(f / 8)} stroke={FLAME} strokeWidth={4} strokeLinecap="round" />
    <line x1={50} y1={50} x2={50 + 20 * Math.cos(f / 60)} y2={50 + 20 * Math.sin(f / 60)} stroke="#ffffff" strokeWidth={5} strokeLinecap="round" />
  </svg>
);

const House: React.FC<{ f: number; at: number }> = ({ f, at }) => (
  <svg width={130} height={120} viewBox="0 0 130 120">
    <path d="M10 56 L65 10 L120 56 L120 114 L10 114 Z" fill="#1a1d24" stroke="#6a6058" strokeWidth={4} />
    {[[28, 64], [74, 64], [28, 90], [74, 90]].map(([x, y], k) => <rect key={k} x={x} y={y} width={28} height={18} fill={FLAME} opacity={ease(f, at + k * 3, at + k * 3 + 5) * (0.8 + 0.2 * Math.sin(f / 10 + k))} />)}
  </svg>
);

const LtToday: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the window stays behind the DYK card's scrim so the office line is not a flash
  const view = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, CARD_END - 8, CARD_END));
  const night = pane(f, CARD_END, NIGHT_END);
  const bought = pane(f, NIGHT_END, BOUGHT_END);
  const stars = pane(f, BOUGHT_END, STARS_END);
  const cheap = pane(f, CHEAP - 2, CHEAP_END);
  const CLIFF_AT = Math.max(HAPPENED, CHEAP_END); // the window lands with WHAT HAPPENED (one sound for both)
  const cliff = ease(f, CLIFF_AT - 2, CLIFF_AT + 8);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12); // stays to the cut, as in MeToday
  const strip = (1 - ease(f, SO2 - 6, SO2 + 2)) * ease(f, DOCK - 2, DOCK + 4);
  // the running count of lights in the window (one per light as it appears)
  const seen = (at: number, n: number, step: number) => Array.from({ length: n }, (_, k) => (f >= at + k * step ? 1 : 0)).reduce<number>((a, b) => a + b, 0);
  const counted = seen(STREETLIGHTS, COUNT_STREET, 3) + seen(SIGNS, COUNT_SIGNS, 5) + seen(OFFICE, OFFICE_WINDOWS.length, 1);
  const brighten = ease(f, BRIGHTER - 2, BRIGHTER + 40);
  const glowUp = ease(f, NIGHT3 - 2, NIGHT3 + 30);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a0f06" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="TONIGHT" dockAt={DOCK} />
      <WakePlace place="your window" at={WINDOW} dockAt={DOCK} yearAt={TODAY} />
      {/* "tonight.": a crescent moon rises top right; it stays over the window until the card leaves */}
      <div style={{ position: 'absolute', left: 1600, top: 250 - 30 * ease(f, TONIGHT - 2, TONIGHT + 16), opacity: ease(f, TONIGHT - 2, TONIGHT + 6) * (1 - ease(f, CARD_END - 8, CARD_END)) }}>
        <svg width={90} height={90} viewBox="0 0 100 100" style={{ overflow: 'visible', filter: 'drop-shadow(0 0 18px #fff2c0aa)' }}><path d="M62 8 A44 44 0 1 0 92 70 A36 36 0 1 1 62 8 Z" fill="#fff2c0" /></svg>
      </div>

      {/* your window: count the lights */}
      <AbsoluteFill style={{ opacity: view }}>
        <City f={f} streetAt={STREETLIGHTS} signsAt={SIGNS} officeAt={OFFICE} glow={0.4} />
        <div style={{ position: 'absolute', left: 200, top: 230, display: 'flex', alignItems: 'baseline', gap: 24, padding: '8px 18px', borderRadius: 10, background: '#05040499' }}>
          <Label at={Math.max(COUNT, DOCK + 8)} color={DL.warm} size={30}>COUNT THE LIGHTS</Label>
          <span style={{ fontFamily: DL_SERIF, fontSize: 60, lineHeight: 1, color: FLAME, opacity: ease(f, Math.max(LIGHTS, DOCK + 8) - 2, Math.max(LIGHTS, DOCK + 8) + 4), fontVariantNumeric: 'tabular-nums' }}>{counted}</span>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 320, display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 18px', borderRadius: 10, background: '#05040499' }}>
          <Label at={STREETLIGHTS} color={DL.text} size={28}>STREETLIGHTS<OnWord at={SIGNS}> · SIGNS</OnWord></Label>
          <Label at={OFFICE} color={DL.text} size={28}>THE OFFICE<OnWord at={NEVER}> THAT NEVER</OnWord><OnWord at={SWITCHES}> SWITCHES OFF</OnWord></Label>
        </div>
      </AbsoluteFill>

      {/* YOUR NIGHT: nobody decided this — 6,500× more light per person than in 1800 (L11) */}
      <AbsoluteFill style={{ opacity: night }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(NIGHT1, CARD_END)} color={DL.gold} size={34}>YOUR NIGHT<OnWord at={NOBODY}> · NOBODY</OnWord><OnWord at={DECIDED}> DECIDED THIS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 280 }}><Label at={BRITAIN} color={DL.dim} size={30}>IN BRITAIN<OnWord at={TWO}> · BY 2000</OnWord><OnWord at={EACH}> · EACH</OnWord><OnWord at={PERSON}> PERSON</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 200, top: 380, opacity: ease(f, PERSON - 2, PERSON + 4), transform: `scale(${ease(f, PERSON - 2, PERSON + 10, 1.2, 1)})` }}><Kid size={130} adult color={DL.warm} glow={ease(f, THOUSAND2, THOUSAND2 + 10)} /></div>
        <div style={{ position: 'absolute', left: 460, top: 380, opacity: ease(f, SIX2 - 2, SIX2 + 4) }}>
          <LightFigure at={THOUSAND2} value="6,500×" size={170} label={<><OnWord at={MORE2}>MORE LIGHT</OnWord><OnWord at={EIGHTEEN}> THAN IN 1800</OnWord></>} />
        </div>
        <div style={{ position: 'absolute', left: 1240, top: 400, display: 'flex', alignItems: 'flex-end', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, EIGHTEEN - 2, EIGHTEEN + 4) }}>
            <LightProp kind="tallow" size={90} f={f} />
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>1800</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, HUNDRED - 2, HUNDRED + 4) }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 22px)', gap: 6 }}>{Array.from({ length: 48 }, (_, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 4, background: FLAME, opacity: ease(f, HUNDRED + Math.floor(i / 4), HUNDRED + Math.floor(i / 4) + 4) * (0.75 + 0.25 * Math.sin(f / 8 + i)) }} />)}</div>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>2000</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={EIGHTEEN}>Fouquet &amp; Pearson 2006, Energy Journal · Britain 1800 → 2000, lighting per person</Source></div>
      </AbsoluteFill>

      {/* WE BOUGHT MORE: every time the price fell — more rooms, more hours, more streets */}
      <AbsoluteFill style={{ opacity: bought }}>
        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', alignItems: 'center', gap: 30 }}>
          <Label at={Math.max(EVERY, NIGHT_END)} color={DL.gold} size={34}>EVERY TIME<OnWord at={PRICE}> THE PRICE</OnWord><OnWord at={FELL}> FELL</OnWord></Label>
          <div style={{ opacity: ease(f, PRICE - 2, PRICE + 4) }}><Arrow drop={ease(f, FELL - 2, FELL + 12)} /></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 400, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 84, color: DL.text, opacity: ease(f, BOUGHT - 2, BOUGHT + 4) }}>we bought more.</div>
        <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', alignItems: 'flex-end', gap: 90 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, ROOMS - 2, ROOMS + 4) }}><House f={f} at={ROOMS} /><span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.warm }}>MORE ROOMS</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, HOURS - 2, HOURS + 4) }}><Clock f={f} /><span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.warm }}>MORE HOURS</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, STREETS - 2, STREETS + 4) }}>
            <div style={{ display: 'flex', gap: 4 }}>{[0, 1, 2].map((k) => <div key={k} style={{ opacity: ease(f, STREETS + k * 4, STREETS + k * 4 + 5) }}><LightProp kind="streetlight" size={90} lit={0.9 + 0.1 * Math.sin(f / 9 + k)} /></div>)}</div>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.warm }}>MORE STREETS</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* SPEEDING UP: 2023, 50,000+ reports from people counting stars — the sky brightens ≈ 9.6 % a year (L14) */}
      <AbsoluteFill style={{ opacity: stars }}>
        <div style={{ position: 'absolute', left: 1080, top: 200, width: 680, height: 420, borderRadius: 10, overflow: 'hidden', opacity: ease(f, STARS - 2, STARS + 6) }}>
          <NightSky stars={1 - 0.45 * brighten} glow={0.15 + 0.6 * brighten} width={680} height={420} />
          <div style={{ position: 'absolute', left: 40, bottom: 0, display: 'flex', gap: 30 }}>{[0, 1, 2].map((k) => <div key={k} style={{ opacity: ease(f, ORDINARY - 2 + k * 4, ORDINARY + 4 + k * 4) }}><Kid size={70} adult={k !== 1} color={DL.warm} /></div>)}</div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(AND2, BOUGHT_END)} color={DL.gold} size={34}>AND IT'S<OnWord at={SPEEDING}> SPEEDING UP</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 270, fontFamily: DL_SERIF, fontSize: 80, color: DL.text, lineHeight: 1 }}><OnWord at={TWENTY1}>20</OnWord><OnWord at={THREE}>23</OnWord><span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim, opacity: ease(f, SCIENTISTS - 2, SCIENTISTS + 4) }}> · SCIENTISTS USED</span></div>
        <div style={{ position: 'absolute', left: 160, top: 370, display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 110, lineHeight: 1, color: DL.gold, opacity: ease(f, FIFTY - 2, FIFTY + 4) }}>50,000+</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 2, color: DL.text, opacity: ease(f, REPORTS - 2, REPORTS + 4) }}>REPORTS</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 500 }}><Label at={ORDINARY} color={DL.dim} size={28}>FROM ORDINARY PEOPLE<OnWord at={COUNTING}> COUNTING</OnWord><OnWord at={STARS}> STARS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><Label at={THEY} color={DL.text} size={28}>THE NIGHT SKY<OnWord at={BRIGHTER}> GETS BRIGHTER</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 620, opacity: ease(f, ALMOST - 2, ALMOST + 4) }}>
          <LightFigure at={TEN3} value="≈ 9.6 %" size={130} label={<><OnWord at={YEAR2}>A YEAR</OnWord></>} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={FIFTY}>Kyba et al. 2023, Science · 51,351 Globe at Night observations, 2011–2022<OnWord at={TEN3}> · range 7–10 %/yr</OnWord></Source></div>
      </AbsoluteFill>

      {/* "So what is light now?" — Too cheap to switch off. */}
      <AskMark at={STARS_END} out={CHEAP + 2} left={760} top={250} pulseAt={NOW_Q} />
      <AbsoluteFill style={{ opacity: cheap }}>
        <div style={{ position: 'absolute', left: 260, top: 260, display: 'flex', alignItems: 'center', gap: 50 }}>
          <div style={{ opacity: ease(f, CHEAP - 2, CHEAP + 4), filter: `drop-shadow(0 0 ${14 + 6 * Math.sin(f / 7)}px ${FLAME})` }}><LightProp kind="switch" size={190} lit={1} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 72, color: DL.gold, opacity: ease(f, CHEAP - 2, CHEAP + 4) }}>Too cheap</div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 72, color: DL.text, opacity: ease(f, SWITCH1 - 2, SWITCH1 + 4) }}>to switch off.</div>
          </div>
        </div>
      </AbsoluteFill>
      <LightChip text="TOO CHEAP TO SWITCH OFF" at={CHEAP} dockAt={CHIP_DOCK} slot={5} left={260} top={720} />

      {/* cliffhanger: what happened when we switched the night off? — the window's sky glows, a "?" */}
      <AbsoluteFill style={{ opacity: cliff }}>
        <div style={{ position: 'absolute', left: 260, top: 230, width: 360, height: 400, opacity: ease(f, CLIFF_AT - 2, CLIFF_AT + 8) }}>
          <LightProp kind="window" size={360} f={f} lit={0.6 + 0.4 * ease(f, SWITCHED - 2, SWITCHED + 10)} />
          <div style={{ position: 'absolute', left: 50, top: 36, width: 260, height: 290, background: 'linear-gradient(transparent, #ff8a2a)', opacity: 0.55 * glowUp, mixBlendMode: 'screen' }} />
        </div>
        <div style={{ position: 'absolute', left: 960 + 120 * ease(f, OUT, OUT + 16), top: 330, fontFamily: DL_SERIF, fontSize: 120, lineHeight: 1, color: DL.gold, opacity: ease(f, OUT - 2, OUT + 4), textShadow: `0 0 30px ${DL.gold}88` }}>▸</div>
        <div style={{ position: 'absolute', left: 700, top: 540, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Label at={CLIFF_AT} color={DL.dim} size={30}>WHAT HAPPENED</Label>
          <Label at={WHEN} color={DL.dim} size={30}>WHEN WE<OnWord at={SWITCHED}> SWITCHED</OnWord><OnWord at={NIGHT3}> THE NIGHT</OnWord><OnWord at={OFF3}> OFF?</OnWord></Label>
        </div>
        <div style={{ position: 'absolute', left: 760, top: 260, fontFamily: DL_SERIF, fontSize: 220, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, OFF3 - 2, OFF3 + 4), transform: `scale(${ease(f, OFF3 - 2, OFF3 + 10, 1.3, 1) * ease(f, YOURE - 4, YOURE + 10, 1, 1.12)})` }}>?</div>
      </AbsoluteFill>

      <PriceStrip items={priceUpTo(5)} show={strip} hotLast={false} />
      <LightLadder rungs={[...lightRungs(5), { year: 'TODAY', label: 'TOO CHEAP', at: CHIP_DOCK + 10 }]} show={ladder} />
      <DidYouKnowThat at={DID} out={CARD_END}>
        <OnWord at={MORE1}>more than </OnWord><span style={{ opacity: ease(f, THIRD - 2, THIRD + 4), color: '#ffd23f' }}>a third </span><OnWord at={PEOPLE1}>of all people </OnWord>
        <OnWord at={CANT}>can't see </OnWord><span style={{ opacity: ease(f, MILKY - 2, MILKY + 4), color: '#ff9a1f', fontStyle: 'italic' }}>the Milky Way</span><OnWord at={HOME}> from home?</OnWord>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: DL_MONO, fontSize: 32, color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ width: 360, opacity: ease(f, EUROPE - 2, EUROPE + 4) }}>EUROPE<OnWord at={SIX1}> · 6</OnWord><OnWord at={TEN1}> IN 10</OnWord></span>
            <div style={{ opacity: ease(f, EUROPE - 2, EUROPE + 4) }}><PeopleRow n={10} lit={(i) => (i < 6 ? ease(f, SIX1 - 2 + i * 2, SIX1 + 4 + i * 2) : 0)} size={34} gap={8} color="#ffd23f" /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ width: 360, opacity: ease(f, NORTH - 2, NORTH + 4) }}>NORTH AMERICA<OnWord at={NEARLY}> · NEARLY</OnWord><OnWord at={EIGHT}> 8</OnWord><OnWord at={TEN2}> IN 10</OnWord></span>
            <div style={{ opacity: ease(f, NORTH - 2, NORTH + 4) }}><PeopleRow n={10} lit={(i) => (i < 8 ? ease(f, EIGHT - 2 + i * 2, EIGHT + 4 + i * 2) : 0)} size={34} gap={8} color="#ff9a1f" /></div>
          </div>
        </div>
        <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, TEN2 - 2, TEN2 + 4) }}>Milky Way hidden from home · Falchi et al. 2016, Science Advances</div>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: 'So, what happened', at: SO2 }, { text: 'when we switched the night off?', at: WHEN }, { text: "You're about to find out.", at: YOURE }]} />
      <EpisodeHud year="TODAY" episode="07" />
    </AbsoluteFill>
  );
};
export default LtToday;
