import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DayClock, DidYouKnowThat, Cliffhanger } from '../../lib/dykkit';
import { EpisodeHud, SunChip, SunDisc, QuoteCard, WakePlace, win, SUN, CardSource, OnWord } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 10/14 — ERA 6: today (RESEARCH F10, F10b, F11, F12). DYK card first: Parker's
// 24 Dec 2024 pass — 6.1 million km on "six", ≈ 700,000 km/h on "seven". The probe dives
// through the corona from "NASA's"; FASTEST on "fastest"; THROUGH THE OUTER ATMOSPHERE on
// "atmosphere". Day Clock today from "Back" (inside / screens / sunscreen highlighted on their
// words). IEA quote (verbatim) on "International", "cheapest … ever seen" on "cheapest";
// solar share bar counts to 6.9 % on "seven". Photosynthesis: plant on "plant", plate on
// "meal", STORED SUNLIGHT on "stored", the equation on "photosynthesis". VO su09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Su2000', durationInSeconds: 48.9333, fps: 30, width: 1920, height: 1080 };
const DUR = 1468;

const C = makeCue(vo, 'su09-2000', 0.8);
const DID = C.at('Did');
const CHRISTMAS = C.at('Christmas');
const SPACECRAFT = C.at('spacecraft');
const FROM_SUN = C.at('Sun', 1);
const FLEW = C.at('flew');
const SIX = C.at('six');
const SEVEN1 = C.at('seven', 1);
const NASA = C.at("NASA's");
const PARKER = C.at('Parker');
const FASTEST = C.at('fastest');
const ATMOS = C.at('atmosphere');
const BACK = C.at('Back');
const INSIDE = C.at('inside');
const SCREENS = C.at('screens');
const SUNSCREEN = C.at('sunscreen');
const IEA = C.at('International');
const CHEAPEST = C.at('cheapest');
const Y2020 = C.at('twenty', 3); // 'in twenty twenty' (1-2 = Christmas Eve twenty twenty four)
const PROJECTS = C.at('projects');
const BY = C.at('By');
const SEVEN2 = C.at('seven', 2);
const AND = C.at('And', 1);
const PLANT = C.at('plant');
const MEAL = C.at('meal');
const STORED = C.at('stored');
const PHOTO = C.at('photosynthesis');
const TOUCHED = C.at('touched');
const NEVER = C.at('never');
const IS_LAST = C.at('is', 2);
const STEP = 12;

const DAYNOW = [
  { from: 23, to: 7, label: 'Sleep', color: '#38bdf8' },
  { from: 7, to: 9, label: 'Phone · commute', color: '#e74c3c' },
  { from: 9, to: 17, label: 'Inside, under a roof', color: '#71717a' },
  { from: 17, to: 18, label: 'Outside — with sunscreen', color: '#ffc94a' },
  { from: 18, to: 23, label: 'Screens', color: '#e74c3c' },
];

const Su2000: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const dive = win(f, NASA + 8, BACK, 6);
  const pr = interpolate(f, [NASA + 8, BACK], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const ang = -Math.PI * 0.9 + pr * Math.PI * 1.1;
  const px = 640 + Math.cos(ang) * 420, py = 560 + Math.sin(ang) * 260;
  const day = win(f, BACK - 2, IEA - 4);
  const iea = win(f, IEA - 4, AND + 10);
  const share = interpolate(f, [SEVEN2 - 4, SEVEN2 + 20], [0, 6.9], { ...DCLAMP, easing: DL_EASE.out });
  const photo = ease(f, AND + 10, AND + 16);
  const push = 1 + 0.05 * ease(f, AND, DUR, 0, 1, DL_EASE.inOut); // slow push-in under the closing lines

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1006" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="NOW" dockAt={DID - 22} />
      <WakePlace place="" at={0} dockAt={DID - 22} yearAt={C.at('today', 1)} />

      {/* the dive through the corona */}
      <AbsoluteFill style={{ opacity: dive }}>
        <div style={{ position: 'absolute', left: 640 - 324 + 160, top: 560 - 324 }}>
          <SunDisc size={360} id="parkSun" glow={1.4 + 0.6 * ease(f, FLEW - 2, FLEW + 14)} />
        </div>
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 160, top: 0 }}>
          <ellipse cx={640 + 180} cy={560} rx={420} ry={260} fill="none" stroke={DL.border} strokeWidth={3} strokeDasharray="8 10" />
          <g transform={`translate(${px + 180} ${py})`}>
            <rect x={-26} y={-6} width={52} height={12} fill="#f4ede4" />
            <rect x={-6} y={6} width={12} height={34} fill="#cfd8dc" />
            <line x1={-24} y1={24} x2={24} y2={24} stroke="#5aa0e0" strokeWidth={6} />
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 1260, top: 250, width: 520, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ ...rise(f, PARKER - 2), fontFamily: DL_SERIF, fontSize: 56, color: DL.text }}>Parker Solar Probe</div>
          <SunChip text="FASTEST OBJECT EVER BUILT" at={FASTEST} color={SUN.mid} size={26} />
          <SunChip text="THROUGH THE OUTER ATMOSPHERE" at={ATMOS} color={DL.red} size={26} />
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', opacity: day }}>
        <DayClock year="today" segs={DAYNOW} at={BACK} step={STEP} hotSeq={[[2, INSIDE], [4, SCREENS], [3, SUNSCREEN]]} />
      </div>

      <AbsoluteFill style={{ opacity: iea }}>
        <div style={{ position: 'absolute', left: 160, top: 220 }}>
          <QuoteCard who="INTERNATIONAL ENERGY AGENCY · WORLD ENERGY OUTLOOK 2020" at={IEA} w={1600} parts={[{ text: '“solar projects now offer', at: PROJECTS }, { text: 'some of the lowest cost electricity ever seen”', at: CHEAPEST }]} />
        </div>
        <div style={{ position: 'absolute', left: 1500, top: 430 }}><SunChip text="2020" at={Y2020} color={SUN.mid} size={40} /></div>
        {/* the best projects: a solar farm, row by row (12-frame steps) */}
        <svg width={1300} height={250} viewBox="0 0 1300 250" style={{ position: 'absolute', left: 160, top: 450 }}>
          {[0, 1, 2].map((r) => Array.from({ length: 9 }, (_, i) => (
            <g key={`${r}-${i}`} opacity={ease(f, IEA + r * 12, IEA + r * 12 + 8)}>
              <polygon points={`${40 + i * 135 + r * 30},${40 + r * 70} ${150 + i * 135 + r * 30},${40 + r * 70} ${140 + i * 135 + r * 30},${90 + r * 70} ${30 + i * 135 + r * 30},${90 + r * 70}`} fill="#0f2a4a" stroke="#5aa0e0" strokeWidth={2} />
              <polygon points={`${40 + i * 135 + r * 30},${40 + r * 70} ${150 + i * 135 + r * 30},${40 + r * 70} ${140 + i * 135 + r * 30},${90 + r * 70} ${30 + i * 135 + r * 30},${90 + r * 70}`} fill={SUN.mid} opacity={0.3 * ease(f, CHEAPEST - 2, CHEAPEST + 10)} />
            </g>
          )))}
        </svg>
        <div style={{ position: 'absolute', left: 160, top: 740, width: 1600, opacity: ease(f, BY - 4, BY + 6) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>SOLAR · SHARE OF THE WORLD'S ELECTRICITY · 2024</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 80, color: SUN.mid, fontVariantNumeric: 'tabular-nums', opacity: ease(f, SEVEN2 - 4, SEVEN2 + 4) }}>{share.toFixed(1)} %</span>
          </div>
          <div style={{ height: 36, marginTop: 12, background: DL.panel2, borderRadius: 8 }}>
            <div style={{ height: '100%', width: `${share}%`, background: SUN.mid, borderRadius: 8 }} />
          </div>
          <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>Ember, Global Electricity Review 2025</div>
        </div>
      </AbsoluteFill>

      {/* stored sunlight */}
      <AbsoluteFill style={{ opacity: photo, transform: `scale(${push})` }}>
        <svg width={1600} height={520} viewBox="0 0 1600 520" style={{ position: 'absolute', left: 160, top: 220 }}>
          <g opacity={ease(f, PLANT - 2, PLANT + 8)}>
            <path d="M260 480 V300" stroke="#2f9e5a" strokeWidth={10} />
            <path d="M260 340 Q170 300 160 220 Q240 230 260 320 Z M260 300 Q350 250 370 170 Q280 190 260 290 Z" fill="#34c759" />
          </g>
          <g opacity={ease(f, MEAL - 2, MEAL + 8)}>
            <ellipse cx={640} cy={420} rx={170} ry={40} fill="#e9e1cf" />
            <ellipse cx={640} cy={410} rx={120} ry={26} fill="#d9a35b" />
            <circle cx={600} cy={400} r={20} fill="#34c759" /><circle cx={680} cy={404} r={16} fill="#e74c3c" />
          </g>
          {[260, 640].map((x, i) => <path key={x} d={`M${x} 60 L${x} 160`} stroke={SUN.mid} strokeWidth={6} strokeDasharray="10 10" opacity={ease(f, STORED - 2 + i * 6, STORED + 8 + i * 6)} />)}
          <circle cx={450} cy={40} r={34} fill={SUN.mid} opacity={ease(f, STORED - 4, STORED + 6)} />
        </svg>
        <div style={{ position: 'absolute', left: 1040, top: 300, width: 720, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ ...rise(f, STORED - 2), fontFamily: DL_SERIF, fontSize: 80, color: SUN.mid, fontStyle: 'italic' }}>stored sunlight</div>
          <div style={{ ...rise(f, PHOTO - 2), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 2, color: DL.dim }}>PHOTOSYNTHESIS</div>
          <div style={{ ...rise(f, PHOTO + 8), fontFamily: DL_MONO, fontSize: 26, color: DL.text }}>light + CO₂ + water → sugar + oxygen</div>
        </div>
      </AbsoluteFill>
      <DidYouKnowThat at={DID} out={NASA}>
        <span style={{ opacity: ease(f, CHRISTMAS - 4, CHRISTMAS + 6) }}><OnWord at={C.at('Christmas')}>on Christmas Eve 2024,</OnWord></span>
        <span style={{ opacity: ease(f, SPACECRAFT - 4, SPACECRAFT + 6) }}> a spacecraft passed</span>
        <span style={{ color: '#ff9a1f', fontStyle: 'italic', opacity: ease(f, SIX - 2, SIX + 8) }}> 6.1 million km</span>
        <span style={{ opacity: ease(f, FROM_SUN - 6, FROM_SUN + 4) }}> from the Sun —</span>
        <span style={{ opacity: ease(f, SEVEN1 - 2, SEVEN1 + 8) }}> at almost <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>700,000 km/h.</span></span>
        <CardSource at={SEVEN1}>Guinness World Records · NASA — Parker Solar Probe, 24 Dec 2024</CardSource>
        </DidYouKnowThat>
      <Cliffhanger next="THE ANSWER" parts={[{ text: 'We have touched the Sun,', at: TOUCHED }, { text: 'and we live on it.', at: C.at('live') }, { text: 'So why', at: C.at('So') }, { text: 'have you still never seen it', at: NEVER }, { text: 'as it is today?', at: IS_LAST }]} />
      <EpisodeHud year={2026} episode="02" />
    </AbsoluteFill>
  );
};
export default Su2000;
