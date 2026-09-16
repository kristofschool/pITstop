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

/* ---------- state (onthouden per tegel in deze sessie) ---------- */
const state = {};
let currentId = null;

function ensureState(p){
  if(!state[p.id]) state[p.id] = flatSteps(p).map(()=>false);
  return state[p.id];
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
  apps:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.8"/></svg>`
};

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
    btn.className = "tile";
    btn.onclick = ()=>showDetail(p.id);
    btn.innerHTML = `
      ${badge}
      <div class="ico">${ICONS[p.icon] || p.icon}</div>
      <div>
        <h2>${p.title}</h2>
        <p>${p.sub}</p>
      </div>`;
    grid.appendChild(btn);
  });
}

/* ---------- detail renderen ---------- */
function showDetail(id){
  currentId = id;
  const p = PLANS.find(x=>x.id===id);
  const isPrices = p.type==="prices";
  document.getElementById("d-title").textContent = p.title;
  document.getElementById("d-sub").textContent = p.sub;

  // Info-kaartje
  const info = document.getElementById("d-info");
  info.innerHTML = p.info
    ? `<div class="info-card"><span class="info-ico">ℹ️</span><span>${p.info}</span></div>`
    : "";

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
  sectionsOf(p).forEach(section=>{
    if(section.title){
      const h = document.createElement("li");
      h.className = "section-head";
      h.innerHTML = `<span>${section.title}</span>`;
      ol.appendChild(h);
    }
    section.steps.forEach((s,localI)=>{
      const idx = gi++;
      const li = document.createElement("li");
      li.className = "step" + (state[id][idx] ? " done":"");
      li.onclick = ()=>toggleStep(idx);
      li.innerHTML = `
        <div class="num">${state[id][idx] ? "✓" : (localI+1)}</div>
        <div class="body">
          <div class="body-top">
            <strong>${s.title}</strong>
          </div>
          ${s.note ? `<span class="note">${s.note}</span>`:""}
          ${s.link ? `<a class="step-link" href="${s.link.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${s.link.label} ↗</a>`:""}
        </div>`;
      ol.appendChild(li);
    });
  });

  updateProgress();
  document.getElementById("home").style.display = "none";
  document.getElementById("detail").classList.add("active");
  window.scrollTo({top:0});
}

/* ---------- prijslijst renderen ---------- */
function renderPrices(p){
  const ol = document.getElementById("d-steps");
  ol.innerHTML = "";
  (p.groups || []).forEach(g=>{
    if(g.title){
      const h = document.createElement("li");
      h.className = "section-head";
      h.innerHTML = `<span>${g.title}</span>`;
      ol.appendChild(h);
    }
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

function showHome(){
  document.getElementById("detail").classList.remove("active");
  document.getElementById("home").style.display = "";
  renderGrid();
  window.scrollTo({top:0});
}

function toggleStep(i){
  state[currentId][i] = !state[currentId][i];
  showDetail(currentId);
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
  showDetail(currentId);
}

renderGrid();
