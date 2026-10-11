import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, win, SUN, CardSource, OnWord, HowWeSawIt, ArcLadder, pastRungs, LADDER_DOCK, SunCliffhanger } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 9/14 — ERA 5: 1928, an American beach (RESEARCH F8, F9, F12, A4). v2 re-key.
// Umbrellas pop on "crowded", place on "beach", heat shimmer on "Hot", the beach opens to the sea on
// "Salt" (header docks, past-rung ladder), sunbathers lie down from "everyone's", ON PURPOSE on "Sun," (… on purpose), kept above the card's dim layer until DID+16.
// DYK card (Chanel myth) clause by clause, Segrave on "myth". Magazine + 1971 stamp, "work.". Jobs move
// indoors → BEFORE: A TAN = THE FIELDS (struck) → NOW: A TAN = A DAY OFF on "day".
// Photosynthesis: basket lid on "basket", bread / apple on their words, 1893 chip on "ninety", the word
// slams on "Photosynthesis.", leaf diagram (catch / sugar), food chain from "nearly", gold on "stored" /
// "you", TO MEASURE rung pulses on "measure", HOW WE SAW IT: EVERY MEAL on "meal." → docks.
// Bell Labs 1954 (cell, ≈ 6 %). Cliffhanger: a single solar cell sprouts in a furrow on "harvest". VO su08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su1900', durationInSeconds: 63.5333, fps: 30, width: 1920, height: 1080 };
const DUR = 1906;

const C = makeCue(vo, 'su08-1900', 0.8);
const YEAR = C.at('nineteen', 1);
const CROWDED = C.at('crowded');
const BEACH = C.at('beach');
const HOT = C.at('Hot');
const SALT = C.at('Salt');
const DOCK = SALT + 2; // header docks as the beach opens to the sea
const EVERYONE = C.at("everyone's");
const SUN1 = C.at('Sun', 1); // 'lying in the Sun, on purpose' — ON PURPOSE lands here so it reads ≥ 1.5 s before the card
const DID = C.at('Did');
const FAMOUS = C.at('famous');
const COCO = C.at('Coco');
const SUNTAN = C.at('suntan');
const PROBABLY = C.at('probably');
const MYTH = C.at('myth');
const HISTORIAN = C.at('historian');
const UNSIGNED = C.at('unsigned');
const MAGAZINE = C.at('magazine');
const SEVENTY = C.at('seventy');
const REAL = C.at('real');
const WORK = C.at('work');
const JOBS = C.at('Jobs');
const INDOORS = C.at('indoors');
const TAN = C.at('tan');
const FIELDS = C.at('fields');
const DAY = C.at('day');
const NOW1 = C.at('Now', 1); // 'Now look in your picnic basket' (2 = 'Now, it's the source')
const PICNIC = C.at('picnic'); // the lunch scene takes over on "picnic" so A DAY OFF holds >= 1.5 s (voice audit 2026-10-12)
const BASKET = C.at('basket');
const BREAD = C.at('Bread');
const APPLE = C.at('apple');
const PROCESS = C.at('process');
const NAME = C.at('name');
const NINETY = C.at('ninety');
const PHOTO = C.at('Photosynthesis');
const LEAVES = C.at('Leaves');
const CATCH = C.at('catch');
const SUGAR = C.at('sugar');
const NEARLY = C.at('nearly');
const RUNS_ON = C.at('that', 4); // 'runs on that.' (1 know that, 2 that Coco, 3 process that, 5 learned that)
const STORED = C.at('stored');
const SO = C.at('So', 2); // 'So, in a way' (1 = 'so a tan stopped')
const YOU = C.at('you', 3); // 'are you.' (1 = 'You wake up', 2 = 'Did you know')
const SUN2 = C.at('Sun', 2); // 'The Sun used to be' (1 = 'lying in the Sun')
const MEASURE = C.at('measure');
const NOW2 = C.at('Now', 2);
const MEAL = C.at('meal');
const THEN = C.at('Then');
const FOUR = C.at('four');
const BELL = C.at('Bell');
const LABS = C.at('Laboratories');
const CHIP_DOCK = LABS + 12; // EVERY MEAL holds 3.2 s, then flies into ladder slot 4
const SILICON = C.at('silicon');
const SIX = C.at('six');
const OF_SUNLIGHT = C.at('sunlight', 3); // 'of sunlight' (1 catch, 2 stored, 4 live on)
const ELECTRICITY = C.at('electricity');
const LEARNED = C.at('learned');
const LIVE = C.at('live');
const NEXT = C.at('Next');
const HARVEST = C.at('harvest');
const STEP = 12;

// rung geometry inside the docked ladder (ArcLadder: kicker + 8, rows bottom → top)
const rungTop = (slot: number) => LADDER_DOCK.top + LADDER_DOCK.kick + 8 + (6 - slot) * (LADDER_DOCK.rungH + LADDER_DOCK.gap);

// ── the beach. viewBox crops to y 100–480; placed at top 500 so absolute y = svg y + 400 (clear of the ladder box)
const UMBRELLAS = [300, 860, 1400];
const SUNBATHERS = [180, 620, 1180];
const TOWELS = ['#e74c3c', '#38bdf8', '#34d058'];
const Beach: React.FC<{ f: number }> = ({ f }) => {
  const heat = ease(f, HOT - 2, HOT + 10);
  const wave = ease(f, SALT, SALT + 26, 0, 1, DL_EASE.inOut);
  return (
    <svg width={1600} height={380} viewBox="0 100 1600 380">
      <rect x={0} y={100} width={1600} height={130} fill="#1d4f73" opacity={0.55} />
      {[0, 1, 2].map((i) => <path key={i} d={`M0 ${200 + i * 8} Q400 ${192 + i * 8 + Math.sin(f / 15 + i) * 6} 800 ${200 + i * 8} T1600 ${200 + i * 8}`} stroke="#bfe8ff" strokeWidth={2} fill="none" opacity={0.4} />)}
      {/* "Salt air." a foam line rolls in across the sea */}
      <path d={`M${-1600 + 1600 * wave} 222 Q${-1200 + 1600 * wave} 206 ${-800 + 1600 * wave} 222 T${1600 * wave} 222`} stroke="#f4fbff" strokeWidth={6} fill="none" opacity={0.8 * (1 - ease(f, SALT + 30, SALT + 50))} />
      <rect x={0} y={230} width={1600} height={250} fill="#c9a66b" opacity={0.55 + 0.2 * heat} />
      {/* "Hot sand." heat shimmer */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${120 + i * 250} 470 q 12 -20 0 -40 q -12 -20 0 -40 q 12 -20 0 -40`} transform={`translate(0 ${-((f * 0.8 + i * 13) % 30)})`} stroke="#fff3c4" strokeWidth={3} fill="none" opacity={0.45 * heat} />
      ))}
      {UMBRELLAS.map((x, i) => {
        const a = CROWDED + i * STEP;
        return (
          <g key={x} opacity={ease(f, a, a + 6)} transform={`translate(${x} ${450}) scale(${ease(f, a, a + 8, 0.6, 1)}) translate(${-x} ${-450})`}>
            <line x1={x} y1={350} x2={x} y2={450} stroke="#f4ede4" strokeWidth={5} />
            <path d={`M${x - 85} 362 Q${x} 292 ${x + 85} 362 Z`} fill={i === 1 ? '#e74c3c' : '#f4ede4'} />
          </g>
        );
      })}
      {SUNBATHERS.map((x, i) => {
        const a = EVERYONE + i * STEP;
        const lie = ease(f, a, a + 10, 0, 1, DL_EASE.inOut);
        return (
          <g key={x} opacity={ease(f, a - 2, a + 4)}>
            <rect x={x - 70} y={404} width={170} height={34} rx={6} fill={TOWELS[i]} opacity={0.85} />
            {/* the body tips from standing to lying, pivoting at the feet */}
            <g transform={`rotate(${90 * (1 - lie)} ${x + 86} ${420})`}>
              <circle cx={x - 42} cy={418} r={16} fill="#c98a5a" />
              <rect x={x - 26} y={410} width={112} height={18} rx={9} fill="#c98a5a" />
            </g>
          </g>
        );
      })}
    </svg>
  );
};

// ── picnic basket (svg 420 × 340): lid opens on "basket", bread / apple rise on their words, gold on "stored"
const Basket: React.FC<{ f: number }> = ({ f }) => {
  const lid = ease(f, BASKET - 2, BASKET + 12, 0, 1, DL_EASE.inOut);
  const gold = ease(f, STORED - 2, STORED + 12) * (0.85 + 0.15 * Math.sin((f - STORED) / 6));
  const glow = gold > 0.01 ? `drop-shadow(0 0 ${18 * gold}px ${SUN.mid})` : undefined;
  return (
    <svg width={420} height={340} viewBox="0 0 420 340" style={{ overflow: 'visible' }}>
      <g style={{ filter: glow }}>
        <g opacity={ease(f, BREAD - 2, BREAD + 6)} transform={`translate(0 ${ease(f, BREAD - 2, BREAD + 12, 70, 0)})`}>
          <path d="M80 150 Q80 92 160 92 Q240 92 240 150 Z" fill="#d9a35b" />
          <path d="M80 150 Q80 92 160 92 Q240 92 240 150 Z" fill={SUN.mid} opacity={0.75 * gold} />
          {[120, 160, 200].map((x) => <path key={x} d={`M${x - 12} 112 l 18 16`} stroke="#8a5a2b" strokeWidth={4} />)}
        </g>
        <g opacity={ease(f, APPLE - 2, APPLE + 6)} transform={`translate(0 ${ease(f, APPLE - 2, APPLE + 12, 70, 0)})`}>
          <circle cx={300} cy={124} r={34} fill="#e74c3c" />
          <circle cx={300} cy={124} r={34} fill={SUN.mid} opacity={0.75 * gold} />
          <path d="M300 92 q 6 -16 20 -18 q -4 14 -20 18" fill="#34c759" />
        </g>
      </g>
      <path d="M40 170 H380 L350 320 H70 Z" fill="#8a5a2b" />
      {[200, 230, 260, 290].map((y) => <line key={y} x1={48} y1={y} x2={372} y2={y} stroke="#5e3b1b" strokeWidth={4} />)}
      <path d="M120 170 Q210 60 300 170" stroke="#5e3b1b" strokeWidth={10} fill="none" opacity={1 - lid} />
      {/* the lid lifts off and fades (stays inside the margin) */}
      <g opacity={1 - ease(f, BASKET + 6, BASKET + 14)} transform={`translate(0 ${-70 * lid}) rotate(${-14 * lid} 210 170)`}>
        <rect x={36} y={156} width={348} height={22} rx={6} fill="#a06a35" />
      </g>
    </svg>
  );
};

// ── leaf diagram (svg 760 × 420 at x 600, y 280): sun arrows in on "catch", sugar hexagon out on "sugar"
const LeafDiagram: React.FC<{ f: number }> = ({ f }) => {
  const arrows = ease(f, CATCH - 2, CATCH + 14);
  const sugar = ease(f, SUGAR - 2, SUGAR + 10);
  const hex = (cx: number, cy: number, r: number) => Array.from({ length: 6 }, (_, k) => `${cx + r * Math.cos(Math.PI / 6 + (k * Math.PI) / 3)},${cy + r * Math.sin(Math.PI / 6 + (k * Math.PI) / 3)}`).join(' ');
  return (
    <svg width={760} height={420} viewBox="0 0 760 420">
      <circle cx={90} cy={80} r={44} fill={SUN.mid} style={{ filter: `drop-shadow(0 0 18px ${SUN.rim})` }} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={140} y1={90 + k * 34} x2={140 + 160 * arrows} y2={110 + k * 40 + 40 * arrows} stroke={SUN.mid} strokeWidth={6} strokeLinecap="round" opacity={arrows} markerEnd="url(#su19-arrow)" />
      ))}
      <defs>
        <marker id="su19-arrow" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill={SUN.mid} /></marker>
        <marker id="su19-arrow-g" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#34c759" /></marker>
      </defs>
      <text x={6} y={182} fill={SUN.mid} fontFamily={DL_MONO} fontSize={24} letterSpacing={3} opacity={arrows}>SUNLIGHT</text>
      <path d="M380 340 V230" stroke="#2f9e5a" strokeWidth={10} />
      <path d="M380 240 Q270 230 280 120 Q400 110 390 230 Z" fill="#34c759" />
      <path d="M380 236 L320 150" stroke="#2f9e5a" strokeWidth={4} />
      <line x1={410} y1={190} x2={410 + 140 * sugar} y2={190} stroke="#34c759" strokeWidth={6} strokeLinecap="round" opacity={sugar} markerEnd="url(#su19-arrow-g)" />
      <g opacity={sugar} transform={`translate(650 190) scale(${ease(f, SUGAR - 2, SUGAR + 10, 0.6, 1)}) translate(-650 -190)`}>
        <polygon points={hex(650, 190, 54)} fill="#1a1406" stroke={SUN.mid} strokeWidth={5} />
        <text x={650} y={198} textAnchor="middle" fill={SUN.core} fontFamily={DL_MONO} fontSize={26}>C₆</text>
        <text x={650} y={290} textAnchor="middle" fill={SUN.mid} fontFamily={DL_MONO} fontSize={26} letterSpacing={3}>SUGAR</text>
      </g>
    </svg>
  );
};

// ── food chain (absolute svg 1920 × 1080): leaf → grass → cow → person, one step per 12 frames from "nearly";
// the person steps forward on "So," and fills gold on "you."
const FoodChain: React.FC<{ f: number }> = ({ f }) => {
  const st = (i: number) => ease(f, NEARLY + i * STEP, NEARLY + i * STEP + 8);
  const fill = ease(f, YOU - 2, YOU + 14);
  const pick = ease(f, SO - 2, SO + 10);
  const sGrow = 1 + 0.18 * pick + 0.04 * fill * Math.sin((f - YOU) / 7);
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
      <defs><marker id="su19-chain" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill={DL.warm} /></marker></defs>
      <path d="M980 640 Q 900 720 800 760" stroke={DL.warm} strokeWidth={4} fill="none" strokeDasharray="200" strokeDashoffset={200 * (1 - st(0))} markerEnd={st(0) > 0.9 ? 'url(#su19-chain)' : undefined} />
      <g opacity={st(0)}>{[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${730 + k * 14} 850 q ${-6 + k * 3} -40 ${4 - k * 2} -70`} stroke="#34c759" strokeWidth={6} fill="none" />)}</g>
      <line x1={830} y1={810} x2={830 + 110 * st(1)} y2={810} stroke={DL.warm} strokeWidth={4} opacity={st(1)} markerEnd="url(#su19-chain)" />
      <g opacity={st(1)} transform="translate(960 770)">
        <rect x={0} y={10} width={120} height={56} rx={22} fill="#e9e1cf" />
        <circle cx={128} cy={14} r={22} fill="#e9e1cf" />
        <circle cx={40} cy={34} r={10} fill="#3a2a1c" /><circle cx={80} cy={46} r={8} fill="#3a2a1c" />
        {[12, 34, 86, 108].map((x) => <rect key={x} x={x} y={60} width={10} height={30} fill="#e9e1cf" />)}
      </g>
      <line x1={1110} y1={810} x2={1110 + 110 * st(2)} y2={810} stroke={DL.warm} strokeWidth={4} opacity={st(2)} markerEnd="url(#su19-chain)" />
      <g opacity={st(2)} transform={`translate(1290 860) scale(${sGrow}) translate(-1290 -860)`}>
        <circle cx={1290} cy={720} r={24} fill={fill > 0.01 ? SUN.mid : 'none'} fillOpacity={fill} stroke={fill > 0.5 ? SUN.mid : DL.warm} strokeWidth={4} />
        <path d="M1250 860 C1250 790 1264 760 1290 760 C1316 760 1330 790 1330 860 Z" fill={SUN.mid} fillOpacity={fill} stroke={fill > 0.5 ? SUN.mid : DL.warm} strokeWidth={4} style={{ filter: fill > 0.05 ? `drop-shadow(0 0 ${20 * fill}px ${SUN.mid})` : undefined }} />
      </g>
      {/* "runs on that.": a pulse of sunlight runs leaf → grass → cow → person */}
      <circle cx={interpolate(f, [RUNS_ON, RUNS_ON + 8, RUNS_ON + 16, RUNS_ON + 24, RUNS_ON + 32], [980, 800, 960, 1110, 1270], DCLAMP)} cy={interpolate(f, [RUNS_ON, RUNS_ON + 8, RUNS_ON + 16, RUNS_ON + 24, RUNS_ON + 32], [640, 770, 800, 800, 790], DCLAMP)} r={14} fill={SUN.core} opacity={ease(f, RUNS_ON - 2, RUNS_ON + 2) * (1 - ease(f, RUNS_ON + 30, RUNS_ON + 38))} style={{ filter: `drop-shadow(0 0 14px ${SUN.mid})` }} />
    </svg>
  );
};

// ── "The Sun used to be something to measure. Now, it's the source of every meal.": sunlight flows along the chain
// from "Sun" (2), a ruler measures the diagram's Sun on "measure", then rays fan from it to the food and the person on "Now,"
const MealRays: React.FC<{ f: number }> = ({ f }) => {
  const flow = ease(f, SUN2 - 2, SUN2 + 10);
  const ruler = ease(f, MEASURE - 2, MEASURE + 10) * (1 - ease(f, NOW2 - 2, NOW2 + 8));
  const fan = ease(f, NOW2 - 2, NOW2 + 16);
  const targets: [number, number][] = [[340, 640], [480, 650], [1290, 730]];
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d="M690 360 L980 560 L800 770 L960 800 L1110 810 L1270 790" stroke={SUN.mid} strokeWidth={5} fill="none" strokeDasharray="10 22" strokeDashoffset={-f * 3} opacity={0.75 * flow} />
      <g opacity={ruler} transform={`translate(${ease(f, MEASURE - 2, MEASURE + 14, -60, 0)} 0)`}>
        <rect x={610} y={346} width={160} height={30} rx={4} fill="#e9e1cf" opacity={0.92} />
        {Array.from({ length: 9 }, (_, k) => <line key={k} x1={622 + k * 17} y1={346} x2={622 + k * 17} y2={k % 2 ? 358 : 366} stroke="#3a2a1c" strokeWidth={3} />)}
      </g>
      {targets.map(([x, y], i) => (
        <line key={i} x1={690} y1={360} x2={690 + (x - 690) * fan} y2={360 + (y - 360) * fan} stroke={SUN.core} strokeWidth={6} strokeLinecap="round" opacity={0.85 * fan} style={{ filter: `drop-shadow(0 0 10px ${SUN.mid})` }} />
      ))}
    </svg>
  );
};

const Su1900: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const open = ease(f, DOCK, DOCK + 16, 0, 1, DL_EASE.inOut); // beach clip opens upward to the sea
  const beach = ease(f, CROWDED - 4, CROWDED + 4) * (1 - ease(f, DID + 12, DID + 28)); // crossfades under the card (no dip)
  const myth = win(f, HISTORIAN + 22, JOBS, 4);
  const jobs = win(f, JOBS, PICNIC, 6);
  const photo = win(f, PICNIC, THEN, 8);
  const held = 1 - 0.6 * ease(f, PHOTO - 2, PHOTO + 6) * (1 - ease(f, LEAVES, LEAVES + 12)); // breath held on the word
  const lift = ease(f, LEAVES, LEAVES + 16, 0, 1, DL_EASE.inOut);
  const bell = win(f, THEN, NEXT, 8);
  const glowCell = ease(f, ELECTRICITY - 2, ELECTRICITY + 10) * (0.8 + 0.2 * Math.sin(f / 5));
  // ladder windows: (a) past rungs from the header dock until the DYK card · (b) from "The Sun used to be…" until the band
  const ladA = win(f, DOCK + 26, DID - 2, 12, 10); // in once the header has docked
  const ladB = win(f, SUN2 + 10, LEARNED + 8, 10, 10);
  const pulse = ease(f, MEASURE - 2, MEASURE + 8) * (1 - ease(f, NOW2, NOW2 + 16)) * (0.75 + 0.25 * Math.sin((f - MEASURE) / 4));
  const slot4 = ease(f, NOW2 - 2, NOW2 + 8) * (1 - ease(f, CHIP_DOCK + 8, CHIP_DOCK + 14));
  const furrow = ease(f, NEXT - 2, NEXT + 24);
  const sprout = ease(f, HARVEST - 2, HARVEST + 12, 0, 1, DL_EASE.out);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#22160a" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1928" idx={5} label={f < JOBS - 4 ? 'THE BEACH' : f < PICNIC - 4 ? 'THE OFFICE' : f < THEN - 4 ? 'YOUR LUNCH' : f < BELL - 4 ? '' : 'BELL LABS'} dockAt={DOCK} />
        <WakePlace place="American beach" at={BEACH} dockAt={DOCK} yearAt={YEAR} />

        {/* the beach: a strip under the header (umbrellas, shimmer), opening to the sea as the header docks */}
        <AbsoluteFill style={{ opacity: beach }}>
          <div style={{ position: 'absolute', left: 160, top: 500, clipPath: `inset(${212 * (1 - open)}px 0 0 0)` }}><Beach f={f} /></div>
          <div style={{ position: 'absolute', left: 1200 - 99, top: 300 - 99, opacity: open }}><SunDisc size={110} id="beachSun" /></div>
        </AbsoluteFill>

        {/* a historian, a 1971 magazine, and the real reason */}
        <AbsoluteFill style={{ opacity: myth }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', gap: 60, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 420, height: 520, borderRadius: 8, background: '#e9e1cf', padding: 30, boxSizing: 'border-box', opacity: ease(f, HISTORIAN + 18, HISTORIAN + 26), transform: `translateX(${ease(f, HISTORIAN + 18, HISTORIAN + 34, -140, 0)}px) rotate(${-4 + 4 * ease(f, MAGAZINE, MAGAZINE + 20)}deg)` }}>
              <div style={{ fontFamily: DL_SERIF, fontSize: 46, color: '#3a2a1c', fontStyle: 'italic' }}>Magazine</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 24, color: '#5a4a3a', marginTop: 6 }}>MAY</div>
              <div style={{ position: 'absolute', right: 26, top: 24, padding: '6px 14px', border: `3px solid ${DL.red}`, borderRadius: 8, fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: DL.red, transform: `rotate(8deg) scale(${ease(f, SEVENTY, SEVENTY + 8, 1.4, 1)})`, opacity: ease(f, SEVENTY - 1, SEVENTY + 5) }}>1971</div>
              {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ height: 10, marginTop: 18, width: `${70 + ((i * 37) % 30)}%`, background: '#a99a86' }} />)}
              <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 24, color: DL.red, opacity: ease(f, UNSIGNED - 2, UNSIGNED + 8) }}>NO BYLINE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 900 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>A HISTORIAN TRACED THE STORY TO</div>
              <SunChip text="AN UNSIGNED MAGAZINE ARTICLE" at={MAGAZINE} color={DL.dim} size={28} />
              <div style={{ ...rise(f, REAL - 2), fontFamily: DL_SERIF, fontSize: 72, color: DL.text }}>The real reason: <span style={{ color: SUN.mid, fontStyle: 'italic', opacity: ease(f, WORK - 2, WORK + 6) }}>work.</span></div>
            </div>
          </div>
        </AbsoluteFill>

        {/* jobs move indoors → a tan stops meaning the fields → it means a day off */}
        <AbsoluteFill style={{ opacity: jobs }}>
          <svg width={420} height={560} viewBox="0 0 420 560" style={{ position: 'absolute', left: 160, top: 280 }}>
            <rect x={40} y={60} width={340} height={480} fill="#26201d" stroke={DL.border} strokeWidth={3} />
            <rect x={150} y={20} width={120} height={40} fill="#26201d" />
            {Array.from({ length: 6 }, (_, r) => [0, 1, 2, 3].map((c) => (
              <rect key={`${r}-${c}`} x={70 + c * 76} y={90 + r * 70} width={50} height={40} fill={SUN.core} opacity={0.15 + 0.6 * ease(f, JOBS + r * 3, JOBS + r * 3 + 6)} />
            )))}
            <rect x={175} y={470} width={70} height={70} fill="#120e0c" />
          </svg>
          <div style={{ position: 'absolute', left: 700, top: 300, width: 1060, display: 'flex', flexDirection: 'column', gap: 40 }}>
            <SunChip text="JOBS MOVE INDOORS" at={INDOORS} color={DL.dim} />
            <div style={{ ...rise(f, TAN - 2), alignSelf: 'flex-start', padding: '16px 26px', borderRadius: 10, background: DL.panel, border: `1px solid ${DL.border}`, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 3, color: DL.dim }}>
              BEFORE: A TAN = <span style={{ position: 'relative', color: DL.text, opacity: ease(f, FIELDS - 2, FIELDS + 6) }}>THE FIELDS
                <span style={{ position: 'absolute', left: -6, top: '50%', height: 4, width: `${108 * ease(f, FIELDS + 4, FIELDS + 14)}%`, background: DL.red }} />
              </span>
            </div>
            <div style={{ ...rise(f, DAY - 2), alignSelf: 'flex-start', padding: '20px 30px', borderRadius: 12, background: '#1a1406f2', border: `2px solid ${SUN.mid}`, boxShadow: `0 0 30px ${SUN.mid}44` }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: SUN.mid }}>NOW: A TAN =</div>
              <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 84, lineHeight: 1, color: DL.text }}>a day off</div>
            </div>
          </div>
        </AbsoluteFill>

        {/* photosynthesis: the "every meal" rung */}
        <AbsoluteFill style={{ opacity: photo }}>
          <div style={{ position: 'absolute', left: 180, top: 540, opacity: held }}><Basket f={f} /></div>
          {/* "The process that made them": a dashed ring around the food */}
          <div style={{ position: 'absolute', left: 240, top: 610, width: 300, height: 150, borderRadius: 24, border: `3px dashed ${DL.gold}`, opacity: held * ease(f, PROCESS - 2, PROCESS + 8) * (1 - ease(f, PHOTO - 8, PHOTO)) }} />
          <div style={{ position: 'absolute', left: 180, top: 470, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: SUN.mid, ...rise(f, STORED - 2) }}>STORED SUNLIGHT</div>
          {/* "got its name": a blank tag, then the year on "ninety" */}
          <div style={{ position: 'absolute', left: 160, top: 250, opacity: held * (1 - ease(f, LEAVES - 2, LEAVES + 6)) }}>
            <div style={{ position: 'absolute', left: 0, top: 0, padding: '14px 26px', border: `2px dashed ${DL.dim}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.dim, whiteSpace: 'nowrap', opacity: ease(f, NAME - 2, NAME + 6) * (1 - ease(f, NINETY - 2, NINETY + 4)) }}>ITS NAME: ?</div>
            <div style={{ position: 'absolute', left: 0, top: 0 }}><SunChip text="1893 · THE WORD IS COINED" at={NINETY} color={DL.gold} /></div>
          </div>
          <div style={{ position: 'absolute', left: 600, top: 280, opacity: ease(f, LEAVES + 6, LEAVES + 16) }}><LeafDiagram f={f} /></div>
          <FoodChain f={f} />
          <MealRays f={f} />
          {/* "Photosynthesis." slams centre, holds through the breath, then lifts to a title */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', opacity: ease(f, PHOTO - 1, PHOTO + 4), transform: `translateY(${-232 * lift}px) scale(${ease(f, PHOTO, PHOTO + 8, 1.35, 1) * (1 - 0.6 * lift)})`, transformOrigin: 'center top', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 140, lineHeight: 1, color: SUN.mid, textShadow: `0 0 40px ${SUN.rim}66` }}>Photosynthesis.</div>
        </AbsoluteFill>

        {/* Bell Labs, 25 April 1954 */}
        <AbsoluteFill style={{ opacity: bell }}>
          <div style={{ position: 'absolute', left: 160, top: 400, display: 'flex', gap: 16 }}>
            <SunChip text="25 APRIL 1954" at={FOUR} color={DL.dim} />
            <SunChip text="BELL LABS" at={BELL} color={DL.gold} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 510, display: 'flex', alignItems: 'baseline', gap: 20, opacity: ease(f, SIX - 2, SIX + 6) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: SUN.mid, lineHeight: 1, display: 'inline-block', transform: `scale(${ease(f, SIX - 2, SIX + 10, 1.25, 1)})` }}>≈ 6 %</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim, opacity: ease(f, OF_SUNLIGHT - 2, OF_SUNLIGHT + 6) }}>OF SUNLIGHT</span>
          </div>
          <div style={{ ...rise(f, ELECTRICITY - 2), position: 'absolute', left: 160, top: 690, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.text }}>→ into electricity</div>
          <svg width={400} height={400} viewBox="0 0 600 600" style={{ position: 'absolute', left: 980, top: 300, filter: glowCell > 0.01 ? `drop-shadow(0 0 ${40 * glowCell}px ${SUN.mid})` : undefined, opacity: 0.3 * ease(f, THEN, THEN + 10) + 0.7 * ease(f, SILICON - 2, SILICON + 10) }}>
            <rect x={60} y={60} width={480} height={480} rx={20} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={6} />
            {Array.from({ length: 5 }, (_, i) => <line key={'h' + i} x1={60} y1={140 + i * 80} x2={540} y2={140 + i * 80} stroke="#5aa0e0" strokeWidth={2} opacity={0.6} />)}
            {Array.from({ length: 5 }, (_, i) => <line key={'v' + i} x1={140 + i * 80} y1={60} x2={140 + i * 80} y2={540} stroke="#5aa0e0" strokeWidth={2} opacity={0.6} />)}
            <rect x={60} y={60} width={480} height={480} rx={20} fill={SUN.core} style={{ mixBlendMode: 'screen' }} opacity={0.55 * glowCell} />
            <rect x={60} y={60} width={480} height={480} rx={20} fill="none" stroke={SUN.mid} strokeWidth={8} opacity={glowCell} />
          </svg>
          <div style={{ position: 'absolute', left: 980, top: 712, width: 400, textAlign: 'center', fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: '#5aa0e0', opacity: ease(f, SILICON - 2, SILICON + 8) }}>SILICON SOLAR CELL</div>
        </AbsoluteFill>

        {/* cliffhanger picture: a furrow, then ONE solar cell sprouts in it (no farm yet) */}
        <svg width={800} height={220} viewBox="0 0 800 220" style={{ position: 'absolute', left: 560, top: 650, opacity: furrow, overflow: 'visible' }}>
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M20 ${70 + i * 40} Q400 ${50 + i * 40} 780 ${70 + i * 40}`} stroke="#8a5a2b" strokeWidth={10} fill="none" strokeDasharray={800} strokeDashoffset={800 * (1 - ease(f, NEXT + i * 4, NEXT + i * 4 + 18))} />)}
          <g opacity={sprout} transform={`translate(400 ${110 - 0 * sprout}) scale(${0.45 + 1.0 * sprout})`}>
            <line x1={0} y1={0} x2={0} y2={-70} stroke="#34c759" strokeWidth={6} />
            <path d="M0 -40 q -26 -6 -34 -26 q 24 0 34 18" fill="#34c759" />
            <g transform="translate(0 -96) skewX(-12)">
              <rect x={-46} y={-26} width={92} height={52} rx={4} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={4} />
              <line x1={-46} y1={0} x2={46} y2={0} stroke="#5aa0e0" strokeWidth={2} />
              <line x1={0} y1={-26} x2={0} y2={26} stroke="#5aa0e0" strokeWidth={2} />
              <rect x={-46} y={-26} width={92} height={52} rx={4} fill={SUN.mid} opacity={0.35 * ease(f, HARVEST + 8, HARVEST + 20)} />
            </g>
          </g>
        </svg>

        {/* the relationship ladder (docked top-right) + the TO MEASURE pulse and the empty slot above it */}
        <ArcLadder rungs={[...pastRungs(4), { year: '1928', label: 'EVERY MEAL', at: CHIP_DOCK + 10 }]} show={Math.max(ladA, ladB)} />
        <div style={{ position: 'absolute', left: LADDER_DOCK.left - 4, top: rungTop(3) - 4, width: LADDER_DOCK.width + 8, height: LADDER_DOCK.rungH + 8, borderRadius: 10, border: `4px solid ${SUN.mid}`, opacity: ladB * Math.min(1, pulse * 1.3), boxShadow: `0 0 ${60 * pulse}px ${SUN.mid}, inset 0 0 ${24 * pulse}px ${SUN.mid}`, transform: `scale(${1 + 0.1 * pulse})` }} />
        <div style={{ position: 'absolute', left: LADDER_DOCK.left, top: rungTop(4), width: LADDER_DOCK.width, height: LADDER_DOCK.rungH, boxSizing: 'border-box', borderRadius: 8, border: `3px dashed ${SUN.mid}`, opacity: ladB * slot4 * (0.65 + 0.35 * Math.sin((f - NOW2) / 4)), boxShadow: `0 0 ${30 * slot4}px ${SUN.mid}88`, transform: `scale(${1 + 0.08 * slot4 * (0.5 + 0.5 * Math.sin((f - NOW2) / 4))})` }} />
        <HowWeSawIt text="EVERY MEAL" at={MEAL - 3} dockAt={CHIP_DOCK} slot={4} left={160} top={250} />

        <DidYouKnowThat at={DID + 4} out={HISTORIAN + 20}>
          <OnWord at={FAMOUS}>the famous story,</OnWord><OnWord at={COCO}> that Coco Chanel</OnWord><OnWord at={SUNTAN}> started the suntan craze,</OnWord><OnWord at={PROBABLY}> is probably</OnWord><span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, MYTH - 2, MYTH + 6) }}> a myth?</span>
          <CardSource at={MYTH}>Kerry Segrave, Suntanning in 20th Century America (McFarland, 2005)</CardSource>
        </DidYouKnowThat>
        {/* ON PURPOSE sits above the card (top 196, clear of the card box) and fades after DID+8 */}
        <div style={{ position: 'absolute', left: 160, top: 196, opacity: 1 - ease(f, DID + 8, DID + 16) }}><SunChip text="ON PURPOSE" at={SUN1} color={SUN.mid} size={40} /></div>
        <SunCliffhanger next="TODAY" parts={[{ text: "We'd learned", at: LEARNED }, { text: 'that we live on sunlight.', at: LIVE }, { text: 'Next,', at: NEXT }, { text: "we'd learn to harvest it.", at: HARVEST }]} />
      </EraExit>
      <EpisodeHud year={1928} episode="02" />
    </AbsoluteFill>
  );
};
export default Su1900;
