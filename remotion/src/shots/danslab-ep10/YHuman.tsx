import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch6 · the human part. VO audit12 36.2. Every real company has faults — someone
// has to catch, own and repair them. The 90/10 split lands on Brian's words:
// machines ~14s, "that was Dan. A human." ~22s, the closing thesis ~27s.
export const compositionConfig = { id: 'YHuman', durationInSeconds: 39, fps: 30, width: 1920, height: 1080 };

const YHuman: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = (at: number, d = 16) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  // the split bar: machines fill on "ninety percent" (~14.5s), Dan's slice slams
  // in on "that was Dan" (~22s)
  const mach = interpolate(f, [440, 490], [0, 0.9], { ...DCLAMP, easing: DL_EASE.inOut });
  const danS = spring({ frame: f - 660, fps, config: { damping: 15, mass: 0.6 } });
  const danOn = f >= 660 ? 1 : 0;
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="10" label="THE PAYROLL // THE HUMAN PART" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={10} size={50}>Who runs a company with <span style={{ color: DL.red }}>zero faults?</span></Headline>
        <div style={{ ...rise(150), fontFamily: DL_SANS, fontSize: 30, color: DL.dim, marginTop: 24, lineHeight: 1.5, maxWidth: 1340 }}>
          Nobody. Every real company breaks things — and someone has to
          <span style={{ color: DL.text, fontWeight: 600 }}> catch them, own them, and repair them.</span>
        </div>
      </div>
      {/* the 90/10 bar */}
      <div style={{ position: 'absolute', top: 480, left: 120, right: 120 }}>
        <div style={{ display: 'flex', height: 110, borderRadius: 16, overflow: 'hidden', border: `1px solid ${DL.border}` }}>
          <div style={{
            width: `${mach * 100}%`, background: 'rgba(212,160,23,0.22)', borderRight: `1px solid ${DL.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, minWidth: 0, overflow: 'hidden',
          }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: DL.gold, whiteSpace: 'nowrap' }}>90%</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.dim, whiteSpace: 'nowrap' }}>THE MACHINES</span>
          </div>
          <div style={{
            flex: 1, opacity: danOn, transform: `scale(${0.8 + 0.2 * danS})`,
            background: 'rgba(231,76,60,0.25)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 46, color: DL.red }}>10%</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.text }}>DAN</span>
          </div>
        </div>
        <div style={{
          ...rise(690), fontFamily: DL_SANS, fontSize: 27, color: DL.warm, marginTop: 22,
        }}>
          June 29 — reading the silence before any alarm said so. That was a human.
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 120, right: 120, ...rise(810) }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 50, color: DL.text, lineHeight: 1.35 }}>
          The <span style={{ color: DL.red }}>10%</span> a human still does is why the
          <span style={{ color: DL.gold }}> 90%</span> is worth anything.
          <span style={{ color: DL.muted, fontSize: 38 }}> Not automated. Not yet.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YHuman;
