import React from 'react';
import { staticFile, useCurrentFrame, interpolate } from 'remotion';
import { HermesLogo, OpenClawLogo } from '../../lib/danslab';
import { Stage, Note, useRise, Stamp, DL, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at } from '../../lib/ep12timing.gen';

// CH0 · the rebuild. VO dol06: OpenClaw out, Hermes in; droplets redesigned 4 → 2.
// Facts: Memo + Sienna droplets closed 2026-10-11 (SYSTEM.md); roles from Dan 2026-10-15.
export const compositionConfig = { id: 'WRebuilt', durationInSeconds: 26.7, fps: 30, width: 1920, height: 1080 };

const DROPS: [string, 'keep' | 'closed', string, string][] = [
  ['DEXTER', 'keep', 'the video machine', 'dexter'],
  ['MEMO', 'closed', '', ''],
  ['SIENNA', 'closed', '', ''],
  ['NANO', 'keep', 'NervixPay ops', 'nano'],
];

const WRebuilt: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const OUT = at('dol06', 'hermes');
  const clawOp = interpolate(f, [OUT - 6, OUT + 10], [1, 0.22], DCLAMP);
  const clawX = interpolate(f, [OUT - 6, OUT + 14], [0, -40], DCLAMP);
  const TWO = at('dol06', 'two');
  return (
    <Stage label="THE REBUILD">
      {/* left: OpenClaw → Hermes */}
      <div style={{ position: 'absolute', top: 190, left: 120, width: 640, height: 560 }}>
        <div style={{ ...rise(at('dol06', 'open')), position: 'absolute', left: 0, top: 0, opacity: clawOp, transform: `translateX(${clawX}px)` }}>
          <OpenClawLogo src={staticFile('projects/danslab-ep12/openclaw-mascot.png')} size={170} start={at('dol06', 'open')} />
          <div style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.dim, marginTop: 14, width: 380, textAlign: 'center' }}>where the fleet was born</div>
        </div>
        <div style={{ position: 'absolute', left: 30, top: 130 }}>
          <Stamp at={at('dol06', 'costing')} size={26}>COST MORE TIME THAN IT SAVED</Stamp>
        </div>
        <div style={{ position: 'absolute', left: 430, top: 300, ...rise(OUT) }}>
          <HermesLogo size={200} start={OUT} />
          <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.gold, marginTop: 10, textAlign: 'center', letterSpacing: 3 }}>REPLACED IT</div>
        </div>
      </div>
      {/* right: droplets 4 → 2 */}
      <div style={{ position: 'absolute', top: 190, left: 900, width: 900, ...rise(at('dol06', 'droplet')) }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 4, color: DL.muted, marginBottom: 22 }}>THE DROPLETS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {DROPS.map(([name, kind, role, cue]) => {
            const gone = kind === 'closed' ? interpolate(f, [TWO, TWO + 14], [0, 1], DCLAMP) : 0;
            const roleT = cue ? interpolate(f, [at('dol06', cue), at('dol06', cue) + 14], [0, 1], DCLAMP) : 0;
            return (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 26, padding: '20px 28px', borderRadius: 14,
                background: DL.panel, border: `1px solid ${roleT ? DL.gold : DL.border}`, opacity: 1 - 0.7 * gone,
              }}>
                <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 32, color: DL.text, width: 190, textDecoration: gone > 0.5 ? 'line-through' : 'none' }}>{name}</span>
                {kind === 'closed'
                  ? <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.red, opacity: gone }}>closed · 11 Oct</span>
                  : <span style={{ fontFamily: DL_SANS, fontSize: 32, color: DL.gold, opacity: roleT }}>{role}</span>}
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(at('dol06', 'priority')), fontFamily: DL_SANS, fontSize: 30, color: DL.text, marginTop: 24 }}>
          Two machines. <span style={{ color: DL.gold }}>One priority each.</span>
        </div>
      </div>
      <Note at={at('dol06', 'busy')}>No busywork. No agents running just because they exist.</Note>
    </Stage>
  );
};
export default WRebuilt;
