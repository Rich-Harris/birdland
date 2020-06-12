<script>
	import { stores } from '@sapper/app';

	const { session } = stores();

	let form;
	let current_token;

	const save = async () => {
		const token = current_token = {};

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
		if (token === current_token) {
			const res = await fetch('user.json');
			const user = await res.json();

			if (token === current_token) {
				$session.user = user;
			}
		}
	};
</script>

{#if $session.user}
	<form bind:this={form} method="post" action="user/settings" on:submit|preventDefault={save}>
		<fieldset>
			<legend>Temperature units</legend>

			<label>
				<input
					name="celsius"
					type="radio"
					bind:group={$session.user.settings.celsius}
					value={true}
					on:change={save}
				>

				celsius
			</label>

			<label>
				<input
					name="celsius"
					type="radio"
					bind:group={$session.user.settings.celsius}
					value={false}
					on:change={save}
				>

				fahrenheit
			</label>
		</fieldset>

		<fieldset>
			<legend>Theme</legend>

			<label>
				<input
					name="theme"
					type="radio"
					bind:group={$session.user.settings.theme}
					value="light"
					on:change={save}
				>

				light mode
			</label>

			<label>
				<input
					name="theme"
					type="radio"
					bind:group={$session.user.settings.theme}
					value="dark"
					on:change={save}
				>

				dark mode
			</label>

			<label>
				<input
					name="theme"
					type="radio"
					bind:group={$session.user.settings.theme}
					value=""
					on:change={save}
				>

				use system defaults
			</label>
		</fieldset>

		<noscript>
			<button type="submit">save</button>
		</noscript>
	</form>

	<p><a href="logout">log out</a></p>
{:else}
	<p><a href="login">log in</a> to change settings</p>
{/if}

<style>
	fieldset {
		margin: 1em 0;
		padding: 0;
		border: 0;
	}

	legend {
		border-top: 1px solid var(--light-gray);
		display: block;
		width: 100%;
		padding: 0.2rem 0;
	}

	label {
		display: block;
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