# Simple stock screener

You can find a demo of this running [here](https://relative-strength-screener.vercel.app/)

Tracks relative performance against the rest of the market.

To run on your own dataset you'll need to change the url route of the tickers route and main route in your .env file to your dataset in static/. or somewhere else.

Currently just pully data from an s3 bucket or locally. Will change that later to something more robust.

# Running locally
`npm run dev -- --open`


# Current structure of the dataset
Not in any order
```	
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
```
