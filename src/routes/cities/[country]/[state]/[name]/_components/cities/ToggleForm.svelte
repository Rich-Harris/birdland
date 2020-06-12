<script context="module">
	let current_token;
</script>

<script>
	import { createEventDispatcher } from 'svelte';
	import { stores } from '@sapper/app';

	export let value;
	export let data;
	export let action;

	const { session } = stores();
	const dispatch = createEventDispatcher();

	$: method = value ? 'delete' : 'post';

	const handle_submit = async e => {
		const token = current_token = {};

		try {
			// enable optimistic UI
			dispatch(value ? 'disengage' : 'engage');

			await fetch(action, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					__method: method,
					...data
				})
			});

			if (token === current_token) {
				const res = await fetch('user.json');
				const user = await res.json();

				if (token === current_token) {
					$session.user = user;
				}
			}
		} catch (error) {
			// we're probably offline
			// TODO handle the error
		}
	};
</script>

<form {action} method="post" on:submit|preventDefault={handle_submit}>
	<div hidden>
		<input name="__method" value={method}>
		<input name="name" value={data.name}>
		<input name="qualifier" value={data.qualifier}>
		<input name="slug" value={data.slug}>
	</div>

	<slot {value}></slot>
</form>