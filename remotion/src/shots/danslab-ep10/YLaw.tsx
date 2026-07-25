import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch2 · the routing law. VO brain02 4.3 / brain03 23.5. Four steps land in order,
// the last one in red — paid APIs are the thing you avoid.
export const compositionConfig = { id: 'YLaw', durationInSeconds: 29, fps: 30, width: 1920, height: 1080 };

const STEPS: [string, string, string, number][] = [
  ['01', 'FREE', '12 local models · 24 via OpenRouter · Google free tier', 40],
  ['02', 'LOCAL', 'the Mac itself — zero marginal cost', 110],
  ['03', 'SUBSCRIPTION', 'the five plans you just watched arrive', 180],
  ['04', 'PAID API — LAST', 'only when everything above has failed', 250],
];

const YLaw: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="10" label="THE PAYROLL // THE LAW" />
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Headline at={8} size={50}>One law, enforced in code.</Headline>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, right: 120, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {STEPS.map(([n, word, note, at], i) => {
          const op = interpolate(f, [at, at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(f, [at, at + 22], [-50, 0], { ...DCLAMP, easing: DL_EASE.out });
          const col = i === 0 ? DL.green : i === 3 ? DL.red : DL.text;
          return (
            <div key={word} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'baseline', gap: 34 }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.faint, width: 60 }}>{n}</span>
              <span style={{ fontFamily: DL_SERIF, fontSize: 78, color: col, lineHeight: 1.1 }}>{word}</span>
              <span style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.muted }}>{note}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default YLaw;
