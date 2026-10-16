import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, FoodChip, FoodLadder, foodRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  Food, FoodTag, YearsStrip, YEARS_PAST, yearsUpTo, Ship, Waves, FoodClock, hold, Baby, pane,
} from '../../lib/dykkit-food';
import vo from './vo.json';

// =============================================================================
// DYK 05 · 7/14 — ERA 3: 1884, Shinagawa on Tokyo Bay (RESEARCH F14–F19). Header + "Shinagawa" on its word; the
// training ship TSUKUBA on "Tsukuba", sails filling on "sail". DYK (F14): a crew of 40 figures, half dim on "half";
// RYUJO 1882–83 on "Ryujo", 169 SICK on "sixty nine", BERIBERI on "beriberi", 25 DIED on "died". THE PLATE (F15): a Day
// Clock of a sailor's day (illustration), the three rice meals light on "rice"; FREE on "free", everything else costs
// money on "money". WHAT CHANGED (F16): TAKAKI KANEHIRO on "Takaki", MEASURES on "measures", the new menu item by item
// (barley, meat, milk, bread, vegetables). Result (F14): TSUKUBA 1884 · 14 SICK on "fourteen", 0 DIED on "None";
// AND THE 14? — THEY HAD NOT EATEN THE NEW FOOD on "not". "So what is food now?" = "?"; SOMETHING TO MEASURE chip on
// "measure." (slot 2, docks). THE YEARS (F18, F19): ≈ 43 on "forty" + strip pill, two men 156 cm / 171 cm on "shorter".
// A VITAMIN on "vitamin" (F17). Cliffhanger: an empty plate, NEXT ▸ 1915. VO fd06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Fd1884', durationInSeconds: 63.8333, fps: 30, width: 1920, height: 1080 };
const DUR = 1915;

const C = makeCue(vo, 'fd06-1884', 0.8);
const EIGHTEEN = C.at('eighteen');
const SHINAGAWA = C.at('Shinagawa,');
const DOCK = SHINAGAWA + 59; // round 4: the place line needs 1.5 s ('on Tokyo Bay' was cut)
const TRAINING = C.at('training');
const TSUKUBA1 = C.at('Tsukuba', 1);
const SAIL = C.at('sail.');
const DID = C.at('Did');
const VOYAGE = C.at('voyage');
const HALF = C.at('half');
const CREW = C.at('crew');
const ATE = C.at('ate?');
const RYUJO = C.at('Ryujo,');
const SIXTY = C.at('sixty');
const BERIBERI = C.at('beriberi.');
const DIED = C.at('died.');
const PLATE = C.at('plate.', 1);
const RICE1 = C.at('rice.', 1);
const RICE2 = C.at('Rice', 2); // 'Rice was free.' (1 = 'White rice.')
const FREE = C.at('free.');
const MONEY = C.at('money.');
const NAVY = C.at('navy');
const TAKAKI = C.at('Takaki');
const MEASURES = C.at('measures');
const CHANGES = C.at('changes');
const BARLEY = C.at('barley,');
const MEAT = C.at('meat,');
const MILK = C.at('milk,');
const BREAD = C.at('bread');
const VEG = C.at('vegetables.');
const TSUKUBA2 = C.at('Tsukuba,', 2);
const FOURTEEN1 = C.at('fourteen', 1);
const NONE = C.at('None');
const FOURTEEN2 = C.at('fourteen?', 2);
const NOT = C.at('not');
const NEW = C.at('new');
const SO = C.at('So');
const NOW = C.at('now?');
const MEASURE = C.at('measure.');
const CHIP_DOCK = MEASURE + 80;
const INSIDE = C.at('inside');
const MATTERS = C.at('matters.');
const TABLES = C.at('tables');
const JAPANS = C.at("Japan's");
const YEAR_B = C.at('year');
const FORTY = C.at('forty');
const JAPANESE = C.at('Japanese');
const FIFTEEN = C.at('fifteen');
const SHORTER = C.at('shorter');
const DECADES = C.at('Decades');
const NAME = C.at('name.');
const VITAMIN = C.at('vitamin.');
const BUT = C.at('But');
const MISSING = C.at('missing');
const POOR = C.at('poor');
const PLATE2 = C.at('plate.', 2);
const DOESNT = C.at("doesn't");
// audit round 1: each panel holds ≥ 1.5 s after its last reveal
const TWENTY_D = C.at('Twenty');
const CARD_END = hold(TWENTY_D, PLATE) + 6; // DYK card's 10 f exit; 25 DIED lands on 'Twenty' (round 6)
const RESULT_END = hold(NOT, SO);
const MEASURE_END = hold(MATTERS, JAPANS);
const VIT_END = hold(VITAMIN, BUT);
const NAME_W = C.at('name.');
const COST = C.at('cost');
const PLATE_END = hold(COST, NAVY);
const TAKAKI_END = hold(VEG, TSUKUBA2);
const NEWBORN = C.at('newborn');

const Fd1884: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const harbour = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const plate = pane(f, CARD_END, PLATE_END);
  const takaki = pane(f, PLATE_END, TAKAKI_END);
  const result = pane(f, TAKAKI_END, RESULT_END);
  const measure = pane(f, MEASURE - 2, MEASURE_END);
  const years = pane(f, MEASURE_END, DECADES);
  const vitamin = pane(f, DECADES - 4, VIT_END);
  const cliff = ease(f, VIT_END - 2, VIT_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT - 2, BUT + 4));
  const strip = (1 - ease(f, BUT - 6, BUT + 2)) * ease(f, DOCK - 2, DOCK + 4);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1420" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1884" idx={3} label="SHINAGAWA · TOKYO BAY" dockAt={DOCK} />
        <WakePlace place="Shinagawa, on Tokyo Bay" at={SHINAGAWA} dockAt={DOCK} yearAt={EIGHTEEN} />

        {/* the harbour: the training ship Tsukuba gets ready to sail */}
        <AbsoluteFill style={{ opacity: harbour }}>
          <div style={{ position: 'absolute', left: 160, top: 680, width: 1600, height: 180, overflow: 'hidden' }}><Waves f={f} w={1600} y={10} color="#2f5f8f" /></div>
          <div style={{ position: 'absolute', left: 620, top: 300, opacity: ease(f, TRAINING - 2, TRAINING + 4) }}><Ship w={640} f={f} sails={`rgba(232,224,204,${0.4 + 0.6 * ease(f, SAIL - 4, SAIL + 16)})`} flag="#e74c3c" /></div>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={TRAINING} color={DL.sky} size={32}>A TRAINING SHIP<OnWord at={TSUKUBA1}> · THE TSUKUBA</OnWord></Label></div>
        </AbsoluteFill>

        {/* THE PLATE: a sailor's day */}
        <AbsoluteFill style={{ opacity: plate }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PLATE} color={DL.gold} size={34}>THE PLATE · A SAILOR'S DAY</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 270 }}>
            <FoodClock year="1884" at={CARD_END} size={420}
              segs={[{ from: 6, to: 7, label: 'WHITE RICE', color: '#f4f0e0', at: RICE1, hot: true }, { from: 7, to: 12, label: 'DRILL & WATCH', color: '#5a6a8a', at: CARD_END + 6 },
                { from: 12, to: 13, label: 'WHITE RICE', color: '#f4f0e0', at: RICE1 + 6, hot: true }, { from: 13, to: 18, label: 'DRILL & WATCH', color: '#5a6a8a', at: CARD_END + 12 },
                { from: 18, to: 19, label: 'WHITE RICE', color: '#f4f0e0', at: RICE1 + 12, hot: true }, { from: 19, to: 6, label: 'SLEEP', color: '#2a3048', at: CARD_END + 18 }]} />
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 270, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><FoodTag kind="rice" at={RICE1} size={110} /><StampText text="FREE" at={FREE} color={DL.green} size={40} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COST - 2, COST + 4) }}>
              {(['meat', 'veg', 'milk'] as const).map((k) => <Food key={k} kind={k} size={70} dim={0.6} />)}
              <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.red }}>COST<br />MONEY</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 690, width: 520 }}><Source at={FREE}>illustration · crewmen's diet "almost exclusively" white rice, issued free · Takaki Kanehiro (JLL)</Source></div>
        </AbsoluteFill>

        {/* WHAT CHANGED: Takaki measures and changes the menu */}
        <AbsoluteFill style={{ opacity: takaki }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={NAVY} color={DL.gold} size={34}>A NAVY DOCTOR<OnWord at={TAKAKI}> · TAKAKI KANEHIRO</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 220, top: 300, opacity: ease(f, TAKAKI - 2, TAKAKI + 4) }}><Kid size={170} adult color={DL.warm} tool="book" /></div>
          <div style={{ position: 'absolute', left: 520, top: 320, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Label at={MEASURES} color={DL.text} size={34}>MEASURES WHAT THE MEN EAT ⚖</Label>
            <Label at={CHANGES} color={DL.gold} size={34}>…AND CHANGES THE MENU</Label>
          </div>
          <div style={{ position: 'absolute', left: 260, top: 560, display: 'flex', gap: 34 }}>
            <FoodTag kind="barley" at={BARLEY} size={110} />
            <FoodTag kind="meat" at={MEAT} size={110} />
            <FoodTag kind="milk" at={MILK} size={110} />
            <FoodTag kind="bread" at={BREAD} size={110} />
            <FoodTag kind="veg" at={VEG} size={110} />
          </div>
        </AbsoluteFill>

        {/* the result: Ryujo vs Tsukuba */}
        <AbsoluteFill style={{ opacity: result }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 60 }}>
            <div style={{ width: 760, padding: '26px 34px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.red}`, background: '#0e0b0af0' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>RYUJO · 1882–83 · OLD MENU</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.red, marginTop: 10 }}>169 sick</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.red }}>25 DIED</div>
            </div>
            <div style={{ width: 760, padding: '26px 34px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${DL.green}`, background: '#0e0b0af0', opacity: ease(f, TSUKUBA2 - 2, TSUKUBA2 + 4) }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim }}>TSUKUBA · 1884 · NEW MENU</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.gold, marginTop: 10, opacity: ease(f, FOURTEEN1 - 2, FOURTEEN1 + 4) }}>14 sick</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.green, opacity: ease(f, NONE - 2, NONE + 4) }}>0 DIED</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 540, display: 'flex', alignItems: 'center', gap: 40 }}>
            <Label at={FOURTEEN2} color={DL.gold} size={40}>AND THE 14?</Label>
            <div style={{ opacity: ease(f, NOT - 2, NOT + 4), display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
              <PeopleRow n={14} lit={() => 0} size={40} gap={6} />
              <StampText text="HAD NOT EATEN THE NEW FOOD" at={NOT} color={DL.red} size={34} tilt={-2} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 760 }}><Source at={NONE}>Ryujo 169 / 376 crew, 25 died · Tsukuba 14 / 333, none died · James Lind Library; Sugiyama (some say 16)</Source></div>
        </AbsoluteFill>

        {/* "So what is food now?" — something to measure. What's inside it matters. */}
        <AskMark at={RESULT_END} out={MEASURE + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: measure }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'center', gap: 40 }}>
            <svg width={220} height={200} viewBox="0 0 220 200"><line x1={110} y1={20} x2={110} y2={180} stroke={DL.gold} strokeWidth={8} /><line x1={20} y1={60} x2={200} y2={60} stroke={DL.gold} strokeWidth={8} /><path d="M20 60 L0 120 L60 120 Z M200 60 L160 120 L220 120 Z" fill="none" stroke={DL.gold} strokeWidth={5} /><rect x={70} y={176} width={80} height={14} fill={DL.gold} /></svg>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.gold, opacity: ease(f, INSIDE - 2, INSIDE + 4) }}>what's inside it<OnWord at={MATTERS}> matters</OnWord></div>
          </div>
        </AbsoluteFill>
        <FoodChip text="SOMETHING TO MEASURE" at={MEASURE} dockAt={CHIP_DOCK} slot={2} left={260} top={720} />

        {/* THE YEARS + height */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={MEASURE_END + 4} color={DL.gold} size={34}>THE YEARS · JAPAN'S FIRST LIFE TABLES</Label></div>
          <div style={{ position: 'absolute', left: 900, top: 290, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={130} /></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, FORTY - 2, FORTY + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 140, lineHeight: 1, color: DL.gold }}>≈ 43 years</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>1891–98 · men 42.8 · women 44.3 · MHLW</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 530, display: 'flex', alignItems: 'flex-end', gap: 50, opacity: ease(f, JAPANESE - 2, JAPANESE + 4) }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Kid size={120 * 156.2 / 170.8} adult color={DL.warm} /><span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.warm }}>BORN 1896 · 156 cm</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, FIFTEEN - 2, FIFTEEN + 4) }}><Kid size={120} adult color={DL.gold} /><span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.gold }}>BORN 1996 · 171 cm</span></div>
            <Label at={SHORTER} color={DL.text} size={34} style={{ marginBottom: 80 }}>≈ 15 cm SHORTER</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={FIFTEEN}>mean height of Japanese men by birth year · NCD-RisC, eLife 2016 · height reflects food and infection</Source></div>
        </AbsoluteFill>

        {/* decades later: a vitamin */}
        <AbsoluteFill style={{ opacity: vitamin }}>
          <div style={{ position: 'absolute', left: 260, top: 320, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <Label at={DECADES} color={DL.dim} size={34}>DECADES LATER<OnWord at={NAME}>, IT GETS A NAME</OnWord></Label>
            <div style={{ fontFamily: DL_SERIF, fontSize: 130, color: DL.gold, opacity: ease(f, VITAMIN - 2, VITAMIN + 4), transform: `scale(${ease(f, VITAMIN - 2, VITAMIN + 12, 1.3, 1)})`, transformOrigin: 'left center' }}>A vitamin.</div>
            <div style={{ position: 'absolute', left: 0, top: 60, fontFamily: DL_SERIF, fontSize: 130, color: DL.gold, opacity: ease(f, NAME_W - 2, NAME_W + 4) * (1 - ease(f, VITAMIN - 6, VITAMIN)) }}>?</div>
            <Source at={VITAMIN}>Funk coins "vitamine" (1912) · thiamine, vitamin B1, isolated 1926</Source>
          </div>
        </AbsoluteFill>

        {/* cliffhanger: knowing what's missing doesn't put it on a poor family's plate */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 760, top: 330, opacity: ease(f, VIT_END - 2, VIT_END + 10) }}>
            <svg width={400} height={240} viewBox="0 0 400 240"><ellipse cx={200} cy={130} rx={180} ry={90} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={6} /><ellipse cx={200} cy={130} rx={120} ry={56} fill="none" stroke="#d8d0c0" strokeWidth={4} /></svg>
          </div>
          <div style={{ position: 'absolute', left: 340, top: 330, opacity: ease(f, MISSING - 2, MISSING + 4) * (1 - ease(f, PLATE2 - 4, PLATE2 + 12)), transform: `translateY(${-60 * ease(f, PLATE2 - 4, PLATE2 + 20)}px)`, fontFamily: DL_MONO, fontSize: 40, color: DL.gold }}>VITAMIN ✓</div>
        </AbsoluteFill>

        <YearsStrip items={[...yearsUpTo(2), { ...YEARS_PAST[2], at: FORTY }]} show={strip} />
        <FoodLadder rungs={[...foodRungs(2), { year: '1884', label: 'TO MEASURE', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={VOYAGE}>on a voyage like this one, </OnWord><OnWord at={YEAR_B}>the year before <span style={{ color: '#5ab0ff', fontFamily: DL_MONO, fontSize: 40 }}>(1882–83)</span>, </OnWord><span style={{ opacity: ease(f, HALF - 2, HALF + 4), color: '#ffd23f' }}>almost half the crew </span>
          <OnWord at={CREW}>got sick </OnWord><span style={{ opacity: ease(f, ATE - 6, ATE + 4), color: '#ff9a1f', fontStyle: 'italic' }}>from what they ate?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ opacity: ease(f, VOYAGE - 2, VOYAGE + 4) }}><PeopleRow n={20} lit={(i) => (i % 2 === 0 ? 1 - 0.75 * ease(f, HALF, HALF + 12) : 1)} size={34} gap={6} color="#5ab0ff" /></div>
            <div style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ffffff', opacity: ease(f, RYUJO - 2, RYUJO + 4) }}>RYUJO<span style={{ opacity: ease(f, SIXTY - 2, SIXTY + 4), color: '#ffd23f' }}> · 169 SICK</span><span style={{ opacity: ease(f, BERIBERI - 2, BERIBERI + 4) }}> · BERIBERI</span><span style={{ opacity: ease(f, TWENTY_D - 2, TWENTY_D + 4), color: '#ff4d4d' }}> · 25 DIED</span></div>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, TWENTY_D - 2, TWENTY_D + 4) }}>Ryujo, 1882–83: 169 of 376 crew · James Lind Library</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1915" parts={[{ text: "But knowing what's missing", at: BUT }, { text: "doesn't put it on", at: DOESNT }, { text: "a poor family's plate.", at: POOR }]} />
      <EpisodeHud year={1884} episode="05" />
    </AbsoluteFill>
  );
};
export default Fd1884;
