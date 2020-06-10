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
		})
		.map(d => ({
			name: d.longname,
			href: `cities/${d.country}/${d.state}-${d.name}`.toLowerCase()
		}));

	return sorted;
};

export async function get(req, res) {
	res.send(sample);

	// const { q } = req.query;
	// const { data } = await httpie.get(`${BASE_URL}?placename_startsWith=${q}&username=${username}`);

	// const results = process_geonames(data.postalCodes);
	// res.send(results);
}

const sample = [
	{
		"name": "London, England, GB",
		"href": "cities/gb/eng-london"
	},
	{
		"name": "London, Kentucky, US",
		"href": "cities/us/ky-london"
	},
	{
		"name": "London, West Virginia, US",
		"href": "cities/us/wv-london"
	},
	{
		"name": "London, Ohio, US",
		"href": "cities/us/oh-london"
	},
	{
		"name": "London, Arkansas, US",
		"href": "cities/us/ar-london"
	},
	{
		"name": "London, Texas, US",
		"href": "cities/us/tx-london"
	},
	{
		"name": "Londono k., Kaunas County, LT",
		"href": "cities/lt/57-londono k."
	},
	{
		"name": "Londonderry, New South Wales, AU",
		"href": "cities/au/nsw-londonderry"
	},
	{
		"name": "Londonderry, New Hampshire, US",
		"href": "cities/us/nh-londonderry"
	},
	{
		"name": "Londonderry, Vermont, US",
		"href": "cities/us/vt-londonderry"
	},
	{
		"name": "Londonderry, Ohio, US",
		"href": "cities/us/oh-londonderry"
	},
	{
		"name": "Londonderry, Western Australia, AU",
		"href": "cities/au/wa-londonderry"
	},
	{
		"name": "London Mills, Illinois, US",
		"href": "cities/us/il-london mills"
	},
	{
		"name": "London Lakes, Tasmania, AU",
		"href": "cities/au/tas-london lakes"
	},
	{
		"name": "London Central, Ontario, CA",
		"href": "cities/ca/on-london central"
	},
	{
		"name": "Londonpur Grant, Uttar Pradesh, IN",
		"href": "cities/in/36-londonpur grant"
	},
	{
		"name": "London North (UWO), Ontario, CA",
		"href": "cities/ca/on-london north (uwo)"
	},
	{
		"name": "London (Glen Cairn), Ontario, CA",
		"href": "cities/ca/on-london (glen cairn)"
	},
	{
		"name": "London (East Tempo), Ontario, CA",
		"href": "cities/ca/on-london (east tempo)"
	},
	{
		"name": "London (West Huron Heights / Carling), Ontario, CA",
		"href": "cities/ca/on-london (west huron heights / carling)"
	},
	{
		"name": "London East (SW Argyle / Hamilton Road), Ontario, CA",
		"href": "cities/ca/on-london east (sw argyle / hamilton road)"
	},
	{
		"name": "London West (Central Hyde Park / Oakridge), Ontario, CA",
		"href": "cities/ca/on-london west (central hyde park / oakridge)"
	},
	{
		"name": "London (Southcrest / East Westmount / West Highland), Ontario, CA",
		"href": "cities/ca/on-london (southcrest / east westmount / west highland)"
	},
	{
		"name": "London (YXU / North and East Argyle / East Huron Heights), Ontario, CA",
		"href": "cities/ca/on-london (yxu / north and east argyle / east huron heights)"
	},
	{
		"name": "London (Jackson / Old Victoria / Bradley / North Highbury), Ontario, CA",
		"href": "cities/ca/on-london (jackson / old victoria / bradley / north highbury)"
	},
	{
		"name": "London (Talbot / Lambeth / West Tempo / South Sharon Creek), Ontario, CA",
		"href": "cities/ca/on-london (talbot / lambeth / west tempo / south sharon creek)"
	},
	{
		"name": "London South (East Highland / North White Oaks / North Westminster), Ontario, CA",
		"href": "cities/ca/on-london south (east highland / north white oaks / north westminster)"
	},
	{
		"name": "London (South Highbury / Glanworth / East Brockley / SE Westminster), Ontario, CA",
		"href": "cities/ca/on-london (south highbury / glanworth / east brockley / se westminster)"
	},
	{
		"name": "London (Fanshawe / Stoneybrook / Stoney Creek / Uplands / East Masonville), Ontario, CA",
		"href": "cities/ca/on-london (fanshawe / stoneybrook / stoney creek / uplands / east masonville)"
	},
	{
		"name": "London (Riverbend / Woodhull / North Sharon Creek / Byron / West Westmount), Ontario, CA",
		"href": "cities/ca/on-london (riverbend / woodhull / north sharon creek / byron / west westmount)"
	},
	{
		"name": "London (South White Oaks / Central Westminster / East Longwoods / West Brockley), Ontario, CA",
		"href": "cities/ca/on-london (south white oaks / central westminster / east longwoods / west brockley)"
	},
	{
		"name": "London (Sunningdale / West Masonville / Medway / NE Hyde Park / East Fox Hollow), Ontario, CA",
		"href": "cities/ca/on-london (sunningdale / west masonville / medway / ne hyde park / east fox hollow)"
	}
];