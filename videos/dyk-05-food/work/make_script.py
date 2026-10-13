import copy, importlib.util, json, os, sys
G = 0.3
def sc(id, shot, chunks, pauses=None, floor=None, even=True):
    ch = [{"text": t, "pace": p, "speed": 1.0, **(x or {})} for t, p, x in chunks]
    d = {"id": id, "shot": shot, "text": " ".join(c["text"] for c in ch), "chunks": ch}
    if floor: d["floor"] = floor
    pz = {"min_sentence_gap": G}
    if pauses: pz["after"] = [{"word": w, "nth": 1, "add": a} for w, a in pauses]
    if even and len(ch) > 1: pz["even_pace"] = True
    d["pauses"] = pz
    return d
DYK = {"floor": 0.85}
PAY = {"payoff": True}
# Text = STORY.md §2/§4/§4b/§5-§7 (approved 2026-10-13). Wording changes for TTS are logged in work/HANDOFF.md.
S = [
 sc("fd01-hook", "FdHook", [
  ("Last time, I left you with a question. What will you be eating in twenty one hundred? In fifteen hundred, historians estimate food took up most of a working family's budget. Today, there's more food than ever.", 3.2, None)], floor=0.95),
 sc("fd02-question", "FdHook", [
  ("And yet, here's the strange part. Did you know that today, about one in five deaths around the world is linked to diet? So did food give us our longer lives? Or is it taking some of those years back?", 3.5, None)],
  pauses=[("diet?", 0.4)], floor=0.95),
 sc("fd00-welcome", "FdWelcome", [
  ("Welcome back to Did You Know That. Episode five. You know the rule. Here's your guess. In eighteen hundred, life expectancy at birth, worldwide, was about twenty nine years. What about a baby born today? Guess in the comments, right now. Then stay to the end, and check your guess.", 3.15, None)],
  pauses=[("today?", 0.4)], floor=0.95),
 sc("fd03-promise", "FdPromise", [
  ("Seven mornings, from fifteen hundred to twenty one hundred. In each one, you wake up somewhere new. You'll see what's on your plate, what it does to your body, and how long you get to live. And at the end, you'll find out what really gave us our extra years.", 3.1, None)]),
 sc("fd04-1500", "Fd1500", [
  ("You wake up in fifteen hundred, in a village in Flanders. The bread oven's warm, and the kitchen smells of rye and smoke.", 3.0, None),
  ("Did you know that here, on up to four days in ten, eating meat is against the rules? Fridays. Lent. Advent. The Church calls them fast days.", 2.9, DYK),
  ("Here's your plate. Bread at almost every meal. Porridge, peas and beans. Beer to drink. Dried fish on fast days. Most of what your family spends goes on food. Seventy to eighty percent. When the harvest fails, bread prices jump, and people go hungry.", 3.0, None),
  ("How long do you live? In England, just across the sea, a newborn could expect about thirty five years. Mostly because so many children died. If you made it to thirty, you had a fair chance of reaching sixty.", 3.0, None),
  ("So what is food to you? Fuel. Enough to survive the day. Remember those fast days. They come back at the end. And at sea, on the longest voyages, sailors start falling apart.", 2.9, DYK)],
  pauses=[("rules?", 0.35), ("live?", 0.25), ("you?", 0.35)]),
 sc("fd05-1747", "Fd1747", [
  ("You wake up in seventeen forty seven, aboard HMS Salisbury, a British warship on patrol.", 3.0, None),
  ("Did you know that the cure for sailors' worst disease was found this year, and the navy waited almost fifty years to use it?", 3.4, DYK),
  ("Here's your plate. Every day, a pound of hard biscuit and a gallon of beer. Salt beef or pork, dried peas, oatmeal, a little cheese. Almost nothing fresh. After weeks at sea, men get scurvy. Bleeding gums. Old wounds opening up.", 2.6, None),
  ("The ship's surgeon, James Lind, splits twelve sailors with scurvy into pairs, and gives each pair something different. Cider. Vinegar. And one pair gets two oranges and a lemon a day.", 2.7, None),
  ("So what is food now? Medicine. The right food can cure you. On land in Britain, a newborn could still expect fewer than forty years.", 3.2, None),
  ("The navy finally handed out lemon juice in seventeen ninety five. A century later, in Japan, another missing piece is making sailors sick.", 2.9, DYK)],
  pauses=[("it?", 0.35), ("now?", 0.35)]),
 sc("fd06-1884", "Fd1884", [
  ("You wake up in eighteen eighty four, at Shinagawa, on Tokyo Bay. A training ship called the Tsukuba is getting ready to sail.", 3.0, None),
  ("Did you know that on a voyage like this one, the year before, almost half the crew got sick from what they ate? On the ship Ryujo, a hundred and sixty nine men got beriberi. Twenty five died.", 3.3, DYK),
  ("Here's a sailor's plate. White rice. Rice was free. Everything else cost money. A navy doctor, Takaki Kanehiro, measures what the men eat, and changes the menu. More barley, meat, milk, bread and vegetables.", 3.0, None),
  ("On the Tsukuba, fourteen men get sick. None die. And the fourteen? They had not eaten the new food.", 3.0, None),
  ("So what is food now? Something to measure. What's inside it matters. Japan's first life tables give a newborn about forty three years. And Japanese men born back then? About fifteen centimetres shorter than men born a century later.", 2.9, None),
  ("Decades later, it gets a name. A vitamin. But knowing what's missing doesn't put it on a poor family's plate.", 2.9, DYK)],
  pauses=[("ate?", 0.35), ("fourteen?", 0.3), ("now?", 0.35)]),
 sc("fd07-1915", "Fd1915", [
  ("You wake up in nineteen fifteen, on a prison farm in Mississippi. Eleven men are lining up for breakfast.", 3.0, None),
  ("Did you know that doctors made healthy men sick here, on purpose, by feeding them a poor Southern family's ordinary diet? The volunteers were promised a pardon.", 2.9, DYK),
  ("Here's the plate. Cornbread and grits. Fatty salt pork. Molasses. Hardly any milk, fresh meat or greens. After about five months, around half of the men have pellagra. Rashes, stomach trouble, confusion, even death.", 2.5, None),
  ("By one widely quoted estimate, it killed around a hundred thousand people across the South. The doctor, Joseph Goldberger, shows pellagra isn't caught like a germ. It comes from something missing in the diet.", 3.0, None),
  ("Later, it's named. Niacin, a B vitamin. In the nineteen forties, it's added to flour and bread across much of America. With that, better wages and more varied food, pellagra fades.", 3.0, None),
  ("So what is food now? Something we fix. Add what's missing, and a disease disappears. In America that year, a newborn could expect about fifty five years. But fixing food only helps if there's enough of it. And in India, there isn't.", 2.9, DYK)],
  pauses=[("diet?", 0.35), ("now?", 0.35)]),
 sc("fd08-1966", "Fd1966", [
  ("You wake up in nineteen sixty six, in a village in Punjab. Everyone's watching the sky for rain.", 3.0, None),
  ("Did you know that the year before, India's prime minister asked the whole country to skip one meal a week? Lal Bahadur Shastri. War and drought had left too little grain.", 2.9, DYK),
  ("Here's your plate. Flatbread, lentils, maybe some vegetables. Across India, there's only enough food for about two thousand calories a person a day. A newborn here could expect about forty six years.", 2.6, None),
  ("So India imports eighteen thousand tonnes of wheat seed from Mexico. Short, sturdy plants, bred by Norman Borlaug's team. They need water, and lots of fertiliser, made in factories from nitrogen in the air. Within a few years, India's wheat harvest jumps to seventeen million tonnes.", 3.0, None),
  ("So what is food now? Enough, at last. Grown by the tonne. Today, a newborn in India can expect about seventy two years. And around the world, food has never been more plentiful. Which brings a brand new problem.", 2.9, DYK)],
  pauses=[("week?", 0.35), ("now?", 0.35)]),
 sc("fd09-today", "FdToday", [
  ("You wake up today, in São Paulo. Motorbikes buzz past with food deliveries.", 3.0, None),
  ("Did you know that Brazil's official food guide tells people to eat at regular times, and, whenever they can, with other people?", 2.9, DYK),
  ("Here's your plate. Rice and beans, still on most plates in Brazil. And more and more ultra-processed food. Soft drinks. Packaged snacks. In Brazil, it's about a fifth of the calories people eat. In the United States, more than half.", 3.0, None),
  ("The guide's golden rule? Choose fresh food and home-made meals over ultra-processed food. And in most countries now, more adults live with obesity than are underweight. In Brazil, a newborn can expect about seventy six years.", 3.0, None),
  ("So what is food to you? Too much of some things. Too little of others. So here's the question you came for. Food helped us live longer. Is it now taking some of those years back?", 2.9, DYK)],
  pauses=[("people?", 0.35), ("rule?", 0.25), ("you?", 0.35)]),
 sc("fd10-reveal", "FdReveal", [
  ("Here's the answer. Food gave us years. But it didn't do it alone. And now, the danger has flipped.", 3.1, None),
  ("Enough calories and the right nutrients beat scurvy, beriberi and pellagra, and helped us grow taller. A doctor, Thomas McKeown, argued that better food was the main reason we started living longer. Many historians disagree.", 3.0, None),
  ("In big American cities, one study found clean water alone was behind nearly half the drop in deaths, in the early nineteen hundreds. Sewers, vaccines and medicine did much of the rest.", 3.0, None),
  ("And today? About one in five deaths worldwide is linked to diet. The biggest risks? Too much salt. Too few whole grains. Too little fruit.", 2.9, None),
  ("And your guess? In eighteen hundred, about twenty nine years. Today, worldwide, about seventy three. How close were you?", 3.0, None),
  ("Now walk down the ladder with me. In fifteen hundred, food was fuel. Then, medicine. Then, something to measure. Then, something we fix. Then, enough, at last. Today, too much.", 2.75, PAY),
  ("In fifteen hundred, food took most of your money, and hunger was the danger. Today, the danger is what we choose to eat.", 2.8, PAY)],
  pauses=[("today?", 0.3), ("risks?", 0.25), ("guess?", 0.3), ("you?", 0.45)]),
 sc("fd11-2100", "Fd2100", [
  ("So what will you be eating in twenty one hundred? That morning hasn't happened yet. But we can follow the evidence.", 3.0, None),
  ("The United Nations expects life expectancy worldwide to reach about eighty two by twenty one hundred. The I-P-C-C says warming has already slowed the growth of farm productivity, over the past fifty years.", 2.9, None),
  ("And the EAT Lancet Commission says a diet that's mostly plants, with red meat about once a week, could prevent around fifteen million early deaths a year.", 2.9, None),
  ("So here's one scenario. Not a fact. By twenty one hundred, your plate could be mostly plants. Meat could be a once a week treat. And if the harvests hold, the average life could stretch past eighty.", 3.2, None),
  ("In fifteen hundred, the Church decided which days you couldn't eat meat. In twenty one hundred, the reason might be your heart. And the planet.", 3.0, DYK)],
  pauses=[("hundred?", 0.3), ("fact.", 0.25)]),
 sc("fd12-close", "FdClose", [
  ("Tonight, look at your plate. Which part of it is buying you more years?", 3.3, DYK)], pauses=None),
 sc("fd13-outro", "FdOutro", [
  ("This was Did You Know That, episode five. Food. Now it's your turn. Which century's kitchen would you eat in? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen. And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every episode, collect the fact cards, and play the guessing game.", 3.15, None),
  ("If this changed how you see what's on your plate, like it. Share it with the friend who always cooks for you. And subscribe, so the next mystery finds you.", 3.15, None)],
  pauses=[("in?", 0.25)], floor=0.95),
 sc("fd13b-next", "FdOutro", [
  ("Next time: medicine. In seventeen ninety nine, George Washington's doctors drained, by some estimates, around two fifths of his blood. So how did we find out what really heals us?", 3.0, None)], floor=0.95),
 sc("fd13c-signoff", "FdOutro", [
  ("Ask...", 0, None), ("Wonder...", 0, None), ("Repeat.", 0, None)],
  pauses=[("Ask...", 0.33), ("Wonder...", 0.36)], floor=0.95, even=False),
 sc("fd14-endscreen", "FdOutro", [
  ("Next time... this could be your comment. Pick a mystery. And I will see you there.", 3.1, None)], floor=0.95),
]
S[11]["pauses"]["min_sentence_gap"] = 0.3
S[4]["pauses"]["min_sentence_gap"] = 0.3
S[16]["pauses"]["min_sentence_gap"] = 0.42
S[9]["pauses"]["min_sentence_gap"] = 0.3
S[10]["pauses"]["min_sentence_gap"] = 0.35
RISKY = ["Flanders", "rye", "porridge", "Lent", "Advent", "HMS", "Salisbury", "scurvy", "Lind", "Cider", "Shinagawa",
         "Tsukuba", "Ryujo", "beriberi", "Takaki", "Kanehiro", "barley", "pellagra", "grits", "Molasses", "Goldberger",
         "Niacin", "Punjab", "Lal", "Bahadur", "Shastri", "Borlaug", "tonnes", "tonne", "São", "Paulo", "McKeown",
         "EAT", "Lancet", "I-P-C-C", "Dex-tee", "ate", "flour", "fewer"]
VOICE = "Brian (nPczCjzI2devNBz1zQrb), eleven_flash_v2_5 · stability .32 / similarity .85 / style .45"
VERSION = "v1 2026-10-13 (No. 05 Food)"
# fd14-endscreen reuses No. 04's mo14-endscreen take (itself No. 03's sc14-endscreen) unchanged: same text, same voice,
# same settings (STORY §7.2 fallback — No. 04 has no comments yet).


def load_gen_voice():
    """gen_voice.py beside this file, loaded by path (never a same-named module from another episode)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen_voice.py")
    spec = importlib.util.spec_from_file_location("dyk05_gen_voice", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def accepted_speeds(old, g):
    """{(scene id, chunk text, pace): speed} from an existing script.json, scene-level `speed` included
    (gen_voice.chunks_of turns a chunk-less scene into its one chunk)."""
    return {(sc["id"], c["text"], c.get("pace", g.PACE_TARGET)): c["speed"]
            for sc in old.get("scenes", []) for c in g.chunks_of(sc) if "speed" in c}


def with_speeds(doc, prev, g):
    """Copy of doc keeping the speeds that passed: the chunk cache first, else the existing script (same text)."""
    out = copy.deepcopy(doc)
    for sc in out["scenes"]:
        for k, c in enumerate(sc["chunks"]):
            meta = g.chunk_key(sc["id"], k, c) + ".json"
            if os.path.exists(meta):
                c["speed"] = json.load(open(meta))["speed"]
            elif (sc["id"], c["text"], c["pace"]) in prev:
                c["speed"] = prev[(sc["id"], c["text"], c["pace"])]
    return out


def main(path):
    g = load_gen_voice()
    old = json.load(open(path)) if os.path.exists(path) else {"scenes": []}   # read BEFORE overwriting
    doc = with_speeds({"voice": VOICE, "version": VERSION, "risky_words": RISKY, "scenes": S}, accepted_speeds(old, g), g)
    with open(path, "w") as f:
        json.dump(doc, f, indent=2)
    print(sum(len(c["text"]) for s in S for c in s["chunks"]), "chars;", sum(len(c["text"].split()) for s in S for c in s["chunks"]), "words")


if __name__ == "__main__":
    main(sys.argv[1])
