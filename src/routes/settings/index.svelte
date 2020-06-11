<script>
	import { stores } from '@sapper/app';

	export let user;

	const { session } = stores();

	let form;

	$: disabled = !$session.user;

	const save = async () => {
		const data = {};
		new FormData(form).forEach((value, key) => {
			data[key] = value;
		});

		await fetch('user/settings', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		// refresh user to confirm settings
		const res = await fetch('user.json');
		user = await res.json();
	};
</script>

<svelte:head>
	<title>Settings • Birdland</title>
</svelte:head>

<main>
	<h1>Settings</h1>

	{#if $session.user}
		<p><a href="logout">log out</a></p>
	{:else}
		<p><a href="login">log in</a> to change settings</p>
	{/if}

	<form bind:this={form} method="post" action="user/settings" class:disabled on:submit|preventDefault={save}>
		<label>
			<input
				{disabled}
				name="celsius"
				type="checkbox"
				checked={!$session.user || $session.user.settings.celsius}
				value="true"
				on:change={save}
			>

			show temperatures in degrees celsius
		</label>

		<noscript>
			<button type="submit">save</button>
		</noscript>
	</form>
</main>

<style>
	main {
		max-width: 640px;
		margin: 0 auto;
		padding: 2rem 0.5rem;
	}

	form.disabled {
		filter: grayscale(1);
		opacity: 0.5;
	}

	button {
		display: block;
		background: var(--brand);
		border: none;
		border-radius: var(--corner);
		padding: 0.5em 1em;
		font-size: inherit;
		font-family: inherit;
		margin: 1em 0;
	}
</style>