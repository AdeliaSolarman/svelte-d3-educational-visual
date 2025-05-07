<script lang="ts">
	import { BarGraph, type BarGraphData } from './graphs/BarGraph';
	import { browser } from '$app/environment';

	const dataSets: { label: string; data: BarGraphData }[] = [
		{
			label: 'Primary Completion Rate',
			data: [
				{ name: 'Q1', value: 86.43, color: '#ff6b6b' },
				{ name: 'Q2', value: 94.58, color: '#4ecdc4' },
				{ name: 'Q3', value: 96.14, color: '#45b7d1'  },
				{ name: 'Q4', value: 97.77, color: '#ffeead' }
			]
		},
		{
			label: 'Lower Secondary Completion Rate',
			data: [
				{ name: 'Q1', value: 57.69, color: '#ff6b6b' },
				{ name: 'Q2', value: 74.73, color: '#4ecdc4' },
				{ name: 'Q3', value: 82.47, color: '#45b7d1' },
				{ name: 'Q4', value: 90.39, color: '#ffeead' }
			]
		},
		{
			label: 'Upper Secondary Completion Rate',
			data: [
				{ name: 'Q1', value: 27.95, color: '#ff6b6b' },
				{ name: 'Q2', value: 46.13, color: '#4ecdc4' },
				{ name: 'Q3', value: 57.59, color: '#45b7d1'  },
				{ name: 'Q4', value: 68.10, color: '#ffeead' }
			]
		}
	];

	let displayData = $state(dataSets[0].data);
	let currentSet = $state(0);
	let title = $state(dataSets[0].label);

	let chart: HTMLDivElement;
	let hasSetup = false;

	const { setupGraph, updateGraph } = BarGraph();

	let containerDiv: HTMLDivElement;
	let width = $state(0);
	let height = $state(0);

	function updateDimensions() {
		if (containerDiv) {
			width = containerDiv.clientWidth - 60;
			height = width * 0.6 - 50;
		}
	}

	$effect(() => {
		if (browser && containerDiv) {
			updateDimensions();
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
			currentSet = (currentSet + 1) % dataSets.length;
			displayData = dataSets[currentSet].data;
			title = dataSets[currentSet].label;
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<div bind:this={containerDiv} class="w-full max-w-screen-md px-4 mx-auto">
	<h2 class="text-center text-lg font-semibold mb-2">{title}</h2>
	<div bind:this={chart}></div>
</div>