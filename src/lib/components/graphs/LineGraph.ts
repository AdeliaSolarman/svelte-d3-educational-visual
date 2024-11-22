import * as d3 from 'd3';

type DataType = {
	date: string;
	value: number;
};

export type LineGraphData = DataType[];

type LineGraphConfig = {
	margin?: { top: number; right: number; bottom: number; left: number };
	width?: number;
	height?: number;
};

export const LineGraph = function () {
	let margin = { top: 20, right: 20, bottom: 30, left: 40 };
	let width = 600 - margin.left - margin.right;
	let height = 400 - margin.top - margin.bottom;

	const setupGraph = function (
		selector: HTMLDivElement,
		graphData: LineGraphData,
		config?: LineGraphConfig
	) {
		if (config) {
			margin = config.margin || margin;
			width = config.width || width;
			height = config.height || height;
		}

		const parseDate = d3.timeParse('%Y-%m-%d');
		const data = graphData.map((d) => ({
			date: parseDate(d.date) || new Date(),
			value: d.value
		}));

		// Create SVG
		const svg = d3
			.select(selector)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Set scales
		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d.date))
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value)])
			.range([height, 0]);

		// Create line
		const line = d3
			.line()
			.x((d) => x(d.date))
			.y((d) => y(d.value));

		// Add axes
		svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));

		svg.append('g').call(d3.axisLeft(y));

		// Add line path
		svg
			.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr('d', line);
	};

	return {
		setupGraph
	};
};
