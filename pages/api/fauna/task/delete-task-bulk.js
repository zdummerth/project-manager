import { deleteTaskBulk } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
    console.log('in task function', req.query)
    console.log('method: ', req.method)
    console.log('body: ', req.body)

    const {
        ids,
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const data = await deleteTaskBulk(
            ids,
            session.accessToken
        )

        console.log('task response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}