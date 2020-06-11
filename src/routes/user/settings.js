import { authed } from './_authed.js';
import * as settings from '../../api/settings.js';

export const post = authed(async (req, res, userdata) => {
	console.log('req.headers["content-type"]', req.headers["content-type"]);
	console.log('req.body', req.body);
	await settings.add(userdata.sub, req.body);

	res.redirect(302, '/settings');
});