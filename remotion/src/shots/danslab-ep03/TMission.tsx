import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep03 12c — Sienna's mission: not just to trade, to PROVE. Turn skeptics into
// believers, one honest trade at a time. VO 0.8s (~18s).
export const compositionConfig = { id: 'TMission', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const TMission: React.FC = () => {
  const frame = useCurrentFrame();
  const showS = interpolate(frame, [150, 168], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const showArrow = interpolate(frame, [200, 224], [0, 1], DCLAMP);
  const showB = interpolate(frame, [230, 252], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const bScale = interpolate(frame, [230, 256], [0.85, 1], { ...DCLAMP, easing: DL_EASE.out });
  const punch = interpolate(frame, [430, 452], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE MISSION // SKEPTICS INTO BELIEVERS" />

      <div style={{ position: 'absolute', top: 196, left: 130, right: 130 }}>
        <Headline at={16} size={56}>Her real assignment: not to trade — to prove.</Headline>
        <div style={{ marginTop: 12 }}><Headline at={54} size={40} italic color={DL.warm}>That a machine can run leverage with discipline — and come out ahead.</Headline></div>
      </div>

      {/* skeptic -> believer */}
      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        <div style={{ opacity: showS, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '20px 46px' }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 34, letterSpacing: 3, color: DL.faint }}>SKEPTIC</span>
        </div>
        <span style={{ opacity: showArrow, fontFamily: DL_SANS, fontSize: 54, color: DL.gold }}>&rarr;</span>
        <div style={{ opacity: showB, transform: `scale(${bScale})`, background: `${DL.green}18`, border: `1px solid ${DL.green}66`, borderRadius: 999, padding: '20px 46px', boxShadow: `0 0 40px ${DL.green}33` }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 34, letterSpacing: 3, color: DL.green }}>BELIEVER</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 660, left: 0, right: 0, textAlign: 'center', opacity: showB }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 32, color: DL.muted }}>on a book anyone can audit.</span>
      </div>

      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 46, color: DL.text }}>One honest trade </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 46, color: DL.gold }}>at a time.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TMission;
