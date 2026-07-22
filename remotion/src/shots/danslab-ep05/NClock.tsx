import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 11c — compounding: small nightly edits stack into the swiss clock Dan
// was after. VO 0.8s (22.5s).
export const compositionConfig = { id: 'NClock', durationInSeconds: 25, fps: 30, width: 1920, height: 1080 };

const GAINS: [string, string][] = [
  ['MON', 'a prompt sharpened'],
  ['TUE', 'a routing rule learned'],
  ['WED', 'a stale instruction retired'],
  ['THU', 'an hour saved, quietly'],
  ['FRI', 'a weakness patched over'],
  ['SAT', 'a routine made smaller'],
  ['SUN', 'the fleet, a little sharper'],
];

const NClock: React.FC = () => {
  const frame = useCurrentFrame();
  // the compounding curve behind the week
  const prog = interpolate(frame, [80, 400], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const W = 1320, H = 220;
  const pts = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59;
    const v = Math.pow(t, 1.9);
    return `${(t * W).toFixed(1)},${(H - v * (H - 20) - 10).toFixed(1)}`;
  });
  const shown = Math.max(2, Math.floor(prog * pts.length));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="LEARNING // THE COMPOUNDING" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Individually, none of these are <span style={{ color: DL.dim }}>dramatic.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)', width: W }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="clkfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={DL.gold} stopOpacity="0.24" />
              <stop offset="1" stopColor={DL.gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${H} ${pts.slice(0, shown).join(' ')} ${(shown / pts.length * W).toFixed(1)},${H}`} fill="url(#clkfill)" />
          <polyline points={pts.slice(0, shown).join(' ')} fill="none" stroke={DL.gold} strokeWidth={4} strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 560, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 14 }}>
        {GAINS.map(([d, g], i) => {
          const at = 90 + i * 26;
          const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [at, at + 20], [20, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={d} style={{ opacity: op, transform: `translateY(${y}px)`, width: 178, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.gold }}>{d}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 21, color: DL.dim, marginTop: 8, lineHeight: 1.3 }}>{g}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [360, 392], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Stacked, night after night — the difference between a fleet that thrashes</span>
        <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>and a fleet that ticks.</div>
      </div>
    </AbsoluteFill>
  );
};
export default NClock;
