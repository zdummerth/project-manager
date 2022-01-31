import { assignTask } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'

export default async function handler(req, res) {
    console.log('in task assign function', req.query)
    console.log('method: ', req.method)
    console.log('body: ', req.body)

    const {
        id,
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const data = await assignTask({
            id,
            secret: session.accessToken
        })

        console.log('task assign response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}