import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { CLAMP } from '../../lib/kit';
import { NightBg, NightTag, PortraitCard, FootageCard } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 4/7 — 17.6 hours earlier. Carrington's projected Sun, two white
// patches erupting inside a sunspot group; he suspects his own instrument;
// gone within about five minutes. Facts: RESEARCH.md #1, #2, #10.
// Arlo points the diagram in (approved arlo-point clip).
// =============================================================================
export const compositionConfig = { id: 'CtCarrington', durationInSeconds: 15, fps: 30, width: 1920, height: 1080 };

const SUN = 30;
const FLARE = 90; // the two patches erupt
const L1 = 60;
const L2 = 170;
const L3 = 300;
const PORTRAIT = 40;

const CtCarrington: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const sunOp = interpolate(frame, [SUN, SUN + 20], [0, 1], { ...CLAMP, easing: EASINGS.easeOut });
  // flare: swells fast, holds, fades (the five-minute apparition compressed)
  const flare = interpolate(frame, [FLARE, FLARE + 26, 300, 368], [0, 1, 1, 0.12], { ...CLAMP, easing: EASINGS.easeOut });
  const fadeOut = interpolate(frame, [432, 450], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      <NightBg intensity={0.45} />
      <NightTag text="17.6 HOURS EARLIER · SEPTEMBER 1, 1859 · LONDON" color={COLORS.warn} />

      {/* the projected sun disc */}
      <div style={{ position: 'absolute', left: 210, top: 250, opacity: sunOp }}>
        <svg width="560" height="560" viewBox="0 0 560 560">
          <circle cx="280" cy="280" r="252" fill="#f7e8c0" opacity="0.96" />
          <circle cx="280" cy="280" r="252" fill="none" stroke={COLORS.warn} strokeWidth="3" opacity="0.7" />
          {/* sunspot group */}
          <g fill="#4a3a20">
            <ellipse cx="330" cy="300" rx="34" ry="22" transform="rotate(-18 330 300)" />
            <ellipse cx="272" cy="322" rx="22" ry="15" transform="rotate(-10 272 322)" />
            <ellipse cx="300" cy="268" rx="14" ry="9" />
            <ellipse cx="360" cy="336" rx="12" ry="8" />
          </g>
          {/* the two intensely bright patches */}
          <g opacity={flare}>
            <circle cx="296" cy="290" r={13 + 7 * flare} fill="#ffffff" />
            <circle cx="296" cy="290" r={30 + 16 * flare} fill="#fff6d8" opacity="0.55" />
            <circle cx="342" cy="316" r={11 + 6 * flare} fill="#ffffff" />
            <circle cx="342" cy="316" r={26 + 14 * flare} fill="#fff6d8" opacity="0.5" />
          </g>
        </svg>
        <div style={{ marginTop: 10, textAlign: 'center', fontFamily: FONT_MONO, fontSize: 23, letterSpacing: 4, color: COLORS.d400 }}>
          THE SUN, PROJECTED ONTO GLASS
        </div>
      </div>

      {/* portrait */}
      <div style={{ position: 'absolute', right: 190, top: 170 }}>
        <PortraitCard src="projects/carrington-test/portrait-carrington.png" name="Richard Carrington" role="ASTRONOMER" start={PORTRAIT} w={280} accent={COLORS.warn} />
      </div>

      <div style={{ position: 'absolute', left: 850, right: 540, top: 260, display: 'flex', flexDirection: 'column', gap: 42 }}>
        <div style={{ ...rise(L1), fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 52, letterSpacing: -1, lineHeight: 1.25, color: COLORS.paper }}>
          Richard Carrington was sketching sunspots when <span style={{ color: COLORS.warn }}>two patches of white light</span> erupted.
        </div>
        <div style={{ ...rise(L2), fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, lineHeight: 1.45, color: COLORS.d300 }}>
          He suspected a fault in his own instrument. Within about <span style={{ color: COLORS.paper, fontWeight: 600 }}>five minutes</span>, the apparition was gone.
        </div>
        <div style={{ ...rise(L3), fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, lineHeight: 1.45, color: COLORS.d300, borderLeft: `5px solid ${COLORS.danger}`, paddingLeft: 30 }}>
          <span style={{ color: COLORS.danger, fontWeight: 600 }}>17.6 hours later</span>, the storm reached Earth.
        </div>
      </div>

      {/* inside the observatory — footage made for this scene */}
      <div style={{ position: 'absolute', right: 150, bottom: 66 }}>
        <FootageCard src="projects/carrington-test/scene-observatory.mp4" caption="THE OBSERVATION" start={110} w={380} accent={COLORS.warn} />
      </div>
    </AbsoluteFill>
  );
};
export default CtCarrington;
