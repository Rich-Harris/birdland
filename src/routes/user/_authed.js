export function authed(handler) {
	return (req, res) => {
		const userdata = req.openid.user;

		if (userdata) {
			handler(req, res, userdata);
		} else {
			return res.status(401).send('Unauthorized');
		}
	};
}