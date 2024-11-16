<script lang="ts">
	import * as d3 from 'd3';

	const {
		data = [
			{ name: 'A', value: 10 },
			{ name: 'B', value: 20 },
			{ name: 'C', value: 15 },
			{ name: 'D', value: 25 },
			{ name: 'E', value: 18 }
		]
	} = $props();

	let chart: HTMLDivElement;

	const margin = { top: 20, right: 20, bottom: 30, left: 40 };
	const width = 600 - margin.left - margin.right;
	const height = 400 - margin.top - margin.bottom;

	$effect(() => {
		d3.select(chart).selectAll('*').remove();

		// Create SVG container
		const svg = d3
			.select(chart)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Create scales
		const x = d3
			.scaleBand()
			.range([0, width])
			.padding(0.1)
			.domain(data.map((d) => d.name));

		const y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, d3.max(data, (d) => d.value) || 0]);

		// Add X axis
		svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

		// Add Y axis
		svg.append('g').call(d3.axisLeft(y));

		// Add bars
		svg
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.attr('class', 'fill-blue-600 hover:fill-blue-300')
			.attr('x', (d) => x(d.name) || 0)
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(d.value))
			.attr('height', (d) => height - y(d.value));
	});
</script>

<div bind:this={chart}></div>
