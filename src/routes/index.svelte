<script context="module">
	export async function preload() {
		const res = await this.fetch(`user/location.json`);

		if (res.ok) {
			const data = await res.json();
			const { city, country_code, region_code } = data;
			this.redirect(302, `cities/${country_code}/${region_code}-${city}`.toLowerCase());
		} else {
			this.redirect(302, 'cities/us/ny-new-york');
		}
	}
</script>