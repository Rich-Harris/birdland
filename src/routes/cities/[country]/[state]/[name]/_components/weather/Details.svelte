<script>
	import { slide } from 'svelte/transition';
	export let day;

	const pad = n => n < 10 ? `0${n}` : n;

	const format_time = ts => {
		// TODO do we need to account for timezone? probably
		const d = new Date(ts * 1000);

		const hours = d.getHours();
		const minutes = d.getMinutes();

		const suffix = hours >= 12 ? 'pm' : 'am';

		return `${hours % 12 || 12}:${pad(minutes)} ${suffix}`;
	};
</script>

<div
	id="{day.valid_date}-contents"
	class="details"
	aria-labelledby="{day.valid_date}-button"
	transition:slide={{duration:200}}
>
	<h3>{day.weather.description}</h3>

	<div class="grid">
		<span style="background-image: url(icons/sunrise.svg)">
			<strong>{format_time(day.sunrise_ts)}</strong> sunrise
		</span>
		<span style="background-image: url(icons/sunset.svg)">
			<strong>{format_time(day.sunset_ts)}</strong> sunset
		</span>

		<span style="background-image: url(icons/rain.svg)">
			<strong>{Math.round(day.precip)}mm</strong>
			<span class="small-screen">precip.</span>
			<span class="large-screen">precipitation</span>
		</span>
		<span style="background-image: url(icons/humidity.svg)">
			<strong>{day.rh}%</strong> humidity
		</span>

		<span style="background-image: url(icons/wind.svg)">
			<strong>{day.wind_spd.toFixed(1)}m/s {day.wind_cdir}</strong> wind
		</span>
	</div>
</div>

<style>
	.details {
		background-color: #f4f4f4;
		padding: 1em;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5em;
	}

	.grid > span {
		background: 0 50% no-repeat;
		padding: 0 0 0 2em;
		background-size: 1.5em 1.5em;
	}

	.large-screen {
		display: none;
	}

	@media (min-width: 640px) {
		.small-screen {
			display: none;
		}

		.large-screen {
			display: inline;
		}
	}
</style>