import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, ClockFace, Vignette, WeekStrip, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 6/13 — ERA 3: the 1700s. Field → factory; SUN → BELL → CLOCK chain
// strikes through on each word; "time discipline" (E. P. Thompson 1967, F5);
// "work is done" struck by "clock says so"; Harrison's H4 to Jamaica (F6)
// arrives ~5 s slow; carry / sell. VO tc06 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc1700', durationInSeconds: 57.1333, fps: 30, width: 1920, height: 1080 };
const DUR = 1714;

const C = makeCue(vo, 'tc06-1700', 0.8);
const FIELD = C.at('field');
const FACTORY = C.at('factory');
const SUN = C.at('sun');
const BELL = C.at('bell', 1);
const CLOCK = C.at('clock', 1);
const DISC = C.at('discipline');
const DONE = C.at('done');
const SAYS = C.at('says');
const HARR = C.at('Harrison\'s');
const JAM = C.at('Jamaica');
const FIVE = C.at('five');
const CARRY = C.at('carry');
const SELL = C.at('sell');
const EMPTY = C.at('empty');
const DID = C.at('Did');
const LOST = C.at('lost');
const WORKED = C.at('worked');
const SAINT2 = C.at('Saint', 2);
const DISAPPEAR = C.at('disappear');
const MONDAY4 = C.at('Monday', 4);
const STEAM = C.at('steam');
const RAILS = C.at('rails');
const TAKE = C.at('take');
const NOON = C.at('Noon');
const WEEK1760 = [
  { d: 'MON', work: 0.12, color: '#d4a017', tag: 'SAINT MONDAY' },
  { d: 'TUE', work: 0.5, color: '#71717a' },
  { d: 'WED', work: 0.6, color: '#71717a' },
  { d: 'THU', work: 0.72, color: '#71717a' },
  { d: 'FRI', work: 0.85, color: '#71717a' },
  { d: 'SAT', work: 0.9, color: '#71717a' },
  { d: 'SUN', work: 0, color: '#b9b1a4', tag: 'CHURCH' },
];

const Factory: React.FC<{ f: number }> = ({ f }) => {
  const grow = ease(f, FACTORY - 6, FACTORY + 20, 0, 1, DL_EASE.out);
  const fieldOp = 1 - ease(f, FACTORY - 8, FACTORY + 8);
  const smoke = (i: number) => {
    const p = ((f + i * 19) % 80) / 80;
    return { cx: 210 + i * 0 + Math.sin(p * 4 + i) * 14, cy: 120 - p * 110, r: 10 + p * 22, o: (1 - p) * 0.16 * grow };
  };
  return (
    <svg width={760} height={520} viewBox="0 0 760 520">
      <line x1={0} y1={440} x2={760} y2={440} stroke={DL.border} strokeWidth={2} />
      {/* the field fades out */}
      <g opacity={fieldOp * ease(f, FIELD - 8, FIELD + 6)}>
        {Array.from({ length: 22 }, (_, i) => (
          <line key={i} x1={40 + i * 32} y1={440} x2={46 + i * 32} y2={380 - (i % 3) * 10} stroke={DL.gold} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        ))}
      </g>
      {/* the factory rises */}
      <g transform={`translate(0 ${(1 - grow) * 260})`} opacity={grow}>
        <rect x={180} y={60} width={56} height={260} fill={DL.panel2} stroke={DL.border} strokeWidth={2} />
        <path d="M120 440 V250 L240 190 V250 L360 190 V250 L480 190 V250 L600 190 V440 Z" fill={DL.panel} stroke={DL.border} strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={150 + i * 120} y={300} width={60} height={70} fill={DL.gold} opacity={0.22} />)}
        <circle cx={420} cy={150} r={56} fill={DL.panel} stroke={DL.gold} strokeWidth={4} />
        <line x1={420} y1={150} x2={420} y2={112} stroke={DL.text} strokeWidth={6} strokeLinecap="round" />
        <line x1={420} y1={150} x2={448} y2={150} stroke={DL.red} strokeWidth={4} strokeLinecap="round" />
        {[0, 1, 2].map((i) => { const s = smoke(i); return <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity={s.o} />; })}
      </g>
    </svg>
  );
};

const Step: React.FC<{ label: string; at: number; strikeAt?: number; icon: React.ReactNode }> = ({ label, at, strikeAt, icon }) => {
  const f = useCurrentFrame();
  const strike = strikeAt ? ease(f, strikeAt, strikeAt + 10) : 0;
  return (
    <div style={{ ...rise(f, at), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, position: 'relative', opacity: rise(f, at).opacity * (1 - strike * 0.55) }}>
      <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.text }}>{label}</span>
      <div style={{ position: 'absolute', left: -6, right: -6, top: 66, height: 5, background: DL.red, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
    </div>
  );
};

const Tc1700: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const week = ease(f, WORKED - 6, WORKED + 8) * (1 - ease(f, FIELD - 12, FIELD));
  const p1 = ease(f, FIELD - 10, FIELD + 4) * (1 - ease(f, HARR - 16, HARR - 2, 0, 1, DL_EASE.in));
  const p2 = ease(f, HARR - 2, HARR + 14) * (1 - 0.7 * ease(f, LOST - 6, LOST + 8));
  const ship = interpolate(f, [HARR + 6, JAM + 24], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const strikeDone = ease(f, SAYS, SAYS + 10);
  const saint = ease(f, SAINT2, SAINT2 + 6) * (1 - 0.6 * ease(f, DISAPPEAR + 8, DISAPPEAR + 24));
  const saintStrike = ease(f, DISAPPEAR, DISAPPEAR + 8);
  // the open loop: a steam train crosses the screen on "steam … rails"
  const trainX = interpolate(f, [STEAM - 4, RAILS + 50], [-420, 1940], DCLAMP);
  const trainOp = ease(f, STEAM - 4, STEAM + 4) * (1 - ease(f, RAILS + 40, RAILS + 50));

  // H4 voyage arc: Portsmouth (top right) → Jamaica (bottom left)
  const P0 = { x: 760, y: 120 }, P2 = { x: 120, y: 430 }, P1 = { x: 480, y: 40 };
  const bx = (1 - ship) ** 2 * P0.x + 2 * (1 - ship) * ship * P1.x + ship ** 2 * P2.x;
  const by = (1 - ship) ** 2 * P0.y + 2 * (1 - ship) * ship * P1.y + ship ** 2 * P2.y;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#20140a" />
      <Vignette />
      <EraExit dur={DUR}>
      <EraHeader year="1760" idx={3} label="SAINT MONDAY & THE FACTORY CLOCK" place="Monday morning · half the workshop is empty" dockAt={EMPTY + 4} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', opacity: week }}>
        <WeekStrip year="1760" days={WEEK1760} at={WORKED} hot={0} hotAt={WORKED + 20} step={12} />
      </div>

      {/* ── part 1: the factory and time discipline */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 110, top: 300 }}><Factory f={f} /></div>
        {/* "Saint Monday begins to disappear" — the tag returns and is struck out */}
        <div style={{ position: 'absolute', left: 150, top: 250, opacity: saint, transform: `scale(${interpolate(f, [SAINT2, SAINT2 + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out })})`, padding: '12px 24px', border: `2px solid ${DL.gold}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.gold }}>
          SAINT MONDAY
          <div style={{ position: 'absolute', left: 10, right: 10, top: '50%', height: 5, background: DL.red, transform: `scaleX(${saintStrike})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 230, width: 800, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Step label="SUN" at={SUN} strikeAt={BELL} icon={<svg width={110} height={110}><circle cx={55} cy={55} r={30} fill={DL.gold} />{Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={55 + Math.cos(a) * 40} y1={55 + Math.sin(a) * 40} x2={55 + Math.cos(a) * 52} y2={55 + Math.sin(a) * 52} stroke={DL.gold} strokeWidth={5} strokeLinecap="round" />; })}</svg>} />
          <span style={{ ...rise(f, BELL - 4), fontFamily: DL_SERIF, fontSize: 60, color: DL.faint }}>→</span>
          <Step label="BELL" at={BELL} strikeAt={CLOCK} icon={<svg width={110} height={110}><path d="M30 78 Q55 6 80 78 Z" fill={DL.gold} /><rect x={24} y={76} width={62} height={8} rx={3} fill={DL.gold} /><circle cx={55} cy={92} r={7} fill={DL.gold} /></svg>} />
          <span style={{ ...rise(f, CLOCK - 4), fontFamily: DL_SERIF, fontSize: 60, color: DL.faint }}>→</span>
          <Step label="CLOCK" at={CLOCK} icon={<ClockFace size={110} hourDeg={300} minDeg={f * 6} />} />
        </div>
        <div style={{ ...rise(f, DISC - 4), position: 'absolute', left: 1000, top: 480, width: 800, padding: '24px 30px', background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.gold}`, borderRadius: 14 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>HISTORIANS CALL IT</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.gold, marginTop: 6 }}>time discipline</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 19, color: DL.faint, marginTop: 10 }}>E. P. Thompson · Past &amp; Present, 1967</div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 720, width: 800 }}>
          <div style={{ ...rise(f, DONE - 10), position: 'relative', display: 'inline-block', fontFamily: DL_SANS, fontSize: 42, color: DL.dim }}>
            Stop when the work is done.
            <div style={{ position: 'absolute', left: -4, right: -4, top: '52%', height: 4, background: DL.red, transform: `scaleX(${strikeDone})`, transformOrigin: 'left' }} />
          </div>
          <div style={{ ...rise(f, SAYS), fontFamily: DL_SERIF, fontSize: 58, color: DL.text, marginTop: 18 }}>
            Stop when <span style={{ color: DL.gold, fontStyle: 'italic' }}>the clock</span> says so.
          </div>
        </div>
      </AbsoluteFill>

      {/* ── part 2: Harrison's sea watch */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 110, top: 260 }}>
          <svg width={900} height={560} viewBox="0 0 900 560">
            <rect x={60} y={20} width={780} height={500} rx={40} fill="#38bdf80a" stroke="#38bdf826" strokeWidth={2} />
            <text x={450} y={300} textAnchor="middle" fill={DL.faint} fontFamily={DL_MONO} fontSize={22} letterSpacing={8}>ATLANTIC</text>
            <path d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`} fill="none" stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
            <circle cx={P0.x} cy={P0.y} r={10} fill={DL.text} />
            <text x={P0.x} y={P0.y - 22} textAnchor="end" fill={DL.dim} fontFamily={DL_MONO} fontSize={22} letterSpacing={3}>ENGLAND</text>
            <circle cx={P2.x} cy={P2.y} r={10} fill={DL.text} />
            <text x={P2.x + 4} y={P2.y + 44} fill={DL.dim} fontFamily={DL_MONO} fontSize={22} letterSpacing={3}>JAMAICA</text>
            <circle cx={bx} cy={by} r={14} fill={DL.gold} />
            <circle cx={bx} cy={by} r={30} fill={DL.gold} opacity={0.15} />
          </svg>
          <div style={{ ...rise(f, HARR + 4), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted, marginTop: 8 }}>HMS DEPTFORD · NOV 1761 – JAN 1762</div>
        </div>
        <div style={{ position: 'absolute', left: 1100, top: 250, width: 700, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ borderRadius: '50%', boxShadow: `0 0 40px ${DL.gold}33` }}><ClockFace size={230} hourDeg={60 + f * 0.04} minDeg={f * 0.5} ring="#cfd3d8" /></div>
            <div>
              <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>JOHN HARRISON · H4</div>
              <div style={{ ...rise(f, FIVE - 4), fontFamily: DL_SERIF, fontSize: 96, color: DL.gold, lineHeight: 1 }}>≈ 5 s</div>
              <div style={{ ...rise(f, FIVE + 4), fontFamily: DL_SANS, fontSize: 30, color: DL.warm, marginTop: 6 }}>slow, after weeks at sea</div>
            </div>
          </div>
          <div style={{ ...rise(f, CARRY - 4), fontFamily: DL_SERIF, fontSize: 64, color: DL.text, marginTop: 60 }}>Time you can <span style={{ color: DL.gold, fontStyle: 'italic' }}>carry.</span></div>
          <div style={{ ...rise(f, SELL - 4), fontFamily: DL_SERIF, fontSize: 64, color: DL.text, marginTop: 14 }}>Time you can <span style={{ color: DL.red, fontStyle: 'italic' }}>sell.</span></div>
        </div>
      </AbsoluteFill>

      <DidYouKnowThat at={DID} out={WORKED} source="E. P. Thompson, “Time, Work-Discipline and Industrial Capitalism” (1967)">
        for generations, workers simply <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>took Mondays off</span>. They called it “Saint Monday”.
      </DidYouKnowThat>
      <div style={{ position: 'absolute', left: trainX, top: 690, opacity: trainOp }}>
        <svg width={420} height={150} viewBox="0 0 420 150">
          {[0, 1, 2].map((i) => { const p = ((f + i * 12) % 36) / 36; return <circle key={i} cx={330 - p * 120} cy={30 - p * 20} r={12 + p * 18} fill="#ffffff" opacity={0.22 * (1 - p)} />; })}
          <rect x={20} y={60} width={130} height={56} rx={6} fill={DL.panel} stroke={DL.gold} strokeWidth={3} />
          <rect x={160} y={60} width={130} height={56} rx={6} fill={DL.panel} stroke={DL.gold} strokeWidth={3} />
          <rect x={300} y={50} width={100} height={66} rx={8} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          <rect x={318} y={22} width={22} height={30} fill={DL.panel2} stroke={DL.gold} strokeWidth={3} />
          {[50, 120, 190, 260, 330, 380].map((cx) => <circle key={cx} cx={cx} cy={124} r={13} fill={DL.bg} stroke={DL.gold} strokeWidth={3} />)}
          <line x1={0} y1={140} x2={420} y2={140} stroke={DL.border} strokeWidth={4} />
        </svg>
      </div>
      <Cliffhanger next="1883" parts={[{ text: 'They lost their Monday.', at: MONDAY4 }, { text: 'Next, steam takes', at: TAKE }, { text: 'noon itself.', at: NOON }]} />
      </EraExit>
      <EraHud year={1760} />
    </AbsoluteFill>
  );
};
export default Tc1700;
