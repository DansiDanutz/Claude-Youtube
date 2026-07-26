import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// Ep10 end tease — after "Revenue." holds, the season-two hook. No VO.
// The one question that keeps a viewer for next episode: can they actually earn?
export const compositionConfig = { id: 'YNext', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const YNext: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const fadeOut = interpolate(f, [300, 328], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg glow="#120d07" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(20), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.faint }}>
          NEXT ON DANSLAB
        </div>
        <div style={{ ...rise(60), fontFamily: DL_SERIF, fontSize: 58, color: DL.text, marginTop: 34, lineHeight: 1.35, maxWidth: 1400 }}>
          Eight workers who cost <span style={{ color: DL.gold }}>$1,242</span> try to earn
          <span style={{ fontStyle: 'italic', color: DL.gold }}> their first dollar.</span>
        </div>
        <div style={{ ...rise(130), fontFamily: DL_SANS, fontSize: 32, color: DL.warm, marginTop: 30 }}>
          One product. One payment. No humans in the loop.
        </div>
        <div style={{ ...rise(200), marginTop: 60, display: 'flex', gap: 40, alignItems: 'center' }}>
          <span style={{
            fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.bg,
            background: DL.gold, borderRadius: 999, padding: '14px 38px',
          }}>Subscribe for season two</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>danslab.vercel.app</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default YNext;
