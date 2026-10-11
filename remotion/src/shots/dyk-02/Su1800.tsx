import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, Spectrum, WakePlace, win, SUN, CardSource, HowWeSawIt, ArcLadder, pastRungs, SunCliffhanger } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 8/14 — ERA 4: 1800, Slough (RESEARCH F6, F6b, F7, F7b). VO su07 @0.8 s.
// Place line on "Windsor", frost + FEB 1800 on "February", header docks on "astronomer" and the
// past rungs (3) show until the DYK card. Herschel title on "Herschel"; the white beam fans on
// "splits", the prism glints on "prism"; three thermometers slide into the colours one per 12
// frames from "thermometers"; bulbs go black on "blackened". DYK card clause by clause, source on
// "past". After the card the red thermometer moves just past the red on "He'd" and climbs on
// "infrared"; the beyond-red zone glows on a thermal palette on "Light". Chip TO MEASURE (with a
// thermometer) on "measure," docks on "gas". Gas lamps light on "lamps", push the dark back on
// "push", 1807 · PALL MALL on "London". Becquerel 1839: PARIS, AGE 19, beam on "shines", the
// needle twitches on "Tiny.", the cell glows on "real.". Carrington 1859: flash on "flash",
// telegraph on "Within", sparks on "spark", shocks on "shocks", the Sun reaches the wires on
// "reach", TOUCH chip on "touch". Cliffhanger builds on its words; a loaf on "eating".
// =============================================================================
export const compositionConfig = { id: 'Su1800', durationInSeconds: 59.6667, fps: 30, width: 1920, height: 1080 };
const DUR = 1790;

const C = makeCue(vo, 'su07-1800', 0.8);
const EIGHTEEN1 = C.at('eighteen', 1);
const WINDSOR = C.at('Windsor');
const FEBRUARY = C.at('February');
const ASTRONOMER = C.at('astronomer');
const DOCK = ASTRONOMER - 4;
const HERSCHEL = C.at('Herschel');
const SPLITS = C.at('splits');
const PRISM = C.at('prism');
const SUNBEAM = C.at('sunbeam');
const PUTS = C.at('puts');
const COLOURS = C.at('colours');
const BULBS = C.at('bulbs');
const DID = C.at('Did');
const HOTTEST = C.at('hottest');
const RAINBOW = C.at('rainbow');
const PAST = C.at('past');
const IT1 = C.at('It', 1);
const NOTHING = C.at('nothing');
const HED = C.at("He'd");
const INFRARED = C.at('infrared');
const LIGHT1 = C.at('Light', 1);
const SEE = C.at('see');
const NOW = C.at('Now');
const MEASURE = C.at('measure');
const EYES = C.at('eyes');
const SOON = C.at('Soon');
const GAS = C.at('gas');
const LAMPS = C.at('lamps');
const PUSH = C.at('push');
const NIGHT = C.at('night');
const LONDON = C.at('London');
const THIRTY = C.at('thirty');
const PARIS = C.at('Paris');
const NINETEEN = C.at('nineteen');
const EDMOND = C.at('Edmond');
const SHINES = C.at('shines');
const CELL = C.at('cell');
const ELECTRICITY = C.at('electricity');
const TINY = C.at('Tiny');
const REAL = C.at('real');
const NINE2 = C.at('nine', 2);
const RICHARD = C.at('Richard');
const FLASH = C.at('flash');
const WITHIN = C.at('Within');
const SPARK1 = C.at('spark', 1);
const OPERATORS = C.at('operators');
const SHOCKS = C.at('shocks');
const REACH = C.at('reach');
const TOUCH = C.at('touch');
const TURNING = C.at('Turning');
const SPARK2 = C.at('spark', 2);
const POWER = C.at('power');
const CENTURY = C.at('century');
const BUT2 = C.at('But', 2);
const WED1 = C.at("we'd", 1);
const WHAT = C.at('what');
const EATING = C.at('eating');
const ALONG = C.at('along');
const STEP = 12;

// Spectrum geometry (kit Spectrum: 1120 × 520, prism at 360,290, fan ends at x 1000), placed at SPEC
const SPEC = { left: 260, top: 330 } as const;
const fanY = (i: number) => 290 + ((i - 3) * 44 + 30);
const THERMS = [{ x: 760, y: fanY(5) }, { x: 860, y: fanY(3) }, { x: 960, y: fanY(0) }];

// a clause that fades in starting ON its word (no pre-roll)
const OnW: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  return <span style={{ opacity: ease(f, at, at + 6) }}>{children}</span>;
};

const Thermometer: React.FC<{ x: number; y: number; op: number; slide: number; bulb: number; read: number }> = ({ x, y, op, slide, bulb, read }) => (
  <g transform={`translate(${x} ${y - 96 - slide})`} opacity={op}>
    <rect x={-8} y={0} width={16} height={86} rx={8} fill="#1b1716" stroke={DL.dim} strokeWidth={2} />
    <circle cx={0} cy={94} r={14} fill={bulb > 0.5 ? '#000' : '#c8c8c8'} stroke={DL.dim} strokeWidth={2} />
    <rect x={-4} y={86 - 80 * read} width={8} height={80 * read + 8} fill={DL.red} />
  </g>
);

const ThermoIcon: React.FC = () => (
  <svg width={36} height={84} viewBox="0 0 36 84">
    <rect x={11} y={4} width={14} height={58} rx={7} fill="none" stroke={DL.gold} strokeWidth={3} />
    <circle cx={18} cy={68} r={12} fill={DL.red} stroke={DL.gold} strokeWidth={3} />
    <rect x={15} y={26} width={6} height={40} fill={DL.red} />
  </svg>
);

const GasLamp: React.FC<{ x: number; y: number; h: number; lit: number }> = ({ x, y, h, lit }) => (
  <svg width={120} height={h + 60} viewBox={`0 0 120 ${h + 60}`} style={{ position: 'absolute', left: x - 60, top: y - 30, overflow: 'visible' }}>
    <circle cx={60} cy={50} r={70} fill={SUN.mid} opacity={0.25 * lit} style={{ filter: 'blur(12px)' }} />
    <rect x={56} y={70} width={8} height={h - 10} fill="#2a2220" stroke={DL.faint} strokeWidth={1} />
    <path d="M36 70 L84 70 L74 26 L46 26 Z" fill={lit > 0.1 ? SUN.core : '#1b1716'} opacity={0.35 + 0.65 * lit} stroke={DL.dim} strokeWidth={3} />
    <path d="M42 26 L60 10 L78 26 Z" fill="#2a2220" stroke={DL.dim} strokeWidth={3} />
  </svg>
);

const Loaf: React.FC = () => (
  <svg width={86} height={44} viewBox="0 0 86 44" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 8px' }}>
    <path d="M6 40 Q2 14 24 8 Q43 0 62 8 Q84 14 80 40 Z" fill={SUN.rim} opacity={0.9} />
    <path d="M26 16 l8 10 M42 12 l8 10 M58 16 l8 10" stroke="#5a3b22" strokeWidth={3} strokeLinecap="round" />
  </svg>
);

const Su1800: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const frost = ease(f, FEBRUARY - 2, FEBRUARY + 30) * (1 - ease(f, DID, DID + 8));
  const ladderA = win(f, DOCK + 12, DID - 4, 10, 8);
  // Herschel's bench (before and after the card)
  // the bench stays under the card's fade-in (bulbs visible ≥ 1.5 s), returns only after the card is gone, and
  // leaves before the lamps fade in (no double exposure)
  const bench = win(f, HERSCHEL - 2, DID + 8, 6, 8) + win(f, HED + 14, SOON + 12, 8, 10);
  const spec = ease(f, SPLITS - 4, SPLITS + 4);
  const fan = ease(f, SPLITS, SPLITS + 24, 0, 1, DL_EASE.inOut);
  const glint = ease(f, PRISM - 2, PRISM + 4) * (1 - ease(f, PRISM + 8, PRISM + 28));
  const BLACKEN = BULBS - 8; // ≥ 1.5 s of black bulbs before the card starts (DID − 4)
  const warm = 0.3 * ease(f, BLACKEN, BLACKEN + 36);
  const pulse = (1 + Math.sin(f / 5)) / 2;
  const pastRed = ease(f, HED + 14, HED + 30, 0, 1, DL_EASE.inOut);
  const climb = 0.55 * ease(f, INFRARED - 2, INFRARED + 20) + 0.45 * ease(f, INFRARED + 20, MEASURE + 12, 0, 1, DL_EASE.inOut); // keeps climbing through "Light you can't see. Now…"
  const reads = [warm + 0.05 * climb, warm + 0.15 * climb, warm + 0.62 * climb];
  const thermal = ease(f, LIGHT1 - 2, LIGHT1 + 10);
  const thermalGlow = thermal * (0.6 + 0.4 * pulse);
  // gas lamps, Becquerel, Carrington
  const gas = win(f, SOON + 14, THIRTY + 4, 8, 10); // fades in 6 f before the bench is gone; overlaps the cell's fade-in
  const pushR = ease(f, PUSH - 2, PUSH + 28, 0, 1, DL_EASE.out);
  const cell = win(f, THIRTY + 4, NINE2 - 4, 8, 8);
  const twitch = f >= TINY ? Math.sin((f - TINY) * 1.6) * 8 * (1 - ease(f, TINY, TINY + 24)) : 0;
  const needle = interpolate(f, [ELECTRICITY - 2, ELECTRICITY + 12], [-50, -38], { ...DCLAMP, easing: DL_EASE.out }) + twitch;
  const glow = ease(f, REAL - 2, REAL + 10);
  const carr = ease(f, NINE2 - 4, NINE2 + 4);
  const sunPulse = 1 + 0.025 * Math.sin(f / 9);
  // cliffhanger beats on the band's words: push-in from "Turning", a spark on "spark" grows into a lit bulb on
  // "power", the bulb dims on "century", the stage darkens on "But" and more on "eating" (the band reads alone)
  const push = 1 + 0.03 * ease(f, TURNING, TURNING + 40, 0, 1, DL_EASE.inOut) + 0.04 * ease(f, BUT2, ALONG + 20, 0, 1, DL_EASE.inOut);
  const spark2 = ease(f, SPARK2, SPARK2 + 4) * (1 - ease(f, POWER, POWER + 8));
  const bulbOn = ease(f, POWER, POWER + 10) * (1 - 0.75 * ease(f, CENTURY, CENTURY + 16));
  const dimStage = 0.3 * ease(f, BUT2, BUT2 + 12) + 0.35 * ease(f, EATING, EATING + 12);
  const label = f >= NINE2 ? '1859' : f >= PARIS ? 'PARIS' : f >= LAMPS ? 'LONDON' : 'SLOUGH';
  const flash = ease(f, FLASH, FLASH + 4) * (1 - ease(f, FLASH + 10, FLASH + 40));
  const sparkOn = f >= SPARK1 && f < SPARK1 + 75 ? 1 : 0;
  const jolt = f >= SHOCKS && f < SHOCKS + 12 ? Math.sin((f - SHOCKS) * 2.4) * 6 : 0;
  const reach = ease(f, REACH - 2, REACH + 16, 0, 1, DL_EASE.inOut);
  const ladderB = ease(f, GAS + 6, GAS + 14) * (1 - ease(f, TURNING, TURNING + 10));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e1206" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* February frost on the window edges */}
        <AbsoluteFill style={{ opacity: frost, background: `radial-gradient(ellipse at 50% 50%, transparent 58%, ${DL.sky}2e 100%)` }} />
        <div style={{ position: 'absolute', left: 160, top: 196, display: 'flex', gap: 26, alignItems: 'center', opacity: 1 - ease(f, DID, DID + 8) }}>
          <SunChip text="FEB 1800" at={FEBRUARY} color={DL.sky} size={26} />
          <span style={{ ...rise(f, HERSCHEL - 2), fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>William Herschel</span>
          <span style={{ ...rise(f, HERSCHEL + 6), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>ASTRONOMER</span>
        </div>
        <ArcLadder rungs={pastRungs(3)} show={ladderA} />

        {/* Herschel's bench */}
        <AbsoluteFill style={{ opacity: bench }}>
          <div style={{ position: 'absolute', left: SPEC.left, top: SPEC.top, opacity: spec * (1 - 0.45 * thermal) }}>
            <Spectrum fan={fan} redOp={ease(f, COLOURS - 2, COLOURS + 8)} violetOp={ease(f, COLOURS - 2, COLOURS + 8)} />
          </div>
          <div style={{ position: 'absolute', left: SPEC.left + 360 - 90, top: SPEC.top + 290 - 90, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, #ffffffaa, transparent 65%)', opacity: glint }} />
          <svg width={1120} height={520} viewBox="0 0 1120 520" style={{ position: 'absolute', left: SPEC.left, top: SPEC.top }}>
            <defs>
              <linearGradient id="su18thermal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={DL.redDeep} stopOpacity={0.4} />
                <stop offset="0.6" stopColor={SUN.deep} />
                <stop offset="1" stopColor={DL.red} />
              </linearGradient>
            </defs>
            {/* the beyond-red zone: a thermal palette only, never a rainbow colour */}
            <polygon points={`380,286 1000,${fanY(0) - 66} 1000,${fanY(0) - 22}`} fill="url(#su18thermal)" opacity={0.9 * thermalGlow} style={{ filter: `drop-shadow(0 0 ${8 + 14 * pulse}px ${DL.red})` }} stroke={DL.red} strokeDasharray="6 8" strokeWidth={2} strokeOpacity={thermal} />
            {/* a light pulse runs along the white beam on "sunbeam" */}
            <circle cx={20 + 300 * ease(f, SUNBEAM, SUNBEAM + 14)} cy={252 + 28 * ease(f, SUNBEAM, SUNBEAM + 14)} r={12} fill="#ffffff" opacity={ease(f, SUNBEAM, SUNBEAM + 3) * (1 - ease(f, SUNBEAM + 12, SUNBEAM + 16))} style={{ filter: 'drop-shadow(0 0 12px #fff8e1)' }} />
            <text x={942} y={72} textAnchor="end" fill={SUN.mid} fontFamily={DL_MONO} fontSize={24} letterSpacing={3} opacity={ease(f, NOW, NOW + 8) * (1 - ease(f, MEASURE + 30, MEASURE + 40))}>HOTTEST ▶</text>
            {THERMS.map((t, i) => {
              const at = PUTS + i * STEP;
              const y = i === 2 ? t.y - 46 * pastRed : t.y;
              return <Thermometer key={i} x={t.x} y={y} op={ease(f, at - 2, at + 6)} slide={ease(f, at - 2, at + 10, 40, 0)} bulb={ease(f, BLACKEN, BLACKEN + 6)} read={reads[i]} />;
            })}
          </svg>
          <div style={{ position: 'absolute', left: 1380, top: 300, opacity: ease(f, INFRARED - 2, INFRARED + 8) }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 84, color: DL.red, transform: `scale(${ease(f, INFRARED - 2, INFRARED + 10, 1.3, 1)})`, transformOrigin: 'left center' }}>infrared</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, marginTop: 6, opacity: ease(f, SEE - 2, SEE + 8) }}>LIGHT YOU CAN'T SEE</div>
          </div>
          <svg width={120} height={70} viewBox="0 0 120 70" style={{ position: 'absolute', left: 1390, top: 500, opacity: ease(f, EYES, EYES + 6) }}>
            <path d="M8 35 Q60 -8 112 35 Q60 78 8 35 Z" fill="none" stroke={DL.text} strokeWidth={4} />
            <circle cx={60} cy={35} r={13} fill={DL.text} />
            <line x1={14} y1={62} x2={14 + 92 * ease(f, EYES + 2, EYES + 12)} y2={62 - 54 * ease(f, EYES + 2, EYES + 12)} stroke={DL.red} strokeWidth={6} strokeLinecap="round" />
          </svg>
        </AbsoluteFill>

        {/* gas lamps push back the night */}
        <AbsoluteFill style={{ opacity: gas }}>
          <AbsoluteFill style={{ background: '#03050ccc' }} />
          <div style={{ position: 'absolute', left: 560 - 760 * pushR, top: 560 - 760 * pushR, width: 1520 * pushR, height: 1520 * pushR, borderRadius: '50%', background: `radial-gradient(circle, ${SUN.mid}33, transparent 70%)` }} />
          <div style={{ position: 'absolute', left: 260, right: 520, top: 822, height: 3, background: DL.border }} />
          <GasLamp x={560} y={320} h={500} lit={ease(f, LAMPS - 2, LAMPS + 6)} />
          <GasLamp x={880} y={430} h={390} lit={ease(f, NIGHT - 2, NIGHT + 6)} />
          <GasLamp x={1120} y={500} h={320} lit={ease(f, NIGHT + 4, NIGHT + 12)} />
          <div style={{ position: 'absolute', left: 160, top: 200 }}><SunChip text="1807 · PALL MALL · GAS STREET LAMPS" at={LAMPS} color={SUN.mid} size={26} /></div>
        </AbsoluteFill>

        {/* Becquerel's cell */}
        <AbsoluteFill style={{ opacity: cell }}>
          <div style={{ position: 'absolute', left: 160, top: 210, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SunChip text="1839" at={THIRTY} color={DL.dim} />
            <SunChip text="AGE 19" at={NINETEEN} color={DL.gold} size={34} />
            <div style={{ ...rise(f, EDMOND - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>Edmond Becquerel</div>
            <div style={{ ...rise(f, ELECTRICITY), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: SUN.mid }}>light → electricity</div>
            <div style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
              <span style={{ ...rise(f, TINY - 2), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.dim }}>TINY.</span>
              <span style={{ ...rise(f, REAL - 2), fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: DL.gold }}>BUT REAL.</span>
            </div>
          </div>
          <svg width={620} height={457} viewBox="0 0 760 560" style={{ position: 'absolute', left: 780, top: 330, opacity: ease(f, THIRTY - 4, THIRTY + 4) }}>
            <path d="M0 40 L300 250" stroke="#fff3c4" strokeWidth={22} opacity={0.75 * ease(f, SHINES - 2, SHINES + 8)} strokeLinecap="round" />
            <path d="M260 180 h200 v300 a20 20 0 0 1 -20 20 h-160 a20 20 0 0 1 -20 -20 z" fill="#bfe8ff18" stroke={f >= CELL ? DL.gold : '#d6f0ff'} strokeWidth={4 + 2 * ease(f, CELL - 2, CELL + 6)} />
            <rect x={262} y={320} width={196} height={176} fill={SUN.mid} opacity={0.2 + 0.5 * glow} style={{ filter: glow > 0.05 ? `drop-shadow(0 0 ${24 * glow}px ${SUN.mid})` : undefined }} />
            <rect x={310} y={150} width={14} height={300} fill="#cfd8dc" />
            <rect x={396} y={150} width={14} height={300} fill="#cfd8dc" />
            <path d="M317 150 V90 H600 V170 M403 150 V120 H560 V170" fill="none" stroke={f >= ELECTRICITY ? SUN.mid : DL.dim} strokeWidth={4} />
            <circle cx={580} cy={240} r={80} fill={DL.panel} stroke={DL.gold} strokeWidth={4} />
            <line x1={580} y1={270} x2={580 + Math.sin((needle * Math.PI) / 180) * 64} y2={270 - Math.cos((needle * Math.PI) / 180) * 64} stroke={DL.red} strokeWidth={5} strokeLinecap="round" />
            <text x={580} y={300} textAnchor="middle" fill={DL.muted} fontFamily={DL_MONO} fontSize={20}>VOLTS</text>
            <text x={360} y={548} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={28} letterSpacing={4} opacity={ease(f, CELL - 2, CELL + 8)}>CELL</text>
          </svg>
        </AbsoluteFill>

        {/* Carrington, 1 Sept 1859 */}
        <AbsoluteFill style={{ opacity: carr, transform: `scale(${push})`, transformOrigin: '960px 450px' }}>
          <div style={{ position: 'absolute', left: 380 - 270, top: 400 - 270, transform: `scale(${sunPulse})` }}>
            <SunDisc size={300} id="carrSun" spots={[{ x: 130, y: 150, r: 18 }, { x: 158, y: 168, r: 11 }, { x: 112, y: 176, r: 9 }]} />
            <svg width={540} height={540} style={{ position: 'absolute', left: 0, top: 0 }}>
              <circle cx={252} cy={270} r={20 + 36 * flash} fill="#ffffff" opacity={flash} style={{ filter: 'drop-shadow(0 0 30px #fff)' }} />
            </svg>
          </div>
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
            <path d="M520 360 Q640 300 760 450" fill="none" stroke={SUN.mid} strokeWidth={5 + 2 * pulse} strokeDasharray="10 10" strokeDashoffset={-f * 1.5} opacity={reach * (0.65 + 0.35 * pulse)} />
          </svg>
          <div style={{ position: 'absolute', left: 700, top: 200, width: 700, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...rise(f, RICHARD - 2), fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>Richard Carrington</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="1 SEPT 1859" at={NINE2} color={DL.dim} size={26} />
              <SunChip text="A WHITE FLASH" at={FLASH} color="#ffffff" size={26} />
            </div>
            <svg width={700} height={170} viewBox="0 0 700 170" style={{ opacity: ease(f, WITHIN, WITHIN + 10), transform: `translateX(${jolt}px)` }}>
              {[60, 300, 540].map((x) => <g key={x}><line x1={x} y1={20} x2={x} y2={150} stroke="#5a3b22" strokeWidth={10} /><line x1={x - 40} y1={30} x2={x + 40} y2={30} stroke="#5a3b22" strokeWidth={8} /></g>)}
              <path d="M20 40 Q180 80 300 40 Q420 80 560 40 L610 40" fill="none" stroke={sparkOn || f >= REACH + 10 ? SUN.mid : DL.dim} strokeOpacity={sparkOn ? 1 : f >= REACH + 10 ? 0.45 + 0.55 * pulse : 1} strokeWidth={3} />
              {/* the operator at his key */}
              <g opacity={ease(f, OPERATORS - 2, OPERATORS + 8)}>
                <line x1={610} y1={40} x2={610} y2={118} stroke={DL.dim} strokeWidth={3} />
                <rect x={590} y={118} width={60} height={14} fill="#2a2220" stroke={DL.dim} strokeWidth={2} />
                <circle cx={672} cy={74} r={14} fill={DL.warm} />
                <path d="M656 150 Q658 96 672 92 Q690 96 690 150 Z" fill={DL.warm} />
                <line x1={662} y1={106} x2={640} y2={120} stroke={DL.warm} strokeWidth={6} strokeLinecap="round" />
              </g>
              {sparkOn ? [180, 420, 640].map((x) => <path key={x} d={`M${x} 52 l12 -22 l-4 16 l14 -8 l-12 26`} fill="#ffd23f" stroke="#fff" strokeWidth={2} opacity={0.6 + 0.4 * Math.abs(Math.sin(f / 2))} style={{ filter: 'drop-shadow(0 0 10px #ffd23f)' }} />) : null}
              <text x={300} y={168} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={4}>WITHIN A DAY · TELEGRAPH WIRES</text>
              {/* the spark that would one day become power */}
              <path d="M420 50 l10 -18 l-3 13 l12 -7 l-10 22" fill="#ffd23f" stroke="#fff" strokeWidth={2} opacity={spark2} style={{ filter: 'drop-shadow(0 0 12px #ffd23f)' }} />
              <g opacity={ease(f, POWER - 1, POWER + 6)} transform={`translate(420 ${62 + 6 * ease(f, POWER, POWER + 10)})`}>
                <line x1={0} y1={0} x2={0} y2={18} stroke={DL.dim} strokeWidth={3} />
                <rect x={-8} y={18} width={16} height={10} fill={DL.dim} />
                <circle cx={0} cy={44} r={7 + 11 * ease(f, POWER, POWER + 10)} fill={bulbOn > 0.4 ? SUN.core : '#3a3330'} stroke={SUN.mid} strokeWidth={2} style={{ filter: `drop-shadow(0 0 ${22 * bulbOn}px ${SUN.mid})` }} />
              </g>
            </svg>
            <SunChip text="OPERATORS GET SHOCKS" at={SHOCKS} color={DL.red} size={26} />
            <SunChip text="THE SUN CAN TOUCH OUR MACHINES" at={TOUCH} color={SUN.mid} size={26} />
          </div>
          <AbsoluteFill style={{ background: '#050404', opacity: dimStage }} />
        </AbsoluteFill>

        {/* header above the scenes, so the night overlay never dims it */}
        <EraHeader year="1800" idx={4} label={label} dockAt={DOCK} />
        <WakePlace place="Slough, near Windsor" at={WINDSOR} dockAt={DOCK} yearAt={EIGHTEEN1} />
        <HowWeSawIt text="1800 · TO MEASURE" at={MEASURE + 1} dockAt={GAS} slot={3} icon={<ThermoIcon />} />
        <ArcLadder rungs={[...pastRungs(3), { year: '1800', label: 'TO MEASURE', at: GAS + 10 }]} show={ladderB} />

        <DidYouKnowThat at={DID} out={HED + 6}>
          <OnW at={HOTTEST}>the hottest spot</OnW><OnW at={RAINBOW}> wasn't in the rainbow at all?</OnW> <OnW at={IT1}>It was</OnW> <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, PAST, PAST + 8) }}>just past the red,</span>
          <OnW at={NOTHING}> where nothing was visible.</OnW>
          <CardSource at={PAST}>NASA Space Place · Caltech IPAC — Herschel's 1800 experiment</CardSource>
        </DidYouKnowThat>
      </EraExit>
      {/* outside EraExit: the exit pull-in must not drift the band past the side margin */}
      <SunCliffhanger next="1928" parts={[
          { text: 'Turning', at: TURNING }, { text: 'that spark', at: SPARK2 }, { text: 'into power', at: POWER },
          { text: 'would take another century.', at: CENTURY }, { text: 'But first,', at: BUT2 }, { text: "we'd find out", at: WED1 },
          { text: 'what we\'d been', at: WHAT }, { text: <>eating<Loaf /></>, at: EATING }, { text: 'all along.', at: ALONG },
        ]} />
      <EpisodeHud year={1800} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1800;
