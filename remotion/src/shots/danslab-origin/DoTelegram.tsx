import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Send, Check, CheckCheck } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// Origin — the escalation. VO 0.8s (20.8s): "...Three twelve A M. Sienna wants
// to double a position. Policy says: ask the human. One message lands on Dan's
// phone. He reads it over coffee. One tap. Approved. The fleet moves on.
// Judgment stays human. Everything else stays automatic." Chat plays out.
// =============================================================================
export const compositionConfig = { id: 'DoTelegram', durationInSeconds: 22.8, fps: 30, width: 1920, height: 1080 };

const MSG1 = 120;   // sienna asks
const MSG2 = 300;   // dan taps approve
const DONE = 372;   // "fleet moves on"
const CLOSE = 480;  // judgment/automatic

const DoTelegram: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const b = (at: number) => ({
    opacity: interpolate(frame, [at, at + 14], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [at, at + 14], [22, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const c1 = interpolate(frame, [CLOSE, CLOSE + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const c2 = interpolate(frame, [CLOSE + 40, CLOSE + 54], [0, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="ESCALATION // 03:12 AM" />

      <div style={{ position: 'absolute', top: 192, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          The system <span style={{ fontStyle: 'italic', color: DL.sky }}>doesn&rsquo;t guess.</span>
        </span>
      </div>

      {/* phone chat panel */}
      <div style={{ position: 'absolute', top: 330, left: 480, width: 960 }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 28px', borderBottom: `1px solid ${DL.border}` }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: DL.sky, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={22} color="#04222e" />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, color: DL.text }}>DansLab Fleet</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 18, color: DL.green }}>online</div>
            </div>
            <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 20, color: DL.faint }}>03:12</span>
          </div>
          <div style={{ padding: '28px 30px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* incoming */}
            <div style={{ ...b(MSG1), alignSelf: 'flex-start', maxWidth: 700, background: DL.panel2, border: `1px solid ${DL.border}`, borderRadius: '4px 16px 16px 16px', padding: '18px 24px' }}>
              <div style={{ fontFamily: DL_MONO, fontSize: 19, color: DL.gold, marginBottom: 8 }}>SIENNA · crypto specialist</div>
              <div style={{ fontSize: 26, color: DL.text, lineHeight: 1.45 }}>Signal confirmed on BTC. Requesting approval to double the position. Policy: human sign-off required.</div>
            </div>
            {/* outgoing */}
            <div style={{ ...b(MSG2), alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 14, background: `${DL.sky}1c`, border: `1px solid ${DL.sky}55`, borderRadius: '16px 4px 16px 16px', padding: '16px 26px' }}>
              <Check size={26} color={DL.green} strokeWidth={3} />
              <span style={{ fontSize: 27, fontWeight: 600, color: DL.text }}>Approved.</span>
              <CheckCheck size={22} color={DL.sky} />
            </div>
            {/* system line */}
            <div style={{ ...b(DONE), alignSelf: 'center', fontFamily: DL_MONO, fontSize: 20, color: DL.muted }}>
              ▸ fleet resumed · position updated · logged
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 92, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50, fontFamily: DL_SERIF, fontSize: 46 }}>
        <span style={{ opacity: c1, color: DL.text }}>Judgment stays <span style={{ color: DL.sky }}>human.</span></span>
        <span style={{ opacity: c2, fontStyle: 'italic', color: DL.warm }}>Everything else stays automatic.</span>
      </div>
    </AbsoluteFill>
  );
};
export default DoTelegram;
