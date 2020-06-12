import { authed } from './_authed.js';
import * as home from '@app/backend/home.js';
import * as bookmarks from '@app/backend/bookmarks.js';

export const post = authed(async (req, res, userdata) => {
	const { __method, ...city } = req.body;

	if (__method === 'post') {
		await Promise.all([
			home.add(userdata.sub, city),
			bookmarks.add(userdata.sub, city)
		]);

		res.redirect(302, `/cities/${city.slug}`);
	} else if (__method === 'delete') {
		await home.remove(userdata.sub, city);
		res.redirect(302, '/');
	}
});