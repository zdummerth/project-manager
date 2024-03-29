import { getTasksByAccount } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'


const isString = i => typeof i === 'string'

export default async function handler(req, res) {
    console.log('in tasks status function')
    // console.log('method: ', req.method)
    // console.log('params: ', req.params)
    console.log('body: ', req.body)

    // console.log('statuses', statuses)
    const {
        projectId,
        status
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const { data } = await getTasksByAccount({
            status,
            projectId,
            secret: session.accessToken
        })

        console.log('task response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}