import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { ClipboardCheck } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Avatar } from '../../lib/danslab';

// =============================================================================
// Ep02 the genius. VO 0.8s (14.1s): "This is where Dan turned out to be a bit of
// a genius. He built a rule. Every day, each droplet has to audit the other
// three, and give them a score. Those scores become points. And the points go
// on a leaderboard." Four droplets in a ring, audit arrows cross between them.
// =============================================================================
export const compositionConfig = { id: 'E2Scoring', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const NODES = [
  { avatar: 'dexter.jpg', name: 'Dexter', angle: -90 },
  { avatar: 'sienna.jpg', name: 'Sienna', angle: 0 },
  { avatar: 'memo.jpg', name: 'Memo', angle: 90 },
  { avatar: 'nano.png', name: 'Nano', angle: 180 },
];
const CX = 960, CY = 560, R = 200;
const AUDIT = 200;
const POINTS = 400;

const E2Scoring: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const auditOp = interpolate(frame, [AUDIT, AUDIT + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const cross = interpolate(frame, [AUDIT, AUDIT + 40], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const ptsOp = interpolate(frame, [POINTS, POINTS + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="05" label="THE GENIUS // DAILY SCORING" />

      <div style={{ position: 'absolute', top: 176, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 64, color: DL.text }}>
          Each droplet <span style={{ fontStyle: 'italic', color: DL.red }}>audits the other three.</span>
        </span>
      </div>

      {/* audit cross-lines (SVG) */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: auditOp }}>
        {NODES.map((a, i) => NODES.map((b, j) => {
          if (i >= j) return null;
          const ax = CX + Math.cos(a.angle * Math.PI / 180) * R * 1.7;
          const ay = CY + Math.sin(a.angle * Math.PI / 180) * R;
          const bx = CX + Math.cos(b.angle * Math.PI / 180) * R * 1.7;
          const by = CY + Math.sin(b.angle * Math.PI / 180) * R;
          const mx = ax + (bx - ax) * cross;
          const my = ay + (by - ay) * cross;
          return <line key={`${i}-${j}`} x1={ax} y1={ay} x2={mx} y2={my} stroke={DL.red} strokeWidth={2} strokeOpacity={0.4} strokeDasharray="6 8" />;
        }))}
      </svg>

      {/* nodes */}
      {NODES.map((n) => {
        const x = CX + Math.cos(n.angle * Math.PI / 180) * R * 1.7;
        const y = CY + Math.sin(n.angle * Math.PI / 180) * R;
        return (
          <div key={n.name} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Avatar src={staticFile(`projects/danslab-ep02/${n.avatar}`)} size={104} color={DL.red} />
            <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.text }}>{n.name}</span>
          </div>
        );
      })}

      {/* center: score → points */}
      <div style={{ position: 'absolute', left: CX, top: CY, transform: 'translate(-50%,-50%)', opacity: ptsOp, textAlign: 'center' }}>
        <ClipboardCheck size={44} color={DL.gold} />
        <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.gold, marginTop: 6 }}>SCORE → POINTS</div>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: ptsOp }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>Every score becomes a point — and every point goes on <span style={{ color: DL.text }}>the leaderboard.</span></span>
      </div>
    </AbsoluteFill>
  );
};
export default E2Scoring;
