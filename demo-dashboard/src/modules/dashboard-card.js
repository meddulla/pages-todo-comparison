export class DashboardCard extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute('value');
    const label = this.getAttribute('label');
    const trend = this.getAttribute('trend');

    this.innerHTML = `
      <article class="metric-card">
        <div class="metric-icon">${this.getAttribute('icon') || '◆'}</div>
        <p>${label}</p>
        <strong>${value}</strong>
        <small class="positive">${trend}</small>
      </article>
    `;
  }
}
