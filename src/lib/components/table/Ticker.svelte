<script lang='ts'>    
    export let ticker: string;

    import { loadingTicker } from "$lib/stores";
</script>
    <a 
    on:click={() => {
        console.log(ticker)
        loadingTicker.set(ticker)
    }}
    href="/tickers/{ticker}">{ticker}</a>