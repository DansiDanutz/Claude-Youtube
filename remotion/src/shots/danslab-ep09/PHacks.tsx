import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 13 — the hacks, replayed as a poker read. VO 0.8s (26.2s).
export const compositionConfig = { id: 'PHacks', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const PHacks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="THE SCHOOLS // TWO FUNERALS" />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>Two machines. Two days. <span style={{ color: DL.red }}>Two funerals.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 90 }}>
        {[['nano.png', 'Nano', 'hacked by morning · day one', 90], ['memo.jpg', 'Memo', 'hacked again · day two', 170]].map(([img, name, sub, at]) => (
          <div key={String(name)} style={{ opacity: interpolate(frame, [Number(at), Number(at) + 20], [0, 1], DCLAMP), textAlign: 'center', position: 'relative' }}>
            <div style={{ filter: 'grayscale(0.9) brightness(0.7)' }}>
              <Avatar src={staticFile(`projects/danslab-ep09/${img}`)} size={200} color={DL.red} />
            </div>
            <div style={{ position: 'absolute', top: 66, left: 0, right: 0, fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.red, opacity: interpolate(frame, [Number(at) + 26, Number(at) + 38], [0, 0.95], DCLAMP), textShadow: '0 4px 18px #000' }}>✕</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.text, marginTop: 12 }}>{name}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 21, color: DL.faint }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.warm, opacity: interpolate(frame, [330, 358], [0, 1], DCLAMP) }}>Watch the player, not the loss.</div>
        <div style={{ marginTop: 12, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.gold, opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>He does not quit. He does not tilt. He changes his play.</div>
      </div>
    </AbsoluteFill>
  );
};
export default PHacks;
