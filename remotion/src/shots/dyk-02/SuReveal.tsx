import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SunDisc, SunChip, LightBeam, win, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 11/14 — the answer (RESEARCH F1, F17). THE ANSWER on "answer"; FAST / NOT INSTANT;
// the photon crosses during "takes … kilometres" (8 MIN 20 S on "twenty", 150 MILLION KM on
// "fifty"); ALREADY OLD on "old". The secret: a cut-away Sun, the core glows on "core", a
// random-walk path scribbles out during "fighting its way out"; ≈ 170,000 YEARS counts on
// "seventy" (NASA estimate, hedged on screen); NO FARMS / CITIES / WRITING on their words.
// The five verbs return on their words; UNCHANGED on "change"; payoff "Only as it was." on
// "Only" / "was" (riser lands on "was"). VO su10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'SuReveal', durationInSeconds: 45.9333, fps: 30, width: 1920, height: 1080 };
const DUR = 1378;

const C = makeCue(vo, 'su10-reveal', 0.8);
const ANSWER = C.at('answer');
const FAST = C.at('fast');
const INSTANT = C.at('instant');
const TAKES = C.at('takes');
const TWENTY = C.at('twenty');
const FIFTY = C.at('fifty');
const SO = C.at('So');
const OLD = C.at('old');
const SECRET = C.at('secret');
const CORE = C.at('core');
const FIGHTING = C.at('struggling');
const OUT = C.at('out');
const NASA = C.at('NASA');
const SEVENTY = C.at('seventy');
const YEARS = C.at('years');
const FARMS = C.at('farms');
const CITIES = C.at('cities');
const WRITING = C.at('writing');
const FOR = C.at('For');
const BEHAVE = C.at('behave');
const VERBS: [string, string, number][] = [
  ['CELEBRATED', '1500', C.at('celebrated')], ['HID FROM', '1752', C.at('hid')], ['SPLIT', '1800', C.at('split')],
  ['CHASED', '1928', C.at('chased')], ['TOUCHED', '2024', C.at('touched')],
];
const THE_SUN = C.at('The', 4); // 'The Sun did not change' (1 answer · 2 Sun's core · 3 toward the Sun)
const CHANGE = C.at('change');
const NEVER = C.at('never');
const ONLY = C.at('Only');
const WAS_LAST = C.at('was', 3);
const AGO = C.at('ago');

// deterministic random walk from the core outward
const WALK = (() => {
  const pts: [number, number][] = [[0, 0]];
  let x = 0, y = 0;
  for (let i = 1; i < 90; i++) {
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const ang = (a - Math.floor(a)) * Math.PI * 2;
    const r = Math.hypot(x, y);
    x += Math.cos(ang) * 16 + (r > 0 ? (x / r) * 2.2 : 0);
    y += Math.sin(ang) * 16 + (r > 0 ? (y / r) * 2.2 : 0);
    pts.push([x, y]);
  }
  return pts;
})();

const SuReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const p1 = win(f, 0, SECRET, 1);
  const photon = interpolate(f, [TAKES, FIFTY + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const p2 = win(f, SECRET + 6, FOR, 6);
  const coreGlow = ease(f, CORE - 2, CORE + 10);
  const walkN = Math.round(interpolate(f, [FIGHTING - 4, OUT + 20], [0, WALK.length], DCLAMP));
  const years = Math.round(interpolate(f, [SEVENTY - 4, YEARS + 6], [0, 170000], { ...DCLAMP, easing: DL_EASE.out }) / 1000) * 1000;
  const p3 = win(f, FOR - 4, NEVER + 2);
  const p4 = ease(f, NEVER - 4, NEVER + 4);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 18, color: DL.red, opacity: ease(f, -6, 0) * (1 - ease(f, NEVER - 10, NEVER)), transform: `scale(${1 + 0.15 * ease(f, ANSWER, ANSWER + 4) * (1 - ease(f, ANSWER + 6, ANSWER + 20))})` }}>THE ANSWER</div>

      {/* light is fast, not instant */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', gap: 40 }}>
          <SunChip text="LIGHT IS FAST" at={FAST} color={DL.text} size={34} />
          <SunChip text="BUT NOT INSTANT" at={INSTANT} color={DL.red} size={34} />
        </div>
        <div style={{ position: 'absolute', left: 210, top: 400 }}>
          <LightBeam w={1500} progress={photon} at={-10} label={f >= FIFTY ? '150 MILLION KM' : ''} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 90, color: SUN.mid, opacity: ease(f, TWENTY - 2, TWENTY + 6) }}>8 MIN 20 S</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', opacity: ease(f, SO - 2, SO + 6) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 30px', borderRadius: 12, background: DL.panel, border: `1px solid ${DL.border}` }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 48, color: DL.text }}>every sunrise you have seen:</span>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: SUN.mid, opacity: ease(f, OLD - 2, OLD + 6) }}>already old</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* the secret: the long way out of the core */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <svg width={760} height={760} viewBox="-380 -380 760 760" style={{ position: 'absolute', left: 160, top: 190 }}>
          <defs><clipPath id="revHalf"><rect x={-380} y={-380} width={760} height={760} /></clipPath></defs>
          <circle r={330} fill={SUN.rim} opacity={0.85 - 0.45 * ease(f, C.at('deep') - 2, C.at('deep') + 12)} />
          <circle r={250} fill={SUN.mid} opacity={0.9 - 0.4 * ease(f, C.at('deep') - 2, C.at('deep') + 12)} />
          <circle r={110} fill={SUN.core} style={{ filter: `drop-shadow(0 0 ${40 * coreGlow}px #fff)` }} />
          <text x={0} y={8} textAnchor="middle" fill="#7a3b00" fontFamily={DL_MONO} fontSize={26} letterSpacing={4} opacity={coreGlow}>CORE</text>
          <polyline points={WALK.slice(0, walkN).map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="#3a1a06" strokeWidth={4} strokeLinejoin="round" />
        </svg>
        <div style={{ position: 'absolute', left: 1000, top: 260, width: 780, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ ...rise(f, SECRET - 4), fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: DL.dim }}>THE SECRET</div>
          <SunChip text="MADE IN THE CORE" at={CORE} color={SUN.mid} size={28} />
          <SunChip text="A LONG FIGHT OUT" at={FIGHTING} color={SUN.rim} size={28} />
          <div style={{ opacity: ease(f, NASA - 4, NASA + 4) }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 120, lineHeight: 1, color: DL.text, fontVariantNumeric: 'tabular-nums', opacity: ease(f, SEVENTY - 4, SEVENTY + 4) }}>≈ {years.toLocaleString('en-US')}</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: SUN.mid, marginTop: 6, opacity: ease(f, YEARS - 2, YEARS + 6) }}>YEARS · CORE → SURFACE</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim, marginTop: 8 }}>NASA ESTIMATE · OTHER ESTIMATES VARY WIDELY</div>
          </div>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim, whiteSpace: 'nowrap', marginBottom: -10, opacity: ease(f, C.at('began') - 2, C.at('began') + 6) }}>WHEN IT SET OUT:</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {[['NO FARMS', FARMS], ['NO CITIES', CITIES], ['NO WRITING', WRITING]].map(([t, at]) => <SunChip key={String(t)} text={String(t)} at={Number(at)} color={DL.red} size={26} />)}
          </div>
        </div>
      </AbsoluteFill>

      {/* five centuries — and the Sun did not change */}
      <AbsoluteFill style={{ opacity: p3, alignItems: 'center' }}>
        <div style={{ ...rise(f, FOR - 2), marginTop: 200, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.dim }}><span>FIVE CENTURIES</span><span style={{ opacity: ease(f, BEHAVE - 2, BEHAVE + 6) }}> OF CHANGING BEHAVIOUR</span></div>
        <div style={{ width: 1420, height: 4, marginTop: 30, borderRadius: 2, background: `linear-gradient(90deg, ${DL.gold}, ${SUN.rim})`, transform: `scaleX(${ease(f, FOR, FOR + 30, 0, 1, DL_EASE.inOut)})`, transformOrigin: 'left center' }} />
        <div style={{ display: 'flex', gap: 30, marginTop: 20 }}>
          {VERBS.map(([v, y, at]) => (
            <div key={v} style={{ opacity: 0.6 * ease(f, FOR + 6, FOR + 18) + 0.4 * ease(f, at - 2, at + 6), transform: `scale(${ease(f, at - 2, at + 8, 1.12, 1)})`, width: 260, padding: '24px 0', borderRadius: 16, background: DL.panel, border: `2px solid ${f >= at - 2 ? SUN.rim : DL.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 50, color: DL.gold }}>{y}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.text, opacity: ease(f, at - 2, at + 6) }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, opacity: ease(f, THE_SUN - 4, THE_SUN + 6) }}><SunDisc size={170} id="revSun" /></div>
        <div style={{ marginTop: -20 }}><SunChip text="THE SUN · UNCHANGED" at={CHANGE} color={SUN.mid} size={30} /></div>
      </AbsoluteFill>

      {/* payoff */}
      <AbsoluteFill style={{ opacity: p4, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: 0.9, marginBottom: 20 }}><SunDisc size={220} id="revSun2" /></div>
        <div style={{ ...rise(f, NEVER - 2), width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 92, lineHeight: 1.15, color: DL.text }}>You have never seen the Sun as it is.</div>
        <div style={{ marginTop: 26, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 110, color: SUN.mid, opacity: ease(f, ONLY - 2, ONLY + 8), textShadow: `0 0 ${40 * ease(f, WAS_LAST, WAS_LAST + 20)}px ${SUN.rim}` }}>Only as it was.</div>
        <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 6, color: DL.dim, opacity: ease(f, AGO - 6, AGO + 4) }}>EIGHT MINUTES AGO</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default SuReveal;
