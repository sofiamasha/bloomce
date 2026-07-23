import './AppShell.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Topbar } from '../../components/Topbar/Topbar';
import { Spreadsheet } from '../../pages/Spreadsheet/Spreadsheet';
import { Receivables } from '../../pages/Receivables/Receivables';
import { Reports } from '../../pages/Reports/Reports';
import { Settings } from '../../pages/Settings/Settings';

export const AppShell = {
  render() {
    const div = document.createElement('div');
    div.id = 'appPage';
    div.className = 'app-page';
    div.setAttribute('aria-label', 'Workspace financeiro');

    div.innerHTML = `
      <div id="topbar-slot"></div>
      <div class="app-body" id="appBody">
        <main class="app-content" id="appContent">
          <section class="page active" id="page-spreadsheet"></section>
          <section class="page" id="page-receivables"></section>
          <section class="page" id="page-reports"></section>
          <section class="page" id="page-settings"></section>
        </main>
        <div id="sidebar-slot"></div>
      </div>
    `;

    // Render components into slots
    div.querySelector('#topbar-slot').replaceWith(Topbar.render());
    div.querySelector('#sidebar-slot').replaceWith(Sidebar.render());
    
    div.querySelector('#page-spreadsheet').appendChild(Spreadsheet.render());
    div.querySelector('#page-receivables').appendChild(Receivables.render());
    div.querySelector('#page-reports').appendChild(Reports.render());
    div.querySelector('#page-settings').appendChild(Settings.render());

    return div;
  },

  init() {
    Topbar.init();
    Sidebar.init();
    Spreadsheet.init();
    Receivables.init();
    Reports.init();
    Settings.init();
  }
};
