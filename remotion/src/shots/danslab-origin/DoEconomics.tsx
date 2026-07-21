import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Moon, BatteryFull, TrendingUp } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — the economics. VO 0.8s (20.0s): "Do the math. A team like this
// would cost a fortune in salaries. The fleet runs on a fixed budget:
// subscriptions, five droplets, one Mac Studio. It does not sleep. It does not
// quit. It gets smarter every month. This is what a small business looks
// like... when software does the work."
// =============================================================================
export const compositionConfig = { id: 'DoEconomics', durationInSeconds: 22.2, fps: 30, width: 1920, height: 1080 };

const SAL = 108;   // "a fortune in salaries"
const FIX = 208;   // fixed budget items
const TRAITS = 380; // doesn't sleep / quit / smarter
const CLOSE = 528;

const DoEconomics: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const salOp = interpolate(frame, [SAL, SAL + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const strike = interpolate(frame, [SAL + 40, SAL + 58], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const closeOp = interpolate(frame, [CLOSE, CLOSE + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const items = ['SUBSCRIPTIONS', '5 DROPLETS', '1 MAC STUDIO'];
  const traits = [
    { Icon: Moon, text: 'never sleeps', at: TRAITS },
    { Icon: BatteryFull, text: 'never quits', at: TRAITS + 34 },
    { Icon: TrendingUp, text: 'smarter every month', at: TRAITS + 72 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="10" label="THE MATH // FIXED BUDGET" />

      <div style={{ position: 'absolute', top: 192, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text }}>
          Do <span style={{ fontStyle: 'italic', color: DL.gold }}>the math.</span>
        </span>
      </div>

      {/* salaries struck out */}
      <div style={{ position: 'absolute', top: 370, left: 120, opacity: salOp }}>
        <span style={{ position: 'relative', display: 'inline-block', fontFamily: DL_SERIF, fontSize: 60, color: DL.muted }}>
          a fortune in salaries
          <span style={{ position: 'absolute', left: -8, right: -8, top: '52%', height: 6, background: DL.red, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
        </span>
      </div>

      {/* fixed budget chips */}
      <div style={{ position: 'absolute', top: 372, right: 120, display: 'flex', gap: 20 }}>
        {items.map((it, i) => {
          const at = FIX + i * 40;
          const op = interpolate(frame, [at, at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [at, at + 12], [18, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={it} style={{ opacity: op, transform: `translateY(${y}px)`, border: `1px solid ${DL.green}55`, background: `${DL.green}10`, borderRadius: 999, padding: '18px 32px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 25, letterSpacing: 2, color: DL.green }}>{it}</span>
            </div>
          );
        })}
      </div>

      {/* traits */}
      <div style={{ position: 'absolute', top: 560, left: 120, right: 120, display: 'flex', gap: 30, justifyContent: 'center' }}>
        {traits.map((t) => {
          const op = interpolate(frame, [t.at, t.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={t.text} style={{ opacity: op, flex: 1, maxWidth: 480, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '34px 30px', display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
              <t.Icon size={34} color={DL.gold} strokeWidth={1.8} />
              <span style={{ fontFamily: DL_SERIF, fontSize: 38, color: DL.text }}>{t.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: closeOp }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 48, color: DL.text }}>
          A small business — <span style={{ fontStyle: 'italic', color: DL.green }}>when software does the work.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default DoEconomics;
