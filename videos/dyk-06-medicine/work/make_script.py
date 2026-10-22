import copy, importlib.util, json, os, sys
G = 0.3
def sc(id, shot, chunks, pauses=None, floor=None, even=False):
    # even_pace stays off (No. 05, 2026-10-14): the pre-flight compares articulation rate and each chunk's own pace target.
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
# Text = work/narration-draft.md v1 (STORY.md §4, approved 2026-10-17). Wording changes for TTS are logged in work/HANDOFF.md.
S = [
 sc("me01-hook", "MeHook", [
  ("Last time, I left you with a question. How did we find out what really heals us? In seventeen ninety nine, George Washington came down with a sore throat. He was sixty seven. Three doctors came to help.", 3.2, None)], floor=0.95),
 sc("me02-question", "MeHook", [
  ("Did you know that, in a single day, they drained, by some estimates, around two fifths of his blood? They were trained. They meant well. So how did anyone ever find out what really works? And what are we still getting wrong?", 3.1, None)],
  pauses=[("blood?", 0.4)], floor=0.95),
 sc("me00-welcome", "MeWelcome", [
  ("Welcome back to Did You Know That. Episode six. You know the rule. Here's your guess. In nineteen forty eight, doctors tested a new drug on tuberculosis patients. Fifty five got the drug. Fifty two got bed rest and nothing else. After six months, how many of the fifty five had died? Guess in the comments, right now. Then stay to the end, and check your guess.", 2.9, None)],
  pauses=[("died?", 0.4)], floor=0.95),
 sc("me03-promise", "MePromise", [
  ("Seven mornings, from fifteen hundred to twenty one hundred. In each one, you wake up somewhere new. You'll meet a patient, see what the doctor believes, and find out how long people live. And at the end, you'll learn how medicine finally found out what works.", 3.1, None)]),
 sc("me04-1537", "Me1537", [
  ("You wake up in fifteen thirty seven, in a French army camp near Turin. Smoke, drums, and the groans of wounded men.", 3.0, None),
  ("Did you know that the usual treatment for a gunshot wound here is boiling oil? The surgeons believe gunpowder poisons the flesh.", 2.9, DYK),
  ("Here's your patient. A soldier with a gunshot wound. Doctors here teach that illness comes from four fluids in the body, and that the cure is to balance them. So they burn the wound. Or they purge. Or they drain some blood.", 3.3, None),
  ("One young army surgeon, Ambroise Paré, runs out of oil. So he mixes egg yolk, rose oil and turpentine instead. By his own account, the men he treated that way slept better, with less swelling. He wrote it down years later. Historians still argue about how much of the story is legend.", 3.0, None),
  ("How long do you live? In England, a newborn could expect about thirty five years. Mostly because so many children died.", 3.0, None),
  ("So what is medicine to you? Balance. The body is a scale, and the doctor adjusts it. Bleeding stays in fashion for centuries. And in seventeen ninety nine, it finds its most famous patient.", 2.9, DYK)],
  pauses=[("oil?", 0.35), ("live?", 0.25), ("you?", 0.35)]),
 sc("me05-1799", "Me1799", [
  ("You wake up in seventeen ninety nine, at Mount Vernon, in Virginia. It's December. Snow and sleet blow across the fields.", 3.0, None),
  ("Did you know that one of the three doctors wanted to open the windpipe with a knife, and the other two refused? Some modern doctors argue it might have saved him.", 3.6, DYK),
  ("Here's your patient. George Washington, sixty seven, struggling to breathe. At his own request, his farm overseer bleeds him first. Then the doctors take over. Eighteen ounces more. Then more. Then thirty two.", 2.7, None),
  ("In all, over eighty ounces, about two and a half litres, in about twelve hours. By some estimates, around two fifths of the blood in his body. He dies that night. Nobody in that room is counting how bleeding really turns out.", 2.95, {"speed": 1.0, "keep_speed": True}),
  ("How long do you live? Worldwide, a newborn could expect about twenty nine years.", 3.0, None),
  ("So what is medicine now? Authority. Trust the expert, even when the expert bleeds you. Fifty years later, in Vienna, a young doctor does something strange. He starts counting.", 2.9, DYK)],
  pauses=[("refused?", 0.35), ("live?", 0.25), ("now?", 0.35)]),
 sc("me06-1847", "Me1847", [
  ("You wake up in eighteen forty seven, in Vienna. It's a cold morning on the maternity ward of the General Hospital.", 3.0, None),
  ("Did you know that in the doctors' clinic here, in April, about eighteen in every hundred mothers died after giving birth? Eighteen in a hundred.", 3.3, DYK),
  ("Here's your patient. A new mother. A young doctor, Ignaz Semmelweis, notices that, for years, mothers with the midwives have died far less often. He asks every doctor to wash their hands in chlorinated lime before touching a patient. Reportedly, he picks it because it takes away the smell of the dead. He doesn't know about germs yet.", 2.7, None),
  ("Then he counts. April, eighteen in a hundred. June, about two. July, about one. August, about two.", 2.6, None),
  ("How long do you live? In Britain, a newborn could expect about thirty eight years.", 3.3, {"speed": 0.92, "keep_speed": True}),
  ("So what is medicine now? Pattern. Count the deaths, then look for the cause. Most doctors reject his idea. He can show that it works. He can't show why. That needs germs, and a drug that goes after them. And the first patient to get one is a police officer in Oxford.", 2.9, DYK)],
  pauses=[("birth?", 0.35), ("live?", 0.25), ("now?", 0.35)]),
 sc("me07-1941", "Me1941", [
  ("You wake up in nineteen forty one, in Oxford. It's wartime, and the lights are low.", 3.0, None),
  ("Did you know that the scientists here collect a patient's urine, to get the medicine back and use it again? They're running out.", 3.4, DYK),
  ("Here's your patient. Albert Alexander, a police officer, with an infection nothing can stop. On the twelfth of February, he gets a new drug, penicillin. Within a day, he's better. But there isn't enough. After five days, it's gone. He gets worse again, and dies in March.", 2.7, None),
  ("By one account, four of the next five patients recover. The idea works. The supply is what fails.", 3.0, None),
  ("How long do you live? In Britain, a newborn could expect about sixty one years.", 3.0, None),
  ("So what is medicine now? A cure. A drug that finds the germ and leaves you alone. It helps a handful of people. But how do you prove a drug works for everyone? Seven years later, someone finds a way.", 2.9, DYK)],
  pauses=[("again?", 0.35), ("live?", 0.25), ("now?", 0.35)]),
 sc("me08-1948", "Me1948", [
  ("You wake up in nineteen forty eight, on a hospital ward in Britain. Patients with tuberculosis lie in rows. The only sound is coughing.", 3.0, None),
  ("Did you know that here, the doctors don't choose who gets the new drug? A table of random numbers does.", 3.4, DYK),
  ("Here's your patient. A new drug, streptomycin, is scarce. There isn't enough for everyone. So a statistician, Austin Bradford Hill, makes a plan. The choices are made by random numbers, sealed in envelopes. The doctors admitting patients can't see them. One group gets the drug and bed rest. The other gets bed rest alone. Then they count.", 2.7, None),
  ("How long do you live? In Britain, a newborn could expect about sixty eight years.", 3.0, None),
  ("So what is medicine now? Proof. Don't believe it. Test it, fairly. Six months later, the numbers are in. You've already guessed them. Were you right? First, one more morning. One where a disease disappears.", 2.6, DYK)],
  pauses=[("drug?", 0.35), ("live?", 0.25), ("now?", 0.35), ("right?", 0.3)]),
 sc("me09-today", "MeToday", [
  ("You wake up today, in Merca, a town on the coast of Somalia. Fishing boats rest on the sand.", 3.0, None),
  ("Did you know that in October nineteen seventy seven, a hospital cook in this town became the last person in the world to catch smallpox the natural way? His name was Ali Maow Maalin. He recovered.", 2.9, DYK),
  ("Here's your patient. A child, rolling up a sleeve. Medicine doesn't wait for you to get sick anymore. It stops the disease before it starts. Smallpox is the only human disease the world has ever got rid of. Experts certified it gone in nineteen seventy nine. The World Health Organization announced it in nineteen eighty.", 3.0, None),
  ("How long do you live? Worldwide, a newborn can expect about seventy three years.", 3.0, None),
  ("So what is medicine to you? Prevention. Stop the disease before it starts. So here's the question you came for. How did medicine learn to tell what works? And what are we still getting wrong?", 2.9, DYK)],
  pauses=[("way?", 0.35), ("live?", 0.25), ("you?", 0.35)]),
 sc("me10-reveal", "MeReveal", [
  ("Here's the answer. Medicine didn't get better because doctors got smarter. Washington's doctors were trained, and they meant well. It got better when someone asked a simple question. Compared with what?", 3.1, None),
  ("Semmelweis compared mothers before and after the hand washing, and counted. The streptomycin trial went further. It let chance decide who got the drug, so the two groups were alike. Then it counted.", 3.0, None),
  ("So, your guess. Of the fifty five who got the drug, four died within six months. Of the fifty two who got bed rest alone, fourteen. How close were you?", 3.0, None),
  ("That trial is often called the first of its kind. But the idea was older. In seventeen forty seven, James Lind compared six cures for scurvy.", 2.8, None),
  ("Now walk down the ladder with me. In fifteen thirty seven, medicine was balance. Then authority. Then a pattern. Then a cure. Then proof. Today, prevention.", 2.5, PAY),
  ("In seventeen ninety nine, nobody was counting. Today, that question sits at the heart of how new medicines are tested.", 2.8, PAY)],
  pauses=[("what?", 0.4), ("you?", 0.45)]),
 sc("me11-2100", "Me2100", [
  ("So what could medicine look like in twenty one hundred? That morning hasn't happened yet. But we can follow the evidence.", 3.0, None),
  ("The United Nations expects life expectancy worldwide to reach about eighty two by twenty one hundred. But some of our best drugs are wearing out.", 2.9, None),
  ("In twenty twenty one, one point one million deaths were directly caused by bacteria that resist antibiotics. And resistance played a part in four point seven million more.", 2.9, None),
  ("A study in The Lancet forecasts that, without more action, resistant infections could directly cause about one point nine million deaths a year by twenty fifty.", 2.9, None),
  ("So here's one scenario. Not a fact. If we keep testing, and keep our drugs working, a baby born in twenty one hundred could live past eighty. If resistance keeps rising, some of the cures from nineteen forty one might fail.", 2.9, None),
  ("In seventeen ninety nine, doctors trusted authority. In twenty one hundred, what will you trust?", 3.0, DYK)],
  pauses=[("hundred?", 0.3), ("fact.", 0.25)]),
 sc("me12-close", "MeClose", [
  ("Tonight, think of the last medicine you took. How do you know it works?", 3.3, DYK)], pauses=None),
 sc("me13-outro", "MeOutro", [
  ("This was Did You Know That, episode six. Medicine. Now it's your turn. Which century's doctor would you trust, and why? Tell me in the comments. At the end of every episode, I will read the best comment, right here, on this screen. And the subject you ask for most becomes a future episode. On our website, Dex-tee dot live, you can watch every episode, collect the fact cards, and play the guessing game.", 3.15, None),
  ("If this changed how you see your medicine cabinet, like it. Share it with the friend who always says it's just a cold. And subscribe, so the next mystery finds you.", 3.15, None)],
  pauses=[("why?", 0.35)], floor=0.95),
 sc("me13b-next", "MeOutro", [
  ("Next time: light. In Britain, light now costs less than one three-thousandth of what it did in eighteen hundred. So what happened when we switched the night off?", 3.0, None)], floor=0.95),
 sc("me13c-signoff", "MeOutro", [
  ("Ask...", 0, None), ("Wonder...", 0, None), ("Repeat.", 0, None)],
  pauses=[("Ask...", 0.33), ("Wonder...", 0.36)], floor=0.95, even=False),
 sc("me14-endscreen", "MeOutro", [
  ("Next time... this could be your comment. Pick a mystery. And I will see you there.", 3.1, None)], floor=0.95),
]
BY_ID = {s["id"]: s for s in S}
BY_ID["me10-reveal"]["pauses"]["min_sentence_gap"] = 0.35
BY_ID["me14-endscreen"]["pauses"]["min_sentence_gap"] = 0.42
RISKY = ["Turin", "Paré", "Ambroise", "turpentine", "windpipe", "Semmelweis", "Ignaz", "Vienna", "chlorinated", "Oxford",
         "penicillin", "streptomycin", "tuberculosis", "Bradford", "Merca", "Somalia", "Maow", "Maalin", "smallpox",
         "Lind", "scurvy", "Lancet", "Dex-tee", "ounces", "litres", "fewer", "ate"]
VOICE = "Brian (nPczCjzI2devNBz1zQrb), eleven_flash_v2_5 · stability .32 / similarity .85 / style .45"
VERSION = "v1 2026-10-17 (No. 06 Medicine)"
# me13c-signoff: same text, pace and voice as No. 05's fd13c-signoff, so its three cached chunk takes are reusable.
# me14-endscreen: same text and voice as No. 05's fd14-endscreen (STORY fallback — No. 05 has no comments yet).


def load_gen_voice():
    """gen_voice.py beside this file, loaded by path (never a same-named module from another episode)."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gen_voice.py")
    spec = importlib.util.spec_from_file_location("dyk06_gen_voice", path)
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
