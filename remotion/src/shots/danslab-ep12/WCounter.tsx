import React from 'react';
import { useCurrentFrame } from 'remotion';
import { Stage, Title, Row, Chip, CounterPointer, useRise, usePop, DL, DL_SERIF, DL_MONO, DL_SANS } from '../../lib/ep12kit';
import { at, voAt } from '../../lib/ep12timing.gen';

// CH6 · the two counters (v3, Dan 2026-10-24). VO dol23: the bottom counter didn't move and shouldn't — the
// 9 USDC came from Dan; a company paying itself isn't revenue, it's a rehearsal. Rail ready, checkout ready,
// what's missing is a stranger. Invited beta, link in the description. WHud shows the same two counters.
export const compositionConfig = { id: 'WCounter', durationInSeconds: 21.4, fps: 30, width: 1920, height: 1080 };

const Counter: React.FC<{ at: number; label: string; value: string; color: string; note: string; pulse?: boolean }> = ({
  at: cue, label, value, color, note, pulse,
}) => {
  const pop = usePop();
  const f = useCurrentFrame();
  const glow = pulse ? 0.5 + 0.5 * Math.sin((f - cue) / 7) : 0;
  return (
    <div style={{ ...pop(cue, 0.85), width: 560, background: DL.panel, border: `2px solid ${color}`, borderRadius: 20, padding: '26px 36px',
      boxShadow: pulse ? `0 0 ${40 * glow}px rgba(212,160,23,${0.45 * glow})` : undefined }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 5, color: DL.muted }}>{label}</div>
      <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 92, color, lineHeight: 1.1, marginTop: 8 }}>{value}</div>
      <div style={{ fontFamily: DL_SANS, fontSize: 24, color: DL.dim, marginTop: 6 }}>{note}</div>
    </div>
  );
};

const WCounter: React.FC = () => {
  const rise = useRise();
  return (
    <Stage label="THE COUNTER">
      <div style={{ position: 'absolute', top: 140, left: 120 }}>
        <Title at={voAt('dol23')} size={52}>But look at <span style={{ color: DL.gold, fontStyle: 'italic' }}>the counter.</span></Title>
      </div>
      <div style={{ position: 'absolute', top: 260, left: 120, display: 'flex', gap: 40 }}>
        <Counter at={at('dol23', 'counter')} label="LIVE TEST ✓" value="$9.00" color={DL.muted} note="paid by Dan · through our own rails" />
        <Counter at={at('dol23', 'move')} label="REVENUE" value="$0.00" color={DL.gold} note="from outside customers" pulse />
      </div>
      <div style={{ position: 'absolute', top: 290, left: 1360, width: 440 }}>
        <div style={{ ...rise(at('dol23', 'me')), fontFamily: DL_SERIF, fontSize: 34, color: DL.text, lineHeight: 1.3, whiteSpace: 'nowrap' }}>That money came from me.</div>
        <div style={{ ...rise(at('dol23', 'revenue')), fontFamily: DL_SERIF, fontSize: 36, color: DL.dim, marginTop: 24, lineHeight: 1.3 }}>
          A company paying itself isn&apos;t revenue.
        </div>
        <div style={{ ...rise(at('dol23', 'rehearsal')), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 44, color: DL.gold, marginTop: 14 }}>
          It&apos;s a rehearsal.
        </div>
      </div>
      <div style={{ position: 'absolute', top: 600, left: 120, width: 1160, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Row at={at('dol23', 'rail')} mark="ok" size={28}>The rail is ready</Row>
        <Row at={at('dol23', 'checkout')} mark="ok" size={28}>The checkout is ready</Row>
        <Row at={at('dol23', 'stranger')} mark="todo" size={28} pulse>What&apos;s missing: a stranger</Row>
      </div>
      <div style={{ position: 'absolute', top: 640, left: 1360, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <Chip at={at('dol23', 'invited')} solid>INVITED BETA</Chip>
        <Chip at={at('dol23', 'description')} color={DL.text}>link in the description ↓</Chip>
      </div>
      <CounterPointer at={at('dol23', 'bottom')} label="revenue · still $0.00" />
    </Stage>
  );
};
export default WCounter;
