import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, DayClock } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip, FoodLadder, foodRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow,
  Food, FoodTag, YearsStrip, YEARS_PAST, yearsUpTo, Motorbike,
} from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 10/14 — ERA 6: today, São Paulo (RESEARCH F31–F35, F34). Header TODAY + "São Paulo" on its word; delivery
// motorbikes on "Motorbikes". DYK (F31): BRAZIL'S OFFICIAL FOOD GUIDE on "guide", a clock on "regular", a shared table on
// "other people?". THE PLATE (F32, F33): a Day Clock of a city day (illustration), rice & beans light on "Rice", STILL ON
// MOST PLATES on "plates"; ULTRA-PROCESSED on "ultra-processed", soft drink / snacks on their words; BRAZIL ≈ 1/5 OF
// CALORIES on "fifth", USA > 1/2 on "half". The golden rule (F31): FRESH FOOD & HOME-MADE MEALS ✓ / ULTRA-PROCESSED ✗ on
// their words. F34: obesity > underweight bars on "obesity" (bars only, no bodies). THE YEARS (F35): Brazil ≈ 76 on
// "seventy" + strip pill. "So what is food to you?" = "?"; TOO MUCH? chip on "much" (slot 5, docks); a tipped scale.
// The question: FOOD HELPED US LIVE LONGER on "longer", IS IT NOW TAKING SOME OF THOSE YEARS BACK? on "back?". No salt,
// whole grains, fruit, "1 in 5" or world figure here (they belong to the answer). No EraExit (the answer follows). VO fd09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'FdToday', durationInSeconds: 56.9333, fps: 30, width: 1920, height: 1080 };
const DUR = 1708;

const C = makeCue(vo, 'fd09-today', 0.8);
const TODAY = C.at('today,');
const SAO = C.at('São', 1);
const DOCK = SAO + 46;
const MOTORBIKES = C.at('Motorbikes');
const DELIVERIES = C.at('deliveries.');
const DID = C.at('Did');
const GUIDE = C.at('guide', 1);
const REGULAR = C.at('regular');
const WHENEVER = C.at('whenever');
const OTHER = C.at('other');
const PEOPLE_Q = C.at('people?', 2);
const PLATE = C.at('plate.');
const RICE = C.at('Rice');
const PLATES = C.at('plates');
const ULTRA1 = C.at('ultra-processed', 1);
const SOFT = C.at('Soft');
const SNACKS = C.at('snacks.');
const FIFTH = C.at('fifth');
const UNITED = C.at('United');
const HALF = C.at('half.');
const GOLDEN = C.at('golden');
const CHOOSE = C.at('Choose');
const FRESH = C.at('fresh');
const HOMEMADE = C.at('home-made');
const ULTRA2 = C.at('ultra-processed', 2);
const COUNTRIES = C.at('countries');
const OBESITY = C.at('obesity');
const UNDERWEIGHT = C.at('underweight.');
const NEWBORN = C.at('newborn');
const SEVENTY = C.at('seventy');
const SO2 = C.at('So', 2); // 'So what is food to you?' (1 = 'São')
const YOU_Q = C.at('you?', 3); // 'food to you?' (1 = 'You wake', 2 = 'Did you')
const MUCH = C.at('much');
const CHIP_DOCK = MUCH + 80;
const LITTLE = C.at('little');
const OTHERS = C.at('others.');
const SO3 = C.at('So', 3); // "So here's the question"
const QUESTION = C.at('question');
const LONGER = C.at('longer.');
const TAKING = C.at('taking');
const BACK = C.at('back?');

const FdToday: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK + 10, DID - 2, 10, 8);
  const plate = win(f, PLATE - 4, GOLDEN - 4, 6, 8);
  const rule = win(f, GOLDEN - 4, COUNTRIES - 8, 6, 8);
  const obesity = win(f, COUNTRIES - 8, NEWBORN - 4, 6, 8);
  const years = win(f, NEWBORN - 4, SO2, 6, 8);
  const much = win(f, MUCH - 2, SO3, 4, 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, SO3 - 2, SO3 + 8));
  const strip = (1 - ease(f, SO3 - 6, SO3 + 2)) * ease(f, DOCK, DOCK + 10);
  const tilt = ease(f, MUCH, MUCH + 20) * 14;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a10" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="SÃO PAULO · BRAZIL" dockAt={DOCK} />
      <WakePlace place="São Paulo" at={SAO} dockAt={DOCK} yearAt={TODAY} />

      {/* the street: delivery motorbikes */}
      <AbsoluteFill style={{ opacity: street }}>
        <div style={{ position: 'absolute', left: 160, top: 760, width: 1600, height: 8, background: '#3a3f50' }} />
        {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', top: 560 + k * 20, left: ((f - MOTORBIKES) * (6 + k * 2) + k * 520) % 2100 - 200, opacity: ease(f, MOTORBIKES - 2 + k * 6, MOTORBIKES + 8 + k * 6) }}><Motorbike size={220} box={[DYT.orange, DL.red, DYT.green][k]} /></div>)}
        <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={MOTORBIKES} color={DL.warm} size={32}>MOTORBIKES BUZZ PAST<OnWord at={DELIVERIES}> · FOOD DELIVERIES</OnWord></Label></div>
      </AbsoluteFill>

      {/* THE PLATE: a city day */}
      <AbsoluteFill style={{ opacity: plate }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PLATE} color={DL.gold} size={34}>THE PLATE · A DAY IN SÃO PAULO</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 260 }}>
          <DayClock year="TODAY" at={PLATE} size={400} step={6} hotSeq={[[2, RICE], [4, SOFT]]}
            segs={[{ from: 7, to: 8, label: 'COFFEE + BREAD', color: '#c8893c' }, { from: 8, to: 12, label: 'WORK', color: '#4a5a7a' },
              { from: 12, to: 13, label: 'RICE & BEANS', color: '#f4efe0' }, { from: 13, to: 16, label: 'WORK', color: '#4a5a7a' },
              { from: 16, to: 17, label: 'SOFT DRINK + SNACK', color: '#c0392b' }, { from: 20, to: 21, label: 'DELIVERY', color: DYT.orange }]} />
        </div>
        <div style={{ position: 'absolute', left: 1180, top: 240, display: 'flex', gap: 18, alignItems: 'flex-end' }}>
          <FoodTag kind="ricebeans" at={RICE} size={100} />
          <FoodTag kind="soda" at={SOFT} size={90} />
          <FoodTag kind="snack" at={SNACKS} size={90} />
        </div>
        <div style={{ position: 'absolute', left: 1180, top: 420 }}><Label at={PLATES} color={DL.text} size={26}>RICE & BEANS: STILL ON MOST PLATES</Label></div>
        <div style={{ position: 'absolute', left: 1180, top: 480, width: 580, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Label at={ULTRA1} color={DL.red} size={28}>ULTRA-PROCESSED · SHARE OF CALORIES</Label>
          {([['BRAZIL', 0.197, FIFTH, '≈ 1/5'], ['USA', 0.55, HALF, '> 1/2']] as [string, number, number, string][]).map(([c, v, at, t]) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, at - 2, at + 8) }}>
              <span style={{ width: 110, fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>{c}</span>
              <div style={{ width: 300 * v * ease(f, at, at + 14) / 0.55, height: 40, borderRadius: 8, background: DL.red }} />
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.text }}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 830, width: 1600 }}><Source at={FIFTH}>illustration · POF 2017–18 (rice 76 %, beans 60 % ate it that day) · UPF share: Brazil 19.7 % (2017–18), USA 55.0 % (2021–23)</Source></div>
      </AbsoluteFill>

      {/* the golden rule */}
      <AbsoluteFill style={{ opacity: rule }}>
        <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={GOLDEN} color={DL.gold} size={36}>THE GUIDE'S GOLDEN RULE</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', gap: 60 }}>
          <div style={{ width: 760, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.green}`, background: '#0e0b0af0', opacity: ease(f, CHOOSE - 2, CHOOSE + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.green }}>CHOOSE ✓</div>
            <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
              <FoodTag kind="veg" at={FRESH} size={100} name="FRESH FOOD" color={DL.green} />
              <FoodTag kind="ricebeans" at={HOMEMADE} size={100} name="HOME-MADE MEALS" color={DL.green} />
            </div>
          </div>
          <div style={{ width: 640, padding: '26px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.red}`, background: '#0e0b0af0', opacity: ease(f, ULTRA2 - 2, ULTRA2 + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.red }}>OVER ✗ ULTRA-PROCESSED</div>
            <div style={{ display: 'flex', gap: 20, marginTop: 16 }}><Food kind="soda" size={100} dim={0.5} /><Food kind="snack" size={100} dim={0.5} /></div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 700 }}><Source at={CHOOSE}>Dietary Guidelines for the Brazilian Population, Ministry of Health, 2014</Source></div>
      </AbsoluteFill>

      {/* obesity vs underweight (bars only) */}
      <AbsoluteFill style={{ opacity: obesity }}>
        <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={COUNTRIES} color={DL.dim} size={34}>IN MOST COUNTRIES NOW · ADULTS · 2022</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {([['WOMEN', 177], ['MEN', 145]] as [string, number][]).map(([g, n]) => (
            <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, OBESITY - 2, OBESITY + 8) }}>
              <span style={{ width: 130, fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>{g}</span>
              <div style={{ width: 1100, height: 56, borderRadius: 10, background: DL.panel2, border: `1px solid ${DL.border}`, overflow: 'hidden' }}>
                <div style={{ width: `${(n / 200) * 100 * ease(f, OBESITY, OBESITY + 18)}%`, height: '100%', background: DYT.orange }} />
              </div>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: DL.text }}>{n} / 200</span>
            </div>
          ))}
          <Label at={UNDERWEIGHT} color={DL.text} size={32}>COUNTRIES WHERE MORE ADULTS LIVE WITH OBESITY THAN ARE UNDERWEIGHT</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 640 }}><Source at={OBESITY}>NCD-RisC, Lancet 2024 (adults, 2022)</Source></div>
      </AbsoluteFill>

      {/* THE YEARS */}
      <AbsoluteFill style={{ opacity: years }}>
        <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={NEWBORN} color={DL.gold} size={34}>THE YEARS · BRAZIL · A NEWBORN</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, SEVENTY - 2, SEVENTY + 8) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}>≈ 76 years</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>at birth · average · UN WPP via OWID (2023: 75.8)</span>
        </div>
      </AbsoluteFill>

      {/* "So what is food to you?" — too much of some things, too little of others */}
      <AskMark at={SO2} out={MUCH + 2} left={760} top={250} pulseAt={YOU_Q} />
      <AbsoluteFill style={{ opacity: much }}>
        <svg width={900} height={420} viewBox="0 0 900 420" style={{ position: 'absolute', left: 220, top: 260 }}>
          <path d="M450 400 L410 330 L490 330 Z" fill={DL.dim} />
          <g transform={`rotate(${-tilt} 450 330)`}>
            <line x1={100} y1={330} x2={800} y2={330} stroke={DL.dim} strokeWidth={10} />
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 300, top: 400 + tilt * 8, display: 'flex', gap: 6, opacity: ease(f, MUCH - 2, MUCH + 8) }}><Food kind="soda" size={90} /><Food kind="snack" size={90} /><Food kind="soda" size={90} /></div>
        <div style={{ position: 'absolute', left: 920, top: 400 - tilt * 8, opacity: ease(f, LITTLE - 2, LITTLE + 8) }}><Food kind="veg" size={70} /></div>
        <div style={{ position: 'absolute', left: 1180, top: 320, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Label at={MUCH} color={DL.red} size={34}>TOO MUCH OF SOME THINGS</Label>
          <Label at={LITTLE} color={DL.sky} size={34}>TOO LITTLE<OnWord at={OTHERS}> OF OTHERS</OnWord></Label>
        </div>
      </AbsoluteFill>
      <FoodChip text="TOO MUCH?" at={MUCH} dockAt={CHIP_DOCK} slot={5} left={260} top={720} />

      {/* the question you came for — the words live in the cliffhanger band; the picture: a full plate under a "?" */}
      <AbsoluteFill style={{ opacity: ease(f, SO3 - 4, SO3 + 8), alignItems: 'center' }}>
        <div style={{ marginTop: 230, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 8, color: DL.dim, opacity: ease(f, QUESTION - 2, QUESTION + 8) }}>THE QUESTION YOU CAME FOR</div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 50 }}>
          <div style={{ opacity: ease(f, LONGER - 6, LONGER + 4) }}><Food kind="ricebeans" size={220} glow={0.4} /></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 240, lineHeight: 1, color: DL.red, opacity: ease(f, TAKING - 4, TAKING + 6), transform: `scale(${ease(f, BACK - 4, BACK + 10, 1, 1.15)})` }}>?</div>
          <div style={{ opacity: ease(f, BACK - 6, BACK + 4) }}><Food kind="soda" size={180} /></div>
        </div>
      </AbsoluteFill>

      <YearsStrip items={[...yearsUpTo(5), { ...YEARS_PAST[5], at: SEVENTY }]} show={strip} />
      <FoodLadder rungs={[...foodRungs(5), { year: 'TODAY', label: 'TOO MUCH?', at: CHIP_DOCK + 10 }]} show={ladder} />
      <DidYouKnowThat at={DID} out={PLATE - 6}>
        <OnWord at={GUIDE}>Brazil's official <span style={{ color: '#ffd23f' }}>food guide</span> tells people </OnWord><span style={{ opacity: ease(f, REGULAR - 4, REGULAR + 6), color: '#ff9a1f' }}>to eat at regular times</span>
        <OnWord at={WHENEVER}>, and, whenever they can, </OnWord><span style={{ opacity: ease(f, OTHER - 4, OTHER + 6), color: '#ff9a1f', fontStyle: 'italic' }}>with other people?</span>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ opacity: ease(f, REGULAR - 4, REGULAR + 6) }}>
            <svg width={110} height={110} viewBox="0 0 110 110"><circle cx={55} cy={55} r={48} fill="none" stroke="#ffffff" strokeWidth={6} /><line x1={55} y1={55} x2={55} y2={22} stroke="#ffffff" strokeWidth={6} /><line x1={55} y1={55} x2={80} y2={62} stroke="#ffd23f" strokeWidth={6} /></svg>
          </div>
          <div style={{ opacity: ease(f, PEOPLE_Q - 6, PEOPLE_Q + 4) }}><PeopleRow n={5} lit={() => 1} size={56} gap={10} color="#5ab0ff" /></div>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, PEOPLE_Q, PEOPLE_Q + 10) }}>Dietary Guidelines for the Brazilian Population (2014)</span>
        </div>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: 'Food helped us live longer.', at: LONGER }, { text: 'Is it now taking some of those years back?', at: BACK }]} />
      <EpisodeHud year="TODAY" episode="05" />
    </AbsoluteFill>
  );
};
export default FdToday;
