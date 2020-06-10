<script>
	import { createEventDispatcher } from 'svelte';
	import { stores } from '@sapper/app';

	export let value;
	export let data;
	export let action;

	const { session } = stores();
	const dispatch = createEventDispatcher();

	let saving;

	$: method = value ? 'delete' : 'post';

	const handle_submit = async e => {
		saving = true;

		try {
			// enable optimistic UI
			dispatch(value ? 'disengage' : 'engage');

			await fetch(action, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const res = await fetch('user.json');
			if (res.ok) {
				$session.user = await res.json();
			} else {
				// TODO handle the error
			}
		} catch (error) {
			// we're probably offline
			// TODO handle the error
		}

		saving = false;
	};
</script>

<form disabled={saving} {method} {action} on:submit|preventDefault={handle_submit}>
	<slot {value}></slot>
</form>