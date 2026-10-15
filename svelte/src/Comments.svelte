<script>
  export let items = [];
</script>

{#each items as comment}
  <article class="comment">
    <div>
      <b>{comment.user}</b>
      <small>{comment.age}</small>
    </div>
    <p>{comment.text}</p>
    {#if comment.replies?.length}
      <div class="children">
        <svelte:self items={comment.replies} />
      </div>
    {/if}
  </article>
{:else}
  <p class="empty">No responses yet. You could be first.</p>
{/each}
