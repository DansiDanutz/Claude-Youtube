import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch2 · the routing law. VO brain02 4.3 / brain03 23.5. Four steps land in order,
// the last one in red. Right column: the 12 local models cascade in as chips on
// FREE/LOCAL, then hand over to the four subscription cards on SUBSCRIPTION.
export const compositionConfig = { id: 'YLaw', durationInSeconds: 29, fps: 30, width: 1920, height: 1080 };

const STEPS: [string, string, string, number][] = [
  ['01', 'FREE', '12 local models · 24 via OpenRouter · Google free tier', 40],
  ['02', 'LOCAL', 'the Mac itself — zero marginal cost', 110],
  ['03', 'SUBSCRIPTION', 'the five plans you just watched arrive', 180],
  ['04', 'PAID API — LAST', 'only when everything above has failed', 250],
];

// resident on the Mac Studio (ollama list + fleet docs)
const LOCAL: string[] = [
  'qwen3:8b', 'qwen2.5-coder:7b', 'qwen3-fast', 'qwen2.5:7b',
  'qwen3-30b · hot', 'danslab-coder:7b', 'deepseek-r1', 'gemma3',
  'qwen3-embedding', 'nomic-embed', 'whisper · ears', 'kokoro · voice',
];

const SUBS: [string, string, string][] = [
  ['Claude', 'Anthropic Max ×2', DL.red],
  ['GPT', 'ChatGPT Pro', DL.green],
  ['Kimi 3', 'Moonshot — Alegro', DL.gold],
  ['GLM', 'z.ai — year up front', DL.sky],
];

const SUB_AT = 200; // cards take over just after "SUBSCRIPTION" lands

const YLaw: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chipsOut = interpolate(f, [SUB_AT - 14, SUB_AT], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="10" label="THE PAYROLL // THE LAW" />
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Headline at={8} size={50}>One law, enforced in code.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, width: 1050, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {STEPS.map(([n, word, note, at], i) => {
          const op = interpolate(f, [at, at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(f, [at, at + 22], [-50, 0], { ...DCLAMP, easing: DL_EASE.out });
          const col = i === 0 ? DL.green : i === 3 ? DL.red : DL.text;
          return (
            <div key={word} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 34 }}>
                <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.faint, width: 60 }}>{n}</span>
                <span style={{ fontFamily: DL_SERIF, fontSize: 74, color: col, lineHeight: 1.1 }}>{word}</span>
              </div>
              <div style={{ fontFamily: DL_SANS, fontSize: 25, color: DL.muted, marginLeft: 94 }}>{note}</div>
            </div>
          );
        })}
      </div>

      {/* right column — the models themselves */}
      <div style={{ position: 'absolute', top: 290, right: 110, width: 560 }}>
        {/* 12 local chips, cascading on FREE/LOCAL */}
        <div style={{ opacity: chipsOut, position: 'absolute', inset: 0 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 5, color: DL.faint, marginBottom: 16,
            opacity: interpolate(f, [46, 60], [0, 1], DCLAMP) }}>RESIDENT ON THE MAC</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {LOCAL.map((m, i) => {
              const at = 52 + i * 9;
              const s = spring({ frame: f - at, fps, config: { damping: 15, mass: 0.5 } });
              return (
                <div key={m} style={{
                  opacity: f >= at ? 1 : 0, transform: `scale(${0.7 + 0.3 * s})`,
                  fontFamily: DL_MONO, fontSize: 22, color: DL.dim,
                  background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 999,
                  padding: '9px 18px',
                }}>{m}</div>
              );
            })}
          </div>
        </div>
        {/* the four subscription cards, taking over on SUBSCRIPTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SUBS.map(([name, plan, color], i) => {
            const at = SUB_AT + i * 12;
            const s = spring({ frame: f - at, fps, config: { damping: 16, mass: 0.6 } });
            return (
              <div key={name} style={{
                opacity: f >= at ? 1 : 0,
                transform: `translateX(${(1 - s) * 70}px)`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${color}`,
                borderRadius: 14, padding: '18px 26px',
              }}>
                <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.text }}>{name}</span>
                <span style={{ fontFamily: DL_MONO, fontSize: 22, color }}>{plan}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YLaw;
