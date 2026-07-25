import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch6 · the hardest decision. VO audit03 13.4. 76 → 39 → 8 funnel; the thesis
// ("agents cost attention") lands ~10s.
export const compositionConfig = { id: 'YPaused', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const YPaused: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const STEPS: [string, string, number, string][] = [
    ['76', 'defined', 20, DL.faint], ['39', 'onboarded', 60, DL.dim], ['8', 'running', 100, DL.gold],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE REDUCTION" />
      <div style={{ position: 'absolute', top: 220, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 90, alignItems: 'baseline' }}>
        {STEPS.map(([n, label, at, color]) => (
          <div key={label} style={{ ...rise(at), textAlign: 'center' }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 150, color, letterSpacing: -4 }}>{n}</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 5, color: DL.muted, textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 180, left: 0, right: 0, textAlign: 'center', ...rise(280) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.warm, lineHeight: 1.4 }}>
          Agents don't cost money. They cost <span style={{ color: DL.gold }}>attention.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YPaused;
