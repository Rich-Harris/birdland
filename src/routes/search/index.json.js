import { search } from '../../api/search.js';

export async function get(req, res) {
	const { q } = req.query;
	const results = await search(q);

	res.send(results);
}