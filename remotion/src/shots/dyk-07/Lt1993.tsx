import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, lightRungs, Label, Source, AskMark, OnWord, Kid,
  LightProp, PriceStrip, PRICE_PAST, priceUpTo, hold, pane, cardOut, QGRAD, FLAME, LED_BLUE,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 9/14 — ERA 5: 1993, Tokushima on Shikoku (RESEARCH L12, L3). Header + "Tokushima, Shikoku" on "Tokushima";
// a dark lab bench from frame 0 (no blue yet), A SMALL COMPANY LAB on "small", an engineer on "engineer", a dim chip on
// "chip.". DYK (L12): the missing colour of light / was blue? (blue only on "blue?"); a red chip on "Red", a green chip on
// "green", FOR DECADES; WITHOUT BLUE, an empty blue slot; NO WHITE on "white.". THE CRYSTAL: SHUJI NAKAMURA per word; a
// chip glows blue on "bright" / "blue"; a crystal on "crystal." (1); a yellow coating on "yellow" turns the light white on
// "white" (2); NO FIRE / NO GLOWING WIRE / VERY LITTLE HEAT each struck on its word. THE NOBEL: +21 YEARS on "Twenty",
// three figures on "two" (he + two), a medal and 2014 on "Nobel" (nobelprize.org source). THE PRICE (L3): ONE HOUR OF
// LIGHT on "What", 1992 on "nineteen" (2), a spiral bulb on "energy-saving", < ½ SECOND on "half" + strip pill, OF WORK.
// "So what is light now?" = "?"; A CRYSTAL chip on "crystal." (2, slot 4, docks). Light without fire: a white chip, the
// flame struck. Cliffhanger: tiny lights multiply on "nothing," and a "?" on "it?" — NEXT ▸ TODAY. VO lt08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt1993', durationInSeconds: 54.3333, fps: 30, width: 1920, height: 1080 };
const DUR = 1630;

const C = makeCue(vo, 'lt08-1993', 0.8);
const NINETEEN1 = C.at('nineteen', 1);
const TOKUSHIMA = C.at('Tokushima,');
const ISLAND = C.at('island');
const SHIKOKU = C.at('Shikoku.');
const DOCK = SHIKOKU + 30;
const INSIDE = C.at('Inside');
const SMALL = C.at('small');
const COMPANY = C.at('company');
const ENGINEER1 = C.at('engineer', 1);
const STARING = C.at('staring');
const CHIP1 = C.at('chip.', 1);
const DID = C.at('Did');
const MISSING = C.at('missing');
const COLOUR = C.at('colour');
const BLUE1 = C.at('blue?', 1); // 'was blue?' (2 'Without blue,', 3 'bright blue')
const RED = C.at('Red');
const GREEN = C.at('green');
const GLOWING1 = C.at('glowing', 1); // 'green glowing chips' (2 = 'No glowing wire')
const DECADES = C.at('decades.');
const WITHOUT1 = C.at('Without', 1); // 'Without blue' (2 = 'Light without fire')
const WITHOUT2 = C.at('without', 2);
const WHITE1 = C.at('white.', 1); // 'make white.' (2 = 'white light')
const HERES = C.at("Here's");
const MORNING = C.at('morning.');
const ENGINEER2 = C.at('engineer,', 2);
const SHUJI = C.at('Shuji');
const NAKAMURA = C.at('Nakamura,');
const BRIGHT = C.at('bright');
const BLUE3 = C.at('blue', 3); // 'bright blue light' (1 = 'blue?', 2 = 'Without blue,')
const CRYSTAL1 = C.at('crystal.', 1);
const ADD = C.at('Add');
const YELLOW = C.at('yellow');
const COATING = C.at('coating,');
const WHITE2 = C.at('white', 2);
const CHIP2 = C.at('chip.', 2);
const NO1 = C.at('No', 1); // 'No fire.' (2 = 'No glowing wire.')
const FIRE1 = C.at('fire.', 1);
const NO2 = C.at('No', 2);
const GLOWING2 = C.at('glowing', 2);
const WIRE = C.at('wire.');
const VERY = C.at('Very');
const HEAT = C.at('heat.');
const TWENTY = C.at('Twenty');
const YEARS = C.at('years');
const TWO = C.at('two', 1); // 'two Japanese' (2 = 'ninety two,')
const JAPANESE = C.at('Japanese');
const SHARE = C.at('share');
const NOBEL = C.at('Nobel');
const IT1 = C.at('it.', 1); // 'for it.' (2 = 'with it?')
const WHAT1 = C.at('What', 1); // 'What does one hour' (2 = 'So what is', 3 = 'what do we')
const HOUR = C.at('hour');
const COST = C.at('cost');
const NINETEEN2 = C.at('nineteen', 2);
const ENERGY = C.at('energy-saving');
const LESS = C.at('less');
const HALF = C.at('half');
const WORK = C.at('work.');
const SO1 = C.at('So', 1); // 'So what is light now?' (2 = 'So when light')
const NOW_Q = C.at('now?', 2); // 'light now?' (1 = 'cost you now?')
const CRYSTAL2 = C.at('crystal.', 2);
const CHIP_DOCK = CRYSTAL2 + 80;
const LIGHT6 = C.at('Light', 6); // 'Light without fire.' (1 'of light was', 2 'blue light', 3 'white light', 4 'hour of light', 5 'is light now?')
const FIRE2 = C.at('fire.', 2);
const SO2 = C.at('So', 2);
const NOTHING = C.at('nothing,');
const WHAT3 = C.at('what', 3);
const IT2 = C.at('it?', 2);
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(WHITE1, HERES);
const CRYSTAL_END = hold(HEAT, TWENTY);
const NOBEL_END = hold(IT1, WHAT1);
const PRICE_END = hold(WORK, SO1);
const CHIP_END = hold(FIRE2, SO2);

// a small square chip on four legs; `glow` 0–1 in `color` (dim grey when 0)
const Chip: React.FC<{ size?: number; glow?: number; color?: string; f: number }> = ({ size = 160, glow = 0, color = LED_BLUE, f }) => {
  const g = glow * (0.9 + 0.1 * Math.sin(f / 5));
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      <circle cx={50} cy={44} r={46 * g} fill={color} opacity={0.25 * g} />
      {[30, 44, 56, 70].map((x) => <line key={x} x1={x} y1={64} x2={x} y2={88} stroke="#8a929c" strokeWidth={4} />)}
      <rect x={22} y={22} width={56} height={44} rx={6} fill="#2a2e36" stroke="#6a727c" strokeWidth={3} />
      <rect x={38} y={32} width={24} height={22} rx={3} fill={glow > 0.02 ? color : '#3a3f48'} opacity={0.35 + 0.65 * g} />
    </svg>
  );
};

// a clear six-sided crystal (gallium nitride is drawn only as a crystal; no chemistry on screen)
const Crystal: React.FC<{ size?: number; f: number }> = ({ size = 130, f }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: 'visible' }}>
    <path d="M50 6 L82 30 L82 96 L50 124 L18 96 L18 30 Z" fill="#9ab4ff" opacity={0.28} stroke="#c8d6ff" strokeWidth={3} />
    <path d="M50 6 L50 124 M18 30 L82 96 M82 30 L18 96" stroke="#e8eeff" strokeWidth={1.5} opacity={0.5} />
    <path d={`M${30 + 20 * Math.sin(f / 18)} 40 l6 -10 l6 10 l-6 10 Z`} fill="#ffffff" opacity={0.7} />
  </svg>
);

// a spiral energy-saving bulb (1992's lamp in Nordhaus's table)
const SpiralBulb: React.FC<{ size?: number; lit?: number }> = ({ size = 150, lit = 1 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 100 140" style={{ overflow: 'visible' }}>
    <circle cx={50} cy={46} r={44 * lit} fill={FLAME} opacity={0.16 * lit} />
    {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={50} cy={20 + k * 18} rx={24} ry={9} fill="none" stroke={`rgba(255,246,220,${0.4 + 0.6 * lit})`} strokeWidth={7} />)}
    <rect x={32} y={88} width={36} height={22} rx={4} fill="#e8e4d8" stroke="#9a9080" strokeWidth={2} />
    <rect x={38} y={110} width={24} height={16} rx={3} fill="#9aa0a8" />
  </svg>
);

const Medal: React.FC<{ size?: number; shine?: number }> = ({ size = 150, shine = 0 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: 'visible', filter: shine > 0.01 ? `drop-shadow(0 0 ${18 * shine}px ${DL.gold})` : undefined }}>
    <path d="M30 4 L46 52 L54 52 L70 4 L58 4 L50 32 L42 4 Z" fill="#3b5bd8" />
    <circle cx={50} cy={84} r={38} fill="#d8b04a" stroke="#9a7420" strokeWidth={4} />
    <circle cx={50} cy={84} r={26} fill="none" stroke="#9a7420" strokeWidth={2} />
  </svg>
);

// a thing that is NOT there: its icon dims and a red line strikes it on its word
const Struck: React.FC<{ at: number; strikeAt?: number; children: React.ReactNode; label: React.ReactNode }> = ({ at, strikeAt, children, label }) => {
  const f = useCurrentFrame();
  const hit = strikeAt ?? at;
  const s = ease(f, hit, hit + 8);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, at - 2, at + 4) }}>
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        <div style={{ opacity: 1 - 0.5 * s }}>{children}</div>
        <svg width={130} height={130} viewBox="0 0 130 130" style={{ position: 'absolute', left: -5, top: -5 }}><line x1={14} y1={116} x2={14 + 102 * s} y2={116 - 102 * s} stroke={DL.red} strokeWidth={10} strokeLinecap="round" opacity={s > 0.01 ? 1 : 0} /></svg>
      </div>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.text, whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
};

const Thermo: React.FC<{ level: number }> = ({ level }) => (
  <svg width={120} height={120} viewBox="0 0 100 100">
    <rect x={42} y={8} width={16} height={66} rx={8} fill="#1a1d24" stroke="#9aa0a8" strokeWidth={3} />
    <rect x={46} y={70 - 56 * level} width={8} height={56 * level + 6} fill={DL.red} />
    <circle cx={50} cy={82} r={13} fill={DL.red} stroke="#9aa0a8" strokeWidth={3} />
  </svg>
);

const SPARKS = Array.from({ length: 24 }, (_, i) => ({ x: (i * 137) % 1000, y: (i * 61) % 180 }));

const Lt1993: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the lab stays behind the DYK card's scrim so "staring at a chip" is not a flash
  const lab = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, CARD_END - 18, CARD_END - 10));
  const crystal = pane(f, CARD_END, CRYSTAL_END);
  const nobel = pane(f, CRYSTAL_END, NOBEL_END);
  const price = pane(f, NOBEL_END, PRICE_END);
  const chipPane = pane(f, CRYSTAL2 - 2, CHIP_END);
  const cliff = ease(f, CHIP_END - 2, CHIP_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12); // stays to the cut
  const strip = (1 - ease(f, SO2 - 6, SO2 + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const blue = ease(f, BRIGHT - 2, BRIGHT + 8);
  const coat = ease(f, YELLOW - 2, YELLOW + 10);
  const toWhite = ease(f, WHITE2 - 2, WHITE2 + 10);
  // blue → white: the chip's own light carries the turn
  const ledColor = toWhite > 0.5 ? '#fff6e0' : LED_BLUE;
  const many = ease(f, NOTHING - 2, NOTHING + 30);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow={toWhite > 0.5 ? '#14120e' : '#0a0e1c'} />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1993" idx={5} label="JAPAN" dockAt={DOCK} />
        <WakePlace place="Tokushima, Shikoku" at={TOKUSHIMA} dockAt={DOCK} yearAt={NINETEEN1} />
        {/* "island": Shikoku's outline draws under the place line, a pin on Tokushima (east coast); leaves with the dock */}
        <div style={{ position: 'absolute', left: 860, top: 730, opacity: ease(f, ISLAND - 2, ISLAND + 6) * (1 - ease(f, DOCK - 6, DOCK + 6)) }}>
          <svg width={200} height={110} viewBox="0 0 200 110">
            <path d="M12 70 Q30 40 70 46 Q100 20 140 30 Q176 26 188 52 Q170 70 150 66 Q120 92 86 80 Q50 96 12 70 Z" fill="#1e3a2a" stroke={DL.green} strokeWidth={3} strokeDasharray={400} strokeDashoffset={400 * (1 - ease(f, ISLAND, ISLAND + 14))} />
            <circle cx={168} cy={50} r={7 + Math.sin(f / 6)} fill={DL.gold} opacity={ease(f, ISLAND + 10, ISLAND + 16)} />
          </svg>
        </div>

        {/* the lab: a dark bench, an engineer, a dim chip under a desk lamp */}
        <AbsoluteFill style={{ opacity: lab }}>
          <div style={{ position: 'absolute', left: 160, top: 700, width: 1600, height: 26, borderRadius: 6, background: '#2a2f3a' }} />
          <div style={{ position: 'absolute', left: 220, top: 726, width: 20, height: 140, background: '#22262f' }} />
          <div style={{ position: 'absolute', left: 1680, top: 726, width: 20, height: 140, background: '#22262f' }} />
          {[0, 1, 2].map((k) => <div key={k} style={{ position: 'absolute', left: 1300 + k * 140, top: 580 + (k % 2) * 30, width: 60, height: 120 - (k % 2) * 30, borderRadius: '6px 6px 14px 14px', border: '3px solid #6a7484', background: `rgba(140,160,190,${0.12 + 0.05 * Math.sin(f / 14 + k)})` }} />)}
          <div style={{ position: 'absolute', left: 760, top: 470, opacity: ease(f, ENGINEER1 - 2, ENGINEER1 + 6) }}><Kid size={150} adult color="#c8ccd6" /></div>
          <div style={{ position: 'absolute', left: 950, top: 560, opacity: ease(f, CHIP1 - 2, CHIP1 + 4), transform: `scale(${ease(f, CHIP1 - 2, CHIP1 + 10, 1.25, 1)})` }}><Chip size={150} glow={0} f={f} /></div>
          <div style={{ position: 'absolute', left: 940, top: 540, width: 170, height: 170, borderRadius: '50%', background: 'radial-gradient(#ffffff14, transparent 70%)', opacity: 0.6 + 0.4 * Math.sin(f / 11) }} />
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={Math.max(SMALL, DOCK + 8)} color={DL.warm} size={32}>A SMALL<OnWord at={COMPANY}> COMPANY LAB</OnWord></Label>
            <Label at={ENGINEER1} color={DL.dim} size={30}>AN ENGINEER<OnWord at={STARING}> STARING</OnWord><OnWord at={CHIP1}> AT A CHIP</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={Math.max(INSIDE, DOCK + 8)}>Nichia, a company in Tokushima · Physics World 2014</Source></div>
        </AbsoluteFill>

        {/* THE CRYSTAL: Shuji Nakamura's bright blue light, coated yellow → white; no fire, no wire, little heat */}
        <AbsoluteFill style={{ opacity: crystal }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(ENGINEER2, CARD_END)} color={DL.gold} size={34}>THE ENGINEER<OnWord at={SHUJI}> · SHUJI</OnWord><OnWord at={NAKAMURA}> NAKAMURA</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 200, top: 300, width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(${ledColor}55, transparent 65%)`, opacity: blue * (0.85 + 0.15 * Math.sin(f / 6)) }} />
            <div style={{ position: 'relative', opacity: ease(f, CARD_END - 2, CARD_END + 6) }}><Chip size={220} glow={blue} color={ledColor} f={f} /></div>
            <div style={{ position: 'absolute', left: 104, top: 96, width: 92, height: 82, borderRadius: 8, border: `6px solid #ffd23f`, opacity: coat * (1 - 0.4 * toWhite) }} />
          </div>
          <div style={{ position: 'absolute', left: 540, top: 330, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Label at={BRIGHT} color={DL.text} size={34}>A BRIGHT<OnWord at={BLUE3}> <span style={{ color: '#7a9cff' }}>BLUE</span> LIGHT</OnWord></Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Label at={CRYSTAL1} color={DL.dim} size={30}>FROM A CRYSTAL</Label>
              <div style={{ opacity: ease(f, CRYSTAL1 - 2, CRYSTAL1 + 4), transform: `scale(${ease(f, CRYSTAL1 - 2, CRYSTAL1 + 10, 1.25, 1)})` }}><Crystal size={80} f={f} /></div>
            </div>
            <Label at={ADD} color={DL.dim} size={30}>ADD A<OnWord at={YELLOW}> <span style={{ color: '#ffd23f' }}>YELLOW</span></OnWord><OnWord at={COATING}> COATING</OnWord></Label>
            <Label at={WHITE2} color="#fff6e0" size={32}>= WHITE LIGHT<OnWord at={CHIP2}> FROM A CHIP</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 330, display: 'flex', gap: 40 }}>
            <Struck at={NO1} strikeAt={FIRE1} label={<>NO<OnWord at={FIRE1}> FIRE</OnWord></>}><LightProp kind="tallow" size={120} f={f} /></Struck>
            <Struck at={NO2} strikeAt={WIRE} label={<>NO<OnWord at={GLOWING2}> GLOWING</OnWord><OnWord at={WIRE}> WIRE</OnWord></>}><LightProp kind="bulb" size={120} f={f} /></Struck>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 600, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, VERY - 2, VERY + 4) }}>
            <Thermo level={0.7 - 0.55 * ease(f, HEAT, HEAT + 14)} />
            <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 2, color: DL.sky }}>VERY LITTLE<OnWord at={HEAT}> HEAT</OnWord></span>
          </div>
        </AbsoluteFill>

        {/* THE NOBEL: twenty-one years later, he and two Japanese scientists share it (L12) */}
        <AbsoluteFill style={{ opacity: nobel }}>
          <div style={{ position: 'absolute', left: 160, top: 220, fontFamily: DL_SERIF, fontSize: 140, lineHeight: 1, color: DL.gold, opacity: ease(f, CRYSTAL_END - 2, CRYSTAL_END + 4) }}>+21<OnWord at={YEARS}><span style={{ fontSize: 70 }}> years later</span></OnWord></div>
          <div style={{ position: 'absolute', left: 160, top: 420, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ opacity: k === 0 ? ease(f, TWENTY + 8, TWENTY + 14) : ease(f, TWO - 2 + (k - 1) * 6, TWO + 4 + (k - 1) * 6) }}><Kid size={110} adult color={k === 0 || f >= IT1 ? DL.gold : DL.warm} glow={ease(f, IT1 - 2, IT1 + 8)} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 680, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={TWO} color={DL.text} size={30}>HE + TWO<OnWord at={JAPANESE}> JAPANESE SCIENTISTS</OnWord></Label>
            <Label at={SHARE} color={DL.dim} size={30}>SHARE<OnWord at={NOBEL}> THE NOBEL PRIZE · 2014</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 300, opacity: ease(f, NOBEL - 2, NOBEL + 4), transform: `scale(${ease(f, NOBEL - 2, NOBEL + 12, 1.3, 1)}) rotate(${Math.sin(f / 16) * 3}deg)` }}><Medal size={220} shine={0.5 + 0.3 * Math.sin(f / 9) + 0.8 * ease(f, IT1 - 2, IT1 + 6) * (1 - ease(f, IT1 + 10, IT1 + 24))} /></div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={NOBEL}>Nobel Prize in Physics 2014 · Akasaki, Amano, Nakamura · nobelprize.org</Source></div>
        </AbsoluteFill>

        {/* THE PRICE: one hour of light, 1992, an energy-saving bulb: less than half a second of work (L3) */}
        <AbsoluteFill style={{ opacity: price }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={Math.max(WHAT1, NOBEL_END)} color={DL.gold} size={34}>ONE<OnWord at={HOUR}> HOUR OF LIGHT</OnWord><OnWord at={COST}> · WHAT DOES IT COST?</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300, fontFamily: DL_SERIF, fontSize: 90, color: DL.text, opacity: ease(f, NINETEEN2 - 2, NINETEEN2 + 4) }}>1992</div>
          <div style={{ position: 'absolute', left: 520, top: 290, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, ENERGY - 2, ENERGY + 4), transform: `scale(${ease(f, ENERGY - 2, ENERGY + 10, 1.2, 1)})` }}>
            <SpiralBulb size={110} lit={0.85 + 0.15 * Math.sin(f / 7)} />
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}>AN ENERGY-SAVING BULB</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 500, display: 'flex', alignItems: 'baseline', gap: 26 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 80, color: DL.dim, opacity: ease(f, LESS - 2, LESS + 4) }}>less than</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 170, lineHeight: 1, color: FLAME, textShadow: `0 0 40px ${FLAME}55`, opacity: ease(f, HALF - 2, HALF + 4), display: 'inline-block', transform: `scale(${ease(f, HALF - 2, HALF + 10, 1.25, 1)})` }}>½ second</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 700, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Label at={WORK} color={DL.text} size={34}>OF WORK</Label>
            <div style={{ opacity: ease(f, WORK - 2, WORK + 4) }}><Kid size={60} adult tool="hammer" color={DL.warm} /></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={HALF}>Nordhaus 1997, table 1.4 · work hours per 1,000 lumen-hours (1992: ≈ 0.4 s)</Source></div>
        </AbsoluteFill>

        {/* "So what is light now?" — A crystal. Light without fire. */}
        <AskMark at={PRICE_END} out={CRYSTAL2 + 2} left={760} top={250} pulseAt={NOW_Q} />
        <AbsoluteFill style={{ opacity: chipPane }}>
          <div style={{ position: 'absolute', left: 260, top: 280, display: 'flex', alignItems: 'center', gap: 50 }}>
            <div style={{ opacity: ease(f, CRYSTAL2 - 2, CRYSTAL2 + 6) }}><Chip size={200} glow={1} color="#fff6e0" f={f} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 84, color: DL.gold, opacity: ease(f, LIGHT6 - 2, LIGHT6 + 4) }}>Light<OnWord at={WITHOUT2}> without</OnWord><OnWord at={FIRE2}> fire.</OnWord></div>
              <div style={{ opacity: ease(f, FIRE2 - 2, FIRE2 + 4) }}><Struck at={FIRE2} label=""><LightProp kind="tallow" size={110} f={f} /></Struck></div>
            </div>
          </div>
        </AbsoluteFill>
        <LightChip text="A CRYSTAL" at={CRYSTAL2} dockAt={CHIP_DOCK} slot={4} left={260} top={720} />

        {/* cliffhanger: when light costs almost nothing — tiny lights multiply, then a "?" */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 260, top: 230 }}><Label at={Math.max(SO2, CHIP_END)} color={DL.dim} size={32}>WHEN LIGHT COSTS<OnWord at={NOTHING}> ALMOST NOTHING…</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 260, top: 320, width: 1000, height: 200 }}>
            {SPARKS.map((p, i) => <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: 12, height: 12, borderRadius: '50%', background: '#fff6e0', boxShadow: '0 0 14px #fff6e0', opacity: (i / SPARKS.length < many ? 1 : 0) * (0.7 + 0.3 * Math.sin(f / 6 + i)) }} />)}
          </div>
          <div style={{ position: 'absolute', left: 560, top: 520, fontFamily: DL_SERIF, fontSize: 200, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, IT2 - 2, IT2 + 4), transform: `scale(${ease(f, IT2 - 2, IT2 + 10, 1.3, 1)})` }}>?</div>
        </AbsoluteFill>

        <PriceStrip items={[...priceUpTo(4), { ...PRICE_PAST[4], at: HALF }]} show={strip} />
        <LightLadder rungs={[...lightRungs(4), { year: '1993', label: 'A CRYSTAL', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={MISSING}>the missing </OnWord><OnWord at={COLOUR}>colour of light </OnWord><span style={{ opacity: ease(f, BLUE1 - 2, BLUE1 + 4), color: '#7a9cff', fontStyle: 'italic' }}>was blue?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, RED - 2, RED + 4) }}><Chip size={90} glow={1} color="#ff4a3a" f={f} /></div>
            <div style={{ opacity: ease(f, GREEN - 2, GREEN + 4) }}><Chip size={90} glow={1} color="#34d058" f={f} /></div>
            <div style={{ width: 90, height: 90, borderRadius: 12, border: '4px dashed #7a9cff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_MONO, fontSize: 44, color: '#7a9cff', opacity: ease(f, WITHOUT1 - 2, WITHOUT1 + 4), transform: `scale(${1 + 0.18 * ease(f, MORNING - 2, MORNING + 5) * (1 - ease(f, MORNING + 8, MORNING + 14))})`, boxShadow: `0 0 ${30 * ease(f, MORNING - 2, MORNING + 5)}px #7a9cff` }}>?</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ffffff', lineHeight: 1.35 }}>
              <OnWord at={RED}>RED</OnWord><OnWord at={GREEN}> + GREEN</OnWord><OnWord at={GLOWING1}> GLOWING CHIPS</OnWord><span style={{ opacity: ease(f, DECADES - 2, DECADES + 4), color: '#ffd23f' }}> · FOR DECADES</span>
              <div><span style={{ opacity: ease(f, WITHOUT1 - 2, WITHOUT1 + 4), color: '#7a9cff' }}>WITHOUT BLUE</span><span style={{ opacity: ease(f, WHITE1 - 2, WHITE1 + 4), color: '#ff9a1f' }}> · NO WHITE.</span></div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, WHITE1 - 2, WHITE1 + 4) }}>red and green came long before blue · Physics World 2014 · nobelprize.org</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="TODAY" parts={[{ text: 'So when light costs almost nothing,', at: SO2 }, { text: 'what do we do with it?', at: WHAT3 }]} />
      <EpisodeHud year={1993} episode="07" />
    </AbsoluteFill>
  );
};
export default Lt1993;
