import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, FactCard, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 4/13 — ERA 1: 1500, the village. Sun rises on "rises", sets on
// "sets"; the bell swings on "bell"; life expectancy (RESEARCH F2) on
// "expectancy"; SAME ×3 stamp on each "same"; news at horse pace on "weeks".
// VO tc04 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc1500', durationInSeconds: 55.8667, fps: 30, width: 1920, height: 1080 };
const DUR = 1676;

const C = makeCue(vo, 'tc04-1500', 0.8);
const MIDNIGHT = C.at('midnight');
const AWAKE = C.at('awake');
const DID = C.at('Did');
const PRAYED = C.at('prayed');
const FIRST = C.at('first');
const SECOND = C.at('second');
const DAY_STEP = 12; // legend builds over ~2.5 s (the 7 ui-click ticks use the same step)
const HIST = C.at('Historians');
const GIRL = C.at('Your');
const RISES = C.at('rises');
const SETS = C.at('sets');
const BELL = C.at('bell');
const LIFE = C.at('expectancy');
const REACH = C.at('reach');
const SAME = [C.at('same', 1), C.at('same', 2), C.at('same', 3)];
const WEEKS = C.at('weeks');
const TIME = C.at('Time');
const DRINK = C.at('drink');
const ARRIVE = C.at('arrive');
const HAPPENS = C.at('happens');
const BUT = C.at('But');
const DAY1500 = [
  { from: 21, to: 24, label: 'First sleep', color: '#38bdf8' },
  { from: 0, to: 1, label: 'Awake in the dark — pray, talk, visit', color: '#d4a017' },
  { from: 1, to: 6, label: 'Second sleep', color: '#38bdf8' },
  { from: 6, to: 12, label: 'Fields, by daylight', color: '#71717a' },
  { from: 12, to: 13, label: 'Dinner', color: '#e74c3c' },
  { from: 13, to: 18, label: 'Fields', color: '#71717a' },
  { from: 18, to: 21, label: 'Home by firelight', color: '#b9b1a4' },
];

// The opening night: a dark village under the moon; on "awake" its windows light up one by one.
const NightVillage: React.FC<{ f: number }> = ({ f }) => {
  const houses = [[60, 70], [190, 90], [330, 64], [470, 110], [620, 80], [760, 96]];
  return (
    <svg width={900} height={190} viewBox="0 0 900 190">
      <circle cx={820} cy={40} r={22} fill="#e9e1cf" opacity={0.55} />
      <path d="M0 190 V150 C200 130 420 140 900 150 V190 Z" fill="#0d0a08" />
      {houses.map(([x, h], i) => (
        <g key={i}>
          <rect x={x} y={190 - h} width={84} height={h} fill="#141009" stroke="#2a1f16" strokeWidth={2} />
          <path d={`M${x - 8} ${192 - h} L${x + 42} ${150 - h} L${x + 92} ${192 - h} Z`} fill="#120d08" stroke="#2a1f16" strokeWidth={2} />
          <rect x={x + 30} y={210 - h} width={24} height={22} fill={DL.gold} opacity={ease(f, AWAKE - 4 + i * 3, AWAKE + 4 + i * 3) * 0.85} style={{ filter: `drop-shadow(0 0 10px ${DL.gold})` }} />
        </g>
      ))}
    </svg>
  );
};

const Village: React.FC<{ f: number }> = ({ f }) => {
  // sun: rises from the left horizon to the zenith, then sets to the right
  const up = interpolate(f, [RISES - 20, SETS - 10], [0, 0.5], { ...DCLAMP, easing: DL_EASE.out });
  const down = interpolate(f, [SETS - 4, SETS + 40], [0, 0.5], { ...DCLAMP, easing: DL_EASE.in });
  const t = up + down; // 0 → 1 across the sky
  const sx = 80 + t * 720;
  const sy = 430 - Math.sin(t * Math.PI) * 330;
  const sunOp = ease(f, RISES - 24, RISES - 8) * (1 - ease(f, SETS + 30, SETS + 46));
  const swing = f > BELL ? Math.sin((f - BELL) / 5) * 22 * Math.max(0, 1 - (f - BELL) / 150) : 0;
  const ring = f > BELL ? ((f - BELL) % 36) / 36 : 0;
  const ringOp = f > BELL && f < BELL + 150 ? 1 - ring : 0;
  const smoke = (i: number) => {
    const p = ((f + i * 23) % 90) / 90;
    return { cx: 560 + Math.sin(p * 5 + i) * 10, cy: 300 - p * 120, r: 8 + p * 16, o: 0.35 * (1 - p) };
  };
  return (
    <svg width={880} height={560} viewBox="0 0 880 560">
      <defs>
        <radialGradient id="tc1500sky">
          <stop offset="0" stopColor="#d4a017" stopOpacity={0.14 * sunOp} />
          <stop offset="1" stopColor="#e74c3c" stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* sky light is a soft glow around the sun, not a panel */}
      <circle cx={sx} cy={sy} r={300} fill="url(#tc1500sky)" />
      <circle cx={sx} cy={sy} r={44} fill={DL.gold} opacity={sunOp} />
      <circle cx={sx} cy={sy} r={80} fill={DL.gold} opacity={0.12 * sunOp} />
      {/* hills */}
      <path d="M0 430 C140 380 260 400 380 420 C520 440 640 370 880 410 L880 560 L0 560 Z" fill={DL.panel2} />
      <line x1={0} y1={430} x2={880} y2={430} stroke={DL.border} strokeWidth={2} />
      {/* cottages */}
      {[[480, 0], [600, 1], [720, 2]].map(([x, i]) => (
        <g key={i} transform={`translate(${x} 0)`}>
          <rect x={0} y={360} width={90} height={70} fill={DL.panel} stroke={DL.border} strokeWidth={2} />
          <path d="M-10 362 L45 318 L100 362 Z" fill="#2a1d14" stroke={DL.border} strokeWidth={2} />
          <rect x={36} y={392} width={20} height={38} fill="#3a2a1a" />
        </g>
      ))}
      <rect x={548} y={300} width={14} height={24} fill="#2a1d14" />
      {[0, 1, 2].map((i) => { const s = smoke(i); return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity={s.o * 0.18} />; })}
      {/* church */}
      <g transform="translate(150 0)">
        <rect x={0} y={330} width={170} height={100} fill={DL.panel} stroke={DL.border} strokeWidth={2} />
        <rect x={110} y={200} width={60} height={230} fill={DL.panel} stroke={DL.border} strokeWidth={2} />
        <path d="M104 202 L140 120 L176 202 Z" fill="#2a1d14" stroke={DL.border} strokeWidth={2} />
        <rect x={124} y={226} width={32} height={40} fill={DL.bg} />
        <g transform={`rotate(${swing} 140 228)`}>
          <path d="M128 236 Q140 222 152 236 L156 258 H124 Z" fill={DL.gold} />
          <circle cx={140} cy={262} r={4} fill={DL.gold} />
        </g>
        <circle cx={140} cy={246} r={40 + ring * 120} fill="none" stroke={DL.gold} strokeWidth={3} opacity={ringOp * 0.5} />
      </g>
      {/* the girl */}
      <g transform={`translate(380 ${ease(f, GIRL, GIRL + 14, 30, 0)})`} opacity={ease(f, GIRL, GIRL + 14)}>
        <circle cx={0} cy={448} r={13} fill={DL.gold} />
        <path d="M-20 520 C-20 488 -10 470 0 470 C10 470 20 488 22 520 Z" fill={DL.gold} />
      </g>
      <text x={380} y={418} textAnchor="middle" fill={DL.gold} fontFamily={DL_MONO} fontSize={24} letterSpacing={4} opacity={ease(f, GIRL + 4, GIRL + 16)}>YOU</text>
      <text x={380} y={540} textAnchor="middle" fill={DL.dim} fontFamily={DL_MONO} fontSize={24} letterSpacing={4} opacity={ease(f, GIRL + 8, GIRL + 22)}>ENGLAND · A VILLAGE</text>
    </svg>
  );
};

const Chip: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + 8], [1.35, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: ease(f, at, at + 6), transform: `scale(${s})`, padding: '16px 30px', border: `2px solid ${DL.gold}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 4, color: DL.gold }}>{text}</div>
  );
};

const Tc1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const night = ease(f, HIST - 6, HIST + 8) * (1 - ease(f, GIRL - 12, GIRL));
  const village = ease(f, GIRL - 10, GIRL + 6);
  const phaseA = ease(f, GIRL, GIRL + 10) * (1 - ease(f, REACH - 10, REACH + 4, 0, 1, DL_EASE.in));
  const phaseB = ease(f, REACH, REACH + 12) * (1 - ease(f, TIME - 14, TIME - 2));
  const nightVillage = ease(f, MIDNIGHT - 4, MIDNIGHT + 14) * (1 - ease(f, DID - 4, DID + 6));
  void PRAYED;
  const horse = interpolate(f, [WEEKS, DUR], [0, 0.35], DCLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1a08" />
      <Vignette />
      <EraExit dur={DUR}>
      <div style={{ position: 'absolute', left: 510, top: 740, opacity: nightVillage }}><NightVillage f={f} /></div>
      <EraHeader year="1500" idx={1} label="THE VILLAGE" place="England · a village · midnight" dockAt={AWAKE - 10} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', opacity: night }}>
        <DayClock year="1500" segs={DAY1500} at={HIST} step={DAY_STEP} hotSeq={[[0, FIRST], [2, SECOND], [1, PRAYED]]} />
      </div>
      <DidYouKnowThat at={DID} out={HIST} source="A. Roger Ekirch, At Day's Close (2005) — hundreds of early modern references">
        for centuries, people slept <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>twice a night</span> — a “first sleep” and a “second sleep”, awake in between.
      </DidYouKnowThat>

      <div style={{ opacity: village, position: 'absolute', left: 110, top: 280, WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent), linear-gradient(180deg, transparent, black 15%, black 92%, transparent)', WebkitMaskComposite: 'source-in' }}><Village f={f} /></div>

      {/* phase A: the only clock + life expectancy */}
      <div style={{ position: 'absolute', left: 1120, top: 250, display: 'flex', flexDirection: 'column', gap: 34, opacity: phaseA }}>
        <FactCard label="THE ONLY CLOCK" value="the church bell" sub="Days run from sunrise to sunset." at={BELL} w={680} />
        <FactCard label="LIFE EXPECTANCY AT BIRTH" value="≈ 35 years" sub="Pulled down by infant deaths." source="Wrigley & Schofield · England, 1541–1871" at={LIFE} w={680} />
      </div>

      {/* phase B: the same world, start to finish */}
      <div style={{ position: 'absolute', left: 1120, top: 270, width: 680, display: 'flex', flexDirection: 'column', gap: 26, opacity: phaseB }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 52, color: DL.text, lineHeight: 1.15 }}>You die in the world <span style={{ color: DL.gold, fontStyle: 'italic' }}>you were born into.</span></div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 10 }}>
          <Chip text="SAME TOOLS" at={SAME[0]} />
          <Chip text="SAME ROADS" at={SAME[1]} />
          <Chip text="SAME NEWS" at={SAME[2]} />
        </div>
        <div style={{ ...rise(f, WEEKS), marginTop: 24, padding: '22px 28px', background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>NEWS ARRIVES</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14 }}>
            <div style={{ flex: 1, height: 10, background: DL.panel2, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${horse * 100}%`, height: '100%', background: DL.gold }} />
            </div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.gold }}>weeks late</span>
          </div>
        </div>
      </div>

      {/* phase C: the line */}
      <div style={{ position: 'absolute', left: 1120, top: 300, width: 680, opacity: ease(f, TIME - 2, TIME + 10) * (1 - ease(f, BUT - 6, BUT + 6) * 0.6) }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.15, color: DL.text }}>Time is not something you <span style={{ fontStyle: 'italic', color: DL.dim }}>spend.</span></div>
        <div style={{ ...rise(f, HAPPENS - 6), fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.15, color: DL.gold, marginTop: 24, fontStyle: 'italic' }}>It simply happens to you.</div>
      </div>

      {/* the open loop: a steaming cup on "drink" */}
      <div style={{ position: 'absolute', left: 1360, top: 590, opacity: ease(f, DRINK, DRINK + 8), transform: `scale(${interpolate(f, [DRINK, DRINK + 10], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out })})` }}>
        <svg width={240} height={230} viewBox="0 0 240 230">
          {[0, 1, 2].map((i) => { const p = ((f + i * 20) % 60) / 60; return <path key={i} d={`M${80 + i * 40} ${100 - p * 60} q 12 -16 0 -32 q -12 -16 0 -32`} fill="none" stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={0.4 * (1 - p)} />; })}
          <path d="M40 110 H180 V180 Q180 215 145 215 H75 Q40 215 40 180 Z" fill={DL.panel} stroke={DL.gold} strokeWidth={5} />
          <path d="M180 128 Q220 128 220 158 Q220 188 180 184" fill="none" stroke={DL.gold} strokeWidth={5} />
          <text x={110} y={175} textAnchor="middle" fill={DL.gold} fontFamily={DL_SERIF} fontSize={44} fontStyle="italic">?</text>
        </svg>
      </div>
      <Cliffhanger next="1652" parts={[{ text: 'A strange new drink', at: DRINK }, { text: 'is on its way…', at: ARRIVE }]} />
      </EraExit>
      <EraHud year={1500} />
    </AbsoluteFill>
  );
};
export default Tc1500;
