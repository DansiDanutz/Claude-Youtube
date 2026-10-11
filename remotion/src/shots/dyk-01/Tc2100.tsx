import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, FactCard, Vignette } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 11/13 — ERA 7: 2100, PREDICTION (labelled on screen the whole time).
// UN WPP 2024 (F16) on "Nations"; AI as an expectation, never a fact; Keynes's
// debt from Tc1900 pays back on "Keynes's"; the freed hour refills on
// "repeats"; energy / money struck, "a day you remember" lands on "remember".
// VO tc11 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc2100', durationInSeconds: 43.8, fps: 30, width: 1920, height: 1080 };
const DUR = 1314;

const C = makeCue(vo, 'tc11-2100', 0.8);
const UN = C.at('Nations');
const LONGER = C.at('longer');
const AI = C.at('Goldman');
const SIXTY = C.at('sixty');
const REPEATS = C.at('repeats');
const FASTER = C.at('faster');
const RAREST = C.at('rarest');
const ENERGY = C.at('energy');
const MONEY = C.at('money');
const REMEMBER = C.at('remember');
const FOLLOW = C.at('follow');
const TOGETHER = C.at('together');
const FIFTEEN = C.at('fifteen');
const KEYNES = C.at('Keynes');
const FINALLY = C.at('finally');

// deterministic skyline + AI node graph
const TOWERS = Array.from({ length: 14 }, (_, i) => ({ x: i * 62, w: 46 + ((i * 17) % 20), h: 140 + ((i * 53) % 230) }));
const NODES = Array.from({ length: 12 }, (_, i) => ({ x: 40 + ((i * 97) % 800), y: 40 + ((i * 61) % 170) }));
const LINKS = NODES.map((_, i) => [i, (i * 5 + 3) % NODES.length]);

const Tc2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the Keynes card arrives on "fifteen" (the number he predicted), about 1.2 s before his name
  const p1 = 1 - ease(f, FIFTEEN - 14, FIFTEEN, 0, 1, DL_EASE.in);
  const p2 = ease(f, FIFTEEN - 2, FIFTEEN + 12) * (1 - ease(f, RAREST - 14, RAREST, 0, 1, DL_EASE.in));
  const p3 = ease(f, RAREST - 2, RAREST + 12);
  const city = ease(f, 10, 50, 0, 1, DL_EASE.out);
  const net = ease(f, AI - 4, AI + 30);
  const refill = Math.round(interpolate(f, [REPEATS, FASTER + 10], [0, 60], DCLAMP));
  const strike = (at: number) => ease(f, at + 4, at + 14);
  // "Put those facts together": the evidence converges toward the centre
  const together = ease(f, TOGETHER - 2, TOGETHER + 16, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1626" />
      <Vignette />
      <EraHeader year="2100" idx={7} label="PREDICTION" />
      <div style={{ ...rise(f, 30), position: 'absolute', left: 120, top: 172, display: 'flex', alignItems: 'center', gap: 16, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.red }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, border: `2px dashed ${DL.red}` }} />
        PREDICTION · A SCENARIO, NOT A FACT
      </div>

      {/* ── part 1: the forecasts */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 120, top: 300, transform: `translateX(${together * 100}px) scale(${1 - together * 0.08})`, opacity: 1 - together * 0.4 }}>
          <svg width={880} height={600} viewBox="0 0 880 600">
            {LINKS.map(([a, b], i) => (
              <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke={DL.sky} strokeWidth={2} opacity={0.35 * net} />
            ))}
            {NODES.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={6 + 3 * Math.sin(f / 9 + i)} fill={DL.sky} opacity={net * (0.6 + 0.4 * Math.sin(f / 7 + i * 2))} />
            ))}
            <g transform="translate(20 0)">
              {TOWERS.map((t, i) => (
                <g key={i}>
                  <rect x={t.x} y={560 - t.h * city} width={t.w} height={t.h * city} fill={DL.panel} stroke={DL.border} strokeWidth={2} />
                  {Array.from({ length: Math.floor(t.h / 34) }, (_, k) => (
                    <rect key={k} x={t.x + 10} y={560 - t.h * city + 14 + k * 34} width={t.w - 20} height={8} fill={DL.sky} opacity={((i + k) % 3 === 0 ? 0.8 : 0.2) * city} />
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
        <div style={{ ...rise(f, FOLLOW - 2), position: 'absolute', left: 1100, top: 240, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 5, color: DL.warm }}>THE EVIDENCE · REAL DATA</div>
        <div style={{ position: 'absolute', left: 1100, top: 310, display: 'flex', flexDirection: 'column', gap: 28, opacity: 1 - ease(f, AI - 10, AI) }}>
          <FactCard label="UN PROJECTION · 2100" value="≈ 10.2 billion" sub="Peak ≈ 10.3 bn in the mid-2080s." source="UN World Population Prospects 2024" at={UN - 4} w={700} accent={DL.sky} />
          <div style={{ ...rise(f, LONGER - 4), alignSelf: 'flex-start', padding: '14px 24px', border: `2px solid ${DL.sky}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.sky }}>LIVING LONGER THAN EVER</div>
        </div>
        <div style={{ position: 'absolute', left: 1100, top: 310, display: 'flex', flexDirection: 'column', gap: 28, transform: `translateX(${-together * 180}px) scale(${1 - together * 0.06})`, transformOrigin: 'center' }}>
          <FactCard label="AI · GOLDMAN SACHS, 2023" value="≈ 300 million" sub="full-time jobs' worth of work exposed to automation." source="Briggs & Kodnani, Goldman Sachs Economics Research" at={AI - 2} w={700} accent={DL.red} />
          <FactCard label="UK FOUR-DAY WEEK TRIAL, 2022" value="56 of 61" sub="companies kept it after the trial." source="Autonomy / 4 Day Week Global, 2023" at={SIXTY - 2} w={700} accent={DL.green} />
        </div>
      </AbsoluteFill>

      {/* ── part 2: Keynes's debt comes due, and the hour refills */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 560, top: 260, width: 800, transform: `translateY(${(1 - p2) * -40}px)` }}>
          <div style={{ padding: '40px 54px', background: DL.panel, border: `1px solid ${DL.border}`, borderTop: `6px solid ${DL.gold}`, borderRadius: 16 }}>
            <div style={{ opacity: ease(f, KEYNES - 2, KEYNES + 8), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted }}>1930 · KEYNES'S PREDICTION</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 20 }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}>15</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 58, color: DL.text }}>hours a week</span>
            </div>
            <div style={{ ...rise(f, FINALLY - 4), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm, marginTop: 14 }}>…finally, a century late?</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 690, width: 1600, opacity: ease(f, REPEATS - 6, REPEATS + 6) }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>THE FREED HOUR · <span style={{ color: DL.red }}>REFILLED</span></div>
          <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
            {Array.from({ length: 60 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 90, borderRadius: 4, background: i < refill ? DL.panel2 : 'transparent', border: `1px solid ${i < refill ? DL.border : '#ffffff10'}` }} />
            ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* ── part 3: the rarest thing */}
      <AbsoluteFill style={{ opacity: p3, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, RAREST - 4), fontFamily: DL_MONO, fontSize: 30, letterSpacing: 8, color: DL.muted }}>MAYBE THE RAREST THING ON EARTH IN 2100</div>
        <div style={{ display: 'flex', gap: 60, marginTop: 40 }}>
          {[['ENERGY', ENERGY], ['MONEY', MONEY]].map(([w, at]) => (
            <div key={String(w)} style={{ ...rise(f, Number(at) - 4), position: 'relative', fontFamily: DL_SERIF, fontSize: 90, color: DL.faint }}>
              {w}
              <div style={{ position: 'absolute', left: -8, right: -8, top: '52%', height: 6, background: DL.red, transform: `scaleX(${strike(Number(at))})`, transformOrigin: 'left' }} />
            </div>
          ))}
        </div>
        <div style={{ ...rise(f, REMEMBER - 14), marginTop: 50, fontFamily: DL_SERIF, fontSize: 104, color: DL.text }}>
          A day you <span style={{ color: DL.gold, fontStyle: 'italic', textShadow: `0 0 ${30 * ease(f, REMEMBER, REMEMBER + 20)}px ${DL.gold}88` }}>actually remember.</span>
        </div>
      </AbsoluteFill>

      <EraHud year={2100} prediction />
    </AbsoluteFill>
  );
};
export default Tc2100;
