import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, HermesLogo, Avatar, OpenClawLogo } from '../../lib/danslab';

// =============================================================================
// Origin 5/14 — Hermes & David. VO 0.8s (23.6s): "Two agents matter more than
// all the others. Hermes is the brain... David is the orchestrator... Hermes
// thinks. David conducts. The fleet executes." Panels ~f120/f320; triple ~f560.
// =============================================================================
export const compositionConfig = { id: 'DoBrain', durationInSeconds: 25.2, fps: 30, width: 1920, height: 1080 };

const HERMES = 115, DAVID = 330, TRIPLE = 560;

const DoBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const panel = (at: number) => ({
    opacity: interpolate(frame, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [at, at + 16], [34, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const t = (at: number) => interpolate(frame, [at, at + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const clawOp = interpolate(frame, [DAVID + 110, DAVID + 128], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="04" label="THE CORE // HERMES + DAVID" />

      <div style={{ position: 'absolute', top: 200, left: 120, right: 120, display: 'flex', gap: 40 }}>
        {/* Hermes */}
        <div style={{ ...panel(HERMES), flex: 1, background: DL.panel2, border: `1px solid ${DL.gold}55`, borderRadius: 18, padding: '40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <HermesLogo size={104} start={HERMES + 6} />
            <div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 58, color: DL.text }}>Hermes</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.gold }}>THE BRAIN</div>
            </div>
          </div>
          <div style={{ fontSize: 31, lineHeight: 1.55, color: DL.dim, marginTop: 26 }}>
            The strategist. Lives on the Mac Studio. Decides what the fleet should care about — before anyone asks.
          </div>
        </div>
        {/* David */}
        <div style={{ ...panel(DAVID), flex: 1, background: DL.panel2, border: `1px solid ${DL.red}55`, borderRadius: 18, padding: '40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <Avatar src={staticFile('projects/danslab-origin/david.jpg')} size={104} color={DL.red} />
            <div>
              <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 58, color: DL.text }}>David</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 3, color: DL.red }}>THE ORCHESTRATOR</div>
            </div>
          </div>
          <div style={{ fontSize: 31, lineHeight: 1.55, color: DL.dim, marginTop: 26 }}>
            Dan&rsquo;s digital twin inside <span style={{ color: DL.red, fontFamily: DL_MONO }}>OPENCLAW</span> — the system that connects every agent, every model, every machine.
          </div>
        </div>
      </div>

      {/* openclaw logo strip */}
      <div style={{ position: 'absolute', top: 660, left: 120, right: 120, opacity: clawOp, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <OpenClawLogo src={staticFile('projects/danslab-origin/openclaw-mascot.png')} size={130} start={DAVID + 110} wordmark={false} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, letterSpacing: 2 }}><span style={{ color: DL.text }}>OPEN</span><span style={{ color: DL.red }}>CLAW</span></span>
          <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.faint }}>CLAUDE · QWEN · ZAI · GEMINI · 5 DROPLETS · 1 MAC STUDIO</span>
        </div>
      </div>

      {/* the triple */}
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 54, fontFamily: DL_SERIF, fontSize: 52 }}>
        <span style={{ opacity: t(TRIPLE), color: DL.gold }}>Hermes thinks.</span>
        <span style={{ opacity: t(TRIPLE + 32), color: DL.red }}>David conducts.</span>
        <span style={{ opacity: t(TRIPLE + 70), fontStyle: 'italic', color: DL.text }}>The fleet executes.</span>
      </div>
    </AbsoluteFill>
  );
};
export default DoBrain;
