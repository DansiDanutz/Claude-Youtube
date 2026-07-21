import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Play, Bell, ThumbsUp } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 8/10 — the proud one. VO 0.8s: "And here is one Dan is proud of.
// The WorldCup YouTube channel, built with this very pipeline, now fourteen
// thousand subscribers strong. Real audience. Real growth. Shipped by agents,
// directed by one human." Channel card ~f100, counter rolls to 14,000 ~f200.
// =============================================================================
export const compositionConfig = { id: 'DlWorldCup', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const CARD = 100;
const COUNT = 196;
const TRIPLE = 330; // "Real audience. Real growth."

const DlWorldCup: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const cardOp = interpolate(frame, [CARD, CARD + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cardY = interpolate(frame, [CARD, CARD + 18], [40, 0], { ...DCLAMP, easing: DL_EASE.out });
  const subs = Math.round(interpolate(frame, [COUNT, COUNT + 56], [0, 14000], { ...DCLAMP, easing: DL_EASE.inOut }));
  const sweep = interpolate(frame, [COUNT + 60, COUNT + 80], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const t1 = interpolate(frame, [TRIPLE, TRIPLE + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const t2 = interpolate(frame, [TRIPLE + 26, TRIPLE + 38], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const t3 = interpolate(frame, [TRIPLE + 66, TRIPLE + 80], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="PROOF // REAL AUDIENCE" />

      <div style={{ position: 'absolute', top: 196, left: 120, ...rise(10, 22) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 78, color: DL.text }}>
          One Dan is <span style={{ fontStyle: 'italic', color: DL.gold }}>proud of.</span>
        </span>
      </div>

      {/* channel card */}
      <div style={{ position: 'absolute', top: 380, left: 320, right: 320, opacity: cardOp, transform: `translateY(${cardY}px)` }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 18, padding: '52px 64px', display: 'flex', alignItems: 'center', gap: 54 }}>
          {/* play button */}
          <div style={{ width: 150, height: 106, borderRadius: 26, background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 60px #ff000033` }}>
            <Play size={52} color="#fff" fill="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 66, color: DL.text }}>WorldCup</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 12 }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 72, color: DL.gold, fontVariantNumeric: 'tabular-nums' }}>
                {subs.toLocaleString('en-US')}
              </span>
              <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.dim }}>SUBSCRIBERS</span>
            </div>
            <div style={{ marginTop: 18, height: 6, borderRadius: 999, background: '#ffffff10', overflow: 'hidden', width: 560 }}>
              <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${sweep})`, transformOrigin: 'left' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '12px 26px' }}>
              <Bell size={22} color={DL.warm} /><span style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.warm }}>SUBSCRIBED</span>
            </div>
            <ThumbsUp size={26} color={DL.faint} />
          </div>
        </div>
      </div>

      {/* closing triple */}
      <div style={{ position: 'absolute', bottom: 110, left: 120, right: 120, display: 'flex', justifyContent: 'center', gap: 60, fontFamily: DL_SERIF, fontSize: 46 }}>
        <span style={{ opacity: t1, color: DL.text }}>Real audience.</span>
        <span style={{ opacity: t2, color: DL.text }}>Real growth.</span>
        <span style={{ opacity: t3, fontStyle: 'italic', color: DL.red }}>Shipped by agents.</span>
      </div>
    </AbsoluteFill>
  );
};
export default DlWorldCup;
