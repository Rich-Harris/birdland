<script>
	export let city;
	export let property;
	export let action;
	export let handler;

	let saving;
	let value = city[property];

	$: method = city[property] ? 'delete' : 'post';

	const handle_submit = async e => {
		saving = true;

		try {
			// optimistic UI
			value = !value;

			const res = await fetch(action, {
				method,
				body: city.slug
			});

			const updated_city = await res.json();

			// just in case the server disagrees with our optimistic UI
			value = updated_city[property];
		} catch (error) {
			// we're probably offline
			// TODO handle the error

			// revert optimistic UI
			value = city[property];
		}

		saving = false;
	};
</script>

<form disabled={saving} {method} {action} on:submit|preventDefault={handle_submit}>
	<slot {value}></slot>
</form>