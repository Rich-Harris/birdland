<script context="module">
	export async function preload({ query }) {
		// TODO load results

		return {
			q: query.q
		};
	}
</script>

<script>
	export let q;
</script>

<p>search page for {q}</p>