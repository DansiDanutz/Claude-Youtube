import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { ImageCard } from '../../lib/ep07kit';

// Ep07 12 — the catalog. Six real episode frames dealt out like cards, in two
// rows, each with its printed NAME. VO 0.8s (2.1s) — this is a long visual beat.
export const compositionConfig = { id: 'FCatalog', durationInSeconds: 24, fps: 30, width: 1920, height: 1080 };

const ROW1: [string, string, string][] = [
  ['ep01a', 'NO. 01', 'The Origin'],
  ['ep02a', 'NO. 02', 'The Survivors'],
  ['ep03a', 'NO. 03', 'The Trader'],
];
const ROW2: [string, string, string][] = [
  ['ep04a', 'NO. 04', 'The Overseer'],
  ['ep05b', 'NO. 05', 'The Brain'],
  ['ep06a', 'NO. 06', 'The Marketplace'],
];

const Row: React.FC<{ items: [string, string, string][]; at: number }> = ({ items, at }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 34 }}>
      {items.map(([img, no, name], i) => {
        const a = at + i * 18;
        const labelOp = interpolate(frame, [a + 22, a + 40], [0, 1], DCLAMP);
        return (
          <div key={img} style={{ textAlign: 'center' }}>
            <ImageCard src={staticFile(`projects/danslab-ep07/${img}.png`)} at={a} w={480} rot={(i - 1) * 1.8} />
            <div style={{ opacity: labelOp, marginTop: 14 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 18, letterSpacing: 5, color: DL.red }}>{no}</div>
              <div style={{ fontFamily: DL_SERIF, fontSize: 36, color: DL.text, marginTop: 4 }}>{name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FCatalog: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="07" label="THE OUTPUT // THE CATALOG" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={10} size={50}>And this is what came off that line.</Headline>
      </div>

      <div style={{ position: 'absolute', top: 250, left: 0, right: 0 }}>
        <Row items={ROW1} at={60} />
      </div>
      <div style={{ position: 'absolute', top: 640, left: 0, right: 0 }}>
        <Row items={ROW2} at={150} />
      </div>

      <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [420, 448], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.warm }}>Numbered for order. </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 38, color: DL.gold }}>Named so any one of them stands alone.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FCatalog;
