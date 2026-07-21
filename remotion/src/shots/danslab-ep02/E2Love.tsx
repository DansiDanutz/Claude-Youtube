import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Heart } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar, OpenClawLogo } from '../../lib/danslab';

// =============================================================================
// Ep02 the love affair. VO 0.8s (15.5s): "It started as a crush. Dan fell for
// AI. Late nights with ChatGPT, building a crypto app. Then something crawled
// onto his screen. A red lobster. Its name... was OpenClaw." Chat bubbles +
// heart, then the lobster crawls in (~f330).
// =============================================================================
export const compositionConfig = { id: 'E2Love', durationInSeconds: 17, fps: 30, width: 1920, height: 1080 };

const CLAW = 340;
const CHATS = [
  { at: 96, txt: 'build me a crypto app', me: true },
  { at: 150, txt: 'sure! here is a starter…', me: false },
  { at: 210, txt: 'can it trade for me?', me: true },
];

const E2Love: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const heart = 0.85 + 0.15 * Math.abs(Math.sin(frame / 12));
  const heartOp = interpolate(frame, [70, 90], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const clawOp = interpolate(frame, [CLAW, CLAW + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const nameOp = interpolate(frame, [CLAW + 40, CLAW + 56], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="01" label="THE LOVE AFFAIR // LATE NIGHTS" />

      <div style={{ position: 'absolute', top: 190, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          It started as <span style={{ fontStyle: 'italic', color: DL.gold }}>a crush.</span>
        </span>
      </div>

      {/* Dan + heart + ChatGPT */}
      <div style={{ position: 'absolute', top: 360, left: 150, display: 'flex', alignItems: 'center', gap: 30 }}>
        <Avatar src={staticFile('projects/danslab-ep02/dan-avatar.jpg')} size={130} color={DL.gold} />
        <div style={{ opacity: heartOp, transform: `scale(${heart})` }}><Heart size={54} color={DL.red} fill={DL.red} /></div>
        <div style={{ width: 130, height: 130, borderRadius: '50%', background: '#10a37f', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${DL.bg}`, boxShadow: `0 0 40px #10a37f44` }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: '#fff', textAlign: 'center', lineHeight: 1.1 }}>Chat<br/>GPT</span>
        </div>
      </div>

      {/* chat bubbles */}
      <div style={{ position: 'absolute', top: 350, left: 560, width: 720, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CHATS.map((c) => {
          const op = interpolate(frame, [c.at, c.at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const y = interpolate(frame, [c.at, c.at + 12], [14, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={c.txt} style={{ opacity: op, transform: `translateY(${y}px)`, alignSelf: c.me ? 'flex-end' : 'flex-start', background: c.me ? `${DL.gold}1c` : DL.panel, border: `1px solid ${c.me ? DL.gold + '55' : DL.border}`, borderRadius: c.me ? '14px 4px 14px 14px' : '4px 14px 14px 14px', padding: '16px 24px', fontFamily: DL_MONO, fontSize: 26, color: DL.text }}>
              {c.txt}
            </div>
          );
        })}
      </div>

      {/* the lobster crawls in */}
      <div style={{ position: 'absolute', bottom: 90, right: 180, opacity: clawOp }}>
        <OpenClawLogo src={staticFile('projects/danslab-ep02/openclaw-mascot.png')} size={200} start={CLAW} wordmark={false} />
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: nameOp }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 44, color: DL.dim }}>Then something crawled onto his screen. Its name was </span>
        <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.red }}>OpenClaw.</span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Love;
