import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, DlWordmark } from '../../lib/danslab';

// Ch2 · the channel is NERVIX's front door. VO flw09. Two nodes, an arrow draws
// between them, gold pulses start travelling — the first flywheel connection.
export const compositionConfig = { id: 'ZFrontDoor', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const ZFrontDoor: React.FC = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [140, 210], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  // pulses travel left node -> right node once the arrow is drawn
  const pulses = [0, 0.33, 0.66].map((ph) => ((f / 90 + ph) % 1));
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // CONNECTION 1" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120, textAlign: 'center' }}>
        <div style={{ ...rise(10), fontFamily: DL_SERIF, fontSize: 52, color: DL.text }}>
          The channel doesn't talk about NERVIX. It's NERVIX's <span style={{ color: DL.gold, fontStyle: 'italic' }}>front door.</span>
        </div>
      </div>
      {/* the two nodes + arrow */}
      <div style={{ position: 'absolute', top: 430, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
        <div style={{ ...rise(60), background: DL.panel, border: `2px solid ${DL.gold}`, borderRadius: 20, padding: '34px 48px' }}>
          <DlWordmark size={40} />
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 4, color: DL.faint, marginTop: 10 }}>TRUST + TEACHING</div>
        </div>
        <div style={{ position: 'relative', width: 420, height: 8 }}>
          <div style={{ position: 'absolute', top: 2, left: 0, height: 4, width: `${draw * 100}%`, background: `linear-gradient(90deg, ${DL.gold}, ${DL.red})`, borderRadius: 4 }} />
          {draw >= 1 && pulses.map((p, i) => (
            <div key={i} style={{
              position: 'absolute', top: -5, left: `${p * 100}%`, width: 18, height: 18, borderRadius: 9,
              background: DL.gold, boxShadow: `0 0 18px ${DL.gold}`, opacity: 0.5 + 0.5 * Math.sin(p * Math.PI),
            }} />
          ))}
          <div style={{ position: 'absolute', top: -14, right: -8, opacity: draw >= 1 ? 1 : 0, color: DL.red, fontSize: 34 }}>▶</div>
        </div>
        <div style={{ ...rise(110), background: DL.panel, border: `2px solid ${DL.red}`, borderRadius: 20, padding: '34px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 44, color: DL.text }}>NERVIX</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 4, color: DL.faint, marginTop: 10 }}>nervix.ai</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', ...rise(290) }}>
        <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim }}>
          Every episode answers the questions that keep people out.
        </span>
      </div>
    </AbsoluteFill>
  );
};
export default ZFrontDoor;
