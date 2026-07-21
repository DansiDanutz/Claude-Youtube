import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { HeartPulse, FileText, Send, GitMerge, Moon } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — a day in the lab. VO 0.8s (23.4s): "Seven A M: fleet health + CEO
// brief. By nine, droplets deep in their queues. Midday, content goes out.
// Afternoon: reviews, merges, deployments. At night... machines keep shipping.
// Thirty-eight scheduled jobs. Every single day."
// =============================================================================
export const compositionConfig = { id: 'DoDay', durationInSeconds: 25.6, fps: 30, width: 1920, height: 1080 };

const SLOTS = [
  { t: '07:00', Icon: HeartPulse, what: 'fleet health · CEO brief', at: 120 },
  { t: '09:00', Icon: FileText, what: 'droplets deep in their queues', at: 218 },
  { t: '12:00', Icon: Send, what: 'content goes out', at: 288 },
  { t: '15:00', Icon: GitMerge, what: 'reviews · merges · deployments', at: 356 },
  { t: '02:00', Icon: Moon, what: 'the machines keep shipping', at: 460, night: true },
];
const STAMP = 588; // "38 scheduled jobs, every single day"

const DoDay: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const line = interpolate(frame, [110, 500], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const stampOp = interpolate(frame, [STAMP, STAMP + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const stampScale = interpolate(frame, [STAMP, STAMP + 16], [1.35, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="ONE DAY // 24 HOURS" />

      <div style={{ position: 'absolute', top: 192, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          A normal day <span style={{ fontStyle: 'italic', color: DL.gold }}>in the lab.</span>
        </span>
      </div>

      {/* vertical schedule */}
      <div style={{ position: 'absolute', top: 340, left: 260, right: 260 }}>
        <div style={{ position: 'absolute', top: 10, bottom: 10, left: 118, width: 4, borderRadius: 999, background: '#ffffff0c', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg, ${DL.gold}, ${DL.red})`, transform: `scaleY(${line})`, transformOrigin: 'top' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SLOTS.map((s) => {
            const op = interpolate(frame, [s.at, s.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            const x = interpolate(frame, [s.at, s.at + 13], [-22, 0], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={s.t} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 26 }}>
                <span style={{ fontFamily: DL_MONO, fontSize: 27, color: s.night ? DL.gold : DL.dim, width: 92, textAlign: 'right' }}>{s.t}</span>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: s.night ? `${DL.gold}18` : DL.panel, border: `1px solid ${s.night ? DL.gold : DL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                  <s.Icon size={26} color={s.night ? DL.gold : DL.warm} strokeWidth={1.9} />
                </div>
                <span style={{ fontSize: 32, color: s.night ? DL.text : DL.dim, fontWeight: s.night ? 600 : 400, fontStyle: s.night ? 'italic' : 'normal' }}>{s.what}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* daily stamp */}
      <div style={{ position: 'absolute', bottom: 100, right: 190, opacity: stampOp, transform: `scale(${stampScale}) rotate(-5deg)` }}>
        <div style={{ border: `3px solid ${DL.gold}`, borderRadius: 12, padding: '18px 32px' }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, color: DL.gold }}>38 JOBS<br />EVERY DAY</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoDay;
