#!/usr/bin/env python3
"""Build ro/script.ro.json — the Romanian narration of DYK No. 05 "Food" — from the English work/narration/script.json.

Same scene ids, same chunk count per scene, same floor / payoff / pauses structure. Only the text changes, plus:
  * `pace` is the English target scaled by the chunk's syllables-per-word ratio (English counter = the shared gate's
    voice_preflight.syllables, Romanian = ro_text.syllables_ro), so each chunk keeps the English SYLLABLE tempo:
        pace_ro = pace_en x (syl/word EN) / (syl/word RO) x TEMPO_RO_EN     (English kept as `pace_en`)
    TEMPO_RO_EN is MEASURED, not assumed: Brian's Romanian articulation rate over his English one on the same scene at
    speed 1.0 (fd01-hook: EN 5.05 syl/s, RO 5.93 syl/s -> 1.17). Without it every target sat ~15 % under his natural
    Romanian delivery and the first calibration take failed the ±10 % gate four times at 2.9-3.2 w/s vs 2.53.
  * every `pauses.after` rule is re-anchored on the Romanian word that ends the same beat (PAUSE_ANCHORS).
  * once written, a chunk's `pace` is kept while its text is unchanged (the chunk cache is keyed on it: re-scaling
    would re-bill passing takes); PACE_OVERRIDES replace the target of chunks retuned from measured takes.
  * `speed` starts at the English passing speed; once gen_voice_ro.py stores a passing Romanian speed for a chunk,
    a rerun keeps it as long as the chunk text is unchanged (never resets accepted takes).
Run:  python3 videos/dyk-05-food/ro/make_script_ro.py
"""
import json
import os
import sys

RO = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(RO, "..", "..", ".."))
EN_SCRIPT = os.path.join(RO, "..", "work", "narration", "script.json")
OUT = os.path.join(RO, "script.ro.json")
sys.path.insert(0, os.path.join(ROOT, "tools", "dyk"))
sys.path.insert(0, RO)
from voice_preflight import syllables as syllables_en  # noqa: E402
from ro_text import syllables_ro  # noqa: E402

# Romanian text per scene, one string per English chunk (same order). Numbers are written as Brian should read them.
TEXT = {
    "fd01-hook": [
        "Data trecută, te-am lăsat cu o întrebare. Ce o să mănânci în anul două mii o sută? În anul o mie cinci sute, "
        "istoricii estimează că mâncarea înghițea cea mai mare parte din bugetul unei familii de muncitori. "
        "Azi, avem mai multă mâncare ca oricând.",
    ],
    "fd02-question": [
        "Și totuși, uite partea ciudată. Știai că azi, cam unul din cinci decese din lume e legat de alimentație? "
        "Deci mâncarea ne-a lungit viața? Sau ne ia înapoi o parte din anii ăștia?",
    ],
    "fd00-welcome": [
        "Bine ai revenit la Did You Know That. Episodul cinci. Știi regula. Uite ce ai de ghicit. În anul o mie opt sute, "
        "speranța de viață la naștere, la nivel mondial, era de vreo douăzeci și nouă de ani. Dar un bebeluș născut azi? "
        "Scrie-ți răspunsul în comentarii, chiar acum. Apoi rămâi până la final și vezi dacă ai ghicit.",
    ],
    "fd03-promise": [
        "Șapte dimineți, de la o mie cinci sute până la două mii o sută. În fiecare, te trezești în alt loc. "
        "O să vezi ce ai în farfurie, ce-i face corpului tău și cât apuci să trăiești. "
        "Iar la final, o să afli ce ne-a dat, de fapt, anii în plus.",
    ],
    "fd04-1500": [
        "Te trezești în anul o mie cinci sute, într-un sat din Flandra. Cuptorul de pâine e cald, iar bucătăria miroase "
        "a secară și a fum.",
        "Știai că aici, în până la patru zile din zece, e interzis să mănânci carne? Vinerea. Postul Mare. Postul Crăciunului. "
        "Biserica le spune zile de post.",
        "Uite ce ai în farfurie. Pâine aproape la fiecare masă. Terci, mazăre și fasole. Bere de băut. Pește uscat în "
        "zilele de post. Cea mai mare parte din ce cheltuie familia ta se duce pe mâncare. Șaptezeci până la optzeci "
        "la sută. Când recolta nu iese, pâinea se scumpește brusc, iar oamenii flămânzesc.",
        "Cât trăiești? În Anglia, chiar peste mare, un nou-născut putea spera la vreo treizeci și cinci de ani. "
        "Mai ales pentru că mureau foarte mulți copii. Dacă apucai treizeci de ani, aveai șanse destul de bune să "
        "ajungi la șaizeci.",
        "Deci ce e mâncarea pentru tine? Combustibil. Cât să supraviețuiești ziua. Ține minte zilele de post. "
        "Revin la final. Iar pe mare, în cele mai lungi călătorii, marinarii încep să se destrame.",
    ],
    "fd05-1747": [
        "Te trezești în anul o mie șapte sute patruzeci și șapte, la bordul HMS Salisbury, un vas de război britanic "
        "în patrulare.",
        "Știai că leacul pentru cea mai cumplită boală a marinarilor a fost găsit chiar anul ăsta, iar marina a "
        "așteptat aproape cincizeci de ani să-l folosească?",
        "Uite ce ai în farfurie. În fiecare zi, o livră de pesmet tare și un galon de bere. Carne sărată de vită sau "
        "de porc, mazăre uscată, făină de ovăz, puțină brânză. Aproape nimic proaspăt. După câteva săptămâni pe mare, "
        "oamenii fac scorbut. Gingii care sângerează. Răni vechi care se redeschid.",
        "Chirurgul navei, James Lind, împarte doisprezece marinari bolnavi de scorbut în perechi și dă fiecărei "
        "perechi altceva. Cidru. Oțet. Iar o pereche primește două portocale și o lămâie pe zi.",
        "Deci ce e mâncarea acum? Un leac. Mâncarea potrivită te poate vindeca. Pe uscat, în Marea Britanie, un "
        "nou-născut putea spera tot la mai puțin de patruzeci de ani.",
        "Marina a dat, în sfârșit, suc de lămâie abia în anul o mie șapte sute nouăzeci și cinci. Un secol mai târziu, "
        "în Japonia, o altă piesă lipsă îi îmbolnăvește pe marinari.",
    ],
    "fd06-1884": [
        "Te trezești în anul o mie opt sute optzeci și patru, la Shinagawa, în Golful Tokyo. O navă-școală pe nume "
        "Tsukuba se pregătește de plecare.",
        "Știai că într-o călătorie ca asta, cu un an înainte, aproape jumătate din echipaj s-a îmbolnăvit din cauza a "
        "ceea ce mânca? Pe nava Ryujo, o sută șaizeci și nouă de oameni au făcut beriberi. Douăzeci și cinci au murit.",
        "Uite farfuria unui marinar. Orez alb. Orezul era gratuit. Tot restul costa bani. Un medic al marinei, Takaki "
        "Kanehiro, măsoară ce mănâncă oamenii și schimbă meniul. Mai mult orz, carne, lapte, pâine și legume.",
        "Pe Tsukuba, se îmbolnăvesc paisprezece oameni. Nu moare niciunul. Iar cei paisprezece? Nu mâncaseră din "
        "noua hrană.",
        "Deci ce e mâncarea acum? Ceva de măsurat. Contează ce e înăuntru. Primele tabele de mortalitate ale Japoniei "
        "îi dau unui nou-născut vreo patruzeci și trei de ani. Și bărbații japonezi născuți atunci? Cu aproximativ "
        "cincisprezece centimetri mai scunzi decât cei născuți un secol mai târziu.",
        "Peste câteva decenii, primește un nume. O vitamină. Dar să știi ce lipsește nu o pune în farfuria unei "
        "familii sărace.",
    ],
    "fd07-1915": [
        "Te trezești în anul o mie nouă sute cincisprezece, la o fermă-închisoare din Mississippi. Unsprezece oameni "
        "stau la coadă la micul dejun.",
        "Știai că aici, niște medici au îmbolnăvit oameni sănătoși, intenționat, hrănindu-i cu mâncarea obișnuită a "
        "unei familii sărace din Sud? Voluntarilor li s-a promis grațierea.",
        "Uite farfuria. Pâine de mălai și terci de porumb. Porc sărat și gras. Melasă. Aproape deloc lapte, carne "
        "proaspătă sau verdețuri. După vreo cinci luni, cam jumătate dintre ei fac pelagră. Erupții pe piele, "
        "probleme cu stomacul, confuzie, chiar moarte.",
        "După o estimare des citată, a ucis în jur de o sută de mii de oameni în tot Sudul. Medicul, Joseph "
        "Goldberger, arată că pelagra nu se ia ca un microb. Vine din ceva ce lipsește din alimentație.",
        "Mai târziu, primește un nume. Niacina, o vitamină B. În anii o mie nouă sute patruzeci, e adăugată în făină "
        "și în pâine în mare parte din America. Cu asta, cu salarii mai bune și mâncare mai variată, pelagra dispare "
        "treptat.",
        "Deci ce e mâncarea acum? Ceva ce reparăm. Adaugi ce lipsește și o boală dispare. În America, în anul acela, "
        "un nou-născut putea spera la vreo cincizeci și cinci de ani. Dar să repari mâncarea ajută doar dacă e "
        "destulă. Iar în India, nu e.",
    ],
    "fd08-1966": [
        "Te trezești în anul o mie nouă sute șaizeci și șase, într-un sat din Punjab. Toată lumea se uită la cer, "
        "după ploaie.",
        "Știai că, cu un an înainte, prim-ministrul Indiei a cerut întregii țări să sară peste o masă pe săptămână? "
        "Lal Bahadur Shastri. Războiul și seceta lăsaseră prea puține cereale.",
        "Uite ce ai în farfurie. Lipie, linte, poate niște legume. În toată India, mâncarea ajunge doar pentru cam "
        "două mii de calorii de om pe zi. Un nou-născut de aici putea spera la vreo patruzeci și șase de ani.",
        "Așa că India importă din Mexic optsprezece mii de tone de semințe de grâu. Plante scunde și rezistente, "
        "create de echipa lui Norman Borlaug. Au nevoie de apă și de mult îngrășământ, făcut în fabrici din azotul "
        "din aer. În câțiva ani, recolta de grâu a Indiei sare la șaptesprezece milioane de tone.",
        "Deci ce e mâncarea acum? Destulă, în sfârșit. Produsă la tonă. Azi, un nou-născut din India poate spera la "
        "vreo șaptezeci și doi de ani. Și peste tot în lume, mâncarea n-a fost niciodată mai din belșug. Ceea ce "
        "aduce o problemă complet nouă.",
    ],
    "fd09-today": [
        "Te trezești azi, în São Paulo. Pe lângă tine trec în viteză motociclete cu livrări de mâncare.",
        "Știai că ghidul oficial de alimentație al Braziliei le spune oamenilor să mănânce la ore regulate și, ori de "
        "câte ori pot, împreună cu alții?",
        "Uite ce ai în farfurie. Orez cu fasole, încă în cele mai multe farfurii din Brazilia. Și tot mai multă "
        "mâncare ultraprocesată. Sucuri. Gustări ambalate. În Brazilia, asta înseamnă cam o cincime din caloriile pe "
        "care le mănâncă oamenii. În Statele Unite, mai mult de jumătate.",
        "Regula de aur a ghidului? Alege mâncare proaspătă și mese gătite acasă în locul celei ultraprocesate. Iar în "
        "cele mai multe țări, acum sunt mai mulți adulți care trăiesc cu obezitate decât adulți subponderali. "
        "În Brazilia, un nou-născut poate spera la vreo șaptezeci și șase de ani.",
        "Deci ce e mâncarea pentru tine? Prea mult din unele. Prea puțin din altele. Așa că uite întrebarea pentru "
        "care ai venit. Mâncarea ne-a ajutat să trăim mai mult. Acum ne ia înapoi o parte din anii ăștia?",
    ],
    "fd10-reveal": [
        "Uite răspunsul. Mâncarea ne-a dat ani. Dar n-a făcut-o singură. Iar acum, pericolul s-a inversat.",
        "Destule calorii și nutrienții potriviți au învins scorbutul, beriberi și pelagra, și ne-au ajutat să creștem "
        "mai înalți. Un medic, Thomas McKeown, a susținut că mâncarea mai bună a fost motivul principal pentru care "
        "am început să trăim mai mult. Mulți istorici nu sunt de acord.",
        "În marile orașe americane, un studiu a descoperit că doar apa curată a stat în spatele a aproape jumătate "
        "din scăderea deceselor, la începutul anilor o mie nouă sute. Canalizarea, vaccinurile și medicina au făcut "
        "mare parte din rest.",
        "Și azi? Cam unul din cinci decese din lume e legat de alimentație. Cele mai mari riscuri? Prea multă sare. "
        "Prea puține cereale integrale. Prea puține fructe.",
        "Și ce-ai ghicit? În anul o mie opt sute, vreo douăzeci și nouă de ani. Azi, la nivel mondial, vreo "
        "șaptezeci și trei. Cât de aproape ai fost?",
        "Acum coboară scara cu mine. În anul o mie cinci sute, mâncarea era combustibil. Apoi, leac. Apoi, ceva de "
        "măsurat. Apoi, ceva ce reparăm. Apoi, destulă, în sfârșit. Azi, prea multă.",
        "În anul o mie cinci sute, mâncarea îți lua cei mai mulți bani, iar foamea era pericolul. Azi, pericolul e "
        "ce alegem să mâncăm.",
    ],
    "fd11-2100": [
        "Deci ce o să mănânci în anul două mii o sută? Dimineața aia încă n-a venit. Dar putem urmări dovezile.",
        "Națiunile Unite se așteaptă ca speranța de viață la nivel mondial să ajungă la vreo optzeci și doi de ani "
        "până în două mii o sută. Grupul lor de experți pentru climă spune că încălzirea a încetinit deja creșterea "
        "productivității agricole, în ultimii cincizeci de ani.",
        "Iar Comisia EAT Lancet spune că o alimentație mai ales din plante, cu carne roșie cam o dată pe săptămână, "
        "ar putea preveni în jur de cincisprezece milioane de decese premature pe an.",
        "Așa că uite un scenariu. Nu un fapt. Până în două mii o sută, farfuria ta ar putea fi mai ales din plante. "
        "Carnea ar putea fi un răsfăț de o dată pe săptămână. Și dacă recoltele rezistă, viața medie ar putea trece "
        "de optzeci de ani.",
        "În anul o mie cinci sute, Biserica hotăra în ce zile nu aveai voie să mănânci carne. În anul două mii o sută, "
        "motivul ar putea fi inima ta. Și planeta.",
    ],
    "fd12-close": [
        "Diseară, uită-te în farfurie. Ce parte din ea îți cumpără mai mulți ani?",
    ],
    "fd13-outro": [
        "Acesta a fost Did You Know That, episodul cinci. Mâncarea. Acum e rândul tău. Din bucătăria cărui secol ai "
        "mânca? Spune-mi în comentarii. La finalul fiecărui episod, o să citesc cel mai bun comentariu, chiar aici, "
        "pe ecranul ăsta. Iar subiectul pe care îl cereți cel mai des devine un episod viitor. Pe site-ul nostru, "
        "Dexti punct laiv, poți vedea toate episoadele, poți colecționa cartonașele cu fapte și poți juca jocul de "
        "ghicit.",
        "Dacă asta ți-a schimbat felul în care te uiți la ce ai în farfurie, dă-i like. Trimite-l prietenului care "
        "îți gătește mereu. Și abonează-te, ca următorul mister să te găsească.",
    ],
    "fd13b-next": [
        "Data viitoare: medicina. În anul o mie șapte sute nouăzeci și nouă, medicii lui George Washington i-au scos, "
        "după unele estimări, în jur de două cincimi din sânge. Deci cum am aflat ce ne vindecă, de fapt?",
    ],
    "fd13c-signoff": ["Întreabă...", "Uimește-te.", "Repetă."],   # David 2026-10-16: "Uimește-te." (was "Minunează-te.")
    "fd14-endscreen": [
        "Data viitoare... ăsta ar putea fi comentariul tău. Alege un mister. Și ne vedem acolo.",
    ],
}

# English pause anchor (scene, word) -> the Romanian word that ends the same beat (exact token, punctuation included).
PAUSE_ANCHORS = {
    ("fd02-question", "diet?"): "alimentație?",
    ("fd00-welcome", "today?"): "azi?",
    ("fd04-1500", "rules?"): "carne?",
    ("fd04-1500", "live?"): "trăiești?",
    ("fd04-1500", "you?"): "tine?",
    ("fd05-1747", "it?"): "folosească?",
    ("fd05-1747", "now?"): "acum?",
    ("fd06-1884", "ate?"): "mânca?",
    ("fd06-1884", "fourteen?"): "paisprezece?",
    ("fd06-1884", "now?"): "acum?",
    ("fd07-1915", "diet?"): "Sud?",
    ("fd07-1915", "now?"): "acum?",
    ("fd08-1966", "week?"): "săptămână?",
    ("fd08-1966", "now?"): "acum?",
    ("fd09-today", "people?"): "alții?",
    ("fd09-today", "rule?"): "ghidului?",
    ("fd09-today", "you?"): "tine?",
    ("fd10-reveal", "today?"): "azi?",
    ("fd10-reveal", "risks?"): "riscuri?",
    ("fd10-reveal", "guess?"): "ghicit?",
    ("fd10-reveal", "you?"): "fost?",
    ("fd10-reveal", "danger."): "pericolul.",
    ("fd11-2100", "hundred?"): "sută?",
    ("fd11-2100", "fact."): "fapt.",
    ("fd13-outro", "in?"): "mânca?",
    ("fd13c-signoff", "Ask..."): "Întreabă...",
    ("fd13c-signoff", "Wonder..."): "Uimește-te.",
}

TEMPO_RO_EN = 1.17          # measured on fd01-hook (see module docstring); one scene, re-measure if takes drift

# Chunks the first full run (audit/gen_voice_run3.log) held on pace or continuity: the scaled target sat far from the
# chunk's natural Romanian delivery (the per-chunk English syllable estimate is noisy on number-heavy lines) and forced
# lurching speeds. Second pass (pre-flight on the real take): fd06 c6 / fd07 c4 came out > 20 % faster in syllables/s
# than the chunk before (lowered 3.05 -> 2.7, 2.94 -> 2.6); fd14's measured pace after its 0.42 s sentence gaps is
# 2.64 w/s (target 3.1 -> 2.8). Target = median measured pace of that chunk's takes, normalised to its start speed — the
# voice-preflight rule "give each chunk the pace it delivers naturally near speed 1.0". Only these chunks change.
PACE_OVERRIDES = {
    ("fd04-1500", 4): 2.96, ("fd04-1500", 5): 2.59, ("fd05-1747", 1): 2.75, ("fd06-1884", 6): 2.7,
    ("fd07-1915", 3): 2.3, ("fd07-1915", 4): 2.6, ("fd08-1966", 2): 2.5, ("fd09-today", 2): 2.96, ("fd09-today", 5): 3.1,
    ("fd10-reveal", 2): 2.66, ("fd13-outro", 2): 3.0, ("fd14-endscreen", 1): 2.8,
}

# Start speeds that replace a stored passing speed (the chunk is re-voiced): fd07 c3 passed at 1.08, which pinned c4's
# continuity band to >= 1.00 where it always read > 20 % faster; both restart lower so c4 can slow down.
SPEED_OVERRIDES = {("fd07-1915", 3): 1.0, ("fd07-1915", 4): 0.95}

RISKY_WORDS = ["Did", "You", "Know", "That", "Flandra", "Crăciunului", "HMS", "Salisbury", "livră", "galon", "Lind",
               "Shinagawa", "Tsukuba", "Ryujo", "beriberi", "Takaki", "Kanehiro", "Mississippi", "pelagră", "pelagra",
               "Goldberger", "Niacina", "Punjab", "Lal", "Bahadur", "Shastri", "Borlaug", "São", "Paulo", "McKeown",
               "EAT", "Lancet", "Dexti", "laiv", "like", "Washington"]


def syl_per_word(text, counter):
    words = text.split()
    return sum(counter(w) for w in words) / len(words)


def scaled_pace(en_text, en_pace, ro_text):
    """English words/s target -> Romanian words/s at the same syllable tempo (0 = no pace gate stays 0)."""
    if not en_pace:
        return 0
    ratio = syl_per_word(en_text, syllables_en) / syl_per_word(ro_text, syllables_ro)
    return round(en_pace * ratio * TEMPO_RO_EN, 2)


def ro_pauses(sid, pauses):
    out = {k: v for k, v in pauses.items() if k != "after"}
    if "after" in pauses:
        out["after"] = [{**rule, "word": PAUSE_ANCHORS[(sid, rule["word"])]} for rule in pauses["after"]]
    return out


def build(en, previous=None):
    prev_chunks = {sc["id"]: sc.get("chunks", []) for sc in (previous or {}).get("scenes", [])}
    scenes = []
    for sc in en["scenes"]:
        sid = sc["id"]
        en_chunks = sc.get("chunks") or [{"text": sc["text"], "pace": sc.get("pace"), "speed": sc.get("speed", 1.0)}]
        ro_texts = TEXT[sid]
        if len(ro_texts) != len(en_chunks):
            raise SystemExit(f"{sid}: {len(ro_texts)} Romanian chunks for {len(en_chunks)} English chunks")
        chunks = []
        for k, (ech, text) in enumerate(zip(en_chunks, ro_texts)):
            ch = {key: v for key, v in ech.items() if key not in ("text", "pace", "speed")}
            old = prev_chunks.get(sid, [])
            kept = old[k] if k < len(old) and old[k].get("text") == text and old[k].get("speed_ro_passed") else None
            same = k < len(old) and old[k].get("text") == text
            pace = PACE_OVERRIDES.get((sid, k + 1)) or (old[k]["pace"] if same else
                                                         scaled_pace(ech["text"], ech.get("pace"), text))
            ch.update({"text": text, "pace": pace if ech.get("pace") else 0, "pace_en": ech.get("pace"),
                       "speed": kept["speed"] if kept else round(float(ech.get("speed", 1.0)), 3)})
            if (sid, k + 1) in SPEED_OVERRIDES:
                ch["speed"], kept = SPEED_OVERRIDES[(sid, k + 1)], None
            if kept:
                ch["speed_ro_passed"] = True
            chunks.append(ch)
        out = {key: v for key, v in sc.items() if key not in ("chunks", "text", "pauses", "pace", "speed")}
        out["chunks"] = chunks
        if sc.get("pauses"):
            out["pauses"] = ro_pauses(sid, sc["pauses"])
        scenes.append(out)
    return {"voice": "Brian (nPczCjzI2devNBz1zQrb), eleven_multilingual_v2, language_code ro · stability .32 / "
                     "similarity .85 / style .45",
            "version": "ro-v1 2026-10-16 (No. 05 Food, Romanian pilot)", "language": "ro",
            "risky_words": RISKY_WORDS, "scenes": scenes}


def main():
    en = json.load(open(EN_SCRIPT, encoding="utf-8"))
    previous = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else None
    script = build(en, previous)
    json.dump(script, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    en_words = sum(len(c["text"].split()) for sc in en["scenes"] for c in (sc.get("chunks") or [sc]))
    ro_words = sum(len(c["text"].split()) for sc in script["scenes"] for c in sc["chunks"])
    chars = sum(len(c["text"]) for sc in script["scenes"] for c in sc["chunks"])
    print(f"script.ro.json: {len(script['scenes'])} scenes, {ro_words} words (EN {en_words}, ratio {ro_words / en_words:.2f}), "
          f"{chars} characters")


if __name__ == "__main__":
    main()
