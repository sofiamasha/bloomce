import './styles/reset.css';
import './styles/variables.css';
import './styles/main.css';

import { globalState } from './core/state';
import { Home } from './pages/Home/Home';
import { AppShell } from './layouts/AppShell/AppShell';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize global state
  globalState.init();

  // Apply theme
  if (globalState.settings.themeDark) {
    document.body.classList.add('theme-dark');
  }

  const appDiv = document.getElementById('app');

  // Simple Router
  window.navigateToApp = () => {
    appDiv.innerHTML = '';
    appDiv.appendChild(AppShell.render());
    AppShell.init();
  };

  window.navigateToHome = () => {
    appDiv.innerHTML = '';
    appDiv.appendChild(Home.render());
    Home.init();
  };

  // Start at Home
  window.navigateToHome();
});
