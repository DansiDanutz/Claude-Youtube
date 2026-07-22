import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { CLAMP } from '../../lib/kit';
import { NightBg, AuroraCurtains, NightTag, WireMap, FootageCard } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 2/7 — the promise (lands by 0:15 global). One thin wire joins
// Boston and Portland across the dark; Arlo carries the storyteller thread.
// Facts: RESEARCH.md #5 (two hours on auroral current), operators unnamed.
// =============================================================================
export const compositionConfig = { id: 'CtPromise', durationInSeconds: 13, fps: 30, width: 1920, height: 1080 };

const P1 = 26; // promise line, ~13s global
const MAP = 60;
const P2 = 200;
const CHAR = 120;

const CtPromise: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const fadeOut = interpolate(frame, [372, 390], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      <NightBg intensity={0.8} />
      <AuroraCurtains strength={0.55} />
      <NightTag text="ONE WIRE IN THE DARK" color={COLORS.warn} />

      <div style={{ position: 'absolute', left: 130, right: 130, top: 190 }}>
        <div style={{ ...rise(P1), fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 70, letterSpacing: -1.5, lineHeight: 1.2, color: COLORS.paper, maxWidth: 1500 }}>
          For <span style={{ color: COLORS.warn }}>two hours</span>, two operators trusted a current nobody had switched on.
        </div>
      </div>

      <div style={{ ...rise(MAP), position: 'absolute', left: 150, top: 420 }}>
        <WireMap start={MAP} w={1060} />
      </div>

      <div style={{ ...rise(P2), position: 'absolute', left: 130, bottom: 96, maxWidth: 900, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, lineHeight: 1.5, color: COLORS.d300, borderLeft: `5px solid ${COLORS.danger}`, paddingLeft: 32 }}>
        History never recorded their names. Only their <span style={{ color: COLORS.warn, fontWeight: 600 }}>signal</span>.
      </div>

      {/* the operator at his key under the red sky — footage made for this scene */}
      <div style={{ position: 'absolute', right: 120, bottom: 110 }}>
        <FootageCard src="projects/carrington-test/scene-operator.mp4" caption="THE NIGHT SHIFT, BOSTON" start={CHAR} w={600} accent={COLORS.danger} />
      </div>
    </AbsoluteFill>
  );
};
export default CtPromise;
