import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch6 · THE centerpiece. VO flw19 (24.1s): the full graph assembles — five nodes
// on an orbit, arrows draw in the order Brian names them, gold pulses travel.
export const compositionConfig = { id: 'ZFlywheel', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const CX = 960, CY = 590, R = 330;
// (label, sub, angleDeg, igniteFrame) — order matches the narration
const NODES: [string, string, number, number][] = [
  ['CHANNEL', 'trust + teaching', -90, 60],
  ['NERVIX', 'nervix.ai', -18, 130],
  ['YOUTUBE MACHINE', 'Dexter · 14k/mo proof', 54, 260],
  ['ZMARTY', 'Sienna live', 126, 400],
  ['SEMECLAW', 'window + ads', 198, 540],
];
// arrows: (fromIdx, toIdx, drawFrame)
const ARROWS: [number, number, number][] = [
  [0, 1, 110], [2, 0, 320], [3, 0, 470], [4, 0, 640], [1, 4, 660], [2, 3, 480],
];

const pos = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)] as const;
};

const ZFlywheel: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // PUT IT TOGETHER" />
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{
          fontFamily: DL_SERIF, fontSize: 48, color: DL.text,
          opacity: interpolate(f, [8, 26], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
        }}>
          Now put it <span style={{ color: DL.gold, fontStyle: 'italic' }}>together.</span>
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {ARROWS.map(([a, b, at], i) => {
          const [x1, y1] = pos(NODES[a][2]);
          const [x2, y2] = pos(NODES[b][2]);
          const draw = interpolate(f, [at, at + 50], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
          if (draw <= 0) return null;
          const mx = (x1 + x2) / 2 + (CX - (x1 + x2) / 2) * 0.35;
          const my = (y1 + y2) / 2 + (CY - (y1 + y2) / 2) * 0.35;
          // travelling pulse once drawn
          const t = ((f - at) / 70) % 1;
          const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
          const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} stroke={DL.gold} strokeOpacity={0.5}
                    strokeWidth={3} fill="none" strokeDasharray={1000} strokeDashoffset={1000 * (1 - draw)} />
              {draw >= 1 && <circle cx={px} cy={py} r={8} fill={DL.gold} opacity={0.9} />}
            </g>
          );
        })}
      </svg>
      {NODES.map(([label, sub, deg, at], i) => {
        const [x, y] = pos(deg);
        const s = spring({ frame: f - at, fps, config: { damping: 15, mass: 0.7 } });
        return (
          <div key={label} style={{
            position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * s})`,
            opacity: f >= at ? 1 : 0.12, textAlign: 'center',
            background: DL.panel, border: `2px solid ${f >= at ? DL.gold : DL.border}`,
            borderRadius: 18, padding: '18px 26px', minWidth: 200,
            boxShadow: f >= at ? `0 0 ${34 * s}px rgba(212,160,23,0.35)` : 'none',
          }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 24, letterSpacing: 2, color: DL.text }}>{label}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 20, color: DL.muted, marginTop: 6 }}>{sub}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
export default ZFlywheel;
