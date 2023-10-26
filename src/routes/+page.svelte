<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, readable } from 'svelte/store';
	import CellComponent from '$lib/components/table/Ticker.svelte';
	import Papa from 'papaparse';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import { addSortBy, addColumnOrder, addPagination } from 'svelte-headless-table/plugins';
	import { PUBLIC_GET_TICKERS } from '$env/static/public';
	import { loadingTicker } from '$lib/stores';

	type StockData = {
		PCTRET_1: string;
		avg_market_return: string;
		close: string;
		date: string;
		gte_day_before: string;
		high: string;
		low: string;
		open: string;
		percentile_rank: string;
		prev_close: string;
		rising_volume: string;
		rolling_7_day: string;
		rolling_7_day_volume: string;
		short_date: string;
		ticker: string;
		volume: string;
	};

	const data = writable<StockData[]>([]);

	onMount(() => {
		const csvUrl = `${PUBLIC_GET_TICKERS}`;

		Papa.parse(csvUrl, {
			download: true,
			header: true,
			complete: function (results: any) {
				data.set(results.data);
				console.log($data);
			}
		});
	});

	const table = createTable(data, {
		page: addPagination({ initialPageSize: 10 }),
		sort: addSortBy({ disableMultiSort: true }),
		colOrder: addColumnOrder()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Ticker',
			accessor: 'ticker',
			cell: ({ value }) => createRender(CellComponent, { ticker: value }),
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Open Price',
			accessor: 'open',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Close Price',
			accessor: 'close',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: '1 Day Return',
			accessor: 'PCTRET_1',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Percentile Rank',
			accessor: 'percentile_rank',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Rolling 7 Day Avg Return',
			accessor: 'rolling_7_day',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Rolling 7 Day Vol',
			accessor: 'rolling_7_day_volume',
			plugins: {
				sort: { invert: true }
			}
		}),
		table.column({
			header: 'Rising Volume',
			accessor: 'rising_volume',
			plugins: {
				sort: { invert: true }
			}
		})
	]);

	const { headerRows, pageRows, pluginStates, tableAttrs, tableBodyAttrs } =
		table.createViewModel(columns);

	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } = pluginStates.page;
</script>

{#if $data.length > 0}
	<div class="flex flex-col items-center pt-4">
		<div class="pb-2">
			<button
				class="btn btn-sm variant-filled"
				on:click={() => $pageIndex--}
				disabled={!$hasPreviousPage}>Previous page</button
			>
			{$pageIndex + 1} of {$pageCount}
			<button
				class="btn btn-sm variant-filled"
				on:click={() => $pageIndex++}
				disabled={!$hasNextPage}>Next page</button
			>
		</div>

		<table {...$tableAttrs}>
			<thead>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<tr {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<th {...attrs} on:click={props.sort.toggle}>
										<Render of={cell.render()} />
										{#if props.sort.order == 'asc'}
											⬇️
										{:else if props.sort.order === 'desc'}
											⬆️
										{/if}
									</th>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			</thead>
			<tbody {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<tr {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<td {...attrs}>
										<Render of={cell.render()} />
									</td>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p>Loading data...</p>
{/if}

<style>
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
	th,
	td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}
</style>
