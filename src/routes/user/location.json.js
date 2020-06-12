import * as httpie from 'httpie';
import { closest } from '@api/backend/closest.js';

export async function get(req, res) {
	const ip = req.headers['x-forwarded-for'] || '';

	const { data } = await httpie.get(`https://freegeoip.app/json/${ip}`);
	res.send(closest(data));
}