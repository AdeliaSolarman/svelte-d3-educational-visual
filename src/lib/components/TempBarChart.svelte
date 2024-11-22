<script lang="ts">
	import { BarGraph, type BarGraphData } from './graphs/BarGraph';

	const {
		data = [
			{ name: 'A', value: 88 },
			{ name: 'B', value: 12 },
			{ name: 'C', value: 58 },
			{ name: 'D', value: 39 },
			{ name: 'E', value: 77 }
		]
	}: { data?: BarGraphData } = $props();

	let displayData = $state(data);

	const changeData = () => {
		const newData = data.map((d) => ({ ...d, value: Math.random() * 100 }));
		displayData = newData;
	};

	let chart: HTMLDivElement;

	let hasSetup = false;

	const { setupGraph, updateGraph } = BarGraph();

	$effect(() => {
		if (!hasSetup) {
			setupGraph(chart, displayData);
			hasSetup = true;
		} else {
			updateGraph(displayData);
		}
	});

	$effect(() => {
		const interval = setInterval(() => {
			changeData();
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<div bind:this={chart}></div>
