import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Stage, Title, Note, useRise, usePop, DL, DL_SERIF, DL_MONO, DL_SANS, DCLAMP } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH5 · the audit. VO dol20. Quote verbatim from NervixPay docs/production-readiness-audit-2026-10-12.md.
// Blocker state re-checked 2026-10-15: F-1 legal pages live (PRs #113/#123/#124), F-2 witness deferred.
export const compositionConfig = { id: 'WAudit', durationInSeconds: 34.9, fps: 30, width: 1920, height: 1080 };

const WAudit: React.FC = () => {
  const f = useCurrentFrame();
  const rise = useRise();
  const pop = usePop();
  const LIVE = at('dol20', 'gone'), LIVE2 = at('dol20', 'live', 2), STILL = at('dol20', 'still');
  const f1 = interpolate(f, [LIVE, LIVE + 12], [0, 1], DCLAMP);
  return (
    <Stage label="THE AUDIT">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={voAt('dol20')} size={46}>12 October — the fleet audited <span style={{ color: DL.gold, fontStyle: 'italic' }}>the whole thing.</span></Title>
        <div style={{ ...rise(voAt('dol20') + 8), fontFamily: DL_MONO, fontSize: 20, color: DL.faint, marginTop: 10 }}>docs/production-readiness-audit-2026-10-12.md</div>
      </div>
      <div style={{ position: 'absolute', top: 290, left: 120, display: 'flex', gap: 30 }}>
        <div style={{ ...pop(at('dol20', '912')), background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '18px 30px' }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.green }}>912</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginLeft: 14 }}>tests passing</span>
        </div>
        <div style={{ ...pop(at('dol20', 'zero')), background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 14, padding: '18px 30px' }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.green }}>0</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.dim, marginLeft: 14 }}>production errors · 7 days</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 440, left: 120, width: 1680, ...rise(at('dol20', 'verdict')),
        borderLeft: `4px solid ${DL.gold}`, padding: '6px 0 6px 34px' }}>
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 42, color: DL.text, lineHeight: 1.35 }}>
          “<span style={{ color: DL.red }}>Not ready for a public launch yet.</span> Ready for a controlled, invited-merchant beta once the two P0 items below are closed.”
        </div>
      </div>
      <div style={{ position: 'absolute', top: 640, left: 120, display: 'flex', gap: 26 }}>
        <div style={{ ...rise(at('dol20', 'legal')), display: 'flex', alignItems: 'center', gap: 16, background: DL.panel, borderRadius: 14, padding: '18px 26px',
          border: `2px solid ${f1 ? DL.green : DL.border}` }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: f1 ? DL.green : DL.gold }}>{f1 > 0.5 ? '✓' : 'P0'}</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>F-1 · legal pages</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.green, opacity: f1 }}>live · 15 Oct</span>
        </div>
        <div style={{ ...rise(at('dol20', 'second')), display: 'flex', alignItems: 'center', gap: 16, background: DL.panel, borderRadius: 14, padding: '18px 26px',
          border: `2px solid ${f >= LIVE2 ? DL.gold : DL.border}` }}>
          <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DL.gold }}>P0</span>
          <span style={{ fontFamily: DL_SANS, fontSize: 28, color: DL.text }}>F-2 · second chain source</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.green, opacity: f >= LIVE2 ? 1 : 0 }}>live</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.gold, opacity: f >= STILL ? 1 : 0 }}>· certification run pending (audit 20 Oct)</span>
        </div>
      </div>
      <Note at={at('dol20', 'beta', 2)}>For now, the beta stays <span style={{ color: DL.gold }}>invite only.</span></Note>
    </Stage>
  );
};
export default WAudit;
