import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { DYT } from '../../lib/dytbrand';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, DayClock } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, moneyRungs, Kid, Label, Source, AskMark, BigWord, PeopleRow,
  Banknote, Sovereign, Phone, TextBubble, Digits,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 10/14 — ERA 6: today, Nairobi (RESEARCH F22–F24). Header TODAY + "Nairobi" on its word; matatus on "Matatus",
// the phone buzzes on "buzzes"; YOUR SISTER SENT YOU MONEY on "sent", a line from a far village on "upcountry", ⏱ SECONDS
// on "seconds". DYK (F23, FinAccess 2024): clauses on their words; ten figures, eight light on "eight", 82.3 % (2024);
// 2009 → 27.9 %, three light on "three". How people live (F22): M-PESA · 2007 on "M-Pesa"; cash → shop → digits on
// "cash"/"shopkeeper"/"numbers"; a Day Clock with SCHOOL FEES and TAXI RIDE, BY TEXT, lit on "School"/"taxi" (illustration).
// F24 (ECB SPACE 2024, euro area, share of shop payments by number): 79 % (2016) on "sixteen", 52 % (2024) on "four"/
// "half". "So what is money to you?" = "?"; NUMBERS ON A SCREEN chip on "screen" (slot 5, docks); a hand ✗ on "touch".
// Cliffhanger: note ✗ on "paper", coin ✗ on "gold", MONEY = ? on "actually". No EraExit (the answer follows). VO mo09 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'MoToday', durationInSeconds: 55.7333, fps: 30, width: 1920, height: 1080 };
const DUR = 1672;

const C = makeCue(vo, 'mo09-today', 0.8);
const TODAY = C.at('today');
const NAIROBI = C.at('Nairobi');
const DOCK = NAIROBI + 40;
const MATATUS = C.at('Matatus');
const HONK = C.at('honk');
const BUZZES = C.at('buzzes');
const SISTER = C.at('sister');
const SENT = C.at('sent');
const VILLAGE = C.at('village');
const UPCOUNTRY = C.at('upcountry');
const SECONDS = C.at('seconds');
const DID = C.at('Did');
const EIGHT1 = C.at('eight', 1);
const ADULTS = C.at('adults');
const KENYA1 = C.at('Kenya', 1);
const MOBILE = C.at('mobile');
const TWO1 = C.at('two', 1);
const NINE = C.at('nine');
const UNDER = C.at('under');
const THREE = C.at('three');
const MPESA = C.at('M-Pesa');
const SEVEN = C.at('seven');
const CASH1 = C.at('cash', 1);
const SHOPKEEPER = C.at('shopkeeper');
const NUMBERS1 = C.at('numbers', 1);
const SCHOOL = C.at('School');
const TAXI = C.at('taxi');
const TEXT = C.at('text');
const JUST = C.at('just', 2); // 'isn't just Kenya' (1 = 'Your sister just sent')
const ACROSS = C.at('Across');
const CASH2 = C.at('cash', 2);
const EIGHT2 = C.at('eight', 2);
const SIXTEEN = C.at('sixteen');
const FOUR = C.at('four');
const HALF = C.at('half');
const SO1 = C.at('So', 1);
const NUMBERS2 = C.at('Numbers', 2);
const SCREEN = C.at('screen');
const CHIP_DOCK = SCREEN + 36; // docks quickly: the cliffhanger follows 3.4 s later
const TOUCH = C.at('touch');
const SO2 = C.at('So', 2);
const QUESTION = C.at('question');
const PAPER = C.at('paper');
const GOLD = C.at('gold');
const ACTUALLY = C.at('actually');

const Matatu: React.FC<{ x: number; color: string }> = ({ x, color }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={0} y={20} width={260} height={90} rx={18} fill={color} />
    {[20, 80, 140, 200].map((wx) => <rect key={wx} x={wx} y={34} width={44} height={30} rx={4} fill="#9fd0e8" />)}
    <rect x={0} y={74} width={260} height={10} fill="#ffd23f" />
    {[50, 210].map((cx) => <circle key={cx} cx={cx} cy={112} r={18} fill="#1a1a1a" />)}
  </g>
);

const MoToday: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const city = win(f, DOCK, DID - 2, 10, 8);
  const mpesa = win(f, MPESA - 4, JUST - 6, 6, 8);
  const euro = win(f, JUST + 2, SO1 + 2, 6, 8);
  const screen = win(f, SCREEN - 4, SO2, 4, 10);
  const cliff = ease(f, SO2 - 2, SO2 + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, SO2 - 2, SO2 + 8));
  const buzz = f >= BUZZES ? Math.sin(f * 2.2) * 6 * (1 - ease(f, BUZZES, BUZZES + 24)) : 0;
  const busX = ((f - MATATUS) * 3 + 300) % 2200 - 400;
  const route = ease(f, VILLAGE - 2, UPCOUNTRY + 10, 0, 1, DL_EASE.inOut);
  const conv = ease(f, NUMBERS1 - 4, NUMBERS1 + 12, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#06160e" />
      <Vignette />
      <EraHeader year="Today" idx={6} label="NAIROBI" dockAt={DOCK} />
      <WakePlace place="Nairobi" at={NAIROBI} dockAt={DOCK} yearAt={TODAY} />
      {/* the morning: matatus honk, the phone buzzes — money from your sister, in seconds */}
      <AbsoluteFill style={{ opacity: city }}>
        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18 }}>
          <Label at={MATATUS} color="#ffd23f" size={28}>MATATUS<span style={{ opacity: ease(f, HONK - 2, HONK + 6) }}> HONK</span></Label>
          <Label at={BUZZES} color={DYT.cyan} size={28}>· YOUR PHONE BUZZES</Label>
        </div>
        <svg width={1600} height={160} viewBox="0 0 1600 160" style={{ position: 'absolute', left: 160, top: 770, opacity: ease(f, MATATUS - 4, MATATUS + 6) }}>
          <rect x={0} y={130} width={1600} height={30} fill="#2a2a2a" />
          <Matatu x={busX} color="#2f8f5f" /><Matatu x={busX - 700} color="#c0392b" />
        </svg>
        <div style={{ position: 'absolute', left: 260, top: 300, transform: `translateX(${buzz}px)`, opacity: ease(f, BUZZES - 4, BUZZES + 4) }}>
          <Phone size={500} glow={ease(f, SENT - 2, SENT + 8)}>
            <TextBubble at={SISTER} color={DYT.green} size={24}>Sister: sent you money</TextBubble>
            <TextBubble at={SECONDS} color="#d8e8ff" right size={24}>Got it ✓</TextBubble>
          </Phone>
        </div>
        <svg width={800} height={380} viewBox="0 0 800 380" style={{ position: 'absolute', left: 820, top: 300, opacity: ease(f, VILLAGE - 4, VILLAGE + 6) }}>
          <path d="M60 300 Q300 80 720 120" fill="none" stroke={DYT.green} strokeWidth={6} strokeDasharray="1000" strokeDashoffset={1000 * (1 - route)} />
          <circle cx={60} cy={300} r={16} fill={DL.warm} /><text x={60} y={350} textAnchor="middle" fontFamily={DL_MONO} fontSize={24} fill={DL.warm}>A VILLAGE</text>
          <circle cx={720} cy={120} r={16} fill={DYT.cyan} /><text x={720} y={80} textAnchor="middle" fontFamily={DL_MONO} fontSize={24} fill={DYT.cyan}>NAIROBI</text>
          <text x={380} y={260} textAnchor="middle" fontFamily={DL_MONO} fontSize={26} fill={DL.dim} opacity={ease(f, UPCOUNTRY - 2, UPCOUNTRY + 6)}>FAR UPCOUNTRY</text>
          <text x={430} y={190} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={36} fill={DYT.green} opacity={ease(f, SECONDS - 2, SECONDS + 6)}>⏱ SECONDS</text>
        </svg>
      </AbsoluteFill>

      {/* how people live: M-Pesa — cash at a shop becomes numbers on your phone */}
      <AbsoluteFill style={{ opacity: mpesa }}>
        <div style={{ position: 'absolute', left: 160, top: 210, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ ...rise(f, MPESA - 2), padding: '10px 22px', borderRadius: 10, background: DYT.green, fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: '#06120a' }}>M-PESA</div>
          <Label at={MPESA} color={DL.text} size={30}>LAUNCHED IN KENYA<span style={{ opacity: ease(f, SEVEN - 2, SEVEN + 6) }}> · 2007</span></Label>
        </div>
        <div style={{ position: 'absolute', left: 1320, top: 300, opacity: ease(f, MPESA - 2, MPESA + 8) * (1 - ease(f, CASH1 - 6, CASH1 + 4)) }}>
          <Phone size={420} glow={0.7}><div style={{ padding: '18px 0', borderRadius: 10, background: DYT.green, textAlign: 'center', fontFamily: DL_MONO, fontWeight: 700, fontSize: 30, color: '#06120a' }}>M-PESA</div><div style={{ textAlign: 'center', fontFamily: DL_MONO, fontSize: 22, color: DYT.dim, opacity: ease(f, SEVEN - 2, SEVEN + 6) }}>SINCE 2007</div></Phone>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 310, display: 'flex', alignItems: 'center', gap: 30 }}>
          <div style={{ opacity: ease(f, CASH1 - 2, CASH1 + 8) * (1 - conv), transform: `translateX(${conv * 200}px)` }}><Banknote w={220} big="KSh" color="#e8dcc0" ink="#5a4a2a" /></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, SHOPKEEPER - 2, SHOPKEEPER + 8) }}>
            <svg width={200} height={150} viewBox="0 0 200 150"><rect x={10} y={40} width={180} height={100} fill="#2f8f5f" /><rect x={10} y={20} width={180} height={26} fill="#ffd23f" /><text x={100} y={39} textAnchor="middle" fontFamily={DL_MONO} fontWeight={700} fontSize={18} fill="#06120a">AGENT</text><rect x={70} y={80} width={60} height={60} fill="#1a1a1a" /></svg>
            <Label at={SHOPKEEPER} color={DL.warm} size={24}>A SHOPKEEPER</Label>
          </div>
          <span style={{ fontFamily: DL_SERIF, fontSize: 70, color: DL.dim, opacity: ease(f, NUMBERS1 - 4, NUMBERS1 + 4) }}>→</span>
          <div style={{ position: 'relative', opacity: ease(f, NUMBERS1 - 4, NUMBERS1 + 6) }}>
            <Phone size={260} glow={conv}><div style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 28, color: DYT.cyan, textAlign: 'center' }}>BALANCE<br />{conv > 0.5 ? '▮▮▮▮' : '…'}</div></Phone>
          </div>
          <Label at={NUMBERS1} color={DYT.cyan} size={28}>NUMBERS ON YOUR PHONE</Label>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 620, transform: 'scale(0.62)', transformOrigin: 'top left', opacity: ease(f, SCHOOL - 6, SCHOOL + 4) }}>
          <DayClock year="NAIROBI" at={SCHOOL - 6} step={10} hotSeq={[[0, SCHOOL], [1, TAXI]]} segs={[
            { from: 6, to: 8, label: 'SCHOOL FEES · BY TEXT', color: DYT.green },
            { from: 8, to: 9, label: 'TAXI RIDE · BY TEXT', color: DYT.cyan },
          ]} />
        </div>
        <div style={{ position: 'absolute', left: 1100, top: 700 }}><Label at={TEXT} color={DYT.green} size={30}>PAID WITH A TEXT</Label></div>
        <div style={{ position: 'absolute', left: 1100, top: 760 }}><Source at={SEVEN}>Safaricom launch, March 2007 · FAO · illustration</Source></div>
      </AbsoluteFill>

      {/* it isn't just Kenya: the euro-area cash share */}
      <AbsoluteFill style={{ opacity: euro }}>
        <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={JUST} color={DL.dim} size={30}>IT ISN'T JUST KENYA<span style={{ opacity: ease(f, ACROSS - 2, ACROSS + 6) }}> · THE EURO AREA: CASH'S SHARE OF SHOP PAYMENTS</span></Label></div>
        <div style={{ position: 'absolute', left: 260, top: 300, display: 'flex', alignItems: 'flex-end', gap: 120, height: 460 }}>
          {([['2016', 79, SIXTEEN, EIGHT2, DL.gold], ['2024', 52, FOUR, FOUR, DYT.cyan]] as const).map(([y, v, at, grow, col]) => (
            <div key={y} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 52, color: col, opacity: ease(f, at - 2, at + 6) }}>{v} %</span>
              <div style={{ width: 200, height: 4.4 * v * ease(f, grow - 2, grow + 14, 0, 1, DL_EASE.out), background: col, borderRadius: 10, opacity: 0.9 }} />
              <span style={{ fontFamily: DL_MONO, fontSize: 32, color: DL.text }}>{y}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 80 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', opacity: ease(f, CASH2 - 2, CASH2 + 8) }}><Banknote w={130} big="€" /><Sovereign size={64} label="€" /><Label at={CASH2} color={DL.text} size={28}>CASH</Label></div>
            <Label at={EIGHT2} color={DL.gold} size={30}>ABOUT 8 IN 10 (2016)</Label>
            <Label at={HALF} color={DYT.cyan} size={30}>ABOUT HALF (2024)</Label>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={SIXTEEN}>ECB, SPACE 2024 · euro area · point-of-sale payments, by number</Source></div>
      </AbsoluteFill>

      {/* "So what is money to you?" — numbers on a screen */}
      <AskMark at={SO1} out={SCREEN + 2} left={760} top={250} pulseAt={C.at('you', 5)} />
      <AbsoluteFill style={{ opacity: screen }}>
        <div style={{ position: 'absolute', left: 220, top: 260, width: 520, height: 520 }}>
          <Phone size={500} glow={0.8}><div style={{ position: 'relative', width: '100%', height: '100%' }}><Digits w={220} h={420} op={1} speed={4} cols={6} /></div></Phone>
        </div>
        <div style={{ position: 'absolute', left: 600, top: 300, display: 'flex', flexDirection: 'column', gap: 30 }}>
          <span style={{ fontFamily: DL_SERIF, fontSize: 84, color: DL.text, opacity: ease(f, NUMBERS2 - 2, NUMBERS2 + 6) }}>Numbers on a</span>
          <BigWord at={SCREEN} size={100} gradient>screen.</BigWord>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: ease(f, TOUCH - 4, TOUCH + 6) }}>
            <svg width={90} height={90} viewBox="0 0 200 200"><path d="M40 120 C40 100 46 92 56 92 L62 92 L62 40 C62 30 76 30 76 40 L76 86 L82 86 L82 28 C82 18 96 18 96 28 L96 86 L102 86 L102 32 C102 22 116 22 116 32 L116 90 L122 90 L122 50 C122 40 136 40 136 50 L136 128 C136 160 116 184 88 184 C60 184 40 160 40 130 Z" fill="none" stroke={DL.warm} strokeWidth={8} /><line x1={20} y1={20} x2={180} y2={180} stroke={DL.red} strokeWidth={14} /></svg>
            <Label at={TOUCH} color={DL.text} size={30}>YOU ALMOST NEVER TOUCH IT</Label>
          </div>
        </div>
      </AbsoluteFill>
      <MoneyChip text="NUMBERS ON A SCREEN" at={SCREEN} dockAt={CHIP_DOCK} slot={5} left={820} top={800} />

      {/* cliffhanger: not paper, not gold — so what is it? */}
      <AbsoluteFill style={{ opacity: cliff }}>
        <div style={{ position: 'absolute', left: 300, top: 300, display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ position: 'relative', opacity: ease(f, PAPER - 3, PAPER + 6) }}><Banknote w={260} big="£" /><div style={{ position: 'absolute', right: -10, top: -20, fontFamily: DL_MONO, fontWeight: 700, fontSize: 64, color: DL.red }}>✗</div></div>
          <div style={{ position: 'relative', opacity: ease(f, GOLD - 3, GOLD + 6) }}><Sovereign size={150} /><div style={{ position: 'absolute', right: -20, top: -20, fontFamily: DL_MONO, fontWeight: 700, fontSize: 64, color: DL.red }}>✗</div></div>
          <span style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 150, color: DL.text, opacity: ease(f, ACTUALLY - 3, ACTUALLY + 6) }}>MONEY <span style={{ color: DL.gold }}>= ?</span></span>
        </div>
        <div style={{ position: 'absolute', left: 300, top: 240 }}><Label at={QUESTION} color={DL.gold} size={30}>THE QUESTION YOU CAME FOR</Label></div>
        <div style={{ position: 'absolute', left: 1300, top: 220, fontFamily: DL_SERIF, fontSize: 400, lineHeight: 1, color: DL.gold, opacity: 0.6 * ease(f, QUESTION - 2, QUESTION + 10) * (1 - ease(f, ACTUALLY - 6, ACTUALLY + 2)), transform: `scale(${1 + 0.03 * Math.sin(f / 8)})` }}>?</div>
      </AbsoluteFill>

      <MoneyLadder rungs={[...moneyRungs(5), { year: 'TODAY', label: 'NUMBERS ON SCREEN', at: CHIP_DOCK + 10 }]} show={ladder} />
      <DidYouKnowThat at={DID} out={MPESA}>
        <span style={{ opacity: ease(f, EIGHT1 - 4, EIGHT1 + 6), color: '#ff9a1f', fontStyle: 'italic' }}>about 8 in 10</span>
        <span style={{ opacity: ease(f, ADULTS - 4, ADULTS + 6) }}> adults</span>
        <span style={{ opacity: ease(f, KENYA1 - 4, KENYA1 + 6) }}> in Kenya</span>
        <span style={{ opacity: ease(f, MOBILE - 4, MOBILE + 6) }}> now use mobile money.</span>
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 34 }}>
          <PeopleRow n={10} size={48} gap={10} color="#34d058" lit={(i) => (f < TWO1 ? (i < 8 ? ease(f, EIGHT1 + i * 2, EIGHT1 + i * 2 + 6) : 0) : (i < 3 ? ease(f, THREE - 2 + i * 2, THREE + 4 + i * 2) : 0))} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: '#34d058', opacity: ease(f, EIGHT1 - 2, EIGHT1 + 6) * (1 - ease(f, TWO1 - 4, TWO1 + 2)) }}>2024: 82.3 %</span>
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 34, color: '#ffd23f', opacity: ease(f, NINE - 2, NINE + 6) }}>2009<span style={{ opacity: ease(f, UNDER - 2, UNDER + 6) }}>: 27.9 %</span><span style={{ opacity: ease(f, THREE - 2, THREE + 6) }}> · UNDER 3 IN 10</span></span>
          </div>
        </div>
        <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, EIGHT1, EIGHT1 + 10) }}>2024 FinAccess Household Survey (CBK · KNBS · FSD Kenya)</div>
      </DidYouKnowThat>
      <SunCliffhanger next="THE ANSWER" parts={[{ text: "So here's the question you came for.", at: QUESTION }, { text: "If it isn't paper, and it isn't gold,", at: GOLD }, { text: 'what is money, actually?', at: ACTUALLY }]} />
      <EpisodeHud year="TODAY" episode="04" />
    </AbsoluteFill>
  );
};
export default MoToday;
