import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunDisc, SunChip, SafetyTag, WakePlace, win, SUN, HowWeSawIt, ArcLadder, pastRungs, SunCliffhanger } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 6/14 — ERA 2: 1610, the Thames (RESEARCH F3). v2 re-key.
// River line + "Beside the River Thames" on "Thames"; frost on "cold", mist on "misty", header docks on
// "December" with the past ladder (1500 rung, window a, until the card). Low Sun rises on "Sun"/"low",
// dims on "dim"; Harriot on "Harriot", telescope raised on "telescope"; SafetyTag on "Don't". DYK card:
// clauses on their words, Harriot slides in on "this", name + footnote on "Englishman", "never published"
// on "never". Florence: 1612 on "Two", spots on "spots", drifting from "drift", DAY 1-2-3 on "day";
// ANOTHER ASTRONOMER: on "astronomer", tiny planets on "planets", lens ring on "Galileo", GALILEO: NO. on
// "no", ON THE SUN ITSELF on "itself", rotation arrow on "turning", 1613 card on "thirteen", letters on
// "letters", PERFECT HEAVENLY BODY on "body", HAS BLEMISHES on "blemishes". Fields: labourer under a plain
// Sun on "fields", Sun brightens on "daylight", mini Day Clock from "runs"; telescopes on the hill on
// "telescopes". Eyepiece irises in on "something", chip TO WATCH (slot 1) on "watch.", zoom on a spot on
// "Closely.". Cliffhanger: a beam travels on "ask", stops at a closed glass box "?" on "inside" (no prism).
// Ladder window (b): from the chip's dock (≥ 3 s after "watch.") to the end. VO su05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1610', durationInSeconds: 57.9, fps: 30, width: 1920, height: 1080 };
const DUR = 1737;

const C = makeCue(vo, 'su05-1610', 0.8);
const RIVER = C.at('River');
const THAMES = C.at('Thames');
const COLD = C.at('cold');
const MISTY = C.at('misty');
const DECEMBER = C.at('December');
const DOCK = DECEMBER; // place line holds >= 1.5 s after "Thames"
const MORNING = C.at('morning');
const SUN1 = C.at('Sun', 1);
const LOW = C.at('low');
const DIM = C.at('dim');
const HARRIOT = C.at('Harriot');
const TELESCOPE = C.at('telescope', 1);
const DONT = C.at("Don't");
const BLIND = C.at('blind');
const DID = C.at('Did');
const FIRST = C.at('first');
const DRAWING = C.at('drawing');
const SUNSPOTS = C.at('sunspots');
const GALILEO1 = C.at('Galileo', 1);
const THIS = C.at('was'); // "It was this Englishman": Harriot slides in on "was" (never cue on "It")
const ENGLISHMAN = C.at('Englishman');
const NEVER = C.at('never');
const TWO = C.at('Two');
const FLORENCE = C.at('Florence');
const GALILEO2 = C.at('Galileo', 2);
const SPOTS_AT = C.at('spots');
const DRIFT = C.at('drift');
const DAY1 = C.at('day', 1);
const ASTRONOMER = C.at('astronomer');
const PLANETS = C.at('planets');
const GALILEO3 = C.at('Galileo', 3);
const NO = C.at('no');
const ITSELF = C.at('itself');
const TURNING = C.at('turning');
const Y1613 = C.at('thirteen');
const LETTERS = C.at('letters');
const BODY = C.at('body');
const BLEMISHES = C.at('blemishes');
const FIELDS = C.at('fields');
const DAYLIGHT = C.at('daylight');
const RUNS = C.at('runs');
const TELESCOPES = C.at('telescopes');
const SOMETHING = C.at('something');
const WATCH = C.at('watch');
const CHIP_DOCK = WATCH + 90; // chip holds 3 s before it docks
const CLOSELY = C.at('Closely');
const SOON = C.at('soon');
const ASK = C.at('ask');
const INSIDE = C.at('inside');
const LIGHT = C.at('light');
const STEP = 12;

const FLOR_SPOTS = [{ x: 110, y: 140, r: 22 }, { x: 70, y: 190, r: 14 }, { x: 20, y: 250, r: 18 }, { x: -40, y: 120, r: 12 }];
const FARM_DAY = [
  { from: 21, to: 5, color: '#3b82f6' },
  { from: 5, to: 12, color: SUN.mid },
  { from: 12, to: 13, color: DL.red },
  { from: 13, to: 19, color: SUN.mid },
  { from: 19, to: 21, color: DL.warm },
];
const EYE = { x: 960, y: 470, r: 300 };
// frost crystals creeping in from the edges on "cold": [x, y, angle, length]
const FROST: [number, number, number, number][] = [[0, 120, 20, 260], [0, 520, -10, 220], [0, 900, -30, 280], [1920, 160, 160, 260], [1920, 600, 190, 230], [1920, 940, 210, 280], [420, 1080, -70, 200], [1500, 1080, -110, 210]];
const THAMES_SPOTS = [{ x: 120, y: 80, r: 9 }, { x: 140, y: 96, r: 6 }, { x: 70, y: 120, r: 7 }];
const SKETCH_SPOTS = [{ x: 88, y: 58, r: 7 }, { x: 100, y: 68, r: 5 }, { x: 60, y: 82, r: 6 }];

const ringArc = (c: number, r: number, from: number, span: number) => {
  const p = (h: number) => [c + Math.sin((h / 24) * Math.PI * 2) * r, c - Math.cos((h / 24) * Math.PI * 2) * r];
  const [x0, y0] = p(from), [x1, y1] = p(from + span);
  return `M${x0} ${y0} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x1} ${y1}`;
};

const Thames: React.FC<{ f: number }> = ({ f }) => {
  const mist = (i: number) => ((f * (0.6 + i * 0.2) + i * 300) % 1900) - 300;
  const man = ease(f, HARRIOT - 4, HARRIOT + 8);
  return (
    <svg width={1600} height={560} viewBox="0 0 1600 560">
      <rect x={0} y={360} width={1600} height={200} fill="#0b1520" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={0} y={372 + i * 40} width={1600} height={2} fill="#1d3346" opacity={0.6} transform={`translate(${Math.sin(f / 20 + i) * 20} 0)`} />)}
      <path d="M0 360 C300 340 600 350 900 356 C1200 362 1400 350 1600 356 L1600 380 L0 380 Z" fill="#11161a" />
      <g opacity={man} transform="translate(1080 220)">
        <circle cx={40} cy={30} r={22} fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
        <path d="M6 140 C6 90 18 62 40 62 C62 62 74 90 74 140 Z" fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
        <g transform={`rotate(${-20 * ease(f, TELESCOPE - 2, TELESCOPE + 12)} 60 60)`}><rect x={-140} y={48} width={190} height={18} rx={5} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} /></g>
      </g>
      {[0, 1, 2].map((i) => <ellipse key={i} cx={mist(i)} cy={300 + i * 40} rx={420} ry={34} fill="#cfd8dc" opacity={0.07 * ease(f, MISTY - 6, MISTY + 20)} />)}
    </svg>
  );
};

// "Out in the fields": a labourer with a hoe under a plain Sun; furrows; a few telescopes on the hill.
const Fields: React.FC<{ f: number }> = ({ f }) => {
  const furrows = ease(f, FIELDS - 2, FIELDS + 16);
  const hoe = Math.sin(f / 9) * 10;
  const scopes = (i: number) => ease(f, TELESCOPES + i * 4, TELESCOPES + i * 4 + 10);
  return (
    <svg width={1600} height={660} viewBox="0 0 1600 660">
      <rect x={0} y={480} width={1600} height={180} fill="#1a140c" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={800} y1={480} x2={800 + (i - 3) * 380 * furrows} y2={660} stroke="#3a2a1c" strokeWidth={4} opacity={furrows} />)}
      <path d="M1040 480 Q1250 380 1520 480 Z" fill="#14100a" stroke="#3a2a1c" strokeWidth={2} />
      {[0, 1, 2].map((i) => {
        const x = 1180 + i * 100, y = 440 - (i === 1 ? 26 : 8);
        return (
          <g key={i} opacity={scopes(i)} transform={`translate(${x} ${y})`}>
            <line x1={0} y1={0} x2={-12} y2={30} stroke={DL.warm} strokeWidth={3} />
            <line x1={0} y1={0} x2={12} y2={30} stroke={DL.warm} strokeWidth={3} />
            <rect x={-30} y={-14} width={60} height={10} rx={3} fill={DL.panel2} stroke={DL.gold} strokeWidth={2} transform="rotate(-28)" />
          </g>
        );
      })}
      <g transform="translate(260 330)">
        <circle cx={60} cy={20} r={20} fill="#0e0b0a" stroke={DL.warm} strokeWidth={2} />
        <path d="M30 150 C26 90 40 50 70 46 C96 44 104 80 100 150 Z" fill="#0e0b0a" stroke={DL.warm} strokeWidth={2} transform="rotate(14 60 100)" />
        <g transform={`rotate(${hoe} 90 70)`}>
          <line x1={90} y1={70} x2={170} y2={150} stroke={DL.warm} strokeWidth={5} strokeLinecap="round" />
          <path d="M160 140 L188 146 L176 160 Z" fill={DL.warm} />
        </g>
      </g>
    </svg>
  );
};

const MiniClock: React.FC<{ f: number }> = ({ f }) => {
  const size = 300, c = size / 2, r = c - 26, sw = 34;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke={DL.panel2} strokeWidth={sw} />
      {FARM_DAY.map((s, i) => {
        const g = ease(f, RUNS + i * STEP, RUNS + i * STEP + 12);
        const span = ((s.to - s.from + 24) % 24) * g;
        return span > 0.05 ? <path key={i} d={ringArc(c, r, s.from, span)} fill="none" stroke={s.color} strokeOpacity={i === 0 ? 0.6 : 1} strokeWidth={sw - 4} /> : null;
      })}
      <text x={c} y={c - 12} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={3}>A DAY IN</text>
      <text x={c} y={c + 34} textAnchor="middle" fill={DL.gold} fontFamily={DL_SERIF} fontSize={40}>1610</text>
    </svg>
  );
};

const EyeIcon: React.FC = () => (
  <svg width={56} height={56} viewBox="0 0 56 56">
    <circle cx={28} cy={28} r={24} fill="none" stroke={DL.gold} strokeWidth={4} />
    <circle cx={28} cy={28} r={13} fill={SUN.mid} />
    <circle cx={32} cy={24} r={3} fill="#3a1a06" />
  </svg>
);

const Su1610: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const sceneA = win(f, DOCK + 6, DID - 2);
  const frost = ease(f, COLD - 2, COLD + 20) * (1 - ease(f, DID - 10, DID));
  const florence = win(f, TWO + 18, FIELDS + 6, 6, 8);
  const spin = interpolate(f, [DRIFT, ITSELF], [0, 0.45], DCLAMP) + interpolate(f, [ITSELF, FIELDS], [0, 0.25], DCLAMP);
  const planetsOn = win(f, PLANETS + 8, NO + 30);
  const lens = ease(f, GALILEO3 - 2, GALILEO3 + 14);
  const turning = ease(f, TURNING - 2, TURNING + 10);
  const fields = win(f, FIELDS + 6, SOMETHING + 8, 8, 10);
  const sunBright = ease(f, DAYLIGHT - 2, DAYLIGHT + 16);
  const iris = ease(f, SOMETHING - 2, WATCH, 0, 1, DL_EASE.out);
  const eyepiece = win(f, SOMETHING, ASK, 2, 10);
  const zoom = ease(f, CLOSELY - 2, CLOSELY + 24, 1, 2.3, DL_EASE.inOut);
  const beamScene = ease(f, ASK - 6, ASK + 4);
  const beamX = 200 + 760 * ease(f, ASK, INSIDE - 2, 0, 1, DL_EASE.inOut);
  const glowBeam = ease(f, LIGHT - 2, LIGHT + 10);
  const ladderA = ease(f, DOCK + 4, DOCK + 16) * (1 - ease(f, DID - 8, DID));
  const ladderB = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const holeR = EYE.r * iris;
  const on = (at: number) => ease(f, at, at + 8); // card text: fades in ON its word, no pre-roll

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a24" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* the eyepiece view sits under the header so the docked year stays readable */}
        <AbsoluteFill style={{ opacity: eyepiece }}>
          <div style={{ position: 'absolute', left: EYE.x - 468, top: EYE.y - 468, transformOrigin: `${468 + 70}px ${468 + 40}px`, transform: `scale(${zoom})` }}>
            <SunDisc size={520} id="eyeSun" spots={[{ x: 330, y: 300, r: 30 }, { x: 290, y: 340, r: 16 }, { x: 170, y: 200, r: 20 }, { x: 380, y: 160, r: 12 }]} />
          </div>
          <AbsoluteFill style={{ background: `radial-gradient(circle at ${EYE.x}px ${EYE.y}px, transparent ${holeR}px, #050404 ${holeR + 2}px)` }} />
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
            <circle cx={EYE.x} cy={EYE.y} r={holeR + 6} fill="none" stroke={DL.gold} strokeWidth={6} opacity={0.8 * iris} />
          </svg>
        </AbsoluteFill>
        {/* frost creeps in at the edges on "cold" */}
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, #d6ecff4d 100%)', opacity: frost }} />
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: frost * (1 - ease(f, DOCK + 6, DOCK + 30)) }}>
          {FROST.map(([x, y, a, l], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${a})`} opacity={ease(f, COLD + i * 2, COLD + i * 2 + 12)}>
              <line x1={0} y1={0} x2={l} y2={0} stroke="#d6ecff" strokeWidth={2} opacity={0.55} />
              {[0.35, 0.6, 0.85].map((t) => <g key={t}><line x1={l * t} y1={0} x2={l * t + 14} y2={-12} stroke="#d6ecff" strokeWidth={1.5} opacity={0.45} /><line x1={l * t} y1={0} x2={l * t + 14} y2={12} stroke="#d6ecff" strokeWidth={1.5} opacity={0.45} /></g>)}
            </g>
          ))}
        </svg>
        <AbsoluteFill style={{ opacity: ease(f, MISTY - 4, MISTY + 16) * (1 - ease(f, DOCK + 6, DOCK + 20)) }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * (0.8 + i * 0.3) + i * 500) % 2400) - 500, top: 380 + i * 140, width: 900, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse, #cfd8dc22, transparent 70%)' }} />)}
        </AbsoluteFill>
        <AbsoluteFill style={{ transformOrigin: '50% 45%', transform: `scale(${1 + 0.04 * ease(f, 0, DOCK - 6, 0, 1, DL_EASE.inOut) * (1 - ease(f, DOCK - 6, DOCK + 10))})` }}>
          <EraHeader year="1610" idx={2} label={f >= FIELDS ? 'THE FIELDS' : f >= FLORENCE ? 'FLORENCE' : 'BY THE THAMES'} dockAt={DOCK} />
          <WakePlace place="Beside the River Thames" at={THAMES} dockAt={DOCK} yearAt={C.at('sixteen', 1)} />
        </AbsoluteFill>
        <svg width={800} height={40} viewBox="0 0 800 40" style={{ position: 'absolute', left: 560, top: 730, opacity: 1 - ease(f, DOCK - 6, DOCK + 6) }}>
          <path d="M0 20 Q100 4 200 20 T400 20 T600 20 T800 20" fill="none" stroke="#5a8fd6" strokeWidth={4} strokeDasharray={900} strokeDashoffset={900 * (1 - ease(f, RIVER, THAMES + 14))} />
        </svg>
        <div style={{ position: 'absolute', left: 160, top: 300, opacity: sceneA }}>
          <div style={{ position: 'absolute', left: 300, top: 120 + (1 - ease(f, SUN1 - 4, LOW + 12)) * 140, opacity: ease(f, SUN1 - 6, SUN1 + 6) }}><SunDisc size={200} dim={0.35 * ease(f, DIM - 2, DIM + 14)} glow={1 - 0.5 * ease(f, DIM - 2, DIM + 14)} id="thamesSun" spots={THAMES_SPOTS.map((sp, i) => ({ ...sp, at: TELESCOPE + 14 + i * 6 }))} /></div>
          <Thames f={f} />
        </div>
        <div style={{ position: 'absolute', left: 160, top: 220, opacity: sceneA }}><SunChip text="DECEMBER · MORNING MIST" at={MORNING + 1} color={DL.dim} size={24} /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', opacity: sceneA, transform: `scale(${1 + 0.08 * ease(f, BLIND, BLIND + 6) * (1 - ease(f, BLIND + 10, BLIND + 24))})` }}><SafetyTag at={DONT} /></div>
        <ArcLadder rungs={pastRungs(1)} show={ladderA} />

        {/* Florence: the spots drift across the turning Sun */}
        <AbsoluteFill style={{ opacity: florence }}>
          <div style={{ position: 'absolute', left: 240, top: 220 }}>
            <SunDisc size={380} id="florSun" spin={spin} spots={FLOR_SPOTS.map((s, i) => ({ ...s, at: SPOTS_AT + i * 3 }))} />
          </div>
          <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
            <circle cx={582} cy={562} r={218} fill="none" stroke={DL.gold} strokeWidth={4} strokeDasharray={1370} strokeDashoffset={1370 * (1 - lens)} opacity={lens * (1 - ease(f, ITSELF, ITSELF + 20)) * 0.9} />
          </svg>
          <svg width={900} height={200} style={{ position: 'absolute', left: 150, top: 380, opacity: planetsOn }}>
            {[0, 1, 2].map((i) => <circle key={i} cx={((f - PLANETS) * 4 + i * 160) % 900} cy={100 + i * 14} r={9} fill="#111" stroke="#fff" strokeWidth={2} />)}
          </svg>
          <svg width={500} height={160} viewBox="0 0 500 160" style={{ position: 'absolute', left: 330, top: 740, opacity: turning }}>
            <path d="M60 60 Q250 -10 440 60" fill="none" stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" />
            <path d="M420 34 L446 62 L410 76" fill="none" stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <text x={250} y={120} textAnchor="middle" fill={SUN.mid} fontFamily={DL_MONO} fontSize={26} letterSpacing={4}>THE SUN IS TURNING</text>
          </svg>
          <div style={{ position: 'absolute', left: 1040, top: 210, width: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ ...rise(f, TWO + 14), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>1612<span style={{ opacity: ease(f, FLORENCE, FLORENCE + 6) }}> · FLORENCE</span><span style={{ opacity: ease(f, GALILEO2, GALILEO2 + 6) }}> · GALILEO</span></div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[0, 1, 2].map((i) => <SunChip key={i} text={`DAY ${i + 1}`} at={DAY1 + i * STEP + 1} color={DL.dim} size={26} />)}
            </div>
            <div style={{ opacity: ease(f, ASTRONOMER, ASTRONOMER + 8) }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>ANOTHER ASTRONOMER:</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.text, opacity: ease(f, PLANETS, PLANETS + 8), textDecoration: f > NO + 2 ? 'line-through' : 'none', textDecorationColor: DL.red }}>tiny planets in front?</div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="GALILEO: NO." at={NO + 1} color={DL.text} size={26} />
              <SunChip text="ON THE SUN ITSELF" at={ITSELF + 1} color={SUN.mid} size={26} />
            </div>
            <div style={{ ...rise(f, Y1613), padding: '16px 24px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>ROME · 1613<span style={{ opacity: ease(f, LETTERS, LETTERS + 6) }}> · HIS LETTERS ON SUNSPOTS</span></div>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, lineHeight: 1.25, color: DL.text, marginTop: 6 }}>Istoria e dimostrazioni intorno alle macchie solari</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SunChip text="THE PERFECT HEAVENLY BODY" at={BODY + 1} color={DL.dim} size={26} />
              <SunChip text="HAS BLEMISHES" at={BLEMISHES + 1} color={DL.red} size={26} />
            </div>
          </div>
        </AbsoluteFill>

        {/* the fields: daylight still runs your day */}
        <AbsoluteFill style={{ opacity: fields }}>
          <div style={{ position: 'absolute', left: 560, top: 200 - 30 * sunBright }}><SunDisc size={150} glow={0.4 + 0.8 * sunBright} id="fieldSun" /></div>
          <div style={{ position: 'absolute', left: 160, top: 260 }}><Fields f={f} /></div>
          <div style={{ position: 'absolute', left: 1080, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, RUNS - 6, RUNS + 4) }}>
            <MiniClock f={f} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3 }}>
              <span style={{ color: '#7fa6f0', opacity: ease(f, RUNS, RUNS + 8) }}>NIGHT · SLEEP</span>
              <span style={{ color: SUN.mid, opacity: ease(f, RUNS + STEP, RUNS + STEP + 8) }}>DAY · WORK</span>
            </div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim, opacity: ease(f, RUNS + 4 * STEP, RUNS + 4 * STEP + 8) }}>FARM DAY · ILLUSTRATION</div>
          </div>
        </AbsoluteFill>

        {/* cliffhanger: a beam stops at a closed glass box marked ? (no prism shown) */}
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: beamScene }}>
          <line x1={200} y1={470} x2={beamX} y2={470} stroke="#fff8e1" strokeWidth={10 + 6 * glowBeam} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 ${8 + 18 * glowBeam}px ${SUN.mid})` }} />
          <rect x={960} y={340} width={240} height={260} rx={12} fill="#bfe8ff18" stroke="#d6f0ff" strokeWidth={4} />
          <line x1={960} y1={340} x2={1000} y2={310} stroke="#d6f0ff" strokeWidth={3} opacity={0.6} />
          <line x1={1200} y1={340} x2={1240} y2={310} stroke="#d6f0ff" strokeWidth={3} opacity={0.6} />
          <line x1={1000} y1={310} x2={1240} y2={310} stroke="#d6f0ff" strokeWidth={3} opacity={0.6} />
          <line x1={1240} y1={310} x2={1240} y2={570} stroke="#d6f0ff" strokeWidth={3} opacity={0.6} />
          <text x={1080} y={520} textAnchor="middle" fill={SUN.mid} fontFamily={DL_SERIF} fontSize={170} opacity={ease(f, INSIDE, INSIDE + 8)}>?</text>
        </svg>

        <AbsoluteFill style={{ opacity: ease(f, WATCH, WATCH + 6) }}><HowWeSawIt text="TO WATCH" at={WATCH} dockAt={CHIP_DOCK} slot={1} left={160} top={640} icon={<EyeIcon />} /></AbsoluteFill>

        <DidYouKnowThat at={DID} out={TWO + 16}>
          <div style={{ float: 'right', marginLeft: 28, width: 200, padding: 12, borderRadius: 6, background: '#e9e1cf', transform: 'rotate(2deg)', opacity: ease(f, DRAWING, DRAWING + 8) }}>
            <svg width={176} height={140} viewBox="0 0 176 140">
              <circle cx={88} cy={70} r={56} fill="none" stroke="#3a2a1c" strokeWidth={3} />
              {SKETCH_SPOTS.map((sp, i) => <circle key={i} cx={sp.x} cy={sp.y} r={sp.r} fill="#3a2a1c" opacity={ease(f, SUNSPOTS + i * 4, SUNSPOTS + i * 4 + 6)} />)}
            </svg>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: '#3a2a1c', textAlign: 'center' }}>1610 SKETCH</div>
          </div>
          <span style={{ opacity: on(FIRST) }}>the first telescope</span> <span style={{ opacity: on(DRAWING) }}>drawing</span> <span style={{ opacity: on(SUNSPOTS) }}>of <span style={{ color: '#ffc94a' }}>sunspots</span></span><span style={{ opacity: on(GALILEO1) }}> wasn’t made by Galileo?</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 14 }}>
            <svg width={70} height={90} viewBox="0 0 70 90" style={{ opacity: on(THIS), transform: `translateX(${ease(f, THIS, THIS + 10, -30, 0)}px)` }}>
              <circle cx={35} cy={22} r={16} fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
              <path d="M8 88 C8 56 18 42 35 42 C52 42 62 56 62 88 Z" fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
            </svg>
            <span style={{ opacity: on(ENGLISHMAN) }}>It was <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>this Englishman, Thomas Harriot.</span></span>
          </div>
          <div style={{ opacity: on(NEVER) }}>And he never published it.</div>
          <div style={{ clear: 'both', marginTop: 22, fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: '#c8cdf0', opacity: on(ENGLISHMAN) }}>Thomas Harriot's notebook, 8 Dec 1610, Syon House — the earliest known telescope drawing of sunspots</div>
        </DidYouKnowThat>
      </EraExit>
      <ArcLadder rungs={[...pastRungs(1), { year: '1610', label: 'TO WATCH', at: CHIP_DOCK + 10 }]} show={ladderB} />
      <SunCliffhanger next="1779" parts={[{ text: 'And soon,', at: SOON }, { text: 'someone will ask', at: ASK }, { text: 'what’s actually inside', at: INSIDE }, { text: 'that light.', at: LIGHT }]} />
      <EpisodeHud year={1610} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1610;
