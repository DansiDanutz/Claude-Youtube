# SuIntro — the signature sting, identical every episode (v1, unchanged)
for sec, clip, g, vis in [(0.10, 'scan-hum', 0.24, 'sting: hum'), (0.40, 'ui-toggle-on', 0.50, 'bulb switches on'),
                          (0.62, 'sparkle-soft', 0.46, 'glow + sparks'), (1.25, 'whoosh-soft', 0.40, 'logo slides, wordmark'),
                          (1.53, 'knock-solid', 0.30, 'DID'), (1.73, 'knock-solid', 0.30, 'YOU'), (1.93, 'knock-solid', 0.30, 'KNOW'),
                          (2.13, 'impact-deep-soft', 0.55, 'THAT?'), (2.85, 'chime-magic', 0.42, 'tagline'),
                          (4.50, 'whoosh-soft', 0.30, 'episode card: EPISODE 02 · The Sun')]:
    c(S('SuIntro', sec), clip, g, vis)

