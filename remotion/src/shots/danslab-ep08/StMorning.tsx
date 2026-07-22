import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Phone } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 7 — 07:00: fleet health + CEO brief land before Dan wakes.
// VO 0.8s (20.1s).
export const compositionConfig = { id: 'StMorning', durationInSeconds: 23, fps: 30, width: 1920, height: 1080 };

const Bubble: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
  const y = interpolate(frame, [at, at + 18], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, alignSelf: 'flex-start', maxWidth: '90%', background: '#1b1b1b', borderRadius: 14, padding: '11px 14px', marginBottom: 10 }}>
      <div style={{ fontFamily: DL_SANS, fontSize: 18, color: '#f2f2f2', lineHeight: 1.4 }}>{children}</div>
    </div>
  );
};

const StMorning: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE RIGHT HAND // 07:00" />

      <div style={{ position: 'absolute', top: 150, left: 110, width: 880 }}>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 120, color: DL.gold, lineHeight: 1, opacity: interpolate(frame, [20, 44], [0, 1], DCLAMP) }}>07:00</div>
        <div style={{ marginTop: 20 }}>
          <Headline at={50} size={46}>Before Dan opens his eyes,<br />David has already been to work.</Headline>
        </div>
        <div style={{ marginTop: 40, opacity: interpolate(frame, [430, 460], [0, 1], DCLAMP) }}>
          <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>He does not wake up to the company.</div>
          <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>He wakes up to a briefing about it.</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 110, right: 200 }}>
        <Phone h={820} start={80} statusTime="7:00" tilt={-4}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 62, paddingLeft: 14, paddingRight: 14, height: '100%', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 16, color: '#8b8b8b', textAlign: 'center', marginBottom: 14 }}>David · DansLab HQ</div>
            <Bubble at={130}><b>FLEET HEALTH — 07:00</b><br />dexter ✓ · memo ✓ · sienna ✓ · nano ✓</Bubble>
            <Bubble at={190}><b>CEO BRIEF</b><br />Overnight: 2 trades closed, 3 tasks settled on Nervix, ep renders green.</Bubble>
            <Bubble at={260}>Needs a decision: 1 deploy waiting on your go.</Bubble>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
export default StMorning;
