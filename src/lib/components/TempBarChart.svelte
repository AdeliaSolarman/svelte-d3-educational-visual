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

	// container size
	let containerDiv: HTMLDivElement;
	let width = $state(0);
	let height = $state(0);

	$inspect(width);

	$effect(() => {
		if (containerDiv) {
			width = containerDiv.clientWidth - 60;
			height = width * 0.6 - 50;
		}
	});

	$effect(() => {
		if (width > 0 && height > 0) {
			if (!hasSetup) {
				setupGraph(chart, displayData, {
					width,
					height
				});
				hasSetup = true;
			} else {
				updateGraph(displayData);
			}
		}
	});

	$effect(() => {
		const interval = setInterval(() => {
			changeData();
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<div bind:this={containerDiv} class="h-full w-full">
	<div bind:this={chart}></div>
</div>
