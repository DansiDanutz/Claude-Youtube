import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Origin 4/14 — DansLab reveal. VO 0.8s (14.5s): "He called it DansLab..."
// Site screenshot rises; stat chips land on "thirty-plus named agents, five
// droplets, one Mac Studio... one boss".
// =============================================================================
export const compositionConfig = { id: 'DoLab', durationInSeconds: 16.2, fps: 30, width: 1920, height: 1080 };

const CHIPS = [
  { label: '30+ NAMED AGENTS', at: 175 },
  { label: '5 DROPLETS', at: 205 },
  { label: '1 MAC STUDIO', at: 235 },
  { label: '1 BOSS', at: 285, hot: true },
];

const DoLab: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="03" label="THE LAB // DANSLAB.VERCEL.APP" />

      <div style={{ position: 'absolute', top: 186, left: 120, ...rise(10, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 74, color: DL.text }}>
          He called it <span style={{ fontStyle: 'italic', color: DL.red }}>DansLab.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 220, ...rise(60, 40) }}>
        <SiteFrame src={staticFile('projects/danslab-origin/danslab.png')} url="danslab.vercel.app" w={1480} h={640} />
      </div>

      <div style={{ position: 'absolute', bottom: 74, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {CHIPS.map((c) => {
          const op = interpolate(frame, [c.at, c.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [c.at, c.at + 12], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c.label} style={{ opacity: op, transform: `translateY(${y}px)`, border: `1px solid ${c.hot ? DL.red : DL.border}`, background: c.hot ? `${DL.red}18` : DL.panel, borderRadius: 999, padding: '14px 30px' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: c.hot ? DL.red : DL.dim }}>{c.label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default DoLab;
