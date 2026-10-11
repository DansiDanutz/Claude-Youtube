import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, WakePlace, win, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 12/14 — ERA 7: 2100, PREDICTION (labelled the whole time). Evidence only:
// Caltech MAPLE 2023 (F13) — satellite on "Caltech", beam on "wirelessly", rooftop on
// "Pasadena", TINY / IT WORKED on their words. IEA 2014 roadmaps (F14): 27 % counts on
// "seven", BY 2050 on "fifty", NOT A FORECAST on "forecast". Then the labelled scenario:
// collectors in orbit on "orbit", NEVER SETS on "never", sunlit city on "Cities". NASA's
// ~5 billion years (F15) on "five". The question on "question"; the last line on "learned".
// VO su11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su2100', durationInSeconds: 50.7667, fps: 30, width: 1920, height: 1080 };
const DUR = 1523;

const C = makeCue(vo, 'su11-2100', 0.8);
const HAPPENED = C.at('happened');
const DOCK = C.at('hundred', 1) + 12; // 'Now, the year twenty one hundred.' — the year docks after it is spoken
const EVIDENCE = C.at('evidence');
const NASA = C.at('NASA');
const Y2100_END = C.at('twenty', 7);
const WHAT = C.at('what');
const CALTECH = C.at('Caltech');
const MAPLE = C.at('Maple');
const WIRELESS = C.at('wirelessly');
const AIMED = C.at('aimed');
const PASADENA = C.at('Pasadena');
const TINY = C.at('tiny');
const WORKED = C.at('worked');
const FOURTEEN = C.at('fourteen');
const SKETCHED = C.at('sketched');
const SEVEN = C.at('seven');
const FIFTY = C.at('fifty');
const FORECAST = C.at('forecast');
const PUT = C.at('Put');
const SCENARIO = C.at('scenario');
const ORBIT = C.at('orbit');
const NEVER = C.at('never');
const CITIES = C.at('Cities');
const THE_SUN = C.at('The', 5); // 'The Sun itself' (1 the year · 2 the evidence · 3 the International · 4 the Sun never sets)
const FIVE = C.at('five');
const QUESTION = C.at('question');
const LEARNED = C.at('learned');

const Su2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const Y2023 = C.at('twenty', 2);
  const maple = win(f, Y2023 - 6, FOURTEEN - 2);
  const iea = win(f, FOURTEEN - 4, PUT + 4);
  const scen = win(f, PUT - 2, THE_SUN);
  const fin = ease(f, THE_SUN - 4, THE_SUN + 8);
  const beam = ease(f, WIRELESS - 2, WIRELESS + 12);
  const down = ease(f, AIMED - 2, PASADENA + 4);
  const pct = Math.round(interpolate(f, [SEVEN - 6, SEVEN + 14], [0, 27], { ...DCLAMP, easing: DL_EASE.out }));
  const ring = ease(f, C.at('Power', 2) - 4, ORBIT + 20, 0, 1, DL_EASE.inOut); // ring forms on "Power collected"
  const billion = interpolate(f, [FIVE - 2, FIVE + 14], [0, 5], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1626" />
      <Vignette />
      <EraHeader year="2100" idx={7} label="PREDICTION" dockAt={DOCK} />
      <WakePlace place="" at={0} dockAt={DOCK} yearAt={C.at('twenty', 1)} />
      <div style={{ ...rise(f, DOCK + 18), position: 'absolute', left: 120, top: 172, display: 'flex', alignItems: 'center', gap: 16, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.red }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px dashed ${DL.red}` }} />
        PREDICTION · A SCENARIO, NOT A FACT
      </div>
      {/* an unrisen dawn: a horizon and a dashed Sun below it, on "That morning" */}
      <svg width={900} height={260} viewBox="0 0 900 260" style={{ position: 'absolute', left: 510, top: 360, opacity: win(f, C.at('That', 1), Y2023 - 4) }}>
        <circle cx={450} cy={230} r={110} fill="none" stroke={SUN.mid} strokeWidth={4} strokeDasharray="12 12" opacity={0.7} />
        <rect x={0} y={230} width={900} height={30} fill={DL.bg} />
        <line x1={0} y1={230} x2={900} y2={230} stroke={SUN.rim} strokeWidth={3} />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', opacity: win(f, HAPPENED, Y2023 - 4) }}><SunChip text="THAT MORNING HAS NOT HAPPENED YET" at={HAPPENED} color={DL.dim} size={28} /></div>
      <div style={{ ...rise(f, EVIDENCE - 2), position: 'absolute', right: 160, top: 172, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.dim, opacity: ease(f, EVIDENCE - 2, EVIDENCE + 6) * (1 - ease(f, PUT - 6, PUT)) }}>STEP 1 · THE EVIDENCE</div>

      {/* MAPLE */}
      <AbsoluteFill style={{ opacity: maple }}>
        <svg width={1000} height={640} viewBox="0 0 1000 640" style={{ position: 'absolute', left: 160, top: 240 }}>
          <path d="M0 640 Q500 470 1000 640 Z" fill="#1f5fa8" />
          <rect x={560} y={566} width={110} height={34} fill="#cfd8dc" opacity={ease(f, PASADENA - 2, PASADENA + 6)} />
          <rect x={590} y={548} width={50} height={18} fill="#5aa0e0" opacity={ease(f, PASADENA - 2, PASADENA + 6)} />
          <g transform="translate(300 120)">
            <rect x={-130} y={-24} width={90} height={48} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={3} />
            <rect x={40} y={-24} width={90} height={48} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={3} />
            <rect x={-36} y={-30} width={72} height={60} rx={6} fill="#cfd8dc" />
            {/* power across the gap, in space */}
            <line x1={-40} y1={-40} x2={-130} y2={-60} stroke={SUN.mid} strokeWidth={6} strokeDasharray="10 8" strokeDashoffset={-f} opacity={beam} />
            <circle cx={-130} cy={-60} r={10} fill="#ffd23f" opacity={beam} style={{ filter: 'drop-shadow(0 0 10px #ffd23f)' }} />
          </g>
          {/* signal aimed at a rooftop in Pasadena */}
          <path d={`M300 160 L${300 + (615 - 300) * down} ${160 + (548 - 160) * down}`} stroke="#ff3db4" strokeWidth={5} strokeDasharray="12 10" strokeDashoffset={-f * 1.5} opacity={ease(f, AIMED - 2, AIMED + 6)} />
        </svg>
        <div style={{ position: 'absolute', left: 1220, top: 260, width: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <SunChip text="2023" at={Y2023} color={DL.dim} size={26} />
            <SunChip text="CALTECH" at={CALTECH} color={DL.dim} size={26} />
          </div>
          <div style={{ ...rise(f, MAPLE - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>MAPLE</div>
          <SunChip text="POWER BEAMED · IN SPACE" at={WIRELESS} color={SUN.mid} size={26} />
          <SunChip text="SIGNAL · PASADENA ROOFTOP" at={PASADENA} color="#ff3db4" size={26} />
          <div style={{ display: 'flex', gap: 16 }}>
            <SunChip text="TINY" at={TINY} color={DL.dim} size={26} />
            <SunChip text="IT WORKED" at={WORKED} color={DL.green} size={26} />
          </div>
        </div>
      </AbsoluteFill>

      {/* IEA 2014 */}
      <AbsoluteFill style={{ opacity: iea }}>
        <div style={{ position: 'absolute', left: 160, top: 320, width: 1600, display: 'flex', flexDirection: 'column', gap: 30 }}>
          <SunChip text="2014 · INTERNATIONAL ENERGY AGENCY · SOLAR ROADMAPS" at={FOURTEEN} color={DL.dim} size={26} />
          <div style={{ ...rise(f, SKETCHED - 2), fontFamily: DL_SERIF, fontSize: 56, color: DL.text }}>A world where solar <span style={{ fontStyle: 'italic', color: SUN.mid }}>could</span> make…</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, SEVEN - 6, SEVEN + 2) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: SUN.mid, fontVariantNumeric: 'tabular-nums' }}>{pct} %</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color: DL.dim }}>OF ALL ELECTRICITY<span style={{ color: DL.text, opacity: ease(f, FIFTY - 2, FIFTY + 6) }}> · BY 2050</span></span>
          </div>
          <div style={{ height: 30, background: DL.panel2, borderRadius: 8, width: 1500 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: SUN.mid, borderRadius: 8 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <SunChip text="NOT A FORECAST" at={FORECAST} color={DL.red} size={34} />
            <span style={{ ...rise(f, FORECAST + 6), fontFamily: DL_MONO, fontSize: 24, color: DL.dim }}>IEA: the roadmaps “do not represent a forecast”</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* the scenario */}
      <AbsoluteFill style={{ opacity: scen }}>
        {/* "Put those together": the two pieces of evidence slide into the Earth */}
        {[['MAPLE · 2023', -1], ['IEA · 2014', 1]].map(([t, side]) => (
          <div key={String(t)} style={{ position: 'absolute', left: 160 + 450 - 120 + Number(side) * 380 * (1 - ease(f, PUT, SCENARIO, 0, 1, DL_EASE.inOut)), top: 600, width: 240, textAlign: 'center', opacity: ease(f, PUT - 2, PUT + 6) * (1 - ease(f, SCENARIO - 4, SCENARIO + 4)), padding: '10px 0', border: `2px solid ${DL.dim}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.dim }}>{t}</div>
        ))}
        <div style={{ position: 'absolute', left: 160, top: 240, opacity: ease(f, SCENARIO - 2, SCENARIO + 6), padding: '10px 20px', border: `2px dashed ${DL.red}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.red }}>STEP 2 · ONE SCENARIO</div>
        <svg width={900} height={560} viewBox="-450 -280 900 560" style={{ position: 'absolute', left: 160, top: 320 }}>
          <circle r={130} fill="#1f5fa8" />
          <ellipse rx={300 * ring} ry={110 * ring} fill="none" stroke={SUN.mid} strokeWidth={3} strokeDasharray="6 8" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2 + f / 120;
            return <rect key={i} x={Math.cos(a) * 300 * ring - 18} y={Math.sin(a) * 110 * ring - 8} width={36} height={16} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={2} opacity={ease(f, ORBIT + i * 3, ORBIT + i * 3 + 8)} />;
          })}
          <circle cx={-380} cy={-215} r={36} fill={SUN.mid} opacity={ease(f, ORBIT, ORBIT + 10)} />
        </svg>
        <div style={{ position: 'absolute', left: 1140, top: 330, width: 640, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <SunChip text="POWER COLLECTED IN ORBIT" at={ORBIT} color={SUN.mid} size={26} />
          <SunChip text="WHERE THE SUN NEVER SETS" at={NEVER} color={DL.dim} size={26} />
          <svg width={600} height={220} viewBox="0 0 600 220" style={{ opacity: ease(f, CITIES - 2, CITIES + 8) }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={20 + i * 82} y={220 - (80 + ((i * 53) % 120))} width={62} height={80 + ((i * 53) % 120)} fill={DL.panel} stroke={SUN.mid} strokeWidth={2} />)}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={'r' + i} x={26 + i * 82} y={220 - (80 + ((i * 53) % 120)) + 6} width={50} height={8} fill={SUN.mid} opacity={0.7} />)}
          </svg>
          <div style={{ ...rise(f, CITIES + 6), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>CITIES DESIGNED AROUND SUNLIGHT</div>
        </div>
      </AbsoluteFill>

      {/* the Sun will not notice */}
      <AbsoluteFill style={{ opacity: fin, alignItems: 'center' }}>
        <div style={{ marginTop: 190 }}><SunDisc size={160} id="s2100" /></div>
        <div style={{ ...rise(f, THE_SUN + 2), marginTop: -10, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.text, opacity: ease(f, THE_SUN + 2, THE_SUN + 10) * (1 - 0.5 * ease(f, FIVE, FIVE + 10)) }}>The Sun itself will not notice.</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 6, opacity: ease(f, NASA - 2, NASA + 6) }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 96, color: SUN.mid, opacity: ease(f, FIVE - 4, FIVE + 4) }}>≈ {billion.toFixed(0)} billion years</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>NASA ESTIMATE<span style={{ opacity: ease(f, FIVE + 6, FIVE + 14) }}> · YEARS LEFT</span></span>
        </div>
        <div style={{ ...rise(f, QUESTION - 2), marginTop: 30, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 54, lineHeight: 1.2, color: DL.dim }}>The question is not<span style={{ opacity: ease(f, C.at('whether') - 2, C.at('whether') + 6) }}> whether the Sun will be there</span><span style={{ opacity: ease(f, Y2100_END - 2, Y2100_END + 6) }}> in 2100.</span></div>
        <div style={{ ...rise(f, WHAT - 4), marginTop: 16, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, lineHeight: 1.2, color: DL.text }}>It is what we will have <span style={{ color: SUN.mid, opacity: ease(f, LEARNED - 2, LEARNED + 8) }}>learned to do with it.</span></div>
      </AbsoluteFill>
      <EpisodeHud year={2100} episode="02" prediction />
    </AbsoluteFill>
  );
};
export default Su2100;
