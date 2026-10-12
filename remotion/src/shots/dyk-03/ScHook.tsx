import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, Vignette, ClockFace } from '../../lib/dykkit';
import { Kid, Desk, Bell, Label, Source, INK, QGRAD } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 1/14 — cold open (RESEARCH F2, F3/F4, F1 question). Frame 0: a school clock at 07:45 and a
// bell; the bell rings on "ring". "Right now": a counter rolls to 1.4 BILLION on "billion" (UNESCO 2026 GEM,
// enrolled 2024); rows of desks fill on "school"; UP 30 % SINCE 2000 on "ever". Beat 2: 1500 | today split —
// a child at a workbench ("worked."), a classroom outline that never fills ("never saw a classroom"); today:
// MON–FRI light on "every weekday", the desk glows on "desk". Beat 3: DID YOU KNOW THAT… · the word SCHOOL ·
// "first meant…" = ? · the question builds; the clock returns with a "?" face. Nothing names the answer.
// VO sc01 @0.6 s, sc02 @18.868 s.
// =============================================================================
export const compositionConfig = { id: 'ScHook', durationInSeconds: 26.1333, fps: 30, width: 1920, height: 1080 };
const DUR = 784;

const A = makeCue(vo, 'sc01-hook', 0.6);
const B = makeCue(vo, 'sc02-question', 18.868);
const SEVEN = A.at('seven');
const BELLS = A.at("bell's");
const RING = A.at('ring');
const SOMEWHERE = A.at('Somewhere');
const RIGHT = A.at('Right');
const ONE = A.at('one');
const BILLION = A.at('billion');
const SCHOOL1 = A.at('school', 2); // 'are in school.' (1 = 'a school bell's')
const EVER = A.at('ever');
const FIVE = A.at('Five', 2); // 'Five hundred years ago' (1 = 'seven forty five.')
const NEVER = A.at('never');
const CLASSROOM = A.at('classroom');
const WORKED = A.at('worked');
const TODAY = A.at('Today');
const EVERY = A.at('every');
const WEEKDAY = A.at('weekday');
const DESK = A.at('desk');
const STILL = B.at('still');
const DID = B.at('did');
const WORD = B.at('word');
const MEANT = B.at('meant');
const ONE_THING = B.at('one');
const TAKE = B.at('take');
const YOU_Q = B.at('you', 2); // 'from you?' (1 = 'did you know')

const ROWS = 4, COLS = 10;

const Counter: React.FC<{ f: number }> = ({ f }) => {
  const v = interpolate(f, [ONE - 4, BILLION + 4], [0, 1.4], { ...DCLAMP, easing: DL_EASE.out });
  const landed = f >= BILLION;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      <Label at={RIGHT} size={28} color={DL.dim}>RIGHT NOW · CHILDREN IN SCHOOL</Label>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 130, color: landed ? DL.gold : DL.text, opacity: ease(f, ONE - 6, ONE), fontVariantNumeric: 'tabular-nums', textShadow: landed ? `0 0 30px ${DL.gold}88` : undefined }}>{v.toFixed(1)}<span style={{ fontSize: 64, opacity: ease(f, BILLION - 2, BILLION + 6) }}> BILLION</span></div>
      <div style={{ ...rise(f, EVER - 2), padding: '10px 20px', borderRadius: 999, border: `2px solid ${DL.green}`, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.green }}>▲ UP 30 % SINCE 2000</div>
      <Source at={EVER}>UNESCO · 2026 GEM Report · enrolled in 2024</Source>
    </div>
  );
};

// rows of tiny desks fill on "school."
const DeskRows: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 80px)`, gap: '10px 14px', opacity: 1 }}>
    {Array.from({ length: ROWS * COLS }, (_, i) => (
      <div key={i} style={{ opacity: 0.18 + 0.82 * ease(f, SCHOOL1 + i * 0.6, SCHOOL1 + i * 0.6 + 6), transform: `translateY(${ease(f, SCHOOL1 + i * 0.6, SCHOOL1 + i * 0.6 + 8, 10, 0)}px)` }}><Desk size={80} /></div>
    ))}
  </div>
);

// a workbench with a hammer that swings (1500 child at work)
const Workbench: React.FC<{ f: number }> = ({ f }) => {
  const swing = f >= WORKED ? Math.sin((f - WORKED) / 4) : 0;
  return (
    <svg width={520} height={300} viewBox="0 0 520 300" style={{ overflow: 'visible' }}>
      <rect x={140} y={200} width={340} height={20} fill={INK.wood} />
      <rect x={160} y={220} width={16} height={70} fill={INK.woodDark} /><rect x={444} y={220} width={16} height={70} fill={INK.woodDark} />
      <rect x={330} y={170} width={80} height={30} rx={4} fill="#6a6a6a" />
      <g transform={`rotate(${-30 + 30 * swing} 300 150)`}><rect x={296} y={110} width={8} height={70} fill={INK.wood} /><rect x={282} y={100} width={36} height={18} rx={3} fill="#9a9a9a" /></g>
    </svg>
  );
};

const ScHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ease(f, DUR - 3, DUR, 1, 0); // no fade-in: the paradox is on screen at frame 0
  const p1 = 1 - ease(f, FIVE - 8, FIVE + 2, 0, 1, DL_EASE.in);
  const p2 = ease(f, FIVE - 2, FIVE + 10) * (1 - ease(f, STILL - 8, STILL + 2, 0, 1, DL_EASE.in));
  const p3 = ease(f, STILL - 2, STILL + 8);
  const bellSwing = f >= RING ? Math.sin((f - RING) / 2.2) * (1 - ease(f, RING, RING + 50)) : 0;
  const tick = f >= SEVEN ? Math.floor((f - SEVEN) / 30) : 0; // the minute hand creeps toward 07:46
  const minDeg = 270 + Math.min(6, tick * 0.4);
  const qFace = ease(f, MEANT - 2, MEANT + 10);
  const pulse = (at: number) => ease(f, at, at + 5) * (1 - ease(f, at + 8, at + 24));
  const riserSwell = interpolate(f, [YOU_Q - 41, YOU_Q], [1, 1.1], { ...DCLAMP, easing: DL_EASE.inOut });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1a06" />
      <Vignette />

      {/* ── beat 1: 07:45, a bell, 1.4 billion children in school */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 170, top: 150, transform: `scale(${1 + 0.05 * pulse(SEVEN)})` }}>
          <ClockFace size={380} hourDeg={232.5} minDeg={minDeg} />
        </div>
        <div style={{ position: 'absolute', left: 290, top: 560, fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.text, letterSpacing: 4 }}>07:45</div>
        <div style={{ position: 'absolute', left: 600, top: 150, opacity: 0.55 + 0.45 * ease(f, BELLS - 6, BELLS + 4) }}><Bell size={170} swing={bellSwing} /></div>
        <div style={{ ...rise(f, RING - 2), position: 'absolute', left: 600, top: 340, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 6, color: DL.gold }}>RING</div>
        {/* somewhere near you: school lights blink on around a globe (dims behind the counter on "Right now") */}
        <svg width={560} height={560} viewBox="-280 -280 560 560" style={{ position: 'absolute', left: 1160, top: 120, opacity: ease(f, SOMEWHERE - 4, SOMEWHERE + 10) * (1 - 0.8 * ease(f, RIGHT - 4, RIGHT + 10)) }}>
          <circle r={250} fill="none" stroke={DL.border} strokeWidth={3} />
          <ellipse rx={110} ry={250} fill="none" stroke={DL.border} strokeWidth={2} /><line x1={-250} y1={0} x2={250} y2={0} stroke={DL.border} strokeWidth={2} />
          {Array.from({ length: 46 }, (_, i) => {
            const a = i * 2.39996, r = 235 * Math.sqrt((i + 0.5) / 46);
            const on = ease(f, SOMEWHERE + ((i * 7) % 46) * 1.6, SOMEWHERE + ((i * 7) % 46) * 1.6 + 6);
            return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={7} fill={DL.gold} opacity={on * (0.6 + 0.4 * Math.sin(f / 6 + i))} />;
          })}
        </svg>
        <div style={{ position: 'absolute', right: 160, top: 170 }}><Counter f={f} /></div>
        <div style={{ position: 'absolute', left: 170, top: 680 }}><DeskRows f={f} /></div>
      </AbsoluteFill>

      {/* ── beat 2: five hundred years ago | today */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 160, top: 190, width: 770, height: 640, borderRadius: 20, background: DL.panel, border: `2px solid ${INK.wood}`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 36, top: 26, display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.gold }}>1500</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>500 YEARS AGO</span>
          </div>
          {/* the classroom that never fills: an empty dashed outline on "never saw a classroom" */}
          <svg width={300} height={200} viewBox="0 0 300 200" style={{ position: 'absolute', left: 420, top: 120, opacity: ease(f, NEVER - 2, NEVER + 8) * (1 - 0.6 * ease(f, WORKED, WORKED + 12)) }}>
            <rect x={10} y={40} width={280} height={150} rx={8} fill="none" stroke={DL.muted} strokeWidth={4} strokeDasharray="12 10" />
            <path d="M10 40 L150 4 L290 40" fill="none" stroke={DL.muted} strokeWidth={4} strokeDasharray="12 10" />
            <text x={150} y={130} textAnchor="middle" fontFamily={DL_MONO} fontSize={26} fill={DL.muted} opacity={ease(f, CLASSROOM, CLASSROOM + 8)}>NO CLASSROOM</text>
          </svg>
          <div style={{ position: 'absolute', left: 70, top: 300, opacity: ease(f, FIVE + 4, FIVE + 14) }}><Kid size={130} tool="hammer" /></div>
          <div style={{ position: 'absolute', left: 150, top: 330, opacity: ease(f, WORKED - 6, WORKED + 4) }}><Workbench f={f} /></div>
          <div style={{ ...rise(f, WORKED - 2, 14), position: 'absolute', left: 36, bottom: 34, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 6, color: DL.text }}>THEY WORKED.</div>
        </div>
        <div style={{ position: 'absolute', left: 990, top: 190, width: 770, height: 640, borderRadius: 20, background: DL.panel, border: `2px solid ${f >= TODAY ? DL.gold : DL.border}`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 260, color: DL.muted, opacity: 0.5 * (1 - ease(f, TODAY - 4, TODAY + 4)) }}>?</div>
          <div style={{ ...rise(f, TODAY - 2), position: 'absolute', left: 36, top: 26, fontFamily: DL_SERIF, fontSize: 60, color: DL.gold }}>Today</div>
          <div style={{ position: 'absolute', left: 60, top: 150, display: 'flex', gap: 18 }}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((d, i) => {
              const at = EVERY + i * 6;
              return <div key={d} style={{ width: 118, padding: '16px 0', textAlign: 'center', borderRadius: 12, border: `2px solid ${f >= at ? DL.gold : DL.border}`, background: f >= at ? '#1a1406' : DL.panel2, fontFamily: DL_MONO, fontSize: 28, color: f >= at ? DL.gold : DL.muted, opacity: ease(f, TODAY, TODAY + 10) }}>{d}</div>;
            })}
          </div>
          <div style={{ position: 'absolute', left: 60, top: 260, opacity: ease(f, WEEKDAY - 2, WEEKDAY + 8), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>EVERY WEEKDAY</div>
          <div style={{ position: 'absolute', left: 230, top: 330, opacity: ease(f, TODAY + 4, TODAY + 14) }}><Kid size={110} tool="book" /></div>
          <div style={{ position: 'absolute', left: 350, top: 410, transform: `scale(${1 + 0.1 * pulse(DESK)})`, opacity: ease(f, TODAY + 4, TODAY + 14) }}><Desk size={240} glow={ease(f, DESK - 2, DESK + 8)} /></div>
          <div style={{ ...rise(f, DESK - 2, 14), position: 'absolute', left: 36, bottom: 34, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 6, color: DL.gold }}>AT A DESK</div>
        </div>
      </AbsoluteFill>

      {/* ── beat 3: the question */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <div style={{ position: 'absolute', left: 960 - 150, top: 110, transform: `scale(${riserSwell})`, opacity: ease(f, STILL, STILL + 14) }}>
          <svg width={300} height={300} viewBox="0 0 300 300">
            <circle cx={150} cy={150} r={140} fill={DL.panel} stroke={DL.gold} strokeWidth={6} />
            <g opacity={1 - qFace}><line x1={150} y1={150} x2={92} y2={190} stroke={DL.text} strokeWidth={12} strokeLinecap="round" /><line x1={150} y1={150} x2={46} y2={150} stroke={DL.red} strokeWidth={7} strokeLinecap="round" /></g>
            <text x={150} y={150 + 70} textAnchor="middle" fontFamily={DL_SERIF} fontSize={200} fill={DL.gold} opacity={qFace}>?</text>
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ ...rise(f, DID), fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: DL.red, textShadow: `0 0 18px ${DL.red}99` }}>DID YOU KNOW THAT…</div>
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'baseline', gap: 30 }}>
            <span style={{ ...rise(f, WORD - 2), fontFamily: DL_SERIF, fontSize: 80, color: DL.text }}>the word</span>
            <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 130, color: DL.text, opacity: ease(f, B.at('school', 1) - 1, B.at('school', 1) + 6), letterSpacing: 2 }}>SCHOOL</span>
            <span style={{ ...rise(f, MEANT - 4), fontFamily: DL_SERIF, fontSize: 80, color: DL.text }}>first meant…</span>
          </div>
          <div style={{ marginTop: 20, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 72, lineHeight: 1.15 }}>
            <span style={{ opacity: ease(f, ONE_THING - 2, ONE_THING + 6), color: DL.text }}>the one thing school seems to</span>{' '}
            <span style={{ display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, TAKE - 1, TAKE + 6) }}>take away</span>{' '}
            <span style={{ display: 'inline-block', color: DL.gold, opacity: ease(f, YOU_Q - 1, YOU_Q + 6), transform: `scale(${ease(f, YOU_Q - 1, YOU_Q + 8, 1.2, 1)})` }}>from you?</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default ScHook;
