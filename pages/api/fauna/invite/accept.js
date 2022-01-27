import { acceptInvites } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'



export default async function handler(req, res) {
    console.log('in accept invite function', req.query)
    // console.log('method: ', req.method)
    // console.log('headers: ', req.headers)
    // console.log('body: ', req.body)

    const {
        ids,
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const data = await acceptInvites(
            ids,
            session.accessToken
        )

        console.log('invite accept response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}