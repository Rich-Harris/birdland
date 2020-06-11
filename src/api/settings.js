import { q, client } from './db.js';

const DEFAULTS = {
	celsius: true
};

const get_document = async userid => {
	try {
		return await client.query(
			q.Get(q.Match(q.Index('settings_by_userid'), userid))
		);
	} catch (e) {
		if (e.name === 'NotFound') return null;
		throw e;
	}
};

export async function get(userid) {
	const document = await get_document(userid);
	return document ? document.data : DEFAULTS;
}

export async function add(userid, settings) {
	const existing_document = await get_document(userid);
	const data = { userid, ...settings };

	if (existing_document) {
		await client.query(
			q.Replace(existing_document.ref, { data })
		);
	} else {
		await client.query(
			q.Create(q.Collection('settings'), { data })
		);
	}
}