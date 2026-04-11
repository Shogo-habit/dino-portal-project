import { DINOSAURS, NEWS } from './data.js';

// --- ROUTER CONFIG ---
const routes = {
  home: renderHome,
  dictionary: renderDictionary,
  'dictionary/:id': renderDetail,
  'vs-sim': renderVsSim,
  'news-feed': renderNews
};

// --- INITIALIZATION ---
function init() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange(); // Handle initial load
  setupGlobalEvents();
}

function handleRouteChange() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const appContainer = document.getElementById('app-container');
  
  // Update Nav Active State
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-link') === hash.split('/')[0]);
  });

  // Simple dynamic route matching
  if (hash.startsWith('dictionary/')) {
    const id = hash.split('/')[1];
    appContainer.innerHTML = renderDetail(id);
  } else if (routes[hash]) {
    appContainer.innerHTML = routes[hash]();
  } else {
    appContainer.innerHTML = renderHome();
  }

  // Scroll to top
  appContainer.scrollTop = 0;
  
  // Re-attach page specific events
  if (hash === 'dictionary') attachDictionaryEvents();
  if (hash === 'vs-sim') attachVsSimEvents();
}

function setupGlobalEvents() {
    // Universal typing footer effect
    const footerText = document.querySelector('.typing-text');
    const texts = ["ANALYZING GENETIC SEQUENCES...", "UPDATING PALEONTOLOGY DB...", "SYNCHRONIZING WITH ARCHIVES...", "SCANNING FOR NEW DISCOVERIES..."];
    let i = 0;
    setInterval(() => {
        footerText.innerText = texts[i];
        i = (i + 1) % texts.length;
    }, 4000);
}

// --- STATE MANAGEMENT ---
const STATE_KEYS = {
    DICT_FILTERS: 'dino_nexus_dict_filters'
};

function getDictState() {
    const saved = localStorage.getItem(STATE_KEYS.DICT_FILTERS);
    return saved ? JSON.parse(saved) : {
        search: '',
        era: '',
        region: '',
        sort: 'kana'
    };
}

function saveDictState(state) {
    localStorage.setItem(STATE_KEYS.DICT_FILTERS, JSON.stringify(state));
}

// --- RENDERERS ---

function renderHome() {
  const randomIndex = Math.floor(Math.random() * DINOSAURS.length);
  const pickupDino = DINOSAURS[randomIndex];
  const newsItems = NEWS.slice(0, 2);

  return `
    <section class="page-header">
        <h2 class="page-title">COMMAND CENTER</h2>
        <p class="page-subtitle">SYSTEM STATUS: ALL ARCHIVES ACCESSIBLE</p>
    </section>

    <div class="home-layout">
        <div class="dino-day-hero hud-panel">
            <div class="hud-corner top-left"></div>
            <div class="hud-corner bottom-right"></div>
            <div class="hero-img-container" style="background-image: url('${pickupDino.image}')"></div>
            <div class="hero-content">
                <span class="hero-label">// PICKUP: SPECIMEN OF THE DAY</span>
                <h3 class="hero-name" style="font-size: 32px; margin: 10px 0;">${pickupDino.name}</h3>
                <p class="hero-desc" style="color: var(--text-dim); line-height: 1.6; margin-bottom: 20px;">${pickupDino.description}</p>
                <a href="#dictionary/${pickupDino.id}" class="nav-link" style="display: inline-block; width: fit-content;">VIEW FULL ANALYSIS</a>
            </div>
        </div>

        <div class="news-summary-sidebar hud-panel">
            <h4 style="margin-bottom: 20px; border-bottom: 1px solid var(--panel-border); padding-bottom: 10px;">LATEST INTEL</h4>
            ${newsItems.map(item => `
                <div class="news-item-sm" style="margin-bottom: 20px;">
                    <span style="font-size: 10px; color: var(--primary-neon);">${item.date}</span>
                    <h5 style="margin: 5px 0;">${item.title}</h5>
                    <p style="font-size: 12px; color: var(--text-dim);">${item.summary.slice(0, 50)}...</p>
                </div>
            `).join('')}
            <a href="#news-feed" style="font-size: 12px; color: var(--primary-neon);">[ ACCESS FULL FEED ]</a>
        </div>
    </div>
  `;
}

function renderDictionary() {
  const state = getDictState();
  
  return `
    <section class="page-header">
        <h2 class="page-title">BIOLOGICAL ARCHIVE</h2>
        <p class="page-subtitle">SPECIMEN LIST : TOTAL ${DINOSAURS.length}</p>
    </section>

    <div class="dictionary-controls">
        <input type="text" id="dino-search" class="search-input" placeholder="SEARCH NAME..." value="${state.search}">
        <select id="filter-era" class="search-input" style="width: auto;">
            <option value="" ${state.era === '' ? 'selected' : ''}>ERA: ALL</option>
            <option value="ペルム紀" ${state.era === 'ペルム紀' ? 'selected' : ''}>ペルム紀</option>
            <option value="三畳紀" ${state.era === '三畳紀' ? 'selected' : ''}>三畳紀</option>
            <option value="ジュラ紀" ${state.era === 'ジュラ紀' ? 'selected' : ''}>ジュラ紀</option>
            <option value="白亜紀" ${state.era === '白亜紀' ? 'selected' : ''}>白亜紀</option>
        </select>
        <select id="filter-region" class="search-input" style="width: auto;">
            <option value="" ${state.region === '' ? 'selected' : ''}>REGION: ALL</option>
            <option value="北アメリカ" ${state.region === '北アメリカ' ? 'selected' : ''}>北アメリカ</option>
            <option value="アジア" ${state.region === 'アジア' ? 'selected' : ''}>アジア</option>
            <option value="アフリカ" ${state.region === 'アフリカ' ? 'selected' : ''}>アフリカ</option>
            <option value="ヨーロッパ" ${state.region === 'ヨーロッパ' ? 'selected' : ''}>ヨーロッパ</option>
            <option value="日本" ${state.region === '日本' ? 'selected' : ''}>日本</option>
        </select>
        <select id="sort-order" class="search-input" style="width: auto;">
            <option value="kana" ${state.sort === 'kana' ? 'selected' : ''}>SORT: かな順</option>
            <option value="size" ${state.sort === 'size' ? 'selected' : ''}>SORT: サイズ順</option>
        </select>
    </div>

    <div class="dino-grid" id="dino-grid-content">
        <!-- Initial content will be updated by attachDictionaryEvents -->
        ${renderDinoCards(DINOSAURS)}
    </div>
  `;
}

function renderDinoCards(list) {
    return list.map(d => `
        <div class="dino-card hud-panel" onclick="location.hash='#dictionary/${d.id}'">
            <div class="card-img-wrap" style="background-image: url('${d.image}')"></div>
            <div class="card-info">
                <h3 class="card-title">${d.name}</h3>
                <div class="card-tags" style="display: flex; gap: 10px;">
                    <span class="card-tag">${d.era}</span>
                    <span class="card-tag">${d.diet}</span>
                </div>
                <p style="font-size: 11px; margin-top: 15px; color: var(--text-dim); line-height: 1.4;">
                    ${d.description.slice(0, 60)}...
                </p>
            </div>
        </div>
    `).join('');
}

function attachDictionaryEvents() {
    const search = document.getElementById('dino-search');
    const era = document.getElementById('filter-era');
    const region = document.getElementById('filter-region');
    const sort = document.getElementById('sort-order');

    const hiraToKata = (str) => str.replace(/[\u3041-\u3096]/g, m => String.fromCharCode(m.charCodeAt(0) + 0x60));
    const kataToHira = (str) => str.replace(/[\u30a1-\u30f6]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60));

    const extractNumber = (str) => {
        if (!str) return 0;
        const match = str.match(/[0-9.]+/);
        return match ? parseFloat(match[0]) : 0;
    };

    const updateList = () => {
        const rawSearchVal = search.value.trim();
        const searchVal = rawSearchVal.toLowerCase();
        const searchKata = hiraToKata(rawSearchVal);
        const searchHira = kataToHira(rawSearchVal);
        
        const eraVal = era.value;
        const regionVal = region.value;
        const sortVal = sort.value;

        // Save state
        saveDictState({
            search: rawSearchVal,
            era: eraVal,
            region: regionVal,
            sort: sortVal
        });

        let filtered = DINOSAURS.filter(d => {
            const matchesSearch = 
                d.name.startsWith(searchKata) || 
                d.kana.startsWith(searchHira) || 
                d.id.includes(searchVal) ||
                (d.scientificName && d.scientificName.toLowerCase().includes(searchVal));
            const matchesEra = !eraVal || d.era.includes(eraVal);
            const matchesRegion = !regionVal || d.region.includes(regionVal);
            return matchesSearch && matchesEra && matchesRegion;
        });

        // Sorting
        if (sortVal === 'kana') {
            filtered.sort((a, b) => a.kana.localeCompare(b.kana, 'ja'));
        } else if (sortVal === 'size') {
            filtered.sort((a, b) => extractNumber(b.length) - extractNumber(a.length));
        }

        document.getElementById('dino-grid-content').innerHTML = renderDinoCards(filtered);
    };

    if (search) search.addEventListener('input', updateList);
    if (era) era.addEventListener('change', updateList);
    if (region) region.addEventListener('change', updateList);
    if (sort) sort.addEventListener('change', updateList);

    // Run once on load to apply initial state
    // Use a small timeout to ensure DOM is ready and styles are applied
    setTimeout(updateList, 0);
}

function renderDetail(id) {
  const d = DINOSAURS.find(item => item.id === id);
  if (!d) return `<p>SPECIMEN NOT FOUND</p>`;

  return `
    <div class="detail-layout">
        <div class="detail-img-viewer hud-panel">
            <div class="hud-corner top-left"></div>
            <div class="hud-corner bottom-right"></div>
            <div class="scan-line-ani"></div>
            <img src="${d.image}" alt="${d.name}">
            <div style="position: absolute; bottom: 10px; right: 10px; font-family: var(--font-mono); font-size: 10px; color: var(--primary-neon);">
                IMG_SEC_ENCRYPTED: 771-X
            </div>
        </div>

        <div class="detail-data">
            <h2 style="font-size: 42px; margin-bottom: 5px;">${d.name}</h2>
            <p style="font-family: var(--font-mono); color: var(--primary-neon); margin-bottom: 20px;">[ ${d.scientificName} ]</p>
            
            <div class="hud-panel" style="margin-bottom: 30px;">
                <p style="line-height: 1.8; font-size: 14px;">${d.description}</p>
            </div>

            <div class="spec-panel">
                <div class="spec-item"><span class="spec-label">Era</span><br>${d.era}</div>
                <div class="spec-item"><span class="spec-label">Region</span><br>${d.region}</div>
                <div class="spec-item"><span class="spec-label">Length</span><br>${d.length}</div>
                <div class="spec-item"><span class="spec-label">Weight</span><br>${d.weight}</div>
            </div>

            <div class="trait-bar-wrap">
                <h4 style="border-bottom: 1px solid var(--panel-border); padding-bottom: 10px;">BIO-TRAIT ANALYSIS</h4>
                ${d.bioTraits.map(t => `
                    <div class="trait-row">
                        <div class="trait-label-row">
                            <span class="trait-name">${t.trait}</span>
                            <span class="trait-val">${t.value}</span>
                        </div>
                        <div style="font-size: 11px; color: var(--text-dim); border-left: 2px solid var(--primary-neon); padding-left: 10px;">
                            ${t.detail}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 40px;">
                <a href="#dictionary" class="nav-link" style="display: inline-block;">[ BACK TO ARCHIVE ]</a>
            </div>
        </div>
    </div>
  `;
}

function renderVsSim() {
  return `
    <section class="page-header">
        <h2 class="page-title">BIO-COMBAT SIMULATOR</h2>
        <p class="page-subtitle">VIRTUAL SPECIMEN INTERACTION ANALYSIS</p>
    </section>

    <div class="vs-layout" id="vs-simulation-area">
        <div class="vs-box hud-panel" id="slot-1" onclick="openSpecimenPicker(1)">
            <p id="slot-1-text">SELECT SPECIMEN A</p>
        </div>
        <div class="vs-divider">VS</div>
        <div class="vs-box hud-panel" id="slot-2" onclick="openSpecimenPicker(2)">
            <p id="slot-2-text">SELECT SPECIMEN B</p>
        </div>
    </div>

    <div id="sim-action-container" style="text-align: center; margin-top: 30px; display: none;">
        <button class="nav-link active" style="padding: 15px 40px; cursor: pointer;" onclick="runSimulation()">INITIATE ANALYSIS</button>
    </div>

    <div id="sim-results-output" class="sim-results hud-panel" style="display: none;">
        <h3 style="color: var(--alert-neon); border-bottom: 1px solid var(--alert-neon); margin-bottom: 20px;">SIMULATION LOG</h3>
        <div id="log-content"></div>
    </div>

    <!-- Modal for picker -->
    <div id="specimen-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:10000; padding: 100px;">
        <div class="hud-panel" style="max-width: 800px; margin: 0 auto; max-height: 80vh; overflow-y: auto;">
            <h3>SELECT SPECIMEN</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px;">
                ${DINOSAURS.map(d => `
                    <div style="padding: 10px; border: 1px solid var(--panel-border); cursor: pointer; text-align: center;" onclick="selectSpecimen('${d.id}')">
                        <img src="${d.image}" style="width: 50px; height: 50px; object-fit: cover;"><br>
                        <span style="font-size: 10px;">${d.name}</span>
                    </div>
                `).join('')}
            </div>
            <button onclick="closeSpecimenPicker()" style="margin-top: 20px; background: none; border: 1px solid white; color: white; padding: 5px 10px; cursor:pointer;">CANCEL</button>
        </div>
    </div>
  `;
}

let activeSlot = null;
let selection = { 1: null, 2: null };

window.openSpecimenPicker = (slot) => {
    activeSlot = slot;
    document.getElementById('specimen-modal').style.display = 'block';
};

window.closeSpecimenPicker = () => {
    document.getElementById('specimen-modal').style.display = 'none';
};

window.selectSpecimen = (id) => {
    const d = DINOSAURS.find(item => item.id === id);
    selection[activeSlot] = d;
    
    const slotEl = document.getElementById(`slot-${activeSlot}`);
    slotEl.classList.add('occupied');
    slotEl.innerHTML = `
        <img src="${d.image}" style="max-width: 80%; max-height: 80%; object-fit: contain;">
        <p style="margin-top: 10px; color: var(--primary-neon);">${d.name}</p>
    `;
    
    closeSpecimenPicker();
    
    if (selection[1] && selection[2]) {
        document.getElementById('sim-action-container').style.display = 'block';
    }
};

window.runSimulation = () => {
    const output = document.getElementById('sim-results-output');
    const log = document.getElementById('log-content');
    output.style.display = 'block';
    log.innerHTML = "";
    
    const d1 = selection[1];
    const d2 = selection[2];
    
    const messages = [
        `> INITIALIZING NEURAL LINK WITH SPECIMEN A (${d1.name})...`,
        `> INITIALIZING NEURAL LINK WITH SPECIMEN B (${d2.name})...`,
        `> ANALYZING BIOLOGICAL TRAITS...`,
        `> [LOG] ${d1.name}: ${d1.bioTraits[0].trait} / ${d1.bioTraits[0].value}`,
        `> [LOG] ${d2.name}: ${d2.bioTraits[0].trait} / ${d2.bioTraits[0].value}`,
        `> COMPUTING INTERACTION VARIABLES (TERRAIN, DISTANCE, BEHAVIOR)...`,
        `> -------------------------------------------------------------`,
        `> RESULT: ${generateBattleOutcome(d1, d2)}`,
        `> -------------------------------------------------------------`,
        `> SYSTEM STATUS: ANALYSIS COMPLETE.`
    ];
    
    let i = 0;
    function addLog() {
        if (i < messages.length) {
            const p = document.createElement('p');
            p.className = 'log-entry';
            p.innerText = messages[i];
            log.appendChild(p);
            i++;
            setTimeout(addLog, 800);
            output.scrollTop = output.scrollHeight;
        }
    }
    addLog();
};

function generateBattleOutcome(d1, d2) {
    // Basic logic for the "simulated outcome"
    if (d1.id === d2.id) return "相互不干渉。同一種間の縄張り争いが発生する可能性があるが、致命的な衝突は回避される。";
    
    if (d1.diet === '草食' && d2.diet === '草食') {
        return "リソース競合は発生するものの、本格的な戦闘には至らない。防御能力の高い方が優位に領域を確保する。";
    }
    
    if (d1.diet === '肉食' && d2.diet === '肉食') {
        return `${d1.name}の「${d1.bioTraits[0].trait}」と${d2.name}の「${d2.bioTraits[0].trait}」が衝突。知能と機動力で勝る側が致命傷を避けつつ相手を退ける可能性が高い。`;
    }
    
    // Predator vs Prey logic
    const predator = d1.diet === '肉食' ? d1 : d2;
    const prey = d1.diet === '肉食' ? d2 : d1;
    
    return `${predator.name}による捕食試行が発生。${prey.name}は「${prey.bioTraits[0].value}」の防御手段で応戦するも、環境要因に大きく左右される。一撃離脱戦法が鍵となる。`;
}

function renderNews() {
  return `
    <section class="page-header">
        <h2 class="page-title">SCIENTIFIC INTELLIGENCE FEED</h2>
        <p class="page-subtitle">SECURITY CLEARANCE: REQUIRED</p>
    </section>

    <div class="news-list">
        ${NEWS.map(item => `
            <div class="hud-panel" style="margin-bottom: 20px; border-left: 5px solid ${item.category === 'RESEARCH' ? 'var(--primary-neon)' : 'var(--secondary-neon)'}">
                <div style="display:flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="font-family: var(--font-mono); color: var(--primary-neon); font-size: 12px;">[ ${item.category} ]</span>
                    <span style="font-family: var(--font-mono); color: var(--text-dim); font-size: 12px;">${item.date}</span>
                </div>
                <h3 style="margin-bottom: 10px;">${item.title}</h3>
                <p style="font-size: 14px; color: var(--text-dim); line-height: 1.6;">${item.summary}</p>
                <div style="margin-top: 15px; font-size: 10px; text-transform: uppercase; color: var(--alert-neon); font-family: var(--font-mono);">
                    ACCESS LEVEL: ${item.securityLevel}
                </div>
            </div>
        `).join('')}
    </div>
  `;
}

function attachVsSimEvents() {
    // Reset state on entry
    selection = { 1: null, 2: null };
}

// Start the APP
init();
