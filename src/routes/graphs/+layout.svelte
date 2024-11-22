<script lang="ts">
	const { children } = $props();
</script>

<div class="grid w-full grow grid-cols-4">
	<div class="col-span-1 flex flex-col gap-4 bg-neutral-900 p-4">
		<div class="flex flex-col gap-4">
			<a href="/graphs/bar" class="text-neutral-200 hover:underline">Bar Graph</a>
			<a href="/graphs/line" class="text-neutral-200 hover:underline">Line Graph</a>
		</div>
	</div>

	<div class="col-span-3">
		{@render children()}
	</div>
</div>
