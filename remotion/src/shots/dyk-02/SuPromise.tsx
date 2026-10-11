import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SunDisc, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 4/14 — the promise (v2). "Seven mornings." on its word; the seven era years build
// 1500 on "fifteen", the middle five sweep in, 2100 (PREDICTION) on "twenty"; seven people light up from "wake";
// one Sun rises over them on "same"; locked on "change"; the people change colour on "will".
// "start": 1500 rings · "bed": a bed at 1500 · "sunset": a small Sun sets behind it ·
// "world": 2100 rings · "might": a faint dashed power line Sun → 2100 marked `might` (nothing
// of what 2100 holds) · "And at the end": a comet runs the axis, 2100 lights on "end" ·
// "age": the "? old" chip. Frame 0 shows a faint dashed axis with seven empty nodes.
// VO su03 @0.5 s.
// =============================================================================
export const compositionConfig = { id: 'SuPromise', durationInSeconds: 19.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 599;

const C = makeCue(vo, 'su03-promise', 0.6);
const SEVEN = C.at('Seven');
const FROM = C.at('from');
const FIFTEEN = C.at('fifteen');
const TWENTY = C.at('twenty');
const EACH = C.at('each');
const WAKE = C.at('wake');
const SAME = C.at('same');
const CHANGE = C.at('change');
const YOU_WILL = C.at('will');
const START = C.at('start');
const BED = C.at('bed');
const SUNSET = C.at('sunset');
const WORLD = C.at('world');
const MIGHT = C.at('might');
const AND = C.at('And');
const END = C.at('end', 2);
const AGE = C.at('age');
const SUNLIGHT = C.at('sunlight');
const STEP = 12;
const SWEEP = 3; // the five middle years sweep in as one motion between 1500 ("fifteen") and 2100 ("twenty")
const yearAt = (i: number) => (i === 0 ? FIFTEEN : i === 6 ? TWENTY : FIFTEEN + STEP + (i - 1) * SWEEP);
export const ERA_YEARS = ['1500', '1610', '1779', '1800', '1928', 'TODAY', '2100'];
const W = 1400, GAP = W / 6, X0 = 260, AXIS_Y = 730;
const nodeX = (i: number) => X0 + i * GAP;
const COLORS_THEN = ['#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#e74c3c'];
const COLORS_NOW = ['#d4a017', '#38bdf8', '#ff3db4', '#34d058', '#ff9a1f', '#8b5cf6', '#e74c3c'];
// the "might" power line: from the Sun's right edge to just above the 2100 figure (arcs over the others)
const LINE = { x0: 1090, y0: 360, cx: 1560, cy: 300, x1: nodeX(6), y1: 588 };

const Person: React.FC<{ color: string }> = ({ color }) => (
  <svg width={54} height={78} viewBox="0 0 54 78"><circle cx={27} cy={16} r={13} fill={color} /><path d="M6 76 C6 46 14 36 27 36 C40 36 48 46 48 76 Z" fill={color} /></svg>
);

// 1500: a bed with a sleeper, a small Sun setting behind a short horizon
const BedAtSunset: React.FC<{ show: number; set: number }> = ({ show, set }) => (
  <svg width={220} height={260} viewBox="0 0 220 260" style={{ overflow: 'visible' }}>
    <defs><clipPath id="promSetClip"><rect x={0} y={0} width={220} height={150} /></clipPath></defs>
    <g opacity={ease(set, 0, 0.1)}>
      <circle cx={110} cy={90 + 80 * set} r={26} fill={SUN.mid} clipPath="url(#promSetClip)" style={{ filter: `drop-shadow(0 0 12px ${SUN.glow})` }} />
      <line x1={40} y1={150} x2={180} y2={150} stroke={SUN.rim} strokeWidth={3} />
    </g>
    <g opacity={show} transform={`translate(0 ${(1 - show) * 14})`}>
      <rect x={52} y={222} width={116} height={14} rx={3} fill={DL.gold} />
      <rect x={52} y={196} width={10} height={44} rx={2} fill={DL.gold} />
      <rect x={158} y={210} width={10} height={30} rx={2} fill={DL.gold} />
      <circle cx={80} cy={208} r={11} fill={DL.gold} />
      <rect x={92} y={204} width={66} height={16} rx={7} fill={DL.gold} />
    </g>
  </svg>
);

const Ring: React.FC<{ x: number; at: number }> = ({ x, at }) => {
  const f = useCurrentFrame();
  const p = ease(f, at - 1, at + 18);
  return <div style={{ position: 'absolute', left: x - 20 - 26 * p, top: AXIS_Y + 1 - 20 - 26 * p, width: 40 + 52 * p, height: 40 + 52 * p, borderRadius: '50%', border: `3px solid ${SUN.mid}`, opacity: f >= at - 1 ? (1 - p) * 0.9 + 0.25 : 0 }} />;
};

const SuPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const sunUp = interpolate(f, [SAME - 6, SAME + 20], [120, 0], { ...DCLAMP, easing: DL_EASE.out });
  const lock = ease(f, CHANGE - 2, CHANGE + 8);
  const morph = ease(f, YOU_WILL - 2, YOU_WILL + 10);
  const bed = ease(f, BED - 2, BED + 8);
  const sunset = interpolate(f, [SUNSET - 2, SUNSET + 40], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const draw = ease(f, MIGHT, MIGHT + 22, 0, 1, DL_EASE.inOut);
  const marker = interpolate(f, [AND - 2, END], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const flare = ease(f, END - 1, END + 6) * (1 - 0.6 * ease(f, END + 14, END + 40));
  const chipPulse = 1 + 0.08 * ease(f, SUNLIGHT - 1, SUNLIGHT + 5) * (1 - ease(f, SUNLIGHT + 8, SUNLIGHT + 24));
  const linePath = `M${LINE.x0} ${LINE.y0} Q ${LINE.cx} ${LINE.cy} ${LINE.x1} ${LINE.y1}`;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />

      {/* one Sun over everyone */}
      <div style={{ position: 'absolute', left: 960 - 216, top: 150 + sunUp, opacity: ease(f, SAME - 6, SAME + 6) }}>
        <SunDisc size={240} id="promSun" />
      </div>
      <div style={{ position: 'absolute', left: 1240, top: 250, opacity: lock, display: 'flex', alignItems: 'center', gap: 12, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: SUN.mid }}>
        <svg width={30} height={36} viewBox="0 0 30 36"><rect x={3} y={15} width={24} height={19} rx={3} fill={SUN.mid} /><path d="M8 15 V10 a7 7 0 0 1 14 0 V15" fill="none" stroke={SUN.mid} strokeWidth={4} /></svg>
        THE SUN · UNCHANGED
      </div>

      {/* "a world that might run on it": a faint dashed power line, no picture of 2100 */}
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, opacity: 0.85 }}>
        <defs>
          <mask id="promLineMask"><path d={linePath} fill="none" stroke="#fff" strokeWidth={14} pathLength={1} strokeDasharray={`${draw} 1`} /></mask>
        </defs>
        <path d={linePath} fill="none" stroke={SUN.mid} strokeWidth={3} strokeDasharray="12 12" strokeOpacity={0.7} mask="url(#promLineMask)" />
        <path d="M-9 -16 L3 -2 L-4 -2 L6 16 L-6 2 L1 2 Z" fill={SUN.mid} opacity={ease(f, MIGHT + 18, MIGHT + 24)} transform={`translate(${LINE.x1 + 26} ${LINE.y1 - 22})`} />
      </svg>
      <div style={{ ...rise(f, MIGHT, 14), position: 'absolute', left: 1430, top: 330, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: SUN.mid }}>might</div>

      <div style={{ ...rise(f, SEVEN - 2), position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 72, color: DL.text, opacity: ease(f, SEVEN - 2, SEVEN + 10) * (1 - ease(f, SAME - 10, SAME)) }}>
        Seven mornings.
      </div>

      {/* from frame 0: a faint dashed axis with seven empty nodes (no years yet) */}
      <div style={{ position: 'absolute', left: X0, top: AXIS_Y, width: W, height: 0, borderTop: `3px dashed ${DL.faint}` }} />
      {ERA_YEARS.map((y, i) => <div key={`n${y}`} style={{ position: 'absolute', left: nodeX(i) - 11, top: AXIS_Y - 9, width: 22, height: 22, boxSizing: 'border-box', borderRadius: '50%', border: `3px solid ${DL.faint}`, background: DL.bg }} />)}
      <div style={{ position: 'absolute', left: X0, top: AXIS_Y, width: W * ease(f, FIFTEEN, TWENTY + 6, 0, 1, DL_EASE.inOut), height: 3, background: `linear-gradient(90deg, ${DL.gold}, ${DL.red})` }} />
      {/* a bright comet runs the axis on "And at the end"; 2100 lights up on "end" */}
      <div style={{ position: 'absolute', left: X0, top: AXIS_Y - 5, width: W * marker, height: 13, borderRadius: 7, background: `linear-gradient(90deg, transparent, ${SUN.mid}55 40%, ${SUN.core})`, opacity: ease(f, AND - 2, AND + 3) * (1 - ease(f, END + 10, END + 30)) }} />
      <div style={{ position: 'absolute', left: X0 + W * marker - 14, top: AXIS_Y - 13, width: 28, height: 28, borderRadius: '50%', background: SUN.core, opacity: ease(f, AND - 2, AND + 3) * (1 - ease(f, END + 4, END + 12)), boxShadow: `0 0 30px 8px ${SUN.mid}` }} />
      <div style={{ position: 'absolute', left: nodeX(6) - 30, top: AXIS_Y + 1 - 30, width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${SUN.core} 0%, ${SUN.mid}aa 35%, transparent 70%)`, opacity: flare, transform: `scale(${1 + 0.4 * flare})` }} />
      <Ring x={nodeX(0)} at={START} />
      <Ring x={nodeX(6)} at={WORLD} />

      {/* 1500: going to bed at sunset */}
      <div style={{ position: 'absolute', left: nodeX(0) - 110, top: 430, opacity: Math.max(bed, ease(f, SUNSET - 2, SUNSET + 4)) }}>
        <BedAtSunset show={bed} set={sunset} />
      </div>

      {/* seven people above seven years */}
      {ERA_YEARS.map((y, i) => {
        const yAt = yearAt(i);
        const litAt = WAKE + i * STEP;
        const lit = ease(f, litAt, litAt + 6);
        const col = morph > 0 ? COLORS_NOW[i] : lit > 0.5 ? DL.gold : COLORS_THEN[i];
        const isLast = i === 6;
        // "In each one": a glow ripples along the seven nodes, one after another
        const ripple = ease(f, EACH + i * 3, EACH + i * 3 + 5) * (1 - ease(f, EACH + i * 3 + 8, EACH + i * 3 + 22));
        const asleep = i === 0 ? 1 - bed : 1;
        return (
          <React.Fragment key={y}>
            <div style={{ position: 'absolute', left: nodeX(i) - 27, top: 600, opacity: ease(f, litAt - 4, litAt + 4) * asleep, transform: `translateY(${ease(f, litAt - 4, litAt + 8, 18, 0)}px)`, filter: lit > 0 ? `drop-shadow(0 0 ${12 * lit}px ${col})` : undefined }}>
              <Person color={col} />
            </div>
            <div style={{ position: 'absolute', left: nodeX(i) - 110, width: 220, top: 720, textAlign: 'center', opacity: ease(f, yAt, yAt + 6), transform: `scale(${ease(f, yAt, yAt + 8, 1.25, 1)})` }}>
              <div style={{ margin: '0 auto', width: 22, height: 22, borderRadius: '50%', transform: `scale(${1 + 0.6 * ripple})`, boxShadow: `0 0 ${24 * ripple}px ${SUN.mid}`, background: isLast ? DL.bg : DL.gold, border: `3px ${isLast ? 'dashed' : 'solid'} ${isLast ? DL.red : DL.gold}` }} />
              <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 44, color: isLast ? DL.red : DL.text }}>{y}</div>
              {isLast && <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red }}>PREDICTION</div>}
            </div>
          </React.Fragment>
        );
      })}

      {/* "the true age of sunlight": the open question chip */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 866, display: 'flex', justifyContent: 'center', opacity: ease(f, AGE - 1, AGE + 6) }}>
        <div style={{ transform: `scale(${ease(f, AGE - 1, AGE + 9, 1.3, 1) * chipPulse})`, padding: '10px 34px', borderRadius: 999, border: `3px solid ${SUN.mid}`, background: '#1a1006ee', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 58, color: SUN.mid }}>? old</div>
      </div>
    </AbsoluteFill>
  );
};
export default SuPromise;
