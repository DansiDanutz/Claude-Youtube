import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, Kid, Label, Source, StampText, AskMark, INK,
  CacaoBean, CacaoPod, Avocado, TurkeyHen, Cloak, CACAO,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 5/14 — ERA 1: 1500, Tenochtitlan (RESEARCH F4–F7). Header + "Tenochtitlan" on its word, ISLAND CITY OF THE
// AZTECS on "island"; canals with canoes on "Canoes"; market stalls on "market's", CHILLI / WOOD SMOKE on their words.
// DYK (F4): clauses on their words; a cacao pod + beans on "Cacao", "the same beans that make chocolate" on "chocolate".
// HOW PEOPLE PAID (F5, Tlaxcala 1545 price list, "a few decades later"): avocado = 1 bean on "avocado"/"bean", turkey
// hen = 100 on "hen"/"hundred", cotton cloaks for big deals on "cloaks". F6: a friar on "friar", a split bean on "faked",
// FORGERY stamp on "Forgery". "So what is money to you?" = "?"; SOMETHING USEFUL chip on "useful" (slot 0, docks), a cup
// on "drink". Myth (F7): goat ⇄ grain on "goats"/"grain", NO BARTER-ONLY SOCIETY FOUND on "never", tally of beans on
// "count". Cliffhanger: beans rot on "rot", the ocean on "Across", a cart under a heavy plate on "cart". VO mo04 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo1500', durationInSeconds: 61.1667, fps: 30, width: 1920, height: 1080 };
const DUR = 1835;

const C = makeCue(vo, 'mo04-1500', 0.8);
const FIFTEEN = C.at('fifteen');
const TENOCH = C.at('Tenochtitlan');
const DOCK = TENOCH + 46;
const ISLAND = C.at('island');
const AZTECS = C.at('Aztecs');
const CANOES = C.at('Canoes');
const CANALS = C.at('canals');
const MARKET = C.at("market's");
const LOUD = C.at('loud');
const CHILLI = C.at('chilli');
const SMOKE = C.at('smoke');
const DID = C.at('Did');
const HERE = C.at('here');
const MONEY1 = C.at('money', 1);
const GROWS = C.at('grows');
const TREES = C.at('trees');
const CACAO1 = C.at('Cacao', 1);
const SAME = C.at('same');
const CHOC1 = C.at('chocolate', 1);
const PRICE = C.at('price');
const PLAINLY = C.at('plainly');
const DECADES = C.at('decades');
const AVOCADO = C.at('avocado');
const BEAN = C.at('bean'); // 'one bean.'
const HEN = C.at('hen');
const HUNDRED2 = C.at('hundred', 2); // 'a hundred.' (1 = 'fifteen hundred,')
const BIGGER = C.at('Bigger');
const CLOAKS = C.at('cloaks');
const SPANISH = C.at('Spanish');
const FRIAR = C.at('friar');
const FAKED = C.at('faked');
const FORGERY = C.at('Forgery');
const CHOC2 = C.at('chocolate', 2);
const SO = C.at('So', 1);
const YOU_Q = C.at('you', 3); // 'to you?' (1 = 'You wake', 2 = 'Did you')
const USEFUL = C.at('useful');
const CHIP_DOCK = USEFUL + 80;
const DRINK = C.at('drink');
const MIGHT = C.at('might');
const INVENTED = C.at('invented');
const GOATS = C.at('goats');
const SWAPPING = C.at('swapping');
const GRAIN = C.at('grain');
const AWKWARD = C.at('awkward');
const ANTHRO = C.at('Anthropologists');
const NEVER = C.at('never');
const BARTER = C.at('barter');
const PEOPLE = C.at('People');
const COUNT = C.at('count');
const BUT = C.at('But');
const BULKY = C.at('bulky');
const ROT = C.at('rot');
const ACROSS = C.at('Across');
const OPPOSITE = C.at('opposite');
const HEAVY = C.at('heavy');
const CART = C.at('cart');

const Canals: React.FC<{ f: number }> = ({ f }) => (
  <svg width={1600} height={420} viewBox="0 0 1600 420">
    <rect x={0} y={150} width={1600} height={270} fill="#14303a" />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M0 ${200 + k * 50} q 50 -10 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0`} stroke="#2f6f8f" strokeWidth={3} fill="none" opacity={0.5} transform={`translate(${-((f * 0.8 + k * 30) % 200)} 0)`} />)}
    {/* the island city: low white buildings and a temple on the far shore */}
    <rect x={0} y={90} width={1600} height={64} fill="#2a2420" />
    {Array.from({ length: 14 }, (_, i) => <rect key={i} x={20 + i * 115} y={56 + (i % 3) * 8} width={90} height={40 - (i % 3) * 8} fill="#d8cfb8" opacity={0.75} />)}
    <path d="M700 90 L740 10 L860 10 L900 90 Z" fill="#c8b898" /><rect x={770} y={0} width={60} height={14} fill="#a04030" />
    {/* canoes, bumping along */}
    {[0, 1, 2].map((k) => {
      const x = ((f - CANOES) * (1.6 + k * 0.4) + k * 520) % 1800 - 150;
      const show = ease(f, CANOES - 2 + k * 6, CANOES + 8 + k * 6);
      return (
        <g key={k} opacity={show} transform={`translate(${x} ${230 + k * 60 + 3 * Math.sin(f / 7 + k)})`}>
          <path d="M0 20 Q90 44 180 20 L168 34 Q90 52 12 34 Z" fill="#6a4020" />
          <circle cx={70} cy={6} r={9} fill={DL.warm} /><rect x={64} y={14} width={12} height={10} fill={DL.warm} />
          <line x1={100} y1={-6} x2={130} y2={40} stroke="#8a6a40" strokeWidth={4} />
          {k === 1 && <g>{[0, 1, 2].map((j) => <circle key={j} cx={30 + j * 14} cy={16} r={6} fill={CACAO.bean} />)}</g>}
        </g>
      );
    })}
  </svg>
);

const Stall: React.FC<{ x: number; at: number; color: string; children: React.ReactNode }> = ({ x, at, color, children }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: x, top: 0, opacity: ease(f, at - 2, at + 8), transform: `translateY(${ease(f, at - 2, at + 12, 20, 0)}px)` }}>
      <svg width={220} height={180} viewBox="0 0 220 180"><path d="M10 50 L110 10 L210 50 Z" fill={color} /><line x1={30} y1={50} x2={30} y2={170} stroke="#6a4a2a" strokeWidth={6} /><line x1={190} y1={50} x2={190} y2={170} stroke="#6a4a2a" strokeWidth={6} /><rect x={20} y={120} width={180} height={18} fill="#8a6a40" /></svg>
      <div style={{ position: 'absolute', left: 40, top: 80, display: 'flex', gap: 8 }}>{children}</div>
    </div>
  );
};

const Mo1500: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const city = win(f, DOCK, DID - 2, 10, 8);
  const smoke = ease(f, SMOKE - 4, SMOKE + 16) * city;
  const prices = win(f, PRICE - 4, SO + 2, 6, 8);
  const askQ = win(f, SO - 2, USEFUL + 2, 6, 6);
  const useful = win(f, USEFUL - 2, MIGHT, 4, 10);
  const myth = win(f, MIGHT - 4, BUT, 6, 10);
  const cliff = ease(f, BUT - 2, BUT + 10); // the visuals switch on "But"; the band's first part lands on "bulky"
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, BUT - 2, BUT + 8));
  const rot = ease(f, ROT - 2, ROT + 20);
  const strain = f >= CART ? Math.sin((f - CART) / 3) * (1 - ease(f, CART, CART + 40)) : 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#1e1406" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1500" idx={1} label="TENOCHTITLAN" dockAt={DOCK} />
        <WakePlace place="Tenochtitlan" at={TENOCH} dockAt={DOCK} yearAt={FIFTEEN} />
        <div style={{ position: 'absolute', left: 160, top: 210, opacity: city }}><Label at={ISLAND} color={DL.warm} size={30}>THE ISLAND CITY<span style={{ opacity: ease(f, AZTECS - 2, AZTECS + 6) }}> OF THE AZTECS</span></Label></div>
        <div style={{ position: 'absolute', left: 160, top: 300, opacity: city * ease(f, ISLAND - 4, ISLAND + 8) }}><Canals f={f} /></div>
        <div style={{ position: 'absolute', left: 160, top: 260, display: 'flex', gap: 18, opacity: city }}>
          <Label at={CANOES} color={DL.sky} size={28} style={{ marginLeft: 560 }}>CANOES<span style={{ opacity: ease(f, CANALS - 2, CANALS + 6) }}> ON THE CANALS</span></Label>
        </div>
        {/* the market: stalls on "market's", loud, chilli and wood smoke */}
        <div style={{ position: 'absolute', left: 160, top: 720, width: 1600, height: 200, opacity: city }}>
          <Stall x={0} at={MARKET} color="#a04030"><CacaoBean size={40} /><CacaoBean size={40} rot={30} /></Stall>
          <Stall x={300} at={MARKET + 6} color="#2f6f5f"><Avocado size={40} /><Avocado size={40} /></Stall>
          <Stall x={600} at={CHILLI} color="#c0392b">{[0, 1, 2].map((k) => <svg key={k} width={22} height={50} viewBox="0 0 22 50"><path d="M11 2 C20 14 18 40 6 48 C4 30 2 14 11 2 Z" fill="#e0301e" /></svg>)}</Stall>
          <Stall x={900} at={MARKET + 12} color="#8a6a20"><Cloak size={50} /></Stall>
          <div style={{ position: 'absolute', left: 1220, top: 20 }}>
            <Label at={LOUD} color={DL.text} size={30}>THE MARKET'S LOUD</Label>
            <Label at={CHILLI} color="#ff7a5a" size={28} style={{ marginTop: 10 }}>· CHILLI</Label>
            <Label at={SMOKE} color={DL.dim} size={28} style={{ marginTop: 10 }}>· WOOD SMOKE</Label>
          </div>
        </div>
        <AbsoluteFill style={{ opacity: smoke }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: ((f * (1.2 + i * 0.4) + i * 600) % 2300) - 500, top: 640 + i * 70, width: 760, height: 110, borderRadius: '50%', background: 'radial-gradient(ellipse, #b9b1a433, transparent 70%)' }} />)}
        </AbsoluteFill>

        {/* how people paid: a price list from 1545 */}
        <AbsoluteFill style={{ opacity: prices }}>
          <div style={{ position: 'absolute', left: 160, top: 200, width: 1600 }}>
            <Label at={PRICE} color={DL.dim} size={30}>HOW PEOPLE PAID · A PRICE LIST<span style={{ opacity: ease(f, DECADES - 2, DECADES + 6) }}>, A FEW DECADES LATER</span></Label>
          </div>
          {/* the price list itself, until its first item is read */}
          <div style={{ position: 'absolute', left: 660, top: 250, opacity: ease(f, PRICE - 2, PRICE + 8) * (1 - ease(f, AVOCADO - 8, AVOCADO)), transform: `rotate(${-2 + Math.sin(f / 30)}deg)` }}>
            <svg width={600} height={400} viewBox="0 0 600 400">
              <rect x={40} y={30} width={520} height={340} fill={INK.paper} />
              <rect x={20} y={14} width={560} height={30} rx={15} fill="#c9b48a" /><rect x={20} y={356} width={560} height={30} rx={15} fill="#c9b48a" />
              <text x={300} y={92} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={30} fill={INK.woodDark}>TLAXCALA · 1545</text>
              {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} opacity={ease(f, PLAINLY + k * 3, PLAINLY + k * 3 + 6)}><line x1={90} y1={140 + k * 36} x2={360 - (k % 3) * 40} y2={140 + k * 36} stroke="#8a7a5a" strokeWidth={5} /><circle cx={470} cy={140 + k * 36} r={9} fill={CACAO.bean} /></g>)}
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', gap: 40 }}>
            {/* avocado = 1 bean */}
            <div style={{ width: 460, height: 360, boxSizing: 'border-box', padding: 26, borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${DL.green}`, opacity: ease(f, AVOCADO - 4, AVOCADO + 6) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 220 }}>
                <Avocado size={120} />
                <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.text }}>=</span>
                <div style={{ opacity: ease(f, BEAN - 2, BEAN + 6), transform: `scale(${ease(f, BEAN - 2, BEAN + 10, 1.3, 1)})` }}><CacaoBean size={110} /></div>
              </div>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.green }}>1 RIPE AVOCADO<span style={{ opacity: ease(f, BEAN - 2, BEAN + 6), color: DL.gold }}> = 1 BEAN</span></div>
            </div>
            {/* turkey hen = 100 beans */}
            <div style={{ width: 520, height: 360, boxSizing: 'border-box', padding: 26, borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${DL.gold}`, opacity: ease(f, HEN - 6, HEN + 6) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, height: 220 }}>
                <TurkeyHen size={150} />
                <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.text }}>=</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 18px)', gap: 3 }}>
                  {Array.from({ length: 100 }, (_, i) => <div key={i} style={{ width: 18, height: 13, borderRadius: '50%', background: CACAO.bean, border: `1px solid ${CACAO.beanLight}`, opacity: ease(f, HUNDRED2 - 6 + i * 0.12, HUNDRED2 + i * 0.12) }} />)}
                </div>
              </div>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.gold }}>A GOOD TURKEY HEN<span style={{ opacity: ease(f, HUNDRED2 - 2, HUNDRED2 + 6) }}> = 100 BEANS</span></div>
            </div>
            {/* big deals: cotton cloaks */}
            <div style={{ width: 500, height: 360, boxSizing: 'border-box', padding: 26, borderRadius: 18, background: '#0e0b0af0', border: `2px solid ${DL.warm}`, opacity: ease(f, BIGGER - 4, BIGGER + 6) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 220 }}>
                {[0, 1, 2].map((k) => <div key={k} style={{ opacity: ease(f, CLOAKS + k * 4 - 2, CLOAKS + k * 4 + 6), transform: `rotate(${(k - 1) * 6}deg)` }}><Cloak size={120} /></div>)}
              </div>
              <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.warm }}>BIGGER DEALS<span style={{ opacity: ease(f, CLOAKS - 2, CLOAKS + 6) }}> = COTTON CLOAKS</span></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 670 }}><Source at={PLAINLY}>Tlaxcala price list, 1545 · in Anderson, Berdan & Lockhart, Beyond the Codices (1976) · illustration</Source></div>
          {/* the faker's bean */}
          <div style={{ position: 'absolute', left: 160, top: 730, display: 'flex', alignItems: 'center', gap: 40, opacity: ease(f, SPANISH - 4, SPANISH + 6) }}>
            <div style={{ opacity: ease(f, FRIAR - 2, FRIAR + 8) }}><Kid size={110} adult color="#7a6a5a" tool="book" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label at={FRIAR} color={DL.warm} size={28}>A SPANISH FRIAR WROTE…</Label>
              <Label at={FAKED} color={DL.text} size={28}>SELLERS WHO FAKED CACAO BEANS</Label>
              <Source at={FRIAR}>Sahagún, Florentine Codex (1540s–1570s)</Source>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <CacaoBean size={110} />
              <div style={{ opacity: ease(f, FAKED - 2, FAKED + 6) }}><CacaoBean size={110} fake={ease(f, FAKED + 4, FAKED + 16)} /></div>
            </div>
            <div style={{ marginLeft: 10 }}><StampText text="FORGERY" at={FORGERY} color={DL.red} size={44} /></div>
            <Label at={CHOC2} color={DL.gold} size={30}>WITH CHOCOLATE.</Label>
          </div>
        </AbsoluteFill>

        {/* "So what is money to you?" — then: something useful, something you could even drink */}
        <AskMark at={SO} out={USEFUL + 2} left={760} top={250} pulseAt={YOU_Q} />
        <AbsoluteFill style={{ opacity: useful }}>
          <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'flex-end', gap: 60 }}>
            <div style={{ opacity: ease(f, USEFUL - 2, USEFUL + 8) }}><CacaoPod size={170} glow={0.6} /></div>
            <div style={{ opacity: ease(f, USEFUL + 4, USEFUL + 12), display: 'flex', gap: 10 }}>{[0, 1, 2, 3].map((k) => <CacaoBean key={k} size={70} rot={k * 25} />)}</div>
            <div style={{ opacity: ease(f, DRINK - 2, DRINK + 8), textAlign: 'center' }}>
              <svg width={150} height={150} viewBox="0 0 110 110" style={{ overflow: 'visible' }}>
                {[0, 1, 2].map((k) => <path key={k} d={`M${36 + k * 18} 34 q -8 -12 0 -24 q 8 -12 0 -24`} stroke="#d8c8b0" strokeWidth={4} fill="none" opacity={0.5 + 0.3 * Math.sin(f / 6 + k)} />)}
                <path d="M18 40 L92 40 L84 100 L26 100 Z" fill="#8a5a3a" stroke="#c89a6a" strokeWidth={4} /><ellipse cx={55} cy={42} rx={36} ry={8} fill="#4a2a18" />
              </svg>
              <Label at={DRINK} color={DL.gold} size={28}>YOU COULD EVEN DRINK IT</Label>
            </div>
          </div>
        </AbsoluteFill>
        <MoneyChip text="SOMETHING USEFUL" at={USEFUL} dockAt={CHIP_DOCK} slot={0} left={260} top={720} />

        {/* the myth: money invented to replace barter */}
        <AbsoluteFill style={{ opacity: myth }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={MIGHT} color={DL.red} size={30}>THE MYTH<span style={{ opacity: ease(f, INVENTED - 2, INVENTED + 6) }}> · MONEY WAS INVENTED BECAUSE…</span></Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ opacity: ease(f, SWAPPING - 2, SWAPPING + 8), textAlign: 'center' }}>
              <svg width={180} height={140} viewBox="0 0 180 140"><ellipse cx={86} cy={70} rx={56} ry={30} fill="#d8d0c0" /><circle cx={150} cy={50} r={20} fill="#d8d0c0" /><path d="M146 30 l-8 -18 M158 30 l8 -18" stroke="#a89880" strokeWidth={4} />{[50, 70, 104, 124].map((x) => <rect key={x} x={x} y={92} width={8} height={40} fill="#c8c0b0" />)}<path d="M150 70 l4 16" stroke="#a89880" strokeWidth={4} /></svg>
              <Label at={GOATS} color={DL.text} size={26}>GOATS</Label>
            </div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 90, color: DL.dim, opacity: ease(f, GRAIN - 4, GRAIN + 4) }}>⇄</span>
            <div style={{ opacity: ease(f, GRAIN - 2, GRAIN + 8), textAlign: 'center' }}>
              <svg width={140} height={140} viewBox="0 0 140 140"><path d="M30 130 L110 130 L100 60 L40 60 Z" fill="#c8a860" /><ellipse cx={70} cy={60} rx={32} ry={10} fill="#e0c880" />{[0, 1, 2, 3, 4].map((k) => <line key={k} x1={50 + k * 10} y1={60} x2={46 + k * 12} y2={24} stroke="#e0c070" strokeWidth={4} />)}</svg>
              <Label at={GRAIN} color={DL.text} size={26}>GRAIN</Label>
            </div>
            <div style={{ opacity: ease(f, AWKWARD - 2, AWKWARD + 8), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 56, color: DL.dim }}>…got awkward?</div>
            <div style={{ marginLeft: 40, fontFamily: DL_SERIF, fontSize: 120, color: DL.red, opacity: ease(f, INVENTED - 2, INVENTED + 8) * (1 - ease(f, SWAPPING - 4, SWAPPING + 4)), position: 'absolute', left: 0, top: -10 }}>?</div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 560, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
            <Label at={ANTHRO} color={DL.warm} size={30}>ANTHROPOLOGISTS SAY:</Label>
            <StampText text="NO BARTER-ONLY SOCIETY EVER FOUND" at={NEVER} color={DL.gold} size={38} tilt={-2} />
            <Source at={BARTER}>Humphrey, "Barter and Economic Disintegration" (1985) · Graeber, Debt (2011)</Source>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 800, display: 'flex', alignItems: 'center', gap: 22, opacity: ease(f, PEOPLE - 2, PEOPLE + 8) }}>
            {[0, 1, 2, 3, 4, 5].map((k) => <div key={k} style={{ opacity: ease(f, COUNT + k * 3 - 2, COUNT + k * 3 + 6) }}><CacaoBean size={60} rot={k * 20} /></div>)}
            <Label at={COUNT} color={DL.gold} size={30}>SOMETHING TO COUNT WITH</Label>
          </div>
        </AbsoluteFill>

        {/* cliffhanger: beans rot · across the ocean · so heavy you need a cart */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 220, top: 260, display: 'flex', flexWrap: 'wrap', width: 360, gap: 6, opacity: ease(f, BULKY - 4, BULKY + 6) }}>
            {Array.from({ length: 24 }, (_, i) => <div key={i} style={{ filter: `grayscale(${rot}) brightness(${1 - 0.5 * rot})`, transform: `scale(${1 - 0.15 * rot * ((i % 3) / 2)})` }}><CacaoBean size={52} rot={(i * 37) % 90} /></div>)}
            <Label at={ROT} color="#8a9a5a" size={28} style={{ marginTop: 14 }}>BULKY · AND THEY ROT</Label>
          </div>
          <svg width={900} height={300} viewBox="0 0 900 300" style={{ position: 'absolute', left: 820, top: 300, opacity: ease(f, ACROSS - 4, ACROSS + 6) }}>
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M0 ${190 + k * 22} q 56 -16 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0 t 112 0`} stroke="#2f6f9f" strokeWidth={4} fill="none" opacity={0.6} transform={`translate(${-((f * 1.5 + k * 40) % 224)} 0)`} />)}
            <text x={20} y={60} fontFamily={DL_MONO} fontSize={26} fill={DL.dim} opacity={ease(f, OPPOSITE - 2, OPPOSITE + 8)}>ACROSS THE OCEAN: THE OPPOSITE PROBLEM →</text>
            {/* a cart under one huge copper slab, its wheels straining on "cart" */}
            <g opacity={ease(f, HEAVY - 4, HEAVY + 6)} transform={`translate(560 ${80 + 3 * strain})`}>
              <rect x={20} y={0} width={220} height={70} rx={4} fill="#b8693a" stroke="#6e3a1a" strokeWidth={5} />
              <rect x={0} y={70} width={260} height={18} fill={INK.wood} />
              {[40, 220].map((x) => <circle key={x} cx={x} cy={104} r={22} fill="none" stroke={INK.woodDark} strokeWidth={8} />)}
              <text x={130} y={46} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={28} fill="#6e3a1a" opacity={ease(f, CART - 2, CART + 6)}>HEAVY</text>
            </g>
          </svg>
        </AbsoluteFill>

        <MoneyLadder rungs={[{ year: '1500', label: 'SOMETHING USEFUL', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={PRICE}>
          <span style={{ opacity: ease(f, HERE - 4, HERE + 6) }}>here,</span>
          <span style={{ opacity: ease(f, MONEY1 - 4, MONEY1 + 6) }}> money</span>
          <span style={{ opacity: ease(f, GROWS - 4, GROWS + 6), color: '#ff9a1f', fontStyle: 'italic' }}> grows</span>
          <span style={{ opacity: ease(f, TREES - 4, TREES + 6), color: '#ff9a1f', fontStyle: 'italic' }}> on trees.</span>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 28, opacity: ease(f, CACAO1 - 4, CACAO1 + 6) }}>
            <CacaoPod size={90} />
            <div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map((k) => <CacaoBean key={k} size={56} rot={k * 30} />)}</div>
            <span style={{ fontFamily: DL_SERIF, fontSize: 52, color: '#ffd23f' }}>Cacao beans<span style={{ opacity: ease(f, SAME - 4, SAME + 6), color: '#ffffff' }}> — the same beans</span><span style={{ opacity: ease(f, CHOC1 - 4, CHOC1 + 6), color: '#ffffff' }}> that make chocolate.</span></span>
          </div>
          <div style={{ marginTop: 22, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, CACAO1, CACAO1 + 10) }}>Cornell University Library, "When money grew on trees" · small change; cotton cloaks for big buys</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1661" parts={[{ text: 'Beans are bulky,', at: BULKY }, { text: 'and they rot.', at: ROT }, { text: 'Across the ocean: the opposite problem.', at: OPPOSITE }, { text: 'You need a cart.', at: CART }]} />
      <EpisodeHud year={1500} episode="04" />
    </AbsoluteFill>
  );
};
export default Mo1500;
