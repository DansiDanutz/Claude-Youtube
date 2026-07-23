import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Easing } from 'remotion';
import { KeyRound, Vault, ShieldCheck } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

const OVERSHOOT = Easing.bezier(0.34, 1.42, 0.64, 1);

// =============================================================================
// Ep02 08b — the keys. Chief of droplets meant chief of the keys: a central
// key manager, one locked vault every agent draws from. VO 0.8s (~19s).
// =============================================================================
export const compositionConfig = { id: 'E2Keys', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const VAULT = 54;
const KEYS = 150;
const PUNCH = 430;
const KEYCHIPS = ['models', 'APIs', 'services', 'tokens', 'secrets'];

const E2Keys: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const vaultOp = interpolate(frame, [VAULT, VAULT + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const vaultY = interpolate(frame, [VAULT, VAULT + 18], [30, 0], { ...DCLAMP, easing: OVERSHOOT });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(frame / 18));
  const punchOp = interpolate(frame, [PUNCH, PUNCH + 18], [0, 1], DCLAMP);
  const punchY = interpolate(frame, [PUNCH, PUNCH + 20], [22, 0], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="03" label="THE KEYS // ONE LOCKED VAULT" />

      <div style={{ position: 'absolute', top: 188, left: 0, right: 0, textAlign: 'center', ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 60, color: DL.text }}>
          Chief of droplets meant chief of the <span style={{ fontStyle: 'italic', color: DL.gold }}>keys.</span>
        </span>
      </div>

      {/* central vault */}
      <div style={{ position: 'absolute', top: 350, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: vaultOp, transform: `translateY(${vaultY}px)` }}>
        <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 28, background: DL.panel, border: `1px solid ${DL.gold}66` }}>
          <div style={{ position: 'absolute', inset: -18, borderRadius: 36, background: `radial-gradient(circle, ${DL.gold}33, transparent 70%)`, opacity: glow }} />
          <Vault size={116} color={DL.gold} strokeWidth={1.4} />
        </div>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.gold, marginTop: 18 }}>KEY MANAGER</div>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 30, color: DL.warm, marginTop: 8 }}>one vault every agent draws from</div>
      </div>

      {/* the scattered secrets, gathered */}
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}>
        {KEYCHIPS.map((c, i) => {
          const a = KEYS + i * 20;
          const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
          const y = interpolate(frame, [a, a + 18], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c} style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 8, background: `${DL.gold}12`, border: `1px solid ${DL.gold}44`, borderRadius: 999, padding: '10px 20px' }}>
              <KeyRound size={18} color={DL.gold} />
              <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 1, color: DL.warm }}>{c}</span>
            </div>
          );
        })}
      </div>

      {/* punchline */}
      <div style={{ position: 'absolute', bottom: 62, left: 0, right: 0, textAlign: 'center', opacity: punchOp, transform: `translateY(${punchY}px)`, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        <ShieldCheck size={26} color={DL.green} />
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 34, color: DL.text }}>Dexter holds every key.</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Keys;
