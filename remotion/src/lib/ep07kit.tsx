import React from 'react';
import { useCurrentFrame, interpolate, spring, staticFile, Img } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP } from './danslab';
import { rise } from './ep03kit';

// ── Ep07 "The Factory" — image-first widgets. Real frames, dealt like cards. ──

// A real video frame inside a card frame — deals in with a spring + tilt.
export const ImageCard: React.FC<{ src: string; at: number; w?: number; rot?: number; label?: string; delay?: number }> = ({ src, at, w = 420, rot = 0, label, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame - at - delay;
  const p = spring({ frame: t, fps: 30, config: { damping: 16, mass: 0.8 } });
  const op = interpolate(t, [0, 10], [0, 1], DCLAMP);
  const y = interpolate(p, [0, 1], [80, 0]);
  const sc = interpolate(p, [0, 1], [0.86, 1]);
  const float = Math.sin((frame + at * 3) / 46) * 4;
  return (
    <div style={{ opacity: op, transform: `translateY(${y + float}px) rotate(${rot}deg) scale(${sc})`, width: w, borderRadius: 16, overflow: 'hidden', background: DL.panel, border: `1px solid ${DL.border}`, boxShadow: '0 26px 60px rgba(0,0,0,0.62)' }}>
      <Img src={src} style={{ width: '100%', display: 'block' }} />
      {label && (
        <div style={{ padding: '12px 16px', fontFamily: DL_MONO, fontSize: w * 0.045, letterSpacing: 2, color: DL.dim, borderTop: `1px solid ${DL.border}` }}>{label}</div>
      )}
    </div>
  );
};

// Deals a row of image cards out, one after another (poker-style).
export const CardDeal: React.FC<{ items: { src: string; label?: string }[]; at: number; w?: number; step?: number; overlap?: number }> = ({ items, at, w = 380, step = 16, overlap = 0 }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: overlap ? -overlap : 22 }}>
    {items.map((it, i) => (
      <ImageCard key={i} src={it.src} label={it.label} at={at} delay={i * step} w={w} rot={(i - (items.length - 1) / 2) * 2.4} />
    ))}
  </div>
);

// A grid of real frames (the design-system proof).
export const ImageGrid: React.FC<{ items: string[]; at: number; cols?: number; w?: number }> = ({ items, at, cols = 3, w = 400 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${w}px)`, gap: 20, justifyContent: 'center' }}>
      {items.map((src, i) => {
        const a = at + i * 12;
        const op = interpolate(frame, [a, a + 16], [0, 1], DCLAMP);
        const sc = interpolate(frame, [a, a + 20], [0.92, 1], { ...DCLAMP, easing: DL_EASE.out });
        return (
          <div key={i} style={{ opacity: op, transform: `scale(${sc})`, borderRadius: 12, overflow: 'hidden', border: `1px solid ${DL.border}`, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
            <Img src={src} style={{ width: '100%', display: 'block' }} />
          </div>
        );
      })}
    </div>
  );
};

// One large framed image with a caption.
export const BigShot: React.FC<{ src: string; at: number; w?: number; caption?: string }> = ({ src, at, w = 1180, caption }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [at, at + 18], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const sc = interpolate(frame, [at, at + 24], [0.96, 1], { ...DCLAMP, easing: DL_EASE.out });
  return (
    <div style={{ opacity: op, transform: `scale(${sc})`, width: w }}>
      <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${DL.border}`, boxShadow: '0 34px 80px rgba(0,0,0,0.6)' }}>
        <Img src={src} style={{ width: '100%', display: 'block' }} />
      </div>
      {caption && <div style={{ marginTop: 16, textAlign: 'center', fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>{caption}</div>}
    </div>
  );
};

// The factory line: stations light up as a token travels along.
export const StationLine: React.FC<{ stations: string[]; at: number; w?: number; active?: number }> = ({ stations, at, w = 1500, active }) => {
  const frame = useCurrentFrame();
  const n = stations.length;
  const prog = interpolate(frame, [at, at + 150], [0, 1], { ...DCLAMP, easing: DL_EASE.inOut });
  const cur = active != null ? active : Math.min(n - 1, Math.floor(prog * n));
  return (
    <div style={{ width: w, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 34, left: 40, right: 40, height: 3, background: DL.border }} />
      <div style={{ position: 'absolute', top: 34, left: 40, width: `calc((100% - 80px) * ${prog})`, height: 3, background: `linear-gradient(90deg, ${DL.red}, ${DL.gold})` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {stations.map((s, i) => {
          const on = i <= cur;
          const a = at + i * 12;
          const op = interpolate(frame, [a, a + 14], [0, 1], DCLAMP);
          return (
            <div key={s} style={{ opacity: op, width: w / n, textAlign: 'center' }}>
              <div style={{ width: 70, height: 70, margin: '0 auto', borderRadius: '50%', background: on ? DL.panel : DL.bg, border: `2px solid ${on ? DL.gold : DL.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 24px ${DL.gold}44` : 'none' }}>
                <span style={{ fontFamily: DL_MONO, fontWeight: 700, fontSize: 26, color: on ? DL.gold : DL.faint }}>{i + 1}</span>
              </div>
              <div style={{ marginTop: 14, fontFamily: DL_MONO, fontSize: 20, letterSpacing: 1, color: on ? DL.text : DL.faint }}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// A scrolling film strip of real frames (montage).
export const FilmStrip: React.FC<{ items: string[]; at: number; h?: number; speed?: number; y?: number }> = ({ items, at, h = 200, speed = 1.1, y = 0 }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - at);
  const cardW = h * (16 / 9) + 16;
  const total = cardW * items.length;
  // negative speed scrolls the strip the other way (still upright — never mirror
  // the container, it flips the text inside the frames)
  const shift = (((t * speed) % total) + total) % total;
  const loop = [...items, ...items, ...items];
  const op = interpolate(t, [0, 20], [0, 1], DCLAMP);
  return (
    <div style={{ opacity: op, height: h, overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 16, position: 'absolute', left: -shift + y, top: 0 }}>
        {loop.map((src, i) => (
          <div key={i} style={{ width: cardW - 16, height: h, borderRadius: 10, overflow: 'hidden', border: `1px solid ${DL.border}`, flexShrink: 0 }}>
            <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
