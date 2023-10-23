<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from './$types'
  import { page } from '$app/stores';



  export let data: PageData;

  console.log(data.status)
  console.log(data.body)

  onMount(async () => {
	const chartOptions = {
		layout: {
			textColor: 'black',
			backgroundColor: 'white',
		}
	}
    const chart = LightweightCharts.createChart(document.getElementById('chart-container'), { width: 800, height: 500 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(data.body);
	chart.timeScale().fitContent();
  });
</script>

{#if data.body.length > 0}
	<div class="flex flex-col items-center pt-8">
	<div class="text-xl font-bold">Relative Strength of {$page.params.ticker} over time</div>
		<div class="text-xl font-bold">Data going back to {data.body[0].time}</div>

<div id="chart-container"></div>
</div>
{:else}
<p>Loading data...</p>
{/if}