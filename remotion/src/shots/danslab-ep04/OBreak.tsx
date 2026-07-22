import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep04 6 — the trap: OpenClaw updates daily → dashboard breaks daily. Rebuild.
// Break. Wasted hours + burned tokens. VO 0.8s (23.6s).
export const compositionConfig = { id: 'OBreak', durationInSeconds: 26, fps: 30, width: 1920, height: 1080 };

// rebuild → break loop, 4 days
const DAYS = [130, 210, 290, 370];

const OBreak: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="04" label="THE TRAP // IT BREAKS EVERY DAY" />

      <div style={{ position: 'absolute', top: 170, left: 130, right: 130 }}>
        <Headline at={20} size={52}>OpenClaw updates itself — <span style={{ color: DL.gold }}>every single day.</span></Headline>
        <div style={{ marginTop: 8 }}><Headline at={56} size={44} italic color={DL.warm}>And every morning, yesterday&rsquo;s dashboard is broken.</Headline></div>
      </div>

      {/* rebuild → break tiles */}
      <div style={{ position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 30 }}>
        {DAYS.map((at, i) => {
          const op = interpolate(frame, [at, at + 12], [0, 1], DCLAMP);
          const broke = interpolate(frame, [at + 26, at + 40], [0, 1], DCLAMP);
          const shake = broke > 0.1 ? Math.sin(frame / 2) * 3 * broke : 0;
          return (
            <div key={i} style={{ opacity: op, transform: `translateX(${shake}px)`, width: 300, height: 200, borderRadius: 16, border: `2px solid ${broke > 0.5 ? DL.red : DL.border}`, background: DL.panel, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.faint, position: 'absolute', top: 14, left: 16 }}>DAY {i + 1}</div>
              {broke > 0.5 ? <>
                <AlertTriangle size={54} color={DL.red} />
                <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.red }}>BROKEN</span>
                {/* crack lines */}
                <svg style={{ position: 'absolute', inset: 0, opacity: broke }} viewBox="0 0 300 200"><polyline points="150,0 130,90 170,110 140,200" fill="none" stroke={`${DL.red}88`} strokeWidth={2} /><polyline points="60,0 110,80 90,200" fill="none" stroke={`${DL.red}55`} strokeWidth={1.5} /></svg>
              </> : <>
                <RefreshCw size={48} color={DL.sky} style={{ transform: `rotate(${frame * 6}deg)` }} />
                <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.sky }}>rebuilt</span>
              </>}
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: interpolate(frame, [470, 492], [0, 1], DCLAMP) }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm }}>A treadmill of wasted hours and burned tokens — </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.red }}>going nowhere.</span>
      </div>
    </AbsoluteFill>
  );
};
export default OBreak;
