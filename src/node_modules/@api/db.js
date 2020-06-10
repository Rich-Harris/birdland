import fauna from 'faunadb';

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_SECRET });

export { q, client };