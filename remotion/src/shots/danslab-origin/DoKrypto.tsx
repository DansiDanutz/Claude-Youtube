import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, staticFile } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise, SiteFrame } from '../../lib/danslab';

// =============================================================================
// Origin 11/14 — Kryptostack foundations. VO 0.8s (11.5s). Screenshot + the
// three stats counting on their mentions.
// =============================================================================
export const compositionConfig = { id: 'DoKrypto', durationInSeconds: 13.2, fps: 30, width: 1920, height: 1080 };

const STATS = [
  { target: 10000, suffix: '+', label: 'USERS', at: 204, counter: true },
  { text: 'CRYPTO ⇄ FIAT', label: 'BOTH DIRECTIONS, LIVE', at: 249 },
  { text: 'ROMANIA', label: 'SERVING LIVE EXCHANGES', at: 321 },
];

const DoKrypto: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.gold} />
      <Kicker n="10" label="FOUNDATIONS // KRYPTOSTACK.COM" />
      <div style={{ position: 'absolute', top: 182, left: 120, ...rise(8, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 66, color: DL.text }}>
          Built <span style={{ fontStyle: 'italic', color: DL.gold }}>the hard way.</span>
        </span>
      </div>
      <div style={{ position: 'absolute', top: 300, left: 150, ...rise(40, 40) }}>
        <SiteFrame src={staticFile('projects/danslab-origin/kryptostack.png')} url="kryptostack.com" w={1130} h={620} />
      </div>
      <div style={{ position: 'absolute', top: 360, right: 100, display: 'flex', flexDirection: 'column', gap: 26, width: 460 }}>
        {STATS.map((s) => {
          const op = interpolate(frame, [s.at, s.at + 13], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
          const v = s.counter ? Math.round(interpolate(frame, [s.at + 3, s.at + 36], [0, s.target], { ...DCLAMP, easing: DL_EASE.inOut })).toLocaleString('en-US') + s.suffix : s.text;
          return (
            <div key={s.label} style={{ opacity: op, background: DL.panel, border: `1px solid ${DL.border}`, borderLeft: `3px solid ${DL.gold}`, borderRadius: 14, padding: '26px 34px' }}>
              <div style={{ fontFamily: s.counter ? DL_SERIF : DL_MONO, fontWeight: s.counter ? 600 : 700, fontSize: s.counter ? 72 : 44, lineHeight: 1.15, color: DL.gold }}>{v}</div>
              <div style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 3, color: DL.dim, marginTop: 10 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
export default DoKrypto;
