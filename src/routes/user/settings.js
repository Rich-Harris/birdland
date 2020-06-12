import { authed } from './_authed.js';
import * as settings from '@api/backend/settings.js';

export const post = authed(async (req, res, userdata) => {
	await settings.add(userdata.sub, req.body);

	res.redirect(302, '/settings');
});