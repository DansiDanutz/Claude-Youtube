import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, MedChip, MedLadder, MED_ARC, Label, Source, StampText, AskMark, OnWord, PeopleRow, Kid,
  MedProp, PropTag, YearsStrip, YEARS_PAST_MED, Baby, CountUp, hold, pane, cardOut, BLOOD,
} from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 5/14 — ERA 1: 1537, a French army camp near Turin (RESEARCH M4, M11; THE YEARS = No. 05 F8). Header +
// "a French army camp near Turin" on its words; smoke on "Smoke", a drum beats on "drums", wounded men on "groans".
// DYK: the usual treatment for a gunshot wound is boiling oil (oil pot on "boiling"); THE SURGEONS BELIEVE · GUNPOWDER
// · POISONS THE FLESH on their words. THE PATIENT: a soldier on "soldier", the wound on "gunshot"; the FOUR HUMOURS
// scale on "four" (tilting), the four fluids named on "fluids" (M11), it levels on "balance"; BURN / PURGE / DRAIN
// BLOOD (oil pot, a purge cup, lancet + bowl filling) on their words. WHAT CHANGED: Paré on "Ambroise"; RUNS OUT OF OIL,
// the oil pot goes cold on "oil."; egg yolk, rose oil, turpentine each on its word, the salve on "instead". The hedges
// stay on screen: BY HIS OWN ACCOUNT on "By", WRITTEN DOWN YEARS LATER on "wrote", HISTORIANS STILL ARGUE · HOW MUCH IS
// LEGEND? on "Historians"/"legend". THE YEARS: ENGLAND ≈ 35 (count-up, strip pill on "thirty"), four small figures dim
// on "children". "So what is medicine to you?" = "?"; BALANCE chip on "Balance." (slot 0, docks); the scale levels on
// "adjusts". Cliffhanger: bleeding bowls along a bar from 1537 on "centuries", 1799 on "seventeen", a famous patient
// on "famous"; NEXT ▸ 1799 (the band starts on "seventeen" so 1799 is never shown before it is said). VO me04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Me1537', durationInSeconds: 69.6333, fps: 30, width: 1920, height: 1080 };
const DUR = 2089;

const C = makeCue(vo, 'me04-1537', 0.8);
const FIFTEEN = C.at('fifteen');
const FRENCH = C.at('French');
const TURIN = C.at('Turin.');
const DOCK = TURIN + 24;
const SMOKE = C.at('Smoke,');
const DRUMS = C.at('drums,');
const GROANS = C.at('groans');
const WOUNDED = C.at('wounded');
const DID = C.at('Did');
const USUAL = C.at('usual');
const GUNSHOT1 = C.at('gunshot', 1); // 'for a gunshot wound here' (2 = 'A soldier with a gunshot wound')
const BOILING = C.at('boiling');
const SURGEONS = C.at('surgeons');
const GUNPOWDER = C.at('gunpowder');
const POISONS = C.at('poisons');
const FLESH = C.at('flesh.');
const HERES = C.at("Here's");
const PATIENT1 = C.at('patient.', 1); // "Here's your patient." (2 = 'most famous patient.')
const SOLDIER = C.at('soldier');
const GUNSHOT2 = C.at('gunshot', 2);
const DOCTORS = C.at('Doctors');
const ILLNESS = C.at('illness');
const FOUR = C.at('four');
const FLUIDS = C.at('fluids');
const CURE = C.at('cure');
const BALANCE1 = C.at('balance', 1); // 'to balance them' (2 = 'Balance.')
const BURN = C.at('burn');
const PURGE = C.at('purge.');
const DRAIN = C.at('drain');
const BLOOD1 = C.at('blood.');
const ONE = C.at('One');
const AMBROISE = C.at('Ambroise');
const RUNS = C.at('runs');
const OIL2 = C.at('oil.', 2); // 'runs out of oil.' (1 = 'boiling oil?', 3 = 'rose oil')
const MIXES = C.at('mixes');
const EGG = C.at('egg');
const ROSE = C.at('rose');
const TURPENTINE = C.at('turpentine');
const INSTEAD = C.at('instead.');
const BY = C.at('By');
const MEN2 = C.at('men', 2); // 'the men he treated' (1 = 'wounded men.')
const SLEPT = C.at('slept');
const LESS = C.at('less');
const WROTE = C.at('wrote');
const YEARS1 = C.at('years', 1); // 'years later.' (2 = 'thirty five years.')
const HISTORIANS = C.at('Historians');
const ARGUE = C.at('argue');
const LEGEND = C.at('legend.');
const HOW2 = C.at('How', 2); // 'How long do you live?' (1 = 'about how much')
const ENGLAND = C.at('England,');
const NEWBORN = C.at('newborn');
const ABOUT2 = C.at('about', 2); // 'about thirty five' (1 = 'argue about')
const THIRTY2 = C.at('thirty', 2); // 'thirty five' (1 = 'fifteen thirty seven')
const FIVE = C.at('five');
const MOSTLY = C.at('Mostly');
const CHILDREN = C.at('children');
const DIED = C.at('died.');
const SO4 = C.at('So', 4); // 'So what is medicine' (1 'So they burn', 2 'So he mixes', 3 'so many')
const YOU4 = C.at('you?', 4); // 'medicine to you?'
const BALANCE2 = C.at('Balance.', 2);
const CHIP_DOCK = BALANCE2 + 80;
const BODY2 = C.at('body', 2); // 'The body is a scale' (1 = 'in the body,')
const SCALE = C.at('scale,');
const DOCTOR = C.at('doctor');
const ADJUSTS = C.at('adjusts');
const IT2 = C.at('it.', 2); // 'adjusts it.' (1 = 'wrote it down', 3 = 'it finds')
const BLEEDING = C.at('Bleeding');
const CENTURIES = C.at('centuries.');
const SEVENTEEN = C.at('seventeen');
const NINE = C.at('nine,');
const FINDS = C.at('finds');
const FAMOUS = C.at('famous');
// each panel holds ≥ 1.5 s after its last reveal (kit `hold`); the DYK card needs `cardOut`
const CARD_OUT = cardOut(FLESH, HERES);
const PAT_END = hold(BLOOD1, ONE);
const CHANGE_END = hold(LEGEND, HOW2);
const YEARS_END = hold(DIED, SO4);
const USE_END = hold(IT2, BLEEDING);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
const MeCamp: React.FC<{ f: number }> = ({ f }) => {
  const wave = Math.sin(f / 7) * 6;
  return (
    <svg width={1000} height={330} viewBox="0 0 1000 330" style={{ overflow: 'visible' }}>
      {[0, 1, 2].map((i) => {
        const x = 30 + i * 280;
        return (
          <g key={i}>
            <path d={`M${x} 300 L${x + 125} 130 L${x + 250} 300 Z`} fill="#c8b48a" stroke="#7a6438" strokeWidth={4} />
            <path d={`M${x + 105} 300 L${x + 125} 210 L${x + 145} 300 Z`} fill="#3a2a18" />
          </g>
        );
      })}
      <line x1={900} y1={300} x2={900} y2={60} stroke="#5a3a22" strokeWidth={6} />
      <path d={`M903 64 Q930 ${54 + wave} 960 64 L960 112 Q930 ${102 + wave} 903 112 Z`} fill="#2f4f9f" />
      <line x1={0} y1={302} x2={1000} y2={302} stroke="#4a3a28" strokeWidth={4} />
    </svg>
  );
};

const MeDrum: React.FC<{ f: number; beat: number }> = ({ f, beat }) => {
  const hit = beat * Math.sin(f / 2.5) * 14;
  return (
    <svg width={170} height={170} viewBox="0 0 170 170" style={{ overflow: 'visible' }}>
      <rect x={25} y={60} width={120} height={80} fill="#a83a2a" stroke="#5a1a10" strokeWidth={3} />
      <path d="M25 72 L55 128 L85 72 L115 128 L145 72" stroke="#efe2c4" strokeWidth={3} fill="none" />
      <ellipse cx={85} cy={140} rx={60} ry={12} fill="#7a2a1a" />
      <ellipse cx={85} cy={60} rx={60} ry={14} fill="#efe2c4" stroke="#9a8a6a" strokeWidth={3} />
      <g transform={`rotate(${-30 + hit} 40 20)`}><line x1={40} y1={20} x2={80} y2={56} stroke="#5a3a22" strokeWidth={6} strokeLinecap="round" /></g>
      <g transform={`rotate(${30 - hit} 130 20)`}><line x1={130} y1={20} x2={90} y2={56} stroke="#5a3a22" strokeWidth={6} strokeLinecap="round" /></g>
    </svg>
  );
};

// a wounded man lying down; `breath` moves the body slightly
const MeLying: React.FC<{ f: number; seed: number }> = ({ f, seed }) => (
  <svg width={190} height={70} viewBox="0 0 190 70">
    <ellipse cx={104} cy={50 - 2 * Math.sin(f / 9 + seed)} rx={72} ry={16} fill={DL.warm} opacity={0.75} />
    <circle cx={22} cy={42} r={15} fill={DL.warm} opacity={0.75} />
    <circle cx={92} cy={46} r={7} fill={BLOOD} />
  </svg>
);

// the purge: a cup of a strong herbal draught
const MePurge: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M22 18 L78 18 Q76 58 50 62 Q24 58 22 18 Z" fill="#6a8a3a" stroke="#8a6a40" strokeWidth={3} />
    <rect x={46} y={62} width={8} height={20} fill="#8a6a40" />
    <ellipse cx={50} cy={86} rx={22} ry={6} fill="#8a6a40" />
  </svg>
);

const BOTTLE = 'M40 10 L60 10 L60 28 L72 42 L72 88 Q72 92 68 92 L32 92 Q28 92 28 88 L28 42 L40 28 Z';
const MeIngredient: React.FC<{ kind: 'egg' | 'rose' | 'turps'; size?: number }> = ({ kind, size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {kind === 'egg' && <g><ellipse cx={50} cy={58} rx={38} ry={26} fill="#f4efe0" stroke="#c8c0b0" strokeWidth={3} /><circle cx={50} cy={58} r={15} fill="#f8a020" /></g>}
    {kind === 'rose' && <g><path d={BOTTLE} fill="#f4b8c8" stroke="#a86a7a" strokeWidth={3} /><circle cx={50} cy={64} r={11} fill="#c83a5a" /><path d="M50 75 L50 86" stroke="#3a7a2a" strokeWidth={3} /></g>}
    {kind === 'turps' && <g><path d={BOTTLE} fill="#c8902a" stroke="#7a5a1a" strokeWidth={3} /><rect x={34} y={56} width={32} height={18} fill="#efe2c4" /></g>}
  </svg>
);

const INGREDIENTS: { kind: 'egg' | 'rose' | 'turps'; name: string; at: number }[] = [
  { kind: 'egg', name: 'EGG YOLK', at: EGG },
  { kind: 'rose', name: 'ROSE OIL', at: ROSE },
  { kind: 'turps', name: 'TURPENTINE', at: TURPENTINE },
];

const Me1537: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const camp = Math.max(0.35 * ease(f, 0, 12), ease(f, DOCK - 2, DOCK + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const smoke = ease(f, SMOKE - 4, SMOKE + 16) * camp;
  const patient = pane(f, CARD_OUT, PAT_END);
  const change = pane(f, PAT_END, CHANGE_END);
  const years = pane(f, CHANGE_END, YEARS_END);
  const useful = pane(f, BALANCE2 - 2, USE_END);
  const cliff = ease(f, USE_END - 2, USE_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, SEVENTEEN - 8, SEVENTEEN)) * ease(f, DOCK - 2, DOCK + 4);
  // the FOUR HUMOURS scale wobbles until the cure "balances" it
  const humourTilt = (1 - ease(f, BALANCE1 - 2, BALANCE1 + 16)) * (14 + 5 * Math.sin(f / 9));
  const bodyTilt = (1 - ease(f, ADJUSTS - 2, ADJUSTS + 18)) * (16 * Math.sin(f / 12));
  const cold = ease(f, OIL2 - 2, OIL2 + 20);
  const run = ease(f, CENTURIES - 2, CENTURIES + 50) * 0.85 + ease(f, NINE - 2, NINE + 14) * 0.15;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e0e06" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1537" idx={1} label="TURIN" dockAt={DOCK} />
        <WakePlace place="a French army camp near Turin" at={FRENCH} dockAt={DOCK} yearAt={FIFTEEN} />

        {/* the camp: tents, a drum, wounded men */}
        <AbsoluteFill style={{ opacity: camp }}>
          <div style={{ position: 'absolute', left: 160, top: 300 }}><MeCamp f={f} /></div>
          <div style={{ position: 'absolute', left: 1240, top: 430, opacity: ease(f, DRUMS - 2, DRUMS + 4) }}><MeDrum f={f} beat={ease(f, DRUMS - 2, DRUMS + 6) * (1 - ease(f, GROANS, GROANS + 30))} /></div>
          <div style={{ position: 'absolute', left: 200, top: 680, display: 'flex', gap: 60, opacity: ease(f, GROANS - 2, GROANS + 6) }}>
            {[0, 1, 2].map((i) => <MeLying key={i} f={f} seed={i * 2} />)}
          </div>
          <div style={{ position: 'absolute', left: 1240, top: 230, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Label at={Math.max(SMOKE, DOCK + 8)} color={DL.dim} size={32}>SMOKE</Label>
            <Label at={DRUMS} color={DL.warm} size={32}>· DRUMS</Label>
          </div>
          <div style={{ position: 'absolute', left: 900, top: 700 }}><Label at={GROANS} color={DL.warm} size={30}>THE GROANS OF<OnWord at={WOUNDED}> WOUNDED MEN</OnWord></Label></div>
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: smoke }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: 400 + ((f * (0.6 + i * 0.3) + i * 220) % 900), top: 220 - i * 40 - ((f * 0.4) % 60), width: 380, height: 130, borderRadius: '50%', background: 'radial-gradient(ellipse, #b9b1a433, transparent 70%)' }} />)}
        </AbsoluteFill>

        {/* THE PATIENT: a soldier, four fluids, three treatments */}
        <AbsoluteFill style={{ opacity: patient }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={Math.max(PATIENT1, CARD_OUT)} color={DL.gold} size={34}>THE PATIENT<OnWord at={SOLDIER}> · A SOLDIER</OnWord><OnWord at={GUNSHOT2}> · A GUNSHOT WOUND</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 190, top: 300, opacity: ease(f, SOLDIER - 2, SOLDIER + 6) }}>
            <Kid size={170} adult color={DL.warm} />
            <div style={{ position: 'absolute', left: 104, top: 120, width: 26, height: 26, borderRadius: '50%', background: BLOOD, boxShadow: `0 0 18px ${BLOOD}`, opacity: ease(f, GUNSHOT2 - 2, GUNSHOT2 + 4) }} />
          </div>
          <div style={{ position: 'absolute', left: 520, top: 290, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label at={DOCTORS} color={DL.dim} size={28}>DOCTORS HERE TEACH</Label>
            <Label at={ILLNESS} color={DL.text} size={28}>ILLNESS COMES FROM…</Label>
          </div>
          <div style={{ position: 'absolute', left: 560, top: 380, opacity: ease(f, FOUR - 2, FOUR + 6), transform: `scale(${ease(f, FOUR - 2, FOUR + 10, 1.15, 1)})` }}><MedProp kind="scale" size={240} tilt={humourTilt} /></div>
          <div style={{ position: 'absolute', left: 520, top: 640, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label at={FOUR} color={DL.gold} size={30}>FOUR FLUIDS · THE HUMOURS</Label>
            <Label at={FLUIDS} color={DL.dim} size={24}>BLOOD · PHLEGM<br />YELLOW BILE · BLACK BILE</Label>
            <Label at={CURE} color={DL.text} size={30} style={{ marginTop: 14 }}>THE CURE:<OnWord at={BALANCE1}> <span style={{ color: DL.gold }}>BALANCE THEM</span></OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 1180, top: 290, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: ease(f, BURN - 2, BURN + 4) }}><MedProp kind="oilpot" size={110} f={f} /><Label at={BURN} color={DL.red} size={34}>BURN THE WOUND</Label></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: ease(f, PURGE - 2, PURGE + 4) }}><MePurge size={110} /><Label at={PURGE} color="#8ab84a" size={34}>OR PURGE</Label></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: ease(f, DRAIN - 2, DRAIN + 4) }}>
              <MedProp kind="lancet" size={80} />
              <div style={{ opacity: ease(f, BLOOD1 - 2, BLOOD1 + 4) }}><MedProp kind="bowl" size={100} level={ease(f, BLOOD1, BLOOD1 + 30) * 0.8} /></div>
              <Label at={DRAIN} color={DL.text} size={34}>OR DRAIN<OnWord at={BLOOD1}> <span style={{ color: BLOOD }}>BLOOD</span></OnWord></Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1180, top: 740, width: 580 }}><Source at={FLUIDS}>humoral theory (Galen): illness as an imbalance of four fluids · bleeding the favoured remedy</Source></div>
        </AbsoluteFill>

        {/* WHAT CHANGED: Paré runs out of oil */}
        <AbsoluteFill style={{ opacity: change }}>
          <div style={{ position: 'absolute', left: 160, top: 200 }}><Label at={PAT_END} color={DL.gold} size={34}>ONE YOUNG ARMY SURGEON<OnWord at={AMBROISE}> · AMBROISE PARÉ</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 170, top: 280, opacity: ease(f, PAT_END - 2, PAT_END + 6) }}><Kid size={140} adult color={DL.gold} /></div>
          <div style={{ position: 'absolute', left: 360, top: 330, opacity: ease(f, PAT_END - 2, PAT_END + 6) }}><MedProp kind="oilpot" size={150} f={f} flame={1 - cold} dim={0.8 * cold} /></div>
          <div style={{ position: 'absolute', left: 170, top: 495 }}><StampText text="RUNS OUT OF OIL" at={RUNS} color={DL.red} size={34} tilt={-3} /></div>
          <div style={{ position: 'absolute', left: 700, top: 280 }}><Label at={MIXES} color={DL.dim} size={30}>SO HE MIXES…</Label></div>
          <div style={{ position: 'absolute', left: 700, top: 330, display: 'flex', alignItems: 'center', gap: 22 }}>
            {INGREDIENTS.map((it) => (
              <div key={it.kind} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: ease(f, it.at - 2, it.at + 4), transform: `scale(${ease(f, it.at - 2, it.at + 8, 1.2, 1)})` }}>
                <MeIngredient kind={it.kind} size={110} />
                <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 2, color: DL.text, whiteSpace: 'nowrap' }}>{it.name}</span>
              </div>
            ))}
            <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: DL.gold, opacity: ease(f, INSTEAD - 2, INSTEAD + 4) }}>→</span>
            <PropTag kind="salve" at={INSTEAD} size={120} name="INSTEAD OF OIL" color={DL.gold} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 590, width: 1600, boxSizing: 'border-box', padding: '20px 30px', borderRadius: 16, border: `2px dashed ${DL.sky}`, background: '#0e0b0af0', opacity: ease(f, BY - 2, BY + 4) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              <Label at={BY} color={DL.sky} size={30}>BY HIS OWN ACCOUNT:</Label>
              <Label at={MEN2} color={DL.text} size={30}>THE MEN HE TREATED THAT WAY</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 14 }}>
              <Label at={SLEPT} color={DL.gold} size={30}>SLEPT BETTER<OnWord at={LESS}> · LESS SWELLING</OnWord></Label>
              <div style={{ opacity: ease(f, MEN2 - 2, MEN2 + 4) }}><PeopleRow n={4} lit={(i) => ease(f, SLEPT + i * 4, SLEPT + i * 4 + 8)} size={34} gap={10} color={DL.gold} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 14 }}>
              <Label at={WROTE} color={DL.warm} size={28}>WRITTEN DOWN<OnWord at={YEARS1}> YEARS LATER</OnWord></Label>
              <Label at={HISTORIANS} color={DL.warm} size={28}>· HISTORIANS STILL<OnWord at={ARGUE}> ARGUE</OnWord></Label>
              <Label at={LEGEND} color={DL.red} size={28}>HOW MUCH IS LEGEND?</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 830, width: 1600 }}><Source at={WROTE}>Paré's own account, published 1545 (the year 1536 or 1537 depending on the source) · Britannica · Delaware Academy of Medicine</Source></div>
        </AbsoluteFill>

        {/* THE YEARS */}
        <AbsoluteFill style={{ opacity: years }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={Math.max(HOW2, CHANGE_END)} color={DL.gold} size={38}>THE YEARS · HOW LONG DO YOU LIVE?</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300 }}><Label at={ENGLAND} color={DL.dim} size={30}>ENGLAND<OnWord at={NEWBORN}> · A NEWBORN</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 1080, top: 330, opacity: ease(f, NEWBORN - 2, NEWBORN + 4), transform: `scale(${ease(f, NEWBORN - 2, NEWBORN + 10, 1.25, 1)})` }}><Baby size={150} /></div>
          <div style={{ position: 'absolute', left: 160, top: 360, display: 'flex', alignItems: 'baseline', gap: 26, opacity: ease(f, ABOUT2 - 2, ABOUT2 + 4) }}>
            <CountUp to={35} a={ABOUT2} b={FIVE + 4} prefix="≈ " style={{ fontFamily: DL_SERIF, fontSize: 170, lineHeight: 1, color: DL.gold }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 32, color: DL.text }}>YEARS · AT BIRTH · AVERAGE</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 580, display: 'flex', alignItems: 'flex-end', gap: 40, opacity: ease(f, MOSTLY - 2, MOSTLY + 4) }}>
            <PeopleRow n={10} lit={(i) => (i < 4 ? 1 - ease(f, CHILDREN, CHILDREN + 12) : 1)} size={56} gap={12} color={DL.warm} />
            <Label at={MOSTLY} color={DL.warm} size={30}>MOSTLY BECAUSE SO MANY<br /><OnWord at={CHILDREN}>CHILDREN</OnWord><OnWord at={DIED}> DIED</OnWord></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 790, width: 1100 }}><Source at={THIRTY2}>England 1541–1871 ≈ 35.5 at birth · Wrigley & Schofield (via OWID) · the nearest long series for the 1500s</Source></div>
        </AbsoluteFill>

        {/* "So what is medicine to you?" — Balance. The body is a scale, and the doctor adjusts it. */}
        <AskMark at={YEARS_END} out={BALANCE2 + 2} left={760} top={250} pulseAt={YOU4} />
        <AbsoluteFill style={{ opacity: useful }}>
          <div style={{ position: 'absolute', left: 260, top: 250, opacity: ease(f, BALANCE2 - 2, BALANCE2 + 6) }}><MedProp kind="scale" size={300} tilt={bodyTilt} glow={ease(f, ADJUSTS, ADJUSTS + 18) * 0.7} /></div>
          <div style={{ position: 'absolute', left: 640, top: 290, width: 640, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.gold, opacity: ease(f, BODY2 - 2, BODY2 + 4) }}>the body is <OnWord at={SCALE}>a scale,</OnWord></div>
            <div style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, lineHeight: 1.15, color: DL.text, opacity: ease(f, DOCTOR - 2, DOCTOR + 4) }}>and the doctor <OnWord at={ADJUSTS}>adjusts it</OnWord></div>
          </div>
        </AbsoluteFill>
        <MedChip text={MED_ARC[0].chip} at={BALANCE2} dockAt={CHIP_DOCK} slot={0} left={260} top={720} />

        {/* cliffhanger: bleeding stays in fashion for centuries — 1799 */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 230 }}><Label at={USE_END} color={BLOOD} size={36}>BLEEDING STAYS IN FASHION<OnWord at={CENTURIES}> · FOR CENTURIES</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 320, width: 1000, height: 200 }}>
            <div style={{ position: 'absolute', left: 0, top: 150, width: 1000, height: 10, borderRadius: 5, background: '#2a2220' }} />
            <div style={{ position: 'absolute', left: 0, top: 150, width: 1000 * run, height: 10, borderRadius: 5, background: BLOOD }} />
            <div style={{ position: 'absolute', left: -6, top: 176, fontFamily: DL_MONO, fontSize: 30, color: DL.gold }}>1537</div>
            <div style={{ position: 'absolute', right: -6, top: 176, fontFamily: DL_MONO, fontSize: 30, color: DL.red, opacity: ease(f, SEVENTEEN - 2, SEVENTEEN + 4) }}>1799</div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 120 + i * 210, top: 40, opacity: ease(f, CENTURIES + i * 10 - 2, CENTURIES + i * 10 + 4), transform: `translateY(${ease(f, CENTURIES + i * 10 - 2, CENTURIES + i * 10 + 8, -16, 0)}px)` }}>
                <MedProp kind="bowl" size={90} level={0.7} />
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 820, top: 560, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, FAMOUS - 2, FAMOUS + 6) }}>
            <Kid size={120} adult color="#5a5450" />
            <span style={{ fontFamily: DL_SERIF, fontSize: 180, lineHeight: 1, color: DL.red }}>?</span>
          </div>
        </AbsoluteFill>

        <YearsStrip items={[{ ...YEARS_PAST_MED[0], at: THIRTY2 }]} show={strip} />
        <MedLadder rungs={[{ year: '1537', label: MED_ARC[0].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_OUT}>
          <OnWord at={USUAL}>the usual treatment </OnWord><OnWord at={GUNSHOT1}>for a gunshot wound here </OnWord><span style={{ opacity: ease(f, BOILING - 2, BOILING + 4), color: '#ff9a1f', fontStyle: 'italic' }}>is boiling oil?</span>
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ opacity: ease(f, BOILING - 2, BOILING + 4) }}><MedProp kind="oilpot" size={150} f={f} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: DL_MONO, fontSize: 34 }}>
              <span style={{ opacity: ease(f, SURGEONS - 2, SURGEONS + 4), color: '#ffffff' }}>THE SURGEONS BELIEVE</span>
              <span><span style={{ opacity: ease(f, GUNPOWDER - 2, GUNPOWDER + 4), color: '#ffd23f' }}>GUNPOWDER</span><span style={{ opacity: ease(f, POISONS - 2, POISONS + 4), color: '#ff4d4d' }}> POISONS THE FLESH</span></span>
            </div>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, FLESH - 2, FLESH + 4) }}>Ambroise Paré's own account (1545) · Britannica</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1799" parts={[{ text: 'And in 1799,', at: SEVENTEEN }, { text: 'it finds its most famous patient.', at: FINDS }]} />
      <EpisodeHud year={1537} episode="06" />
    </AbsoluteFill>
  );
};
export default Me1537;
