import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch5 · the ads loop. VO flw18: advertisers subscribe → their ad reaches every
// SemeClaw user. A product built on a product.
export const compositionConfig = { id: 'ZAdsLoop', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const NODES: [string, string, number][] = [
  ['AI BUILDERS', 'want visibility', 120],
  ['SEMECLAW ADS', 'subscribe · add your ad', 220],
  ['EVERY SEMECLAW USER', 'sees it while watching agents think', 320],
];

const ZAdsLoop: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="11" label="THE FLYWHEEL // THE ADS LOOP" />
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <div style={{ ...rise(10), fontFamily: DL_SERIF, fontSize: 50, color: DL.text }}>
          Why build a window? Because of <span style={{ color: DL.gold, fontStyle: 'italic' }}>what hangs inside it.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26 }}>
        {NODES.map(([t, sub, at], i) => (
          <React.Fragment key={t}>
            {i > 0 && (
              <div style={{ opacity: interpolate(f, [at - 30, at], [0, 1], DCLAMP), color: DL.gold, fontSize: 44 }}>→</div>
            )}
            <div style={{
              ...rise(at), background: DL.panel, border: `2px solid ${i === 1 ? DL.gold : DL.border}`,
              borderRadius: 18, padding: '30px 36px', textAlign: 'center', maxWidth: 420,
            }}>
              <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 27, letterSpacing: 2, color: i === 1 ? DL.gold : DL.text }}>{t}</div>
              <div style={{ fontFamily: DL_SANS, fontSize: 23, color: DL.muted, marginTop: 10 }}>{sub}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', ...rise(440) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>
          A product, built on a product, paid for by people building products.
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default ZAdsLoop;
