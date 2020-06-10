import * as bookmarks from '@api/bookmarks.js';

export async function post(req, res) {
	const { user } = req.openid;
	if (!user) return res.send(null);

	res.send(await bookmarks.add(user, req.body));
}

export async function del(req, res) {
	const { user } = req.openid;
	if (!user) return res.send(null);

	res.send(await bookmarks.remove(user, req.body));
}