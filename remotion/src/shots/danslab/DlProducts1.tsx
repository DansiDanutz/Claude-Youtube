import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker, useDlRise } from '../../lib/danslab';

// =============================================================================
// DansLab 6/10 — products I. VO 0.8s: "The products are real, and they are
// live. Nervix, an agent federation and marketplace, with two hundred
// forty-seven agents enrolled. CrawdBot, a YouTube automation suite that has
// processed over twelve thousand videos." Nervix ~f130, CrawdBot ~f292.
// =============================================================================
export const compositionConfig = { id: 'DlProducts1', durationInSeconds: 15.2, fps: 30, width: 1920, height: 1080 };

const NERVIX = 130;
const CRAWD = 292;

const DlProducts1: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = useDlRise();
  const card = (at: number) => ({
    opacity: interpolate(frame, [at, at + 16], [0, 1], { ...DCLAMP, easing: DL_EASE.out }),
    transform: `translateY(${interpolate(frame, [at, at + 16], [34, 0], { ...DCLAMP, easing: DL_EASE.out })}px)`,
  });
  const nvCount = Math.round(interpolate(frame, [NERVIX + 10, NERVIX + 44], [0, 247], { ...DCLAMP, easing: DL_EASE.inOut }));
  const cbCount = (interpolate(frame, [CRAWD + 10, CRAWD + 44], [0, 12.4], { ...DCLAMP, easing: DL_EASE.inOut })).toFixed(1);
  const recOn = Math.floor(frame / 18) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.red} />
      <Kicker n="03" label="SHIPPING // 5 PRODUCTS" />

      <div style={{ position: 'absolute', top: 200, left: 120, ...rise(10, 22) }}>
        <span style={{ fontFamily: DL_SERIF, fontWeight: 500, fontSize: 80, color: DL.text }}>
          The products are <span style={{ fontStyle: 'italic', color: DL.gold }}>real.</span>
        </span>
      </div>

      <div style={{ position: 'absolute', top: 400, left: 120, right: 120, display: 'flex', gap: 34 }}>
        {/* P/01 nervix */}
        <div style={{ ...card(NERVIX), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '40px 46px', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 30, right: 38, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>P/01</span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: `1px solid ${DL.sky}55`, background: `${DL.sky}12`, borderRadius: 999, padding: '10px 22px' }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.sky }}>⎔ FEDERATION · {nvCount} AGENTS</span>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 76, color: DL.text, marginTop: 34 }}>nervix<span style={{ color: DL.red }}>.ai</span></div>
          <div style={{ fontSize: 32, color: DL.dim, marginTop: 16 }}>Agent federation &amp; marketplace</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 40 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.faint }}>LEAD</span>
            <span style={{ fontSize: 27, fontWeight: 600, color: DL.warm }}>David</span>
            <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 22, color: DL.muted }}>247 agents enrolled</span>
          </div>
        </div>

        {/* P/02 crawdbot */}
        <div style={{ ...card(CRAWD), flex: 1, background: DL.panel, border: `1px solid ${DL.border}`, borderRadius: 16, padding: '40px 46px', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 30, right: 38, fontFamily: DL_MONO, fontSize: 22, color: DL.faint }}>P/02</span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, border: `1px solid ${DL.red}55`, background: `${DL.red}12`, borderRadius: 999, padding: '10px 22px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DL.red, opacity: recOn ? 1 : 0.25 }} />
            <span style={{ fontFamily: DL_MONO, fontSize: 21, letterSpacing: 2, color: DL.red }}>REC 00:24:12</span>
          </div>
          <div style={{ fontFamily: DL_SERIF, fontWeight: 600, fontSize: 76, color: DL.text, marginTop: 34 }}>crawdbot<span style={{ color: DL.red }}>.com</span></div>
          <div style={{ fontSize: 32, color: DL.dim, marginTop: 16 }}>YouTube automation suite</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 40 }}>
            <span style={{ fontFamily: DL_MONO, fontSize: 21, color: DL.faint }}>LEAD</span>
            <span style={{ fontSize: 27, fontWeight: 600, color: DL.warm }}>Dexter</span>
            <span style={{ marginLeft: 'auto', fontFamily: DL_MONO, fontSize: 22, color: DL.muted }}>{cbCount}k videos processed</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export default DlProducts1;
