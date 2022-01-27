import { sendInvites } from 'lib/fauna'
import { getLoginSession } from 'lib/auth'



export default async function handler(req, res) {
    console.log('in send invite function', req.query)
    // console.log('method: ', req.method)
    // console.log('headers: ', req.headers)
    // console.log('body: ', req.body)

    const {
        projectId,
        toIds
    } = req.body

    try {
        const session = await getLoginSession(req, 'auth_cookie_name')

        const data = await sendInvites({
            projectId,
            toIds,
            secret: session.accessToken
        })

        console.log('send invites response data', data)

        res.status(200).json(data)

    } catch (error) {
        console.log('ERROR MOTHERFUCKER: ', error);
        res.status(400).json({ error })
    }
}