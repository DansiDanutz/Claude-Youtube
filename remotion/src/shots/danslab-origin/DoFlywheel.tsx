import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { MonitorPlay, BookOpen, CreditCard, RefreshCw } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — the WorldCup flywheel. VO 0.8s (18.3s): "A video reveals a story.
// The story unlocks a card. The card lives in the app. The app sends fans back
// to the next video. Watch. Predict. Collect. Repeat." Four nodes on a wheel,
// arcs draw between them, then the four verbs land.
// =============================================================================
export const compositionConfig = { id: 'DoFlywheel', durationInSeconds: 20.4, fps: 30, width: 1920, height: 1080 };

const NODES = [
  { Icon: MonitorPlay, label: 'VIDEO', desc: 'reveals a story', angle: -90, at: 110 },
  { Icon: BookOpen, label: 'STORY', desc: 'unlocks a card', angle: 0, at: 170 },
  { Icon: CreditCard, label: 'CARD', desc: 'lives in the app', angle: 90, at: 235 },
  { Icon: RefreshCw, label: 'APP', desc: 'sends fans back', angle: 180, at: 300 },
];
const VERBS = [
  { word: 'Watch.', at: 400 }, { word: 'Predict.', at: 428 }, { word: 'Collect.', at: 456 }, { word: 'Repeat.', at: 484, hot: true },
];
const CX = 960, CY = 560, R = 240;

const DoFlywheel: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const ringOp = interpolate(frame, [96, 360], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const spin = interpolate(frame, [340, 612], [0, 46], { ...DCLAMP, easing: DL_EASE.inOut });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE LOOP // GROWTH ENGINE" />

      <div style={{ position: 'absolute', top: 186, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 70, color: DL.text }}>
          Not just a channel. <span style={{ fontStyle: 'italic', color: DL.gold }}>A loop.</span>
        </span>
      </div>

      {/* dashed ring */}
      <div style={{ position: 'absolute', left: CX - R - 60, top: CY - R - 60, width: (R + 60) * 2, height: (R + 60) * 2, borderRadius: '50%', border: `2px dashed ${DL.border}`, opacity: ringOp, transform: `rotate(${spin}deg)` }} />

      {/* nodes */}
      {NODES.map((n) => {
        const op = interpolate(frame, [n.at, n.at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
        const rad = (n.angle * Math.PI) / 180;
        const x = CX + Math.cos(rad) * R * 1.55;
        const y = CY + Math.sin(rad) * R * 0.78;
        return (
          <div key={n.label} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 92, height: 92, borderRadius: 24, background: DL.panel, border: `1px solid ${DL.gold}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <n.Icon size={40} color={DL.gold} strokeWidth={1.8} />
            </div>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.text }}>{n.label}</span>
            <span style={{ fontSize: 24, color: DL.muted }}>{n.desc}</span>
          </div>
        );
      })}

      {/* verbs */}
      <div style={{ position: 'absolute', bottom: 88, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44 }}>
        {VERBS.map((v) => {
          const op = interpolate(frame, [v.at, v.at + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          return <span key={v.word} style={{ opacity: op, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 54, color: v.hot ? DL.red : DL.text }}>{v.word}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};
export default DoFlywheel;
