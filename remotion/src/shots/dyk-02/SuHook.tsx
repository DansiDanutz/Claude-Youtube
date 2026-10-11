import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, Vignette } from '../../lib/dykkit';
import { SunDisc, LightBeam, DigitalClock, fmtClock, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 1/14 — cold open. Frame 0: a sunrise, the clock reads 08:00:00 (RESEARCH F1).
// On "left": the stamp "this light left the Sun at 07:51:40"; on "eight minutes" a photon
// crosses Sun → you. On "vanished" the Sun goes out but its light keeps arriving.
// Beat 2: five verbs = five eras (celebrated 1500 · hidden 1752 · split 1800 · chased 1928 ·
// touched 2024), then the question. VO su01 @0.4 s, su02 @13.875 s (timeline.json).
// =============================================================================
export const compositionConfig = { id: 'SuHook', durationInSeconds: 21.7, fps: 30, width: 1920, height: 1080 };
const DUR = 651;

const A = makeCue(vo, 'su01-hook', 0.4);
const B = makeCue(vo, 'su02-question', 10.392);
const LEFT = A.at('left');
const WARM = A.at('warm');
const EIGHT1 = A.at('eight', 1);
const AGO = A.at('ago');
const EIGHT2 = A.at('eight', 2);
const SECONDS = A.at('seconds');
const VANISH = A.at('vanished');
const KNOW = A.at('know');
const VERBS: [string, string, number][] = [
  ['CELEBRATED', '1500', B.at('celebrated')],
  ['HID FROM', '1752', B.at('hidden')],
  ['SPLIT', '1800', B.at('split')],
  ['CHASED', '1928', B.at('chased')],
  ['TOUCHED', '2024', B.at('touched')],
];
const DID = B.at('did');
const NEVER = B.at('never');
const RIGHT = B.at('right');
const OUT1 = B.start + 6; // beat 1 holds into the question line and crossfades (no dip to black)

const SuHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = ease(f, DUR - 3, DUR, 1, 0); // no fade-in: the paradox is on screen at frame 0
  const rise0 = interpolate(f, [0, 120], [70, 0], { ...DCLAMP, easing: DL_EASE.out });
  const gone = ease(f, VANISH, VANISH + 8);
  const p1 = 1 - ease(f, OUT1 - 10, OUT1 + 4, 0, 1, DL_EASE.in);
  const photon = interpolate(f, [EIGHT2, SECONDS + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  // after the Sun vanishes, its last light is still on the way: a countdown 8:20 → ticking down
  const remain = 500 - Math.max(0, (f - VANISH) / 30);
  const p2 = ease(f, B.start - 6, B.start + 6) * (1 - ease(f, DID - 12, DID, 0, 1, DL_EASE.in));
  const p3 = ease(f, DID - 2, DID + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#3a1c06" />
      <Vignette />

      {/* ── beat 1: 08:00 — but this light is 8 min 20 s old */}
      <AbsoluteFill style={{ opacity: p1 }}>
        {/* horizon + rising Sun */}
        <div style={{ position: 'absolute', left: 150, top: 150 + rise0, opacity: 1 - gone * 0.92 }}>
          <SunDisc size={300} id="hookSun" glow={1 - gone} />
        </div>
        {/* when the Sun vanishes, a dashed outline marks where it was */}
        <svg width={600} height={600} style={{ position: 'absolute', left: 150 - 120, top: 150 - 120 }}>
          <circle cx={270} cy={270} r={150} fill="none" stroke={DL.dim} strokeWidth={3} strokeDasharray="10 12" opacity={gone} />
        </svg>
        <svg width={120} height={170} viewBox="0 0 120 170" style={{ position: 'absolute', left: 900, top: 472, opacity: ease(f, WARM - 6, WARM + 6) }}>
          <circle cx={60} cy={34} r={26} fill="#1a120c" stroke={SUN.mid} strokeWidth={3 + 3 * ease(f, WARM, WARM + 20)} style={{ filter: `drop-shadow(0 0 ${18 * ease(f, WARM, WARM + 20)}px ${SUN.mid})` }} />
          <path d="M14 170 C14 100 30 72 60 72 C90 72 106 100 106 170 Z" fill="#1a120c" stroke={SUN.rim} strokeWidth={2} />
        </svg>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 3, background: `linear-gradient(90deg, transparent, ${SUN.rim}aa, transparent)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 643, bottom: 0, background: 'linear-gradient(180deg, #120a05, #050404)' }} />

        <div style={{ position: 'absolute', right: 150, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.dim }}>YOUR CLOCK</span>
          <div style={{ transform: `scale(${1 + 0.06 * ease(f, EIGHT1, EIGHT1 + 4) * (1 - ease(f, EIGHT1 + 6, EIGHT1 + 20))})`, transformOrigin: 'right center' }}><DigitalClock text="08:00:00" size={140} /></div>
          <div style={{ ...rise(f, LEFT - 2), marginTop: 30, padding: '18px 28px', borderRadius: 12, border: `2px solid ${SUN.mid}`, background: '#1a1006ee', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: SUN.mid }}>THIS LIGHT LEFT THE SUN AT</span>
            <DigitalClock text={fmtClock(8 * 3600 - 500 * ease(f, EIGHT2, AGO, 0, 1, DL_EASE.inOut))} size={86} color={f >= AGO ? SUN.mid : DL.dim} />
          </div>
        </div>

        <div style={{ position: 'absolute', left: 210, top: 690 }}>
          <LightBeam w={1500} progress={photon} at={EIGHT2 - 4} label={f >= AGO ? '150 MILLION KM · 8 MIN 20 S' : '150 MILLION KM'} />
        </div>
        <div style={{ ...rise(f, VANISH + 6), position: 'absolute', left: 0, right: 0, top: 890, display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'baseline' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: DL.dim }}>{f >= KNOW ? 'YOU WOULD NOT KNOW FOR' : 'SUN GONE · LIGHT STILL ARRIVING'}</span>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 56, color: DL.red, fontVariantNumeric: 'tabular-nums' }}>{fmtClock(remain).slice(3)}</span>
        </div>
      </AbsoluteFill>

      {/* ── beat 2: five verbs, five centuries */}
      <AbsoluteFill style={{ opacity: p2, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 34 }}>
          {VERBS.map(([v, y, at]) => {
            const s = interpolate(f, [at - 2, at + 8], [1.3, 1], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={v} style={{ opacity: ease(f, at - 2, at + 6), transform: `scale(${s})`, width: 280, padding: '28px 0', borderRadius: 18, background: DL.panel, border: `2px solid ${SUN.rim}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.gold }}>{y}</span>
                <span style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 4, color: DL.text }}>{v}</span>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(f, VERBS[0][2] + 6), marginTop: 50, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 8, color: DL.dim }}>FIVE CENTURIES · ONE SUN</div>
      </AbsoluteFill>

      {/* ── beat 3: the question */}
      <AbsoluteFill style={{ opacity: p3, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 120, opacity: 0.9 }}><SunDisc size={200} id="hookSun2" /></div>
        <div style={{ ...rise(f, DID), marginTop: 260, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.red }}>DID YOU KNOW THAT…</div>
        <div style={{ ...rise(f, NEVER - 4), marginTop: 26, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, lineHeight: 1.12, color: DL.text }}>
          you have never seen the Sun <span style={{ color: SUN.mid, fontStyle: 'italic', opacity: ease(f, RIGHT - 2, RIGHT + 8) }}>as it is right now?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default SuHook;
