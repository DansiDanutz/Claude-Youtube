import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, Cutout } from '../../lib/danslab';

// =============================================================================
// $100 Stack 4/8 — the turn. The pivot question, elena (the curious builder)
// beside it. Curiosity -> the reframe that sets up the payoff.
// =============================================================================
export const compositionConfig = { id: 'StTurn', durationInSeconds: 7, fps: 30, width: 1920, height: 1080 };

const StTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const rule = interpolate(frame, [96, 122], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg />
      <Kicker n="03" label="THE QUESTION // A REFRAME" />

      {/* left: character */}
      <div style={{ position: 'absolute', left: 150, bottom: 0, display: 'flex', alignItems: 'flex-end', height: 860 }}>
        <Cutout src={staticFile('projects/danslab-story/characters/elena.png')} h={760} start={22} />
      </div>

      {/* right: the question */}
      <div style={{ position: 'absolute', top: 300, left: 720, right: 130 }}>
        <div style={{ ...rise(18, 18), fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red, marginBottom: 30 }}>SO A FOUNDER ASKS</div>
        <div style={{ ...rise(34, 26), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 76, lineHeight: 1.16, color: DL.text }}>
          What if one person, plus a <span style={{ fontStyle: 'italic', color: DL.gold }}>$100 stack,</span> could do the grunt work of all four?
        </div>
        <div style={{ marginTop: 40, height: 4, width: 300, borderRadius: 999, background: '#ffffff10', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})`, transform: `scaleX(${rule})`, transformOrigin: 'left' }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default StTurn;
