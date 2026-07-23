import './Settings.css';
import { globalState } from '../../core/state';
import { storageService } from '../../services/storage.service';

export const Settings = {
  render() {
    const section = document.createElement('div');
    section.className = 'settings-container';
    
    section.innerHTML = `
      <div class="set-header">
        <h1 class="set-title">Ajustes</h1>
        <div class="set-subtitle">Preferências e controle de dados</div>
      </div>
      
      <div class="set-group">
        <div class="set-item">
          <div class="set-item-text">
            <h3>Modo Escuro (Dark Mode)</h3>
            <p>Altera o tema visual da aplicação.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="themeToggle" ${globalState.settings.themeDark ? 'checked' : ''} aria-label="Alternar modo escuro" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="set-group danger-zone">
        <div class="set-item">
          <div class="set-item-text">
            <h3 class="danger-text">Apagar todos os dados</h3>
            <p>Isso apagará permanentemente todos os registros e restaurará os dados de demonstração.</p>
          </div>
          <button class="btn-danger" id="btnWipeData">Restaurar Padrão</button>
        </div>
      </div>
    `;

    return section;
  },

  init() {
    document.getElementById('themeToggle')?.addEventListener('change', (e) => {
      globalState.settings.themeDark = e.target.checked;
      globalState.save();
      document.body.classList.toggle('theme-dark', globalState.settings.themeDark);
    });

    document.getElementById('btnWipeData')?.addEventListener('click', () => {
      if (confirm('Isso irá apagar todos os dados e restaurar os originais. Continuar?')) {
        storageService.wipeData();
      }
    });
  }
};
