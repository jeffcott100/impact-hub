const AZ=l=>[...l].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));
// Member portal data. All fictional.
// Company profile drives the whole portal (welcome, recommendations, page config). Created on first login.
const DEMO_PROFILE={owner:"Danielle",biz:"Harbor & Vine Catering",industry:"Food, beverage & hospitality",zip:"23220",city:"Richmond",state:"Virginia",employees:6,revenue:"$500K–$2M",years:3,gender:"",race:"",military:""};
function defaultProfile(){return Object.assign({},DEMO_PROFILE)}
function hasProfile(){return !!localStorage.getItem("ih_profile")}
function getProfile(){const p=Object.assign(defaultProfile(),LS.get("profile",{}));if(IND_MAP[p.industry])p.industry=IND_MAP[p.industry];if(ZIPS[p.zip]){p.city=ZIPS[p.zip][0];p.state=ZIPS[p.zip][1]}return p}
function saveProfile(p){LS.set("profile",Object.assign(getProfile(),p))}
const STATE_DIV={"Connecticut":"New England","Maine":"New England","Massachusetts":"New England","New Hampshire":"New England","Rhode Island":"New England","Vermont":"New England","New Jersey":"Middle Atlantic","New York":"Middle Atlantic","Pennsylvania":"Middle Atlantic","Illinois":"East North Central","Indiana":"East North Central","Michigan":"East North Central","Ohio":"East North Central","Wisconsin":"East North Central","Iowa":"West North Central","Kansas":"West North Central","Minnesota":"West North Central","Missouri":"West North Central","Nebraska":"West North Central","North Dakota":"West North Central","South Dakota":"West North Central","Delaware":"South Atlantic","District of Columbia":"South Atlantic","Florida":"South Atlantic","Georgia":"South Atlantic","Maryland":"South Atlantic","North Carolina":"South Atlantic","South Carolina":"South Atlantic","Virginia":"South Atlantic","West Virginia":"South Atlantic","Alabama":"East South Central","Kentucky":"East South Central","Mississippi":"East South Central","Tennessee":"East South Central","Arkansas":"West South Central","Louisiana":"West South Central","Oklahoma":"West South Central","Texas":"West South Central","Arizona":"Mountain","Colorado":"Mountain","Idaho":"Mountain","Montana":"Mountain","Nevada":"Mountain","New Mexico":"Mountain","Utah":"Mountain","Wyoming":"Mountain","Alaska":"Pacific","California":"Pacific","Hawaii":"Pacific","Oregon":"Pacific","Washington":"Pacific"};
const ME={get biz(){return getProfile().biz},get owner(){return getProfile().owner||"there"},get city(){const p=getProfile();return p.city?`${p.city}, ${(Object.entries(ST_ABBR).find(e=>e[1]==p.state)||[p.state])[0]}`:p.zip},get market(){return STATE_DIV[getProfile().state]||""},get state(){return getProfile().state}};
// Small embedded ZIP table (works offline); anything else is looked up from a free ZIP API.
const ZIPS={"23220":["Richmond","Virginia"],"75201":["Dallas","Texas"],"75204":["Dallas","Texas"],"77002":["Houston","Texas"],"02116":["Boston","Massachusetts"],"02108":["Boston","Massachusetts"],"02119":["Boston","Massachusetts"],"02139":["Cambridge","Massachusetts"],"75202":["Dallas","Texas"],"75203":["Dallas","Texas"],"75215":["Dallas","Texas"],"78701":["Austin","Texas"],"90012":["Los Angeles","California"],"33101":["Miami","Florida"],"85004":["Phoenix","Arizona"],"23219":["Richmond","Virginia"],"23223":["Richmond","Virginia"],"02118":["Boston","Massachusetts"],"10001":["New York","New York"],"11201":["Brooklyn","New York"],"20001":["Washington","District of Columbia"],"70112":["New Orleans","Louisiana"],"60601":["Chicago","Illinois"],"53202":["Milwaukee","Wisconsin"],"94110":["San Francisco","California"],"80302":["Boulder","Colorado"],"07302":["Jersey City","New Jersey"],"19801":["Wilmington","Delaware"],"30303":["Atlanta","Georgia"],"98101":["Seattle","Washington"]};
async function zipLookup(z){if(ZIPS[z])return ZIPS[z];try{const r=await fetch("https://api.zippopotam.us/us/"+z);if(!r.ok)return null;const j=await r.json();const pl=j.places&&j.places[0];return pl?[pl["place name"],pl["state"]]:null}catch(e){return null}}
function industryMatch(profIndustry,itemIndustry){if(!itemIndustry)return false;return Array.isArray(itemIndustry)?itemIndustry.includes(profIndustry):itemIndustry===profIndustry}
function itemStates(item){if(item.st&&Array.isArray(item.st))return item.st;const loc=(item.org||"")+" "+(item.c||"");const m=loc.match(/,\s*([A-Z]{2})\b/);return m&&ST_ABBR[m[1]]?[ST_ABBR[m[1]]]:[]}
function recScore(prof,item){let sc=0;const txt=((item.who||"")+" "+(item.n||"")).toLowerCase();
 if(item.k&&industryMatch(prof.industry,item.k))sc+=2;else if(prof.industry&&txt.includes(prof.industry.split(/[ ,]/)[0].toLowerCase()))sc+=1;
 if(prof.state&&itemStates(item).includes(prof.state))sc+=2;else if(item.m&&item.m==STATE_DIV[prof.state])sc+=1;
 if(prof.gender=="Woman"&&/women/.test(txt))sc+=2;if(prof.race=="Black or African American"&&/black/.test(txt))sc+=2;if(prof.race=="Hispanic or Latino"&&/latin/.test(txt))sc+=2;if(prof.military&&prof.military!="No military affiliation"&&/veteran|military/.test(txt))sc+=2;
 if(prof.city&&((item.who||"")+" "+(item.n||"")+" "+(item.org||"")+" "+(item.c||"")).includes(prof.city))sc+=1;
 return sc}
function sortRecommended(list,prof){return [...list].sort((a,b)=>recScore(prof,b)-recScore(prof,a))}
const REVS=["Under $100K","$100K–$500K","$500K–$2M","Over $2M"];
const GENDERS=["Woman","Man","Non-binary","Prefer to self-describe","Prefer not to say"];
const RACES=["American Indian or Alaska Native","Asian","Black or African American","Hispanic or Latino","Middle Eastern or North African","Native Hawaiian or Pacific Islander","White","Multiracial","Prefer not to say"];
const MILS=["No military affiliation","Veteran","Active duty","National Guard / Reserve","Military spouse","Prefer not to say"];
const sel=(name,list,v,blank,keep)=>`<select name="${name}">${blank?`<option value="">${blank}</option>`:""}${(keep?list:AZ(list)).map(i=>`<option ${i==v?"selected":""}>${i}</option>`).join("")}</select>`;
// Shared profile form (used by Edit profile and first-login onboarding).
function profileFields(p){return `<label>Your name<input name="owner" value="${p.owner||""}" required autocomplete="name"></label>
<label>Business name<input name="biz" value="${p.biz||""}" required></label>
<label>Industry${sel("industry",INDUSTRIES,p.industry)}</label>
<label>ZIP code<input name="zip" value="${p.zip||""}" pattern="[0-9]{5}" maxlength="5" inputmode="numeric" required></label>
<label>City<input name="city" value="${p.city||""}" required></label>
<label>State<select name="state" required><option value="">Select</option>${Object.values(ST_ABBR).sort().map(x=>`<option ${x==p.state?"selected":""}>${x}</option>`).join("")}</select></label>
<label>Employee count<input name="employees" type="number" min="0" value="${p.employees??""}" required></label>
<label>Annual revenue${sel("revenue",REVS,p.revenue,"",1)}</label>
<label>Years in business<input name="years" type="number" min="0" value="${p.years??""}" required></label>
<fieldset class="full optid"><legend>Optional: about you</legend><p class="mut">Sharing these helps us recommend grants and programs set aside for specific founders. Never shared outside 100th Street Bank.</p>
<div class="optgrid"><label>Gender${sel("gender",GENDERS,p.gender,"Choose (optional)")}</label><label>Race / ethnicity${sel("race",RACES,p.race,"Choose (optional)")}</label><label>Military status${sel("military",MILS,p.military,"Choose (optional)")}</label></div></fieldset>`}
function wireZip(form){const z=form.querySelector("[name=zip]"),c=form.querySelector("[name=city]"),st=form.querySelector("[name=state]");let hint=document.createElement("small");hint.className="ziphint";z.parentNode.append(hint);
 const go=async()=>{const v=z.value.replace(/\D/g,"").slice(0,5);z.value=v;hint.textContent="";if(v.length<5)return;hint.textContent="Looking up…";const r=await zipLookup(v);if(z.value!==v)return;if(r){c.value=r[0];st.value=r[1];hint.textContent=`Filled in ${r[0]}, ${r[1]}`;form.dispatchEvent(new CustomEvent("zipfilled"))}else hint.textContent="Couldn't find that ZIP. Enter city and state."};
 z.addEventListener("input",go);z.addEventListener("change",go);if(z.value.length==5)go()}
function readProfile(form){const fd=new FormData(form),o={};for(const [k,v] of fd.entries())o[k]=v;o.employees=+o.employees;o.years=+o.years;return o}
function profileModal(){location.href="app-profile.html"}
const TOPICS=["AI","Finance","Legal","Marketing","Operations","Technology"];
const SMARKETS=["Greater Washington","Texas","Virginia"];
const SESSIONS=[
["s1","AI","AI for small business","2026-11-11","12:00","","Workshop","Priya Natarajan, Data Science","Hands-on session on where AI tools genuinely save owner-operators time, from scheduling to customer replies.","Leave with 3 AI tools set up for your business and a short list of what to avoid.",1,1],
["s3","Finance","Financial statements 101","2026-11-18","13:00","","Workshop","Elena Reyes, Finance","Read your P&L and balance sheet like a banker does, and know which numbers to watch monthly.","Understand your statements well enough to spot a problem before it becomes one.",0,1],
["s13","Finance","Managing business credit","2026-11-19","12:00","","Workshop","Devon Larkin, Small Business Bank","How business credit is built and used, and the habits that keep your score moving the right direction.","Walk away with a personal plan to raise or protect your business credit score.",0,1],
["s14","Finance","Business loan basics","2026-11-23","12:00","Greater Washington","Workshop","Marcus Thibodeaux, Commercial Banking","What lenders look for, loan types available to small businesses, and how to prepare an application.","Know which loan product fits your stage and what documents to gather first.",0,1],
["s15","Operations","Strategy coaching program","2026-11-30","10:00","","Workshop","Taylor Simmons, Business Coaching","A matched 1:1 coaching track with a 100th Street Bank volunteer, built around your growth goals.","Finish with a written 90-day growth plan reviewed by your coach.",0,1,1],
["s4","Finance","Cash flow planning","2026-11-20","09:30","Virginia","Workshop","Jordan Kwan, Treasury","Build a simple cash flow forecast and plan for seasonal dips before they hit.","Leave with a 13-week cash flow template filled in for your business.",0,0],
["s5","Legal","Legal clinic","2026-11-24","14:00","Virginia","Webinar","Morgan Bell, Legal","Live Q&A on contracts, entity structure and compliance basics for small business owners.","Get plain-language answers to your top legal questions before they become expensive.",1,0],
].map(([id,t,n,d,tm,m,f,v,ds,gl,real,jeff,apply])=>({id,t,n,d,tm,m,f,v,ds,gl,real,jeff,apply})).sort((a,b)=>(b.jeff||0)-(a.jeff||0));
// Extra selectable time slots for individually-scheduled Workshops (members pick their own time).
const SLOTS={s1:["2026-11-11 12:00 ET","2026-11-16 15:00 ET","2026-11-20 10:00 ET"],s3:["2026-11-18 13:00 ET","2026-11-21 09:00 ET"],s13:["2026-11-19 12:00 ET","2026-11-24 14:00 ET"],s14:["2026-11-23 12:00 ET","2026-11-27 11:00 ET"],s15:["2026-11-30 10:00 ET","2026-12-02 13:00 ET","2026-12-04 09:30 ET"],s4:["2026-11-20 09:30 ET","2026-11-25 10:30 ET"]};

// Session relevance to the business profile: topics that matter most per industry, plus local sessions.
const IND_TOPICS={"Food, beverage & hospitality":["Finance","Operations","Legal"],"Education & childcare":["Legal","Operations","Finance"],"Health & life sciences":["Legal","Operations","Finance"],"Retail & consumer":["Marketing","Finance","AI"],"Technology & software":["AI","Technology","Finance"],"Professional, financial & business services":["Marketing","AI","Legal"],"Construction & manufacturing":["Finance","Operations","Legal"],"Nonprofit & social enterprise":["Finance","Legal","Marketing"]};
const SM_STATES={"Virginia":["Virginia"],"Greater Washington":["District of Columbia","Maryland","Virginia"],"Texas":["Texas"]};
function sessScore(prof,s){let sc=0;const t=IND_TOPICS[prof.industry]||[];const i=t.indexOf(s.t);if(i>=0)sc+=3-i;if(s.m){sc+=(SM_STATES[s.m]||[]).includes(prof.state)?2:-1}
 if(prof.years<=2&&/credit|loan basics|statements/i.test(s.n))sc+=1;if(prof.employees>=10&&/coaching|cash flow/i.test(s.n))sc+=1;return sc}
function sessionsFor(prof){return [...SESSIONS].sort((a,b)=>sessScore(prof,b)-sessScore(prof,a)||a.d.localeCompare(b.d))}
const VOLS=[["Elena R.","Finance · statements & cash flow"],["Priya N.","Data Science · AI tools"],["Devon L.","Small Business Bank · credit"],["Alexis M.","Marketing · digital presence"],["Chris W.","Cyber · fraud prevention"]];
const GRANTS=[
{u:"https://aeoworks.org/",st:"ALL",l:"img/logos/aeo.png",n:"Business Grant Program for Black-Owned Businesses (with AEO)",a:"$10,000",m:"National",who:"Black-owned, 2+ yrs operating, revenue up to $1M",type:"Grant",src:"SMB",note:"2025 round: 120 grants"},
{u:"https://thedec.co/",st:["Texas"],l:"img/logos/dec.png",k:"Technology & software",n:"The DEC Network Accelerator awards",a:"$2,000–$15,000",m:"West South Central",who:"Dallas founders in the 12-week cohort",type:"Grant",src:"ACC"},
{u:"https://liftoffhouston.org/",st:["Texas"],l:"img/logos/houston.svg",k:"Technology & software",n:"Liftoff Houston seed prizes",a:"$30,000+ across winners",m:"West South Central",who:"Houston startups, business plan competition",type:"Competition",src:"SMB"},
{u:"https://www.thesoarfund.org/",st:["Alabama","Arkansas","District of Columbia","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia","West Virginia"],w:"SOAR",n:"SOAR Fund CDFI lending",a:"Loan via local CDFI",m:"National",who:"SMBs in 15 southern states + DC",type:"Loan",src:"SMB"},
{st:["Delaware"],w:"DMS",k:"Retail & consumer",n:"Delaware Main Street Micro-grant",a:"$5,000",m:"South Atlantic",who:"Wilmington storefronts, under 10 staff",type:"Grant",S:1},
{st:"ALL",w:"WFG",n:"Women Founders Growth Fund",a:"$25,000",m:"National",who:"Women-owned, $100K–$2M revenue",type:"Grant",S:1},
{st:["Texas"],w:"DDU",k:"Retail & consumer",n:"Dallas Digital Upgrade Grant",a:"$3,500",m:"West South Central",who:"Retail & service SMBs going online",type:"Grant",S:1},
{st:["Virginia"],w:"RKF",k:"Food, beverage & hospitality",n:"Richmond Kitchen Equipment Fund",a:"$7,500",m:"South Atlantic",who:"Food businesses, 1+ yr operating",type:"Grant",S:1},
{st:["Texas"],w:"DRR",k:"Food, beverage & hospitality",n:"Dallas Restaurant Resilience Grant",a:"$10,000",m:"West South Central",who:"Dallas restaurants and food trucks, 1+ yr operating",type:"Grant",S:1},
{st:["Massachusetts","Connecticut","Rhode Island","New Hampshire","Vermont","Maine"],w:"NECC",k:"Education & childcare",n:"New England Child Care Growth Grant",a:"$12,000",m:"New England",who:"Licensed child care centers and family child care, Boston and New England",type:"Grant",S:1},
{st:["Massachusetts"],w:"BMS",k:"Retail & consumer",n:"Boston Main Streets Storefront Grant",a:"$5,000",m:"New England",who:"Boston storefront businesses, under 20 staff",type:"Grant",S:1},
{st:["Texas"],w:"TCF",k:"Construction & manufacturing",n:"Texas Trades Equipment Loan",a:"Up to $50,000",m:"West South Central",who:"Contractors, makers and trades businesses in Texas",type:"Loan",S:1},
{st:"ALL",w:"PSF",k:"Professional, financial & business services",n:"Professional Services Growth Grant",a:"$7,500",m:"National",who:"Consultancies, agencies and service firms, 2+ yrs",type:"Grant",S:1}];
const ACCS=[
{n:"The DEC Network",l:"img/logos/dec.png",org:"Dallas Small Business Accelerator, with UT Dallas",m:"West South Central",st:"Early stage",len:"12 weeks",src:"ACC",u:"https://thedec.co/"},
{n:"UT Dallas Innovation & Entrepreneurship",l:"img/logos/utd.svg",org:"CometX Accelerator, Richardson, TX",m:"West South Central",st:"Idea / early stage",len:"University accelerator",u:"https://innovation.utdallas.edu/cometx-accelerator/"},
{n:"Union Kitchen Accelerator",w:"Union Kitchen",org:"Union Kitchen, Washington, DC",m:"South Atlantic",st:"Early",len:"180 days, in person, rolling admission",src:"RVA",u:"https://www.unionkitchen.com/"},
{n:"Latino Business Action Network (LBAN)",w:"LBAN",org:"LBAN Scaling Program with Stanford GSB faculty, Stanford, CA",m:"Pacific",st:"Growth",len:"Nine weeks, two tracks",u:"https://www.lban.us/programs/business-scaling-program/"},
{n:"Halcyon",l:"img/logos/halcyon.png",org:"Impact-driven startup accelerator, Washington, DC",m:"South Atlantic",st:"Early stage",len:"Programs since 2014",u:"https://halcyonaccelerator.org/programs/"},
{n:"Propeller",w:"PROP",org:"Impact Accelerator, New Orleans, LA",m:"West South Central",st:"Early stage",len:"Cohort accelerator",u:"https://gopropeller.org/impact-accelerator/"},
{n:"Rising Tide Capital",w:"RTC",org:"Community Business Academy, Jersey City, NJ",m:"Middle Atlantic",st:"Idea / early stage",len:"Business training + coaching",u:"https://programs.risingtidecapital.org/community-business-academy/"},
{n:"Hot Bread Kitchen",w:"HBK",org:"HBK Incubates, New York, NY",m:"Middle Atlantic",st:"Early stage",len:"Food business incubator",u:"https://hotbreadkitchen.org/hbki/"},
{n:"1871",w:"1871",org:"Innovation hub, Chicago, IL",m:"East North Central",st:"Early stage",len:"Cohort programs",u:"https://1871.com/"},
{n:"gener8tor",w:"g8",org:"gBETA Milwaukee, Milwaukee, WI",m:"East North Central",st:"Idea / early stage",len:"Free pre-accelerator",u:"https://www.gener8tor.com/gbeta/milwaukee"},
{n:"LearnLaunch",l:"img/logos/learnlaunch.svg",org:"LearnLaunch Accelerator, Boston, MA",m:"New England",st:"Pre-seed",len:"Accelerator + pre-seed fund",u:"https://learnlaunch.com/"},
{n:"La Cocina",w:"LC",org:"Food business incubator, San Francisco, CA",m:"Pacific",st:"Idea / early stage",len:"Kitchen incubator",u:"https://www.lacocinasf.org/"},
{n:"mHUB",l:"img/logos/mhub.png",org:"mHUB Accelerator, Chicago, IL",m:"East North Central",st:"Early stage",len:"Hardtech accelerator",u:"https://mhub.org/accelerator"},
{n:"Social Enterprise Greenhouse",l:"img/logos/segreenhouse.png",org:"SEG Accelerator, Providence, RI",m:"New England",st:"Early stage",len:"Social enterprise accelerator",u:"https://segri.org/accelerator/"},
{n:"Boomtown",l:"img/logos/boomtown.png",org:"Boomtown Accelerator, Boulder, CO",m:"Mountain",st:"Early stage",len:"Startup accelerator",u:"https://boomtownaccelerators.com/"}];
const PERKS=[
{n:"Claude or Gemini AI",l:"img/logos/claude.svg",o:"Member discount on AI assistant access for your team",sv:"20% off team plans for 12 months",c:"AI"},
{n:"Google Workspace",l:"img/logos/gworkspace.svg",o:"Member discount on business email, Docs and Drive",sv:"First 3 months free",c:"Productivity"},
{n:"Gusto",l:"img/logos/gusto.svg",o:"Member discount on payroll, benefits and HR",sv:"3 months free + 15% off year one",c:"Payroll"},
{n:"QuickBooks",l:"img/logos/qb.svg",o:"Member discount on bookkeeping, invoicing and expense tracking",sv:"50% off for 6 months",c:"Accounting"},
{n:"Shopify",l:"img/logos/shopify.svg",o:"Member discount on an online store and point-of-sale",sv:"First 3 months for $1/month",c:"E-commerce"},
{n:"HubSpot for Startups",l:"img/logos/hubspot.svg",o:"Member discount on CRM, email marketing and sales tools",sv:"Up to 75% off year one",c:"Marketing"},
{n:"Zoom Workplace",l:"img/logos/zoom.svg",o:"Member discount on video meetings and business phone",sv:"$200 in credits",c:"Communication"},
{n:"Slack",l:"img/logos/slack.svg",o:"Member discount on team messaging for growing staff",sv:"25% off Pro for 12 months",c:"Communication"},
{n:"Microsoft 365 Business",l:"img/logos/m365.svg",o:"Member discount on Outlook, Teams, Word and Excel",sv:"$150 in credits",c:"Productivity"},
{n:"Docusign",l:"img/logos/docusign.svg",o:"Member discount on e-signatures for contracts and invoices",sv:"30% off for 6 months",c:"Operations"}];
ACCS.forEach(a=>{const p=PROGRAMS.find(p=>p.n==a.n);if(p){a.k=p.k;if(p.l)a.l=p.l}});
GRANTS.sort((a,b)=>a.n.localeCompare(b.n));ACCS.sort((a,b)=>a.n.localeCompare(b.n));PERKS.sort((a,b)=>a.n.localeCompare(b.n));
const LS={get:(k,d)=>JSON.parse(localStorage.getItem("ih_"+k)||JSON.stringify(d)),set:(k,v)=>localStorage.setItem("ih_"+k,JSON.stringify(v))};
function regd(){return LS.get("reg",[])}
function toggleReg(id){let r=regd();r=r.includes(id)?r.filter(x=>x!=id):[...r,id];LS.set("reg",r);return r.includes(id)}
function fmtD(d){const x=new Date(d+"T12:00");return x.toLocaleString("en-US",{month:"short"})+"<br>"+x.getDate()}
function opts(sel,label,list){sel.innerHTML=`<option value="">${label}: all</option>`+AZ(list).map(x=>`<option>${x}</option>`).join("")}
function modal(html){let m=document.getElementById("mdl");if(!m){m=document.createElement("div");m.id="mdl";m.className="modal";m.onclick=e=>{if(e.target==m)m.style.display="none"};document.body.append(m)}
 m.classList.toggle("wide",/class="mgrid"/.test(html));m.innerHTML=`<div>${html}</div>`;m.style.display="grid";return m}

function plogo(p){return p.l?`<img src="${p.l}" alt="">`:`<span class="lm">100</span>`}
// Session details popup: description, goals, leader, format. Workshops let you pick your own time; webinars register at the fixed time.
const ACCENTS={AI:"#0276B1",Finance:"var(--rec)",Legal:"#CC2427",Marketing:"#8a3ea3",Operations:"#b4620a",Technology:"#013D5B"};
// Banking product recommendations, driven by the company profile (years in business / revenue / employees).
function bankRecs(){const p=getProfile(),r=new Set();
 if(p.years<=2)r.add("chk"),r.add("sav");
 if(p.revenue=="Over $2M"||p.revenue=="$500K\u2013$2M")r.add("loc"),r.add("mer");
 if(p.employees>=5)r.add("dc"),r.add("mer");
 if(!r.size)r.add("chk");
 return r}
function applyBankRecs(){const r=bankRecs();const parents=new Set();document.querySelectorAll("[data-bk]").forEach(el=>{const on=r.has(el.dataset.bk);el.classList.toggle("isrec",on);parents.add(el.parentNode);let t=el.querySelector(".rectag");if(on&&!t){t=document.createElement("span");t.className="rectag";t.textContent="Recommended for you";el.prepend(t)}else if(!on&&t)t.remove()});
 parents.forEach(pn=>{const k=[...pn.children];k.filter(e=>e.classList.contains("isrec")).reverse().forEach(e=>pn.prepend(e))})}
// Calendar slot picker: month grid with available days; pick a day, then a time.
function slotCal(el,slots,onPick){const by={};slots.forEach(t=>{const [d,tm]=t.split(" ");(by[d]=by[d]||[]).push(tm)});const days=Object.keys(by).sort();let cur=new Date(days[0]+"T12:00");cur.setDate(1);let pickD=null,pickT=null;
 const draw=()=>{const y=cur.getFullYear(),mo=cur.getMonth(),first=new Date(y,mo,1).getDay(),n=new Date(y,mo+1,0).getDate();let g="";
  for(let i=0;i<first;i++)g+="<span></span>";for(let d=1;d<=n;d++){const key=`${y}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;g+=by[key]?`<button type="button" class="av${key==pickD?" on":""}" data-d="${key}">${d}</button>`:`<span class="na">${d}</span>`}
  el.innerHTML=`<div class="scal"><div class="schd"><button type="button" class="pv" aria-label="Previous month">‹</button><b>${cur.toLocaleString("en-US",{month:"long",year:"numeric"})}</b><button type="button" class="nx" aria-label="Next month">›</button></div><div class="sgrid">${["S","M","T","W","T","F","S"].map(x=>`<i>${x}</i>`).join("")}${g}</div><div class="stimes">${pickD?`<small>Times on ${new Date(pickD+"T12:00").toDateString()}</small>`+by[pickD].map(t=>`<button type="button" class="tm${t==pickT?" on":""}" data-t="${t}">${t} ET</button>`).join(""):'<small>Pick a highlighted day to see open times.</small>'}</div></div>`;
  el.querySelector(".pv").onclick=()=>{cur.setMonth(cur.getMonth()-1);draw()};el.querySelector(".nx").onclick=()=>{cur.setMonth(cur.getMonth()+1);draw()};
  el.querySelectorAll(".av").forEach(b=>b.onclick=()=>{pickD=b.dataset.d;pickT=by[pickD].length==1?by[pickD][0]:null;draw();onPick(pickT?pickD+" "+pickT+" ET":null)});
  el.querySelectorAll(".tm").forEach(b=>b.onclick=()=>{pickT=b.dataset.t;draw();onPick(pickD+" "+pickT+" ET")})};draw()}
const notesBox=()=>`<label class="notes">What do you hope to get out of it? <span class="mut">(optional)</span><textarea id="snotes" maxlength="500" rows="3" placeholder="Goals, questions or anything the leader should know"></textarea><small class="cnt500"><span>0</span>/500</small></label>`;
function wireNotes(m){const t=m.querySelector("#snotes");if(t)t.oninput=()=>m.querySelector(".cnt500 span").textContent=t.value.length}
function sessionModal(id,register){const s=SESSIONS.find(x=>x.id==id);if(!s)return;const acc=ACCENTS[s.t]||"#0276B1";const r=regd().includes(s.id);
 const showSlots=s.f=="Workshop"&&register&&!r;
 const action=r?`<button class="btn sm ghost" type="button" id="cancelBtn">Cancel registration</button>`:register?(s.f=="Workshop"?`<button class="btn" id="goBtn" disabled>Confirm registration</button>`:`<button class="btn" id="goBtn">Register for ${fmtD(s.d).replace("<br>"," ")} · ${s.tm} ET</button>`):`<button class="btn" id="goBtn" data-open="1">${s.f=="Workshop"?"Schedule a time":"Register"}</button>`;
 const m=modal(`<div style="border-top:5px solid ${acc};margin:-22px -22px 16px;border-radius:${10}px ${10}px 0 0;height:5px"></div>${register&&!r?'<div class="mgrid"><div class="mcol">':""}<span class="tag">${s.t}</span><span class="tag">${s.f}</span><h3 style="margin-top:8px">${s.n}</h3>
 <p class="mut"><b>Led by</b> ${s.v}</p><p>${s.ds||""}</p><p><b>What you'll get:</b> ${s.gl||""}</p><p class="mut">${s.f=="Webinar"?`${new Date(s.d+"T12:00").toDateString()} · ${s.tm} ET${s.m?" · "+s.m:""} · fixed time`:"Workshop · pick a day and time that works for you"}</p>
 ${register&&!r?'</div><div class="mcol">':""}${showSlots?'<div id="slotCal"></div>':""}${register&&!r?notesBox():""}<div style="margin-top:14px">${action}</div><div class="ok"></div>${register&&!r?"</div></div>":""}`);
 let picked=null;if(showSlots)slotCal(m.querySelector("#slotCal"),SLOTS[s.id]||[s.d+" "+s.tm+" ET"],v=>{picked=v;const g=m.querySelector("#goBtn");g.disabled=!v;g.textContent=v?"Confirm "+v.replace(/^(\d+)-(\d+)-(\d+)/,(x,y,mo,d)=>new Date(x+"T12:00").toDateString().slice(0,10)):"Confirm registration"});wireNotes(m);
 const close=()=>{m.style.display="none"};
 const gb=m.querySelector("#goBtn");if(gb)gb.onclick=()=>{if(gb.dataset.open){close();sessionModal(s.id,true);return}toggleReg(s.id);m.querySelector(".ok").innerHTML=`<b>${s.f=="Workshop"?"Registered for "+(picked||s.d):"Registered"}.</b> We'll send a confirmation email. (Prototype: nothing was sent.)`;m.querySelector(".ok").style.display="block";gb.style.display="none";const sc=m.querySelector("#slotCal");if(sc)sc.style.display="none";const nt=m.querySelector(".notes");if(nt)nt.style.display="none";if(typeof ren=="function")ren()};
 const cb=m.querySelector("#cancelBtn");if(cb)cb.onclick=()=>{toggleReg(s.id);close();if(typeof ren=="function")ren()}}

const ADV=[];[16,17,18,19,20,23,24,25,30].forEach(d=>["09:30","11:00","14:00","16:00"].forEach((t,i)=>{if((d+i)%3)ADV.push(`2026-11-${String(d).padStart(2,"0")} ${t} ET`)}));
function advisor(n){let pk=null;const m=modal(`<div style="border-top:5px solid var(--rec);margin:-22px -22px 16px;border-radius:10px 10px 0 0;height:5px"></div><div class="mgrid"><div class="mcol"><span class="tag">Funding</span><span class="tag">Advisor call</span><h3 style="margin-top:8px">Schedule time with an advisor</h3><p class="mut"><b>With</b> a 100th Street Bank small business advisor</p><p>${n?"A 30-minute call on how to position your business for <b>"+n+"</b>.":"A 30-minute call on positioning your business for funding."}</p><p><b>What you'll get:</b> A read on your eligibility, what to prepare, and how to make your application stand out.</p><p class="mut">Advisor call · pick a day and time that works for you</p></div><div class="mcol"><form id="avf"><div id="avcal"></div>${notesBox().replace("What do you hope to get out of it?","Anything we should know?")}<div style="margin-top:14px"><button class="btn" id="avb" disabled>Confirm advisor call</button></div></form><div class="ok"><b>Requested.</b> An advisor will confirm by email. (Prototype: nothing was sent.)</div></div></div>`);
 slotCal(m.querySelector("#avcal"),ADV,v=>{pk=v;avb.disabled=!v;avb.textContent=v?"Confirm "+new Date(v.slice(0,10)+"T12:00").toDateString().slice(0,10)+" · "+v.slice(11):"Confirm advisor call"});wireNotes(m);
 avf.onsubmit=e=>{e.preventDefault();avf.style.display="none";avf.nextElementSibling.style.display="block"}}
function searchBox(el,ph){el.insertAdjacentHTML("afterbegin",`<input class="kw" id="kw" placeholder="${ph}" style="flex:2;min-width:240px;padding:10px 12px;border:1px solid var(--g2);border-radius:8px;font:inherit">`);return document.getElementById("kw")}
const hit=(q,...f)=>!q||f.join(" ").toLowerCase().includes(q.toLowerCase());

// Multi-select state picker (same as public home page)
function statePicker(el,onChange){const ALL=Object.values(ST_ABBR).sort(),SEL=[];let hi=0;
 el.insertAdjacentHTML("beforeend",`<div class="stpick"><span class="stc"></span><input placeholder="Add a state" autocomplete="off" aria-label="Filter by state"><ul role="listbox"></ul></div>`);
 const box=el.querySelector(".stpick"),chips=box.querySelector(".stc"),inp=box.querySelector("input"),sug=box.querySelector("ul");
 const draw=()=>{chips.innerHTML=SEL.map(x=>`<span class="chip">${x}<button aria-label="Remove ${x}" data-s="${x}">×</button></span>`).join("");chips.querySelectorAll("button").forEach(b=>b.onclick=()=>{SEL.splice(SEL.indexOf(b.dataset.s),1);draw();onChange(SEL)});inp.placeholder=SEL.length?"Add another":"Add a state"};
 const add=x=>{if(x&&!SEL.includes(x))SEL.push(x);inp.value="";sug.innerHTML="";draw();onChange(SEL);inp.focus()};
 inp.oninput=()=>{const v=inp.value.trim().toLowerCase();if(!v){sug.innerHTML="";return}const L=ALL.filter(x=>!SEL.includes(x)&&x.toLowerCase().startsWith(v)).concat(ALL.filter(x=>!SEL.includes(x)&&!x.toLowerCase().startsWith(v)&&x.toLowerCase().includes(v))).slice(0,8);hi=0;
  sug.innerHTML=L.map((x,i)=>`<li role="option" class="${i?"":"hi"}" data-s="${x}">${x}</li>`).join("");sug.querySelectorAll("li").forEach(li=>li.onmousedown=e=>{e.preventDefault();add(li.dataset.s)})};
 inp.onblur=()=>setTimeout(()=>sug.innerHTML="",100);
 inp.onkeydown=e=>{const li=[...sug.querySelectorAll("li")];if(e.key=="ArrowDown"||e.key=="ArrowUp"){e.preventDefault();if(!li.length)return;hi=(hi+(e.key=="ArrowDown"?1:-1)+li.length)%li.length;li.forEach((l,i)=>l.classList.toggle("hi",i==hi))}else if(e.key=="Enter"){e.preventDefault();if(li[hi])add(li[hi].dataset.s)}else if(e.key=="Backspace"&&!inp.value&&SEL.length){SEL.pop();draw();onChange(SEL)}};
 box.onclick=e=>{if(e.target==box||e.target==chips)inp.focus()};return SEL}

// First login: create a business profile, then a short orientation tour.
const TOUR=[["Welcome to your Impact Hub","This is your member portal from 100th Street Bank. Everything here is tuned to the business profile you just created.",null],
["Home","Your dashboard: upcoming sessions, funding picked for you, and banking options in one place.",'nav.main a[href="app-home.html"]'],
["Workshops","Browse webinars and workshops led by bank volunteers. Pick a day and time on the calendar and tell the leader what you hope to get out of it.",'nav.main a[href="app-workshops.html"]'],
["Funding & Programs","Grants, loans, competitions and incubator/accelerator programs in one list. Filter by category; the best fits for you are at the top.",'nav.main a[href="app-grants.html"]'],
["Banking","Accounts, cards and credit, with a 100th Street Bank assistant and bankers ready to help.",'nav.main a[href="app-banking.html"]'],
["Perks","Member discounts on tools you already use, like payroll, bookkeeping and e-commerce.",'nav.main a[href="app-perks.html"]'],
["Look for “Recommended”","Anything marked Recommended matches your industry, location or profile and is listed first. Update your profile any time to change your recommendations.",null]];
function startTour(i=0){document.querySelectorAll(".tourhl").forEach(e=>e.classList.remove("tourhl"));let t=document.getElementById("tour");if(i>=TOUR.length){if(t)t.remove();LS.set("toured",1);return}
 if(!t){t=document.createElement("div");t.id="tour";document.body.append(t)}const [h,b,sel]=TOUR[i];const el=sel&&document.querySelector(sel);if(el&&el.offsetParent){el.classList.add("tourhl");el.scrollIntoView({block:"nearest",inline:"center"})}
 t.innerHTML=`<div class="tbox" role="dialog" aria-label="${h}"><small>${i+1} of ${TOUR.length}</small><h3>${h}</h3><p>${b}</p><div class="tdots">${TOUR.map((_,k)=>`<i class="${k==i?"on":""}"></i>`).join("")}</div><div class="tact"><button class="lnk" id="tskip">Skip tour</button>${i?'<button class="btn sm ghost" id="tback">Back</button>':""}<button class="btn sm" id="tnext">${i==TOUR.length-1?"Get started":"Next"}</button></div></div>`;
 tskip.onclick=()=>startTour(TOUR.length);tnext.onclick=()=>startTour(i+1);const bk=document.getElementById("tback");if(bk)bk.onclick=()=>startTour(i-1)}
function onboarding(){const m=modal(`<div class="onb"><span class="eyebrow dk">Step 1 of 2 · Create your business profile</span><h2>Welcome to the Impact Hub</h2><p class="mut">Tell us about your business so we can set up your portal and recommend the right workshops, funding and programs. A restaurant in Dallas and a wedding cake shop in Boston will each see different recommendations.</p>
<form class="f pform" id="onbf">${profileFields({industry:"Food, beverage & hospitality",revenue:REVS[1]})}<div class="full onbact"><button class="btn">Create profile</button><button type="button" class="lnk" id="onbdemo">Skip and use the demo business</button></div></form></div>`);
 m.classList.add("onbm");m.onclick=null;wireZip(onbf);
 const done=p=>{saveProfile(p);m.style.display="none";m.classList.remove("onbm");if(typeof pageInit=="function")pageInit();startTour(0)};
 onbf.onsubmit=e=>{e.preventDefault();done(readProfile(onbf))};onbdemo.onclick=()=>done(defaultProfile())}
addEventListener("load",()=>{const fresh=!sessionStorage.getItem("ih_in");sessionStorage.setItem("ih_in","1");if(!hasProfile())onboarding();else if(fresh||new URLSearchParams(location.search).has("tour"))startTour(0)});
