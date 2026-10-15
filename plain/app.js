let stories = [];
const app = document.querySelector("#app");
const voted = () =>
  JSON.parse(localStorage.getItem("threadline-plain-votes") || "[]");
fetch("./stories.json")
  .then((r) => r.json())
  .then((data) => {
    stories = data;
    route();
  })
  .catch(() => (app.innerHTML = "<p>Could not load stories.</p>"));
addEventListener("hashchange", route);
document.addEventListener("click", (e) => {
  const home = e.target.closest("[data-home]");
  if (home) {
    location.hash = "";
    scrollTo(0, 0);
  }
});
function route() {
  const id = Number(location.hash.replace("#story-", ""));
  id ? detail(id) : list();
}
function score(s) {
  return s.points + (voted().includes(s.id) ? 1 : 0);
}
function vote(id) {
  const votes = voted(),
    i = votes.indexOf(id);
  i < 0 ? votes.push(id) : votes.splice(i, 1);
  localStorage.setItem("threadline-plain-votes", JSON.stringify(votes));
  route();
}
function list() {
  app.innerHTML =
    '<section class="intro"><h1>Today’s curious corners of the internet</h1><p>Technology, craft, and ideas—ranked by readers.</p></section><section>' +
    stories.map((s, i) => storyRow(s, i)).join("") +
    '</section><button class="load">More stories</button>';
  bindVotes();
}
function storyRow(s, i) {
  return `<article class="story"><span class="rank">${i + 1}.</span><div><div class="titleline"><button class="vote ${voted().includes(s.id) ? "on" : ""}" data-vote="${s.id}" aria-label="Upvote"></button><a class="story-title" href="#story-${s.id}">${s.title}</a>${s.domain ? `<span class="domain">(${s.domain})</span>` : ""}</div><div class="meta">${score(s)} points by ${s.user} ${s.age} · <a href="#story-${s.id}">${count(s.comments)} comments</a></div></div></article>`;
}
function detail(id) {
  const s = stories.find((x) => x.id === id);
  if (!s) return list();
  app.innerHTML = `<button class="back" data-home>← back to stories</button><article class="article"><div class="meta">${s.domain || "threadline discussion"}</div><h1>${s.title}</h1><div class="meta"><button class="vote ${voted().includes(s.id) ? "on" : ""}" data-vote="${s.id}"></button>${score(s)} points by ${s.user} ${s.age}</div><p>${s.text}</p>${s.url ? `<a href="${s.url}">Visit article ↗</a>` : ""}</article><h2 class="comments-title">${count(s.comments)} comments</h2><form class="comment-form"><textarea required placeholder="Join the conversation"></textarea><button>add comment</button></form><section id="comments">${comments(s.comments)}</section>`;
  bindVotes();
  document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    s.comments.unshift({
      id: Date.now(),
      user: "you",
      age: "just now",
      text: e.target[0].value,
      replies: [],
    });
    detail(id);
  };
}
function comments(items) {
  return (
    items
      .map(
        (c) =>
          `<article class="comment"><div class="who">${c.user} · ${c.age}</div><p>${c.text}</p>${c.replies?.length ? `<div class="replies">${comments(c.replies)}</div>` : ""}</article>`,
      )
      .join("") ||
    '<p class="meta">No comments yet. Start the conversation.</p>'
  );
}
function count(cs) {
  return cs.reduce((n, c) => n + 1 + count(c.replies || []), 0);
}
function bindVotes() {
  document.querySelectorAll("[data-vote]").forEach(
    (b) =>
      (b.onclick = (e) => {
        e.preventDefault();
        vote(Number(b.dataset.vote));
      }),
  );
}
