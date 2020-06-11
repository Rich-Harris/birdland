<script context="module">
	export async function preload(page, { user, ip }) {
		if (user && user.home) {
			return this.redirect(302, `cities/${user.home.slug}`);
		}

		const res = await this.fetch(`user/location.json`, {
			headers: {
				'x-forwarded-for': ip
			}
		});

		if (res.ok) {
			const data = await res.json();
			const { slug } = data;
			this.redirect(302, `cities/${slug}`);
		} else {
			this.redirect(302, 'cities/us/ny/new-york');
		}
	}
</script>