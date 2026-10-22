import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, medRungs, Label, Source, StampText, AskMark, OnWord, Kid, PeopleRow,
  YearsStrip, YEARS_PAST_MED, medYearsUpTo, Baby, CountUp, hold, pane, cardOut, MedProp, PropTag,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 8/14 — ERA 4: 1941, Oxford, wartime (RESEARCH M6, M13, M9). Header + "Oxford" on its word; a blacked-out
// skyline, searchlights on "wartime", the windows dim on "low". DYK (M13): the scientists collect a patient's urine
// (a flask on "urine") to get the medicine back (vial on "back") and use it again (↺ on "again"); THEY'RE RUNNING OUT on
// "running", the vial level drops. THE PATIENT (M6): ALBERT ALEXANDER on "Albert", a police officer's helmet on "police",
// AN INFECTION · NOTHING CAN STOP on their words; ON 12 FEBRUARY 1941 · A NEW DRUG, the PENICILLIN vial on "penicillin";
// BETTER ✓ on "better"; NOT ENOUGH stamp on "enough"; five day cells on "five" while the vial empties to GONE on "gone";
// WORSE AGAIN · DIES · MARCH 1941 on their words (the figure dims); BY ONE ACCOUNT (hedge on screen) 4 OF THE NEXT 5 —
// five figures on "five", four lit on "recover" (M13). THE IDEA WORKS ✓ · THE SUPPLY IS WHAT FAILS (empty vial). THE
// YEARS (M9): Britain ≈ 61 on "sixty one" + strip pill. "So what is medicine now?" = "?"; A CURE chip on "cure." (slot 3,
// docks); a drug → finds the germ → leaves you alone. Cliffhanger: a handful of people, PROVE IT FOR EVERYONE? (a crowd),
// + 7 YEARS, someone finds a way; NEXT ▸ 1948. VO me07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me1941', durationInSeconds: 57.9667, fps: 30, width: 1920, height: 1080 };
const DUR = 1739;

const C = makeCue(vo, 'me07-1941', 0.8);
const NINETEEN = C.at('nineteen');
const OXFORD = C.at('Oxford.');
const DOCK = OXFORD + 59; // the place line needs 1.5 s
const WARTIME = C.at('wartime,');
const LOW = C.at('low.');
const DID = C.at('Did');
const SCIENTISTS = C.at('scientists');
const COLLECT = C.at('collect');
const URINE = C.at('urine,');
const GET = C.at('get');
const BACK = C.at('back');
const USE = C.at('use');
const AGAIN1 = C.at('again?', 1);
const RUNNING = C.at('running');
const OUT = C.at('out.');
const PATIENT1 = C.at('patient.', 1);
const ALBERT = C.at('Albert');
const POLICE = C.at('police');
const INFECTION = C.at('infection');
const NOTHING = C.at('nothing');
const TWELFTH = C.at('twelfth');
const FEBRUARY = C.at('February,');
const NEW = C.at('new');
const PENICILLIN = C.at('penicillin.');
const WITHIN = C.at('Within');
const BETTER = C.at('better.');
const ENOUGH = C.at('enough.');
const FIVE1 = C.at('five', 1);
const GONE = C.at('gone.');
const WORSE = C.at('worse');
const DIES = C.at('dies');
const MARCH = C.at('March.');
const BY = C.at('By');
const FOUR = C.at('four');
const FIVE2 = C.at('five', 2); // 'of the next five' (1 = 'After five days')
const RECOVER = C.at('recover.');
const THE6 = C.at('The', 6); // 'The idea works.'
const SUPPLY = C.at('supply');
const FAILS = C.at('fails.');
const HOW1 = C.at('How', 1);
const BRITAIN = C.at('Britain,');
const NEWBORN = C.at('newborn');
const ABOUT = C.at('about');
const SIXTY = C.at('sixty');
const ONE3 = C.at('one', 3); // 'sixty one years' (1 = 'forty one', 2 = 'By one account')
const SO = C.at('So');
const NOW = C.at('now?');
const CURE = C.at('cure.');
const CHIP_DOCK = CURE + 80;
const DRUG2 = C.at('drug', 2); // 'A drug that finds the germ' (1 = 'a new drug')
const FINDS1 = C.at('finds', 1);
const GERM = C.at('germ');
const LEAVES = C.at('leaves');
const ALONE = C.at('alone.');
const IT2 = C.at('It', 2); // 'It helps a handful' (1 = 'use it again')
const BUT2 = C.at('But', 2); // 'But how do you prove' (1 = "But there isn't enough")
const PROVE = C.at('prove');
const A9 = C.at('a', 9); // 'a drug works for everyone?'
const DRUG3 = C.at('drug', 3);
const WORKS2 = C.at('works', 2); // 'a drug works for everyone' (1 = 'The idea works.')
const EVERYONE = C.at('everyone?');
const SEVEN = C.at('Seven');
const YEARS2 = C.at('years', 2); // 'Seven years later' (1 = 'sixty one years')
const SOMEONE = C.at('someone');
const WAY = C.at('way.');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(OUT, PATIENT1);
const PAT_END = hold(RECOVER, THE6);
const IDEA_END = hold(FAILS, HOW1);
const YEARS_END = hold(ONE3, SO);
const CURE_END = hold(ALONE, IT2);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
// a blacked-out skyline: windows glow, then dim on "low"; two searchlights sweep from "wartime"
const Skyline: React.FC<{ f: number; lights: number; beams: number }> = ({ f, lights, beams }) => {
  const blocks = [[0, 160, 150], [170, 220, 120], [310, 120, 200], [440, 260, 140], [610, 180, 170], [800, 300, 130], [1000, 140, 190], [1150, 240, 150], [1320, 280, 120]];
  const beam = (x: number, phase: number) => {
    const a = Math.sin(f / 46 + phase) * 0.45;
    const tx = x + Math.sin(a) * 900, ty = 320 - Math.cos(a) * 900;
    return <polygon points={`${x - 6},320 ${x + 6},320 ${tx + 60},${ty} ${tx - 60},${ty}`} fill="#e8f0ff" opacity={0.12 * beams} />;
  };
  return (
    <svg width={1600} height={320} viewBox="0 0 1600 320" style={{ overflow: 'visible' }}>
      {beam(380, 0)}{beam(1180, 1.7)}
      {blocks.map(([x, h, w], i) => (
        <g key={i}>
          <rect x={x} y={320 - h} width={w} height={h} fill="#151a24" stroke="#232a38" strokeWidth={2} />
          {Array.from({ length: Math.floor(h / 50) * 2 }, (_, k) => <rect key={k} x={x + 20 + (k % 2) * (w / 2)} y={320 - h + 20 + Math.floor(k / 2) * 50} width={22} height={18} fill="#f0c860" opacity={(0.25 + 0.6 * ((i + k) % 3 === 0 ? 1 : 0.5)) * lights} />)}
        </g>
      ))}
    </svg>
  );
};
// a lab flask of urine (the team recovered the drug from it, M13)
const Flask: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><rect x={40} y={6} width={20} height={30} fill="#e8f0f4" stroke="#8a9aa4" strokeWidth={3} /><path d="M40 36 L14 88 Q12 94 20 94 L80 94 Q88 94 86 88 L60 36 Z" fill="#e8f0f4" stroke="#8a9aa4" strokeWidth={3} /><path d="M27 62 L73 62 L86 88 Q88 94 80 94 L20 94 Q12 94 14 88 Z" fill="#e8c860" opacity={0.85} /></svg>
);
// a British police officer's helmet (custodian)
const Helmet: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M22 80 Q20 26 50 12 Q80 26 78 80 Z" fill="#1a2238" stroke="#0a0e1a" strokeWidth={3} /><circle cx={50} cy={10} r={6} fill="#1a2238" /><rect x={10} y={78} width={80} height={10} rx={4} fill="#121828" /><path d="M50 40 l10 8 l-4 14 l-12 0 l-4 -14 Z" fill="#c8ccd4" /></svg>
);
// the officer: a figure with the helmet on
const Officer: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ position: 'relative', width: size, height: size * 1.61 }}>
    <Kid size={size} adult color="#3a4a7a" />
    <div style={{ position: 'absolute', left: size * 0.28, top: -size * 0.02 }}><Helmet size={size * 0.44} /></div>
  </div>
);

const Me1941: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const city = Math.max(0.35 * ease(f, 0, 12), ease(f, WARTIME - 2, WARTIME + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const patient = pane(f, CARD_END, PAT_END);
  const idea = pane(f, PAT_END, IDEA_END);
  const years = pane(f, IDEA_END, YEARS_END);
  const cure = pane(f, CURE - 2, CURE_END);
  const cliff = ease(f, CURE_END - 2, CURE_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT2 - 2, BUT2 + 4));
  const strip = (1 - ease(f, BUT2 - 6, BUT2 + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const supply = 1 - ease(f, FIVE1, GONE); // the vial empties over the five days
  const cardVial = 1 - 0.85 * ease(f, RUNNING, RUNNING + 26);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a0e1a" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* Oxford in wartime: the lights are low (behind the header) */}
        <AbsoluteFill style={{ opacity: city }}>
          <div style={{ position: 'absolute', left: 160, top: 560 }}><Skyline f={f} lights={1 - 0.8 * ease(f, LOW - 2, LOW + 20)} beams={ease(f, WARTIME - 2, WARTIME + 12)} /></div>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={WARTIME} color={DL.sky} size={32}>WARTIME<OnWord at={LOW}> · THE LIGHTS ARE LOW</OnWord></Label></div>
        </AbsoluteFill>
        <EraHeader year="1941" idx={4} label="OXFORD" dockAt={DOCK} />
        <WakePlace place="Oxford" at={OXFORD} dockAt={DOCK} yearAt={NINETEEN} />

        {/* THE PATIENT: Albert Alexander and the first days of penicillin */}
        <AbsoluteFill style={{ opacity: patient }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={PATIENT1} color={DL.gold} size={34}>THE PATIENT</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, opacity: ease(f, POLICE - 2, POLICE + 4) * (1 - 0.6 * ease(f, DIES - 2, DIES + 14)) }}><Officer size={130} /></div>
          <div style={{ position: 'absolute', left: 340, top: 300, width: 480, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 52, color: DL.gold, opacity: ease(f, ALBERT - 2, ALBERT + 4) }}>Albert Alexander</div>
            <Label at={POLICE} color={DL.sky} size={28}>A POLICE OFFICER</Label>
            <Label at={INFECTION} color={DL.text} size={28}>AN INFECTION</Label>
            <Label at={NOTHING} color={DL.red} size={28}>NOTHING CAN STOP</Label>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 210 }}><Label at={TWELFTH} color={DL.gold} size={32}>ON 12<OnWord at={FEBRUARY}> FEBRUARY 1941</OnWord><OnWord at={NEW}> · A NEW DRUG</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 860, top: 280 }}><PropTag kind="vial" at={PENICILLIN} size={170} level={supply} color={DL.gold} /></div>
          <div style={{ position: 'absolute', left: 1120, top: 290, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <Label at={WITHIN} color={DL.dim} size={28}>WITHIN A DAY</Label>
              <span style={{ fontFamily: DL_SERIF, fontSize: 60, color: DL.green, opacity: ease(f, BETTER - 2, BETTER + 4) }}>better ✓</span>
            </div>
            <div><StampText text="NOT ENOUGH" at={ENOUGH} color={DL.red} size={40} tilt={-3} /></div>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 530, display: 'flex', alignItems: 'center', gap: 10, opacity: ease(f, FIVE1 - 2, FIVE1 + 4) }}>
            {Array.from({ length: 5 }, (_, k) => {
              const used = ease(f, FIVE1 + k * 5, FIVE1 + k * 5 + 4);
              return <div key={k} style={{ width: 110, height: 54, borderRadius: 10, border: `2px solid ${DL.gold}`, background: `rgba(212,160,23,${0.55 * used})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_MONO, fontSize: 24, color: DL.text }}>DAY {k + 1}</div>;
            })}
            <span style={{ marginLeft: 16, fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, letterSpacing: 4, color: DL.red, opacity: ease(f, GONE - 2, GONE + 4) }}>GONE</span>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 630 }}>
            <Label at={WORSE} color={DL.red} size={32}>WORSE AGAIN<OnWord at={DIES}> · DIES</OnWord><OnWord at={MARCH}> · MARCH 1941</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 680, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Label at={BY} color={DL.gold} size={28}>BY ONE ACCOUNT</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 64, color: DL.green, opacity: ease(f, FOUR - 2, FOUR + 4) }}>4</span>
              <Label at={FIVE2} color={DL.text} size={28}>OF THE NEXT 5</Label>
              <div style={{ opacity: ease(f, FIVE2 - 2, FIVE2 + 4) }}><PeopleRow n={5} lit={(i) => (i < 4 ? ease(f, RECOVER - 2 + i * 3, RECOVER + 4 + i * 3) : 0)} size={40} gap={8} color={DL.green} /></div>
              <Label at={RECOVER} color={DL.green} size={28}>RECOVER</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 850 }}><Source at={MARCH}>Radcliffe Infirmary, Oxford · treated 12 Feb, died 15 Mar 1941 · University of Oxford; Hektoen</Source></div>
        </AbsoluteFill>

        {/* the idea works; the supply fails */}
        <AbsoluteFill style={{ opacity: idea }}>
          <div style={{ position: 'absolute', left: 260, top: 290, fontFamily: DL_SERIF, fontSize: 96, color: DL.green }}>The idea works ✓</div>
          <div style={{ position: 'absolute', left: 260, top: 470, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, SUPPLY - 2, SUPPLY + 4) }}><MedProp kind="vial" size={150} level={0.04} dim={0.4} /></div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 96, color: DL.text, opacity: ease(f, SUPPLY - 2, SUPPLY + 4) }}>The supply</span>
            <span style={{ fontFamily: DL_SERIF, fontSize: 96, color: DL.red, opacity: ease(f, FAILS - 2, FAILS + 4) }}>fails ✗</span>
          </div>
        </AbsoluteFill>

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={IDEA_END} color={DL.gold} size={34}>THE YEARS · HOW LONG DO YOU LIVE?<OnWord at={BRITAIN}> · BRITAIN, 1941</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 900, top: 300, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
          <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, ABOUT - 2, ABOUT + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={61} a={ABOUT} b={ONE3 + 4} prefix="≈ " /> years</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>UK · at birth · average · OWID (61.3)</span>
          </div>
        </AbsoluteFill>

        {/* "So what is medicine now?" — a cure: a drug that finds the germ and leaves you alone */}
        <AskMark at={YEARS_END} out={CURE + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: cure }}>
          <div style={{ position: 'absolute', left: 260, top: 290, display: 'flex', alignItems: 'center', gap: 30 }}>
            <PropTag kind="vial" at={DRUG2} size={150} name="A DRUG" color={DL.gold} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, FINDS1 - 2, FINDS1 + 4) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 90, lineHeight: 1, color: DL.gold }}>→</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.gold }}>FINDS</span>
            </div>
            <div style={{ position: 'relative' }}>
              <PropTag kind="germ" at={GERM} size={150} color={DL.green} />
              <svg width={190} height={190} viewBox="0 0 190 190" style={{ position: 'absolute', left: -20, top: -20, opacity: ease(f, GERM - 2, GERM + 6) }}><circle cx={95} cy={95} r={86} fill="none" stroke={DL.red} strokeWidth={5} strokeDasharray="14 10" /></svg>
            </div>
            <div style={{ marginLeft: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, LEAVES - 2, LEAVES + 4) }}>
              <Kid size={110} adult color={DL.warm} glow={ease(f, ALONE - 2, ALONE + 10)} />
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.text }}>LEAVES YOU<OnWord at={ALONE}> ALONE</OnWord></span>
            </div>
          </div>
        </AbsoluteFill>
        <MedChip text="A CURE" at={CURE} dockAt={CHIP_DOCK} slot={3} left={260} top={720} />

        {/* cliffhanger: a handful of people — how do you prove it for everyone? Seven years later… */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={CURE_END} color={DL.dim} size={32}>IT HELPS A HANDFUL OF PEOPLE</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 280 }}><PeopleRow n={6} lit={() => 1} size={44} gap={10} color={DL.gold} /></div>
          <div style={{ position: 'absolute', left: 160, top: 420 }}><Label at={PROVE} color={DL.text} size={32}>HOW DO YOU PROVE<OnWord at={DRUG3}> A DRUG</OnWord><OnWord at={WORKS2}> WORKS…</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 480, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, DRUG3 - 2, DRUG3 + 4) }}><MedProp kind="vial" size={100} /></div>
            <div style={{ opacity: ease(f, EVERYONE - 2, EVERYONE + 4) }}><PeopleRow n={20} lit={() => 0} size={30} gap={6} /></div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: DL.gold, opacity: ease(f, EVERYONE - 2, EVERYONE + 4) }}>everyone?</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 640, display: 'flex', alignItems: 'center', gap: 40 }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 80, color: DL.gold, opacity: ease(f, SEVEN - 2, SEVEN + 4) }}>+ 7<OnWord at={YEARS2}> years</OnWord></span>
            <div style={{ opacity: ease(f, SOMEONE - 2, SOMEONE + 4) }}><Kid size={80} adult color={DL.sky} tool="book" glow={ease(f, WAY - 2, WAY + 10)} /></div>
            <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.sky, opacity: ease(f, WAY - 2, WAY + 4) }}>→ a way</span>
          </div>
        </AbsoluteFill>

        <YearsStrip items={[...medYearsUpTo(3), { ...YEARS_PAST_MED[3], at: SIXTY }]} show={strip} />
        <MedLadder rungs={[...medRungs(3), { year: '1941', label: 'A CURE', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={SCIENTISTS}>the scientists here </OnWord><OnWord at={COLLECT}>collect a patient's </OnWord><span style={{ opacity: ease(f, URINE - 2, URINE + 4), color: '#ffd23f' }}>urine</span>
          <OnWord at={GET}>, to get the medicine </OnWord><span style={{ opacity: ease(f, BACK - 2, BACK + 4), color: '#5ad08a' }}>back </span>
          <span style={{ opacity: ease(f, USE - 2, USE + 4), color: '#ff9a1f', fontStyle: 'italic' }}>and use it again?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, URINE - 2, URINE + 4) }}><Flask size={110} /></div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: '#5ad08a', opacity: ease(f, BACK - 2, BACK + 4) }}>→</span>
            <div style={{ opacity: ease(f, BACK - 2, BACK + 4) }}><MedProp kind="vial" size={110} level={cardVial} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ffffff', opacity: ease(f, AGAIN1 - 2, AGAIN1 + 4) }}>↺ USED AGAIN</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: '#ff4d4d', opacity: ease(f, RUNNING - 2, RUNNING + 4) }}> · THEY'RE RUNNING OUT</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, BACK - 2, BACK + 4) }}>Oxford, 1941: the drug was recovered from the patient's urine · University of Oxford; Hektoen</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1948" parts={[{ text: 'But how do you prove', at: BUT2 }, { text: 'a drug works for everyone?', at: A9 }, { text: 'Seven years later,', at: SEVEN }, { text: 'someone finds a way.', at: SOMEONE }]} />
      <EpisodeHud year={1941} episode="06" />
    </AbsoluteFill>
  );
};
export default Me1941;
