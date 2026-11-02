(function(){const app=document.body.classList.contains("app");const here=location.pathname.split("/").pop()||"index.html";
const pub=[["index.html","Home"],["index.html#partners","Partner with us"],["index.html#owners","For Business Owners"]];
const int=[["app-home.html","Home"],["app-workshops.html","Workshops"],["app-grants.html","Funding & Programs"],["app-perks.html","Perks"],["app-banking.html","Banking"]];
const L=app?int:pub;if(!app)try{sessionStorage.removeItem("ih_in")}catch(e){}
const h=document.createElement("header");h.className="top";h.innerHTML=`<div class="wrap"><a class="brand" href="${app?"app-home.html":"index.html"}"><span class="btxt"><b>Small Business Impact Hub</b><small>by 100th Street Bank${app?" · Member portal":""}</small></span></a>
<nav class="main">${L.map(([f,t])=>`<a href="${f}" class="${f==here||(f=="app-grants.html"&&here=="app-accelerators.html")?"on":""}">${t}</a>`).join("")}</nav>
${app?'<a class="btn sm ghost" style="color:#fff;border-color:#ffffff55" href="index.html">Exit to public site</a>':'<a class="btn sm ghost" href="app-home.html">Business owner login</a>'}</div>`;
if(document.body.classList.contains("home")){const SP=[["impact","Impact"],["how","How it works"],["map","Where we invest"],["partners","Partner with us"],["benefits","Benefits"],["owners","Find a program"],["stories","Press"],["voices","Voices"],["goals","Our goals"]];
 const sn=document.createElement("nav");sn.className="spy";sn.innerHTML=`<div class="wrap">${SP.map(([i,t])=>`<a href="#${i}" data-id="${i}">${t}</a>`).join("")}<i class="spybar"></i></div>`;h.append(sn);
 const bar=sn.querySelector(".spybar"),A=[...sn.querySelectorAll("a")];let cur=null;
 const upd=()=>{const y=h.offsetHeight+40;let on=null;SP.forEach(([i])=>{const el=document.getElementById(i);if(el&&el.getBoundingClientRect().top<=y)on=i});
  if(on!==cur){cur=on;A.forEach(a=>a.classList.toggle("on",a.dataset.id==on))}const a=A.find(a=>a.dataset.id==on);
  if(a){bar.style.opacity=1;bar.style.width=a.offsetWidth+"px";bar.style.transform=`translateX(${a.offsetLeft}px)`;const w=sn.firstChild;if(a.offsetLeft<w.scrollLeft||a.offsetLeft+a.offsetWidth>w.scrollLeft+w.clientWidth)w.scrollTo({left:a.offsetLeft-20,behavior:"smooth"})}else bar.style.opacity=0};
 addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);setTimeout(upd,50);}
document.body.prepend(h);
const f=document.createElement("footer");f.innerHTML=`<div class="wrap"><span class="flogo"><svg class="blogo" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="9" fill="#E8F1F7"/><path d="M9 29V17l11-7 11 7v12" fill="none" stroke="#013D5B" stroke-width="2.6" stroke-linejoin="round"/><path d="M15 29v-7h10v7" fill="none" stroke="#013D5B" stroke-width="2.6"/><circle cx="20" cy="17.5" r="2.2" fill="#CC2427"/></svg></span>Prototype for discussion. 100th Street Bank is a fictional institution. Partner names and quotes drawn from public community impact reporting, used illustratively.</div>`;document.body.append(f);
document.querySelectorAll("form.f").forEach(fm=>fm.onsubmit=e=>{e.preventDefault();fm.style.display="none";const ok=fm.nextElementSibling;if(ok)ok.style.display="block"});})();
