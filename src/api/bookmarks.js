import { q, client } from './db.js';

const get_documents = async email => {
	const { data: documents } = await client.query(
		q.Map(
			q.Paginate(
				q.Match(q.Index('bookmarks_by_email'), email)
			),
			q.Lambda('x', q.Get(q.Var('x')))
		)
	);

	return documents;
};

export async function get(email) {
	const documents = await get_documents(email);
	return documents.map(d => d.data).sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});
}

export async function add(email, city) {
	const existing_documents = await get_documents(email);

	if (!existing_documents.find(d => d.data.slug === city.slug)) {
		const data = { email, ...city };

		await client.query(
			q.Create(q.Collection('bookmarks'), { data })
		);
	}
}

export async function remove(email, city) {
	const existing_documents = await get_documents(email);

	const match = existing_documents.find(d => d.data.slug === city.slug);

	if (match) {
		await client.query(
			q.Delete(match.ref)
		);
	}
}