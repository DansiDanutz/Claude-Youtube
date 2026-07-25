import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Chip } from '../../lib/ep03kit';

// Ch1 · the spec and the amortisation. VO iron02 29.7 + iron03 3.2. The mistake
// ($5,500 in the monthly column) is crossed out; the honest number lands at ~30s.
export const compositionConfig = { id: 'YSpec', durationInSeconds: 35, fps: 30, width: 1920, height: 1080 };

const MODELS = ['Qwen', 'DeepSeek', 'Gemma', '30B held hot'];

const YSpec: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  // "$5,500 monthly" struck through on "That's not how hardware works" ~19s
  const strike = interpolate(f, [570, 600], [0, 100], { ...DCLAMP, easing: DL_EASE.out });
  const land = spring({ frame: f - 900, fps, config: { damping: 200, mass: 0.6 } });
  const monthly = Math.round(153 * land);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE IRON" />
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1000 }}>
        <Headline at={8} size={48}>Twelve local models, <span style={{ color: DL.gold }}>resident at once.</span></Headline>
        <div style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
          {MODELS.map((m, i) => <Chip key={m} at={70 + i * 40} color={i === 3 ? DL.gold : DL.dim}>{m}</Chip>)}
        </div>
        <div style={{ ...rise(330), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 40, lineHeight: 1.5 }}>
          A maxed machine — around <span style={{ color: DL.text, fontWeight: 600 }}>$5,500</span>. The mistake is
          dropping that into the monthly column:
        </div>
        <div style={{ ...rise(480), position: 'relative', display: 'inline-block', marginTop: 30 }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 64, color: DL.red }}>$5,500 / month</span>
          <div style={{ position: 'absolute', top: '52%', left: 0, width: `${strike}%`, height: 5, background: DL.text }} />
        </div>
        <div style={{ ...rise(660), fontFamily: DL_SANS, fontSize: 28, color: DL.muted, marginTop: 26 }}>
          Hardware amortises across the three years it will actually run.
        </div>
      </div>
      {/* the honest number, on "A hundred and fifty-three a month" ~30s */}
      <div style={{ position: 'absolute', top: 300, right: 130, textAlign: 'right', opacity: interpolate(f, [900, 916], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 6, color: DL.faint }}>HEAD OFFICE</div>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 170, color: DL.gold, letterSpacing: -4, marginTop: 10 }}>
          ${monthly}
        </div>
        <div style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>per month · 36-month spread</div>
      </div>
    </AbsoluteFill>
  );
};
export default YSpec;
