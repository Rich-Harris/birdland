import * as httpie from 'httpie';

export async function get(req, res) {
	const ip = req.headers['x-forwarded-for'] || '';

	const { data } = await httpie.get(`https://freegeoip.app/json/${ip}`);
	res.send(data);
}