import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';
import { NetworkFuel } from '../../lib/ep06kit';

// Ep06 15 — the ecosystem catches fire — a loop that feeds itself. VO 0.8s (18.4s).
export const compositionConfig = { id: 'MFuel', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const MFuel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="06" label="THE ECOSYSTEM // IT FUELS ITSELF" />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={50}>And that is how an ecosystem <span style={{ color: DL.gold }}>catches fire.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 280, left: '50%', transform: 'translateX(-50%)' }}>
        <NetworkFuel at={70} w={1400} h={520} />
      </div>

      {/* the loop */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 24, opacity: interpolate(frame, [200, 224], [0, 1], DCLAMP) }} className="mono">
        {['more agents', 'more skills', 'more work', 'more agents'].map((s, i) => (
          <React.Fragment key={i}>
            <span style={{ fontFamily: DL_MONO, fontSize: 26, color: i === 3 ? DL.gold : DL.dim }}>{s}</span>
            {i < 3 && <span style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.faint }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [300, 324], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>A loop that feeds itself — faster and faster — until the marketplace is fueled by a whole world of agents.</span>
      </div>
    </AbsoluteFill>
  );
};
export default MFuel;
