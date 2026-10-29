import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, Vignette } from '../../lib/dykkit';
import {
  LightLadder, lightRungs, LIGHT_ARC, LADDER_FULL, Label, Source, StampText, OnWord, TenPeople, NightSky,
  LightProp, PropTag, FLAME, hold, pane, type PropKind,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 11/14 — the answer (RESEARCH L11, L13). THE ANSWER pulses on "answer"; "We didn't save the light." with a
// small candle on "light."; "We spent it. All of it." on its words. "Every time light got cheaper" → a price line falls
// on "cheaper"; "we used more" → bulbs multiply on "more"; "until it filled the sky." → an orange skyglow rises over a
// night sky on "sky". The guess paid (L13): TenPeople on "ten", eight figures light on "eight" with the stamp MORE THAN
// 8 IN 10 + Falchi 2016 source; LIVE UNDER A SKY OUR LIGHTS HAVE BRIGHTENED (the skyglow brightens on "brightened");
// IN THE UNITED STATES AND EUROPE → ALMOST EVERYONE · > 99 %; How close were you? on "How". The walk-down: the full
// ladder (dim), each rung lit on its chip word (luxury, service, liquid, network, crystal, cheap) with a gold marker
// stepping to it (it appears on "fifteen", reaches TODAY on "today"); a prop per beat in the right column (candle on
// "luxury", gas pipe on "pipe", can on "can", bulb on "network", blue LED on "crystal", LIGHT WITHOUT FIRE, a switch on
// "switch"). Payoff (paused VO): "In 1500, the scarce thing was light." — light. glows ON "light" (the ladder glows);
// "Today, the scarce thing is the dark." — the dark. ON "dark", and the night sky comes back with its stars.
// The last rung uses the dock label (TOO CHEAP): the full chip text overflows the 900 px full-ladder rung. VO lt10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'LtReveal', durationInSeconds: 46.0333, fps: 30, width: 1920, height: 1080 };
const DUR = 1381;

const C = makeCue(vo, 'lt10-reveal', 0.8);
const ANSWER = C.at('answer.');
const WE1 = C.at('We', 1);
const DIDNT = C.at("didn't");
const SAVE = C.at('save');
const LIGHT1 = C.at('light.', 1); // 'save the light.' (6 = 'the scarce thing was light.')
const WE2 = C.at('We', 2);
const SPENT = C.at('spent');
const ALL = C.at('All');
const EVERY1 = C.at('Every', 1); // 'Every time' (2 = 'out of every ten')
const CHEAPER = C.at('cheaper,');
const USED = C.at('used');
const MORE1 = C.at('more,', 1); // 'we used more' (2 = 'more than eight')
const UNTIL = C.at('until');
const FILLED = C.at('filled');
const SKY1 = C.at('sky.', 1);
const SO = C.at('So,');
const GUESS = C.at('guess.');
const OUT = C.at('Out');
const TEN = C.at('ten');
const EARTH = C.at('Earth,');
const EIGHT = C.at('eight');
const UNDER = C.at('under');
const BRIGHTENED = C.at('brightened.');
const UNITED = C.at('United');
const EUROPE = C.at('Europe,');
const ALMOST = C.at('almost');
const EVERYONE = C.at('everyone.');
const HOW = C.at('How');
const NOW2 = C.at('Now', 2); // 'Now walk down' (1 = 'eight now live')
const WALK = C.at('walk');
const ME = C.at('me.');
const FIFTEEN1 = C.at('fifteen', 1);
const PIPE = C.at('pipe.');
const CAN = C.at('can.');
const WITHOUT = C.at('without');
const FIRE = C.at('fire.');
const TODAY1 = C.at('today,', 1); // 'And today,' (2 = 'Today, the scarce thing')
const SWITCH = C.at('switch');
const IN4 = C.at('In', 4); // 'In fifteen hundred, the scarce thing' (in: 1 United States, 2 1500 luxury, 3 in a can)
const SCARCE1 = C.at('scarce', 1);
const LIGHT6 = C.at('light.', 6);
const TODAY2 = C.at('Today,', 2);
const SCARCE2 = C.at('scarce', 2);
const DARK = C.at('dark.');
// each rung lights on its spoken chip word; the gold marker appears on "fifteen" and steps to each rung (TODAY on "today")
const LIT = [C.at('luxury.'), C.at('service,'), C.at('liquid,'), C.at('network.'), C.at('crystal,'), C.at('cheap')];
const LINE = [FIFTEEN1, LIT[1], LIT[2], LIT[3], LIT[4], TODAY1];

// panel boundaries: each panel holds its last reveal ≥ HOLD_F (kit `hold`); the cue table's H() uses the same numbers
const A_END = hold(SKY1, SO);
const B_END = hold(HOW, NOW2);
const WALK_AT = Math.max(WALK, B_END);
const ME_AT = Math.max(ME, B_END);
const LIGHT_BLUE_TEXT = '#8fb0ff'; // the LED's cold light, for LIGHT WITHOUT FIRE
const BULB_STEP = 3; // bulbs multiply: 12 bulbs, one per 3 f (one stream sound)

// the full chip text for rungs 1–5; the today chip is too long for a full rung, so it uses its dock label
const RUNGS = lightRungs(6, true).map((r, i) => (i === 5 ? { ...r, label: LIGHT_ARC[5].dock } : r));

// one prop per walk-down beat (right column, a 3 × 2 grid that fills in)
const BEATS: { kind: PropKind; name: string; at: number }[] = [
  { kind: 'tallow', name: 'CANDLE', at: LIT[0] },
  { kind: 'pipe', name: 'GAS PIPE', at: PIPE },
  { kind: 'can', name: 'KEROSENE CAN', at: CAN },
  { kind: 'bulb', name: 'BULB', at: LIT[3] },
  { kind: 'led', name: 'BLUE LED', at: LIT[4] },
  { kind: 'switch', name: 'SWITCH', at: SWITCH },
];

// rung centre (absolute y) in the full ladder: rung 0 (1500) sits lowest
const rungY = (i: number) => LADDER_FULL.top + LADDER_FULL.kick + 8 + (6 - i) * (LADDER_FULL.rungH + LADDER_FULL.gap) + LADDER_FULL.rungH / 2;

// the price of light falling as it got cheaper (an illustration of the falling price, no numbers)
const PriceFall: React.FC<{ draw: number }> = ({ draw }) => {
  const pts = [[20, 30], [140, 52], [260, 96], [380, 150], [500, 182], [620, 196]];
  const n = Math.max(1, draw * (pts.length - 1));
  const shown = pts.filter((_, i) => i <= Math.ceil(n));
  const d = shown.map((p, i) => {
    const t = i <= Math.floor(n) ? 1 : n - Math.floor(n);
    const prev = pts[Math.max(0, i - 1)];
    const x = prev[0] + (p[0] - prev[0]) * t;
    const y = prev[1] + (p[1] - prev[1]) * t;
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ');
  return (
    <svg width={660} height={220} viewBox="0 0 660 220">
      <line x1={10} y1={210} x2={650} y2={210} stroke={DL.border} strokeWidth={3} />
      <path d={d} stroke={DL.gold} strokeWidth={7} fill="none" strokeLinecap="round" />
      <text x={640} y={170} textAnchor="end" fontFamily={DL_MONO} fontSize={60} fill={DL.gold} opacity={draw}>↓</text>
    </svg>
  );
};

// a few stars that twinkle around "the dark."
const DarkStars: React.FC<{ show: number }> = ({ show }) => {
  const f = useCurrentFrame();
  const pts = [[20, 10], [140, 40], [260, 4], [400, 30], [520, 12], [580, 60], [80, 70], [330, 66]];
  return (
    <svg width={600} height={90} viewBox="0 0 600 90" style={{ position: 'absolute', left: 0, top: -70, opacity: show }}>
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.5 + (i % 3)} fill="#ffffff" opacity={0.6 + 0.4 * Math.sin(f / 9 + i * 1.7)} />)}
    </svg>
  );
};

const LtReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const answer = pane(f, 0, A_END);
  const guess = pane(f, A_END, B_END);
  const ladderShow = ease(f, B_END - 4, B_END + 10);
  // the night sky: rises orange on "sky", brightens on "brightened", leaves with the guess; back, dark and starry, on "dark"
  const skyAB = ease(f, SKY1 - 2, SKY1 + 12) * (1 - ease(f, B_END - 6, B_END + 6));
  const darkShow = ease(f, DARK - 2, DARK + 16);
  const skyGlow = f < B_END + 6 ? 0.6 + 0.4 * ease(f, BRIGHTENED - 2, BRIGHTENED + 14) : 0;
  const skyStars = f < B_END + 6 ? 0.45 - 0.2 * ease(f, BRIGHTENED - 2, BRIGHTENED + 14) : 0.85;
  const skyOpacity = Math.max(skyAB, 0.9 * darkShow);
  const bulbs = Math.round(12 * ease(f, MORE1 - 1, MORE1 + 12 * BULB_STEP, 0, 1, (t) => t));
  const markerY = LINE.reduce((y, at, i) => (i === 0 ? rungY(0) : y + (rungY(i) - rungY(i - 1)) * ease(f, at - 2, at + 10, 0, 1, DL_EASE.inOut)), rungY(0));
  const marker = ease(f, LINE[0] - 2, LINE[0] + 6) * (1 - ease(f, IN4 - 4, IN4 + 4));
  const gridDim = 1 - 0.55 * ease(f, IN4 - 2, IN4 + 10);
  const lightGlow = ease(f, LIGHT6 - 2, LIGHT6 + 8);
  const answerPulse = ease(f, ANSWER, ANSWER + 5) * (1 - ease(f, ANSWER + 8, ANSWER + 24));
  const howPulse = ease(f, HOW, HOW + 5) * (1 - ease(f, HOW + 8, HOW + 22));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1206" />
      {skyOpacity > 0.001 && <NightSky stars={skyStars} glow={skyGlow} style={{ opacity: skyOpacity }} />}
      <Vignette />

      {/* the answer: we spent it */}
      <AbsoluteFill style={{ opacity: answer }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 14, color: DL.gold, opacity: ease(f, ANSWER - 2, ANSWER + 4), transform: `scale(${1 + 0.08 * answerPulse})` }}>THE ANSWER</div>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 240, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1.15, color: DL.text }}>
          <span style={{ opacity: ease(f, WE1 - 2, WE1 + 4) }}>We </span>
          <span style={{ color: DL.red, opacity: ease(f, DIDNT - 2, DIDNT + 4) }}>didn't</span>
          <span style={{ opacity: ease(f, SAVE - 2, SAVE + 4) }}> save the</span>
          <span style={{ color: FLAME, opacity: ease(f, LIGHT1 - 2, LIGHT1 + 4) }}> light.</span>
          <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 16, opacity: ease(f, LIGHT1 - 2, LIGHT1 + 6) }}><LightProp kind="tallow" size={100} f={f} /></span>
          <div style={{ color: DL.gold }}>
            <span style={{ opacity: ease(f, WE2 - 2, WE2 + 4) }}>We </span>
            <span style={{ opacity: ease(f, SPENT - 2, SPENT + 4) }}>spent it.</span>
            <span style={{ opacity: ease(f, ALL - 2, ALL + 4) }}> All of it.</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 500, width: 700 }}>
          <Label at={EVERY1} color={DL.dim} size={30}>EVERY TIME LIGHT GOT CHEAPER</Label>
          <div style={{ marginTop: 16, opacity: ease(f, CHEAPER - 2, CHEAPER + 4) }}><PriceFall draw={ease(f, CHEAPER, CHEAPER + 30)} /></div>
        </div>
        <div style={{ position: 'absolute', left: 1000, top: 500, width: 760 }}>
          <Label at={USED} color={DL.dim} size={30}>WE USED<OnWord at={MORE1}> MORE</OnWord></Label>
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 14, width: 700 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ opacity: i < bulbs ? ease(f, MORE1 + i * BULB_STEP - 1, MORE1 + i * BULB_STEP + 4) : 0 }}><LightProp kind="bulb" size={96} lit={0.8 + 0.2 * Math.sin(f / 7 + i)} /></div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 800, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 64, color: DL.text }}>
          <span style={{ opacity: ease(f, UNTIL - 2, UNTIL + 4) }}>until it</span>
          <span style={{ opacity: ease(f, FILLED - 2, FILLED + 4) }}> filled</span>
          <span style={{ color: '#ff9a3a', opacity: ease(f, SKY1 - 2, SKY1 + 4) }}> the sky.</span>
        </div>
      </AbsoluteFill>

      {/* the guess paid (L13): more than eight in ten */}
      <AbsoluteFill style={{ opacity: guess }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(GUESS, A_END)} color={DYT.magenta} size={34}>YOUR GUESS</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 256 }}><Label at={OUT} color={DL.dim} size={28}>OUT OF EVERY<OnWord at={TEN}> TEN PEOPLE</OnWord><OnWord at={EARTH}> ON EARTH</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310 }}><TenPeople at={TEN} size={90} litAt={Array.from({ length: 8 }, (_, i) => EIGHT + i * 2)} /></div>
        <div style={{ position: 'absolute', left: 160, top: 480 }}><StampText text="MORE THAN 8 IN 10" at={EIGHT} color={DL.gold} size={44} tilt={-3} /></div>
        <div style={{ position: 'absolute', left: 820, top: 470, width: 940 }}><Label at={UNDER} color={DL.text} size={28}>LIVE UNDER A SKY<OnWord at={BRIGHTENED}> OUR LIGHTS HAVE BRIGHTENED</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 590, width: 1600 }}><Source at={EIGHT}>Falchi et al. 2016, Science Advances · more than 80 % of people<OnWord at={EVERYONE}> · US and Europe more than 99 %</OnWord></Source></div>
        <div style={{ position: 'absolute', left: 160, top: 660 }}><Label at={UNITED} color={DL.dim} size={30}>IN THE UNITED STATES<OnWord at={EUROPE}> AND EUROPE</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 706, display: 'flex', alignItems: 'baseline', gap: 28 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 80, lineHeight: 1, color: '#ff9a3a', opacity: ease(f, ALMOST - 2, ALMOST + 4) }}>almost<span style={{ opacity: ease(f, EVERYONE - 2, EVERYONE + 4) }}> everyone</span></span>
          <span style={{ fontFamily: DL_MONO, fontSize: 40, color: DL.gold, opacity: ease(f, EVERYONE - 2, EVERYONE + 4) }}>&gt; 99 %</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 820, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 76, color: DYT.magenta, opacity: ease(f, HOW - 2, HOW + 4), transform: `scale(${1 + 0.08 * howPulse})`, transformOrigin: 'left center' }}>How close were you?</div>
      </AbsoluteFill>

      {/* the walk-down */}
      <LightLadder rungs={RUNGS} show={ladderShow} mode="full" litAt={LIT} glowAt={LIGHT6} />
      <div style={{ position: 'absolute', left: LADDER_FULL.left + LADDER_FULL.width + 14, top: markerY - 30, opacity: marker * ladderShow, fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, lineHeight: '60px', color: DL.gold, textShadow: `0 0 18px ${DL.gold}` }}>◂</div>
      <div style={{ position: 'absolute', left: LADDER_FULL.left, top: 96, opacity: ease(f, WALK_AT - 2, WALK_AT + 4) * (1 - ease(f, ME_AT + 53, ME_AT + 57)) }}><Label at={WALK_AT} color={DL.gold} size={30}>NOW WALK DOWN THE LADDER<OnWord at={ME_AT}> WITH ME</OnWord></Label></div>

      {/* one prop per beat (right column) */}
      <div style={{ position: 'absolute', left: 1160, top: 200, width: 600, display: 'flex', flexWrap: 'wrap', rowGap: 26, opacity: ladderShow * gridDim }}>
        {BEATS.map((b, i) => {
          const newest = f >= b.at && (i === BEATS.length - 1 || f < BEATS[i + 1].at);
          return (
            <div key={b.kind} style={{ width: 200, display: 'flex', justifyContent: 'center', filter: newest ? `drop-shadow(0 0 14px ${DL.gold}88)` : undefined }}>
              <PropTag kind={b.kind} at={b.at} size={120} name={b.name} color={newest ? DL.gold : DL.text} lit={b.kind === 'switch' ? 1 : 0.85 + 0.15 * Math.sin(f / 6 + i)} />
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 1160, top: 560, opacity: ladderShow * gridDim }}><Label at={WITHOUT} color={LIGHT_BLUE_TEXT} size={30}>LIGHT WITHOUT<OnWord at={FIRE}> FIRE</OnWord></Label></div>

      {/* payoff, right column, each half ON its word */}
      <div style={{ position: 'absolute', left: 1160, top: 630, width: 600, display: 'flex', flexDirection: 'column', gap: 34 }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.15, color: DL.dim }}>
          <span style={{ opacity: ease(f, IN4 - 2, IN4 + 4) }}>In 1500,</span>
          <span style={{ opacity: ease(f, SCARCE1 - 2, SCARCE1 + 4) }}> the scarce thing was</span>
          <span style={{ fontSize: 64, color: FLAME, opacity: ease(f, LIGHT6 - 2, LIGHT6 + 4), textShadow: `0 0 ${30 * lightGlow}px ${FLAME}` }}> light.</span>
        </div>
        <div style={{ position: 'relative', fontFamily: DL_SERIF, fontSize: 50, lineHeight: 1.15, color: DL.text }}>
          <DarkStars show={darkShow} />
          <span style={{ opacity: ease(f, TODAY2 - 2, TODAY2 + 4) }}>Today,</span>
          <span style={{ opacity: ease(f, SCARCE2 - 2, SCARCE2 + 4) }}> the scarce thing is</span>
          <span style={{ fontSize: 64, color: '#c8d4ff', opacity: ease(f, DARK - 2, DARK + 4), textShadow: `0 0 ${24 * darkShow}px #6a7aff` }}> the dark.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default LtReveal;
