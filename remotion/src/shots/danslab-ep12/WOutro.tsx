import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_MONO, DL_SANS, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { useRise } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// Outro (series pattern). VO dol26: "This was DansLab, number twelve. The First Dollar… subscribe, and hit
// like… Build. Ship. Repeat." Every reveal lands on his word (whisper word times).
export const compositionConfig = { id: 'WOutro', durationInSeconds: 14.2, fps: 30, width: 1920, height: 1080 };

const WOutro: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const { durationInFrames } = useVideoConfig();
  const fadeOut = interpolate(f, [durationInFrames - 18, durationInFrames], [1, 0], { ...DCLAMP, easing: DL_EASE.in });
  const word = (w: string) => interpolate(f, [at('dol26', w), at('dol26', w) + 10], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg glow="#120d07" />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ ...rise(voAt('dol26')), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.faint }}>DANSLAB · NO. 12</div>
        <div style={{ ...rise(at('dol26', 'first')), fontFamily: DL_SERIF, fontSize: 66, color: DL.text, marginTop: 30 }}>
          The First <span style={{ fontStyle: 'italic', color: DL.gold }}>Dollar</span>
        </div>
        <div style={{ ...rise(at('dol26', 'subscribe')), marginTop: 56, display: 'flex', gap: 40, alignItems: 'center' }}>
          <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 30, color: DL.bg, background: DL.gold, borderRadius: 999, padding: '14px 38px' }}>
            Subscribe — watch the counter climb
          </span>
          <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>danslab.vercel.app</span>
        </div>
        <div style={{ display: 'flex', gap: 42, marginTop: 64, fontFamily: DL_MONO, fontSize: 38, letterSpacing: 3 }}>
          <span style={{ opacity: word('build'), color: DL.text }}>BUILD.</span>
          <span style={{ opacity: word('ship'), color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: word('repeat'), color: DL.red }}>REPEAT.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default WOutro;
