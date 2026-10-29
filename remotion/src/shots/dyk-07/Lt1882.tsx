import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, lightRungs, LIGHT_ARC, Label, Source, StampText, AskMark, OnWord, Kid,
  PriceStrip, PRICE_PAST, priceUpTo, CountUp, hold, pane, cardOut, LightProp, PropTag, FLAME,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 8/14 — ERA 4: 1882, lower Manhattan (RESEARCH L10, L3). Header + "Lower Manhattan" on its word; a daytime
// street of office blocks (windows dark), MONDAY 4 SEPTEMBER · AFTERNOON, a horse and cart on "Horses", newspapers on
// "newspapers", the cart's wheels bounce on "clatter", cobbles on "street". DYK (L10): when Edison's lights came on he
// wasn't at the power station (a generator, ✗ on "wasn't") — he was in the office (an office block on "office") of the
// banker J. P. Morgan (on "Morgan"). YOUR AFTERNOON: a clock at 3 on "three", AN ENGINEER · PEARL STREET, the switch
// closes on "switch"; A FEW BLOCKS OF OFFICES light up window by window on "light", ≈ 400 LAMPS counts up, NOT ONE HAS A
// FLAME (a struck-out flame on "flame"). THE BULB = THE EASY PART; EDISON SOLD THE REST: generators, copper under the
// street, meters, investors, BET A FORTUNE stamp, each on its word. THE PRICE (L3): 1900 ≈ 13 min of work on "thirteen" +
// the strip pill. "So what is light now?" = "?"; A NETWORK chip on "network." (slot 3, docks); a plug into a system that
// sinks out of sight on "never see". Cliffhanger: the bulb's heat (waves on "heat"), THE FIX · MORE THAN 100 YEARS, ONE
// COLOUR · NOBODY CAN MAKE (a dashed empty swatch with "?" — the colour is never shown before 1993); NEXT ▸ 1993.
// VO lt07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt1882', durationInSeconds: 62.8, fps: 30, width: 1920, height: 1080 };
const DUR = 1884;

const C = makeCue(vo, 'lt07-1882', 0.8);
const EIGHTEEN = C.at('eighteen');
const LOWER = C.at('lower');
const DOCK = LOWER + 59; // the place line needs 1.5 s
const FOURTH = C.at('fourth');
const MONDAY = C.at('Monday');
const AFTERNOON1 = C.at('afternoon.', 1); // 'a Monday afternoon' (2 = "Here's your afternoon")
const HORSES = C.at('Horses,');
const NEWSPAPERS = C.at('newspapers,');
const CLATTER = C.at('clatter');
const STREET1 = C.at('street.', 1); // 'the clatter of the street' (2 = 'Pearl Street', 3 = 'under the street')
const DID = C.at('Did');
const WHEN = C.at('when');
const THOMAS = C.at('Thomas');
const LIGHTS = C.at('lights');
const WASNT = C.at("wasn't");
const POWER1 = C.at('power', 1); // 'the power station' (2 = 'most of its power')
const STATION = C.at('station?');
const HE2 = C.at('He', 2); // 'He was standing' (1 = 'he wasn't')
const OFFICE = C.at('office');
const BANKER = C.at('banker');
const MORGAN = C.at('Morgan.');
const HERES = C.at("Here's");
const THREE = C.at('three');
const ENGINEER = C.at('engineer');
const PEARL = C.at('Pearl');
const CLOSES = C.at('closes');
const SWITCH = C.at('switch.');
const FEW = C.at('few');
const OFFICES = C.at('offices');
const LIGHT1 = C.at('light', 1); // 'offices light up' (2 = 'hour of light', 3 = 'what is light now')
const ABOUT2 = C.at('about', 2); // 'about four hundred lamps' (1 = 'about three', 3 = 'about thirteen')
const LAMPS = C.at('lamps,');
const NOT = C.at('not');
const FLAME_W = C.at('flame.');
const GLOWING = C.at('glowing');
const EASY = C.at('easy');
const EDISON = C.at('Edison');
const SOLD = C.at('sold');
const REST = C.at('rest.');
const GENERATORS = C.at('Generators,');
const COPPER = C.at('copper');
const STREET3 = C.at('street,', 3);
const METERS = C.at('meters,');
const INVESTORS = C.at('investors');
const FORTUNE = C.at('fortune');
const WHAT1 = C.at('What', 1);
const NOW1 = C.at('now?', 1); // 'cost you now?'
const NINETEEN = C.at('nineteen');
const ABOUT3 = C.at('about', 3);
const THIRTEEN = C.at('thirteen');
const MINUTES = C.at('minutes');
const SO = C.at('So');
const NOW2 = C.at('now?', 2); // 'what is light now?' (1 = 'cost you now?')
const NETWORK = C.at('network.');
const CHIP_DOCK = NETWORK + 80;
const PLUG = C.at('plug');
const SYSTEM = C.at('system');
const NEVER = C.at('never');
const SEE = C.at('see.');
const BUT = C.at('But');
const MOST = C.at('most');
const HEAT = C.at('heat.');
const THE11 = C.at('The', 11); // 'The fix takes' — 11th "the" in lt07
const FIX = C.at('fix');
const MORE = C.at('more');
const HUNDRED3 = C.at('hundred', 3); // 'a hundred years' (1 = 'four hundred', 2 = 'nineteen hundred')
const AND3 = C.at('and', 3); // 'and one colour' (1 = 'and not one', 2 = 'and investors')
const COLOUR = C.at('colour');
const NOBODY = C.at('nobody');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(MORGAN, HERES);
const AFT_END = hold(FLAME_W, GLOWING);
const REST_END = hold(FORTUNE, WHAT1);
const PRICE_END = hold(MINUTES, SO);
const NET_END = hold(SEE, BUT);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
// office blocks; each window lights (no flame) once `lit` passes its place in the wave
const Blocks: React.FC<{ f: number; lit: number; w?: number }> = ({ f, lit, w = 1600 }) => {
  const blocks = [[0, 260, 200], [220, 320, 180], [420, 220, 220], [660, 360, 190], [870, 280, 210], [1100, 340, 180], [1300, 240, 220]].filter(([x, , bw]) => x + bw <= w);
  return (
    <svg width={w} height={360} viewBox={`0 0 ${w} 360`}>
      {blocks.map(([x, h, bw], i) => (
        <g key={i}>
          <rect x={x} y={360 - h} width={bw} height={h} fill="#3a3430" stroke="#5a524a" strokeWidth={2} />
          {Array.from({ length: Math.floor((h - 30) / 46) * 3 }, (_, k) => {
            const on = ease(lit * 1.4 - ((i * 7 + k) % 10) / 25, 0, 0.12);
            return <rect key={k} x={x + 20 + (k % 3) * ((bw - 40) / 3)} y={360 - h + 24 + Math.floor(k / 3) * 46} width={(bw - 40) / 3 - 14} height={26} fill={on > 0.02 ? '#fff0c0' : '#1c1a1e'} opacity={on > 0.02 ? 0.55 + 0.4 * on + 0.05 * Math.sin(f / 7 + k) : 1} />;
          })}
        </g>
      ))}
    </svg>
  );
};
// a horse and cart crossing, wheels bouncing from `clatter`
const HorseCart: React.FC<{ f: number; clatter: number }> = ({ f, clatter }) => {
  const bump = clatter * Math.abs(Math.sin(f / 3)) * 5;
  return (
    <svg width={300} height={160} viewBox="0 0 300 160">
      <g transform={`translate(0 ${-bump})`}>
        <path d="M20 70 Q30 40 70 44 L110 44 Q120 20 136 22 L148 40 L136 50 L128 46 L124 76 L116 76 L112 100 L104 100 L104 76 L60 76 L56 100 L48 100 L46 76 Q26 80 20 70 Z" fill="#5a3e24" />
        <rect x={150} y={40} width={130} height={56} rx={6} fill="#6a4a2a" stroke="#3a2614" strokeWidth={3} />
        <line x1={136} y1={60} x2={150} y2={64} stroke="#3a2614" strokeWidth={4} />
      </g>
      {[180, 250].map((x) => <g key={x} transform={`rotate(${f * 8} ${x} 118)`}><circle cx={x} cy={118} r={24} fill="none" stroke="#2a1e12" strokeWidth={6} /><line x1={x - 24} y1={118} x2={x + 24} y2={118} stroke="#2a1e12" strokeWidth={3} /><line x1={x} y1={94} x2={x} y2={142} stroke="#2a1e12" strokeWidth={3} /></g>)}
      {clatter > 0.05 && [0, 1, 2].map((k) => <line key={k} x1={150 - k * 18} y1={150} x2={140 - k * 18} y2={140} stroke={DL.dim} strokeWidth={3} opacity={clatter * (0.4 + 0.4 * Math.sin(f / 2 + k))} />)}
    </svg>
  );
};
// a folded newspaper
const Paper: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80"><rect x={4} y={4} width={92} height={72} rx={3} fill="#e8e0cc" stroke="#9a9080" strokeWidth={2} /><rect x={12} y={12} width={76} height={10} fill="#3a3430" />{[30, 40, 50, 60].map((y) => <line key={y} x1={12} y1={y} x2={88} y2={y} stroke="#9a9080" strokeWidth={3} />)}</svg>
);
// cobbles along the street
const Cobbles: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={60} viewBox={`0 0 ${w} 60`}><rect x={0} y={0} width={w} height={60} fill="#2a2622" />{Array.from({ length: Math.floor(w / 40) * 2 }, (_, k) => <rect key={k} x={(k % Math.floor(w / 40)) * 40 + (k >= w / 40 ? 20 : 0)} y={k >= w / 40 ? 32 : 6} width={34} height={22} rx={6} fill="#4a443e" />)}</svg>
);
// a clock face, hands at three
const Clock: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><circle cx={50} cy={50} r={44} fill="#efe2c4" stroke="#6a5a48" strokeWidth={5} />{Array.from({ length: 12 }, (_, k) => <line key={k} x1={50} y1={10} x2={50} y2={16} stroke="#3a3430" strokeWidth={3} transform={`rotate(${k * 30} 50 50)`} />)}<line x1={50} y1={50} x2={50} y2={18} stroke="#1a1a1a" strokeWidth={4} strokeLinecap="round" /><line x1={50} y1={50} x2={74} y2={50} stroke="#1a1a1a" strokeWidth={6} strokeLinecap="round" /></svg>
);
// an office building (the banker's office)
const OfficeBlock: React.FC<{ size?: number; lit?: number }> = ({ size = 120, lit = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M10 30 L50 8 L90 30 Z" fill="#8a8478" /><rect x={14} y={30} width={72} height={64} fill="#6a6458" stroke="#3a3430" strokeWidth={3} />{[24, 42, 60].map((x) => <rect key={x} x={x} y={40} width={10} height={44} fill={lit > 0.02 ? '#fff0c0' : '#3a3430'} opacity={lit > 0.02 ? 0.5 + 0.5 * lit : 1} />)}<rect x={72} y={60} width={8} height={34} fill="#2a2420" /></svg>
);
// a flame with a red strike through it
const NoFlame: React.FC<{ f: number; strike: number; size?: number }> = ({ f, strike, size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d={`M50 ${14 + 3 * Math.sin(f / 4)} Q74 50 50 88 Q26 50 50 ${14 + 3 * Math.sin(f / 4)} Z`} fill={FLAME} opacity={0.85} />
    <line x1={14} y1={86} x2={14 + 72 * strike} y2={86 - 72 * strike} stroke={DL.red} strokeWidth={9} strokeLinecap="round" />
    <circle cx={50} cy={50} r={44} fill="none" stroke={DL.red} strokeWidth={6} opacity={strike} />
  </svg>
);
// copper cable laid under a strip of street (the cable from `copper`, the street on top from `street`)
const CopperStreet: React.FC<{ f: number; copper: number; street: number }> = ({ f, copper, street }) => (
  <svg width={220} height={140} viewBox="0 0 220 140">
    <rect x={0} y={20} width={220} height={30} fill="#3a3632" opacity={street} />
    <rect x={0} y={50} width={220} height={80} fill="#2a1e12" opacity={0.3 + 0.7 * street} />
    <rect x={0} y={84} width={220 * copper} height={14} rx={7} fill="#b87333" stroke="#7a4a1a" strokeWidth={2} />
    {copper > 0.9 && <circle cx={(f * 4) % 220} cy={91} r={5} fill="#ffe0a0" opacity={0.8} />}
  </svg>
);
// an investor: a figure with a money bag
const Investor: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: 'relative' }}>
    <Kid size={70} adult color={color} />
    <svg width={44} height={44} viewBox="0 0 100 100" style={{ position: 'absolute', left: 52, top: 60 }}><path d="M36 20 L64 20 L58 34 Q90 50 84 80 Q78 96 50 96 Q22 96 16 80 Q10 50 42 34 Z" fill={DL.gold} stroke="#8a6a20" strokeWidth={4} /><text x={50} y={78} textAnchor="middle" fontFamily={DL_MONO} fontSize={40} fill="#5a4210">$</text></svg>
  </div>
);
// the network: a generator feeding lines to buildings, a pulse flowing; `hide` sinks it out of sight
const Network: React.FC<{ f: number; show: number; hide: number }> = ({ f, show, hide }) => {
  const nodes = [[540, 60], [680, 150], [540, 250], [800, 60], [800, 250]];
  return (
    <svg width={980} height={320} viewBox="0 0 980 320" style={{ overflow: 'visible' }}>
      <g opacity={show * (1 - 0.7 * hide)}>
        {nodes.map(([x, y], i) => <line key={`l${i}`} x1={160} y1={160} x2={x} y2={y} stroke="#b87333" strokeWidth={5} />)}
        {nodes.map(([x, y], i) => { const t = ((f * 0.02 + i * 0.2) % 1); return <circle key={`p${i}`} cx={160 + (x - 160) * t} cy={160 + (y - 160) * t} r={7} fill="#ffe0a0" />; })}
        {nodes.map(([x, y], i) => <rect key={`n${i}`} x={x - 26} y={y - 26} width={52} height={52} rx={6} fill="#3a3430" stroke="#fff0c0" strokeWidth={3} />)}
      </g>
      <rect x={0} y={0} width={980} height={320} fill="#0e0b0a" opacity={0.85 * hide} />
    </svg>
  );
};
// a wall socket and plug
const Plug: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><rect x={8} y={20} width={44} height={60} rx={8} fill="#e8e4d8" stroke="#9a9080" strokeWidth={3} /><rect x={22} y={36} width={5} height={14} fill="#3a3430" /><rect x={33} y={36} width={5} height={14} fill="#3a3430" /><rect x={56} y={34} width={24} height={30} rx={4} fill="#3a3430" /><path d="M80 49 Q96 49 96 70 L96 96" stroke="#3a3430" strokeWidth={6} fill="none" /><rect x={48} y={38} width={10} height={5} fill="#9aa0a8" /><rect x={48} y={54} width={10} height={5} fill="#9aa0a8" /></svg>
);
// heat waves rising off the bulb
const HeatWaves: React.FC<{ f: number; on: number }> = ({ f, on }) => (
  <svg width={200} height={140} viewBox="0 0 200 140">{[0, 1, 2].map((k) => <path key={k} d={`M${50 + k * 50} 140 q-14 -20 0 -40 q14 -20 0 -40 q-14 -20 0 -40`} stroke={DL.red} strokeWidth={5} fill="none" opacity={on * (0.5 + 0.4 * Math.sin(f / 5 + k * 2))} transform={`translate(0 ${-((f * 0.8 + k * 12) % 18)})`} />)}</svg>
);

const Lt1882: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = Math.max(0.35 * ease(f, 0, 12), ease(f, MONDAY - 2, MONDAY + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const afternoon = pane(f, CARD_END, AFT_END);
  const rest = pane(f, AFT_END, REST_END);
  const price = pane(f, REST_END, PRICE_END);
  const net = pane(f, NETWORK - 2, NET_END);
  const cliff = ease(f, NET_END - 2, NET_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, BUT - 6, BUT + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const cartX = ease(f, HORSES - 2, DID - 10, -60, 520);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#14161c" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* lower Manhattan on a Monday afternoon: horses, newspapers, the clatter of the street (behind the header) */}
        <AbsoluteFill style={{ opacity: street }}>
          <div style={{ position: 'absolute', left: 160, top: 420 }}><Blocks f={f} lit={0} /></div>
          <div style={{ position: 'absolute', left: 160, top: 780, opacity: ease(f, STREET1 - 2, STREET1 + 4) }}><Cobbles w={1600} /></div>
          <div style={{ position: 'absolute', left: 160 + cartX, top: 640, opacity: ease(f, HORSES - 2, HORSES + 4) }}><HorseCart f={f} clatter={ease(f, CLATTER - 2, CLATTER + 6)} /></div>
          <div style={{ position: 'absolute', left: 1420, top: 650, display: 'flex', gap: 12, opacity: ease(f, NEWSPAPERS - 2, NEWSPAPERS + 4), transform: `rotate(${2 * Math.sin(f / 12)}deg)` }}><Paper size={110} /><Paper size={90} /></div>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={MONDAY} color={DL.sky} size={32}>MONDAY 4 SEPTEMBER<OnWord at={AFTERNOON1}> · AFTERNOON</OnWord></Label>
            <Label at={HORSES} color={DL.dim} size={28}>HORSES<OnWord at={NEWSPAPERS}> · NEWSPAPERS</OnWord><OnWord at={CLATTER}> · THE CLATTER OF THE STREET</OnWord></Label>
          </div>
        </AbsoluteFill>

        {/* a calendar page on "fourth": SEPT 4 */}
        <div style={{ position: 'absolute', left: 1560, top: 230, width: 150, borderRadius: 10, overflow: 'hidden', border: '2px solid #9a9080', background: '#efe2c4', textAlign: 'center', opacity: ease(f, FOURTH - 2, FOURTH + 4) * (1 - ease(f, DID - 10, DID - 2)), transform: `rotate(${2 * Math.sin(f / 15)}deg)` }}>
          <div style={{ background: DL.red, color: '#fff', fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, padding: '4px 0' }}>SEPT</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1.1, color: '#2a2420' }}>4</div>
        </div>
        <EraHeader year="1882" idx={4} label="MANHATTAN" dockAt={DOCK} />
        <WakePlace place="Lower Manhattan" at={LOWER} dockAt={DOCK} yearAt={EIGHTEEN} />

        {/* YOUR AFTERNOON: three o'clock, Pearl Street, a switch — a few blocks light up with no flame */}
        <AbsoluteFill style={{ opacity: afternoon }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={CARD_END} color={DL.gold} size={34}>YOUR AFTERNOON</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 280, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, THREE - 2, THREE + 4) }}>
            <Clock size={120} />
            <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>≈ 3 p.m.</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 440, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
            <div style={{ opacity: ease(f, ENGINEER - 2, ENGINEER + 4) }}><Kid size={100} adult color={DL.sky} tool="cap" /></div>
            <PropTag kind="switch" at={CLOSES} size={130} lit={ease(f, SWITCH - 2, SWITCH + 2)} name="CLOSES A SWITCH" color={DL.gold} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 660, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={ENGINEER} color={DL.text} size={28}>AN ENGINEER<OnWord at={PEARL}> · PEARL STREET</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 220, opacity: ease(f, FEW - 2, FEW + 4) }}><Label at={FEW} color={DL.dim} size={28}>A FEW BLOCKS<OnWord at={OFFICES}> OF OFFICES</OnWord><OnWord at={LIGHT1}> LIGHT UP</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 700, top: 270, opacity: ease(f, FEW - 2, FEW + 4) }}><Blocks f={f} lit={ease(f, LIGHT1 - 2, LIGHT1 + 30)} w={1060} /></div>
          <div style={{ position: 'absolute', left: 700, top: 660, display: 'flex', alignItems: 'center', gap: 40 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1, color: DL.gold, opacity: ease(f, ABOUT2 - 2, ABOUT2 + 4) }}><CountUp to={400} a={ABOUT2} b={LAMPS + 4} prefix="≈ " /><OnWord at={LAMPS}> lamps</OnWord></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Label at={NOT} color={DL.text} size={28}>NOT ONE<OnWord at={FLAME_W}> HAS A FLAME</OnWord></Label>
              <div style={{ opacity: ease(f, FLAME_W - 2, FLAME_W + 4) }}><NoFlame f={f} strike={ease(f, FLAME_W, FLAME_W + 8)} size={90} /></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 700, top: 800, width: 1060 }}><Source at={LAMPS}>Pearl Street Station, 4 Sept 1882, ~3 p.m. · about 400 lamps on day one · ETHW Milestone</Source></div>
        </AbsoluteFill>

        {/* the bulb was the easy part; Edison sold the rest */}
        <AbsoluteFill style={{ opacity: rest }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', alignItems: 'center', gap: 30 }}>
            <PropTag kind="bulb" at={AFT_END} size={170} f={f} name="THE GLOWING BULB" color={DL.text} />
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.green, opacity: ease(f, EASY - 2, EASY + 4) }}>= the easy part</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 480 }}><Label at={EDISON} color={DL.gold} size={34}>EDISON<OnWord at={SOLD}> SOLD</OnWord><OnWord at={REST}> THE REST:</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', alignItems: 'flex-end', gap: 50 }}>
            <PropTag kind="generator" at={GENERATORS} size={140} f={f} name="GENERATORS" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: ease(f, COPPER - 2, COPPER + 4) }}>
              <CopperStreet f={f} copper={ease(f, COPPER - 2, COPPER + 12)} street={ease(f, STREET3 - 2, STREET3 + 4)} />
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: '#e0a060' }}>COPPER<OnWord at={STREET3}> UNDER THE STREET</OnWord></span>
            </div>
            <PropTag kind="meter" at={METERS} size={140} f={f} name="METERS" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: ease(f, INVESTORS - 2, INVESTORS + 4) }}>
              <div style={{ display: 'flex', gap: 18 }}>{['#7a6a9a', '#5a6a8a', '#8a6a5a'].map((c) => <Investor key={c} color={c} />)}</div>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.text }}>INVESTORS</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 470 }}><StampText text="BET A FORTUNE" at={FORTUNE} color={DL.gold} size={40} tilt={-4} /></div>
        </AbsoluteFill>

        {/* THE PRICE of one hour of light, in work */}
        <AbsoluteFill style={{ opacity: price }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={REST_END} color={DL.gold} size={34}>ONE HOUR OF LIGHT<OnWord at={NOW1}> · WHAT DOES IT COST?</OnWord><OnWord at={NINETEEN}> · 1900</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 1000, top: 300, opacity: ease(f, REST_END - 2, REST_END + 4) }}><LightProp kind="bulb" size={240} f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 320, display: 'flex', flexDirection: 'column', gap: 10, opacity: ease(f, ABOUT3 - 2, ABOUT3 + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={13} a={ABOUT3} b={THIRTEEN + 4} prefix="≈ " /><OnWord at={MINUTES}> min</OnWord></span>
            <Label at={MINUTES} color={DL.text} size={32}>OF WORK</Label>
            <Source at={THIRTEEN}>Nordhaus 1997, table 1.4 · work hours per 1,000 lumen-hours</Source>
          </div>
        </AbsoluteFill>

        {/* "So what is light now?" — a network: you plug into a system you'll never see */}
        <AskMark at={PRICE_END} out={NETWORK + 2} left={760} top={250} pulseAt={NOW2} />
        <AbsoluteFill style={{ opacity: net }}>
          <div style={{ position: 'absolute', left: 260, top: 300 }}><Network f={f} show={ease(f, NETWORK - 2, NETWORK + 8)} hide={ease(f, NEVER - 2, NEVER + 12)} /></div>
          <div style={{ position: 'absolute', left: 300, top: 400, opacity: ease(f, NETWORK - 2, NETWORK + 8) * (1 - 0.7 * ease(f, NEVER - 2, NEVER + 12)) }}><LightProp kind="generator" size={110} f={f} /></div>
          <div style={{ position: 'absolute', left: 1100, top: 380, opacity: ease(f, PLUG - 2, PLUG + 4) }}><Plug size={150} /></div>
          <div style={{ position: 'absolute', left: 260, top: 640 }}><Label at={PLUG} color={DL.text} size={32}>YOU PLUG INTO<OnWord at={SYSTEM}> A SYSTEM</OnWord><OnWord at={NEVER}> YOU'LL NEVER SEE</OnWord></Label></div>
        </AbsoluteFill>
        <LightChip text={LIGHT_ARC[3].chip} at={NETWORK} dockAt={CHIP_DOCK} slot={3} left={260} top={720} />

        {/* cliffhanger: the bulb's power goes to heat; the fix takes more than a hundred years — and one colour */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 300 }}><LightProp kind="bulb" size={200} f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 180 }}><HeatWaves f={f} on={ease(f, HEAT - 2, HEAT + 6)} /></div>
          <div style={{ position: 'absolute', left: 400, top: 330, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={MOST} color={DL.text} size={30}>MOST OF ITS POWER</Label>
            <span style={{ fontFamily: DL_SERIF, fontSize: 72, color: DL.red, opacity: ease(f, HEAT - 2, HEAT + 4) }}>→ heat</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', alignItems: 'baseline', gap: 26 }}>
            <Label at={FIX} color={DL.gold} size={32}>THE FIX</Label>
            <span style={{ fontFamily: DL_SERIF, fontSize: 72, color: DL.gold }}><OnWord at={MORE}>more than </OnWord><OnWord at={HUNDRED3}>100 years</OnWord></span>
          </div>
          <div style={{ position: 'absolute', left: 790, top: 310, display: 'flex', alignItems: 'center', gap: 24, opacity: ease(f, COLOUR - 2, COLOUR + 4) }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg width={120} height={120} viewBox="0 0 150 150"><circle cx={75} cy={75} r={66} fill="#16141a" stroke={DL.dim} strokeWidth={5} strokeDasharray="14 10" transform={`rotate(${f * 0.6} 75 75)`} /></svg>
              <span style={{ position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 76, color: DL.text }}>?</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Label at={COLOUR} color={DL.text} size={28}>ONE COLOUR</Label>
              <Label at={NOBODY} color={DL.red} size={28}>NOBODY CAN MAKE</Label>
            </div>
          </div>
        </AbsoluteFill>

        <PriceStrip items={[...priceUpTo(3), { ...PRICE_PAST[3], at: THIRTEEN }]} show={strip} />
        <LightLadder rungs={[...lightRungs(3), { year: '1882', label: LIGHT_ARC[3].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={WHEN}>when </OnWord><span style={{ opacity: ease(f, THOMAS - 2, THOMAS + 4), color: '#ffd23f' }}>Thomas Edison's </span><OnWord at={LIGHTS}>lights came on, </OnWord>
          <span style={{ opacity: ease(f, WASNT - 2, WASNT + 4), color: '#ff4d4d' }}>he wasn't </span><OnWord at={POWER1}>at the power station?</OnWord>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ position: 'relative', opacity: ease(f, POWER1 - 2, POWER1 + 4) }}>
              <LightProp kind="generator" size={110} f={f} dim={0.5} />
              <span style={{ position: 'absolute', left: 30, top: 0, fontFamily: DL_SERIF, fontSize: 90, color: '#ff4d4d', opacity: ease(f, STATION - 2, STATION + 4) }}>✗</span>
            </div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: '#5ad08a', opacity: ease(f, HE2 - 2, HE2 + 4) }}>→</span>
            <div style={{ opacity: ease(f, OFFICE - 2, OFFICE + 4) }}><OfficeBlock size={110} lit={ease(f, HERES - 2, HERES + 8)} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ffffff', opacity: ease(f, OFFICE - 2, OFFICE + 4) }}>THE OFFICE OF<OnWord at={BANKER}> THE BANKER</OnWord></span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 50, color: '#ffd23f', opacity: ease(f, MORGAN - 2, MORGAN + 4) }}>J. P. Morgan</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, MORGAN - 2, MORGAN + 4) }}>4 Sept 1882 · Edison was at Drexel, Morgan & Co. · ETHW Milestone "Pearl Street Station"</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1993" parts={[{ text: 'But that bulb turns most of its power into heat.', at: BUT }, { text: 'The fix takes more than a hundred years,', at: THE11 }, { text: 'and one colour nobody can make.', at: AND3 }]} />
      <EpisodeHud year={1882} episode="07" />
    </AbsoluteFill>
  );
};
export default Lt1882;
