// All content is illustrative (100th Street Bank is a fictional institution). Partner organizations are real.
const REGIONS=["Mid-Atlantic","Northeast","South & Gulf Coast","Midwest","West Coast","Mountain West"];
const MARKETS=REGIONS;
// Partner programs, titled by the partner organization.
const PROGRAMS=[
{n:"The DEC Network",p:"Dallas Small Business Accelerator (with UT Dallas)",r:"South & Gulf Coast",c:"Dallas, TX",t:"Accelerator",st:"Early stage",d:"12-week intensive: curriculum, growth consulting and a pitch at Dallas Startup Week. Cohort grants of $15,000 / $10,000 / $2,000.",u:"https://thedec.co/",img:"img/pp1.jpg"},
{n:"UT Dallas Innovation & Entrepreneurship",p:"CometX Accelerator",r:"South & Gulf Coast",c:"Richardson, TX",t:"Accelerator",st:"Idea / early stage",d:"Venture development, mentors and workspace for student and community founders.",u:"https://innovation.utdallas.edu/",img:"img/p-utd.jpg"},
{n:"Union Kitchen Accelerator",p:"Union Kitchen",r:"Mid-Atlantic",c:"Washington, DC",t:"Accelerator",st:"Early",d:"180-day food & beverage accelerator: product, pricing and packaging built in their own facility, first production run, local store launch, then warm distributor and angel-network intros.",img:"img/pp2.jpg"},
{n:"Halcyon",p:"Halcyon Incubator",r:"Mid-Atlantic",c:"Washington, DC",t:"Incubator",st:"Early stage",d:"Residential and virtual programs for early-stage, impact-driven founders in climate, health and equity tech.",u:"https://halcyonaccelerator.org/programs/",img:"img/pp4.jpg"},
{n:"Propeller",p:"Impact Accelerator",r:"South & Gulf Coast",c:"New Orleans, LA",t:"Accelerator",st:"Early stage",d:"Accelerator and coworking for New Orleans founders tackling social and environmental problems.",u:"https://gopropeller.org/impact-accelerator/",img:"img/p-propeller.jpg"},
{n:"Rising Tide Capital",p:"Community Business Academy",r:"Northeast",c:"Jersey City, NJ",t:"Incubator",st:"Idea / early stage",d:"Business training and coaching for entrepreneurs in under-resourced communities.",u:"https://programs.risingtidecapital.org/community-business-academy/",img:"img/p-risingtide.jpg"},
{n:"Hot Bread Kitchen",p:"HBK Incubates",r:"Northeast",c:"New York, NY",t:"Incubator",st:"Early stage",d:"Shared kitchen, licensing help and market access for food entrepreneurs.",u:"https://hotbreadkitchen.org/hbki/",img:"img/p-hotbread.jpg"},
{n:"1871",p:"Accelerator programs",r:"Midwest",c:"Chicago, IL",t:"Accelerator",st:"Early stage",d:"Chicago's innovation hub, with cohort programs and mentoring for startups and small businesses.",u:"https://1871.com/",img:"img/p-1871.jpg"},
{n:"gener8tor",p:"gBETA Milwaukee",r:"Midwest",c:"Milwaukee, WI",t:"Accelerator",st:"Idea / early stage",d:"Free, cohort-based pre-accelerator for early-stage founders, with coaching and investor connections.",u:"https://www.gener8tor.com/gbeta/milwaukee",img:"img/pp3.jpg"},
{n:"LearnLaunch",p:"LearnLaunch Accelerator",r:"Northeast",c:"Boston, MA",t:"Accelerator",st:"Pre-seed",d:"Accelerator and pre-seed fund for education and workforce startups.",u:"https://learnlaunch.com/",img:"img/p-learnlaunch.jpg"},
{n:"La Cocina",p:"Food business incubator",r:"West Coast",c:"San Francisco, CA",t:"Incubator",st:"Idea / early stage",d:"Commercial kitchen space, technical assistance and market access for low-income food entrepreneurs.",u:"https://www.lacocinasf.org/",img:"img/p-wbenc.jpg"},
{n:"Boomtown",p:"Boomtown Accelerator",r:"Mountain West",c:"Boulder, CO",t:"Accelerator",st:"Early stage",d:"Boulder-based accelerator pairing startups with mentors, corporate partners and investors.",u:"https://boomtownaccelerators.com/",img:"img/p-zip.jpg"}];
function S(){return ''}
function srcLink(k){return ""}
function filters(el,onPick,list=MARKETS){let cur="All";el.innerHTML=["All",...list].map(m=>`<button class="${m=="All"?"on":""}">${m}</button>`).join("");
 el.querySelectorAll("button").forEach(b=>b.onclick=()=>{el.querySelectorAll("button").forEach(x=>x.classList.remove("on"));b.classList.add("on");onPick(b.textContent)});onPick(cur)}
