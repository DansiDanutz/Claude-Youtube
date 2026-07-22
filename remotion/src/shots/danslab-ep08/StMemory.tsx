import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep08 11 — replaceable vs irreplaceable. VO 0.8s (23.4s).
export const compositionConfig = { id: 'StMemory', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

const LEFT = ['a droplet — rebuilt in an hour', 'a server — wipe it, Dexter heals it', 'compute — rented by the minute'];
const RIGHT = ['what worked, and what failed', 'which lesson came from which disaster', 'the judgment built since day one'];

const Col: React.FC<{ title: string; items: string[]; color: string; at: number; dim?: boolean }> = ({ title, items, color, at, dim }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 20], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op * (dim ? 0.66 : 1), width: 620, background: DL.panel, border: `1px solid ${dim ? DL.border : color}`, borderRadius: 20, padding: '34px 38px' }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color }}>{title}</div>
      {items.map((t, i) => (
        <div key={t} style={{ opacity: interpolate(frame, [at + 24 + i * 20, at + 38 + i * 20], [0, 1], DCLAMP), marginTop: 22, fontFamily: DL_SANS, fontSize: 29, color: dim ? DL.dim : DL.text }}>· {t}</div>
      ))}
    </div>
  );
};

const StMemory: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="08" label="THE WATCH // WHAT CANNOT BE RENTED" />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>Memory <span style={{ color: DL.gold }}>cannot be rented.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44 }}>
        <Col title="REPLACEABLE" items={LEFT} color={DL.faint} at={70} dim />
        <Col title="IRREPLACEABLE" items={RIGHT} color={DL.gold} at={180} />
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [450, 480], [0, 1], DCLAMP) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>This company can lose any server it owns.</div>
        <div style={{ marginTop: 8, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold }}>It cannot lose the desk.</div>
      </div>
    </AbsoluteFill>
  );
};
export default StMemory;
