<script lang="ts">
	import { loadingTicker } from '$lib/stores';
	import { onMount } from 'svelte';

    $: count = 0;

    onMount(() => {
        const interval = setInterval(() => {
            count++;
        }, 30000);

        return () => clearInterval(interval);
    })
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center text-2xl">
	<div class="flex flex-row gap-4">
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status"
		>
			<span
				class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
				>Loading...</span
			>
		</div>
		{#if count > 3}
			<div>Aww fuck</div>
		{:else}
			<h1>Getting Content for {$loadingTicker} {$count}</h1>
		{/if}
	</div>
</div>
