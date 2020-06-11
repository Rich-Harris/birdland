import haversine from 'haversine';
import { cities } from './data.js';

export function closest(location) {
	const distances = cities.map(city => {
		const distance = haversine(location, {
			longitude: city.lon,
			latitude: city.lat
		});

		return { distance, city };
	});

	distances.sort((a, b) => a.distance - b.distance);

	return distances[0].city;
}