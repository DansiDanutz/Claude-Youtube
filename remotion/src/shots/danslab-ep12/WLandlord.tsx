import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Stage, Title, Note, useRise, DL, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH1 · five gates. VO dol09: approve · hold payouts · take a % (~3% + fee, general industry
// pricing — verify on render day) · reverse · close the account. Each gate SLAMS onto the pipe on its word.
export const compositionConfig = { id: 'WLandlord', durationInSeconds: 22.4, fps: 30, width: 1920, height: 1080 };

const GATES: [string, string][] = [
  ['APPROVE YOU', 'approve'], ['HOLD PAYOUTS', 'hold'], ['TAKE ~3% + A FEE', 'percentage'],
  ['REVERSE A SALE', 'reverse'], ['CLOSE THE ACCOUNT', 'close'],
];
const X0 = 330, X1 = 1590;

const WLandlord: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = useRise();
  const pipeW = interpolate(f, [voAt('dol09'), voAt('dol09') + 24], [0, 1], DCLAMP);
  const FIVE = at('dol09', 'five');
  const red = interpolate(f, [FIVE, FIVE + 12], [0, 1], DCLAMP);
  return (
    <Stage label="FIVE GATES">
      <div style={{ position: 'absolute', top: 150, left: 120 }}>
        <Title at={voAt('dol09')} size={50}>What a payment processor can do to you.</Title>
      </div>
      {/* the pipe: customer → merchant */}
      <div style={{ position: 'absolute', top: 440, left: 120, fontFamily: DL_MONO, fontSize: 26, color: DL.dim, ...rise(voAt('dol09')) }}>CUSTOMER</div>
      <div style={{ position: 'absolute', top: 440, right: 120, fontFamily: DL_MONO, fontSize: 26, color: DL.dim, ...rise(voAt('dol09')) }}>YOU</div>
      <div style={{ position: 'absolute', top: 452, left: X0 - 40, width: (X1 - X0 + 80) * pipeW, height: 8, borderRadius: 4, background: DL.border }} />
      {GATES.map(([label, cue], i) => {
        const t = at('dol09', cue);
        const s = spring({ frame: f - t, fps, config: { damping: 9, mass: 0.5 } });
        const x = X0 + (i * (X1 - X0)) / (GATES.length - 1);
        return (
          <div key={label} style={{ position: 'absolute', left: x - 140, top: 330, width: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: f < t ? 0 : 1 }}>
            <div style={{ width: 16, height: 240, borderRadius: 6, background: red > 0 ? DL.red : DL.gold,
              transform: `translateY(${(1 - s) * -160}px)`, boxShadow: `0 0 18px ${DL.red}55` }} />
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 23, color: DL.text, textAlign: 'center', marginTop: 18, whiteSpace: 'nowrap', lineHeight: 1.3 }}>{label}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', top: 720, left: 120, ...rise(FIVE) }}>
        <span style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 52, color: DL.red }}>Five gates.</span>
      </div>
      <Note at={at('dol09', 'someone')}>Every one of them belongs to <span style={{ color: DL.red }}>someone else.</span></Note>
    </Stage>
  );
};
export default WLandlord;
