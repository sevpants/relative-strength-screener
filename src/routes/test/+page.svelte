<!-- <script lang="ts">
	export let ticker: string;
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center text-2xl">
	<div class="flex flex-row gap-4">
<div
  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>
		<h1>Getting Content for {ticker}</h1>
	</div>
</div> -->
<script lang="ts">
import {faker} from '@faker-js/faker';

export const createSamples = (...lengths) => {
  const createSamplesLevel = (depth = 0) => {
    const length = lengths[depth];
    return [...Array(length)].map(() => {
      return {
        ...getSample(),
        ...(lengths[depth + 1] !== undefined ? { children: createSamplesLevel(depth + 1) } : {}),
      };
    });
  };
  return createSamplesLevel();
};

const getSample = () => {
  const statusChance = Math.random();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
  };
};

  import { derived, readable, writable } from 'svelte/store';
  import { createTable, Subscribe, Render } from 'svelte-headless-table';
  import { addTableFilter } from 'svelte-headless-table/plugins';
  // import { createSamples } from './createSamples';

  const data = writable(createSamples(30));
  const filters = writable({});

  function applyFilters(_data, _filters) {
  return _data.filter(item => {
    if (_filters.firstName) {
      return item.firstName.includes(_filters.firstName);
    }
    return true;  // Return true if no filters are applied to keep all data
  });
}

  const filteredData = derived([data, filters], ([_data, _filters])  => {
  return applyFilters(_data, _filters);
});


  const table = createTable(filteredData, {
    // tableFilter: addTableFilter(),
  });

  const columns = table.createColumns([
    table.group({
      header: 'Name',
      columns: [
        table.column({
          header: 'First Name',
          accessor: 'firstName',
        }),
        table.column({
          header: 'Last Name',
          accessor: 'lastName',
          plugins: {
            tableFilter: {
              exclude: true,
            },
          },
        }),
      ],
    }),
    table.group({
      header: 'Info',
      columns: [
        table.column({
          header: 'Age',
          accessor: 'age',
        }),
        table.column({
          header: 'Status',
          accessor: 'status',
        }),
        table.column({
          header: 'Visits',
          accessor: 'visits',
        }),
        table.column({
          header: 'Profile Progress',
          accessor: 'progress',
        }),
      ],
    }),
  ]);

  const { visibleColumns, headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
  // const { filterValue } = pluginStates.tableFilter;

  let firstNameFilter = ''
	function applyFirstNameFilter() {
    $filters = { firstName: firstNameFilter };
	}
	let inputValue: string;
</script>

<!-- <pre>$filterValue = {$filterValue}</pre> -->
<form>
<input 
name="text"
	bind:value={firstNameFilter}
	/>
	<button
	on:click|preventDefault={applyFirstNameFilter}	
		>Submit</button>
</form>
<div style="padding-top:12px;"></div>

<table {...$tableAttrs}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<th {...attrs}>
								<Render of={cell.render()} />
							</th>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
		<tr>
			<th colspan={$visibleColumns.length}>
				<!-- <input type="text" bind:value={$filterValue} placeholder="Search rows..." /> -->
			</th>
		</tr>
	</thead>
	<tbody {...$tableBodyAttrs}>
		{#each $rows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
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

<style>
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
	th, td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}
  input {
    width: 100%;
  }
  .matches {
    background: rgba(46, 196, 182, 0.2);
  }
</style>
