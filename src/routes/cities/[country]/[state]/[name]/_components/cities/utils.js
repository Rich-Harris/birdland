export const is_home = ($session, city) => {
	return $session.user.home && $session.user.home.slug === city.slug;
};

export const is_bookmarked = ($session, city) => {
	return !!$session.user.bookmarks.find(d => d.slug === city.slug);
};

export const set_home = (session, city) => {
	session.update($session => {
		$session.user.home = city;
		return $session;
	});

	if (city) add_bookmark(session, city);
};

export const add_bookmark = (session, city) => {
	session.update($session => {
		if (!$session.user.bookmarks.find(d => d.slug === city.slug)) {
			$session.user.bookmarks = $session.user.bookmarks.concat(city).sort((a, b) => {
				return a.name < b.name ? -1 : 1;
			});
		}

		return $session;
	});
};

export const remove_bookmark = (session, city) => {
	session.update($session => {
		$session.user.bookmarks = $session.user.bookmarks.filter(d => {
			return d.slug !== city.slug;
		});

		if ($session.user.home && $session.user.home.slug === city.slug) {
			$session.user.home = null;
		}

		return $session;
	});
};