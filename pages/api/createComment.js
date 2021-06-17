import faunadb from 'faunadb'
const client = new faunadb.Client({ secret: process.env.FAUNA_ANALYTICS_ACCESS })

const q = faunadb.query
const createComment = (data) => {
    const result = client.query(
        q.Create(q.Collection('comments'), { data })
    )
    return result
}

export default async (req, res) => {
    console.log('create commment api called', req.body)
    // const { comment } = req.body
    const dbres = await createComment(req.body)
    console.log('database response', dbres)
    if(dbres) {
        res.status(201).send()  
    } else {
        res.status(400).send()
    }
}
