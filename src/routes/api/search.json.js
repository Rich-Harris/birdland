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
	// res.send(sample);

	const { q } = req.query;
	const { data } = await httpie.get(`${BASE_URL}?placename_startsWith=${q}&username=${username}`);

	const results = process_geonames(data.postalCodes);
	res.send(results);
}

const sample = [
	{
		"name": "Paris",
		"state": "11",
		"country": "FR",
		"longname": "Paris, Île-de-France, FR",
		"count": 21
	},
	{
		"name": "Paris",
		"state": "TX",
		"country": "US",
		"longname": "Paris, Texas, US",
		"count": 3
	},
	{
		"name": "Paris",
		"state": "KY",
		"country": "US",
		"longname": "Paris, Kentucky, US",
		"count": 2
	},
	{
		"name": "Paris",
		"state": "ME",
		"country": "US",
		"longname": "Paris, Maine, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "VA",
		"country": "US",
		"longname": "Paris, Virginia, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "TN",
		"country": "US",
		"longname": "Paris, Tennessee, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "MI",
		"country": "US",
		"longname": "Paris, Michigan, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "IL",
		"country": "US",
		"longname": "Paris, Illinois, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "MO",
		"country": "US",
		"longname": "Paris, Missouri, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "AR",
		"country": "US",
		"longname": "Paris, Arkansas, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "ID",
		"country": "US",
		"longname": "Paris, Idaho, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "MS",
		"country": "US",
		"longname": "Paris, Mississippi, US",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "OH",
		"country": "US",
		"longname": "Paris, Ohio, US",
		"count": 1
	},
	{
		"name": "París",
		"state": "26",
		"country": "MX",
		"longname": "París, Sonora, MX",
		"count": 1
	},
	{
		"name": "Paris",
		"state": "ON",
		"country": "CA",
		"longname": "Paris, Ontario, CA",
		"count": 1
	},
	{
		"name": "Parish",
		"state": "NY",
		"country": "US",
		"longname": "Parish, New York, US",
		"count": 1
	},
	{
		"name": "Parisi",
		"state": "13",
		"country": "IT",
		"longname": "Parisi, Puglia, IT",
		"count": 1
	},
	{
		"name": "PARISH",
		"state": "B",
		"country": "AR",
		"longname": "PARISH, Buenos Aires, AR",
		"count": 1
	},
	{
		"name": "Parish",
		"state": "05",
		"country": "UY",
		"longname": "Parish, Durazno, UY",
		"count": 1
	},
	{
		"name": "Parisi",
		"state": "27",
		"country": "BR",
		"longname": "Parisi, Sao Paulo, BR",
		"count": 1
	},
	{
		"name": "Parisa",
		"state": "05",
		"country": "PE",
		"longname": "Parisa, Ayacucho, PE",
		"count": 1
	},
	{
		"name": "Parish",
		"state": "02",
		"country": "PE",
		"longname": "Parish, Ancash, PE",
		"count": 1
	},
	{
		"name": "Parisot",
		"state": "76",
		"country": "FR",
		"longname": "Parisot, Occitanie, FR",
		"count": 2
	},
	{
		"name": "Parisal",
		"state": "24",
		"country": "IN",
		"longname": "Parisal, Rajasthan, IN",
		"count": 1
	},
	{
		"name": "Parisha",
		"state": "28",
		"country": "IN",
		"longname": "Parisha, West Bengal, IN",
		"count": 1
	},
	{
		"name": "Parises",
		"state": "09",
		"country": "PT",
		"longname": "Parises, Faro, PT",
		"count": 1
	},
	{
		"name": "Parista",
		"state": "01",
		"country": "PE",
		"longname": "Parista, Amazonas, PE",
		"count": 1
	},
	{
		"name": "Paris 07",
		"state": "11",
		"country": "FR",
		"longname": "Paris 07, Île-de-France, FR",
		"count": 9
	},
	{
		"name": "Parisola",
		"state": "21",
		"country": "IN",
		"longname": "Parisola, Odisha, IN",
		"count": 2
	},
	{
		"name": "Paris 16",
		"state": "11",
		"country": "FR",
		"longname": "Paris 16, Île-de-France, FR",
		"count": 2
	},
	{
		"name": "Pariswad",
		"state": "19",
		"country": "IN",
		"longname": "Pariswad, Karnataka, IN",
		"count": 1
	},
	{
		"name": "Paristan",
		"state": "12",
		"country": "IN",
		"longname": "Paristan, Jammu & Kashmir, IN",
		"count": 1
	},
	{
		"name": "Paris 01",
		"state": "11",
		"country": "FR",
		"longname": "Paris 01, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 02",
		"state": "11",
		"country": "FR",
		"longname": "Paris 02, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 03",
		"state": "11",
		"country": "FR",
		"longname": "Paris 03, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 05",
		"state": "11",
		"country": "FR",
		"longname": "Paris 05, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 08",
		"state": "11",
		"country": "FR",
		"longname": "Paris 08, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 09",
		"state": "11",
		"country": "FR",
		"longname": "Paris 09, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 10",
		"state": "11",
		"country": "FR",
		"longname": "Paris 10, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 11",
		"state": "11",
		"country": "FR",
		"longname": "Paris 11, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 12",
		"state": "11",
		"country": "FR",
		"longname": "Paris 12, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 13",
		"state": "11",
		"country": "FR",
		"longname": "Paris 13, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 14",
		"state": "11",
		"country": "FR",
		"longname": "Paris 14, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 15",
		"state": "11",
		"country": "FR",
		"longname": "Paris 15, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 17",
		"state": "11",
		"country": "FR",
		"longname": "Paris 17, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 19",
		"state": "11",
		"country": "FR",
		"longname": "Paris 19, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 20",
		"state": "11",
		"country": "FR",
		"longname": "Paris 20, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 04",
		"state": "11",
		"country": "FR",
		"longname": "Paris 04, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 18",
		"state": "11",
		"country": "FR",
		"longname": "Paris 18, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Paris 06",
		"state": "11",
		"country": "FR",
		"longname": "Paris 06, Île-de-France, FR",
		"count": 1
	},
	{
		"name": "Parisdorf",
		"state": "03",
		"country": "AT",
		"longname": "Parisdorf, Niederösterreich, AT",
		"count": 1
	},
	{
		"name": "Parisselja",
		"state": "11",
		"country": "EE",
		"longname": "Parisselja, Pärnu maakond, EE",
		"count": 1
	},
	{
		"name": "Parispampa",
		"state": "13",
		"country": "PE",
		"longname": "Parispampa, La Libertad, PE",
		"count": 1
	},
	{
		"name": "Паристівка",
		"state": "02",
		"country": "UA",
		"longname": "Паристівка, Chernihivska, UA",
		"count": 1
	},
	{
		"name": "Pariscocha",
		"state": "09",
		"country": "PE",
		"longname": "Pariscocha, Huancavelica, PE",
		"count": 1
	},
	{
		"name": "Paris Creek",
		"state": "SA",
		"country": "AU",
		"longname": "Paris Creek, South Australia, AU",
		"count": 1
	},
	{
		"name": "Parishville",
		"state": "NY",
		"country": "US",
		"longname": "Parishville, New York, US",
		"count": 1
	},
	{
		"name": "Parishpampa",
		"state": "19",
		"country": "PE",
		"longname": "Parishpampa, Pasco, PE",
		"count": 1
	},
	{
		"name": "Pariškių k.",
		"state": "60",
		"country": "LT",
		"longname": "Pariškių k., Panevėžys, LT",
		"count": 1
	},
	{
		"name": "Parispaccha",
		"state": "15",
		"country": "PE",
		"longname": "Parispaccha, Lima, PE",
		"count": 1
	},
	{
		"name": "Senningerberg",
		"state": "LU",
		"country": "LU",
		"longname": "Senningerberg, Luxembourg, LU",
		"count": 1
	},
	{
		"name": "Paris Crossing",
		"state": "IN",
		"country": "US",
		"longname": "Paris Crossing, Indiana, US",
		"count": 1
	},
	{
		"name": "Paris-l’Hôpital",
		"state": "27",
		"country": "FR",
		"longname": "Paris-l’Hôpital, Bourgogne-Franche-Comté, FR",
		"count": 1
	},
	{
		"name": "Parisa (Pariza)",
		"state": "09",
		"country": "PE",
		"longname": "Parisa (Pariza), Huancavelica, PE",
		"count": 1
	},
	{
		"name": "Parishram Bhawan",
		"state": "40",
		"country": "IN",
		"longname": "Parishram Bhawan, Telangana, IN",
		"count": 1
	},
	{
		"name": "Le Touquet-Paris-Plage",
		"state": "32",
		"country": "FR",
		"longname": "Le Touquet-Paris-Plage, Hauts-de-France, FR",
		"count": 1
	}
];