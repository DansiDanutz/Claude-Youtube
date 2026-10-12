import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { AskMark, EpisodeHud, WakePlace, win, SunCliffhanger, SchoolChip, SchoolLadder, schoolRungs, Kid, Cow, Scroll, SchoolHouse, Coin, Label, Source, StampText, DayBar, INK } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 7/14 — ERA 3: 1763, a village in Prussia (RESEARCH F10–F12; the 1763 regulation, GHDI translation).
// Place on "village"; leaves fall from "autumn"; THE WAR'S OVER on "over" (Seven Years' War, Feb 1763);
// sheaves on "harvest's"; the pastor's scroll on "news". DYK: the law banned school holidays · "Not even at
// harvest time" + the clause quoted on "Not". THE KING'S ORDER chip (slot 2) on "king." (2nd); a boy and a girl;
// an age ruler 5 → ~13 on "five"/"thirteen"; PARENTS CAN BE FINED on "fined". Day bars: WINTER 8–11 + 1–4 (on
// the spoken hours), SUMMER a few hours + a cow on "cows". §4 hire a shepherd; children walk to school. An old
// soldier as teacher ("might" / "many"). Myth beat (F12): FACTORY WORKERS? → NOT THAT SIMPLE → a land of farms →
// LOYAL · GOD-FEARING · DISCIPLINED → plenty IGNORED THE RULES (Melton 1988). Cliffhanger: one teacher per village,
// SLOW · EXPENSIVE; band into 1810. VO sc06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc1763', durationInSeconds: 72.5, fps: 30, width: 1920, height: 1080 };
const DUR = 2175;

const C = makeCue(vo, 'sc06-1763', 0.8);
const VILLAGE1 = C.at('village', 1);
const PRUSSIA1 = C.at('Prussia', 1);
const DOCK = PRUSSIA1 + 46;
const AUTUMN = C.at('autumn');
const OVER = C.at('over');
const HARVESTS = C.at("harvest's");
const PASTOR = C.at('pastor');
const NEWS = C.at('news');
const DID = C.at('Did');
const FREDERICK = C.at('Frederick');
const LAW1 = C.at('law', 1);
const BANNED = C.at('banned');
const HOLIDAYS = C.at('holidays');
const NOT1 = C.at('Not', 1); // 'Not even at harvest time.'
const HARVEST = C.at('harvest');
const SO = C.at('So', 1); // 'So what is school now?' (2 = 'so the children')
const ORDER = C.at('order');
const KING2 = C.at('king', 2); // 'From the king.' (1 = 'news from the king')
const CHIP_DOCK = KING2 + 95;
const EVERY = C.at('Every');
const BOY = C.at('boy');
const GIRL = C.at('girl');
const FIVE = C.at('five');
const THIRTEEN = C.at('thirteen');
const SKIP = C.at('Skip');
const PARENTS = C.at('parents');
const FINED = C.at('fined');
const WINTER = C.at('winter');
const EIGHT = C.at('eight');
const ELEVEN = C.at('eleven');
const ONE1 = C.at('one', 1); // 'one to four'
const FOUR = C.at('four');
const SUMMER = C.at('summer');
const FEW = C.at('few');
const COWS = C.at('cows');
const LAW2 = C.at('law', 2); // 'The law even says'
const HIRE = C.at('hire');
const SHEPHERD = C.at('shepherd');
const CHILDREN1 = C.at('children', 1);
const SCHOOL4 = C.at('school', 4); // 'go to school.'
const TEACHER1 = C.at('teacher', 1); // 'Your teacher might be'
const SOLDIER = C.at('soldier');
const MANY = C.at('Many');
const WERE = C.at('were');
const HEARD = C.at('heard');
const MIGHT2 = C.at('might', 2); // 'You might have heard'
const OBEDIENT = C.at('obedient');
const FACTORY = C.at('factory');
const HISTORIANS = C.at('Historians');
const SIMPLE = C.at('simple');
const PRUSSIA2 = C.at('Prussia', 2);
const FARMS = C.at('farms');
const KING3 = C.at('king', 3); // 'The king and his church'
const LOYAL = C.at('loyal');
const GOD = C.at('God');
const DISCIPLINED = C.at('disciplined');
const PLENTY = C.at('plenty');
const IGNORED = C.at('ignored');
const BUT = C.at('But');
const ONE2 = C.at('one', 2); // 'one teacher per village'
const VILLAGE3 = C.at('village', 3);
const SLOW = C.at('slow');
const EXPENSIVE = C.at('expensive');
const LONDON = C.at('London');
const TEACH = C.at('teach');
const ALMOST = C.at('almost');
const TRICK = C.at('trick');
const MAKE = C.at('Make', 2); // 'Make the children the teachers.' (1 = 'to make obedient')

const LEAF = ['#d9822b', '#b5541c', '#e0a83a'];

const Sheaf: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 90 117">{[-18, -9, 0, 9, 18].map((a) => <line key={a} x1={45} y1={110} x2={45 + a * 1.6} y2={10} stroke="#d9b866" strokeWidth={6} strokeLinecap="round" />)}<rect x={30} y={62} width={30} height={10} fill={INK.wood} /></svg>
);
const Soldier: React.FC<{ size?: number }> = ({ size = 170 }) => (
  <div style={{ position: 'relative' }}>
    <Kid size={size} adult color="#3b5a8a" />
    <svg width={size} height={size * 0.4} viewBox="0 0 100 40" style={{ position: 'absolute', left: 0, top: size * 0.02 }}><path d="M18 30 L50 6 L82 30 Q50 22 18 30 Z" fill="#1b1b2a" stroke={DL.gold} strokeWidth={2} /></svg>
  </div>
);
const Factory: React.FC<{ size?: number }> = ({ size = 220 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 220 165"><path d="M10 160 L10 80 L60 110 L60 80 L110 110 L110 80 L160 110 L160 30 L190 30 L190 160 Z" fill="#6a6a72" /><rect x={166} y={10} width={18} height={24} fill="#55555e" /></svg>
);
const Farm: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 200 140"><path d="M20 70 L70 30 L120 70 Z" fill="#7a2a1a" /><rect x={30} y={68} width={80} height={60} fill="#a0472c" /><rect x={58} y={92} width={24} height={36} fill="#3a1408" />{[130, 150, 170].map((x) => <line key={x} x1={x} y1={128} x2={x} y2={70} stroke="#d9b866" strokeWidth={6} />)}<rect x={0} y={126} width={200} height={10} fill="#4a6a2a" /></svg>
);

const Sc1763: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const village = win(f, DOCK - 4, DID - 2, 8, 8);
  const order = win(f, SO - 2, WINTER, 4, 10);
  const hours = win(f, WINTER - 2, LAW2, 4, 10);
  const shepherd = win(f, LAW2 - 2, TEACHER1, 4, 10);
  const soldier = win(f, TEACHER1 - 2, MIGHT2, 4, 10);
  const myth = win(f, MIGHT2 - 2, BUT, 4, 10);
  const cliff = ease(f, BUT - 2, BUT + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, LONDON - 2, LONDON + 8));
  const rungs = [...schoolRungs(2), { year: '1763', label: "KING'S ORDER", at: CHIP_DOCK + 10 }];
  const factoryOut = ease(f, FARMS - 2, FARMS + 10);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#2a1606" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* autumn leaves */}
        <AbsoluteFill style={{ opacity: ease(f, AUTUMN - 4, AUTUMN + 10) * (1 - ease(f, DID - 6, DID)) }}>
          {Array.from({ length: 14 }, (_, i) => {
            const t = f - AUTUMN + i * 23;
            return <div key={i} style={{ position: 'absolute', left: 200 + ((i * 131) % 1500) + Math.sin(t / 20 + i) * 40, top: ((t * 2.2) % 900) + 100, width: 22, height: 14, borderRadius: '60% 10%', background: LEAF[i % 3], transform: `rotate(${t * 3 + i * 40}deg)`, opacity: 0.8 }} />;
          })}
        </AbsoluteFill>
        <EraHeader year="1763" idx={3} label="PRUSSIA" dockAt={DOCK} />
        <WakePlace place="a village · Prussia" at={VILLAGE1} dockAt={DOCK} yearAt={C.at('seventeen')} />
        <AbsoluteFill style={{ opacity: village }}>
          <div style={{ position: 'absolute', left: 160, top: 240, display: 'flex', gap: 20 }}>
            <Label at={AUTUMN} color={LEAF[0]} size={30}>AUTUMN</Label>
            <Label at={OVER} color={DL.text} size={30}>· THE WAR'S OVER</Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 290 }}><Source at={OVER}>the Seven Years' War ended in February 1763</Source></div>
          <div style={{ position: 'absolute', left: 160, top: 420, display: 'flex', gap: 26, alignItems: 'flex-end', opacity: ease(f, HARVESTS - 2, HARVESTS + 8) }}>
            {[0, 1, 2, 3].map((i) => <div key={i} style={{ opacity: ease(f, HARVESTS + i * 4, HARVESTS + i * 4 + 8) }}><Sheaf size={100} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 600 }}><Label at={HARVESTS} color="#d9b866" size={30}>THE HARVEST'S IN</Label></div>
          <div style={{ position: 'absolute', left: 900, top: 380, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
            <div style={{ opacity: ease(f, PASTOR - 2, PASTOR + 8) }}><Kid size={150} adult color="#2a2a33" /></div>
            <div style={{ opacity: ease(f, NEWS - 2, NEWS + 8), transform: `rotate(${-6 * ease(f, NEWS, NEWS + 14)}deg)` }}><Scroll size={300} /></div>
          </div>
          <div style={{ position: 'absolute', left: 900, top: 700 }}><Label at={NEWS} color={DL.gold} size={30}>THE PASTOR · NEWS FROM THE KING</Label></div>
        </AbsoluteFill>

        {/* An order. From the king. Every boy and girl, 5 → ~13. Parents fined. */}
        <AbsoluteFill style={{ opacity: order }}>
          <div style={{ position: 'absolute', left: 160, top: 230, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, ORDER - 2, ORDER + 8) }}><Scroll size={240} /></div>
            <svg width={140} height={100} viewBox="0 0 260 180" style={{ opacity: ease(f, KING2 - 2, KING2 + 8) }}><path d="M20 160 L30 40 L80 100 L130 20 L180 100 L230 40 L240 160 Z" fill={DL.gold} /></svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label at={ORDER} color={DL.text} size={36}>AN ORDER.</Label>
              <Label at={KING2} color={DL.gold} size={36}>FROM THE KING.</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 470, display: 'flex', gap: 30, alignItems: 'flex-end' }}>
            <div style={{ opacity: ease(f, BOY - 2, BOY + 8) }}><Kid size={110} /></div>
            <div style={{ opacity: ease(f, GIRL - 2, GIRL + 8) }}><Kid size={110} girl color={DL.gold} /></div>
          </div>
          {/* age ruler 0–16 with the band 5 → 13 */}
          <div style={{ position: 'absolute', left: 460, top: 520, width: 1000, opacity: ease(f, EVERY - 2, EVERY + 8) }}>
            <div style={{ position: 'relative', height: 70, borderBottom: `3px solid ${DL.dim}` }}>
              {Array.from({ length: 17 }, (_, a) => <div key={a} style={{ position: 'absolute', left: a * 60, bottom: -36, width: 30, marginLeft: -15, textAlign: 'center', fontFamily: DL_MONO, fontSize: 24, color: a === 5 || a === 13 ? DL.gold : DL.muted }}>{a}</div>)}
              <div style={{ position: 'absolute', left: 300, bottom: 6, height: 50, width: 480 * ease(f, FIVE, THIRTEEN + 4), borderRadius: 8, background: `${DL.gold}cc`, opacity: ease(f, FIVE - 2, FIVE + 4) }} />
            </div>
            <div style={{ marginTop: 50 }}><Label at={THIRTEEN} color={DL.gold} size={30}>AGES 5 → ABOUT 13 · EVERY BOY AND GIRL</Label></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 720, display: 'flex', alignItems: 'center', gap: 24, opacity: ease(f, SKIP - 2, SKIP + 8) }}>
            <Coin size={80} />
            <Label at={PARENTS} color={DL.text} size={32}>SKIP IT → YOUR PARENTS</Label>
            <StampText text="CAN BE FINED" at={FINED} size={36} tilt={-3} />
          </div>
        </AbsoluteFill>
        <AskMark at={SO} out={ORDER + 4} left={300} top={230} pulseAt={C.at('now', 1)} />
        <SchoolChip text="THE KING'S ORDER" at={KING2} dockAt={CHIP_DOCK} slot={2} left={1000} top={300} />

        {/* the school day, from the law */}
        <AbsoluteFill style={{ opacity: hours }}>
          <div style={{ position: 'absolute', left: 160, top: 230 }}>
            <DayBar title="WINTER" w={1100} at={WINTER} segs={[{ from: 8, to: 11, label: '8–11', color: DL.sky, at: EIGHT }, { from: 13, to: 16, label: '1–4', color: DL.sky, at: ONE1 }]} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 470 }}>
            <DayBar title="SUMMER" w={1100} at={SUMMER} segs={[{ from: 7, to: 10, label: 'A FEW HOURS', color: '#e0a83a', at: FEW }]} />
          </div>
          <div style={{ position: 'absolute', left: 1320, top: 520, opacity: ease(f, COWS - 2, COWS + 8) }}><Cow size={300} /></div>
          <div style={{ position: 'absolute', left: 1320, top: 720 }}><Label at={COWS} color={DL.warm} size={28}>COWS TO HERD</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 740 }}><Source at={WINTER}>1763 school regulation · winter Michaelmas–Easter · summer about 3 hours · bars = illustration</Source></div>
        </AbsoluteFill>

        {/* §4: hire a shepherd, so the children can go to school */}
        <AbsoluteFill style={{ opacity: shepherd }}>
          <div style={{ position: 'absolute', left: 160, top: 240, width: 1100, padding: '26px 34px', borderRadius: 16, background: '#0e0b0af0', border: `1px solid ${DL.border}`, borderLeft: `5px solid ${DL.gold}` }}>
            <div style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.dim }}>THE LAW EVEN SAYS · §4</div>
            <div style={{ marginTop: 12, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 52, color: DL.text }}><span style={{ opacity: ease(f, HIRE - 2, HIRE + 8) }}>hire a shepherd,</span><span style={{ opacity: ease(f, CHILDREN1 - 2, CHILDREN1 + 8), color: DL.gold }}> so the children can go to school.</span></div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 520, display: 'flex', alignItems: 'flex-end', gap: 30, opacity: ease(f, SHEPHERD - 2, SHEPHERD + 8) }}>
            <div style={{ position: 'relative' }}><Kid size={140} adult color="#7a6a4a" /><svg width={60} height={200} viewBox="0 0 60 200" style={{ position: 'absolute', left: 110, top: 0 }}><path d="M30 200 L30 40 Q30 6 50 10" fill="none" stroke={INK.wood} strokeWidth={8} strokeLinecap="round" /></svg></div>
            <Cow size={200} /><Cow size={170} />
          </div>
          <div style={{ position: 'absolute', left: 1000, top: 560, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ opacity: ease(f, CHILDREN1 + i * 4, CHILDREN1 + i * 4 + 8), transform: `translateX(${ease(f, CHILDREN1, SCHOOL4 + 20, 0, 180)}px)` }}><Kid size={80} girl={i === 1} tool="book" /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 1500, top: 540, opacity: ease(f, SCHOOL4 - 4, SCHOOL4 + 6) }}><SchoolHouse size={220} /></div>
        </AbsoluteFill>

        {/* your teacher might be an old soldier */}
        <AbsoluteFill style={{ opacity: soldier }}>
          <div style={{ position: 'absolute', left: 300, top: 300, opacity: ease(f, SOLDIER - 6, SOLDIER + 6) }}><Soldier size={200} /></div>
          <div style={{ position: 'absolute', left: 600, top: 380, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Label at={TEACHER1} color={DL.text} size={38}>YOUR TEACHER MIGHT BE</Label>
            <Label at={SOLDIER} color="#7aa0e0" size={44}>AN OLD SOLDIER</Label>
            <Label at={MANY} color={DL.dim} size={32}>MANY EARLY VILLAGE TEACHERS WERE<span style={{ opacity: ease(f, WERE, WERE + 6) }}>.</span></Label>
          </div>
        </AbsoluteFill>

        {/* the myth: obedient factory workers? */}
        <AbsoluteFill style={{ opacity: myth }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={MIGHT2} color={DL.dim} size={30}>YOU MIGHT HAVE HEARD…</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, width: 1100, fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 58, lineHeight: 1.2, color: DL.text, opacity: ease(f, HEARD, HEARD + 10) * (1 - 0.6 * factoryOut) }}>
            school was invented to make <span style={{ opacity: ease(f, OBEDIENT - 2, OBEDIENT + 6) }}>obedient</span> <span style={{ opacity: ease(f, FACTORY - 2, FACTORY + 6), color: DL.red }}>factory workers.</span>
          </div>
          <div style={{ position: 'absolute', left: 1360, top: 520, opacity: ease(f, FACTORY - 2, FACTORY + 8) * (1 - factoryOut) }}><Factory size={300} /></div>
          <div style={{ position: 'absolute', left: 1360, top: 520, opacity: factoryOut }}><Farm size={300} /></div>
          <div style={{ position: 'absolute', left: 160, top: 470, display: 'flex', alignItems: 'center', gap: 30 }}>
            <Label at={HISTORIANS} color={DL.text} size={32}>HISTORIANS SAY:</Label>
            <StampText text="NOT THAT SIMPLE" at={SIMPLE} color={DL.gold} size={40} tilt={-3} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 570 }}><Label at={PRUSSIA2} color="#9bd06a" size={32}>1763 PRUSSIA: STILL A LAND OF FARMS</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 630 }}><Label at={KING3} color={DL.dim} size={28}>THE KING AND HIS CHURCH WANTED:</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 685, display: 'flex', alignItems: 'center', gap: 18 }}>
            {[['LOYAL', LOYAL], ['GOD-FEARING', GOD], ['DISCIPLINED SUBJECTS', DISCIPLINED]].map(([t, at]) => <span key={String(t)} style={{ opacity: ease(f, Number(at) - 2, Number(at) + 6), transform: `scale(${ease(f, Number(at) - 2, Number(at) + 8, 1.3, 1)})`, padding: '8px 16px', border: `2px solid ${DL.gold}`, borderRadius: 8, fontFamily: DL_MONO, fontSize: 26, color: DL.gold, whiteSpace: 'nowrap' }}>{t}</span>)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 770, display: 'flex', alignItems: 'center', gap: 24 }}>
            <Label at={PLENTY} color={DL.text} size={30}>PLENTY OF FAMILIES</Label>
            <StampText text="IGNORED THE RULES" at={IGNORED} size={36} tilt={-4} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={SIMPLE}>Melton, Absolutism and the Eighteenth-Century Origins of Compulsory Schooling (1988)</Source></div>
        </AbsoluteFill>

        {/* cliffhanger: one teacher per village is slow and expensive */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 260, top: 280, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
            <div style={{ opacity: ease(f, ONE2 - 2, ONE2 + 8) }}><Kid size={130} adult color="#3b5a8a" /></div>
            {[0, 1, 2, 3].map((i) => <div key={i} style={{ opacity: ease(f, VILLAGE3 + i * 4, VILLAGE3 + i * 4 + 8) }}><SchoolHouse size={130} bell={false} /></div>)}
          </div>
          <div style={{ position: 'absolute', left: 1080, top: 330, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <StampText text="SLOW" at={SLOW} size={44} tilt={-4} />
            <StampText text="EXPENSIVE" at={EXPENSIVE} size={44} tilt={3} />
          </div>
          <div style={{ position: 'absolute', left: 1080, top: 560, opacity: ease(f, TRICK - 2, TRICK + 8), display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <Kid size={90} tool="book" color={DL.gold} />{[0, 1, 2].map((i) => <Kid key={i} size={64} />)}
          </div>
        </AbsoluteFill>

        <SchoolLadder rungs={rungs} show={ladder} />
        <DidYouKnowThat at={DID} out={SO}>
          <span style={{ opacity: ease(f, FREDERICK - 4, FREDERICK + 6) }}>Frederick the Great’s new school law</span>
          <span style={{ opacity: ease(f, BANNED - 4, BANNED + 6) }}> banned</span>
          <span style={{ opacity: ease(f, HOLIDAYS - 6, HOLIDAYS + 6), color: '#ff9a1f', fontStyle: 'italic' }}> school holidays.</span>
          <div style={{ marginTop: 14, opacity: ease(f, NOT1 - 2, NOT1 + 6) }}>Not even at <span style={{ opacity: ease(f, HARVEST - 2, HARVEST + 6), color: '#ff9a1f' }}>harvest time.</span></div>
          <div style={{ marginTop: 20, fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: '#c8cdf0', opacity: ease(f, NOT1, NOT1 + 10) }}>“No vacations are to be given, not even during harvest time.” · Prussian school regulation, 12 Aug 1763 (GHDI)</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1810" parts={[{ text: 'In London, a young man', at: LONDON }, { text: 'thinks he can teach the poor', at: TEACH }, { text: 'for almost nothing.', at: ALMOST }, { text: 'His trick?', at: TRICK }, { text: 'Make the children the teachers.', at: MAKE }]} />
      <EpisodeHud year={1763} episode="03" />
    </AbsoluteFill>
  );
};
export default Sc1763;
