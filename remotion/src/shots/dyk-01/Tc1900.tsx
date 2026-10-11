import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, Vignette, DayClock, DidYouKnowThat, Cliffhanger, EraExit } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 8/13 — ERA 5: the 1900s. Ford's line (F10) 12h30 → 93 min on
// "ninety"; one lifetime 1900→1969 with flight at age 3 and the Moon at 69
// (F11); Keynes's 15-hour week (F12) pinned as a debt on "Remember".
// VO tc08 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc1900', durationInSeconds: 51.5, fps: 30, width: 1920, height: 1080 };
const DUR = 1545;

const C = makeCue(vo, 'tc08-1900', 0.8);
const DETROIT = C.at('Detroit');
const LINE = C.at('line');
const DID = C.at('Did');
const FORD = C.at('assembly');
const TWENTY = C.at('twenty');
const DAY1914 = [
  { from: 23, to: 7, label: 'Sleep', color: '#38bdf8' },
  { from: 7, to: 15, label: 'Factory — eight hours', color: '#71717a' },
  { from: 15, to: 23, label: 'Your own time', color: '#d4a017' },
];
const TWELVE = C.at('twelve');
const NINETY = C.at('ninety');
const CHILD = C.at('child');
const THREE = C.at('three', 2);
const MOON = C.at('Moon');
const CENT = C.at('centuries');
const KEYNES = C.at('Keynes');
const FIFTEEN = C.at('fifteen');
const REMEMBER = C.at('Remember');
const BACK = C.at('back');
const OUTSIDE = C.at('Outside');
const SATURDAYS = C.at('Saturdays');
const LIFETIME = C.at('lifetime');

// The factory shows on "Outside"; the people stagger in from "line".
const Queue: React.FC<{ at: number; peopleAt: number; out: number }> = ({ at, peopleAt, out }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, opacity: ease(f, at - 6, at + 6) * (1 - ease(f, out - 10, out)) }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26 }}>
        <svg width={170} height={230} viewBox="0 0 170 230" style={{ transform: `translateY(${ease(f, at - 6, at + 8, 30, 0)}px)` }}><rect x={10} y={40} width={150} height={190} fill={DL.panel} stroke={DL.border} strokeWidth={3} /><rect x={55} y={130} width={60} height={100} fill="#2a1d14" /><text x={85} y={90} textAnchor="middle" fill={DL.gold} fontFamily={DL_MONO} fontSize={22}>FORD</text></svg>
        {Array.from({ length: 13 }, (_, i) => (
          <svg key={i} width={46} height={110} viewBox="0 0 46 110" style={{ opacity: ease(f, peopleAt + i * 3, peopleAt + i * 3 + 8), transform: `translateY(${Math.sin(f / 18 + i) * 2}px)` }}>
            <circle cx={23} cy={18} r={12} fill={i % 4 === 0 ? DL.gold : DL.warm} />
            <path d="M5 108 C5 60 12 40 23 40 C34 40 41 60 41 108 Z" fill={i % 4 === 0 ? DL.gold : DL.warm} />
          </svg>
        ))}
      </div>
      <span style={{ opacity: ease(f, peopleAt, peopleAt + 10), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>HIGHLAND PARK · JANUARY 1914 · THOUSANDS LOOKING FOR WORK</span>
    </div>
  );
};

const Tc1900: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const p1 = ease(f, TWELVE - 30, TWELVE - 16) * (1 - ease(f, TWENTY - 12, TWENTY, 0, 1, DL_EASE.in));
  const pd = ease(f, TWENTY - 2, TWENTY + 10) * (1 - ease(f, CHILD - 18, CHILD - 6, 0, 1, DL_EASE.in));
  const p2 = ease(f, CHILD - 2, CHILD + 12) * (1 - ease(f, KEYNES - 14, KEYNES, 0, 1, DL_EASE.in));
  const p3 = ease(f, KEYNES - 2, KEYNES + 12);

  // conveyor: chassis boxes slide right, speeding up after "ninety"
  const speed = interpolate(f, [NINETY - 10, NINETY + 20], [1.2, 6], DCLAMP);
  const travel = f < NINETY ? f * 1.2 : NINETY * 1.2 + (f - NINETY) * speed;
  const minutes = Math.round(interpolate(f, [NINETY - 6, NINETY + 22], [750, 93], { ...DCLAMP, easing: DL_EASE.inOut }));
  const hh = Math.floor(minutes / 60), mm = minutes % 60;
  const timeLabel = minutes > 93 ? `${hh} h ${String(mm).padStart(2, '0')} min` : '93 min';

  // lifetime: 1900 → 1975 track; the life dot walks with the narration
  const yearsAt = (y: number) => 200 + ((y - 1900) / 75) * 1520;
  const lifeYear = interpolate(f, [CHILD, THREE, MOON, CENT], [1900, 1903, 1969, 1972], { ...DCLAMP, easing: DL_EASE.inOut });

  const pin = ease(f, REMEMBER - 2, REMEMBER + 8);
  const tagS = interpolate(f, [REMEMBER, REMEMBER + 7], [1.5, 1], { ...DCLAMP, easing: DL_EASE.out });
  const away = ease(f, BACK + 4, BACK + 22, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1209" />
      <Vignette />
      <EraExit dur={DUR}>
      <EraHeader year="1914" idx={5} label="FIVE DOLLARS · EIGHT HOURS · THE WEEKEND" place="Near Detroit · a line outside Ford's factory" dockAt={DETROIT + 10} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: pd }}>
        <DayClock year="1914" segs={DAY1914} at={TWENTY} hot={2} hotAt={TWENTY + 20} size={430} />
        <div style={{ ...rise(f, SATURDAYS - 4), padding: '14px 30px', borderRadius: 999, border: `2px solid ${DL.gold}`, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.gold }}>1926 · SATURDAYS OFF → THE WEEKEND</div>
      </div>

      {/* ── part 1: Ford */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 260, overflow: 'hidden', height: 300 }}>
          {Array.from({ length: 9 }, (_, i) => {
            const x = ((i * 260 + travel * 3) % 2340) - 260;
            return (
              <svg key={i} width={200} height={130} viewBox="0 0 200 130" style={{ position: 'absolute', left: x, top: 90 }}>
                <rect x={10} y={40} width={180} height={34} rx={6} fill={DL.panel2} stroke={DL.border} strokeWidth={2} />
                <rect x={60} y={10} width={80} height={32} rx={6} fill={DL.panel} stroke={DL.border} strokeWidth={2} />
                <circle cx={50} cy={86} r={18} fill={DL.panel} stroke={DL.gold} strokeWidth={4} />
                <circle cx={150} cy={86} r={18} fill={DL.panel} stroke={DL.gold} strokeWidth={4} />
              </svg>
            );
          })}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 232, height: 10, background: `repeating-linear-gradient(90deg, ${DL.border} 0 30px, transparent 30px 50px)`, backgroundPosition: `${travel * 3}px 0` }} />
        </div>
        <div style={{ ...rise(f, FORD), position: 'absolute', left: 120, top: 600, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>HENRY FORD · HIGHLAND PARK · 1913–14 · ONE MODEL T</div>
        <div style={{ ...rise(f, TWELVE - 4), position: 'absolute', left: 120, top: 660, display: 'flex', alignItems: 'baseline', gap: 40 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: minutes > 93 ? DL.text : DL.gold, fontVariantNumeric: 'tabular-nums' }}>{timeLabel}</span>
          <span style={{ ...rise(f, NINETY + 18), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.gold }}>WAS 12 h 30 min</span>
        </div>
      </AbsoluteFill>

      {/* ── part 2: one lifetime */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 120, top: 250, fontFamily: DL_SERIF, fontSize: 70, color: DL.text }}>
          One life. <span style={{ color: DL.gold, fontStyle: 'italic' }}>Born 1900.</span>
        </div>
        <div style={{ position: 'absolute', left: 0, top: 560, width: 1920, height: 4, background: DL.border }} />
        <div style={{ position: 'absolute', left: 200, top: 560, width: yearsAt(lifeYear) - 200, height: 4, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})` }} />
        <div style={{ position: 'absolute', left: yearsAt(lifeYear) - 18, top: 544, width: 36, height: 36, borderRadius: '50%', background: DL.gold, boxShadow: `0 0 26px ${DL.gold}aa` }} />
        {[[1903, 'AGE 3', 'first powered flight', THREE], [1969, 'AGE 69', 'humans walk on the Moon', MOON]].map(([y, age, what, at]) => (
          <div key={String(y)} style={{ ...rise(f, Number(at) - 4), position: 'absolute', left: yearsAt(Number(y)), top: 380, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>{age}</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 54, color: DL.text }}>{y}</span>
            <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.warm, whiteSpace: 'nowrap' }}>{what}</span>
            <div style={{ width: 2, height: 30, background: DL.gold, marginTop: 4 }} />
          </div>
        ))}
        <div style={{ ...rise(f, LIFETIME - 6), position: 'absolute', left: 160, right: 160, top: 680, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.2, color: DL.text }}>
          One lifetime now holds more change than <span style={{ color: DL.gold, fontStyle: 'italic' }}>whole centuries</span> once did.
        </div>
      </AbsoluteFill>

      {/* ── part 3: Keynes's prediction, pinned as a debt */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <div style={{ position: 'absolute', left: 560, top: 250, width: 800, transformOrigin: 'top right', transform: `translate(${away * 420}px, ${away * -60}px) scale(${1 - away * 0.45}) rotate(${-2 + away * 4}deg)` }}>
          <div style={{ padding: '46px 54px', background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `6px solid ${DL.gold}`, borderRadius: 16 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>1930 · JOHN MAYNARD KEYNES</div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, marginTop: 18 }}>“Economic Possibilities for our Grandchildren”</div>
            <div style={{ ...rise(f, FIFTEEN - 4), display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 34 }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 170, lineHeight: 1, color: DL.gold }}>15</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>hours a week</span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: -30, bottom: -36, opacity: pin, transform: `scale(${tagS}) rotate(-6deg)`, padding: '14px 26px', border: `3px solid ${DL.red}`, borderRadius: 8, background: DL.bg, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.red }}>
            REMEMBER THIS
          </div>
        </div>
      </AbsoluteFill>

      <Queue at={OUTSIDE} peopleAt={LINE} out={DID} />
      <DidYouKnowThat at={DID} out={TWELVE - 30} source="Ford Motor Company, January 1914: $5 for an eight-hour day (from $2.34 for nine hours)">
        Henry Ford <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>more than doubled</span> his workers’ pay — to $5 a day — and cut the day to eight hours.
      </DidYouKnowThat>
      <Cliffhanger next="TODAY" parts={[{ text: 'That prediction is coming back.', at: BACK }]} />
      </EraExit>
      <EraHud year={1914} />
    </AbsoluteFill>
  );
};
export default Tc1900;
