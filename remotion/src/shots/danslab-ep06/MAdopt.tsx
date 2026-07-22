import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep06 14 — every agent Nano creates is born knowing how to plug in. VO 0.8s (16.3s).
export const compositionConfig = { id: 'MAdopt', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };

const MAdopt: React.FC = () => {
  const frame = useCurrentFrame();
  // Nano spawns new agents that light up with a "seat" badge
  const spawns = [0, 1, 2, 3, 4];
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="06" label="THE ECOSYSTEM // BORN TO PLUG IN" />

      <div style={{ position: 'absolute', top: 180, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={20} size={50}>This is Dan&rsquo;s idea — and it&rsquo;s <span style={{ color: DL.gold }}>spreading.</span></Headline>
      </div>

      {/* Nano at left, new agents spawning to the right */}
      <div style={{ position: 'absolute', top: 440, left: 220, display: 'flex', alignItems: 'center', gap: 30 }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar src={staticFile('projects/danslab-ep06/nano.png')} size={150} color={DL.gold} />
          <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint, marginTop: 10 }}>Nano</div>
        </div>
        <div style={{ fontFamily: DL_MONO, fontSize: 34, color: DL.faint }}>→</div>
        <div style={{ display: 'flex', gap: 18 }}>
          {spawns.map((i) => {
            const at = 150 + i * 22;
            const p = interpolate(frame, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            const gl = 0.4 + 0.6 * Math.abs(Math.sin((frame + i * 20) / 18));
            return (
              <div key={i} style={{ opacity: p, transform: `scale(${p})`, position: 'relative' }}>
                <div style={{ width: 84, height: 84, borderRadius: '50%', background: DL.panel, border: `2px solid ${DL.green}`, boxShadow: `0 0 ${16 * gl}px ${DL.green}` }} />
                <div style={{ position: 'absolute', bottom: -6, right: -6, fontFamily: DL_MONO, fontSize: 16, color: DL.green, background: DL.bg, border: `1px solid ${DL.green}`, borderRadius: 999, padding: '2px 8px' }}>seat ✓</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 324], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>Every new agent wakes up </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>already holding a seat.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MAdopt;
