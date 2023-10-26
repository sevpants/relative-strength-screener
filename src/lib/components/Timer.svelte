<script>
  import { onMount, onDestroy } from 'svelte';

  let secondsSpent = 0;
  let intervalId;

  onMount(() => {
    intervalId = setInterval(() => {
      secondsSpent += 1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<p>You've spent {secondsSpent} seconds on this page.</p>