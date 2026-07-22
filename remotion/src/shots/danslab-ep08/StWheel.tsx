import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Img, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { MacStudioBox } from '../../lib/ep08kit';

// Ep08 13 — not a pyramid: a wheel with a desk at the hub. VO 0.8s (18.7s).
export const compositionConfig = { id: 'StWheel', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const R = 300;
const CX = 960;
const CY = 620;

const NODES: [string, string, string][] = [
  ['THE TRADER', DL.green, 'projects/danslab-ep07/ep03a.png'],
  ['THE OVERSEER', DL.sky, 'projects/danslab-ep08/paperclip.png'],
  ['THE BRAIN', DL.gold, 'projects/danslab-ep07/ep05a.png'],
  ['THE MARKETPLACE', DL.red, 'projects/danslab-ep07/ep06a.png'],
  ['THE FACTORY', DL.warm, 'projects/danslab-ep08/repo.png'],
];

const StWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const n = NODES.length;
  const spin = interpolate(frame, [80, 520], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE WATCH // THE REAL SHAPE" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Not a pyramid. <span style={{ color: DL.gold }}>A wheel.</span></Headline>
      </div>

      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={DL.border} strokeWidth={2} />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={DL.gold} strokeWidth={3}
          strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - spin)}
          transform={`rotate(-90 ${CX} ${CY})`} opacity={0.7} />
        {NODES.map((_, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          const op = interpolate(frame, [140 + i * 16, 158 + i * 16], [0, 0.5], DCLAMP);
          return <line key={i} x1={CX} y1={CY} x2={CX + Math.cos(a) * (R - 66)} y2={CY + Math.sin(a) * (R - 66)} stroke={DL.border} strokeWidth={1.5} opacity={op} />;
        })}
      </svg>

      {/* the hub: the desk itself */}
      <div style={{ position: 'absolute', left: CX - 130, top: CY - 66, width: 260, opacity: interpolate(frame, [60, 88], [0, 1], DCLAMP) }}>
        <MacStudioBox at={60} w={260} label="" />
      </div>

      {NODES.map(([label, color, img], i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const x = CX + Math.cos(a) * R;
        const y = CY + Math.sin(a) * R;
        const at = 120 + i * 20;
        const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
        const sc = interpolate(frame, [at, at + 22], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
        return (
          <div key={label} style={{ position: 'absolute', left: x - 105, top: y - 82, width: 210, textAlign: 'center', opacity: op, transform: `scale(${sc})` }}>
            <div style={{ width: 116, height: 116, margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${color}`, background: DL.panel, boxShadow: `0 0 26px ${color}44` }}>
              <Img src={staticFile(img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 18, letterSpacing: 2, color }}>{label}</div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 450], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Everything spins around one quiet machine — and one person deciding </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>what matters.</span>
      </div>
    </AbsoluteFill>
  );
};
export default StWheel;
