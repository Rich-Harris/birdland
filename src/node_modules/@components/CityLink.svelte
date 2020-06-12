<script>
	export let city;
</script>

<a
	tabindex="0"
	href="cities/{city.slug}"
>
	<strong>{city.name}</strong>
	{#if city.qualifier}
		<span class="qualifier">{city.qualifier}</span>
	{/if}
</a>

<style>
	a {
		display: block;
		padding: 0.5rem 0;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--gray);
	}

	strong {
		font-weight: normal;
		color: var(--black);
	}

	.qualifier {
		font-size: 14px;
	}
</style>