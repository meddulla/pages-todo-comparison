export function render(app, data, context) {
  const projects = data.projects.filter(project =>
    `${project.name} ${project.team}`.toLowerCase().includes(context.query),
  );

  app.innerHTML = `
    <section class="page-heading"><div><p class="eyebrow">PORTFOLIO</p><h1>Projects</h1><p>Follow progress across every team and initiative.</p></div><button class="primary-button" id="new-project">+ New project</button></section>
    <section class="project-cards">${projects.map(project => `
      <article class="project-card">
        <div class="project-card-top"><span class="project-dot ${project.color}"></span><span class="status">${project.status}</span></div>
        <h2>${project.name}</h2><p>${project.team}</p>
        <div class="project-progress"><div><span>Progress</span><b>${project.progress}%</b></div><div class="progress"><i style="width:${project.progress}%"></i></div></div>
        <footer><span>4 collaborators</span><button>Open →</button></footer>
      </article>`).join('') || '<p class="empty">No projects match your search.</p>'}</section>
    <dialog id="project-dialog"><form method="dialog"><button class="close">×</button><p class="eyebrow">NEW PROJECT</p><h2>Start an initiative</h2><label>Name<input required placeholder="Project name"></label><label>Team<input required placeholder="Team name"></label><button class="primary-button" value="confirm">Create project</button></form></dialog>
  `;
  const dialog = document.querySelector('#project-dialog');
  document.querySelector('#new-project').addEventListener('click', () => dialog.showModal());
}
