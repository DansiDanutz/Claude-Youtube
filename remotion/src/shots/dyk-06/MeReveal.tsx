import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, useShotFade, Vignette } from '../../lib/dykkit';
import {
  MedLadder, medRungs, LADDER_FULL, Label, Source, StampText, OnWord, QGRAD, Kid, PeopleRow, Figure,
  MedProp, PropTag, MonthBars, TwoGroups, hold, pane,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 11/14 — the answer (RESEARCH M1, M2, M5, M7; Lind = No. 05 F10). THE ANSWER pulses on "answer"; "Medicine
// didn't get better / because doctors got smarter." on its words; Washington's three doctors with TRAINED / MEANT WELL
// (M1–M2). "It got better when someone asked a simple question." → COMPARED WITH WHAT? (gradient, big) on "Compared",
// which then docks as a header over the two examples. Semmelweis (M5): BEFORE · APRIL 18.3 % on "before", AFTER · JUNE
// 2.2 % on "after", a basin on "hand", COUNTED on "counted". The streptomycin trial (M7): a sealed envelope on "chance",
// GROUP A / GROUP B on "two"/"groups", = ALIKE on "alike", COUNTED on "counted" (2nd). The guess (M7): TwoGroups — 55 got
// the drug, 4 dim on "four"; 52 bed rest alone, 14 dim on "fourteen"; DEATHS WITHIN SIX MONTHS on "within"; HOW CLOSE WERE
// YOU? on "How". "often called the first of its kind" keeps its hedge on screen; Lind 1747: six cures, one per 10 f on
// "six". The walk-back: the full ladder (dim) once the Lind panel has held, each rung lit on its spoken chip word
// (balance … prevention) with a gold marker stepping up to each lit rung. Payoff: In 1799, nobody was counting. /
// Today, that question (COMPARED WITH WHAT? returns) sits at the heart of how new medicines are tested — the ladder glows
// on "tested". No 2100 rung here (AN ARMS RACE? belongs to Me2100). VO me10 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'MeReveal', durationInSeconds: 64.63333333333334, fps: 30, width: 1920, height: 1080 };
const DUR = 1939;

const C = makeCue(vo, 'me10-reveal', 0.8);
const ANSWER = C.at('answer.');
const MEDICINE1 = C.at('Medicine', 1);
const DIDNT = C.at("didn't");
const BECAUSE = C.at('because');
const SMARTER = C.at('smarter.');
const WASHINGTON = C.at("Washington's");
const TRAINED = C.at('trained,');
const MEANT = C.at('meant');
const IT1 = C.at('It', 1); // 'It got better' (2 = 'It let chance decide')
const ASKED = C.at('asked');
const SIMPLE = C.at('simple');
const COMPARED1 = C.at('Compared', 1);
const WHAT = C.at('what?');
const SEMMELWEIS = C.at('Semmelweis');
const MOTHERS = C.at('mothers');
const BEFORE = C.at('before');
const AFTER = C.at('after');
const HAND = C.at('hand');
const COUNTED1 = C.at('counted.', 1);
const STREP = C.at('streptomycin');
const FURTHER = C.at('further.');
const CHANCE = C.at('chance');
const DRUG1 = C.at('drug,', 1);
const TWO1 = C.at('two', 1); // 'the two groups' (2 = 'fifty two')
const GROUPS = C.at('groups');
const ALIKE = C.at('alike.');
const COUNTED2 = C.at('counted.', 2);
const SO2 = C.at('So,', 2); // 'So, your guess' (1 = 'so the two groups')
const GUESS = C.at('guess.');
const FIVE1 = C.at('five', 1);
const DRUG2 = C.at('drug,', 2);
const FOUR = C.at('four');
const WITHIN = C.at('within');
const TWO2 = C.at('two', 2);
const BED = C.at('bed');
const FOURTEEN = C.at('fourteen.');
const HOW1 = C.at('How', 1); // 'How close were you?' (2 = 'how new medicines')
const THAT1 = C.at('That', 1);
const OFTEN = C.at('often');
const FIRST = C.at('first');
const BUT = C.at('But');
const IDEA = C.at('idea');
const OLDER = C.at('older.');
const SEVENTEEN1 = C.at('seventeen', 1);
const JAMES = C.at('James');
const SIX2 = C.at('six', 2); // 'six cures' (1 = 'six months')
const WALK = C.at('walk');
const ME = C.at('me.');
// each rung lights on its spoken chip word, and the gold marker steps up to it on the same word (it appears on "fifteen")
const LIT = [C.at('balance.'), C.at('authority.'), C.at('pattern.'), C.at('cure.'), C.at('proof.'), C.at('prevention.')];
const LINE = [C.at('fifteen'), ...LIT.slice(1)];
const SEVENTEEN2 = C.at('seventeen', 2);
const NOBODY = C.at('nobody');
const COUNTING = C.at('counting.');
const TODAY2 = C.at('Today,', 2);
const QUESTION2 = C.at('question', 2); // 'that question sits' (1 = 'a simple question.')
const HEART = C.at('heart');
const HOW2 = C.at('how', 2);
const TESTED = C.at('tested.');

// panel boundaries: each panel holds its last reveal ≥ HOLD_F (kit `hold`); the cue table's H() uses the same numbers
const LIND_STEP = 10; // six cures, one per 10 f (3 clicks/s)
const LIND_LAST = SIX2 + 5 * LIND_STEP; // the caption + source land with the sixth bottle (≤ 3 clicks/s over "cures for scurvy")
const A_END = hold(MEANT, IT1);
const B_END = hold(WHAT, SEMMELWEIS);
const C_END = hold(COUNTED1, STREP);
const D_END = hold(COUNTED2, SO2);
const E_END = hold(HOW1, THAT1);
const F_END = hold(LIND_LAST, WALK);
const WALK_AT = Math.max(WALK, F_END);
const ME_AT = Math.max(ME, F_END);

const LIND_CURES = ['CIDER', 'VITRIOL', 'VINEGAR', 'SEA WATER', 'ORANGES + LEMON', 'PURGATIVE'];
const LIND_FILL = ['#e8c040', '#c8d0d8', '#b8905a', '#5aa0e0', '#ff9a1f', '#8a6a48'];

// rung centre (absolute y) in the full ladder: rung 0 (1537) sits lowest
const rungY = (i: number) => LADDER_FULL.top + LADDER_FULL.kick + 8 + (6 - i) * (LADDER_FULL.rungH + LADDER_FULL.gap) + LADDER_FULL.rungH / 2;

// a group box for the trial panel: a row of figures, appearing on its word
const GroupBox: React.FC<{ name: string; at: number; color: string }> = ({ name, at, color }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 380, padding: '20px 24px', boxSizing: 'border-box', borderRadius: 16, border: `2px solid ${color}`, background: '#0e0b0af0', opacity: ease(f, at - 2, at + 4), transform: `translateY(${ease(f, at - 2, at + 8, 18, 0)}px)` }}>
      <div style={{ fontFamily: DL_MONO, fontSize: 28, letterSpacing: 3, color }}>{name}</div>
      <div style={{ marginTop: 12 }}><PeopleRow n={6} lit={() => 1} size={40} gap={10} color={color} /></div>
    </div>
  );
};

const MeReveal: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const answer = pane(f, 0, A_END);
  const ask = pane(f, A_END, B_END);
  const semm = pane(f, B_END, C_END);
  const trial = pane(f, C_END, D_END);
  const guess = pane(f, D_END, E_END);
  const lind = pane(f, E_END, F_END);
  const ladderShow = ease(f, F_END - 4, F_END + 10);
  const glowAll = ease(f, TESTED - 2, TESTED + 12);
  // COMPARED WITH WHAT? — big on its word, then docks as the header over the two examples, out with the trial panel
  const qIn = ease(f, COMPARED1 - 2, COMPARED1 + 4);
  const qDock = ease(f, B_END, B_END + 14, 0, 1, DL_EASE.inOut);
  const qOut = 1 - ease(f, D_END - 4, D_END);
  const qPulse = ease(f, WHAT, WHAT + 5) * (1 - ease(f, WHAT + 8, WHAT + 24));
  // the walking marker: appears at rung 0 on "fifteen", steps to rung i as rung i lights
  const markerY = LINE.reduce((y, at, i) => (i === 0 ? rungY(0) : y + (rungY(i) - rungY(i - 1)) * ease(f, at - 2, at + 10, 0, 1, DL_EASE.inOut)), rungY(0));
  const marker = ease(f, LINE[0] - 2, LINE[0] + 6) * (1 - ease(f, SEVENTEEN2 - 4, SEVENTEEN2 + 4));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1418" />
      <Vignette />

      {/* the answer: not smarter doctors */}
      <AbsoluteFill style={{ opacity: answer }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_MONO, fontSize: 40, letterSpacing: 14, color: DL.gold, transform: `scale(${1 + 0.08 * ease(f, ANSWER, ANSWER + 5) * (1 - ease(f, ANSWER + 8, ANSWER + 24))})` }}>THE ANSWER</div>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 260, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 88, lineHeight: 1.15, color: DL.text }}>
          <span style={{ opacity: ease(f, MEDICINE1 - 2, MEDICINE1 + 4) }}>Medicine </span>
          <span style={{ color: DL.red, opacity: ease(f, DIDNT - 2, DIDNT + 4) }}>didn't</span>
          <span style={{ opacity: ease(f, DIDNT + 4, DIDNT + 10) }}> get better</span>
          <div style={{ color: DL.dim, fontSize: 72 }}>
            <span style={{ opacity: ease(f, BECAUSE - 2, BECAUSE + 4) }}>because doctors got </span>
            <span style={{ opacity: ease(f, SMARTER - 2, SMARTER + 4) }}>smarter.</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 520, top: 560, display: 'flex', alignItems: 'flex-end', gap: 24, opacity: ease(f, WASHINGTON - 2, WASHINGTON + 4) }}>
          <Kid size={90} adult color={DL.warm} /><Kid size={96} adult color={DL.warm} /><Kid size={90} adult color={DL.warm} />
        </div>
        <div style={{ position: 'absolute', left: 940, top: 570, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Label at={WASHINGTON} color={DL.dim} size={30}>WASHINGTON'S DOCTORS · 1799</Label>
          <Label at={TRAINED} color={DL.green} size={36}>✓ TRAINED</Label>
          <Label at={MEANT} color={DL.green} size={36}>✓ MEANT WELL</Label>
        </div>
      </AbsoluteFill>

      {/* a simple question */}
      <AbsoluteFill style={{ opacity: ask }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 290, textAlign: 'center', fontFamily: DL_SERIF, fontSize: 64, lineHeight: 1.2, color: DL.text }}>
          <span style={{ opacity: ease(f, Math.max(IT1, A_END) - 2, Math.max(IT1, A_END) + 4) }}>It got better</span>
          <span style={{ opacity: ease(f, ASKED - 2, ASKED + 4) }}> when someone asked</span>
          <span style={{ opacity: ease(f, SIMPLE - 2, SIMPLE + 4), color: DL.gold }}> a simple question.</span>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 470 - 360 * qDock, textAlign: 'center', transformOrigin: 'top center', transform: `scale(${(1 - 0.55 * qDock) * (1 + 0.06 * qPulse)})`, opacity: qIn * qOut }}>
        <span style={{ display: 'inline-block', fontFamily: DL_SERIF, fontWeight: 600, fontSize: 150, lineHeight: 1.1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 ${24 * qPulse}px ${DYT.magenta})` }}>
          Compared with<span style={{ opacity: ease(f, WHAT - 2, WHAT + 4) }}> what?</span>
        </span>
      </div>

      {/* Semmelweis: before and after, counted (M5) */}
      <AbsoluteFill style={{ opacity: semm }}>
        <div style={{ position: 'absolute', left: 160, top: 250 }}><Label at={Math.max(SEMMELWEIS, B_END)} color={DL.gold} size={34}>1847 · SEMMELWEIS · VIENNA</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 310 }}><Label at={MOTHERS} color={DL.dim} size={28}>MOTHERS WHO DIED · THE FIRST CLINIC</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 360 }}>
          <MonthBars h={300} w={220} bars={[
            { m: 'BEFORE · APRIL', value: 18.3, label: '18.3 %', at: BEFORE, color: DL.red },
            { m: 'AFTER · JUNE', value: 2.2, label: '2.2 %', at: AFTER, color: DL.green },
          ]} />
        </div>
        <div style={{ position: 'absolute', left: 820, top: 560 }}><PropTag kind="basin" at={HAND} size={150} name="HAND WASHING · CHLORINATED LIME" /></div>
        <div style={{ position: 'absolute', left: 1260, top: 430 }}><StampText text="COUNTED" at={COUNTED1} color={DL.green} size={64} tilt={-6} /></div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={AFTER}>Vienna General Hospital, First Clinic · maternal deaths April 1847 18.3 %, June 2.2 % (handwashing from mid-May)</Source></div>
      </AbsoluteFill>

      {/* the streptomycin trial: chance decides, two alike groups, counted (M7) */}
      <AbsoluteFill style={{ opacity: trial }}>
        <div style={{ position: 'absolute', left: 160, top: 250 }}><Label at={C_END} color={DL.gold} size={34}>1948 · THE STREPTOMYCIN TRIAL<OnWord at={FURTHER}> · WENT FURTHER</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 360, width: 420, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <PropTag kind="envelope" at={CHANCE} size={170} name="CHANCE DECIDED" />
          <Label at={DRUG1} color={DL.text} size={30}>WHO GOT THE DRUG</Label>
        </div>
        <div style={{ position: 'absolute', left: 640, top: 360, display: 'flex', alignItems: 'center', gap: 30 }}>
          <GroupBox name="GROUP A" at={TWO1} color={DL.gold} />
          <span style={{ fontFamily: DL_SERIF, fontSize: 110, color: DL.text, opacity: ease(f, ALIKE - 2, ALIKE + 4), transform: `scale(${ease(f, ALIKE - 2, ALIKE + 10, 1.4, 1)})`, display: 'inline-block' }}>=</span>
          <GroupBox name="GROUP B" at={GROUPS} color={DL.warm} />
        </div>
        <div style={{ position: 'absolute', left: 640, top: 580 }}><Label at={ALIKE} color={DL.dim} size={30}>THE TWO GROUPS WERE ALIKE</Label></div>
        <div style={{ position: 'absolute', left: 1260, top: 680 }}><StampText text="COUNTED" at={COUNTED2} color={DL.green} size={64} tilt={-6} /></div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={CHANCE}>MRC trial, BMJ 1948 · allocation by random sampling numbers in sealed envelopes (Bradford Hill)</Source></div>
      </AbsoluteFill>

      {/* the guess (M7): 4 of 55 vs 14 of 52 within six months */}
      <AbsoluteFill style={{ opacity: guess }}>
        <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(GUESS, D_END)} color={DYT.magenta} size={34}>YOUR GUESS<OnWord at={WITHIN}> · DEATHS WITHIN SIX MONTHS</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 280 }}>
          <TwoGroups perRow={20} dot={30}
            a={{ label: <>55<OnWord at={DRUG2}> GOT THE DRUG</OnWord></>, n: 55, dead: 4, deadAt: FOUR, at: FIVE1, color: DL.gold }}
            b={{ label: <>52<OnWord at={BED}> · BED REST ALONE</OnWord></>, n: 52, dead: 14, deadAt: FOURTEEN, at: TWO2, color: DL.warm }} />
        </div>
        <div style={{ position: 'absolute', left: 1120, top: 270 }}><Figure value="4" label="DIED" at={FOUR} color={DL.red} size={130} /></div>
        <div style={{ position: 'absolute', left: 1120, top: 470 }}><Figure value="14" label="DIED" at={FOURTEEN} color={DL.red} size={130} /></div>
        <div style={{ position: 'absolute', left: 160, top: 680, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 80, color: DYT.magenta, opacity: ease(f, HOW1 - 2, HOW1 + 4), transform: `scale(${1 + 0.08 * ease(f, HOW1, HOW1 + 5) * (1 - ease(f, HOW1 + 8, HOW1 + 22))})`, transformOrigin: 'left center' }}>How close were you?</div>
        <div style={{ position: 'absolute', left: 160, top: 820 }}><Source at={FOUR}>MRC streptomycin trial, BMJ 1948 · deaths in the first six months<OnWord at={FOURTEEN}> · 4 of 55 vs 14 of 52</OnWord></Source></div>
      </AbsoluteFill>

      {/* the first of its kind (hedged), and the older idea: Lind 1747 */}
      <AbsoluteFill style={{ opacity: lind }}>
        <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={E_END} color={DL.dim} size={30}>THAT TRIAL</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 270, width: 1600, fontFamily: DL_SERIF, fontSize: 76, lineHeight: 1.2, color: DL.text }}>
          <span style={{ opacity: ease(f, OFTEN - 2, OFTEN + 4), fontStyle: 'italic', color: DL.dim }}>is often called</span>
          <span style={{ opacity: ease(f, FIRST - 2, FIRST + 4), color: DL.gold }}> the first of its kind.</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 380 }}><Source at={OFTEN}>widely called the first randomised trial of a cure · not blinded, no placebo (James Lind Library)</Source></div>
        <div style={{ position: 'absolute', left: 160, top: 460 }}><Label at={BUT} color={DL.gold} size={34}>BUT<OnWord at={IDEA}> THE IDEA</OnWord><OnWord at={OLDER}> WAS OLDER</OnWord></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 530, display: 'flex', alignItems: 'baseline', gap: 26 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 96, color: DL.text, opacity: ease(f, SEVENTEEN1 - 2, SEVENTEEN1 + 4) }}>1747</span>
          <span style={{ fontFamily: DL_MONO, fontSize: 32, letterSpacing: 3, color: DL.dim, opacity: ease(f, JAMES - 2, JAMES + 4) }}>JAMES LIND · HMS SALISBURY</span>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 660, display: 'flex', gap: 30 }}>
          {LIND_CURES.map((name, i) => {
            const at = SIX2 + i * LIND_STEP;
            return (
              <div key={name} style={{ width: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: ease(f, at - 2, at + 4), transform: `translateY(${ease(f, at - 2, at + 8, 16, 0)}px)` }}>
                <svg width={90} height={110} viewBox="0 0 90 110"><rect x={30} y={6} width={30} height={12} rx={3} fill="#8a6a40" /><path d="M32 18 L58 18 L58 30 L72 44 L72 100 Q72 104 68 104 L22 104 Q18 104 18 100 L18 44 L32 30 Z" fill="#e8f0f4" stroke="#8a9aa4" strokeWidth={3} /><rect x={20} y={60} width={50} height={42} fill={LIND_FILL[i]} opacity={0.85} /></svg>
                <span style={{ fontFamily: DL_MONO, fontSize: 22, letterSpacing: 1, color: DL.warm, whiteSpace: 'nowrap' }}>{name}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', left: 160, top: 820 }}><Label at={LIND_LAST} color={DL.text} size={30}>SIX CURES FOR SCURVY · 12 SAILORS, 6 PAIRS</Label></div>
        <div style={{ position: 'absolute', left: 160, top: 875 }}><Source at={LIND_LAST}>Lind, A Treatise of the Scurvy (1753), via the James Lind Library · 20 May 1747</Source></div>
      </AbsoluteFill>

      {/* the walk-back */}
      <MedLadder rungs={medRungs(6, true)} show={ladderShow} mode="full" litAt={LIT} glowAt={TESTED} />
      <div style={{ position: 'absolute', left: LADDER_FULL.left + LADDER_FULL.width + 14, top: markerY - 30, opacity: marker * ladderShow, fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, lineHeight: '60px', color: DL.gold, textShadow: `0 0 18px ${DL.gold}` }}>◂</div>
      <div style={{ position: 'absolute', left: LADDER_FULL.left, top: 96, opacity: ease(f, WALK_AT - 2, WALK_AT + 4) * (1 - ease(f, ME_AT + 53, ME_AT + 57)) }}><Label at={WALK_AT} color={DL.gold} size={30}>NOW WALK DOWN THE LADDER<OnWord at={ME_AT}> WITH ME</OnWord></Label></div>

      {/* payoff, right column: nobody counted in 1799; the question now tests every new medicine */}
      <div style={{ position: 'absolute', left: 1140, top: 290, width: 620, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontFamily: DL_SERIF, fontSize: 52, lineHeight: 1.15, color: DL.dim, opacity: ease(f, SEVENTEEN2 - 2, SEVENTEEN2 + 4) }}>In 1799,<span style={{ opacity: ease(f, NOBODY - 2, NOBODY + 4) }}> nobody was</span><span style={{ color: DL.red, opacity: ease(f, COUNTING - 2, COUNTING + 4) }}> counting.</span></div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 58, lineHeight: 1.15, color: DL.text, opacity: ease(f, TODAY2 - 2, TODAY2 + 4) }}>Today, that question</div>
        <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 76, lineHeight: 1.05, display: 'inline-block', background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, QUESTION2 - 2, QUESTION2 + 4), filter: `drop-shadow(0 0 ${30 * glowAll}px ${DYT.magenta})` }}>Compared with what?</div>
        <div style={{ fontFamily: DL_SERIF, fontSize: 46, lineHeight: 1.2, color: DL.text }}>
          <span style={{ opacity: ease(f, HEART - 2, HEART + 4) }}>sits at the heart of</span>
          <span style={{ opacity: ease(f, HOW2 - 2, HOW2 + 4) }}> how new medicines</span>
          <span style={{ color: DL.gold, opacity: ease(f, TESTED - 2, TESTED + 4) }}> are tested.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 1600, top: 180, opacity: ease(f, TESTED - 2, TESTED + 6) }}><MedProp kind="pills" size={110} glow={glowAll} /></div>
    </AbsoluteFill>
  );
};
export default MeReveal;
