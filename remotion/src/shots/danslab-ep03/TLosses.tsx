import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Scissors, ShieldAlert } from 'lucide-react';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline, Panel } from '../../lib/ep03kit';

// Ep03 11 — honest about losing: score-cut + capped loss. VO 0.8s (19.7s).
export const compositionConfig = { id: 'TLosses', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const Rule: React.FC<{ icon: React.ReactNode; title: string; body: string; at: number; color: string }> = ({ icon, title, body, at, color }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
  const y = interpolate(frame, [at, at + 18], [26, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: 500, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '30px 36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{icon}<span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color }}>{title}</span></div>
      <div style={{ fontFamily: DL_SANS, fontSize: 26, color: DL.dim, marginTop: 16, lineHeight: 1.4 }}>{body}</div>
    </div>
  );
};

const TLosses: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="THE METHOD // OWNING THE LOSS" />

      <div style={{ position: 'absolute', top: 200, left: 130, right: 130 }}>
        <Headline at={20} size={58}>What makes her trustworthy?</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={58} italic color={DL.gold}>She is honest about losing.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 48 }}>
        <Rule icon={<Scissors size={34} color={DL.red} />} title="SCORE DIES → CUT" body="If the reason she got in falls apart, she doesn't double into a dead idea. She cuts it." at={160} color={DL.red} />
        <Rule icon={<ShieldAlert size={34} color={DL.gold} />} title="EVERY LOSS CAPPED" body="No single trade is allowed to hurt. The downside is bounded before it starts." at={200} color={DL.gold} />
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [360, 380], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.warm }}>Right most of the time. And when she&rsquo;s wrong — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 48, color: DL.green }}>she&rsquo;s wrong small.</span>
      </div>
    </AbsoluteFill>
  );
};
export default TLosses;
