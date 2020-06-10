import * as user from '@api/user.js';

export async function get(req, res) {
	res.send(await user.get(req.openid.user));
}