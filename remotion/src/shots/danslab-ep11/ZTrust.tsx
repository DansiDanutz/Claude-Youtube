import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_SERIF, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, DlWordmark } from '../../lib/danslab';

// Ch1 · trust is the first product. VO flw06. The first flywheel node ignites
// center-screen: the channel, with "open books / real numbers / real failures"
// orbiting in as satellites.
export const compositionConfig = { id: 'ZTrust', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const SAT = ['open books', 'real numbers', 'real failures'];

const ZTrust: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ignite = spring({ frame: f - 130, fps, config: { damping: 16, mass: 0.7 } });
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [20, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="11" label="THE FLYWHEEL // NODE 1 — TRUST" />
      <div style={{ position: 'absolute', top: 150, left: 120, width: 900 }}>
        <div style={{ ...rise(10), fontFamily: DL_SERIF, fontSize: 54, color: DL.text, lineHeight: 1.3 }}>
          The first product isn't software. It's <span style={{ color: DL.gold, fontStyle: 'italic' }}>trust.</span>
        </div>
        <div style={{ ...rise(400), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 34, lineHeight: 1.5, maxWidth: 800 }}>
          This channel is the trust layer. Everything else is built on top of it.
        </div>
      </div>
      {/* the node */}
      <div style={{ position: 'absolute', top: 300, right: 220, width: 480, height: 480 }}>
        <div style={{
          position: 'absolute', inset: 100, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212,160,23,${0.28 * ignite}) 0%, transparent 70%)`,
          transform: `scale(${0.6 + 0.4 * ignite})`,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * ignite})`,
          opacity: ignite, background: DL.panel, border: `2px solid ${DL.gold}`, borderRadius: 24, padding: '30px 44px',
        }}>
          <DlWordmark size={44} />
        </div>
        {SAT.map((s, i) => {
          const ang = -0.5 + i * 2.1 + f / 220;
          const op = interpolate(f, [200 + i * 34, 224 + i * 34], [0, 1], DCLAMP);
          return (
            <div key={s} style={{
              position: 'absolute', top: `calc(50% + ${Math.sin(ang) * 215}px)`, left: `calc(50% + ${Math.cos(ang) * 215}px)`,
              transform: 'translate(-50%,-50%)', opacity: op,
              fontFamily: DL_MONO, fontSize: 21, color: DL.dim, background: DL.panel2,
              border: `1px solid ${DL.border}`, borderRadius: 999, padding: '8px 16px', whiteSpace: 'nowrap',
            }}>{s}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default ZTrust;
