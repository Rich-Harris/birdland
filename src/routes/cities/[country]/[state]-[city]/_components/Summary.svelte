<script>
	import { get_color } from './temperature_scale.js';

	export let day;
	export let expanded;
	export let scale;

	const days = 'Sun Mon Tues Weds Thurs Fri Sat'.split(' ');

	const get_day_of_week = day => {
		const [y, m, d] = day.valid_date.split('-');
		const date = new Date(+y, +m - 1, +d);
		return days[date.getDay()];
	};
</script>

<div class="summary" style="background-image: url(https://www.weatherbit.io/static/img/icons/{day.weather.icon}.png)">
	<span class="day">{get_day_of_week(day)}</span>
	<div class="temperature-range-outer">
		<div
			class="temperature-range-inner"
			style="left: {scale(day.low_temp)}%; right: {100 - scale(day.high_temp)}%; --cold: {get_color(day.low_temp)}; --hot: {get_color(day.high_temp)}"
		>
			<span>{Math.round(day.low_temp)}°</span>
			<span>{Math.round(day.high_temp)}°</span>
		</div>
	</div>
	<img alt="{expanded ? 'close' : 'open'} icon" src="icons/plus.svg" class:expanded>
</div>

<style>
	.summary {
		display: flex;
		background: 0 50% no-repeat;
		background-size: 2em 2em;
		text-align: left;
		padding: 0.5em 1em 0.5em 3em;
		align-items: center;
	}

	.day {
		width: 7em;
	}

	.temperature-range-outer {
		position: relative;
		flex-grow: 1;
		height: 1em;
	}

	.temperature-range-inner {
		position: absolute;
		height: 100%;
		background: linear-gradient(to right, var(--cold), var(--hot));
		border-radius: 0.5em;
	}

	.temperature-range-inner span {
		position: absolute;
		padding: 0 0.5em;
	}

	.temperature-range-inner span:first-child {
		right: 100%;
	}

	.temperature-range-inner span:last-child {
		left: 100%;
	}

	img {
		width: 2em;
		height: 2em;
		transition: transform 0.2s;
		will-change: transform;
		margin: 0 0 0 3em;
		opacity: 0.2;
	}

	.expanded {
		transform: rotate(45deg);
	}
</style>