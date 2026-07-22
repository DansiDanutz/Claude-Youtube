import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../../brand';
import { FONT_DISPLAY, FONT_BODY, FONT_MONO } from '../../fonts';
import { CLAMP } from '../../lib/kit';
import { NightBg, AuroraCurtains, NightTag, PortraitCard, MorseStrip } from '../../lib/carringtonkit';

// =============================================================================
// Carrington 5/7 — the experiment, run during live operations. Boston asks
// Portland to cut its battery; Boston grounds its own line; Portland reports
// the magnets work more steadily without them; two hours of real dispatches
// on auroral current alone. Facts: RESEARCH.md #4, #5, #6; preserved by
// Prescott. Reported speech only, no invented verbatim quotes.
// =============================================================================
export const compositionConfig = { id: 'CtExperiment', durationInSeconds: 16, fps: 30, width: 1920, height: 1080 };

const D1 = 36;
const D2 = 116;
const D3 = 196;
const PAYOFF = 290;
const PORTRAIT = 320;

const DISPATCHES = [
  { at: D1, from: 'BOSTON', to: 'PORTLAND', color: COLORS.danger, text: 'asks Portland to cut its battery entirely' },
  { at: D2, from: 'BOSTON', to: 'LINE', color: COLORS.warn, text: 'disconnects its own battery and grounds the wire' },
  { at: D3, from: 'PORTLAND', to: 'BOSTON', color: COLORS.signalAlt, text: 'reports the magnets work more steadily without the batteries' },
];

const CtExperiment: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = (start: number, dur = 14) => ({
    opacity: interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing: EASINGS.easeOut }),
    transform: `translateY(${interpolate(frame, [start, start + dur + 2], [26, 0], { ...CLAMP, easing: EASINGS.easeOut })}px)`,
  });
  const fadeOut = interpolate(frame, [462, 480], [1, 0], { ...CLAMP, easing: EASINGS.easeIn });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, opacity: fadeOut, backgroundColor: COLORS.d900 }}>
      <NightBg intensity={0.7} />
      <AuroraCurtains strength={0.5} />
      <NightTag text="THE EXPERIMENT · RUN ON A LIVE WIRE" color={COLORS.signalAlt} />

      <div style={{ position: 'absolute', left: 130, top: 200, width: 1080, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {DISPATCHES.map((d, i) => (
          <div key={i} style={{ ...rise(d.at), background: `${COLORS.d800}e6`, border: `1px solid ${COLORS.d600}`, borderRadius: 14, padding: '26px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 3 }}>
              <span style={{ color: d.color, fontWeight: 700 }}>{d.from}</span>
              <span style={{ color: COLORS.d400 }}>{'->'}</span>
              <span style={{ color: COLORS.d400 }}>{d.to}</span>
            </div>
            <div style={{ marginTop: 12, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 37, lineHeight: 1.4, color: COLORS.d300 }}>{d.text}</div>
          </div>
        ))}

        <div style={{ ...rise(PAYOFF), marginTop: 10 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 58, letterSpacing: -1, lineHeight: 1.2, color: COLORS.paper }}>
            <span style={{ color: COLORS.signalAlt }}>Two hours</span> of real dispatches. Powered by the aurora alone.
          </div>
          <div style={{ marginTop: 26 }}>
            <MorseStrip start={PAYOFF + 10} w={1040} color={COLORS.signalAlt} opacity={0.75} />
          </div>
        </div>
      </div>

      {/* Prescott, who preserved the exchange */}
      <div style={{ position: 'absolute', right: 170, top: 250 }}>
        <PortraitCard src="projects/carrington-test/portrait-prescott.png" name="George B. Prescott" role="TELEGRAPH SUPERINTENDENT" start={PORTRAIT} w={300} accent={COLORS.signalAlt} />
      </div>
      <div style={{ ...rise(PORTRAIT + 30), position: 'absolute', right: 150, top: 760, width: 360, textAlign: 'center', fontFamily: FONT_BODY, fontWeight: 500, fontSize: 27, lineHeight: 1.45, color: COLORS.d400 }}>
        His report preserved the operators' exchange.
      </div>
    </AbsoluteFill>
  );
};
export default CtExperiment;
