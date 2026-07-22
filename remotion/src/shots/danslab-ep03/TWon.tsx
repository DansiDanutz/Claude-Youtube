import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Panel, SLabel } from '../../lib/ep03kit';

// Ep03 13 — one real trade, part 2: bounce at the cluster → banks 59%, trails
// → closes GREEN. VO 0.8s (23.1s).
export const compositionConfig = { id: 'TWon', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

// V-shape: drops to the cluster then reclaims
const PATH = [0.72, 0.58, 0.46, 0.40, 0.52, 0.66, 0.80, 0.86];

const TWon: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 1100, h = 360, pad = 24;
  const x = (i: number) => pad + (i / (PATH.length - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - v) * (h - pad * 2);
  const prog = interpolate(frame, [140, 470], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const shown = Math.max(2, Math.floor(prog * PATH.length));
  const line = PATH.slice(0, shown).map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const bounceOp = shown > 3 ? interpolate(frame, [300, 320], [0, 1], DCLAMP) : 0;
  const winOp = interpolate(frame, [560, 585], [0, 1], DCLAMP);
  const winScale = interpolate(frame, [560, 590], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="03" label="A REAL TRADE // THE BOUNCE" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 130 }}>
        <Headline at={16} size={50}>Right at the cluster, price does what the map said.</Headline>
        <div style={{ marginTop: 6 }}><Headline at={50} size={44} italic color={DL.green}>It bounces. It reclaims.</Headline></div>
      </div>

      <Panel at={120} glow={DL.green} style={{ position: 'absolute', top: 360, left: 410, width: 1100, padding: '28px 40px' }}>
        <SLabel color={DL.green}>PRICE · the doubling defense pays off</SLabel>
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ marginTop: 8, overflow: 'visible' }}>
          <line x1="0" x2={w} y1={y(0.40)} y2={y(0.40)} stroke={`${DL.gold}55`} strokeDasharray="5 8" />
          <text x={10} y={y(0.40) - 8} fill={DL.gold} fontSize={20} fontFamily={DL_MONO}>cluster · avg entry</text>
          <polyline points={line} fill="none" stroke={DL.green} strokeWidth={4} strokeLinejoin="round" />
          <g style={{ opacity: bounceOp }}>
            <circle cx={x(3)} cy={y(PATH[3])} r={10} fill={DL.gold} stroke={DL.bg} strokeWidth={3} />
            <text x={x(3)} y={y(PATH[3]) + 40} fill={DL.text} fontSize={22} fontFamily={DL_MONO} textAnchor="middle">bounce</text>
          </g>
        </svg>
      </Panel>

      {/* win badge */}
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22, opacity: winOp, transform: `scale(${winScale})` }}>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.green, border: `2px solid ${DL.green}`, borderRadius: 12, padding: '10px 22px' }}>banks 59% · trails the rest</span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.text }}>A trade that dropped twice against her — closed <span style={{ color: DL.green }}>green.</span></span>
      </div>
    </AbsoluteFill>
  );
};
export default TWon;
