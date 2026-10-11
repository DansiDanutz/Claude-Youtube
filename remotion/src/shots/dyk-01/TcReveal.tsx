import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Squeeze, Vignette, ClockFace } from '../../lib/dykkit';
import vo from './vo.json';

// =============================================================================
// DYK 01 · 10/13 — THE ANSWER (payoff withheld until here, Playbook rule 4).
// Equal seconds; more packed / less kept; the brain measures in memories
// (holiday paradox, F15): a week of new vs months of routine collapsing; the
// five inventions each make the hour more uniform; "Not of the clock. Of
// experience." VO tc10 @0.8s.
// =============================================================================
export const compositionConfig = { id: 'TcReveal', durationInSeconds: 47.2, fps: 30, width: 1920, height: 1080 };
const DUR = 1416;

const C = makeCue(vo, 'tc10-reveal', 0.8);
const ANSWER = C.at('answer');
const SPEED = C.at('speed');
const SEC1 = C.at('second', 1);
const SEC2 = C.at('second', 2);
const PACK = C.at('pack');
const REMEMBER = C.at('remember');
const BRAIN = C.at('brain');
const MEM = C.at('memories');
const HOLIDAY = C.at('holiday');
const WEEK = C.at('week');
const MONTHS = C.at('Months');
const COLLAPSE = C.at('collapse');
const EVERY = C.at('Every');
const ITEMS: [string, number][] = [
  ['THE CLOCK', C.at('clock', 2)],
  ['THE FACTORY', C.at('factory')],
  ['THE TELEGRAPH', C.at('telegraph')],
  ['THE ASSEMBLY LINE', C.at('assembly')],
  ['THE PHONE', C.at('phone')],
];
const ALIKE = C.at('same', 2);
const COMP = C.at('compression');
const NOT = C.at('Not', 3);
const EXPER = C.at('experience');
const CLOCK1 = C.at('clock', 1);
const INVENTION = C.at('invention');
const MORE = C.at('more');
const MADE = C.at('made');
const WEEK_STEP = 12; // the seven new days arrive ~2.5 per second (ticks use the same step)

const NOVEL = [DL.gold, DL.red, DL.sky, DL.green, '#c084fc', '#f97316', '#f3cf5f'];

const TcReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const p1 = 1 - ease(f, BRAIN - 14, BRAIN, 0, 1, DL_EASE.in);
  const p2 = ease(f, BRAIN - 2, BRAIN + 12) * (1 - ease(f, EVERY - 14, EVERY, 0, 1, DL_EASE.in));
  const p3 = ease(f, EVERY - 2, EVERY + 12) * (1 - ease(f, COMP - 14, COMP, 0, 1, DL_EASE.in));
  const p4 = ease(f, COMP - 2, COMP + 12);

  const secFill = (at: number) => interpolate(f, [at, at + 30], [0, 1], DCLAMP);
  const packed = Math.round(interpolate(f, [PACK - 4, PACK + 30], [0, 48], DCLAMP));
  const forget = ease(f, REMEMBER, REMEMBER + 30);
  const collapse = ease(f, COLLAPSE, COLLAPSE + 30, 0, 1, DL_EASE.inOut);
  const landed = ITEMS.filter(([, at]) => f >= at).length;
  const sameness = Math.min(1, landed / 5 + ease(f, ALIKE, ALIKE + 20) * 0.2);
  // THE ANSWER builds with the opening reverse whoosh, slams on "answer", then hands over to the headline
  const titleIn = interpolate(f, [0, ANSWER - 2], [0, 1], { ...DCLAMP, easing: DL_EASE.in });
  const titleOut = ease(f, SPEED - 12, SPEED, 0, 1, DL_EASE.in);
  const slam = ease(f, ANSWER - 2, ANSWER + 2) * (1 - ease(f, ANSWER + 4, ANSWER + 20));
  // "does not measure time with a clock": a clock, struck through
  const clockOut = 1 - ease(f, HOLIDAY - 14, HOLIDAY - 2);
  const clockStrike = ease(f, CLOCK1 + 4, CLOCK1 + 12);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a0e0a" />
      <Vignette />
      <Kicker n="★" label="THE ANSWER" start={SPEED - 4} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: titleIn * (1 - titleOut) }}>
        <div style={{ transform: `scale(${(1.25 - 0.25 * titleIn + 0.06 * slam) * (1 - 0.4 * titleOut)})`, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 170, letterSpacing: 6, color: DL.gold, textShadow: `0 0 ${20 + 60 * slam}px ${DL.gold}aa` }}>
          <span style={{ color: DL.red, marginRight: 30 }}>★</span>THE ANSWER
        </div>
      </AbsoluteFill>

      {/* ── part 1: equal seconds, more packed, less kept */}
      <AbsoluteFill style={{ opacity: p1 }}>
        <div style={{ ...rise(f, SPEED - 8), position: 'absolute', left: 0, right: 0, top: 190, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, color: DL.text }}>
          Time did <span style={{ color: DL.red, fontStyle: 'italic' }}>not</span> speed up.
        </div>
        <div style={{ position: 'absolute', left: 260, top: 400, width: 1400, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {[['ONE SECOND · 1500', SEC1, DL.gold], ['ONE SECOND · TODAY', SEC2, DL.red]].map(([label, at, color]) => (
            <div key={String(label)} style={{ ...rise(f, Number(at) - 6), display: 'flex', alignItems: 'center', gap: 30 }}>
              <span style={{ width: 380, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>{label}</span>
              <div style={{ flex: 1, height: 30, background: DL.panel2, borderRadius: 8 }}>
                <div style={{ width: `${secFill(Number(at)) * 100}%`, height: '100%', background: String(color), borderRadius: 8 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 260, top: 620, width: 1400, display: 'flex', gap: 60, alignItems: 'center' }}>
          <div style={{ ...rise(f, PACK - 6), width: 640 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>MORE PACKED IN</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, width: 640, height: 150, alignContent: 'flex-start' }}>
              {Array.from({ length: 48 }, (_, i) => (
                <div key={i} style={{ width: 44, height: 28, borderRadius: 5, background: i < packed ? DL.gold : DL.panel2, opacity: i < packed ? 1 - forget * (i % 7 === 0 ? 0 : 0.85) : 1 }} />
              ))}
            </div>
          </div>
          <div style={{ ...rise(f, REMEMBER - 4), fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.15, color: DL.text }}>
            …and less of it <span style={{ color: DL.gold, fontStyle: 'italic' }}>remembered.</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── part 2: memories, the holiday paradox */}
      <AbsoluteFill style={{ opacity: p2 }}>
        <div style={{ ...rise(f, BRAIN), position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 80, color: DL.text }}>
          Your brain measures time in <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, MEM - 4, MEM + 6) }}>memories.</span>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 420, display: 'flex', justifyContent: 'center', opacity: ease(f, CLOCK1 - 4, CLOCK1 + 6) * clockOut }}>
          <div style={{ position: 'relative' }}>
            <ClockFace size={200} hourDeg={300} minDeg={f * 6} />
            <div style={{ position: 'absolute', left: -20, right: -20, top: '50%', height: 10, background: DL.red, borderRadius: 5, transform: `rotate(-35deg) scaleX(${clockStrike})` }} />
          </div>
        </div>
        <div style={{ ...rise(f, HOLIDAY - 4), position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center', fontFamily: DL_MONO, fontSize: 28, letterSpacing: 8, color: DL.red }}>THE HOLIDAY PARADOX</div>
        <div style={{ position: 'absolute', left: 160, top: 440, width: 1600 }}>
          <div style={{ ...rise(f, WEEK - 6) }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>ONE WEEK OF NEW · <span style={{ color: DL.gold }}>FEELS LONG</span></div>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              {NOVEL.map((c, i) => (
                <div key={i} style={{ width: 214, height: 120, borderRadius: 12, background: `${c}33`, border: `3px solid ${c}`, opacity: ease(f, WEEK + i * WEEK_STEP, WEEK + 8 + i * WEEK_STEP) }} />
              ))}
            </div>
          </div>
          <div style={{ ...rise(f, MONTHS - 6), marginTop: 60 }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.muted }}>MONTHS OF ROUTINE · <span style={{ color: DL.red }}>COLLAPSE</span></div>
            <div style={{ display: 'flex', gap: 6 * (1 - collapse), marginTop: 16, width: 1600 * (1 - collapse * 0.9), overflow: 'hidden' }}>
              {Array.from({ length: 40 }, (_, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0, height: 120, borderRadius: 6, background: DL.panel2, border: `2px solid ${DL.border}` }} />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── part 3: every century made the hour more uniform */}
      <AbsoluteFill style={{ opacity: p3 }}>
        <div style={{ ...rise(f, EVERY - 4), position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 76, color: DL.text }}>
          Every century fit <span style={{ color: DL.gold, fontStyle: 'italic', opacity: ease(f, MORE - 2, MORE + 8) }}>more into an hour.</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 360, width: 1600, display: 'flex', gap: 4 }}>
          {Array.from({ length: 60 }, (_, i) => {
            const c = NOVEL[i % NOVEL.length];
            const gray = sameness;
            return <div key={i} style={{ flex: 1, height: 150, borderRadius: 4, background: gray > (i % 5) / 5 + 0.01 ? DL.panel2 : `${c}55`, border: `1px solid ${DL.border}` }} />;
          })}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 528, width: 1600, display: 'flex', justifyContent: 'space-between', fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>
          <span>0 MIN</span><span>ONE HOUR</span><span>60 MIN</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 620, width: 1600, display: 'flex', justifyContent: 'space-between' }}>
          {ITEMS.map(([label, at]) => {
            const s = interpolate(f, [at, at + 7], [1.4, 1], { ...DCLAMP, easing: DL_EASE.out });
            return (
              <div key={label} style={{ opacity: ease(f, at, at + 5), transform: `scale(${s})`, padding: '16px 22px', border: `2px solid ${DL.gold}`, borderRadius: 10, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.gold }}>{label}</div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 60, color: DL.text }}>
          <span style={{ opacity: ease(f, INVENTION - 4, INVENTION + 8) }}>Each one saved time.</span> <span style={{ color: DL.dim, fontStyle: 'italic', opacity: ease(f, MADE - 4, MADE + 8) }}>Each one made our hours look more alike.</span>
        </div>
      </AbsoluteFill>

      {/* ── part 4: the compression */}
      <AbsoluteFill style={{ opacity: p4, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rise(f, COMP - 4), fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, color: DL.text }}>That is the compression.</div>
        <div style={{ ...rise(f, NOT - 2), fontFamily: DL_SERIF, fontSize: 72, color: DL.faint, marginTop: 40, textDecoration: f > NOT + 18 ? 'line-through' : 'none', textDecorationColor: DL.red }}>Not of the clock.</div>
        <div style={{ ...rise(f, EXPER - 4), marginTop: 26, height: 150, display: 'flex', justifyContent: 'center', width: 1400 }}>
          <Squeeze text="Of experience." at={EXPER + 8} size={130} amount={0.3} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default TcReveal;
