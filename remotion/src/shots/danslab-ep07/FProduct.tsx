import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { DL, DL_SERIF, DL_SANS, DL_MONO, DL_EASE, DCLAMP, SiteBg, Kicker } from '../../lib/danslab';
import { Headline } from '../../lib/ep03kit';

// Ep07 15b — business-in-a-box: point the factory at any story, it opens a business. VO 0.8s (~20s).
export const compositionConfig = { id: 'FProduct', durationInSeconds: 22, fps: 30, width: 1920, height: 1080 };

const OUT = ['a channel', 'a voice', 'a film a week'];

const FProduct: React.FC = () => {
  const frame = useCurrentFrame();
  const storyOp = interpolate(frame, [80, 104], [0, 1], DCLAMP);
  const boxOp = interpolate(frame, [180, 206], [0, 1], { ...DCLAMP, easing: DL_EASE.out });
  const punch = interpolate(frame, [470, 494], [0, 1], DCLAMP);
  return (
    <AbsoluteFill style={{ fontFamily: DL_SANS }}>
      <SiteBg glow={DL.green} />
      <Kicker n="07" label="THE TURN // A BUSINESS-IN-A-BOX" />
      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center' }}>
        <Headline at={16} size={48}>This factory is <span style={{ color: DL.green }}>not just for DansLab.</span></Headline>
      </div>
      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        <div style={{ opacity: storyOp, background: DL.panel, border: `1px solid ${DL.gold}55`, borderRadius: 16, padding: '26px 34px', textAlign: 'center', width: 340 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.gold, marginBottom: 10 }}>ANY STORY</div>
          <div style={{ fontFamily: DL_SERIF, fontSize: 28, color: DL.text }}>a founder&rsquo;s · a brand&rsquo;s · yours</div>
        </div>
        <div style={{ opacity: boxOp, textAlign: 'center' }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 30, color: DL.green }}>&rarr; the factory &rarr;</div>
        </div>
        <div style={{ opacity: boxOp, background: `${DL.green}12`, border: `1px solid ${DL.green}55`, borderRadius: 16, padding: '22px 30px', width: 360 }}>
          <div style={{ fontFamily: DL_MONO, fontSize: 20, letterSpacing: 2, color: DL.green, marginBottom: 12, textAlign: 'center' }}>IT OPENS A BUSINESS</div>
          {OUT.map((o, i) => {
            const a = 240 + i * 18;
            return <div key={o} style={{ opacity: interpolate(frame, [a, a + 14], [0, 1], DCLAMP), fontFamily: DL_SERIF, fontSize: 26, color: DL.text, textAlign: 'center', lineHeight: 1.5 }}>{o}</div>;
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 96, left: 0, right: 0, textAlign: 'center', opacity: punch }}>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.warm }}>A business-in-a-box, for anyone with a </span>
        <span style={{ fontFamily: DL_SERIF, fontStyle: 'italic', fontSize: 40, color: DL.green }}>story to tell.</span>
      </div>
    </AbsoluteFill>
  );
};
export default FProduct;
