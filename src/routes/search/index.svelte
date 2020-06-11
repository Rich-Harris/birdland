<script context="module">
	export async function preload({ query }) {
		const { q } = query;

		if (q) {
			const res = await this.fetch(`search.json?q=${q}`);
			const results = await res.json();

			return { q, results };
		}

		return { q: '', results: [] };
	}
</script>

<script>
	import SearchBox from '../../components/SearchBox.svelte';
	import CityLink from '../../components/CityLink.svelte';

	export let q;
	export let results;

	const handle_results = e => {
		q = e.detail.q;
		results = e.detail.results;
	};
</script>

<main>
	<div class="search-container">
		<SearchBox {q} on:results={handle_results}/>
	</div>

	<div class="results">
		{#if q}
			{#if results.length > 0}
				<ul>
					{#each results as result}
						<li><CityLink city={result}/></li>
					{/each}
				</ul>
			{:else}
				<p>No search results. Note that only cities with 15,000 or more inhabitants are included.</p>
			{/if}
		{/if}
	</div>
</main>

<style>
	main {
		max-width: 640px;
		margin: 0 auto;
		padding: 4rem 0.5rem;
	}

	.results {
		padding: 0 0.5rem;
	}

	.search-container {
		border-bottom: 1px solid var(--light-gray);
	}
</style>