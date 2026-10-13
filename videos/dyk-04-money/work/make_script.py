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
S = [
 sc("mo01-hook", "MoHook", [
  ("Last time, I left you with a question. Did school ever teach you what money actually is? Take a note out of your wallet. Any note. It's paper, or plastic, and a bit of ink. And still, you'd trade hours of your life for a few of them.", 3.2, None)], floor=0.95),
 sc("mo02-question", "MoHook", [
  ("And here's the strange part. Did you know that most money today isn't paper, or metal, or anything you could ever hold? So what is it, actually?", 3.3, None)], floor=0.95),
 sc("mo00-welcome", "MoWelcome", [
  ("Welcome back to Did You Know That. Episode four. You know the rule. Here's your guess. In Britain, out of every hundred pounds people have, how many exist as real notes and coins? Guess in the comments, right now. Then stay to the end, and check your guess.", 3.15, None)],
  pauses=[("coins?", 0.4)], floor=0.95),
 sc("mo03-promise", "MoPromise", [
  ("Seven mornings, from fifteen hundred to twenty one hundred. In each one, you wake up somewhere new, with money in your hand. Or on your phone. You start with money you could drink. You end with money that might be nothing but code. And at the end, you'll find out what money really is.", 3.15, None)]),
 sc("mo04-1500", "Mo1500", [
  ("You wake up in fifteen hundred, in Tenochtitlan, the island city of the Aztecs. Canoes bump along the canals. The market's already loud, and it smells of chilli and wood smoke.", 3.0, None),
  ("Did you know that here, money grows on trees? Cacao beans. The same beans that make chocolate.", 2.9, DYK),
  ("A price list from a few decades later says it plainly. One ripe avocado, one bean. A good turkey hen, a hundred. Bigger deals get paid in cotton cloaks. And a Spanish friar wrote about sellers who faked cacao beans. Forgery. With chocolate.", 3.0, None),
  ("So what is money to you? Something useful. Something you could even drink. You might have heard that money was invented because swapping goats for grain got awkward. Anthropologists say they've never found a whole society that ran on barter alone. People have always found something to count with.", 3.0, None),
  ("But beans are bulky, and they rot. Across the ocean, one country's money has the opposite problem. It's so heavy, you need a cart.", 2.9, DYK)],
  pauses=[("smoke.", 0.2), ("trees?", 0.35), ("you?", 0.35)]),
 sc("mo05-1661", "Mo1661", [
  ("You wake up in sixteen sixty one, in Stockholm. The harbour's frozen, and a sledge scrapes past your window, loaded with copper.", 3.0, None),
  ("Did you know that Sweden's biggest coin weighed almost twenty kilos? It's a copper plate. You don't put it in your pocket. You put it on a cart.", 2.9, DYK),
  ("So a banker called Johan Palmstruch has an idea. Leave your copper at his bank, and take a sheet of paper instead. It says your copper is waiting for you. These are the first real banknotes in Europe.", 3.0, None),
  ("So what is money now? A promise. Written on paper. Remember that word, promise. It comes back at the end.", 2.9, None),
  ("People love the notes. So the bank prints more, and lends more, than it has copper to pay back. When people come for their copper, it isn't there. The bank fails. Palmstruch is sentenced to death. He's spared, and dies a few years later.", 3.0, None),
  ("Paper only works while people believe in it. And in the next century, one man will push that belief further than anyone ever had.", 2.9, DYK)],
  pauses=[("now?", 0.35), ("promise.", 0.25)]),
 sc("mo06-1720", "Mo1720", [
  ("You wake up in seventeen twenty, in Paris. The street smells of horses, and everyone's talking about paper.", 3.0, None),
  ("Did you know that this year, France made it illegal to own more than five hundred livres in gold or silver? The government wanted you to trust paper. By law.", 2.9, DYK),
  ("The man behind it is John Law. A Scottish gambler. Like Palmstruch, he was once sentenced to death, for killing a man in a duel. Now he runs France's money.", 3.0, None),
  ("One narrow street is packed, day and night. People are buying shares in Law's Mississippi Company. In about a year and a half, the price has gone up about forty times. The story goes that a hunchback rents out his back, as a writing desk.", 3.0, None),
  ("So what is money now? A belief. It's worth whatever everyone believes it's worth. Until they don't. By December, the shares have crashed. The notes are losing value. And Law escapes France.", 2.9, None),
  ("For the next hundred years, people want money they don't just have to believe in. Something they can bite. And in London, they get it.", 2.9, DYK)],
  pauses=[("silver?", 0.35), ("now?", 0.35), ("don't.", 0.3)]),
 sc("mo07-1821", "Mo1821", [
  ("You wake up in eighteen twenty one, in London. Coal smoke, wet cobbles, and a queue outside the Bank of England.", 3.0, None),
  ("Did you know that Bank of England notes still say, I promise to pay the bearer on demand? Back then, that promise meant gold. A five pound note could be swapped for five gold coins. Sovereigns.", 2.9, DYK),
  ("For twenty four years, through the wars with France, the Bank had stopped paying out gold. Paper took over. So did forgers, and many of them were hanged. Now the Bank is paying gold again. Paper you can turn into metal, any day you like.", 3.0, None),
  ("So what is money now? As good as gold. A promise you can swap for metal.", 2.9, None),
  ("Over the next century, much of the world follows Britain onto gold. Gold becomes the anchor. And anchors feel safe. But in nineteen seventy one, one television speech cuts the rope.", 2.9, DYK)],
  pauses=[("demand?", 0.3), ("now?", 0.35), ("safe.", 0.35)]),
 sc("mo08-1971", "Mo1971", [
  ("You wake up in nineteen seventy one, in a suburb of Pittsburgh. It's a Sunday in August, and after dinner, the whole family's in front of the TV.", 3.0, None),
  ("Did you know that in nineteen seventy one, it was illegal for most Americans to own gold coins or bars? It had been since nineteen thirty three.", 2.9, DYK),
  ("Gold was for governments. Since nineteen forty four, they could swap dollars for American gold, at thirty five dollars an ounce. The dollar was tied to gold, and most other money was tied to the dollar.", 3.0, None),
  ("That evening, President Nixon comes on. From now on, foreign governments can't swap their dollars for gold. Within a few years, the whole system's gone.", 3.0, None),
  ("So what is money now? A promise backed by trust. Trust in the people who run it.", 2.9, None),
  ("And a generation later, that trust takes a strange new shape. Money doesn't need paper at all. In Kenya, it moves into a text message.", 2.9, DYK)],
  pauses=[("TV.", 0.2), ("now?", 0.35)]),
 sc("mo09-today", "MoToday", [
  ("You wake up today, in Nairobi. Matatus honk on the road outside, and your phone buzzes. Your sister just sent you money, from a village far upcountry. It took seconds.", 3.0, None),
  ("Did you know that about eight in ten adults in Kenya now use mobile money? In two thousand and nine, it was under three in ten.", 2.9, DYK),
  ("M-Pesa launched here in two thousand and seven. You hand cash to a shopkeeper, and it turns into numbers on your phone. School fees and taxi rides get paid with a text.", 3.0, None),
  ("And it isn't just Kenya. Across the euro area, cash paid for about eight in ten shop purchases in twenty sixteen. By twenty twenty four, it was about half.", 2.9, None),
  ("So what is money to you? Numbers on a screen. You almost never touch it. So here's the question you came for. If it isn't paper, and it isn't gold, what is money, actually?", 2.9, DYK)],
  pauses=[("seconds.", 0.2), ("you?", 0.35), ("it.", 0.3)]),
 sc("mo10-reveal", "MoReveal", [
  ("Here's the answer. The Bank of England puts it plainly. Money today is a type of IOU. A special one, because everyone trusts that other people will accept it.", 2.7, None),
  ("And most of it is made by ordinary banks. When a bank gives you a loan, it doesn't hand you someone else's savings. It types a new deposit into your account. Within limits, a loan creates new money.", 3.0, None),
  ("And your guess? When the Bank of England checked, about ninety seven out of every hundred pounds were bank deposits. Only about three were notes and coins.", 2.8, None),
  ("How close were you? Now climb the ladder again, with me.", 2.95, PAY),
  ("In fifteen hundred, money was something useful. Then, a promise on paper. Then, a belief. Then, as good as gold. Then, trust, and nothing else. Today, numbers on a screen.", 2.75, PAY),
  ("Remember that word from Stockholm? Promise. It was there all along.", 2.8, PAY)],
  pauses=[("guess?", 0.3), ("you?", 0.3), ("Stockholm?", 0.3)]),
 sc("mo11-2100", "Mo2100", [
  ("So, what's the next rung? Twenty one hundred. That morning hasn't happened yet. But we can follow the evidence.", 3.0, None),
  ("Cash is shrinking, and central banks have noticed. In a survey published in twenty twenty five, more than nine in ten of the central banks asked were exploring a digital currency of their own.", 2.9, None),
  ("In Europe, the central bank is getting ready for a possible digital euro. The first could come as early as twenty twenty nine, if lawmakers agree.", 2.9, None),
  ("And the Bank for International Settlements, the central banks' own bank, has warned that stablecoins, crypto tokens pegged to a currency, fail key tests of good money. It wants the central bank's promise to stay the anchor.", 2.9, None),
  ("So here's one scenario. Not a fact. By twenty one hundred, the note in your wallet could be a museum piece. Money could be code. But it would still be a promise.", 2.9, None),
  ("In fifteen hundred, money grew on trees. In twenty one hundred, it might be written in code.", 3.1, DYK)],
  pauses=[("rung?", 0.3), ("fact.", 0.25)]),
 sc("mo12-close", "MoClose", [
  ("You spend so much of your life earning it. So tell me. Who would you trust to keep that promise, in twenty one hundred?", 3.3, DYK)], pauses=None),
 sc("mo13-outro", "MoOutro", [
  ("This was Did You Know That, episode four. Money. Now it's your turn. Which century's money would you have trusted most? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen. And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every episode, collect the facts, and play the guessing game.", 3.15, None),
  ("If this changed how you see the money in your pocket, like it. Share it with the friend who always pays you back. And subscribe, so the next mystery finds you.", 3.15, None)],
  pauses=[("most?", 0.25)], floor=0.95),
 sc("mo13b-next", "MoOutro", [
  ("Next time: food. Historians estimate that in fifteen hundred, food took up most of a working family's budget. So what will you be eating in twenty one hundred?", 3.0, None)], floor=0.95),
 sc("mo13c-signoff", "MoOutro", [
  ("Ask...", 0, None), ("Wonder...", 0, None), ("Repeat.", 0, None)],
  pauses=[("Ask...", 0.33), ("Wonder...", 0.21)], floor=0.95, even=False),
 sc("mo14-endscreen", "MoOutro", [
  ("Next time... this could be your comment. Pick a mystery. And I will see you there.", 3.1, None)], floor=0.95),
]
S[11]["pauses"]["min_sentence_gap"] = 0.3
S[4]["pauses"]["min_sentence_gap"] = 0.25
S[16]["pauses"]["min_sentence_gap"] = 0.42
S[9]["pauses"]["min_sentence_gap"] = 0.3
S[10]["pauses"]["min_sentence_gap"] = 0.35
RISKY = ["Tenochtitlan", "Aztecs", "cacao", "Palmstruch", "livres", "Mississippi", "hunchback", "Sovereigns", "bearer",
         "Pittsburgh", "Nixon", "Nairobi", "Matatus", "M-Pesa", "upcountry", "IOU", "stablecoins", "euro", "food", "rung", "Law"]
VOICE = "Brian (nPczCjzI2devNBz1zQrb), eleven_flash_v2_5 · stability .32 / similarity .85 / style .45"
VERSION = "v1 2026-10-13 (No. 04 Money)"
# mo14-endscreen is No. 03's sc14-endscreen take, reused unchanged (same text, same voice; STORY §7.2 fallback)


def load_gen_voice():
    """gen_voice.py beside this file, loaded by path (never a same-named module from another episode)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen_voice.py")
    spec = importlib.util.spec_from_file_location("dyk04_gen_voice", path)
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
