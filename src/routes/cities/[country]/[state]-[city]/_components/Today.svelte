<script>
	import { get_color } from './temperature_scale.js';

	export let city;
</script>

<div class="today" style="background: {get_color(city.current.temp, 0.2)}">
	<img
		alt={city.current.weather.description}
		src="icons/weather/{city.current.weather.icon}.svg"
	>

	<h3>{city.current.weather.description.toLowerCase()}</h3>

	<div class="grid">
		<div class="temperature">
			<strong>{city.current.temp}°</strong>
			<p>feels like {city.current.app_temp}°</p>
		</div>

		<div class="wind">
			<strong>{city.current.wind_spd}<small>m/s</small></strong>

			<p><span style="display: inline-block; transform: rotate({city.current.wind_dir}deg)">↓</span> {city.current.wind_cdir} winds</p>
		</div>
	</div>

	<!-- <pre>{JSON.stringify(city.current, null, '  ')}</pre> -->
</div>

<style>
	.today {
		position: relative;
		text-align: center;
		background: 50% 50% no-repeat;
		background-size: contain;
		padding: 2em 0.5em;
		box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
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

	.wind-direction {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		font-size: 4em;
		opacity: 0.2;
		pointer-events: none;
		text-align: center;
	}
</style>