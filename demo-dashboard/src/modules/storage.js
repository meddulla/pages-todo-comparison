const key = 'northstar-dashboard';

export function loadState() {
  return JSON.parse(localStorage.getItem(key) || '{"dark":false,"taskColumns":{}}');
}

export function saveState(state) {
  localStorage.setItem(key, JSON.stringify(state));
}
