import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 12b — the stack. The subscriptions/tools that run on the ground floor,
// grouped by job, then the cost punchline. VO ~44s -> duration 45s.
export const compositionConfig = { id: 'StStack', durationInSeconds: 42, fps: 30, width: 1920, height: 1080 };

const GROUPS: { title: string; color: string; items: string[] }[] = [
  { title: 'BUILD', color: DL.sky, items: ['Claude Code', 'GPT', 'GLM'] },
  { title: 'RESEARCH', color: DL.gold, items: ['Perplexity', 'Kimi'] },
  { title: 'MEDIA + WEB', color: DL.red, items: ['Higgsfield', 'Firecrawl'] },
  { title: 'INFRA', color: DL.green, items: ['Supabase', 'Vercel', 'Render'] },
];

const StStack: React.FC = () => {
  const frame = useCurrentFrame();
  const costOp = interpolate(frame, [1080, 1120], [0, 1], DCLAMP);
  const costY = interpolate(frame, [1080, 1125], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="08" label="THE GROUND FLOOR // THE STACK" />

      <div style={{ position: 'absolute', top: 172, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>Subscriptions, not salaries.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 336, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {GROUPS.map((g, gi) => {
          const a = 90 + gi * 210;
          const op = interpolate(frame, [a, a + 20], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 24], [28, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={g.title} style={{ opacity: op, transform: `translateY(${y}px)`, width: 300, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '30px 20px' }}>
              <div style={{ fontFamily: DL_SANS, fontSize: 20, letterSpacing: 3, color: g.color, marginBottom: 18 }}>{g.title}</div>
              {g.items.map((it, ii) => {
                const b = a + 26 + ii * 16;
                const io = interpolate(frame, [b, b + 16], [0, 1], DCLAMP);
                return <div key={it} style={{ opacity: io, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 34, color: DL.warm, lineHeight: 1.45 }}>{it}</div>;
              })}
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', top: 762, left: 0, right: 0, textAlign: 'center', opacity: costOp, transform: `translateY(${costY}px)` }}>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.gold }}>Low hundreds of euros a month.</div>
        <div style={{ marginTop: 12, fontFamily: DL_SANS, fontSize: 24, color: DL.faint }}>A fifteen-person company, for the price of a family phone plan.</div>
      </div>
    </AbsoluteFill>
  );
};
export default StStack;
