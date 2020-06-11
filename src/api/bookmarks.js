import { q, client } from './db.js';

const get_documents = async userid => {
	const { data: documents } = await client.query(
		q.Map(
			q.Paginate(
				q.Match(q.Index('bookmarks_by_userid'), userid)
			),
			q.Lambda('x', q.Get(q.Var('x')))
		)
	);

	return documents;
};

export async function get(userid) {
	const documents = await get_documents(userid);
	return documents.map(d => d.data).sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});
}

export async function add(userid, city) {
	const existing_documents = await get_documents(userid);

	if (!existing_documents.find(d => d.data.slug === city.slug)) {
		const data = { userid, ...city };

		await client.query(
			q.Create(q.Collection('bookmarks'), { data })
		);
	}
}

export async function remove(userid, city) {
	const existing_documents = await get_documents(userid);

	const match = existing_documents.find(d => d.data.slug === city.slug);

	if (match) {
		await client.query(
			q.Delete(match.ref)
		);
	}
}