<script lang="ts">
	import { LineGraph, type LineGraphData } from './graphs/LineGraph';

	const {
		data = [
			{ date: '2023-01-01', value: 10 },
			{ date: '2023-02-01', value: 15 },
			{ date: '2023-03-01', value: 18 },
			{ date: '2023-04-01', value: 22 },
			{ date: '2023-05-01', value: 20 },
			{ date: '2023-06-01', value: 25 },
			{ date: '2023-07-01', value: 28 },
			{ date: '2023-08-01', value: 32 },
			{ date: '2023-09-01', value: 30 },
			{ date: '2023-10-01', value: 35 },
			{ date: '2023-11-01', value: 38 },
			{ date: '2023-12-01', value: 42 },
			{ date: '2024-01-01', value: 45 },
			{ date: '2024-02-01', value: 48 },
			{ date: '2024-03-01', value: 52 }
		]
	}: { data?: LineGraphData } = $props();

	let chart: HTMLDivElement;

	let displayData = $state(data);

	const { setupGraph } = LineGraph();

	$effect(() => {
		setupGraph(chart, displayData);
	});
</script>

<div bind:this={chart}></div>
