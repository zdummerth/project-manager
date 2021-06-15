import faunadb from 'faunadb'
const client = new faunadb.Client({ secret: process.env.FAUNA_ANALYTICS_ACCESS })

const q = faunadb.query
const createSiteView = () => {
    const result = client.query(
        q.Create(q.Collection('site-visits'))
    )
    return result
}

export default async (req, res) => {
    console.log('create site view api called')
    const dbres = await createSiteView()
    console.log('database response', dbres)
    if(dbres) {
        res.status(201).send()  
    } else {
        res.status(400).send()
    }
}
