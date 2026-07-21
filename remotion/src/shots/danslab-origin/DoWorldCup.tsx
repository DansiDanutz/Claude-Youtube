import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Play } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Phone } from '../../lib/danslab';

// =============================================================================
// Origin 8/14 — WorldCup proof. VO 0.8s (22.9s): channel card + counter to
// 14,000 on the mention (~f240); then the worldcup26.world app screenshot on
// "and behind it..." (~f420) with the 119-cards chip.
// =============================================================================
export const compositionConfig = { id: 'DoWorldCup', durationInSeconds: 24.6, fps: 30, width: 1920, height: 1080 };

const CARD = 96, COUNT = 225, APP = 420;

const DoWorldCup: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const cardOp = interpolate(frame, [CARD, CARD + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cardY = interpolate(frame, [CARD, CARD + 16], [34, 0], { ...DCLAMP, easing: DL_EASE.out });
  const subs = Math.round(interpolate(frame, [COUNT, COUNT + 52], [0, 14000], { ...DCLAMP, easing: DL_EASE.inOut }));
  const appOp = interpolate(frame, [APP, APP + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const chipOp = interpolate(frame, [APP + 90, APP + 104], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE PROOF // WORLDCUP" />

      <div style={{ position: 'absolute', top: 180, left: 120, ...rise(10, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          WorldCup <span style={{ fontStyle: 'italic', color: DL.gold }}>Central.</span>
        </span>
      </div>

      {/* channel card, left */}
      <div style={{ position: 'absolute', top: 330, left: 120, width: 700, opacity: cardOp, transform: `translateY(${cardY}px)` }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '40px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ width: 110, height: 78, borderRadius: 20, background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px #ff000033' }}>
              <Play size={38} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 44, color: DL.text }}>@DansLab-WorldCup</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.muted, marginTop: 4 }}>AI World Cup 2026 simulations</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 34 }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 84, color: DL.gold, fontVariantNumeric: 'tabular-nums' }}>{subs.toLocaleString('en-US')}</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.dim }}>SUBSCRIBERS</span>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
            {['IMPOSSIBLE MATCHUPS', 'FORGOTTEN LEGENDS', 'PREDICTIONS'].map((t) => (
              <span key={t} style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 1, color: DL.warm, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* the app — on a real phone, right */}
      <div style={{ position: 'absolute', top: 150, right: 300 }}>
        <Phone src={staticFile('projects/danslab-origin/worldcup26-mobile.png')} h={800} start={APP} statusTime="9:41" tilt={-6} />
      </div>
      {/* glow behind the phone */}
      <div style={{ position: 'absolute', top: 380, right: 300, width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${DL.gold}22, transparent 65%)`, opacity: appOp, zIndex: -1 }} />
      {/* cards chip — under the channel card, clear of the phone */}
      <div style={{ opacity: chipOp, position: 'absolute', top: 720, left: 120, width: 700, background: `${DL.gold}12`, border: `1px solid ${DL.gold}55`, borderRadius: 16, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 52, color: DL.gold }}>119</span>
        <div>
          <div style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.warm }}>COLLECTIBLE CARDS</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 19, color: DL.muted, marginTop: 4 }}>every video unlocks one</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoWorldCup;
