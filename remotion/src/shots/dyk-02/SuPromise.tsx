import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SunDisc, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 4/14 — the promise. THE EXPERIMENT on its word; seven mornings as seven nodes on
// "Seven mornings" (the years build one per 12 frames from "fifteen"); seven people light up
// one by one from "wake"; one Sun rises over all of them on "same"; on "not change" the Sun
// is locked; on "You will" the people change colour; the open question on "old".
// VO su03 @0.5 s.
// =============================================================================
export const compositionConfig = { id: 'SuPromise', durationInSeconds: 15.6, fps: 30, width: 1920, height: 1080 };
const DUR = 468;

const C = makeCue(vo, 'su03-promise', 0.5);
const EXP = C.at('experiment');
const SEVEN = C.at('Seven');
const FIFTEEN = C.at('fifteen');
const WAKE = C.at('wake');
const SAME = C.at('same');
const CHANGE = C.at('change');
const YOU_WILL = C.at('will', 2);
const OLD = C.at('old');
const STEP = 12;
export const ERA_YEARS = ['1500', '1610', '1752', '1800', '1928', 'TODAY', '2100'];
const W = 1500, GAP = W / 6, X0 = 210;
const COLORS_THEN = ['#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#b9b1a4', '#e74c3c'];
const COLORS_NOW = ['#d4a017', '#38bdf8', '#ff3db4', '#34d058', '#ff9a1f', '#8b5cf6', '#e74c3c'];

const Person: React.FC<{ color: string }> = ({ color }) => (
  <svg width={54} height={78} viewBox="0 0 54 78"><circle cx={27} cy={16} r={13} fill={color} /><path d="M6 76 C6 46 14 36 27 36 C40 36 48 46 48 76 Z" fill={color} /></svg>
);

const SuPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const headIn = ease(f, EXP - 8, EXP + 4);
  const headDock = ease(f, SEVEN - 10, SEVEN + 4, 0, 1, DL_EASE.inOut);
  const sunUp = interpolate(f, [SAME - 6, SAME + 20], [120, 0], { ...DCLAMP, easing: DL_EASE.out });
  const lock = ease(f, CHANGE - 2, CHANGE + 8);
  const morph = ease(f, YOU_WILL - 2, YOU_WILL + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 380 - headDock * 300, textAlign: 'center', opacity: headIn, transform: `scale(${1.1 - 0.1 * headIn - headDock * 0.45})`, fontFamily: DL_MONO, fontSize: 92, letterSpacing: 22, color: DL.text }}>THE EXPERIMENT</div>

      {/* one Sun over everyone */}
      <div style={{ position: 'absolute', left: 960 - 216, top: 150 + sunUp, opacity: ease(f, SAME - 6, SAME + 6) }}>
        <SunDisc size={240} id="promSun" />
      </div>
      <div style={{ position: 'absolute', left: 1240, top: 250, opacity: lock, display: 'flex', alignItems: 'center', gap: 12, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: SUN.mid }}>
        <svg width={30} height={36} viewBox="0 0 30 36"><rect x={3} y={15} width={24} height={19} rx={3} fill={SUN.mid} /><path d="M8 15 V10 a7 7 0 0 1 14 0 V15" fill="none" stroke={SUN.mid} strokeWidth={4} /></svg>
        THE SUN · UNCHANGED
      </div>

      <div style={{ ...rise(f, SEVEN - 2), position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 72, color: DL.text, opacity: ease(f, SEVEN - 2, SEVEN + 10) * (1 - ease(f, SAME - 10, SAME)) }}>
        Seven mornings.
      </div>

      <div style={{ position: 'absolute', left: X0, top: 730, width: W * ease(f, FIFTEEN - 4, FIFTEEN + 40, 0, 1, DL_EASE.inOut), height: 3, background: `linear-gradient(90deg, ${DL.gold}, ${DL.red})` }} />
      {/* seven people above seven years */}
      {ERA_YEARS.map((y, i) => {
        const yearAt = FIFTEEN + i * STEP;
        const litAt = WAKE + i * STEP;
        const lit = ease(f, litAt, litAt + 6);
        const col = morph > 0 ? COLORS_NOW[i] : lit > 0.5 ? DL.gold : COLORS_THEN[i];
        const isLast = i === 6;
        return (
          <React.Fragment key={y}>
            <div style={{ position: 'absolute', left: X0 + i * GAP - 27, top: 600, opacity: ease(f, litAt - 4, litAt + 4), transform: `translateY(${ease(f, litAt - 4, litAt + 8, 18, 0)}px)`, filter: lit > 0 ? `drop-shadow(0 0 ${12 * lit}px ${col})` : undefined }}>
              <Person color={col} />
            </div>
            <div style={{ position: 'absolute', left: X0 + i * GAP - 120, width: 240, top: 720, textAlign: 'center', opacity: ease(f, yearAt, yearAt + 6) }}>
              <div style={{ margin: '0 auto', width: 22, height: 22, borderRadius: '50%', background: isLast ? DL.bg : DL.gold, border: `3px ${isLast ? 'dashed' : 'solid'} ${isLast ? DL.red : DL.gold}` }} />
              <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 44, color: isLast ? DL.red : DL.text }}>{y}</div>
              {isLast && <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.red }}>PREDICTION</div>}
            </div>
          </React.Fragment>
        );
      })}

      <div style={{ ...rise(f, OLD - 4), position: 'absolute', left: 0, right: 0, top: 880, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: SUN.mid }}>
        How old is that light, really?
      </div>
    </AbsoluteFill>
  );
};
export default SuPromise;
