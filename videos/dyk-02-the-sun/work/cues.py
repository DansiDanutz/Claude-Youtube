"""DYK No. 02 cue table — ONE source for the SFX mix (build_final.py) and the beat map (make_beatmap.py).

Each entry: (when, clip, gain, visual) where `when` is
  ('w', scene, token, nth, shift)  → the word's start in the master (+shift s), or
  ('s', shot, seconds)             → a fixed time inside a shot, or
  ('after_did', scene)             → just after "Did you know THAT" (the chime lands after the phrase).
`visual` names the on-screen event the sound marks (it must exist in the shot's TSX at that word).
Ticks: ('ticks', scene, token, n, step_frames, nth, shift, visual) expand to n soft clicks.
Rules (skill): every visual event has a sound, every sound a visual; ≤ 3 clicks/s; DYK click before
"Did", chime after "that"; riser ends on its payoff (shift −1.36); one minor-piano per cliffhanger.
"""

ERA_SHOTS = ['Su1500', 'Su1610', 'Su1700', 'Su1800', 'Su1900', 'Su2000', 'Su2100']
ERA_VO = ['su04-1500', 'su05-1610', 'su06-1700', 'su07-1800', 'su08-1900', 'su09-2000']
EXIT_SHOTS = ['Su1500', 'Su1610', 'Su1700', 'Su1800', 'Su1900']   # shots wrapped in EraExit (0.9 s pull-in)


def W(scene, token, nth=1, shift=0.0):
    return ('w', scene, token, nth, shift)


def S(shot, sec):
    return ('s', shot, sec)


C = []   # (when, clip, gain, visual)
T = []   # ticks


def c(when, clip, gain, visual):
    C.append((when, clip, gain, visual))


def ticks(scene, token, n, step_f, visual, nth=1, shift=0.0):
    T.append((scene, token, n, step_f, nth, shift, visual))


# ── SuHook: 08:00 — this light is 8 min 20 s old
c(S('SuHook', 0.0), 'wind-soft', 0.30, 'sunrise + clock 08:00:00 on screen')
c(W('su01-hook', 'eight', 1), 'clock-tick-soft', 0.30, 'clock 08:00:00 pulses')
c(W('su01-hook', 'warm'), 'warm-shimmer', 0.26, 'silhouette on the horizon catches the light')
c(W('su01-hook', 'left'), 'pop-reveal', 0.30, '"THIS LIGHT LEFT THE SUN AT" card')
c(W('su01-hook', 'eight', 2), 'ui-send', 0.32, 'photon leaves the Sun; digits roll back')
c(W('su01-hook', 'ago'), 'stamp-hit', 0.34, 'digits land on 07:51:40; label 8 MIN 20 S')
c(W('su01-hook', 'vanished'), 'whoosh-reverse', 0.32, 'the Sun goes out (dashed outline)')
c(W('su01-hook', 'know'), 'clock-tick-soft', 0.36, 'YOU WOULD NOT KNOW FOR + countdown')
c(W('su02-question', 'We'), 'whoosh-soft', 0.28, 'verb cards scene')
for tok in ('celebrated', 'hidden', 'split', 'chased', 'touched'):
    c(W('su02-question', tok), 'pop-reveal', 0.26, f'verb card: {tok}')
c(W('su02-question', 'did'), 'ui-toggle-on', 0.24, 'DID YOU KNOW THAT… line')
c(W('su02-question', 'right', shift=-1.36), 'riser-soft', 0.32, '(riser into the payoff)')
c(W('su02-question', 'right'), 'impact-deep-soft', 0.50, '"as it is right now?" lands')

# ── SuIntro: the signature sting — identical every episode (sonic logo)
for sec, clip, g, vis in [(0.10, 'scan-hum', 0.24, 'sting: hum'), (0.40, 'ui-toggle-on', 0.50, 'bulb switches on'),
                          (0.62, 'sparkle-soft', 0.46, 'glow + sparks'), (1.25, 'whoosh-soft', 0.40, 'logo slides, wordmark'),
                          (1.53, 'knock-solid', 0.30, 'DID'), (1.73, 'knock-solid', 0.30, 'YOU'), (1.93, 'knock-solid', 0.30, 'KNOW'),
                          (2.13, 'impact-deep-soft', 0.55, 'THAT?'), (2.85, 'chime-magic', 0.42, 'tagline'),
                          (4.50, 'whoosh-soft', 0.30, 'episode card: EPISODE 02 · The Sun')]:
    c(S('SuIntro', sec), clip, g, vis)

# ── SuWelcome
c(S('SuWelcome', 0.05), 'ui-toggle-on', 0.26, 'logo switches on (first frames)')
c(W('su00-welcome', 'How'), 'pop-reveal', 0.16, '"? years old" pulses')
c(W('su00-welcome', 'Did'), 'pop-reveal', 0.20, 'wordmark builds')
c(W('su00-welcome', 'That'), 'sparkle-soft', 0.24, 'wordmark complete')
c(W('su00-welcome', 'Episode'), 'pop-reveal', 0.30, 'NO. 02 · THE SUN pill')
c(W('su00-welcome', 'rule'), 'whoosh-soft', 0.26, 'lockup docks; THE RULE label')
c(W('su00-welcome', 'light'), 'pop-reveal', 0.26, 'card: THE LIGHT ON YOUR FACE')
c(W('su00-welcome', 'old', 1), 'ui-click-soft', 0.26, '"8 min old"')
c(W('su00-welcome', 'energy'), 'pop-reveal', 0.26, 'card: THE ENERGY INSIDE IT')
c(W('su00-welcome', 'inside'), 'sparkle-soft', 0.28, '"? years old"')
for tok in ('guess', 'stay', 'correct'):
    c(W('su00-welcome', tok), 'stamp-hit', 0.32, f'rule step: {tok}')

# ── SuPromise
c(S('SuPromise', 0.0), 'whoosh-wind', 0.32, 'cut to the experiment')
c(W('su03-promise', 'experiment'), 'impact-soft', 0.30, 'THE EXPERIMENT title')
c(W('su03-promise', 'Seven'), 'whoosh-soft', 0.24, 'title docks; "Seven mornings."')
ticks('su03-promise', 'fifteen', 7, 12, 'the seven years build')
ticks('su03-promise', 'wake', 7, 12, 'seven people light up')
c(W('su03-promise', 'same'), 'warm-shimmer', 0.30, 'one Sun rises over everyone')
c(W('su03-promise', 'change'), 'knock-solid', 0.28, 'THE SUN · UNCHANGED (lock)')
c(W('su03-promise', 'will', 2), 'sparkle-soft', 0.26, 'the people change colour')
c(W('su03-promise', 'old'), 'piano-a-min', 0.28, '"How old is that light, really?"')

# ── era openers + exits + the per-era DYK ritual
for shot in ERA_SHOTS:
    c(S(shot, 0.0), 'whoosh-wind', 0.34, 'era cut: YOU WAKE UP IN · year')
    c(S(shot, 0.12), 'impact-soft', 0.38, 'year slams in')
for scene in ERA_VO:
    c(W(scene, 'Did', shift=-0.25), 'ui-toggle-on', 0.28, 'DID YOU KNOW THAT… card switches on')
    c(('after_did', scene), 'chime-magic', 0.30, '(chime after "that")')

# ── Su1500
s = 'su04-1500'
c(W(s, 'London'), 'ui-click-soft', 0.22, 'place line: London')
c(W(s, 'Midsummer', shift=0.67), 'pop-reveal', 0.28, 'header docks; night street + MIDSUMMER EVE chip')
c(W(s, 'shortest'), 'ui-click-soft', 0.26, 'THE SHORTEST NIGHT chip')
c(W(s, 'firelight'), 'warm-shimmer', 0.30, 'bonfires ignite')
c(W(s, 'around'), 'pop-reveal', 0.22, 'card: "the Sun goes around the Earth."')
c(W(s, 'Ptolemy'), 'page-flip', 0.26, 'card: TAUGHT BY PTOLEMY line')
c(W(s, 'fourteen'), 'ui-click-soft', 0.18, 'card: · ~1,400 YEARS EARLIER')
c(W(s, 'Your', shift=0.27), 'whoosh-soft', 0.24, 'Day Clock 1500 in')
ticks(s, 'Your', 6, 12, 'Day Clock segments draw', shift=0.37)
c(W(s, 'sets'), 'pop-reveal', 0.18, 'highlight moves to supper/sunset')
c(W(s, 'nobody'), 'stamp-hit', 0.32, 'TONIGHT · NOBODY SLEEPS')
c(W(s, 'Every', shift=0.45), 'whoosh-soft', 0.24, 'back to the street')
c(W(s, 'birch'), 'ui-click-soft', 0.26, 'green birch over the doors + chip')
c(W(s, 'flowers'), 'ui-click-soft', 0.26, "yellow flowers + ST JOHN'S WORT chip")
c(W(s, 'lamps'), 'sparkle-soft', 0.28, 'glass lamps light + chip')
c(W(s, 'bread'), 'pop-reveal', 0.24, 'tables with bread and drink + chip')
c(W(s, 'bonfires'), 'launch-thump', 0.28, 'the bonfires flare')
c(W(s, 'Stow'), 'page-flip', 0.30, 'Stow quote card')
c(W(s, 'great'), 'ui-click-soft', 0.22, 'quote part 1')
c(W(s, 'purge'), 'warm-shimmer', 0.26, 'quote part 2 (gold)')
c(W(s, 'Far'), 'whoosh-soft', 0.26, 'orbit diagram: Earth at the centre')
c(W(s, 'Copernicus'), 'pop-reveal', 0.28, 'Copernicus card')
c(W(s, 'sky'), 'sparkle-soft', 0.22, 'stars twinkle around the diagram')
c(W(s, 'forty'), 'page-flip', 0.28, '1543 · De revolutionibus card')
c(W(s, 'dies'), 'ui-click-soft', 0.18, '"· THE YEAR HE DIES"')
c(W(s, 'puts'), 'whoosh-soft', 0.24, 'the Sun moves toward the centre')
c(W(s, 'centre'), 'impact-soft', 0.34, 'Sun at the centre; label flips to COPERNICUS')
c(W(s, 'within'), 'piano-a-min', 0.30, 'cliffhanger band part 1')
c(W(s, 'instrument'), 'pop-reveal', 0.26, 'telescope + band part 2')
c(W(s, 'perfect'), 'ui-click-soft', 0.20, 'band part 3')

# ── Su1610
s = 'su05-1610'
c(W(s, 'beside'), 'ui-click-soft', 0.22, 'place line: Beside the River Thames')
c(W(s, 'misty'), 'wind-soft', 0.26, 'mist drifts over the header')
c(W(s, 'December', shift=0.2), 'whoosh-soft', 0.18, 'header docks; Thames scene')
c(W(s, 'morning'), 'ui-click-soft', 0.20, 'DECEMBER · MORNING MIST chip')
c(W(s, 'dim'), 'scan-hum', 0.18, 'the low Sun dims')
c(W(s, 'Harriot'), 'pop-reveal', 0.26, 'Harriot on the bank')
c(W(s, 'telescope', 1), 'ui-click-soft', 0.18, 'he raises the telescope')
c(W(s, 'draws'), 'pencil-scribble', 0.30, 'notebook; spots drawn one by one')
c(W(s, 'Do'), 'knock-solid', 0.30, 'NEVER LOOK AT THE SUN warning')
c(W(s, 'blind'), 'trap-snap', 0.20, 'warning pulses')
c(W(s, 'Galileo', 1), 'ui-click-soft', 0.20, 'card: "was made not by Galileo,"')
c(W(s, 'Englishman'), 'pop-reveal', 0.26, 'card: "an Englishman, Thomas Harriot"')
c(W(s, 'never'), 'stamp-hit', 0.28, 'card: "and he never published it"')
c(W(s, 'Two', shift=0.45), 'whoosh-soft', 0.26, 'Florence: the spotted Sun; 1612 label')
c(W(s, 'Florence'), 'ui-click-soft', 0.18, '· FLORENCE')
c(W(s, 'Galileo', 2), 'ui-click-soft', 0.18, '· GALILEO')
ticks(s, 'day', 3, 12, 'DAY 1 · DAY 2 · DAY 3')
c(W(s, 'rival'), 'ui-click-soft', 0.22, 'A RIVAL:')
c(W(s, 'planets'), 'pop-reveal', 0.24, 'little planets pass in front + text')
c(W(s, 'disagreed'), 'stamp-hit', 0.30, 'struck through; GALILEO: NO.')
c(W(s, 'itself'), 'pop-reveal', 0.24, 'ON THE SUN ITSELF')
c(W(s, 'turning'), 'whoosh-soft', 0.26, 'THE SUN IS TURNING arrow')
c(W(s, 'sixteen', 2), 'page-flip', 0.30, 'Rome 1613 book card')
c(W(s, 'perfect'), 'ui-click-soft', 0.20, 'THE PERFECT HEAVENS')
c(W(s, 'blemishes'), 'stamp-hit', 0.30, 'BLEMISHED')
c(W(s, 'For', 1), 'whoosh-soft', 0.24, 'Day Clock 1610 in')
ticks(s, 'For', 5, 12, 'Day Clock segments draw', shift=0.1)
c(W(s, 'daylight'), 'pop-reveal', 0.16, 'highlight moves to work by daylight')
c(W(s, 'few'), 'ui-click-soft', 0.20, 'FOR A FEW')
c(W(s, 'measure'), 'chime-reward', 0.28, 'THE SUN BECOMES SOMETHING TO MEASURE')
c(W(s, 'soon'), 'piano-a-min', 0.30, 'cliffhanger band part 1')
c(W(s, 'prism'), 'pop-reveal', 0.26, 'prism + white beam; band part 2')
c(W(s, 'apart'), 'sparkle-soft', 0.28, 'the beam breaks into colours; band part 3')

# ── Su1700
s = 'su06-1700'
c(W(s, 'London'), 'ui-click-soft', 0.22, 'place line: London')
c(W(s, 'sisters'), 'pop-reveal', 0.26, 'header docks; two oval portraits')
c(W(s, 'Gunnings'), 'ui-click-soft', 0.22, '"The Gunning sisters"')
c(W(s, 'talked'), 'pop-reveal', 0.24, 'MOST TALKED-ABOUT FACES chip')
c(W(s, 'fashionable'), 'ui-click-soft', 0.20, 'card: "that fashionable women painted theirs with"')
c(W(s, 'white', 1), 'trap-snap', 0.24, 'card: "white lead."')
c(W(s, 'Maria', shift=0.65), 'whoosh-soft', 0.26, "Maria Gunning's card")
c(W(s, 'Coventry'), 'ui-click-soft', 0.18, 'THE EARL OF COVENTRY chip')
c(W(s, 'married'), 'ui-click-soft', 0.24, '1752 · MARRIES chip')
c(W(s, 'twenty'), 'stamp-hit', 0.30, 'DIES AT 27')
c(W(s, 'blamed'), 'ui-click-soft', 0.22, '"Her death was blamed…" line')
c(W(s, 'least'), 'ui-click-soft', 0.18, '"at least in part, on the"')
c(W(s, 'powder'), 'knock-solid', 0.24, '"lead in her face powder" (gold)')
c(W(s, 'rich'), 'whoosh-soft', 0.26, 'IF YOU ARE RICH + the lady')
c(W(s, 'parasol'), 'warm-shimmer', 0.28, 'the parasol opens; SHADE caption')
c(W(s, 'poor'), 'pop-reveal', 0.24, 'IF YOU ARE POOR + Week Strip')
ticks(s, 'poor', 7, 12, 'Week Strip bars draw', shift=0.2)
c(W(s, 'tan'), 'sparkle-soft', 0.26, 'Saturday glows: IN THE SUN')
c(W(s, 'Half'), 'whoosh-soft', 0.26, 'Newton scene: HALF A CENTURY EARLIER + prism and white beam')
c(W(s, 'Newton'), 'pop-reveal', 0.24, 'Isaac Newton · OPTICKS 1704')
c(W(s, 'white', 2), 'ui-click-soft', 0.22, '"sunlight is not white"')
c(W(s, 'opens'), 'warm-shimmer', 0.30, 'the rainbow fan opens')
c(W(s, 'Red', 1), 'ui-click-soft', 0.22, 'RED label')
c(W(s, 'Violet'), 'ui-click-soft', 0.22, 'VIOLET label')
c(W(s, 'beyond'), 'piano-a-min', 0.30, 'dashed band past red + cliffhanger part 1')

# ── Su1800
s = 'su07-1800'
c(W(s, 'Windsor'), 'ui-click-soft', 0.22, 'place line: Slough, near Windsor')
c(W(s, 'Herschel'), 'pop-reveal', 0.24, 'William Herschel title')
c(W(s, 'prism'), 'ui-click-soft', 0.20, 'prism + white beam')
c(W(s, 'sunbeam'), 'warm-shimmer', 0.28, 'the spectrum opens')
c(W(s, 'thermometers'), 'ui-click-soft', 0.24, 'three thermometers appear')
c(W(s, 'blackened'), 'pop-reveal', 0.22, 'thermometer bulbs turn black; mercury rises')
c(W(s, 'past'), 'pop-reveal', 0.24, 'card: "just past the red"')
c(W(s, 'nothing'), 'ui-click-soft', 0.18, 'card: "— where there was nothing to see."')
c(W(s, 'He', shift=0.27), 'whoosh-soft', 0.24, 'back to the bench; beyond-red thermometer climbs')
c(W(s, 'infrared'), 'impact-soft', 0.34, '"infrared" lands; dashed band lights')
c(W(s, 'eyes'), 'pop-reveal', 0.24, 'MORE THAN OUR EYES CAN CATCH')
c(W(s, 'Within', 1), 'whoosh-soft', 0.24, 'Day Clock 1800s in')
ticks(s, 'Within', 5, 12, 'Day Clock segments draw', shift=0.2)
c(W(s, 'gas', shift=0.1), 'pop-reveal', 0.16, '1807 · PALL MALL · GAS STREET LAMPS chip')
c(W(s, 'night'), 'pop-reveal', 0.16, 'highlight: evening under gas light')
c(W(s, 'down', 1), 'ui-click-soft', 0.20, 'NO NEED TO STOP AT SUNSET')
c(W(s, 'thirty'), 'whoosh-soft', 0.24, "Becquerel's cell; 1839 · PARIS")
c(W(s, 'nineteen'), 'pop-reveal', 0.26, 'Edmond Becquerel + AGE 19')
c(W(s, 'shines'), 'warm-shimmer', 0.26, 'light beam onto the cell')
c(W(s, 'electricity'), 'glitch-zap', 0.24, 'the meter swings; "light → electricity"')
c(W(s, 'And', 2, shift=0.67), 'whoosh-soft', 0.24, 'Carrington scene')
c(W(s, 'fifty'), 'ui-click-soft', 0.18, '1 SEPT 1859 chip')
c(W(s, 'Richard'), 'ui-click-soft', 0.22, 'Richard Carrington')
c(W(s, 'flash'), 'impact-deep-soft', 0.40, 'white flash on the Sun + A WHITE FLASH chip')
c(W(s, 'Within', 2), 'pop-reveal', 0.22, 'telegraph poles')
c(W(s, 'spark', 1), 'glitch-zap', 0.28, 'sparks on the wires')
c(W(s, 'shocks'), 'stamp-hit', 0.30, 'TELEGRAPH OPERATORS GET SHOCKS')
c(W(s, 'touch'), 'warm-shimmer', 0.26, 'THE SUN CAN TOUCH OUR MACHINES')
c(W(s, 'It', 2), 'piano-a-min', 0.30, 'cliffhanger band part 1')
c(W(s, 'century'), 'ui-click-soft', 0.16, 'band part 2: "century"')

# ── Su1900
s = 'su08-1900'
c(W(s, 'crowded'), 'ui-click-soft', 0.22, 'place line: A crowded American beach')
c(W(s, 'Everyone', shift=0.4), 'pop-reveal', 0.24, 'header docks; sunbathers + umbrellas appear')
c(W(s, 'Everyone', shift=0.6), 'wind-soft', 0.16, 'the sea moves')
c(W(s, 'purpose'), 'stamp-hit', 0.28, 'ON PURPOSE')
c(W(s, 'Once'), 'ui-click-soft', 0.22, 'ONCE: A TAN =')
c(W(s, 'fields'), 'ui-click-soft', 0.22, 'FIELD WORK')
c(W(s, 'Now', 1), 'pop-reveal', 0.22, 'NOW: A TAN =')
c(W(s, 'afford'), 'ui-click-soft', 0.20, 'A DAY OFF')
c(W(s, 'probably'), 'ui-click-soft', 0.14, 'card: " is "')
c(W(s, 'Chanel'), 'ui-click-soft', 0.20, 'card: "— that Coco Chanel started the suntan craze —"')
c(W(s, 'myth'), 'stamp-hit', 0.30, 'card: "probably a myth."')
c(W(s, 'historian', shift=0.65), 'whoosh-soft', 0.24, 'the magazine scene')
c(W(s, 'magazine'), 'page-flip', 0.30, 'magazine straightens; UNSIGNED ARTICLE chip')
c(W(s, 'seventy'), 'stamp-hit', 0.26, '1971 stamp on the magazine')
c(W(s, 'work'), 'impact-soft', 0.32, 'The real reason: work.')
c(W(s, 'jobs'), 'whoosh-soft', 0.24, 'Week Strip 1928 office week')
ticks(s, 'jobs', 7, 12, 'Week Strip bars draw (+ INDOORS chip)', shift=0.1)
c(W(s, 'leisure'), 'sparkle-soft', 0.28, 'Sunday glows: THE BEACH; badge of leisure')
c(W(s, 'Then'), 'whoosh-soft', 0.24, 'Bell Labs scene: the cell outline')
c(W(s, 'nineteen', 3), 'ui-click-soft', 0.20, '25 APRIL 1954 chip')
c(W(s, 'Bell'), 'pop-reveal', 0.22, 'BELL LABS chip')
c(W(s, 'three'), 'ui-click-soft', 0.22, 'three scientists')
c(W(s, 'silicon'), 'pop-reveal', 0.24, 'the silicon cell')
c(W(s, 'six'), 'chime-reward', 0.30, '≈ 6 % counts up')
c(W(s, 'electricity'), 'warm-shimmer', 0.24, 'the cell glows; → into electricity')
c(W(s, 'Four', 2, shift=0.65), 'whoosh-soft', 0.24, 'Vanguard scene: Earth')
c(W(s, 'Four', 2, shift=0.9), 'pop-reveal', 0.22, 'Vanguard 1 appears in orbit')
c(W(s, 'Vanguard'), 'ui-click-soft', 0.20, '1958 · VANGUARD 1 chip')
c(W(s, 'radio'), 'scan-hum', 0.22, 'radio waves + chip')
c(W(s, 'still'), 'chime-magic', 0.24, 'STILL IN ORBIT TODAY')
c(W(s, 'learned'), 'piano-a-min', 0.30, 'cliffhanger band part 1')
c(W(s, 'fly'), 'launch-thump', 0.28, 'probe sets off toward the Sun')
c(W(s, 'straight'), 'ui-click-soft', 0.20, 'band part 3')

# ── Su2000
s = 'su09-2000'
c(W(s, 'Christmas'), 'ui-click-soft', 0.20, 'card: "on Christmas Eve 2024,"')
c(W(s, 'spacecraft'), 'ui-click-soft', 0.20, 'card: "a spacecraft passed"')
c(W(s, 'six'), 'pop-reveal', 0.24, 'card: 6.1 million km')
c(W(s, 'Sun', 1), 'ui-click-soft', 0.18, 'card: "from the Sun —"')
c(W(s, 'seven', 1), 'pop-reveal', 0.24, 'card: 700,000 km/h')
c(W(s, "NASA's", shift=0.27), 'whoosh-wind', 0.30, 'the probe dives through the corona')
c(W(s, 'Parker'), 'ui-click-soft', 0.22, 'Parker Solar Probe title')
c(W(s, 'fastest'), 'stamp-hit', 0.28, 'FASTEST OBJECT EVER BUILT')
c(W(s, 'flew'), 'whoosh-soft', 0.22, 'the corona flares around the probe')
c(W(s, 'atmosphere'), 'warm-shimmer', 0.26, 'THROUGH THE OUTER ATMOSPHERE')
c(W(s, 'Back'), 'whoosh-soft', 0.24, 'Day Clock today in')
ticks(s, 'Back', 5, 12, 'Day Clock segments draw', shift=0.1)
c(W(s, 'inside'), 'pop-reveal', 0.14, 'highlight: inside, under a roof')
c(W(s, 'screens'), 'pop-reveal', 0.14, 'highlight: screens')
c(W(s, 'sunscreen'), 'pop-reveal', 0.16, 'highlight moves to OUTSIDE — WITH SUNSCREEN')
c(W(s, 'International'), 'whoosh-soft', 0.24, 'IEA quote card')
c(W(s, 'twenty', 3), 'pop-reveal', 0.22, '2020 chip')
ticks(s, 'International', 3, 12, 'solar farm builds row by row', shift=0.1)
c(W(s, 'cheapest'), 'warm-shimmer', 0.28, 'panels light; quote part 2')
c(W(s, 'By'), 'ui-click-soft', 0.22, 'solar share bar appears')
c(W(s, 'seven', 2), 'chime-reward', 0.28, 'bar counts to 6.9 %')
c(W(s, 'And', 1, shift=0.33), 'whoosh-soft', 0.24, 'stored-sunlight scene (slow push-in)')
c(W(s, 'plant'), 'pop-reveal', 0.22, 'the plant')
c(W(s, 'meal'), 'pop-reveal', 0.22, 'the plate')
c(W(s, 'stored'), 'sparkle-soft', 0.28, 'sun → plant/plate; "stored sunlight"')
c(W(s, 'photosynthesis'), 'ui-click-soft', 0.22, 'PHOTOSYNTHESIS + equation')
c(W(s, 'touched'), 'piano-a-min', 0.30, 'cliffhanger band part 1')
c(W(s, 'never'), 'ui-click-soft', 0.20, 'band part 2')
c(W(s, 'is', 2, shift=-1.36), 'riser-soft', 0.30, '(riser into "as it is?")')
c(W(s, 'is', 2), 'pop-reveal', 0.24, 'band part 3: "as it is?"')

# ── SuReveal
s = 'su10-reveal'
c(S('SuReveal', 0.0), 'whoosh-reverse', 0.34, 'cut to the answer')
c(W(s, 'answer'), 'impact-deep-soft', 0.46, 'THE ANSWER')
c(W(s, 'fast'), 'pop-reveal', 0.24, 'LIGHT IS FAST')
c(W(s, 'instant'), 'pop-reveal', 0.24, 'BUT NOT INSTANT')
c(W(s, 'takes'), 'ui-send', 0.30, 'the photon crosses')
c(W(s, 'twenty'), 'clock-tick-soft', 0.30, '8 MIN 20 S')
c(W(s, 'fifty'), 'ui-click-soft', 0.20, '150 MILLION KM label')
c(W(s, 'So'), 'pop-reveal', 0.22, '"every sunrise you have seen:"')
c(W(s, 'old'), 'chime-magic', 0.30, '"already old"')
c(W(s, 'secret', shift=0.2), 'whoosh-soft', 0.26, 'cut-away Sun; THE SECRET')
c(W(s, 'core'), 'warm-shimmer', 0.28, 'the core glows; MADE IN THE CORE')
c(W(s, 'struggling'), 'pencil-scribble', 0.24, 'random-walk path scribbles out; A LONG FIGHT OUT')
c(W(s, 'NASA'), 'ui-click-soft', 0.18, 'NASA ESTIMATE note')
c(W(s, 'seventy'), 'pop-reveal', 0.26, '≈ 170,000 counts')
c(W(s, 'years'), 'impact-soft', 0.32, 'YEARS · CORE → SURFACE')
for tok in ('farms', 'cities', 'writing'):
    c(W(s, tok), 'trap-snap', 0.22, f'NO {tok.upper()}')
c(W(s, 'For'), 'whoosh-soft', 0.24, 'FIVE CENTURIES + axis draws + five year shells')
c(W(s, 'behave'), 'ui-click-soft', 0.20, '… OF CHANGING BEHAVIOUR')
for tok in ('celebrated', 'hid', 'split', 'chased', 'touched'):
    c(W(s, tok), 'pop-reveal', 0.24, f'verb card: {tok}')
c(W(s, 'The', 4), 'warm-shimmer', 0.26, 'the Sun appears')
c(W(s, 'change'), 'knock-solid', 0.28, 'THE SUN · UNCHANGED')
c(W(s, 'never'), 'whoosh-soft', 0.24, '"You have never seen the Sun as it is."')
c(W(s, 'was', 3, shift=-1.36), 'riser-soft', 0.34, '(riser into the payoff)')
c(W(s, 'was', 3), 'impact-deep-soft', 0.54, '"Only as it was." glows')
c(W(s, 'was', 3, shift=0.25), 'chime-reward', 0.36, '(payoff sparkle)')
c(W(s, 'ago'), 'ui-click-soft', 0.18, 'EIGHT MINUTES AGO')

# ── Su2100
s = 'su11-2100'
c(S('Su2100', 0.4), 'scan-hum', 0.18, 'PREDICTION header')
c(W(s, 'hundred', 1, shift=1.0), 'ui-click-soft', 0.22, 'header docks; PREDICTION · A SCENARIO, NOT A FACT tag')
c(W(s, 'twenty', 1), 'whoosh-soft', 0.16, 'gold underline sweeps under 2100')
c(W(s, 'That', 1), 'warm-shimmer', 0.18, 'an unrisen dawn: horizon + dashed Sun')
c(W(s, 'happened'), 'ui-click-soft', 0.20, 'THAT MORNING HAS NOT HAPPENED YET')
c(W(s, 'evidence'), 'pop-reveal', 0.22, 'STEP 1 · THE EVIDENCE')
c(W(s, 'Caltech'), 'pop-reveal', 0.20, 'CALTECH chip')
c(W(s, 'Maple'), 'ui-click-soft', 0.22, 'MAPLE title')
c(W(s, 'wirelessly'), 'ui-send', 0.28, 'power across the gap; chip')
c(W(s, 'aimed'), 'stream-soft', 0.22, 'signal beam heads down')
c(W(s, 'Pasadena'), 'pop-reveal', 0.24, 'rooftop receiver + chip')
c(W(s, 'tiny'), 'ui-click-soft', 0.20, 'TINY')
c(W(s, 'worked'), 'chime-reward', 0.28, 'IT WORKED')
c(W(s, 'fourteen'), 'page-flip', 0.28, 'IEA 2014 roadmaps')
c(W(s, 'sketched'), 'ui-click-soft', 0.20, '"A world where solar could make…"')
c(W(s, 'seven'), 'pop-reveal', 0.26, '27 % counts; bar fills')
c(W(s, 'fifty'), 'ui-click-soft', 0.20, '· BY 2050')
c(W(s, 'forecast'), 'stamp-hit', 0.32, 'NOT A FORECAST')
c(W(s, 'Put'), 'whoosh-soft', 0.24, 'scenario scene: MAPLE · 2023 and IEA · 2014 slide into the Earth')
c(W(s, 'scenario'), 'pop-reveal', 0.22, 'STEP 2 · ONE SCENARIO')
c(W(s, 'Power', 2), 'warm-shimmer', 0.28, 'collector ring forms')
c(W(s, 'orbit'), 'ui-click-soft', 0.18, 'collectors fill the ring + chip')
c(W(s, 'never'), 'ui-click-soft', 0.20, 'WHERE THE SUN NEVER SETS')
c(W(s, 'Cities'), 'pop-reveal', 0.24, 'sunlit city')
c(W(s, 'The', 5), 'whoosh-soft', 0.24, 'the Sun alone + "The Sun itself will not notice."')
c(W(s, 'NASA'), 'ui-click-soft', 0.20, 'NASA ESTIMATE label')
c(W(s, 'five'), 'chime-magic', 0.28, '≈ 5 billion years')
c(W(s, 'question'), 'ui-click-soft', 0.20, 'the question line')
c(W(s, 'twenty', 7), 'ui-click-soft', 0.18, '"in 2100."')
c(W(s, 'what'), 'ui-click-soft', 0.18, '"It is what we will have"')
c(W(s, 'learned'), 'warm-shimmer', 0.30, '"learned to do with it."')

# ── SuClose
s = 'su12-close'
c(S('SuClose', 0.0), 'whoosh-soft', 0.30, 'cut to the close')
c(W(s, 'risen'), 'ui-click-soft', 0.20, 'the first sunrise lights')
c(W(s, 'every'), 'sparkle-soft', 0.28, 'the wall of sunrises fills; caption')
c(W(s, 'So'), 'whoosh-reverse', 0.18, 'the wall dims')
c(W(s, 'When'), 'whoosh-soft', 0.24, 'the question')
c(W(s, 'purpose'), 'chime-magic', 0.32, '"on purpose?" glows')

# ── SuOutro
s = 'su13-outro'
c(S('SuOutro', 0.0), 'whoosh-wind', 0.32, 'cut to the outro')
c(W(s, 'This'), 'pop-reveal', 0.22, 'EPISODE 02')
c(W(s, 'Did', 1, shift=-0.2), 'ui-toggle-on', 0.26, 'logo switches on; wordmark')
c(W(s, 'The', 1), 'pop-reveal', 0.20, '"The Sun" title')
c(W(s, 'turn'), 'whoosh-soft', 0.24, 'lockup shrinks; prompt card')
ticks(s, 'century', 7, 12, 'heading + seven year chips', shift=0.2)
c(W(s, 'comments'), 'pop-reveal', 0.30, 'COMMENTS ↓')
c(W(s, 'end'), 'impact-soft', 0.32, 'COMMENT OF THE WEEK pill')
c(W(s, 'comment', 1), 'ui-click-soft', 0.22, '"best comment read on screen"')
c(W(s, 'right'), 'ui-click-soft', 0.20, 'card flash ("right here")')
c(W(s, 'subject'), 'sparkle-soft', 0.26, '"the subject you ask for most"')
c(W(s, 'episode', 3), 'pop-reveal', 0.20, '→ a future episode')
c(W(s, 'Dex-tee', shift=-0.1), 'sparkle-soft', 0.30, 'Dexty.live pill')
c(W(s, 'watch', 2), 'ui-click-soft', 0.20, 'WATCH')
c(W(s, 'collect'), 'ui-click-soft', 0.20, 'COLLECT')
c(W(s, 'play'), 'ui-click-soft', 0.20, 'PLAY')
c(W(s, 'sunrise'), 'ui-click-soft', 0.20, 'A SUNRISE')
c(W(s, 'like'), 'ui-click-soft', 0.34, 'Like')
c(W(s, 'share'), 'ui-send', 0.32, 'Share')
c(W(s, 'friend'), 'ui-click-soft', 0.20, 'THE FRIEND WHO NEVER MISSES ONE')
c(W(s, 'subscribe'), 'chime-reward', 0.42, 'Subscribe')
c(W(s, 'mystery'), 'sparkle-soft', 0.22, '? THE NEXT MYSTERY')
c(W(s, 'Next', 2), 'whoosh-wind', 0.30, 'NEXT · NO. 03')
c(W(s, 'school'), 'impact-soft', 0.34, 'SCHOOL')
c(W(s, 'class'), 'pop-reveal', 0.22, 'bell + question part 1')
c(W(s, 'fifteen'), 'ui-click-soft', 0.18, '"from 1500 to today —"')
c(W(s, 'classrooms'), 'ui-click-soft', 0.20, 'question part 2')
c(W(s, 'exist'), 'piano-a-min', 0.26, '"exist?"')
c(W(s, 'Ask', 2), 'chess-piece-thock', 0.38, 'ASK.')
c(W(s, 'Wonder'), 'chess-piece-thock', 0.38, 'WONDER.')
c(W(s, 'Repeat'), 'chess-piece-thock', 0.38, 'REPEAT.')

# ── second beat-map pass (gaps ≥ 2.9 s): each line below is a visual beat added in the TSX
for scene, tok, nth in [('su04-1500', 'fifteen', 1), ('su05-1610', 'sixteen', 1), ('su06-1700', 'seventeen', 1),
                        ('su07-1800', 'eighteen', 1), ('su08-1900', 'nineteen', 1), ('su09-2000', 'today', 1)]:
    c(W(scene, tok, nth), 'whoosh-soft', 0.16, 'gold underline sweeps under the year')
c(W('su04-1500', 'streets'), 'ui-click-soft', 0.18, 'house windows light up')
c(W('su05-1610', 'sunspots'), 'ui-click-soft', 0.16, 'card: "sunspots" turns gold')
c(W('su05-1610', 'letters'), 'ui-click-soft', 0.16, 'book card: · HIS LETTERS ON SUNSPOTS')
c(W('su06-1700', 'stay'), 'ui-click-soft', 0.18, 'sun + rays over the lady')
c(W('su07-1800', 'astronomer', shift=0.13), 'whoosh-soft', 0.18, 'header docks')
c(W('su07-1800', 'rainbow'), 'ui-click-soft', 0.18, 'card: "was not in the rainbow at all, but"')
c(W('su07-1800', 'stop'), 'ui-click-soft', 0.18, 'NO NEED TO STOP')
c(W('su08-1900', 'craze'), 'ui-click-soft', 0.18, 'card: "started the suntan craze —"')
c(W('su09-2000', 'live'), 'ui-click-soft', 0.18, 'band part 2: "We live on it."')
c(W('su10-reveal', 'deep'), 'whoosh-soft', 0.18, 'outer layers fade: into the core')
c(W('su10-reveal', 'began'), 'ui-click-soft', 0.18, 'WHEN IT SET OUT:')
c(W('su11-2100', 'twenty', 2), 'ui-click-soft', 0.20, '2023 chip; MAPLE scene')
c(W('su12-close', 'watched'), 'ui-click-soft', 0.18, '"watched it rise,"')
c(W('su13-outro', 'changed'), 'ui-click-soft', 0.18, 'IF THIS CHANGED HOW YOU SEE')

# ── third pass (after the voice re-take): cliffhanger parts and card clauses that land on their words
c(W('su04-1500', 'believes'), 'ui-click-soft', 0.16, 'card: "believes"')
c(W('su06-1700', 'light'), 'ui-click-soft', 0.18, 'band part 2: "there is a light"')
c(W('su06-1700', 'detect'), 'ui-click-soft', 0.18, 'band part 3: "our eyes cannot detect."')
c(W('su07-1800', 'spark', 2), 'ui-click-soft', 0.18, 'band part 2: "to turn that tiny spark"')
c(W('su07-1800', 'power'), 'ui-click-soft', 0.18, 'band part 3: "into power."')
c(W('su08-1900', 'Now', 2), 'ui-click-soft', 0.18, 'band part 2: "Now,"')
c(W('su09-2000', 'So'), 'ui-click-soft', 0.18, 'band part: "So why"')
c(W('su11-2100', 'whether'), 'ui-click-soft', 0.18, '"whether the Sun will be there"')

c(W('su14-endscreen', 'Pick', shift=-0.2), 'ui-click-soft', 0.18, 'end screen: Comment below / best one is read next episode')
c(W('su06-1700', 'prism'), 'sparkle-soft', 0.18, 'the prism glints')
