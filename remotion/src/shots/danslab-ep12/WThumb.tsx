import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SiteBg } from '../../lib/danslab';
import { DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';

// EP12 YouTube thumbnail (1280×720, rendered as a still). Thumbnail text from youtube-metadata.md:
// "I PAID MYSELF $9" + "REVENUE $0.00". Truthful: the $9 is Dan's own live test, revenue stays zero.
// Built from the episode's tokens instead of a paid image model (owner rule: no paid generation without a budget).
export const compositionConfig = { id: 'WThumb', durationInSeconds: 1, fps: 30, width: 1280, height: 720 };

const WThumb: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.gold} />
    <div style={{ position: 'absolute', top: 56, left: 64, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 6, color: DL.red }}>
      DANSLAB · NO. 12
    </div>
    <div style={{ position: 'absolute', top: 108, left: 60, width: 700, fontFamily: DL_SANS, fontWeight: 800, fontSize: 104, lineHeight: 0.98,
      color: DL.text, letterSpacing: -2 }}>
      I PAID<br />MYSELF <span style={{ color: DL.gold }}>$9</span>
    </div>
    <div style={{ position: 'absolute', top: 360, left: 64, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>
      through our own payment rail
    </div>
    <div style={{ position: 'absolute', top: 120, right: 60, width: 420, background: DL.panel, border: `4px solid ${DL.gold}`, borderRadius: 26,
      padding: '30px 36px', boxShadow: `0 0 70px ${DL.gold}44`, transform: 'rotate(2deg)' }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 6, color: DL.muted, marginBottom: 12 }}>REVENUE</div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 112, color: DL.gold, lineHeight: 1.05 }}>$0.00</div>
    </div>
    <div style={{ position: 'absolute', top: 400, right: 70, fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: DL.red,
      border: `4px solid ${DL.red}`, borderRadius: 10, padding: '8px 18px', transform: 'rotate(-5deg)' }}>
      TEST — NOT REVENUE
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, display: 'flex', alignItems: 'center', gap: 22, padding: '0 64px',
      background: 'rgba(9,7,6,0.85)', borderTop: `2px solid ${DL.border}` }}>
      <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 52 }}>
        <span style={{ color: DL.text }}>The First </span><span style={{ color: DL.gold, fontStyle: 'italic' }}>Dollar</span>
      </span>
      <span style={{ flex: 1 }} />
      <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>USDC · Polygon · no bank</span>
    </div>
  </AbsoluteFill>
);
export default WThumb;
