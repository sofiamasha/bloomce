/* ════════════════════════════════════════════════════════════
   BLOOM FINANCE — Application Engine
   Home → Workspace transition, AI, Spreadsheet, Voice, Export
   ════════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  
  const NUM = 60;
  const particles = Array.from({ length: NUM }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.1,
  }));
  
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.body.classList.contains('theme-dark');
    const col = isDark ? '255,255,255' : '124,106,255';
    
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${p.alpha})`;
      ctx.fill();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${col},${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}());

// ═══════════════════════════════════════════
// STATE & DATA
// ═══════════════════════════════════════════
const CATEGORIES = [
  { name: 'Metrô',             emoji: '🚇' },
  { name: 'Ônibus',            emoji: '🚌' },
  { name: 'Lanche Faculdade',  emoji: '🥐' },
  { name: 'Almoço',            emoji: '🍽️' },
  { name: 'Lanche',            emoji: '🥪' },
  { name: 'Lanche com amigas', emoji: '👯‍♀️' },
  { name: 'Lanche pessoal',    emoji: '🍟' },
  { name: 'Coca-Cola',         emoji: '🥤' },
  { name: 'Sorvete',           emoji: '🍦' },
  { name: 'Padaria',           emoji: '🥖' },
  { name: 'Gastos pessoais',   emoji: '💸' },
  { name: 'Cabelo',            emoji: '💇' },
  { name: 'Riachuelo',         emoji: '👗' },
  { name: 'Uber',              emoji: '🚗' },
  { name: 'Janta',             emoji: '🌙' },
  { name: 'Desconhecido',      emoji: '❓' },
];

const DEMO_CATEGORIES = [
  { name: 'Alimentação', emoji: '🍽️' },
  { name: 'Transporte',  emoji: '🚇' },
  { name: 'Lazer',       emoji: '🎮' },
  { name: 'Compras',     emoji: '🛍️' },
];

let state = { transactions: [], receivables: [], categories: [...CATEGORIES] };
let settings = { themeDark: false };
let presentationMode = false;

// ── Seed exact real data ─────────────────────────────────
function uid() { return '_' + Math.random().toString(36).slice(2, 9); }

function seedRealData() {
  const add = (cat, vals) => vals.forEach(v =>
    state.transactions.push({ id: uid(), category: cat, amount: v, date: today() })
  );
  add('Metrô',            [5.80,5.80,5.80,5.80,11.60,11.60,11.80,11.60,11.60,6.00]);
  add('Ônibus',           [94.80,39.00]);
  add('Lanche Faculdade', [10.50,11.50,10.50,22.60,11.90,10.50,6.30,2.20,9.10,8.30,6.10,20.00,4.00,3.60,10.50,10.50,2.20]);
  add('Almoço',           [9.99,22.50,15.99,48.50,12.70,15.75,40.00,15.30,26.99,47.00,21.00,60.00,8.98,10.99,58.00,2.70]);
  add('Lanche com amigas',[86.00]);
  add('Lanche pessoal',   [17.99,54.00]);
  add('Gastos pessoais',  [44.00,22.00,55.00,35.00]);
  add('Desconhecido',     [69.80,13.90,29.00,54.00,45.00]);
  add('Janta',            [37.00]);
  add('Cabelo',           [270.00]);
  add('Riachuelo',        [40.00]);
  add('Uber',             [21.94]);
  add('Sorvete',          [19.50]);
  add('Padaria',          [13.50]);
  add('Coca-Cola',        [21.47,23.00]);

  state.receivables = [
    { id: uid(), person: 'Pai', description: 'Sorvete',  amount: 19.50 },
    { id: uid(), person: 'Pai', description: 'Padaria',  amount: 13.50 },
    { id: uid(), person: 'Mãe', description: 'Coca-Cola',amount: 21.47 },
    { id: uid(), person: 'Mãe', description: 'Uber',     amount: 21.94 },
    { id: uid(), person: 'Mãe', description: 'Cabelo',   amount: 270.00 },
    { id: uid(), person: 'Mãe', description: 'Riachuelo',amount: 40.00 },
    { id: uid(), person: 'Mãe', description: 'Coca-Cola',amount: 23.00 },
  ];
  saveData();
}

function loadData() {
  try {
    const d = JSON.parse(localStorage.getItem('bloom_v3'));
    if (d) { state = d.state; settings = d.settings || settings; return true; }
  } catch {}
  return false;
}
function saveData() { localStorage.setItem('bloom_v3', JSON.stringify({ state, settings })); }

// ═══════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════
const fmt = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const today = () => new Date().toISOString().slice(0, 10);
const getEmoji = name => {
  const all = [...state.categories, ...DEMO_CATEGORIES];
  return (all.find(c => c.name === name) || CATEGORIES.find(c => c.name === name) || { emoji: '📦' }).emoji;
};

function applyTheme() {
  document.body.classList.toggle('theme-dark', settings.themeDark);
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.checked = settings.themeDark;
}

// ═══════════════════════════════════════════
// HOME → APP TRANSITION
// ═══════════════════════════════════════════
function enterWorkspace() {
  const home = document.getElementById('homePage');
  const app  = document.getElementById('appPage');
  home.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  home.style.opacity = '0';
  home.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    home.style.display = 'none';
    app.style.display = 'flex';
    renderSpreadsheet();
    renderReceivables();
    initAIWelcome();
  }, 450);
}

function goHome() {
  const home = document.getElementById('homePage');
  const app  = document.getElementById('appPage');
  app.style.display = 'none';
  home.style.display = 'block';
  home.style.opacity = '0';
  home.style.transform = 'translateY(-20px)';
  requestAnimationFrame(() => {
    home.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    home.style.opacity = '1';
    home.style.transform = 'translateY(0)';
  });
}

document.getElementById('btnEnterMain')?.addEventListener('click', enterWorkspace);
document.getElementById('btnEnterFromNav')?.addEventListener('click', enterWorkspace);
document.getElementById('btnEnterBottom')?.addEventListener('click', enterWorkspace);
document.getElementById('btnBackHome')?.addEventListener('click', goHome);
document.getElementById('btnDemoHome')?.addEventListener('click', () => { enterWorkspace(); setTimeout(() => runAIDemo(), 800); });

// ═══════════════════════════════════════════
// NAVIGATION (Inside App)
// ═══════════════════════════════════════════
const APP_PAGES = ['spreadsheet', 'receivables', 'reports', 'settings'];

function navigateTo(id) {
  APP_PAGES.forEach(p => {
    const tab = document.getElementById(`tab-${p}`);
    const page = document.getElementById(`page-${p}`);
    tab?.classList.toggle('active', p === id);
    if (page) page.classList.toggle('active', p === id);
  });
}

document.querySelectorAll('.app-tab').forEach(tab => {
  tab.addEventListener('click', () => navigateTo(tab.dataset.page));
});

// ═══════════════════════════════════════════
// SPREADSHEET RENDER
// ═══════════════════════════════════════════
function getActiveTxs() {
  if (presentationMode) return DEMO_DATA.transactions;
  return state.transactions;
}
function getActiveCategories() {
  if (presentationMode) return DEMO_CATEGORIES;
  return state.categories;
}

let searchQuery = '';

function renderSpreadsheet() {
  const wrapper = document.getElementById('spreadsheetTable');
  if (!wrapper) return;

  const txs = getActiveTxs();
  const cats = getActiveCategories();
  const q = searchQuery.toLowerCase().trim();

  // Group transactions by category
  const grouped = {};
  cats.forEach(c => { grouped[c.name] = []; });
  txs.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  // Update subtitle
  const totalSpend = txs.reduce((s, t) => s + t.amount, 0);
  const sub = document.getElementById('spreadsheetSub');
  if (sub) sub.textContent = `${txs.length} registros · Total: ${fmt(totalSpend)}`;

  let html = '';
  Object.keys(grouped).forEach(cat => {
    let items = grouped[cat];
    const emoji = getEmoji(cat);

    if (q && !cat.toLowerCase().includes(q)) {
      items = items.filter(t => t.amount.toString().includes(q));
      if (items.length === 0 && !cat.toLowerCase().includes(q)) return;
    }

    const total = items.reduce((s, t) => s + t.amount, 0);
    const rowsHtml = items.map(t => `
      <div class="sp-row" data-id="${t.id}">
        <span class="sp-row-val">${fmt(t.amount)}</span>
        <button class="sp-row-del" onclick="deleteTx('${t.id}')" title="Remover" aria-label="Remover gasto de ${fmt(t.amount)}">✕</button>
      </div>
    `).join('');

    const safeId = cat.replace(/[^a-zA-Z0-9]/g, '_');

    html += `
      <div class="sp-col" id="col_${safeId}">
        <div class="sp-col-header">
          <div class="col-name-wrap">
            <span class="col-emoji" aria-hidden="true">${emoji}</span>
            <span class="col-name">${cat}</span>
          </div>
          <span class="col-count-badge" aria-label="${items.length} itens">${items.length}</span>
        </div>
        <div class="sp-col-body" id="body_${safeId}">${rowsHtml}</div>
        <button class="sp-row-add" onclick="openAddForm('${cat}')" aria-label="Adicionar gasto em ${cat}">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Adicionar
        </button>
        <div class="sp-col-footer">
          <div class="col-total-label">Total</div>
          <div class="col-total-val" id="total_${safeId}">${fmt(total)}</div>
        </div>
      </div>
    `;
  });

  wrapper.innerHTML = html;
}

// Flash column
function flashColumn(catName) {
  const safeId = catName.replace(/[^a-zA-Z0-9]/g, '_');
  const col = document.getElementById(`col_${safeId}`);
  if (!col) return;
  col.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  col.classList.remove('flash');
  void col.offsetWidth;
  col.classList.add('flash');
}

// Delete
window.deleteTx = function(id) {
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveData();
  renderSpreadsheet();
};

// Inline Add Form
window.openAddForm = function(cat) {
  const safeId = cat.replace(/[^a-zA-Z0-9]/g, '_');
  const body = document.getElementById(`body_${safeId}`);
  if (!body) return;

  // Remove any open forms
  document.querySelectorAll('.inline-add-form').forEach(f => f.remove());

  const form = document.createElement('div');
  form.className = 'inline-add-form';
  form.innerHTML = `
    <input type="number" step="0.01" min="0.01" class="inline-add-input" id="inlineInput_${safeId}" placeholder="Ex: 22.50" aria-label="Valor do gasto" />
    <button class="inline-add-btn" onclick="submitAdd('${cat}','${safeId}')">✓</button>
    <button class="inline-cancel-btn" onclick="this.parentElement.remove()">✕</button>
  `;
  body.parentElement.insertBefore(form, body.nextSibling.nextSibling); // before footer
  document.getElementById(`inlineInput_${safeId}`)?.focus();

  // Enter to submit
  document.getElementById(`inlineInput_${safeId}`)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAdd(cat, safeId);
    if (e.key === 'Escape') form.remove();
  });
};

window.submitAdd = function(cat, safeId) {
  const input = document.getElementById(`inlineInput_${safeId}`);
  if (!input) return;
  const val = parseFloat(input.value.replace(',', '.'));
  if (isNaN(val) || val <= 0) return;

  state.transactions.push({ id: uid(), category: cat, amount: val, date: today() });
  saveData();
  document.querySelector('.inline-add-form')?.remove();
  renderSpreadsheet();

  // Animate new item
  setTimeout(() => {
    const body = document.getElementById(`body_${safeId}`);
    if (body?.lastElementChild) body.lastElementChild.classList.add('new-item');
  }, 50);
};

// Search
document.getElementById('searchInput')?.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderSpreadsheet();
});

// Add new category
document.getElementById('btnAddCategory')?.addEventListener('click', () => {
  const name = prompt('Nome da nova categoria (ex: Academia):');
  if (!name?.trim()) return;
  if (state.categories.find(c => c.name === name.trim())) { alert('Categoria já existe!'); return; }
  state.categories.push({ name: name.trim(), emoji: '📦' });
  saveData();
  renderSpreadsheet();
});

// ═══════════════════════════════════════════
// RECEIVABLES
// ═══════════════════════════════════════════
function renderReceivables() {
  const grid = document.getElementById('receivablesGrid');
  if (!grid) return;

  const items = presentationMode ? DEMO_DATA.receivables : state.receivables;
  if (!items.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-3);">🎉 Nenhum valor pendente para receber!</div>';
    return;
  }

  const grouped = {};
  items.forEach(r => { if (!grouped[r.person]) grouped[r.person] = []; grouped[r.person].push(r); });

  grid.innerHTML = Object.keys(grouped).map(person => {
    const list = grouped[person];
    const total = list.reduce((s, i) => s + i.amount, 0);
    return `<div class="rec-card">
      <div class="rec-card-header">
        <span class="rec-name">${person}</span>
        <span class="rec-total">${fmt(total)}</span>
      </div>
      <div class="rec-list">
        ${list.map(item => `
          <div class="rec-item">
            <div class="rec-item-info">
              <span class="rec-item-desc">${item.description}</span>
              <span class="rec-item-val">${fmt(item.amount)}</span>
            </div>
            <button class="btn-paid" onclick="markReceived('${item.id}')" aria-label="Marcar ${item.description} como recebido">Recebido ✓</button>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

window.markReceived = function(id) {
  state.receivables = state.receivables.filter(r => r.id !== id);
  saveData();
  renderReceivables();
};

// ═══════════════════════════════════════════
// AI ENGINE
// ═══════════════════════════════════════════
function initAIWelcome() {
  const msgs = document.getElementById('aiMessages');
  if (!msgs || msgs.querySelector('.ai-msg')) return;
  addBotMessage('Olá! 👋 Sou a **Bloom AI**. Posso registrar gastos, responder perguntas e analisar seus padrões financeiros.\n\nTente: *"Gastei 22 com almoço"* ou clique em uma sugestão.');
}

function addBotMessage(text) {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'ai-msg bot';
  const ts = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `
    <div class="ai-bubble">${renderMarkdown(text)}</div>
    <div class="ai-ts">${ts}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMessage(text) {
  const msgs = document.getElementById('aiMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'ai-msg user';
  const ts = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `
    <div class="ai-bubble">${escHtml(text)}</div>
    <div class="ai-ts">${ts}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('aiMessages');
  const t = document.createElement('div');
  t.id = 'typingIndicator';
  t.className = 'ai-msg bot ai-typing';
  t.innerHTML = '<div class="ai-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  msgs?.appendChild(t);
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}
function removeTyping() { document.getElementById('typingIndicator')?.remove(); }

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}
function escHtml(text) {
  const d = document.createElement('div'); d.textContent = text; return d.innerHTML;
}

// NLP Engine
function processAI(input) {
  const lower = input.toLowerCase().trim();
  const txs = state.transactions;

  // ── REGISTER EXPENSE ────────────────────────────────────
  const addPattern = lower.match(/(?:gastei|paguei|comprei|deu|custou|paguei)\s+(?:r\$\s*)?(\d+(?:[.,]\d{1,2})?)\s+(?:com|de|no|na|em|reais?\s+com)?\s*(.+)/);
  if (addPattern) {
    const amount = parseFloat(addPattern[1].replace(',', '.'));
    const keywords = addPattern[2].trim();

    let cat = null;
    const cats = [...state.categories, ...CATEGORIES];
    // Fuzzy match category name in string
    cat = cats.find(c => keywords.includes(c.name.toLowerCase()));
    if (!cat) {
      // keyword shortcuts
      const map = { 'comida':'Almoço', 'uber':'Uber', 'metro':'Metrô', 'metrô':'Metrô', 'onibus':'Ônibus', 'ônibus':'Ônibus', 'roupa':'Riachuelo', 'cabelereiro':'Cabelo', 'salão':'Cabelo', 'lanche':'Lanche', 'cerveja':'Lanche pessoal', 'delivery':'Almoço', 'ifood':'Almoço' };
      for (const [k, v] of Object.entries(map)) { if (keywords.includes(k)) { cat = { name: v }; break; } }
    }
    if (!cat) cat = { name: 'Desconhecido' };

    state.transactions.push({ id: uid(), category: cat.name, amount, date: today() });
    saveData();
    renderSpreadsheet();
    setTimeout(() => flashColumn(cat.name), 200);
    return `✅ Adicionei **${fmt(amount)}** em **${cat.name}**! A planilha foi atualizada.`;
  }

  // ── QUERIES ─────────────────────────────────────────────
  if (/resumo|total|quanto gastei/.test(lower)) {
    const total = txs.reduce((s, t) => s + t.amount, 0);
    const top = getTopCat(txs);
    return `📊 Resumo do mês:\n- **Total gasto**: ${fmt(total)}\n- **Maior categoria**: ${top ? `${top.name} (${fmt(top.total)})` : 'N/A'}\n- **Registros**: ${txs.length} itens`;
  }
  if (/maior gasto/.test(lower)) {
    const top = getTopCat(txs);
    return top ? `🔍 Seu maior gasto é **${top.name}** com **${fmt(top.total)}**.` : 'Sem dados para analisar.';
  }
  if (/economizar|reduzir|cortar/.test(lower)) {
    const top = getTopCat(txs);
    return top ? `💡 Sua principal oportunidade de economia está em **${top.name}** (${fmt(top.total)}). Reduzir 20% nessa categoria economizaria cerca de **${fmt(top.total * 0.2)}** por mês.` : 'Adicione mais registros para análise.';
  }
  if (/almoço|alimentação|comida/.test(lower)) {
    const t = txs.filter(t => t.category === 'Almoço' || t.category === 'Janta').reduce((s, t) => s + t.amount, 0);
    return `🍽️ Você gastou **${fmt(t)}** com alimentação (Almoço + Janta) registrada.`;
  }
  if (/transporte|metrô|ônibus|uber/.test(lower)) {
    const t = txs.filter(t => ['Metrô','Ônibus','Uber'].includes(t.category)).reduce((s, t) => s + t.amount, 0);
    return `🚇 Total em transporte: **${fmt(t)}** (Metrô + Ônibus + Uber).`;
  }
  if (/faculdade|lanche faculdade/.test(lower)) {
    const t = txs.filter(t => t.category === 'Lanche Faculdade').reduce((s, t) => s + t.amount, 0);
    return `🥐 Gastos com Lanche Faculdade: **${fmt(t)}**.`;
  }
  if (/categoria|categorias/.test(lower)) {
    const grouped = {};
    txs.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const lines = sorted.map(([k, v]) => `- **${k}**: ${fmt(v)}`).join('\n');
    return `📋 Top 5 categorias:\n${lines}`;
  }
  if (/olá|oi|bom dia|boa tarde|boa noite|hello/.test(lower)) {
    return 'Oi! 👋 Tudo certo? Me diga como posso ajudar com suas finanças hoje!';
  }

  return `🤔 Não entendi completamente. Tente:\n- *"Gastei 15 com almoço"*\n- *"Qual meu maior gasto?"*\n- *"Resumo dos meus gastos"*`;
}

function getTopCat(txs) {
  const grouped = {};
  txs.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
  const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return null;
  return { name: sorted[0][0], total: sorted[0][1] };
}

async function sendAIMessage(text) {
  if (!text.trim()) return;
  addUserMessage(text);
  showTyping();
  await sleep(700 + Math.random() * 400);
  removeTyping();
  const reply = processAI(text);
  addBotMessage(reply);
}

// Send button & Enter key
document.getElementById('btnAISend')?.addEventListener('click', () => {
  const input = document.getElementById('aiInput');
  const val = input.value.trim();
  if (val) { sendAIMessage(val); input.value = ''; input.style.height = 'auto'; }
});

document.getElementById('aiInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const input = e.target;
    const val = input.value.trim();
    if (val) { sendAIMessage(val); input.value = ''; input.style.height = 'auto'; }
  }
  setTimeout(() => {
    const ta = document.getElementById('aiInput');
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 80) + 'px'; }
  }, 0);
});

// Suggestions
document.querySelectorAll('.suggestion').forEach(btn => {
  btn.addEventListener('click', () => sendAIMessage(btn.dataset.q));
});

// Clear chat
document.getElementById('btnClearChat')?.addEventListener('click', () => {
  const msgs = document.getElementById('aiMessages');
  if (msgs) msgs.innerHTML = '';
  addBotMessage('Chat limpo! Como posso ajudar?');
});

// ── VOICE ────────────────────────────────────────────────
const voiceBtn = document.getElementById('voiceBtn');
let recognition = null;

function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { alert('Reconhecimento de voz não suportado. Use Chrome.'); return; }
  recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = e => {
    const text = e.results[0][0].transcript;
    const input = document.getElementById('aiInput');
    if (input) input.value = text;
    sendAIMessage(text);
    if (input) { input.value = ''; }
  };
  recognition.onend = () => voiceBtn?.classList.remove('listening');
  recognition.onerror = () => voiceBtn?.classList.remove('listening');
}

voiceBtn?.addEventListener('click', () => {
  if (!recognition) initVoice();
  if (voiceBtn.classList.contains('listening')) {
    recognition?.stop();
    voiceBtn.classList.remove('listening');
  } else {
    try { recognition?.start(); voiceBtn.classList.add('listening'); } catch {}
  }
});

// ═══════════════════════════════════════════
// AI DEMO MODE
// ═══════════════════════════════════════════
async function runAIDemo() {
  navigateTo('spreadsheet');
  const demoMessages = [
    { delay: 500,  text: '🎬 Iniciando demonstração…' },
    { delay: 1200, text: 'Gastei 35 com almoço' },
    { delay: 2500, text: 'Qual meu maior gasto?' },
    { delay: 4000, text: 'Onde posso economizar?' },
    { delay: 5500, text: 'Resumo dos meus gastos' },
  ];

  for (const msg of demoMessages) {
    await sleep(msg.delay);
    if (msg.text.startsWith('🎬')) { addBotMessage(msg.text); continue; }
    const input = document.getElementById('aiInput');
    if (input) { input.value = msg.text; }
    await sleep(600);
    await sendAIMessage(msg.text);
    if (input) input.value = '';
  }
}

document.getElementById('btnDemoAI')?.addEventListener('click', runAIDemo);

// ═══════════════════════════════════════════
// PRESENTATION MODE
// ═══════════════════════════════════════════
const DEMO_DATA = {
  transactions: [
    { id:'d1', category:'Alimentação', amount:85.50, date:today() },
    { id:'d2', category:'Alimentação', amount:42.00, date:today() },
    { id:'d3', category:'Transporte',  amount:25.00, date:today() },
    { id:'d4', category:'Transporte',  amount:18.50, date:today() },
    { id:'d5', category:'Lazer',       amount:120.00, date:today() },
    { id:'d6', category:'Compras',     amount:89.90, date:today() },
  ],
  receivables: [
    { id:'r1', person:'Pessoa A', description:'Jantar',     amount:45.00 },
    { id:'r2', person:'Pessoa B', description:'Transporte', amount:22.00 },
  ],
};

document.getElementById('btnPresentMode')?.addEventListener('click', () => {
  presentationMode = !presentationMode;
  const btn = document.getElementById('btnPresentMode');
  const banner = document.getElementById('presentBanner');
  btn?.classList.toggle('active', presentationMode);
  if (banner) banner.style.display = presentationMode ? 'flex' : 'none';
  renderSpreadsheet();
  renderReceivables();
});
document.getElementById('btnExitPresent')?.addEventListener('click', () => {
  presentationMode = false;
  const btn = document.getElementById('btnPresentMode');
  const banner = document.getElementById('presentBanner');
  btn?.classList.remove('active');
  if (banner) banner.style.display = 'none';
  renderSpreadsheet();
  renderReceivables();
});

// ═══════════════════════════════════════════
// EXPORT / REPORTS
// ═══════════════════════════════════════════
document.getElementById('btnExportCSV')?.addEventListener('click', () => {
  const txs = state.transactions;
  const rows = [['Categoria','Valor (R$)','Data'], ...txs.map(t => [t.category, t.amount.toFixed(2).replace('.',','), t.date])];
  const csv = rows.map(r => r.join(';')).join('\n');
  download(`bloom-${today()}.csv`, '\uFEFF' + csv, 'text/csv;charset=utf-8;');
});

document.getElementById('btnExportJSON')?.addEventListener('click', () => {
  download(`bloom-backup-${today()}.json`, JSON.stringify({ state, settings }, null, 2), 'application/json');
});

document.getElementById('btnExportPDF')?.addEventListener('click', () => {
  const txs = state.transactions;
  const grouped = {};
  txs.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
  const total = txs.reduce((s, t) => s + t.amount, 0);

  const content = document.getElementById('pdfContent');
  if (!content) return;

  content.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead><tr style="background:#F4F4F6;">
        <th style="padding:10px;text-align:left;border-bottom:1px solid #ddd;">Categoria</th>
        <th style="padding:10px;text-align:right;border-bottom:1px solid #ddd;">Total</th>
        <th style="padding:10px;text-align:right;border-bottom:1px solid #ddd;">% do total</th>
      </tr></thead>
      <tbody>
        ${Object.entries(grouped).sort((a,b)=>b[1]-a[1]).map(([cat,val]) => `
          <tr>
            <td style="padding:9px 10px;border-bottom:1px solid #eee;">${cat}</td>
            <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">${fmt(val)}</td>
            <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;color:#666;">${(val/total*100).toFixed(1)}%</td>
          </tr>`).join('')}
        <tr style="font-weight:800;background:#F4F4F6;">
          <td style="padding:12px 10px;">TOTAL</td>
          <td style="padding:12px 10px;text-align:right;">${fmt(total)}</td>
          <td style="padding:12px 10px;text-align:right;">100%</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size:11px;color:#999;margin-top:20px;">Gerado por Bloom Finance em ${new Date().toLocaleDateString('pt-BR')}.</p>`;

  const el = document.getElementById('pdfReport');
  if (!el) return;
  el.style.display = 'block';
  window.html2pdf?.().set({ margin:12, filename:`bloom-relatorio-${today()}.pdf`, html2canvas:{ scale:2 }, jsPDF:{ unit:'mm', format:'a4' } })
    .from(el).save().then(() => { el.style.display = 'none'; });
});

function download(filename, data, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type }));
  a.download = filename;
  a.click();
}

// ═══════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════
document.getElementById('themeToggle')?.addEventListener('change', e => {
  settings.themeDark = e.target.checked;
  saveData(); applyTheme();
});

document.getElementById('btnWipeData')?.addEventListener('click', () => {
  if (confirm('Isso irá apagar todos os dados e restaurar os originais. Continuar?')) {
    localStorage.removeItem('bloom_v3');
    window.location.reload();
  }
});

// ═══════════════════════════════════════════
// HERO 3D TILT (Mouse effect)
// ═══════════════════════════════════════════
const hero3D = document.getElementById('hero3D');
const heroCopy = document.getElementById('heroCopy');
document.addEventListener('mousemove', e => {
  if (!hero3D) return;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const rx = ((e.clientY - cy) / cy) * -10;
  const ry = ((e.clientX - cx) / cx) * 10;
  hero3D.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  if (heroCopy) heroCopy.style.transform = `translateX(${ry * 0.3}px) translateY(${rx * 0.3}px)`;
});

// ═══════════════════════════════════════════
// UTIL
// ═══════════════════════════════════════════
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══════════════════════════════════════════
// BOOTSTRAP
// ═══════════════════════════════════════════
function init() {
  if (!loadData()) seedRealData();
  applyTheme();
  // App-page renders happen on enterWorkspace()
}

document.addEventListener('DOMContentLoaded', init);
