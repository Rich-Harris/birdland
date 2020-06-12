<script>
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
	id="{day.valid_date}-details"
	class="details"
	aria-labelledby="{day.valid_date}-summary"
>
	<h3>{day.weather.description.toLowerCase()}</h3>

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
		background-color: var(--lighter-gray);
		padding: 0 0.5rem 1rem 0.5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.5rem;
	}

	.grid > span {
		background: 0 50% no-repeat;
		padding: 0 0 0 2rem;
		background-size: 1.5rem 1.5rem;
	}

	.large-screen {
		display: none;
	}

	h3 {
		font-size: 1.6rem;
	}

	@media (min-width: 720px) {
		.small-screen {
			display: none;
		}

		.large-screen {
			display: inline;
		}
	}
</style>