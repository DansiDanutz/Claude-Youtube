import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, LIGHT_ARC, lightRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  LightProp, PriceStrip, priceUpTo, hold, pane, cardOut, FLAME,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 6/14 — ERA 2: 1807, Pall Mall, London (RESEARCH L5, L6). Header + "Pall Mall, in London" on its words (the
// place line never says gas); A WARM JUNE EVENING, a crowd on "crowd", a row of unlit iron posts on "row". DYK (L5): the
// first gas lights on a London street (the card's posts light on "lit") for the king's birthday (a crown on "king's",
// 4 JUNE 1807 · GEORGE III); FREDERICK WINSOR · GERMAN-BORN BUSINESSMAN; BURNS GAS · MADE FROM COAL; a pipe flows on
// "piped"; NO WICK. NO WAX. stamps on their words. YOUR EVENING: the posts burn along the street; shop windows glow on
// "open", AFTER DARK; MILL OWNERS · SOMETHING NEW; a factory on "factory" whose windows stay lit while the sun sets on
// "sunset". 1812 (L6): FIVE YEARS LATER · 1812, PARLIAMENT GRANTS A CHARTER (a sealed scroll on "charter"), THE GAS LIGHT
// AND COKE COMPANY, THE FIRST GAS COMPANY · IN THE WORLD; the cross-section: gas runs under the street on "runs"/"under",
// to a door on "door", a bill on "bill". No price is spoken: the strip carries BABYLON + 1800. "So what is light now?"
// = "?"; A SERVICE chip on "service." (slot 1, docks), a pipe feeding a lamp on "comes"/"pipe". Cliffhanger: the ocean
// on "ocean", AMERICA, THE BEST LIGHT · STILL COMES FROM…, a whale on "whale."; NEXT ▸ 1859. VO lt05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt1807', durationInSeconds: 56.9333, fps: 30, width: 1920, height: 1080 };
const DUR = 1708;

const C = makeCue(vo, 'lt05-1807', 0.8);
const EIGHTEEN1 = C.at('eighteen', 1); // 'eighteen oh seven' (2 = 'eighteen twelve')
const PALL = C.at('Pall');
const LONDON1 = C.at('London.', 1); // 'in London.' (2 = 'a London street')
const DOCK = LONDON1 + 24;
const WARM = C.at('warm');
const JUNE = C.at('June');
const CROWD = C.at('crowd');
const STARING = C.at('staring');
const ROW = C.at('row'); // the posts land on 'row' so the caption holds 1.5 s before the DYK card covers it
const DID = C.at('Did');
const FIRST1 = C.at('first', 1); // 'the first gas lights' (2 = 'the first gas company')
const LONDON2 = C.at('London', 2);
const LIT = C.at('lit');
const KINGS = C.at("king's");
const BIRTHDAY = C.at('birthday?');
const GERMAN = C.at('German-born');
const FREDERICK = C.at('Frederick');
const BURNS = C.at('burns');
const COAL = C.at('coal,');
const PIPED = C.at('piped');
const WICK = C.at('wick.');
const WAX = C.at('wax.');
const HERES = C.at("Here's");
const SHOPS = C.at('shops');
const OPEN = C.at('open');
const AFTER = C.at('after');
const MILL = C.at('Mill');
const SOMETHING = C.at('something');
const FACTORY = C.at('factory');
const NEVER = C.at('never');
const SUNSET = C.at('sunset.');
const FIVE = C.at('Five');
const TWELVE = C.at('twelve,');
const PARLIAMENT = C.at('Parliament');
const CHARTER = C.at('charter');
const GAS3 = C.at('Gas', 3); // 'the Gas Light and Coke' (1 card, 2 'burns gas', 4 'first gas company')
const COKE = C.at('Coke');
const FIRST2 = C.at('first', 2);
const WORLD = C.at('world.');
const RUNS = C.at('runs');
const UNDER = C.at('under');
const DOOR = C.at('door,');
const ARRIVES = C.at('arrives');
const BILL = C.at('bill.');
const SO = C.at('So');
const NOW = C.at('now?');
const SERVICE = C.at('service.');
const CHIP_DOCK = SERVICE + 80;
const COMES1 = C.at('comes', 1); // 'It comes to you' (2 = 'still comes from')
const THROUGH = C.at('through');
const PIPE = C.at('pipe.');
const BUT = C.at('But');
const OCEAN = C.at('ocean,');
const BEST = C.at('best');
const AMERICA = C.at('America');
const STILL = C.at('still');
const OF2 = C.at('of', 2); // 'of a whale' (1 = 'a row of iron posts')
const WHALE = C.at('whale.');
// each panel holds ≥ 1.5 s after its last reveal (kit `hold`); the DYK card needs `cardOut`
const CARD_OUT = cardOut(WAX, HERES);
const EVE_END = hold(SUNSET, FIVE);
const CHARTER_END = hold(BILL, SO);
const USE_END = hold(PIPE, BUT);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
// Pall Mall: a row of Georgian fronts; `shops` 0–1 lights the ground-floor windows
const LtStreet: React.FC<{ f: number; shops: number; w?: number }> = ({ f, shops, w = 1100 }) => (
  <svg width={w} height={320} viewBox="0 0 1100 320">
    {[0, 1, 2, 3, 4].map((i) => {
      const x = i * 220;
      return (
        <g key={i}>
          <rect x={x + 6} y={20 + (i % 2) * 20} width={208} height={280 - (i % 2) * 20} fill={i % 2 ? '#2a2630' : '#322c36'} stroke="#4a4450" strokeWidth={3} />
          {[0, 1, 2].map((k) => <rect key={k} x={x + 30 + k * 62} y={60 + (i % 2) * 20} width={36} height={56} fill="#15121a" />)}
          <rect x={x + 26} y={200} width={168} height={80} fill="#fff0b0" opacity={0.12 + 0.6 * shops * (0.9 + 0.1 * Math.sin(f / 7 + i))} stroke="#5a5060" strokeWidth={3} />
        </g>
      );
    })}
    <rect x={0} y={300} width={1100} height={20} fill="#3a3640" />
  </svg>
);

// a row of iron posts (gas lamps); lit 0 = cold iron
const LtPosts: React.FC<{ f: number; lit: (i: number) => number; n?: number; gap?: number; size?: number }> = ({ f, lit, n = 5, gap = 200, size = 170 }) => (
  <div style={{ position: 'relative', height: size, width: (n - 1) * gap + size }}>
    {Array.from({ length: n }, (_, i) => {
      const l = lit(i);
      return <div key={i} style={{ position: 'absolute', left: i * gap, top: 0 }}><LightProp kind="gaslamp" size={size} lit={l * (0.9 + 0.1 * Math.sin(f / 5 + i))} f={f} /></div>;
    })}
  </div>
);

const LtCrown: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M14 76 L10 30 L32 52 L50 20 L68 52 L90 30 L86 76 Z" fill="#ffd23f" stroke="#a8801a" strokeWidth={3} />
    <rect x={14} y={76} width={72} height={12} fill="#e0b030" stroke="#a8801a" strokeWidth={3} />
    {[30, 50, 70].map((x) => <circle key={x} cx={x} cy={82} r={4} fill="#c0392b" />)}
  </svg>
);

// a mill with a chimney; windows stay lit, a sun sinks behind it
const LtFactory: React.FC<{ f: number; sun: number; lit: number }> = ({ f, sun, lit }) => (
  <svg width={520} height={300} viewBox="0 0 520 300" style={{ overflow: 'visible' }}>
    <defs><clipPath id="lt1807-sky"><rect x={0} y={-40} width={520} height={330} /></clipPath></defs>
    <circle cx={430} cy={60 + 220 * sun} r={40} fill="#ff9a2a" opacity={1 - 0.6 * sun} clipPath="url(#lt1807-sky)" />
    <rect x={380} y={20} width={40} height={140} fill="#3a3036" />
    {[0, 1, 2].map((k) => <circle key={k} cx={400 + ((f * 0.6 + k * 30) % 90) * 0.4} cy={10 - ((f * 0.8 + k * 30) % 90)} r={14 + k * 4} fill="#6a6470" opacity={0.35} />)}
    <rect x={20} y={120} width={440} height={170} fill="#3a3036" stroke="#5a5058" strokeWidth={3} />
    <path d="M20 120 L90 80 L90 120 L160 80 L160 120 L230 80 L230 120 L300 80 L300 120 L370 80 L370 120 Z" fill="#2c2630" />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={44 + (i % 6) * 70} y={150 + Math.floor(i / 6) * 64} width={36} height={40} fill={FLAME} opacity={lit * (0.6 + 0.3 * Math.sin(f / 9 + i))} />)}
    <line x1={-20} y1={290} x2={540} y2={290} stroke="#4a4450" strokeWidth={4} />
  </svg>
);

// the charter: a scroll with a red seal
const LtCharter: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={18} y={12} width={64} height={76} fill="#efe2c4" stroke="#9a8a6a" strokeWidth={3} />
    <rect x={12} y={6} width={76} height={10} rx={5} fill="#c8b48a" />
    <rect x={12} y={84} width={76} height={10} rx={5} fill="#c8b48a" />
    {[28, 38, 48, 58].map((y) => <line key={y} x1={28} y1={y} x2={72} y2={y} stroke="#9a8a6a" strokeWidth={2} />)}
    <circle cx={62} cy={72} r={9} fill="#b8322a" stroke="#7a1a14" strokeWidth={2} />
  </svg>
);

// the cross-section: a street, a gas main under it, a branch up to a door and its lamp
const LtMain: React.FC<{ f: number; flow: number; branch: number; lamp: number }> = ({ f, flow, branch, lamp }) => (
  <svg width={1000} height={260} viewBox="0 0 1000 260" style={{ overflow: 'visible' }}>
    <rect x={0} y={90} width={1000} height={16} fill="#5a5660" />
    <rect x={0} y={106} width={1000} height={154} fill="#2a1e16" opacity={0.7} />
    <rect x={0} y={170} width={1000 * flow} height={26} rx={6} fill="#5a5a60" stroke="#2a2a30" strokeWidth={3} />
    {Array.from({ length: 10 }, (_, i) => {
      const x = (f * 3 + i * 100) % 1000;
      return x < 1000 * flow ? <circle key={i} cx={x} cy={183} r={5} fill="#c8d8e0" opacity={0.7} /> : null;
    })}
    <rect x={780} y={196 - 150 * branch} width={14} height={150 * branch} fill="#5a5a60" stroke="#2a2a30" strokeWidth={2} />
    <rect x={820} y={-60} width={110} height={150} fill="#4a3428" stroke="#2a1e16" strokeWidth={3} opacity={branch} />
    <circle cx={910} cy={16} r={5} fill="#c8a040" opacity={branch} />
    <circle cx={787} cy={-28} r={34 * lamp} fill={FLAME} opacity={0.25 * lamp} />
    <path d="M770 -10 L804 -10 L798 -44 L776 -44 Z" fill="#fff2c0" opacity={0.15 + 0.75 * lamp} stroke="#2a2a30" strokeWidth={3} />
    <line x1={787} y1={-10} x2={787} y2={90} stroke="#2a2a30" strokeWidth={5} opacity={branch} />
  </svg>
);

// the bill
const LtBill: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M20 6 L80 6 L80 94 L70 88 L60 94 L50 88 L40 94 L30 88 L20 94 Z" fill="#efe2c4" stroke="#9a8a6a" strokeWidth={3} />
    <text x={50} y={30} textAnchor="middle" fontFamily={DL_MONO} fontSize={14} fill="#3a2a1a">BILL</text>
    {[44, 56, 68].map((y) => <line key={y} x1={30} y1={y} x2={70} y2={y} stroke="#9a8a6a" strokeWidth={2} />)}
    <text x={66} y={82} textAnchor="end" fontFamily={DL_MONO} fontSize={14} fill="#b8322a">£ …</text>
  </svg>
);

const LtOcean: React.FC<{ f: number; w?: number }> = ({ f, w = 900 }) => (
  <svg width={w} height={120} viewBox={`0 0 ${w} 120`}>
    {[0, 1, 2].map((k) => {
      const off = (f * (1 + k * 0.4)) % 120;
      const d = `M${off - 120} ${30 + k * 32}` + Array.from({ length: Math.ceil(w / 60) + 2 }, (_, i) => ` q30 ${i % 2 ? 12 : -12} 60 0`).join('');
      return <path key={k} d={d} stroke="#2f6f9f" strokeWidth={4} fill="none" opacity={0.9 - k * 0.25} />;
    })}
  </svg>
);

const Lt1807: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, DID + 2, DID + 10)); // stays under the card's fade-in so A ROW OF POSTS holds
  const evening = pane(f, CARD_OUT, EVE_END);
  const charter = pane(f, EVE_END, CHARTER_END);
  const useful = pane(f, SERVICE - 2, USE_END);
  const cliff = ease(f, USE_END - 2, USE_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, BUT - 8, BUT)) * ease(f, DOCK - 2, DOCK + 4);
  const sun = ease(f, SUNSET - 2, SUNSET + 40);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#120c06" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1807" idx={2} label="LONDON" dockAt={DOCK} />
        <WakePlace place="Pall Mall, London" at={PALL} dockAt={DOCK} yearAt={EIGHTEEN1} />

        {/* Pall Mall on a June evening: a crowd staring at cold iron posts */}
        <AbsoluteFill style={{ opacity: street }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0c1022 0%, #2a2034 60%, #5a3a2a 82%, #0a0806 100%)', opacity: 0.5 }} />
          <div style={{ position: 'absolute', left: 160, top: 360 }}><LtStreet f={f} shops={0} /></div>
          <div style={{ position: 'absolute', left: 200, top: 520, opacity: ease(f, ROW - 2, ROW + 6) }}><LtPosts f={f} lit={() => 0} /></div>
          <div style={{ position: 'absolute', left: 230, top: 700, opacity: ease(f, CROWD - 2, CROWD + 6) }}><PeopleRow n={12} lit={(i) => 0.55 + 0.1 * Math.sin(f / 10 + i)} size={60} gap={16} color={DL.warm} /></div>
          <div style={{ position: 'absolute', left: 1320, top: 240, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={Math.max(WARM, DOCK + 8)} color={DL.warm} size={32}>A WARM<OnWord at={JUNE}> JUNE EVENING</OnWord></Label>
            <Label at={CROWD} color={DL.text} size={30}>A CROWD</Label>
            <Label at={STARING} color={DL.dim} size={30}>STARING AT…<OnWord at={ROW}><br />A ROW OF POSTS</OnWord></Label>
          </div>
        </AbsoluteFill>

        {/* YOUR EVENING: the posts burn, shops stay open, a mill that never stops */}
        <AbsoluteFill style={{ opacity: evening }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={CARD_OUT} color={DL.gold} size={34}>YOUR EVENING</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 270, opacity: ease(f, CARD_OUT - 2, CARD_OUT + 6) }}>
            <div style={{ position: 'relative', width: 800, height: 420 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, transform: 'scale(0.727)', transformOrigin: 'top left' }}><LtStreet f={f} shops={ease(f, OPEN - 2, OPEN + 12)} /></div>
              <div style={{ position: 'absolute', left: 20, top: 160 }}><LtPosts f={f} lit={() => 1} n={4} gap={220} size={150} /></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 700, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={SHOPS} color={DL.text} size={32}>THE SHOPS<OnWord at={OPEN}> STAY OPEN</OnWord></Label>
            <Label at={AFTER} color={DL.gold} size={32}>AFTER DARK</Label>
          </div>
          <div style={{ position: 'absolute', left: 1040, top: 200, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ opacity: ease(f, MILL - 2, MILL + 6) }}><Kid size={90} adult color={DL.warm} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label at={MILL} color={DL.dim} size={30}>MILL OWNERS</Label>
              <Label at={SOMETHING} color={DL.text} size={30}>SEE SOMETHING NEW</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1040, top: 380, opacity: ease(f, FACTORY - 2, FACTORY + 6), transform: `scale(${ease(f, FACTORY - 2, FACTORY + 10, 1.1, 1)})` }}><LtFactory f={f} sun={sun} lit={ease(f, FACTORY, FACTORY + 10)} /></div>
          <div style={{ position: 'absolute', left: 1040, top: 700, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={FACTORY} color={DL.text} size={30}>A FACTORY THAT<OnWord at={NEVER}> NEVER HAS TO</OnWord></Label>
            <Label at={SUNSET} color={DL.gold} size={30}>STOP AT SUNSET</Label>
          </div>
        </AbsoluteFill>

        {/* 1812: the charter; light runs under the street, to your door, with a bill */}
        <AbsoluteFill style={{ opacity: charter }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={EVE_END} color={DL.gold} size={34}>FIVE YEARS LATER<OnWord at={TWELVE}> · 1812</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 270, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, CHARTER - 2, CHARTER + 6), transform: `scale(${ease(f, CHARTER - 2, CHARTER + 10, 1.2, 1)})` }}><LtCharter size={150} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Label at={PARLIAMENT} color={DL.dim} size={30}>PARLIAMENT<OnWord at={CHARTER}> GRANTS A CHARTER</OnWord></Label>
              <Label at={GAS3} color={DL.text} size={32}>THE GAS LIGHT<OnWord at={COKE}> AND COKE COMPANY</OnWord></Label>
              <Label at={FIRST2} color={DL.gold} size={32}>THE FIRST GAS COMPANY<OnWord at={WORLD}> IN THE WORLD</OnWord></Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 300, width: 520 }}><Source at={WORLD}>1812 charter (the year only; the day is unconfirmed) · Museum of London</Source></div>
          <div style={{ position: 'absolute', left: 160, top: 600, opacity: ease(f, RUNS - 2, RUNS + 6) }}>
            <LtMain f={f} flow={ease(f, UNDER - 4, UNDER + 30)} branch={ease(f, DOOR - 4, DOOR + 10)} lamp={ease(f, DOOR + 6, DOOR + 20)} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 480, display: 'flex', gap: 24 }}>
            <Label at={RUNS} color={DL.sky} size={30}>LIGHT RUNS</Label>
            <Label at={UNDER} color={DL.text} size={30}>UNDER THE STREET</Label>
            <Label at={DOOR} color={DL.text} size={30}>· TO YOUR DOOR</Label>
          </div>
          <div style={{ position: 'absolute', left: 1220, top: 520, display: 'flex', alignItems: 'center', gap: 18 }}>
            <Label at={ARRIVES} color={DL.dim} size={28}>AND ARRIVES<br />WITH</Label>
            <div style={{ opacity: ease(f, BILL - 2, BILL + 4), transform: `rotate(${ease(f, BILL - 2, BILL + 10, -14, -4)}deg) scale(${ease(f, BILL - 2, BILL + 10, 1.3, 1)})` }}><LtBill size={150} /></div>
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 700 }}><StampText text="A BILL" at={BILL} color={DL.red} size={34} tilt={-4} /></div>
        </AbsoluteFill>

        {/* "So what is light now?" — A service. It comes to you, through a pipe. */}
        <AskMark at={CHARTER_END} out={SERVICE + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: useful }}>
          <div style={{ position: 'absolute', left: 200, top: 250, opacity: ease(f, SERVICE - 2, SERVICE + 6), display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ marginBottom: 6, opacity: ease(f, THROUGH - 2, THROUGH + 6) }}><LightProp kind="pipe" size={200} f={f} level={1} /></div>
            <LightProp kind="gaslamp" size={260} f={f} lit={0.9 + 0.1 * Math.sin(f / 5)} />
          </div>
          <div style={{ position: 'absolute', left: 700, top: 290, width: 700, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.gold, opacity: ease(f, COMES1 - 2, COMES1 + 4) }}>it comes to you,</div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.text, opacity: ease(f, THROUGH - 2, THROUGH + 4) }}>through <OnWord at={PIPE}>a pipe</OnWord></div>
          </div>
        </AbsoluteFill>
        <LightChip text={LIGHT_ARC[1].chip} at={SERVICE} dockAt={CHIP_DOCK} slot={1} left={260} top={720} />

        {/* cliffhanger: across the ocean, America's best light comes from a whale */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={Math.max(OCEAN, USE_END)} color={DL.sky} size={34}>ACROSS THE OCEAN<OnWord at={AMERICA}> · AMERICA</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 320, opacity: ease(f, Math.max(OCEAN, USE_END) - 2, Math.max(OCEAN, USE_END) + 8) }}><LtOcean f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 470 }}><Label at={BEST} color={DL.gold} size={34}>THE BEST LIGHT<OnWord at={STILL}> STILL COMES FROM…</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 1020, top: 300, opacity: ease(f, WHALE - 2, WHALE + 4), transform: `translateY(${ease(f, WHALE - 2, WHALE + 12, 20, 0) + 4 * Math.sin(f / 10)}px) scale(${ease(f, WHALE - 2, WHALE + 10, 1.2, 1)})` }}><LightProp kind="whale" size={280} /></div>
        </AbsoluteFill>

        <PriceStrip items={priceUpTo(2)} show={strip} hotLast={false} />
        <LightLadder rungs={[...lightRungs(1), { year: '1807', label: LIGHT_ARC[1].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_OUT}>
          <OnWord at={FIRST1}>the first gas lights </OnWord><OnWord at={LONDON2}>on a London street </OnWord><span style={{ opacity: ease(f, LIT - 2, LIT + 4), color: '#ffd23f' }}>were lit </span><span style={{ opacity: ease(f, KINGS - 2, KINGS + 4), color: '#ff9a1f', fontStyle: 'italic' }}>for the king's birthday?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 36 }}>
            <div style={{ opacity: ease(f, LONDON2 - 2, LONDON2 + 4) }}><LtPosts f={f} lit={(i) => ease(f, LIT + i * 4, LIT + i * 4 + 8)} n={3} gap={70} size={110} /></div>
            <div style={{ opacity: ease(f, KINGS - 2, KINGS + 4) }}><LtCrown size={90} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: DL_MONO, fontSize: 30 }}>
              <span><span style={{ opacity: ease(f, GERMAN - 2, GERMAN + 4), color: '#c8cdf0' }}>GERMAN-BORN · </span><span style={{ opacity: ease(f, FREDERICK - 2, FREDERICK + 4), color: '#ffffff' }}>FREDERICK WINSOR</span></span>
              <span><span style={{ opacity: ease(f, BURNS - 2, BURNS + 4), color: '#ffd23f' }}>BURNS GAS</span><span style={{ opacity: ease(f, COAL - 2, COAL + 4), color: '#ffd23f' }}> MADE FROM COAL</span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ opacity: ease(f, PIPED - 2, PIPED + 4), color: '#c8cdf0' }}>PIPED ALONG THE STREET</span>
                <span style={{ opacity: ease(f, PIPED - 2, PIPED + 4) }}><LightProp kind="pipe" size={70} f={f} level={1} /></span>
              </span>
              <span><span style={{ opacity: ease(f, WICK - 2, WICK + 4), color: '#ff4d4d' }}>NO WICK.</span><span style={{ opacity: ease(f, WAX - 2, WAX + 4), color: '#ff4d4d' }}> NO WAX.</span></span>
            </div>
          </div>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, BIRTHDAY - 2, BIRTHDAY + 4) }}>George III's birthday, 4 June 1807 · Museum of London · plaque at 100 Pall Mall</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1859" parts={[{ text: 'But across the ocean,', at: BUT }, { text: 'the best light in America', at: BEST }, { text: 'still comes from the head', at: STILL }, { text: 'of a whale.', at: OF2 }]} />
      <EpisodeHud year={1807} episode="07" />
    </AbsoluteFill>
  );
};
export default Lt1807;
