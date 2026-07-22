import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 12 — it weighs options: imagines plans, plays each forward, picks best.
// The line between automation and intelligence. VO 0.8s (21.4s).
export const compositionConfig = { id: 'NReason', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const PLANS = [
  { label: 'Plan A', outcome: 'slow', y: 250, chosen: false },
  { label: 'Plan B', outcome: 'wins', y: 400, chosen: true },
  { label: 'Plan C', outcome: 'risky', y: 550, chosen: false },
];

const NReason: React.FC = () => {
  const frame = useCurrentFrame();
  const rootX = 360, rootY = 400;
  const endX = 1180;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // IT REASONS, IT DOESN'T REACT" />

      <div style={{ position: 'absolute', top: 120, left: 130, right: 130 }}>
        <Headline at={16} size={50}>Before it commits, it does something <span style={{ color: DL.sky }}>human.</span></Headline>
        <div style={{ marginTop: 6 }}><Headline at={48} size={38} italic color={DL.warm}>It imagines a few plans, plays each one forward — and picks the one most likely to pay off.</Headline></div>
      </div>

      <svg viewBox="0 0 1920 720" width="100%" style={{ position: 'absolute', top: 300, left: 0 }}>
        {/* root node */}
        <circle cx={rootX} cy={rootY} r={30} fill={DL.panel} stroke={DL.sky} strokeWidth={2.5} />
        <text x={rootX} y={rootY - 46} fill={DL.dim} fontSize={24} fontFamily={DL_MONO} textAnchor="middle">decision</text>
        {PLANS.map((p, i) => {
          const grow = interpolate(frame, [120 + i * 16, 150 + i * 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const ex = rootX + (endX - rootX) * grow, ey = rootY + (p.y - rootY) * grow;
          const chosenGlow = p.chosen ? interpolate(frame, [330, 356], [0, 1], DCLAMP) : 0;
          const col = p.chosen ? DL.green : DL.faint;
          return (
            <g key={p.label}>
              <line x1={rootX} y1={rootY} x2={ex} y2={ey} stroke={col} strokeWidth={p.chosen ? 3 : 1.6} opacity={p.chosen ? 0.9 : 0.4} />
              <g opacity={grow}>
                {p.chosen && <circle cx={endX} cy={p.y} r={44 + chosenGlow * 8} fill={`${DL.green}22`} />}
                <circle cx={endX} cy={p.y} r={34} fill={DL.panel} stroke={col} strokeWidth={p.chosen ? 3 : 1.6} />
                <text x={endX} y={p.y + 7} fill={p.chosen ? DL.green : DL.muted} fontSize={22} fontFamily={DL_MONO} textAnchor="middle">{p.outcome}</text>
                <text x={endX + 90} y={p.y + 7} fill={p.chosen ? DL.text : DL.faint} fontSize={26} fontFamily={DL_SANS} textAnchor="start">{p.label}{p.chosen ? '  ✓' : ''}</text>
              </g>
            </g>
          );
        })}
      </svg>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [400, 424], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.sky }}>That is the line between an automation — and an intelligence.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NReason;
