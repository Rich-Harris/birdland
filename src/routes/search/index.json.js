import { search } from '@app/backend/search.js';

export async function get(req, res) {
	const { q } = req.query;
	const results = await search(q);

	res.send(results);
}