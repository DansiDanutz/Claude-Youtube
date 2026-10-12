import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SchoolLadder, schoolRungs, SCHOOL_FULL, PeopleRow, Kid, Label, Source, win, QGRAD } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 11/14 — the answer (RESEARCH F1, F3). THE ANSWER from frame 0 (pulse on "answer"). SCHOOL on "School",
// a Greek column on "Greek", σχολή · scholé on "skoh-LAY", "= FREE TIME" (logo gradient) lands on "free", LEISURE on
// "Leisure" (LSJ). Athens: three speakers with TALKING · ARGUING · LEARNING on their words; the chain σχολή → schola →
// SCHOOL on "became"/"place". The guess (F3, OWID): ten figures, ONE lights on "one", 1820 ≈ 12 % on "read."; NINE
// light on "nine", 2022: 87 % on "ten." (2nd); HOW CLOSE WERE YOU? on "How". The walk-back: the full ladder appears
// dim on "climb", a pointer climbs, each rung lights on its word (few · Bible · order · hundreds · ladder · off).
// Payoff (right column): the σχολή = FREE TIME card stays; "School started as free time, for a lucky few." · "Now
// it's where most children on Earth spend their weekdays." (riser ends on "Now"). The ladder dims to 0.6 and stays:
// Sc2100 grows from it. VO sc10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'ScReveal', durationInSeconds: 53.7333, fps: 30, width: 1920, height: 1080 };
const DUR = 1612;

const C = makeCue(vo, 'sc10-reveal', 0.8);
const ANSWER = C.at('answer');
const SCHOOL1 = C.at('School', 1);
const GREEK = C.at('Greek');
const SKOLE = C.at('skoh-LAY');
const MEANT = C.at('meant');
const FREE1 = C.at('free', 1);
const LEISURE = C.at('Leisure');
const ATHENS = C.at('Athens');
const TALKING = C.at('talking');
const ARGUING = C.at('arguing');
const LEARNING = C.at('learning');
const WORD2 = C.at('word', 2); // 'So the word for free time'
const BECAME = C.at('became');
const PLACE = C.at('place');
const LEARN = C.at('learn');
const AND2 = C.at('And', 2); // 'And your guess?'
const GUESS = C.at('guess');
const TWO = C.at('Two');
const ONE = C.at('one');
const READ1 = C.at('read', 1); // 'could read.'
const TODAY1 = C.at('Today', 1);
const NINE = C.at('nine');
const TEN2 = C.at('ten', 2); // 'nine in ten.'
const HOW = C.at('How');
const CLIMB = C.at('climb');
const ME = C.at('me');
const FIFTEEN = C.at('fifteen');
const LIT = [C.at('few', 1), C.at('Bible'), C.at('order'), C.at('hundreds'), C.at('ladder', 2), C.at('off')];
const SCHOOL3 = C.at('School', 3); // 'School started as free time'
const FREE4 = C.at('free', 4);
const LUCKY = C.at('lucky');
const FEW2 = C.at('few', 2);
const NOW2 = C.at('Now', 2); // 'Now it's where most children…' (1 = 'Now climb')
const MOST = C.at('most');
const WEEKDAYS = C.at('weekdays');

const RIGHT_COL = { left: 1120, width: 640 } as const;
const LADDER_DIM = 0.6;
const RUNG_CENTRE_Y = (i: number) => SCHOOL_FULL.top + SCHOOL_FULL.kick + 8 + (6 - i) * (SCHOOL_FULL.rungH + SCHOOL_FULL.gap) + SCHOOL_FULL.rungH / 2;

const Column: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 100 140"><rect x={10} y={4} width={80} height={14} fill="#d8cfb8" /><rect x={20} y={18} width={60} height={8} fill="#c8bfa8" />{[28, 42, 56, 70].map((x) => <rect key={x} x={x - 4} y={26} width={8} height={98} fill="#e8e0cc" />)}<rect x={14} y={124} width={72} height={14} fill="#d8cfb8" /></svg>
);

// the word card: σχολή = FREE TIME — built on the words, then it moves to the right column and stays
const WordCard: React.FC<{ f: number }> = ({ f }) => {
  const move = ease(f, AND2 - 10, AND2 + 8, 0, 1, DL_EASE.inOut);
  const x = 560 + (RIGHT_COL.left - 560) * move, y = 300 + (150 - 300) * move, s = 1 - 0.32 * move;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transformOrigin: 'top left', transform: `scale(${s})`, width: 900, opacity: ease(f, SKOLE - 4, SKOLE + 6) }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 30 }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 150, color: DL.text }}>σχολή</span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.dim }}>scholé</span>
      </div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 26 }}>
        <span style={{ fontFamily: DL_SERIF, fontSize: 120, opacity: ease(f, FREE1 - 2, FREE1 + 4), transform: `scale(${ease(f, FREE1 - 2, FREE1 + 10, 1.25, 1)})`, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 24px ${DYT.magenta}88)` }}>= FREE TIME</span>
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 18, alignItems: 'center' }}>
        <span style={{ opacity: ease(f, LEISURE - 2, LEISURE + 6), padding: '10px 20px', borderRadius: 10, border: `2px solid ${DYT.orange}`, fontFamily: DL_MONO, fontSize: 30, color: DYT.orange }}>LEISURE</span>
        <span style={{ opacity: ease(f, LEISURE, LEISURE + 10), fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>Liddell–Scott–Jones Greek Lexicon</span>
      </div>
    </div>
  );
};

const Pointer: React.FC<{ f: number }> = ({ f }) => {
  const pos = LIT.slice(1).reduce((p, at) => p + ease(f, at - 8, at, 0, 1, DL_EASE.inOut), 0);
  const op = ease(f, FIFTEEN - 2, FIFTEEN + 6) * (1 - ease(f, SCHOOL3 - 4, SCHOOL3 + 6));
  return (
    <svg width={30} height={36} viewBox="0 0 30 36" style={{ position: 'absolute', left: SCHOOL_FULL.left + SCHOOL_FULL.width + 8, top: RUNG_CENTRE_Y(pos) - 18, opacity: op }}>
      <path d="M2 18 L28 2 L28 34 Z" fill={DL.gold} style={{ filter: `drop-shadow(0 0 8px ${DL.gold})` }} />
    </svg>
  );
};

const ScReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const intro = win(f, 0, ATHENS, 1, 8);
  const athens = win(f, ATHENS - 2, AND2 - 6, 6, 10);
  const guess = win(f, AND2 - 2, CLIMB + 6, 6, 10);
  const ladderShow = ease(f, CLIMB, CLIMB + 12) * (1 - (1 - LADDER_DIM) * ease(f, NOW2 - 6, NOW2 + 8));
  const glow = ease(f, NOW2 - 41, NOW2, 0, 1, DL_EASE.in) * (1 - 0.5 * ease(f, NOW2 + 10, NOW2 + 40));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 18 + 3 * ease(f, 0, 90, 0, 1, DL_EASE.inOut), color: DL.red, opacity: ease(f, -6, 0) * (1 - ease(f, CLIMB - 10, CLIMB)), transform: `scale(${1 + 0.15 * ease(f, ANSWER, ANSWER + 4) * (1 - ease(f, ANSWER + 6, ANSWER + 20))})` }}>THE ANSWER</div>

      {/* SCHOOL ← an ancient Greek word */}
      <AbsoluteFill style={{ opacity: intro }}>
        <div style={{ position: 'absolute', left: 200, top: 300, opacity: ease(f, GREEK - 4, GREEK + 8) }}><Column size={180} /></div>
        <div style={{ ...rise(f, SCHOOL1 - 2), position: 'absolute', left: 200, top: 200, fontFamily: DL_SERIF, fontWeight: 600, fontSize: 90, color: DL.text, opacity: ease(f, SCHOOL1 - 2, SCHOOL1 + 6) * (1 - ease(f, SKOLE - 4, SKOLE + 4)) }}>SCHOOL ←</div>
        <div style={{ position: 'absolute', left: 200, top: 580 }}><Label at={GREEK} color={DL.dim} size={28}>AN ANCIENT GREEK WORD</Label></div>
        <div style={{ position: 'absolute', left: 200, top: 630 }}><Label at={MEANT} color={DL.text} size={30}>AND IT MEANT…</Label></div>
      </AbsoluteFill>
      {/* Athens: free time spent talking, arguing, learning → the word for the place you learn */}
      <AbsoluteFill style={{ opacity: athens }}>
        <div style={{ position: 'absolute', left: 200, top: 730, display: 'flex', gap: 60, alignItems: 'flex-end' }}>
          {([['TALKING', TALKING], ['ARGUING', ARGUING], ['LEARNING', LEARNING]] as const).map(([t, at], i) => (
            <div key={t} style={{ textAlign: 'center' }}>
              <div style={{ opacity: ease(f, ATHENS + i * 6, ATHENS + i * 6 + 8) }}><Kid size={90} adult color="#d8cfb8" /></div>
              <div style={{ marginTop: 6, fontFamily: DL_MONO, fontSize: 26, color: DL.gold, opacity: ease(f, at - 2, at + 6) }}>{t}</div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 200, top: 680 }}><Label at={ATHENS} color={DL.dim} size={28}>IN ATHENS, PEOPLE WITH FREE TIME…</Label></div>
        <div style={{ position: 'absolute', left: 900, top: 780, display: 'flex', alignItems: 'baseline', gap: 22, fontFamily: DL_SERIF, fontSize: 64 }}>
          <span style={{ opacity: ease(f, WORD2 - 4, WORD2 + 6), color: DL.text }}>σχολή</span>
          <span style={{ opacity: ease(f, BECAME + 4, BECAME + 12), color: DL.dim }}>→ schola</span>
          <span style={{ opacity: ease(f, PLACE - 2, PLACE + 6), color: DL.gold, fontWeight: 600 }}>→ SCHOOL</span>
        </div>
        <div style={{ position: 'absolute', left: 900, top: 880 }}><Label at={LEARN} color={DL.dim} size={26}>THE WORD FOR THE PLACE YOU LEARN</Label></div>
      </AbsoluteFill>
      <WordCard f={f} />

      {/* the guess */}
      <AbsoluteFill style={{ opacity: guess }}>
        <div style={{ position: 'absolute', left: 200, top: 260 }}><Label at={GUESS} color={DYT.magenta} size={32}>YOUR GUESS · <span style={{ opacity: ease(f, TWO - 2, TWO + 6) }}>200 YEARS AGO · OUT OF 10</span></Label></div>
        <div style={{ position: 'absolute', left: 200, top: 340 }}><PeopleRow n={10} size={72} gap={14} lit={(i) => (i === 0 ? ease(f, ONE - 2, ONE + 6) : f >= NINE ? ease(f, NINE + (i - 1) * 2, NINE + (i - 1) * 2 + 6) * (i < 9 ? 1 : 0) : 0)} /></div>
        <div style={{ position: 'absolute', left: 200, top: 490, display: 'flex', gap: 60 }}>
          <div style={{ opacity: ease(f, READ1 - 2, READ1 + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.gold }}>1820 ≈ 12 %</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>ABOUT 1 IN 10</div>
          </div>
          <div style={{ opacity: ease(f, TEN2 - 2, TEN2 + 8) }}>
            <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 60, color: DL.green }}>2022: 87 %</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 26, color: DL.dim }}>ALMOST 9 IN 10</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 200, top: 660 }}><Label at={TODAY1} color={DL.text} size={30}>ADULTS WHO CAN READ</Label></div>
        <div style={{ position: 'absolute', left: 200, top: 730, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 70, color: DYT.magenta, opacity: ease(f, HOW - 2, HOW + 6), transform: `scale(${1 + 0.08 * ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22))})`, transformOrigin: 'left center' }}>How close were you?</div>
        <div style={{ position: 'absolute', left: 200, top: 860 }}><Source at={READ1}>Our World in Data · van Zanden et al. 2014 (OECD How Was Life?) · UNESCO</Source></div>
      </AbsoluteFill>

      {/* the walk-back */}
      <SchoolLadder rungs={schoolRungs(6)} show={ladderShow} mode="full" litAt={LIT} glowAt={SCHOOL3} />
      <Pointer f={f} />
      <div style={{ position: 'absolute', left: SCHOOL_FULL.left, top: 96, opacity: ease(f, CLIMB, CLIMB + 10) * (1 - ease(f, FIFTEEN - 6, FIFTEEN + 4)) }}><Label at={CLIMB} color={DL.gold} size={30}>NOW CLIMB IT AGAIN, WITH ME<span style={{ opacity: ease(f, ME - 2, ME + 6) }}> ↑</span></Label></div>

      {/* payoff, right column under the word card */}
      <div style={{ position: 'absolute', left: RIGHT_COL.left, top: 470, width: RIGHT_COL.width, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1.15, color: DL.text }}>
          <span style={{ opacity: ease(f, SCHOOL3 - 2, SCHOOL3 + 6) }}>School started as </span><span style={{ opacity: ease(f, FREE4 - 2, FREE4 + 6), background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>free time,</span>
          <span style={{ opacity: ease(f, LUCKY - 2, LUCKY + 6), color: DL.dim }}> for a lucky few.</span>
        </div>
        <div style={{ width: 360 * ease(f, NOW2 - 2, NOW2 + 14, 0, 1, DL_EASE.inOut), height: 3, borderRadius: 2, background: DL.gold, boxShadow: `0 0 12px ${DL.gold}` }} />
        <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 66, lineHeight: 1.12, color: DL.gold, textShadow: `0 0 ${36 * glow}px ${DL.gold}` }}>
          <span style={{ opacity: ease(f, NOW2 - 2, NOW2 + 6) }}>Now it’s where </span><span style={{ opacity: ease(f, MOST - 2, MOST + 6) }}>most children on Earth</span><span style={{ opacity: ease(f, WEEKDAYS - 2, WEEKDAYS + 6) }}> spend their weekdays.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: RIGHT_COL.left, top: 860, opacity: ease(f, FEW2, FEW2 + 10) }}><Source at={FEW2}>1.4 billion children enrolled, 2024 · UNESCO 2026 GEM Report</Source></div>
    </AbsoluteFill>
  );
};
export default ScReveal;
