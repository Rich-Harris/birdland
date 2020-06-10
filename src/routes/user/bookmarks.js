import { authed } from './_authed.js';
import * as home from '@api/home.js';
import * as bookmarks from '@api/bookmarks.js';

export const post = authed(async (req, res, userdata) => {
	const city = req.body;

	await bookmarks.add(userdata.email, city);

	res.redirect(302, `/cities/${city.slug}`);
});

export const del = authed(async (req, res, userdata) => {
	const city = req.body;

	await Promise.all([
		home.remove(userdata.email, city),
		bookmarks.remove(userdata.email, city)
	]);

	res.redirect(302, '/');
});