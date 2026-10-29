import copy, importlib.util, json, os, sys
G = 0.3
def sc(id, shot, chunks, pauses=None, floor=None, even=False):
    # even_pace stays off (No. 05, 2026-10-14): the pre-flight compares articulation rate and each chunk's own pace target.
    ch = [{"text": t, "pace": p, "speed": 1.0, **(x or {})} for t, p, x in chunks]
    d = {"id": id, "shot": shot, "text": " ".join(c["text"] for c in ch), "chunks": ch}
    if floor: d["floor"] = floor
    pz = {"min_sentence_gap": G}
    if pauses: pz["after"] = [{"word": w, "nth": n, "add": a} for w, a, n in pauses]
    if even and len(ch) > 1: pz["even_pace"] = True
    d["pauses"] = pz
    return d
DYK = {"floor": 0.85}
PAY = {"payoff": True}
# Text = work/narration-draft.md v1 (STORY.md §4, approved 2026-10-29). Wording changes for TTS are logged in work/HANDOFF.md.
# Pauses are (word, add_s, nth): nth counts that word within the scene ("now?" appears twice in most eras).
S = [
 sc('lt01-hook', 'LtHook', [
  ("Last time, I left you with a question. What happened when we switched the night off? Here's what we know. In Britain, light now costs less than one three-thousandth of what it did in eighteen hundred. You'd think we'd pocket the savings.", 3.2, None)],
  pauses=[], floor=0.95),
 sc('lt02-question', 'LtHook', [
  ("We didn't. And tonight, above your house, something is slowly disappearing. Did you know that, at today's rate, a child born under two hundred and fifty stars will see about a hundred by the time they're eighteen?", 3.1, None)],
  pauses=[("didn't.", 0.4, 1)], floor=0.95),
 sc('lt00-welcome', 'LtWelcome', [
  ("Welcome back to Did You Know That. Episode seven. You know the rule. Here's your guess. Think of ten people, anywhere on Earth. How many of them live under a night sky that our lights have brightened? Two? Five? More than eight? Guess in the comments, right now. Then stay to the end, and check your guess.", 2.9, None)],
  pauses=[('eight?', 0.4, 1)], floor=0.95),
 sc('lt03-promise', 'LtPromise', [
  ("Six mornings, from fifteen hundred to today, and then one more, in twenty one hundred. In each one, you wake up and someone has found a new way to beat the dark. You'll see what one hour of light costs you. And at the end, you'll find out what we lost when we won.", 3.1, None)],
  pauses=[]),
 sc('lt04-1500', 'Lt1500', [
  ("You wake up in fifteen hundred, in a market town in Flanders. It's late autumn. The light is going, and the church bell starts to ring.", 3.0, None),
  ('Did you know that this bell has a name, and the name is curfew? It comes from the old French for cover the fire. When you hear it, you bank the hearth and the day is over.', 3.1, DYK),
  ("Here's your evening. Work stops at sunset. A tallow candle, made from sheep fat, smokes and stinks, and it costs too much to burn for long. So most nights you use a rushlight, a dried rush dipped in grease. Depending on its length, it lasts a few minutes, or an hour at most. Beeswax is for the church and the rich.", 2.8, None),
  ("What does one hour of light cost you? One ordinary bulb's worth, for one hour. An economist, William Nordhaus, worked it out. In ancient Babylon, about forty one hours of work. And by eighteen hundred, in America, still more than five. In more than three thousand years, the price barely moved.", 3.0, None),
  ('So what is light to you? A luxury. You make it yourself, and you make it last. For three hundred years, the dark wins. Then a man in London sets the air on fire.', 2.9, DYK)],
  pauses=[('curfew?', 0.35, 1), ('you?', 0.25, 1), ('you?', 0.35, 2)]),
 sc('lt05-1807', 'Lt1807', [
  ("You wake up in eighteen oh seven, on Pall Mall, in London. It's a warm June evening, and a crowd is staring at a row of iron posts.", 3.0, None),
  ("Did you know that the first gas lights on a London street were lit for the king's birthday? A German-born businessman named Frederick Winsor burns gas made from coal, piped along the street. No wick. No wax.", 3.1, DYK),
  ("Here's your evening. The shops stay open after dark. Mill owners start to see something new. A factory that never has to stop at sunset.", 2.8, None),
  ('Five years later, in eighteen twelve, Parliament grants a charter to the Gas Light and Coke Company, the first gas company in the world. Light runs under the street, to your door, and arrives with a bill.', 2.8, None),
  ('So what is light now? A service. It comes to you, through a pipe. But across the ocean, the best light in America still comes from the head of a whale.', 2.9, DYK)],
  pauses=[('posts.', 0.4, 1), ('birthday?', 0.35, 1), ('now?', 0.35, 1)]),
 sc('lt06-1859', 'Lt1859', [
  ("You wake up in eighteen fifty nine, in Titusville, Pennsylvania. It's August. The air smells of mud and tar, and men are cheering around a wooden derrick.", 3.0, None),
  ('Did you know that a historian later wrote that oil gave kerosene to the world, and life to the few remaining whales? Before this, whalers sailed for years to fill their lamps.', 3.1, DYK),
  ("Here's your evening. A Canadian doctor, Abraham Gesner, has already shown how to make a lamp fuel called kerosene. Now Edwin Drake has struck oil, sixty nine feet down, just before his money ran out. Kerosene floods the shops. On your table there's a lamp with a glass chimney and a steady flame, and the evening gets hours back. You read. You sew. The children do their lessons.", 2.8, None),
  ('What does one hour of light cost you now? By eighteen seventy, in America, about twenty minutes of work.', 3.0, None),
  ('So what is light now? A liquid. Something you buy in a can. Twenty three years later, someone takes the flame away completely.', 2.9, DYK)],
  pauses=[('whales?', 0.35, 1), ('now?', 0.25, 1), ('now?', 0.35, 2)]),
 sc('lt07-1882', 'Lt1882', [
  ("You wake up in eighteen eighty two, in lower Manhattan. It's the fourth of September, a Monday afternoon. Horses, newspapers, the clatter of the street.", 3.0, None),
  ("Did you know that when Thomas Edison's lights came on, he wasn't at the power station? He was standing in the office of the banker J. P. Morgan.", 3.1, DYK),
  ("Here's your afternoon. At about three o'clock, an engineer on Pearl Street closes a switch. A few blocks of offices light up, about four hundred lamps, and not one of them has a flame. The glowing bulb was the easy part. Edison sold the rest. Generators, copper under the street, meters, and investors willing to bet a fortune on it.", 2.8, None),
  ('What does one hour of light cost you now? By nineteen hundred, about thirteen minutes of work.', 3.0, None),
  ("So what is light now? A network. You plug into a system you'll never see. But that bulb turns most of its power into heat. The fix takes more than a hundred years, and one colour nobody can make.", 2.9, DYK)],
  pauses=[('station?', 0.35, 1), ('now?', 0.25, 1), ('now?', 0.35, 2)]),
 sc('lt08-1993', 'Lt1993', [
  ("You wake up in nineteen ninety three, in Tokushima, on Japan's island of Shikoku. Inside a small company lab, an engineer is staring at a chip.", 3.0, None),
  ("Did you know that the missing colour of light was blue? Red and green glowing chips had been around for decades. Without blue, you couldn't make white.", 3.1, DYK),
  ("Here's your morning. The engineer, Shuji Nakamura, has made a bright blue light from a crystal. Add a yellow coating, and you get white light from a chip. No fire. No glowing wire. Very little heat. Twenty one years later, he and two Japanese scientists share the Nobel Prize for it.", 2.8, None),
  ('What does one hour of light cost you now? In nineteen ninety two, with an energy-saving bulb, less than half a second of work.', 3.0, None),
  ('So what is light now? A crystal. Light without fire. So when light costs almost nothing, what do we do with it?', 2.9, DYK)],
  pauses=[('blue?', 0.35, 1), ('now?', 0.25, 1), ('now?', 0.35, 2)]),
 sc('lt09-today', 'LtToday', [
  ('You wake up today. Well, tonight. Go to your window and count the lights you can see. Streetlights, signs, the office that never switches off.', 3.0, None),
  ("Did you know that more than a third of all people can't see the Milky Way from home? In Europe, six in ten. In North America, nearly eight in ten.", 3.1, DYK),
  ("Here's your night. Nobody decided this. In Britain, by the year two thousand, each person was using about six and a half thousand times more light than in eighteen hundred. Every time the price fell, we bought more. More rooms, more hours, more streets.", 2.8, None),
  ("And it's speeding up. In twenty twenty three, scientists used more than fifty thousand reports from ordinary people counting stars. They found the night sky getting brighter by almost ten percent a year.", 2.8, None),
  ("So what is light now? Too cheap to switch off. So, what happened when we switched the night off? You're about to find out.", 2.9, DYK)],
  pauses=[('home?', 0.35, 1), ('now?', 0.35, 1)]),
 sc('lt10-reveal', 'LtReveal', [
  ("Here's the answer. We didn't save the light. We spent it. All of it. Every time light got cheaper, we used more, until it filled the sky.", 3.0, None),
  ('So, your guess. Out of every ten people on Earth, more than eight now live under a sky our lights have brightened. In the United States and Europe, almost everyone. How close were you?', 3.0, None),
  ('Now walk down the ladder with me. In fifteen hundred, light was a luxury. Then a service, through a pipe. Then a liquid, in a can. Then a network. Then a crystal, light without fire. And today, light is too cheap to switch off.', 2.8, PAY),  # 2.5 -> 2.8 (2026-10-29): Brian's natural pace here, 4 tries at 2.5 failed
  ('In fifteen hundred, the scarce thing was light. Today, the scarce thing is the dark.', 3.2, PAY)],  # 2.5 -> 3.2 (2026-10-29): natural pace 3.1-3.4, 4 tries at 2.5 failed
  # the ladder walks down one rung per beat, and the payoff gets a beat before each half (payoff gate <= 2.8 w/s;
  # No. 06's answer runs at ~3.2 w/s). Free: pauses only, no re-voice.
  pauses=[('you?', 0.45, 1), ('luxury.', 0.35, 1), ('pipe.', 0.35, 1), ('can.', 0.35, 1), ('network.', 0.35, 1),
          ('fire.', 0.4, 1), ('light.', 0.7, 2), ('today,', 0.45, 2)]),
 sc('lt11-2100', 'Lt2100', [
  ("So what could the night look like in twenty one hundred? That morning hasn't happened yet. But we can follow the evidence.", 2.9, None),
  ('Some places have already started protecting the dark. Since twenty thirteen, France has told shops to switch off their window lights by one in the morning. Tucson, in Arizona, has had rules on outdoor lighting since nineteen seventy two, to keep the sky dark for its observatories.', 2.9, None),
  ("So here's one scenario. Not a fact. If the sky keeps brightening, darkness becomes something we have to protect, the way we once protected forests and coasts. A child in twenty one hundred might see the Milky Way for the first time on a school trip, in a place kept dark on purpose.", 2.9, None),
  ('And remember the bell from fifteen hundred? Cover the fire. In twenty one hundred, it might ring again. Only this time, it means cover the light.', 3.0, DYK)],
  pauses=[('hundred?', 0.3, 1), ('fact.', 0.25, 1)]),
 sc('lt12-close', 'LtClose', [
  ('Tonight, switch off one light and look up. How many stars can you count?', 3.3, DYK)],
  pauses=[]),
 sc('lt13-outro', 'LtOutro', [
  ("This was Did You Know That, episode seven. Light. Now it's your turn. Streetlights or stars. If you had to give one up, which would it be, and why? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen. And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every episode, collect the fact cards, and play the guessing game.", 3.15, None),
  ('If this changed how you see your light switch, like it. Share it with the friend who leaves every light on. And subscribe, so the next mystery finds you.', 3.15, None)],
  pauses=[('why?', 0.35, 1)], floor=0.95),
 sc('lt13b-next', 'LtOutro', [
  ('Next time: weight. In fifteen hundred, a heavy body could be a sign of wealth. Today, one in seven people on Earth lives with obesity. So how did plenty turn into a problem?', 3.0, None)],
  pauses=[], floor=0.95),
 sc('lt13c-signoff', 'LtOutro', [
  ('Ask...', 0, None),
  ('Wonder...', 0, None),
  ('Repeat.', 0, None)],
  pauses=[('Ask...', 0.33, 1), ('Wonder...', 0.36, 1)], floor=0.95),
 sc('lt14-endscreen', 'LtOutro', [
  ('Next time... this could be your comment. Pick a mystery. And I will see you there.', 3.1, None)],
  pauses=[], floor=0.95),

]
BY_ID = {s["id"]: s for s in S}
BY_ID["lt10-reveal"]["pauses"]["min_sentence_gap"] = 0.35
BY_ID["lt14-endscreen"]["pauses"]["min_sentence_gap"] = 0.42
RISKY = ["Flanders", "curfew", "tallow", "rushlight", "Babylon", "Nordhaus", "Pall", "Mall", "Winsor", "Parliament",
         "Titusville", "Gesner", "kerosene", "derrick", "Drake", "Manhattan", "Morgan", "Tokushima", "Shikoku", "Nakamura",
         "Tucson", "observatories", "Dex-tee", "three-thousandth", "lead", "lumen"]
VOICE = "Brian (nPczCjzI2devNBz1zQrb), eleven_flash_v2_5 · stability .32 / similarity .85 / style .45"
VERSION = "v1 2026-10-29 (No. 07 Light)"
# lt13c-signoff: same text, pace and voice as No. 06's me13c-signoff, so its three cached chunk takes are reusable.
# lt14-endscreen: same text and voice as No. 06's me14-endscreen (STORY fallback line).


def load_gen_voice():
    """gen_voice.py beside this file, loaded by path (never a same-named module from another episode)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen_voice.py")
    spec = importlib.util.spec_from_file_location("dyk07_gen_voice", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def accepted_speeds(old, g):
    return {(sc["id"], c["text"], c.get("pace", g.PACE_TARGET)): c["speed"]
            for sc in old.get("scenes", []) for c in g.chunks_of(sc) if "speed" in c}


def with_speeds(doc, prev, g):
    """Copy of doc keeping the speeds that passed: the chunk cache first, else the existing script (same text)."""
    out = copy.deepcopy(doc)
    for sc in out["scenes"]:
        for k, c in enumerate(sc["chunks"]):
            if c.pop("keep_speed", False):   # a deliberate starting speed (David 2026-10-22): keep it
                continue
            meta = g.chunk_key(sc["id"], k, c) + ".json"
            if os.path.exists(meta):
                c["speed"] = json.load(open(meta))["speed"]
            elif (sc["id"], c["text"], c["pace"]) in prev:
                c["speed"] = prev[(sc["id"], c["text"], c["pace"])]
            else:
                same = [v for (i, t, _), v in prev.items() if i == sc["id"] and t == c["text"]]
                if same:
                    c["speed"] = same[0]
    return out


def main(path):
    g = load_gen_voice()
    old = json.load(open(path)) if os.path.exists(path) else {"scenes": []}   # read BEFORE overwriting
    doc = with_speeds({"voice": VOICE, "version": VERSION, "risky_words": RISKY, "scenes": S}, accepted_speeds(old, g), g)
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w") as f:
        json.dump(doc, f, indent=2)
    print(sum(len(c["text"]) for s in S for c in s["chunks"]), "chars;", sum(len(c["text"].split()) for s in S for c in s["chunks"]), "words")


if __name__ == "__main__":
    main(sys.argv[1])
