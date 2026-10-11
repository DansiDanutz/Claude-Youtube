import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { SunDisc, SunChip, LightBeam, ArcLadder, pastRungs, win, SUN } from '../../lib/dykkit-sun';
import vo from './vo.json';

// =============================================================================
// DYK 02 · 11/14 — the answer (RESEARCH F1, F17). v2 re-key to the new voice.
// THE ANSWER from frame 0 (pulse on "answer"); LIGHT IS FAST / BUT NOT INSTANT on their words;
// the photon crosses from "takes" (8 MIN 20 S on "twenty", 150 MILLION KM on "fifty"); the
// sunrise caption builds to "already old" on "old". "And the energy inside it?" = the beam's Sun
// pulses magenta. Cut-away Sun on "made", core glows on "core", random walk from "spent",
// NASA ESTIMATE · OTHERS VARY note on "NASA", ≈ 170,000 counts from "hundred", NO FARMS /
// NO CITIES / NO WRITING on their words. "How close was your answer?" = the welcome's
// "? old" chip returns and flips to ≈ 170,000 YEARS · NASA estimate on "answer".
// The walk-back: the full ArcLadder (left half) appears dim on "climb", the Sun disc (right)
// on "me", a pointer climbs from "fifteen", each rung lights on its word; a light sweep passes
// the unchanged Sun on "Sun"; the ladder glows once on "did". Payoff on the right: "You have
// never seen / the Sun as it is." · "Only as it was," (riser ends on "Only"; the line lands there) · 8 MIN AGO on
// "eight". The ladder stays on screen (dimmed) to the last frame: Su2100 grows from it.
// VO su10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'SuReveal', durationInSeconds: 52.7, fps: 30, width: 1920, height: 1080 };
const DUR = 1581;

const C = makeCue(vo, 'su10-reveal', 0.8);
const ANSWER = C.at('answer', 1);
const FAST = C.at('fast');
const INSTANT = C.at('instant');
const IT = C.at('It', 1); // 'It takes about eight minutes' — the photon sets off here
const TWENTY = C.at('twenty');
const FIFTY = C.at('fifty');
const KM = C.at('kilometres');
const AGO = C.at('ago');
const EVERY = C.at('Every');
const YOUVE = C.at("you've"); // 'you've ever watched:' reveals on "you've"
const OLD = C.at('old');
const SET = C.at('set'); // 'When it set out' — the random walk breaks the surface
const ENERGY = C.at('energy');
const AND_ENERGY = C.at('And', 3); // 'And the energy inside it?' (1 'and twenty seconds' · 2 'a hundred and fifty')
const NEVER = C.at('never');
const SEEN = C.at('seen');
const MADE = C.at('made');
const DEEP = C.at('deep');
const CORE = C.at('core');
const SPENT = C.at('spent');
const STRUGGLING = C.at('struggling');
const OUT = C.at('out', 1);
const NASA = C.at('NASA');
const HUNDRED = C.at('hundred', 2); // 'a hundred and seventy thousand' (1 = 'a hundred and fifty million')
const THOUSAND = C.at('thousand');
const YEARS = C.at('years');
const WHEN = C.at('When');
const FARMS = C.at('farms');
const CITIES = C.at('cities');
const WRITING = C.at('writing');
const HOW = C.at('How');
const ANSWER2 = C.at('answer', 2); // 'How close was your answer?'
const FLIP = C.at('answer', 2, 'e'); // the card flips at the END of "answer"
const CARD_IN = WRITING + 8; // the "? old" card returns right after "writing" (holds ≥ 1.5 s before the flip)
const LIGHT = C.at('Light');
const CLIMB = C.at('climb');
const ME = C.at('me');
const FIFTEEN = C.at('fifteen');
// each rung lights on its word: night. · watch. · explain. · measure. · lunch. (EVERY MEAL) · power. (TODAY)
const LIT = [C.at('night'), C.at('watch'), C.at('explain'), C.at('measure'), C.at('lunch'), C.at('power')];
const SUN2 = C.at('Sun', 2); // 'The Sun didn't change.' (1 = 'the Sun was day and night')
const CHANGE = C.at('change');
const DID = C.at('did');
const YOU = C.at('You');
const SUN3 = C.at('Sun', 3); // 'never seen the Sun as it is'
const ONLY = C.at('Only');
const WAS_PAYOFF = C.at('was', 6); // (2026-10-12: the payoff line + glow now land on "Only", where the riser ends) // 'Only as it was,' (1 already old · 2 made · 3 your answer · 4 day and night · 5 your lunch)
const EIGHT2 = C.at('eight', 2); // 'eight minutes ago' (1 = 'about eight minutes and twenty seconds')

// the walk-back layout: ladder in the left half (ArcLadder full defaults), Sun + answer on the right
const LADDER_LEFT = 160;
const LADDER_TOP = 170;
const RUNG_CENTRE_Y = (i: number) => LADDER_TOP + 34 + (6 - i) * 94 + 41; // ArcLadder full geometry
const RIGHT_COL = { left: 1120, width: 640, centre: 1440 } as const;
const SUN_SIZE = 240;
const SUN_CENTRE_Y = 356;
const LADDER_DIM = 0.6; // the payoff dims the ladder; Su2100 starts from this exact state

const WALK_LAST = 8; // final steps drawn on "set" (the light breaks the surface)
// deterministic random walk from the core outward
const WALK = (() => {
  const pts: [number, number][] = [[0, 0]];
  let x = 0, y = 0;
  for (let i = 1; i < 90; i++) {
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const ang = (a - Math.floor(a)) * Math.PI * 2;
    const r = Math.hypot(x, y);
    x += Math.cos(ang) * 16 + (r > 0 ? (x / r) * 2.2 : 0);
    y += Math.sin(ang) * 16 + (r > 0 ? (y / r) * 2.2 : 0);
    pts.push([x, y]);
  }
  return pts;
})();

// ── beat 1: light is fast, not instant · every sunrise was already old · "and the energy inside it?"
const LightIsOld: React.FC<{ f: number }> = ({ f }) => {
  const photon = interpolate(f, [IT, KM], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const ask = ease(f, ENERGY - 2, ENERGY + 8);
  const pulse = ask * (0.5 + 0.5 * Math.sin((f - ENERGY) / 5));
  return (
    <AbsoluteFill style={{ opacity: win(f, 0, MADE + 4, 1, 10) }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 220, display: 'flex', justifyContent: 'center', gap: 40 }}>
        <SunChip text="LIGHT IS FAST" at={FAST} color={DL.text} size={34} />
        <SunChip text="BUT NOT INSTANT" at={INSTANT} color={DL.red} size={34} />
      </div>
      <div style={{ position: 'absolute', left: 210, top: 400 }}>
        <LightBeam w={1500} progress={photon} at={-10} label={f >= FIFTY ? '150 MILLION KM' : ''} />
      </div>
      {/* from "Here's": a soft halo breathes round the beam's Sun (slow motion until the photon leaves) */}
      <svg width={260} height={260} viewBox="-130 -130 260 260" style={{ position: 'absolute', left: 310 - 130, top: 490 - 130, opacity: 0.45 * (1 - ease(f, ENERGY - 6, ENERGY)) }}>
        <circle r={86 + 10 * Math.sin(f / 14)} fill="none" stroke={SUN.mid} strokeWidth={3} opacity={0.5 + 0.3 * Math.sin(f / 14)} />
      </svg>
      {/* "Light": a glint runs along the empty beam */}
      <div style={{ position: 'absolute', left: 330 + 1320 * ease(f, LIGHT - 2, LIGHT + 22, 0, 1, DL_EASE.inOut) - 40, top: 488, width: 80, height: 4, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${SUN.core}, transparent)`, boxShadow: `0 0 14px ${SUN.mid}`, opacity: ease(f, LIGHT - 2, LIGHT + 2) * (1 - ease(f, LIGHT + 18, LIGHT + 24)) }} />
      {/* the beam's Sun pulses on "energy": what is inside it? */}
      <svg width={260} height={260} viewBox="-130 -130 260 260" style={{ position: 'absolute', left: 310 - 130, top: 490 - 130, opacity: ask }}>
        <circle r={84 + 14 * pulse} fill="none" stroke={DYT.magenta} strokeWidth={4} opacity={0.5 + 0.5 * pulse} />
      </svg>
      {/* the photon reaches you on "kilometres": a ring flashes round the Earth */}
      <svg width={160} height={160} viewBox="-80 -80 160 160" style={{ position: 'absolute', left: 210 + 1440 - 80, top: 490 - 80, opacity: ease(f, KM - 2, KM + 4) * (1 - ease(f, KM + 14, KM + 30)) }}>
        <circle r={30 + 34 * ease(f, KM - 2, KM + 24)} fill="none" stroke={SUN.core} strokeWidth={4} />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 90, color: SUN.mid, opacity: ease(f, TWENTY - 2, TWENTY + 6) }}>8 MIN 20 S</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 780, display: 'flex', justifyContent: 'center', opacity: ease(f, EVERY - 2, EVERY + 6) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px', borderRadius: 12, background: DL.panel, border: `1px solid ${DL.border}`, fontFamily: DL_SERIF, fontSize: 46 }}>
          <span style={{ color: DL.text }}>every sunrise</span>
          <span style={{ color: DL.text, opacity: ease(f, YOUVE - 4, YOUVE + 4) }}>you&apos;ve ever watched:</span>
          <span style={{ fontStyle: 'italic', color: SUN.mid, opacity: ease(f, OLD - 2, OLD + 6) }}>already old</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// held past the cut to "made" (+10 frames) so it reads ≥ 1.5 s
const EnergyAsk: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: 892, textAlign: 'center', fontFamily: DL_MONO, fontSize: 32, letterSpacing: 5, color: DYT.magenta, opacity: ease(f, AND_ENERGY - 4, AND_ENERGY + 8) * (1 - ease(f, MADE + 8, MADE + 16)), transform: `translateY(${ease(f, AND_ENERGY - 4, AND_ENERGY + 10, 20, 0)}px)` }}>AND THE ENERGY INSIDE IT?</div>
);

// ── beat 2 (left): the cut-away Sun, the core, the random walk out
const CutAwaySun: React.FC<{ f: number }> = ({ f }) => {
  const coreGlow = ease(f, CORE - 2, CORE + 10);
  const peel = ease(f, MADE, DEEP + 14);
  const walkN = Math.round(interpolate(f, [SPENT - 2, OUT + 4, SET - 6, SET + 2], [0, WALK.length - WALK_LAST, WALK.length - WALK_LAST, WALK.length], DCLAMP));
  const [ex, ey] = WALK[WALK.length - 1];
  const burst = ease(f, SET, SET + 6) * (1 - ease(f, SET + 30, SET + 50));
  return (
    <svg width={760} height={760} viewBox="-380 -380 760 760" style={{ position: 'absolute', left: 160, top: 150, opacity: win(f, MADE, CARD_IN, 6, 10), transform: `scale(${ease(f, MADE - 6, MADE + 12, 0.8, 1)})` }}>
      <circle r={330} fill={SUN.rim} opacity={0.85 - 0.45 * peel} />
      <circle r={250} fill={SUN.mid} opacity={0.9 - 0.4 * peel} />
      <circle r={110} fill={SUN.core} style={{ filter: `drop-shadow(0 0 ${40 * coreGlow}px #fff)` }} />
      <text x={0} y={8} textAnchor="middle" fill="#7a3b00" fontFamily={DL_MONO} fontSize={26} letterSpacing={4} opacity={coreGlow}>CORE</text>
      <polyline points={WALK.slice(0, walkN).map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="#3a1a06" strokeWidth={4} strokeLinejoin="round" />
      <circle cx={ex} cy={ey} r={10 + 30 * ease(f, SET, SET + 24)} fill="none" stroke={SUN.core} strokeWidth={4} opacity={burst} />
      <circle cx={ex} cy={ey} r={8} fill={SUN.core} opacity={ease(f, SET, SET + 4)} style={{ filter: `drop-shadow(0 0 10px ${SUN.core})` }} />
    </svg>
  );
};

// ── beat 2 (right): made in the core · struggling out · NASA ≈ 170,000 years · when it set out
const CoreFacts: React.FC<{ f: number }> = ({ f }) => {
  const landed = f >= THOUSAND; // no number at all until "thousand": "≈ ——" placeholder while it is spoken
  const counterOut = 1 - ease(f, FLIP - 22, FLIP - 14); // gone before the card's flip begins
  return (
    <div style={{ position: 'absolute', left: 1000, top: 210, width: 760, display: 'flex', flexDirection: 'column', gap: 22, opacity: win(f, MADE, CLIMB, 6, 10) }}>
      <SunChip text="MADE IN THE CORE" at={CORE} color={SUN.mid} size={28} />
      <SunChip text="STRUGGLING TO GET OUT" at={STRUGGLING} color={SUN.rim} size={28} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, opacity: counterOut }}>
      <div style={{ ...rise(f, NASA - 2), fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim }}>NASA ESTIMATE · OTHERS VARY</div>
      <div style={{ marginTop: -8, fontFamily: DL_SERIF, fontSize: 116, lineHeight: 1, color: DL.text, fontVariantNumeric: 'tabular-nums', opacity: ease(f, HUNDRED - 4, HUNDRED + 4), transform: `scale(${landed ? ease(f, THOUSAND, THOUSAND + 8, 1.08, 1) : 1})`, transformOrigin: 'left center' }}>≈ {landed ? '170,000' : <span style={{ color: DL.dim, opacity: 0.5 + 0.5 * Math.sin(f / 3) }}>——</span>}</div>
      <div style={{ marginTop: -6, fontFamily: DL_MONO, fontSize: 30, letterSpacing: 4, color: SUN.mid, opacity: ease(f, YEARS - 2, YEARS + 6) }}>YEARS · CORE → SURFACE</div>
      </div>
      <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 26, letterSpacing: 3, color: DL.dim, opacity: ease(f, WHEN - 2, WHEN + 6) }}>WHEN IT SET OUT:</div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {([['NO FARMS', FARMS], ['NO CITIES', CITIES], ['NO WRITING', WRITING]] as const).map(([t, at]) => <SunChip key={t} text={t} at={at} color={DL.red} size={26} />)}
      </div>
    </div>
  );
};

// ── "How close was your answer?": the welcome's "? years old" card returns, flips on "answer",
// then moves under the Sun on the right (where it holds through the walk-back).
const AnswerCard: React.FC<{ f: number }> = ({ f }) => {
  const move = ease(f, CLIMB - 8, CLIMB + 10, 0, 1, DL_EASE.inOut);
  const oldFace = 1 - ease(f, FLIP - 5, FLIP);
  const newFace = ease(f, FLIP, FLIP + 6);
  const flipped = f >= FLIP;
  const nudge = 1 + 0.08 * ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22)); // pulse on "How"
  return (
    <div style={{ position: 'absolute', left: 200 + (RIGHT_COL.left - 200) * move, top: 380 + (560 - 380) * move, width: RIGHT_COL.width, height: 220, boxSizing: 'border-box', padding: '28px 36px', borderRadius: 20, background: '#0b1030e6', border: `2px solid ${flipped ? SUN.mid : DYT.magenta}`, opacity: ease(f, CARD_IN - 4, CARD_IN + 6) * (1 - ease(f, YOU - 6, YOU + 4)), transform: `translateY(${ease(f, CARD_IN - 4, CARD_IN + 10, 22, 0)}px) scale(${nudge})` }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 4, color: DYT.dim }}>THE ENERGY INSIDE IT</div>
      {!flipped && <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1, color: DYT.magenta, transform: `scaleY(${oldFace})`, transformOrigin: 'center' }}>? old</div>}
      {flipped && (
        <div style={{ transform: `scaleY(${newFace})`, transformOrigin: 'center' }}>
          <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontSize: 70, lineHeight: 1, color: SUN.mid, whiteSpace: 'nowrap' }}>≈ 170,000 YEARS</div>
          <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>NASA estimate · others vary</div>
        </div>
      )}
    </div>
  );
};

// ── the walk-back: pointer climbs the rungs; the Sun on the right stays identical (a light sweep only)
const Pointer: React.FC<{ f: number }> = ({ f }) => {
  const pos = LIT.slice(1).reduce((p, at) => p + ease(f, at - 8, at, 0, 1, DL_EASE.inOut), 0);
  const y = RUNG_CENTRE_Y(pos);
  const op = ease(f, FIFTEEN - 2, FIFTEEN + 6) * (1 - ease(f, CHANGE - 4, CHANGE + 6));
  return (
    <svg width={30} height={36} viewBox="0 0 30 36" style={{ position: 'absolute', left: LADDER_LEFT + 900 + 8, top: y - 18, opacity: op }}>
      <path d="M2 18 L28 2 L28 34 Z" fill={DL.gold} style={{ filter: `drop-shadow(0 0 8px ${DL.gold})` }} />
    </svg>
  );
};

const ConstantSun: React.FC<{ f: number }> = ({ f }) => {
  const sweep = interpolate(f, [SUN2 - 4, CHANGE + 16], [-1.4, 1.4], DCLAMP);
  const sweepOp = ease(f, SUN2 - 4, SUN2 + 2) * (1 - ease(f, CHANGE + 10, CHANGE + 16));
  const r = SUN_SIZE / 2;
  const rise2 = ease(f, ONLY - 41, ONLY, 0, 1, DL_EASE.in) * (1 - 0.5 * ease(f, WAS_PAYOFF + 10, WAS_PAYOFF + 40)); // brightens under the riser
  return (
    <div style={{ position: 'absolute', left: RIGHT_COL.centre - SUN_SIZE * 0.9, top: SUN_CENTRE_Y - SUN_SIZE * 0.9, opacity: ease(f, ME - 4, ME + 10) }}>
      <div style={{ transform: `scale(${1 + 0.05 * rise2})`, filter: `brightness(${1 + 0.35 * rise2})` }}><SunDisc size={SUN_SIZE} glow={1 + 0.8 * rise2} id="revSun" /></div>
      <div style={{ position: 'absolute', left: SUN_SIZE * 0.9 - r, top: SUN_SIZE * 0.9 - r, width: SUN_SIZE, height: SUN_SIZE, borderRadius: '50%', overflow: 'hidden', opacity: sweepOp }}>
        <div style={{ position: 'absolute', top: -SUN_SIZE * 0.25, height: SUN_SIZE * 1.5, width: SUN_SIZE * 0.35, left: r + sweep * SUN_SIZE - SUN_SIZE * 0.175, transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, #ffffffaa, transparent)' }} />
      </div>
    </div>
  );
};

// ── payoff (right column, under the Sun)
const Payoff: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', left: RIGHT_COL.left, top: 520, width: RIGHT_COL.width, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <div style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 60, lineHeight: 1.15, color: DL.text }}>
      <div><span style={{ opacity: ease(f, YOU - 4, YOU + 4) }}>You have </span><span style={{ opacity: ease(f, NEVER - 4, NEVER + 4) }}>never </span><span style={{ opacity: ease(f, SEEN - 4, SEEN + 4) }}>seen</span></div>
      <div style={rise(f, SUN3 - 2, 18)}>the Sun as it is.</div>
    </div>
    <div style={{ marginTop: 18, width: 360 * ease(f, ONLY - 2, ONLY + 14, 0, 1, DL_EASE.inOut), height: 3, borderRadius: 2, background: SUN.mid, boxShadow: `0 0 12px ${SUN.mid}` }} />
    <div style={{ marginTop: 14, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 88, lineHeight: 1.05, color: SUN.mid, whiteSpace: 'nowrap', opacity: ease(f, ONLY - 2, ONLY + 4), textShadow: `0 0 ${40 * ease(f, ONLY, ONLY + 20)}px ${SUN.rim}`, transform: `scale(${1 + 0.06 * ease(f, ONLY, ONLY + 5) * (1 - ease(f, ONLY + 8, ONLY + 24))})` }}>Only as it was,</div>
    <div style={{ ...rise(f, EIGHT2 - 2, 14), marginTop: 18, fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, letterSpacing: 6, color: DL.gold }}>8 MIN<span style={{ opacity: ease(f, AGO - 2, AGO + 6) }}> AGO</span></div>
  </div>
);

const SuReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ladderShow = ease(f, CLIMB + 10, CLIMB + 20) * (1 - (1 - LADDER_DIM) * ease(f, YOU - 6, YOU + 8));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 18 + 3 * ease(f, 0, 90, 0, 1, DL_EASE.inOut), color: DL.red, opacity: ease(f, -6, 0), transform: `scale(${1 + 0.15 * ease(f, ANSWER, ANSWER + 4) * (1 - ease(f, ANSWER + 6, ANSWER + 20))})` }}>THE ANSWER</div>

      <LightIsOld f={f} />
      <EnergyAsk f={f} />
      <CutAwaySun f={f} />
      <CoreFacts f={f} />

      {/* the walk-back: six rungs dim on "climb", each lights on its word, one glow on "did" */}
      <ArcLadder rungs={pastRungs(6)} show={ladderShow} mode="full" litAt={LIT} glowAt={DID} left={LADDER_LEFT} top={LADDER_TOP} />
      <Pointer f={f} />
      <ConstantSun f={f} />
      <AnswerCard f={f} />
      <Payoff f={f} />
    </AbsoluteFill>
  );
};
export default SuReveal;
