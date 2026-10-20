// Member portal data. All fictional.
const ME={biz:"Harbor & Vine Catering",owner:"Danielle",city:"Richmond, VA",via:"Union Kitchen Accelerator",viaSrc:"RVA",stage:"Growth (3 yrs, 6 employees)",market:"South Atlantic"};
const TOPICS=["AI","Finance","Legal","Marketing","Operations","Technology"];
const SMARKETS=["Greater Washington","Texas","Virginia"];
const SESSIONS=[
["s1","AI","AI for small business","2026-10-28","12:00","","Workshop","Priya N., Data Science",1,1],
["s3","Finance","Financial statements 101","2026-11-04","13:00","","Workshop","Elena R., Finance",0,1],
["s13","Finance","Managing business credit","2026-11-05","12:00","","Workshop","Devon L., Small Business Bank",0,1],
["s14","Finance","Business loan basics","2026-11-09","12:00","Greater Washington","Workshop","Marcus T., Commercial Banking",0,1],
["s15","Operations","Strategy coaching program","2026-11-16","10:00","","Program","Matched 100th Street Bank volunteer",0,1,1],
["s4","Finance","Cash flow planning","2026-11-06","09:30","Virginia","Workshop","Jordan K., Treasury"],
["s5","Legal","Legal clinic","2026-11-10","14:00","Virginia","Clinic","100th Street Bank Legal associates",1],
].map(([id,t,n,d,tm,m,f,v,real,jeff,apply])=>({id,t,n,d,tm,m,f,v,real,jeff,apply})).sort((a,b)=>(b.jeff||0)-(a.jeff||0));
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
