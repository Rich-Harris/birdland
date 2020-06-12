import * as user from '@app/backend/user.js';

export async function get(req, res) {
	res.send(await user.get(req.openid.user));
}