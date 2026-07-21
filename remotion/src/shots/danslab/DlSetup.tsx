import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { Send } from 'lucide-react';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 9/10 — how the setup works. VO 0.8s (20.4s): "So how does it all
// work? A Mac Studio at the center. Five DigitalOcean droplets across
// Frankfurt and the US. OpenClaw orchestrates the fleet, running Claude, Qwen
// and Gemini. When something needs a human, it escalates straight to Dan, on
// Telegram. One approval per direction. Everything else just ships."
// Cues: Mac ~f110, droplets ~f180, OpenClaw bar ~f280, models ~f330,
// Telegram ~f430, stamp ~f530.
// =============================================================================
export const compositionConfig = { id: 'DlSetup', durationInSeconds: 22.4, fps: 30, width: 1920, height: 1080 };

const MAC = 110, DROPS = 180, CLAW = 280, MODELS = 330, TG = 430, STAMP = 530;
const DROPLETS = ['dexter', 'memo', 'sienna', 'nano', 'fleet-05'];
const MODELCHIPS = ['CLAUDE', 'QWEN', 'ZAI', 'GEMINI'];

const DlSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const el = (at: number, dur = 16) => ({
    opacity: interpolate(frame, [at, at + dur], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [at, at + dur], [24, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const linkGrow = interpolate(frame, [DROPS + 30, DROPS + 56], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const stampIn = interpolate(frame, [STAMP, STAMP + 12], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const stampScale = interpolate(frame, [STAMP, STAMP + 14], [1.5, 1], { ...DCLAMP, easing: DL_EASE.out });

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.sky} />
      <Kicker n="05" label="THE SETUP // HOW IT WORKS" />

      <div style={{ position: 'absolute', top: 186, left: 120, ...rise(10, 20) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 72, color: DL.text }}>
          How does it <span style={{ fontStyle: 'italic', color: DL.gold }}>all work?</span>
        </span>
      </div>

      {/* Mac Studio center node */}
      <div style={{ position: 'absolute', top: 356, left: 350, width: 520, ...el(MAC) }}>
        <div style={{ background: DL.panel2, border: `1px solid ${DL.warm}66`, borderRadius: 16, padding: '30px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 3, color: DL.warm }}>THE CENTER</div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 52, color: DL.text, marginTop: 8 }}>Mac Studio</div>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, color: DL.muted, marginTop: 8 }}>Hermes · the brain lives here</div>
        </div>
      </div>

      {/* connecting line */}
      <div style={{ position: 'absolute', top: 448, left: 880, width: 180, height: 3, background: `linear-gradient(90deg, ${DL.warm}, ${DL.sky})`, transform: `scaleX(${linkGrow})`, transformOrigin: 'left' }} />

      {/* droplet cluster */}
      <div style={{ position: 'absolute', top: 336, left: 1070, right: 120, ...el(DROPS) }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.sky}44`, borderRadius: 16, padding: '28px 36px' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 19, letterSpacing: 2, color: DL.sky, whiteSpace: 'nowrap' }}>5 × DIGITALOCEAN DROPLETS · FRANKFURT / US-EAST</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 22, flexWrap: 'wrap' }}>
            {DROPLETS.map((d, i) => {
              const at = DROPS + 26 + i * 9;
              const op = interpolate(frame, [at, at + 9], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
              return (
                <div key={d} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${DL.border}`, borderRadius: 10, padding: '12px 20px', background: DL.bg }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: DL.green }} />
                  <span style={{ fontFamily: DL_MONO, fontSize: 23, color: DL.dim }}>{d}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* OpenClaw orchestration bar + model chips */}
      <div style={{ position: 'absolute', top: 640, left: 350, right: 120, ...el(CLAW) }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.red}44`, borderRadius: 16, padding: '26px 40px', display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontFamily: DL_MONO, fontSize: 24, letterSpacing: 3, color: DL.red }}>OPENCLAW</span>
          <span style={{ fontSize: 26, color: DL.muted }}>orchestrates the fleet</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
            {MODELCHIPS.map((m, i) => {
              const at = MODELS + i * 10;
              const op = interpolate(frame, [at, at + 10], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
              return (
                <span key={m} style={{ opacity: op, fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.warm, border: `1px solid ${DL.border}`, borderRadius: 999, padding: '9px 20px' }}>{m}</span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Telegram escalation */}
      <div style={{ position: 'absolute', top: 800, left: 350, right: 120, ...el(TG) }}>
        <div style={{ background: DL.panel, border: `1px solid ${DL.sky}55`, borderRadius: 16, padding: '26px 40px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: DL.sky, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={28} color="#04222e" />
          </div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 600, color: DL.text }}>Needs a human? It escalates to Dan — on Telegram.</div>
            <div style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.muted, marginTop: 6 }}>everything else just ships</div>
          </div>
          {/* stamp */}
          <div style={{ marginLeft: 'auto', opacity: stampIn, transform: `scale(${stampScale}) rotate(-6deg)` }}>
            <div style={{ border: `3px solid ${DL.red}`, borderRadius: 10, padding: '12px 24px' }}>
              <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 24, letterSpacing: 2, color: DL.red }}>ONE APPROVAL<br />PER DIRECTION</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DlSetup;
