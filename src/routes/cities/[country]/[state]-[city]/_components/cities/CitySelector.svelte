<script>
	import * as yootils from 'yootils';
	import ExpandToggleIcon from '@components/ExpandToggleIcon.svelte';
	import SearchBox from './SearchBox.svelte';
	import ToggleForm from './ToggleForm.svelte';
	import Modal from './Modal.svelte';
	import { stores } from '@sapper/app';

	export let city;
	export let show_cities;

	const { session } = stores();

	let results;
	let modal_contents;

	const toggle_home = city => {
		console.log('toggle_home', city);
	};

	const toggle_save = city => {
		console.log('toggle_save', city);
	};

	const toggle_cities = e => {
		if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) return;

		show_cities = !show_cities;
		e.preventDefault();
	};

	const handle_results = e => {
		q = e.detail.q;
		results = e.detail.results;
	};

	const handle_keydown = e => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			const focusable = Array.from(modal_contents.querySelectorAll('input, a'));
			const i = focusable.indexOf(e.target);

			const next = yootils.clamp(
				i + (e.key === 'ArrowUp' ? -1 : 1),
				0,
				focusable.length - 1
			);

			focusable[next].focus();
			e.preventDefault();
		}
	};

	$: q = city.name;
</script>

<div class="current">
	{#if results}
		<Modal on:close={() => (results = null, q = city.name)}>
			<div class="modal-contents" bind:this={modal_contents} on:keydown={handle_keydown}>
				<SearchBox {q} on:results={handle_results}/>

				{#if results.length > 0}
					<ul>
						{#each results as result}
							<li>
								<a
									tabindex="0"
									href={result.href}
									on:click={() => results = null}
								>{result.name}</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p>No results!</p>
				{/if}
			</div>
		</Modal>
	{/if}

	<SearchBox {q} on:results={handle_results}/>

	<p class="qualifier">{city.qualifier}</p>

	{#if $session.user}
		<div class="controls">
			<ToggleForm {city} property="is_home" action="user/home.json" handler={toggle_home} let:value>
				<button style="background-image: url(icons/home-outline.svg)" type="submit">{city.is_home ? 'remove' : 'add'} as home</button>
			</ToggleForm>

			<form method={city.is_bookmarked ? 'delete' : 'post'} action="user/save?slug={city.slug}" on:submit|preventDefault={() => toggle_save(city)}>
				<button style="background-image: url(icons/bookmark-outline.svg)" type="submit">{city.is_bookmarked ? 'remove from' : 'save to'} my cities</button>
			</form>

			<a
				href="my-cities"
				class:expanded={show_cities}
				on:click={toggle_cities}
			>
				<ExpandToggleIcon expanded={show_cities}/>
				<span class="offscreen">{show_cities ? 'hide' : 'show'} my cities</span>
			</a>
		</div>
	{:else}
		<p><a href="login">log in</a> to save cities and preferences</p>
	{/if}
</div>

<style>
	.current {
		padding: 0.5em;
		border-bottom: 1px solid rgba(0,0,0,0.2);
	}

	.qualifier {
		text-transform: uppercase;
		margin: 0 0 0.5em 0;
		padding: 0 1px;
	}

	.modal-contents {
		position: absolute;
		z-index: 2;
	}

	ul {
		background-color: white;
		text-align: left;
		border-radius: 2px;
		max-height: 50vh;
		overflow-y: scroll;
	}

	li {
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}

	li a {
		display: block;
		padding: 0.5em;
	}

	.controls {
		color: #999;
		display: grid;
		grid-template-columns: 1fr 1fr 1.4em;
		grid-gap: 0.5em;
	}

	.controls button {
		color: inherit;
		border: none;
		background: 0 50% no-repeat;
		padding: 0 0 0 1.7em;
		background-size: 1.5em 1.5em;
	}

	.controls a {
		display: block;
		width: 100%;
		height: 100%;
	}

	.controls .offscreen {
		display: block;
		width: 0;
		height: 0;
		overflow: hidden;
	}



	@media (min-width: 720px) {
		.controls {
			grid-template-columns: 1fr 1fr;
		}

		.controls a {
			display: none;
		}
	}
</style>