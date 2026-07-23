import './Reports.css';
import { exportService } from '../../services/export.service';

export const Reports = {
  render() {
    const section = document.createElement('div');
    section.className = 'reports-container';
    
    section.innerHTML = `
      <div class="rep-header">
        <h1 class="rep-title">Relatórios e Exportação</h1>
        <div class="rep-subtitle">Exporte seus dados com um clique</div>
      </div>
      
      <div class="export-grid">
        <div class="export-card">
          <div class="exp-icon">📄</div>
          <h3>Relatório PDF</h3>
          <p>Gera um documento formatado com totais por categoria.</p>
          <button class="btn-exp" id="btnExportPDF">Exportar PDF</button>
        </div>
        <div class="export-card">
          <div class="exp-icon">📊</div>
          <h3>Exportar CSV</h3>
          <p>Para abrir no Excel, Google Sheets ou Apple Numbers.</p>
          <button class="btn-exp" id="btnExportCSV">Baixar CSV</button>
        </div>
        <div class="export-card">
          <div class="exp-icon">💾</div>
          <h3>Backup JSON</h3>
          <p>Exporta o banco de dados completo (backup).</p>
          <button class="btn-exp" id="btnExportJSON">Baixar JSON</button>
        </div>
      </div>

      <!-- Hidden container for PDF rendering -->
      <div id="pdfReport" style="display:none; padding:40px; font-family:sans-serif; width:800px; background:white; color:black;">
        <h1 style="font-size:24px; margin-bottom:4px; font-weight:800; color:#111;">Bloom Finance</h1>
        <p style="font-size:14px; color:#666; margin-bottom:30px;">Relatório Consolidado de Despesas</p>
        <div class="pdf-content"></div>
      </div>
    `;

    return section;
  },

  init() {
    document.getElementById('btnExportCSV')?.addEventListener('click', () => exportService.exportCSV());
    document.getElementById('btnExportJSON')?.addEventListener('click', () => exportService.exportJSON());
    document.getElementById('btnExportPDF')?.addEventListener('click', () => exportService.exportPDF('pdfReport'));
  }
};
