<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-full flex-col justify-between gap-4 bg-neutral-950 font-GeistMono text-white"
>
	<NavBar />
	{@render children()}
	<Footer />
</div>
