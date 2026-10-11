import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, Vignette } from '../../lib/dykkit';
import { SunDisc, LightBeam, DigitalClock, fmtClock, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 1/14 — cold open (v2). Frame 0: a sunrise, the clock reads 08:00:00 (RESEARCH F1).
// "light": a ray reaches your face · "left": THIS LIGHT LEFT THE SUN AT, digits roll back to
// 07:51:40 on "eight minutes … ago" while a photon crosses Sun → you. "vanished": the Sun goes
// out (dashed outline) but its glow stays on the horizon; from "You'd" a countdown 08:20 ticks
// down (1/s) under it; "For eight more minutes." lands on the countdown.
// Beat 2: a two-panel split — 1500 (get up / sleep with the Sun) | today (panel lights a bulb
// on "electricity"). Beat 3: DID YOU KNOW THAT… and "as it is right now?" lands on "right".
// VO su01 @0.4 s, su02 @15.385 s (timeline.json).
// =============================================================================
export const compositionConfig = { id: 'SuHook', durationInSeconds: 28.9, fps: 30, width: 1920, height: 1080 };
const DUR = 867;

const A = makeCue(vo, 'su01-hook', 0.6);
const B = makeCue(vo, 'su02-question', 16.516);
// beat 1
const EIGHT1 = A.at('eight', 1);
const WARM = A.at('warm');
const LIGHT = A.at('light');
const LEFT = A.at('left');
const EIGHT2 = A.at('eight', 2);
const AGO = A.at('ago');
const VANISH = A.at('vanished');
const KNOW = A.at('know');
const YOUD1 = A.at('youd', 1);
const SEE = A.at('see');
const FEEL = A.at('feel');
const EIGHT3 = A.at('eight', 3);
// beat 2
const FIVE = B.at('Five');
const SUN1 = B.at('Sun', 1);
const UP = B.at('up');
const SLEEP = B.at('sleep');
const TODAY = B.at('Today');
const ELEC = B.at('electricity');
const STILL = B.at('still');
// beat 3
const DID = B.at('did');
const NEVER = B.at('never');
const SEEN = B.at('seen');
const RIGHT = B.at('right');

const TICK = 30; // the countdown ticks once per second (clock-tick-soft ≤ 1/s)
const COUNT_FROM = 500; // 8 min 20 s (F1)
const SUN_C = { x: 420, y: 420 }; // centre of the hook Sun (after the rise)
const FACE = { x: 960, y: 506 }; // silhouette head

// ── a 1500 sleeper: stands on "up", lies down on "sleep"
const Sleeper: React.FC<{ down: number; show: number }> = ({ down, show }) => (
  <svg width={160} height={160} viewBox="0 0 160 160" style={{ overflow: 'visible', opacity: show }}>
    <g transform={`translate(80 150) rotate(${-90 * down}) translate(-80 -150)`}>
      <circle cx={80} cy={34} r={18} fill={DL.warm} />
      <path d="M58 150 C58 92 66 60 80 60 C94 60 102 92 102 150 Z" fill={DL.warm} />
    </g>
  </svg>
);

// ── today: a solar panel wired to a bulb that switches on
const PanelBulb: React.FC<{ show: number; on: number }> = ({ show, on }) => (
  <svg width={520} height={300} viewBox="0 0 520 300" style={{ overflow: 'visible', opacity: show }}>
    <g transform="translate(30 140) skewX(-18)">
      {[0, 1, 2].map((c) => [0, 1].map((r) => (
        <rect key={`${c}${r}`} x={c * 66} y={r * 52} width={60} height={46} fill="#0f2a4a" stroke="#4a7fb5" strokeWidth={2} />
      )))}
    </g>
    <path d="M70 248 L70 290 M150 248 L150 290" stroke="#4a7fb5" strokeWidth={4} />
    <path d="M230 200 C300 200 320 250 400 250 L400 200" fill="none" stroke={on > 0.5 ? SUN.mid : DL.faint} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-on * 60} />
    <circle cx={400} cy={130} r={46} fill={on > 0.5 ? SUN.core : '#1c1a18'} stroke={on > 0.5 ? SUN.mid : DL.faint} strokeWidth={4} style={{ filter: on > 0 ? `drop-shadow(0 0 ${36 * on}px ${SUN.mid})` : undefined }} />
    <rect x={380} y={174} width={40} height={28} rx={4} fill={DL.faint} />
  </svg>
);

const SuHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ease(f, DUR - 3, DUR, 1, 0); // no fade-in: the paradox is on screen at frame 0
  const rise0 = interpolate(f, [0, 120], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  const gone = ease(f, VANISH, VANISH + 8);
  // beat 1 is fully gone before the cards land (8 MORE MINUTES still holds 1.5 s)
  const p1 = 1 - ease(f, FIVE - 6, FIVE + 4, 0, 1, DL_EASE.in);
  const photon = interpolate(f, [EIGHT2, AGO + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const ray = ease(f, LIGHT - 2, LIGHT + 12);
  const beamOut = 1 - ease(f, KNOW - 8, KNOW + 2);
  // the Sun is gone but its glow stays on the horizon: it brightens on "see"
  const horizon = 0.35 + 0.65 * ease(f, SEE - 2, SEE + 14);
  const facePulse = ease(f, FEEL - 2, FEEL + 6) * (1 - ease(f, FEEL + 10, FEEL + 30)) * 0.8 + ease(f, WARM, WARM + 20) * (1 - 0.4 * ease(f, FEEL + 10, FEEL + 30));
  const remain = COUNT_FROM - Math.max(0, Math.floor((f - YOUD1) / TICK));
  const tickAt = YOUD1 + Math.floor(Math.max(0, f - YOUD1) / TICK) * TICK;
  const tickPulse = f >= YOUD1 ? 1 - ease(f, tickAt, tickAt + 10) : 0;
  const more = ease(f, EIGHT3 - 2, EIGHT3 + 8);
  const p2 = ease(f, FIVE + 4, FIVE + 14) * (1 - ease(f, STILL - 6, STILL + 6, 0, 1, DL_EASE.in)); // gone before the Sun drops in
  const p3 = ease(f, DID - 2, DID + 10);
  // beat 2 left: the Sun rises on "Sun", sets on "sleep"
  const sunL = interpolate(f, [SUN1 - 4, SUN1 + 20, SLEEP - 2, SLEEP + 24], [150, 0, 0, 170], { ...DCLAMP, easing: DL_EASE.inOut });
  // panels clear on "still"; the beat-3 Sun drops in and swells with the riser into "right"
  const sun3 = ease(f, STILL + 6, DID + 12);
  const swell = interpolate(f, [RIGHT - 41, RIGHT], [1, 1.14], { ...DCLAMP, easing: DL_EASE.inOut }); // rises with the riser, holds its peak through "now?"

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#3a1c06" />
      <Vignette />

      {/* ── beat 1: 08:00 — but this light is 8 min 20 s old */}
      <AbsoluteFill style={{ opacity: p1 }}>
        {/* horizon glow that outlives the Sun */}
        <div style={{ position: 'absolute', left: SUN_C.x - 420, width: 840, top: 560, height: 160, borderRadius: '50%', opacity: 0.5 + gone * (horizon - 0.5), background: `radial-gradient(ellipse at center, ${SUN.glow}88 0%, transparent 70%)` }} />
        {/* rising Sun */}
        <div style={{ position: 'absolute', left: 150, top: 150 + rise0, opacity: 1 - gone * 0.92 }}>
          <SunDisc size={300} id="hookSun" glow={1 - gone} />
        </div>
        {/* when the Sun vanishes, a dashed outline marks where it was — still glowing faintly */}
        <svg width={600} height={600} style={{ position: 'absolute', left: SUN_C.x - 300, top: SUN_C.y - 300, overflow: 'visible' }}>
          <circle cx={300} cy={300} r={150} fill="none" stroke={SUN.rim} strokeWidth={3} strokeDasharray="10 12" opacity={gone * (0.5 + 0.5 * horizon)} style={{ filter: `drop-shadow(0 0 ${14 * horizon}px ${SUN.glow})` }} />
        </svg>
        {/* the ray of light reaching your face */}
        <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
          <line x1={SUN_C.x + 140} y1={SUN_C.y + 30} x2={SUN_C.x + 140 + (FACE.x - 30 - SUN_C.x - 140) * ray} y2={SUN_C.y + 30 + (FACE.y - SUN_C.y - 30) * ray} stroke={SUN.mid} strokeWidth={5} strokeLinecap="round" opacity={0.75 * ray} style={{ filter: `drop-shadow(0 0 10px ${SUN.glow})` }} />
        </svg>
        <svg width={120} height={170} viewBox="0 0 120 170" style={{ position: 'absolute', left: 900, top: 472, opacity: ease(f, WARM - 6, WARM + 6) }}>
          <circle cx={60} cy={34} r={26} fill="#1a120c" stroke={SUN.mid} strokeWidth={3 + 3 * facePulse} style={{ filter: `drop-shadow(0 0 ${22 * facePulse}px ${SUN.mid})` }} />
          <path d="M14 170 C14 100 30 72 60 72 C90 72 106 100 106 170 Z" fill="#1a120c" stroke={SUN.rim} strokeWidth={2} />
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 3, background: `linear-gradient(90deg, transparent, ${SUN.rim}aa, transparent)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 643, bottom: 0, background: 'linear-gradient(180deg, #120a05, #050404)' }} />

        <div style={{ position: 'absolute', right: 160, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.dim }}>YOUR CLOCK</span>
          <div style={{ transform: `scale(${1 + 0.06 * ease(f, EIGHT1, EIGHT1 + 4) * (1 - ease(f, EIGHT1 + 6, EIGHT1 + 20))})`, transformOrigin: 'right center' }}><DigitalClock text="08:00:00" size={140} /></div>
          <div style={{ ...rise(f, LEFT - 2), marginTop: 30, padding: '18px 28px', borderRadius: 12, border: `2px solid ${SUN.mid}`, background: '#1a1006ee', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: SUN.mid }}>THIS LIGHT LEFT THE SUN AT</span>
            <DigitalClock text={fmtClock(8 * 3600 - COUNT_FROM * ease(f, EIGHT2, AGO, 0, 1, DL_EASE.inOut))} size={86} color={f >= AGO ? SUN.mid : DL.dim} />
          </div>
        </div>

        <div style={{ position: 'absolute', left: 210, top: 690, opacity: beamOut }}>
          <LightBeam w={1500} progress={photon} at={EIGHT2 - 4} label={f >= AGO ? '150 MILLION KM · 8 MIN 20 S' : '150 MILLION KM'} />
        </div>

        {/* the countdown under the dashed Sun: you would not know for 08:20 … 08:19 … */}
        <div style={{ ...rise(f, KNOW - 2), position: 'absolute', left: SUN_C.x - 300, width: 600, top: 672, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.dim }}>YOU WOULDN'T KNOW FOR</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 84, color: more > 0.5 ? SUN.mid : DL.red, fontVariantNumeric: 'tabular-nums', transform: `scale(${1 + 0.05 * tickPulse + 0.1 * more * (1 - ease(f, EIGHT3 + 10, EIGHT3 + 26))})` }}>{fmtClock(remain).slice(3)}</span>
          <span style={{ opacity: more, transform: `translateY(${(1 - more) * 12}px)`, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: SUN.mid }}>8 MORE MINUTES</span>
        </div>
      </AbsoluteFill>

      {/* ── beat 2: then and now, one Sun */}
      <AbsoluteFill style={{ opacity: p2 }}>
        {/* left: 1500 */}
        <div style={{ position: 'absolute', left: 200, top: 210, width: 740, height: 600, borderRadius: 20, background: DL.panel, border: `2px solid ${SUN.rim}`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 36, top: 26, display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.gold }}>1500</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>500 YEARS AGO</span>
          </div>
          <div style={{ position: 'absolute', left: 300, top: 260 + sunL, opacity: ease(f, SUN1 - 4, SUN1 + 6) }}>
            <SunDisc size={110} id="hookSunL" />
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 450, height: 3, background: `linear-gradient(90deg, transparent, ${SUN.rim}, transparent)` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 453, bottom: 0, background: DL.panel }} />
          <div style={{ position: 'absolute', left: 120, top: 292 }}>
            <Sleeper down={ease(f, SLEEP, SLEEP + 16, 0, 1, DL_EASE.inOut)} show={ease(f, UP - 2, UP + 6)} />
          </div>
          <div style={{ position: 'absolute', left: 36, right: 36, bottom: 34, display: 'flex', gap: 22, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4 }}>
            <span style={{ ...rise(f, UP - 2, 14), color: DL.text }}>GET UP</span>
            <span style={{ ...rise(f, SLEEP - 2, 14), color: DL.dim }}>· SLEEP</span>
          </div>
        </div>
        {/* right: today (empty frame until "Today") */}
        <div style={{ position: 'absolute', left: 980, top: 210, width: 740, height: 600, borderRadius: 20, background: DL.panel, border: `2px solid ${f >= TODAY ? SUN.rim : DL.border}`, overflow: 'hidden' }}>
          {/* a faint "?" holds the empty card until "Today" */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 260, color: DL.muted, opacity: 0.55 * (1 - ease(f, TODAY - 4, TODAY + 4)) }}>?</div>
          <div style={{ ...rise(f, TODAY - 2), position: 'absolute', left: 36, top: 26, fontFamily: DL_SERIF, fontSize: 60, color: DL.gold }}>Today</div>
          <div style={{ position: 'absolute', left: 520, top: 40, opacity: ease(f, TODAY, TODAY + 10) }}>
            <SunDisc size={80} id="hookSunR" />
          </div>
          <div style={{ position: 'absolute', left: 70, top: 200 }}>
            <PanelBulb show={ease(f, TODAY, TODAY + 10)} on={ease(f, ELEC - 1, ELEC + 6)} />
          </div>
          <div style={{ ...rise(f, ELEC - 2, 14), position: 'absolute', left: 36, bottom: 34, fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: SUN.mid }}>ELECTRICITY</div>
        </div>
      </AbsoluteFill>

      {/* ── beat 3: the question */}
      <AbsoluteFill style={{ alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 190 - (1 - sun3) * 140, opacity: 0.9 * sun3, transform: `scale(${swell})` }}><SunDisc size={200} id="hookSun2" /></div>
        <div style={{ opacity: p3, position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ ...rise(f, DID), marginTop: 580, fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 10, color: DL.red, textShadow: `0 0 18px ${DL.red}99` }}>DID YOU KNOW THAT…</div>
          <div style={{ marginTop: 26, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 88, lineHeight: 1.12, color: DL.text }}>
            <span style={{ ...rise(f, NEVER - 2), display: 'inline-block' }}>you have never once</span>{' '}
            <span style={{ ...rise(f, SEEN - 2), display: 'inline-block' }}>seen the Sun</span>{' '}
            <span style={{ color: SUN.mid, fontStyle: 'italic', opacity: ease(f, B.at('as', 1), B.at('as', 1) + 6) }}>as it is… </span><span style={{ color: SUN.mid, fontStyle: 'italic', display: 'inline-block', opacity: ease(f, RIGHT - 1, RIGHT + 6), transform: `scale(${ease(f, RIGHT - 1, RIGHT + 8, 1.18, 1)})` }}>right now?</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default SuHook;
