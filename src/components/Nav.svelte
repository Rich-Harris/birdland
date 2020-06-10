<script>
	import { stores } from '@sapper/app';

	const { session } = stores();

	$: console.log($session);
</script>

<nav>
	<a class="logo" href=".">Birdland</a>

	{#if $session.user}
		<a href="logout">logout</a>
	{:else}
		<a href="login">login</a>
	{/if}
</nav>

<style>
	nav {
		border-bottom: 1px solid #222;
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		justify-content: space-between;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
	}

	.logo {
		background: url(/logo.svg) 0 50% no-repeat;
		background-size: 1em 1em;
		padding: 0.5em 0.5em 0.5em 1.5em;
	}
</style>