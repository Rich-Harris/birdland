import { q, client } from './db.js';

const get_document = async email => {
	try {
		return await client.query(
			q.Get(q.Match(q.Index('home_by_email'), email))
		);
	} catch (e) {
		if (e.name === 'NotFound') return null;
		throw e;
	}
};

export async function get(email) {
	const document = await get_document(email);
	return document && document.data;
}

export async function add(email, city) {
	const existing_document = await get_document(email);
	const data = { email, ...city };

	if (existing_document) {
		await client.query(
			q.Replace(existing_document.ref, { data })
		);
	} else {
		await client.query(
			q.Create(q.Collection('home'), { data })
		);
	}
}

export async function remove(email, city) {
	const document = await get_document(email);

	if (document && document.data.slug === city.slug) {
		await client.query(
			q.Delete(document.ref)
		);
	}
}