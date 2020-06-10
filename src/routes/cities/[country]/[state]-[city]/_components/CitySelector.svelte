<script>
	export let city;
	// export let cities;
</script>

<div class="current">
	<h1>{city.city_name}</h1>
</div>

<style>
	.current {
		padding: 0.5em;
	}

	h1 {
		margin: 0;
		text-transform: uppercase;
		font-weight: 200;
		text-align: center;
	}
</style>