<script>
	import { stores } from '@sapper/app';
	import ToggleForm from './ToggleForm.svelte';
	import { is_home, is_bookmarked, set_home, add_bookmark, remove_bookmark } from './utils.js';

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
					<ToggleForm
						value={is_home($session, city)}
						data={city}
						action="user/home"
						on:engage={() => set_home(session, city)}
						on:disengage={() => set_home(session, null)}
						let:value
					>
						<button
							style="background-image: url(icons/home-{value ? 'fill' : 'outline'}.svg)"
							type="submit"
						>{value ? 'remove' : 'add'} as home</button>
					</ToggleForm>

					<a href="cities/{city.slug}"><strong>{city.name}</strong>, {city.qualifier}</a>

					<ToggleForm
						value={is_bookmarked($session, city)}
						data={city}
						action="user/bookmarks"
						on:engage={() => add_bookmark(session, city)}
						on:disengage={() => remove_bookmark(session, city)}
						let:value
					>
						<button
							style="background-image: url(icons/bookmark-{value ? 'fill' : 'outline'}.svg)"
							type="submit"
						>{value ? 'remove from' : 'save to'} my cities</button>
					</ToggleForm>
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
		padding: 0 0.5rem;
		display: grid;
		grid-template-columns: 1.2rem 1fr 1.2rem;
		grid-gap: 0.5rem;
	}

	li a {
		padding: 0.5rem 0;
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