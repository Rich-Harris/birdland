<script>
	import { stores } from '@sapper/app';

	const { session } = stores();

	let form;
	let saving = false;

	$: disabled = !$session.user || saving;

	const save = async () => {
		saving = true;

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
		$session.user = await res.json();

		saving = false;
	};
</script>

{#if $session.user}
	<form bind:this={form} method="post" action="user/settings" class:disabled on:submit|preventDefault={save}>
		<label>
			<input
				{disabled}
				name="celsius"
				type="checkbox"
				bind:checked={$session.user.settings.celsius}
				value="true"
				on:change={save}
			>

			show temperatures in degrees celsius
		</label>

		<noscript>
			<button type="submit">save</button>
		</noscript>
	</form>

	<p><a href="logout">log out</a></p>
{:else}
	<p><a href="login">log in</a> to change settings</p>
{/if}

<style>
	form.disabled {
		/* filter: grayscale(1);
		opacity: 0.5; */
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