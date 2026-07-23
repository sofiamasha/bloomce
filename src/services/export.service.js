import { globalState } from '../core/state';
import { downloadFile, getTodayDate } from '../utils/helpers';
import { formatCurrency } from '../utils/formatters';

export const exportService = {
  exportCSV() {
    const txs = globalState.getTransactions();
    const rows = [['Categoria','Valor (R$)','Data'], ...txs.map(t => [t.category, t.amount.toFixed(2).replace('.',','), t.date])];
    const csv = rows.map(r => r.join(';')).join('\n');
    downloadFile(`bloom-${getTodayDate()}.csv`, '\uFEFF' + csv, 'text/csv;charset=utf-8;');
  },

  exportJSON() {
    downloadFile(`bloom-backup-${getTodayDate()}.json`, JSON.stringify(globalState.data, null, 2), 'application/json');
  },

  exportPDF(elementId) {
    const txs = globalState.getTransactions();
    const grouped = {};
    txs.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const total = txs.reduce((s, t) => s + t.amount, 0);

    const el = document.getElementById(elementId);
    if (!el) return;

    const content = el.querySelector('.pdf-content');
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
              <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">${formatCurrency(val)}</td>
              <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;color:#666;">${(val/total*100).toFixed(1)}%</td>
            </tr>`).join('')}
          <tr style="font-weight:800;background:#F4F4F6;">
            <td style="padding:12px 10px;">TOTAL</td>
            <td style="padding:12px 10px;text-align:right;">${formatCurrency(total)}</td>
            <td style="padding:12px 10px;text-align:right;">100%</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:11px;color:#999;margin-top:20px;">Gerado por Bloom Finance em ${new Date().toLocaleDateString('pt-BR')}.</p>`;

    el.style.display = 'block';
    window.html2pdf?.().set({ margin:12, filename:`bloom-relatorio-${getTodayDate()}.pdf`, html2canvas:{ scale:2 }, jsPDF:{ unit:'mm', format:'a4' } })
      .from(el).save().then(() => { el.style.display = 'none'; });
  }
};
