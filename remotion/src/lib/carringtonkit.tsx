// Shared pieces for the carrington-test film. NOT a shot (no compositionConfig;
// lives outside src/shots so gen-registry skips it).
// Night-story treatment on the channel brand: ink-dark canvas, the 1859
// blood-red aurora as the single big color note (brand danger rose + gold),
// green kept for the "signal alive" moments. Sora/Inter/JetBrains throughout.
import React from 'react';
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, EASINGS } from '../brand';
import { FONT_DISPLAY, FONT_MONO } from '../fonts';

export const KCLAMP = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// ---- night backdrop: ink sky, red auroral glow breathing at the top --------
export const NightBg: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const breathe = 0.75 + 0.25 * Math.sin(frame / 38);
  const a = 0.32 * intensity * breathe;
  const g = 0.14 * intensity * (0.7 + 0.3 * Math.sin(frame / 51 + 2));
  return (
    <>
      <AbsoluteFill style={{ backgroundColor: COLORS.d900 }} />
      <AbsoluteFill style={{ background: `radial-gradient(1500px 780px at 50% -18%, rgba(225,29,72,${a.toFixed(3)}), transparent 62%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(1100px 560px at 18% -10%, rgba(212,160,23,${g.toFixed(3)}), transparent 60%)` }} />
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${COLORS.d600} 1.4px, transparent 1.4px)`, backgroundSize: '46px 46px', opacity: 0.22 }} />
    </>
  );
};

// slow drifting auroral curtains, drawn as soft skewed bands near the top
export const AuroraCurtains: React.FC<{ start?: number; strength?: number }> = ({ start = 0, strength = 1 }) => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [start, start + 40], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const bands = [
    { x: 180, w: 190, hue: 'rgba(225,29,72,0.30)', speed: 47, ph: 0 },
    { x: 560, w: 150, hue: 'rgba(225,29,72,0.22)', speed: 61, ph: 1.7 },
    { x: 930, w: 210, hue: 'rgba(212,160,23,0.16)', speed: 53, ph: 3.1 },
    { x: 1290, w: 160, hue: 'rgba(225,29,72,0.26)', speed: 43, ph: 4.4 },
    { x: 1640, w: 130, hue: 'rgba(5,150,105,0.14)', speed: 67, ph: 5.6 },
  ];
  return (
    <AbsoluteFill style={{ opacity: on * strength }}>
      {bands.map((b, i) => {
        const sway = Math.sin(frame / b.speed + b.ph) * 46;
        const stretch = 1 + 0.10 * Math.sin(frame / (b.speed * 0.8) + b.ph * 2);
        return (
          <div key={i} style={{
            position: 'absolute', top: -160, left: b.x + sway, width: b.w, height: 560 * stretch,
            background: `linear-gradient(180deg, ${b.hue}, transparent 82%)`,
            filter: 'blur(34px)', transform: `skewX(${8 * Math.sin(frame / (b.speed * 1.3) + b.ph)}deg)`,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

// mono section label on the dark canvas
export const NightTag: React.FC<{ text: string; start?: number; color?: string }> = ({ text, start = 6, color = COLORS.warn }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 12], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  return (
    <div style={{ position: 'absolute', top: 84, left: 130, right: 130, display: 'flex', alignItems: 'center', gap: 24, opacity: op }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
      <span style={{ fontFamily: FONT_MONO, fontSize: 25, letterSpacing: 6, color: COLORS.d400 }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: COLORS.d600 }} />
    </div>
  );
};

// ---- the telegraph key: brass key on a wooden base, arm taps on a beat -----
// cut=true renders the battery cable visibly severed beside it.
export const TelegraphKey: React.FC<{ start?: number; w?: number; tapEvery?: number }> = ({ start = 0, w = 560, tapEvery = 34 }) => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [start, start + 16], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const t = Math.max(0, frame - start);
  // a crisp tap: arm dips fast, springs back
  const phase = t % tapEvery;
  const dip = phase < 4 ? phase / 4 : phase < 9 ? 1 - (phase - 4) / 5 : 0;
  const armAngle = -7 + dip * 9;
  const spark = dip > 0.82;
  const s = w / 560;
  return (
    <div style={{ opacity: on, width: w, height: 300 * s, position: 'relative' }}>
      <svg width={w} height={300 * s} viewBox="0 0 560 300">
        {/* wooden base */}
        <rect x="60" y="220" width="440" height="46" rx="10" fill="#3a2c22" />
        <rect x="60" y="220" width="440" height="12" rx="6" fill="#4a382b" />
        {/* pivot post */}
        <rect x="250" y="150" width="26" height="76" rx="6" fill="#8a6d3b" />
        {/* contact post */}
        <rect x="392" y="176" width="20" height="50" rx="5" fill="#8a6d3b" />
        {/* arm, pivots at (263,160) */}
        <g transform={`rotate(${armAngle} 263 160)`}>
          <rect x="120" y="150" width="330" height="16" rx="8" fill="#c9a24a" />
          <circle cx="440" cy="158" r="26" fill="#c9a24a" />
          <circle cx="440" cy="158" r="18" fill="#8a6d3b" />
        </g>
        <circle cx="263" cy="160" r="13" fill="#e0be6a" />
        {/* spark at the contact on the tap */}
        {spark && (
          <g>
            <circle cx="402" cy="182" r="9" fill="#fff3c4" opacity="0.95" />
            <circle cx="402" cy="182" r="17" fill="#d4a017" opacity="0.45" />
          </g>
        )}
      </svg>
    </div>
  );
};

// severed battery cable: two copper ends, clearly apart, small label
export const CutCable: React.FC<{ start?: number; w?: number }> = ({ start = 0, w = 460 }) => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [start, start + 16], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const s = w / 460;
  return (
    <div style={{ opacity: on, width: w, height: 150 * s }}>
      <svg width={w} height={150 * s} viewBox="0 0 460 150">
        {/* battery box */}
        <rect x="12" y="34" width="120" height="84" rx="10" fill={COLORS.d800} stroke={COLORS.d600} strokeWidth="2" />
        <rect x="34" y="20" width="20" height="14" rx="3" fill={COLORS.d600} />
        <rect x="90" y="20" width="20" height="14" rx="3" fill={COLORS.d600} />
        <text x="72" y="86" textAnchor="middle" fill={COLORS.d400} fontSize="22" fontFamily="monospace">CELL</text>
        {/* cable to the cut point */}
        <path d="M132 76 C 200 76, 220 96, 258 98" stroke="#b0713a" strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* the gap */}
        <path d="M300 96 C 350 90, 396 82, 448 78" stroke="#b0713a" strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* frayed copper ends */}
        <g stroke="#e0be6a" strokeWidth="3" strokeLinecap="round">
          <path d="M258 98 l14 -7" /><path d="M258 98 l15 2" /><path d="M258 98 l12 8" />
          <path d="M300 96 l-14 -6" /><path d="M300 96 l-15 3" /><path d="M300 96 l-11 9" />
        </g>
      </svg>
    </div>
  );
};

// ---- Boston to Portland: one thin wire across a dark stretch of coast ------
export const WireMap: React.FC<{ start?: number; w?: number; pulseEvery?: number }> = ({ start = 0, w = 1180, pulseEvery = 52 }) => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [start, start + 18], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const draw = interpolate(frame, [start + 8, start + 54], [0, 1], { ...KCLAMP, easing: EASINGS.easeInOut });
  const t = Math.max(0, frame - start - 54);
  const pulse = (t % pulseEvery) / pulseEvery;
  const s = w / 1180;
  // wire path from Boston (left low) to Portland (right high)
  const P = 'M170 322 C 420 260, 700 236, 1010 138';
  return (
    <div style={{ opacity: on, width: w, height: 430 * s, position: 'relative' }}>
      <svg width={w} height={430 * s} viewBox="0 0 1180 430">
        {/* abstract coastline */}
        <path d="M60 392 C 260 350, 420 366, 585 300 C 760 232, 880 240, 1120 118"
          stroke={COLORS.d600} strokeWidth="3" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
        {/* the single wire */}
        <path d={P} stroke={COLORS.warn} strokeWidth="4.5" fill="none"
          strokeDasharray="1000" strokeDashoffset={1000 * (1 - draw)} opacity="0.9" />
        {/* pulse traveling the wire once drawn */}
        {draw >= 1 && (
          <circle r="8" fill="#fff3c4">
            <animate attributeName="opacity" values="1" dur="1s" />
            <animateMotion dur={`${pulseEvery / 30}s`} repeatCount="indefinite" path={P} />
          </circle>
        )}
        {/* cities */}
        <circle cx="170" cy="322" r="13" fill={COLORS.danger} />
        <circle cx="170" cy="322" r="22" fill="none" stroke={COLORS.danger} strokeWidth="2" opacity={0.5 + 0.5 * Math.sin(frame / 9)} />
        <circle cx="1010" cy="138" r="13" fill={COLORS.signalAlt} />
        <circle cx="1010" cy="138" r="22" fill="none" stroke={COLORS.signalAlt} strokeWidth="2" opacity={0.5 + 0.5 * Math.sin(frame / 9 + 2)} />
      </svg>
      <div style={{ position: 'absolute', left: 60 * s, top: 350 * s, fontFamily: FONT_MONO, fontSize: 27 * s, letterSpacing: 4, color: COLORS.d300 }}>BOSTON</div>
      <div style={{ position: 'absolute', left: 930 * s, top: 66 * s, fontFamily: FONT_MONO, fontSize: 27 * s, letterSpacing: 4, color: COLORS.d300 }}>PORTLAND</div>
    </div>
  );
};

// ---- period portrait chip: engraving still + name plate --------------------
// Falls back to a designed monogram card if no image src is given.
export const PortraitCard: React.FC<{
  src?: string; name: string; role: string; start?: number; w?: number; accent?: string;
}> = ({ src, name, role, start = 0, w = 330, accent = COLORS.warn }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 14], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const y = interpolate(frame, [start, start + 16], [26, 0], { ...KCLAMP, easing: EASINGS.easeOut });
  const initials = name.split(' ').map((p) => p[0]).join('');
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: w, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: w, height: w * 1.16, borderRadius: 14, overflow: 'hidden', border: `1px solid ${COLORS.d600}`, background: COLORS.d800, boxShadow: '0 14px 44px rgba(0,0,0,0.45)', position: 'relative' }}>
        {src ? (
          <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.25) contrast(1.02)' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: w * 0.34, color: accent, background: `radial-gradient(120% 90% at 50% 10%, ${accent}22, transparent 70%)` }}>
            {initials}
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: accent }} />
      </div>
      <div style={{ marginTop: 18, fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: w * 0.082, color: COLORS.d300, textAlign: 'center' }}>{name}</div>
      <div style={{ marginTop: 6, fontFamily: FONT_MONO, fontSize: w * 0.058, letterSpacing: 2, color: COLORS.d400, textAlign: 'center' }}>{role}</div>
    </div>
  );
};

// ---- period footage inset: i2v scene clip in a framed card ----------------
// Clips are generated PER SCENE for this film (media/projects/carrington-test/
// scene-*.mp4) — environment-native footage, never generic presenter cutouts.
// The clip plays ONCE, slowed so it covers its full on-screen window (no loop
// restart — Dan 2026-07-22). Grok i2v source ≈ 6.04s @ 24fps ≈ 181 comp frames
// at 30fps; playbackRate = 181 / (visible window + margin) so it never runs out.
const FOOTAGE_NATIVE_FRAMES = 181;

export const FootageCard: React.FC<{
  src: string; caption: string; start?: number; w?: number; accent?: string;
  durFrames?: number; // frames the card stays on screen (from `start` to shot end)
}> = ({ src, caption, start = 0, w = 620, accent = COLORS.danger, durFrames = 170 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [start, start + 16], [0, 1], { ...KCLAMP, easing: EASINGS.easeOut });
  const y = interpolate(frame, [start, start + 18], [30, 0], { ...KCLAMP, easing: EASINGS.easeOut });
  const h = (w * 9) / 16;
  const rate = Math.min(1, FOOTAGE_NATIVE_FRAMES / (durFrames + 14));
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, width: w }}>
      <div style={{ width: w, height: h, borderRadius: 16, overflow: 'hidden', border: `1px solid ${COLORS.d600}`, boxShadow: '0 18px 54px rgba(0,0,0,0.5)', position: 'relative', background: COLORS.d800 }}>
        {/* the clip's clock starts when the card appears, so one slowed pass
            spans the whole visible window */}
        <Sequence from={start} layout="none">
          <OffthreadVideo src={staticFile(src)} muted playbackRate={rate} style={{ width: w, height: h, objectFit: 'cover' }} />
        </Sequence>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: accent }} />
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: accent }} />
        <span style={{ fontFamily: FONT_MONO, fontSize: 21, letterSpacing: 4, color: COLORS.d400 }}>{caption}</span>
      </div>
    </div>
  );
};

// morse strip: an animated row of dots and dashes ticking left
export const MorseStrip: React.FC<{ start?: number; w?: number; color?: string; opacity?: number }> = ({ start = 0, w = 900, color = COLORS.warn, opacity = 0.8 }) => {
  const frame = useCurrentFrame();
  const on = interpolate(frame, [start, start + 14], [0, opacity], { ...KCLAMP, easing: EASINGS.easeOut });
  const pattern = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1];
  const shift = (frame - start) * 2.2;
  return (
    <div style={{ opacity: on, width: w, height: 14, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: -(shift % 620), display: 'flex', gap: 14, alignItems: 'center' }}>
        {[...pattern, ...pattern, ...pattern].map((d, i) => (
          <div key={i} style={{ width: d ? 34 : 12, height: 10, borderRadius: 6, background: color, flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
};
