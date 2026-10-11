import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DYT, DYT_DISPLAY, DYT_BODY, DYT_GRADIENT, DytBg, DytLogoAnimated, DytWordmark } from '../../lib/dytbrand';
import { DL_EASE } from '../../lib/danslab';
import { makeCue, ease, rise } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 3/14 — first-episode channel welcome (Brian, tc00 @0.6s).
// The retention loop is the point: "?" → "!" (every video = a question you never
// asked → an answer you won't forget), the categories, then THE RULE that turns
// viewers into players — guess in the comments, stay to the end, see if you
// were right. Every reveal lands on its word.
// =============================================================================
export const compositionConfig = { id: 'TcWelcome', durationInSeconds: 30, fps: 30, width: 1920, height: 1080 };
const DUR = 900;

const C = makeCue(vo, 'tc00-welcome', 0.5);
const WELCOME = C.at('Welcome');
const QUESTION = C.at('question');
const ANSWER = C.at('answer', 1);
const FORGET = C.at('forget');
// the "?" card sits centred alone until "answer": half the "!" column plus the gap
const Q_SHIFT = 352;
const CATS: [string, string, number][] = [
  ['SCIENCE', DYT.cyan, C.at('Science')],
  ['HISTORY', DYT.orange, C.at('History')],
  ['SPACE', DYT.purple, C.at('Space')],
  ['THE HUMAN MIND', DYT.magenta, C.at('mind')],
];
const TAUGHT = C.at('taught');
const BETTER = C.at('better');
const RULE = C.at('rule');
const GUESS = C.at('guess');
const STAY = C.at('stay');
const RIGHT = C.at('right');
const COMMENTS = C.at('comments');
const READY = C.at('Ready');
const BEGIN = C.at('begin');

const Icon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => {
  const st = { fill: 'none', stroke: color, strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={96} height={96} viewBox="0 0 96 96">
      {kind === 'SCIENCE' && (<><ellipse cx={48} cy={48} rx={40} ry={15} {...st} /><ellipse cx={48} cy={48} rx={40} ry={15} transform="rotate(60 48 48)" {...st} /><ellipse cx={48} cy={48} rx={40} ry={15} transform="rotate(-60 48 48)" {...st} /><circle cx={48} cy={48} r={6} fill={color} /></>)}
      {kind === 'HISTORY' && (<><path d="M18 80 H78 M24 70 H72 M30 70 V34 M44 70 V34 M58 70 V34 M72 70 V34 M20 34 H76 L48 14 Z" {...st} /></>)}
      {kind === 'SPACE' && (<><circle cx={48} cy={48} r={20} {...st} /><ellipse cx={48} cy={48} rx={42} ry={12} transform="rotate(-18 48 48)" {...st} /><circle cx={80} cy={18} r={3} fill={color} /><circle cx={14} cy={76} r={2.5} fill={color} /></>)}
      {kind === 'THE HUMAN MIND' && (<><path d="M48 16 C30 16 18 28 20 44 C14 50 16 62 26 66 C28 76 38 82 48 78 C58 82 68 76 70 66 C80 62 82 50 76 44 C78 28 66 16 48 16 Z M48 16 V78 M34 34 C40 36 42 42 40 48 M62 34 C56 36 54 42 56 48" {...st} /></>)}
    </svg>
  );
};

const TcWelcome: React.FC = () => {
  const f = useCurrentFrame();
  const fade = Math.min(ease(f, -1, 2), ease(f, DUR - 3, DUR, 1, 0));
  // panels cross-fade (incoming starts before outgoing ends) so a join never dips to empty
  const p1a = 1 - ease(f, QUESTION - 8, QUESTION);
  const p1b = ease(f, QUESTION - 6, QUESTION + 2) * (1 - ease(f, CATS[0][2] - 8, CATS[0][2]));
  const p2 = ease(f, CATS[0][2] - 6, CATS[0][2] + 2) * (1 - ease(f, RULE - 8, RULE));
  const p3 = ease(f, RULE - 6, RULE + 2) * (1 - ease(f, READY - 8, READY));
  const p4 = ease(f, READY - 6, READY + 2);
  const comments = ease(f, COMMENTS - 2, COMMENTS + 6);
  const nudge = f > COMMENTS ? Math.abs(Math.sin((f - COMMENTS) / 4)) * 8 * Math.max(0, 1 - (f - COMMENTS) / 40) : 0;
  const morph = ease(f, ANSWER - 4, ANSWER + 12);

  return (
    <AbsoluteFill style={{ fontFamily: DYT_BODY, opacity: fade }}>
      <DytBg />

      {/* welcome lockup */}
      <AbsoluteFill style={{ opacity: p1a, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, 0), fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 40, letterSpacing: 14, color: DYT.dim, marginBottom: 30 }}>WELCOME TO</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          <DytLogoAnimated size={260} start={0} />
          <DytWordmark at={WELCOME + 6} size={120} />
        </div>
      </AbsoluteFill>

      {/* ? → ! */}
      <AbsoluteFill style={{ opacity: p1b, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          {[['?', 'A QUESTION YOU NEVER ASKED', DYT.magenta, QUESTION], ['!', 'AN ANSWER YOU WON’T FORGET', DYT.orange, ANSWER]].map(([g, label, color, at], i) => (
            <div key={String(g)} style={{ opacity: rise(f, Number(at) - 2).opacity, transform: `translate(${i === 0 ? Q_SHIFT * (1 - ease(f, ANSWER - 8, ANSWER + 4, 0, 1, DL_EASE.inOut)) : 0}px, ${ease(f, Number(at) - 2, Number(at) + 13, 26, 0)}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
              <div style={{ width: 340, height: 340, borderRadius: 40, border: `5px solid ${color}`, boxShadow: `0 0 ${30 + (i === 1 ? morph * 40 : 0)}px ${color}88, inset 0 0 40px ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 250, color: DYT.white, textShadow: `0 0 30px ${color}` }}>{g}</div>
              <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: String(color) }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', top: 470, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width={90} height={60} viewBox="0 0 90 60" style={{ opacity: ease(f, ANSWER - 6, ANSWER + 4) }}><path d="M6 30 H74 M54 10 L78 30 L54 50" fill="none" stroke={DYT.white} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ ...rise(f, FORGET - 4), position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: 8, color: DYT.dim }}>EVERY SINGLE VIDEO</div>
      </AbsoluteFill>

      {/* categories + promise */}
      <AbsoluteFill style={{ opacity: p2, alignItems: 'center' }}>
        <div style={{ marginTop: 170, display: 'flex', gap: 40 }}>
          {CATS.map(([label, color, at]) => {
            const s = interpolate(f, [at, at + 8], [1.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={label} style={{ opacity: ease(f, at - 2, at + 5), transform: `scale(${s})`, width: 360, height: 300, borderRadius: 28, border: `4px solid ${color}`, boxShadow: `0 0 34px ${color}66, inset 0 0 30px ${color}22`, background: '#0b103099', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
                <Icon kind={label} color={color} />
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: label.length > 8 ? 38 : 42, lineHeight: 1.05, letterSpacing: 2, color: DYT.white, textAlign: 'center', padding: '0 24px', whiteSpace: 'pre-line' }}>
                  {label.length > 8 ? label.replace(/ (\S+)$/, '\n$1') : label}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ ...rise(f, TAUGHT - 8), marginTop: 80, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 60, color: DYT.white }}>Things nobody taught you.</div>
        <div style={{ ...rise(f, BETTER - 14), marginTop: 18, fontFamily: DYT_DISPLAY, fontWeight: 800, fontSize: 60, background: DYT_GRADIENT, WebkitBackgroundClip: 'text', color: 'transparent' }}>Things that make your day better.</div>
      </AbsoluteFill>

      {/* THE RULE — the viewer's game */}
      <AbsoluteFill style={{ opacity: p3, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, RULE - 4), fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 96, letterSpacing: 4, color: DYT.white, textShadow: `0 0 30px ${DYT.magenta}aa` }}>THE RULE</div>
        <div style={{ display: 'flex', gap: 46, marginTop: 60 }}>
          {[['1', 'GUESS', 'in the comments ↓', DYT.cyan, GUESS], ['2', 'STAY', 'to the very end', DYT.purple, STAY], ['3', 'CHECK', 'were you right?', DYT.orange, RIGHT]].map(([n, big, small, color, at]) => {
            const s = interpolate(f, [Number(at), Number(at) + 8], [1.25, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={String(n)} style={{ opacity: ease(f, Number(at) - 2, Number(at) + 5), transform: `scale(${s})`, width: 440, padding: '40px 0', borderRadius: 28, border: `4px solid ${color}`, boxShadow: `0 0 34px ${color}66`, background: '#0b103099', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 40, color: String(color) }}>{n}</span>
                <span style={{ fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 76, color: DYT.white }}>{big}</span>
                {/* "in the comments ↓" lands on "comments" and the arrow nudges down */}
                <span style={{ fontFamily: DYT_BODY, fontWeight: 600, fontSize: 34, color: DYT.dim, opacity: n === '1' ? comments : 1, transform: n === '1' ? `translateY(${nudge}px)` : undefined }}>{small}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* ready → begin */}
      <AbsoluteFill style={{ opacity: p4, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, READY - 2), fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 170, color: DYT.white, textShadow: `0 0 40px ${DYT.orange}aa` }}>Ready?</div>
        <div style={{ ...rise(f, BEGIN - 4), marginTop: 20, padding: '18px 44px', borderRadius: 999, background: DYT_GRADIENT, fontFamily: DYT_DISPLAY, fontWeight: 900, fontSize: 44, letterSpacing: 4, color: DYT.white }}>LET’S BEGIN</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TcWelcome;
