import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Img, staticFile } from 'remotion';
import { Spade, Coins, Rocket, Heart } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin 2/14 — who is Dan. VO 0.8s (25.5s): avatar left; the three ventures
// land on their mentions (poker ~f200, kryptostack ~f280, irise ~f380); the
// family line closes (~f520).
// =============================================================================
export const compositionConfig = { id: 'DoDan', durationInSeconds: 27.2, fps: 30, width: 1920, height: 1080 };

const ROLES = [
  { icon: Spade, title: 'Player Poker Club', sub: 'co-owner · Cluj-Napoca', color: DL.red, at: 189 },
  { icon: Coins, title: 'Kryptostack.com', sub: 'co-owner · crypto ⇄ fiat · live exchanges · Romania', color: DL.gold, at: 282 },
  { icon: Rocket, title: 'iRise Coin', sub: 'CEO · Solana network', color: DL.sky, at: 513 },
];
const FAMILY = 618;

const DoDan: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const famOp = interpolate(frame, [FAMILY, FAMILY + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="01" label="THE HUMAN // DAN SEMENESCU" />

      {/* avatar portrait card */}
      <div style={{ position: 'absolute', top: 210, left: 150, width: 470, ...rise(12, 28) }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${DL.border}`, boxShadow: `0 0 90px ${DL.gold}22, 0 30px 80px rgba(0,0,0,0.6)` }}>
          <Img src={staticFile('projects/danslab-origin/dan-avatar.jpg')} style={{ width: '100%', height: 640, objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.faint }}>dan.jpeg</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.warm }}>NOT A SILICON VALLEY FOUNDER</span>
        </div>
      </div>

      {/* right column */}
      <div style={{ position: 'absolute', top: 230, left: 720, right: 130 }}>
        <div style={{ ...rise(26, 24), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 88, color: DL.text, lineHeight: 1.08 }}>
          Dan <span style={{ fontStyle: 'italic', color: DL.gold }}>Semenescu</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 48 }}>
          {ROLES.map((r) => {
            const op = interpolate(frame, [r.at, r.at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
            const x = interpolate(frame, [r.at, r.at + 14], [30, 0], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={r.title} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', alignItems: 'center', gap: 24, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${r.color}`, borderRadius: 14, padding: '24px 32px' }}>
                <div style={{ width: 64, height: 64, borderRadius: 14, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <r.icon size={32} color={r.color} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 600, color: DL.text }}>{r.title}</div>
                  <div style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.muted, marginTop: 6 }}>{r.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: famOp, display: 'flex', alignItems: 'center', gap: 16, marginTop: 42 }}>
          <Heart size={26} color={DL.red} fill={DL.red} />
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, color: DL.warm }}>
            A husband. A father of two. One best friend he shares everything with.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DoDan;
