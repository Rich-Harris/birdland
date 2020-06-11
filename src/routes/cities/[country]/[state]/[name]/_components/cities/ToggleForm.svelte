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
				method: 'POST',
				body: new FormData(e.target)
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

<form disabled={saving} {action} method="post" on:submit|preventDefault={handle_submit}>
	<div hidden>
		<input name="__method" value={method}>
		<input name="name" value={data.name}>
		<input name="qualifier" value={data.qualifier}>
		<input name="slug" value={data.slug}>
	</div>

	<slot {value}></slot>
</form>