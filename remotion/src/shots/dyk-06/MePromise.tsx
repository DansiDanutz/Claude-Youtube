import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg } from '../../lib/danslab';
import { makeCue, ease, rise, useShotFade, Vignette } from '../../lib/dykkit';
import { MedProp, MED_ARC, Label, OnWord, QGRAD, hold } from '../../lib/dykkit-medicine';
import vo from './vo.json';

// =============================================================================
// DYK 06 · 4/14 — the promise. Seven year chips (MED_ARC + 2100) build one per 12 f from "Seven"; 1537 lights on
// "fifteen", the dashed 2100 chip on "twenty"; a light sweeps the row on "each", a dawn glow + rising sun on "wake".
// The three spine beats land on their words: A PATIENT (a bed per era, one per 6 f) on "patient", WHAT THE DOCTOR
// (+ BELIEVES on "believes") on "doctor", HOW LONG (an hourglass; + PEOPLE LIVE on "live") on "long". "And at the end":
// the row clears; How medicine finally found out what works. builds on its words, "works." lands in the gradient and
// holds ≥ 1.5 s to the cut. Nothing names an era's belief or cure here. VO me03 @0.6 s.
// =============================================================================
export const compositionConfig = { id: 'MePromise', durationInSeconds: 16.466666666666665, fps: 30, width: 1920, height: 1080 };
const DUR = 494;

const C = makeCue(vo, 'me03-promise', 0.6);
const SEVEN = C.at('Seven');
const FIFTEEN = C.at('fifteen');
const TWENTY = C.at('twenty');
const EACH = C.at('each');
const WAKE = C.at('wake');
const SOMEWHERE = C.at('somewhere');
const PATIENT = C.at('patient,');
const DOCTOR = C.at('doctor');
const BELIEVES = C.at('believes,');
const LONG = C.at('long');
const LIVE = C.at('live.');
const END = C.at('end,');
const HOW2 = C.at('how', 2); // 'how medicine finally' (1 = 'how long people live')
const FINALLY = C.at('finally');
const FOUND = C.at('found');
const WORKS = C.at('works.');

const YEARS = [...MED_ARC.map((r) => r.year), '2100'];
const X0 = 255, STEP = 235;
const PROMISE_AT = hold(LIVE, END); // the row holds ≥ 1.5 s after PEOPLE LIVE

const Pillar: React.FC<{ at: number; title: React.ReactNode; children: React.ReactNode }> = ({ at, title, children }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: ease(f, at - 2, at + 4), transform: `scale(${ease(f, at - 2, at + 10, 1.2, 1)})` }}>
      <div style={{ height: 150, display: 'flex', alignItems: 'center' }}>{children}</div>
      <Label at={at} color={DL.gold} size={30} style={{ textAlign: 'center' }}>{title}</Label>
    </div>
  );
};

// a doctor's head with a thought bubble (what the doctor believes — left open, no era's answer)
const Thinker: React.FC = () => (
  <svg width={170} height={150} viewBox="0 0 170 150">
    <circle cx={50} cy={92} r={30} fill={DL.warm} />
    <path d="M10 150 C10 130 26 122 50 122 C74 122 90 130 90 150 Z" fill={DL.warm} />
    <circle cx={50} cy={70} r={9} fill="none" stroke={DL.gold} strokeWidth={4} />
    <circle cx={86} cy={58} r={6} fill={DL.text} /><circle cx={100} cy={42} r={9} fill={DL.text} />
    <ellipse cx={132} cy={26} rx={36} ry={24} fill={DL.text} />
    <text x={132} y={38} textAnchor="middle" fontFamily={DL_SERIF} fontSize={34} fill={DL.bg}>?</text>
  </svg>
);

const MePromise: React.FC = () => {
  const f = useCurrentFrame();
  const fade = useShotFade(DUR);
  const rowOut = 1 - ease(f, PROMISE_AT - 4, PROMISE_AT);
  const dawn = ease(f, WAKE - 2, WAKE + 20);
  const sand = ease(f, LONG, LONG + 40);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS, opacity: fade }}>
      <SiteBg glow="#120c06" />
      <Vignette />
      <AbsoluteFill style={{ opacity: rowOut }}>
        <div style={{ position: 'absolute', left: 160, right: 160, top: 640, height: 260, borderRadius: '50%', background: `radial-gradient(ellipse at 50% 100%, ${DL.gold}33, transparent 70%)`, opacity: dawn }} />
        <div style={{ position: 'absolute', left: 960 - 70, top: 760 - 160 * ease(f, WAKE, SOMEWHERE + 40), width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, #ffe9b0, ${DL.gold}88 60%, transparent 72%)`, opacity: dawn * (1 - ease(f, PATIENT - 8, PATIENT)) }} />
        <div style={{ ...rise(f, SEVEN), position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: DL_MONO, fontSize: 34, letterSpacing: 10, color: DL.dim }}>SEVEN MORNINGS</div>
        {/* the three spine beats */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center', gap: 50 }}>
          <Pillar at={PATIENT} title="A PATIENT"><MedProp kind="bed" size={150} /></Pillar>
          <Pillar at={DOCTOR} title={<>WHAT THE DOCTOR<OnWord at={BELIEVES}> BELIEVES</OnWord></>}><Thinker /></Pillar>
          <Pillar at={LONG} title={<>HOW LONG<OnWord at={LIVE}> PEOPLE LIVE</OnWord></>}>
            <svg width={100} height={150} viewBox="0 0 100 150"><path d="M14 8 L86 8 M14 142 L86 142" stroke={DL.gold} strokeWidth={8} strokeLinecap="round" /><path d="M22 12 Q22 62 50 75 Q78 62 78 12 Z M22 138 Q22 88 50 75 Q78 88 78 138 Z" fill="none" stroke={DL.warm} strokeWidth={5} /><path d={`M${30 + 14 * sand} ${20 + 40 * sand} Q50 ${60 + 8 * sand} ${70 - 14 * sand} ${20 + 40 * sand} L70 20 L30 20 Z`} fill={DL.gold} opacity={1 - sand * 0.8} /><path d={`M28 136 Q50 ${136 - 40 * sand} 72 136 Z`} fill={DL.gold} /></svg>
          </Pillar>
        </div>
        {YEARS.map((y, i) => {
          const at = SEVEN + i * 12;
          const bedAt = PATIENT + i * 6;
          const future = i === 6;
          const lit = (i === 0 && f >= FIFTEEN) || (future && f >= TWENTY);
          const pulse = ease(f, EACH + i * 7, EACH + i * 7 + 5) * (1 - ease(f, EACH + i * 7 + 8, EACH + i * 7 + 22));
          const x = X0 + i * STEP;
          const s = interpolate(f, [at, at + 8], [0.7, 1], { ...DCLAMP, easing: DL_EASE.out });
          return (
            <React.Fragment key={y}>
              <div style={{ position: 'absolute', left: x - 90, top: 800, width: 180, textAlign: 'center', opacity: ease(f, at, at + 6), transform: `scale(${s * (1 + 0.12 * pulse)})`, padding: '14px 0', borderRadius: 12, border: `3px ${future ? 'dashed' : 'solid'} ${future ? DL.red : lit ? DL.gold : DL.border}`, background: lit ? '#1a1406' : DL.panel, fontFamily: DL_SERIF, fontSize: 46, color: future ? DL.red : lit ? DL.gold : DL.text, boxShadow: lit ? `0 0 26px ${future ? DL.red : DL.gold}66` : undefined }}>{y}</div>
              <div style={{ position: 'absolute', left: x - 90, top: 640, width: 180, height: 140, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', opacity: ease(f, bedAt, bedAt + 6), transform: `translateY(${ease(f, bedAt, bedAt + 10, 20, 0)}px)` }}>
                {future ? <div style={{ width: 110, height: 110, borderRadius: 16, border: `3px dashed ${DL.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DL_SERIF, fontSize: 80, color: DL.red }}>?</div> : <MedProp kind="bed" size={120} />}
              </div>
            </React.Fragment>
          );
        })}
      </AbsoluteFill>
      {/* the promise: how medicine finally found out what works — answered only in MeReveal */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ease(f, PROMISE_AT, PROMISE_AT + 6) }}>
        <div style={{ ...rise(f, PROMISE_AT), fontFamily: DL_MONO, fontSize: 32, letterSpacing: 10, color: DL.dim }}>AT THE END</div>
        <div style={{ marginTop: 26, width: 1500, textAlign: 'center', fontFamily: DL_SERIF, fontWeight: 500, fontSize: 96, lineHeight: 1.15, color: DL.text }}>
          <span style={{ opacity: ease(f, HOW2 - 2, HOW2 + 4) }}>How medicine </span><span style={{ opacity: ease(f, FINALLY - 2, FINALLY + 4), fontStyle: 'italic' }}>finally </span>
          <span style={{ opacity: ease(f, FOUND - 2, FOUND + 4) }}>found out </span>
          <span style={{ display: 'inline-block', opacity: ease(f, WORKS - 2, WORKS + 4), background: QGRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', transform: `scale(${ease(f, WORKS - 2, WORKS + 10, 1.3, 1)})` }}>what works.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
export default MePromise;
