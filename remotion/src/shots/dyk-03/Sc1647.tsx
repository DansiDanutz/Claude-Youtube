import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { AskMark, EpisodeHud, WakePlace, win, SunCliffhanger, SunWeekStrip, SchoolChip, SchoolLadder, schoolRungs, Kid, Book, Cow, Scroll, Label, Source, StampText, INK } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 6/14 — ERA 2: 1647, a farming town in Massachusetts (RESEARCH F9). Place on "farming"; frost grows
// on the window on "frost", a cow + pail on "cows"/"milking". DYK: the law "begins by blaming the devil"; its
// first words (1647, public domain) build on their spoken words inside the card. TO READ GOD'S WORD chip
// (slot 1) on "word," — an open Bible, an eye on "eyes". 1642: PARENTS & MASTERS MUST TEACH READING, IGNORED
// on "bother". 1647: 50 houses fill on "fifty households" → HIRE A TEACHER; 100 on "hundred" → + A GRAMMAR
// SCHOOL · OR A £5 FINE on "fine" (towns, not children: attendance was not forced). Week strip: letters between
// the chores, SERMON on "Sunday". Churches want people reading · A CHURCH CAN ONLY ASK. Cliffhanger: a crown on
// "king", BANNED on "ban" over a blank card (the thing is never named). VO sc05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc1647', durationInSeconds: 61.3333, fps: 30, width: 1920, height: 1080 };
const DUR = 1840;

const C = makeCue(vo, 'sc05-1647', 0.8);
const FARMING = C.at('farming');
const MASS = C.at('Massachusetts');
const DOCK = MASS + 46;
const FROST = C.at('frost');
const COWS = C.at('cows');
const MILKING = C.at('milking');
const BREAKFAST = C.at('breakfast');
const DID = C.at('Did');
const FIRST = C.at('first');
const LAWS = C.at('laws');
const BLAMING = C.at('blaming');
const DEVIL = C.at('devil');
const SAYS = C.at('says');
const CHIEF = C.at('chief');
const DELUDER = C.at('deluder');
const SATAN = C.at('Satan');
const KEEP = C.at('keep');
const KNOWLEDGE = C.at('knowledge');
const SCRIPTURES = C.at('Scriptures');
const SO1 = C.at('So', 1); // "So what's school to you now?"
const READ1 = C.at('read', 1); // 'A way to read God's word'
const WORD = C.at('word');
const CHIP_DOCK = WORD + 95;
const EYES = C.at('eyes');
const FIVE = C.at('Five');
const LAW1 = C.at('law', 1); // 'a law told parents'
const PARENTS = C.at('parents');
const MASTERS = C.at('masters');
const TEACH1 = C.at('teach', 1);
const READ2 = C.at('read', 2); // 'children to read.'
const LOTS = C.at('Lots');
const BOTHER = C.at('bother');
const SO2 = C.at('So', 2); // 'So now, any town'
const FIFTY = C.at('fifty');
const HIRE = C.at('hire');
const READING1 = C.at('reading', 1);
const HUNDRED = C.at('hundred');
const GRAMMAR = C.at('grammar');
const PAYS = C.at('pays');
const FINE = C.at('fine');
const LEARN = C.at('learn');
const LETTERS = C.at('letters');
const CHORES = C.at('chores');
const SUNDAY = C.at('Sunday');
const MATTER = C.at('matter');
const ALL = C.at('All');
const PROTESTANT = C.at('Protestant');
const CHURCHES = C.at('churches');
const READING2 = C.at('reading', 2); // 'want people reading.'
const BUT = C.at('But');
const ASK = C.at('ask');
const IN_NEXT = C.at('next'); // 'In the next century' (the band opens here; 'in' repeats too often to cue)
const KING = C.at('king');
const ORDER = C.at('order');
const AND_HE = C.at("he'll");
const BAN = C.at('ban');
const EVERY = C.at('every');
const FORWARD = C.at('forward');

const ICE = '#cfe8ff';

const FrostWindow: React.FC<{ f: number }> = ({ f }) => {
  const grow = ease(f, FROST - 2, FROST + 40);
  return (
    <svg width={420} height={420} viewBox="0 0 420 420">
      <rect x={10} y={10} width={400} height={400} fill="#0d1622" stroke={INK.wood} strokeWidth={16} />
      <line x1={210} y1={10} x2={210} y2={410} stroke={INK.wood} strokeWidth={12} /><line x1={10} y1={210} x2={410} y2={210} stroke={INK.wood} strokeWidth={12} />
      {Array.from({ length: 16 }, (_, i) => {
        const cx = 30 + (i % 4) * 110, cy = 30 + Math.floor(i / 4) * 110, r = 46 * grow * (0.6 + ((i * 7) % 5) / 10);
        return <g key={i} opacity={0.75 * grow}>{[0, 60, 120].map((a) => <line key={a} x1={cx - r * Math.cos(a * Math.PI / 180)} y1={cy - r * Math.sin(a * Math.PI / 180)} x2={cx + r * Math.cos(a * Math.PI / 180)} y2={cy + r * Math.sin(a * Math.PI / 180)} stroke={ICE} strokeWidth={3} />)}</g>;
      })}
    </svg>
  );
};

// houses: 50 (row 1–5) then 100 (rows 6–10)
const Households: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 46px)', gap: 8 }}>
    {Array.from({ length: 100 }, (_, i) => {
      const at = i < 50 ? FIFTY + i * 0.4 : HUNDRED + (i - 50) * 0.4;
      const on = ease(f, at, at + 6);
      return (
        <svg key={i} width={46} height={40} viewBox="0 0 46 40" style={{ opacity: on }}>
          <path d="M4 18 L23 4 L42 18 Z" fill={i < 50 ? DL.gold : DL.sky} /><rect x={8} y={18} width={30} height={20} fill={i < 50 ? '#8a6a10' : '#2f5f8f'} />
        </svg>
      );
    })}
  </div>
);

const Church: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 130 143">
    <rect x={56} y={0} width={18} height={40} fill="#cfc6b4" /><rect x={50} y={10} width={30} height={6} fill="#cfc6b4" />
    <path d="M20 70 L65 34 L110 70 Z" fill="#7a6a58" /><rect x={28} y={68} width={74} height={74} fill="#a89880" />
    <rect x={56} y={104} width={18} height={38} fill="#3a2a1c" />
  </svg>
);

const Sc1647: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const morning = win(f, DOCK - 4, DID - 2, 8, 8);
  const god = win(f, SO1 - 2, FIVE, 4, 10);
  const law42 = win(f, FIVE - 2, SO2, 4, 10);
  const law47 = win(f, SO2 - 2, LEARN, 4, 10);
  const week = win(f, LEARN - 2, ALL, 4, 10);
  const churches = win(f, ALL - 2, IN_NEXT + 4, 4, 10);
  const cliff = ease(f, IN_NEXT - 2, IN_NEXT + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, IN_NEXT - 2, IN_NEXT + 8));
  const rungs = [...schoolRungs(1), { year: '1647', label: "GOD'S WORD", at: CHIP_DOCK + 10 }];

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1626" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1647" idx={2} label="MASSACHUSETTS" dockAt={DOCK} />
        <WakePlace place="a farming town · Massachusetts" at={FARMING} dockAt={DOCK} yearAt={C.at('sixteen')} />
        {/* a cold farm morning */}
        <AbsoluteFill style={{ opacity: morning }}>
          <div style={{ position: 'absolute', left: 160, top: 240 }}><FrostWindow f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 690 }}><Label at={FROST} color={ICE} size={28}>FROST ON THE WINDOW</Label></div>
          <div style={{ position: 'absolute', left: 700, top: 420, opacity: ease(f, COWS - 2, COWS + 8), transform: `translateX(${ease(f, COWS - 2, COWS + 14, 40, 0)}px)` }}><Cow size={340} /></div>
          <svg width={110} height={110} viewBox="0 0 110 110" style={{ position: 'absolute', left: 1080, top: 560, opacity: ease(f, MILKING - 2, MILKING + 8) }}>
            <path d="M20 30 L90 30 L80 100 L30 100 Z" fill="#9a9a9a" /><ellipse cx={55} cy={30} rx={35} ry={8} fill="#e8e8e8" />
          </svg>
          <div style={{ position: 'absolute', left: 700, top: 690, display: 'flex', gap: 16 }}>
            <Label at={MILKING} color={DL.warm} size={28}>MILK THE COWS</Label>
            <Label at={BREAKFAST} color={DL.dim} size={28}>· BEFORE BREAKFAST</Label>
          </div>
        </AbsoluteFill>

        {/* "A way to read God's word, with your own eyes." */}
        <AbsoluteFill style={{ opacity: god }}>
          <div style={{ position: 'absolute', left: 300, top: 240, opacity: ease(f, READ1 - 2, READ1 + 8) }}><Book size={420} open={ease(f, READ1 - 4, WORD, 0.2, 1)} /></div>
          <svg width={200} height={110} viewBox="0 0 200 110" style={{ position: 'absolute', left: 410, top: 560, opacity: ease(f, EYES - 2, EYES + 8) }}>
            <path d="M10 55 Q100 -10 190 55 Q100 120 10 55 Z" fill="none" stroke={DL.gold} strokeWidth={6} /><circle cx={100} cy={55} r={24} fill={DL.gold} />
          </svg>
          <div style={{ position: 'absolute', left: 320, top: 690 }}><Label at={EYES} color={DL.gold} size={30}>WITH YOUR OWN EYES</Label></div>
        </AbsoluteFill>
        <AskMark at={SO1} out={READ1 + 4} left={300} top={230} pulseAt={C.at('now', 1)} />
        <SchoolChip text="TO READ GOD'S WORD" at={WORD} dockAt={CHIP_DOCK} slot={1} left={900} top={420} />

        {/* 1642: a law told parents and masters to teach reading — lots didn't bother */}
        <AbsoluteFill style={{ opacity: law42 }}>
          <div style={{ position: 'absolute', left: 160, top: 240, display: 'flex', gap: 40, alignItems: 'center' }}>
            <div style={{ opacity: ease(f, LAW1 - 2, LAW1 + 8) }}><Scroll size={300} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ ...rise(f, FIVE - 2), fontFamily: DL_SERIF, fontSize: 96, color: DL.gold, lineHeight: 1 }}>1642</div>
              <Label at={PARENTS} color={DL.text} size={32}>PARENTS</Label>
              <Label at={MASTERS} color={DL.text} size={32}>& MASTERS</Label>
              <Label at={TEACH1} color={DL.warm} size={30}>MUST TEACH THEIR CHILDREN TO READ</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 620, display: 'flex', gap: 22, alignItems: 'flex-end', opacity: ease(f, LOTS - 2, LOTS + 8) }}>
            {[0, 1, 2, 3, 4].map((i) => <Kid key={i} size={80} tool="hammer" girl={i % 2 === 1} />)}
          </div>
          <div style={{ position: 'absolute', left: 700, top: 660 }}><StampText text="LOTS DIDN'T BOTHER" at={BOTHER} size={42} /></div>
        </AbsoluteFill>

        {/* 1647: 50 households → a teacher; 100 → a grammar school, or a fine */}
        <AbsoluteFill style={{ opacity: law47 }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={SO2} color={DL.gold} size={34}>1647 · THE NEW LAW · EVERY TOWN</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 300 }}><Households f={f} /></div>
          <div style={{ position: 'absolute', left: 780, top: 300, display: 'flex', flexDirection: 'column', gap: 18, width: 900 }}>
            <Label at={FIFTY} color={DL.gold} size={36}>50 HOUSEHOLDS</Label>
            <Label at={HIRE} color={DL.text} size={32}>→ HIRE A TEACHER</Label>
            <Label at={READING1} color={DL.warm} size={28}>READING & WRITING</Label>
            <div style={{ height: 18 }} />
            <Label at={HUNDRED} color={DL.sky} size={36}>100 HOUSEHOLDS</Label>
            <Label at={GRAMMAR} color={DL.text} size={32}>→ + A GRAMMAR SCHOOL</Label>
            <div style={{ marginTop: 10 }}><StampText text="OR THE TOWN PAYS £5" at={FINE} color={DL.red} size={34} tilt={-3} /></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 880 }}><Source at={PAYS}>Massachusetts Bay school law, 1647 · it obliged towns; it did not force children to attend</Source></div>
        </AbsoluteFill>

        {/* a week: letters between the chores, a sermon on Sunday */}
        <div style={{ position: 'absolute', left: 160, top: 250, opacity: week }}>
          <SunWeekStrip year="1647" at={LEARN} hot={6} hotAt={SUNDAY} days={[
            { d: 'MON', work: 0.75, color: DL.warm }, { d: 'TUE', work: 0.75, color: DL.warm }, { d: 'WED', work: 0.75, color: DL.warm },
            { d: 'THU', work: 0.75, color: DL.warm }, { d: 'FRI', work: 0.75, color: DL.warm }, { d: 'SAT', work: 0.8, color: DL.warm },
            { d: 'SUN', work: 0.15, color: DL.gold, tag: 'SERMON' }]} />
        </div>
        <div style={{ position: 'absolute', left: 1080, top: 540, width: 680, display: 'flex', flexDirection: 'column', gap: 16, opacity: week }}>
          <Label at={LETTERS} color={DL.text} size={32}>LETTERS</Label>
          <Label at={CHORES} color={DL.warm} size={30}>BETWEEN THE CHORES</Label>
          <Label at={SUNDAY} color={DL.gold} size={30}>SUNDAY: WHY THEY MATTER</Label>
          <div style={{ opacity: ease(f, MATTER - 4, MATTER + 6) }}><Book size={150} /></div>
        </div>

        {/* churches want people reading — but a church can only ask */}
        <AbsoluteFill style={{ opacity: churches }}>
          <div style={{ position: 'absolute', left: 160, top: 300, display: 'flex', gap: 40, alignItems: 'flex-end' }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ opacity: ease(f, PROTESTANT + i * 5, PROTESTANT + i * 5 + 8) }}><Church size={150} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={ALL} color={DL.dim} size={30}>ALL OVER PROTESTANT EUROPE</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 520, display: 'flex', gap: 30, alignItems: 'center' }}>
            <div style={{ opacity: ease(f, READING2 - 4, READING2 + 6) }}><Book size={180} /></div>
            <Label at={CHURCHES} color={DL.text} size={34}>CHURCHES WANT PEOPLE READING</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 720 }}><StampText text="A CHURCH CAN ONLY ASK" at={ASK} color={DL.gold} size={40} tilt={-2} /></div>
        </AbsoluteFill>

        {/* cliffhanger: a king will order it — and ban something (unnamed) */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <svg width={260} height={180} viewBox="0 0 260 180" style={{ position: 'absolute', left: 360, top: 300, opacity: ease(f, KING - 2, KING + 8), transform: `scale(${ease(f, KING - 2, KING + 10, 1.3, 1)})` }}>
            <path d="M20 160 L30 40 L80 100 L130 20 L180 100 L230 40 L240 160 Z" fill={DL.gold} style={{ filter: `drop-shadow(0 0 20px ${DL.gold})` }} />
          </svg>
          <div style={{ position: 'absolute', left: 340, top: 520, opacity: ease(f, ORDER - 2, ORDER + 8) }}><Scroll size={300} /></div>
          <div style={{ position: 'absolute', left: 1000, top: 300, width: 420, height: 300, borderRadius: 20, border: `3px dashed ${DL.muted}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: ease(f, AND_HE - 2, AND_HE + 8) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 200, color: DL.muted, opacity: 0.6 + 0.3 * ease(f, EVERY, FORWARD) }}>?</span>
            <div style={{ position: 'absolute' }}><StampText text="BANNED" at={BAN} size={60} tilt={-12} /></div>
          </div>
        </AbsoluteFill>

        <SchoolLadder rungs={rungs} show={ladder} />
        <DidYouKnowThat at={DID} out={SO1}>
          <span style={{ opacity: ease(f, FIRST - 4, FIRST + 6) }}>one of America’s first</span>
          <span style={{ opacity: ease(f, LAWS - 4, LAWS + 6) }}> school laws</span>
          <span style={{ opacity: ease(f, BLAMING - 4, BLAMING + 6) }}> begins by blaming</span>
          <span style={{ opacity: ease(f, DEVIL - 4, DEVIL + 6), color: '#ff9a1f', fontStyle: 'italic' }}> the devil.</span>
          <div style={{ marginTop: 22, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, lineHeight: 1.25, color: '#e8e4ff', opacity: ease(f, SAYS - 4, SAYS + 6) }}>
            “It being <span style={{ opacity: ease(f, CHIEF - 4, CHIEF + 6) }}>one chief project</span><span style={{ opacity: ease(f, DELUDER - 4, DELUDER + 6) }}> of that old deluder,</span><span style={{ opacity: ease(f, SATAN - 4, SATAN + 6), color: '#ff9a1f' }}> Satan,</span><span style={{ opacity: ease(f, KEEP - 4, KEEP + 6) }}> to keep men</span><span style={{ opacity: ease(f, KNOWLEDGE - 4, KNOWLEDGE + 6) }}> from the knowledge</span><span style={{ opacity: ease(f, SCRIPTURES - 4, SCRIPTURES + 6) }}> of the Scriptures…”</span>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, SAYS, SAYS + 10) }}>Massachusetts Bay school law, 1647 · later nicknamed the “Old Deluder Satan Act”</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1763" parts={[{ text: 'In the next century,', at: IN_NEXT }, { text: 'a king will order it.', at: KING }, { text: "And he'll ban one thing", at: BAN }, { text: 'every kid on Earth looks forward to.', at: EVERY }]} />
      <EpisodeHud year={1647} episode="03" />
    </AbsoluteFill>
  );
};
export default Sc1647;
