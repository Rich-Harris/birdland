<script>
	export let expanded;
</script>

<img alt="{expanded ? 'close' : 'open'} icon" src="icons/plus.svg" class:expanded>

<style>
	img {
		display: block;
		width: 100%;
		height: 1.4rem;
		object-fit: contain;
		transition: transform 0.2s;
		will-change: transform;
	}

	.expanded {
		transform: rotate(45deg);
	}
</style>