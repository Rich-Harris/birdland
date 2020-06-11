<script>
	import { stores } from '@sapper/app';
	const { session } = stores();
</script>

<nav>
	<a class="logo" href=".">Birdland</a>

	<div>
		{#if $session.user}
			<span class="user">{$session.user.name}</span>
		{:else}
			<a href="login">log in</a>
		{/if}

		<a href="settings">settings</a>
	</div>
</nav>

<style>
	nav {
		border-bottom: 1px solid #222;
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
</style>