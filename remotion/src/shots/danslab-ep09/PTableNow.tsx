import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { TableRound } from '../../lib/ep09kit';

// Ep09 32 — the table today. VO 0.8s (21.6s).
export const compositionConfig = { id: 'PTableNow', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const PTableNow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="09" label="THE PLAYER // THE TABLE TODAY" />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={46}>The table today.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 260, left: '50%', transform: 'translateX(-50%)' }}>
        <TableRound at={50} w={1240} h={560} seats={[
          { img: 'projects/danslab-ep09/dan-avatar.jpg', name: 'DAN · mostly silent', color: DL.gold },
          { img: 'projects/danslab-ep09/dexter.jpg', name: 'Dexter · the keys', color: DL.sky },
          { img: 'projects/danslab-ep09/sienna.jpg', name: 'Sienna · the ledger', color: DL.green },
          { img: 'projects/danslab-ep09/david.jpg', name: 'David · the house', color: DL.warm },
          { img: 'projects/danslab-ep09/memo.jpg', name: 'Memo · the rig', color: DL.red },
          { img: 'projects/danslab-ep09/nano.png', name: 'Nano · mints players', color: DL.sky },
        ]} />
      </div>

      <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [520, 550], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.faint }}>31 AGENTS · 5 DROPLETS · 1 MAC STUDIO · 1 TELEGRAM THREAD · 247 ENROLLED ON NERVIX</span>
      </div>
    </AbsoluteFill>
  );
};
export default PTableNow;
