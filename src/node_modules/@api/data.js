import fs from 'fs';

// read in data from https://www.weatherbit.io/api/meta

const countries = JSON.parse(
	fs.readFileSync('data/countries.json', 'utf-8')
);

export const country_lookup = new Map();
countries.forEach(d => {
	country_lookup.set(d.country_code, d.country_name);
});

const states = JSON.parse(
	fs.readFileSync('data/states.json', 'utf-8')
);

export const state_lookup = new Map();
states.forEach(d => {
	const hash = `${d.country_code}:${d.state_code}`;
	state_lookup.set(hash, d.state_name);
});

const countries_with_displayed_states = new Set(['US']); // TODO others?

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
export const slugify = str => str
	.toLowerCase()
	.normalize('NFD')
	.replace(/[\u0300-\u036f]/g, '')
	.replace(/[^a-z0-9/]/g, '-')
	.replace(/^-/, '')
	.replace(/-$/, '')
	.replace(/-{2,}/g, '-');

export const cities = fs.readFileSync('data/cities.tsv', 'utf-8')
	.split(/\r?\n/g)
	.slice(1)
	.filter(Boolean)
	.map(str => {
		const [id, name, state_code, country_code, lat, lon] = str.split('\t');

		const state_name = state_lookup.get(`${country_code}:${state_code}`);
		const country_name = country_lookup.get(country_code);

		const qualifier = [
			// include state if country_name is empty, or if it's e.g. the US
			(countries_with_displayed_states.has(country_code) || !country_name) && state_name,
			country_name
		].filter(Boolean).join(', ');

		const slug = slugify(`${country_code}/${state_code}/${name}`);
		const search_slug = slugify(name);

		return {
			id,
			name,
			qualifier,
			lon: +lon,
			lat: +lat,
			slug,
			search_slug
		};
	});

export const city_lookup = new Map();
cities.forEach(d => {
	city_lookup.set(d.slug, d);
});