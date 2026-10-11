import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, ClockFace, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 5/13 — ERA 2: the 1600s. Strasbourg's Relation (1605, RESEARCH F3)
// lands on "newspaper" and multiplies on "habit"; Huygens' pendulum (1656, F4)
// swings on "pendulum"; the drift card flips 15 min → 15 s on "seconds"; the
// minute hand is born on "minutes". VO tc05 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc1600', durationInSeconds: 49.7667, fps: 30, width: 1920, height: 1080 };
const DUR = 1493;

const C = makeCue(vo, 'tc05-1600', 0.8);
const STRAS = C.at('Strasbourg');
const PAPER = C.at('newspaper');
const HABIT = C.at('habit');
const HUY = C.at('Huygens');
const PEND = C.at('pendulum');
const DRIFT = C.at('drifted');
const SECS = C.at('seconds');
const MINS = C.at('minutes');
const SMELLS = C.at('smells');
const SMOKE = C.at('smoke');
const SOMETHING = C.at('something');
const NEW = C.at('new');
const COFFEE = C.at('Coffee');
const DID = C.at('Did');
const NOBODY = C.at('Nobody');
const FOR = C.at('For');
const READ = C.at('read');
const ARGUE = C.at('argue');
const TODAY = C.at('today');
const LAST = C.at('last');
const MONTH = C.at('month');
const MINUTE = C.at('minute');
const CURIOSITY = C.at('curiosity');
const BOSS = C.at('boss');
const DAY1652 = [
  { from: 22, to: 6, label: 'Sleep', color: '#38bdf8' },
  { from: 6, to: 12, label: 'Work', color: '#71717a' },
  { from: 12, to: 14, label: 'Coffeehouse — news & argument', color: '#d4a017' },
  { from: 14, to: 19, label: 'Work', color: '#71717a' },
  { from: 19, to: 22, label: 'Home', color: '#b9b1a4' },
];

const Sheet: React.FC<{ rot: number; dx: number; op: number; main?: boolean }> = ({ rot, dx, op, main = false }) => (
  <div style={{ position: 'absolute', left: dx, top: 0, width: 470, height: 600, background: '#e9e1cf', borderRadius: 4, transform: `rotate(${rot}deg)`, opacity: op, boxShadow: '0 30px 60px #000000aa', padding: '34px 36px', boxSizing: 'border-box' }}>
    {main && (
      <>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 62, color: '#1a1410', textAlign: 'center', letterSpacing: 2 }}>RELATION</div>
        <div style={{ fontFamily: DL_MONO, fontSize: 20, color: '#5a4a3a', textAlign: 'center', marginTop: 6, letterSpacing: 3 }}>STRASBOURG · 1605</div>
        <div style={{ height: 3, background: '#1a1410', margin: '18px 0 22px' }} />
      </>
    )}
    {Array.from({ length: main ? 14 : 18 }, (_, i) => (
      <div key={i} style={{ height: 10, marginBottom: 16, width: `${70 + ((i * 37) % 28)}%`, background: '#1a141033', borderRadius: 3 }} />
    ))}
  </div>
);

// "smoke, and something new": steam wisps on "smoke", the line on "something", the cup itself
// only ON "Coffee." (never before the word). When the fact card arrives the cup shrinks to the
// space above it, so it stays on screen until the Day Clock.
// "The air smells of smoke, and of something new": London rooftops with chimney smoke on
// "smoke"; on "new" one doorway down the street glows, a blank signboard and a "?" above it.
// Nothing names coffee until the cup appears ON "Coffee.".
const ROOFS = [[0, 150], [150, 190], [300, 140], [430, 210], [600, 165], [760, 200], [930, 150], [1080, 185], [1240, 160], [1400, 205], [1560, 150]];
const Rooftops: React.FC<{ at: number; glowAt: number; out: number }> = ({ at, glowAt, out }) => {
  const f = useCurrentFrame();
  const glow = ease(f, glowAt - 2, glowAt + 10);
  const flicker = 0.85 + 0.15 * Math.sin(f / 4);
  return (
    <div style={{ position: 'absolute', left: 120, top: 700, opacity: ease(f, at - 4, at + 10) * (1 - ease(f, out - 6, out + 6)) }}>
      <svg width={1680} height={260} viewBox="0 0 1680 260" style={{ overflow: 'visible' }}>
        {ROOFS.map(([x, h], i) => {
          const cx = x + 40 + (i % 3) * 30;
          return (
            <g key={i}>
              <rect x={x} y={260 - h} width={150} height={h} fill="#2a1d13" stroke="#7a5532" strokeWidth={2} />
              <path d={`M${x - 6} ${262 - h} L${x + 75} ${222 - h} L${x + 156} ${262 - h} Z`} fill="#24180f" stroke="#7a5532" strokeWidth={2} />
              <rect x={cx} y={214 - h} width={18} height={36} fill="#24180f" stroke="#7a5532" strokeWidth={2} />
              {[0, 1, 2].map((k) => { const p = ((f + i * 17 + k * 30) % 90) / 90; return <circle key={k} cx={cx + 9 + Math.sin(p * 4 + i) * 10 + p * 30} cy={210 - h - p * 150} r={12 + p * 28} fill="#e6dccb" opacity={0.4 * (1 - p)} />; })}
              {i % 2 === 0 && <rect x={x + 30} y={290 - h} width={22} height={26} fill={DL.gold} opacity={0.35} />}
            </g>
          );
        })}
        {/* the something new: a glowing doorway with a blank sign */}
        <g opacity={glow}>
          <rect x={1286} y={150} width={56} height={110} rx={4} fill={DL.gold} opacity={0.75 * flicker} style={{ filter: `drop-shadow(0 0 22px ${DL.gold})` }} />
          <rect x={1260} y={112} width={108} height={30} rx={4} fill="#2a1d14" stroke={DL.gold} strokeWidth={3} />
          <text x={1314} y={96} textAnchor="middle" fill={DL.gold} fontFamily={DL_SERIF} fontSize={46} fontStyle="italic" style={{ filter: `drop-shadow(0 0 12px ${DL.gold})` }}>?</text>
        </g>
      </svg>
    </div>
  );
};

const Cup: React.FC<{ steamAt: number; labelAt: number; at: number; dockAt: number; out: number }> = ({ steamAt, labelAt, at, dockAt, out }) => {
  const f = useCurrentFrame();
  const dock = ease(f, dockAt - 8, dockAt + 6, 0, 1, DL_EASE.inOut);
  const cupS = interpolate(f, [at, at + 8], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: ease(f, steamAt - 4, steamAt + 10) * (1 - ease(f, out - 10, out)), transform: `translate(${dock * 790}px, ${dock * -70}px) scale(${1 - dock * 0.55})` }}>
      <svg width={360} height={380} viewBox="0 0 360 380">
        {[0, 1, 2].map((i) => { const p = ((f + i * 20) % 60) / 60; return <path key={i} d={`M${130 + i * 50} ${170 - p * 90} q 14 -20 0 -40 q -14 -20 0 -40`} fill="none" stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.35 * (1 - p)} />; })}
        <g opacity={ease(f, at, at + 6)} transform={`translate(170 270) scale(${cupS}) translate(-170 -270)`}>
          <path d="M70 190 H270 V300 Q270 350 220 350 H120 Q70 350 70 300 Z" fill={DL.panel} stroke={DL.gold} strokeWidth={6} />
          <path d="M270 215 Q330 215 330 260 Q330 305 270 300" fill="none" stroke={DL.gold} strokeWidth={6} />
          <ellipse cx={170} cy={198} rx={92} ry={12} fill="#3a2414" />
        </g>
      </svg>
      <span style={{ opacity: ease(f, labelAt - 2, labelAt + 8) * (1 - dock), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>LONDON · 1652 · SOMETHING NEW IN THE AIR</span>
    </div>
  );
};

const Tc1600: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const day = ease(f, FOR - 6, FOR + 8) * (1 - ease(f, PAPER - 14, PAPER - 2));
  const main = ease(f, PAPER - 8, PAPER + 4) * (1 - 0.7 * ease(f, NOBODY - 6, NOBODY + 8));
  const paperIn = ease(f, PAPER - 6, PAPER + 14);
  const stack = ease(f, HABIT - 4, HABIT + 20, 0, 1, DL_EASE.inOut);
  const dimPaper = 1 - 0.6 * ease(f, HUY - 10, HUY + 10);
  const clockIn = ease(f, HUY - 4, HUY + 14);
  const swing = f > PEND ? Math.sin((f - PEND) / 9.5) * 18 : 0;
  // hour hand creeps; minute hand only exists once the minute is born
  const hourDeg = 300 + f * 0.05;
  const minOn = ease(f, MINS - 2, MINS + 10);
  // on "the minute would…" the hand starts racing (the minute becomes your boss)
  const race = Math.max(0, f - MINUTE);
  const minDeg = interpolate(f, [MINS, DUR], [0, 220], { ...DCLAMP, easing: DL_EASE.out }) + race * race * 0.08;
  const dim = ease(f, NOBODY - 6, NOBODY + 8);
  const focus = ease(f, MINUTE - 4, MINUTE + 8);
  const boss = ease(f, BOSS, BOSS + 6);
  const bossS = interpolate(f, [BOSS, BOSS + 7], [1.5, 1], { ...DCLAMP, easing: DL_EASE.out });
  const todayOut = 1 - ease(f, HUY - 14, HUY - 2);
  const strikeMonth = ease(f, MONTH, MONTH + 8);
  const clockLayer = 1 - 0.7 * dim * (1 - focus);
  const isSecs = f >= SECS;
  const flip = interpolate(f, [SECS - 6, SECS, SECS + 8], [1, 0, 1], DCLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#22160a" />
      <Vignette />
      <EraExit dur={DUR}>
      <EraHeader year="1652" idx={2} label="NEWS & THE PENDULUM" place="London · something new in the air" dockAt={SMELLS + 6} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', opacity: day }}>
        <DayClock year="1652" segs={DAY1652} at={FOR} hot={2} hotAt={FOR + 24} />
      </div>
      {/* what the penny bought: read the news, then argue */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', gap: 30, opacity: day }}>
        {[['READ THE NEWS', READ], ['ARGUE WITH STRANGERS', ARGUE]].map(([t, at]) => (
          <div key={String(t)} style={{ opacity: ease(f, Number(at), Number(at) + 6), transform: `scale(${interpolate(f, [Number(at), Number(at) + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out })})`, padding: '14px 28px', border: `2px solid ${DL.gold}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.gold }}>{t}</div>
        ))}
      </div>
      <AbsoluteFill style={{ opacity: main }}>

      {/* the newspaper, then the habit */}
      <div style={{ position: 'absolute', left: 190, top: 240, width: 620, height: 640, opacity: paperIn * dimPaper, transform: `translateY(${(1 - paperIn) * 40}px)` }}>
        <Sheet rot={-5 * stack} dx={-50 * stack} op={stack} />
        <Sheet rot={4 * stack} dx={60 * stack} op={stack} />
        <Sheet rot={0} dx={0} op={1} main />
      </div>
      <div style={{ ...rise(f, STRAS), position: 'absolute', left: 190, top: 166, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted, opacity: rise(f, STRAS).opacity * dimPaper }}>
        THE FIRST NEWSPAPER
      </div>
      <div style={{ ...rise(f, HABIT), position: 'absolute', left: 190, top: 900, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.gold, opacity: rise(f, HABIT).opacity * dimPaper }}>
        news becomes a habit
      </div>

      {/* today, not last month — the beat's point, in the empty right half */}
      <div style={{ position: 'absolute', left: 1000, top: 400, width: 800, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 30, opacity: todayOut }}>
        <div style={{ opacity: ease(f, TODAY, TODAY + 6), transform: `scale(${interpolate(f, [TODAY, TODAY + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out })})`, transformOrigin: 'left center', padding: '18px 34px', border: `3px solid ${DL.gold}`, borderRadius: 12, fontFamily: DL_SERIF, fontSize: 72, color: DL.gold }}>today</div>
        <div style={{ position: 'relative', opacity: ease(f, LAST, LAST + 6) * (1 - 0.5 * strikeMonth), padding: '14px 30px', border: `2px solid ${DL.border}`, borderRadius: 12, fontFamily: DL_SERIF, fontSize: 56, color: DL.dim }}>
          last month
          <div style={{ position: 'absolute', left: 14, right: 14, top: '52%', height: 5, background: DL.red, transform: `scaleX(${strikeMonth})`, transformOrigin: 'left' }} />
        </div>
      </div>

      </AbsoluteFill>

      {/* Huygens' pendulum clock — outside the dimmed layer so it can come back into focus on "minute" */}
      <div style={{ position: 'absolute', left: 960, top: 210, width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: clockIn * clockLayer }}>
        <div style={{ position: 'relative', width: 340, height: 600 }}>
          <div style={{ position: 'absolute', left: 30, top: 0, width: 280, height: 560, borderRadius: 30, background: DL.panel, border: `2px solid ${DL.border}` }} />
          <div style={{ position: 'absolute', left: 40, top: 14 }}>
            <div style={{ position: 'relative' }}>
              <ClockFace size={260} hourDeg={hourDeg} minDeg={minDeg} showMinute={minOn > 0.01} />
            </div>
          </div>
          <div style={{ position: 'absolute', left: 168, top: 280, width: 4, height: 230, background: DL.gold, transformOrigin: 'top center', transform: `rotate(${swing}deg)` }}>
            <div style={{ position: 'absolute', left: -26, bottom: -26, width: 56, height: 56, borderRadius: '50%', background: DL.gold, boxShadow: `0 0 24px ${DL.gold}88` }} />
          </div>
        </div>
        <div style={{ ...rise(f, HUY + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted, marginTop: 4 }}>CHRISTIAAN HUYGENS · 1656</div>
        <div style={{ position: 'absolute', left: 120, top: 110, opacity: boss, transform: `scale(${bossS}) rotate(-8deg)`, padding: '12px 28px', border: `4px solid ${DL.red}`, borderRadius: 8, background: DL.bg, fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, letterSpacing: 6, color: DL.red }}>BOSS</div>
      </div>
      <AbsoluteFill style={{ opacity: main }}>

      {/* drift card */}
      <div style={{ position: 'absolute', right: 120, top: 250, width: 330, opacity: ease(f, DRIFT - 4, DRIFT + 10) }}>
        <div style={{ padding: '22px 26px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${isSecs ? DL.gold : DL.red}`, borderRadius: 14 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.muted }}>DRIFT / DAY</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 70, color: isSecs ? DL.gold : DL.red, transform: `scaleY(${flip})`, marginTop: 6 }}>{isSecs ? '≈ 15 s' : '≈ 15 min'}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 120, top: 470, width: 330, opacity: minOn }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red }}>NEW</div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1.1, color: DL.text, marginTop: 6 }}>the <span style={{ color: DL.red, fontStyle: 'italic' }}>minute</span></div>
      </div>

      </AbsoluteFill>
      <Rooftops at={SMOKE} glowAt={NEW} out={DID} />
      <DidYouKnowThat at={DID} out={FOR} source="English coffeehouses, Oxford 1650 · London 1652 — a penny bought coffee, papers and talk">
        the first coffeehouses were called <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>penny universities</span> — one penny bought you the news and an argument with strangers.
      </DidYouKnowThat>
      <Cup steamAt={SMOKE} labelAt={SOMETHING} at={COFFEE} dockAt={DID} out={FOR} />
      <Cliffhanger next="1760" parts={[{ text: 'Soon the minute stops being a curiosity —', at: CURIOSITY }, { text: 'and becomes your boss.', at: BOSS }]} />
      </EraExit>
      <EraHud year={1652} />
    </AbsoluteFill>
  );
};
export default Tc1600;
