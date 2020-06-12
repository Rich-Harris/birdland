import * as fs from 'fs';
import * as path from 'path';
import * as httpie from 'httpie';
import { city_lookup } from './data.js';

const BASE_URL = `https://api.weatherbit.io/v2.0`;
const { WEATHERBIT_API_KEY: key, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// During development, the page will be reloading a lot, which
// would generate lots of API requests. We don't want to blow
// the rate limit, so in development we cache results locally
const use_api = async city => {
	const query = `city_id=${city.id}&key=${key}`;

	const [current, forecast] = await Promise.all([
		httpie.get(`${BASE_URL}/current?${query}`),
		httpie.get(`${BASE_URL}/forecast/daily?${query}`)
	]);

	return {
		current: current.data.data[0],
		forecast: forecast.data.data
	};
};

const use_cache = async city => {
	const file = `.cache/${city.slug}.json`;

	if (fs.existsSync(file)) {
		const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

		// only use data younger than one hour
		if (Date.now() - data.timestamp < 60 * 60 * 1000) {
			return data;
		}
	}

	const data = await use_api(city);

	try {
		fs.mkdirSync(path.dirname(file), { recursive: true });
	} catch (e) {}

	fs.writeFileSync(file, JSON.stringify({ timestamp: Date.now(), ...data }));
	return data;
};

export async function lookup(slug) {
	const city = city_lookup.get(slug);
	if (!city) return null;

	const { current, forecast } = dev
		? await use_cache(city)
		: await use_api(city);

	return { city, current, forecast };
}