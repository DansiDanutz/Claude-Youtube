import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { FilmStrip } from '../../lib/ep07kit';
import { PresenterFrom } from '../../lib/presenter';

// Ep09 1 — the hook: every machine has a name... except one character.
// VO 0.8s (32.1s).
export const compositionConfig = { id: 'PHook', durationInSeconds: 42, fps: 30, width: 1920, height: 1080 };

const A = ['ep01a', 'ep02a', 'ep03a', 'ep04a', 'ep05a', 'ep06a'].map((n) => staticFile(`projects/danslab-ep07/${n}.png`));
const B = ['ep08a', 'ep07a', 'ep08b', 'ep07b'].map((n) => staticFile(`projects/danslab-ep09/${n}.png`));

const PHook: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [520, 570], [1, 0.24], DCLAMP);
  const chairOp = interpolate(frame, [560, 600], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="09" label="FINALE // THE LAST CHAIR" />

      <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
        <Headline at={20} size={48}>Every machine in this story has a name, a job, and a face.</Headline>
      </div>

      <div style={{ opacity: dim }}>
        <div style={{ position: 'absolute', top: 320, left: 0, right: 0 }}>
          <FilmStrip items={A} at={60} h={210} speed={0.9} />
        </div>
        <div style={{ position: 'absolute', top: 560, left: 0, right: 0 }}>
          <FilmStrip items={B} at={90} h={210} speed={-0.7} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 420, left: 0, right: 0, textAlign: 'center', zIndex: 4, opacity: chairOp }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.warm }}>Every machine... except one character.</div>
        <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontSize: 46, color: DL.text }}>
          The one who hired them all.
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', zIndex: 4, opacity: interpolate(frame, [1030, 1060], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.gold }}>Tonight, the last chair turns around.</span>
      </div>

      <PresenterFrom id="dan-open" at={600} side="right" h={620} inset={80} />
    </AbsoluteFill>
  );
};
export default PHook;
