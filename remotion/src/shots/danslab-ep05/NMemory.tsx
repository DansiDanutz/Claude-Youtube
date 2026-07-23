import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { RotateCcw, Database } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 10c — Byterover: shared persistent memory. Restart != amnesia. VO 0.8s (~22s).
export const compositionConfig = { id: 'NMemory', durationInSeconds: 31, fps: 30, width: 1920, height: 1080 };

const NMemory: React.FC = () => {
  const frame = useCurrentFrame();
  const dbOp = interpolate(frame, [90, 116], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const dbY = interpolate(frame, [90, 120], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 18));
  const restartOp = interpolate(frame, [230, 254], [0, 1], DCLAMP);
  const punch = interpolate(frame, [520, 545], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="05" label="MEMORY // IT DOESN'T FORGET" />
      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Restart it — and it does not wake up an <span style={{ color: DL.gold }}>amnesiac.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: dbOp, transform: `translateY(${dbY}px)` }}>
        <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 28, background: DL.panel, border: `1px solid ${DL.gold}66` }}>
          <div style={{ position: 'absolute', inset: -16, borderRadius: 36, background: `radial-gradient(circle, ${DL.gold}33, transparent 70%)`, opacity: glow }} />
          <Database size={104} color={DL.gold} strokeWidth={1.4} />
        </div>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.gold, marginTop: 18 }}>BYTEROVER</div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.warm, marginTop: 8 }}>one shared memory the whole fleet can read</div>
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: restartOp }}>
        <RotateCcw size={24} color={DL.dim} />
        <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: DL.dim }}>RESTART · REBOOT → no lesson learned twice</span>
      </div>
      <div style={{ position: 'absolute', bottom: 68, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.text }}>The brain thinks. </span>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 40, color: DL.gold }}>The memory makes it stick.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NMemory;
