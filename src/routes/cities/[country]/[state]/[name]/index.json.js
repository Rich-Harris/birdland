import { lookup } from '@api/backend/lookup.js';

export async function get(req, res, next) {
	const { country, state, name } = req.params;
	const slug = `${country}/${state}/${name}`;

	const result = await lookup(slug);

	if (!result) return next(); // 404

	res.send(result);
}