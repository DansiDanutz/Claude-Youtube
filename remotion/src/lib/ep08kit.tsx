import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { DL, DL_MONO, DL_SANS, DL_EASE, DCLAMP } from './danslab';

// ── Ep08 "The Studio" — the desk at the hub of the cloud. ──────────────────

// A code-drawn Mac Studio: brushed aluminium block, front ports, status glow.
// Drawn, not photographed — the series rule is that everything not a real
// screenshot is code.
export const MacStudioBox: React.FC<{ at?: number; w?: number; glow?: string; label?: string }> = ({ at = 0, w = 560, glow = DL.gold, label }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  const p = spring({ frame: t, fps: 30, config: { damping: 15, mass: 0.9 } });
  const op = interpolate(t, [0, 14], [0, 1], DCLAMP);
  const y = interpolate(p, [0, 1], [50, 0]);
  const h = w * 0.34;
  const breathe = 0.5 + 0.5 * Math.sin(t / 38);
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: w, position: 'relative' }}>
      {/* halo */}
      <div style={{ position: 'absolute', inset: -w * 0.12, background: `radial-gradient(ellipse at 50% 70%, ${glow}${Math.round(14 + breathe * 14).toString(16)} 0%, transparent 65%)` }} />
      {/* body */}
      <div style={{ position: 'relative', width: w, height: h, borderRadius: w * 0.045, background: 'linear-gradient(180deg, #3a3734 0%, #2b2826 30%, #232019 70%, #1a1815 100%)', border: '1px solid #4a443e', boxShadow: `0 ${w * 0.06}px ${w * 0.14}px rgba(0,0,0,0.65), inset 0 1px 0 #5a544c` }}>
        {/* brushed texture */}
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${8 + i * 10}%`, left: '2%', right: '2%', height: 1, background: '#ffffff06' }} />
        ))}
        {/* front ports */}
        <div style={{ position: 'absolute', bottom: h * 0.16, left: w * 0.07, display: 'flex', gap: w * 0.025, alignItems: 'center' }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ width: w * 0.045, height: h * 0.09, borderRadius: 3, background: '#141210', border: '1px solid #000' }} />
          ))}
          <div style={{ width: w * 0.05, height: w * 0.05, borderRadius: '50%', background: '#141210', border: '1px solid #000', marginLeft: w * 0.015 }} />
        </div>
        {/* status LED — the machine is on */}
        <div style={{ position: 'absolute', bottom: h * 0.18, right: w * 0.07, width: w * 0.014, height: w * 0.014, borderRadius: '50%', background: glow, boxShadow: `0 0 ${8 + breathe * 10}px ${glow}`, opacity: 0.75 + breathe * 0.25 }} />
        {/* apple-ish mark */}
        <div style={{ position: 'absolute', top: h * 0.3, left: '50%', transform: 'translateX(-50%)', fontFamily: DL_MONO, fontSize: w * 0.032, letterSpacing: w * 0.012, color: '#6b645c' }}>MAC STUDIO</div>
      </div>
      {/* desk line + reflection */}
      <div style={{ height: 2, background: '#ffffff12', marginTop: 2 }} />
      <div style={{ width: w, height: h * 0.4, borderRadius: w * 0.045, background: 'linear-gradient(180deg, #ffffff08, transparent 70%)', transform: 'scaleY(-1)', opacity: 0.5 }} />
      {label && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -h * 0.34, textAlign: 'center', fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: DL.faint }}>{label}</div>
      )}
    </div>
  );
};

// The desk's day: a 24-hour strip with the real automations pinned to it.
export const DayTimeline: React.FC<{ at: number; w?: number }> = ({ at, w = 1500 }) => {
  const frame = useCurrentFrame();
  const EVENTS: [number, string, string][] = [
    [7, '07:00 · FLEET HEALTH', DL.green],
    [7.4, '07:00 · CEO BRIEF', DL.gold],
    [13, 'MIDDAY · TEACHER', DL.sky],
    [20, 'EVENING · TEACHER', DL.sky],
    [24, 'ALWAYS · ERROR GUARD', DL.red],
  ];
  const sweep = interpolate(frame, [at, at + 160], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  return (
    <div style={{ width: w, position: 'relative', paddingTop: 90 }}>
      <div style={{ position: 'absolute', top: 118, left: 0, right: 0, height: 3, background: DL.border }} />
      <div style={{ position: 'absolute', top: 118, left: 0, width: `${sweep * 100}%`, height: 3, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})` }} />
      {[0, 6, 12, 18, 24].map((hh) => (
        <div key={hh} style={{ position: 'absolute', top: 130, left: `${(hh / 24) * 100}%`, transform: 'translateX(-50%)', fontFamily: DL_MONO, fontSize: 18, color: DL.faint }}>{String(hh).padStart(2, '0')}:00</div>
      ))}
      {EVENTS.map(([hh, label, color], i) => {
        const x = (Math.min(hh, 23.6) / 24) * 100;
        const a = at + 20 + i * 22;
        const op = interpolate(frame, [a, a + 14], [0, 1], DCLAMP);
        const yy = interpolate(frame, [a, a + 18], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
        const up = i % 2 === 0;
        return (
          <div key={label} style={{ position: 'absolute', top: up ? 12 : 148, left: `${x}%`, transform: `translateX(-50%) translateY(${yy}px)`, opacity: op, textAlign: 'center' }}>
            {!up && <div style={{ width: 2, height: 22, background: color, margin: '0 auto 6px' }} />}
            <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color, background: DL.panel, border: `1px solid ${color}44`, borderRadius: 999, padding: '8px 18px', whiteSpace: 'nowrap' }}>{label}</div>
            {up && <div style={{ width: 2, height: 22, background: color, margin: '6px auto 0' }} />}
          </div>
        );
      })}
    </div>
  );
};
