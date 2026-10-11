import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, EraHud, Vignette, DayClock, DidYouKnowThat, Cliffhanger } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 9/13 — ERA 6: 2000. Hours worked (F13): 1870 >3,000 h/yr → Germany
// ~1,350 today, bars counted on their words; "instant" / "lifting" chips; then
// the paradox peak: "How are you?" → "Busy." → where did the time go?
// VO tc09 @1.0s.
// =============================================================================
export const compositionConfig = { id: 'Tc2000', durationInSeconds: 43.6667, fps: 30, width: 1920, height: 1080 };
const DUR = 1310;

const C = makeCue(vo, 'tc09-2000', 0.8);
const DID = C.at('Did');
const Y1870 = C.at('seventy');
const THREE = C.at('three');
const BEFORE = C.at('Before');
const FEET = C.at('feet');
const CHECKED = C.at('checked');
const THIRTEEN = C.at('thirteen');
const HEAR = C.at('hear');
const COUNT_FRAMES = 36;
const THOUSAND_END = C.at('thousand', 1, 'e');
// the phone's notifications land in three groups, one per pop cue (checked −0.35 s, 0, +0.35 s)
const POP_GAP = 10.5;
const DAYNOW = [
  { from: 23, to: 7, label: 'Sleep (phone on the pillow)', color: '#38bdf8' },
  { from: 7, to: 9, label: 'Scroll · commute', color: '#e74c3c' },
  { from: 9, to: 17, label: 'Work — on a screen', color: '#71717a' },
  { from: 17, to: 19, label: 'Errands · messages', color: '#e74c3c' },
  { from: 19, to: 23, label: 'Screens', color: '#e74c3c' },
];
const GERMANY = C.at('Germany');
const GO = C.at('go');
const LESS = C.at('less');
const INSTANT = C.at('instant');
const LIFTING = C.at('lifting');
const RICH = C.at('rich');
const YET = C.at('yet');
const BUSY = C.at('Busy');
const WHERE = C.at('where');

// The bar appears on `at` (its first word); it counts up while its number is being spoken (`countAt`).
const Bar: React.FC<{ label: string; sub: string; hours: number; at: number; countAt: number; countFrames?: number; color: string }> = ({ label, sub, hours, at, countAt, countFrames = COUNT_FRAMES, color }) => {
  const f = useCurrentFrame();
  const g = ease(f, countAt, countAt + countFrames, 0, 1, DL_EASE.inOut);
  const shown = Math.round(hours * g);
  return (
    <div style={{ opacity: ease(f, at - 6, at + 4) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>{label} <span style={{ color: DL.faint }}>· {sub}</span></span>
        <span style={{ opacity: ease(f, countAt - 2, countAt + 4), fontFamily: DL_SERIF, fontSize: 64, color, fontVariantNumeric: 'tabular-nums' }}>{shown.toLocaleString('en-US')}{hours === 3000 && g > 0.99 ? '+' : ''} <span style={{ fontSize: 30, color: DL.dim }}>h / year</span></span>
      </div>
      <div style={{ height: 34, marginTop: 10, background: DL.panel2, borderRadius: 8 }}>
        <div style={{ height: '100%', width: `${(hours / 3300) * 100 * g}%`, background: color, borderRadius: 8 }} />
      </div>
    </div>
  );
};

// The phone: body on "feet" (after the header has docked), notifications pop on "already
// checked" (matching the three pop cues), the badge lands on "phone".
const ROW_GROUP = [0, 0, 1, 1, 2];
const ROW_DOT = ['#e74c3c', '#38bdf8', '#d4a017', '#34d058', '#e74c3c'];
const Glow: React.FC<{ at: number; rowsAt: number; badgeAt: number; out: number }> = ({ at, rowsAt, badgeAt, out }) => {
  const f = useCurrentFrame();
  const badgeS = interpolate(f, [badgeAt, badgeAt + 8], [1.6, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 280, display: 'flex', justifyContent: 'center', opacity: ease(f, at - 4, at + 8) * (1 - ease(f, out - 10, out)) }}>
      <div style={{ position: 'relative', width: 240, height: 470, borderRadius: 40, background: DL.panel, border: `3px solid ${DL.border}`, boxShadow: `0 0 ${60 + 20 * Math.sin(f / 6)}px #38bdf855`, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 60, borderRadius: 14, background: '#2a2622', border: '1px solid #4a433c', display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', opacity: ease(f, rowsAt + ROW_GROUP[i] * POP_GAP, rowsAt + ROW_GROUP[i] * POP_GAP + 4), transform: `scale(${interpolate(f, [rowsAt + ROW_GROUP[i] * POP_GAP, rowsAt + ROW_GROUP[i] * POP_GAP + 6], [1.15, 1], { ...DCLAMP, easing: DL_EASE.out })})` }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: ROW_DOT[i] }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ height: 8, width: '80%', borderRadius: 4, background: '#ffffff55' }} />
              <div style={{ height: 6, width: '55%', borderRadius: 3, background: '#ffffff2a' }} />
            </div>
          </div>
        ))}
        <div style={{ position: 'absolute', top: -16, right: -16, width: 54, height: 54, borderRadius: '50%', background: DL.red, opacity: ease(f, badgeAt, badgeAt + 4), transform: `scale(${badgeS})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SANS, fontWeight: 600, fontSize: 24, color: DL.text }}>12</div>
      </div>
    </div>
  );
};

const Tc2000: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const pd = ease(f, DID + 110, DID + 122) * (1 - ease(f, Y1870 - 22, Y1870 - 10));
  const p1 = ease(f, Y1870 - 12, Y1870) * (1 - ease(f, YET - 14, YET, 0, 1, DL_EASE.in));
  const p2 = ease(f, YET - 2, YET + 10);
  const busyS = interpolate(f, [BUSY, BUSY + 8], [1.6, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#170f0a" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="THE INSTANT AGE" place="Your bedroom · the phone is already in your hand" dockAt={BEFORE + 4} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', opacity: pd }}>
        <DayClock year="today" segs={DAYNOW} at={DID + 116} hot={4} hotAt={DID + 140} />
      </div>
      <Glow at={FEET + 4} rowsAt={CHECKED - 10} badgeAt={CHECKED - 10} out={DID + 8} />
      <DidYouKnowThat at={DID} out={DID + 120} source="DataReportal, Digital 2025 (GWI): adult internet users, average daily time online">
        the average internet user now spends <span style={{ color: '#ff9a1f', fontStyle: 'italic' }}>6 hours 38 minutes</span> online — every single day.
      </DidYouKnowThat>

      {/* ── part 1: we work less than ever */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ position: 'absolute', left: 120, top: 250, width: 1680, display: 'flex', flexDirection: 'column', gap: 46 }}>
          {/* 1870 climbs from "seventy" and tops out on "three thousand" */}
          <Bar label="1870" sub="MOST INDUSTRIAL COUNTRIES" hours={3000} at={Y1870} countAt={Y1870 + 6} countFrames={THOUSAND_END - Y1870 - 6} color={DL.muted} />
          <Bar label="RECENTLY" sub="GERMANY · 2017" hours={1354} at={GERMANY - 4} countAt={THIRTEEN - 6} color={DL.gold} />
          <div style={{ ...rise(f, GERMANY + 30), fontFamily: DL_MONO, fontSize: 19, color: DL.faint }}>Our World in Data · Huberman &amp; Minns (1870) · Penn World Table (2017)</div>
        </div>
        <div style={{ ...rise(f, LESS - 4), position: 'absolute', left: 120, top: 640, fontFamily: DL_SERIF, fontSize: 70, color: DL.text }}>
          We work <span style={{ color: DL.gold, fontStyle: 'italic' }}>less</span> than almost anyone before us.
        </div>
        <div style={{ position: 'absolute', left: 120, top: 790, display: 'flex', gap: 26 }}>
          {[['MESSAGES', 'instant', INSTANT], ['MACHINES', 'do the lifting', LIFTING], ['ON PAPER', 'rich in time', RICH]].map(([k, v, at]) => (
            <div key={String(k)} style={{ ...rise(f, Number(at) - 4), padding: '18px 28px', background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.muted }}>{k}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.green }}>{v}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* ── part 2: "Busy." */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ position: 'absolute', left: 420, top: 260, display: 'flex', flexDirection: 'column', gap: 26, width: 1080 }}>
          <div style={{ ...rise(f, YET + 6), alignSelf: 'flex-start', padding: '22px 34px', borderRadius: '30px 30px 30px 8px', background: DL.panel2, border: `1px solid ${DL.border}`, fontFamily: DL_SANS, fontSize: 48, color: DL.text }}>How are you?</div>
          {/* the reply is being typed while he says "you will hear the same word" */}
          <div style={{ alignSelf: 'flex-end', height: 0, overflow: 'visible', opacity: ease(f, HEAR - 4, HEAR + 4) * (1 - ease(f, BUSY - 4, BUSY)) }}>
            <div style={{ display: 'flex', gap: 14, padding: '26px 36px', borderRadius: '30px 30px 8px 30px', background: DL.panel2, border: `1px solid ${DL.border}` }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: DL.dim, opacity: 0.35 + 0.65 * Math.max(0, Math.sin((f - HEAR) / 4 - i * 0.9)) }} />)}
            </div>
          </div>
          <div style={{ alignSelf: 'flex-end', opacity: ease(f, BUSY - 2, BUSY + 4), transform: `scale(${busyS})`, transformOrigin: 'right center', padding: '24px 46px', borderRadius: '30px 30px 8px 30px', background: DL.red, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 96, color: DL.text }}>Busy.</div>
        </div>
        <div style={{ ...rise(f, WHERE - 2), position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 104, color: DL.text }}>
          So where did all that <span style={{ color: DL.gold, fontStyle: 'italic' }}>time</span> go?
        </div>
      </AbsoluteFill>

      <Cliffhanger next="THE ANSWER" parts={[{ text: 'The answer is not what you think.', at: GO }]} />
      <EraHud year={2026} />
    </AbsoluteFill>
  );
};
export default Tc2000;
