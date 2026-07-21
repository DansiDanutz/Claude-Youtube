import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 2/10 — meet Dan. VO 0.8s: "Meet Dan. An entrepreneur who decided
// that one person, with the right system, can run like a whole company. He
// doesn't manage employees. He orchestrates agents, and they work around the
// clock." The employees→agents swap lands ~f215 ("doesn't manage employees"
// ~6.4s, "orchestrates agents" ~8.2s).
// =============================================================================
export const compositionConfig = { id: 'DlDan', durationInSeconds: 13.2, fps: 30, width: 1920, height: 1080 };

const STRIKE = 200; // "he doesn't manage employees"
const AGENTS = 252; // "he orchestrates agents"

const DlDan: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const strike = interpolate(frame, [STRIKE, STRIKE + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const agentsIn = interpolate(frame, [AGENTS, AGENTS + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const clock = interpolate(frame, [AGENTS + 40, AGENTS + 56], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="02" label="THE HUMAN // ONE BOSS" />

      {/* left: dropcap monogram panel, like the site's serif D */}
      <div style={{ position: 'absolute', top: 260, left: 150, width: 420, height: 500, border: `1px solid ${DL.border}`, background: DL.panel, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, ...rise(10, 24) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 300, lineHeight: 1, color: DL.red }}>D</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 23, letterSpacing: 5, color: DL.warm }}>DAN · FOUNDER</span>
        <span style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.faint, marginTop: 6 }}>CLUJ-NAPOCA</span>
      </div>

      {/* right: the statement */}
      <div style={{ position: 'absolute', top: 280, left: 680, right: 130 }}>
        <div style={{ ...rise(22, 24), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 92, color: DL.text, lineHeight: 1.1 }}>
          Meet <span style={{ fontStyle: 'italic', color: DL.gold }}>Dan.</span>
        </div>
        <div style={{ ...rise(64, 22), fontSize: 40, lineHeight: 1.5, color: DL.dim, marginTop: 34, maxWidth: 1020 }}>
          One person, with the right system, can run like a whole company.
        </div>

        <div style={{ marginTop: 56, fontSize: 46, lineHeight: 1.5, color: DL.text, opacity: interpolate(frame, [STRIKE - 14, STRIKE], [0, 1], { ...DCLAMP, easing: DL_EASE.out }) }}>
          He doesn&rsquo;t manage{' '}
          <span style={{ position: 'relative', display: 'inline-block', color: DL.muted }}>
            employees
            <span style={{ position: 'absolute', left: 0, right: 0, top: '54%', height: 5, background: DL.red, transform: `scaleX(${strike})`, transformOrigin: 'left' }} />
          </span>
        </div>
        <div style={{ marginTop: 18, fontSize: 46, lineHeight: 1.5, color: DL.text, opacity: agentsIn }}>
          He orchestrates <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', color: DL.red, fontSize: 52 }}>agents.</span>
        </div>

        <div style={{ marginTop: 52, display: 'flex', alignItems: 'center', gap: 16, opacity: clock }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.green }} />
          <span style={{ fontFamily: DL_MONO, fontSize: 25, letterSpacing: 3, color: DL.warm }}>AROUND THE CLOCK · NO SLEEP REQUIRED</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DlDan;
