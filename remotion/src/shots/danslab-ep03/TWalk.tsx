import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, LadderStep, Panel, SLabel } from '../../lib/ep03kit';

// Ep03 12 — one real trade, part 1: BTC, score 71, open + two doublings as
// price drops. VO 0.8s (24.5s).
export const compositionConfig = { id: 'TWalk', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

// price path (falls into clusters). x 0..1, y normalized (1=top)
const PATH = [0.72, 0.66, 0.58, 0.52, 0.46, 0.40];
const ADDS = [
  { i: 0, label: 'open $100 · 20×' },
  { i: 2, label: '+$200 · 10×' },
  { i: 4, label: '+$400 · 5×' },
];

const TWalk: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 900, h = 340, pad = 20;
  const x = (i: number) => pad + (i / (PATH.length - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - v) * (h - pad * 2);
  const prog = interpolate(frame, [150, 470], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const shown = Math.max(2, Math.floor(prog * PATH.length));
  const line = PATH.slice(0, shown).map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="A REAL TRADE // BITCOIN" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 130 }}>
        <Headline at={16} size={52}>Let me show you one real trade.</Headline>
        <div style={{ marginTop: 6 }}><Headline at={50} size={40} italic color={DL.warm}>Score clears at <span style={{ color: DL.gold }}>71</span>. She opens long. Then price drops.</Headline></div>
      </div>

      <Panel at={130} style={{ position: 'absolute', top: 360, left: 200, width: 980, padding: '30px 40px' }}>
        <SLabel color={DL.gold}>PRICE · she adds toward liquidation</SLabel>
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ marginTop: 10, overflow: 'visible' }}>
          <polyline points={line} fill="none" stroke={DL.red} strokeWidth={3.5} strokeLinejoin="round" />
          {ADDS.map((a, k) => {
            const vis = shown > a.i;
            const op = vis ? interpolate(frame, [150 + a.i * 52, 150 + a.i * 52 + 14], [0, 1], DCLAMP) : 0;
            return (
              <g key={k} style={{ opacity: op }}>
                <circle cx={x(a.i)} cy={y(PATH[a.i])} r={9} fill={DL.gold} stroke={DL.bg} strokeWidth={3} />
                <text x={x(a.i)} y={y(PATH[a.i]) + 40} fill={DL.text} fontSize={22} fontFamily={DL_MONO} textAnchor="middle">{a.label}</text>
              </g>
            );
          })}
        </svg>
      </Panel>

      {/* running ladder on the right */}
      <div style={{ position: 'absolute', top: 400, right: 150, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LadderStep margin="$100" lev="20×" note="entry" at={170} active color={DL.gold} />
        <LadderStep margin="$200" lev="10×" note="doubled down" at={300} active color={DL.gold} />
        <LadderStep margin="$400" lev="5×" note="doubled again" at={410} active color={DL.gold} />
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [500, 520], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Her average is now far below where she started.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TWalk;
