import { q, client } from './db.js';

const get_document = async userid => {
	try {
		return await client.query(
			q.Get(q.Match(q.Index('home_by_userid'), userid))
		);
	} catch (e) {
		if (e.name === 'NotFound') return null;
		throw e;
	}
};

export async function get(userid) {
	const document = await get_document(userid);
	return document && document.data;
}

export async function add(userid, city) {
	const existing_document = await get_document(userid);
	const data = { userid, ...city };

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

export async function remove(userid, city) {
	const document = await get_document(userid);

	if (document && document.data.slug === city.slug) {
		await client.query(
			q.Delete(document.ref)
		);
	}
}