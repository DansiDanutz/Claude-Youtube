import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { ShieldCheck, Lock, KeyRound, Server } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 VPN #3. VO 0.8s (17.3s): "So Dan tried something different. A third
// machine. Named it Dexter. And this time, before anything else, the boring
// thing. Security. Locked it down. No open doors. Then... he went to bed."
// Security checks lock in one by one; the machine shields up.
// =============================================================================
export const compositionConfig = { id: 'E2Dexter', durationInSeconds: 18.5, fps: 30, width: 1920, height: 1080 };

const LOCKS = [
  { Icon: Lock, txt: 'firewall · all ports closed', at: 150 },
  { Icon: KeyRound, txt: 'ssh · keys only, no passwords', at: 210 },
  { Icon: ShieldCheck, txt: 'fail2ban · auto-ban intruders', at: 268 },
];
const SHIELD = 340;

const E2Dexter: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const cardIn = interpolate(frame, [60, 80], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const shieldOp = interpolate(frame, [SHIELD, SHIELD + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const bedOp = interpolate(frame, [420, 438], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 20));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="02" label="MACHINE #3 // DEXTER · SECURITY FIRST" />

      <div style={{ position: 'absolute', top: 186, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 68, color: DL.text }}>
          This time, <span style={{ fontStyle: 'italic', color: DL.sky }}>the boring thing.</span>
        </span>
      </div>

      {/* Dexter card, right */}
      <div style={{ position: 'absolute', top: 350, right: 160, width: 560, opacity: cardIn }}>
        <div style={{ background: DL.panel, border: `2px solid ${DL.sky}66`, borderRadius: 20, padding: '38px 40px', textAlign: 'center', boxShadow: `0 0 ${50 * shieldOp * glow}px ${DL.sky}44` }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Avatar src={staticFile('projects/danslab-ep02/dexter.jpg')} size={150} color={DL.sky} />
            <div style={{ position: 'absolute', bottom: -6, right: -6, width: 56, height: 56, borderRadius: '50%', background: DL.bg, border: `2px solid ${DL.sky}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: shieldOp }}>
              <ShieldCheck size={30} color={DL.sky} />
            </div>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 56, color: DL.text, marginTop: 16 }}>Dexter</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.sky, marginTop: 6, opacity: shieldOp }}>LOCKED DOWN</div>
        </div>
      </div>

      {/* security checklist, left */}
      <div style={{ position: 'absolute', top: 360, left: 150, width: 660, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {LOCKS.map((l) => {
          const op = interpolate(frame, [l.at, l.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(frame, [l.at, l.at + 13], [-22, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={l.txt} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 20, background: DL.panel, border: `1px solid ${DL.sky}44`, borderRadius: 12, padding: '20px 26px' }}>
              <l.Icon size={28} color={DL.sky} strokeWidth={1.9} />
              <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.text }}>{l.txt}</span>
              <span style={{ marginLeft: 'auto', color: DL.green, fontSize: 26 }}>✓</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: bedOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm }}>Then, with very low expectations… he went to bed. 🌙</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Dexter;
