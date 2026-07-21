import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Bell } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';

// =============================================================================
// Origin 14/14 — outro + CTA. VO 1.0s (16.4s): "This is the first video on
// the DansLab channel... Subscribe, and watch us build in public. Build.
// Ship. Repeat." EP/01 badge, wordmark, subscribe pill, motto, slow fade.
// =============================================================================
export const compositionConfig = { id: 'DoOutro', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const MOTTO = 400;

const DoOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const epOp = interpolate(frame, [26, 42], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const markOp = interpolate(frame, [56, 76], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const markY = interpolate(frame, [56, 76], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
  const rule = interpolate(frame, [96, 122], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const madeOp = interpolate(frame, [150, 168], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subOp = interpolate(frame, [300, 316], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subPulse = 1 + 0.025 * Math.abs(Math.sin((frame - 316) / 14));
  const m = (d: number) => interpolate(frame, [MOTTO + d, MOTTO + d + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const linksOp = interpolate(frame, [470, 486], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fadeOut = interpolate(frame, [560, 596], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: epOp, fontFamily: DL_MONO, fontSize: 25, letterSpacing: 6, color: DL.red, border: `1px solid ${DL.red}55`, borderRadius: 999, padding: '10px 28px' }}>
          EPISODE 01 · THE ORIGIN
        </div>
        <div style={{ opacity: markOp, transform: `translateY(${markY}px)`, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 140, color: DL.text, marginTop: 34 }}>
          Dans<span style={{ color: DL.red }}>Lab</span>
        </div>
        <div style={{ marginTop: 24, height: 5, width: 540, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${rule})`, transformOrigin: 'left' }} />
        </div>
        <div style={{ opacity: madeOp, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm, marginTop: 30 }}>
          Everything you just watched was made by the lab itself.
        </div>

        <div style={{ opacity: subOp, transform: `scale(${subPulse})`, display: 'flex', alignItems: 'center', gap: 18, background: '#FF0000', borderRadius: 999, padding: '20px 48px', marginTop: 52, boxShadow: '0 0 60px #ff000040' }}>
          <Bell size={30} color="#fff" />
          <span style={{ fontSize: 34, fontWeight: 700, color: '#fff' }}>SUBSCRIBE — watch us build in public</span>
        </div>

        <div style={{ display: 'flex', gap: 40, marginTop: 56, fontFamily: DL_MONO, fontSize: 32, letterSpacing: 3 }}>
          <span style={{ opacity: m(0), color: DL.text }}>BUILD.</span>
          <span style={{ opacity: m(22), color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: m(44), color: DL.red }}>REPEAT.</span>
        </div>
        <div style={{ opacity: linksOp, display: 'flex', gap: 28, marginTop: 52, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>
          <span>danslab.vercel.app</span><span>·</span><span>dansemenescu.vercel.app</span><span>·</span><span>github.com/DansiDanutz</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default DoOutro;
