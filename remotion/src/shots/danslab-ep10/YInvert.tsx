import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ch2 · the inversion. VO brain07 9.2 / brain08 27.2. The real config, with the
// cheap model on top and the $400/mo lane demoted to fallback. This is the beat
// the whole chapter exists for, so the order reveals top-down and then re-colours.
export const compositionConfig = { id: 'YInvert', durationInSeconds: 38, fps: 30, width: 1920, height: 1080 };

const ROWS: [string, string, number, boolean][] = [
  ['"primary"', 'moonshot/kimi-k3', 60, true],
  ['"fallbacks"[0]', 'omniroute/daily-coding', 118, false],
  ['"fallbacks"[1]', 'zai/glm-5', 150, false],
  ['"fallbacks"[2]', 'claude-balancer/claude-opus-5', 182, false],
];

const YInvert: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // THE INVERSION" />
      <div style={{ position: 'absolute', top: 150, left: 120, right: 120 }}>
        <Headline at={8} size={50}>The cheap model is <span style={{ color: DL.gold }}>primary.</span></Headline>
      </div>

      <div style={{
        position: 'absolute', top: 300, left: 120, width: 1320,
        background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '30px 38px',
      }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 4, color: DL.faint, marginBottom: 20 }}>
          ~/.openclaw/openclaw.json · agent “david”
        </div>
        {ROWS.map(([k, v, at, hot]) => {
          const op = interpolate(f, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const x = interpolate(f, [at, at + 20], [-28, 0], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <div key={k} style={{ opacity: op, transform: `translateX(${x}px)`, display: 'flex', gap: 26, alignItems: 'baseline', padding: '10px 0' }}>
              <span style={{ fontFamily: DL_MONO, fontSize: 28, color: hot ? DL.gold : DL.muted, width: 260 }}>{k}</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 34, color: hot ? DL.gold : DL.dim }}>{v}</span>
              {hot && <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.green, letterSpacing: 2 }}>$20/mo</span>}
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', top: 336, right: 120, width: 380,
        background: 'rgba(231,76,60,0.07)', border: `1px solid ${DL.redDeep}`, borderRadius: 16, padding: '26px 30px',
        opacity: interpolate(f, [200, 226], [0, 1], DCLAMP),
      }}>
        <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 4, color: DL.faint }}>DEMOTED TO FALLBACK</div>
        <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 62, color: DL.red, marginTop: 12 }}>$400</div>
        <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim, marginTop: 8 }}>
          the Anthropic pair only wakes up when the cheap one fails
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 120, right: 120 }}>
        <Headline at={620} size={40} italic>Same output. A fraction of the burn.</Headline>
      </div>
    </AbsoluteFill>
  );
};
export default YInvert;
