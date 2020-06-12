<script>
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let modal;

	const close = () => dispatch('close');

	const get_focusable_elements = () => {
		return modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	};

	const handle_keydown = e => {
		if (e.key === 'Escape') return close();
		if (e.key !== 'Tab') return;

		const focusable = get_focusable_elements();
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		const active = document.activeElement;

		if (e.shiftKey) {
			if (active === first || !modal.contains(active)) {
				last.focus();
				e.preventDefault();
			}
		} else if (active === last || !modal.contains(active)) {
			first.focus();
			e.preventDefault();
		}
	};

	onMount(() => {
		const focusable = get_focusable_elements();
		if (focusable[0]) focusable[0].focus();
	});
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>
<div class="modal" bind:this={modal}>
	<slot></slot>
</div>

<style>
	.modal-background {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 2;
	}

	.modal {
		display: contents;
	}

	.modal > :global(*) {
		z-index: 2;
	}
</style>