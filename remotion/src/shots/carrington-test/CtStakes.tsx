import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Zap, Flame, BookOpen } from 'lucide-react';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { CLAMP } from '../../lib/kit';
import { NightBg, AuroraCurtains, NightTag, FootageCard } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 3/7 — the stakes (inside the first 30s). The network rebels.
// Facts: RESEARCH.md #3 (currents strengthened, weakened, reversed),
// #7 (sparks, fires, one operator stunned), #8 (print readable ~1 a.m. Boston).
// Direct-address beat per STORY.md beat 6.
// =============================================================================
export const compositionConfig = { id: 'CtStakes', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const C1 = 40;
const C2 = 110;
const C3 = 180;
const ASK = 300; // direct address ~0:35 global

const FACTS = [
  { icon: Zap, at: C1, color: COLORS.warn, text: 'Currents strengthened, weakened, then reversed without warning.' },
  { icon: Flame, at: C2, color: COLORS.danger, text: 'Sparks jumped. Paper smoldered. One operator was stunned.' },
  { icon: BookOpen, at: C3, color: COLORS.signalAlt, text: 'Over Boston, the aurora was bright enough to read print at 1 a.m.' },
];

const CtStakes: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const askSweep = interpolate(frame, [ASK + 20, ASK + 34], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const fadeOut = interpolate(frame, [462, 480], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      <NightBg intensity={1.25} />
      <AuroraCurtains strength={1} />
      <NightTag text="THE NETWORK REBELS" color={COLORS.danger} />

      {/* the relay sparking — footage made for this scene */}
      <div style={{ position: 'absolute', left: 130, top: 330 }}>
        <FootageCard src="projects/carrington-test/scene-relay.mp4" caption="INDUCED CURRENT, ARRIVING" start={14} w={540} accent={COLORS.danger} durFrames={480 - 14} />
      </div>

      <div style={{ position: 'absolute', left: 740, right: 130, top: 200, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {FACTS.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} style={{ ...rise(f.at), display: 'flex', alignItems: 'flex-start', gap: 26, background: `${COLORS.d800}dd`, border: `1px solid ${COLORS.d600}`, borderLeft: `6px solid ${f.color}`, borderRadius: 14, padding: '28px 34px' }}>
              <Icon size={44} color={f.color} strokeWidth={2} style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, lineHeight: 1.4, color: COLORS.d300 }}>{f.text}</span>
            </div>
          );
        })}

        {/* direct address */}
        <div style={{ ...rise(ASK), marginTop: 16, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 58, letterSpacing: -1, lineHeight: 1.22, color: COLORS.paper }}>
          The wire is live.{' '}
          <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 4, height: 18, background: `${COLORS.danger}66`, transform: `scaleX(${askSweep})`, transformOrigin: 'left', borderRadius: 4 }} />
            <span style={{ position: 'relative' }}>What would <span style={{ color: COLORS.danger }}>YOU</span> touch next?</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default CtStakes;
