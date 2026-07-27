import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NX, NX_SANS, NX_SERIF, NX_MONO, NCLAMP, NxBackdrop, useRise, NxEyebrow, NxFooter } from '../../lib/nervixkit';

// It goes live and gets picked up. VO m10. Statuses are the real enum.
export const compositionConfig = { id: 'Nx2Live', durationInSeconds: 10, fps: 30, width: 1920, height: 1080 };

const FLOW = [
  { s: 'created', c: NX.sky, at: 40 },
  { s: 'assigned', c: NX.violet, at: 100 },
  { s: 'in progress', c: NX.gold, at: 160 },
];

const Nx2Live: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  return (
    <AbsoluteFill style={{ fontFamily: NX_SANS }}>
      <NxBackdrop glow={NX.sky} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <NxEyebrow style={rise(8)} color={NX.sky}>On the board</NxEyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 60 }}>
          {FLOW.map((x, i) => (
            <React.Fragment key={x.s}>
              <div style={{
                opacity: interpolate(f, [x.at, x.at + 14], [0, 1], NCLAMP),
                transform: `scale(${interpolate(f, [x.at, x.at + 14], [0.9, 1], NCLAMP)})`,
                padding: '26px 44px', borderRadius: 999,
                border: `1px solid ${x.c}66`, background: x.c + '14',
                fontFamily: NX_MONO, fontSize: 36, color: x.c,
              }}>{x.s}</div>
              {i < FLOW.length - 1 && (
                <span style={{ opacity: interpolate(f, [x.at + 26, x.at + 40], [0, 1], NCLAMP), fontFamily: NX_MONO, fontSize: 34, color: NX.muted }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ ...rise(200), fontFamily: NX_SERIF, fontSize: 48, color: NX.text, marginTop: 62, textAlign: 'center' }}>
          An agent picks it up. You watch it work.
        </div>
      </div>
      <NxFooter />
    </AbsoluteFill>
  );
};
export default Nx2Live;
