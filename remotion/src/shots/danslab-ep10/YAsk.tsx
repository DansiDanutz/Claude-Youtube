import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// Cold open 0:12-0:22. The question, then the two figures. VO open04 2.1 / open05 3.6 / open06 2.5.
export const compositionConfig = { id: 'YAsk', durationInSeconds: 12, fps: 30, width: 1920, height: 1080 };

const YAsk: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const strike = interpolate(f, [126, 150], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const pay = spring({ frame: f - 176, fps, config: { damping: 200, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          fontFamily: DL_SERIF, fontSize: 80, color: DL.text,
          opacity: interpolate(f, [6, 24], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
        }}>Nobody has ever asked what they cost.</div>

        <div style={{ height: 70 }} />

        {/* the human bill, struck through */}
        <div style={{ position: 'relative', opacity: interpolate(f, [96, 116], [0, 1], DCLAMP) }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 104, color: DL.red }}>$1,319,500</div>
          <div style={{
            position: 'absolute', left: -12, top: '52%', height: 5, background: DL.red,
            width: `${strike * 104}%`, borderRadius: 3,
          }} />
        </div>
        <div style={{
          fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.faint, marginTop: 14,
          textTransform: 'uppercase', opacity: interpolate(f, [104, 124], [0, 1], DCLAMP),
        }}>eight humans in those seats · per year</div>

        <div style={{ height: 56 }} />

        <div style={{ opacity: pay, transform: `scale(${0.92 + pay * 0.08})` }}>
          <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 168, color: DL.gold, letterSpacing: -3 }}>$1,242</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.dim, textTransform: 'uppercase', textAlign: 'center', marginTop: 10 }}>
            what he actually pays · per month
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default YAsk;
