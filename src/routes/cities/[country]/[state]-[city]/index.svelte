<script context="module">
	export async function preload({ params }) {
		const { country, state, city } = params;
		const res = await this.fetch(`cities/${country}/${state}-${city}.json`);

		if (res.ok) {
			return {
				city: await res.json()
			};
		} else {
			this.error(res.status, await res.text());
		}
	}
</script>

<script>
	import CitySelector from './_components/CitySelector.svelte';
	import Today from './_components/Today.svelte';
	import Summary from './_components/Summary.svelte';
	import Details from './_components/Details.svelte';
	import * as yootils from 'yootils';

	export let city;

	let selected;

	$: scale = yootils.linearScale([
		Math.min(...city.forecast.map(d => d.low_temp)),
		Math.max(...city.forecast.map(d => d.high_temp))
	], [0, 100]);
</script>

<svelte:head>
	<title>{city.name} • Birdland</title>
</svelte:head>

<div class="cities">
	<CitySelector {city}/>
</div>

<div class="weather">
	<Today {city}/>

	{#each city.forecast as day}
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

<style>
	button {
		display: block;
		width: 100%;
		background: none;
		border: none;
		border-top: 1px solid rgba(0,0,0,0.2);
	}
</style>