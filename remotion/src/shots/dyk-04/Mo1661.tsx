import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, EraHeader, Vignette, DidYouKnowThat, EraExit } from '../../lib/dykkit';
import {
  EpisodeHud, WakePlace, win, SunCliffhanger, MoneyChip, MoneyLadder, moneyRungs, Kid, Label, Source, StampText, AskMark, BigWord, QGRAD, INK,
  CopperPlate, Banknote, COPPER, NOTE,
} from '../../lib/dykkit-money';
import vo from './vo.json';

// =============================================================================
// DYK 04 · 6/14 — ERA 2: 1661, Stockholm (RESEARCH F8–F10). Header + "Stockholm" on its word; a frozen harbour on
// "harbour's"/"frozen"; a sledge loaded with copper slides past on "sledge", COPPER on "copper". DYK (F8): clauses on
// their words, the plate + 19.7 kg on "copper plate", a pocket ✗ on "pocket", a cart ✓ on "cart". How people paid
// (illustration): CART THE COPPER → LEAVE IT AT THE BANK on "Leave"/"bank" → TAKE A SHEET OF PAPER on "paper"; JOHAN
// PALMSTRUCH · STOCKHOLMS BANCO on "Johan"; the note reads YOUR COPPER IS WAITING on "waiting"; FIRST REAL BANKNOTES IN
// EUROPE on "first"/"Europe". "So what is money now?" = "?"; A PROMISE. on "promise", the chip A PROMISE ON PAPER on
// "paper" (2nd; slot 1, docks); REMEMBER THIS stamp on "Remember", PROMISE glows on "promise" (2nd), ↺ AT THE END on
// "end". The failure (F10): notes multiply on "prints", copper shrinks on "copper" (5th), an empty vault on "isn't",
// FAILED on "fails", SENTENCED TO DEATH · 1668 on "sentenced", SPARED · DIED 1671 on "spared"/"dies". Cliffhanger:
// a note on a pedestal labelled BELIEF on "believe", a figure pushes it higher on "push". VO mo05 @0.8 s.
// =============================================================================
export const compositionConfig = { id: 'Mo1661', durationInSeconds: 65.4667, fps: 30, width: 1920, height: 1080 };
const DUR = 1964;

const C = makeCue(vo, 'mo05-1661', 0.8);
const SIXTEEN = C.at('sixteen');
const STOCKHOLM = C.at('Stockholm');
const DOCK = STOCKHOLM + 40;
const HARBOUR = C.at("harbour's");
const FROZEN = C.at('frozen');
const SLEDGE = C.at('sledge');
const WINDOW = C.at('window');
const COPPER1 = C.at('copper', 1);
const DID = C.at('Did');
const SWEDENS = C.at("Sweden's");
const BIGGEST = C.at('biggest');
const WEIGHED = C.at('weighed');
const TWENTY = C.at('twenty');
const KILOS = C.at('kilos');
const PLATE = C.at('plate');
const POCKET = C.at('pocket');
const CART = C.at('cart');
const SO1 = C.at('So', 1);
const BANKER = C.at('banker');
const JOHAN = C.at('Johan');
const IDEA = C.at('idea');
const LEAVE = C.at('Leave');
const BANK1 = C.at('bank', 1); // 'at his bank,'
const SHEET = C.at('sheet');
const PAPER1 = C.at('paper', 1);
const SAYS = C.at('says');
const WAITING = C.at('waiting');
const FIRST = C.at('first');
const EUROPE = C.at('Europe');
const SO2 = C.at('So', 2); // 'So what is money now?'
const NOW_Q = C.at('now');
const PROMISE1 = C.at('promise', 1);
const PAPER2 = C.at('paper', 2); // 'Written on paper.'
const CHIP_DOCK = PAPER2 + 80;
const REMEMBER = C.at('Remember');
const PROMISE2 = C.at('promise', 2);
const END = C.at('end');
const LOVE = C.at('love');
const PRINTS = C.at('prints');
const LENDS = C.at('lends');
const COPPER5 = C.at('copper', 5); // 'copper to pay back'
const COME = C.at('come');
const ISNT = C.at("isn't");
const FAILS = C.at('fails');
const SENTENCED = C.at('sentenced');
const DEATH = C.at('death');
const SPARED = C.at('spared');
const DIES = C.at('dies');
const PAPER3 = C.at('Paper', 3); // 'Paper only works'
const BELIEVE = C.at('believe');
const NEXT = C.at('next');
const PUSH = C.at('push');
const FURTHER = C.at('further');

const Harbour: React.FC<{ f: number }> = ({ f }) => {
  const sx = 1700 - 2100 * ease(f, SLEDGE - 4, SLEDGE + 110, 0, 1, DL_EASE.inOut);
  return (
    <svg width={1600} height={430} viewBox="0 0 1600 430">
      <rect x={0} y={0} width={1600} height={430} fill="#0c1420" />
      {/* the frozen harbour: pale ice, two ships locked in it */}
      <rect x={0} y={200} width={1600} height={230} fill="#c8d8e8" opacity={0.18 + 0.5 * ease(f, FROZEN - 4, FROZEN + 14)} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={i * 140} y1={240 + (i % 3) * 40} x2={i * 140 + 90} y2={250 + (i % 3) * 40} stroke="#e8f0f8" strokeWidth={3} opacity={0.5 * ease(f, FROZEN, FROZEN + 14)} />)}
      {[260, 1100].map((x, k) => (
        <g key={k} opacity={ease(f, HARBOUR - 4 + k * 6, HARBOUR + 8 + k * 6)}>
          <path d={`M${x} 200 L${x + 220} 200 L${x + 190} 236 L${x + 30} 236 Z`} fill="#3a2a1c" />
          <line x1={x + 110} y1={200} x2={x + 110} y2={70} stroke="#3a2a1c" strokeWidth={6} />
          <line x1={x + 60} y1={110} x2={x + 160} y2={110} stroke="#3a2a1c" strokeWidth={4} />
        </g>
      ))}
      {/* snow */}
      {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 53 + f * 0.6) % 1600} cy={(i * 37 + f * (1 + (i % 3) * 0.4)) % 430} r={2.5} fill="#e8f0f8" opacity={0.6} />)}
      {/* a sledge loaded with copper plates scraping past */}
      <g transform={`translate(${sx} 300)`} opacity={ease(f, SLEDGE - 4, SLEDGE + 4)}>
        <path d="M0 70 L260 70 Q290 70 290 50" fill="none" stroke="#8a6a40" strokeWidth={6} />
        <rect x={20} y={46} width={220} height={18} fill={INK.wood} />
        {[0, 1, 2].map((k) => <rect key={k} x={36 + k * 14} y={8 - k * 12} width={180} height={40} rx={3} fill={COPPER.mid} stroke={COPPER.dark} strokeWidth={3} />)}
        <path d="M290 50 L360 30" stroke="#8a6a40" strokeWidth={4} />
      </g>
    </svg>
  );
};

const Step: React.FC<{ n: string; text: string; at: number; children: React.ReactNode }> = ({ n, text, at, children }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: ease(f, at - 3, at + 8), transform: `translateY(${ease(f, at - 3, at + 12, 24, 0)}px)` }}>
      <div style={{ height: 190, display: 'flex', alignItems: 'flex-end' }}>{children}</div>
      <div style={{ fontFamily: DL_MONO, fontSize: 26, letterSpacing: 2, color: DL.text, textAlign: 'center' }}><span style={{ color: DL.gold }}>{n} · </span>{text}</div>
    </div>
  );
};

const Mo1661: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const harbour = win(f, DOCK, DID - 2, 10, 8);
  const bank = win(f, SO1 - 2, SO2 + 2, 6, 8);
  const askQ = SO2;
  const promise = win(f, PROMISE1 - 2, LOVE + 14, 4, 10);
  const fail = win(f, LOVE + 10, PAPER3, 6, 10);
  const cliff = ease(f, PAPER3 - 2, PAPER3 + 10);
  const ladder = ease(f, CHIP_DOCK, CHIP_DOCK + 12) * (1 - ease(f, PAPER3 - 2, PAPER3 + 8));
  const notes = Math.round(2 + 14 * ease(f, PRINTS, LENDS + 20));
  const copperLeft = 1 - 0.75 * ease(f, LENDS, COPPER5 + 10);
  const glow2 = ease(f, PROMISE2 - 2, PROMISE2 + 6) * (1 - 0.5 * ease(f, PROMISE2 + 10, PROMISE2 + 40));
  const push = ease(f, PUSH, FURTHER + 20, 0, 1, DL_EASE.inOut);

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#0a1420" />
      <Vignette />
      <EraExit dur={DUR}>
        <EraHeader year="1661" idx={2} label="STOCKHOLM" dockAt={DOCK} />
        <WakePlace place="Stockholm" at={STOCKHOLM} dockAt={DOCK} yearAt={SIXTEEN} />
        <div style={{ position: 'absolute', left: 160, top: 300, opacity: harbour }}><Harbour f={f} /></div>
        <div style={{ position: 'absolute', left: 160, top: 220, display: 'flex', gap: 18, opacity: harbour }}>
          <Label at={HARBOUR} color={DL.sky} size={28}>THE HARBOUR'S<span style={{ opacity: ease(f, FROZEN - 2, FROZEN + 6) }}> FROZEN</span></Label>
          <Label at={SLEDGE} color={DL.warm} size={28}>· A SLEDGE<span style={{ opacity: ease(f, WINDOW - 2, WINDOW + 6) }}> PASSES YOUR WINDOW</span></Label>
          <Label at={COPPER1} color={COPPER.light} size={28}>· LOADED WITH COPPER</Label>
        </div>

        {/* how you paid: cart the copper → leave it at the bank → carry paper */}
        <AbsoluteFill style={{ opacity: bank }}>
          <div style={{ position: 'absolute', left: 160, top: 200, display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ opacity: ease(f, BANKER - 2, BANKER + 8) }}><Kid size={110} adult color="#6a7a9a" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Label at={BANKER} color={DL.dim} size={26}>A BANKER</Label>
              <div style={{ ...rise(f, JOHAN - 2), fontFamily: DL_SERIF, fontSize: 64, color: DL.text }}>Johan Palmstruch</div>
              <Label at={IDEA} color={DL.gold} size={26}>STOCKHOLMS BANCO · HIS IDEA</Label>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 450, display: 'flex', alignItems: 'flex-start', gap: 40 }}>
            <Step n="1" text="CART THE COPPER" at={IDEA - 6}><CopperPlate w={230} /></Step>
            <div style={{ fontFamily: DL_SERIF, fontSize: 80, color: DL.dim, marginTop: 90, opacity: ease(f, LEAVE - 2, LEAVE + 6) }}>→</div>
            <Step n="2" text="LEAVE IT AT THE BANK" at={LEAVE}>
              <svg width={220} height={190} viewBox="0 0 220 190"><path d="M10 60 L110 10 L210 60 Z" fill="#4a5a7a" />{[30, 70, 110, 150, 190].map((x) => <rect key={x} x={x - 8} y={66} width={16} height={100} fill="#8a9aba" />)}<rect x={10} y={166} width={200} height={20} fill="#4a5a7a" /><text x={110} y={52} textAnchor="middle" fontFamily={DL_MONO} fontSize={16} fill="#e8e8f0" opacity={ease(f, BANK1 - 2, BANK1 + 6)}>BANCO</text></svg>
            </Step>
            <div style={{ fontFamily: DL_SERIF, fontSize: 80, color: DL.dim, marginTop: 90, opacity: ease(f, SHEET - 2, SHEET + 6) }}>→</div>
            <Step n="3" text="TAKE A SHEET OF PAPER" at={PAPER1}>
              <div style={{ position: 'relative' }}>
                <Banknote w={300} title="Stockholms Banco" glow={ease(f, WAITING, WAITING + 8) * (1 - ease(f, WAITING + 20, WAITING + 50))} />
                <div style={{ position: 'absolute', left: 32, top: 68, width: 190, fontFamily: DL_MONO, fontWeight: 700, fontSize: 17, lineHeight: 1.25, color: NOTE.ink, opacity: ease(f, SAYS - 2, SAYS + 6), background: NOTE.paper }}>YOUR COPPER<span style={{ opacity: ease(f, WAITING - 2, WAITING + 6) }}> IS WAITING FOR YOU</span></div>
              </div>
            </Step>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 760, display: 'flex', alignItems: 'center', gap: 30 }}>
            <StampText text="THE FIRST REAL BANKNOTES" at={FIRST} color={DL.gold} size={40} tilt={-2} />
            <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: DL.gold, opacity: ease(f, EUROPE - 2, EUROPE + 6) }}>IN EUROPE · 1661</span>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 860 }}><Source at={FIRST}>Sveriges Riksbank, historical timeline · China used paper money centuries earlier · illustration</Source></div>
        </AbsoluteFill>

        {/* "So what is money now?" — a promise, written on paper — remember that word */}
        <AskMark at={askQ} out={PROMISE1 + 2} left={760} top={250} pulseAt={NOW_Q} />
        <AbsoluteFill style={{ opacity: promise }}>
          <div style={{ position: 'absolute', left: 220, top: 260, display: 'flex', alignItems: 'center', gap: 50 }}>
            <Banknote w={380} title="Stockholms Banco" tilt={-4} glow={0.5} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <BigWord at={PROMISE1} size={130} gradient>A promise.</BigWord>
              <div style={{ opacity: ease(f, PAPER2 - 2, PAPER2 + 6), fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 70, color: DL.text }}>Written on paper.</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 220, top: 560, display: 'flex', alignItems: 'center', gap: 40 }}>
            <StampText text="REMEMBER THIS WORD" at={REMEMBER} color={DL.red} size={42} />
            <span style={{ display: 'inline-block', fontFamily: DL_SERIF, fontWeight: 600, fontSize: 96, background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: ease(f, PROMISE2 - 2, PROMISE2 + 6), transform: `scale(${1 + 0.12 * glow2})`, filter: `drop-shadow(0 0 ${24 * glow2}px #ff3db4)` }}>PROMISE</span>
          </div>
          <div style={{ position: 'absolute', left: 220, top: 720 }}><Label at={C.at('comes')} color={DL.dim} size={30}>↺ IT COMES BACK AT THE END</Label></div>
        </AbsoluteFill>
        <MoneyChip text="A PROMISE ON PAPER" at={PAPER2} dockAt={CHIP_DOCK} slot={1} left={760} top={800} />

        {/* the failure: more notes than copper */}
        <AbsoluteFill style={{ opacity: fail }}>
          <div style={{ position: 'absolute', left: 160, top: 210 }}><Label at={LOVE} color={DL.warm} size={30}>PEOPLE LOVE THE NOTES</Label></div>
          <div style={{ position: 'absolute', left: 160, top: 290, display: 'flex', alignItems: 'flex-end', gap: 70 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative', width: 340, height: 340 }}>
                {Array.from({ length: notes }, (_, i) => <div key={i} style={{ position: 'absolute', left: (i % 4) * 22, bottom: i * 11, opacity: ease(f, PRINTS + i * 2, PRINTS + i * 2 + 6) || (i < 2 ? 1 : 0) }}><Banknote w={240} title="Banco" /></div>)}
              </div>
              <Label at={PRINTS} color={DL.text} size={28}>NOTES PRINTED<span style={{ opacity: ease(f, LENDS - 2, LENDS + 6) }}> · AND LENT</span></Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ height: 340, display: 'flex', alignItems: 'flex-end', transform: `scale(${copperLeft})`, transformOrigin: 'bottom center' }}><CopperPlate w={240} /></div>
              <Label at={COPPER5} color={COPPER.light} size={28}>COPPER TO PAY BACK</Label>
            </div>
            <div style={{ position: 'absolute', left: 840, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, COME - 2, COME + 8) }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 200 }}>{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ opacity: ease(f, COME + k * 3, COME + k * 3 + 6) }}><Kid size={46} adult color={DL.warm} /></div>)}</div>
              <div style={{ width: 260, height: 120, border: `4px solid ${DL.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_MONO, fontSize: 28, color: DL.red, opacity: ease(f, ISNT - 2, ISNT + 6) }}>THE VAULT: EMPTY</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 750, display: 'flex', alignItems: 'center', gap: 34 }}>
            <StampText text="THE BANK FAILS" at={FAILS} color={DL.red} size={40} />
            <Label at={SENTENCED} color={DL.text} size={30}>PALMSTRUCH: SENTENCED TO<span style={{ opacity: ease(f, DEATH - 2, DEATH + 6) }}> DEATH · 1668</span></Label>
          </div>
          <div style={{ position: 'absolute', left: 160, top: 870, display: 'flex', gap: 30 }}>
            <Label at={SPARED} color={DL.green} size={30}>SPARED</Label>
            <Label at={DIES} color={DL.dim} size={30}>· DIED 1671</Label>
            <Source at={SENTENCED} style={{ marginLeft: 20, marginTop: 4 }}>Riksbank · NY Fed Liberty Street (2013)</Source>
          </div>
        </AbsoluteFill>

        {/* cliffhanger: paper only works while people believe in it — one man pushes that belief further */}
        <AbsoluteFill style={{ opacity: cliff }}>
          <div style={{ position: 'absolute', left: 300, top: 560 - 220 * push, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Banknote w={320} title="Paper" glow={0.4 + 0.6 * push} />
            <Label at={BELIEVE} color={DL.gold} size={30}>HELD UP BY BELIEF</Label>
          </div>
          <div style={{ position: 'absolute', left: 300, top: 700 - 220 * push, width: 320, height: 220 * push + 40, background: `linear-gradient(${DL.gold}55, transparent)`, borderRadius: 8, opacity: ease(f, BELIEVE - 2, BELIEVE + 8) }} />
          <div style={{ position: 'absolute', left: 820, top: 300, display: 'flex', alignItems: 'flex-end', gap: 30, opacity: ease(f, NEXT - 4, NEXT + 6) }}>
            <Kid size={200} adult color="#9a7ab0" />
            <div style={{ fontFamily: DL_SERIF, fontSize: 200, color: DL.gold, opacity: ease(f, PUSH - 2, PUSH + 6), transform: `translateY(${-30 * push}px)` }}>↑</div>
          </div>
          <div style={{ position: 'absolute', left: 820, top: 300 }}><Label at={NEXT} color={DL.dim} size={28}>THE NEXT CENTURY: ONE MAN</Label></div>
        </AbsoluteFill>

        <MoneyLadder rungs={[...moneyRungs(1), { year: '1661', label: 'PROMISE ON PAPER', at: CHIP_DOCK + 10 }]} show={ladder} />
        <DidYouKnowThat at={DID} out={SO1}>
          <span style={{ opacity: ease(f, SWEDENS - 4, SWEDENS + 6) }}>Sweden's</span>
          <span style={{ opacity: ease(f, BIGGEST - 4, BIGGEST + 6) }}> biggest coin</span>
          <span style={{ opacity: ease(f, WEIGHED - 4, WEIGHED + 6) }}> weighed</span>
          <span style={{ opacity: ease(f, TWENTY - 4, TWENTY + 6), color: '#ff9a1f', fontStyle: 'italic' }}> almost 20 kilos.</span>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 34 }}>
            <div style={{ opacity: ease(f, PLATE - 6, PLATE + 4) }}><CopperPlate w={260} glow={0.5} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 40, color: COPPER.light, opacity: ease(f, KILOS - 2, KILOS + 6) }}>19.7 KG<span style={{ opacity: ease(f, PLATE - 4, PLATE + 4) }}> · A COPPER PLATE</span></span>
              <span style={{ fontFamily: DL_MONO, fontSize: 30, color: '#ffffff', opacity: ease(f, POCKET - 2, POCKET + 6) }}>✗ NOT IN YOUR POCKET</span>
              <span style={{ fontFamily: DL_MONO, fontSize: 30, color: '#34d058', opacity: ease(f, CART - 2, CART + 6) }}>✓ ON A CART</span>
            </div>
          </div>
          <div style={{ marginTop: 18, fontFamily: DL_MONO, fontSize: 24, color: '#c8cdf0', opacity: ease(f, KILOS, KILOS + 10) }}>Sveriges Riksbank: the 1644 ten-daler plate, "the largest coin in the world"</div>
        </DidYouKnowThat>
      </EraExit>
      <SunCliffhanger next="1720" parts={[{ text: 'Paper only works', at: PAPER3 }, { text: 'while people believe in it.', at: BELIEVE }, { text: 'One man will push that belief', at: PUSH }, { text: 'further than anyone.', at: FURTHER }]} />
      <EpisodeHud year={1661} episode="04" />
    </AbsoluteFill>
  );
};
export default Mo1661;
