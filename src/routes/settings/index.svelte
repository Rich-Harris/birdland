<script>
	import { stores } from '@sapper/app';

	export let user;

	const { session } = stores();

	let form;

	$: disabled = !$session.user;

	const save = async () => {
		const body = new FormData(form);

		console.log(body, body.get('celsius'));

		await fetch('user/settings', {
			method: 'post',
			body
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
		<input name="foo" value="bar">

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

		<!-- <noscript> -->
			<button type="submit">save</button>
		<!-- </noscript> -->
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
</style>