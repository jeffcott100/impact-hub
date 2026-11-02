// Member portal data. All fictional.
const ME={biz:"Harbor & Vine Catering",owner:"Danielle",city:"Richmond, VA",via:"Union Kitchen Accelerator",viaSrc:"RVA",stage:"Growth (3 yrs, 6 employees)",market:"South Atlantic"};
// Company profile used to drive "Recommended" ranking across the portal. Editable via Edit profile.
function defaultProfile(){return{biz:ME.biz,industry:"Food & beverage",zip:"23220",employees:6,revenue:"$500K\u2013$2M",years:3}}
function getProfile(){return LS.get("profile",defaultProfile())}
function saveProfile(p){LS.set("profile",p)}
const INDUSTRIES=["Community & main street","Education","Food & beverage","Social impact","Tech & startups"];
function industryMatch(profIndustry,itemIndustry){if(!itemIndustry)return false;return itemIndustry===profIndustry}
function recScore(prof,item){let sc=0;if(item.k&&industryMatch(prof.industry,item.k))sc+=2;else if(item.who&&prof.industry&&item.who.toLowerCase().includes(prof.industry.split(" ")[0].toLowerCase()))sc+=1;if(item.m&&item.m==ME.market)sc+=1;if(item.who&&/revenue|\$/.test(item.who)){/* light revenue hint, best-effort */}return sc}
function sortRecommended(list,prof){return [...list].sort((a,b)=>recScore(prof,b)-recScore(prof,a))}
function profileModal(){const p=getProfile();const m=modal(`<h3>Edit business profile</h3><p class="mut">Used to recommend workshops, funding and accelerators for you.</p><form class="f" id="pfm">
<label>Business name<input name="biz" value="${p.biz}" required></label>
<label>Industry<select name="industry">${INDUSTRIES.map(i=>`<option ${i==p.industry?"selected":""}>${i}</option>`).join("")}</select></label>
<label>ZIP code<input name="zip" value="${p.zip}" pattern="[0-9]{5}" required></label>
<label>Employee count<input name="employees" type="number" min="0" value="${p.employees}" required></label>
<label>Annual revenue<select name="revenue">${["Under $100K","$100K\u2013$500K","$500K\u2013$2M","Over $2M"].map(r=>`<option ${r==p.revenue?"selected":""}>${r}</option>`).join("")}</select></label>
<label>Years in business<input name="years" type="number" min="0" value="${p.years}" required></label>
<button class="btn">Save profile</button></form><div class="ok"><b>Saved.</b> Recommendations across the portal are updated.</div>`);
pfm.onsubmit=e=>{e.preventDefault();const fd=new FormData(pfm);const np={biz:fd.get("biz"),industry:fd.get("industry"),zip:fd.get("zip"),employees:+fd.get("employees"),revenue:fd.get("revenue"),years:+fd.get("years")};saveProfile(np);pfm.style.display="none";pfm.nextElementSibling.style.display="block";setTimeout(()=>{if(typeof pfRender=="function")pfRender();if(typeof ren=="function")ren()},50)}}
const TOPICS=["AI","Finance","Legal","Marketing","Operations","Technology"];
const SMARKETS=["Greater Washington","Texas","Virginia"];
const SESSIONS=[
["s1","AI","AI for small business","2026-10-28","12:00","","Workshop","Priya Natarajan, Data Science","Hands-on session on where AI tools genuinely save owner-operators time, from scheduling to customer replies.","Leave with 3 AI tools set up for your business and a short list of what to avoid.",1,1],
["s3","Finance","Financial statements 101","2026-11-04","13:00","","Workshop","Elena Reyes, Finance","Read your P&L and balance sheet like a banker does, and know which numbers to watch monthly.","Understand your statements well enough to spot a problem before it becomes one.",0,1],
["s13","Finance","Managing business credit","2026-11-05","12:00","","Workshop","Devon Larkin, Small Business Bank","How business credit is built and used, and the habits that keep your score moving the right direction.","Walk away with a personal plan to raise or protect your business credit score.",0,1],
["s14","Finance","Business loan basics","2026-11-09","12:00","Greater Washington","Workshop","Marcus Thibodeaux, Commercial Banking","What lenders look for, loan types available to small businesses, and how to prepare an application.","Know which loan product fits your stage and what documents to gather first.",0,1],
["s15","Operations","Strategy coaching program","2026-11-16","10:00","","Workshop","Taylor Simmons, Business Coaching","A matched 1:1 coaching track with a 100th Street Bank volunteer, built around your growth goals.","Finish with a written 90-day growth plan reviewed by your coach.",0,1,1],
["s4","Finance","Cash flow planning","2026-11-06","09:30","Virginia","Workshop","Jordan Kwan, Treasury","Build a simple cash flow forecast and plan for seasonal dips before they hit.","Leave with a 13-week cash flow template filled in for your business.",0,0],
["s5","Legal","Legal clinic","2026-11-10","14:00","Virginia","Webinar","Morgan Bell, Legal","Live Q&A on contracts, entity structure and compliance basics for small business owners.","Get plain-language answers to your top legal questions before they become expensive.",1,0],
].map(([id,t,n,d,tm,m,f,v,ds,gl,real,jeff,apply])=>({id,t,n,d,tm,m,f,v,ds,gl,real,jeff,apply})).sort((a,b)=>(b.jeff||0)-(a.jeff||0));
// Extra selectable time slots for individually-scheduled Workshops (members pick their own time).
const SLOTS={s1:["2026-10-28 12:00 ET","2026-11-02 15:00 ET","2026-11-06 10:00 ET"],s3:["2026-11-04 13:00 ET","2026-11-07 09:00 ET"],s13:["2026-11-05 12:00 ET","2026-11-10 14:00 ET"],s14:["2026-11-09 12:00 ET","2026-11-13 11:00 ET"],s15:["2026-11-16 10:00 ET","2026-11-18 13:00 ET","2026-11-20 09:30 ET"],s4:["2026-11-06 09:30 ET","2026-11-11 10:30 ET"]};

const VOLS=[["Elena R.","Finance · statements & cash flow"],["Priya N.","Data Science · AI tools"],["Devon L.","Small Business Bank · credit"],["Alexis M.","Marketing · digital presence"],["Chris W.","Cyber · fraud prevention"]];
const GRANTS=[
{u:"https://aeoworks.org/",st:"ALL",l:"img/logos/aeo.png",n:"Business Grant Program for Black-Owned Businesses (with AEO)",a:"$10,000",m:"National",who:"Black-owned, 2+ yrs operating, revenue up to $1M",type:"Grant",src:"SMB",note:"2025 round: 120 grants"},
{u:"https://thedec.co/",st:["Texas"],l:"img/logos/dec.png",n:"The DEC Network Accelerator awards",a:"$2,000–$15,000",m:"West South Central",who:"Dallas founders in the 12-week cohort",type:"Grant",src:"ACC"},
{u:"https://liftoffhouston.org/",st:["Texas"],l:"img/logos/houston.svg",n:"Liftoff Houston seed prizes",a:"$30,000+ across winners",m:"West South Central",who:"Houston startups, business plan competition",type:"Competition",src:"SMB"},
{u:"https://www.thesoarfund.org/",st:["Alabama","Arkansas","District of Columbia","Florida","Georgia","Kentucky","Louisiana","Maryland","Mississippi","North Carolina","Oklahoma","South Carolina","Tennessee","Texas","Virginia","West Virginia"],w:"SOAR",n:"SOAR Fund CDFI lending",a:"Loan via local CDFI",m:"National",who:"SMBs in 15 southern states + DC",type:"Loan",src:"SMB"},
{st:["Delaware"],w:"DMS",n:"Delaware Main Street Micro-grant",a:"$5,000",m:"South Atlantic",who:"Wilmington storefronts, under 10 staff",type:"Grant",S:1},
{st:"ALL",w:"WFG",n:"Women Founders Growth Fund",a:"$25,000",m:"National",who:"Women-owned, $100K–$2M revenue",type:"Grant",S:1},
{st:["Texas"],w:"DDU",n:"Dallas Digital Upgrade Grant",a:"$3,500",m:"West South Central",who:"Retail & service SMBs going online",type:"Grant",S:1},
{st:["Virginia"],w:"RKF",n:"Richmond Kitchen Equipment Fund",a:"$7,500",m:"South Atlantic",who:"Food businesses, 1+ yr operating",type:"Grant",S:1}];
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
{n:"Boomtown",w:"BOOM",org:"Boomtown Accelerator, Boulder, CO",m:"Mountain",st:"Early stage",len:"Startup accelerator",u:"https://boomtownaccelerators.com/"}];
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
GRANTS.sort((a,b)=>a.n.localeCompare(b.n));ACCS.sort((a,b)=>a.n.localeCompare(b.n));PERKS.sort((a,b)=>a.n.localeCompare(b.n));
const LS={get:(k,d)=>JSON.parse(localStorage.getItem("ih_"+k)||JSON.stringify(d)),set:(k,v)=>localStorage.setItem("ih_"+k,JSON.stringify(v))};
function regd(){return LS.get("reg",[])}
function toggleReg(id){let r=regd();r=r.includes(id)?r.filter(x=>x!=id):[...r,id];LS.set("reg",r);return r.includes(id)}
function fmtD(d){const x=new Date(d+"T12:00");return x.toLocaleString("en-US",{month:"short"})+"<br>"+x.getDate()}
function opts(sel,label,list){sel.innerHTML=`<option value="">${label}: all</option>`+list.map(x=>`<option>${x}</option>`).join("")}
function modal(html){let m=document.getElementById("mdl");if(!m){m=document.createElement("div");m.id="mdl";m.className="modal";m.onclick=e=>{if(e.target==m)m.style.display="none"};document.body.append(m)}
 m.innerHTML=`<div>${html}</div>`;m.style.display="grid";return m}

function plogo(p){return p.l?`<img src="${p.l}" alt="">`:`<span class="lm">100</span>`}
// Session details popup: description, goals, leader, format. Workshops let you pick your own time; webinars register at the fixed time.
const ACCENTS={AI:"#0276B1",Finance:"#1b7a3d",Legal:"#CC2427",Marketing:"#8a3ea3",Operations:"#b4620a",Technology:"#013D5B"};
// Banking product recommendations, driven by the company profile (years in business / revenue / employees).
function bankRecs(){const p=getProfile(),r=new Set();
 if(p.years<=2)r.add("chk"),r.add("sav");
 if(p.revenue=="Over $2M"||p.revenue=="$500K\u2013$2M")r.add("loc"),r.add("mer");
 if(p.employees>=5)r.add("dc"),r.add("mer");
 if(!r.size)r.add("chk");
 return r}
function applyBankRecs(){const r=bankRecs();document.querySelectorAll("[data-bk]").forEach(el=>{const on=r.has(el.dataset.bk);el.classList.toggle("recbox",on);let t=el.querySelector(".rectag");if(on&&!t){t=document.createElement("span");t.className="tag rectag";t.style.background="#1b7a3d";t.style.color="#fff";t.style.borderColor="#1b7a3d";t.textContent="Recommended for you";(el.querySelector("small")||el).after(t)}else if(!on&&t)t.remove()})}
function sessionModal(id,register){const s=SESSIONS.find(x=>x.id==id);if(!s)return;const acc=ACCENTS[s.t]||"#0276B1";const r=regd().includes(s.id);
 const showSlots=s.f=="Workshop"&&register&&!r;
 const slotPicker=showSlots?`<label>Choose a time<select id="slotSel">${(SLOTS[s.id]||[s.d+" "+s.tm+" ET"]).map(t=>`<option>${t}</option>`).join("")}</select></label>`:"";
 const action=r?`<button class="btn sm ghost" type="button" id="cancelBtn">Cancel registration</button>`:register?(s.f=="Workshop"?`<button class="btn" id="goBtn">Confirm registration</button>`:`<button class="btn" id="goBtn">Register for ${fmtD(s.d).replace("<br>"," ")} · ${s.tm} ET</button>`):`<button class="btn" id="goBtn" data-open="1">${s.f=="Workshop"?"Schedule a time":"Register"}</button>`;
 const m=modal(`<div style="border-top:5px solid ${acc};margin:-22px -22px 16px;border-radius:${10}px ${10}px 0 0;height:5px"></div><span class="tag">${s.t}</span><span class="tag">${s.f}</span><h3 style="margin-top:8px">${s.n}</h3>
 <p class="mut"><b>Led by</b> ${s.v}</p><p>${s.ds||""}</p><p><b>What you'll get:</b> ${s.gl||""}</p><p class="mut">${s.f=="Webinar"?`${new Date(s.d+"T12:00").toDateString()} · ${s.tm} ET${s.m?" · "+s.m:""} · fixed time, click to register`:"Workshop · pick a time that works for you"}</p>
 ${slotPicker}<div style="margin-top:14px">${action}</div><div class="ok"></div>`);
 const close=()=>{m.style.display="none"};
 const gb=m.querySelector("#goBtn");if(gb)gb.onclick=()=>{if(gb.dataset.open){close();sessionModal(s.id,true);return}toggleReg(s.id);m.querySelector(".ok").innerHTML=`<b>${s.f=="Workshop"?"Registered for "+(m.querySelector("#slotSel")?m.querySelector("#slotSel").value:s.d):"Registered"}.</b> We'll send a confirmation email. (Prototype: nothing was sent.)`;m.querySelector(".ok").style.display="block";gb.style.display="none";if(typeof ren=="function")ren()};
 const cb=m.querySelector("#cancelBtn");if(cb)cb.onclick=()=>{toggleReg(s.id);close();if(typeof ren=="function")ren()}}

function advisor(n){const m=modal(`<h3>Schedule time with an advisor</h3><p class="mut">${n?"A 30-minute call on how to position your business for <b>"+n+"</b>.":"A 30-minute call on positioning your business for funding."}</p><form class="f" id="avf"><label>Preferred date<input type="date" required value="2026-11-03"></label><label>Time<select><option>Morning</option><option>Midday</option><option>Afternoon</option></select></label><label>Anything we should know?<textarea rows="3"></textarea></label><button class="btn">Request time</button></form><div class="ok"><b>Requested.</b> An advisor will confirm by email. (Prototype: nothing was sent.)</div>`);avf.onsubmit=e=>{e.preventDefault();avf.style.display="none";avf.nextElementSibling.style.display="block"}}
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
