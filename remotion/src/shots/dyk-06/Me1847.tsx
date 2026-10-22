import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, medRungs, Label, Source, StampText, AskMark, OnWord, Kid,
  YearsStrip, YEARS_PAST_MED, medYearsUpTo, Baby, CountUp, hold, pane, cardOut, MedProp, PropTag, MonthBars,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 7/14 — ERA 3: 1847, Vienna, the maternity ward of the General Hospital (RESEARCH M5, M12, M9). Header +
// "Vienna" on its word; the ward (beds, a frosted window) with A COLD MORNING · THE MATERNITY WARD · GENERAL HOSPITAL on
// their words. DYK (M5): the doctors' clinic, April, about eighteen in every hundred mothers died; a 100-dot grid with 18
// lit on "Eighteen in a hundred." THE PATIENT: a new mother on "new"; IGNAZ SEMMELWEIS on "Ignaz"; the two clinics side
// by side (M12, 1840–46: ≈ 98 vs ≈ 36 deaths per 1,000 births), FAR LESS OFTEN on "less". THE CHANGE: basin on "wash",
// chlorinated lime on "chlorinated", BEFORE TOUCHING A PATIENT on "before"; REPORTEDLY … THE SMELL OF THE DEAD (hedge on
// screen); HE DOESN'T KNOW ABOUT GERMS, a grey germ + ? on "germs". THEN HE COUNTS: MonthBars (M5) APR 18.3 % · JUN 2.2 %
// · JUL 1.2 % · AUG 1.9 %, each bar on its month's word; handwashing from mid-May between APR and JUN. THE YEARS (M9):
// Britain ≈ 38 on "thirty eight" + strip pill. "So what is medicine now?" = "?"; A PATTERN chip on "Pattern." (slot 2,
// docks); COUNT THE DEATHS (tally) → LOOK FOR THE CAUSE (lens). Cliffhanger: doctors REJECT HIS IDEA, ✓ IT WORKS, ✗ WHY,
// germ + a drug that goes after them, a police officer's helmet; band "And the first patient … in Oxford.", NEXT ▸ 1941.
// VO me06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me1847', durationInSeconds: 67.7, fps: 30, width: 1920, height: 1080 };
const DUR = 2031;

const C = makeCue(vo, 'me06-1847', 0.8);
const EIGHTEEN1 = C.at('eighteen', 1);
const VIENNA = C.at('Vienna.');
const DOCK = VIENNA + 59; // the place line needs 1.5 s
const COLD = C.at('cold');
const MATERNITY = C.at('maternity');
const GENERAL = C.at('General');
const DID = C.at('Did');
const DOCTORS1 = C.at("doctors'", 1);
const APRIL1 = C.at('April,', 1);
const ABOUT1 = C.at('about', 1);
const EIGHTEEN2 = C.at('eighteen', 2);
const EVERY1 = C.at('every', 1);
const MOTHERS1 = C.at('mothers', 1);
const DIED1 = C.at('died', 1);
const AFTER1 = C.at('after', 1);
const EIGHTEEN3 = C.at('Eighteen', 3); // 'Eighteen in a hundred.' (1 = the year, 2 = the card)
const HUNDRED2 = C.at('hundred.', 2);
const PATIENT1 = C.at('patient.', 1);
const NEW = C.at('new');
const YOUNG = C.at('young');
const IGNAZ = C.at('Ignaz');
const YEARS1 = C.at('years,', 1);
const MIDWIVES = C.at('midwives');
const LESS = C.at('less');
const ASKS = C.at('asks');
const WASH = C.at('wash');
const HANDS = C.at('hands');
const CHLORINATED = C.at('chlorinated');
const BEFORE = C.at('before');
const REPORTEDLY = C.at('Reportedly,');
const PICKS = C.at('picks');
const TAKES = C.at('takes');
const SMELL = C.at('smell');
const DOESNT = C.at("doesn't");
const GERMS1 = C.at('germs', 1);
const THEN1 = C.at('Then', 1);
const COUNTS = C.at('counts.');
const APRIL2 = C.at('April,', 2);
const JUNE = C.at('June,');
const JULY = C.at('July,');
const AUGUST = C.at('August,');
const HOW = C.at('How');
const BRITAIN = C.at('Britain,');
const NEWBORN = C.at('newborn');
const ABOUT6 = C.at('about', 6); // 'expect about thirty eight' (1 = card, 2 = 'about germs', 3–5 = the months)
const THIRTY = C.at('thirty');
const EIGHT = C.at('eight');
const SO = C.at('So');
const NOW = C.at('now?');
const PATTERN = C.at('Pattern.');
const CHIP_DOCK = PATTERN + 80;
const COUNT = C.at('Count');
const DEATHS = C.at('deaths,');
const LOOK = C.at('look');
const CAUSE = C.at('cause.');
const MOST = C.at('Most');
const REJECT = C.at('reject');
const SHOW1 = C.at('show', 1);
const WORKS = C.at('works.');
const CANT = C.at("can't");
const WHY = C.at('why.');
const GERMS2 = C.at('germs,', 2);
const DRUG = C.at('drug');
const GOES = C.at('goes');
const AFTER2 = C.at('after', 2); // 'goes after them' (1 = 'after giving birth')
const AND2 = C.at('And', 2); // 'And the first patient' (1 = 'germs, and a drug')
const FIRST = C.at('first');
const IS2 = C.at('is', 2); // 'is a police officer' (1 = 'what is medicine')
const POLICE = C.at('police');
const IN10 = C.at('in', 10); // 'in Oxford.'
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(HUNDRED2, PATIENT1);
const PAT_END = hold(LESS, ASKS);
const WASH_END = hold(GERMS1, THEN1);
const MONTH_END = hold(AUGUST, HOW);
const YEARS_END = hold(EIGHT, SO);
const PATTERN_END = hold(CAUSE, MOST);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
// a tall ward window: frost creeps in on "cold", a pale morning light behind it
const WardWindow: React.FC<{ frost: number; light: number }> = ({ frost, light }) => (
  <svg width={260} height={340} viewBox="0 0 260 340">
    <rect x={10} y={10} width={240} height={320} rx={8} fill={`rgba(170,200,230,${0.18 + 0.4 * light})`} stroke="#6a6258" strokeWidth={10} />
    <line x1={130} y1={10} x2={130} y2={330} stroke="#6a6258" strokeWidth={8} /><line x1={10} y1={170} x2={250} y2={170} stroke="#6a6258" strokeWidth={8} />
    {[[30, 300], [150, 300], [30, 140], [150, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q20 -26 40 -6 q16 -30 40 -4 q10 -18 0 -30`} stroke="#eaf4ff" strokeWidth={4} fill="none" opacity={0.8 * frost} />)}
  </svg>
);
// ward beds in a row (props), the mothers' ward
const Ward: React.FC = () => (
  <div style={{ display: 'flex', gap: 46 }}>{Array.from({ length: 6 }, (_, i) => <MedProp key={i} kind="bed" size={170} />)}</div>
);
// a 100-dot grid, `lit` of them light one by one from `at`
const DotGrid: React.FC<{ lit: number; at: number; f: number }> = ({ lit, at, f }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(25, 20px)', gap: 6 }}>
    {Array.from({ length: 100 }, (_, i) => {
      const on = i < lit ? ease(f, at + i, at + i + 4) : 0;
      return <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: on > 0.5 ? '#ff4d4d' : '#c8cdf0', opacity: 0.35 + 0.65 * on, boxShadow: on > 0.5 ? '0 0 8px #ff4d4d' : 'none' }} />;
    })}
  </div>
);
// tally marks (5-bar gates) drawing in from `at`
const Tally: React.FC<{ at: number; f: number }> = ({ at, f }) => (
  <svg width={300} height={120} viewBox="0 0 300 120">
    {Array.from({ length: 3 }, (_, g) => (
      <g key={g} transform={`translate(${g * 100} 0)`} opacity={ease(f, at + g * 6, at + g * 6 + 6)}>
        {[0, 1, 2, 3].map((k) => <line key={k} x1={14 + k * 18} y1={14} x2={14 + k * 18} y2={106} stroke={DL.text} strokeWidth={7} strokeLinecap="round" />)}
        <line x1={2} y1={86} x2={80} y2={30} stroke={DL.red} strokeWidth={7} strokeLinecap="round" />
      </g>
    ))}
  </svg>
);
// a magnifying lens
const Lens: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><circle cx={40} cy={40} r={28} fill="#38bdf822" stroke={DL.gold} strokeWidth={7} /><line x1={60} y1={60} x2={92} y2={92} stroke={DL.gold} strokeWidth={10} strokeLinecap="round" /></svg>
);
// a British police officer's helmet (custodian)
const Helmet: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M22 80 Q20 26 50 12 Q80 26 78 80 Z" fill="#1a2238" stroke="#0a0e1a" strokeWidth={3} /><circle cx={50} cy={10} r={6} fill="#1a2238" /><rect x={10} y={78} width={80} height={10} rx={4} fill="#121828" /><path d="M50 40 l10 8 l-4 14 l-12 0 l-4 -14 Z" fill="#c8ccd4" /></svg>
);
// one clinic's death rate, 1840–46 (M12)
const Clinic: React.FC<{ head: string; value: string; color: string; at: number; valueAt: number; f: number }> = ({ head, value, color, at, valueAt, f }) => (
  <div style={{ width: 900, padding: '20px 30px', boxSizing: 'border-box', borderRadius: 18, border: `2px solid ${color}`, background: '#0e0b0af0', opacity: ease(f, at - 2, at + 4) }}>
    <div style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>{head}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 6, opacity: ease(f, valueAt - 2, valueAt + 4) }}>
      <span style={{ fontFamily: DL_SERIF, fontSize: 84, color }}>{value}</span>
      <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.text }}>DEATHS PER 1,000 BIRTHS</span>
    </div>
  </div>
);

const Me1847: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const ward = Math.max(0.35 * ease(f, 0, 12), ease(f, MATERNITY - 2, MATERNITY + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const patient = pane(f, CARD_END, PAT_END);
  const wash = pane(f, PAT_END, WASH_END);
  const months = pane(f, WASH_END, MONTH_END);
  const years = pane(f, MONTH_END, YEARS_END);
  const pattern = pane(f, PATTERN - 2, PATTERN_END);
  const cliff = ease(f, PATTERN_END - 2, PATTERN_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, AND2 - 2, AND2 + 4));
  const strip = (1 - ease(f, AND2 - 6, AND2 + 2)) * ease(f, DOCK - 2, DOCK + 4);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0e1420" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* the maternity ward on a cold morning (behind the header) */}
        <AbsoluteFill style={{ opacity: ward }}>
          <div style={{ position: 'absolute', left: 1440, top: 300 }}><WardWindow frost={ease(f, COLD - 2, COLD + 24)} light={ease(f, COLD + 6, COLD + 30)} /></div>
          <div style={{ position: 'absolute', left: 170, top: 700 }}><Ward /></div>
          <div style={{ position: 'absolute', left: 160, top: 230 }}>
            <Label at={COLD} color={DL.sky} size={32}>A COLD MORNING<OnWord at={MATERNITY}> · THE MATERNITY WARD</OnWord><OnWord at={GENERAL}> · GENERAL HOSPITAL</OnWord></Label>
          </div>
        </AbsoluteFill>

        <EraHeader year="1847" idx={3} label="VIENNA" dockAt={DOCK} />
        <WakePlace place="Vienna" at={VIENNA} dockAt={DOCK} yearAt={EIGHTEEN1} />

        {/* THE PATIENT: a new mother; Semmelweis compares the two clinics */}
        <AbsoluteFill style={{ opacity: patient }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={PATIENT1} color={DL.gold} size={34}>THE PATIENT</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', alignItems: 'flex-end', gap: 10, opacity: ease(f, NEW - 2, NEW + 4) }}>
            <Kid size={120} adult girl color={DL.warm} /><Baby size={80} />
          </div>
          <div style={{ position: 'absolute', left: 470, top: 290, opacity: ease(f, YOUNG - 2, YOUNG + 4) }}><Kid size={120} adult color={DL.sky} tool="book" /></div>
          <div style={{ position: 'absolute', left: 160, top: 510, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={NEW} color={DL.text} size={30}>A NEW MOTHER</Label>
            <Label at={YOUNG} color={DL.dim} size={30}>A YOUNG DOCTOR</Label>
            <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.gold, opacity: ease(f, IGNAZ - 2, IGNAZ + 4) }}>Ignaz Semmelweis</div>
          </div>
          <div style={{ position: 'absolute', left: 860, top: 220, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Clinic head="FIRST CLINIC · DOCTORS · 1840–46" value="≈ 98" color={DL.red} at={YEARS1} valueAt={YEARS1} f={f} />
            <Clinic head="SECOND CLINIC · MIDWIVES · 1840–46" value="≈ 36" color={DL.green} at={MIDWIVES} valueAt={LESS} f={f} />
          </div>
          <div style={{ position: 'absolute', left: 860, top: 640 }}><StampText text="FAR LESS OFTEN" at={LESS} color={DL.green} size={40} tilt={-2} /></div>
          <div style={{ position: 'absolute', left: 860, top: 760, width: 900 }}><Source at={LESS}>maternal deaths per 1,000 births, 1840–46 · 98.4 vs 36.2 · Vienna General Hospital (PMC3807776)</Source></div>
        </AbsoluteFill>

        {/* THE CHANGE: wash in chlorinated lime — and why he picked it */}
        <AbsoluteFill style={{ opacity: wash }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={PAT_END} color={DL.gold} size={34}>HE ASKS EVERY DOCTOR<OnWord at={WASH}> TO WASH</OnWord><OnWord at={HANDS}> THEIR HANDS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 200, top: 290, display: 'flex', alignItems: 'flex-end', gap: 50 }}>
            <PropTag kind="basin" at={WASH} size={150} />
            <PropTag kind="lime" at={CHLORINATED} size={150} color={DL.green} />
          </div>
          <div style={{ position: 'absolute', left: 760, top: 340 }}><Label at={BEFORE} color={DL.text} size={34}>…BEFORE TOUCHING A PATIENT</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 530, fontFamily: DL_MONO, fontSize: 34, letterSpacing: 2, color: DL.text }}>
            <span style={{ opacity: ease(f, REPORTEDLY - 2, REPORTEDLY + 4), color: DL.gold }}>REPORTEDLY, </span>
            <OnWord at={PICKS}>HE PICKS IT </OnWord><OnWord at={TAKES}>BECAUSE IT TAKES AWAY </OnWord>
            <span style={{ opacity: ease(f, SMELL - 2, SMELL + 4), color: DL.warm }}>THE SMELL OF THE DEAD</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 640, display: 'flex', alignItems: 'center', gap: 30 }}>
            <Label at={DOESNT} color={DL.dim} size={34}>HE DOESN'T KNOW ABOUT</Label>
            <div style={{ position: 'relative', opacity: ease(f, GERMS1 - 2, GERMS1 + 4) }}>
              <MedProp kind="germ" size={130} f={f} dim={0.8} />
              <span style={{ position: 'absolute', left: 40, top: 6, fontFamily: DL_SERIF, fontSize: 96, color: DL.gold }}>?</span>
            </div>
            <Label at={GERMS1} color={DL.dim} size={34}>GERMS</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 820 }}><Source at={SMELL}>chosen to remove the smell of dead tissue, not because disinfection was understood · PMC3807776; Museum of Health Care</Source></div>
        </AbsoluteFill>

        {/* THEN HE COUNTS: the First Clinic's monthly deaths, 1847 */}
        <AbsoluteFill style={{ opacity: months }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={WASH_END} color={DL.gold} size={34}>THEN HE COUNTS · FIRST CLINIC · MOTHERS WHO DIED, 1847</Label></div>
          <div style={{ position: 'absolute', left: 260, top: 280, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
            <MonthBars bars={[{ m: 'APR', value: 18.3, label: '18.3 %', at: APRIL2, color: DL.red }]} />
            <div style={{ width: 4, height: 420, marginBottom: 36, background: `repeating-linear-gradient(${DL.sky} 0 14px, transparent 14px 26px)`, opacity: ease(f, JUNE - 2, JUNE + 4) }} />
            <MonthBars bars={[
              { m: 'JUN', value: 2.2, label: '2.2 %', at: JUNE, color: DL.green },
              { m: 'JUL', value: 1.2, label: '1.2 %', at: JULY, color: DL.green },
              { m: 'AUG', value: 1.9, label: '1.9 %', at: AUGUST, color: DL.green },
            ]} />
          </div>
          <div style={{ position: 'absolute', left: 500, top: 300 }}><Label at={JUNE} color={DL.sky} size={28}>◂ HANDWASHING FROM MID-MAY</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 840 }}><Source at={APRIL2}>Semmelweis's First Clinic figures, 1847 · maternal deaths per month · PMC3807776</Source></div>
        </AbsoluteFill>

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={MONTH_END} color={DL.gold} size={34}>THE YEARS · HOW LONG DO YOU LIVE?<OnWord at={BRITAIN}> · BRITAIN, 1847</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 900, top: 300, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
          <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', flexDirection: 'column', gap: 8, opacity: ease(f, ABOUT6 - 2, ABOUT6 + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={38} a={ABOUT6} b={EIGHT + 4} prefix="≈ " /> years</span>
            <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.dim }}>UK · at birth · average · OWID (38.5)</span>
          </div>
        </AbsoluteFill>

        {/* "So what is medicine now?" — a pattern: count the deaths, then look for the cause */}
        <AskMark at={YEARS_END} out={PATTERN + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: pattern }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: ease(f, COUNT - 2, COUNT + 4) }}>
              <div style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}><Tally at={DEATHS} f={f} /></div>
              <Label at={COUNT} color={DL.text} size={34}>COUNT<OnWord at={DEATHS}> THE DEATHS</OnWord></Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, LOOK - 2, LOOK + 4) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 80, color: DL.dim }}>→</span>
              <Lens size={110} />
              <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.gold }}>look for<OnWord at={CAUSE}> the cause</OnWord></div>
            </div>
          </div>
        </AbsoluteFill>
        <MedChip text="A PATTERN" at={PATTERN} dockAt={CHIP_DOCK} slot={2} left={260} top={720} />

        {/* cliffhanger: rejected; it works, but why? germs, a drug — and a police officer in Oxford */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 14 }}>
            {Array.from({ length: 5 }, (_, i) => <Kid key={i} size={70} adult color={DL.dim} />)}
          </div>
          <div style={{ position: 'absolute', left: 170, top: 380 }}><StampText text="REJECT HIS IDEA" at={REJECT} color={DL.red} size={40} tilt={-3} /></div>
          <div style={{ position: 'absolute', left: 660, top: 230, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.green }}><OnWord at={SHOW1}>he can show </OnWord><OnWord at={WORKS}>it works ✓</OnWord></div>
            <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.red }}><OnWord at={CANT}>he can't show </OnWord><OnWord at={WHY}>why ✗</OnWord></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 540, display: 'flex', alignItems: 'center', gap: 30 }}>
            <PropTag kind="vial" at={DRUG} size={130} name="A DRUG" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, GOES - 2, GOES + 4) }}>
              <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.gold, lineHeight: 1 }}>→</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.gold }}>GOES<OnWord at={AFTER2}> AFTER THEM</OnWord></span>
            </div>
            <PropTag kind="germ" at={GERMS2} size={130} name="GERMS" color={DL.green} />
          </div>
          <div style={{ position: 'absolute', left: 1080, top: 520, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Label at={FIRST} color={DL.dim} size={30}>THE FIRST PATIENT</Label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, POLICE - 2, POLICE + 4), transform: `scale(${ease(f, POLICE - 2, POLICE + 10, 1.25, 1)})` }}>
              <Helmet size={150} />
              <span style={{ fontFamily: DL_MONO, fontSize: 24, color: DL.sky }}>A POLICE OFFICER</span>
            </div>
          </div>
        </AbsoluteFill>

        <YearsStrip items={[...medYearsUpTo(2), { ...YEARS_PAST_MED[2], at: THIRTY }]} show={strip} />
        <MedLadder rungs={[...medRungs(2), { year: '1847', label: 'A PATTERN', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={DOCTORS1}>in the doctors' clinic here, </OnWord><OnWord at={APRIL1}>in April, </OnWord><OnWord at={ABOUT1}>about </OnWord>
          <span style={{ opacity: ease(f, EIGHTEEN2 - 2, EIGHTEEN2 + 4), color: '#ffd23f' }}>eighteen</span><span style={{ opacity: ease(f, EVERY1 - 2, EVERY1 + 4), color: '#ffd23f' }}> in every hundred </span>
          <OnWord at={MOTHERS1}>mothers </OnWord><span style={{ opacity: ease(f, DIED1 - 2, DIED1 + 4), color: '#ff4d4d' }}>died </span><span style={{ opacity: ease(f, AFTER1 - 2, AFTER1 + 4), color: '#ff9a1f', fontStyle: 'italic' }}>after giving birth?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 34, opacity: ease(f, EIGHTEEN3 - 2, EIGHTEEN3 + 4) }}>
            <DotGrid lit={18} at={EIGHTEEN3} f={f} />
            <span style={{ fontFamily: DL_SERIF, fontSize: 64, color: '#ff4d4d', opacity: ease(f, HUNDRED2 - 2, HUNDRED2 + 4) }}>18 / 100</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, EIGHTEEN3 - 2, EIGHTEEN3 + 4) }}>First Clinic, April 1847: 18.3 % · Semmelweis's figures</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1941" parts={[{ text: 'And the first patient to get one', at: AND2 }, { text: 'is a police officer', at: IS2 }, { text: 'in Oxford.', at: IN10 }]} />
      <EpisodeHud year={1847} episode="06" />
    </AbsoluteFill>
  );
};
export default Me1847;
