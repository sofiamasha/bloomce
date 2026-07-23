import './Receivables.css';
import { globalState } from '../../core/state';
import { formatCurrency } from '../../utils/formatters';
import { DEMO_DATA } from '../../models/categories';

export const Receivables = {
  render() {
    const section = document.createElement('div');
    section.className = 'receivables-container';
    
    section.innerHTML = `
      <div class="rec-header">
        <h1 class="rec-title">Valores a Receber</h1>
        <div class="rec-subtitle">Acompanhe quem precisa te pagar</div>
      </div>
      <div class="rec-grid" id="receivablesGrid"></div>
    `;

    return section;
  },

  init() {
    this.renderGrid();

    window.markReceived = (id) => {
      globalState.removeReceivable(id);
      this.renderGrid();
    };

    window.addEventListener('bloom:presentationToggled', () => this.renderGrid());
  },

  renderGrid() {
    const grid = document.getElementById('receivablesGrid');
    if (!grid) return;

    const items = globalState.presentationMode ? DEMO_DATA.receivables : globalState.data.receivables;
    
    if (!items.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-3);">🎉 Nenhum valor pendente para receber!</div>';
      return;
    }

    const grouped = {};
    items.forEach(r => { 
      if (!grouped[r.person]) grouped[r.person] = []; 
      grouped[r.person].push(r); 
    });

    grid.innerHTML = Object.keys(grouped).map(person => {
      const list = grouped[person];
      const total = list.reduce((s, i) => s + i.amount, 0);
      return `
        <div class="rec-card">
          <div class="rec-card-header">
            <span class="rec-name">${person}</span>
            <span class="rec-total">${formatCurrency(total)}</span>
          </div>
          <div class="rec-list">
            ${list.map(item => `
              <div class="rec-item">
                <div class="rec-item-info">
                  <span class="rec-item-desc">${item.description}</span>
                  <span class="rec-item-val">${formatCurrency(item.amount)}</span>
                </div>
                <button class="btn-paid" onclick="markReceived('${item.id}')" aria-label="Marcar ${item.description} como recebido">Recebido ✓</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
};
