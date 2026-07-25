import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { ImageBackdrop } from '../../lib/ep10kit';

// Cold open 0:00-0:10. Three claims, escalating. VO open01 2.1 / open02 1.2 / open03 6.2.
// No kicker yet — the hook lands before any branding, then the plate carries it.
export const compositionConfig = { id: 'YHook', durationInSeconds: 11, fps: 30, width: 1920, height: 1080 };

const Line: React.FC<{ at: number; size?: number; color?: string; children: React.ReactNode }> =
({ at, size = 76, color = DL.text, children }) => {
  const f = useCurrentFrame();
  return (
    <div style={{
      fontFamily: DL_SERIF, fontSize: size, color, lineHeight: 1.25,
      opacity: interpolate(f, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
      transform: `translateY(${interpolate(f, [at, at + 20], [26, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
    }}>{children}</div>
  );
};

const YHook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      {/* the room arrives on "none of them are human" — ground, not subject */}
      <div style={{ opacity: interpolate(f, [64, 96], [0, 1], DCLAMP) }}>
        <ImageBackdrop src={staticFile('projects/danslab-ep10/04-eight-desks.png')} at={64} dim={0.8} />
      </div>
      <AbsoluteFill style={{ justifyContent: 'center', paddingLeft: 150, paddingRight: 150 }}>
        <Line at={8}>Eight employees work for this company.</Line>
        <div style={{ height: 30 }} />
        <Line at={70} size={92} color={DL.red}>None of them are human.</Line>
        <div style={{ height: 42 }} />
        {/* no <br>: forced breaks don't know the rendered width and orphan the dash */}
        <div style={{
          fontFamily: DL_SANS, fontSize: 38, color: DL.dim, lineHeight: 1.55, maxWidth: 1080,
          opacity: interpolate(f, [112, 132], [0, 1], DCLAMP),
        }}>
          Never taken a day off. Never asked for a raise. Never been paid —{' '}
          <span style={{ color: DL.text }}>not one of them has a bank account.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default YHook;
