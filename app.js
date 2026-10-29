/* =========================================================
   ICT PITSTOP — rendering en logica.
   Dit bestand hoef je normaal niet aan te passen: nieuwe
   stappenplannen voeg je toe in plans.js.
   ========================================================= */

/* ---------- helpers: plan kan 'steps' (plat) of 'sections' (met delen) hebben ---------- */
function sectionsOf(p){
  if(p.sections) return p.sections;
  return [{title:null, steps:p.steps}];
}
function flatSteps(p){
  return sectionsOf(p).reduce((a,s)=>a.concat(s.steps),[]);
}

/* ---------- state: afgevinkte stappen, bewaard in deze browser ---------- */
const state = {};
let currentId = null;

// Sleutel bevat het aantal stappen: wijzigt een stappenplan, dan begint iedereen opnieuw
function storeKey(p){
  return "pitstop:" + p.id + ":" + flatSteps(p).length;
}
function ensureState(p){
  if(!state[p.id]){
    let saved = [];
    try{ saved = JSON.parse(localStorage.getItem(storeKey(p)) || "[]") || []; }catch(e){}
    state[p.id] = flatSteps(p).map((_,i)=>!!saved[i]);
  }
  return state[p.id];
}
function saveState(p){
  try{ localStorage.setItem(storeKey(p), JSON.stringify(state[p.id])); }catch(e){}
}

/* ---------- deeltitel "1 — Vooraf" splitsen in nummer en tekst ---------- */
function splitTitle(t){
  const m = /^(\S{1,3})\s+—\s+(.*)$/.exec(t);
  return m ? {num:m[1], text:m[2]} : {num:null, text:t};
}

/* =========================================================
   ICONEN — strakke lijn-iconen (stroke = accentkleur).
   Voeg een icoon toe en gebruik de sleutel bij een plan: icon:"badge"
   ========================================================= */
const ICONS = {
  badge:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.6-1.3 1.7-2 3-2s2.4.7 3 2"/><line x1="15" y1="10" x2="18.5" y2="10"/><line x1="15" y1="13.5" x2="18.5" y2="13.5"/></svg>`,
  wrench:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  help:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.2a3 3 0 0 1 5.6 1c0 2-3 2.6-3 4"/><line x1="12" y1="17.5" x2="12.01" y2="17.5"/></svg>`,
  battery:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="17" height="10" rx="2.5"/><line x1="22" y1="10.5" x2="22" y2="13.5"/><line x1="6" y1="11" x2="6" y2="13"/></svg>`,
  settings:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1.5" y1="14" x2="6.5" y2="14"/><line x1="9.5" y1="8" x2="14.5" y2="8"/><line x1="17.5" y1="16" x2="22.5" y2="16"/></svg>`,
  lock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="11" width="17" height="10" rx="2.5"/><path d="M7.5 11V7a4.5 4.5 0 0 1 9 0v4"/></svg>`,
  euro:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 6.2A7.3 7.3 0 0 0 13.7 4.4 7.6 7.6 0 0 0 6.2 12a7.6 7.6 0 0 0 7.5 7.6 7.3 7.3 0 0 0 4.8-1.8"/><line x1="3.5" y1="10" x2="14.5" y2="10"/><line x1="3.5" y1="14" x2="12.5" y2="14"/></svg>`,
  erase:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><polyline points="3.5 3.5 3.5 7.5 7.5 7.5"/><line x1="9.5" y1="9.5" x2="14.5" y2="14.5"/><line x1="14.5" y1="9.5" x2="9.5" y2="14.5"/></svg>`,
  restore:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><line x1="11" y1="18.5" x2="13" y2="18.5"/><path d="M15 10.5a3 3 0 1 1-1-2.2"/><polyline points="14.5 6 14.5 8.6 11.9 8.6"/></svg>`,
  apps:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.8"/></svg>`,
  goodnotes:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 4h6l3 3v12.5a1.5 1.5 0 0 1-1.5 1.5h-7.5A1.5 1.5 0 0 1 7 19.5V5.5A1.5 1.5 0 0 1 8.5 4Z"/><path d="M14.5 4v3h3"/><circle cx="6.3" cy="7.8" r="1"/><circle cx="6.3" cy="11.3" r="1"/><circle cx="6.3" cy="14.8" r="1"/><circle cx="6.3" cy="18.3" r="1"/><line x1="10.3" y1="12" x2="15" y2="12"/><line x1="10.3" y1="15.3" x2="13.3" y2="15.3"/></svg>`
};

/* ---------- tegel extra laten opvallen tot (niet inbegrepen) de datum in 'featured' ---------- */
function isFeatured(p){
  return !!p.featured && new Date() < new Date(p.featured + "T00:00:00");
}

/* ---------- grid renderen ---------- */
function renderGrid(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  PLANS.forEach(p=>{
    let badge = "";
    if(p.type!=="prices"){
      const total = flatSteps(p).length;
      const done = ensureState(p).filter(Boolean).length;
      badge = `<span class="count">${done}/${total}</span>`;
    }
    const btn = document.createElement("button");
    const featured = isFeatured(p);
    btn.className = "tile" + (featured ? " featured" : "");
    btn.onclick = ()=>{ location.hash = p.id; };
    btn.innerHTML = `
      ${badge}
      <div class="ico">${ICONS[p.icon] || p.icon}${featured ? `<span class="star" aria-label="Belangrijk">★</span>` : ""}</div>
      <div>
        <h2>${p.title}</h2>
        <p>${p.sub}</p>
      </div>`;
    grid.appendChild(btn);
  });
}

/* ---------- detail renderen ---------- */
function showDetail(id, keepScroll){
  currentId = id;
  const p = PLANS.find(x=>x.id===id);
  const isPrices = p.type==="prices";
  document.getElementById("d-title").textContent = p.title;
  document.getElementById("d-sub").textContent = p.sub;

  // Opvallend kaartje + info-kaartje
  const info = document.getElementById("d-info");
  const hl = p.highlight
    ? `<div class="highlight-card"><strong>${p.highlight.title}</strong><ul>${p.highlight.items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`
    : "";
  const prep = p.prep
    ? `<ul class="prep">${p.prep.map(x=>`<li><b>${x.title}</b>${x.text}</li>`).join("")}</ul>`
    : "";
  info.innerHTML = hl + (p.info
    ? `<div class="info-card">${p.info}</div>`
    : "") + prep;

  // Hulpblok onderaan
  document.getElementById("d-help").innerHTML = p.help
    ? `<div class="help-card"><strong>${p.help.title}</strong><p>${p.help.text}</p></div>`
    : "";

  renderQr(id);

  document.querySelector(".progress-row").style.display = isPrices ? "none" : "";
  document.querySelector(".foot").style.display = isPrices ? "none" : "";

  if(isPrices){
    document.getElementById("d-eyebrow").textContent = "Prijslijst";
    renderPrices(p);
    document.getElementById("home").style.display = "none";
    document.getElementById("detail").classList.add("active");
    window.scrollTo({top:0});
    return;
  }

  ensureState(p);
  document.getElementById("d-eyebrow").textContent = "Stappenplan";

  const ol = document.getElementById("d-steps");
  ol.innerHTML = "";
  let gi = 0;
  sectionsOf(p).forEach((section,si)=>{
    if(section.title){
      ol.appendChild(sectionHead(section.title, section.intro, si));
    }
    section.steps.forEach((s,localI)=>{
      const idx = gi++;
      const li = document.createElement("li");
      li.className = "step" + (s.important ? " important":"") + (state[id][idx] ? " done":"");
      li.onclick = ()=>toggleStep(idx);
      li.innerHTML = `
        <div class="num">${state[id][idx] ? "✓" : (localI+1)}</div>
        <div class="body">
          ${s.important ? `<span class="tag-important">Belangrijk</span>` : ""}
          <div class="body-top">
            <strong>${s.title}</strong>
          </div>
          ${s.note ? `<span class="note">${s.note}</span>`:""}
          ${s.warn ? `<span class="warn">${s.warn}</span>`:""}
          ${s.link ? stepLink(s.link) : ""}
        </div>`;
      ol.appendChild(li);
    });
  });

  renderSectionNav(p);
  updateProgress();
  document.getElementById("home").style.display = "none";
  document.getElementById("detail").classList.add("active");
  if(!keepScroll) window.scrollTo({top:0});
}

/* ---------- kop van een deel: genummerd blok + titel + optionele uitleg ---------- */
function sectionHead(title, intro, si){
  const t = splitTitle(title);
  const h = document.createElement("li");
  h.className = "section-head";
  if(si !== undefined) h.id = "sec-" + si;
  h.innerHTML = `
    ${t.num ? `<span class="phase-num">${t.num}</span>` : ""}
    <div>
      <span class="phase-title">${t.text}</span>
      ${intro ? `<span class="phase-intro">${intro}</span>` : ""}
    </div>`;
  return h;
}

/* ---------- bolletjes per deel in de voortgangsbalk (groen = deel klaar) ---------- */
function renderSectionNav(p){
  const nav = document.getElementById("d-nav");
  nav.innerHTML = "";
  const secs = sectionsOf(p);
  if(secs.length < 2) return;
  let gi = 0;
  secs.forEach((section,si)=>{
    const from = gi; gi += section.steps.length;
    const done = state[p.id].slice(from, gi).every(Boolean);
    const t = splitTitle(section.title || "");
    const b = document.createElement("button");
    b.className = "sec-dot" + (done ? " done" : "");
    b.textContent = done ? "✓" : (t.num || si+1);
    b.title = t.text;
    b.setAttribute("aria-label", "Ga naar deel: " + t.text);
    b.onclick = ()=>document.getElementById("sec-"+si).scrollIntoView({behavior:"smooth", block:"start"});
    nav.appendChild(b);
  });
}

/* ---------- QR-code naar deze tegel, enkel zichtbaar op de afdruk ---------- */
function renderQr(id){
  const box = document.getElementById("d-qr");
  box.innerHTML = "";
  if(!window.qrcode) return;
  const qr = window.qrcode(0, "M");
  qr.addData(location.href.split("#")[0] + "#" + id);
  qr.make();
  box.innerHTML = qr.createSvgTag({cellSize:3, margin:0}) + "<small>Scan voor de online versie</small>";
}

/* ---------- link in een stap: externe url of andere tegel (plan) ---------- */
function stepLink(l){
  if(l.plan){
    return `<a class="step-link" href="#${l.plan}" onclick="event.stopPropagation()">${l.label} →</a>`;
  }
  return `<a class="step-link" href="${l.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${l.label} ↗</a>`;
}

/* ---------- prijslijst renderen ---------- */
function renderPrices(p){
  const ol = document.getElementById("d-steps");
  ol.innerHTML = "";
  (p.groups || []).forEach(g=>{
    if(g.title) ol.appendChild(sectionHead(g.title));
    g.items.forEach(it=>{
      const li = document.createElement("li");
      li.className = "price-row";
      li.innerHTML = `
        <div class="p-name">
          <strong>${it.name}</strong>
          ${it.note ? `<span class="note">${it.note}</span>`:""}
        </div>
        <div class="p-amount">${it.price}</div>`;
      ol.appendChild(li);
    });
  });
}

/* ---------- terug naar overzicht: adres zonder #tegel ---------- */
function showHome(){
  history.pushState(null, "", location.pathname + location.search);
  route();
}

function renderHome(){
  currentId = null;
  document.getElementById("detail").classList.remove("active");
  document.getElementById("home").style.display = "";
  renderGrid();
  window.scrollTo({top:0});
}

function toggleStep(i){
  state[currentId][i] = !state[currentId][i];
  saveState(PLANS.find(x=>x.id===currentId));
  showDetail(currentId, true);
}

function updateProgress(){
  const arr = state[currentId];
  const done = arr.filter(Boolean).length;
  const pct = Math.round(done/arr.length*100);
  document.getElementById("d-bar").style.width = pct + "%";
  document.getElementById("d-prog").textContent = `${done}/${arr.length} klaar`;
}

function resetCurrent(){
  state[currentId] = state[currentId].map(()=>false);
  saveState(PLANS.find(x=>x.id===currentId));
  showDetail(currentId);
}

/* =========================================================
   EIGEN ADRES PER TEGEL — bv. .../pitstop/#ipad-wissen
   Werkt ook met de terugknop van de browser en als gedeelde link.
   ========================================================= */
function route(){
  const id = decodeURIComponent(location.hash.slice(1));
  const p = PLANS.find(x=>x.id===id);
  if(p){
    showDetail(id);
    track(p);
  } else {
    renderHome();
  }
}

/* ---------- tellen welke tegels geopend worden (GoatCounter, zie index.html) ---------- */
function track(p){
  const send = ()=>{
    if(window.goatcounter && window.goatcounter.count){
      window.goatcounter.count({path: location.pathname + "#" + p.id, title: p.title});
    }
  };
  // Het script laadt async: bij een rechtstreekse link is het er misschien nog niet
  if(document.readyState === "complete") send();
  else window.addEventListener("load", send, {once:true});
}

/* =========================================================
   AFDRUK — een kop van een deel blijft bij zijn eerste stap,
   tenzij dat een extra (oneven) blad kost: 1 recto-verso is
   beter dan 3 bladzijden. Dan laten we de kop toch los.
   ========================================================= */
const MM = 96/25.4, PAGE_W = 178*MM, PAGE_H = 265*MM;   // A4 min marges van 16 mm (zie @page)

function printRule(){
  for(const sheet of document.styleSheets){
    let rules;
    try{ rules = sheet.cssRules; }catch(e){ continue; }
    for(const r of rules) if(r.media && r.media.mediaText === "print") return r;
  }
}

// Blokken die niet over twee bladen gesplitst worden, in volgorde
function printBlocks(){
  const out = [];
  const add = el=>{
    const r = el.getBoundingClientRect();
    if(r.height) out.push({top:r.top, bottom:r.bottom, head:el.classList.contains("section-head")});
  };
  [...document.getElementById("detail").children].forEach(el=>{
    if(["d-info","d-steps","d-help"].includes(el.id)) [...el.children].forEach(add);
    else add(el);
  });
  return out;
}

function countPages(blocks, keepHeads){
  let pages = 1, first = 0, start = blocks.length ? blocks[0].top : 0;
  blocks.forEach((b,i)=>{
    if(i === first || b.bottom - start <= PAGE_H) return;
    const j = (keepHeads && i-1 > first && blocks[i-1].head) ? i-1 : i;
    pages++; first = j; start = blocks[j].top;
  });
  return pages;
}

window.addEventListener("beforeprint", ()=>{
  const root = document.documentElement;
  root.classList.remove("print-loose");
  const rule = printRule();
  if(!rule || !currentId) return;
  // Even de afdrukstijl op het scherm toepassen om te meten
  const wrap = document.querySelector(".wrap");
  rule.media.mediaText = "all";
  wrap.style.width = PAGE_W + "px";
  const blocks = printBlocks();
  rule.media.mediaText = "print";
  wrap.style.width = "";
  const strict = countPages(blocks, true), loose = countPages(blocks, false);
  if(strict % 2 && loose < strict) root.classList.add("print-loose");
});

window.addEventListener("hashchange", route);
route();
