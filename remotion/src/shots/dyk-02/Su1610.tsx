import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunDisc, SunChip, SafetyTag, Spectrum, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 6/14 — ERA 2: 1610, the Thames (RESEARCH F3). Misty river, low dim Sun; Harriot's
// figure + telescope on "Harriot", his notebook sketch fills with spots on "draws"; the safety
// tag on "Do not try this". DYK card: first telescope sunspot drawing — "an Englishman,
// Thomas Harriot" lands on "Englishman", "never published" on "never". Florence: the spots
// drift day after day (DAY 1-2-3 on "day"); the rival's "tiny planets" on "planets"; NO on
// "disagreed"; spots foreshorten at the limb on "itself", rotation arrow on "turning"; the
// 1613 book on "sixteen"; BLEMISHED on "blemishes". Day Clock on "most people"; MEASURED on
// "measure"; prism on "prism". VO su05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1610', durationInSeconds: 51.6667, fps: 30, width: 1920, height: 1080 };
const DUR = 1550;

const C = makeCue(vo, 'su05-1610', 0.8);
const BESIDE = C.at('beside');
const MISTY = C.at('misty');
const DECEMBER = C.at('December');
const DOCK = DECEMBER; // place line ('Beside the River Thames') holds >= 1.5 s
const MORNING = C.at('morning');
const DIM = C.at('dim');
const BLIND = C.at('blind');
const GALILEO1 = C.at('Galileo', 1);
const FLORENCE = C.at('Florence');
const GALILEO2 = C.at('Galileo', 2);
const PERFECT = C.at('perfect');
const FEW = C.at('few');
const LOW = C.at('low');
const HARRIOT = C.at('Harriot');
const TELESCOPE = C.at('telescope', 1);
const DRAWS = C.at('draws');
const DONOT = C.at('Do');
const DID = C.at('Did');
const ENGLISHMAN = C.at('Englishman');
const NEVER = C.at('never');
const TWO = C.at('Two');
const DAY1 = C.at('day', 1);
const RIVAL = C.at('rival');
const PLANETS = C.at('planets');
const DISAGREED = C.at('disagreed');
const ITSELF = C.at('itself');
const TURNING = C.at('turning');
const Y1613 = C.at('sixteen', 2);
const BLEMISHES = C.at('blemishes');
const FOR = C.at('For', 1);
const DAYLIGHT = C.at('daylight');
const MEASURE = C.at('measure');
const SOON = C.at('soon');
const PRISM = C.at('prism');
const APART = C.at('apart');
const STEP = 12;

const DAY1610 = [
  { from: 21, to: 5, label: 'Sleep', color: '#38bdf8' },
  { from: 5, to: 12, label: 'Work, by daylight', color: '#ffc94a' },
  { from: 12, to: 13, label: 'Dinner', color: '#e74c3c' },
  { from: 13, to: 19, label: 'Work, by daylight', color: '#ffc94a' },
  { from: 19, to: 21, label: 'Candle or firelight, then bed', color: '#b9b1a4' },
];
const SPOTS = [{ x: 120, y: 150, r: 14 }, { x: 150, y: 170, r: 9 }, { x: 60, y: 220, r: 11 }, { x: 200, y: 110, r: 8 }];

const Thames: React.FC<{ f: number }> = ({ f }) => {
  const mist = (i: number) => ((f * (0.6 + i * 0.2) + i * 300) % 1900) - 300;
  const man = ease(f, HARRIOT - 4, HARRIOT + 8);
  return (
    <svg width={1600} height={560} viewBox="0 0 1600 560">
      <rect x={0} y={360} width={1600} height={200} fill="#0b1520" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={0} y={372 + i * 40} width={1600} height={2} fill="#1d3346" opacity={0.6} transform={`translate(${Math.sin(f / 20 + i) * 20} 0)`} />)}
      <path d="M0 360 C300 340 600 350 900 356 C1200 362 1400 350 1600 356 L1600 380 L0 380 Z" fill="#11161a" />
      {/* Harriot on the bank with his telescope */}
      <g opacity={man} transform="translate(1080 220)">
        <circle cx={40} cy={30} r={22} fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
        <path d="M6 140 C6 90 18 62 40 62 C62 62 74 90 74 140 Z" fill="#1a1410" stroke={DL.warm} strokeWidth={2} />
        <g transform={`rotate(${-20 * ease(f, TELESCOPE - 2, TELESCOPE + 12)} 60 60)`}><rect x={-140} y={48} width={190} height={18} rx={5} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} /></g>
      </g>
      {[0, 1, 2].map((i) => <ellipse key={i} cx={mist(i)} cy={300 + i * 40} rx={420} ry={34} fill="#cfd8dc" opacity={0.07 * ease(f, MISTY - 6, MISTY + 20)} />)}
    </svg>
  );
};

const Su1610: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const sceneA = win(f, DOCK + 6, DID - 2);
  const sketch = ease(f, DRAWS - 2, DRAWS + 10);
  const florence = win(f, TWO + 16, FOR, 4, 12);
  const spin = interpolate(f, [TWO, ITSELF], [0, 0.55], DCLAMP) + interpolate(f, [ITSELF, FOR], [0, 0.25], DCLAMP);
  const planetsOn = win(f, PLANETS - 2, DISAGREED + 30);
  const turning = ease(f, TURNING - 2, TURNING + 10);
  const dayClock = win(f, FOR - 2, PRISM - 2);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1a24" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* morning mist drifts in over the header on "misty" */}
        <AbsoluteFill style={{ opacity: ease(f, MISTY - 4, MISTY + 16) * (1 - ease(f, DOCK + 6, DOCK + 20)) }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * (0.8 + i * 0.3) + i * 500) % 2400) - 500, top: 380 + i * 140, width: 900, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse, #cfd8dc22, transparent 70%)' }} />)}
        </AbsoluteFill>
        <EraHeader year="1610" idx={2} label="BY THE THAMES" dockAt={DOCK} />
        <WakePlace place="Beside the River Thames" at={BESIDE} dockAt={DOCK} yearAt={C.at('sixteen', 1)} />
        <div style={{ position: 'absolute', left: 160, top: 300, opacity: sceneA }}>
          <div style={{ position: 'absolute', left: 300, top: 120 + (1 - ease(f, LOW - 10, LOW + 20)) * 60 }}><SunDisc size={200} dim={0.5 * ease(f, DIM - 2, DIM + 14)} glow={1 - 0.5 * ease(f, DIM - 2, DIM + 14)} id="thamesSun" /></div>
          <Thames f={f} />
        </div>
        {/* his notebook: the spots appear as he draws */}
        <div style={{ position: 'absolute', left: 1320, top: 230, width: 400, padding: 24, borderRadius: 8, background: '#e9e1cf', transform: `rotate(${3 - 3 * sketch}deg)`, opacity: sketch * sceneA }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 18, color: '#5a4a3a' }}>HARRIOT · 8 DEC 1610 · SYON</div>
          <svg width={350} height={260} viewBox="0 0 350 260">
            <circle cx={175} cy={130} r={110} fill="none" stroke="#3a2a1c" strokeWidth={3} />
            {SPOTS.map((s, i) => <circle key={i} cx={s.x + 55} cy={s.y - 10} r={s.r * 0.8} fill="#3a2a1c" opacity={ease(f, DRAWS + 6 + i * 6, DRAWS + 12 + i * 6)} />)}
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 220, opacity: sceneA }}><SunChip text="DECEMBER · MORNING MIST" at={MORNING} color={DL.dim} size={24} /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', opacity: sceneA, transform: `scale(${1 + 0.08 * ease(f, BLIND, BLIND + 6) * (1 - ease(f, BLIND + 10, BLIND + 24))})` }}><SafetyTag at={DONOT} /></div>


        {/* Florence: the spots drift across the turning Sun */}
        <AbsoluteFill style={{ opacity: florence }}>
          <div style={{ position: 'absolute', left: 240, top: 220 }}>
            <SunDisc size={380} id="florSun" spin={spin} spots={[{ x: 40, y: 140, r: 22 }, { x: 0, y: 190, r: 14 }, { x: -60, y: 250, r: 18 }, { x: -110, y: 120, r: 12 }]} />
          </div>
          {/* the rival's idea: little planets passing in front */}
          <svg width={900} height={200} style={{ position: 'absolute', left: 150, top: 380, opacity: planetsOn }}>
            {[0, 1, 2].map((i) => <circle key={i} cx={((f - PLANETS) * 4 + i * 160) % 900} cy={100 + i * 14} r={9} fill="#111" stroke="#fff" strokeWidth={2} />)}
          </svg>
          <svg width={500} height={200} viewBox="0 0 500 200" style={{ position: 'absolute', left: 330, top: 770, opacity: turning }}>
            <path d="M60 60 Q250 -10 440 60" fill="none" stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" />
            <path d="M420 34 L446 62 L410 76" fill="none" stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            <text x={250} y={120} textAnchor="middle" fill={SUN.mid} fontFamily={DL_MONO} fontSize={26} letterSpacing={4}>THE SUN IS TURNING</text>
          </svg>
          <div style={{ position: 'absolute', left: 1080, top: 220, width: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ ...rise(f, TWO), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>1612<span style={{ opacity: ease(f, FLORENCE - 2, FLORENCE + 6) }}> · FLORENCE</span><span style={{ opacity: ease(f, GALILEO2 - 2, GALILEO2 + 6) }}> · GALILEO</span></div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[0, 1, 2].map((i) => <SunChip key={i} text={`DAY ${i + 1}`} at={DAY1 + i * STEP} color={DL.dim} size={26} />)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, RIVAL - 2, RIVAL + 8) }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>A RIVAL:</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.text, opacity: ease(f, PLANETS - 2, PLANETS + 8), textDecoration: f > DISAGREED + 4 ? 'line-through' : 'none', textDecorationColor: DL.red }}>tiny planets in front?</span>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="GALILEO: NO." at={DISAGREED} color={DL.text} />
              <SunChip text="ON THE SUN ITSELF" at={ITSELF} color={SUN.mid} />
            </div>
            <div style={{ ...rise(f, Y1613 - 2), marginTop: 10, padding: '20px 26px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.muted }}>ROME · 1613<span style={{ opacity: ease(f, C.at('letters') - 2, C.at('letters') + 6) }}> · HIS LETTERS ON SUNSPOTS</span></div>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 34, lineHeight: 1.25, color: DL.text, marginTop: 8 }}>Istoria e dimostrazioni intorno alle macchie solari</div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <SunChip text="THE PERFECT HEAVENS" at={PERFECT} color={DL.dim} size={26} />
              <SunChip text="BLEMISHED" at={BLEMISHES} color={DL.red} size={26} />
            </div>
          </div>
        </AbsoluteFill>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', opacity: dayClock }}>
          <DayClock year="1610" segs={DAY1610} at={FOR} step={STEP} hotSeq={[[1, DAYLIGHT], [3, MEASURE]]} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 730, display: 'flex', justifyContent: 'center', opacity: dayClock }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <SunChip text="FOR A FEW" at={FEW} color={DL.dim} size={26} />
            <SunChip text="THE SUN BECOMES SOMETHING TO MEASURE" at={MEASURE} color={SUN.mid} size={26} />
          </div>
        </div>
        {/* the open loop: a glass prism on "prism"; the light breaks apart on "apart" */}
        <div style={{ position: 'absolute', left: 400, top: 260, opacity: ease(f, PRISM - 2, PRISM + 8) }}>
          <Spectrum fan={ease(f, APART - 2, APART + 24, 0, 1, DL_EASE.inOut)} redOp={0} violetOp={0} />
        </div>
        <DidYouKnowThat at={DID} out={TWO + 14}>
          <OnWord at={C.at('first')}>the first telescope drawing of <span style={{ color: f >= C.at('sunspots') ? '#ffc94a' : '#ffffff' }}>sunspots</span></OnWord><span style={{ opacity: ease(f, GALILEO1 - 6, GALILEO1 + 4) }}> was made not by Galileo,</span>
          <span style={{ opacity: ease(f, ENGLISHMAN - 2, ENGLISHMAN + 8) }}> but by an <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>Englishman, Thomas Harriot</span></span>
          <span style={{ opacity: ease(f, NEVER - 2, NEVER + 8) }}> — and he never published it.</span>
          <CardSource at={NEVER}>Thomas Harriot's notebook, 8 Dec 1610, Syon House — the earliest known telescope drawing of sunspots</CardSource>
        </DidYouKnowThat>
        <Cliffhanger next="1752" parts={[{ text: 'And soon,', at: SOON }, { text: 'one simple glass prism', at: PRISM }, { text: 'will break that light apart.', at: APART }]} />
      </EraExit>
      <EpisodeHud year={1610} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1610;
