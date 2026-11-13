(function(){try{if(sessionStorage.getItem("ihTourSeen"))return}catch(e){}
var S=[{t:"Welcome to the Small Business Impact Hub",b:"This is 100th Street Bank's community impact hub. Explore our impact so far, how the Hub works through local incubators and accelerators, a map of where we invest, business owner benefits, press and community stories."},
{t:"See it as a business owner",b:"Use <b>Business owner login</b> at the top of the page to enter the portal. No password needed: set up a quick profile or choose <b>Skip and use the demo business</b> to explore workshops, funding, perks and banking tools."}];
var i=0,o=document.createElement("div");o.className="ihtour";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");o.setAttribute("aria-labelledby","ihtt");
o.innerHTML='<div class="ihbox"><button class="ihx" aria-label="Close">&times;</button><span class="ihstep"></span><h2 id="ihtt"></h2><p class="ihb"></p><div class="ihdots"><i></i><i></i></div><div class="ihnav"><button class="btn ghost ihback">Back</button><span class="ihr"><a class="btn ghost ihgo" href="app-home.html">Go to business owner login</a><button class="btn ihnext"></button></span></div></div>';
function q(s){return o.querySelector(s)}
function close(){try{sessionStorage.setItem("ihTourSeen","1")}catch(e){}o.remove();document.removeEventListener("keydown",k)}
function k(e){if(e.key=="Escape")close()}
function r(){q(".ihstep").textContent="Step "+(i+1)+" of 2";q("h2").textContent=S[i].t;q(".ihb").innerHTML=S[i].b;
[].forEach.call(o.querySelectorAll(".ihdots i"),function(d,j){d.className=j==i?"on":""});
q(".ihback").style.visibility=i?"visible":"hidden";q(".ihgo").style.display=i?"":"none";q(".ihnext").textContent=i?"Got it":"Next"}
q(".ihx").onclick=close;q(".ihgo").onclick=function(){try{sessionStorage.setItem("ihTourSeen","1")}catch(e){}};
q(".ihnext").onclick=function(){if(i)close();else{i=1;r()}};q(".ihback").onclick=function(){i=0;r()};
o.onclick=function(e){if(e.target==o)close()};document.addEventListener("keydown",k);
r();document.body.appendChild(o);q(".ihnext").focus()})();
