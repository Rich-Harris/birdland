import { cities, slugify } from './data.js';

export function search(q) {
	const slug = slugify(q);

	return cities
		.filter(d => d.search_slug.includes(slug))
		.sort((a, b) => {
			return (
				(a.search_slug.indexOf(slug) - b.search_slug.indexOf(slug)) ||
				(a.name.length - b.name.length)
			);
		})
		.map(d => ({
			name: d.name,
			qualifier: d.qualifier,
			slug: d.slug
		}));
}