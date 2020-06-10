import * as home from '@api/home.js';

export async function post(req, res) {
	const { user } = req.openid;
	if (!user) return res.send(null);

	res.send(await home.add(user, req.body));
}

export async function del(req, res) {
	const { user } = req.openid;
	if (!user) return res.send(null);

	res.send(await home.remove(user));
}