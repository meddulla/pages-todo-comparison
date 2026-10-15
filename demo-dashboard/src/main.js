import { DashboardCard } from './modules/dashboard-card.js';
import { loadState, saveState } from './modules/storage.js';

customElements.define('dashboard-card', DashboardCard);

const app = document.querySelector('#app');
const search = document.querySelector('#global-search');
const state = loadState();
let data;

document.querySelector('#build-label').textContent = window.__BUILD_MODE__ || 'native modules';
document.querySelector('#theme-toggle').addEventListener('click', () => {
  state.dark = !state.dark;
  saveState(state);
  applyTheme();
});
search.addEventListener('input', render);
window.addEventListener('hashchange', render);

applyTheme();
start();

async function start() {
  const response = await fetch(window.__DATA_URL__ || '../data/projects.json');
  data = await response.json();
  render();
}

async function render() {
  if (!data) return;

  const route = location.hash.slice(2) || 'dashboard';
  document.querySelectorAll('[data-route]').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });

  const views = {
    dashboard: () => import('./views/dashboard.js'),
    projects: () => import('./views/projects.js'),
    board: () => import('./views/board.js'),
  };
  const loadView = views[route] || views.dashboard;
  const view = await loadView();
  view.render(app, data, {
    query: search.value.trim().toLowerCase(),
    state,
    save: () => saveState(state),
  });
  app.focus({ preventScroll: true });
}

function applyTheme() {
  document.documentElement.dataset.theme = state.dark ? 'dark' : 'light';
}
