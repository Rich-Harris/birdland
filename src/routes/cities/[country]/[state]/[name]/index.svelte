<script context="module">
	export async function preload({ params }) {
		const { country, state, city } = params;
		const res = await this.fetch(`cities/${country}/${state}/${city}.json`);

		if (res.ok) {
			return await res.json();
		} else {
			this.error(res.status, await res.text());
		}
	}
</script>

<script>
	import CitySelector from './_components/cities/CitySelector.svelte';
	import CityList from './_components/cities/CityList.svelte';
	import Today from './_components/weather/Today.svelte';
	import Summary from './_components/weather/Summary.svelte';
	import Details from './_components/weather/Details.svelte';
	import * as yootils from 'yootils';

	export let city;
	export let current;
	export let forecast;

	let selected;
	let show_cities = false;

	$: scale = yootils.linearScale([
		Math.min(...forecast.map(d => d.low_temp)),
		Math.max(...forecast.map(d => d.high_temp))
	], [0, 100]);
</script>

<svelte:head>
	<title>{city.name} • Birdland</title>
</svelte:head>

<main>
	<div class="cities">
		<CitySelector {city} bind:show_cities/>
		<CityList visible={show_cities}/>
	</div>

	<div class="weather">
		<Today {current}/>

		{#each forecast as day}
			<button
				id="{day.valid_date}-button"
				disabled={!process.browser}
				aria-expanded={selected === day}
				aria-controls="{day.valid_date}-contents"
				on:click="{() => selected = (selected === day ? null : day)}"
			>
				<Summary {day} expanded={selected === day} {scale}/>
			</button>

			{#if selected === day}
				<Details {day}/>
			{/if}
		{/each}
	</div>
</main>

<style>
	button {
		display: block;
		width: 100%;
		background: none;
		border: none;
		border-top: 1px solid rgba(0,0,0,0.2);
		padding: 0;
	}

	@media (min-width: 720px) {
		main {
			display: grid;
			grid-template-columns: 60% 40%;
			max-width: 1080px;
			margin: 0 auto;
		}

		.cities {
			order: 2;
			border-left: 1px solid rgba(0,0,0,0.2);
		}

		.weather {
			order: 1;
		}
	}
</style>