import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, LIGHT_ARC, Label, Source, StampText, AskMark, OnWord, CountUp,
  LightProp, PropTag, PriceStrip, PRICE_PAST, hold, pane, cardOut, FLAME,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 5/14 — ERA 1: 1500, a market town in Flanders (RESEARCH L1, L2, L3). Header + "a market town in Flanders"
// on its words; the town at dusk, LATE AUTUMN on "late", the sky darkens on "going", the church bell appears on "bell"
// and swings on "ring". DYK (L1): this bell has a name… curfew? (bell swings in the card), OLD FRENCH on "old",
// COVER THE FIRE on "cover", the hearth gets its lid on "bank", THE DAY IS OVER on "over". YOUR EVENING (L2): the sun
// sinks on "sunset"; TALLOW CANDLE / SHEEP FAT / SMOKES · STINKS / COSTS TOO MUCH on their words; RUSHLIGHT on its word,
// A DRIED RUSH · DIPPED IN GREASE, the burn bar A FEW MINUTES → AN HOUR AT MOST (hedged, never one number);
// BEESWAX · FOR THE CHURCH · & THE RICH. THE PRICE (L3, Nordhaus table 1.4): ONE HOUR OF LIGHT · COST YOU? on their
// words, the bulb on "bulb's", NORDHAUS on his name, BABYLON ≈41 H on "forty" (count-up + strip pill), 1800 · AMERICA >5 H
// on "five" (strip pill), the 3,000-year bar and THE PRICE BARELY MOVED on "barely". "So what is light to you?" = "?";
// A LUXURY chip on "luxury." (slot 0, docks). Cliffhanger: 1500 → 1800 candles go out on "dark", London on "London",
// a flame with no wick in the air on "fire."; NEXT ▸ 1807. VO lt04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt1500', durationInSeconds: 74.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 2249;

const C = makeCue(vo, 'lt04-1500', 0.8);
const FIFTEEN = C.at('fifteen');
const MARKET = C.at('market');
const FLANDERS = C.at('Flanders.');
const DOCK = FLANDERS + 24;
const LATE = C.at('late');
const LIGHT1 = C.at('light', 1); // 'The light is going' (2 = 'one hour of light', 3 = 'what is light')
const GOING = C.at('going,');
const CHURCH1 = C.at('church', 1); // 'the church bell' (2 = 'for the church')
const BELL1 = C.at('bell', 1); // 'church bell starts' (2 = 'this bell has')
const RING = C.at('ring.');
const DID = C.at('Did');
const THIS = C.at('this');
const BELL2 = C.at('bell', 2);
const NAME1 = C.at('name,', 1); // 'has a name,' (2 = 'the name is')
const AND2 = C.at('and', 2); // 'and the name is' (1 = 'and the church bell')
const CURFEW = C.at('curfew?');
const COMES = C.at('comes', 1); // 'It comes from' (gold underline under curfew)
const OLD = C.at('old');
const FRENCH = C.at('French');
const COVER = C.at('cover');
const FIRE1 = C.at('fire.', 1); // 'cover the fire.' (2 = 'sets the air on fire.')
const HEAR = C.at('hear');
const BANK = C.at('bank');
const OVER = C.at('over.');
const HERES = C.at("Here's");
const WORK1 = C.at('Work', 1); // 'Work stops' (2 = 'hours of work.')
const SUNSET = C.at('sunset.');
const TALLOW = C.at('tallow');
const SHEEP = C.at('sheep');
const SMOKES = C.at('smokes');
const STINKS = C.at('stinks,');
const COSTS = C.at('costs');
const BURN = C.at('burn');
const MOST1 = C.at('most', 1); // 'So most nights' (2 = 'an hour at most.')
const RUSHLIGHT = C.at('rushlight,');
const DRIED = C.at('dried');
const DIPPED = C.at('dipped');
const DEPENDING = C.at('Depending');
const LASTS = C.at('lasts');
const FEW = C.at('few');
const HOUR1 = C.at('hour', 1); // 'an hour at most' (2 = 'one hour of light', 3 = 'for one hour.')
const BEESWAX = C.at('Beeswax');
const CHURCH2 = C.at('church', 2);
const RICH = C.at('rich.');
const WHAT1 = C.at('What', 1); // 'What does one hour' (2 = 'So what is light')
const LIGHT2 = C.at('light', 2);
const COST = C.at('cost');
const ORDINARY = C.at('ordinary');
const BULBS = C.at("bulb's");
const HOUR3 = C.at('hour.', 3);
const ECONOMIST = C.at('economist,');
const WILLIAM = C.at('William');
const ANCIENT = C.at('ancient');
const BABYLON = C.at('Babylon,');
const FORTY = C.at('forty');
const ONE4 = C.at('one', 4); // 'forty one' (1 'one hour of light', 2 'One ordinary', 3 'for one hour')
const HOURS = C.at('hours');
const EIGHTEEN = C.at('eighteen');
const AMERICA = C.at('America,');
const STILL = C.at('still');
const FIVE = C.at('five.');
const THREE1 = C.at('three', 1); // 'three thousand years' (2 = 'For three hundred years')
const YEARS1 = C.at('years,', 1);
const BARELY = C.at('barely');
const SO2 = C.at('So', 2); // 'So what is light to you?' (1 = 'So most nights')
const YOU7 = C.at('you?', 7); // 'light to you?' (6 = 'cost you?')
const LUXURY = C.at('luxury.');
const CHIP_DOCK = LUXURY + 80;
const MAKE1 = C.at('make', 1); // 'You make it yourself' (2 = 'you make it last')
const MAKE2 = C.at('make', 2);
const LAST = C.at('last.');
const FOR5 = C.at('For', 5); // 'For three hundred years' (1–4 = 'for cover', 'for long', 'for the church', 'for one hour')
const DARK = C.at('dark');
const WINS = C.at('wins.');
const THEN = C.at('Then');
const LONDON = C.at('London');
const SETS = C.at('sets');
const FIRE2 = C.at('fire.', 2);
// each panel holds ≥ 1.5 s after its last reveal (kit `hold`); the DYK card needs `cardOut`
const CARD_OUT = cardOut(OVER, HERES);
const EVE_END = hold(RICH, WHAT1);
const PRICE_END = hold(BARELY, SO2);
const USE_END = hold(LAST, FOR5);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
const LtFlame: React.FC<{ x: number; y: number; h: number; lit: number; f: number }> = ({ x, y, h, lit, f }) => {
  const top = y - h * lit * (0.85 + 0.15 * Math.sin(f / 4 + x));
  return (
    <g opacity={lit}>
      <circle cx={x} cy={y - h * 0.45} r={h * 0.8 * lit} fill={FLAME} opacity={0.18} />
      <path d={`M${x} ${top} Q${x + h * 0.32} ${y - h * 0.35} ${x} ${y} Q${x - h * 0.32} ${y - h * 0.35} ${x} ${top} Z`} fill={FLAME} />
    </g>
  );
};

// a stepped-gable Flemish house front
const gable = (x: number, w: number, h: number, base = 400) => {
  const t = base - h;
  const s = w / 8;
  return `M${x} ${base} L${x} ${t + 60} L${x + s} ${t + 60} L${x + s} ${t + 40} L${x + 2 * s} ${t + 40} L${x + 2 * s} ${t + 20} L${x + 3 * s} ${t + 20} L${x + 3 * s} ${t} L${x + 5 * s} ${t} L${x + 5 * s} ${t + 20} L${x + 6 * s} ${t + 20} L${x + 6 * s} ${t + 40} L${x + 7 * s} ${t + 40} L${x + 7 * s} ${t + 60} L${x + w} ${t + 60} L${x + w} ${base} Z`;
};
const HOUSES = [{ x: 0, w: 130, h: 250 }, { x: 140, w: 110, h: 210 }, { x: 260, w: 150, h: 280 }, { x: 420, w: 120, h: 230 }, { x: 550, w: 140, h: 260 }, { x: 900, w: 120, h: 220 }, { x: 1030, w: 70, h: 180 }];
// the market town at dusk: houses, the church tower; the bell hangs in the belfry and swings
const LtTown: React.FC<{ f: number; bell: number; swing: number }> = ({ f, bell, swing }) => (
  <svg width={1100} height={420} viewBox="0 -60 1100 480" style={{ overflow: 'visible' }}>
    {HOUSES.map((hs, i) => (
      <g key={i}>
        <path d={gable(hs.x, hs.w, hs.h)} fill={i % 2 ? '#2a2026' : '#33262a'} stroke="#4a3a34" strokeWidth={3} />
        <rect x={hs.x + hs.w / 2 - 14} y={400 - hs.h + 90} width={28} height={36} fill="#140f12" />
        <rect x={hs.x + hs.w / 2 - 16} y={340} width={32} height={60} fill="#1a1216" />
      </g>
    ))}
    {/* one small window flame */}
    <rect x={260 + 75 - 14} y={400 - 280 + 90} width={28} height={36} fill={FLAME} opacity={0.35 + 0.15 * Math.sin(f / 5)} />
    {/* the church */}
    <rect x={860} y={220} width={40} height={180} fill="#2a2026" />
    <rect x={720} y={60} width={120} height={340} fill="#3a2c2c" stroke="#4a3a34" strokeWidth={3} />
    <path d="M712 62 L780 -60 L848 62 Z" fill="#2a2026" stroke="#4a3a34" strokeWidth={3} />
    <path d="M750 160 L750 110 Q780 84 810 110 L810 160 Z" fill="#0e0a0c" />
    <g opacity={bell} transform={`rotate(${swing} 780 108)`}>
      <path d="M764 150 Q764 116 780 112 Q796 116 796 150 L802 156 L758 156 Z" fill="#c8a040" stroke="#8a6a20" strokeWidth={2} />
    </g>
    <path d="M760 400 L760 340 Q780 320 800 340 L800 400 Z" fill="#140f12" />
    <line x1={-30} y1={402} x2={1130} y2={402} stroke="#4a3a28" strokeWidth={4} />
  </svg>
);

// the hearth: a fire that a domed lid covers as `cover` goes 0 → 1
const LtHearth: React.FC<{ f: number; cover: number; size?: number }> = ({ f, cover, size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <path d="M8 96 L8 40 Q50 4 92 40 L92 96 Z" fill="#4a3a34" stroke="#2a2020" strokeWidth={3} />
    <path d="M22 96 L22 52 Q50 26 78 52 L78 96 Z" fill="#140c0a" />
    <rect x={28} y={84} width={44} height={8} rx={3} fill="#5a3a22" />
    <LtFlame x={42} y={86} h={26} lit={1 - 0.9 * cover} f={f} />
    <LtFlame x={56} y={86} h={20} lit={1 - 0.9 * cover} f={f + 7} />
    <g transform={`translate(0 ${-40 * (1 - cover)})`} opacity={ease(cover, 0, 0.1)}>
      <path d="M26 88 Q26 54 50 52 Q74 54 74 88 Z" fill="#8a8a90" stroke="#4a4a50" strokeWidth={3} />
      <rect x={46} y={46} width={8} height={8} rx={2} fill="#4a4a50" />
    </g>
  </svg>
);

// a sun going down behind a horizon (p: 0 above → 1 gone)
const LtSunset: React.FC<{ p: number; size?: number }> = ({ p, size = 120 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <defs><clipPath id="lt1500-hz"><rect x={0} y={0} width={100} height={48} /></clipPath></defs>
    <circle cx={50} cy={26 + 34 * p} r={18} fill="#ff9a2a" opacity={1 - 0.5 * p} clipPath="url(#lt1500-hz)" />
    <line x1={0} y1={48} x2={100} y2={48} stroke={DL.warm} strokeWidth={3} />
  </svg>
);

// an ancient clay oil lamp
const LtClayLamp: React.FC<{ f: number; size?: number }> = ({ f, size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
    <path d="M12 70 Q14 52 46 50 Q70 50 84 58 L94 54 Q96 62 88 66 Q76 80 46 80 Q16 80 12 70 Z" fill="#a8683a" stroke="#6a3a1a" strokeWidth={3} />
    <ellipse cx={42} cy={58} rx={10} ry={4} fill="#3a2010" />
    <LtFlame x={92} y={54} h={22} lit={1} f={f} />
  </svg>
);

// the London skyline for the cliffhanger
const LtLondon: React.FC = () => (
  <svg width={560} height={220} viewBox="0 0 560 220">
    <rect x={0} y={140} width={90} height={80} fill="#1e2232" />
    <rect x={100} y={110} width={70} height={110} fill="#252a3c" />
    <path d="M190 220 L190 90 Q240 20 290 90 L290 220 Z" fill="#2c3246" />
    <rect x={232} y={8} width={16} height={40} fill="#2c3246" />
    <rect x={310} y={130} width={110} height={90} fill="#1e2232" />
    <path d="M440 220 L440 70 L456 70 L466 0 L476 70 L492 70 L492 220 Z" fill="#252a3c" />
    <rect x={500} y={150} width={60} height={70} fill="#1e2232" />
  </svg>
);

const CANDLES = 8;

const Lt1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const town = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, DID + 2, DID + 10)); // stays under the card's fade-in so BELL holds
  const dusk = ease(f, GOING - 4, GOING + 40);
  const bellSwing = ease(f, RING - 2, RING + 6) * 16 * Math.sin((f - RING) / 5);
  const cardSwing = ease(f, BELL2 - 2, BELL2 + 6) * 10 * Math.sin((f - BELL2) / 6);
  const evening = pane(f, CARD_OUT, EVE_END);
  const price = pane(f, EVE_END, PRICE_END);
  const useful = pane(f, LUXURY - 2, USE_END);
  const cliff = ease(f, USE_END - 2, USE_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, FOR5 - 8, FOR5)) * ease(f, DOCK - 2, DOCK + 4);
  const burnBar = 0.12 * ease(f, FEW - 2, FEW + 10) + 0.88 * ease(f, HOUR1 - 2, HOUR1 + 24);
  const span = ease(f, THREE1 - 2, YEARS1 + 10);
  const run = ease(f, USE_END, USE_END + 40);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e0e06" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1500" idx={1} label="FLANDERS" dockAt={DOCK} />
        <WakePlace place="a market town in Flanders" at={MARKET} dockAt={DOCK} yearAt={FIFTEEN} />

        {/* the town at dusk: the light goes, the church bell rings */}
        <AbsoluteFill style={{ opacity: town }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0a0c18 0%, #3a1e1a 62%, #8a4a22 80%, #0a0806 100%)', opacity: 0.55 * (1 - 0.8 * dusk) }} />
          <div style={{ position: 'absolute', left: 160, top: 340 }}><LtTown f={f} bell={ease(f, BELL1 - 2, BELL1 + 4)} swing={bellSwing} /></div>
          <div style={{ position: 'absolute', left: 1300, top: 230, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={Math.max(LATE, DOCK + 8)} color={DL.warm} size={32}>LATE AUTUMN</Label>
            <Label at={LIGHT1} color={DL.dim} size={30}>THE LIGHT<OnWord at={GOING}> IS GOING</OnWord></Label>
            <Label at={CHURCH1} color={DL.text} size={30}>THE CHURCH<OnWord at={BELL1}> BELL</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1360, top: 420, opacity: ease(f, BELL1 - 2, BELL1 + 4), transform: `scale(${ease(f, BELL1 - 2, BELL1 + 10, 1.2, 1)})` }}><LightProp kind="bell" size={180} swing={bellSwing} /></div>
        </AbsoluteFill>

        {/* YOUR EVENING: work stops at sunset; tallow, rushlight, beeswax */}
        <AbsoluteFill style={{ opacity: evening }}>
          <div style={{ position: 'absolute', left: 160, top: 200, display: 'flex', alignItems: 'center', gap: 30 }}>
            <Label at={CARD_OUT} color={DL.gold} size={34}>YOUR EVENING</Label>
            <Label at={WORK1} color={DL.text} size={34}>· WORK STOPS<OnWord at={SUNSET}> AT SUNSET</OnWord></Label>
            <div style={{ opacity: ease(f, SUNSET - 2, SUNSET + 4) }}><LtSunset p={ease(f, SUNSET, SUNSET + 40)} /></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 300, width: 480, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <PropTag kind="tallow" at={TALLOW} size={150} />
            <Label at={SHEEP} color={DL.warm} size={28}>SHEEP FAT</Label>
            <Label at={SMOKES} color={DL.dim} size={28}>SMOKES<OnWord at={STINKS}> · STINKS</OnWord></Label>
            <Label at={COSTS} color={DL.red} size={28}>COSTS TOO MUCH<OnWord at={BURN}><br />TO BURN FOR LONG</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 260, width: 520, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <Label at={MOST1} color={DL.gold} size={28}>MOST NIGHTS</Label>
            <PropTag kind="rushlight" at={RUSHLIGHT} size={150} />
            <Label at={DRIED} color={DL.warm} size={28}>A DRIED RUSH<OnWord at={DIPPED}> · DIPPED IN GREASE</OnWord></Label>
            <Label at={DEPENDING} color={DL.sky} size={26}>DEPENDING ON ITS LENGTH, IT LASTS</Label>
            <div style={{ width: 480, height: 18, borderRadius: 9, background: '#2a2220', marginTop: 6, opacity: ease(f, LASTS - 2, LASTS + 4) }}>
              <div style={{ width: 480 * burnBar, height: 18, borderRadius: 9, background: FLAME }} />
            </div>
            <div style={{ width: 480, display: 'flex', justifyContent: 'space-between' }}>
              <Label at={FEW} color={DL.text} size={26}>A FEW MINUTES</Label>
              <Label at={HOUR1} color={DL.text} size={26}>… AN HOUR AT MOST</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1300, top: 300, width: 460, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ filter: `drop-shadow(0 0 ${18 * ease(f, BEESWAX, BEESWAX + 20)}px ${DL.gold})` }}><PropTag kind="beeswax" at={BEESWAX} size={150} color={DL.gold} /></div>
            <Label at={CHURCH2} color={DL.text} size={28}>FOR THE CHURCH</Label>
            <Label at={RICH} color={DL.gold} size={28}>& THE RICH</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 840, width: 1600 }}><Source at={LASTS}>tallow = animal fat · a 12-inch rush ≈ 10–15 min, long ones up to ≈ 1 h (Gilbert White) · Johnston Collection<OnWord at={BEESWAX}> · beeswax cost several times more</OnWord></Source></div>
        </AbsoluteFill>

        {/* THE PRICE OF ONE HOUR OF LIGHT (Nordhaus) */}
        <AbsoluteFill style={{ opacity: price }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={EVE_END} color={DL.gold} size={38}>WHAT DOES ONE HOUR<OnWord at={LIGHT2}> OF LIGHT</OnWord><OnWord at={COST}> COST YOU?</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 270, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ opacity: ease(f, BULBS - 2, BULBS + 4) }}><LightProp kind="bulb" size={100} lit={0.8 + 0.2 * Math.sin(f / 8)} /></div>
            <Label at={ORDINARY} color={DL.text} size={30}>= 1 ORDINARY<OnWord at={BULBS}> BULB</OnWord><OnWord at={HOUR3}> · FOR 1 HOUR</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 290 }}><Label at={ECONOMIST} color={DL.dim} size={30}>AN ECONOMIST<OnWord at={WILLIAM}> · WILLIAM NORDHAUS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 420, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, ANCIENT - 2, ANCIENT + 6) }}><LtClayLamp f={f} size={130} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label at={ANCIENT} color={DL.warm} size={30}>ANCIENT<OnWord at={BABYLON}> BABYLON</OnWord></Label>
              <div style={{ opacity: ease(f, FORTY - 2, FORTY + 4) }}>
                <CountUp to={41} a={FORTY} b={ONE4 + 6} prefix="≈ " style={{ fontFamily: DL_SERIF, fontSize: 130, lineHeight: 1, color: DL.gold }} />
              </div>
              <Label at={HOURS} color={DL.text} size={28}>HOURS OF WORK</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 900, top: 420, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, EIGHTEEN - 2, EIGHTEEN + 6) }}><LightProp kind="tallow" size={130} f={f} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Label at={EIGHTEEN} color={DL.warm} size={30}>1800<OnWord at={AMERICA}> · AMERICA</OnWord></Label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <Label at={STILL} color={DL.dim} size={28}>STILL</Label>
                <span style={{ fontFamily: DL_SERIF, fontSize: 130, lineHeight: 1, color: DL.gold, opacity: ease(f, FIVE - 2, FIVE + 4), transform: `scale(${ease(f, FIVE - 2, FIVE + 10, 1.2, 1)})`, display: 'inline-block' }}>&gt; 5</span>
              </div>
              <Label at={FIVE} color={DL.text} size={28}>HOURS OF WORK</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 690, width: 1000, opacity: ease(f, THREE1 - 2, THREE1 + 4) }}>
            <div style={{ position: 'relative', height: 14, borderRadius: 7, background: '#2a2220' }}>
              <div style={{ width: 1000 * span, height: 14, borderRadius: 7, background: DL.warm }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>
              <span>BABYLON</span><span style={{ color: DL.text }}>3,000+ YEARS</span><span>1800</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1200, top: 672 }}><StampText text="THE PRICE BARELY MOVED" at={BARELY} color={DL.red} size={26} tilt={-4} /></div>
          <div style={{ position: 'absolute', left: 160, top: 820, width: 1600 }}><Source at={WILLIAM}>Nordhaus 1997, table 1.4 · work hours per 1,000 lumen-hours (≈ one ordinary bulb for an hour) · US wages</Source></div>
        </AbsoluteFill>

        {/* "So what is light to you?" — A luxury. You make it yourself, and you make it last. */}
        <AskMark at={PRICE_END} out={LUXURY + 2} left={760} top={250} pulseAt={YOU7} />
        <AbsoluteFill style={{ opacity: useful }}>
          <div style={{ position: 'absolute', left: 260, top: 240, opacity: ease(f, LUXURY - 2, LUXURY + 6), filter: `drop-shadow(0 0 ${20 + 8 * Math.sin(f / 7)}px ${FLAME}66)` }}><LightProp kind="rushlight" size={300} f={f} /></div>
          <div style={{ position: 'absolute', left: 640, top: 290, width: 700, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.gold, opacity: ease(f, MAKE1 - 2, MAKE1 + 4) }}>you make it yourself,</div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.text, opacity: ease(f, MAKE2 - 2, MAKE2 + 4) }}>and you make it <OnWord at={LAST}>last</OnWord></div>
          </div>
        </AbsoluteFill>
        <LightChip text={LIGHT_ARC[0].chip} at={LUXURY} dockAt={CHIP_DOCK} slot={0} left={260} top={720} />

        {/* cliffhanger: three hundred years of dark, then London sets the air on fire */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={USE_END} color={DL.gold} size={36}>FOR 300 YEARS<OnWord at={DARK}> · <span style={{ color: DL.red }}>THE DARK</span></OnWord><OnWord at={WINS}> WINS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300, width: 900, height: 260 }}>
            {Array.from({ length: CANDLES }, (_, i) => {
              const out = ease(f, DARK + i * 3, DARK + i * 3 + 10);
              return (
                <div key={i} style={{ position: 'absolute', left: i * 112, top: 30 }}>
                  <LightProp kind="tallow" size={90} f={f + i * 5} lit={1 - out} dim={0.6 * out} />
                </div>
              );
            })}
            <div style={{ position: 'absolute', left: 0, top: 160, width: 880, height: 10, borderRadius: 5, background: '#2a2220' }} />
            <div style={{ position: 'absolute', left: 0, top: 160, width: 880 * run, height: 10, borderRadius: 5, background: DL.warm }} />
            <div style={{ position: 'absolute', left: -6, top: 186, fontFamily: DL_MONO, fontSize: 30, color: DL.gold }}>1500</div>
            <div style={{ position: 'absolute', right: 14, top: 186, fontFamily: DL_MONO, fontSize: 30, color: DL.warm, opacity: ease(f, USE_END + 30, USE_END + 40) }}>1800</div>
          </div>
          <div style={{ position: 'absolute', left: 1160, top: 340, opacity: ease(f, LONDON - 2, LONDON + 6) }}>
            <Label at={LONDON} color={DL.sky} size={32}>LONDON</Label>
            <div style={{ position: 'relative', marginTop: 16 }}>
              <LtLondon />
              <svg width={200} height={200} viewBox="0 0 100 100" style={{ position: 'absolute', left: 300, top: -120, overflow: 'visible', opacity: ease(f, FIRE2 - 2, FIRE2 + 6) }}>
                <LtFlame x={50} y={80} h={50 * ease(f, FIRE2 - 2, FIRE2 + 12)} lit={1} f={f} />
              </svg>
            </div>
          </div>
        </AbsoluteFill>

        <PriceStrip items={[{ ...PRICE_PAST[0], at: FORTY }, { ...PRICE_PAST[1], at: FIVE }]} show={strip} />
        <LightLadder rungs={[{ year: '1500', label: LIGHT_ARC[0].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_OUT}>
          <OnWord at={THIS}>this bell </OnWord><OnWord at={NAME1}>has a name, </OnWord><OnWord at={AND2}>and the name is </OnWord><span style={{ opacity: ease(f, CURFEW - 2, CURFEW + 4), color: '#ffd23f', fontStyle: 'italic', backgroundImage: 'linear-gradient(#ffd23f, #ffd23f)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom', backgroundSize: `${100 * ease(f, COMES - 2, COMES + 14)}% 4px` }}>curfew?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ opacity: ease(f, BELL2 - 2, BELL2 + 4) }}><LightProp kind="bell" size={130} swing={cardSwing} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: DL_MONO, fontSize: 32 }}>
              <span><span style={{ opacity: ease(f, OLD - 2, OLD + 4), color: '#c8cdf0' }}>FROM OLD</span><span style={{ opacity: ease(f, FRENCH - 2, FRENCH + 4), color: '#c8cdf0' }}> FRENCH:</span><span style={{ opacity: ease(f, COVER - 2, COVER + 4), color: '#ff9a1f' }}> COVER THE FIRE</span></span>
              <span><span style={{ opacity: ease(f, HEAR - 2, HEAR + 4), color: '#ffffff' }}>WHEN YOU HEAR IT,</span><span style={{ opacity: ease(f, BANK - 2, BANK + 4), color: '#ffd23f' }}> BANK THE HEARTH</span></span>
              <span style={{ opacity: ease(f, OVER - 2, OVER + 4), color: '#ff4d4d' }}>THE DAY IS OVER</span>
            </div>
            <div style={{ opacity: ease(f, COVER - 2, COVER + 4) }}><LtHearth f={f} cover={ease(f, BANK, BANK + 20)} size={130} /></div>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, FIRE1 - 2, FIRE1 + 4) }}>Old French covrefeu · Merriam-Webster · Etymonline</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1807" parts={[{ text: 'For three hundred years,', at: FOR5 }, { text: 'the dark wins.', at: DARK }, { text: 'Then a man in London', at: THEN }, { text: 'sets the air on fire.', at: SETS }]} />
      <EpisodeHud year={1500} episode="07" />
    </AbsoluteFill>
  );
};
export default Lt1500;
