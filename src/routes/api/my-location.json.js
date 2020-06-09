import * as httpie from 'httpie';

export async function get(req, res) {
	const ip = req.ip === '::1' || req.ip === '127.0.0.1'
		? ''
		: req.ip;

	const { data } = await httpie.get(`https://freegeoip.app/json/${ip}`);
	res.send(data);
}