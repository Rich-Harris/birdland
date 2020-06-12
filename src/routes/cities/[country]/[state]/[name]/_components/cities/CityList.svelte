<script>
	import { stores } from '@sapper/app';
	import { slide } from 'svelte/transition';
	import ToggleForm from './ToggleForm.svelte';
	import CityLink from '@components/CityLink.svelte';
	import { is_home, is_bookmarked, set_home, add_bookmark, remove_bookmark } from './utils.js';

	const { session } = stores();

	export let visible;
</script>

{#if $session.user}
	<div
		class="cities"
		class:always-visible={visible}
	>
		{#if $session.user.bookmarks.length > 0}
			<ul>
				{#each $session.user.bookmarks as city (city.slug)}
					<li transition:slide={{duration:200}}>
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

						<CityLink {city}/>
						<!-- <a href="cities/{city.slug}">
							<strong>{city.name}</strong>
							{#if city.qualifier}
								<span class="qualifier">{city.qualifier}</span>
							{/if}
						</a> -->

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
							>{value ? 'unbookmark' : 'bookmark'}</button>
						</ToggleForm>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No cities saved yet</p>
		{/if}
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

	li:hover {
		background-color: var(--lighter-gray);
	}

	button {
		width: 100%;
		height: 100%;
		text-indent: -9999px;
		background: transparent 50% 50% no-repeat;
		background-size: contain;
		border: none;
	}

	p {
		padding: 0.5em;
		margin: 0;
	}

	@media (min-width: 720px) {
		.cities {
			display: block;
		}
	}
</style>