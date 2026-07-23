/* ═══════════════════════════════════════════════════════
   BLOOM FINANCE — Premium Intelligent Spreadsheet Engine
   ═══════════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════════════
// STATE MANAGEMENT & INITIAL DATA
// ══════════════════════════════════════════════════════════
const CATEGORIES = [
  'Metrô', 'Ônibus', 'Lanche Faculdade', 'Almoço', 'Lanche', 
  'Lanche com amigas', 'Lanche pessoal', 'Coca-Cola', 'Sorvete', 
  'Padaria', 'Gastos pessoais', 'Cabelo', 'Riachuelo', 'Uber', 
  'Janta', 'Desconhecido'
];

let state = { transactions: [], receivables: [] };
let settings = { themeDark: false };

function loadData() {
  try {
    const raw = localStorage.getItem('bloom_data_v2');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveData() {
  localStorage.setItem('bloom_data_v2', JSON.stringify({ state, settings }));
}

function seedExactData() {
  const uid = () => '_' + Math.random().toString(36).slice(2, 9);
  const add = (cat, vals) => {
    vals.forEach(v => {
      state.transactions.push({ id: uid(), category: cat, amount: v, date: new Date().toISOString().slice(0,10) });
    });
  };

  add('Metrô', [5.80, 5.80, 5.80, 5.80, 11.60, 11.60, 11.80, 11.60, 11.60, 6.00]);
  add('Ônibus', [94.80, 39.00]);
  add('Lanche Faculdade', [10.50, 11.50, 10.50, 22.60, 11.90, 10.50, 6.30, 2.20, 9.10, 8.30, 6.10, 20.00, 4.00, 3.60, 10.50, 10.50, 2.20]);
  add('Almoço', [9.99, 22.50, 15.99, 48.50, 12.70, 15.75, 40.00, 15.30, 26.99, 47.00, 21.00, 60.00, 8.98, 10.99, 58.00, 2.70]);
  add('Lanche com amigas', [86.00]);
  add('Lanche pessoal', [17.99, 54.00]);
  add('Gastos pessoais', [44.00, 22.00, 55.00, 35.00]);
  add('Desconhecido', [69.80, 13.90, 29.00, 54.00, 45.00]);
  add('Janta', [37.00]);
  add('Cabelo', [270.00]);
  add('Riachuelo', [40.00]);
  add('Uber', [21.94]);
  add('Sorvete', [19.50]);
  add('Padaria', [13.50]);
  add('Coca-Cola', [21.47, 23.00]);

  state.receivables.push(
    { id: uid(), person: 'Pai', description: 'Sorvete', amount: 19.50 },
    { id: uid(), person: 'Pai', description: 'Padaria', amount: 13.50 },
    { id: uid(), person: 'Mãe', description: 'Coca-Cola', amount: 21.47 },
    { id: uid(), person: 'Mãe', description: 'Uber', amount: 21.94 },
    { id: uid(), person: 'Mãe', description: 'Cabelo', amount: 270.00 },
    { id: uid(), person: 'Mãe', description: 'Riachuelo', amount: 40.00 },
    { id: uid(), person: 'Mãe', description: 'Coca-Cola', amount: 23.00 }
  );
  
  saveData();
}

// ══════════════════════════════════════════════════════════
// CORE UTILS
// ══════════════════════════════════════════════════════════
const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const uid = () => '_' + Math.random().toString(36).slice(2, 9);

function applyTheme() {
  if (settings.themeDark) document.body.classList.add('theme-dark');
  else document.body.classList.remove('theme-dark');
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.checked = settings.themeDark;
}

// ══════════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════════
const pages = ['spreadsheet', 'receivables', 'reports', 'settings'];

function navigateTo(pageId) {
  pages.forEach(p => {
    const btn = document.querySelector(`.nav-item[data-page="${p}"]`);
    const page = document.getElementById(`page-${p}`);
    if (btn) btn.classList.toggle('active', p === pageId);
    if (page) page.classList.toggle('active', p === pageId);
  });
  
  if (pageId === 'spreadsheet') renderSpreadsheet();
  if (pageId === 'receivables') renderReceivables();
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.page));
});

// ══════════════════════════════════════════════════════════
// SPREADSHEET RENDER
// ══════════════════════════════════════════════════════════
function renderSpreadsheet(filterQuery = '') {
  const wrapper = document.getElementById('spreadsheetWrapper');
  if (!wrapper) return;

  const q = filterQuery.toLowerCase().trim();
  
  // Group by Category
  const grouped = {};
  CATEGORIES.forEach(c => grouped[c] = []);
  
  // Also collect dynamically created categories
  state.transactions.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  let html = '';
  
  Object.keys(grouped).forEach(cat => {
    const txs = grouped[cat].filter(t => {
      if (!q) return true;
      return t.category.toLowerCase().includes(q) || t.amount.toString().includes(q);
    });
    
    // Se estiver pesquisando e a coluna não tiver match, esconde
    if (q && txs.length === 0 && !cat.toLowerCase().includes(q)) return;

    const total = txs.reduce((sum, t) => sum + t.amount, 0);
    
    html += `
      <div class="spreadsheet-col" id="col-${cat.replace(/\s+/g, '-')}">
        <div class="col-header">
          <div class="col-title">${cat}</div>
          <div class="col-count">${txs.length} itens</div>
        </div>
        <div class="col-body">
          ${txs.map(t => `
            <div class="spend-card" data-id="${t.id}">
              <div class="spend-val">${fmt(t.amount)}</div>
            </div>
          `).join('')}
        </div>
        <div class="col-footer">
          <div class="col-total-label">Total</div>
          <div class="col-total-value">${fmt(total)}</div>
        </div>
      </div>
    `;
  });

  if (html === '') {
    html = `<div style="display:flex;align-items:center;justify-content:center;width:100%;color:var(--text-3);">Nenhum resultado encontrado.</div>`;
  }

  wrapper.innerHTML = html;
}

// Search
document.getElementById('searchInput')?.addEventListener('input', (e) => {
  navigateTo('spreadsheet');
  renderSpreadsheet(e.target.value);
});

// ══════════════════════════════════════════════════════════
// RECEIVABLES RENDER
// ══════════════════════════════════════════════════════════
function renderReceivables() {
  const grid = document.getElementById('receivablesGrid');
  if (!grid) return;

  const grouped = {};
  state.receivables.forEach(r => {
    if (!grouped[r.person]) grouped[r.person] = [];
    grouped[r.person].push(r);
  });

  let html = '';
  Object.keys(grouped).forEach(person => {
    const items = grouped[person];
    const total = items.reduce((sum, i) => sum + i.amount, 0);

    html += `
      <div class="rec-person">
        <div class="rec-person-header">
          <div class="rec-person-name">${person}</div>
          <div class="rec-person-total">${fmt(total)}</div>
        </div>
        <div class="rec-list">
          ${items.map(item => `
            <div class="rec-item">
              <div class="rec-item-info">
                <div class="rec-item-desc">${item.description}</div>
                <div class="rec-item-val">${fmt(item.amount)}</div>
              </div>
              <button class="btn-pay" onclick="markAsReceived('${item.id}')">Recebido ✓</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  if (!html) {
    html = `<div style="color:var(--text-3); text-align:center; grid-column:1/-1; padding:40px;">Nenhum valor pendente para receber. 🎉</div>`;
  }

  grid.innerHTML = html;
}

window.markAsReceived = (id) => {
  state.receivables = state.receivables.filter(r => r.id !== id);
  saveData();
  renderReceivables();
};

// ══════════════════════════════════════════════════════════
// AI ASSISTANT & COMMAND BAR
// ══════════════════════════════════════════════════════════
function parseAICommand(text) {
  const lower = text.toLowerCase().trim();
  
  // 1. ADICIONAR GASTO
  // Ex: "gastei 15 com almoço", "comprei uma blusa de 40 na riachuelo"
  const spendMatch = lower.match(/(?:gastei|comprei|paguei|deu|custou)\s+(?:r\$\s*)?(\d+(?:[.,]\d{1,2})?)\s+(?:com|de|na|no)?\s*(.+)/);
  if (spendMatch) {
    const val = parseFloat(spendMatch[1].replace(',', '.'));
    let desc = spendMatch[2].trim();
    
    // Match strict category
    let cat = CATEGORIES.find(c => desc.includes(c.toLowerCase()));
    
    // Fallback manual mappings
    if (!cat) {
      if (desc.includes('comida') || desc.includes('restaurante')) cat = 'Almoço';
      else if (desc.includes('roupa') || desc.includes('blusa')) cat = 'Riachuelo';
      else if (desc.includes('transporte') || desc.includes('carro')) cat = 'Uber';
      else cat = 'Desconhecido';
    }

    state.transactions.push({ id: uid(), category: cat, amount: val, date: new Date().toISOString().slice(0,10) });
    saveData();
    
    // Visual Feedback
    if (currentPage === 'spreadsheet') {
      renderSpreadsheet();
      const col = document.getElementById(`col-${cat.replace(/\s+/g, '-')}`);
      if (col) {
        col.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        col.classList.remove('flash');
        void col.offsetWidth; // trigger reflow
        col.classList.add('flash');
      }
    }
    return `Adicionado: **${fmt(val)}** em **${cat}**. A planilha foi atualizada.`;
  }

  // 2. INSIGHTS / PERGUNTAS
  if (lower.includes('resumo') || lower.includes('total')) {
    const total = state.transactions.reduce((s, t) => s + t.amount, 0);
    return `Seu gasto total atualizado é de **${fmt(total)}** em todas as categorias.`;
  }

  if (lower.includes('onde posso economizar') || lower.includes('maior gasto')) {
    const grouped = {};
    state.transactions.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const top = Object.entries(grouped).sort((a,b) => b[1] - a[1])[0];
    if (top) return `Sua maior categoria no momento é **${top[0]}** com **${fmt(top[1])}**. Tente reduzir um pouco aqui para economizar.`;
  }

  if (lower.includes('quanto gastei com')) {
    const cat = CATEGORIES.find(c => lower.includes(c.toLowerCase()));
    if (cat) {
      const sum = state.transactions.filter(t => t.category === cat).reduce((s,t) => s+t.amount, 0);
      return `Você gastou **${fmt(sum)}** com **${cat}** até agora.`;
    }
  }

  return `Não entendi o comando. Tente: "Gastei 20 com almoço" ou "Qual meu maior gasto?".`;
}

function showAIReply(htmlMsg) {
  const replyBox = document.getElementById('aiReply');
  const content = document.getElementById('aiReplyContent');
  content.innerHTML = htmlMsg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  replyBox.classList.add('show');
  setTimeout(() => replyBox.classList.remove('show'), 6000);
}

const aiInput = document.getElementById('aiInput');
aiInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && aiInput.value.trim()) {
    const res = parseAICommand(aiInput.value);
    showAIReply(res);
    aiInput.value = '';
  }
});

// Fake Voice implementation for demo
const voiceBtn = document.getElementById('voiceBtn');
voiceBtn?.addEventListener('click', () => {
  voiceBtn.classList.add('listening');
  aiInput.placeholder = 'Ouvindo...';
  
  // Simulate Web Speech API delay
  setTimeout(() => {
    voiceBtn.classList.remove('listening');
    aiInput.placeholder = 'Fale ou digite naturalmente...';
    aiInput.value = 'Gastei 22 com uber';
    setTimeout(() => {
      const res = parseAICommand(aiInput.value);
      showAIReply(res);
      aiInput.value = '';
    }, 500);
  }, 2000);
});

// ══════════════════════════════════════════════════════════
// EXPORT & REPORTS
// ══════════════════════════════════════════════════════════
document.getElementById('btnExportCSV')?.addEventListener('click', () => {
  const rows = [['Categoria', 'Valor (R$)']];
  state.transactions.forEach(t => rows.push([t.category, t.amount.toFixed(2).replace('.',',')]));
  const csv = rows.map(r => r.join(';')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `bloom-finance-${today()}.csv`; a.click();
});

document.getElementById('btnExportJSON')?.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `bloom-backup-${today()}.json`; a.click();
});

document.getElementById('btnExportPDF')?.addEventListener('click', () => {
  const pdfDiv = document.getElementById('pdfReport');
  const content = document.getElementById('pdfContent');
  
  const grouped = {};
  state.transactions.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
  const total = state.transactions.reduce((s,t) => s+t.amount, 0);

  let html = `<table style="width:100%; text-align:left; border-collapse:collapse;">
    <tr><th style="padding:8px; border-bottom:1px solid #ccc;">Categoria</th><th style="padding:8px; border-bottom:1px solid #ccc;">Total</th></tr>`;
  Object.keys(grouped).forEach(c => html += `<tr><td style="padding:8px; border-bottom:1px solid #eee;">${c}</td><td style="padding:8px; border-bottom:1px solid #eee;">${fmt(grouped[c])}</td></tr>`);
  html += `<tr><th style="padding:8px; padding-top:16px;">Gasto Total</th><th style="padding:8px; padding-top:16px; color:#EF4444;">${fmt(total)}</th></tr></table>`;
  
  content.innerHTML = html;
  pdfDiv.style.display = 'block';

  window.html2pdf().set({ margin: 10, filename: `bloom-relatorio-${today()}.pdf` }).from(pdfDiv).save().then(() => {
    pdfDiv.style.display = 'none';
  });
});

// ══════════════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════════════
document.getElementById('themeToggle')?.addEventListener('change', (e) => {
  settings.themeDark = e.target.checked;
  saveData(); applyTheme();
});

document.getElementById('btnWipeData')?.addEventListener('click', () => {
  if (confirm('Isto irá apagar todas as transações e restaurar os dados originais. Tem certeza?')) {
    localStorage.removeItem('bloom_data_v2');
    window.location.reload();
  }
});

// ══════════════════════════════════════════════════════════
// BOOTSTRAP
// ══════════════════════════════════════════════════════════
function init() {
  const data = loadData();
  if (!data) {
    seedExactData(); // Seed what the user explicitly requested
  } else {
    state = data.state;
    settings = data.settings;
  }
  
  applyTheme();
  renderSpreadsheet();
}

document.addEventListener('DOMContentLoaded', init);
