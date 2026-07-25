import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch4 close · the cost ladder. VO pay15 23.8. All eight rates stacked; the
// observation ("same direction as a human org chart") lands ~10s; the kicker
// ("nobody designed that") ~19s. Rates/mults from econ.json.
export const compositionConfig = { id: 'YLadder', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const ROWS: [string, string, number][] = [
  ['Dexter', '$0.12', 90], ['Sienna', '$0.12', 105], ['Nano', '$0.12', 120],
  ['Finance', '$0.19', 135], ['Memo', '$0.19', 150],
  ['Doctor', '$0.28', 165], ['David', '$0.29', 180], ['Hermes', '$0.41', 195],
];

const YLadder: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const max = 0.41;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE LADDER" />
      <div style={{ position: 'absolute', top: 140, left: 120, width: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 5, color: DL.faint, marginBottom: 8 }}>$ / AGENT-HOUR — CHEAPEST FIRST</div>
        {ROWS.map(([name, rate, at]) => {
          const w = interpolate(f, [at, at + 26], [0, (parseFloat(rate.slice(1)) / max) * 560], { ...DCLAMP, easing: DL_EASE.out });
          const hot = name === 'Hermes';
          return (
            <div key={name} style={{ ...rise(at), display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 28, color: hot ? DL.gold : DL.text, width: 160 }}>{name}</div>
              <div style={{ height: 34, width: w, background: hot ? DL.gold : DL.panel2, border: `1px solid ${hot ? DL.gold : DL.border}`, borderRadius: 8 }} />
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: hot ? DL.gold : DL.dim }}>{rate}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', top: 260, right: 130, width: 560 }}>
        <div style={{ ...rise(320), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm, lineHeight: 1.4 }}>
          The cost ladder runs in exactly the same direction as a human org chart.
        </div>
        <div style={{ ...rise(590), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 40, lineHeight: 1.5 }}>
          Workers cheapest. The ones who <span style={{ color: DL.gold }}>decide</span> cost the most.
          Nobody designed that — it fell out of how much thinking each seat requires.
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YLadder;
