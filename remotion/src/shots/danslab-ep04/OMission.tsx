import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Eye } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 4 — every CEO wants mission control: one screen, see everything. VO 0.8s (21.6s).
export const compositionConfig = { id: 'OMission', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const OMission: React.FC = () => {
  const frame = useCurrentFrame();
  const eyeOp = interpolate(frame, [150, 172], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const eyeScale = interpolate(frame, [150, 180], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.4 + 0.4 * Math.abs(Math.sin(frame / 20));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="04" label="THE DREAM // MISSION CONTROL" />

      <div style={{ position: 'absolute', top: 210, left: 130, right: 130 }}>
        <Headline at={20} size={56}>Every chief executive wants the same thing.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={58} size={62} italic color={DL.sky}>Mission control.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: eyeOp, transform: `scale(${eyeScale})` }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${DL.sky}44, transparent 70%)`, opacity: glow }} />
          <Eye size={130} color={DL.sky} strokeWidth={1.4} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [260, 282], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>One screen — to see who&rsquo;s working, who&rsquo;s stuck, what&rsquo;s shipping, and what&rsquo;s on fire.</span>
        <div style={{ marginTop: 12 }}><span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>But his team wasn&rsquo;t people. It was four autonomous machines. And they would not sit still.</span></div>
      </div>
    </AbsoluteFill>
  );
};
export default OMission;
