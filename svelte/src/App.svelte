<script>
  import { onMount } from 'svelte';

  let stories = [];
  let selected = null;
  let votes = JSON.parse(
    localStorage.getItem('threadline-svelte-votes') || '[]',
  );
  let draft = '';

  onMount(async () => {
    stories = await (await fetch('./stories.json')).json();
  });

  const count = (comments) =>
    comments.reduce(
      (total, comment) => total + 1 + count(comment.replies || []),
      0,
    );

  function toggle(id) {
    votes = votes.includes(id)
      ? votes.filter((vote) => vote !== id)
      : [...votes, id];
    localStorage.setItem('threadline-svelte-votes', JSON.stringify(votes));
  }

  function add() {
    if (!draft.trim()) return;

    stories = stories.map((story) =>
      story.id === selected
        ? {
            ...story,
            comments: [
              {
                id: Date.now(),
                user: 'you',
                age: 'just now',
                text: draft,
                replies: [],
              },
              ...story.comments,
            ],
          }
        : story,
    );
    draft = '';
  }

  $: current = stories.find((story) => story.id === selected);
</script>

<header>
  <button class="brand" on:click={() => (selected = null)}>
    <span>▲</span> Threadline
  </button>
  <nav>
    <button on:click={() => (selected = null)}>Top</button>
    <button>Newest</button>
    <button>Ask</button>
    <button>Show</button>
  </nav>
  <em>Svelte build</em>
</header>

<main>
  {#if current}
    <button class="back" on:click={() => (selected = null)}>
      ← Back to the front page
    </button>

    <article class="detail">
      <div class="tag">{current.domain || 'COMMUNITY POST'}</div>
      <h1>{current.title}</h1>
      <div class="meta">
        <button
          class:on={votes.includes(current.id)}
          class="vote"
          on:click={() => toggle(current.id)}>▲</button
        >
        {current.points + (votes.includes(current.id) ? 1 : 0)} points ·
        {current.user} · {current.age}
      </div>
      <p>{current.text}</p>
      {#if current.url}
        <a href={current.url}>Continue to article →</a>
      {/if}
    </article>

    <section class="talk">
      <div class="talk-title">
        <h2>Conversation</h2>
        <span>{count(current.comments)} responses</span>
      </div>
      <form on:submit|preventDefault={add}>
        <textarea
          bind:value={draft}
          placeholder="Add to the discussion"
        ></textarea>
        <button>Submit</button>
      </form>
      <Comments items={current.comments} />
    </section>
  {:else}
    <section class="mast">
      <div>
        <span>THE FRONT PAGE</span>
        <h1>Signal,<br />not noise.</h1>
      </div>
      <p>
        A calm place for curious people.<br />Stories selected and ranked by the
        community.
      </p>
    </section>

    <div class="rule">
      <b>TOP STORIES</b>
      <span>{stories.length} STORIES / TODAY</span>
    </div>

    <section>
      {#each stories as story, i}
        <article class="row">
          <div class="number">{i + 1}</div>
          <button
            class:on={votes.includes(story.id)}
            class="vote"
            on:click={() => toggle(story.id)}>▲</button
          >
          <div>
            <button class="headline" on:click={() => (selected = story.id)}>
              {story.title}
            </button>
            {#if story.domain}<small>{story.domain}</small>{/if}
            <div class="meta">
              {story.points + (votes.includes(story.id) ? 1 : 0)} points by
              <b>{story.user}</b> · {story.age} ·
              <button on:click={() => (selected = story.id)}>
                {count(story.comments)} comments
              </button>
            </div>
          </div>
        </article>
      {/each}
    </section>
  {/if}
</main>

<footer>
  <b>Threadline</b>
  <span>Independent demo news since this morning.</span>
</footer>

<script context="module">
  import Comments from './Comments.svelte';
</script>
