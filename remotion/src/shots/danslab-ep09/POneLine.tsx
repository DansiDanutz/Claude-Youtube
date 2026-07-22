import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Phone } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep09 23 — the one-line DM. VO 0.8s (22.7s).
export const compositionConfig = { id: 'POneLine', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };

const POneLine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="09" label="THE METHOD // ONE LINE" />

      <div style={{ position: 'absolute', top: 190, left: 120, width: 880 }}>
        <Headline at={16} size={48}>The standup, the sprint, and the kickoff — <span style={{ color: DL.sky }}>in nine words.</span></Headline>
        <div style={{ marginTop: 34, fontFamily: DL_SANS, fontSize: 30, color: DL.dim, opacity: interpolate(frame, [200, 226], [0, 1], DCLAMP) }}>
          The thirty other agents never even see the message.
        </div>
        <div style={{ marginTop: 40, opacity: interpolate(frame, [560, 590], [0, 1], DCLAMP) }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>By lunch, Dexter pings back: </span>
          <span style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.green, fontWeight: 700 }}>shipped.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 110, right: 200 }}>
        <Phone h={820} start={60} statusTime="9:12" tilt={-4}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 62, paddingLeft: 14, paddingRight: 14, height: '100%', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 16, color: '#8b8b8b', textAlign: 'center', marginBottom: 14 }}>Dexter · DansLab</div>
            <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: '#2b5278', borderRadius: 14, padding: '12px 15px', marginBottom: 10, opacity: interpolate(frame, [130, 146], [0, 1], DCLAMP) }}>
              <div style={{ fontFamily: DL_SANS, fontSize: 19, color: '#f2f2f2' }}>ship captions v2 on YouTube Studio</div>
            </div>
            <div style={{ alignSelf: 'flex-start', maxWidth: '70%', background: '#1b1b1b', borderRadius: 14, padding: '12px 15px', opacity: interpolate(frame, [620, 640], [0, 1], DCLAMP) }}>
              <div style={{ fontFamily: DL_SANS, fontSize: 19, color: '#7ee2a8', fontWeight: 600 }}>shipped ✓</div>
            </div>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
export default POneLine;
