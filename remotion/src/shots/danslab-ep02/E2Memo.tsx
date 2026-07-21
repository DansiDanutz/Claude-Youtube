import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Server, ShieldOff, Skull } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 VPN #2. VO 0.8s (17.9s): "No problem, rookie mistake. Rented a second
// machine. Named it Memo... next morning Memo was hacked too. Day two. Also
// dead. Two machines. Two funerals. This was not going well." Nano's tombstone
// sits at left; Memo boots then dies; the funeral tally rises.
// =============================================================================
export const compositionConfig = { id: 'E2Memo', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const HACK = 300;
const DEAD = 360;
const TALLY = 440;

const E2Memo: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const cardIn = interpolate(frame, [60, 80], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const on = 0.5 + 0.5 * Math.abs(Math.sin(frame / 16));
  const hacked = frame >= HACK;
  const shake = hacked ? Math.sin((frame - HACK) / 1.5) * interpolate(frame, [HACK, HACK + 20], [8, 0], DCLAMP) : 0;
  const redFlash = hacked ? interpolate(frame, [HACK, HACK + 8], [0, 1], DCLAMP) : 0;
  const deadOp = interpolate(frame, [DEAD, DEAD + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const tallyOp = interpolate(frame, [TALLY, TALLY + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const accent = hacked ? DL.red : DL.green;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={hacked ? DL.red : DL.green} />
      <Kicker n="02" label="MACHINE #2 // MEMO" />

      {/* Nano tombstone, small at left */}
      <div style={{ position: 'absolute', top: 330, left: 150, textAlign: 'center', opacity: 0.55 }}>
        <div style={{ width: 150, height: 180, borderRadius: '90px 90px 12px 12px', background: DL.panel2, border: `1px solid ${DL.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Skull size={40} color={DL.muted} />
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.muted }}>NANO</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 16, color: DL.faint }}>day 1</span>
        </div>
      </div>

      {/* Memo machine card */}
      <div style={{ position: 'absolute', top: 300, left: 440, transform: `translateX(${shake}px)`, width: 760, opacity: cardIn }}>
        <div style={{ background: DL.panel, border: `2px solid ${accent}${hacked ? '' : '66'}`, borderRadius: 20, padding: '38px 46px', boxShadow: `0 0 ${60 * (hacked ? redFlash : on)}px ${accent}44`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: DL.red, opacity: redFlash * 0.14 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 26, position: 'relative' }}>
            <Avatar src={staticFile('projects/danslab-ep02/memo.jpg')} size={120} color={accent} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>vps · take two</div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 58, color: DL.text }}>Memo</div>
            </div>
            <Server size={28} color={accent} />
          </div>
          <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 25, color: hacked ? DL.red : DL.green }}>
            {hacked
              ? <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><ShieldOff size={24} /> BREACHED · same story · 05:03</span>
              : '$ openclaw install … OK (this time for sure)'}
          </div>
        </div>
      </div>

      {/* verdict + funeral tally */}
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: deadOp, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 24 }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: DL.muted }}>DAY 2</span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 72, color: DL.red }}>Also dead.</span>
        <span style={{ fontSize: 54 }}>💀💀</span>
      </div>
      <div style={{ position: 'absolute', bottom: 84, left: 0, right: 0, textAlign: 'center', opacity: tallyOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>Two machines. Two funerals. This was not going well.</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Memo;
