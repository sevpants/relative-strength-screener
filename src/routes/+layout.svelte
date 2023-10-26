<script>
	import LoadingTickers from '$lib/components/LoadingTickers.svelte';
  import Timer from '$lib/components/Timer.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
	import { page } from '$app/stores';
	import { loadingTicker } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

{#key $page.url.pathname}
	<div class="h-screen w-screen" in:fade={{ delay: 100, duration: 500 }}>
		{#if $navigating}
			<!-- <LoadingTickers /> -->
      <Timer />
		{:else}
			<slot />
		{/if}
	</div>
{/key}
