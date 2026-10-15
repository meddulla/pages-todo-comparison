import { drawActivityChart } from '../modules/chart.js';

export function render(app, data) {
  const summary = data.summary;
  app.innerHTML = `
    <section class="page-heading">
      <div><p class="eyebrow">MONDAY, 12 OCTOBER</p><h1>Good morning, Sofia.</h1><p>Here’s what is happening across your workspace.</p></div>
      <a class="primary-button" href="#/board">View task board →</a>
    </section>
    <section class="metrics">
      <dashboard-card label="Active projects" value="${summary.activeProjects}" trend="↑ 2 this month" icon="◫"></dashboard-card>
      <dashboard-card label="Tasks completed" value="${summary.completedThisMonth}" trend="↑ 18% vs last month" icon="✓"></dashboard-card>
      <dashboard-card label="Team velocity" value="${summary.teamVelocity}%" trend="↑ 6% this week" icon="↗"></dashboard-card>
      <dashboard-card label="Hours saved" value="${summary.hoursSaved}" trend="↑ 9 from automation" icon="◷"></dashboard-card>
    </section>
    <section class="dashboard-grid">
      <article class="panel chart-panel"><div class="panel-heading"><div><p class="eyebrow">WORKSPACE ACTIVITY</p><h2>Momentum is building</h2></div><span>Last 12 weeks</span></div><canvas id="activity-chart" aria-label="Activity over twelve weeks"></canvas></article>
      <article class="panel"><div class="panel-heading"><div><p class="eyebrow">RECENT ACTIVITY</p><h2>What changed</h2></div></div><div class="event-list">${data.events.map(event => `<div class="event"><span>${event.person[0]}</span><p><b>${event.person}</b> ${event.action}<br><strong>${event.target}</strong></p><time>${event.time}</time></div>`).join('')}</div></article>
    </section>
    <section class="panel projects-preview"><div class="panel-heading"><div><p class="eyebrow">ACTIVE PROJECTS</p><h2>In progress</h2></div><a href="#/projects">View all →</a></div>${data.projects.slice(0, 3).map(projectRow).join('')}</section>
  `;
  requestAnimationFrame(() => drawActivityChart(document.querySelector('#activity-chart'), data.activity));
}

function projectRow(project) {
  return `<div class="project-row"><span class="project-dot ${project.color}"></span><div><b>${project.name}</b><small>${project.team}</small></div><div class="progress"><i style="width:${project.progress}%"></i></div><strong>${project.progress}%</strong><span class="status">${project.status}</span></div>`;
}
