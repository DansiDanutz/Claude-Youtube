import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Server, ShieldOff } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 VPN #1. VO 0.8s (16.7s): "Dan rented a server. Named it Nano. Installed
// OpenClaw, went to bed happy. Next morning: Nano had been hacked. Day one.
// Nano was dead." Machine boots green, then the HACK hits (~f320), turns red.
// =============================================================================
export const compositionConfig = { id: 'E2Nano', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const INSTALL = 150;
const HACK = 340;
const DEAD = 400;

const E2Nano: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const cardIn = interpolate(frame, [60, 80], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cardY = interpolate(frame, [60, 80], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
  const installOp = interpolate(frame, [INSTALL, INSTALL + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const on = 0.5 + 0.5 * Math.abs(Math.sin(frame / 16));
  const hacked = frame >= HACK;
  const shake = hacked ? Math.sin((frame - HACK) / 1.5) * interpolate(frame, [HACK, HACK + 20], [8, 0], DCLAMP) : 0;
  const redFlash = hacked ? interpolate(frame, [HACK, HACK + 8], [0, 1], DCLAMP) : 0;
  const deadOp = interpolate(frame, [DEAD, DEAD + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const accent = hacked ? DL.red : DL.green;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={hacked ? DL.red : DL.green} />
      <Kicker n="02" label="MACHINE #1 // NANO" />

      {/* machine card */}
      <div style={{ position: 'absolute', top: 300, left: '50%', transform: `translateX(-50%) translateX(${shake}px) translateY(${cardY}px)`, width: 820, opacity: cardIn }}>
        <div style={{ background: DL.panel, border: `2px solid ${accent}${hacked ? '' : '66'}`, borderRadius: 20, padding: '40px 48px', boxShadow: `0 0 ${60 * (hacked ? redFlash : on)}px ${accent}44`, position: 'relative', overflow: 'hidden' }}>
          {/* red hack wash */}
          <div style={{ position: 'absolute', inset: 0, background: DL.red, opacity: redFlash * 0.14 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, position: 'relative' }}>
            <Avatar src={staticFile('projects/danslab-ep02/nano.png')} size={130} color={accent} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>vps · frankfurt</div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 62, color: DL.text }}>Nano</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Server size={30} color={accent} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: accent, opacity: hacked ? 1 : on }} />
            </div>
          </div>
          {/* status line */}
          <div style={{ marginTop: 26, fontFamily: DL_MONO, fontSize: 26, color: hacked ? DL.red : DL.green, opacity: installOp }}>
            {hacked
              ? <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><ShieldOff size={26} /> ROOT ACCESS LOST · UNKNOWN LOGIN · 04:12</span>
              : '$ openclaw install … OK · running · secured (?)'}
          </div>
        </div>
      </div>

      {/* verdict */}
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: deadOp, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 26 }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.muted }}>DAY 1</span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 76, color: DL.red }}>Nano was dead.</span>
        <span style={{ fontSize: 60 }}>💀</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Nano;
