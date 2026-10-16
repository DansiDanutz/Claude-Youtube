import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import {
  EpisodeHud, win, FoodLadder, foodRungs, NEXT_RUNG, Label, Source, StampText, OnWord, QGRAD,
  Food, FoodTag, PlateWeek, YearsStrip, Wheat, hold, type FoodKind, pane,
} from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 12/14 — 2100: evidence → scenario (RESEARCH F39–F41, F5), PREDICTION · A SCENARIO, NOT A FACT on screen
// throughout. Opens on the docked ladder with the dashed 2100 "?" rung (No. 04's question returns); the 2100 header slams
// on "twenty" (1st). THE EVIDENCE → on "evidence". 1 (F39): UN on "Nations", ≈ 82 · WORLD · 2100 on "eighty", the
// YEARS strip extends dashed to ≈ 82 (projection). 2 (F40): ITS CLIMATE PANEL (IPCC) on "panel"; a farm-productivity
// line bends flatter on "slowed" (illustration), PAST 50 YEARS on "fifty", medium confidence. 3 (F41): EAT-LANCET on
// "Lancet", a plate mostly plants on "plants", red meat ≈ once a week on "week", COULD PREVENT ≈ 15 MILLION EARLY DEATHS
// A YEAR on "million" (a model estimate). Scenario: ONE SCENARIO · NOT A FACT on "scenario"/"fact"; a 2100 week of plates
// (one red-meat day, "a recommendation") on "plate"/"treat"; IF THE HARVESTS HOLD on "hold"; the 2100 rung fills A LONGER
// LIFE? on "life" (2nd); COULD STRETCH PAST 80 on "eighty" (2nd). Callback (F5): the 1500 fast-day week mirrors the 2100
// week on "fifteen" (2nd); a heart on "heart", a planet on "planet". No 2100 number except the UN's. VO fd11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Fd2100', durationInSeconds: 50.8667, fps: 30, width: 1920, height: 1080 };
const DUR = 1526;

const C = makeCue(vo, 'fd11-2100', 0.8);
const EATING = C.at('eating');
const TWENTY1 = C.at('twenty', 1);
const HUNDRED1 = C.at('hundred?', 1);
const MORNING = C.at('morning');
const EVIDENCE = C.at('evidence.');
const NATIONS = C.at('Nations');
const EXPECTS = C.at('expects');
const EIGHTY1 = C.at('eighty', 1);
const PANEL = C.at('panel');
const WARMING = C.at('warming');
const SLOWED = C.at('slowed');
const FARM = C.at('farm');
const FIFTY = C.at('fifty');
const LANCET = C.at('Lancet');
const PLANTS1 = C.at('plants', 1);
const RED = C.at('red');
const WEEK1 = C.at('week,', 1);
const PREVENT = C.at('prevent');
const MILLION = C.at('million');
const SO2 = C.at('So', 2);
const SCENARIO = C.at('scenario.');
const FACT = C.at('fact.');
const PLATE = C.at('plate');
const PLANTS2 = C.at('plants.', 2);
const MEAT2 = C.at('Meat', 2); // 'Meat could be' (1 = 'red meat')
const TREAT = C.at('treat.');
const HARVESTS = C.at('harvests');
const HOLD = C.at('hold,');
const LIFE2 = C.at('life', 2); // 'the average life' (1 = 'life expectancy')
const EIGHTY2 = C.at('eighty.', 2);
const FIFTEEN2 = C.at('fifteen', 2); // 'In fifteen hundred,' (1 = 'fifteen million')
const CHURCH = C.at('Church');
const COULDNT = C.at("couldn't");
const TWENTY4 = C.at('twenty', 4);
const REASON = C.at('reason');
const HEART = C.at('heart.');
const PLANET = C.at('planet.');
const DIET = C.at('diet');
const YET = C.at('yet.');
const LIFE1 = C.at('life', 1);
const BY = C.at('By', 2); // 'By twenty one hundred, your plate' (1 = 'by twenty one hundred.')
const FIFTEEN1 = C.at('fifteen', 1);
const PAST2 = C.at('past', 2); // 'stretch past eighty' (1 = 'the past fifty years')
const SCEN_END = hold(PAST2, FIFTEEN2);

const PLANTS: FoodKind[] = ['veg', 'beans', 'bread'];
const Heart: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M50 88 C10 60 4 34 22 20 C36 10 48 18 50 28 C52 18 64 10 78 20 C96 34 90 60 50 88 Z" fill={DL.red} /></svg>
);
const Planet: React.FC<{ size?: number; f: number }> = ({ size = 120, f }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><circle cx={50} cy={50} r={44} fill="#2a6ab8" /><g transform={`translate(${(f * 0.3) % 30 - 15} 0)`}><path d="M24 30 q12 -10 22 0 q6 12 -6 20 q-14 4 -16 -20 Z M56 56 q14 -6 22 6 q-4 16 -18 14 q-10 -8 -4 -20 Z" fill="#4caf50" /></g></svg>
);

const Fd2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ev1 = pane(f, NATIONS - 4, PANEL - 4);
  const ev2 = pane(f, PANEL - 4, LANCET + 6);
  const ev3 = pane(f, LANCET + 6, hold(MILLION, SO2));
  const scen = pane(f, hold(MILLION, SO2) + 2, SCEN_END);
  const call = ease(f, SCEN_END + 4, SCEN_END + 16);
  const bend = ease(f, SLOWED - 2, SLOWED + 24, 0, 1, DL_EASE.inOut);
  // the docked ladder: full until the header slams, dimmed under the evidence, back for the scenario
  const ladder = (1 - ease(f, TWENTY1 - 6, TWENTY1) * (1 - ease(f, MORNING + 28, MORNING + 40))) * (1 - 0.55 * ease(f, EVIDENCE, EVIDENCE + 12) * (1 - ease(f, SO2 - 6, SO2 + 8))) * (1 - ease(f, SCEN_END - 6, SCEN_END + 4));
  const line = (t: number) => {
    const x = 40 + t * 760;
    const y = 300 - t * 230 + bend * Math.max(0, t - 0.55) * 160;
    return `${x},${y}`;
  };

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1a1e" />
      <Vignette />
      {/* No. 04's question returns */}
      <div style={{ position: 'absolute', left: 160, top: 300, width: 1100, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 76, color: DL.text, opacity: ease(f, 0, 8) * (1 - ease(f, TWENTY1 - 6, TWENTY1)) }}>
        So what will you be <span style={{ color: DL.gold }}>eating…</span>
      </div>
      <Sequence from={TWENTY1} layout="none"><EraHeader year="2100" idx={7} label="PREDICTION · A SCENARIO, NOT A FACT" dockAt={MORNING - TWENTY1 + 10} /></Sequence>
      <div style={{ position: 'absolute', left: 160, top: 180, display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, MORNING - 2, MORNING + 4) }}>
        <span style={{ padding: '6px 16px', borderRadius: 8, border: `2px solid ${DL.red}`, fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: DL.red }}>PREDICTION</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.dim }}>A SCENARIO, NOT A FACT</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.gold, opacity: ease(f, EVIDENCE - 2, EVIDENCE + 4) * (1 - ease(f, hold(MILLION, SO2) - 4, hold(MILLION, SO2))) }}>· THE EVIDENCE →</span>
      </div>

      {/* audit round 1: "That morning hasn't happened yet" sat static for 3.5 s — a dawn rises on "morning" until the evidence */}
      <AbsoluteFill style={{ opacity: ease(f, MORNING - 4, MORNING + 10) * (1 - ease(f, NATIONS - 8, NATIONS)) }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 560, height: 360, background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}44, transparent 70%)` }} />
        <div style={{ position: 'absolute', left: 960 - 90, top: 860 - 260 * ease(f, MORNING, NATIONS), width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, #ffe9b0, ${DL.gold}aa 55%, transparent 72%)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.dim, opacity: ease(f, YET - 2, YET + 4) }}>hasn't happened yet</div>
      </AbsoluteFill>
      {/* evidence 1: the UN projection */}
      <AbsoluteFill style={{ opacity: ev1 }}>
        <svg width={1000} height={110} viewBox="0 0 1000 110" style={{ position: 'absolute', left: 160, top: 640, opacity: ease(f, LIFE1 - 2, LIFE1 + 4) }}>
          <text x={0} y={30} fontFamily={DL_MONO} fontSize={26} fill={DL.dim}>2024 · ≈73</text>
          <line x1={10} y1={70} x2={10 + 960 * ease(f, LIFE1, EIGHTY1)} y2={70} stroke={DL.sky} strokeWidth={6} strokeDasharray="16 12" />
          <circle cx={10} cy={70} r={10} fill={DL.gold} />
          <text x={990} y={30} textAnchor="end" fontFamily={DL_MONO} fontSize={26} fill={DL.sky} opacity={ease(f, EIGHTY1 - 2, EIGHTY1 + 4)}>2100 · ≈82</text>
        </svg>
        <div style={{ position: 'absolute', left: 160, top: 270 }}><Label at={NATIONS} color={DL.sky} size={32}>THE UNITED NATIONS<OnWord at={EXPECTS}> EXPECTS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 340, display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, EIGHTY1 - 2, EIGHTY1 + 4) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 160, lineHeight: 1, color: DL.sky }}>≈ 82</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>WORLD · BY 2100 · A PROJECTION</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><Source at={EIGHTY1}>UN World Population Prospects 2024, medium variant: 81.7 years (world, 2100)</Source></div>
        <YearsStrip items={[{ year: '2024', value: '≈73', place: 'WORLD', at: -1 }, { year: '2100', value: '≈82', place: 'WORLD · UN PROJECTION', at: EIGHTY1, projection: true }]} show={1} />
      </AbsoluteFill>

      {/* evidence 2: the IPCC */}
      <AbsoluteFill style={{ opacity: ev2 }}>
        <div style={{ position: 'absolute', left: 160, top: 270 }}><Label at={PANEL} color={DL.green} size={32}>ITS CLIMATE PANEL · THE IPCC</Label></div>
        <svg width={860} height={340} viewBox="0 0 860 340" style={{ position: 'absolute', left: 160, top: 330, opacity: ease(f, WARMING - 2, WARMING + 4) }}>
          <line x1={40} y1={310} x2={820} y2={310} stroke={DL.border} strokeWidth={3} /><line x1={40} y1={20} x2={40} y2={310} stroke={DL.border} strokeWidth={3} />
          <polyline points={Array.from({ length: 21 }, (_, i) => line(i / 20)).join(' ')} fill="none" stroke={DL.green} strokeWidth={8} />
          <polyline points={Array.from({ length: 10 }, (_, i) => { const t = 0.55 + (i / 9) * 0.45; return `${40 + t * 760},${300 - t * 230}`; }).join(' ')} fill="none" stroke={DL.green} strokeWidth={4} strokeDasharray="10 8" opacity={0.5 * bend} />
          <text x={50} y={336} fontFamily={DL_MONO} fontSize={24} fill={DL.muted}>FARM PRODUCTIVITY GROWTH · illustration</text>
        </svg>
        <div style={{ position: 'absolute', left: 1060, top: 400, display: 'flex', flexDirection: 'column', gap: 14, width: 220 }}>
          <Label at={WARMING} color={DL.red} size={28}>WARMING</Label>
          <Label at={SLOWED} color={DL.text} size={28}>HAS ALREADY SLOWED IT</Label>
          <Label at={FIFTY} color={DL.dim} size={26}>PAST 50 YEARS</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 700 }}><Source at={SLOWED}>IPCC AR6 Synthesis Report, SPM A.2.4 (medium confidence)</Source></div>
      </AbsoluteFill>

      {/* evidence 3: EAT-Lancet */}
      <AbsoluteFill style={{ opacity: ev3 }}>
        <div style={{ position: 'absolute', left: 160, top: 270 }}><Label at={LANCET} color={DL.gold} size={32}>THE EAT-LANCET COMMISSION</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 340, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
          {/* audit round 1: the plate starts on "diet" (the screen was near-empty for 2.5 s), the plants land on "plants" */}
          <div style={{ opacity: ease(f, DIET - 2, DIET + 4) }}><svg width={200} height={130} viewBox="0 0 200 130"><ellipse cx={100} cy={70} rx={94} ry={54} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={5} /></svg></div>
          {PLANTS.map((k, i) => <div key={k} style={{ opacity: ease(f, PLANTS1 - 2 + i * 2, PLANTS1 + 8 + i * 2) }}><Food kind={k} size={120} /></div>)}
          <div style={{ opacity: ease(f, PLANTS1 + 4, PLANTS1 + 12) }}><Wheat h={150} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: ease(f, RED - 2, RED + 4) }}><Food kind="meat" size={110} /><span style={{ fontFamily: DL_MONO, fontSize: 32, color: DL.red, opacity: ease(f, WEEK1 - 2, WEEK1 + 4), whiteSpace: 'nowrap' }}>≈ ONCE A WEEK</span></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', alignItems: 'baseline', gap: 24, opacity: ease(f, PREVENT - 2, PREVENT + 4) }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>COULD PREVENT</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 110, color: DL.gold, opacity: ease(f, FIFTEEN1 - 2, FIFTEEN1 + 4) }}>≈ 15 million</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text, opacity: ease(f, MILLION - 2, MILLION + 4) }}>EARLY DEATHS A YEAR</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 720 }}><Source at={MILLION}>EAT-Lancet Commission, Summary Report 2025 · a model estimate · "could"</Source></div>
      </AbsoluteFill>

      {/* the scenario */}
      <AbsoluteFill style={{ opacity: scen }}>
        <div style={{ position: 'absolute', left: 160, top: 260 }}><StampText text={f >= FACT ? 'ONE SCENARIO · NOT A FACT' : 'ONE SCENARIO'} at={SCENARIO} color={DL.red} size={38} tilt={-2} /></div>
        <div style={{ position: 'absolute', left: 160, top: 360 }}>
          <PlateWeek title={<>A WEEK IN <span style={{ color: DL.red }}>2100?</span><OnWord at={PLANTS2}> · MOSTLY PLANTS</OnWord></>} at={BY} tagAt={TREAT} tagColor={DL.red} icon={50} reveal={{ veg: PLANTS2, beans: PLANTS2 + 4, bread: PLANTS2 + 8, meat: MEAT2 }}
            foot="scenario · EAT-Lancet 2025 · a recommendation, not a forecast"
            days={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (d === 'SUN' ? { d, foods: ['veg', 'meat', 'bread'] as FoodKind[], shade: true, tag: 'TREAT' } : { d, foods: ['veg', 'beans', 'bread'] as FoodKind[] }))} />
        </div>
        <div style={{ position: 'absolute', left: 1280, top: 560, width: 480, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Label at={HARVESTS} color={DL.dim} size={28}>IF THE HARVESTS<OnWord at={HOLD}> HOLD…</OnWord></Label>
          <div style={{ fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1.15, color: DL.text, opacity: ease(f, LIFE2 - 2, LIFE2 + 4) }}>the average life could stretch<span style={{ color: DL.gold, opacity: ease(f, PAST2 - 2, PAST2 + 4), whiteSpace: 'nowrap' }}> past 80</span></div>
        </div>
      </AbsoluteFill>

      {/* callback: the fast days of 1500 vs the reasons of 2100 */}
      <AbsoluteFill style={{ opacity: call }}>
        <div style={{ position: 'absolute', left: 160, top: 260, width: 760, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.sky}`, background: '#0e0b0af0' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.sky }}>1500 · THE CHURCH DECIDED</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>{Array.from({ length: 7 }, (_, i) => <div key={i} style={{ width: 86, height: 70, borderRadius: 10, border: `2px solid ${[2, 4, 5].includes(i) ? DL.sky : DL.border}`, background: [2, 4, 5].includes(i) ? `${DL.sky}22` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Food kind={[2, 4, 5].includes(i) ? 'fish' : 'meat'} size={46} /></div>)}</div>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 26, color: DL.dim, opacity: ease(f, COULDNT - 2, COULDNT + 4) }}>WHICH DAYS YOU COULDN'T EAT MEAT</div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 260, width: 760, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px dashed ${DL.red}`, background: '#0e0b0af0', opacity: ease(f, TWENTY4 - 2, TWENTY4 + 4) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.red }}>2100 · THE REASON<span style={{ opacity: ease(f, REASON - 2, REASON + 4) }}> MIGHT BE…</span></div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ opacity: ease(f, HEART - 2, HEART + 4), transform: `scale(${1 + 0.08 * Math.sin((f - HEART) / 5) * ease(f, HEART - 2, HEART + 4)})` }}><Heart size={120} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.text, opacity: ease(f, HEART - 2, HEART + 4) }}>YOUR HEART</span>
            <div style={{ opacity: ease(f, PLANET - 2, PLANET + 4) }}><Planet size={120} f={f} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.text, opacity: ease(f, PLANET - 2, PLANET + 4) }}>THE PLANET</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 600 }}><Source at={CHURCH}>fast days: Fitzwilliam Museum<OnWord at={HEART}> · heart and planet: EAT-Lancet 2025 (heart-disease risk, environmental limits)</OnWord></Source></div>
      </AbsoluteFill>

      <FoodLadder rungs={foodRungs(6)} show={ladder} next={{ at: 0, fillAt: LIFE2, fill: NEXT_RUNG }} />
      <EpisodeHud year={f >= TWENTY1 ? 2100 : 'TODAY'} episode="05" prediction={f >= TWENTY1} />
    </AbsoluteFill>
  );
};
export default Fd2100;
