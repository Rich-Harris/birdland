<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let q;

	let results;
	let loading;

	const search = async (e) => {
		loading = true;
		const res = await fetch(`api/search.json?q=${q}`);
		dispatch('results', {
			q,
			results: await res.json()
		});
		loading = false;
	};
</script>

<form disabled={loading} action="search" on:submit|preventDefault={search}>
	<input name="q" bind:value={q} spellcheck="false" on:keydown on:click={e => e.target.select()}>
</form>

<style>
	form {
		margin: 0 0 0.5em 0;
	}

	input {
		width: 100%;
		font-family: inherit;
		font-size: 2em;
		margin: 0;
		text-transform: uppercase;
		font-weight: 200;
		text-align: center;
		border: none;
		padding: 0 1em;
		border-radius: 2px;
		z-index: 3;
	}
</style>