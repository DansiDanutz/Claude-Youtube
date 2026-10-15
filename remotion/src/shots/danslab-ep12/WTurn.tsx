import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, useRise, DL, DL_SERIF, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH1 · the turn. VO dol08: "Last episode I told you we'd wire up Stripe… I changed my mind."
// The quote is ep11's own words (flw22 + flw23, verbatim excerpts), struck through when he says "changed".
export const compositionConfig = { id: 'WTurn', durationInSeconds: 14.9, fps: 30, width: 1920, height: 1080 };

const WTurn: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const CH = at('dol08', 'changed');
  const strike = interpolate(f, [CH, CH + 14], [0, 1], DCLAMP);
  return (
    <Stage label="THE TURN">
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={voAt('dol08')}>First, <span style={{ color: DL.red, fontStyle: 'italic' }}>a correction.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 120, width: 1300, ...rise(at('dol08', 'last')),
        background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `4px solid ${DL.muted}`, borderRadius: 16, padding: '34px 44px' }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DL.muted }}>DANSLAB · NO. 11 · THE FLYWHEEL</div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 16 }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 58, color: DL.text }}>“Stripe is not wired yet. … That's the next episode.”</span>
          <div style={{ position: 'absolute', left: 0, top: '52%', height: 5, width: `${strike * 100}%`, background: DL.red }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: 560, left: 120, width: 1600 }}>
        <div style={{ ...rise(CH), fontFamily: DL_SERIF, fontSize: 64, color: DL.gold }}>I changed my mind.</div>
        <div style={{ ...rise(at('dol08', 'bad')), fontFamily: DL_SANS, fontSize: 34, color: DL.dim, marginTop: 22 }}>Not because Stripe is bad.</div>
        <div style={{ ...rise(at('dol08', 'gate')), fontFamily: DL_SANS, fontSize: 38, color: DL.text, marginTop: 14 }}>
          Because of <span style={{ color: DL.red, fontWeight: 600 }}>somebody else's gate</span> between your customer and your money.
        </div>
      </div>
    </Stage>
  );
};
export default WTurn;
