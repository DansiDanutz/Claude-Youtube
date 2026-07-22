import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Img, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 16 — the flywheel: factory → videos → audience → products → fleet → factory.
// VO 0.8s (15.9s).
export const compositionConfig = { id: 'FFlywheel', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

const R = 290;
const CX = 960;
const CY = 640;

const NODES: [string, string, string | null][] = [
  ['THE FACTORY', DL.gold, 'projects/danslab-ep07/repo.png'],
  ['THE VIDEOS', DL.red, 'projects/danslab-ep07/ep02a.png'],
  ['THE AUDIENCE', DL.sky, 'projects/danslab-ep07/danslab-hero.png'],
  ['NERVIX · ZMARTY', DL.green, 'projects/danslab-ep07/nervix-hero.png'],
  ['THE FLEET', DL.warm, 'projects/danslab-ep07/paperclip.png'],
];

const FFlywheel: React.FC = () => {
  const frame = useCurrentFrame();
  const n = NODES.length;
  const spin = interpolate(frame, [80, 480], [0, 1], DCLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE OUTPUT // THE FLYWHEEL" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>And that closes <span style={{ color: DL.gold }}>the loop.</span></Headline>
      </div>

      {/* ring */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={DL.border} strokeWidth={2} />
        <circle
          cx={CX} cy={CY} r={R} fill="none" stroke={DL.gold} strokeWidth={3}
          strokeDasharray={2 * Math.PI * R}
          strokeDashoffset={2 * Math.PI * R * (1 - spin)}
          transform={`rotate(-90 ${CX} ${CY})`}
          opacity={0.75}
        />
      </svg>

      {/* travelling spark */}
      {(() => {
        const a = -Math.PI / 2 + spin * Math.PI * 2;
        return (
          <div style={{ position: 'absolute', left: CX + Math.cos(a) * R - 9, top: CY + Math.sin(a) * R - 9, width: 18, height: 18, borderRadius: '50%', background: DL.gold, boxShadow: `0 0 26px ${DL.gold}`, opacity: interpolate(frame, [80, 100], [0, 1], DCLAMP) }} />
        );
      })()}

      {NODES.map(([label, color, img], i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const x = CX + Math.cos(a) * R;
        const y = CY + Math.sin(a) * R;
        const at = 90 + i * 22;
        const op = interpolate(frame, [at, at + 18], [0, 1], DCLAMP);
        const sc = interpolate(frame, [at, at + 22], [0.8, 1], { ...DCLAMP, easing: DL_EASE.out });
        return (
          <div key={label} style={{ position: 'absolute', left: x - 110, top: y - 88, width: 220, textAlign: 'center', opacity: op, transform: `scale(${sc})` }}>
            <div style={{ width: 128, height: 128, margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${color}`, background: DL.panel, boxShadow: `0 0 30px ${color}44` }}>
              {img && <Img src={staticFile(img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color }}>{label}</div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: CX - 220, top: CY - 46, width: 440, textAlign: 'center', opacity: interpolate(frame, [260, 288], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm, lineHeight: 1.3 }}>each turn<br />funds the next</div>
      </div>
    </AbsoluteFill>
  );
};
export default FFlywheel;
