<script>
	import * as yootils from 'yootils';
	import SearchBox from './SearchBox.svelte';
	import Modal from './Modal.svelte';

	export let city;

	let results;
	let modal_contents;

	const handle_results = e => {
		q = e.detail.q;
		results = e.detail.results;

		console.log(window.results = results);
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

	<p>{city.qualifier}</p>
</div>

<style>
	.current {
		padding: 0.5em;
		text-align: center;
	}

	p {
		margin: 0;
		color: #999;
	}

	.modal-contents {
		position: absolute;
		z-index: 2;
	}

	ul {
		background-color: white;
		list-style: none;
		padding: 0;
		margin: 0;
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
</style>