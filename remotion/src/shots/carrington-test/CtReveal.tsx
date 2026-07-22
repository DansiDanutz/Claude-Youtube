import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { CLAMP } from '../../lib/kit';
import { MotionChar } from '../../lib/profilekit';
import { NightBg, AuroraCurtains, NightTag, PortraitCard } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 6/7 — the release. The storm disturbed Earth's magnetic field;
// the long grounded wire collected the induced current; the planet, not the
// batteries, drove the circuit. Loomis assembled the scattered reports.
// Facts: RESEARCH.md #3, #11, STORY.md beats 14-16. Zoe reacts at the payoff.
// =============================================================================
export const compositionConfig = { id: 'CtReveal', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const DIAG = 26;
const L1 = 50;
const L2 = 130;
const BIG = 210;
const CHAR = 220;
const RES = 300;

const CtReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const draw = interpolate(frame, [DIAG + 10, DIAG + 70], [0, 1], { ...CLAMP, easing: EASINGS.easeInOut });
  const wireGlow = 0.55 + 0.45 * Math.sin(frame / 7);
  const fadeOut = interpolate(frame, [432, 450], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      <NightBg intensity={0.9} />
      <AuroraCurtains strength={0.7} />
      <NightTag text="WHY THE DEAD LINE SPOKE" color={COLORS.signalAlt} />

      {/* diagram: field lines bending over the earth, the wire collecting current */}
      <div style={{ ...rise(DIAG), position: 'absolute', left: 150, top: 300 }}>
        <svg width="760" height="520" viewBox="0 0 760 520">
          {/* earth arc */}
          <path d="M20 470 Q 380 330 740 470" stroke={COLORS.d600} strokeWidth="4" fill="none" />
          {/* bending field lines */}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${60 + i * 40} ${120 - i * 26} Q 380 ${210 - i * 40} ${700 - i * 40} ${120 - i * 26}`}
              stroke={COLORS.danger} strokeWidth="3.5" fill="none" opacity={0.75 - i * 0.18}
              strokeDasharray="900" strokeDashoffset={900 * (1 - draw)} />
          ))}
          {/* the long grounded wire, alive */}
          <path d="M60 420 Q 380 350 700 420" stroke={COLORS.signalAlt} strokeWidth="5" fill="none"
            strokeDasharray="760" strokeDashoffset={760 * (1 - draw)} opacity={wireGlow} />
          <circle cx="60" cy="420" r="10" fill={COLORS.signalAlt} />
          <circle cx="700" cy="420" r="10" fill={COLORS.signalAlt} />
          {/* ground stakes */}
          <path d="M60 420 v 46 M44 466 h32 M50 478 h20 M56 490 h8" stroke={COLORS.d400} strokeWidth="4" fill="none" opacity={draw} />
          <path d="M700 420 v 46 M684 466 h32 M690 478 h20 M696 490 h8" stroke={COLORS.d400} strokeWidth="4" fill="none" opacity={draw} />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4, width: 760, fontFamily: FONT_MONO, fontSize: 22, letterSpacing: 3 }}>
          <span style={{ color: COLORS.danger }}>MAGNETIC FIELD, DISTURBED</span>
          <span style={{ color: COLORS.signalAlt }}>GROUNDED WIRE, COLLECTING CURRENT</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 1010, right: 130, top: 230, display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ ...rise(L1), fontFamily: FONT_BODY, fontWeight: 500, fontSize: 40, lineHeight: 1.45, color: COLORS.d300 }}>
          The storm disturbed Earth's magnetic field. The long grounded wire collected the <span style={{ color: COLORS.signalAlt, fontWeight: 600 }}>induced current</span>.
        </div>
        <div style={{ ...rise(BIG), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 60, letterSpacing: -1, lineHeight: 1.18, color: COLORS.paper }}>
          The <span style={{ color: COLORS.warn }}>planet</span> was driving the circuit. Not the batteries.
        </div>
        <div style={{ ...rise(RES), fontFamily: FONT_BODY, fontWeight: 500, fontSize: 33, lineHeight: 1.45, color: COLORS.d400, borderLeft: `5px solid ${COLORS.warn}`, paddingLeft: 28 }}>
          The first network powered by the sky was never designed to survive it.
        </div>
      </div>

      {/* Loomis, who proved it was one planetary event */}
      <div style={{ position: 'absolute', left: 1110, bottom: 40, display: 'flex', alignItems: 'center', gap: 30, ...rise(L2) }}>
        <PortraitCard src="projects/carrington-test/portrait-loomis.png" name="Elias Loomis" role="YALE · CONNECTED THE REPORTS" start={L2} w={200} accent={COLORS.warn} />
      </div>

      {/* Zoe reacts to the reveal */}
      <div style={{ position: 'absolute', right: -240, bottom: -12 }}>
        <MotionChar name="zoe-react-wow" h={560} start={CHAR} />
      </div>
    </AbsoluteFill>
  );
};
export default CtReveal;
