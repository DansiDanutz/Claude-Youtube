#!/usr/bin/env python3
"""Attach a still and a HUD state to every scene in narration/script.json.
Re-run after build_script_json.py, which resets these fields."""
import json, os
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
I = lambda n: f"images/{n}"
M = {
 "open01":(I("04-eight-desks"),None),"open02":(I("04-eight-desks"),None),
 "open03":(I("04-eight-desks"),None),"open04":(I("04-eight-desks"),None),
 "open05":("cards/card-1.png",None),"open06":("cards/card-1.png",None),
 "open07":("title-card.png",None),
 "rules01":("title-card.png",1),"rules02":("title-card.png",1),
 "iron01":(I("01-head-office"),1),"iron02":(I("01-head-office"),1),
 "iron03":(I("01-head-office"),2),"iron04":(I("02-ceo-desk"),2),
 "iron05":(I("02-ceo-desk"),3),"iron06":(I("03-frankfurt"),3),
 "iron07":(I("03-frankfurt"),4),"iron08":(I("03-frankfurt"),4),
 "iron09":(I("04-eight-desks"),4),
 "brain01":(I("05-one-door"),4),"brain02":("cards/card-3.png",4),
 "brain03":("cards/card-2.png",4),"brain04":("cards/card-3.png",5),
 "brain05":("cards/card-3.png",6),"brain06":("cards/card-3.png",7),
 "brain07":(I("05-one-door"),7),"brain08":("cards/card-2.png",7),
 "brain09":("cards/card-2.png",7),"brain10":("cards/card-2.png",7),
 "plumb01":(I("02-ceo-desk"),8),"plumb02":(I("02-ceo-desk"),8),
 "plumb03":(I("01-head-office"),8),"plumb04":("cards/card-1.png",9),
 "pay01":(I("04-eight-desks"),10),"pay02":(I("03-frankfurt"),11),
 "pay03":(I("03-frankfurt"),11),"pay04":(I("03-frankfurt"),11),
 "pay05":(I("03-frankfurt"),11),"pay06":(I("04-eight-desks"),11),
 "pay07":(I("02-ceo-desk"),11),"pay08":(I("03-frankfurt"),11),
 "pay09":(I("06-green-lights"),11),"pay10":(I("06-green-lights"),11),
 "pay11":(I("01-head-office"),11),"pay12":(I("01-head-office"),11),
 "pay13":(I("05-one-door"),11),"pay14":(I("05-one-door"),11),
 "pay15":("cards/card-6.png",11),
 "reck01":(I("04-eight-desks"),11),"reck02":("hud-plates/slam-12.png",12),
 "reck03":(I("04-eight-desks"),12),"reck04":("hud-plates/slam-13.png",13),
 "reck05":(I("04-eight-desks"),13),"reck06":("hud-plates/slam-14.png",14),
 "audit01":("cards/card-4.png",14),"audit02":("cards/card-4.png",14),
 "audit03":(I("04-eight-desks"),14),"audit04":(I("01-head-office"),14),
 "audit05":(I("06-green-lights"),14),"audit06":("cards/card-4.png",14),
 "audit07":(I("03-frankfurt"),14),"audit08":(I("06-green-lights"),14),
 "audit09":(I("06-green-lights"),14),"audit10":(I("06-green-lights"),15),
 "audit11":("cards/card-4.png",15),
 # HUD off wherever card-7 is up: the card IS the ledger, and the HUD's
 # payroll panel lands straight on its DansLab column.
 "vs01":("cards/card-7.png",None),"vs02":("cards/card-7.png",None),
 "vs03":(I("02-ceo-desk"),15),"vs04":("cards/card-7.png",None),
 "vs05":("cards/card-7.png",None),"vs06":("cards/card-7.png",None),
 "vs07":(I("04-eight-desks"),15),"vs08":("cards/card-7.png",None),
 "vs09":("cards/card-7.png",None),"vs10":("cards/card-7.png",None),
 "vs11":("cards/card-6.png",15),
 "why01":(I("07-the-room"),15),"why02":(I("07-the-room"),16),
 "why03":(I("04-eight-desks"),16),"why04":(I("08-season-two"),None),
}
p = os.path.join(EP,'work/narration/script.json')
d = json.load(open(p,encoding='utf-8'))
miss=[]
for s in d['scenes']:
    if s.get('clip'): continue
    if s['id'] in M:
        st,h = M[s['id']]
        s['still']=st
        s['hud']=f"hud-plates/hud-{h:02d}.png" if h else None
    else: miss.append(s['id'])
json.dump(d,open(p,'w',encoding='utf-8'),indent=1,ensure_ascii=False)
print("mapped", len(d['scenes'])-len(miss), "of", len(d['scenes']), "· unmapped:", miss or "none")
