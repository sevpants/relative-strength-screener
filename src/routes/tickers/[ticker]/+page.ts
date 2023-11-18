import type { PageLoad } from './$types';
import Papa from 'papaparse';
import { PUBLIC_GET_TICKER } from '$env/static/public';

export const load: PageLoad = async ({ params }) => {
    try {
        let ticker = params.ticker;
        console.log("We trying to get data for ticker", ticker)
        let url = PUBLIC_GET_TICKER + ticker + ".csv";
        const response = await fetch(url);
        // const data = await response.json();
        // console.log("Data", data)
        if (!response.ok) {
            return {
                status: response.status,
                body: 'Error fetching csv',
            };
        }
        const csvText = await response.text();

        const parsedData = Papa.parse(csvText, { header: true }).data;
        // Filter data based on ticker value
        const filteredData = parsedData.filter(row => (row as any).ticker === ticker);
        console.log("Filtered data", filteredData)
        // Transform data to desired output format
        const transformedData = filteredData.map(row => ({
            time: formatDate((row as any).date),
            value: (row as any).percentile_rank
        }));

        return {
            status: 200,
            body: transformedData
        };
    }
    catch (err) {
        console.error(err);
        return {
            status: 500,
            body: err,
        };
    }
};


// function formatDate(dateString: string) {
//     const date = new Date(parseInt(dateString, 10));
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
