import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { X, Check } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Avatar } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 13 — it fails on purpose, in simulation, so the fleet doesn't fail for
// real. VO 0.8s (17.3s).
export const compositionConfig = { id: 'NOptions', durationInSeconds: 20, fps: 30, width: 1920, height: 1080 };

const NOptions: React.FC = () => {
  const frame = useCurrentFrame();
  const failOp = interpolate(frame, [180, 200], [0, 1], DCLAMP);
  const rerouteOp = interpolate(frame, [320, 344], [0, 1], DCLAMP);
  const okOp = interpolate(frame, [380, 404], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="HOW IT THINKS // FAILS ON PURPOSE" />

      <div style={{ position: 'absolute', top: 150, left: 130, right: 130, textAlign: 'center' }}>
        <Headline at={16} size={48}>It will imagine a job going wrong — <span style={{ color: DL.sky }}>then quietly change its mind.</span></Headline>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        {/* try A → fail */}
        <div style={{ opacity: interpolate(frame, [110, 130], [0, 1], DCLAMP), textAlign: 'center', position: 'relative' }}>
          <Avatar src={staticFile('projects/danslab-ep05/nano.png')} size={150} color={failOp > 0.5 ? DL.red : DL.faint} />
          <div style={{ position: 'absolute', top: -8, right: -8, opacity: failOp }}><div style={{ background: DL.bg, border: `2px solid ${DL.red}`, borderRadius: 999, padding: 6 }}><X size={26} color={DL.red} /></div></div>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, color: failOp > 0.5 ? DL.red : DL.faint, marginTop: 14 }}>simulated · would fail</div>
        </div>

        <div style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.faint, opacity: rerouteOp }}>→</div>

        {/* reroute to B → ok */}
        <div style={{ opacity: rerouteOp, textAlign: 'center', position: 'relative' }}>
          <Avatar src={staticFile('projects/danslab-ep05/memo.jpg')} size={150} color={okOp > 0.5 ? DL.green : DL.sky} />
          <div style={{ position: 'absolute', top: -8, right: -8, opacity: okOp }}><div style={{ background: DL.bg, border: `2px solid ${DL.green}`, borderRadius: 999, padding: 6 }}><Check size={26} color={DL.green} /></div></div>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, color: okOp > 0.5 ? DL.green : DL.sky, marginTop: 14 }}>chosen · will win</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [430, 452], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.warm }}>It fails on purpose, in simulation — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.text }}>so the fleet doesn&rsquo;t fail for real.</span>
      </div>
    </AbsoluteFill>
  );
};
export default NOptions;
