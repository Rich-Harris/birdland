<script>
	import { getContext } from 'svelte';
	import { get_color } from './temperature_scale.js';

	export let current;

	const { temp } = getContext('utils');
</script>

<div class="today" style="background: {get_color(current.temp, 0.2)}">
	<img
		alt={current.weather.description}
		src="icons/weather/{current.weather.icon}.svg"
	>

	<h3>{current.weather.description.toLowerCase()}</h3>

	<div class="grid">
		<div class="temperature">
			<strong>{$temp(current.temp)}</strong>
			<p>feels like {$temp(current.app_temp)}</p>
		</div>

		<div class="wind">
			<strong>{current.wind_spd.toFixed(1)}<small>m/s</small></strong>

			<p><span style="display: inline-block; transform: rotate({current.wind_dir}deg)">↓</span> {current.wind_cdir} winds</p>
		</div>
	</div>
</div>

<style>
	.today {
		position: relative;
		text-align: center;
		background: 50% 50% no-repeat;
		background-size: contain;
		padding: 2em 0.5em;
	}

	img {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		mix-blend-mode: overlay;
		pointer-events: none;
	}

	h3 {
		text-align: center;
		font-size: 2em;
		font-weight: 200;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1em;
	}

	.temperature {
		text-align: right;
	}

	.grid strong {
		display: inline-block;
		font-size: 4em;
		font-weight: 200;
		line-height: 1.2;
	}

	.grid small {
		font-size: 0.5em;
	}

	.grid p {
		margin: 0;
	}

	.wind {
		text-align: left;
	}
</style>