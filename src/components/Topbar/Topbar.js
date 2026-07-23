import './Topbar.css';
import { globalState } from '../../core/state';

export const Topbar = {
  render() {
    const header = document.createElement('header');
    header.className = 'app-topbar';
    header.setAttribute('role', 'banner');

    header.innerHTML = `
      <div class="topbar-left">
        <button class="brand-back" id="btnBackHome" title="Voltar à home" aria-label="Voltar à home">
          <div class="brand-mark-sm" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C14 3 5 8 5 15C5 20.5 9 25 14 25C19 25 23 20.5 23 15C23 8 14 3 14 3Z" fill="url(#bgs)"/>
              <path d="M14 10C14 10 10 12.5 10 16C10 18.8 11.8 21 14 21C16.2 21 18 18.8 18 16C18 12.5 14 10 14 10Z" fill="white" fill-opacity="0.9"/>
              <defs><linearGradient id="bgs" x1="5" y1="3" x2="23" y2="25" gradientUnits="userSpaceOnUse"><stop stop-color="#7C6AFF"/><stop offset="1" stop-color="#B06EFF"/></linearGradient></defs>
            </svg>
          </div>
          <span class="brand-name-sm">Bloom</span>
        </button>

        <nav class="app-nav" aria-label="Abas da aplicação">
          <button class="app-tab active" data-page="spreadsheet" id="tab-spreadsheet">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Planilha
          </button>
          <button class="app-tab" data-page="receivables" id="tab-receivables">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            A Receber
          </button>
          <button class="app-tab" data-page="reports" id="tab-reports">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Relatórios
          </button>
          <button class="app-tab" data-page="settings" id="tab-settings">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Ajustes
          </button>
        </nav>
      </div>

      <div class="topbar-right">
        <div class="search-box">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="searchInput" class="search-field" placeholder="Buscar..." aria-label="Buscar transações" />
        </div>
        <div class="balance-pill" id="balancePill" title="Saldo disponível">R$ 171,72</div>
        <button class="btn-demo-ai" id="btnDemoAI" title="Ver demonstração da IA">✨ Demonstrar IA</button>
        <button class="topbar-icon-btn" id="btnPresentMode" title="Modo Apresentação">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </button>
      </div>
      
      <!-- Presentation Banner -->
      <div class="present-banner" id="presentBanner" style="display:none;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
        Modo Apresentação ativo — dados fictícios visíveis
        <button id="btnExitPresent">Sair</button>
      </div>
    `;
    return header;
  },

  init() {
    const appPages = ['spreadsheet', 'receivables', 'reports', 'settings'];

    document.getElementById('btnBackHome')?.addEventListener('click', () => {
      if (window.navigateToHome) window.navigateToHome();
    });

    document.querySelectorAll('.app-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.page;
        appPages.forEach(p => {
          document.getElementById(`tab-${p}`)?.classList.toggle('active', p === id);
          document.getElementById(`page-${p}`)?.classList.toggle('active', p === id);
        });
      });
    });

    // Custom Event logic for Search
    document.getElementById('searchInput')?.addEventListener('input', e => {
      window.dispatchEvent(new CustomEvent('bloom:search', { detail: e.target.value }));
    });

    // Demo AI Logic
    document.getElementById('btnDemoAI')?.addEventListener('click', () => {
      document.getElementById('tab-spreadsheet')?.click();
      window.dispatchEvent(new CustomEvent('bloom:demoAI'));
    });

    // Presentation Mode
    const togglePresentation = () => {
      globalState.presentationMode = !globalState.presentationMode;
      const btn = document.getElementById('btnPresentMode');
      const banner = document.getElementById('presentBanner');
      btn?.classList.toggle('active', globalState.presentationMode);
      if (banner) banner.style.display = globalState.presentationMode ? 'flex' : 'none';
      window.dispatchEvent(new CustomEvent('bloom:presentationToggled'));
    };

    document.getElementById('btnPresentMode')?.addEventListener('click', togglePresentation);
    document.getElementById('btnExitPresent')?.addEventListener('click', () => {
      if (globalState.presentationMode) togglePresentation();
    });
  }
};
