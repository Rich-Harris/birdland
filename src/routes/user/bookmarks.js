import { authed } from './_authed.js';
import * as home from '@api/home.js';
import * as bookmarks from '@api/bookmarks.js';

export const post = authed(async (req, res, userdata) => {
	const { __method, ...city } = req.body;

	if (__method === 'post') {
		await bookmarks.add(userdata.sub, city);
		res.redirect(302, `/cities/${city.slug}`);
	} else if (__method === 'delete') {
		await Promise.all([
			home.remove(userdata.sub, city),
			bookmarks.remove(userdata.sub, city)
		]);

		res.redirect(302, '/');
	}
});