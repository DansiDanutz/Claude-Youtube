import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, EraHeader, Vignette } from '../../lib/dykkit';
import {
  EpisodeHud, LightLadder, lightRungs, NEXT_RUNG, Label, Source, StampText, OnWord, QGRAD, PredictionTag, Kid,
  NightSky, LightProp, PropTag, FLAME, hold, pane,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 12/14 — 2100: evidence → scenario (RESEARCH L15, L16; L1 for the bell). PredictionTag from the header slam to
// the last frame. A night sky with an orange skyglow throughout; the docked ladder with a dashed 2100 "?" rung. The 2100
// header slams on "twenty" (1st), a dawn line on "morning". THE EVIDENCE → on "evidence"; SOME PLACES · ARE ALREADY
// PROTECTING · THE DARK. France (L15): SINCE / 2013 / · FRANCE, a lit shop window on "shops" whose lights go off on
// "switch", BY 1 A.M. clock on "one" (2nd) + decree source. Tucson (L16): TUCSON, ARIZONA; a streetlight on "rules"; SINCE
// 1972 on "seventy" + code source; TO KEEP THE SKY DARK; an observatory on "observatories". The scenario: ONE SCENARIO ·
// NOT A FACT; IF THE SKY KEEPS BRIGHTENING (the skyglow rises, stars fade); "darkness" (big) — the 2100 rung fills
// NEXT_RUNG on the same word; THE WAY WE ONCE PROTECTED · forests (tree) · coasts (waves). A child looks up: A CHILD IN
// 2100 · MIGHT SEE THE MILKY WAY (the band rises in the sky, the skyglow falls) · FOR THE FIRST TIME · ON A SCHOOL TRIP ·
// IN A PLACE KEPT DARK ON PURPOSE. The bell from 1500 returns on "bell" and swings; 1500 · COVER THE FIRE (a cover comes
// down over the candle on "fire"); 2100 · IT MIGHT RING AGAIN (the bell swings again on "ring") · ONLY THIS TIME, IT
// MEANS · cover the light (gradient) on "light", where the streetlight dims. The 2100 rung is drawn in this shot (wider
// than the kit's dock rung, which is too narrow for NEXT_RUNG at the dock font). VO lt11 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt2100', durationInSeconds: 52.2667, fps: 30, width: 1920, height: 1080 };
const DUR = 1568;

const C = makeCue(vo, 'lt11-2100', 0.8);
const SO1 = C.at('So', 1); // 'So what could' (2 = 'So here's one scenario')
const NIGHT = C.at('night');
const LOOK = C.at('look');
const TWENTY1 = C.at('twenty', 1);
const MORNING1 = C.at('morning', 1); // 'That morning' (2 = 'one in the morning')
const YET = C.at('yet.');
const EVIDENCE = C.at('evidence.');
const PLACES = C.at('places');
const PROTECTING = C.at('protecting');
const DARK1 = C.at('dark.', 1); // 'protecting the dark.' (2 = 'keep the sky dark', 3 = 'kept dark on purpose')
const SINCE1 = C.at('Since', 1);
const THIRTEEN = C.at('thirteen,');
const FRANCE = C.at('France');
const SHOPS = C.at('shops');
const SWITCH = C.at('switch');
const OFF = C.at('off');
const ONE2 = C.at('one', 2); // 'by one in the morning' (1 = 'twenty one hundred?')
const MORNING2 = C.at('morning', 2);
const TUCSON = C.at('Tucson,');
const ARIZONA = C.at('Arizona,');
const RULES = C.at('rules');
const LIGHTING = C.at('lighting');
const SEVENTY = C.at('seventy');
const SKY1 = C.at('sky', 1); // 'keep the sky dark' (2 = 'If the sky keeps brightening')
const DARK2 = C.at('dark', 2);
const OBSERVATORIES = C.at('observatories.');
const SO2 = C.at('So', 2);
const SCENARIO = C.at('scenario.');
const FACT = C.at('fact.');
const SKY2 = C.at('sky', 2);
const BRIGHTENING = C.at('brightening,');
const DARKNESS = C.at('darkness');
const BECOMES = C.at('becomes');
const PROTECT = C.at('protect,');
const PROTECTED = C.at('protected');
const FORESTS = C.at('forests');
const COASTS = C.at('coasts.');
const CHILD = C.at('child');
const TWENTY3 = C.at('twenty', 3); // 'A child in twenty one hundred'
const MIGHT1 = C.at('might', 1);
const MILKY = C.at('Milky');
const FIRST = C.at('first');
const SCHOOL = C.at('school');
const KEPT = C.at('kept');
const PURPOSE = C.at('purpose.');
const REMEMBER = C.at('remember');
const BELL = C.at('bell');
const FIFTEEN = C.at('fifteen');
const COVER1 = C.at('Cover', 1); // 'Cover the fire.' (2 = 'cover the light.')
const FIRE = C.at('fire.');
const TWENTY4 = C.at('twenty', 4); // 'In twenty one hundred, it might ring again'
const MIGHT2 = C.at('might', 2);
const RING = C.at('ring');
const ONLY = C.at('Only');
const MEANS = C.at('means');
const COVER2 = C.at('cover', 2);
const LIGHT = C.at('light.');

// panel boundaries: each panel holds its last reveal ≥ HOLD_F (kit `hold`); the cue table's H() uses the same numbers
const EV_END = hold(OBSERVATORIES, SO2);
const S1_END = hold(COASTS, CHILD);
const SCEN_END = hold(PURPOSE, REMEMBER);
const STAMP_AT = Math.max(SCENARIO, EV_END);

// the 2100 rung, drawn here: the dock slot 6 position of LightLadder (top 180), widened leftwards to fit NEXT_RUNG
const LADDER_TOP = 180;
const RUNG_TOP = LADDER_TOP + 24 + 8; // dock kick 24 + 8, slot 6 = the top row
const NextRung: React.FC<{ fillAt: number; show: number }> = ({ fillAt, show }) => {
  const f = useCurrentFrame();
  const filled = f >= fillAt;
  const pulse = ease(f, fillAt, fillAt + 6) * (1 - ease(f, fillAt + 12, fillAt + 40));
  return (
    <div style={{ position: 'absolute', left: 1180, top: RUNG_TOP, width: 580, height: 40, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', borderRadius: 8, border: `2px dashed ${DL.red}`, background: '#1a0a08f2', opacity: show, boxShadow: `0 0 ${18 + 30 * pulse}px ${DL.red}${pulse > 0.05 ? '88' : '44'}` }}>
      <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: DL.red }}>2100</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.red }}>·</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.red, whiteSpace: 'nowrap', opacity: filled ? ease(f, fillAt - 1, fillAt + 6) : 1 }}>{filled ? NEXT_RUNG : '?'}</span>
    </div>
  );
};

// shot-only drawings: a 1 a.m. clock, a tree, waves, the fire cover (couvre-feu) lowering over a candle
const Clock: React.FC = () => (
  <svg width={110} height={110} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={44} fill="#0e0b0a" stroke={DL.warm} strokeWidth={5} />
    <line x1={50} y1={50} x2={50 + 22 * Math.sin(Math.PI / 6)} y2={50 - 22 * Math.cos(Math.PI / 6)} stroke={DL.text} strokeWidth={6} strokeLinecap="round" />
    <line x1={50} y1={50} x2={50} y2={14} stroke={DL.gold} strokeWidth={4} strokeLinecap="round" />
    <circle cx={50} cy={50} r={4} fill={DL.text} />
  </svg>
);
const Tree: React.FC<{ f: number }> = ({ f }) => (
  <svg width={130} height={130} viewBox="0 0 100 100">
    <rect x={45} y={64} width={10} height={30} fill="#5a4028" />
    <g transform={`rotate(${2 * Math.sin(f / 18)} 50 90)`}>
      <path d="M50 6 L80 44 L64 44 L86 70 L14 70 L36 44 L20 44 Z" fill="#2f7a4a" stroke="#1e5a34" strokeWidth={3} />
    </g>
  </svg>
);
const Waves: React.FC<{ f: number }> = ({ f }) => (
  <svg width={130} height={130} viewBox="0 0 100 100">
    {[40, 58, 76].map((y, k) => (
      <path key={y} d={`M4 ${y} q12 -12 24 0 t24 0 t24 0 t24 0`} stroke="#4aa0d8" strokeWidth={6} fill="none" strokeLinecap="round" transform={`translate(${6 * Math.sin(f / 12 + k)} 0)`} />
    ))}
  </svg>
);
const CoveredCandle: React.FC<{ cover: number; f: number }> = ({ cover, f }) => (
  <div style={{ position: 'relative', width: 140, height: 150 }}>
    <div style={{ position: 'absolute', left: 10, top: 30 }}><LightProp kind="tallow" size={120} f={f} lit={1 - cover} /></div>
    <svg width={140} height={150} viewBox="0 0 140 150" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <g transform={`translate(0 ${-90 * (1 - cover)})`} opacity={ease(cover, 0, 0.15)}>
        <path d="M24 136 Q24 54 70 50 Q116 54 116 136 Z" fill="#8a6a30" stroke="#5a4418" strokeWidth={4} />
        <circle cx={70} cy={44} r={8} fill="#5a4418" />
      </g>
    </svg>
  </div>
);

const Lt2100: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const header = ease(f, SINCE1 - 6, SINCE1); // France card and Tucson card share the evidence pane
  const ev = pane(f, EVIDENCE - 2, EV_END);
  const s1 = pane(f, Math.max(SKY2, EV_END) - 2, S1_END);
  const s2 = pane(f, CHILD, SCEN_END);
  const stamp = pane(f, STAMP_AT, SCEN_END);
  // the sky: today's orange glow; brighter on "brightening"; the Milky Way returns on "Milky"
  const brighten = ease(f, BRIGHTENING - 2, BRIGHTENING + 24);
  const milky = ease(f, MILKY - 2, MILKY + 40);
  const glow = (0.7 + 0.3 * brighten) * (1 - 0.88 * milky);
  const stars = (0.35 - 0.2 * brighten) * (1 - milky) + milky;
  // the docked ladder: out while the header slams, back once it docks
  const ladder = 1 - ease(f, TWENTY1 - 6, TWENTY1) * (1 - ease(f, MORNING1 + 28, MORNING1 + 40));
  const windowLit = 1 - ease(f, SWITCH - 1, SWITCH + 10);
  const swing = (() => {
    const env1 = ease(f, BELL - 2, BELL + 6) * (1 - ease(f, BELL + 30, BELL + 70));
    const env2 = ease(f, RING - 2, RING + 6) * (1 - ease(f, RING + 30, RING + 70));
    return 18 * Math.sin((f - BELL) / 4) * Math.max(env1, env2);
  })();
  const cover = ease(f, FIRE - 2, FIRE + 12);
  const streetLit = 1 - 0.8 * ease(f, LIGHT - 2, LIGHT + 14);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <NightSky stars={stars} glow={glow} milky={milky} />
      <Vignette />

      {/* the question, word by word, until the header slams */}
      <div style={{ position: 'absolute', left: 160, top: 300, width: 1100, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 76, color: DL.text, opacity: 1 - ease(f, TWENTY1 - 6, TWENTY1) }}>
        <span style={{ opacity: ease(f, SO1 - 2, SO1 + 4) }}>So what could</span>
        <span style={{ color: DL.gold, opacity: ease(f, NIGHT - 2, NIGHT + 4) }}> the night</span>
        <span style={{ opacity: ease(f, LOOK - 2, LOOK + 4) }}> look like…</span>
      </div>
      <Sequence from={TWENTY1} layout="none"><EraHeader year="2100" idx={7} label="" dockAt={MORNING1 - TWENTY1 + 10} /></Sequence>
      <PredictionTag at={TWENTY1} />

      {/* "That morning hasn't happened yet": a pale dawn line on the horizon until the evidence */}
      <AbsoluteFill style={{ opacity: ease(f, MORNING1 - 4, MORNING1 + 10) * (1 - ease(f, EVIDENCE - 8, EVIDENCE)) }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, height: 300, background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}3a, transparent 70%)`, transform: `translateY(${ease(f, MORNING1, EVIDENCE, 40, 0)}px)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.dim, opacity: ease(f, YET - 2, YET + 4) }}>hasn't happened yet</div>
      </AbsoluteFill>

      {/* the evidence (L15, L16) */}
      <AbsoluteFill style={{ opacity: ev }}>
        <div style={{ position: 'absolute', left: 160, top: 190 }}><Label at={EVIDENCE} color={DL.gold} size={28}>THE EVIDENCE →</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={PLACES} color={DL.dim} size={26}>SOME PLACES<OnWord at={PROTECTING}> ARE ALREADY PROTECTING</OnWord><OnWord at={DARK1}> THE DARK</OnWord></Label></div>

        {/* France, since 2013: shop windows off by 1 a.m. (L15) */}
        <div style={{ position: 'absolute', left: 160, top: 290, width: 990, height: 280, boxSizing: 'border-box', padding: '20px 28px', borderRadius: 18, border: `2px solid ${DL.sky}`, background: '#0e0b0af0', opacity: header }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim }}>SINCE</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1, color: DL.sky, opacity: ease(f, THIRTEEN - 2, THIRTEEN + 4) }}>2013</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 34, letterSpacing: 4, color: DL.text, opacity: ease(f, FRANCE - 2, FRANCE + 4) }}>· FRANCE</span>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 34 }}>
            <PropTag kind="window" at={SHOPS} size={96} name="SHOP WINDOWS" lit={windowLit} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Label at={SWITCH} color={DL.text} size={30}>SWITCH<OnWord at={OFF}> OFF</OnWord></Label>
              <Label at={ONE2} color={DL.gold} size={34}>BY 1<OnWord at={MORNING2}> A.M.</OnWord></Label>
            </div>
            <div style={{ opacity: ease(f, ONE2 - 2, ONE2 + 4), transform: `scale(${ease(f, ONE2 - 2, ONE2 + 10, 1.2, 1)})` }}><Clock /></div>
          </div>
          {/* top-right of the card: clear of the SHOP WINDOWS tag below */}
          <div style={{ position: 'absolute', right: 28, top: 22, width: 400, textAlign: 'right' }}><Source at={ONE2}>French decree of 25 Jan 2013, in force July 2013 · local exceptions allowed</Source></div>
        </div>

        {/* Tucson, since 1972: outdoor-lighting rules for its observatories (L16) */}
        <div style={{ position: 'absolute', left: 160, top: 590, width: 990, height: 330, boxSizing: 'border-box', padding: '20px 28px', borderRadius: 18, border: `2px solid ${DL.gold}`, background: '#0e0b0af0', opacity: ease(f, TUCSON - 2, TUCSON + 4) }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 34, letterSpacing: 4, color: DL.text }}>TUCSON<OnWord at={ARIZONA}>, ARIZONA</OnWord></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim, opacity: ease(f, SEVENTY - 2, SEVENTY + 4) }}>SINCE</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1, color: DL.gold, opacity: ease(f, SEVENTY - 2, SEVENTY + 4) }}>1972</span>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 34 }}>
            <PropTag kind="streetlight" at={RULES} size={96} name="RULES" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 470 }}>
              <Label at={LIGHTING} color={DL.text} size={30}>ON OUTDOOR LIGHTING</Label>
              <Label at={SKY1} color={DL.sky} size={30}>TO KEEP THE SKY<OnWord at={DARK2}> DARK</OnWord></Label>
            </div>
            <PropTag kind="telescope" at={OBSERVATORIES} size={96} name="OBSERVATORIES" />
          </div>
          <div style={{ position: 'absolute', left: 28, bottom: 14 }}><Source at={SEVENTY}>City of Tucson and Pima County outdoor-lighting codes since 1972 · joint code 2012</Source></div>
        </div>
      </AbsoluteFill>

      {/* the scenario, plainly labelled */}
      <div style={{ position: 'absolute', left: 160, top: 210, opacity: stamp }}><StampText text={f >= FACT ? 'ONE SCENARIO · NOT A FACT' : 'ONE SCENARIO'} at={STAMP_AT} color={DL.red} size={38} tilt={-2} /></div>
      <AbsoluteFill style={{ opacity: s1 }}>
        <div style={{ position: 'absolute', left: 160, top: 330 }}><Label at={Math.max(SKY2, EV_END)} color={DL.dim} size={30}>IF THE SKY<OnWord at={BRIGHTENING}> KEEPS BRIGHTENING,</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 380, width: 990, fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1.15, color: DL.text }}>
          <span style={{ fontSize: 76, color: '#c8d4ff', opacity: ease(f, DARKNESS - 2, DARKNESS + 4), textShadow: '0 0 24px #6a7aff' }}>darkness</span>
          <span style={{ opacity: ease(f, BECOMES - 2, BECOMES + 4) }}> becomes something</span>
          <span style={{ opacity: ease(f, PROTECT - 2, PROTECT + 4) }}> we have to protect,</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 560 }}><Label at={PROTECTED} color={DL.green} size={28}>THE WAY WE ONCE PROTECTED</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 600, display: 'flex', gap: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, FORESTS - 2, FORESTS + 4), transform: `scale(${ease(f, FORESTS - 2, FORESTS + 10, 1.2, 1)})` }}><Tree f={f} /><span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.text }}>FORESTS</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, COASTS - 2, COASTS + 4), transform: `scale(${ease(f, COASTS - 2, COASTS + 10, 1.2, 1)})` }}><Waves f={f} /><span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.text }}>COASTS</span></div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: s2 }}>
        <div style={{ position: 'absolute', left: 180, top: 720, opacity: ease(f, CHILD - 2, CHILD + 4), transform: `translateY(${ease(f, CHILD - 2, CHILD + 10, 16, 0)}px)` }}><Kid size={120} color={DL.warm} glow={0.6 * milky} /></div>
        <div style={{ position: 'absolute', left: 360, top: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Label at={CHILD} color={DL.text} size={30}>A CHILD<OnWord at={TWENTY3}> IN 2100</OnWord></Label>
          <Label at={MIGHT1} color={DL.text} size={30}>MIGHT SEE<OnWord at={MILKY}> THE MILKY WAY</OnWord></Label>
          <Label at={FIRST} color={DL.dim} size={30}>FOR THE FIRST TIME<OnWord at={SCHOOL}> · ON A SCHOOL TRIP</OnWord></Label>
          <Label at={KEPT} color={DL.sky} size={30}>IN A PLACE KEPT DARK<OnWord at={PURPOSE}> ON PURPOSE</OnWord></Label>
        </div>
      </AbsoluteFill>

      {/* the bell from 1500 returns (right column, under the ladder) */}
      <div style={{ position: 'absolute', left: 1360, top: 590, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <PropTag kind="bell" at={BELL} size={170} name="THE BELL" color={DL.gold} swing={swing} />
        <Label at={FIFTEEN} color={DL.dim} size={28}>FROM 1500</Label>
      </div>

      {/* cover the fire → cover the light (L1) */}
      <div style={{ position: 'absolute', left: 160, top: 300, width: 990, height: 250, boxSizing: 'border-box', padding: '24px 30px', borderRadius: 18, border: `2px solid ${DL.warm}`, background: '#0e0b0af0', display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, COVER1 - 2, COVER1 + 4) }}>
        <CoveredCandle cover={cover} f={f} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.dim }}>1500</span>
          <span style={{ fontFamily: DL_SERIF, fontSize: 76, lineHeight: 1, color: FLAME }}>Cover<span style={{ opacity: ease(f, FIRE - 2, FIRE + 4) }}> the fire.</span></span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 160, top: 590, width: 990, height: 290, boxSizing: 'border-box', padding: '24px 30px', borderRadius: 18, border: `2px dashed ${DL.red}`, background: '#0e0b0af0', display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, TWENTY4 - 2, TWENTY4 + 4) }}>
        <LightProp kind="streetlight" size={150} lit={streetLit} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 30, letterSpacing: 3, color: DL.red }}>2100<OnWord at={MIGHT2}> · IT MIGHT</OnWord><OnWord at={RING}> RING AGAIN</OnWord></span>
          <Label at={ONLY} color={DL.dim} size={28}>ONLY THIS TIME,<OnWord at={MEANS}> IT MEANS</OnWord></Label>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 84, lineHeight: 1.05, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, COVER2 - 2, COVER2 + 4), filter: `drop-shadow(0 0 ${22 * ease(f, LIGHT, LIGHT + 10)}px ${DYT.magenta}88)` }}>cover<span style={{ opacity: ease(f, LIGHT - 2, LIGHT + 4) }}> the light.</span></span>
        </div>
      </div>

      <LightLadder rungs={lightRungs(6)} show={ladder} top={LADDER_TOP} />
      <NextRung fillAt={DARKNESS} show={ladder} />
      <EpisodeHud year={f >= TWENTY1 ? 2100 : 'TODAY'} episode="07" prediction={f >= TWENTY1} />
    </AbsoluteFill>
  );
};
export default Lt2100;
