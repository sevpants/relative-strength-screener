<script>
  import { createTable } from '@tanstack/svelte-table';

  export let data = [];
  export let columns = [];
  export let onRowClick = () => {};

  const table = createTable();
</script>

<style>
  /* Add your styles here */
</style>

<table>
  <thead>
    {#each columns as { Header }, i}
      <th>{Header}</th>
    {/each}
  </thead>
  <tbody>
    {#each table.rows as row}
      <tr on:click={() => onRowClick(row.original)}>
        {#each table.columns as column}
          <td>{column.render('Cell', { row })}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
