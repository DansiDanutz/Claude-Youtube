import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, Spectrum, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 8/14 — ERA 4: 1800, Slough (RESEARCH F6, F6b, F7, F7b). Herschel's bench: the
// spectrum on "sunbeam", thermometers on "thermometers", bulbs blacken on "black". DYK card:
// "just past the red" on "past". INFRARED on "infrared" — the beyond-red thermometer climbs
// highest. Day Clock with gas-lit evenings from "gas" (Pall Mall 1807 chip). Becquerel's cell:
// 1839 on "thirty", AGE 19 on "nineteen", light on "shines", the meter swings on "electricity".
// Carrington: the white flash on "flash", telegraph sparks on "spark", SHOCKS on "shocks".
// VO su07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1800', durationInSeconds: 51.4333, fps: 30, width: 1920, height: 1080 };
const DUR = 1543;

const C = makeCue(vo, 'su07-1800', 0.8);
const SLOUGH = C.at('Windsor'); // narration: "near Windsor, in England" (TTS said "Slough" as "slow")
const ASTRONOMER = C.at('astronomer');
const DOCK = ASTRONOMER + 4;
const NOTHING = C.at('nothing');
const HERSCHEL = C.at('Herschel');
const SUNBEAM = C.at('sunbeam');
const THERMO = C.at('thermometers');
const BLACK = C.at('blackened');
const DID = C.at('Did');
const PAST = C.at('past');
const HE = C.at('He');
const INFRARED = C.at('infrared');
const EYES = C.at('eyes');
const WITHIN1 = C.at('Within', 1);
const GAS = C.at('gas');
const NIGHT = C.at('night');
const DOWN = C.at('down', 1);
const THIRTY = C.at('thirty');
const NINETEEN = C.at('nineteen');
const SHINES = C.at('shines');
const ELECTRICITY = C.at('electricity');
const AND_IN = C.at('And', 2);
const RICHARD = C.at('Richard');
const FLASH = C.at('flash');
const WITHIN2 = C.at('Within', 2);
const SPARK1 = C.at('spark', 1);
const SHOCKS = C.at('shocks');
const TOUCH = C.at('touch');
const CENTURY = C.at('It', 2); // band starts on "It would take another century"
const SPARK2 = C.at('spark', 2);
const POWER = C.at('power');
const STEP = 12;

const DAY1800 = [
  { from: 23, to: 6, label: 'Sleep', color: '#38bdf8' },
  { from: 6, to: 12, label: 'Work', color: '#71717a' },
  { from: 12, to: 13, label: 'Dinner', color: '#e74c3c' },
  { from: 13, to: 19, label: 'Work', color: '#71717a' },
  { from: 19, to: 23, label: 'Evening — under gas light', color: '#ffc94a' },
];

const Su1800: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const PRISM = C.at('prism');
  const bench = win(f, DOCK + 4, DID - 2) + win(f, HE + 8, WITHIN1, 6);
  const fan = ease(f, SUNBEAM - 2, SUNBEAM + 24, 0, 1, DL_EASE.inOut);
  const heat = ease(f, BLACK, BLACK + 40) * 0.5 + ease(f, HE, INFRARED + 20) * 0.5;
  const dayClock = win(f, WITHIN1 + 2, THIRTY - 4, 6);
  const cell = win(f, THIRTY - 4, AND_IN + 20);
  const carr = ease(f, AND_IN + 20, AND_IN + 26);
  const flash = ease(f, FLASH, FLASH + 4) * (1 - ease(f, FLASH + 10, FLASH + 40));
  const needle = interpolate(f, [ELECTRICITY - 2, ELECTRICITY + 12], [-50, 35], { ...DCLAMP, easing: DL_EASE.out });
  const sparkOn = f >= SPARK1 && f < SPARK1 + 75 ? 1 : 0; // steady sparks for 2.5 s (flicker via opacity)

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e1206" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1800" idx={4} label="SLOUGH" dockAt={DOCK} />
        <WakePlace place="Slough, near Windsor" at={SLOUGH} dockAt={DOCK} yearAt={C.at('eighteen', 1)} />
        {/* Herschel's bench */}
        <AbsoluteFill style={{ opacity: bench }}>
          <div style={{ position: 'absolute', left: 160, top: 210, display: 'flex', gap: 26, alignItems: 'baseline' }}>
            <span style={{ ...rise(f, HERSCHEL - 2), fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>William Herschel</span>
            <span style={{ ...rise(f, HERSCHEL + 6), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>ASTRONOMER · FEB 1800</span>
          </div>
          <div style={{ position: 'absolute', left: 300, top: 320, opacity: ease(f, PRISM - 4, PRISM + 6) }}>
            <Spectrum fan={fan} bulbs={ease(f, BLACK - 2, BLACK + 8)} thermo={ease(f, THERMO - 2, THERMO + 8)} heat={heat} beyond={ease(f, INFRARED - 2, INFRARED + 10)} redOp={ease(f, SUNBEAM + 20, SUNBEAM + 30)} violetOp={ease(f, SUNBEAM + 20, SUNBEAM + 30)} />
          </div>
          <div style={{ position: 'absolute', left: 1420, top: 340, opacity: ease(f, INFRARED - 2, INFRARED + 8) }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 96, color: DL.red, transform: `scale(${ease(f, INFRARED - 2, INFRARED + 10, 1.3, 1)})`, transformOrigin: 'left center' }}>infrared</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, marginTop: 6 }}>HOTTEST · AND INVISIBLE</div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 770 }}><SunChip text="MORE THAN OUR EYES CAN CATCH" at={EYES} color={SUN.mid} size={26} /></div>
        </AbsoluteFill>


        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', opacity: dayClock }}>
          <DayClock year="1800s" segs={DAY1800} at={WITHIN1 + 6} step={STEP} hotSeq={[[4, NIGHT], [4, DOWN]]} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', opacity: dayClock }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <SunChip text="1807 · PALL MALL · GAS STREET LAMPS" at={GAS} color={SUN.mid} size={26} />
            <SunChip text="NO NEED TO STOP" at={C.at('stop')} color={DL.dim} size={26} />
            <SunChip text="AT SUNSET" at={DOWN} color={DL.dim} size={26} />
          </div>
        </div>

        {/* Becquerel's cell */}
        <AbsoluteFill style={{ opacity: cell }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SunChip text="1839 · PARIS" at={THIRTY} color={DL.dim} />
            <div style={{ ...rise(f, NINETEEN - 2), fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>Edmond Becquerel</div>
            <SunChip text="AGE 19" at={NINETEEN} color={DL.gold} size={34} />
            <div style={{ ...rise(f, ELECTRICITY), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: SUN.mid }}>light → electricity</div>
          </div>
          <svg width={760} height={560} viewBox="0 0 760 560" style={{ position: 'absolute', left: 1000, top: 230 }}>
            {/* light beam */}
            <path d="M0 40 L300 250" stroke="#fff3c4" strokeWidth={22} opacity={0.75 * ease(f, SHINES - 2, SHINES + 8)} strokeLinecap="round" />
            <path d="M260 180 h200 v300 a20 20 0 0 1 -20 20 h-160 a20 20 0 0 1 -20 -20 z" fill="#bfe8ff18" stroke="#d6f0ff" strokeWidth={4} />
            <rect x={262} y={320} width={196} height={176} fill="#38bdf833" />
            <rect x={310} y={150} width={14} height={300} fill="#cfd8dc" />
            <rect x={396} y={150} width={14} height={300} fill="#cfd8dc" />
            <path d="M317 150 V90 H600 V170 M403 150 V120 H560 V170" fill="none" stroke={DL.dim} strokeWidth={4} />
            <circle cx={580} cy={240} r={80} fill={DL.panel} stroke={DL.gold} strokeWidth={4} />
            <line x1={580} y1={270} x2={580 + Math.sin((needle * Math.PI) / 180) * 64} y2={270 - Math.cos((needle * Math.PI) / 180) * 64} stroke={DL.red} strokeWidth={5} strokeLinecap="round" />
            <text x={580} y={300} textAnchor="middle" fill={DL.muted} fontFamily={DL_MONO} fontSize={18}>VOLTS</text>
          </svg>
        </AbsoluteFill>

        {/* Carrington */}
        <AbsoluteFill style={{ opacity: carr }}>
          <div style={{ position: 'absolute', left: 220, top: 230 }}>
            <SunDisc size={340} id="carrSun" spots={[{ x: 150, y: 170, r: 20 }, { x: 180, y: 190, r: 12 }, { x: 130, y: 200, r: 10 }]} />
            <svg width={612} height={612} style={{ position: 'absolute', left: 0, top: 0 }}>
              <circle cx={286} cy={306} r={22 + 40 * flash} fill="#ffffff" opacity={flash} style={{ filter: 'drop-shadow(0 0 30px #fff)' }} />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 230, width: 760, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ ...rise(f, RICHARD - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>Richard Carrington</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="1 SEPT 1859" at={C.at('fifty')} color={DL.dim} size={26} />
              <SunChip text="A WHITE FLASH" at={FLASH} color="#ffffff" size={26} />
            </div>
            <svg width={700} height={150} viewBox="0 0 700 170" style={{ opacity: ease(f, WITHIN2, WITHIN2 + 10) }}>
              {[60, 340, 620].map((x) => <g key={x}><line x1={x} y1={20} x2={x} y2={170} stroke="#5a3b22" strokeWidth={10} /><line x1={x - 40} y1={30} x2={x + 40} y2={30} stroke="#5a3b22" strokeWidth={8} /></g>)}
              <path d="M20 40 Q200 80 340 40 Q480 80 680 40" fill="none" stroke={DL.dim} strokeWidth={3} />
              <text x={350} y={150} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={4}>WITHIN A DAY · TELEGRAPH WIRES</text>
              {sparkOn ? [200, 480].map((x) => <path key={x} d={`M${x} 52 l12 -22 l-4 16 l14 -8 l-12 26`} fill="#ffd23f" stroke="#fff" strokeWidth={2} opacity={0.6 + 0.4 * Math.abs(Math.sin(f / 2))} style={{ filter: 'drop-shadow(0 0 10px #ffd23f)' }} />) : null}
            </svg>
            <SunChip text="TELEGRAPH OPERATORS GET SHOCKS" at={SHOCKS} color={DL.red} size={26} />
            <SunChip text="THE SUN CAN TOUCH OUR MACHINES" at={TOUCH} color={SUN.mid} size={26} />
          </div>
        </AbsoluteFill>
        <DidYouKnowThat at={DID} out={HE}>
          <OnWord at={C.at('hottest')}>the hottest spot</OnWord><span style={{ opacity: ease(f, C.at('rainbow') - 6, C.at('rainbow') + 4) }}> was not in the rainbow at all, but</span> <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, PAST - 2, PAST + 8) }}>just past the red</span>
          <span style={{ opacity: ease(f, NOTHING - 4, NOTHING + 6) }}> — where nothing was visible.</span>
          <CardSource at={PAST}>NASA Space Place · Caltech IPAC — Herschel's 1800 experiment</CardSource>
        </DidYouKnowThat>
        <Cliffhanger next="1928" parts={[{ text: 'It would take another', at: CENTURY }, { text: 'century', at: C.at('century') }, { text: 'to turn that tiny spark', at: SPARK2 }, { text: 'into power.', at: POWER }]} />
      </EraExit>
      <EpisodeHud year={1800} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1800;
