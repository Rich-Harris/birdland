<script context="module">
	export async function preload() {
		const res = await this.fetch(`user/location.json`);

		if (res.ok) {
			const data = await res.json();
			const { slug } = data;
			this.redirect(302, `cities/${slug}`);
		} else {
			this.redirect(302, 'cities/us/ny/new-york');
		}
	}
</script>