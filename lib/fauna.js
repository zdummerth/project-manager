import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.env.TESTING_ADMIN_KEY })
const q = faunadb.query

export const getAllPosts = () => await client.query(
    q.Call(q.Function("getAllPosts"))
)