<script>export let items=[];</script>
{#each items as c}<article class="comment"><div><b>{c.user}</b><small>{c.age}</small></div><p>{c.text}</p>{#if c.replies?.length}<div class="children"><svelte:self items={c.replies}/></div>{/if}</article>{:else}<p class="empty">No responses yet. You could be first.</p>{/each}
