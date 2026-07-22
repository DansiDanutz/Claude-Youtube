import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 20 — chaos gone. Paperclip watches, Hermes thinks, the fleet runs like a
// Swiss clock. VO 0.8s (16.2s).
export const compositionConfig = { id: 'OClock', durationInSeconds: 18, fps: 30, width: 1920, height: 1080 };

// meshing gears
const Gear: React.FC<{ cx: number; cy: number; r: number; teeth: number; color: string; dir: number; speed: number }> = ({ cx, cy, r, teeth, color, dir, speed }) => {
  const frame = useCurrentFrame();
  const rot = dir * frame * speed;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = ((i + 0.5) / teeth) * Math.PI * 2;
    pts.push(`${cx + Math.cos(a0) * r},${cy + Math.sin(a0) * r}`);
    pts.push(`${cx + Math.cos(a0 + 0.12) * (r + 12)},${cy + Math.sin(a0 + 0.12) * (r + 12)}`);
    pts.push(`${cx + Math.cos(a1 - 0.12) * (r + 12)},${cy + Math.sin(a1 - 0.12) * (r + 12)}`);
    pts.push(`${cx + Math.cos(a1) * r},${cy + Math.sin(a1) * r}`);
  }
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <polygon points={pts.join(' ')} fill="none" stroke={color} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r * 0.38} fill="none" stroke={color} strokeWidth={3} />
    </g>
  );
};

const OClock: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [40, 70], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="04" label="THE RESULT // LIKE A SWISS CLOCK" />

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={20} size={54}>Paperclip watches. Hermes thinks.</Headline>
        <div style={{ marginTop: 10 }}><Headline at={56} size={58} italic color={DL.gold}>And the fleet runs like a Swiss clock.</Headline></div>
      </div>

      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: op }}>
        <svg width={620} height={340} viewBox="0 0 620 340">
          <Gear cx={230} cy={170} r={90} teeth={14} color={DL.gold} dir={1} speed={0.8} />
          <Gear cx={392} cy={140} r={62} teeth={10} color={DL.sky} dir={-1} speed={1.15} />
          <Gear cx={420} cy={250} r={48} teeth={8} color={DL.green} dir={1} speed={1.5} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [230, 252], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>The runaway machines now move together — in time, on purpose.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OClock;
