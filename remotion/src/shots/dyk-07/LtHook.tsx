import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, Vignette, DidYouKnowThat } from '../../lib/dykkit';
import { LightProp, LightFigure, NightSky, FLAME, Label, Source, OnWord, Baby, hold, pane } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 1/14 — cold open (STORY §2; RESEARCH L3/L11/L14). Frame 0: ONE candle flame in the dark (the only light on
// screen is the oldest); it slides left on "Last". LAST TIME · NO. 06 ASKED on "Last"; its question builds on "What",
// "switched", "night". Britain (L11): BRITAIN on "Britain", LIGHT NOW COSTS on "light", LESS THAN on "less", the figure
// < 1/3,000 lands on "three-thousandth", OF WHAT IT COST IN 1800 on "eighteen", the Fouquet & Pearson source on
// "hundred."; "You'd think we'd" + "pocket the savings." (a coin stack) on their words. "We didn't." gets its own beat
// (the panel clears on "We"), then docks up while a dark house builds ("tonight", "house"), "something is slowly" and
// "disappearing." (the word keeps fading). NO sky, stars, "80 %" or Milky Way before "stars": the DYK card's clauses land
// on "at" (the hedge AT TODAY'S RATE stays on screen), "child" (a baby), "under", "fifty" (250), "stars" (a sky with 250
// stars fades in, behind the card too), "see", "hundred" (the stars count down 250 → ~100), "eighteen?" (BY AGE 18);
// the Kyba 2023 source on "hundred". VO lt01 @0.6 s, lt02 @14.91 s.
// =============================================================================
export const compositionConfig = { id: 'LtHook', durationInSeconds: 28.3333, fps: 30, width: 1920, height: 1080 };
const DUR = 850;

const A = makeCue(vo, 'lt01-hook', 0.6);
const B = makeCue(vo, 'lt02-question', 14.91);
const LAST = A.at('Last');
const QUESTION = A.at('question.');
const WHAT = A.at('What', 1); // 'What happened' (2 = 'what we know', 3 = 'of what it did')
const SWITCHED = A.at('switched');
const NIGHT = A.at('night');
const HERES = A.at("Here's");
const IN = A.at('In', 1); // 'In Britain' (2 = 'in eighteen hundred')
const BRITAIN = A.at('Britain,');
const LIGHT = A.at('light');
const LESS = A.at('less');
const THOUSANDTH = A.at('three-thousandth');
const EIGHTEEN = A.at('eighteen');
const HUNDRED = A.at('hundred.');
const YOUD = A.at("You'd");
const POCKET = A.at('pocket');
const WE = B.at('We');
const DIDNT = B.at("didn't.");
const AND = B.at('And', 1); // 'And tonight' (2 = 'two hundred and fifty')
const TONIGHT = B.at('tonight,');
const HOUSE = B.at('house,');
const SOMETHING = B.at('something');
const DISAPPEARING = B.at('disappearing.');
const DID = B.at('Did');
const AT = B.at('at');
const CHILD = B.at('child');
const UNDER = B.at('under');
const FIFTY = B.at('fifty');
const STARS = B.at('stars');
const SEE = B.at('see');
const HUNDRED2 = B.at('hundred', 2); // 'about a hundred' (1 = 'two hundred and fifty')
const EIGHTEEN2 = B.at('eighteen?');

// panels hold ≥ 1.5 s after their last reveal (kit `hold`)
const QUOTE_END = hold(HERES, IN); // HERE'S WHAT WE KNOW is the card's last reveal
const BRITAIN_END = hold(POCKET, WE);
// "We didn't." alone for 1 s, then it docks up (still legible) so TONIGHT can land on its word
const BEAT_END = AND - 4;
const CARD_OUT = DUR + 20; // the DYK card holds to the cut (the shot fade closes it)
const STARS_FROM = 250;
const STARS_TO = 100;

// the one candle flame; `glow` 0–1 scales the warm pool around it
const Candle: React.FC<{ f: number; glow: number }> = ({ f, glow }) => {
  const flick = 0.85 + 0.15 * Math.sin(f / 5) + 0.05 * Math.sin(f / 2.3);
  return (
    <div style={{ position: 'relative', width: 360, height: 360 }}>
      <div style={{ position: 'absolute', left: -220, top: -260, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle at 50% 50%, ${FLAME}${Math.round(52 * flick * glow).toString(16).padStart(2, '0')}, transparent 62%)` }} />
      <div style={{ position: 'absolute', left: 0, top: 0 }}><LightProp kind="tallow" size={360} f={f} lit={0.9 + 0.1 * flick} /></div>
    </div>
  );
};

// "pocket the savings": a small coin stack
const Coins: React.FC = () => (
  <svg width={110} height={90} viewBox="0 0 110 90">
    {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={40} cy={78 - k * 14} rx={30} ry={9} fill={DL.gold} stroke="#8a6a20" strokeWidth={3} />)}
    <ellipse cx={84} cy={78} rx={22} ry={8} fill={DL.gold} stroke="#8a6a20" strokeWidth={3} />
  </svg>
);

// a dark house; its one window is lit by the candle's colour
const House: React.FC<{ f: number }> = ({ f }) => (
  <svg width={420} height={300} viewBox="0 0 420 300">
    <path d="M40 140 L210 30 L380 140 Z" fill="#141826" stroke="#2c3248" strokeWidth={4} />
    <rect x={70} y={140} width={280} height={150} fill="#10131e" stroke="#2c3248" strokeWidth={4} />
    <rect x={120} y={180} width={56} height={56} fill={FLAME} opacity={0.7 + 0.2 * Math.sin(f / 5)} />
    <rect x={186} y={210} width={52} height={80} fill="#0a0c14" stroke="#2c3248" strokeWidth={3} />
    <rect x={250} y={180} width={56} height={56} fill="#0a0c14" stroke="#2c3248" strokeWidth={3} />
    <rect x={290} y={60} width={30} height={60} fill="#141826" stroke="#2c3248" strokeWidth={4} />
  </svg>
);

const LtHook: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const slide = ease(f, LAST - 4, LAST + 16);
  const candleGlow = 1 - 0.35 * ease(f, AND - 2, AND + 12); // the flame sinks low on "And tonight"
  const quote = pane(f, LAST, QUOTE_END);
  const britain = pane(f, QUOTE_END, BRITAIN_END);
  const beatIn = ease(f, BRITAIN_END - 2, BRITAIN_END + 4);
  const dock = ease(f, BEAT_END - 2, BEAT_END + 10);
  const house = ease(f, TONIGHT - 2, TONIGHT + 6);
  const vanish = ease(f, DISAPPEARING + 6, DID - 4, 1, 0.3) * (0.9 + 0.1 * Math.sin(f / 4));
  // stars: none before "stars"; 250 on "stars", counting down to ~100 on "hundred"
  const starCount = Math.round(STARS_FROM - (STARS_FROM - STARS_TO) * ease(f, HUNDRED2 - 2, HUNDRED2 + 24));
  const skyOn = ease(f, STARS - 2, STARS + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#120a04" />
      {/* the sky exists only from "stars" */}
      {f >= STARS - 2 && <AbsoluteFill style={{ opacity: skyOn }}><NightSky stars={starCount / STARS_FROM} /></AbsoluteFill>}
      <Vignette />
      <div style={{ position: 'absolute', left: 780 - 520 * slide, top: 520 - 40 * slide }}><Candle f={f} glow={candleGlow} /></div>

      {/* No. 06's question */}
      <AbsoluteFill style={{ opacity: quote }}>
        <div style={{ position: 'absolute', left: 660, right: 160, top: 220, padding: '30px 44px', borderRadius: 18, background: '#0e0b0af0', borderLeft: `6px solid ${DL.gold}`, border: `1px solid ${DL.border}` }}>
          <Label at={LAST} color={DL.dim} size={28}>LAST TIME · NO. 06 ASKED<OnWord at={QUESTION}> A QUESTION</OnWord></Label>
          <div style={{ marginTop: 16, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 62, lineHeight: 1.15, color: DL.text }}>
            <OnWord at={WHAT}>What happened when </OnWord><OnWord at={SWITCHED}>we switched </OnWord>
            <span style={{ opacity: ease(f, NIGHT - 2, NIGHT + 4), color: DL.gold }}>the night off?</span>
          </div>
          <Label at={HERES} color={DL.gold} size={28} style={{ marginTop: 18 }}>HERE&apos;S WHAT WE KNOW ▸</Label>
        </div>
      </AbsoluteFill>

      {/* Britain: light now costs less than 1/3,000 of what it did in 1800 (L11) */}
      <AbsoluteFill style={{ opacity: britain }}>
        <div style={{ position: 'absolute', left: 700, right: 160, top: 170, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Label at={BRITAIN} color={DL.gold} size={40}>BRITAIN</Label>
          <div style={{ display: 'flex', gap: 18 }}>
            <Label at={LIGHT} color={DL.dim} size={32}>LIGHT NOW COSTS</Label>
            <Label at={LESS} color={DL.dim} size={32}>LESS THAN</Label>
          </div>
          <LightFigure at={THOUSANDTH} size={190} value={<>&lt; 1/3,000</>} label={<OnWord at={EIGHTEEN}>OF WHAT IT COST IN 1800</OnWord>} />
          <Source at={HUNDRED} style={{ width: 900 }}>Fouquet &amp; Pearson 2006 · lighting services, Britain, 1800 → 2000</Source>
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 26, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.warm }}>
            <span><OnWord at={YOUD}>You&apos;d think we&apos;d </OnWord><OnWord at={POCKET}>pocket the savings.</OnWord></span>
            <div style={{ opacity: ease(f, POCKET - 2, POCKET + 4), transform: `translateY(${ease(f, POCKET - 2, POCKET + 10, -30, 0)}px)` }}><Coins /></div>
          </div>
        </div>
      </AbsoluteFill>

      {/* "We didn't." — its own beat, then it docks up while the house builds */}
      <div style={{ position: 'absolute', left: 660, right: 160, top: 360 - 230 * dock, textAlign: 'center', opacity: beatIn, transform: `scale(${1 - 0.5 * dock})`, fontFamily: DL_SERIF, fontWeight: 500, fontSize: 150, color: DL.text }}>
        <OnWord at={WE}>We </OnWord><span style={{ opacity: ease(f, DIDNT - 2, DIDNT + 4), color: DL.red }}>didn&apos;t.</span>
      </div>

      {/* tonight, above your house, something is slowly disappearing (no sky yet) */}
      <AbsoluteFill style={{ opacity: house }}>
        <div style={{ position: 'absolute', left: 660, right: 160, top: 300, textAlign: 'center' }}>
          <Label at={TONIGHT} color={DL.dim} size={32}>TONIGHT<OnWord at={HOUSE}> · ABOVE YOUR HOUSE</OnWord></Label>
        </div>
        <div style={{ position: 'absolute', left: 1210 - 210, top: 400, opacity: ease(f, HOUSE - 2, HOUSE + 6), transform: `translateY(${ease(f, HOUSE - 2, HOUSE + 12, 24, 0)}px)` }}><House f={f} /></div>
        <div style={{ position: 'absolute', left: 660, right: 160, top: 740, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>
          <OnWord at={SOMETHING}>something is slowly </OnWord>
          <span style={{ opacity: ease(f, DISAPPEARING - 2, DISAPPEARING + 4) * vanish, fontStyle: 'italic', color: '#c8cdf0' }}>disappearing.</span>
        </div>
      </AbsoluteFill>

      <DidYouKnowThat at={DID} out={CARD_OUT}>
        <span style={{ opacity: ease(f, AT - 2, AT + 4), fontStyle: 'italic', color: '#c8cdf0' }}>at today&apos;s rate, </span>
        <OnWord at={CHILD}>a child born </OnWord><OnWord at={UNDER}>under </OnWord>
        <span style={{ opacity: ease(f, FIFTY - 2, FIFTY + 4), color: '#ffd23f' }}>250 </span><OnWord at={STARS}>stars </OnWord>
        <OnWord at={SEE}>will see </OnWord><span style={{ opacity: ease(f, HUNDRED2 - 2, HUNDRED2 + 4), color: '#ffd23f' }}>about 100 </span>
        <OnWord at={EIGHTEEN2}>by the time they&apos;re 18?</OnWord>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ opacity: ease(f, CHILD - 2, CHILD + 4) }}><Baby size={120} /></div>
          <div style={{ position: 'relative', width: 560, height: 210, borderRadius: 16, overflow: 'hidden', opacity: skyOn, border: '2px solid #2a3060' }}>
            <NightSky stars={starCount / STARS_FROM} width={560} height={210} />
            <span style={{ position: 'absolute', right: 18, bottom: 12, fontFamily: DL_MONO, fontSize: 44, color: '#ffd23f', fontVariantNumeric: 'tabular-nums' }}>{f >= HUNDRED2 - 2 ? '≈ ' : ''}{starCount}</span>
            <span style={{ position: 'absolute', left: 16, top: 12, fontFamily: DL_MONO, fontSize: 22, letterSpacing: 2, color: '#c8cdf0' }}>AT TODAY&apos;S RATE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={EIGHTEEN2} color={DL.gold} size={32}>BY AGE 18</Label>
            <Source at={HUNDRED2} style={{ width: 360, color: '#c8cdf0' }}>Kyba et al., Science 2023 · Globe at Night · at today&apos;s rate</Source>
          </div>
        </div>
      </DidYouKnowThat>

    </AbsoluteFill>
  );
};
export default LtHook;
