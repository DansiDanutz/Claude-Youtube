import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Bell } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, DlLogo } from '../../lib/danslab';

// =============================================================================
// Ep02 outro. VO 1.0s (15.5s): "This was DansLab, number two. The Survivors.
// Next time, the overseer. The system that runs the whole race. Its name is
// Paperclip. Subscribe, and watch the company build itself. Build. Ship.
// Repeat." Named episode marker, next-episode card, subscribe, motto.
// =============================================================================
export const compositionConfig = { id: 'E2Outro', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const MARK = 40, NEXT = 200, SUB = 320, MOTTO = 400;

const E2Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const markOp = interpolate(frame, [MARK, MARK + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const markY = interpolate(frame, [MARK, MARK + 18], [24, 0], { ...DCLAMP, easing: DL_EASE.out });
  const ruleW = interpolate(frame, [MARK + 30, MARK + 54], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const nextOp = interpolate(frame, [NEXT, NEXT + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subOp = interpolate(frame, [SUB, SUB + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const subPulse = 1 + 0.025 * Math.abs(Math.sin((frame - SUB) / 14));
  const m = (d: number) => interpolate(frame, [MOTTO + d, MOTTO + d + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const fadeOut = interpolate(frame, [468, 500], [1, 0], { ...DCLAMP, easing: DL_EASE.in });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fadeOut }}>
      <SiteBg />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* named episode marker */}
        <div style={{ opacity: markOp, transform: `translateY(${markY}px)`, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 8, color: DL.red }}>DANSLAB · NO. 02</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 18 }}>
            <DlLogo size={96} />
            <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 110, color: DL.text }}>The <span style={{ fontStyle: 'italic', color: DL.gold }}>Survivors</span></span>
          </div>
        </div>
        <div style={{ marginTop: 24, height: 5, width: 520, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${ruleW})`, transformOrigin: 'center' }} />
        </div>

        {/* next episode card */}
        <div style={{ opacity: nextOp, display: 'flex', alignItems: 'center', gap: 22, marginTop: 44, border: `1px solid ${DL.border}`, background: DL.panel, borderRadius: 14, padding: '20px 36px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.red }}>NEXT · NO. 03</span>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.text }}>The Overseer</span>
          <span style={{ fontSize: 26, color: DL.muted }}>— Paperclip runs the whole race</span>
        </div>

        {/* subscribe */}
        <div style={{ opacity: subOp, transform: `scale(${subPulse})`, display: 'flex', alignItems: 'center', gap: 16, background: '#FF0000', borderRadius: 999, padding: '18px 44px', marginTop: 44, boxShadow: '0 0 60px #ff000040' }}>
          <Bell size={28} color="#fff" />
          <span style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>SUBSCRIBE — watch the company build itself</span>
        </div>

        <div style={{ display: 'flex', gap: 38, marginTop: 46, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3 }}>
          <span style={{ opacity: m(0), color: DL.text }}>BUILD.</span>
          <span style={{ opacity: m(22), color: DL.gold }}>SHIP.</span>
          <span style={{ opacity: m(44), color: DL.red }}>REPEAT.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default E2Outro;
