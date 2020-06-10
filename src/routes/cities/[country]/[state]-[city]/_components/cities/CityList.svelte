<script>
	import { stores } from '@sapper/app';

	const { session } = stores();

	export let visible;
</script>

{#if $session.user}
	<div
		class="cities"
		class:always-visible={visible}
	>
		<ul>
			{#each $session.user.bookmarks as city (city.slug)}
				<li>
					<form
						method={city.is_home ? 'delete' : 'post'}
						action="user/home?slug={city.slug}"
						on:submit|preventDefault={() => toggle_home(city)}
					>
						<button style="background-image: url(icons/home-outline.svg)" type="submit">{city.is_home ? 'remove' : 'add'} as home</button>
					</form>

					<a href="cities/{city.slug}"><strong>{city.name}</strong>, {city.qualifier}</a>

					<form method="delete" action="user/save?slug={city.slug}" on:submit|preventDefault={() => toggle_save(city)}>
						<button style="background-image: url(icons/bookmark-remove.svg)" type="submit">remove from my cities</button>
					</form>
				</li>
			{:else}
				<li>No cities saved yet</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.cities {
		display: none;
		border-bottom: 1px solid #eee;
	}

	.cities.always-visible {
		display: block;
	}

	li {
		padding: 0 0.5em;
		display: grid;
		grid-template-columns: 1.4em 1fr 1.4em;
		grid-gap: 0.5em;
	}

	li a {
		padding: 0.5em 0;
	}

	button {
		width: 100%;
		height: 100%;
		text-indent: -9999px;
		background: transparent 50% 50% no-repeat;
		background-size: contain;
		border: none;
	}

	@media (min-width: 720px) {
		.cities {
			display: block;
		}
	}
</style>