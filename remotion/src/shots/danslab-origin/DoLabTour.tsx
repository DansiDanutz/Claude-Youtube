import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Server, Laptop } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — the footprint tour. VO 0.8s (23.7s): "Five droplets, each with its
// own personality. Dexter... Memo... Sienna trades. Nano builds new agents.
// Add the Mac Studio, where Hermes thinks... No office. No server room. Just
// rented compute and named minds."
// =============================================================================
export const compositionConfig = { id: 'DoLabTour', durationInSeconds: 25.8, fps: 30, width: 1920, height: 1080 };

const NODES = [
  { name: 'dexter', role: 'general manager · busiest queue', at: 128 },
  { name: 'memo', role: 'projects · cron jobs', at: 222 },
  { name: 'sienna', role: 'trades', at: 288 },
  { name: 'nano', role: 'builds new agents', at: 342 },
  { name: 'fleet-05', role: 'reserve', at: 400 },
];
const MAC = 428; // "add the Mac Studio"
const CLOSE = 592; // "no office..."

const DoLabTour: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const macOp = interpolate(frame, [MAC, MAC + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const macY = interpolate(frame, [MAC, MAC + 16], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
  const c1 = interpolate(frame, [CLOSE, CLOSE + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const c2 = interpolate(frame, [CLOSE + 26, CLOSE + 38], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const c3 = interpolate(frame, [CLOSE + 56, CLOSE + 70], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="03" label="THE FOOTPRINT // 5 + 1" />

      <div style={{ position: 'absolute', top: 192, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          Five droplets, <span style={{ fontStyle: 'italic', color: DL.sky }}>each with a personality.</span>
        </span>
      </div>

      {/* droplet rack */}
      <div style={{ position: 'absolute', top: 360, left: 120, width: 1050, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {NODES.map((n) => {
          const op = interpolate(frame, [n.at, n.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [n.at, n.at + 13], [-24, 0], { ...DCLAMP, easing: DL_EASE.out });
          const on = 0.5 + 0.5 * Math.abs(Math.sin((frame - n.at) / 17));
          return (
            <div key={n.name} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 22, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '20px 30px' }}>
              <Server size={28} color={DL.sky} strokeWidth={1.8} />
              <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.text, width: 190 }}>{n.name}</span>
              <span style={{ fontSize: 26, color: DL.dim }}>{n.role}</span>
              <div style={{ marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%', background: DL.green, opacity: on }} />
            </div>
          );
        })}
      </div>

      {/* Mac Studio node */}
      <div style={{ position: 'absolute', top: 430, right: 120, width: 560, opacity: macOp, transform: `translateY(${macY}px)` }}>
        <div style={{ background: DL.panel2, border: `1px solid ${DL.warm}66`, borderRadius: 16, padding: '36px 42px', textAlign: 'center' }}>
          <Laptop size={44} color={DL.warm} strokeWidth={1.7} style={{ marginBottom: 14 }} />
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 52, color: DL.text }}>Mac Studio</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.gold, marginTop: 10 }}>WHERE HERMES THINKS</div>
        </div>
      </div>

      {/* closing triple */}
      <div style={{ position: 'absolute', bottom: 88, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 46, fontFamily: DL_SERIF, fontSize: 44 }}>
        <span style={{ opacity: c1, color: DL.dim }}>No office.</span>
        <span style={{ opacity: c2, color: DL.dim }}>No server room.</span>
        <span style={{ opacity: c3, fontStyle: 'italic', color: DL.text }}>Just rented compute — and <span style={{ color: DL.sky }}>named minds.</span></span>
      </div>
    </AbsoluteFill>
  );
};
export default DoLabTour;
