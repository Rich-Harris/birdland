<script context="module">
	export async function preload({ params, query }) {
		const { country, state, name } = params;
		const res = await this.fetch(`cities/${country}/${state}/${name}.json`);

		if (res.ok) {
			const { city, current, forecast } = await res.json();
			const { selected = '' } = query;

			return { city, current, forecast, selected };
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
	import Attribution from './_components/Attribution.svelte';
	import * as yootils from 'yootils';
	import { mainclick } from '@app/utils/mainclick';

	export let city;
	export let current;
	export let forecast;
	export let selected;

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
		<Attribution />
	</div>

	<div class="weather">
		<Today {current}/>

		{#each forecast as day, i}
			<a
				class="summary"
				href="cities/{city.slug}?selected={day.valid_date}"
				id="{day.valid_date}-summary"
				disabled={!process.browser}
				aria-expanded={selected === day.valid_date}
				aria-controls="{day.valid_date}-details"
				use:mainclick={() => selected = (selected === day.valid_date ? null : day.valid_date)}
			>
				<Summary {day} today={i === 0} expanded={selected === day.valid_date} {scale}/>
			</a>

			{#if selected === day.valid_date}
				<Details {day}/>
			{/if}
		{/each}
	</div>
</main>

<div hidden>
	<img alt="Sunrise icon" src="icons/sunrise.svg">
	<img alt="Sunset icon" src="icons/sunset.svg">
	<img alt="Rain icon" src="icons/rain.svg">
	<img alt="Wind icon" src="icons/wind.svg">
	<img alt="Humidity icon" src="icons/humidity.svg">
</div>

<style>
	.summary {
		display: block;
		width: 100%;
		background: none;
		border: none;
		border-top: 1px solid var(--light-gray);
		padding: 0;
		font-size: 14px;
		text-decoration: none;
		line-height: 1;
		-webkit-tap-highlight-color: transparent;
	}

	.summary:not([aria-expanded="false"]) {
		background-color: var(--lighter-gray);
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
			border-left: 1px solid var(--light-gray);
		}

		.weather {
			order: 1;
		}
	}
</style>