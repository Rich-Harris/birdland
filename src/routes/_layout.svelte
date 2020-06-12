<script>
	import { setContext } from 'svelte';
	import { derived } from 'svelte/store';
	import { stores } from '@sapper/app';
	import Modal from '../components/Modal.svelte';
	import Settings from '../components/Settings.svelte';
	import { mainclick } from '@utils/mainclick';

	const { session } = stores();

	$: if ($session.user) {
		let { theme } = $session.user.settings;

		try {
			localStorage.theme = theme;

			if (!theme) {
				theme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light';
			}

			document.documentElement.dataset.theme = theme;
		} catch {}
	}

	let show_settings = false;

	const temp = derived(session, $session => {
		const fahrenheit = $session.user && !$session.user.settings.celsius;

		return (c, compact) => {
			const n = fahrenheit ? 32 + c * 9 / 5 : c;

			if (compact) return `${Math.round(n)}°`;
			return `${n.toFixed(1)}${fahrenheit ? '℉' : '℃'}`;
		};
	});

	setContext('utils', { temp });
</script>

<nav>
	<a class="logo" href=".">Birdland</a>

	<div>
		{#if $session.user}
			<span class="user">{$session.user.name}</span>
			<a href="settings" use:mainclick={() => show_settings = true}>settings</a>
		{:else}
			<a href="login">log in</a>
		{/if}
	</div>
</nav>

<slot></slot>

{#if show_settings}
	<Modal on:close={() => show_settings = false}>
		<div class="settings-container">
			<h3>Settings</h3>
			<Settings/>
		</div>
	</Modal>
{/if}

<style>
	nav {
		border-bottom: 1px solid var(--gray);
		font-weight: 300;
		padding: 0 0.5em;
		display: flex;
		justify-content: space-between;
	}

	a {
		text-decoration: none;
		padding: 0.5em 0;
	}

	div {
		display: flex;
		align-items: center;
		flex: 1 1 1;
		min-width: 0;
	}

	.user {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	[href="settings"] {
		display: block;
		width: 1.4rem;
		height: 100%;
		text-indent: -9999px;
		margin: 0 0 0 0.5rem;
		background: url(/icons/settings.svg) 50% 50% no-repeat;
	}

	.logo {
		background: url(/logo.svg) 0 50% no-repeat;
		background-size: 1em 1em;
		padding: 0.5em 0.5em 0.5em 1.5em;
	}

	.settings-container {
		position: absolute;
		display: block;
		top: 4rem;
		right: 1rem;
		width: calc(100vw - 2rem);
		max-width: 400px;
		max-height: calc(100vh - 5rem);
		background: var(--background);
		border-radius: var(--corner);
		padding: 0.5rem;
	}
</style>