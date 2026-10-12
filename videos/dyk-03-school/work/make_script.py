import json, sys
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
 sc("sc01-hook", "ScHook", [
  ("It's seven forty five. Somewhere near you, a school bell's about to ring. Right now, about one point four billion children are in school. More than ever before.", 3.2, None),
  ("Five hundred years ago, most children never saw a classroom. They worked. Today, most of them spend every weekday at a desk.", 3.1, None)], floor=0.95),
 sc("sc02-question", "ScHook", [
  ("And still, did you know that the word school first meant... the one thing school seems to take away from you?", 3.3, None)], floor=0.95),
 sc("sc00-welcome", "ScWelcome", [
  ("Welcome back to Did You Know That. Episode three. You know the rule. Here's your guess. Two hundred years ago, out of every ten people on Earth, how many could read? Guess in the comments, right now. Then stay to the end, and check your guess.", 3.15, None)],
  pauses=[("read?", 0.4)], floor=0.95),
 sc("sc03-promise", "ScPromise", [
  ("Seven mornings, from fifteen hundred to twenty one hundred. In each one, you wake up as a different kid, on a school day. Or a day with no school at all. You start out learning a trade with your hands. You end up somewhere your tutor might not even be human. And at the end, you'll find out what the word school really means.", 3.15, None)]),
 sc("sc04-1500", "Sc1500", [
  ("You wake up in fifteen hundred, in London. It's still dark. Next door, a hammer's already going, and the street smells of wet straw and wood smoke.", 3.0, None),
  ("Did you know that historians estimate only about one woman in a hundred in England could even write her own name?", 2.9, DYK),
  ("So what is school to you? Something for other people. For priests, and rich boys. Most children learn by working. If you're a craftsman's son, you're apprenticed. Usually seven years, living in your master's house, learning his trade by doing it.", 3.0, None),
  ("If you're lucky enough for grammar school, lessons often start at six in the morning. In Latin. And if you're a prince? Nine year old Prince Henry, the future Henry the Eighth, has a teacher all to himself, the poet John Skelton. One teacher. One child. Remember that.", 3.0, None),
  ("In fifteen twenty four, a rebel preacher, Martin Luther, writes to the leaders of German cities. Build schools, he says. For boys, and for girls. Partly so everyone can read the Bible.", 2.9, None),
  ("Why would a whole town care if a farmer's daughter can read? Soon, a colony across the ocean will write it into law.", 3.3, DYK)],
  pauses=[("smoke.", 0.2), ("prince?", 0.3)]),
 sc("sc05-1647", "Sc1647", [
  ("You wake up in sixteen forty seven, in a farming town in Massachusetts. There's frost on the window, and the cows need milking before breakfast.", 3.0, None),
  ("Did you know that one of America's first school laws begins by blaming the devil? It says it's a chief project of that old deluder, Satan, to keep men from the knowledge of the Scriptures.", 2.9, DYK),
  ("So what's school to you now? A way to read God's word, with your own eyes. Five years earlier, a law told parents and masters to teach their children to read. Lots of them didn't bother.", 3.0, None),
  ("So now, any town with fifty households has to hire someone to teach reading and writing. A hundred households? A grammar school too, or the town pays a fine. You learn your letters between the chores, and on Sunday, you hear why they matter.", 3.0, None),
  ("All over Protestant Europe, churches want people reading. But a church can only ask. In the next century, a king will order it. And he'll ban one thing every kid on Earth looks forward to.", 2.9, DYK)],
  pauses=[("breakfast.", 0.2), ("now?", 0.35), ("households?", 0.25)]),
 sc("sc06-1763", "Sc1763", [
  ("You wake up in seventeen sixty three, in a village in Prussia. It's autumn. The war's just over, the harvest's in, and the pastor has news from the king.", 3.0, None),
  ("Did you know that Frederick the Great's new school law banned school holidays? Not even at harvest time.", 2.9, DYK),
  ("So what is school now? An order. From the king. Every boy and girl, from the age of five until about thirteen. Skip it, and your parents can be fined.", 2.9, None),
  ("In winter, you're in class from eight to eleven, and one to four. In summer, just a few hours, because there are cows to herd. The law even says, hire a shepherd, so the children can go to school. Your teacher might be an old soldier. Many early village teachers were.", 3.0, None),
  ("You might have heard school was invented to make obedient factory workers. Historians say it's not that simple. Prussia was still a land of farms. The king and his church wanted loyal, God fearing, disciplined subjects. And plenty of families just ignored the rules.", 2.9, None),
  ("But one teacher per village is slow, and expensive. In London, a young man thinks he can teach the poor for almost nothing. His trick? Make the children the teachers.", 2.9, DYK)],
  pauses=[("king.", 0.2), ("holidays?", 0.35), ("now?", 0.35), ("trick?", 0.35)]),
 sc("sc07-1810", "Sc1810", [
  ("You wake up in eighteen ten, in London, on Borough Road. You walk into one enormous hall. Hundreds of children, in long rows. And just one master.", 3.0, None),
  ("Did you know that this school's founder, Joseph Lancaster, claimed one master could run a school of more than a thousand children?", 2.9, DYK),
  ("Older kids teach the younger ones, in small groups. You write your letters in sand, with your finger, because paper costs money. Misbehave, and you might be hoisted above the classroom, in a cage. Really. Lancaster thought it beat the cane.", 3.0, None),
  ("So what's school to you? A machine. For teaching the poor, by the hundred, as cheaply as possible. By the time Lancaster dies, more than twelve hundred schools are said to use his system.", 2.9, None),
  ("Then the law steps in. In eighteen eighty, school becomes compulsory in England, from five to ten. In eighteen ninety one, for most families, it becomes free.", 2.9, None),
  ("Now every child has to go. But in the next century, school stops being something you're forced into. It turns into something people fight for.", 2.9, DYK)],
  pauses=[("master.", 0.2), ("cage.", 0.35), ("you?", 0.35)]),
 sc("sc08-1948", "Sc1948", [
  ("You wake up in nineteen forty eight, in a small American town. It's June. Graduation day. Your mum's ironing your gown, and the radio's on.", 3.0, None),
  ("Did you know that in nineteen ten, fewer than one in five American teenagers went to high school? By nineteen forty, it was about seven in ten.", 3.3, DYK),
  ("Your grandad probably left school young, to work. You're staying to the end, because a diploma opens doors. So what is school to you now? A ladder. Every year you climb gets you closer to a better job.", 3.0, None),
  ("And that December, in Paris, the United Nations writes it down for the whole world. Everyone has the right to education. Free, at least in the early years.", 2.9, None),
  ("So now school is a right. And a ladder. And a building you walk to every morning. But about seventy years later, most of the world's schools would close. Almost at once.", 2.9, DYK)],
  pauses=[("on.", 0.2), ("now?", 0.35)]),
 sc("sc09-today", "ScToday", [
  ("You wake up today. Your phone buzzes. Homework's due at midnight. And any question you've got, you can ask a screen.", 3.1, None),
  ("Did you know that in April twenty twenty, about one point six billion learners were sent home from school? That's more than nine in ten students on Earth.", 2.9, DYK),
  ("Lessons moved into kitchens and bedrooms, onto laptops and phones. But at least four hundred and sixty three million kids couldn't get remote lessons at all. So what's school to you now? Always on. A classroom, plus a screen that never closes.", 3.0, None),
  ("And when the buildings shut, a lot of us found out how much we'd miss them. So here's the question you came for. What did the word school mean, before any of this?", 3.3, DYK)],
  pauses=[("screen.", 0.2), ("now?", 0.35)]),
 sc("sc10-reveal", "ScReveal", [
  ("Here's the answer. School comes from an ancient Greek word, skoh-LAY. And it meant... free time. Leisure.", 2.45, None),
  ("In Athens, people with free time often spent it talking, arguing, learning. So the word for free time became the word for the place you learn.", 3.1, None),
  ("And your guess? Two hundred years ago, only about one in ten people on Earth could read. Today, it's almost nine in ten.", 2.8, None),
  ("How close were you? Now climb that ladder again, with me.", 2.95, PAY),
  ("In fifteen hundred, school was for the few. Then, a way to read the Bible. Then, the king's order. Then, a machine for hundreds. Then, your right, and your ladder. Today, it never switches off.", 2.75, PAY),
  ("School started as free time, for a lucky few. Now it's where most children on Earth spend their weekdays.", 3.05, PAY)],
  pauses=[("meant...", 0.2), ("guess?", 0.3), ("you?", 0.3)]),
 sc("sc11-2100", "Sc2100", [
  ("So, what's the next rung? Twenty one hundred. That morning hasn't happened yet. But we can follow the evidence.", 3.0, None),
  ("Remember Prince Henry's tutor? One teacher, one child. In nineteen eighty four, an American researcher, Benjamin Bloom, reported that tutored students did better than ninety eight percent of students taught in a normal class.", 2.9, None),
  ("Later studies found the effect is smaller. But it's real. The problem was always the cost. Nobody can pay a tutor for every child.", 3.0, None),
  ("Then, in twenty twenty four, a World Bank pilot in Nigeria gave students an AI tutor, twice a week, with their teachers guiding them. After six weeks, the World Bank estimated nearly two years of typical learning. One small study. Short. But it's a start.", 2.85, None),
  ("So here's one scenario. Not a fact. By twenty one hundred, every child could have a tutor. Not a prince's poet. A patient machine, awake at any hour.", 2.9, None),
  ("And the classroom? The O E C D has imagined futures where school becomes a learning hub, and even one where it fades away. But UNESCO says schools should be protected. If they didn't exist, we'd have to invent them.", 2.9, None),
  ("In fifteen hundred, a private teacher was for a prince. In twenty one hundred, it might be for everyone. And school might get a little closer to what its name first meant.", 3.4, DYK)],
  pauses=[("rung?", 0.3), ("tutor?", 0.25), ("fact.", 0.25), ("classroom?", 0.3)]),
 sc("sc12-close", "ScClose", [
  ("You've spent years of your life in school. So tell me. What's the one thing it taught you that no screen ever could?", 3.3, DYK)], pauses=None),
 sc("sc13-outro", "ScOutro", [
  ("This was Did You Know That, episode three. School. Now it's your turn. Which century's classroom would you survive? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen. And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every episode, collect the facts, and play the guessing game.", 3.15, None),
  ("If this changed how you see a school day, like it. Share it with the friend who always did the homework. And subscribe, so the next mystery finds you.", 3.15, None),
  ("Next time: money. Around the world, each extra year of school adds, on average, about nine percent to what people earn. But did school ever teach you what money actually is?", 3.0, None),
  ("Ask...", 0, None), ("Wonder...", 0, None), ("Repeat.", 0, None)],
  pauses=[("Ask...", 0.33), ("Wonder...", 0.21), ("survive?", 0.25), ("is?", 0.3)], floor=0.95),
 sc("sc14-endscreen", "ScOutro", [
  ("Next time... this could be your comment. Pick a mystery. And I will see you there.", 3.1, None)], floor=0.95),
]
S[11]["pauses"]["min_sentence_gap"] = 0.3
S[4]["pauses"]["min_sentence_gap"] = 0.25
S[14]["pauses"]["min_sentence_gap"] = 0.42
S[9]["pauses"]["min_sentence_gap"] = 0.3
S[10]["pauses"]["min_sentence_gap"] = 0.35
json.dump({"voice": "Brian (nPczCjzI2devNBz1zQrb), eleven_flash_v2_5 · stability .32 / similarity .85 / style .45",
           "version": "v1 2026-10-13 (No. 03 School)", "scenes": S}, open(sys.argv[1], "w"), indent=2)
print(sum(len(c["text"]) for s in S for c in s["chunks"]), "chars;", sum(len(c["text"].split()) for s in S for c in s["chunks"]), "words")
# keep the speeds that passed: from the existing script (same chunk text) or the chunk cache
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(sys.argv[1])) + '/..')
import gen_voice as g
doc = json.load(open(sys.argv[1]))
old = json.load(open(sys.argv[1] + '.bak')) if os.path.exists(sys.argv[1] + '.bak') else {"scenes": []}
prev = {(sc["id"], c["text"], c["pace"]): c["speed"] for sc in old["scenes"] for c in sc["chunks"]}
for sc in doc["scenes"]:
    for k, c in enumerate(sc["chunks"]):
        meta = g.chunk_key(sc["id"], k, c) + ".json"
        if os.path.exists(meta):
            c["speed"] = json.load(open(meta))["speed"]
        elif (sc["id"], c["text"], c["pace"]) in prev:
            c["speed"] = prev[(sc["id"], c["text"], c["pace"])]
json.dump(doc, open(sys.argv[1], "w"), indent=2)
