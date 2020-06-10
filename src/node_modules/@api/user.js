import { get as get_home } from './home.js';
import { get as get_bookmarks } from './bookmarks.js';

export async function get(userdata) {
	if (!userdata) return null;

	const { name, picture, email } = userdata;

	const [home, bookmarks] = await Promise.all([
		get_home(email),
		get_bookmarks(email)
	]);

	const user = {
		name,
		picture,
		home,
		bookmarks
	};

	return user;
}