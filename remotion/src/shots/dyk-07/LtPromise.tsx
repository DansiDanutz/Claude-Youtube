import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { LIGHT_ARC, FLAME, PriceStrip, OnWord, QGRAD, hold, pane } from '../../lib/dykkit-light';
import vo from './vo.json';

// =============================================================================
// DYK 07 · 4/14 — the promise. SIX MORNINGS on "Six"; six year chips (LIGHT_ARC) build one per 12 f; 1500 lights on
// "fifteen", TODAY on "today"; a dashed "?" chip on "one" (+ ONE MORE on "more"), 2100 on "twenty". A light sweeps the
// row on "each", a dawn glow + rising sun on "wake". "Someone has found" / "a new way" / "to beat the dark." build on
// "someone", "new", "beat" (a small neutral glow over each chip, one per 6 f — no era's light is named or drawn here).
// Then "You'll see" / "what one hour" (a clock) / "of light costs you." on "hour" and "costs" (the empty 1 HOUR OF
// LIGHT · WORK strip appears). "And at the end": the row clears; What we lost when we won. builds on its words, "won."
// lands in the gradient and holds ≥ 1.5 s to the cut. VO lt03 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'LtPromise', durationInSeconds: 19, fps: 30, width: 1920, height: 1080 };
const DUR = 570;

const C = makeCue(vo, 'lt03-promise', 0.6);
const SIX = C.at('Six');
const FIFTEEN = C.at('fifteen');
const TODAY = C.at('today,');
const ONE = C.at('one', 1); // 'one more' (2 = 'twenty one hundred', 3 = 'each one', 4 = 'what one hour')
const MORE = C.at('more,');
const TWENTY = C.at('twenty');
const EACH = C.at('each');
const WAKE = C.at('wake');
const SOMEONE = C.at('someone');
const NEW = C.at('new');
const BEAT = C.at('beat');
const YOULL = C.at("You'll");
const HOUR = C.at('hour');
const COSTS = C.at('costs');
const END = C.at('end,');
const WHAT2 = C.at('what', 2); // 'what we lost' (1 = 'what one hour')
const LOST = C.at('lost');
const WHEN = C.at('when');
const WON = C.at('won.');

const YEARS = [...LIGHT_ARC.map((r) => r.year), '2100'];
const FUTURE = YEARS.length - 1;
const X0 = 255, STEP = 235;
const LINE_END = hold(BEAT, YOULL); // "…to beat the dark." holds ≥ 1.5 s
const PROMISE_AT = hold(COSTS, END); // "…of light costs you." holds ≥ 1.5 s

// a clock whose hand keeps turning (one hour of light)
const Clock: React.FC<{ f: number }> = ({ f }) => {
  const a = (f - HOUR) / 6;
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <circle cx={65} cy={65} r={56} fill="#1a1406" stroke={DL.gold} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, k) => <line key={k} x1={65} y1={14} x2={65} y2={22} stroke={DL.warm} strokeWidth={3} transform={`rotate(${k * 30} 65 65)`} />)}
      <line x1={65} y1={65} x2={65 + 40 * Math.sin(a)} y2={65 - 40 * Math.cos(a)} stroke={FLAME} strokeWidth={5} strokeLinecap="round" />
      <line x1={65} y1={65} x2={65} y2={36} stroke={DL.text} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

const LtPromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const rowOut = 1 - ease(f, PROMISE_AT - 4, PROMISE_AT);
  const dawn = ease(f, WAKE - 2, WAKE + 20);
  const line = pane(f, SOMEONE, LINE_END);
  const cost = pane(f, LINE_END, PROMISE_AT);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#120c06" />
      <Vignette />
      <AbsoluteFill style={{ opacity: rowOut }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 640, height: 260, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}33, transparent 70%)`, opacity: dawn }} />
        <div style={{ position: 'absolute', left: 960 - 70, top: 760 - 160 * ease(f, WAKE, SOMEONE + 40), width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, #ffe9b0, ${DL.gold}88 60%, transparent 72%)`, opacity: dawn * (1 - ease(f, BEAT - 8, BEAT)) }} />
        <div style={{ ...rise(f, SIX), position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_MONO, fontSize: 34, letterSpacing: 10, color: DL.dim }}>
          SIX MORNINGS<OnWord at={MORE}> + ONE MORE</OnWord>
        </div>

        {/* someone has found a new way to beat the dark */}
        <div style={{ position: 'absolute', left: 160, right: 160, top: 330, textAlign: 'center', opacity: line, fontFamily: DL_SERIF, fontSize: 80, lineHeight: 1.15, color: DL.text }}>
          <OnWord at={SOMEONE}>Someone has found </OnWord><OnWord at={NEW}>a new way </OnWord>
          <span style={{ opacity: ease(f, BEAT - 2, BEAT + 4), color: DL.gold }}>to beat the dark.</span>
        </div>

        {/* what one hour of light costs you */}
        <div style={{ position: 'absolute', left: 160, right: 160, top: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: cost }}>
          <div style={{ opacity: ease(f, HOUR - 2, HOUR + 4), transform: `scale(${ease(f, HOUR - 2, HOUR + 10, 1.25, 1)})` }}><Clock f={f} /></div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 80, lineHeight: 1.15, color: DL.text }}>
            You&apos;ll see <OnWord at={HOUR}>what one hour </OnWord><span style={{ opacity: ease(f, COSTS - 2, COSTS + 4), color: DL.gold }}>of light costs you.</span>
          </div>
        </div>
        <PriceStrip items={[]} show={ease(f, COSTS - 2, COSTS + 6)} />

        {YEARS.map((y, i) => {
          const future = i === FUTURE;
          const at = future ? ONE : SIX + i * 12;
          const glowAt = BEAT + i * 6;
          const lit = (i === 0 && f >= FIFTEEN) || (i === FUTURE - 1 && f >= TODAY) || (future && f >= TWENTY);
          const pulse = ease(f, EACH + i * 7, EACH + i * 7 + 5) * (1 - ease(f, EACH + i * 7 + 8, EACH + i * 7 + 22));
          const x = X0 + i * STEP;
          const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
          const glow = ease(f, glowAt - 2, glowAt + 8) * (0.8 + 0.2 * Math.sin(f / 5 + i));
          const col = future ? DL.red : FLAME;
          return (
            <React.Fragment key={y}>
              <div style={{ position: 'absolute', left: x - 90, top: 800, width: 180, textAlign: 'center', opacity: ease(f, at, at + 6), transform: `scale(${s * (1 + 0.12 * pulse)})`, padding: '14px 0', borderRadius: 12, border: `3px ${future ? 'dashed' : 'solid'} ${future ? DL.red : lit ? DL.gold : DL.border}`, background: lit ? '#1a1406' : DL.panel, fontFamily: DL_SERIF, fontSize: y === 'TODAY' ? 40 : 46, color: future ? DL.red : lit ? DL.gold : DL.text, boxShadow: lit ? `0 0 26px ${future ? DL.red : DL.gold}66` : undefined }}>
                {future && f < TWENTY - 2 ? '?' : y}
              </div>
              {/* a new way to beat the dark: one neutral glow per morning */}
              <div style={{ position: 'absolute', left: x - 60, top: 660, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${col}cc, ${col}33 45%, transparent 70%)`, opacity: glow, transform: `scale(${0.6 + 0.4 * glow})` }} />
            </React.Fragment>
          );
        })}
      </AbsoluteFill>

      {/* the promise: what we lost when we won — answered only in LtReveal */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, PROMISE_AT, PROMISE_AT + 6) }}>
        <div style={{ ...rise(f, PROMISE_AT), fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.dim }}>AT THE END</div>
        <div style={{ marginTop: 26, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 104, lineHeight: 1.15, color: DL.text }}>
          <OnWord at={WHAT2}>What we </OnWord><span style={{ opacity: ease(f, LOST - 2, LOST + 4), fontStyle: 'italic', color: DL.warm }}>lost </span>
          <OnWord at={WHEN}>when we </OnWord>
          <span style={{ display: 'inline-block', opacity: ease(f, WON - 2, WON + 4), background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', transform: `scale(${ease(f, WON - 2, WON + 10, 1.3, 1)})` }}>won.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default LtPromise;
