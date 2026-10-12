import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import { AskMark, EpisodeHud, WakePlace, win, SunCliffhanger, SchoolChip, SchoolLadder, schoolRungs, Kid, SchoolHouse, Label, Source, StampText, INK } from '../../lib/dykkit-school';
import vo from './vo.json';

// =============================================================================
// DYK 03 · 8/14 — ERA 4: 1810, London, Borough Road (RESEARCH F13, F14). Place on "London"; one enormous hall on
// "hall", rows of children fill from "Hundreds", ONE MASTER on a raised desk on "master". DYK (F13): Lancaster
// CLAIMED 1,000+ (his own words quoted on "claimed"). Monitors: the rows regroup into small groups, each with a gold
// monitor, on "groups". A sand tray: A B C traced on "letters"/"finger", PAPER COSTS MONEY. The cage is hoisted on
// "hoisted" ("might"; Southey's criticism), REALLY. on "Really", the cane crossed out on "cane". BY THE HUNDRED chip
// (slot 3) on "hundred," + gears on "machine". 1,200+ SCHOOLS "SAID TO" on "twelve". Law (F14, UK Parliament):
// 1880 compulsory 5–10 · 1891 free for most families. Cliffhanger band into 1948. VO sc07 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Sc1810', durationInSeconds: 65.2333, fps: 30, width: 1920, height: 1080 };
const DUR = 1957;

const C = makeCue(vo, 'sc07-1810', 0.8);
const LONDON = C.at('London');
const ROAD = C.at('Road');
const DOCK = ROAD + 40;
const WALK = C.at('walk');
const HALL = C.at('hall');
const HUNDREDS = C.at('Hundreds');
const ROWS_W = C.at('rows');
const MASTER1 = C.at('master', 1);
const DID = C.at('Did');
const LANCASTER1 = C.at('Lancaster', 1);
const CLAIMED = C.at('claimed');
const MASTER2 = C.at('master', 2);
const THOUSAND = C.at('thousand');
const OLDER = C.at('Older');
const YOUNGER = C.at('younger');
const GROUPS = C.at('groups');
const WRITE = C.at('write');
const LETTERS = C.at('letters');
const SAND = C.at('sand');
const FINGER = C.at('finger');
const PAPER = C.at('paper');
const MONEY = C.at('money');
const MISBEHAVE = C.at('Misbehave');
const HOISTED = C.at('hoisted');
const CAGE = C.at('cage');
const REALLY = C.at('Really');
const LANCASTER2 = C.at('Lancaster', 2);
const CANE = C.at('cane');
const SO = C.at('So');
const MACHINE = C.at('machine');
const POOR = C.at('poor');
const HUNDRED1 = C.at('hundred', 1); // 'by the hundred,'
const CHIP_DOCK = HUNDRED1 + 95;
const CHEAPLY = C.at('cheaply');
const BY_TIME = C.at('time'); // 'By the time Lancaster dies' ('by' first occurs in 'by the hundred')
const DIES = C.at('dies');
const TWELVE = C.at('twelve');
const SAID = C.at('said');
const LAW = C.at('law');
const EIGHTY = C.at('eighty');
const COMPULSORY = C.at('compulsory');
const FIVE = C.at('five');
const TEN2 = C.at('ten', 2); // 'five to ten.' (1 = 'eighteen ten,')
const NINETY = C.at('ninety');
const MOST = C.at('most');
const FREE = C.at('free');
const NOW = C.at('Now');
const GO = C.at('go');
const BUT = C.at('But');
const SCHOOL4 = C.at('school', 4); // 'school stops being'
const FORCED = C.at('forced');
const TURNS = C.at('turns');
const FIGHT = C.at('fight');

const GRID_C = 14, GRID_R = 7;
const MONITOR_GOLD = DL.gold;

// the hall: rows of children; on "groups" they gather into small circles round a gold monitor
const Hall: React.FC<{ f: number }> = ({ f }) => {
  const regroup = ease(f, YOUNGER - 6, GROUPS + 10);
  return (
    <svg width={1500} height={560} viewBox="0 0 1500 560">
      <rect x={10} y={10} width={1480} height={540} rx={12} fill="#120e0b" stroke="#3a2a1c" strokeWidth={4} opacity={ease(f, WALK - 4, WALK + 8)} />
      {/* the master's raised desk */}
      <g opacity={ease(f, MASTER1 - 2, MASTER1 + 8)}>
        <rect x={660} y={30} width={180} height={50} fill={INK.wood} />
        <circle cx={750} cy={0} r={20} fill={DL.gold} transform="translate(0 20)" />
        <text x={750} y={110} textAnchor="middle" fontFamily={DL_MONO} fontSize={26} fill={DL.gold}>ONE MASTER</text>
      </g>
      {Array.from({ length: GRID_C * GRID_R }, (_, i) => {
        const c = i % GRID_C, r = Math.floor(i / GRID_C);
        const rowX = 120 + c * 90, rowY = 160 + r * 52;
        const g = Math.floor(c / 2) + 7 * Math.floor(r / 4); // group index (7 per row band)
        const gx = 160 + (g % 7) * 195, gy = 230 + Math.floor(g / 7) * 200;
        const k = (c % 2) + 2 * (r % 4); // slot inside the group
        const ang = (k / 8) * Math.PI * 2;
        const x = rowX + (gx + Math.cos(ang) * 58 - rowX) * regroup;
        const y = rowY + (gy + Math.sin(ang) * 46 - rowY) * regroup;
        const on = ease(f, HUNDREDS + i * 0.35, HUNDREDS + i * 0.35 + 6);
        return <circle key={i} cx={x} cy={y} r={13} fill={DL.warm} opacity={0.85 * on} />;
      })}
      {Array.from({ length: 14 }, (_, g) => {
        const gx = 160 + (g % 7) * 195, gy = 230 + Math.floor(g / 7) * 200;
        return <circle key={g} cx={gx} cy={gy} r={17} fill={MONITOR_GOLD} opacity={ease(f, GROUPS - 2 + g, GROUPS + 8 + g)} style={{ filter: `drop-shadow(0 0 8px ${DL.gold})` }} />;
      })}
    </svg>
  );
};

const SandTray: React.FC<{ f: number }> = ({ f }) => {
  const draw = ease(f, LETTERS - 2, FINGER + 20);
  return (
    <svg width={620} height={300} viewBox="0 0 620 300">
      <rect x={10} y={40} width={600} height={240} rx={10} fill="#d9c08a" stroke={INK.wood} strokeWidth={12} />
      <text x={310} y={220} textAnchor="middle" fontFamily={DL_SERIF} fontSize={160} fill="none" stroke="#8a6a3a" strokeWidth={6} strokeDasharray="900" strokeDashoffset={900 * (1 - draw)}>A B C</text>
      <circle cx={130 + 360 * draw} cy={170 - 40 * Math.sin(draw * 18)} r={18} fill="#e8c8a8" opacity={ease(f, FINGER - 2, FINGER + 6) * (1 - ease(f, FINGER + 30, FINGER + 40))} />
    </svg>
  );
};

const Cage: React.FC<{ f: number }> = ({ f }) => {
  const up = ease(f, HOISTED - 2, CAGE + 10);
  return (
    <svg width={380} height={600} viewBox="0 0 380 600">
      <line x1={190} y1={0} x2={190} y2={360 - 260 * up} stroke="#9a8a6a" strokeWidth={5} />
      <g transform={`translate(110 ${360 - 260 * up})`}>
        <rect x={0} y={0} width={160} height={190} rx={10} fill="none" stroke="#b9b1a4" strokeWidth={6} />
        {[30, 60, 90, 130].map((x) => <line key={x} x1={x} y1={0} x2={x} y2={190} stroke="#b9b1a4" strokeWidth={4} />)}
        <circle cx={80} cy={70} r={22} fill={DL.warm} /><path d="M50 190 C50 120 60 100 80 100 C100 100 110 120 110 190 Z" fill={DL.warm} />
      </g>
      <line x1={0} y1={560} x2={380} y2={560} stroke="#3a2a1c" strokeWidth={6} />
    </svg>
  );
};

const Gears: React.FC<{ f: number }> = ({ f }) => (
  <svg width={260} height={200} viewBox="0 0 260 200">
    {[[90, 100, 70, 1], [190, 70, 46, -1.5]].map(([cx, cy, r, sp], i) => (
      <g key={i} transform={`rotate(${f * 2 * sp} ${cx} ${cy})`}>
        {Array.from({ length: 10 }, (_, k) => <rect key={k} x={cx - 9} y={cy - r - 14} width={18} height={24} fill={DL.dim} transform={`rotate(${k * 36} ${cx} ${cy})`} />)}
        <circle cx={cx} cy={cy} r={r} fill={DL.dim} /><circle cx={cx} cy={cy} r={r * 0.35} fill={DL.bg} />
      </g>
    ))}
  </svg>
);

const Sc1810: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const hall = win(f, DOCK - 4, WRITE, 8, 10);
  const sand = win(f, WRITE - 2, MISBEHAVE, 4, 10);
  const cage = win(f, MISBEHAVE - 2, SO, 4, 10);
  const machine = win(f, SO - 2, BY_TIME, 4, 10);
  const count = win(f, BY_TIME - 2, LAW, 4, 10);
  const law = win(f, LAW - 2, NOW, 4, 10);
  const cliff = ease(f, NOW - 2, NOW + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, NOW - 2, NOW + 8));
  const rungs = [...schoolRungs(3), { year: '1810', label: 'BY THE HUNDRED', at: CHIP_DOCK + 10 }];
  const n1200 = Math.round(1200 * ease(f, TWELVE - 10, TWELVE + 10));

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a1410" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1810" idx={4} label="LONDON" dockAt={DOCK} />
        <WakePlace place="London · Borough Road" at={LONDON} dockAt={DOCK} yearAt={C.at('eighteen', 1)} />
        <div style={{ position: 'absolute', left: 210, top: 230, opacity: hall }}><Hall f={f} /></div>
        <div style={{ position: 'absolute', left: 210, top: 800, display: 'flex', gap: 20, opacity: hall }}>
          <Label at={HALL} color={DL.dim} size={28}>ONE ENORMOUS HALL</Label>
          <Label at={ROWS_W} color={DL.warm} size={28}>· HUNDREDS OF CHILDREN, IN LONG ROWS</Label>
        </div>
        <div style={{ position: 'absolute', left: 210, top: 850, opacity: hall }}><Label at={OLDER} color={DL.gold} size={30}>MONITORS: OLDER KIDS TEACH THE YOUNGER ONES, IN SMALL GROUPS</Label></div>

        {/* letters in sand */}
        <AbsoluteFill style={{ opacity: sand }}>
          <div style={{ position: 'absolute', left: 160, top: 280 }}><SandTray f={f} /></div>
          <div style={{ position: 'absolute', left: 860, top: 330, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Label at={LETTERS} color={DL.text} size={36}>YOUR LETTERS</Label>
            <Label at={SAND} color="#d9c08a" size={36}>IN SAND</Label>
            <Label at={FINGER} color={DL.warm} size={32}>WITH YOUR FINGER</Label>
            <StampText text="PAPER COSTS MONEY" at={PAPER} color={DL.gold} size={36} tilt={-2} />
          </div>
          <div style={{ position: 'absolute', left: 160, top: 640 }}><Source at={MONEY}>monitorial schools · sand trays and slates instead of paper</Source></div>
        </AbsoluteFill>

        {/* the cage */}
        <AbsoluteFill style={{ opacity: cage }}>
          <div style={{ position: 'absolute', left: 260, top: 230 }}><Cage f={f} /></div>
          <div style={{ position: 'absolute', left: 760, top: 300, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Label at={MISBEHAVE} color={DL.red} size={38}>MISBEHAVE…</Label>
            <Label at={HOISTED} color={DL.text} size={34}>…AND YOU MIGHT BE HOISTED UP</Label>
            <Label at={CAGE} color={DL.text} size={34}>IN A CAGE</Label>
            <StampText text="REALLY." at={REALLY} color={DL.gold} size={44} tilt={-5} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, LANCASTER2 - 2, LANCASTER2 + 8) }}>
              <svg width={150} height={60} viewBox="0 0 150 60"><line x1={10} y1={50} x2={140} y2={10} stroke={INK.wood} strokeWidth={10} strokeLinecap="round" /><line x1={10} y1={10} x2={140} y2={50} stroke={DL.red} strokeWidth={6} opacity={ease(f, CANE - 2, CANE + 6)} /></svg>
              <span style={{ fontFamily: DL_MONO, fontSize: 28, color: DL.warm }}>LANCASTER: BETTER THAN THE CANE</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 760, top: 820 }}><Source at={CAGE}>Lancaster's own system; the poet Southey attacked “the cages of Mr. Lancaster”</Source></div>
        </AbsoluteFill>

        {/* a machine, for teaching the poor by the hundred */}
        <AbsoluteFill style={{ opacity: machine }}>
          <div style={{ position: 'absolute', left: 200, top: 280, opacity: ease(f, MACHINE - 2, MACHINE + 8) }}><Gears f={f} /></div>
          <div style={{ position: 'absolute', left: 200, top: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Label at={MACHINE} color={DL.text} size={40}>A MACHINE</Label>
            <Label at={POOR} color={DL.warm} size={32}>FOR TEACHING THE POOR</Label>
            <Label at={CHEAPLY} color={DL.gold} size={32}>AS CHEAPLY AS POSSIBLE</Label>
          </div>
        </AbsoluteFill>
        <AskMark at={SO} out={MACHINE + 4} left={160} top={240} size={380} pulseAt={C.at('you', 6)} />
        <SchoolChip text="BY THE HUNDRED" at={HUNDRED1} dockAt={CHIP_DOCK} slot={3} left={820} top={340} />

        {/* 1,200+ schools said to use it */}
        <AbsoluteFill style={{ opacity: count }}>
          <div style={{ position: 'absolute', left: 200, top: 260 }}><Label at={BY_TIME} color={DL.dim} size={30}>BY THE TIME LANCASTER<span style={{ opacity: ease(f, DIES - 2, DIES + 6) }}> DIES (1838)</span></Label></div>
          <div style={{ position: 'absolute', left: 200, top: 320, fontFamily: DL_MONO, fontWeight: 700, fontSize: 150, color: DL.gold, opacity: ease(f, TWELVE - 10, TWELVE), fontVariantNumeric: 'tabular-nums' }}>{n1200.toLocaleString('en-US')}+</div>
          <div style={{ position: 'absolute', left: 200, top: 500, display: 'flex', gap: 20, alignItems: 'center' }}>
            <Label at={TWELVE} color={DL.text} size={34}>SCHOOLS</Label>
            <StampText text="SAID TO" at={SAID} color={DL.sky} size={34} tilt={-3} />
            <Label at={SAID} color={DL.text} size={34}>USE HIS SYSTEM</Label>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 640, display: 'flex', gap: 16, flexWrap: 'wrap', width: 1000 }}>
            {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ opacity: ease(f, TWELVE + i * 2, TWELVE + i * 2 + 6) }}><SchoolHouse size={70} bell={false} /></div>)}
          </div>
        </AbsoluteFill>

        {/* the law steps in */}
        <AbsoluteFill style={{ opacity: law }}>
          <div style={{ position: 'absolute', left: 200, top: 240 }}><Label at={LAW} color={DL.dim} size={30}>THEN THE LAW STEPS IN · ENGLAND</Label></div>
          <div style={{ position: 'absolute', left: 200, top: 320, display: 'flex', gap: 40 }}>
            <div style={{ ...rise(f, EIGHTY - 2), width: 520, padding: '26px 30px', borderRadius: 16, background: '#0e0b0af0', border: `2px solid ${DL.red}` }}>
              <div style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.text, lineHeight: 1 }}>1880</div>
              <div style={{ marginTop: 12, fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, color: DL.red, opacity: ease(f, COMPULSORY - 2, COMPULSORY + 8) }}>COMPULSORY</div>
              <div style={{ marginTop: 8, fontFamily: DL_MONO, fontSize: 30, color: DL.text, opacity: ease(f, FIVE - 2, FIVE + 8) }}>AGES 5 → <span style={{ opacity: ease(f, TEN2 - 2, TEN2 + 6) }}>10</span></div>
            </div>
            <div style={{ ...rise(f, NINETY - 2), width: 520, padding: '26px 30px', borderRadius: 16, background: '#0e0b0af0', border: `2px solid ${DL.green}` }}>
              <div style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.text, lineHeight: 1 }}>1891</div>
              <div style={{ marginTop: 12, fontFamily: DL_MONO, fontWeight: 700, fontSize: 36, color: DL.green, opacity: ease(f, FREE - 2, FREE + 8) }}>FREE</div>
              <div style={{ marginTop: 8, fontFamily: DL_MONO, fontSize: 30, color: DL.text, opacity: ease(f, MOST - 2, MOST + 8) }}>FOR MOST FAMILIES</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 200, top: 640 }}><Source at={EIGHTY}>UK Parliament, Living Heritage: the 1880 Education Act made attendance compulsory 5–10; fees until 1891</Source></div>
        </AbsoluteFill>

        {/* cliffhanger: every child has to go — then people fight for it */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ opacity: ease(f, NOW + i * 3, NOW + i * 3 + 8), transform: `translateX(${ease(f, NOW, GO + 30, 0, 160)}px)` }}><Kid size={80} girl={i % 2 === 0} tool="book" /></div>)}
            <div style={{ marginLeft: 180, opacity: ease(f, NOW, NOW + 8) }}><SchoolHouse size={200} /></div>
          </div>
          <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: 'absolute', left: 1300, top: 280, opacity: ease(f, FIGHT - 4, FIGHT + 8), transform: `rotate(${4 * Math.sin(f / 8)}deg)` }}>
            <line x1={150} y1={120} x2={150} y2={300} stroke={INK.wood} strokeWidth={12} />
            <rect x={30} y={10} width={240} height={130} rx={10} fill={INK.paper} stroke={INK.woodDark} strokeWidth={6} />
            <text x={150} y={100} textAnchor="middle" fontFamily={DL_SERIF} fontSize={90} fill={DL.red}>?</text>
          </svg>
          <div style={{ position: 'absolute', left: 260, top: 560, display: 'flex', gap: 20 }}>
            <StampText text="FORCED INTO" at={FORCED} color={DL.muted} size={34} tilt={-3} />
          </div>
        </AbsoluteFill>

        <SchoolLadder rungs={rungs} show={ladder} />
        <DidYouKnowThat at={DID} out={OLDER}>
          <span style={{ opacity: ease(f, LANCASTER1 - 4, LANCASTER1 + 6) }}>this school’s founder, Joseph Lancaster,</span>
          <span style={{ opacity: ease(f, CLAIMED - 4, CLAIMED + 6), color: '#ff9a1f', fontStyle: 'italic' }}> claimed</span>
          <span style={{ opacity: ease(f, MASTER2 - 4, MASTER2 + 6) }}> one master could run a school of</span>
          <span style={{ opacity: ease(f, THOUSAND - 4, THOUSAND + 6), color: '#ff9a1f', fontStyle: 'italic' }}> more than a thousand children.</span>
          <div style={{ marginTop: 20, fontFamily: DL_MONO, fontSize: 24, lineHeight: 1.3, color: '#c8cdf0', opacity: ease(f, CLAIMED, CLAIMED + 10) }}>His own claim: “above one thousand children may be governed by one master only” · Lancaster</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1948" parts={[{ text: 'Now every child has to go.', at: NOW }, { text: 'But in the next century,', at: BUT }, { text: "school stops being something you're forced into.", at: SCHOOL4 }, { text: 'It turns into something people fight for.', at: TURNS }]} />
      <EpisodeHud year={1810} episode="03" />
    </AbsoluteFill>
  );
};
export default Sc1810;
