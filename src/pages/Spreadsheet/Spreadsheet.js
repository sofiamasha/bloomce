import './Spreadsheet.css';
import { globalState } from '../../core/state';
import { formatCurrency } from '../../utils/formatters';
import { DEMO_DATA, DEMO_CATEGORIES } from '../../models/categories';
import { generateId, getTodayDate } from '../../utils/helpers';

export const Spreadsheet = {
  searchQuery: '',

  render() {
    const section = document.createElement('div');
    section.className = 'spreadsheet-container';
    
    section.innerHTML = `
      <div class="sp-header">
        <h1 class="sp-title">Planilha Inteligente</h1>
        <div class="sp-subtitle" id="spreadsheetSub">Carregando...</div>
      </div>
      <div class="sp-wrapper">
        <div class="sp-grid" id="spreadsheetTable"></div>
        <button class="sp-col-add" id="btnAddCategory" title="Nova Categoria">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    `;

    return section;
  },

  init() {
    this.renderTable();

    document.getElementById('btnAddCategory')?.addEventListener('click', () => {
      const name = prompt('Nome da nova categoria (ex: Academia):');
      if (!name?.trim()) return;
      if (globalState.data.categories.find(c => c.name === name.trim())) { 
        alert('Categoria já existe!'); 
        return; 
      }
      globalState.addCategory({ name: name.trim(), emoji: '📦' });
      this.renderTable();
    });

    window.addEventListener('bloom:search', (e) => {
      this.searchQuery = e.detail;
      this.renderTable();
    });

    window.addEventListener('bloom:dataUpdated', () => this.renderTable());
    window.addEventListener('bloom:presentationToggled', () => this.renderTable());
    
    window.addEventListener('bloom:flashColumn', (e) => {
      const catName = e.detail;
      const safeId = catName.replace(/[^a-zA-Z0-9]/g, '_');
      const col = document.getElementById(`col_${safeId}`);
      if (col) {
        col.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        col.classList.remove('flash');
        void col.offsetWidth;
        col.classList.add('flash');
      }
    });

    // Make functions globally available for inline event handlers (legacy support for simple rendering)
    window.deleteTx = (id) => {
      globalState.removeTransaction(id);
      this.renderTable();
    };

    window.openAddForm = (cat) => {
      const safeId = cat.replace(/[^a-zA-Z0-9]/g, '_');
      const body = document.getElementById(`body_${safeId}`);
      if (!body) return;

      document.querySelectorAll('.inline-add-form').forEach(f => f.remove());

      const form = document.createElement('div');
      form.className = 'inline-add-form';
      form.innerHTML = `
        <input type="number" step="0.01" min="0.01" class="inline-add-input" id="inlineInput_${safeId}" placeholder="Ex: 22.50" aria-label="Valor do gasto" />
        <button class="inline-add-btn" onclick="submitAdd('${cat}','${safeId}')">✓</button>
        <button class="inline-cancel-btn" onclick="this.parentElement.remove()">✕</button>
      `;
      body.parentElement.insertBefore(form, body.nextSibling.nextSibling);
      document.getElementById(`inlineInput_${safeId}`)?.focus();

      document.getElementById(`inlineInput_${safeId}`)?.addEventListener('keydown', e => {
        if (e.key === 'Enter') window.submitAdd(cat, safeId);
        if (e.key === 'Escape') form.remove();
      });
    };

    window.submitAdd = (cat, safeId) => {
      const input = document.getElementById(`inlineInput_${safeId}`);
      if (!input) return;
      const val = parseFloat(input.value.replace(',', '.'));
      if (isNaN(val) || val <= 0) return;

      globalState.addTransaction({ id: generateId(), category: cat, amount: val, date: getTodayDate() });
      document.querySelector('.inline-add-form')?.remove();
      this.renderTable();

      setTimeout(() => {
        const body = document.getElementById(`body_${safeId}`);
        if (body?.lastElementChild) body.lastElementChild.classList.add('new-item');
      }, 50);
    };
  },

  getActiveTxs() {
    return globalState.presentationMode ? DEMO_DATA.transactions : globalState.getTransactions();
  },

  getActiveCategories() {
    return globalState.presentationMode ? DEMO_CATEGORIES : globalState.data.categories;
  },

  getEmoji(name) {
    const all = [...globalState.data.categories, ...DEMO_CATEGORIES];
    return (all.find(c => c.name === name) || { emoji: '📦' }).emoji;
  },

  renderTable() {
    const wrapper = document.getElementById('spreadsheetTable');
    if (!wrapper) return;

    const txs = this.getActiveTxs();
    const cats = this.getActiveCategories();
    const q = this.searchQuery.toLowerCase().trim();

    const grouped = {};
    cats.forEach(c => { grouped[c.name] = []; });
    txs.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    });

    const totalSpend = txs.reduce((s, t) => s + t.amount, 0);
    const sub = document.getElementById('spreadsheetSub');
    if (sub) sub.textContent = `${txs.length} registros · Total: ${formatCurrency(totalSpend)}`;

    let html = '';
    Object.keys(grouped).forEach(cat => {
      let items = grouped[cat];
      const emoji = this.getEmoji(cat);

      if (q && !cat.toLowerCase().includes(q)) {
        items = items.filter(t => t.amount.toString().includes(q));
        if (items.length === 0 && !cat.toLowerCase().includes(q)) return;
      }

      const total = items.reduce((s, t) => s + t.amount, 0);
      const rowsHtml = items.map(t => `
        <div class="sp-row" data-id="${t.id}">
          <span class="sp-row-val">${formatCurrency(t.amount)}</span>
          <button class="sp-row-del" onclick="deleteTx('${t.id}')" title="Remover" aria-label="Remover">✕</button>
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
          <button class="sp-row-add" onclick="openAddForm('${cat}')" aria-label="Adicionar em ${cat}">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar
          </button>
          <div class="sp-col-footer">
            <div class="col-total-label">Total</div>
            <div class="col-total-val" id="total_${safeId}">${formatCurrency(total)}</div>
          </div>
        </div>
      `;
    });

    wrapper.innerHTML = html;
  }
};
