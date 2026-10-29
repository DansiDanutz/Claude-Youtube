import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, SiteBg } from '../../lib/danslab';
import { makeCue, ease, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, SunCliffhanger, LightChip, LightLadder, lightRungs, LIGHT_ARC, Label, Source, AskMark, OnWord, Kid,
  PriceStrip, PRICE_PAST, priceUpTo, CountUp, hold, pane, cardOut, LightProp, PropTag, FLAME,
} from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 7/14 — ERA 3: 1859, Titusville, Pennsylvania (RESEARCH L4, L8, L9, L3). Header + "Titusville, Pennsylvania"
// on its word; a muddy field, AUGUST · MUD AND TAR · MEN CHEERING (figures bob from "cheering") · A WOODEN DERRICK on
// their words (no oil until Brian says "oil"). DYK (L4): a historian later wrote that oil "gave kerosene to the world, and
// life to the few remaining whales" — credit Stotz 1938, quoted by Nordhaus 1997 (never Nordhaus as author); a whale on
// "whales?", a whaling ship on "sailed", FOR YEARS · TO FILL THEIR LAMPS. YOUR EVENING: Abraham Gesner (L8), A CANADIAN
// DOCTOR, A LAMP FUEL (a drop) → kerosene; Edwin Drake (L9): the derrick, STRUCK OIL (oil rises), 69 FT DOWN (a drill line
// counts down), JUST BEFORE HIS MONEY RAN OUT (coins drain); KEROSENE FLOODS THE SHOPS (barrels, a shop front). ON YOUR
// TABLE: a kerosene lamp (glass chimney, steady flame), THE EVENING GETS HOURS BACK (a bar fills), YOU READ · YOU SEW ·
// THE CHILDREN DO THEIR LESSONS. THE PRICE (L3): America, 1870 ≈ 20 min of work on "twenty" + the strip pill. "So what is
// light now?" = "?"; A LIQUID chip on "liquid." (slot 2, docks); a drop → something you buy → a can on "can.". Cliffhanger:
// + 23 YEARS, someone takes the flame away (the lamp goes out on "away"); NEXT ▸ 1882. VO lt06 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Lt1859', durationInSeconds: 64.6333, fps: 30, width: 1920, height: 1080 };
const DUR = 1939;

const C = makeCue(vo, 'lt06-1859', 0.8);
const EIGHTEEN1 = C.at('eighteen', 1);
const TITUSVILLE = C.at('Titusville,');
const PENNSYLVANIA = C.at('Pennsylvania.');
const DOCK = TITUSVILLE + 59; // the place line needs 1.5 s
const AUGUST = C.at('August.');
const MUD = C.at('mud');
const TAR = C.at('tar,');
const MEN = C.at('men');
const CHEERING = C.at('cheering');
const DERRICK = C.at('derrick.');
const DID = C.at('Did');
const HISTORIAN = C.at('historian');
const OIL1 = C.at('oil', 1);
const GAVE = C.at('gave');
const KEROSENE1 = C.at('kerosene', 1);
const AND3 = C.at('and', 3); // 'and life to the few' (1 = 'mud and tar', 2 = 'and men')
const WHALES = C.at('whales?');
const BEFORE1 = C.at('Before', 1); // 'Before this' (2 = 'just before')
const WHALERS = C.at('whalers');
const SAILED = C.at('sailed');
const YEARS1 = C.at('years', 1); // 'sailed for years' (2 = 'Twenty three years later')
const LAMPS = C.at('lamps.');
const HERES = C.at("Here's");
const CANADIAN = C.at('Canadian');
const ABRAHAM = C.at('Abraham');
const SHOWN = C.at('shown');
const FUEL = C.at('fuel');
const KEROSENE2 = C.at('kerosene.', 2);
const EDWIN = C.at('Edwin');
const STRUCK = C.at('struck');
const OIL2 = C.at('oil,', 2);
const SIXTY = C.at('sixty');
const NINE2 = C.at('nine', 2); // 'sixty nine feet' (1 = 'eighteen fifty nine')
const FEET = C.at('feet');
const DOWN = C.at('down,');
const JUST = C.at('just');
const MONEY = C.at('money');
const OUT = C.at('out.');
const KEROSENE3 = C.at('Kerosene', 3);
const FLOODS = C.at('floods');
const SHOPS = C.at('shops.');
const ON = C.at('On');
const LAMP2 = C.at('lamp', 2); // 'a lamp with a glass chimney' (1 = 'a lamp fuel')
const GLASS = C.at('glass');
const STEADY = C.at('steady');
const FLAME1 = C.at('flame,', 1);
const EVENING2 = C.at('evening', 2); // 'the evening gets hours back' (1 = "Here's your evening.")
const HOURS = C.at('hours');
const BACK = C.at('back.');
const READ = C.at('read.');
const SEW = C.at('sew.');
const CHILDREN = C.at('children');
const LESSONS = C.at('lessons.');
const WHAT1 = C.at('What', 1);
const NOW2 = C.at('now?', 2); // 'cost you now?'
const SEVENTY = C.at('seventy,');
const AMERICA = C.at('America,');
const ABOUT = C.at('about');
const TWENTY1 = C.at('twenty', 1); // 'about twenty minutes' (2 = 'Twenty three years later')
const MINUTES = C.at('minutes');
const SO = C.at('So');
const NOW3 = C.at('now?', 3); // 'what is light now?' (1 = 'Now Edwin', 2 = 'cost you now?')
const LIQUID = C.at('liquid.');
const CHIP_DOCK = LIQUID + 80;
const SOMETHING = C.at('Something');
const BUY = C.at('buy');
const CAN = C.at('can.');
const TWENTY2 = C.at('Twenty', 2);
const SOMEONE = C.at('someone');
const TAKES = C.at('takes');
const AWAY = C.at('away');
const COMPLETELY = C.at('completely.');
// each panel holds ≥ 1.5 s after its last reveal (kit hold / cardOut)
const CARD_END = cardOut(LAMPS, HERES);
const EVE_END = hold(SHOPS, ON);
const TABLE_END = hold(LESSONS, WHAT1);
const PRICE_END = hold(MINUTES, SO);
const LIQUID_END = hold(CAN, TWENTY2);

// ── shot-only drawings ─────────────────────────────────────────────────────────────────────────────
// the Titusville field: mud ground, tar pools that shimmer from "tar"
const Field: React.FC<{ f: number; tar: number }> = ({ f, tar }) => (
  <svg width={1920} height={260} viewBox="0 0 1920 260">
    <rect x={0} y={40} width={1920} height={220} fill="#3a2a1a" />
    <path d="M0 40 Q480 20 960 44 T1920 36 L1920 60 L0 60 Z" fill="#4a3622" />
    {[[260, 120, 120], [700, 170, 160], [1120, 110, 110], [1560, 190, 150]].map(([x, y, w], i) => (
      <ellipse key={i} cx={x} cy={y} rx={w} ry={18} fill="#0c0906" opacity={tar * (0.75 + 0.2 * Math.sin(f / 9 + i))} stroke="#5a4a3a" strokeWidth={2} />
    ))}
  </svg>
);
// a cheering man: bobs from `from`
const Cheer: React.FC<{ f: number; from: number; i: number }> = ({ f, from, i }) => {
  const bob = f > from ? Math.abs(Math.sin((f - from) / 5 + i * 0.9)) * 14 : 0;
  return <div style={{ transform: `translateY(${-bob}px)` }}><Kid size={90} adult color={['#8a6a48', '#6a5a48', '#9a7a52'][i % 3]} /></div>;
};
// a whaling ship rocking on a swell
const Ship: React.FC<{ f: number; size?: number }> = ({ f, size = 130 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${3 * Math.sin(f / 14)}deg)` }}>
    <path d="M12 66 L88 66 L78 82 L22 82 Z" fill="#5a3e24" stroke="#3a2614" strokeWidth={3} />
    <line x1={50} y1={66} x2={50} y2={10} stroke="#3a2614" strokeWidth={4} />
    <path d="M52 14 L80 40 L52 40 Z M48 18 L22 46 L48 46 Z" fill="#e8dcc0" />
    <path d={`M0 ${88 + 2 * Math.sin(f / 8)} Q25 82 50 88 T100 88`} stroke="#4a8ab8" strokeWidth={4} fill="none" />
  </svg>
);
// a drop of lamp fuel, wobbling
const Drop: React.FC<{ f: number; size?: number }> = ({ f, size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d={`M50 8 Q${78 + 3 * Math.sin(f / 6)} 54 74 70 Q66 92 50 92 Q34 92 26 70 Q${22 - 3 * Math.sin(f / 6)} 54 50 8 Z`} fill="#e8c860" stroke="#a8862a" strokeWidth={3} /><ellipse cx={40} cy={62} rx={6} ry={10} fill="#fff6d0" opacity={0.6} /></svg>
);
// a kerosene barrel
const Barrel: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><path d="M24 8 Q14 50 24 92 L76 92 Q86 50 76 8 Z" fill="#7a5230" stroke="#4a3018" strokeWidth={3} />{[22, 50, 78].map((y) => <line key={y} x1={18} y1={y} x2={82} y2={y} stroke="#3a3a40" strokeWidth={5} />)}</svg>
);
// a shop front with a striped awning
const ShopFront: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={8} y={30} width={84} height={66} fill="#3a2c20" stroke="#6a5a48" strokeWidth={3} />
    {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={4 + k * 15.3} y={12} width={15.3} height={20} fill={k % 2 ? '#efe2c4' : '#b8322a'} />)}
    <rect x={18} y={44} width={30} height={30} fill="#f0c860" opacity={0.35} /><rect x={58} y={44} width={24} height={52} fill="#1a120a" />
  </svg>
);
// coins: `left` 0–1 of the stack still there (Drake's money running out)
const Coins: React.FC<{ left: number }> = ({ left }) => (
  <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 2 }}>
    {Array.from({ length: 5 }, (_, k) => <div key={k} style={{ width: 70, height: 14, borderRadius: 7, background: DL.gold, border: '2px solid #8a6a20', opacity: left * 5 > k ? 1 : 0.08 }} />)}
  </div>
);
// the drill line under the derrick: `depth` 0–1
const DrillLine: React.FC<{ depth: number }> = ({ depth }) => (
  <svg width={60} height={260} viewBox="0 0 60 260">
    <rect x={10} y={0} width={40} height={260} fill="#2a1e12" />
    <line x1={30} y1={0} x2={30} y2={250 * depth} stroke="#9aa0a8" strokeWidth={6} />
    <circle cx={30} cy={250 * depth} r={8} fill="#1a1a1a" stroke="#9aa0a8" strokeWidth={2} />
  </svg>
);
// the farmhouse table under the lamp
const Table: React.FC<{ glow: number }> = ({ glow }) => (
  <svg width={1600} height={260} viewBox="0 0 1600 260">
    <ellipse cx={360} cy={20} rx={420 * (0.5 + 0.5 * glow)} ry={50} fill={FLAME} opacity={0.12 * glow} />
    <rect x={0} y={20} width={1600} height={30} rx={6} fill="#6a4628" stroke="#3a2614" strokeWidth={3} />
    <rect x={60} y={50} width={30} height={200} fill="#4a3018" /><rect x={1510} y={50} width={30} height={200} fill="#4a3018" />
  </svg>
);
// the evening after dark: a bar that fills with lamplight from `from`
const EveningBar: React.FC<{ fill: number }> = ({ fill }) => (
  <div style={{ width: 760, height: 56, borderRadius: 12, border: `2px solid ${DL.border}`, background: '#0b0a14', overflow: 'hidden', position: 'relative' }}>
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 70, background: '#6a5a40' }} />
    <div style={{ position: 'absolute', left: 70, top: 0, bottom: 0, width: 690 * fill, background: `linear-gradient(90deg, ${FLAME}, ${DL.gold})`, boxShadow: `0 0 24px ${FLAME}` }} />
  </div>
);
// a needle and thread
const Needle: React.FC<{ size?: number }> = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100"><line x1={20} y1={80} x2={80} y2={20} stroke="#c8ccd4" strokeWidth={5} strokeLinecap="round" /><ellipse cx={76} cy={24} rx={4} ry={7} fill="none" stroke="#1a1a1a" strokeWidth={2} transform="rotate(45 76 24)" /><path d="M76 24 Q96 50 60 64 Q30 76 40 94" stroke={DL.red} strokeWidth={3} fill="none" /></svg>
);
// a wisp of smoke after the flame goes out
const Smoke: React.FC<{ f: number; on: number }> = ({ f, on }) => (
  <svg width={80} height={120} viewBox="0 0 80 120">{[0, 1].map((k) => <path key={k} d={`M${36 + k * 10} ${110 - ((f * 0.6 + k * 20) % 40)} q10 -14 0 -28 q-10 -14 0 -28`} stroke="#8a8a8a" strokeWidth={3} fill="none" opacity={0.55 * on} />)}</svg>
);

const Lt1859: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const field = Math.max(0.35 * ease(f, 0, 12), ease(f, MUD - 2, MUD + 4)) * (1 - ease(f, DID - 10, DID - 2));
  const evening = pane(f, CARD_END, EVE_END);
  const table = pane(f, EVE_END, TABLE_END);
  const price = pane(f, TABLE_END, PRICE_END);
  const liquid = pane(f, LIQUID - 2, LIQUID_END);
  const cliff = ease(f, LIQUID_END - 2, LIQUID_END + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12);
  const strip = (1 - ease(f, TWENTY2 - 6, TWENTY2 + 2)) * ease(f, DOCK - 2, DOCK + 4);
  const tableLamp = 0.3 + 0.7 * ease(f, STEADY - 2, FLAME1 + 6);
  const lampOut = 1 - ease(f, AWAY - 2, AWAY + 16);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1a120a" />
      <Vignette />
      <EraExit dur={DUR}>
        {/* Titusville in August: mud, tar, men cheering at a wooden derrick (behind the header) */}
        <AbsoluteFill style={{ opacity: field }}>
          <div style={{ position: 'absolute', left: 0, top: 700 }}><Field f={f} tar={ease(f, TAR - 2, TAR + 10)} /></div>
          <div style={{ position: 'absolute', left: 1300, top: 330, opacity: ease(f, DERRICK - 2, DERRICK + 6), transform: `scale(${ease(f, DERRICK - 2, DERRICK + 10, 1.15, 1)})` }}><LightProp kind="derrick" size={420} f={f} level={0} /></div>
          <div style={{ position: 'absolute', left: 560, top: 600, display: 'flex', gap: 22, opacity: ease(f, MEN - 2, MEN + 4) }}>
            {Array.from({ length: 6 }, (_, i) => <Cheer key={i} f={f} from={CHEERING} i={i} />)}
          </div>
          <div style={{ position: 'absolute', left: 160, top: 230 }}>
            <Label at={AUGUST} color={DL.warm} size={32}>AUGUST<OnWord at={MUD}> · MUD</OnWord><OnWord at={TAR}> AND TAR</OnWord><OnWord at={MEN}> · MEN CHEERING</OnWord><OnWord at={DERRICK}> · A WOODEN DERRICK</OnWord></Label>
          </div>
        </AbsoluteFill>

        {/* the August sun rises over the field on "Pennsylvania." (a beat before the header docks) */}
        <div style={{ position: 'absolute', left: 1500, top: 250, width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle, #fff2c0, ${FLAME} 60%, transparent 72%)`, opacity: ease(f, PENNSYLVANIA - 2, PENNSYLVANIA + 10) * (1 - ease(f, DID - 10, DID - 2)) * (0.9 + 0.1 * Math.sin(f / 9)), transform: `translateY(${ease(f, PENNSYLVANIA - 2, PENNSYLVANIA + 24, 60, 0)}px)` }} />
        <EraHeader year="1859" idx={3} label="PENNSYLVANIA" dockAt={DOCK} />
        <WakePlace place="Titusville, Pennsylvania" at={TITUSVILLE} dockAt={DOCK} yearAt={EIGHTEEN1} />

        {/* YOUR EVENING: Gesner's kerosene, Drake's well, kerosene in the shops */}
        <AbsoluteFill style={{ opacity: evening }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={CARD_END} color={DL.gold} size={34}>YOUR EVENING</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, opacity: ease(f, CANADIAN - 2, CANADIAN + 4) }}><Kid size={110} adult color={DL.sky} tool="book" /></div>
          <div style={{ position: 'absolute', left: 310, top: 290, width: 600, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label at={CANADIAN} color={DL.dim} size={28}>A CANADIAN DOCTOR</Label>
            <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.gold, opacity: ease(f, ABRAHAM - 2, ABRAHAM + 4) }}>Abraham Gesner</div>
            <Label at={SHOWN} color={DL.text} size={26}>HAS SHOWN HOW TO MAKE<OnWord at={FUEL}> A LAMP FUEL</OnWord></Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ opacity: ease(f, FUEL - 2, FUEL + 4) }}><Drop f={f} size={80} /></div>
              <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.warm, opacity: ease(f, KEROSENE2 - 2, KEROSENE2 + 4) }}>→ kerosene</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 990, top: 290, width: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: DL_SERIF, fontSize: 56, color: DL.gold, opacity: ease(f, EDWIN - 2, EDWIN + 4) }}>Edwin Drake</div>
            <Label at={STRUCK} color={DL.text} size={30}>STRUCK<OnWord at={OIL2}> OIL</OnWord></Label>
            <span style={{ fontFamily: DL_SERIF, fontSize: 84, lineHeight: 1, color: DL.warm, opacity: ease(f, SIXTY - 2, SIXTY + 4) }}><CountUp to={69} a={SIXTY} b={NINE2 + 4} /><OnWord at={FEET}> ft</OnWord><OnWord at={DOWN}> down</OnWord></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Label at={JUST} color={DL.dim} size={24}>…JUST BEFORE</Label>
                <Label at={MONEY} color={DL.red} size={24}>HIS MONEY<OnWord at={OUT}> RAN OUT</OnWord></Label>
              </div>
              <div style={{ opacity: ease(f, MONEY - 2, MONEY + 4) }}><Coins left={1 - ease(f, MONEY, OUT + 4)} /></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 1500, top: 250, opacity: ease(f, STRUCK - 2, STRUCK + 4) }}><LightProp kind="derrick" size={240} f={f} level={ease(f, OIL2 - 2, OIL2 + 8)} /></div>
          <div style={{ position: 'absolute', left: 1590, top: 494, opacity: ease(f, SIXTY - 2, SIXTY + 4) }}><DrillLine depth={ease(f, SIXTY, DOWN + 4)} /></div>
          <div style={{ position: 'absolute', left: 160, top: 630 }}><Label at={KEROSENE3} color={DL.gold} size={32}>KEROSENE<OnWord at={FLOODS}> FLOODS</OnWord><OnWord at={SHOPS}> THE SHOPS</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 690, display: 'flex', alignItems: 'flex-end', gap: 26 }}>
            {[KEROSENE3, FLOODS, FLOODS + 12].map((t, k) => <div key={k} style={{ opacity: ease(f, t - 2, t + 4), transform: `translateY(${ease(f, t - 2, t + 8, 18, 0)}px)` }}><Barrel size={110} /></div>)}
            <div style={{ opacity: ease(f, SHOPS - 2, SHOPS + 4) }}><ShopFront size={160} /></div>
          </div>
          <div style={{ position: 'absolute', left: 900, top: 860, width: 860 }}><Source at={OUT}>Gesner's kerosene · Drake's well, Titusville, 27 Aug 1859, 69 ft · AOGHS; American Heritage</Source></div>
        </AbsoluteFill>

        {/* ON YOUR TABLE: a kerosene lamp, and the evening gets hours back */}
        <AbsoluteFill style={{ opacity: table }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={EVE_END} color={DL.gold} size={34}>ON YOUR TABLE<OnWord at={LAMP2}> · A LAMP</OnWord><OnWord at={GLASS}> · A GLASS CHIMNEY</OnWord><OnWord at={STEADY}> · A STEADY FLAME</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 640 }}><Table glow={tableLamp} /></div>
          <div style={{ position: 'absolute', left: 260, top: 330, opacity: ease(f, LAMP2 - 2, LAMP2 + 4) }}><LightProp kind="kerosene" size={320} f={f} lit={tableLamp} /></div>
          <div style={{ position: 'absolute', left: 800, top: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Label at={EVENING2} color={DL.text} size={30}>THE EVENING GETS<OnWord at={HOURS}> HOURS</OnWord><OnWord at={BACK}> BACK</OnWord></Label>
            <div style={{ opacity: ease(f, EVENING2 - 2, EVENING2 + 4) }}><EveningBar fill={ease(f, HOURS - 2, BACK + 8)} /></div>
          </div>
          <div style={{ position: 'absolute', left: 800, top: 440, display: 'flex', alignItems: 'flex-end', gap: 60 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, READ - 2, READ + 4) }}>
              <Kid size={90} adult color={DL.warm} tool="book" glow={0.5} />
              <Label at={READ} color={DL.text} size={24}>YOU READ</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, SEW - 2, SEW + 4) }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}><Kid size={90} adult girl color={DL.warm} glow={0.5} /><Needle size={60} /></div>
              <Label at={SEW} color={DL.text} size={24}>YOU SEW</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: ease(f, CHILDREN - 2, CHILDREN + 4) }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}><Kid size={80} color={DL.sky} tool="book" glow={0.5} /><Kid size={80} girl color={DL.sky} tool="book" glow={0.5} /></div>
              <Label at={CHILDREN} color={DL.text} size={24}>THE CHILDREN<OnWord at={LESSONS}> · LESSONS</OnWord></Label>
            </div>
          </div>
        </AbsoluteFill>

        {/* THE PRICE of one hour of light, in work */}
        <AbsoluteFill style={{ opacity: price }}>
          <div style={{ position: 'absolute', left: 160, top: 220 }}><Label at={TABLE_END} color={DL.gold} size={34}>ONE HOUR OF LIGHT<OnWord at={NOW2}> · WHAT DOES IT COST?</OnWord><OnWord at={SEVENTY}> · 1870</OnWord><OnWord at={AMERICA}> · AMERICA</OnWord></Label></div>
          <div style={{ position: 'absolute', left: 1000, top: 300, opacity: ease(f, TABLE_END - 2, TABLE_END + 4) }}><LightProp kind="kerosene" size={240} f={f} /></div>
          <div style={{ position: 'absolute', left: 160, top: 320, display: 'flex', flexDirection: 'column', gap: 10, opacity: ease(f, ABOUT - 2, ABOUT + 4) }}>
            <span style={{ fontFamily: DL_SERIF, fontSize: 150, lineHeight: 1, color: DL.gold }}><CountUp to={20} a={ABOUT} b={TWENTY1 + 4} prefix="≈ " /><OnWord at={MINUTES}> min</OnWord></span>
            <Label at={MINUTES} color={DL.text} size={32}>OF WORK</Label>
            <Source at={TWENTY1}>Nordhaus 1997, table 1.4 · work hours per 1,000 lumen-hours</Source>
          </div>
        </AbsoluteFill>

        {/* "So what is light now?" — a liquid: something you buy in a can */}
        <AskMark at={PRICE_END} out={LIQUID + 2} left={760} top={250} pulseAt={NOW3} />
        <AbsoluteFill style={{ opacity: liquid }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'center', gap: 40 }}>
            <Drop f={f} size={150} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: ease(f, SOMETHING - 2, SOMETHING + 4) }}>
              <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 60, color: DL.text }}>something<OnWord at={BUY}> you buy</OnWord></span>
            </div>
            <PropTag kind="can" at={CAN} size={170} name="IN A CAN" color={DL.gold} />
          </div>
        </AbsoluteFill>
        <LightChip text={LIGHT_ARC[2].chip} at={LIQUID} dockAt={CHIP_DOCK} slot={2} left={260} top={720} />

        {/* cliffhanger: twenty three years later, someone takes the flame away */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 160, top: 220, fontFamily: DL_SERIF, fontSize: 84, color: DL.gold }}>+ 23 years</div>
          <div style={{ position: 'absolute', left: 200, top: 360 }}><LightProp kind="kerosene" size={240} f={f} lit={lampOut} /></div>
          <div style={{ position: 'absolute', left: 280, top: 300 }}><Smoke f={f} on={ease(f, AWAY + 6, AWAY + 18)} /></div>
          <div style={{ position: 'absolute', left: 560, top: 370, display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, SOMEONE - 2, SOMEONE + 4) }}>
            <Kid size={110} adult color="#4a4a58" />
            <span style={{ fontFamily: DL_SERIF, fontSize: 120, color: DL.gold }}>?</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 660 }}><Label at={TAKES} color={DL.text} size={32}>TAKES THE FLAME<OnWord at={AWAY}> AWAY</OnWord><OnWord at={COMPLETELY}> · COMPLETELY</OnWord></Label></div>
        </AbsoluteFill>

        <PriceStrip items={[...priceUpTo(2), { ...PRICE_PAST[2], at: TWENTY1 }]} show={strip} />
        <LightLadder rungs={[...lightRungs(2), { year: '1859', label: LIGHT_ARC[2].dock, at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={CARD_END}>
          <OnWord at={HISTORIAN}>a historian later wrote that </OnWord><span style={{ opacity: ease(f, OIL1 - 2, OIL1 + 4), color: '#ffd23f' }}>oil </span>
          <span style={{ opacity: ease(f, GAVE - 2, GAVE + 4), fontStyle: 'italic' }}>“gave </span><span style={{ opacity: ease(f, KEROSENE1 - 2, KEROSENE1 + 4), fontStyle: 'italic', color: '#ff9a1f' }}>kerosene to the world, </span>
          <span style={{ opacity: ease(f, AND3 - 2, AND3 + 4), fontStyle: 'italic' }}>and life to the few remaining </span><span style={{ opacity: ease(f, WHALES - 2, WHALES + 4), fontStyle: 'italic', color: '#5ad0e8' }}>whales”?</span>
          <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, GAVE - 2, GAVE + 4) }}>Stotz 1938, quoted by Nordhaus 1997</div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ opacity: ease(f, WHALES - 2, WHALES + 4) }}><LightProp kind="whale" size={120} f={f} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: '#ffffff', opacity: ease(f, BEFORE1 - 2, BEFORE1 + 4) }}>BEFORE THIS:</span>
            <div style={{ opacity: ease(f, SAILED - 2, SAILED + 4) }}><Ship f={f} size={110} /></div>
            <span style={{ fontFamily: DL_MONO, fontSize: 30, color: '#ffd23f', opacity: ease(f, WHALERS - 2, WHALERS + 4) }}>WHALERS SAIL<OnWord at={YEARS1}> FOR YEARS</OnWord><OnWord at={LAMPS}> → LAMPS</OnWord></span>
          </div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1882" parts={[{ text: 'Twenty three years later,', at: TWENTY2 }, { text: 'someone takes the flame away completely.', at: SOMEONE }]} />
      <EpisodeHud year={1859} episode="07" />
    </AbsoluteFill>
  );
};
export default Lt1859;
