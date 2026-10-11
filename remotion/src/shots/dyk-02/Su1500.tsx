import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, win, SUN, HowWeSawIt, ArcLadder, SunCliffhanger } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 5/14 — ERA 1: 1500, London, Midsummer Eve (RESEARCH F2, F16 — Stow verbatim). v2 re-key.
// Header + "London" on its word; MIDSUMMER EVE chip on "Midsummer"; smoke on "smoke", windows on
// "streets", bonfires ignite one per 12 f from "glowing". DYK card (F2): clauses on their words,
// Ptolemy footnote on "Ptolemy". "So what is the Sun to you?" = the Sun lifts with a big ? behind it.
// "Simple." = the Day Clock ring; split on "difference", gold day half on "day", navy night half on
// "night." → arc chip DAY & NIGHT (slot 0), docks after ≥ 3 s; labels on "Daylight"/"work"/"Darkness"/
// "sleep"/"prayer"; night floods with firelight on "tonight", NOBODY SLEEPS on "nobody". Doors: birch /
// flowers / lamps / bread on their words; ? over the bonfire on "Why?"; Stow's quote builds ("writer",
// "Stow", "wrote", "great", "purge"). Copernicus: orbit diagram on "Far", name on "Copernicus", 1543 on
// "forty", Sun to the centre on "centre", the Earth starts to orbit on "motion". Telescope on
// "instrument". Ladder: window (b) only — from the chip's dock until the band enters. VO su04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1500', durationInSeconds: 59.8333, fps: 30, width: 1920, height: 1080 };
const DUR = 1795;

const C = makeCue(vo, 'su04-1500', 0.8);
const LONDON = C.at('London', 1);
const MIDSUMMER = C.at('Midsummer');
const DOCK = MIDSUMMER + 14; // place line holds >= 1.5 s after "London"
const SMOKE = C.at('smoke');
const STREETS = C.at('streets');
const GLOWING = C.at('glowing');
const DID = C.at('Did');
const BELIEVES = C.at('believes');
const AROUND = C.at('around');
const PTOLEMY = C.at('Ptolemy');
const FOURTEEN = C.at('fourteen');
const SO = C.at('So');
const WHAT_Q = C.at('what', 2); // "So what is the Sun to you?"
const SIMPLE = C.at('Simple');
const DIFFERENCE = C.at('difference');
const DAY = C.at('day');
const NIGHT = C.at('night', 1); // "day and night." — the arc rung keyword
const DAYLIGHT = C.at('Daylight');
const WORK = C.at('work');
const DARKNESS = C.at('Darkness');
const SLEEP = C.at('sleep');
const PRAYER = C.at('prayer');
const CHIP_DOCK = SLEEP + 10; // chip holds 3.3 s (>= 3 s) before it docks
const TONIGHT = C.at('tonight');
const NOBODY = C.at('nobody');
const DOORS = C.at('Doors');
const BIRCH = C.at('birch');
const FLOWERS = C.at('flowers'); // the chip names them: St John's wort (Stow)
const LAMPS = C.at('lamps');
const ALL = C.at('all');
const BREAD = C.at('bread');
const DRINK = C.at('drink');
const BONFIRES = C.at('bonfires');
const WHY = C.at('Why');
const WRITER = C.at('writer');
const STOW = C.at('Stow');
const WROTE = C.at('wrote');
const GREAT = C.at('great');
const PURGE = C.at('purge');
const AIR = C.at('air');
const FAR = C.at('Far');
const ASTRONOMER = C.at('astronomer');
const COPERNICUS = C.at('Copernicus');
const SKY = C.at('sky');
const FORTY = C.at('forty');
const DIES = C.at('dies');
const BOOK = C.at('book');
const SUN_MOVES = C.at('Sun', 3); // "puts the Sun at the centre"
const CENTRE = C.at('centre');
const MOTION = C.at('motion');
const WITHIN = C.at('within');
const INSTRUMENT = C.at('instrument');
const SHOW = C.at('show');
const SHOCKING = C.at('shocking');
const SUN_ISNT = C.at('Sun', 4); // "The Sun isn't perfect."
const PERFECT = C.at('perfect');

const NIGHT_BLUE = '#3b82f6'; // the DYK card's blue, used dimmed for the night half
const FIRE_ORANGE = '#ff7a1a';
const BONFIRE_X = [170, 690, 1210];
const IGNITE_STEP = 12;

// a row of timber houses at night; bonfires in the street; doors decorated piece by piece
const Street: React.FC<{ f: number }> = ({ f }) => {
  const houses = [0, 1, 2, 3, 4, 5];
  const big = ease(f, BONFIRES - 2, BONFIRES + 12);
  const lampFlare = ease(f, ALL - 2, ALL + 10);
  const smokeUp = ease(f, AIR - 2, AIR + 20);
  const flick = (i: number) => 1 + 0.12 * Math.sin(f / 3 + i * 2) + 0.08 * Math.sin(f / 1.7 + i);
  return (
    <svg width={1600} height={430} viewBox="0 0 1600 430">
      <circle cx={120} cy={60} r={26} fill="#e9e1cf" opacity={0.45} />
      {houses.map((i) => {
        const x = 40 + i * 260;
        return (
          <g key={i}>
            <rect x={x} y={120} width={200} height={240} fill="#15100b" stroke="#3a2a1c" strokeWidth={3} />
            <path d={`M${x - 14} 124 L${x + 100} 40 L${x + 214} 124 Z`} fill="#120c08" stroke="#3a2a1c" strokeWidth={3} />
            <line x1={x} y1={200} x2={x + 200} y2={200} stroke="#3a2a1c" strokeWidth={4} />
            <line x1={x + 100} y1={120} x2={x + 100} y2={200} stroke="#3a2a1c" strokeWidth={4} />
            <rect x={x + 72} y={250} width={56} height={110} fill="#24180f" />
            <rect x={x + 24} y={140} width={40} height={40} fill={SUN.mid} opacity={0.75 * ease(f, STREETS + i * 2, STREETS + i * 2 + 8)} />
            <rect x={x + 136} y={140} width={40} height={40} fill={SUN.mid} opacity={0.75 * ease(f, STREETS + i * 2 + 1, STREETS + i * 2 + 9)} />
            <g opacity={ease(f, BIRCH + i * 3, BIRCH + i * 3 + 8)}>
              {[-1, 1].map((s) => <path key={s} d={`M${x + 100} 246 q ${s * 40} -26 ${s * 64} 10`} stroke="#4caf50" strokeWidth={8} fill="none" strokeLinecap="round" />)}
            </g>
            <g opacity={ease(f, FLOWERS + i * 3, FLOWERS + i * 3 + 8)}>
              {[-30, -12, 12, 30].map((d) => <circle key={d} cx={x + 100 + d} cy={238} r={7} fill="#ffd23f" />)}
            </g>
            <g opacity={ease(f, LAMPS + i * 3, LAMPS + i * 3 + 8)}>
              {[40, 160].map((dx) => <circle key={dx} cx={x + dx} cy={250} r={12 + 3 * lampFlare} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 ${14 + 14 * lampFlare}px ${SUN.mid})` }} />)}
            </g>
          </g>
        );
      })}
      <rect x={0} y={360} width={1600} height={70} fill="#0d0907" />
      {[300, 820, 1340].map((x, i) => (
        <g key={x}>
          <rect x={x - 60} y={376} width={120} height={10} fill="#5a3b22" opacity={ease(f, BREAD + i * 4, BREAD + i * 4 + 8)} />
          <ellipse cx={x - 20} cy={370} rx={22} ry={10} fill="#d9a35b" opacity={ease(f, BREAD + i * 4, BREAD + i * 4 + 8)} />
          <rect x={x + 18} y={352} width={14} height={24} fill="#b9b1a4" opacity={ease(f, DRINK + i * 4, DRINK + i * 4 + 8)} />
        </g>
      ))}
      {BONFIRE_X.map((x, i) => {
        const fire = ease(f, GLOWING + i * IGNITE_STEP - 2, GLOWING + i * IGNITE_STEP + 10);
        const h = (60 + 70 * big) * flick(i) * fire;
        return (
          <g key={x}>
            <ellipse cx={x} cy={404} rx={60 + 30 * big} ry={12} fill="#2a1a10" />
            <path d={`M${x - 46} 404 Q${x - 30} ${404 - h * 0.6} ${x} ${404 - h} Q${x + 30} ${404 - h * 0.6} ${x + 46} 404 Z`} fill={FIRE_ORANGE} opacity={0.9 * fire} />
            <path d={`M${x - 24} 404 Q${x - 12} ${404 - h * 0.4} ${x} ${404 - h * 0.7} Q${x + 12} ${404 - h * 0.4} ${x + 24} 404 Z`} fill="#ffd23f" opacity={fire} />
            <circle cx={x} cy={380} r={140 + 60 * big} fill={FIRE_ORANGE} opacity={0.08 * fire} />
            {/* "purge the infection of the air": smoke rises off the fires */}
            {[0, 1, 2].map((k) => {
              const y = 404 - h - (((f - AIR) * 1.6 + k * 60) % 180);
              return <circle key={k} cx={x + Math.sin(f / 14 + k) * 16} cy={y} r={22 + k * 8} fill="#9a8f84" opacity={0.16 * smokeUp} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

// arc of a 24-hour ring (0 h at the top, clockwise)
const ringArc = (c: number, r: number, from: number, span: number) => {
  const p = (h: number) => [c + Math.sin((h / 24) * Math.PI * 2) * r, c - Math.cos((h / 24) * Math.PI * 2) * r];
  const [x0, y0] = p(from), [x1, y1] = p(from + span);
  return `M${x0} ${y0} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x1} ${y1}`;
};
const beat = (f: number, at: number) => (f > at ? Math.max(0, Math.cos((f - at) / 5)) * (1 - ease(f, at, at + 40)) : 0);

// The 1500 Day Clock: one ring, split into a gold day half (06–18) and a navy night half (18–06).
const SplitClock: React.FC<{ f: number }> = ({ f }) => {
  const size = 470, c = size / 2, r = c - 30, sw = 46;
  const ring = ease(f, SIMPLE - 2, SIMPLE + 4);
  const split = ease(f, DIFFERENCE - 2, DIFFERENCE + 12);
  const dayG = ease(f, DAY - 2, DAY + 12);
  const nightG = ease(f, NIGHT - 2, NIGHT + 12);
  const fireNight = ease(f, TONIGHT - 2, TONIGHT + 18);
  const workP = beat(f, WORK), sleepP = beat(f, SLEEP);
  const L = r + sw / 2 + 14;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity: ring, transform: `scale(${0.96 + 0.04 * ring})` }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#2e2826" strokeWidth={sw} />
      <circle cx={c} cy={c} r={r + sw / 2} fill="none" stroke={DL.dim} strokeWidth={2} opacity={0.7} />
      <circle cx={c} cy={c} r={r - sw / 2} fill="none" stroke={DL.dim} strokeWidth={2} opacity={0.7} />
      {dayG > 0.01 && <path d={ringArc(c, r, 6, 12 * dayG)} fill="none" stroke={SUN.mid} strokeWidth={sw - 4 + 10 * workP} style={{ filter: `drop-shadow(0 0 ${4 + 14 * workP}px ${SUN.mid})` }} />}
      {nightG > 0.01 && <path d={ringArc(c, r, 18, 12 * nightG)} fill="none" stroke={NIGHT_BLUE} strokeOpacity={0.6} strokeWidth={sw - 4 + 10 * sleepP} style={{ filter: `drop-shadow(0 0 ${4 + 14 * sleepP}px ${NIGHT_BLUE})` }} />}
      {/* tonight: the night half floods with firelight */}
      {fireNight > 0.01 && <path d={ringArc(c, r, 18, 12)} fill="none" stroke={FIRE_ORANGE} strokeWidth={sw - 4} opacity={fireNight * (0.75 + 0.15 * Math.sin(f / 3))} style={{ filter: `drop-shadow(0 0 16px ${FIRE_ORANGE})` }} />}
      {f >= SIMPLE && (() => {
        const h = ((f - SIMPLE) / 180) * 24;
        const a = (h / 24) * Math.PI * 2;
        return <circle cx={c + Math.sin(a) * r} cy={c - Math.cos(a) * r} r={13} fill={DL.text} opacity={0.9} style={{ filter: `drop-shadow(0 0 10px ${DL.text})` }} />;
      })()}
      <line x1={c - L * split} y1={c} x2={c + L * split} y2={c} stroke={DL.text} strokeWidth={6} strokeLinecap="round" opacity={split} style={{ filter: `drop-shadow(0 0 ${10 * split}px ${DL.text})` }} />
      {[0, 6, 12, 18].map((h) => {
        const a = (h / 24) * Math.PI * 2, rr = r - sw / 2 - 24;
        return <text key={h} x={c + Math.sin(a) * rr} y={c - Math.cos(a) * rr + 8} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24}>{String(h).padStart(2, '0')}</text>;
      })}
      <text x={c} y={c - 34} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={4}>A DAY IN</text>
      <text x={c} y={c + 62} textAnchor="middle" fill={DL.gold} fontFamily={DL_SERIF} fontSize={52}>1500</text>
    </svg>
  );
};

const ClockLegend: React.FC<{ f: number }> = ({ f }) => {
  const op = (at: number) => ease(f, at, at + 8);
  const row = { display: 'flex', alignItems: 'center', gap: 18, fontFamily: DL_SANS, fontSize: 38, color: DL.warm } as const;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={row}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: SUN.mid, opacity: op(DAYLIGHT) }} />
        <span style={{ opacity: op(DAYLIGHT), color: SUN.mid, fontWeight: 600 }}>Daylight</span>
        <span style={{ opacity: op(WORK) }}>is for work.</span>
      </div>
      <div style={row}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: NIGHT_BLUE, opacity: 0.8 * op(DARKNESS) }} />
        <span style={{ opacity: op(DARKNESS), color: '#9ab8f5', fontWeight: 600 }}>Darkness</span>
        <span style={{ opacity: op(SLEEP) }}>is for sleep,</span>
        <span style={{ opacity: op(PRAYER) }}>and prayer.</span>
      </div>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim, opacity: op(DAYLIGHT) }}>ILLUSTRATION · BASED ON HISTORICAL ACCOUNTS</div>
    </div>
  );
};

// Earth-centred → Sun-centred. The Sun swaps into the centre on "centre"; the Earth starts to orbit on "motion".
const Orbits: React.FC<{ f: number }> = ({ f }) => {
  const swap = ease(f, SUN_MOVES, CENTRE + 6, 0, 1, DL_EASE.inOut);
  const cx = 360, cy = 300, R = 220;
  const frozen = Math.min(f, SUN_MOVES) / 40; // the Sun's orbit angle, frozen once it starts to move
  const earthAng = frozen + (Math.max(0, f - MOTION) / 32) * ease(f, MOTION - 2, MOTION + 14);
  const sunOrbit = { x: cx + Math.cos(frozen) * R, y: cy + Math.sin(frozen) * R * 0.42 };
  const earthOrbit = { x: cx + Math.cos(earthAng) * R, y: cy + Math.sin(earthAng) * R * 0.42 };
  const sunPos = { x: sunOrbit.x + (cx - sunOrbit.x) * swap, y: sunOrbit.y + (cy - sunOrbit.y) * swap };
  const earthPos = { x: cx + (earthOrbit.x - cx) * swap, y: cy + (earthOrbit.y - cy) * swap };
  const moving = ease(f, MOTION - 2, MOTION + 12);
  return (
    <svg width={720} height={600} viewBox="0 0 720 600">
      {[[60, 80], [640, 60], [120, 470], [610, 450], [360, 40], [40, 300], [680, 260], [250, 520]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + (i % 3)} fill="#e9e1cf" opacity={ease(f, SKY + i * 2, SKY + i * 2 + 8) * (0.5 + 0.5 * Math.sin(f / 6 + i))} />
      ))}
      <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.42} fill="none" stroke={moving > 0.05 ? '#5a8fd6' : DL.border} strokeWidth={3} strokeDasharray="8 10" strokeDashoffset={-f * 1.5 * moving} />
      <circle cx={sunPos.x} cy={sunPos.y} r={50} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 22px ${SUN.rim})` }} />
      <circle cx={earthPos.x} cy={earthPos.y} r={24} fill="#2f7fd6" />
      <text x={cx} y={560} textAnchor="middle" fill={swap > 0.5 ? SUN.mid : DL.dim} fontFamily={DL_MONO} fontSize={26} letterSpacing={4}>{swap > 0.5 ? 'COPERNICUS · SUN AT THE CENTRE' : 'PTOLEMY · EARTH AT THE CENTRE'}</text>
    </svg>
  );
};

const DayNightIcon: React.FC = () => (
  <svg width={56} height={56} viewBox="0 0 56 56">
    <path d="M4 28 A24 24 0 0 0 52 28 Z" fill={SUN.mid} />
    <path d="M4 28 A24 24 0 0 1 52 28 Z" fill={NIGHT_BLUE} opacity={0.7} />
  </svg>
);

const Su1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const street = win(f, DOCK + 6, DID - 2) + win(f, DOORS, FAR + 2, 8, 10);
  const dusk = ease(f, MIDSUMMER - 4, MIDSUMMER + 20) * (1 - ease(f, FAR - 8, FAR + 2));
  const smoke = ease(f, SMOKE - 4, SMOKE + 16) * win(f, DOCK + 6, DID - 2);
  const sunLift = win(f, SO - 6, SIMPLE + 2, 6, 3); // fully gone 1 frame after the cut (? held 45 f)
  const sunY = 700 - 380 * ease(f, SO - 6, SIMPLE + 30, 0, 1, DL_EASE.out);
  const clock = win(f, SIMPLE + 4, DOORS, 3, 8); // cut on "Simple.": the clock starts as the Sun clears
  const doorChips = win(f, BIRCH + 1, WRITER, 1, 10);
  const quote = win(f, WRITER - 2, FAR + 2);
  const orbit = ease(f, FAR - 4, FAR + 8);
  const cardsOut = 1 - ease(f, WITHIN - 2, WITHIN + 8);
  const scope = ease(f, INSTRUMENT, INSTRUMENT + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, WITHIN - 2, WITHIN + 8));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1206" />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, #2a1838 0%, #1a0f1c55 45%, transparent 75%)', opacity: dusk * 0.8 }} />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1500" idx={1} label={f >= FAR ? 'FAR AWAY' : 'LONDON'} dockAt={DOCK} />
        <WakePlace place="London" at={LONDON} dockAt={DOCK} yearAt={C.at('fifteen', 1)} />
        <div style={{ position: 'absolute', left: 160, top: 470, opacity: Math.min(1, street) }}><Street f={f} /></div>
        {/* wood smoke drifts across the street on "smoke" */}
        <AbsoluteFill style={{ opacity: smoke }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * (1.2 + i * 0.4) + i * 600) % 2300) - 500, top: 520 + i * 90, width: 760, height: 110, borderRadius: '50%', background: 'radial-gradient(ellipse, #b9b1a433, transparent 70%)' }} />)}
        </AbsoluteFill>
        <div style={{ position: 'absolute', left: 160, top: 200, opacity: win(f, MIDSUMMER, DID - 2) }}>
          <SunChip text="MIDSUMMER EVE" at={MIDSUMMER + 1} color={SUN.mid} />
        </div>

        {/* "So what is the Sun to you?" — the Sun lifts; a big ? fades in behind it (motion continues) */}
        <AbsoluteFill style={{ opacity: sunLift }}>
          <div style={{ position: 'absolute', left: 1120, top: 130, width: 520, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 640, lineHeight: 1, color: SUN.mid, opacity: 0.68 * ease(f, WHAT_Q, WHAT_Q + 10), transform: `scale(${ease(f, WHAT_Q, WHAT_Q + 18, 0.85, 1)})`, textShadow: `0 0 40px ${SUN.rim}66` }}>?</div>
          <div style={{ position: 'absolute', left: 960 - 216, top: sunY - 216 }}><SunDisc size={240} id="liftSun" /></div>
          <div style={{ position: 'absolute', left: 160, right: 160, top: 760, height: 3, background: `linear-gradient(90deg, transparent, ${SUN.rim}, transparent)` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 763, height: 180, background: 'linear-gradient(180deg, #1a0e08, transparent)' }} />
        </AbsoluteFill>

        {/* "Simple." — the Day Clock: day & night */}
        <div style={{ position: 'absolute', left: 160, top: 230, opacity: clock }}><SplitClock f={f} /></div>
        <div style={{ position: 'absolute', left: 690, top: 340, opacity: clock }}><ClockLegend f={f} /></div>
        <AbsoluteFill style={{ opacity: ease(f, NIGHT, NIGHT + 6) }}><HowWeSawIt text="DAY & NIGHT" at={NIGHT} dockAt={CHIP_DOCK} slot={0} left={160} top={760} icon={<DayNightIcon />} /></AbsoluteFill>
        <div style={{ position: 'absolute', left: 690, top: 200, opacity: win(f, NOBODY + 1, BIRCH, 1, 10) }}>
          <SunChip text="TONIGHT · NOBODY SLEEPS" at={NOBODY + 1} color={DL.red} size={34} />
        </div>

        {/* the doors, the lamps, the tables */}
        <div style={{ position: 'absolute', left: 160, top: 200, display: 'flex', gap: 18, flexWrap: 'wrap', width: 1240, opacity: doorChips }}>
          <SunChip text="GREEN BIRCH" at={BIRCH + 1} color="#4caf50" size={26} />
          <SunChip text="FLOWERS · ST JOHN'S WORT" at={FLOWERS + 1} color="#ffd23f" size={26} />
          <div style={{ display: 'flex' }}><SunChip text="GLASS LAMPS" at={LAMPS + 1} color={SUN.mid} size={26} /><span style={{ opacity: ease(f, ALL, ALL + 6), alignSelf: 'center', marginLeft: 12, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: SUN.mid }}>· ALL NIGHT</span></div>
          <div style={{ display: 'flex' }}><SunChip text="BREAD" at={BREAD + 1} color={DL.warm} size={26} /><span style={{ opacity: ease(f, DRINK, DRINK + 6), alignSelf: 'center', marginLeft: 12, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.warm }}>& DRINK</span></div>
        </div>
        {/* "Why?" — a question mark over the middle bonfire */}
        <div style={{ position: 'absolute', left: 160 + BONFIRE_X[1] - 80, top: 500, width: 160, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 220, lineHeight: 1, color: DL.text, textShadow: `0 0 40px ${FIRE_ORANGE}`, opacity: win(f, WHY, FAR + 2, 2, 10), transform: `scale(${ease(f, WHY, WHY + 8, 1.3, 1)})` }}>?</div>
        <div style={{ position: 'absolute', left: 160, top: 190, width: 1100, padding: '22px 36px', borderRadius: 16, background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${DL.gold}`, opacity: quote, transform: `translateY(${ease(f, WRITER - 4, WRITER + 10, 20, 0)}px)` }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>A LONDON WRITER<span style={{ opacity: ease(f, STOW, STOW + 6), color: DL.text }}> · JOHN STOW</span><span style={{ opacity: ease(f, WROTE, WROTE + 6) }}> · A SURVEY OF LONDON (1598)</span></div>
          <div style={{ marginTop: 14 * ease(f, WROTE, WROTE + 10), maxHeight: ease(f, WROTE, WROTE + 12, 0, 200), overflow: 'hidden', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, lineHeight: 1.2, color: DL.text }}>
            <span style={{ opacity: ease(f, WROTE, WROTE + 8) }}>“…the virtue that</span><span style={{ opacity: ease(f, GREAT, GREAT + 8) }}> a great fire hath</span>
            <span style={{ opacity: ease(f, PURGE, PURGE + 8), color: DL.gold }}> to purge</span><span style={{ opacity: ease(f, C.at('infection'), C.at('infection') + 8), color: DL.gold }}> the infection of the air.”</span>
          </div>
        </div>

        {/* what changed: the model of the heavens */}
        <div style={{ position: 'absolute', left: 160, top: 190, opacity: orbit }}><Orbits f={f} /></div>
        <div style={{ position: 'absolute', left: 900, top: 520, width: 860, display: 'flex', flexDirection: 'column', gap: 26, opacity: orbit * cardsOut }}>
          <div style={{ ...rise(f, ASTRONOMER), padding: '24px 30px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>A YOUNG POLISH ASTRONOMER</div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.gold, marginTop: 8, opacity: ease(f, COPERNICUS, COPERNICUS + 8) }}>Nicolaus Copernicus</div>
          </div>
          <div style={{ ...rise(f, FORTY), padding: '24px 30px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${SUN.mid}`, borderRadius: 14 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>1543 · NUREMBERG<span style={{ opacity: ease(f, DIES, DIES + 6) }}> · THE YEAR HE DIES</span></div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.text, marginTop: 8, opacity: ease(f, BOOK, BOOK + 8) }}>De revolutionibus</div>
          </div>
        </div>
        {/* the new instrument: a telescope silhouette on "instrument" (above the band) */}
        <svg width={260} height={120} viewBox="0 0 260 120" style={{ position: 'absolute', left: 1240, top: 580, opacity: scope, transform: `rotate(${-18 * scope}deg)` }}>
          <rect x={20} y={46} width={200} height={26} rx={6} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          <rect x={214} y={40} width={30} height={38} rx={4} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          <line x1={110} y1={72} x2={80} y2={118} stroke={DL.gold} strokeWidth={4} />
          <line x1={110} y1={72} x2={140} y2={118} stroke={DL.gold} strokeWidth={4} />
        </svg>

        <ArcLadder rungs={[{ year: '1500', label: 'DAY & NIGHT', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={SO}>
          <span style={{ opacity: ease(f, C.at('almost'), C.at('almost') + 6) }}>almost everyone</span><span style={{ opacity: ease(f, C.at('you’ll'), C.at('you’ll') + 6) }}> you’ll ever meet</span><span style={{ opacity: ease(f, BELIEVES, BELIEVES + 6) }}> believes</span> <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}><span style={{ opacity: ease(f, C.at('Sun', 1), C.at('Sun', 1) + 6) }}>the Sun goes</span><span style={{ opacity: ease(f, AROUND, AROUND + 6) }}> around</span><span style={{ opacity: ease(f, C.at('Earth', 1), C.at('Earth', 1) + 6) }}> the Earth.</span></span>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: '#b8bce0', opacity: ease(f, PTOLEMY, PTOLEMY + 8) }}>TAUGHT BY PTOLEMY<span style={{ opacity: ease(f, FOURTEEN, FOURTEEN + 6) }}> · ~1,400 YEARS EARLIER</span></div>
          <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: '#c8cdf0', opacity: ease(f, FOURTEEN, FOURTEEN + 8) }}>Ptolemy, Almagest (c. AD 150) — the standard model for about 1,400 years</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1610" parts={[{ text: 'Within seventy years,', at: WITHIN }, { text: 'a new instrument', at: INSTRUMENT }, { text: 'will show you', at: SHOW }, { text: 'something shocking.', at: SHOCKING }, { text: 'The Sun isn’t', at: SUN_ISNT }, { text: 'perfect.', at: PERFECT }]} />
      <EpisodeHud year={1500} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1500;
