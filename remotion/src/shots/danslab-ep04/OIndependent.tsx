import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { Zap } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, OpenClawLogo } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 14 — orchestration isn't intelligence. OpenClaw agents: brilliant,
// stubborn, independent — like herding lightning. VO 0.8s (24.5s).
export const compositionConfig = { id: 'OIndependent', durationInSeconds: 27, fps: 30, width: 1920, height: 1080 };

const OIndependent: React.FC = () => {
  const frame = useCurrentFrame();
  const bolts = [[-380, -20], [360, 40], [-260, 190], [300, 200]];
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="04" label="THE BRAIN // ORCHESTRATION ≠ INTELLIGENCE" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130, zIndex: 3 }}>
        <Headline at={20} size={52}>Paperclip could assign the work.</Headline>
        <div style={{ marginTop: 8 }}><Headline at={56} size={44} italic color={DL.warm}>What it couldn&rsquo;t do was <span style={{ color: DL.red }}>understand the workers.</span></Headline></div>
      </div>

      {/* OpenClaw mascot center + electric independence bolts */}
      <div style={{ position: 'absolute', top: 540, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <OpenClawLogo src={staticFile('projects/danslab-ep04/openclaw-mascot.png')} size={190} start={130} wordmark={false} />
        {bolts.map(([x, y], i) => {
          const op = interpolate(frame, [200 + i * 10, 216 + i * 10], [0, 1], DCLAMP);
          const flick = Math.abs(Math.sin((frame + i * 20) / 5));
          return <div key={i} style={{ position: 'absolute', left: x, top: y, opacity: op * (0.4 + 0.6 * flick) }}><Zap size={54} color={DL.gold} fill={DL.gold} /></div>;
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', zIndex: 3, opacity: interpolate(frame, [430, 452], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>Brilliant, stubborn, independent — controlling them felt like </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.gold }}>herding lightning.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OIndependent;
