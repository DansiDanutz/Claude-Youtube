import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { FoodLadder, foodRungs, LADDER_FULL, PeopleRow, Label, Source, StampText, win, QGRAD, OnWord, Kid, Food, Wheat, YearsStrip, YEARS_PAST, hold , pane } from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 11/14 — the answer (RESEARCH F36–F38, F2, F3, F4, F1). THE ANSWER pulses on "answer"; FOOD GAVE US YEARS on
// "years"; NOT ALONE lands on "alone" (gradient); THE DANGER HAS FLIPPED on "flipped". What food did (F38): SCURVY /
// BERIBERI / PELLAGRA cards stamp BEATEN* on their words (*where diets and fortification reached); + TALLER on "taller".
// The dispute (F36): McKEOWN ARGUED: FOOD = THE MAIN REASON on "McKeown"/"main"; MANY HISTORIANS DISAGREE stamp on
// "disagree". F37: the drop in deaths in big US cities, 1900–36 — CLEAN WATER ≈ ½ on "clean"/"half" (the one sourced
// share); SEWERS · VACCINES · MEDICINE dashed and unquantified on their words (illustration · shares debated). The flip
// (F2): 1 IN 5 DEATHS WORLDWIDE on "five", LINKED TO DIET on "linked"; salt / whole grains / fruit on their words. The
// guess (F3, F4): 1800 ≈ 29 on "twenty", TODAY ≈ 73 on "seventy", HOW CLOSE WERE YOU? on "How". The walk-back: the full
// ladder dim on "walk", each rung lights as its line starts. Payoff (F1): the 1500 budget line and THE DANGER IS WHAT WE
// CHOOSE TO EAT on "eat" (gradient) while the ladder glows. VO fd10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'FdReveal', durationInSeconds: 72.8, fps: 30, width: 1920, height: 1080 };
const DUR = 2184;

const C = makeCue(vo, 'fd10-reveal', 0.8);
const ANSWER = C.at('answer.');
const YEARS1 = C.at('years.', 1);
const ALONE1 = C.at('alone.', 1);
const DANGER1 = C.at('danger', 1);
const FLIPPED = C.at('flipped.');
const ENOUGH1 = C.at('Enough', 1);
const BEAT = C.at('beat');
const SCURVY = C.at('scurvy,');
const BERIBERI = C.at('beriberi');
const PELLAGRA = C.at('pellagra,');
const TALLER = C.at('taller.');
const DOCTOR = C.at('doctor,');
const MCKEOWN = C.at('McKeown,');
const MAIN = C.at('main');
const LONGER = C.at('longer.');
const MANY = C.at('Many');
const DISAGREE = C.at('disagree.');
const CITIES = C.at('cities,');
const STUDY = C.at('study');
const CLEAN = C.at('clean');
const HALF = C.at('half');
const NINETEEN = C.at('nineteen');
const SEWERS = C.at('Sewers,');
const VACCINES = C.at('vaccines');
const MEDICINE1 = C.at('medicine', 1);
const REST = C.at('rest.');
const TODAY_Q = C.at('today?', 1);
const ONE2 = C.at('one', 2);
const FIVE = C.at('five');
const LINKED = C.at('linked');
const RISKS = C.at('risks?');
const SALT = C.at('salt.');
const GRAINS = C.at('grains.');
const FRUIT = C.at('fruit.');
const GUESS = C.at('guess?');
const EIGHTEEN = C.at('eighteen');
const TWENTY = C.at('twenty');
const TODAY2 = C.at('Today,', 2);
const SEVENTY = C.at('seventy');
const HOW = C.at('How');
const WALK = C.at('walk');
const ME = C.at('me.');
const LIT = [C.at('fifteen', 1), C.at('Then', 1), C.at('Then', 2), C.at('Then', 3), C.at('Then', 4), C.at('Today,', 3)]; // each rung lights as its line starts
const FIFTEEN2 = C.at('fifteen', 2);
const MONEY = C.at('money,');
const HUNGER = C.at('hunger');
const DANGER2 = C.at('danger.', 2);
const TODAY4 = C.at('Today,', 4);
const CHOOSE = C.at('choose');
const EAT = C.at('eat.');
// audit round 1: THE DANGER HAS FLIPPED flashed — the answer card holds ≥ 1.5 s after "flipped"
const ANSWER_END = hold(FLIPPED, ENOUGH1);
const DID_W = C.at('did');
const DID_END = hold(TALLER, DOCTOR);
const WATER_END = hold(DID_W, TODAY_Q);
const DISPUTE_END = hold(DISAGREE, CITIES);
const FLIP_END = hold(FRUIT, GUESS);

const Disease: React.FC<{ name: string; year: string; at: number; stampAt: number }> = ({ name, year, at, stampAt }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'relative', width: 440, height: 230, boxSizing: 'border-box', padding: '22px 30px', borderRadius: 16, background: '#0e0b0af0', border: `2px solid ${DL.border}`, opacity: ease(f, at - 2, at + 4) }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>{year}</div>
      <div style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>{name}</div>
      <div style={{ position: 'absolute', right: 18, bottom: 14 }}><StampText text="BEATEN*" at={stampAt} color={DL.green} size={28} tilt={-6} /></div>
    </div>
  );
};

const FdReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const answer = pane(f, 0, ANSWER_END);
  const did = pane(f, ANSWER_END, DID_END);
  const dispute = pane(f, DID_END, DISPUTE_END);
  const water = pane(f, DISPUTE_END + 2, WATER_END);
  const flip = pane(f, WATER_END, FLIP_END);
  const guess = pane(f, FLIP_END, WALK);
  const ladderShow = ease(f, WALK - 4, WALK + 10);
  const glowAll = ease(f, EAT - 2, EAT + 12);
  const flipArrow = ease(f, FLIPPED - 2, FLIPPED + 14);
  const water1 = ease(f, CLEAN, HALF + 8);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />

      {/* the answer */}
      <AbsoluteFill style={{ opacity: answer, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 40, letterSpacing: 14, color: DL.gold, transform: `scale(${1 + 0.08 * ease(f, ANSWER, ANSWER + 5) * (1 - ease(f, ANSWER + 8, ANSWER + 24))})` }}>THE ANSWER</div>
        <div style={{ marginTop: 40, fontFamily: DL_SERIF, fontSize: 100, color: DL.text, opacity: ease(f, C.at('Food', 1) - 2, C.at('Food', 1) + 4) }}>Food gave us years.</div>
        <div style={{ marginTop: 10, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 140, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, ALONE1 - 2, ALONE1 + 4), transform: `scale(${ease(f, ALONE1 - 2, ALONE1 + 12, 1.3, 1)})` }}>Not alone.</div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 30, opacity: ease(f, DANGER1 - 2, DANGER1 + 4) }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 40, letterSpacing: 4, color: DL.red }}>THE DANGER HAS</span>
          <span style={{ display: 'inline-block', fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: DL.red, transform: `rotate(${180 * flipArrow}deg)`, opacity: ease(f, FLIPPED - 2, FLIPPED + 4) }}>FLIPPED</span>
        </div>
      </AbsoluteFill>

      {/* what food did */}
      <AbsoluteFill style={{ opacity: did }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={ENOUGH1} color={DL.gold} size={34}>ENOUGH CALORIES + THE RIGHT NUTRIENTS<OnWord at={BEAT}> BEAT…</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', gap: 40 }}>
          <Disease name="Scurvy" year="1747 · NO FRESH FOOD" at={SCURVY} stampAt={SCURVY} />
          <Disease name="Beriberi" year="1884 · WHITE RICE" at={BERIBERI} stampAt={BERIBERI} />
          <Disease name="Pellagra" year="1915 · CORN, NO NIACIN" at={PELLAGRA} stampAt={PELLAGRA} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 540, display: 'flex', alignItems: 'flex-end', gap: 40, opacity: ease(f, TALLER - 2, TALLER + 4) }}>
          <Kid size={100} adult color={DL.warm} /><Kid size={120} adult color={DL.gold} />
          <Label at={TALLER} color={DL.gold} size={36} style={{ marginBottom: 60 }}>+ HELPED US GROW TALLER</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 820 }}><Source at={SCURVY + 6}>* where diets and fortification reached · these diseases persist in pockets today</Source></div>
      </AbsoluteFill>

      {/* the dispute */}
      <AbsoluteFill style={{ opacity: dispute }}>
        <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={DOCTOR} color={DL.dim} size={32}>A DOCTOR<OnWord at={MCKEOWN}> · THOMAS McKEOWN (1976)</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 300, width: 1500, fontFamily: DL_SERIF, fontSize: 76, lineHeight: 1.2, color: DL.text, opacity: ease(f, MCKEOWN - 2, MCKEOWN + 4) }}>
          argued that better food was <span style={{ color: DL.gold, opacity: ease(f, MAIN - 2, MAIN + 4) }}>the main reason</span><span style={{ opacity: ease(f, LONGER - 2, LONGER + 4) }}> we started living longer.</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><StampText text="MANY HISTORIANS DISAGREE" at={DISAGREE} color={DL.red} size={48} tilt={-3} /></div>
        <div style={{ position: 'absolute', left: 160, top: 700 }}><Source at={MANY}>McKeown, The Modern Rise of Population (1976) · Szreter (1988) · Harris (2004)</Source></div>
      </AbsoluteFill>

      {/* clean water: the one sourced share */}
      <AbsoluteFill style={{ opacity: water }}>
        <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={CITIES} color={DL.dim} size={32}>THE DROP IN DEATHS · BIG AMERICAN CITIES<OnWord at={NINETEEN}> · 1900–1936</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 290, width: 1600, height: 150, borderRadius: 16, border: `2px solid ${DL.border}`, background: DL.panel2, overflow: 'hidden', display: 'flex', opacity: ease(f, STUDY - 2, STUDY + 4) }}>
          <div style={{ width: `${48 * water1}%`, background: `linear-gradient(90deg, #2a7ad8, ${DL.sky})`, display: 'flex', alignItems: 'center', paddingLeft: 30, boxSizing: 'border-box', overflow: 'hidden' }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: '#04121e', whiteSpace: 'nowrap' }}>CLEAN WATER<span style={{ opacity: ease(f, HALF - 2, HALF + 4) }}> ≈ HALF</span></span>
          </div>
          {([['SEWERS', SEWERS], ['VACCINES', VACCINES], ['MEDICINE', MEDICINE1]] as [string, number][]).map(([lab, at]) => (
            <div key={lab} style={{ flex: 1, borderLeft: `3px dashed ${DL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: ease(f, at - 2, at + 4), background: `repeating-linear-gradient(45deg, ${DL.gold}22 0 12px, transparent 12px 24px)` }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 32, color: DL.gold }}>{lab}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 470 }}><Label at={DID_W} color={DL.text} size={30}>…DID MUCH OF THE REST · illustration · shares still debated</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 540, width: 1600 }}><Source at={HALF}>Cutler & Miller, Demography 2005: filtration and chlorination ≈ half of the total mortality decline in major cities (contested by later studies)</Source></div>
      </AbsoluteFill>

      {/* the flip: 1 in 5 deaths linked to diet */}
      <AbsoluteFill style={{ opacity: flip }}>
        <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={Math.max(TODAY_Q, WATER_END)} color={DL.red} size={34}>AND TODAY?</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', alignItems: 'center', gap: 50, opacity: ease(f, ONE2 - 2, ONE2 + 4) }}>
          <PeopleRow n={5} lit={(i) => (i === 4 ? 1 - ease(f, FIVE - 2, FIVE + 4) : 1)} size={80} color={DL.warm} />
          <div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 110, lineHeight: 1, color: DL.red }}>≈ 1 in<span style={{ opacity: ease(f, FIVE - 2, FIVE + 4) }}> 5</span></div>
            <Label at={LINKED} color={DL.text} size={32}>DEATHS WORLDWIDE · LINKED TO DIET</Label>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><Label at={RISKS} color={DL.dim} size={32}>THE BIGGEST RISKS?</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 620, display: 'flex', gap: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, SALT - 2, SALT + 4) }}>
            <svg width={80} height={120} viewBox="0 0 80 120"><path d="M20 30 L60 30 L66 116 L14 116 Z" fill="#e8e8f0" stroke="#8a8aa0" strokeWidth={4} /><path d="M20 30 Q40 0 60 30 Z" fill="#9aa0b8" />{[30, 40, 50].map((x) => <circle key={x} cx={x} cy={18} r={3} fill="#3a3f50" />)}</svg>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>TOO MUCH SALT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, GRAINS - 2, GRAINS + 4) }}>
            <Wheat h={120} /><span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>TOO FEW WHOLE GRAINS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, FRUIT - 2, FRUIT + 4) }}>
            <Food kind="orange" size={100} /><span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.text }}>TOO LITTLE FRUIT</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 800 }}><Source at={LINKED}>≈ 11 million deaths (2017), adults 25+ · GBD 2017 Diet Collaborators, Lancet 2019</Source></div>
      </AbsoluteFill>

      {/* the guess */}
      <AbsoluteFill style={{ opacity: guess }}>
        <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={GUESS} color={DYT.magenta} size={34}>YOUR GUESS · LIFE EXPECTANCY AT BIRTH · WORLDWIDE</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 320, display: 'flex', alignItems: 'baseline', gap: 60 }}>
          <div style={{ opacity: ease(f, EIGHTEEN - 2, EIGHTEEN + 4) }}><div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.dim }}>1800</div><div style={{ fontFamily: DL_SERIF, fontSize: 140, color: DL.text, opacity: ease(f, TWENTY - 2, TWENTY + 4) }}>≈ 29</div></div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 120, color: DL.dim, opacity: ease(f, TODAY2 - 4, TODAY2 + 4) }}>→</span>
          <div style={{ opacity: ease(f, TODAY2 - 2, TODAY2 + 4) }}><div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.gold }}>TODAY</div><div style={{ fontFamily: DL_SERIF, fontSize: 180, color: DL.gold, opacity: ease(f, SEVENTY - 2, SEVENTY + 4), transform: `scale(${ease(f, SEVENTY - 2, SEVENTY + 12, 1.3, 1)})`, transformOrigin: 'left center' }}>≈ 73</div></div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 640, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 80, color: DYT.magenta, opacity: ease(f, HOW - 2, HOW + 4), transform: `scale(${1 + 0.08 * ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22))})`, transformOrigin: 'left center' }}>How close were you?</div>
        <div style={{ position: 'absolute', left: 160, top: 780 }}><Source at={SEVENTY}>world 1800 ≈ 28.5 (Riley 2005, via OWID) · world 2024 = 73.3 (UN WPP 2024) · at birth, an average</Source></div>
        <YearsStrip items={[{ year: '1800', value: '≈29', place: 'WORLD', at: TWENTY }, { year: '2024', value: '≈73', place: 'WORLD', at: SEVENTY }]} show={1} />
      </AbsoluteFill>

      {/* the walk-back */}
      <FoodLadder rungs={foodRungs(6, true)} show={ladderShow} mode="full" litAt={LIT} glowAt={EAT} />
      <div style={{ position: 'absolute', left: LADDER_FULL.left, top: 96, opacity: ease(f, WALK - 2, WALK + 4) * (1 - ease(f, ME + 53, ME + 57)) }}><Label at={WALK} color={DL.gold} size={30}>NOW WALK DOWN THE LADDER<OnWord at={ME}> WITH ME</OnWord></Label></div>

      {/* payoff, right column (pays the 1500 budget from the cold open) */}
      <div style={{ position: 'absolute', left: 1120, top: 300, width: 640, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 52, lineHeight: 1.15, color: DL.dim, opacity: ease(f, FIFTEEN2 - 2, FIFTEEN2 + 4) }}>In 1500, food took<span style={{ opacity: ease(f, MONEY - 2, MONEY + 4) }}> most of your money,</span><span style={{ opacity: ease(f, HUNGER - 2, HUNGER + 4) }}> and hunger</span><span style={{ opacity: ease(f, DANGER2 - 2, DANGER2 + 4) }}> was the danger.</span></div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 60, lineHeight: 1.15, color: DL.text, opacity: ease(f, TODAY4 - 2, TODAY4 + 4) }}>Today, the danger is</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 96, lineHeight: 1.05, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, CHOOSE - 2, CHOOSE + 4), filter: `drop-shadow(0 0 ${30 * glowAll}px ${DYT.magenta})` }}>what we choose<span style={{ opacity: ease(f, EAT - 2, EAT + 4) }}> to eat.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default FdReveal;
