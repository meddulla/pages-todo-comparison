const columns = [
  ['backlog', 'Backlog'],
  ['progress', 'In progress'],
  ['review', 'Review'],
  ['done', 'Done'],
];

export function render(app, data, context) {
  const tasks = data.tasks.filter(task =>
    `${task.title} ${task.project}`.toLowerCase().includes(context.query),
  );
  const columnFor = task => context.state.taskColumns[task.id] || task.column;

  app.innerHTML = `
    <section class="page-heading"><div><p class="eyebrow">WORKFLOW</p><h1>Task board</h1><p>Drag cards between columns. Changes persist in your browser.</p></div></section>
    <section class="board">${columns.map(([id, title]) => `
      <div class="board-column" data-column="${id}"><div class="column-title"><h2>${title}</h2><span>${tasks.filter(task => columnFor(task) === id).length}</span></div><div class="dropzone">${tasks.filter(task => columnFor(task) === id).map(taskCard).join('')}</div></div>`).join('')}</section>
  `;

  document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('dragstart', event => event.dataTransfer.setData('text/plain', card.dataset.id));
  });
  document.querySelectorAll('.board-column').forEach(column => {
    column.addEventListener('dragover', event => event.preventDefault());
    column.addEventListener('drop', event => {
      event.preventDefault();
      context.state.taskColumns[event.dataTransfer.getData('text/plain')] = column.dataset.column;
      context.save();
      render(app, data, context);
    });
  });
}

function taskCard(task) {
  return `<article class="task-card" draggable="true" data-id="${task.id}"><span class="priority ${task.priority.toLowerCase()}">${task.priority}</span><h3>${task.title}</h3><p>${task.project}</p><footer><span class="avatar small">${task.assignee}</span><span>⋮</span></footer></article>`;
}
