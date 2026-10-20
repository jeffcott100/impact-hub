(function(){const app=document.body.classList.contains("app");const here=location.pathname.split("/").pop()||"index.html";
const pub=[["index.html","Home"],["index.html#owners","For Business Owners"],["index.html#partners","For Incubators/Accelerators"],["index.html#stories","Stories"]];
const int=[["app-home.html","Home"],["app-workshops.html","Workshops"],["app-grants.html","Funding"],["app-accelerators.html","Accelerators"],["app-banking.html","Banking"],["app-perks.html","Perks"]];
const L=app?int:pub;
const h=document.createElement("header");h.className="top";h.innerHTML=`<div class="wrap"><a class="brand" href="${app?"app-home.html":"index.html"}"><svg class="blogo" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="9" fill="#013D5B"/><path d="M9 29V17l11-7 11 7v12" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><path d="M15 29v-7h10v7" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="20" cy="17.5" r="2.2" fill="#CC2427"/></svg><span class="btxt"><b>Small Business Impact Hub</b><small>by 100th Street Bank${app?" · Member portal":""}</small></span></a>
<nav class="main">${L.map(([f,t])=>`<a href="${f}" class="${f==here?"on":""}">${t}</a>`).join("")}</nav>
${app?'<a class="btn sm ghost" style="color:#fff;border-color:#ffffff55" href="index.html">Exit to public site</a>':'<a class="btn sm ghost" href="app-home.html">Business owner login</a>'}</div>`;
document.body.prepend(h);
const f=document.createElement("footer");f.innerHTML=`<div class="wrap">Prototype for discussion. 100th Street Bank is a fictional institution. Partner names and quotes drawn from public community impact reporting, used illustratively.</div>`;document.body.append(f);
document.querySelectorAll("form.f").forEach(fm=>fm.onsubmit=e=>{e.preventDefault();fm.style.display="none";const ok=fm.nextElementSibling;if(ok)ok.style.display="block"});})();
