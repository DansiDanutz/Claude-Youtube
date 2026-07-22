import React from 'react';
import { AbsoluteFill } from 'remotion';
import { DL, DL_SANS, DL_SERIF, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { PresenterFrom, PresenterTag } from '../../lib/presenter';

// Proof shot for the presenter layer: a cut-out clip standing inside a normal
// DansLab scene. If the background of the clip is visible as a grey box, the
// alpha channel was lost somewhere between cutout_video.py and OffthreadVideo.
export const compositionConfig = { id: 'PresenterTest', durationInSeconds: 6, fps: 30, width: 1920, height: 1080 };

const PresenterTest: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: DL_SANS }}>
    <SiteBg glow={DL.red} />
    <Kicker n="00" label="PIPELINE // PRESENTER LAYER" />

    <div style={{ position: 'absolute', top: 240, left: 120, width: 880 }}>
      <Headline at={6} size={54}>A human, standing <span style={{ color: DL.gold }}>inside the scene.</span></Headline>
      <div style={{ marginTop: 26, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 36, color: DL.warm, lineHeight: 1.4 }}>
        The narrator keeps the facts.<br />The presenter takes the camera.
      </div>
    </div>

    {/* renders once dan-open exists in the library; skips cleanly until then */}
    <PresenterFrom id="dan-open" at={10} side="right" h={880} inset={140} />
    <PresenterTag name="Dan Semenescu" role="DANSLAB · FOUNDER" at={40} side="right" inset={140} bottom={40} />
  </AbsoluteFill>
);
export default PresenterTest;
