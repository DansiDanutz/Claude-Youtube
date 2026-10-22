import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, MED_ARC, medRungs, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  MedProp, YearsStrip, YEARS_PAST_MED, medYearsUpTo, Baby, CountUp, hold, pane, cardOut, BLOOD,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 6/14 — ERA 2: 1799, Mount Vernon, Virginia (RESEARCH M1–M3, M9). Header + "Mount Vernon, Virginia" on its
// words; the house, DECEMBER on its word, snow on "Snow", sleet streaks on "sleet". DYK (M3): three doctors on "three",
// the first one lit on "wanted", a knife on "knife", the other two ✗ on "refused"; the hedge SOME MODERN DOCTORS ARGUE ·
// IT MIGHT HAVE SAVED HIM stays on screen. THE PATIENT (M1, M2): Washington in bed on "patient", · 67 on "sixty",
// STRUGGLING TO BREATHE on its word; AT HIS OWN REQUEST on "At"; bowl 1 (farm overseer) fills on "bleeds"; THEN THE
// DOCTORS TAKE OVER on "Then"; 18 OZ / MORE / 32 OZ bowls one per word; IN ALL · OVER 80 OZ (count-up) · ≈ 2.5 LITRES ·
// IN ≈ 12 HOURS on their words; BY SOME ESTIMATES · ≈ 2/5 OF HIS BLOOD (two of five segments) on "two fifths"; HE DIES
// THAT NIGHT stamp on "dies", the patient greys. NOBODY IN THAT ROOM IS COUNTING + an empty tally (? ? ?) on "turns".
// THE YEARS (M9): WORLDWIDE ≈ 29 (count-up, strip pill 1799 ≈29 WORLD on "twenty"). "So what is medicine now?" = "?";
// AUTHORITY chip on "Authority." (slot 1, docks). Cliffhanger: Vienna, a young doctor, a "?" on "strange", tally marks on
// "counting"; NEXT ▸ 1847. VO me05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me1799', durationInSeconds: 62.3333, fps: 30, width: 1920, height: 1080 };
const DUR = 1870;

const C = makeCue(vo, 'me05-1799', 0.8);
const SEVENTEEN = C.at('seventeen');
const MOUNT = C.at('Mount');
const VIRGINIA = C.at('Virginia.');
const DOCK = VIRGINIA + 24;
const DECEMBER = C.at('December.');
const SNOW = C.at('Snow');
const SLEET = C.at('sleet');
const FIELDS = C.at('fields.');
const DID = C.at('Did');
const ONE = C.at('one');
const THREE = C.at('three');
const WANTED = C.at('wanted');
const OPEN = C.at('open');
const WINDPIPE = C.at('windpipe');
const KNIFE = C.at('knife,');
const OTHER = C.at('other');
const REFUSED = C.at('refused?');
const SOME1 = C.at('Some', 1); // 'Some modern doctors' (2 = 'By some estimates')
const ARGUE = C.at('argue');
const SAVED = C.at('saved');
const HIM1 = C.at('him.', 1); // 'saved him.' (2 = 'bleeds him first')
const HERES = C.at("Here's");
const PATIENT = C.at('patient.');
const SIXTY = C.at('sixty');
const STRUGGLING = C.at('struggling');
const AT2 = C.at('At', 2); // 'At his own request' (1 = 'at Mount Vernon')
const OVERSEER = C.at('overseer');
const BLEEDS1 = C.at('bleeds', 1); // 'bleeds him first' (2 = 'the expert bleeds you')
const FIRST = C.at('first.');
const THEN1 = C.at('Then', 1); // 'Then the doctors take over' (2 'Then more', 3 'Then thirty two')
const DOCTORS3 = C.at('doctors', 3); // 'the doctors take over' (1, 2 = in the card)
const EIGHTEEN = C.at('Eighteen');
const MORE2 = C.at('more.', 2); // 'Then more.' (1 = 'Eighteen ounces more.')
const THIRTY = C.at('thirty');
const IN3 = C.at('In', 3); // 'In all,' (1 'in seventeen', 2 'in Virginia')
const OVER2 = C.at('over', 2); // 'over eighty' (1 = 'take over.')
const OUNCES2 = C.at('ounces,', 2);
const TWO3 = C.at('two', 3); // 'about two and a half' (1 'other two', 2 'thirty two.', 4 'two fifths')
const LITRES = C.at('litres,');
const TWELVE = C.at('twelve');
const BY = C.at('By');
const TWO4 = C.at('two', 4);
const FIFTHS = C.at('fifths');
const BLOOD_W = C.at('blood');
const DIES = C.at('dies');
const NIGHT = C.at('night.');
const NOBODY = C.at('Nobody');
const COUNTING1 = C.at('counting', 1); // 'is counting how' (2 = 'He starts counting.')
const BLEEDING = C.at('bleeding');
const TURNS = C.at('turns');
const OUT = C.at('out.');
const HOW2 = C.at('How', 2); // 'How long do you live?' (1 = 'counting how')
const WORLDWIDE = C.at('Worldwide,');
const NEWBORN = C.at('newborn');
const ABOUT3 = C.at('about', 3); // 'about twenty nine' (1 'about two and a half', 2 'about twelve')
const TWENTY = C.at('twenty');
const NINE2 = C.at('nine', 2); // 'twenty nine' (1 = 'seventeen ninety nine,')
const SO = C.at('So');
const NOW = C.at('now?');
const AUTHORITY = C.at('Authority.');
const CHIP_DOCK = AUTHORITY + 80;
const TRUST = C.at('Trust');
const EVEN = C.at('even');
const BLEEDS2 = C.at('bleeds', 2);
const YOU4 = C.at('you.', 4); // 'bleeds you.' (1–3 = 'You wake', 'Did you', 'do you live')
const FIFTY = C.at('Fifty');
const VIENNA = C.at('Vienna,');
const YOUNG = C.at('young');
const STRANGE = C.at('strange.');
const STARTS = C.at('starts');
const COUNTING2 = C.at('counting.', 2);
// each panel holds ≥ 1.5 s after its last reveal (kit `hold`); the DYK card needs `cardOut`
const CARD_OUT = cardOut(HIM1, HERES);
const PAT_END = hold(OUT, HOW2);
const YEARS_END = hold(NINE2, SO);
const USE_END = hold(YOU4, FIFTY);
const BOWLS: { at: number; value: string; color: string }[] = [
  { at: OVERSEER, value: '', color: DL.warm },
  { at: EIGHTEEN, value: '18 OZ', color: DL.text },
  { at: MORE2, value: 'MORE', color: DL.text },
  { at: THIRTY, value: '32 OZ', color: DL.red },
];
const FLAKES = Array.from({ length: 60 }, (_, i) => ({ x: (i * 137) % 1600, y: (i * 91) % 640, s: 3 + (i % 4), v: 1.2 + (i % 5) * 0.35 }));

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
const MeVernon: React.FC = () => (
  <svg width={760} height={340} viewBox="0 0 760 340">
    <rect x={60} y={140} width={640} height={170} fill="#efe8dc" stroke="#9a9080" strokeWidth={4} />
    <path d="M40 142 L380 60 L720 142 Z" fill="#a8382a" stroke="#5a1a10" strokeWidth={4} />
    <rect x={350} y={20} width={60} height={56} fill="#efe8dc" stroke="#9a9080" strokeWidth={3} />
    <path d="M342 22 L380 0 L418 22 Z" fill="#5a7a5a" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={92 + i * 78} y={160} width={14} height={150} fill="#ffffff" stroke="#b8b0a0" strokeWidth={2} />)}
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={118 + i * 78} y={190} width={30} height={44} fill="#3a4a5a" />)}
    <rect x={0} y={310} width={760} height={30} fill="#e8eef4" />
  </svg>
);

// Washington in bed; `breath` makes the blanket heave, `dim` greys him out
const MeBedPatient: React.FC<{ f: number; breath: number; dim: number }> = ({ f, breath, dim }) => (
  <div style={{ position: 'relative', width: 320, height: 320, filter: dim > 0.01 ? `grayscale(${dim}) brightness(${1 - 0.5 * dim})` : undefined }}>
    <MedProp kind="bed" size={320} />
    <svg width={320} height={320} viewBox="0 0 100 100" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <circle cx={18} cy={38} r={8} fill="#e8c0a0" stroke="#b8906a" strokeWidth={1.5} />
      <path d={`M32 52 Q60 ${40 - 3 * breath * (0.5 + 0.5 * Math.sin(f / 3))} 92 52`} fill="#c8d4e0" stroke="#8a9aaa" strokeWidth={1.5} />
      {[0, 1].map((k) => <path key={k} d={`M${28 + k * 4} ${30 - k * 3} q4 -3 8 0`} stroke="#c8cdf0" strokeWidth={1.2} fill="none" opacity={breath * (0.5 + 0.5 * Math.sin(f / 3 + k))} />)}
    </svg>
  </div>
);

const MeGlobe: React.FC<{ f: number; size?: number }> = ({ f, size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={44} fill="#16304a" stroke={DL.sky} strokeWidth={3} />
    {[0, 1, 2].map((k) => <ellipse key={k} cx={50} cy={50} rx={Math.abs(44 * Math.cos(f / 40 + (k * Math.PI) / 3))} ry={44} fill="none" stroke={DL.sky} strokeWidth={1.5} opacity={0.6} />)}
    <line x1={6} y1={50} x2={94} y2={50} stroke={DL.sky} strokeWidth={1.5} opacity={0.6} />
  </svg>
);

const MeVienna: React.FC = () => (
  <svg width={600} height={280} viewBox="0 0 600 280">
    <rect x={0} y={170} width={120} height={110} fill="#2a2f4a" />
    <rect x={130} y={130} width={90} height={150} fill="#323856" />
    <path d="M250 280 L250 120 L270 120 L280 10 L290 120 L310 120 L310 280 Z" fill="#3a4062" />
    <rect x={330} y={150} width={140} height={130} fill="#2a2f4a" />
    <path d="M330 150 Q400 80 470 150 Z" fill="#323856" />
    <rect x={480} y={180} width={120} height={100} fill="#323856" />
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={14 + i * 58} y={200 + (i % 2) * 24} width={14} height={18} fill="#e8c860" opacity={0.6} />)}
  </svg>
);

// a sheet that fills with tally marks: mark i appears at at + i * step
const MeTally: React.FC<{ at: number; step: number }> = ({ at, step }) => {
  const f = useCurrentFrame();
  return (
    <svg width={220} height={240} viewBox="0 0 220 240">
      <rect x={4} y={4} width={212} height={232} rx={8} fill="#efe2c4" stroke="#9a8a6a" strokeWidth={3} />
      {[60, 110, 160, 210].map((y) => <line key={y} x1={20} y1={y} x2={200} y2={y} stroke="#c8b898" strokeWidth={2} />)}
      {[0, 1, 2, 3].map((i) => <line key={i} x1={50 + i * 28} y1={80} x2={50 + i * 28} y2={150} stroke="#3a2a1a" strokeWidth={6} strokeLinecap="round" opacity={ease(f, at + i * step - 2, at + i * step + 3)} />)}
      <line x1={36} y1={140} x2={146} y2={90} stroke="#3a2a1a" strokeWidth={6} strokeLinecap="round" opacity={ease(f, at + 4 * step - 2, at + 4 * step + 3)} />
    </svg>
  );
};

const Me1799: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const home = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const snow = ease(f, SNOW - 2, SNOW + 10) * home;
  const sleet = ease(f, SLEET - 2, SLEET + 8) * home;
  const patient = pane(f, CARD_OUT, PAT_END);
  const years = pane(f, PAT_END, YEARS_END);
  const useful = pane(f, AUTHORITY - 2, USE_END);
  const cliff = ease(f, USE_END - 2, USE_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, FIFTY - 8, FIFTY)) * ease(f, DOCK - 2, DOCK + 4);
  const gone = ease(f, DIES - 2, DIES + 24);
  const breath = ease(f, STRUGGLING - 2, STRUGGLING + 8) * (1 - gone);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1222" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1799" idx={2} label="VIRGINIA" dockAt={DOCK} />
        <WakePlace place="Mount Vernon, Virginia" at={MOUNT} dockAt={DOCK} yearAt={SEVENTEEN} />

        {/* Mount Vernon in December: snow and sleet */}
        <AbsoluteFill style={{ opacity: home }}>
          <div style={{ position: 'absolute', left: 160, top: 400 }}><MeVernon /></div>
          <div style={{ position: 'absolute', left: 160, top: 740, width: 1600, height: 40, borderRadius: 20, background: '#e8eef4', opacity: 0.5 + 0.5 * snow }} />
          <div style={{ position: 'absolute', left: 1040, top: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Label at={Math.max(DECEMBER, DOCK + 8)} color={DL.sky} size={36}>DECEMBER</Label>
            <Label at={SNOW} color={DL.text} size={30}>SNOW<OnWord at={SLEET}> AND SLEET</OnWord></Label>
            <Label at={FIELDS} color={DL.dim} size={30}>BLOW ACROSS THE FIELDS</Label>
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: snow }}>
          {FLAKES.map((p, i) => <div key={i} style={{ position: 'absolute', left: 160 + ((p.x + f * 1.5 + 2.5 * Math.max(0, f - FIELDS)) % 1600), top: 160 + ((p.y + f * p.v) % 640), width: p.s * 2, height: p.s * 2, borderRadius: '50%', background: '#f4f8fc', opacity: 0.8 }} />)}
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: sleet * 0.6 }}>
          {Array.from({ length: 24 }, (_, i) => <div key={i} style={{ position: 'absolute', left: 160 + ((i * 211 + f * 9) % 1560), top: 160 + ((i * 97 + f * 14) % 620), width: 3, height: 44, background: '#a8c0d8', transform: 'rotate(20deg)' }} />)}
        </AbsoluteFill>

        {/* THE PATIENT: Washington, the bleedings, the totals */}
        <AbsoluteFill style={{ opacity: patient }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(PATIENT, CARD_OUT)} color={DL.gold} size={34}>THE PATIENT · GEORGE WASHINGTON<OnWord at={SIXTY}> · 67</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 150, top: 230, opacity: ease(f, CARD_OUT - 2, CARD_OUT + 6) }}><MeBedPatient f={f} breath={breath} dim={gone} /></div>
          <div style={{ position: 'absolute', left: 160, top: 530 }}><Label at={STRUGGLING} color={DL.sky} size={26}>STRUGGLING TO BREATHE</Label></div>
          <div style={{ position: 'absolute', left: 170, top: 400 }}><StampText text="HE DIES THAT NIGHT" at={DIES} color={DL.red} size={30} tilt={-5} /></div>
          <div style={{ position: 'absolute', left: 160, top: 585, width: 440 }}><Source at={NIGHT}>14 December 1799 · aged 67</Source></div>
          <div style={{ position: 'absolute', left: 160, top: 635, width: 440, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label at={NOBODY} color={DL.text} size={26}>NOBODY IN THAT ROOM</Label>
            <Label at={COUNTING1} color={DL.gold} size={26}>IS COUNTING</Label>
            <Label at={BLEEDING} color={DL.dim} size={24}>HOW BLEEDING<br />REALLY TURNS OUT:</Label>
            <div style={{ display: 'flex', gap: 14, opacity: ease(f, TURNS - 2, TURNS + 4) }}>
              {['BETTER', 'WORSE', 'DIED'].map((t) => <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 12px', border: `2px dashed ${DL.muted}`, borderRadius: 8, fontFamily: DL_MONO, fontSize: 24, color: DL.muted }}>{t} <span style={{ color: DL.red }}>?</span></div>)}
            </div>
          </div>

          <div style={{ position: 'absolute', left: 620, top: 270, width: 260 }}><Label at={AT2} color={DL.sky} size={24}>AT HIS OWN REQUEST</Label></div>
          <div style={{ position: 'absolute', left: 900, top: 270 }}><Label at={THEN1} color={DL.dim} size={26}>THEN<OnWord at={DOCTORS3}> THE DOCTORS TAKE OVER</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 620, top: 330, display: 'flex', gap: 20 }}>
            {BOWLS.map((b, i) => {
              const fill = i === 0 ? BLEEDS1 : b.at;
              return (
                <div key={i} style={{ width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, b.at - 2, b.at + 4), transform: `translateY(${ease(f, b.at - 2, b.at + 8, 16, 0)}px)` }}>
                  <div style={{ position: 'relative' }}>
                    <MedProp kind="bowl" size={180} level={ease(f, fill, fill + 24) * 0.85} />
                    {i === 0 && <div style={{ position: 'absolute', left: 150, top: 10, opacity: ease(f, BLEEDS1 - 2, BLEEDS1 + 4) }}><MedProp kind="lancet" size={70} /></div>}
                  </div>
                  {i === 0
                    ? <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: b.color, textAlign: 'center' }}>FARM OVERSEER<br /><OnWord at={FIRST}>FIRST</OnWord></span>
                    : <span style={{ fontFamily: DL_SERIF, fontSize: 56, lineHeight: 1, color: b.color }}>{b.value}</span>}
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 620, top: 610 }}><Label at={IN3} color={DL.dim} size={26}>IN ALL</Label></div>
          <div style={{ position: 'absolute', left: 620, top: 650, display: 'flex', alignItems: 'baseline', gap: 30 }}>
            <CountUp to={80} a={OVER2} b={OUNCES2 + 4} prefix="OVER " suffix=" OZ" style={{ fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1, color: BLOOD }} />
            <span style={{ fontFamily: DL_SERIF, fontSize: 54, color: DL.text, opacity: ease(f, TWO3 - 2, TWO3 + 4) }}>≈ 2.5<OnWord at={LITRES}> LITRES</OnWord></span>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.dim, opacity: ease(f, TWELVE - 2, TWELVE + 4) }}>IN ≈ 12 HOURS</span>
          </div>
          <div style={{ position: 'absolute', left: 620, top: 760, display: 'flex', alignItems: 'center', gap: 26 }}>
            <Label at={BY} color={DL.sky} size={28}>BY SOME ESTIMATES:</Label>
            <Label at={TWO4} color={BLOOD} size={28}>≈ 2/5<OnWord at={BLOOD_W}> OF HIS BLOOD</OnWord></Label>
            <div style={{ display: 'flex', gap: 6, opacity: ease(f, TWO4 - 2, TWO4 + 4) }}>
              {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ width: 38, height: 30, borderRadius: 6, border: `2px solid ${DL.border}`, background: i < 2 ? BLOOD : 'transparent', opacity: i < 2 ? 0.3 + 0.7 * ease(f, FIFTHS + i * 6 - 2, FIFTHS + i * 6 + 6) : 1 }} />)}
            </div>
          </div>
          <div style={{ position: 'absolute', left: 620, top: 815, width: 1140 }}><Source at={TWO4}>PBS NewsHour · Hektoen International · Am Surg 2008 · counts vary: ≈ 2.4 L to over 2.5 L</Source></div>
        </AbsoluteFill>

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={Math.max(HOW2, PAT_END)} color={DL.gold} size={38}>THE YEARS · HOW LONG DO YOU LIVE?</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300 }}><Label at={WORLDWIDE} color={DL.sky} size={30}>WORLDWIDE<OnWord at={NEWBORN}> · A NEWBORN</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 1080, top: 330, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, WORLDWIDE - 2, WORLDWIDE + 4) }}><MeGlobe f={f} size={140} /></div>
            <div style={{ opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={140} /></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 360, display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, ABOUT3 - 2, ABOUT3 + 4) }}>
            <CountUp to={29} a={ABOUT3} b={NINE2 + 4} prefix="≈ " style={{ fontFamily: DL_SERIF, fontSize: 170, lineHeight: 1, color: DL.gold }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: DL.text }}>YEARS · AT BIRTH · AVERAGE</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 600, width: 1100 }}><Source at={TWENTY}>world, 1800: 28.5 years at birth (no value exists for 1799) · Our World in Data / UN WPP 2024</Source></div>
        </AbsoluteFill>

        {/* "So what is medicine now?" — Authority. Trust the expert, even when the expert bleeds you. */}
        <AskMark at={YEARS_END} out={AUTHORITY + 2} left={760} top={250} pulseAt={NOW} />
        <AbsoluteFill style={{ opacity: useful }}>
          <div style={{ position: 'absolute', left: 260, top: 290, opacity: ease(f, AUTHORITY - 2, AUTHORITY + 6) }}><PeopleRow n={3} lit={() => 1} size={90} gap={20} color={DL.gold} /></div>
          <div style={{ position: 'absolute', left: 260, top: 470, display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, BLEEDS2 - 2, BLEEDS2 + 4) }}>
            <MedProp kind="lancet" size={90} /><MedProp kind="bowl" size={110} level={ease(f, BLEEDS2, BLEEDS2 + 24) * 0.8} />
          </div>
          <div style={{ position: 'absolute', left: 640, top: 290, width: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.gold, opacity: ease(f, TRUST - 2, TRUST + 4) }}>trust the expert,</div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.text, opacity: ease(f, EVEN - 2, EVEN + 4) }}>even when the expert <OnWord at={BLEEDS2}><span style={{ color: BLOOD }}>bleeds you</span></OnWord></div>
          </div>
        </AbsoluteFill>
        <MedChip text={MED_ARC[1].chip} at={AUTHORITY} dockAt={CHIP_DOCK} slot={1} left={260} top={720} />

        {/* cliffhanger: Vienna, a young doctor starts counting */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={Math.max(VIENNA, USE_END)} color={DL.sky} size={34}>VIENNA</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300, opacity: ease(f, Math.max(VIENNA, USE_END) - 2, Math.max(VIENNA, USE_END) + 6) }}><MeVienna /></div>
          <div style={{ position: 'absolute', left: 790, top: 330, opacity: ease(f, YOUNG - 2, YOUNG + 6) }}><Kid size={110} adult color={DL.warm} /></div>
          <div style={{ position: 'absolute', left: 920, top: 300, fontFamily: DL_SERIF, fontSize: 160, lineHeight: 1, color: DL.gold, opacity: ease(f, STRANGE - 2, STRANGE + 4) }}>?</div>
          <div style={{ position: 'absolute', left: 1040, top: 300, opacity: ease(f, STARTS - 2, STARTS + 4) }}><MeTally at={COUNTING2} step={10} /></div>
        </AbsoluteFill>

        <YearsStrip items={[...medYearsUpTo(1), { ...YEARS_PAST_MED[1], at: TWENTY }]} show={strip} />
        <MedLadder rungs={[...medRungs(1), { year: '1799', label: MED_ARC[1].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_OUT}>
          <OnWord at={ONE}>one of </OnWord><OnWord at={THREE}>the three doctors </OnWord><OnWord at={WANTED}>wanted to </OnWord><span style={{ opacity: ease(f, OPEN - 2, OPEN + 4), color: '#ffd23f' }}>open <OnWord at={WINDPIPE}>the windpipe </OnWord></span><span style={{ opacity: ease(f, KNIFE - 2, KNIFE + 4), color: '#ff9a1f', fontStyle: 'italic' }}>with a knife, </span>
          <OnWord at={OTHER}>and the other two </OnWord><span style={{ opacity: ease(f, REFUSED - 2, REFUSED + 4), color: '#ff4d4d', fontStyle: 'italic' }}>refused?</span>
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-end', gap: 30, opacity: ease(f, THREE - 2, THREE + 4) }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: 'relative' }}>
                <PeopleRow n={1} lit={() => 1} size={70} color={i === 0 && f >= WANTED ? '#ffd23f' : '#c8cdf0'} />
                {i > 0 && <span style={{ position: 'absolute', left: 6, top: 10, fontFamily: DL_SERIF, fontSize: 80, color: '#ff4d4d', opacity: ease(f, REFUSED - 2, REFUSED + 4) }}>✗</span>}
              </div>
            ))}
            <div style={{ opacity: ease(f, KNIFE - 2, KNIFE + 4) }}><MedProp kind="lancet" size={90} /></div>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 30, color: '#ffd23f', opacity: ease(f, SOME1 - 2, SOME1 + 4) }}>SOME MODERN DOCTORS<OnWord at={ARGUE}> ARGUE</OnWord><OnWord at={SAVED}> IT MIGHT HAVE SAVED HIM</OnWord></div>
          <div style={{ marginTop: 12, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, ARGUE - 2, ARGUE + 4) }}>argued, not settled · Hektoen International · Am Surg 2008</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1847" parts={[{ text: 'Fifty years later,', at: FIFTY }, { text: 'in Vienna,', at: VIENNA }, { text: 'a young doctor does something strange.', at: YOUNG }, { text: 'He starts counting.', at: STARTS }]} />
      <EpisodeHud year={1799} episode="06" />
    </AbsoluteFill>
  );
};
export default Me1799;
