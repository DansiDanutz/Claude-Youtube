import React from 'react';
import { Stage, Title, Note, usePop, DL, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH0 · what changed. VO dol05: Dan's workbench today — each card lands ON its spoken name.
// Names only: roles are not claimed beyond what the VO says (Dan, 2026-10-14).
export const compositionConfig = { id: 'WNewCrew', durationInSeconds: 21, fps: 30, width: 1920, height: 1080 };

const TOOLS: [string, string][] = [
  ['Claude Code', 'claude'], ['Codex', 'codex'], ['Kimi', 'kimmy'],
  ['Zcode', 'z'], ['Hermes', 'hermes'], ['GrokBot', 'grockbot'],
];

const WNewCrew: React.FC = () => {
  const pop = usePop();
  return (
    <Stage label="WHAT CHANGED">
      <div style={{ position: 'absolute', top: 150, left: 120, width: 1600 }}>
        <Title at={voAt('dol05')}>Before the money — <span style={{ color: DL.gold, fontStyle: 'italic' }}>what changed.</span></Title>
        <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim, ...pop(at('dol05', 'workbench'), 0.9) }}>
          DAN'S WORKBENCH · OCTOBER 2026
        </div>
      </div>
      <div style={{ position: 'absolute', top: 360, left: 120, width: 1680, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {TOOLS.map(([name, cue]) => (
          <div key={name} style={{
            ...pop(at('dol05', cue)), background: DL.panel, border: `1px solid ${DL.border}`,
            borderTop: `4px solid ${name === 'Hermes' ? DL.red : DL.gold}`, borderRadius: 16, padding: '34px 36px',
          }}>
            <div style={{ fontFamily: DL_SANS, fontWeight: 600, fontSize: 46, color: DL.text }}>{name}</div>
          </div>
        ))}
      </div>
      <Note at={at('dol05', 'job')}>Each one: a job that used to take <span style={{ color: DL.gold }}>a week of wiring.</span></Note>
    </Stage>
  );
};
export default WNewCrew;
