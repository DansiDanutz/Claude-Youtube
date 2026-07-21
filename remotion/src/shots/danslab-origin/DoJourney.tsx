import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Spade, Coins, Rocket, Zap } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — the journey. VO 0.8s (20.3s): "Every business taught Dan something.
// The poker club taught him to read risk... The exchange... trust... The
// coin... slow decisions. Three schools. One lesson. Speed wins. And speed was
// exactly what he did not have." Timeline lessons land on mentions; the
// "SPEED WINS" verdict stamps; last line dims it.
// =============================================================================
export const compositionConfig = { id: 'DoJourney', durationInSeconds: 23.2, fps: 30, width: 1920, height: 1080 };

const STOPS = [
  { Icon: Spade, name: 'The poker club', lesson: 'read risk — in real time', color: DL.red, at: 108 },
  { Icon: Coins, name: 'The exchange', lesson: 'trust is engineered, not promised', color: DL.gold, at: 210 },
  { Icon: Rocket, name: 'The coin', lesson: 'markets punish slow decisions', color: DL.sky, at: 318 },
];
const VERDICT = 452; // "Speed wins."
const LACK = 540; // "...what he did not have"

const DoJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const line = interpolate(frame, [96, 380], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const vOp = interpolate(frame, [VERDICT, VERDICT + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const vScale = interpolate(frame, [VERDICT, VERDICT + 16], [1.4, 1], { ...DCLAMP, easing: DL_EASE.out });
  const lackOp = interpolate(frame, [LACK, LACK + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="01" label="THE ROAD // THREE SCHOOLS" />

      <div style={{ position: 'absolute', top: 196, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text }}>
          Every business <span style={{ fontStyle: 'italic', color: DL.gold }}>taught him something.</span>
        </span>
      </div>

      {/* timeline */}
      <div style={{ position: 'absolute', top: 470, left: 150, right: 150 }}>
        <div style={{ position: 'absolute', top: 44, left: 30, right: 30, height: 4, borderRadius: 999, background: '#ffffff0c', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold}, ${DL.sky})`, transform: `scaleX(${line})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {STOPS.map((s) => {
            const op = interpolate(frame, [s.at, s.at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            const y = interpolate(frame, [s.at, s.at + 14], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={s.name} style={{ opacity: op, transform: `translateY(${y}px)`, width: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 88, height: 88, borderRadius: 22, background: DL.panel, border: `1px solid ${s.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <s.Icon size={40} color={s.color} strokeWidth={1.9} />
                </div>
                <div style={{ fontSize: 34, fontWeight: 600, color: DL.text }}>{s.name}</div>
                <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 28, color: DL.dim, textAlign: 'center' }}>{s.lesson}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* verdict */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 44 }}>
        <span style={{ opacity: vOp, transform: `scale(${vScale})`, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
          <Zap size={38} color={DL.gold} fill={DL.gold} />
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 66, color: DL.text }}>Speed <span style={{ color: DL.gold }}>wins.</span></span>
        </span>
        <span style={{ opacity: lackOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.muted }}>
          — and speed was exactly what he didn&rsquo;t have.
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoJourney;
