import { get as get_home } from './home.js';
import { get as get_bookmarks } from './bookmarks.js';
import { get as get_settings } from './settings.js';

export async function get(userdata) {
	if (!userdata) return null;

	const { name, picture, sub: userid } = userdata;

	const [home, bookmarks, settings] = await Promise.all([
		get_home(userid),
		get_bookmarks(userid),
		get_settings(userid)
	]);

	const user = {
		name,
		picture,
		home,
		bookmarks,
		settings
	};

	return user;
}