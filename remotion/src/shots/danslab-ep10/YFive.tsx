import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { DL, DL_SANS, DL_MONO, DL_SERIF, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';

// Ch8 · five startups' R&D. VO why02 34.1. Products land on their names ~1-9s;
// the R&D line ~14s; the revenue rule ~25s.
export const compositionConfig = { id: 'YFive', durationInSeconds: 37, fps: 30, width: 1920, height: 1080 };

const PRODUCTS: [string, string, number][] = [
  ['ZmartyChat', 'crypto trading platform', 40],
  ['NERVIX', 'agent marketplace', 110],
  ['CrawdBot', 'crawler', 170],
  ['MyWork', 'automation framework', 230],
  ['The Studio', 'built the episode you are watching', 290],
];

const YFive: React.FC = () => {
  const f = useCurrentFrame();
  const rise = (at: number, d = 14) => ({
    opacity: interpolate(f, [at, at + d], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(f, [at, at + d], [18, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="THE PAYROLL // WHAT $1,242 BUYS" />
      <div style={{ position: 'absolute', top: 150, left: 120, width: 820, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PRODUCTS.map(([name, sub, at]) => (
          <div key={name} style={{
            ...rise(at), background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 12, padding: '18px 26px',
          }}>
            <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 32, color: DL.text }}>{name}</div>
            <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.muted, marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 220, right: 130, width: 700 }}>
        <div style={{ ...rise(440), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 46, color: DL.warm, lineHeight: 1.4 }}>
          The entire R&D department for five startups at once.
        </div>
        <div style={{ ...rise(760), marginTop: 50, background: DL.panel, border: `1px solid ${DL.gold}`, borderRadius: 14, padding: '26px 32px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 5, color: DL.gold }}>DAN'S RULE</div>
          <div style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.text, marginTop: 12, lineHeight: 1.45 }}>
            One revenue loop first. Nothing else opens until one product takes one real
            payment, end to end.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default YFive;
