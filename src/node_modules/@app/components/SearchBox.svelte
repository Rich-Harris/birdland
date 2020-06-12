<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let q;

	let results;
	let loading;

	const search = async (e) => {
		loading = true;
		const res = await fetch(`search.json?q=${q}`);
		dispatch('results', {
			q,
			results: await res.json()
		});
		loading = false;
	};
</script>

<form disabled={loading} method="get" action="search" on:submit|preventDefault={search}>
	<input
		placeholder="Search for a city"
		name="q"
		spellcheck="false"
		pattern="..+"
		title="Two or more letters"
		bind:value={q}
		on:click={e => e.target.select()}
	>
</form>

<style>
	form {
		padding: 0.5rem;
		background: var(--background);
		border-radius: var(--corner) var(--corner) 0 0;
	}

	input {
		width: 100%;
		font-family: inherit;
		font-size: 2em;
		padding: 0 1.2em 0 0;
		margin: 0;
		text-transform: uppercase;
		font-weight: 200;
		border: none;
		border-radius: var(--corner);
		background: url(/icons/search.svg) 100% 50% no-repeat;
		background-size: 1em 1em;
	}

	@media (min-width: 720px) {
		input {
			font-size: 2.8rem;
		}
	}
</style>