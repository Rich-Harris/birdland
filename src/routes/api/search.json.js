import * as httpie from 'httpie';

const BASE_URL = `http://api.geonames.org/postalCodeSearchJSON`;
const { GEONAMES_USERNAME: username } = process.env;

const process_geonames = places => {
	const results = new Map();

	places.forEach(d => {
		const { placeName, adminName1, adminCode1, countryCode } = d;
		const longname = `${placeName}, ${adminName1}, ${countryCode}`;

		if (results.has(longname)) {
			results.get(longname).count += 1;
		} else {
			results.set(longname, {
				name: placeName,
				state: adminCode1,
				country: countryCode,
				longname,
				count: 1
			});
		}
	});

	const sorted = Array.from(results)
		.map(([longname, place]) => place)
		.sort((a, b) => {
			return (a.name.length - b.name.length) || (b.count - a.count);
		});

	return sorted;
};

export async function get(req, res) {
	const { q } = req.query;
	const { data } = await httpie.get(`${BASE_URL}?placename_startsWith=${q}&username=${username}`);

	const results = process_geonames(data.postalCodes);
	res.send(results);
}