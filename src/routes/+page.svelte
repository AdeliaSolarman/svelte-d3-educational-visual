<script>
	import TempBarChart from '$lib/components/TempBarChart.svelte';
</script>

<main class="grow">
	GRAPHS :0

	<div class="flex w-full items-center justify-center px-4 md:w-1/2">
		<TempBarChart />
	</div>

	<a href="/graphs/bar">bar graph land</a>
	<a href="/graphs/line">line graph land</a>
</main>
