import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// Outro. VO flw24 13.2 at +0.6: "This was DansLab, number eleven… subscribe, and
// hit like… Build. Ship. Repeat." Reveals land on his words.
export const compositionConfig = { id: 'ZOutro', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const ZOutro: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const fadeOut = interpolate(f, [488, 506], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg glow="#120d07" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(20), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.faint }}>
          DANSLAB · NO. 11
        </div>
        <div style={{ ...rise(60), fontFamily: DL_SERIF, fontSize: 66, color: DL.text, marginTop: 30 }}>
          The <span style={{ fontStyle: 'italic', color: DL.gold }}>Flywheel</span>
        </div>
        {/* subscribe lands on "subscribe, and hit like" (~7.5s = f225) */}
        <div style={{ ...rise(225), marginTop: 56, display: 'flex', gap: 40, alignItems: 'center' }}>
          <span style={{
            fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.bg,
            background: DL.gold, borderRadius: 999, padding: '14px 38px',
          }}>Subscribe — the first dollar lands next</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>danslab.vercel.app</span>
        </div>
        {/* motto on his words (~11.3-13.2s) */}
        <div style={{ display: 'flex', gap: 42, marginTop: 64, fontFamily: DL_MONO, fontSize: 38, letterSpacing: 3 }}>
          <span style={{ opacity: interpolate(f, [345, 357], [0, 1], DCLAMP), color: DL.text }}>BUILD.</span>
          <span style={{ opacity: interpolate(f, [375, 387], [0, 1], DCLAMP), color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: interpolate(f, [405, 417], [0, 1], DCLAMP), color: DL.red }}>REPEAT.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default ZOutro;
