import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, medRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  MedProp, PropTag, TwoGroups, YearsStrip, YEARS_PAST_MED, medYearsUpTo, Baby, CountUp, hold, pane, cardOut, QGRAD,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 9/14 — ERA 5: 1948, a hospital ward in Britain (RESEARCH M7, M9). Header + "a hospital ward in Britain" on
// "hospital"; beds in rows (backdrop from frame 0), patients on "Patients", cough puffs on "coughing". DYK (M7): the
// doctors don't choose on "choose", a table of random numbers on "table" (no 4 anywhere in it). THE PATIENT: A NEW DRUG ·
// STREPTOMYCIN vial on its word, SCARCE stamp, NOT ENOUGH FOR EVERYONE (3 of 10 lit) on "everyone", A STATISTICIAN ·
// AUSTIN BRADFORD HILL · MAKES A PLAN on their words. THE PLAN: random numbers on "random", sealed envelopes on "sealed"
// that shuffle on "envelopes", the admitting doctors CAN'T SEE THEM (eye struck through) on "see"; TwoGroups 55 / 52 on
// "One" / "other" with NO deaths (deadAt −1: the answer belongs to MeReveal), THEN THEY COUNT with a scan on "count.".
// THE YEARS (M9): Britain ≈ 68 (1948: 68.4) on "sixty" + strip pill. "So what is medicine now?" = "?"; PROOF chip on
// "Proof." (slot 4, docks). DON'T BELIEVE IT. / TEST IT, FAIRLY. (a level scale). Cliffhanger: a results envelope stays
// shut, "?" on "right?", a sun on "morning", a germ dissolves on "disappears." — NEXT ▸ TODAY. Never shows 4 or 14.
// VO me08 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me1948', durationInSeconds: 58.36666666666667, fps: 30, width: 1920, height: 1080 };
const DUR = 1751;

const C = makeCue(vo, 'me08-1948', 0.8);
const NINETEEN = C.at('nineteen');
const HOSPITAL = C.at('hospital');
const BRITAIN1 = C.at('Britain.', 1);
const DOCK = BRITAIN1 + 46;
const PATIENTS1 = C.at('Patients', 1);
const TB = C.at('tuberculosis');
const ROWS = C.at('rows.');
const ONLY = C.at('only');
const COUGHING = C.at('coughing.');
const DID = C.at('Did');
const HERE = C.at('here,');
const DOCTORS1 = C.at('doctors', 1);
const CHOOSE = C.at('choose');
const NEW1 = C.at('new', 1);
const TABLE = C.at('table');
const RANDOM1 = C.at('random', 1);
const DOES = C.at('does.');
const PATIENT = C.at('patient.');
const NEW2 = C.at('new', 2);
const STREPTO = C.at('streptomycin,');
const SCARCE = C.at('scarce.');
const ISNT = C.at("isn't");
const EVERYONE = C.at('everyone.');
const STATISTICIAN = C.at('statistician,');
const AUSTIN = C.at('Austin');
const HILL = C.at('Hill,');
const MAKES = C.at('makes');
const PLAN = C.at('plan.');
const CHOICES = C.at('choices');
const RANDOM2 = C.at('random', 2);
const SEALED = C.at('sealed');
const ENVELOPES = C.at('envelopes.');
const DOCTORS2 = C.at('doctors', 2);
const ADMITTING = C.at('admitting');
const CANT = C.at("can't");
const SEE = C.at('see');
const ONE1 = C.at('One', 1);
const DRUG3 = C.at('drug', 3); // 'gets the drug and bed rest' (1 = 'new drug?', 2 = 'new drug,')
const BED1 = C.at('bed', 1);
const OTHER = C.at('other');
const BED2 = C.at('bed', 2);
const ALONE = C.at('alone.');
const THEN = C.at('Then');
const COUNT = C.at('count.');
const HOW = C.at('How');
const BRITAIN2 = C.at('Britain,', 2);
const NEWBORN = C.at('newborn');
const ABOUT = C.at('about');
const SIXTY = C.at('sixty');
const EIGHT2 = C.at('eight', 2); // 'sixty eight' (1 = 'forty eight')
const SO2 = C.at('So', 2); // 'So what is medicine now?' (1 = 'So a statistician')
const NOW_Q = C.at('now?');
const PROOF = C.at('Proof.');
const CHIP_DOCK = PROOF + 80;
const DONT2 = C.at("Don't", 2); // "Don't believe it." (1 = "doctors don't choose")
const BELIEVE = C.at('believe');
const TEST = C.at('Test');
const FAIRLY = C.at('fairly.');
const SIX = C.at('Six');
const NUMBERS3 = C.at('numbers', 3); // 'the numbers are in' (1 = 'random numbers does', 2 = 'random numbers, sealed')
const YOUVE = C.at("You've");
const GUESSED = C.at('guessed');
const WERE = C.at('Were');
const RIGHT = C.at('right?');
const FIRST = C.at('First,');
const MORNING = C.at('morning.');
const ONE3 = C.at('One', 3); // 'One where a disease disappears' (1 = 'One group', 2 = 'one more morning')
const DISAPPEARS = C.at('disappears.');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(DOES, PATIENT);
const PATIENT_END = hold(PLAN, CHOICES);
const PLAN_END = hold(COUNT, HOW);
const YEARS_END = hold(EIGHT2, SO2);
const PROOF_END = hold(FAIRLY, SIX);

// a printed table of random sampling numbers (illustration; no 4 anywhere, so the answer can't be read into it)
const TABLE_ROWS = ['0 7 9 6 3', '8 1 5 2 0', '3 9 7 0 6', '5 2 8 1 9'];
const DRAW = ['07', '63', '92', '18', '35'];
const BEDS = Array.from({ length: 10 }, (_, i) => ({ x: 250 + (i % 5) * 290, y: i < 5 ? 470 : 660 }));

const EyeShut: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  return (
    <svg width={130} height={80} viewBox="0 0 130 80" style={{ opacity: ease(f, at - 2, at + 4) }}>
      <path d="M8 40 Q65 -4 122 40 Q65 84 8 40 Z" fill="none" stroke={DL.text} strokeWidth={5} />
      <circle cx={65} cy={40} r={14} fill={DL.text} />
      <line x1={18} y1={72} x2={18 + 94 * ease(f, at, at + 8)} y2={72 - 64 * ease(f, at, at + 8)} stroke={DL.red} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};

const Me1948: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  // the ward stays behind the DYK card's scrim so the coughing line is not a flash
  const ward = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, CARD_END - 18, CARD_END - 10));
  const patient = pane(f, CARD_END, PATIENT_END);
  const plan = pane(f, PATIENT_END, PLAN_END);
  const years = pane(f, PLAN_END, YEARS_END);
  const proof = pane(f, PROOF - 2, PROOF_END);
  const cliff = ease(f, PROOF_END - 2, PROOF_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12); // stays to the cut (a fade at "Six" would leave it up for ~1 s)
  const strip = (1 - ease(f, SIX - 6, SIX + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const shuffle = ease(f, ENVELOPES, ENVELOPES + 30);
  const scan = ease(f, COUNT, COUNT + 40);
  const gone = ease(f, DISAPPEARS, DISAPPEARS + 26);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1420" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1948" idx={5} label="BRITAIN" dockAt={DOCK} />
        <WakePlace place="a hospital ward in Britain" at={HOSPITAL} dockAt={DOCK} yearAt={NINETEEN} />

        {/* the ward: beds in rows, patients, only coughing */}
        <AbsoluteFill style={{ opacity: ward }}>
          <div style={{ position: 'absolute', left: 160, top: 840, width: 1600, height: 6, background: '#2a3040' }} />
          {BEDS.map((b, i) => {
            const cough = ease(f, COUGHING - 2, COUGHING + 4) * (i % 3 === 0 ? 1 : 0) * Math.max(0, Math.sin((f - COUGHING + i * 9) / 7));
            return (
              <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, opacity: i < 5 ? 1 : ease(f, ROWS - 2, ROWS + 8), transform: `translateX(${cough * 3 * Math.sin(f)}px)` }}>
                <MedProp kind="bed" size={170} f={f} />
                <div style={{ position: 'absolute', left: 16, top: 46, width: 30, height: 30, borderRadius: '50%', background: DL.warm, opacity: ease(f, PATIENTS1 - 2 + i * 2, PATIENTS1 + 4 + i * 2) }} />
                <div style={{ position: 'absolute', left: 50, top: 20 - cough * 22, width: 26 + cough * 20, height: 26 + cough * 20, borderRadius: '50%', background: '#c8d0dc', opacity: 0.6 * cough }} />
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={Math.max(PATIENTS1, DOCK + 18)} color={DL.warm} size={32}>PATIENTS<OnWord at={Math.max(TB, DOCK + 18)}> WITH TUBERCULOSIS</OnWord><OnWord at={ROWS}> · IN ROWS</OnWord></Label>
            <Label at={ONLY} color={DL.dim} size={30}>THE ONLY SOUND<OnWord at={COUGHING}>: COUGHING</OnWord></Label>
          </div>
        </AbsoluteFill>

        {/* THE PATIENT: a scarce drug, a statistician's plan */}
        <AbsoluteFill style={{ opacity: patient }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PATIENT} color={DL.gold} size={34}>THE PATIENT · TUBERCULOSIS</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <Label at={NEW2} color={DL.dim} size={30}>A NEW DRUG</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <PropTag kind="vial" at={STREPTO} size={150} name="STREPTOMYCIN" color={DL.gold} level={0.25} />
              <StampText text="SCARCE" at={SCARCE} />
            </div>
            <Label at={ISNT} color={DL.text} size={30}>NOT ENOUGH<OnWord at={EVERYONE}> FOR EVERYONE</OnWord></Label>
            <div style={{ opacity: ease(f, EVERYONE - 2, EVERYONE + 4) }}><PeopleRow n={10} lit={(i) => (i < 3 ? 1 : 0)} size={50} gap={10} /></div>
          </div>
          <div style={{ position: 'absolute', left: 1060, top: 290, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
            <div style={{ opacity: ease(f, STATISTICIAN - 2, STATISTICIAN + 4) }}><Kid size={130} adult tool="book" color={DL.sky} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 20 }}>
              <Label at={STATISTICIAN} color={DL.dim} size={28}>A STATISTICIAN</Label>
              <Label at={AUSTIN} color={DL.sky} size={34}>AUSTIN BRADFORD HILL</Label>
              <Label at={MAKES} color={DL.text} size={30}>MAKES<OnWord at={PLAN}> A PLAN</OnWord></Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1060, top: 560, opacity: ease(f, PLAN - 2, PLAN + 4) }}>
            <svg width={200} height={240} viewBox="0 0 200 240"><rect x={10} y={20} width={180} height={210} rx={10} fill="#efe8dc" stroke="#9a9080" strokeWidth={4} /><rect x={70} y={6} width={60} height={26} rx={6} fill="#8a8a80" />{[0, 1, 2, 3, 4].map((k) => <line key={k} x1={36} y1={70 + k * 32} x2={36 + 128 * ease(f, PLAN + k * 3, PLAN + k * 3 + 8)} y2={70 + k * 32} stroke="#5a5040" strokeWidth={5} />)}</svg>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={HILL}>Medical Research Council streptomycin trial · BMJ, 30 Oct 1948 · design: A. Bradford Hill</Source></div>
        </AbsoluteFill>

        {/* THE PLAN: random numbers, sealed envelopes, two groups (no deaths shown: the answer is MeReveal's) */}
        <AbsoluteFill style={{ opacity: plan }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={CHOICES} color={DL.gold} size={32}>THE CHOICES<OnWord at={RANDOM2}> · RANDOM NUMBERS</OnWord><OnWord at={SEALED}> · SEALED IN ENVELOPES</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, width: 640, height: 200 }}>
            {DRAW.map((d, i) => {
              const x = i * 124 + (i % 2 === 0 ? 1 : -1) * 62 * Math.sin(shuffle * Math.PI * 2); // shuffling on "envelopes"
              const into = ease(f, SEALED + i * 3, SEALED + i * 3 + 10);
              return (
                <div key={d} style={{ position: 'absolute', left: x, top: 0, width: 110, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 44, color: DL.text, opacity: ease(f, RANDOM2 - 2 + i * 3, RANDOM2 + 4 + i * 3) * (1 - into), transform: `translateY(${into * 60}px) scale(${1 - 0.6 * into})` }}>{d}</div>
                  <div style={{ marginTop: 6, opacity: ease(f, SEALED - 2 + i * 3, SEALED + 4 + i * 3), transform: `translateY(${Math.sin(shuffle * Math.PI * 2 + i) * 14 * (1 - ease(f, ENVELOPES + 24, ENVELOPES + 30))}px)` }}><MedProp kind="envelope" size={110} /></div>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 540, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Label at={DOCTORS2} color={DL.dim} size={28}>THE DOCTORS<OnWord at={ADMITTING}> ADMITTING PATIENTS</OnWord></Label>
              <Label at={CANT} color={DL.red} size={34}>CAN'T SEE THEM</Label>
            </div>
            <EyeShut at={SEE} />
          </div>
          <div style={{ position: 'absolute', left: 880, top: 290 }}>
            <TwoGroups
              a={{ label: <>ONE GROUP<OnWord at={DRUG3}> · STREPTOMYCIN</OnWord><OnWord at={BED1}> + BED REST</OnWord></>, n: 55, dead: 0, deadAt: -1, at: ONE1 }}
              b={{ label: <>THE OTHER<OnWord at={BED2}> · BED REST</OnWord><OnWord at={ALONE}> ALONE</OnWord></>, n: 52, dead: 0, deadAt: -1, at: OTHER, color: DL.sky }} />
            <div style={{ position: 'absolute', left: -10 + 800 * scan, top: 30, width: 8, height: 230, borderRadius: 4, background: DL.text, opacity: 0.8 * ease(f, COUNT - 2, COUNT + 4) * (1 - ease(f, COUNT + 36, COUNT + 42)), boxShadow: `0 0 20px ${DL.text}` }} />
          </div>
          <div style={{ position: 'absolute', left: 880, top: 680, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Label at={THEN} color={DL.text} size={36}>THEN<OnWord at={COUNT}> THEY COUNT.</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={SEALED}>allocation by random sampling numbers in sealed envelopes; investigators did not know · BMJ 1948</Source></div>
        </AbsoluteFill>

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 240 }}><Label at={HOW} color={DL.gold} size={34}>THE YEARS · HOW LONG DO YOU LIVE?<OnWord at={BRITAIN2}> · BRITAIN</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 900, top: 300, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
          <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, ABOUT - 2, ABOUT + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={68} a={ABOUT} b={EIGHT2 + 4} prefix="≈ " /> years</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>at birth · a newborn · UN WPP via OWID<OnWord at={EIGHT2}> (UK 1948: 68.4)</OnWord></span>
          </div>
        </AbsoluteFill>

        {/* "So what is medicine now?" — Proof. Don't believe it. Test it, fairly. */}
        <AskMark at={YEARS_END} out={PROOF + 2} left={760} top={250} pulseAt={NOW_Q} />
        <AbsoluteFill style={{ opacity: proof }}>
          <div style={{ position: 'absolute', left: 260, top: 260, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 72, color: DL.dim, opacity: ease(f, DONT2 - 2, DONT2 + 4) }}>Don't<OnWord at={BELIEVE}> believe it.</OnWord></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 84, color: DL.gold, opacity: ease(f, TEST - 2, TEST + 4) }}>Test it,<OnWord at={FAIRLY}> fairly.</OnWord></div>
              <div style={{ opacity: ease(f, FAIRLY - 2, FAIRLY + 4), transform: `scale(${ease(f, FAIRLY - 2, FAIRLY + 10, 1.2, 1)})` }}><MedProp kind="scale" size={150} tilt={10 * (1 - ease(f, FAIRLY, FAIRLY + 16))} glow={0.6} /></div>
            </div>
          </div>
        </AbsoluteFill>
        <MedChip text="PROOF" at={PROOF} dockAt={CHIP_DOCK} slot={4} left={260} top={720} />

        {/* cliffhanger: six months later the numbers are in — the envelope stays shut */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 260, top: 230 }}><Label at={Math.max(SIX, PROOF_END)} color={DL.dim} size={32}>SIX MONTHS LATER<OnWord at={NUMBERS3}> · THE NUMBERS ARE IN</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'center', gap: 40, opacity: 1 - 0.6 * ease(f, FIRST - 2, FIRST + 8) }}>
            <div style={{ transform: `rotate(${Math.sin((f - NUMBERS3) / 3) * 4 * ease(f, NUMBERS3, NUMBERS3 + 4) * (1 - ease(f, NUMBERS3 + 14, NUMBERS3 + 20))}deg)` }}><MedProp kind="envelope" size={240} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontFamily: DL_MONO, fontSize: 30 }}>
              <div style={{ color: DL.gold, opacity: ease(f, NUMBERS3 - 2, NUMBERS3 + 4) }}>STREPTOMYCIN + BED REST ·<span style={{ opacity: ease(f, GUESSED - 2, GUESSED + 4) }}> ?</span></div>
              <div style={{ color: DL.sky, opacity: ease(f, NUMBERS3 + 4, NUMBERS3 + 10) }}>BED REST ALONE ·<span style={{ opacity: ease(f, GUESSED + 4, GUESSED + 10) }}> ?</span></div>
            </div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 200, lineHeight: 1, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, RIGHT - 2, RIGHT + 4), transform: `scale(${ease(f, RIGHT - 2, RIGHT + 10, 1.3, 1)})` }}>?</div>
          </div>
          <div style={{ position: 'absolute', left: 300, top: 560, width: 220, height: 120, overflow: 'hidden', opacity: ease(f, MORNING - 2, MORNING + 6) }}>
            <div style={{ position: 'absolute', left: 30, top: 120 - 90 * ease(f, MORNING, MORNING + 30), width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(#ffe08a, #ffb020)', boxShadow: '0 0 50px #ffb02088' }} />
          </div>
          <div style={{ position: 'absolute', left: 620, top: 560, opacity: ease(f, ONE3 - 2, ONE3 + 4) * (1 - gone), transform: `scale(${1 - 0.5 * gone})`, filter: `blur(${8 * gone}px)` }}><MedProp kind="germ" size={130} f={f} /></div>
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: 'absolute', left: 680 + Math.cos(k * 1.3) * 90 * gone, top: 620 + Math.sin(k * 1.3) * 70 * gone, width: 10, height: 10, borderRadius: '50%', background: DL.gold, opacity: gone * (1 - ease(f, DISAPPEARS + 20, DISAPPEARS + 40)) }} />)}
        </AbsoluteFill>

        <YearsStrip items={[...medYearsUpTo(4), { ...YEARS_PAST_MED[4], at: SIXTY }]} show={strip} />
        <MedLadder rungs={[...medRungs(4), { year: '1948', label: 'PROOF', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={HERE}>here, </OnWord><OnWord at={DOCTORS1}>the doctors </OnWord><span style={{ opacity: ease(f, CHOOSE - 2, CHOOSE + 4), color: '#ffd23f' }}>don't choose </span>
          <span style={{ opacity: ease(f, NEW1 - 2, NEW1 + 4), color: '#ff9a1f', fontStyle: 'italic' }}>who gets the new drug?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 36 }}>
            <div style={{ padding: '12px 20px', borderRadius: 10, background: '#efe8dc', opacity: ease(f, TABLE - 2, TABLE + 4), transform: `rotate(-2deg) scale(${ease(f, TABLE - 2, TABLE + 8, 1.15, 1)})` }}>
              {TABLE_ROWS.map((r, i) => <div key={i} style={{ fontFamily: DL_MONO, fontSize: 28, lineHeight: 1.2, letterSpacing: 4, color: '#2a2620', opacity: ease(f, TABLE + i * 3, TABLE + i * 3 + 6) }}>{r}</div>)}
            </div>
            <div style={{ fontFamily: DL_MONO, fontSize: 36, color: '#ffffff', lineHeight: 1.3 }}>
              <OnWord at={TABLE}>A TABLE OF </OnWord><span style={{ opacity: ease(f, RANDOM1 - 2, RANDOM1 + 4), color: '#ffd23f' }}>RANDOM NUMBERS</span><span style={{ opacity: ease(f, DOES - 2, DOES + 4), color: '#ff9a1f' }}> DOES.</span>
              <div style={{ marginTop: 10, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, DOES - 2, DOES + 4) }}>MRC streptomycin trial · BMJ, 30 Oct 1948</div>
            </div>
          </div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="TODAY" parts={[{ text: 'Six months later,', at: SIX }, { text: 'the numbers are in.', at: NUMBERS3 }, { text: "You've already guessed them.", at: YOUVE }, { text: 'Were you right?', at: WERE }, { text: 'First, one more morning.', at: FIRST }, { text: 'One where a disease disappears.', at: ONE3 }]} />
      <EpisodeHud year={1948} episode="06" />
    </AbsoluteFill>
  );
};
export default Me1948;
