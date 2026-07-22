import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, Phone } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep05 12b — the line Hermes will not cross. Irreversible or expensive ->
// it stops and asks Dan on Telegram. VO 0.8s (25.7s).
export const compositionConfig = { id: 'NLimits', durationInSeconds: 28, fps: 30, width: 1920, height: 1080 };

const STOPS = ['spend real money', 'ship to real users', 'anything it cannot undo'];

const Bubble: React.FC<{ at: number; children: React.ReactNode; me?: boolean }> = ({ at, children, me }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 14], [0, 1], DCLAMP);
  const y = interpolate(frame, [at, at + 18], [16, 0], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '88%', background: me ? '#2b5278' : '#1b1b1b', borderRadius: 14, padding: '12px 15px', marginBottom: 10 }}>
      <div style={{ fontFamily: DL_SANS, fontSize: 19, color: '#f2f2f2', lineHeight: 1.4 }}>{children}</div>
    </div>
  );
};

const NLimits: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="05" label="THE LIMIT // WHERE IT STOPS" />

      <div style={{ position: 'absolute', top: 130, left: 100, width: 900 }}>
        <Headline at={16} size={46}>There is a line it <span style={{ color: DL.red }}>will not cross.</span></Headline>
        <div style={{ marginTop: 26, fontFamily: DL_SERIF, fontSize: 38, color: DL.text, lineHeight: 1.4 }}>
          Hermes decides what the company <span style={{ fontStyle: 'italic', color: DL.gold }}>does.</span>
          <br />It does not decide what the company <span style={{ fontStyle: 'italic', color: DL.gold }}>is.</span>
        </div>

        <div style={{ marginTop: 40 }}>
          {STOPS.map((s, i) => {
            const at = 110 + i * 26;
            const op = interpolate(frame, [at, at + 16], [0, 1], DCLAMP);
            return (
              <div key={s} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: DL.red }} />
                <span style={{ fontFamily: DL_SANS, fontSize: 30, color: DL.dim }}>{s}</span>
                <span style={{ fontFamily: DL_MONO, fontSize: 22, color: DL.red, letterSpacing: 2 }}>→ IT ASKS</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 44, opacity: interpolate(frame, [560, 592], [0, 1], DCLAMP) }}>
          <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>The machine runs the day.</span>
          <div style={{ marginTop: 6, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.gold }}>The human still owns the direction.</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 120, right: 210 }}>
        <Phone h={820} start={200} statusTime="3:14" tilt={-4}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 62, paddingLeft: 14, paddingRight: 14, height: '100%', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 17, color: '#8b8b8b', textAlign: 'center', marginBottom: 16 }}>Hermes · DansLab</div>
            <Bubble at={250}>Deploy <b>nervix-cli v2.1</b> to production?</Bubble>
            <Bubble at={286}>Touches live billing — I will not do this without you.</Bubble>
            <Bubble at={326}>
              <span style={{ color: '#7ee2a8' }}>Recommend: ship it.</span> Tests green, rollback ready, 2 agents idle to watch it.
            </Bubble>
            <Bubble at={430} me>go</Bubble>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
export default NLimits;
