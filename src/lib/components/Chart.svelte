<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = [];

  onMount(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleUtc()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .defined(d => !isNaN(d.percentile_rank))
      .x(d => x(new Date(d.date)))
      .y(d => y(d.percentile_rank));

    const svg = d3.select("#chart")
      .attr("viewBox", [0, 0, width, height]);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
  });
</script>

<style>
  /* Add your styles here */
</style>

<svg id="chart"></svg>
