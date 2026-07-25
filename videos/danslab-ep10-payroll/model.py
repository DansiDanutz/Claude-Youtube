import json
CAPEX={"Mac Studio":(5500,36),"Mac Mini":(800,36)}
amort=sum(p/m for p,m in CAPEX.values())
DROPLET={"dexter":48,"memo":96,"sienna":48,"nano":48}
MODELS={"Anthropic Max #1":200,"Anthropic Max #2":200,"ChatGPT Pro":200,"z.ai GLM (yearly prepay $360/yr)":30,"Kimi Alegro / Moonshot Pro":20}
TOOLS={"Supabase Pro":25,"Vercel Pro":20,"Perplexity Pro":20,"Firecrawl":16,"Kilo":20,"Manus":39,"ElevenLabs":22,"Domains/misc":15}
models=sum(MODELS.values()); tools=sum(TOOLS.values()); drop=sum(DROPLET.values())
total=amort+models+tools+drop

# workload key = verified cron runs/month (openclaw cron, 77 enabled jobs)
RUNS={"david":124,"hermes":189,"dexter":30,"memo":30,"sienna":30,"nano":30,"doctor":120,"finance":69}
R=sum(RUNS.values())
MAC={"david","hermes","doctor","finance"}
ROLE={"david":("Orchestrator / Eng Manager",145000),"hermes":("Strategy Brain / Chief of Staff",160000),
 "dexter":("Senior Backend + DevOps",135000),"memo":("Automation Eng / PM",110000),
 "sienna":("Crypto Dev + QA",120000),"nano":("Platform / Agent Eng",110000),
 "doctor":("SRE, on-call owner",140000),"finance":("FinOps Analyst",95000)}
LOAD=1.30; AH=720.0; HH=160.0

rows=[];tsum=0;hsum=0
for a,r in RUNS.items():
    direct = DROPLET.get(a,0) + (amort/len(MAC) if a in MAC else 0)
    shared = (models+tools)*(r/R)
    c=direct+shared; tsum+=c
    title,sal=ROLE[a]; hm=sal*LOAD/12; hsum+=hm
    rows.append(dict(agent=a,title=title,cost=round(c,2),rate=round(c/AH,3),
        human_mo=round(hm),human_rate=round(hm/HH,2),mult=round((hm/HH)/(c/AH)),runs=r))
rows.sort(key=lambda x:x['rate'])
print(f"TOTAL SPEND/mo ${total:,.0f}  (capex-amort ${amort:,.0f} | droplets ${drop} | model subs ${models} | tools ${tools})")
print(f"attributed to core-8: ${tsum:,.0f}\n")
print(f"{'agent':8}{'$/mo':>8}{'$/agent-h':>11}{'human $/h':>11}{'x cheaper':>11}  role")
for x in rows: print(f"{x['agent']:8}{x['cost']:8.0f}{x['rate']:11.3f}{x['human_rate']:11.2f}{x['mult']:11d}  {x['title']}")
print(f"\nblended agent $/h ${tsum/(8*AH):.3f}   blended human $/h ${hsum/(8*HH):.2f}")
print(f"human payroll/mo ${hsum:,.0f}   /yr ${hsum*12:,.0f}")
for lbl,f in [("A naive",1.0),("B 24/7 coverage",4.5),("C honest (40% throughput)",4.5*0.40)]:
    print(f"{lbl:28s} value ${hsum*f:>10,.0f}  saving ${hsum*f-total:>10,.0f}  ROI {hsum*f/total:>5.0f}x")
import os
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),"econ.json")
json.dump(dict(total=round(total),amort=round(amort),droplets=drop,models=models,tools=tools,
  rows=rows,human_mo=round(hsum),blended_agent=round(tsum/(8*AH),3),blended_human=round(hsum/(8*HH),2)),
  open(out,"w"),indent=1)
print("\nwrote",out)
