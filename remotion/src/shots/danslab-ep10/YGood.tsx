import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch6 · the green column. VO audit02 37.7. Three items land on their numbers:
// cost router ~3s, evidence rule ~14s, the reduction ~28s.
export const compositionConfig = { id: 'YGood', durationInSeconds: 40, fps: 30, width: 1920, height: 1080 };

const ITEMS: [string, string, number][] = [
  ['The cost router', 'free → local → subscription → paid, hard daily caps enforced in code', 100],
  ['The evidence rule', 'nothing counts unless a ticket is closed with proof — not a run, not a heartbeat', 430],
  ['The reduction', '76 agents defined · 39 onboarded with identities and metadata', 850],
];

const YGood: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE AUDIT — EXCELLENT" />
      <div style={{ position: 'absolute', top: 140, left: 120, right: 120 }}>
        <Headline at={8} size={48}>What's genuinely <span style={{ color: DL.green }}>excellent.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1560, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {ITEMS.map(([t, d, at], i) => (
          <div key={t} style={{
            ...rise(at), display: 'flex', alignItems: 'flex-start', gap: 26,
            background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.green}`,
            borderRadius: 14, padding: '24px 30px',
          }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: DL.green, width: 56 }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 34, color: DL.text }}>{t}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 8, lineHeight: 1.45 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
export default YGood;
