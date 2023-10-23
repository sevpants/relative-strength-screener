<script lang="ts">
	import { page } from '$app/stores';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { PUBLIC_GET_ALL } from '$env/static/public';

	console.log($page.params.ticker);

	let data = [];
	let filteredData = [];
	const margin = { top: 20, right: 30, bottom: 30, left: 40 };
	const width = 960 - margin.left - margin.right;
	const height = 500 - margin.top - margin.bottom;

	onMount(async () => {
		const ticker = $page.params.ticker;
		const csvUrl = `${PUBLIC_GET_ALL}`;

		const response = await d3.csv(csvUrl);
		data = response;
		console.log(data);

		// Filter the data based on the ticker
		filteredData = data.filter((d) => d.ticker === ticker);
		console.log(filteredData);

		// Convert date and percentile_rank to appropriate types
		filteredData.forEach((d) => {
			d.date = new Date(Number(d.date));
			d.percentile_rank = +d.percentile_rank;
		});

		// Set up the SVG canvas dimensions
		const svg = d3
			.select('#chart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Set up the x and y scales
		const x = d3
			.scaleTime()
			.domain(d3.extent(filteredData, (d) => d.date))
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([0, 1]) // percentile_rank ranges from 0 to 1
			.range([height, 0]);

		// Add the X Axis
		svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

		// Add the Y Axis
		svg.append('g').call(d3.axisLeft(y));

		// Add the line path.
		svg
			.append('path')
			.datum(filteredData)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr(
				'd',
				d3
					.line()
					.x((d) => x(d.date))
					.y((d) => y(d.percentile_rank))
			);
	});
</script>

<div class="flex flex-col items-center pt-8">
	<div class="text-xl font-bold">Relative Strength of {$page.params.ticker} over time</div>
	<svg id="chart" />
</div>
